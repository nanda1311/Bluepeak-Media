/* ============================================================
   Bluepeak MEDIA — script.js
   Premium Creative Agency Website Scripts
   ============================================================ */

'use strict';

/* ============================================================
   1. PRELOADER
   ============================================================ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preloaderFill');
  const text      = document.getElementById('preloaderText');

  if (!preloader) return;

  const messages = [
    'Loading experience…',
    'Crafting your view…',
    'Almost there…',
    'Welcome to Bluepeak…'
  ];

  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress > 100) progress = 100;

    fill.style.width = progress + '%';

    msgIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
    text.textContent = messages[msgIndex];

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initHeroAnimations();
      }, 500);
    }
  }, 120);

  document.body.style.overflow = 'hidden';
})();


/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .why-card, .testi-card, input, textarea, select, .process-circle'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();


/* ============================================================
   3. NAVBAR — scroll behaviour + active link
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  // Sticky on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
})();


/* ============================================================
   4. HERO TEXT ANIMATIONS (triggered after preloader)
   ============================================================ */
function initHeroAnimations() {
  // Already handled via CSS animations with delays — stats counter trigger
  startCounters();
}


/* ============================================================
   5. COUNTER ANIMATION (hero stats)
   ============================================================ */
function startCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');

  counters.forEach(counter => {
    const target   = parseInt(counter.dataset.count, 10);
    const duration = 2000; // ms
    const stepTime = 20;
    const steps    = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, stepTime);
  });
}

// Also trigger counters when stats scroll into view (if user doesn't wait for preloader)
(function observeCounters() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounters();
      io.disconnect();
    }
  }, { threshold: 0.5 });

  io.observe(statsSection);
})();


/* ============================================================
   6. AOS — SCROLL REVEAL INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }
});


/* ============================================================
   7. VANILLA TILT — service cards + why cards
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.service-card, .why-card, .testi-card'), {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
      perspective: 1000
    });
  }
});


/* ============================================================
   8. PARALLAX — hero blobs + hero section
   ============================================================ */
(function initParallax() {
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  const blob3 = document.querySelector('.blob-3');

  if (!blob1) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (blob1) blob1.style.transform = `translate(0, ${scrollY * 0.15}px) scale(1)`;
    if (blob2) blob2.style.transform = `translate(0, ${scrollY * 0.08}px) scale(1)`;
    if (blob3) blob3.style.transform = `translate(0, ${scrollY * -0.06}px) scale(1)`;
  }, { passive: true });
})();


/* ============================================================
   9. MARQUEE HOVER PAUSE
   ============================================================ */
(function initMarquee() {
  const strip = document.querySelector('.marquee-strip');
  const track = document.querySelector('.marquee-track');
  if (!strip || !track) return;

  strip.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  strip.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


/* ============================================================
   10. CONTACT FORM — simple validation + feedback
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Visual feedback
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate submission (replace with actual endpoint or EmailJS / Formspree)
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent! We\'ll be in touch soon.';
      btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    }, 1800);
  });

  // Input float label effect
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
})();


/* ============================================================
   11. BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   12. SERVICE CARD — letter-by-letter hover title effect
   ============================================================ */
(function initServiceTitleEffect() {
  document.querySelectorAll('.service-card h3').forEach(title => {
    title.addEventListener('mouseenter', () => {
      const text = title.textContent;
      title.innerHTML = text.split('').map((char, i) =>
        char === ' '
          ? ' '
          : `<span style="display:inline-block;transition:transform 0.3s ease ${i * 20}ms">${char}</span>`
      ).join('');
    });
  });
})();


/* ============================================================
   13. SMOOTH SCROLL — polyfill for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: 'smooth'
      });
    }
  });
});


/* ============================================================
   14. PROCESS STEPS — staggered reveal
   ============================================================ */
(function initProcessReveal() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target.querySelector('.process-circle');
        if (circle) {
          circle.style.animation = 'none';
          circle.style.transform = 'scale(0)';
          setTimeout(() => {
            circle.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            circle.style.transform = 'scale(1)';
          }, 100);
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  steps.forEach(step => io.observe(step));
})();


/* ============================================================
   15. TYPED TEXT EFFECT — hero sub (optional shimmer)
   ============================================================ */
(function heroShimmer() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  setInterval(() => {
    badge.style.boxShadow = '0 0 20px rgba(26,86,219,0.3)';
    setTimeout(() => {
      badge.style.boxShadow = 'none';
    }, 800);
  }, 3000);
})();
