/* ============================================================
   assets/js/main.js
   Complete JavaScript for ERA-SS multi-page website
   ============================================================ */

(function() {
  'use strict';

  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');
  const topBar = document.getElementById('topBar');

  if (navbar && topBar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        topBar.classList.add('hidden');
      } else {
        navbar.classList.remove('scrolled');
        topBar.classList.remove('hidden');
      }
    }, { passive: true });
  }

  // ---------- MOBILE MENU ----------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (mobileToggle && mobileMenu && mobileOverlay) {
    function openMenu() {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
      // Close all open submenus
      document.querySelectorAll('.mobile-submenu.open').forEach(function(sub) {
        sub.classList.remove('open');
      });
      document.querySelectorAll('.mobile-dropdown-btn.active').forEach(function(btn) {
        btn.classList.remove('active');
      });
    }

    mobileToggle.addEventListener('click', openMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when any link inside is clicked
    document.querySelectorAll('.mobile-menu a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Mobile dropdown toggles
    document.querySelectorAll('.mobile-dropdown-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var targetId = this.getAttribute('data-target');
        var submenu = document.getElementById(targetId);
        if (!submenu) return;

        var isActive = this.classList.contains('active');

        // Close all other open submenus
        document.querySelectorAll('.mobile-submenu.open').forEach(function(sub) {
          if (sub.id !== targetId) sub.classList.remove('open');
        });
        document.querySelectorAll('.mobile-dropdown-btn.active').forEach(function(otherBtn) {
          if (otherBtn !== this) otherBtn.classList.remove('active');
        }, this);

        if (!isActive) {
          this.classList.add('active');
          submenu.classList.add('open');
        } else {
          this.classList.remove('active');
          submenu.classList.remove('open');
        }
      });
    });
  }

  // ---------- HERO SLIDER ----------
  var slides = document.querySelectorAll('.slide');
  var dotsContainer = document.getElementById('sliderDots');

  if (slides.length > 0 && dotsContainer) {
    var currentSlide = 0;
    var slideInterval;
    var dots = [];

    // Create dots
    slides.forEach(function(_, i) {
      var dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function() {
        showSlide(i);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function showSlide(index) {
      slides.forEach(function(s) { s.classList.remove('active'); });
      dots.forEach(function(d) { d.classList.remove('active'); });
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      var next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
    }

    // Start auto-slide
    slideInterval = setInterval(nextSlide, 6000);
  }

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS (on same page) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80 + 40 + 16; // navbar height + topbar + buffer
        if (document.getElementById('topBar')) {
          offset = document.getElementById('navbar').offsetHeight +
                   document.getElementById('topBar').offsetHeight + 16;
        }
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---------- CONTACT FORM ----------
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-submit');
      if (!btn) return;
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function() {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#2e7d32';
        btn.style.opacity = '1';
        contactForm.reset();

        setTimeout(function() {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // ---------- DESKTOP DROPDOWN TOUCH ENHANCEMENT ----------
  var dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function(dropdown) {
    var toggle = dropdown.querySelector('.nav-link');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) return;
      var isVisible = window.getComputedStyle(menu).opacity === '1';
      if (!isVisible) {
        e.preventDefault();
        e.stopPropagation();
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
        menu.style.pointerEvents = 'auto';
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1024) return;
    dropdowns.forEach(function(dropdown) {
      if (!dropdown.contains(e.target)) {
        var menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.style.opacity = '';
          menu.style.visibility = '';
          menu.style.transform = '';
          menu.style.pointerEvents = '';
        }
      }
    });
  });

})();
