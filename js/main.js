document.addEventListener('DOMContentLoaded', function () {
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll animation (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Works category filter (project-spread)
  var categoryButtons = document.querySelectorAll('.works-category-filter button');
  var projectSpreads = document.querySelectorAll('.project-spread');

  categoryButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      categoryButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      var delay = 0;

      projectSpreads.forEach(function (spread) {
        if (filter === 'all' || spread.getAttribute('data-category') === filter) {
          spread.style.display = '';
          spread.style.opacity = '0';
          spread.style.transform = 'translateY(20px)';
          setTimeout(function () {
            spread.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            spread.style.opacity = '1';
            spread.style.transform = 'translateY(0)';
          }, delay);
          delay += 100;
        } else {
          spread.style.display = 'none';
        }
      });
    });
  });

  // Active nav highlight
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Password gate for works page
  var gate = document.getElementById('password-gate');
  if (gate) {
    var PASS = '0916';
    if (sessionStorage.getItem('works_auth') === 'true') {
      gate.classList.add('hidden');
    } else {
      document.body.style.overflow = 'hidden';
      var input = document.getElementById('password-input');
      var btn = document.getElementById('password-submit');
      var err = document.getElementById('password-error');

      function tryAuth() {
        if (input.value === PASS) {
          sessionStorage.setItem('works_auth', 'true');
          gate.classList.add('hidden');
          document.body.style.overflow = '';
        } else {
          err.textContent = 'パスワードが正しくありません';
          input.value = '';
          input.focus();
        }
      }

      btn.addEventListener('click', tryAuth);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') tryAuth();
      });
    }
  }
});
