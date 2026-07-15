/**
 * Teresia Mwaura Portfolio — main.js
 * Handles: Lenis Smooth Scroll, GSAP animations, ScrollTrigger,
 *          Navbar, Mobile Menu, Progress Bar, Counter animations,
 *          Skill bars, Portfolio filter, Contact form.
 */

/* ═══════════════════════════════════════════════════════════
   1. LENIS SMOOTH SCROLL
═══════════════════════════════════════════════════════════ */
let lenis;
try {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
} catch (e) {
  console.warn('Lenis init failed, falling back to native scroll.');
}

/* ═══════════════════════════════════════════════════════════
   2. REGISTER GSAP PLUGINS
═══════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════════════════════════════════════════════════
   3. PROGRESS BAR
═══════════════════════════════════════════════════════════ */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
});

/* ═══════════════════════════════════════════════════════════
   4. NAVBAR — scroll state + active link tracking
═══════════════════════════════════════════════════════════ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 100;
    if (window.scrollY >= secTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu
    closeMobileMenu();
  });
});

/* ═══════════════════════════════════════════════════════════
   5. MOBILE MENU
═══════════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMobileMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) closeMobileMenu();
  else openMobileMenu();
});

/* ═══════════════════════════════════════════════════════════
   6. HERO ENTRANCE ANIMATIONS
═══════════════════════════════════════════════════════════ */
const heroTL = gsap.timeline({ delay: 0.2 });

heroTL
  .to('#hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .to('.title-line', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out'
  }, '-=0.3')
  .to('#hero-role', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  .to('#hero-desc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  .to('#hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
  .to('#hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

/* ═══════════════════════════════════════════════════════════
   7. COUNTER ANIMATION (hero stats)
═══════════════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// Trigger counters when stats become visible
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.getElementById('hero-stats');
if (heroStats) statsObs.observe(heroStats);

/* ═══════════════════════════════════════════════════════════
   8. GENERIC SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseFloat(delay) * 1000);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Assign staggered delays to sibling cards
function assignDelays(selector) {
  const groups = {};
  document.querySelectorAll(selector).forEach(el => {
    const parent = el.parentElement;
    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(el);
  });
  Object.values(groups).forEach(children => {
    children.forEach((el, i) => { el.dataset.delay = (i * 0.1).toString(); });
  });
}

assignDelays('.reveal-card');
document.querySelectorAll('.reveal-up, .reveal-card').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════════════════════════
   9. SKILL BAR ANIMATIONS
═══════════════════════════════════════════════════════════ */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const fill = bar.querySelector('.tool-bar-fill');
      const width = bar.dataset.width || 80;
      setTimeout(() => {
        fill.style.width = `${width}%`;
      }, 200);
      barObs.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tool-bar').forEach(b => barObs.observe(b));

/* ═══════════════════════════════════════════════════════════
   10. PORTFOLIO FILTER
═══════════════════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;

    workCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        // Staggered re-entry
        gsap.fromTo(card, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.06,
          ease: 'power3.out'
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   11. GSAP SCROLL-TRIGGERED PARALLAX (subtle)
═══════════════════════════════════════════════════════════ */
gsap.to('.orb-1', {
  y: -120,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
});
gsap.to('.orb-2', {
  y: -80,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
});

/* ═══════════════════════════════════════════════════════════
   12. CONTACT FORM
═══════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
const btnText     = document.getElementById('btn-text');
const btnIcon     = document.getElementById('btn-icon');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const inputs = contactForm.querySelectorAll('[required]');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = '#EF4444';
        inp.addEventListener('input', () => { inp.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;

    // Simulate send
    const btn = document.getElementById('contact-submit');
    btn.disabled = true;
    btnText.textContent = 'Sending…';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Message Sent!';
      btnIcon.className = 'fa-solid fa-check';
      formSuccess.classList.add('visible');
      contactForm.reset();
      // Reset button after 3s
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fa-solid fa-paper-plane';
        formSuccess.classList.remove('visible');
      }, 4000);
    }, 1800);
  });
}

/* ═══════════════════════════════════════════════════════════
   13. GSAP HORIZONTAL TICKER (back-up if CSS animation glitches)
═══════════════════════════════════════════════════════════ */
// CSS handles ticker; no GSAP needed.

/* ═══════════════════════════════════════════════════════════
   14. ABOUT IMAGE TILT EFFECT (subtle mouse parallax)
═══════════════════════════════════════════════════════════ */
const aboutImgWrap = document.getElementById('about-img-wrap');
if (aboutImgWrap) {
  aboutImgWrap.addEventListener('mousemove', (e) => {
    const rect = aboutImgWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(aboutImgWrap, {
      rotationY: x * 8,
      rotationX: -y * 6,
      duration: 0.6,
      ease: 'power3.out',
      transformPerspective: 800,
    });
  });
  aboutImgWrap.addEventListener('mouseleave', () => {
    gsap.to(aboutImgWrap, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' });
  });
}

/* ═══════════════════════════════════════════════════════════
   15. SERVICE CARDS — cursor-tracking glow
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* ═══════════════════════════════════════════════════════════
   16. DOM READY — refresh ScrollTrigger after fonts load
═══════════════════════════════════════════════════════════ */
document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});
