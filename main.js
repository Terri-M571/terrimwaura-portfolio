/* ───────────────────────────────────────
       THEME TOGGLE
    ─────────────────────────────────────── */
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      document.getElementById('theme-toggle').textContent = targetTheme === 'dark' ? '🌙' : '☀️';
    }
    // Load preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    /* ───────────────────────────────────────
       IMAGE DATA
    ─────────────────────────────────────── */
    const gdImages = [
      { src: 'public/assets/new-graphic-design/Design file (5).png' },
      { src: 'public/assets/new-graphic-design/IWD Poster.png' },
      { src: 'public/assets/new-graphic-design/Easter Poster .png' },
      { src: 'public/assets/new-graphic-design/Graphic 1.png' },
      { src: 'public/assets/new-graphic-design/drive change.png' },
      { src: 'public/assets/new-graphic-design/RL.png' },
      { src: 'public/assets/new-graphic-design/Editable-file-(1).png' },
      { src: 'public/assets/new-graphic-design/MINE-Editable-file.png' },
      { src: 'public/assets/new-graphic-design/1752579612512.jpg' },
      { src: 'public/assets/new-graphic-design/1754054448832.jpg' },
      { src: 'public/assets/new-graphic-design/1754919488850.jpg' },
      { src: 'public/assets/new-graphic-design/1755075836257.jpg' },
      { src: 'public/assets/new-graphic-design/1756143078313.jpg' },
      { src: 'public/assets/new-graphic-design/1759745073542.jpg' },
      { src: 'public/assets/new-graphic-design/1761050996259.jpg' },
      { src: 'public/assets/new-graphic-design/1780257969237.jpg' },
      { src: 'public/assets/new-graphic-design/1780662821068.jpg' },
      { src: 'public/assets/new-graphic-design/Call-for-submission-2-A4-landscape.jpg' },
      { src: 'public/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 00.jpg' },
      { src: 'public/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 01.jpg' },
      { src: 'public/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 02.jpg' },
      { src: 'public/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 03.jpg' },
      { src: 'public/assets/new-graphic-design/Uganda.jpg' }
    ];

    const brandImages = [
      { src: 'public/assets/branding/Banner.png' },
      { src: 'public/assets/branding/Orange-Sash.png' },
      { src: 'public/assets/branding/TAGS-2.png' },
      { src: 'public/assets/branding/Tshirt-1-.png' },
      { src: 'public/assets/branding/Umbrella-orange-no-bg.png' },
      { src: 'public/assets/branding/Water-B.png' }
    ];

    const photoImages = [
      { src: 'public/assets/new-photos/IMG_6522.jpg' },
      { src: 'public/assets/new-photos/IMG_6552.jpg' },
      { src: 'public/assets/new-photos/IMG_6620.jpg' },
      { src: 'public/assets/new-photos/IMG_6624.jpg' },
      { src: 'public/assets/new-photos/IMG_6647.jpg' },
      { src: 'public/assets/new-photos/IMG_6724.jpg' },
      { src: 'public/assets/new-photos/IMG_6730.jpg' },
      { src: 'public/assets/new-photos/IMG_6749.jpg' },
      { src: 'public/assets/new-photos/IMG_6758.jpg' },
      { src: 'public/assets/new-photos/IMG_6764.jpg' },
      { src: 'public/assets/new-photos/IMG_6781.jpg' },
      { src: 'public/assets/new-photos/IMG_6786.jpg' },
      { src: 'public/assets/new-photos/IMG_6842.jpg' },
      { src: 'public/assets/new-photos/IMG_7227.jpg' },
      { src: 'public/assets/new-photos/IMG_2172.jpg' },
      { src: 'public/assets/new-photos/IMG_2196.jpg' },
      { src: 'public/assets/new-photos/Kitchen garden edited-6.jpg' },
      { src: 'public/assets/new-photos/Kitchen garden edited-7.jpg' },
      { src: 'public/assets/new-photos/R6CC9653.jpg' },
      { src: 'public/assets/new-photos/R6CC9699.jpg' },
      { src: 'public/assets/new-photos/R6CC9701.jpg' },
      { src: 'public/assets/new-photos/R6CC9704.jpg' },
      { src: 'public/assets/new-photos/R6CC9705.jpg' },
      { src: 'public/assets/new-photos/R6CC9902.jpg' },
      { src: 'public/assets/new-photos/R6CC9965.jpg' },
      { src: 'public/assets/new-photos/R6CC9973.jpg' },
      { src: 'public/assets/new-photos/R6CC9976.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-10.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-11.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-21.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-22.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-32.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-33.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-4.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-49.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-53.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-64.jpg' },
      { src: 'public/assets/new-photos/kORR Hospital edited-72.jpg' }
    ];

    /* ───────────────────────────────────────
       LIGHTBOX
    ─────────────────────────────────────── */
    let lbSet = [], lbIdx = 0;
    function openLB(images, idx) {
      lbSet = images; lbIdx = idx;
      showLB();
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function showLB() {
      const img = lbSet[lbIdx];
      document.getElementById('lb-img').src = img.src;
      document.getElementById('lb-img').alt = "Image View";
      document.getElementById('lb-counter').textContent = `${lbIdx + 1} / ${lbSet.length}`;
    }
    function lbNav(dir) {
      lbIdx = (lbIdx + dir + lbSet.length) % lbSet.length;
      showLB();
    }
    function closeLB() {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('lightbox').addEventListener('click', function(e) {
      if (e.target === this) closeLB();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
    });

    /* ───────────────────────────────────────
       PANELS
    ─────────────────────────────────────── */
    function openPanel(id) {
      document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('open'));
      const panel = document.getElementById('panel-' + id);
      panel.classList.add('open');
      setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      animateToolBars();
    }
    function closePanel(id) {
      document.getElementById('panel-' + id).classList.remove('open');
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ───────────────────────────────────────
       TIMELINE TOGGLE
    ─────────────────────────────────────── */
    function toggleTimeline(card) {
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.tl-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    }

    /* ───────────────────────────────────────
       SMOOTH SCROLL
    ─────────────────────────────────────── */
    function smoothTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ───────────────────────────────────────
       HAMBURGER
    ─────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }

    /* ───────────────────────────────────────
       PROGRESS BAR
    ─────────────────────────────────────── */
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('progress-bar').style.width = `${docH > 0 ? (scrollTop / docH) * 100 : 0}%`;
    }, { passive: true });

    /* ───────────────────────────────────────
       NAVBAR ACTIVE SECTION
    ─────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      const sections = ['contact', 'portfolio', 'experience', 'about', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          navLinks.forEach(l => l.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
          break;
        }
      }
    }, { passive: true });

    /* ───────────────────────────────────────
       SCROLL REVEAL
    ─────────────────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

    /* ───────────────────────────────────────
       ANIMATED COUNTERS
    ─────────────────────────────────────── */
    function animateCounter(el) {
      const end = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 2000;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { el.textContent = end + suffix; clearInterval(timer); }
        else el.textContent = Math.floor(start) + suffix;
      }, 16);
    }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.count[data-count]').forEach(animateCounter);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) counterObserver.observe(statsBar);

    /* ───────────────────────────────────────
       TOOL BAR ANIMATION
    ─────────────────────────────────────── */
    function animateToolBars() {
      document.querySelectorAll('.tool-bar-fill[data-w]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 200);
      });
    }
    const toolObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateToolBars(); toolObserver.disconnect(); } });
    }, { threshold: 0.2 });
    const toolsGrid = document.querySelector('.tools-grid');
    if (toolsGrid) toolObserver.observe(toolsGrid);

    /* ───────────────────────────────────────
       GSAP (bonus flourish on hero)
    ─────────────────────────────────────── */
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.hero-name', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-role', { y: 40, opacity: 0, duration: .8, ease: 'power2.out', delay: 0.5 });
      gsap.from('.hero-desc', { y: 40, opacity: 0, duration: .8, ease: 'power2.out', delay: 0.7 });
      gsap.from('.hero-btns', { y: 30, opacity: 0, duration: .8, ease: 'power2.out', delay: 0.9 });
      gsap.from('.hero-photo-inner', { x: -60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    }