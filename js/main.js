// Initialize AOS immediately (scripts at body bottom, so DOM is ready)
AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
});

window.addEventListener('load', function() {
  AOS.refresh();
});

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initMobileMenu();
  initCarousels();
  initLightbox();
});

// Mobile Menu
function initMobileMenu() {
  var body = document.body;
  var menuToggle = document.querySelectorAll('.js-menu-toggle');
  var mobileMenuBody = document.querySelector('.site-mobile-menu-body');
  var desktopNav = document.querySelector('.js-clone-nav');

  if (!menuToggle.length || !mobileMenuBody || !desktopNav) return;

  // Clone navigation
  var navClone = desktopNav.cloneNode(true);
  navClone.className = 'site-nav-wrap';
  mobileMenuBody.appendChild(navClone);

  // Setup dropdown toggles for items with children
  var dropdowns = mobileMenuBody.querySelectorAll('.has-children');
  dropdowns.forEach(function(item, index) {
    var arrow = document.createElement('span');
    arrow.className = 'arrow-collapse collapsed';
    arrow.setAttribute('data-bs-toggle', 'collapse');
    arrow.setAttribute('data-bs-target', '#collapseItem' + index);
    item.insertBefore(arrow, item.firstChild);

    var submenu = item.querySelector('ul');
    if (submenu) {
      submenu.className = 'collapse';
      submenu.id = 'collapseItem' + index;
    }
  });

  // Toggle menu on hamburger click
  menuToggle.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      body.classList.toggle('offcanvas-menu');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function(e) {
    var mobileMenu = document.querySelector('.site-mobile-menu');
    var isMenuToggle = false;
    menuToggle.forEach(function(toggle) {
      if (toggle.contains(e.target)) isMenuToggle = true;
    });

    if (body.classList.contains('offcanvas-menu') &&
        mobileMenu && !mobileMenu.contains(e.target) &&
        !isMenuToggle) {
      body.classList.remove('offcanvas-menu');
    }
  });

  // Close menu on window resize (if desktop width)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991 && body.classList.contains('offcanvas-menu')) {
      body.classList.remove('offcanvas-menu');
    }
  });

  // Arrow toggle active state on collapse events
  mobileMenuBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('arrow-collapse')) {
      e.preventDefault();
      var collapse = e.target.closest('li').querySelector('.collapse');
      if (collapse) {
        if (collapse.classList.contains('show')) {
          e.target.classList.add('collapsed');
          e.target.classList.remove('active');
        } else {
          e.target.classList.remove('collapsed');
          e.target.classList.add('active');
        }
      }
    }
  });
}

// Carousels (Swiper)
function initCarousels() {
  // Testimonials carousel
  var testimonialEl = document.querySelector('.nonloop-block-13');
  if (testimonialEl && typeof Swiper !== 'undefined') {
    new Swiper('.nonloop-block-13', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        600: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }
}

// Lightbox (GLightbox)
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  // Initialize for video links
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true
  });
}
