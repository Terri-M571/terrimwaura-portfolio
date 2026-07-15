'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  
  // Timeline open index
  const [openTimeline, setOpenTimeline] = useState<number | null>(0) // default first open

  // Lightbox State
  const [lbOpen, setLbOpen] = useState(false)
  const [lbSet, setLbSet] = useState<{ src: string }[]>([])
  const [lbIdx, setLbIdx] = useState(0)

  // Counter animation state
  const [statsAnimated, setStatsAnimated] = useState(false)

  // Graphic Design filter state
  const [gdFilter, setGdFilter] = useState('all')

  // Theme Toggle Effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  // Smooth Scroll
  const smoothTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Reveal Animations on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    
    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !statsAnimated) {
          setStatsAnimated(true)
        }
      })
    }, { threshold: 0.3 })
    const statsBarEl = document.querySelector('.stats-bar')
    if (statsBarEl) statsObserver.observe(statsBarEl)

    return () => {
      observer.disconnect()
      statsObserver.disconnect()
    }
  }, [statsAnimated])

  // Stat Counter component
  function StatCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
      if (!statsAnimated) return
      let start = 0
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        start += step
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }, [statsAnimated, target, duration])

    return <span>{count}{suffix}</span>
  }

  /* Image datasets */
  const gdImages = [
    { src: '/assets/new-graphic-design/Design file (5).png', cat: 'poster' },
    { src: '/assets/new-graphic-design/IWD Poster.png', cat: 'poster' },
    { src: '/assets/new-graphic-design/Easter Poster .png', cat: 'poster' },
    { src: '/assets/new-graphic-design/Graphic 1.png', cat: 'campaign' },
    { src: '/assets/new-graphic-design/drive change.png', cat: 'campaign' },
    { src: '/assets/new-graphic-design/RL.png', cat: 'campaign' },
    { src: '/assets/new-graphic-design/Editable-file-(1).png', cat: 'template' },
    { src: '/assets/new-graphic-design/MINE-Editable-file.png', cat: 'template' },
    { src: '/assets/new-graphic-design/1752579612512.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1754054448832.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1754919488850.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1755075836257.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1756143078313.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1759745073542.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1761050996259.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1780257969237.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/1780662821068.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Call-for-submission-2-A4-landscape.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 00.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 01.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 02.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 03.jpg', cat: 'poster' },
    { src: '/assets/new-graphic-design/Uganda.jpg', cat: 'poster' }
  ]

  const brandImages = [
    { src: '/assets/branding/Banner.png' },
    { src: '/assets/branding/Orange-Sash.png' },
    { src: '/assets/branding/TAGS-2.png' },
    { src: '/assets/branding/Tshirt-1-.png' },
    { src: '/assets/branding/Umbrella-orange-no-bg.png' },
    { src: '/assets/branding/Water-B.png' }
  ]

  const photoImages = [
    { src: '/assets/new-photos/IMG_6522.jpg' },
    { src: '/assets/new-photos/IMG_6552.jpg' },
    { src: '/assets/new-photos/IMG_6620.jpg' },
    { src: '/assets/new-photos/IMG_6624.jpg' },
    { src: '/assets/new-photos/IMG_6647.jpg' },
    { src: '/assets/new-photos/IMG_6724.jpg' },
    { src: '/assets/new-photos/IMG_6730.jpg' },
    { src: '/assets/new-photos/IMG_6749.jpg' },
    { src: '/assets/new-photos/IMG_6758.jpg' },
    { src: '/assets/new-photos/IMG_6764.jpg' },
    { src: '/assets/new-photos/IMG_6781.jpg' },
    { src: '/assets/new-photos/IMG_6786.jpg' },
    { src: '/assets/new-photos/IMG_6842.jpg' },
    { src: '/assets/new-photos/IMG_7227.jpg' },
    { src: '/assets/new-photos/IMG_2172.jpg' },
    { src: '/assets/new-photos/IMG_2196.jpg' },
    { src: '/assets/new-photos/Kitchen garden edited-6.jpg' },
    { src: '/assets/new-photos/Kitchen garden edited-7.jpg' },
    { src: '/assets/new-photos/R6CC9653.jpg' },
    { src: '/assets/new-photos/R6CC9699.jpg' },
    { src: '/assets/new-photos/R6CC9701.jpg' },
    { src: '/assets/new-photos/R6CC9704.jpg' },
    { src: '/assets/new-photos/R6CC9705.jpg' },
    { src: '/assets/new-photos/R6CC9902.jpg' },
    { src: '/assets/new-photos/R6CC9965.jpg' },
    { src: '/assets/new-photos/R6CC9973.jpg' },
    { src: '/assets/new-photos/R6CC9976.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-10.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-11.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-21.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-22.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-32.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-33.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-4.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-49.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-53.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-64.jpg' },
    { src: '/assets/new-photos/kORR Hospital edited-72.jpg' }
  ]

  const openLightbox = (set: { src: string }[], idx: number) => {
    setLbSet(set)
    setLbIdx(idx)
    setLbOpen(true)
  }

  const navigateLightbox = (dir: number) => {
    setLbIdx((prev) => (prev + dir + lbSet.length) % lbSet.length)
  }

  const handleOpenPanel = (panelId: string) => {
    setActivePanel(panelId)
    setTimeout(() => {
      document.getElementById('panel-' + panelId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // animate custom skill bars if present
      document.querySelectorAll('.tool-bar-fill[data-w]').forEach((el) => {
        const bar = el as HTMLElement
        bar.style.width = bar.dataset.w + '%'
      })
    }, 100)
  }

  const handleClosePanel = (panelId: string) => {
    setActivePanel(null)
    smoothTo('portfolio')
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --blue:       #0468fb;
          --blue-dark:  #024ebc;
          --blue-deep:  #013580;
          --blue-light: #e6f0ff;
          --orange:     #FB9704;
          --orange-hov: #d67f02;
          --white:      #FFFFFF;
          --bg:         #F8FAFC;
          --bg-card:    #FFFFFF;
          --text:       #0F172A;
          --muted:      #475569;
          --border:     #E2E8F0;
          --shadow:     0 4px 24px rgba(4,104,251,.08);
          --shadow-hov: 0 8px 40px rgba(4,104,251,.16);
          --toggle-bg:  #E2E8F0;
        }

        [data-theme="dark"] {
          --blue-light: #0d2547;
          --bg:         #090D16;
          --bg-card:    #111827;
          --text:       #F1F5F9;
          --muted:      #94A3B8;
          --border:     #1F2937;
          --shadow:     0 4px 24px rgba(0,0,0,.3);
          --shadow-hov: 0 8px 40px rgba(0,0,0,.5);
          --toggle-bg:  #1F2937;
        }

        body {
          background-color: var(--bg);
          color: var(--text);
          transition: background-color .3s ease, color .3s ease;
        }

        /* Prevent auto-hyphens */
        h1, h2, h3, h4, h5, p, span, a, li {
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -ms-hyphens: none !important;
        }

        .reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-left {
          opacity: 0; transform: translateX(-30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .reveal-left.visible { opacity: 1; transform: none; }
        .reveal-right {
          opacity: 0; transform: translateX(30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .reveal-right.visible { opacity: 1; transform: none; }
        
        .d1 { transition-delay: .1s; }
        .d2 { transition-delay: .2s; }
        .d3 { transition-delay: .3s; }
        .d4 { transition-delay: .4s; }
        .d5 { transition-delay: .5s; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 3px; }

        /* Ticker Animation */
        .ticker-wrap {
          background: var(--blue-dark); overflow: hidden;
          padding: 14px 0; border-top: 1px solid rgba(255,255,255,.1);
        }
        .ticker-track {
          display: flex; width: max-content; gap: 0;
          animation: ticker 30s linear infinite;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track span {
          display: inline-block; white-space: nowrap;
          color: rgba(255,255,255,.7); font-size: .8rem;
          font-weight: 500; letter-spacing: .08em; padding: 0 24px;
        }
        .ticker-track .sep { color: var(--orange); }

        /* Timeline and utilities */
        .timeline { position: relative; padding-left: 52px; }
        .timeline::before {
          content: ''; position: absolute; left: 20px; top: 0; bottom: 0;
          width: 2px; background: var(--border);
        }
        .tl-item { position: relative; margin-bottom: 24px; }
        .tl-dot {
          position: absolute; left: -40px; top: 16px;
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--blue); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: .85rem;
          box-shadow: 0 0 0 4px var(--bg);
        }
        .tl-dot.orange { background: var(--orange); }
        .tl-card {
          background: var(--bg-card); border-radius: 16px;
          padding: 24px; border: 2px solid transparent;
          box-shadow: var(--shadow); cursor: pointer;
          transition: all .3s ease;
        }
        .tl-card:hover, .tl-card.open { border-color: var(--blue); }
        .tl-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .tl-org { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--text); }
        .tl-role { color: var(--blue); font-weight: 600; font-size: .85rem; margin-top: 3px; }
        .tl-meta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
        .tl-meta span { color: var(--muted); font-size: .78rem; }
        .tl-chevron {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--bg); color: var(--muted);
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; flex-shrink: 0;
          transition: all .3s ease;
        }
        .tl-card.open .tl-chevron { background: var(--blue); color: #fff; transform: rotate(180deg); }
        .tl-body { display: none; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
        .tl-card.open .tl-body { display: block; }
        .tl-body ul { display: flex; flex-direction: column; gap: 8px; }
        .tl-body li { display: flex; gap: 8px; color: var(--muted); font-size: .88rem; line-height: 1.6; }
        .tl-body li::before { content: '▸'; color: var(--orange); flex-shrink: 0; margin-top: 2px; }

        /* Tools grid */
        .tools-desc {
          color: var(--muted); font-size: .9rem; line-height: 1.7; margin-bottom: 28px;
        }
        .tools-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        @media (min-width: 480px) { .tools-grid { grid-template-columns: repeat(2, 1fr); } }
        .tool-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 16px; text-align: center;
          transition: all .3s ease; cursor: default;
        }
        .tool-card:hover {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px var(--blue-light), var(--shadow);
          transform: translateY(-3px);
        }
        .tool-icon { font-size: 1.8rem; margin-bottom: 8px; }
        .tool-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: .8rem; color: var(--text); line-height: 1.3; margin-bottom: 8px; }
        .tool-bar-wrap { background: var(--bg); border-radius: 4px; height: 4px; overflow: hidden; margin-bottom: 4px; }
        .tool-bar-fill { height: 100%; background: var(--blue); border-radius: 4px; transition: width 1.5s ease; }
        .tool-pct { font-size: .7rem; color: var(--blue); font-weight: 600; }
        .tool-cat { font-size: .65rem; background: rgba(251,151,4,.1); color: var(--orange); font-weight: 600; padding: 2px 8px; border-radius: 100px; margin-top: 4px; display: inline-block; }

        /* Masonry Grid */
        .masonry {
          columns: 1; gap: 16px;
        }
        @media (min-width: 640px) { .masonry { columns: 2; } }
        @media (min-width: 1024px) { .masonry { columns: 3; } }
        .masonry-item {
          break-inside: avoid; margin-bottom: 16px;
          border-radius: 16px; overflow: hidden;
          box-shadow: var(--shadow); cursor: pointer;
          transition: all .3s ease; position: relative;
        }
        .masonry-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-hov); }
        .masonry-item img { width: 100%; display: block; transition: transform .5s ease; }
        .masonry-item:hover img { transform: scale(1.04); }
        .masonry-item .m-overlay {
          position: absolute; inset: 0;
          background: rgba(4,104,251,.85);
          opacity: 0; transition: opacity .3s ease;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 20px; text-align: center;
        }
        .masonry-item:hover .m-overlay { opacity: 1; }
        .m-overlay .m-zoom { font-size: 1.8rem; }
        .photo-overlay {
          position: absolute; inset: 0;
          background: rgba(4,104,251,.82);
          opacity: 0; transition: opacity .3s ease;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 20px; text-align: center;
        }
        .masonry-item:hover .photo-overlay { opacity: 1; }

        /* Video cards */
        .video-grid {
          display: grid; grid-template-columns: 1fr; gap: 20px;
        }
        @media (min-width: 640px) { .video-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .video-grid { grid-template-columns: repeat(2, 1fr); } }

        .video-card {
          background: var(--bg-card); border-radius: 16px; overflow: hidden;
          box-shadow: var(--shadow); transition: all .3s ease;
          display: block; position: relative;
        }
        .video-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hov); }
        
        .video-card-thumb {
          position: relative; width: 100%; padding-bottom: 56.25%; /* 16:9 ratio */
          height: 0; overflow: hidden; cursor: pointer; background: #000;
        }
        .video-card-thumb img {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease, opacity 0.3s ease;
        }
        .video-card-thumb:hover img {
          transform: scale(1.04);
          opacity: 0.85;
        }
        .video-play-btn {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 60px; height: 60px; border-radius: 50%; background: var(--orange);
          display: flex; align-items: center; justify-content: center; z-index: 2;
          box-shadow: 0 4px 20px rgba(251,151,4,0.4); transition: transform 0.3s ease, background 0.3s ease;
        }
        .video-play-btn svg {
          width: 22px; height: 22px; fill: #fff; margin-left: 4px;
        }
        .video-card-thumb:hover .video-play-btn {
          transform: translate(-50%, -50%) scale(1.1);
          background: var(--orange-hov);
        }

        .video-embed-wrap {
          position: relative; padding-bottom: 56.25%; /* 16:9 ratio */
          height: 0; overflow: hidden; background: #000;
        }
        .video-embed-wrap iframe {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;
        }
        .video-info { padding: 20px; }
        .video-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 8px; }
        .video-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .video-tag { background: var(--blue-light); color: var(--blue); font-size: .68rem; font-weight: 600; padding: 3px 8px; border-radius: 100px; }
      `}</style>

      {/* Progress Bar */}
      <div id="progress-bar" style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        background: 'var(--orange)', zIndex: 9999,
        width: '0%', transition: 'width .1s linear'
      }}></div>

      {/* NAVBAR */}
      <nav id="navbar" className={theme === 'dark' ? 'bg-slate-900 border-b border-slate-800' : 'bg-un-blue'}>
        <div className="nav-inner flex items-center justify-between h-[70px] max-w-[1280px] mx-auto px-6">
          <a href="#hero" className="nav-logo font-heading font-bold text-white text-xl" onClick={(e) => { e.preventDefault(); smoothTo('hero') }}>
            Terri<span className="text-orange">.</span>
          </a>
          <ul className="nav-links hidden md:flex items-center gap-9">
            <li><a href="#about"      className="nav-link text-white/90 font-medium text-sm" onClick={(e) => { e.preventDefault(); smoothTo('about') }}>About</a></li>
            <li><a href="#experience" className="nav-link text-white/90 font-medium text-sm" onClick={(e) => { e.preventDefault(); smoothTo('experience') }}>Experience</a></li>
            <li><a href="#portfolio"  className="nav-link text-white/90 font-medium text-sm" onClick={(e) => { e.preventDefault(); smoothTo('portfolio') }}>Portfolio</a></li>
            <li><a href="#contact"    className="nav-link text-white/90 font-medium text-sm" onClick={(e) => { e.preventDefault(); smoothTo('contact') }}>Contact</a></li>
          </ul>
          <div className="nav-controls flex items-center gap-4">
            <button className="theme-toggle w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center text-lg" onClick={toggleTheme}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <a href="mailto:mwauraterri@gmail.com" className="nav-cta hidden md:inline-flex bg-orange text-white font-semibold py-2 px-6 rounded-full text-sm">Get In Touch</a>
            <button className="hamburger flex flex-col gap-1.5 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden fixed top-[70px] left-0 right-0 z-[999] bg-un-blue-dark max-h-0 overflow-hidden transition-all duration-300 ${menuOpen ? 'open max-h-[420px]' : ''}`}>
        <a href="#about"      className="block p-4 border-b border-white/10 text-white font-medium" onClick={() => { setMenuOpen(false); smoothTo('about') }}>About</a>
        <a href="#experience" className="block p-4 border-b border-white/10 text-white font-medium" onClick={() => { setMenuOpen(false); smoothTo('experience') }}>Experience</a>
        <a href="#portfolio"  className="block p-4 border-b border-white/10 text-white font-medium" onClick={() => { setMenuOpen(false); smoothTo('portfolio') }}>Portfolio</a>
        <a href="#contact"    className="block p-4 border-b border-white/10 text-white font-medium" onClick={() => { setMenuOpen(false); smoothTo('contact') }}>Contact</a>
        <a href="mailto:mwauraterri@gmail.com" className="mobile-cta block mx-6 my-4 bg-orange text-white text-center py-3 rounded-full font-semibold">mwauraterri@gmail.com</a>
      </div>

      {/* HERO */}
      <section id="hero" className="min-h-[85vh] flex items-center pt-28 pb-20 relative overflow-hidden bg-un-blue">
        <div className="hero-bg-shape s1"></div>
        <div className="hero-bg-shape s2"></div>
        <div className="container">
          <div className="hero-grid grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo */}
            <div className="hero-photo-wrap flex justify-center lg:justify-end order-1 lg:order-none">
              <div className="hero-photo-inner relative float-anim">
                <div className="hero-photo-ring"></div>
                <div className="hero-photo w-[260px] h-[320px] sm:w-[320px] sm:h-[390px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="/assets/photos/profile.jpg" className="w-full h-full object-cover object-top" alt="Terri Mwaura" />
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="hero-text text-white">
              <div className="hero-pill inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase mb-5">
                <div className="hero-pill-dot w-2 h-2 rounded-full bg-orange"></div>
                Communications &amp; Multimedia Specialists
              </div>
              <h1 className="hero-name font-heading font-bold text-5xl sm:text-7xl leading-none mb-4">
                Terri<br /><span className="text-orange">Mwaura</span>
              </h1>
              <p className="hero-role text-white/90 font-medium text-lg mb-5">Communications &amp; Multimedia Specialists</p>
              <p className="hero-desc text-white/80 text-sm sm:text-base leading-relaxed max-w-[540px] mb-8">
                A Communications and Multimedia Specialist who loves telling real stories that inspire people and create impact — through graphic design, video, photography, and digital content for international NGOs and development organisations.
              </p>
              <div className="hero-btns flex flex-wrap gap-4">
                <button className="btn-primary" onClick={() => smoothTo('portfolio')}>View Portfolio →</button>
                <button className="btn-outline" onClick={() => smoothTo('contact')}>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-track">
            <span>Communications and Multimedia Specialists</span><span className="sep">✦</span>
            <span>Graphic Design</span><span className="sep">✦</span>
            <span>Photography</span><span className="sep">✦</span>
            <span>Videography</span><span className="sep">✦</span>
            <span>Brand Identity</span><span className="sep">✦</span>
            <span>Publication Design</span><span className="sep">✦</span>
            <span>Social Media Strategy</span><span className="sep">✦</span>
            <span>Storytelling</span><span className="sep">✦</span>
            <span>NGO Communications</span><span className="sep">✦</span>
            <span>Communications and Multimedia Specialists</span><span className="sep">✦</span>
            <span>Graphic Design</span><span className="sep">✦</span>
            <span>Photography</span><span className="sep">✦</span>
            <span>Videography</span><span className="sep">✦</span>
            <span>Brand Identity</span><span className="sep">✦</span>
            <span>Publication Design</span><span className="sep">✦</span>
            <span>Social Media Strategy</span><span className="sep">✦</span>
            <span>Storytelling</span><span className="sep">✦</span>
            <span>NGO Communications</span><span className="sep">✦</span>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section bg-card transition-colors duration-300">
        <div className="container">
          <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="reveal-left">
              <div className="about-img-wrap relative">
                <div className="about-img-deco1"></div>
                <div className="about-img-deco2"></div>
                <div className="about-img-frame relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img src="/assets/photos/profile.jpg" className="w-full aspect-[4/5] object-cover object-top" alt="Terri Mwaura" />
                  <div className="about-img-strip bg-blue p-5">
                    <div className="name text-white font-heading font-semibold text-lg">Teresia Mwaura</div>
                    <div className="role text-white/70 text-sm mt-0.5">Communications &amp; Multimedia Specialists</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="reveal-right">
              <div className="section-eyebrow">About Me</div>
              <h2 className="section-title">Telling Stories That<br /><span className="accent">Matter &amp; Create Impact</span></h2>
              <p className="about-text">
                Hello, nice to meet you. My name is Teresia Mwaura — a <strong>Communications and Multimedia Specialist</strong> who loves telling real stories that inspire people and create impact.
              </p>
              <p className="about-text">
                I use my skills in graphic design, video editing, photography, and social media management to bring ideas to life and connect people to purpose. Working in the humanitarian and development world has taught me the power of stories to move hearts and make a difference.
              </p>
              <p className="about-text">
                Whether I'm designing, filming, or creating digital content, my goal is simple: to <em>share stories that matter</em> and help others see the good happening around us.
              </p>
              <div className="skill-tags">
                <span className="skill-tag">Communications</span>
                <span className="skill-tag">Graphic Design</span>
                <span className="skill-tag">Photography</span>
                <span className="skill-tag">Videography</span>
                <span className="skill-tag">Publications</span>
                <span className="skill-tag">Digital Media</span>
                <span className="skill-tag">NGO Specialist</span>
              </div>
              <div style={{ marginTop: '36px' }}>
                <button className="btn-blue-outline" onClick={() => smoothTo('contact')}>Work With Me →</button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar bg-blue rounded-3xl p-10 reveal" style={{ marginTop: '80px' }}>
            <div className="stats-bar-label text-center text-white/60 text-xs font-bold tracking-widest uppercase mb-9">Impact by the numbers</div>
            <div className="stats-bar-grid">
              <div className="stat-box text-center">
                <div className="count text-orange font-heading font-bold text-4xl">
                  <StatCounter target={3} suffix="+" />
                </div>
                <div className="title text-white font-semibold text-sm mt-1.5">Years Experience</div>
                <div className="sub text-white/70 text-xs mt-1">In humanitarian &amp; development communications</div>
              </div>
              <div className="stat-box text-center">
                <div className="count text-orange font-heading font-bold text-4xl">
                  <StatCounter target={5} suffix="" />
                </div>
                <div className="title text-white font-semibold text-sm mt-1.5">Organisations</div>
                <div className="sub text-white/70 text-xs mt-1">WV Kenya, WV East Africa, Plan International, FilmAid Kenya, IHF</div>
              </div>
              <div className="stat-box text-center">
                <div className="count text-orange font-heading font-bold text-4xl">
                  <StatCounter target={50} suffix="+" />
                </div>
                <div className="title text-white font-semibold text-sm mt-1.5">Creative Projects</div>
                <div className="sub text-white/70 text-xs mt-1">Designs, videos, publications &amp; multimedia assets</div>
              </div>
              <div className="stat-box text-center">
                <div className="count text-orange font-heading font-bold text-4xl">
                  <StatCounter target={13} suffix="+" />
                </div>
                <div className="title text-white font-semibold text-sm mt-1.5">Publications Designed</div>
                <div className="sub text-white/70 text-xs mt-1">Capacity statements, reports &amp; dashboards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & TOOLS */}
      <section id="experience" className="section bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="container">
          <div className="section-header text-center mb-[60px]">
            <div className="section-eyebrow justify-center display-flex">My Journey</div>
            <h2 className="section-title">Experience &amp; Tools</h2>
            <p className="section-sub mx-auto">A proven track record delivering impactful communications across international development and humanitarian organisations.</p>
          </div>

          <div className="exp-tools-grid">
            {/* Timeline */}
            <div className="reveal-left">
              <h3 className="font-heading font-bold text-lg text-text mb-8 flex items-center gap-3">
                <span className="inline-block w-8 h-1 bg-blue"></span>
                Professional Experience
              </h3>
              <div className="timeline">
                {/* FilmAid Kenya */}
                <div className="tl-item">
                  <div className="tl-dot">1</div>
                  <div className={`tl-card ${openTimeline === 0 ? 'open border-blue' : ''}`} onClick={() => setOpenTimeline(openTimeline === 0 ? null : 0)}>
                    <div className="tl-card-head">
                      <div>
                        <div className="tl-org font-heading font-bold text-base">FilmAid Kenya</div>
                        <div className="tl-role text-blue font-semibold text-xs mt-0.5">Communication Consultant</div>
                        <div className="tl-meta flex flex-wrap gap-3 mt-2">
                          <span className="text-xs text-muted">📅 June 2026 – Present</span>
                          <span className="text-xs text-muted">📍 Nairobi, Kenya</span>
                        </div>
                      </div>
                      <div className="tl-chevron text-xs">▼</div>
                    </div>
                    <div className="tl-body mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-muted">Designs and produces branded visual communication materials, including reports, brochures, banners, posters, infographics, social media graphics, and awareness campaigns.</li>
                        <li className="flex gap-2 text-sm text-muted">Develops creative concepts aligned with organizational branding.</li>
                        <li className="flex gap-2 text-sm text-muted">Manages end-to-end design projects and event branding.</li>
                        <li className="flex gap-2 text-sm text-muted">Collaborates with programme teams and vendors.</li>
                        <li className="flex gap-2 text-sm text-muted">Maintains digital asset libraries.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* IHF */}
                <div className="tl-item">
                  <div className="tl-dot">2</div>
                  <div className={`tl-card ${openTimeline === 1 ? 'open border-blue' : ''}`} onClick={() => setOpenTimeline(openTimeline === 1 ? null : 1)}>
                    <div className="tl-card-head">
                      <div>
                        <div className="tl-org font-heading font-bold text-base">International Humanity Foundation</div>
                        <div className="tl-role text-blue font-semibold text-xs mt-0.5">Graphic Designer (Part time Volunteer)</div>
                        <div className="tl-meta flex flex-wrap gap-3 mt-2">
                          <span className="text-xs text-muted">📅 May 2026 – Present</span>
                          <span className="text-xs text-muted">📍 Graphics Team</span>
                        </div>
                      </div>
                      <div className="tl-chevron text-xs">▼</div>
                    </div>
                    <div className="tl-body mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-muted">Designed visual assets for humanitarian programmes.</li>
                        <li className="flex gap-2 text-sm text-muted">Turned programme data into donor-facing content.</li>
                        <li className="flex gap-2 text-sm text-muted">Maintained brand consistency.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* World Vision Kenya */}
                <div className="tl-item">
                  <div className="tl-dot">3</div>
                  <div className={`tl-card ${openTimeline === 2 ? 'open border-blue' : ''}`} onClick={() => setOpenTimeline(openTimeline === 2 ? null : 2)}>
                    <div className="tl-card-head">
                      <div>
                        <div className="tl-org font-heading font-bold text-base">World Vision Kenya</div>
                        <div className="tl-role text-blue font-semibold text-xs mt-0.5">Communications Professional</div>
                        <div className="tl-meta flex flex-wrap gap-3 mt-2">
                          <span className="text-xs text-muted">📅 Jan 2026 – March 2026</span>
                          <span className="text-xs text-muted">📍 Nairobi, Kenya</span>
                        </div>
                      </div>
                      <div className="tl-chevron text-xs">▼</div>
                    </div>
                    <div className="tl-body mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-muted">Produced the Imara Report — a flagship publication for World Vision Kenya.</li>
                        <li className="flex gap-2 text-sm text-muted">Managed social media platforms and digital content strategy.</li>
                        <li className="flex gap-2 text-sm text-muted">Designed print and digital materials for campaigns and field activities.</li>
                        <li className="flex gap-2 text-sm text-muted">Captured photography and video for field stories and donor communication.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* World Vision East Africa */}
                <div className="tl-item">
                  <div className="tl-dot">4</div>
                  <div className={`tl-card ${openTimeline === 3 ? 'open border-blue' : ''}`} onClick={() => setOpenTimeline(openTimeline === 3 ? null : 3)}>
                    <div className="tl-card-head">
                      <div>
                        <div className="tl-org font-heading font-bold text-base">World Vision East Africa</div>
                        <div className="tl-role text-blue font-semibold text-xs mt-0.5">Communications &amp; Multimedia Specialist</div>
                        <div className="tl-meta flex flex-wrap gap-3 mt-2">
                          <span className="text-xs text-muted">📅 October 2024 – December 2025</span>
                          <span className="text-xs text-muted">📍 Nairobi, Kenya</span>
                        </div>
                      </div>
                      <div className="tl-chevron text-xs">▼</div>
                    </div>
                    <div className="tl-body mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-muted">Leading communications, media production, and visual storytelling for World Vision East Africa's programmes.</li>
                        <li className="flex gap-2 text-sm text-muted">Producing annual reports, photography campaigns, video documentaries, and social media content that showcases the impact of humanitarian work across 9 countries in the region.</li>
                        <li className="flex gap-2 text-sm text-muted">Designed capacity statements used in donor reporting and stakeholder engagement.</li>
                        <li className="flex gap-2 text-sm text-muted">Created quarterly performance dashboards and situation report templates.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Plan International */}
                <div className="tl-item">
                  <div className="tl-dot orange">5</div>
                  <div className={`tl-card ${openTimeline === 4 ? 'open border-blue' : ''}`} onClick={() => setOpenTimeline(openTimeline === 4 ? null : 4)}>
                    <div className="tl-card-head">
                      <div>
                        <div className="tl-org font-heading font-bold text-base">Plan International MEESA</div>
                        <div className="tl-role text-blue font-semibold text-xs mt-0.5">Social Media Marketer &amp; Manager</div>
                        <div className="tl-meta flex flex-wrap gap-3 mt-2">
                          <span className="text-xs text-muted">📅 March 2024 – September 2024</span>
                          <span className="text-xs text-muted">📍 Nairobi, Kenya</span>
                        </div>
                      </div>
                      <div className="tl-chevron text-xs">▼</div>
                    </div>
                    <div className="tl-body mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-muted">Supported the communications team in managing digital platforms, creating engaging content, and capturing impactful photos that told stories from the field.</li>
                        <li className="flex gap-2 text-sm text-muted">I developed FY25 annual Reports and capacity statements.</li>
                        <li className="flex gap-2 text-sm text-muted">Strengthened the organisation's online presence and connected field programmes to donors.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="reveal-right">
              <h3 className="font-heading font-bold text-lg text-text mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-1 bg-orange"></span>
                Tools I Use
              </h3>
              <p className="tools-desc">
                I am proficient in a range of creative tools for storytelling and communications within international NGOs — producing industry-standard designs and videos that strengthen narrative impact across multiple platforms.
              </p>
              <div className="tools-grid">
                <div className="tool-card"><div className="tool-icon">🎨</div><div className="tool-name">Adobe Photoshop</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '95%' }}></div></div><div className="tool-pct">95%</div><div className="tool-cat">Design</div></div>
                <div className="tool-card"><div className="tool-icon">✏️</div><div className="tool-name">Adobe Illustrator</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '90%' }}></div></div><div className="tool-pct">90%</div><div className="tool-cat">Design</div></div>
                <div className="tool-card"><div className="tool-icon">📄</div><div className="tool-name">Adobe InDesign</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '92%' }}></div></div><div className="tool-pct">92%</div><div className="tool-cat">Publishing</div></div>
                <div className="tool-card"><div className="tool-icon">🎬</div><div className="tool-name">Premiere Pro</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '85%' }}></div></div><div className="tool-pct">85%</div><div className="tool-cat">Video</div></div>
                <div className="tool-card"><div className="tool-icon">📷</div><div className="tool-name">Lightroom</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '88%' }}></div></div><div className="tool-pct">88%</div><div className="tool-cat">Photography</div></div>
                <div className="tool-card"><div className="tool-icon">✨</div><div className="tool-name">After Effects</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '75%' }}></div></div><div className="tool-pct">75%</div><div className="tool-cat">Motion</div></div>
                <div className="tool-card"><div className="tool-icon">🖼️</div><div className="tool-name">Canva Pro</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '98%' }}></div></div><div className="tool-pct">98%</div><div className="tool-cat">Design</div></div>
                <div className="tool-card"><div className="tool-icon">🌐</div><div className="tool-name">WordPress</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '80%' }}></div></div><div className="tool-pct">80%</div><div className="tool-cat">Web</div></div>
                <div className="tool-card"><div className="tool-icon">📧</div><div className="tool-name">Mailchimp</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '85%' }}></div></div><div className="tool-pct">85%</div><div className="tool-cat">Marketing</div></div>
                <div className="tool-card"><div className="tool-icon">🔗</div><div className="tool-name">Google Workspace</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '98%' }}></div></div><div className="tool-pct">98%</div><div className="tool-cat">Productivity</div></div>
                <div className="tool-card"><div className="tool-icon">📑</div><div className="tool-name">Adobe Acrobat</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '95%' }}></div></div><div className="tool-pct">95%</div><div className="tool-cat">Publishing</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="portfolio-intro reveal text-center mb-16">
            <div className="section-eyebrow justify-center display-flex">My Work</div>
            <h2 className="section-title">Portfolio</h2>
            <p className="section-sub mx-auto">A curated showcase of creative work delivered across international development and humanitarian organisations — from design and publications to photography and video.</p>
          </div>

          {/* 5 Cards */}
          <div className="cat-grid">
            <div className="cat-card reveal d1" onClick={() => handleOpenPanel('graphic-design')}>
              <div className="cat-card-img">
                <img src="/assets/new-graphic-design/Design file (5).png" alt="Graphic Design" />
                <div className="cat-card-overlay"></div>
                <div className="cat-card-icon">🎨</div>
                <div className="cat-card-badge">23 Posters</div>
              </div>
              <div className="cat-card-body">
                <div className="cat-card-title">Graphic Design</div>
                <div className="cat-card-desc">Posters, social media graphics, event materials, and digital campaigns for international NGOs.</div>
                <div className="cat-card-link">Explore <span>→</span></div>
              </div>
            </div>

            <div className="cat-card reveal d2" onClick={() => handleOpenPanel('publications')}>
              <div className="cat-card-img">
                <img src="/assets/graphic-design/Graphic-1.png" alt="Publications" />
                <div className="cat-card-overlay"></div>
                <div className="cat-card-icon">📚</div>
                <div className="cat-card-badge">13 Publications</div>
              </div>
              <div className="cat-card-body">
                <div className="cat-card-title">Publications</div>
                <div className="cat-card-desc">Capacity statements, annual reports, dashboards, and situation reports for World Vision East Africa.</div>
                <div className="cat-card-link">Explore <span>→</span></div>
              </div>
            </div>

            <div className="cat-card reveal d3" onClick={() => handleOpenPanel('branding')}>
              <div className="cat-card-img">
                <img src="/assets/branding/Banner.png" alt="Branding" />
                <div className="cat-card-overlay"></div>
                <div className="cat-card-icon">✨</div>
                <div className="cat-card-badge">6 Assets</div>
              </div>
              <div className="cat-card-body">
                <div className="cat-card-title">Branding</div>
                <div className="cat-card-desc">Roll-up banners, merchandise, campaign materials, and brand assets for regional programmes.</div>
                <div className="cat-card-link">Explore <span>→</span></div>
              </div>
            </div>

            <div className="cat-card reveal d4" onClick={() => handleOpenPanel('photography')}>
              <div className="cat-card-img">
                <img src="/assets/new-photos/IMG_6522.jpg" alt="Photography" />
                <div className="cat-card-overlay"></div>
                <div className="cat-card-icon">📷</div>
                <div className="cat-card-badge">38 Photos</div>
              </div>
              <div className="cat-card-body">
                <div className="cat-card-title">Photography</div>
                <div className="cat-card-desc">Event documentation, humanitarian field photography, and portrait photography across East Africa.</div>
                <div className="cat-card-link">Explore <span>→</span></div>
              </div>
            </div>

            <div className="cat-card reveal d5" onClick={() => handleOpenPanel('videography')}>
              <div className="cat-card-img">
                <img src="/assets/new-photos/IMG_6620.jpg" alt="Videography" />
                <div className="cat-card-overlay"></div>
                <div className="cat-card-icon">🎬</div>
                <div className="cat-card-badge">Watch Reel</div>
              </div>
              <div className="cat-card-body">
                <div className="cat-card-title">Videography</div>
                <div className="cat-card-desc">Video production, editing, and storytelling for World Vision East Africa and Plan International.</div>
                <div className="cat-card-link">Explore <span>→</span></div>
              </div>
            </div>
          </div>

          {/* GRAPHIC DESIGN PANEL */}
          <div className={`gallery-panel ${activePanel === 'graphic-design' ? 'open' : ''}`} id="panel-graphic-design">
            <div className="panel-header">
              <div>
                <div className="section-eyebrow">Portfolio</div>
                <div className="panel-title">🎨 Graphic Design</div>
              </div>
              <button className="panel-close" onClick={() => handleClosePanel('graphic-design')}>✕</button>
            </div>
            <div className="filter-bar flex gap-2 mb-8 flex-wrap">
              <button className={`filter-btn ${gdFilter === 'all' ? 'active' : ''}`} onClick={() => setGdFilter('all')}>All</button>
              <button className={`filter-btn ${gdFilter === 'poster' ? 'active' : ''}`} onClick={() => setGdFilter('poster')}>Posters</button>
              <button className={`filter-btn ${gdFilter === 'campaign' ? 'active' : ''}`} onClick={() => setGdFilter('campaign')}>Campaigns</button>
              <button className={`filter-btn ${gdFilter === 'template' ? 'active' : ''}`} onClick={() => setGdFilter('template')}>Templates</button>
            </div>
            <div className="masonry">
              {gdImages.map((img, i) => (
                <div key={i} className="masonry-item" style={{ display: gdFilter === 'all' || img.cat === gdFilter ? 'block' : 'none' }} onClick={() => openLightbox(gdImages, i)}>
                  <img src={img.src} alt={`Poster ${i}`} />
                  <div className="m-overlay"><div className="m-zoom">🔍</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* PUBLICATIONS PANEL */}
          <div className={`gallery-panel ${activePanel === 'publications' ? 'open' : ''}`} id="panel-publications">
            <div className="panel-header">
              <div>
                <div className="section-eyebrow">Digital Library</div>
                <div className="panel-title">📚 Publications</div>
              </div>
              <button className="panel-close" onClick={() => handleClosePanel('publications')}>✕</button>
            </div>
            <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.8rem' }}>📂</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Full Publications Library</div>
                <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>All 13 documents available on Google Drive</div>
              </div>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Drive →</a>
            </div>
            <div className="pub-grid">
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>📗</span><div className="pub-type-badge">Annual Report</div></div><div className="pub-body"><div className="pub-title">A5 Imara Report</div><div className="pub-desc">Flagship publication documenting World Vision Kenya's impact and programme results across communities.</div><div className="pub-footer"><span className="pub-org">World Vision Kenya · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🛡️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Child Protection &amp; Participation</div><div className="pub-desc">Capacity statement highlighting expertise in child protection and participation across the East Africa region.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>💼</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Economic Empowerment &amp; Livelihoods</div><div className="pub-desc">Documenting capabilities and impact in economic empowerment and sustainable livelihoods programmes.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🏥</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Health &amp; Nutrition</div><div className="pub-desc">Overview of programme expertise and reach in health and nutrition across East Africa.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#FB9704' }}><span>🚨</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Humanitarian &amp; Emergency Affairs</div><div className="pub-desc">Showcasing humanitarian response capabilities and emergency preparedness expertise.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🕊️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Peacebuilding &amp; Conflict Sensitivity</div><div className="pub-desc">Highlighting peacebuilding approaches and conflict-sensitive programming work.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>📖</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">ESCA Capacity Statement</div><div className="pub-desc">Expertise in education, social cohesion and accountability programming.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🌱</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Environment Capacity Statement</div><div className="pub-desc">Environmental programming, climate resilience, and natural resource management capacity.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#FB9704' }}><span>📊</span><div className="pub-type-badge">Dashboard</div></div><div className="pub-body"><div className="pub-title">FY24 Q1 Dashboard</div><div className="pub-desc">Quarterly performance dashboard consolidating key indicators and programme milestones for FY2024 Q1.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>⚧️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">GEDSI Capacity Statement</div><div className="pub-desc">Gender Equality, Disability and Social Inclusion capacity for donor and partner engagement.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>🗺️</span><div className="pub-type-badge">Regional Brief</div></div><div className="pub-body"><div className="pub-title">Regional Context Overview</div><div className="pub-desc">Strategic overview of the regional context and programming landscape across East Africa.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>📋</span><div className="pub-type-badge">Template</div></div><div className="pub-body"><div className="pub-title">Sitrep Template</div><div className="pub-desc">Situation Report template for standardised field reporting across emergency and development programmes.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
              <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener noreferrer" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>💧</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">WASH Capacity Statement</div><div className="pub-desc">Water, Sanitation and Hygiene capacity documenting programme expertise and community impact.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
            </div>
          </div>

          {/* BRANDING PANEL */}
          <div className={`gallery-panel ${activePanel === 'branding' ? 'open' : ''}`} id="panel-branding">
            <div className="panel-header">
              <div>
                <div className="section-eyebrow">Portfolio</div>
                <div className="panel-title">✨ Branding</div>
              </div>
              <button className="panel-close" onClick={() => handleClosePanel('branding')}>✕</button>
            </div>
            <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>📂 Branding Catalogs &amp; Folders</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="https://drive.google.com/file/d/1981qZfaKTI9TtNuYaa7XicY9DD9gihxN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Branding Catalogue →</a>
                <a href="https://drive.google.com/drive/folders/1dd-mV95e49AfbExrWdrpJYcIsrb_dKWp?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem', background: 'var(--blue)' }}>Open More Banners Folder →</a>
              </div>
            </div>
            <div className="brand-grid">
              {brandImages.map((img, i) => (
                <div key={i} className="brand-card" onClick={() => openLightbox(brandImages, i)}>
                  <div className="brand-img">
                    <img src={img.src} alt={`Branding ${i}`} />
                    <div className="hover-label">View Full Size 🔍</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHOTOGRAPHY PANEL */}
          <div className={`gallery-panel ${activePanel === 'photography' ? 'open' : ''}`} id="panel-photography">
            <div className="panel-header">
              <div>
                <div className="section-eyebrow">Visual Stories</div>
                <div className="panel-title">📷 Photography</div>
              </div>
              <button className="panel-close" onClick={() => handleClosePanel('photography')}>✕</button>
            </div>
            <div className="masonry">
              {photoImages.map((img, i) => (
                <div key={i} className="masonry-item" onClick={() => openLightbox(photoImages, i)}>
                  <img src={img.src} alt={`Photo ${i}`} />
                  <div className="photo-overlay"><div className="m-zoom">🔍</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEOGRAPHY PANEL */}
          <div className={`gallery-panel ${activePanel === 'videography' ? 'open' : ''}`} id="panel-videography">
            <div className="panel-header">
              <div>
                <div className="section-eyebrow">Portfolio</div>
                <div className="panel-title">🎬 Videography</div>
              </div>
              <button className="panel-close" onClick={() => handleClosePanel('videography')}>✕</button>
            </div>
            <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.8rem' }}>🎬</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Full Video Portfolio</div>
                <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>All videos available on Google Drive</div>
              </div>
              <a href="https://drive.google.com/drive/folders/16LZBSCt7GsHQd8szzMeyhuiAGY2NY9Ek?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Google Drive Folder →</a>
            </div>
            <div className="video-grid">
              {/* Video 1 */}
              <div className="video-card">
                <div className="video-card-thumb" onClick={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.innerHTML = `<iframe src="https://www.youtube.com/embed/O0huRhWKBVs?si=2o2ErOa1B1e6Og5d&autoplay=1" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>`
                }}>
                  <img src="https://img.youtube.com/vi/O0huRhWKBVs/maxresdefault.jpg" alt="World Vision East Africa" />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title text-sm sm:text-base font-bold">World Vision East Africa | Response Impact</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="video-tags"><span className="video-tag">Advocacy</span><span className="video-tag">NGO</span></div>
                    <a href="https://youtu.be/O0huRhWKBVs?si=2o2ErOa1B1e6Og5d" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: 600, textDecoration: 'underline' }}>Watch on YouTube ↗</a>
                  </div>
                </div>
              </div>
              {/* Video 2 */}
              <div className="video-card">
                <div className="video-card-thumb" onClick={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.innerHTML = `<iframe src="https://www.youtube.com/embed/R9IV7VIRfjs?si=D1ccKbJi0IM7KTzc&autoplay=1" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>`
                }}>
                  <img src="https://img.youtube.com/vi/R9IV7VIRfjs/maxresdefault.jpg" alt="Plan International MEESA" />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title text-sm sm:text-base font-bold">Plan International MEESA | Campaign Showcase</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="video-tags"><span className="video-tag">Documentary</span><span className="video-tag">Field</span></div>
                    <a href="https://youtu.be/R9IV7VIRfjs?si=D1ccKbJi0IM7KTzc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: 600, textDecoration: 'underline' }}>Watch on YouTube ↗</a>
                  </div>
                </div>
              </div>
              {/* Video 3 */}
              <div className="video-card">
                <div className="video-card-thumb" onClick={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.innerHTML = `<iframe src="https://www.youtube.com/embed/Yoidmzy-JJE?si=1xFP3hfPsHlVmdK4&autoplay=1" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>`
                }}>
                  <img src="https://img.youtube.com/vi/Yoidmzy-JJE/maxresdefault.jpg" alt="World Vision Kenya" />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title text-sm sm:text-base font-bold">World Vision Kenya | Documentary Reel</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="video-tags"><span className="video-tag">Storytelling</span><span className="video-tag">Campaign</span></div>
                    <a href="https://youtu.be/Yoidmzy-JJE?si=1xFP3hfPsHlVmdK4" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: 600, textDecoration: 'underline' }}>Watch on YouTube ↗</a>
                  </div>
                </div>
              </div>
              {/* LinkedIn Post Video Card */}
              <div className="video-card flex flex-col justify-between border border-border">
                <div className="text-4xl p-10 flex items-center justify-center flex-1 bg-blue-light text-center min-h-[160px]">
                  🌍
                </div>
                <div className="video-info">
                  <div className="video-title text-sm sm:text-base font-bold">World Humanitarian Day Campaign</div>
                  <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: '16px', lineHeight: '1.5' }}>Watch our special regional coverage for World Humanitarian Day on LinkedIn.</p>
                  <div className="flex items-center justify-between">
                    <div className="video-tags"><span className="video-tag">LinkedIn Video</span></div>
                    <a href="https://www.linkedin.com/posts/world-vision-east-africa-region_actforhumanity-worldhumanitarianday-activity-7366075050527010819-IzQU?utm_source=share&utm_medium=member_desktop&rcm=ACoAACj0YLwBNUtEr_6u2BoMUoX-QuxEDIGMv04" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '6px 14px', fontSize: '.75rem' }}>Watch Video ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-photo-wrap reveal-left">
              <div className="contact-photo-frame">
                <div className="contact-photo">
                  <img src="/assets/photos/IMG_2103.jpg" alt="Terri Mwaura" />
                </div>
              </div>
            </div>
            <div className="contact-text reveal-right">
              <div className="section-eyebrow">Get In Touch</div>
              <h2 className="section-title">Let's Work<br /><span className="accent">Together</span></h2>
              <p className="contact-intro">
                I am available for communications roles, freelance design projects, photography assignments, and creative collaborations with NGOs, UN agencies, and international organisations.
              </p>
              <div className="contact-items">
                <a href="mailto:mwauraterri@gmail.com" className="contact-item">
                  <div className="c-icon">✉️</div>
                  <div>
                    <div className="c-label">Email</div>
                    <div className="c-value text-white">mwauraterri@gmail.com</div>
                  </div>
                </a>
                <div className="contact-item">
                  <div className="c-icon">📍</div>
                  <div>
                    <div className="c-label">Location</div>
                    <div className="c-value text-white">Nairobi, Kenya</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="c-icon">🌍</div>
                  <div>
                    <div className="c-label">Availability</div>
                    <div className="c-value text-white">Open to international opportunities</div>
                  </div>
                </div>
              </div>
              <a href="mailto:mwauraterri@gmail.com" className="btn-primary">
                Send Me an Email →
              </a>
              <div className="contact-chips">
                <span className="contact-chip">NGO Communications</span>
                <span className="contact-chip">Digital Media</span>
                <span className="contact-chip">Graphic Design</span>
                <span className="contact-chip">Photography</span>
                <span className="contact-chip">Videography</span>
                <span className="contact-chip">Publications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-line"></div>
        <div className="footer-inner">
          <div className="footer-logo">Terri<span>.</span></div>
          <p className="footer-copy">© 2025 Terri Mwaura. All rights reserved.</p>
          <button className="footer-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Back to Top</button>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lbOpen && (
        <div id="lightbox" className="open" onClick={(e) => {
          if (e.target === e.currentTarget) setLbOpen(false)
        }}>
          <div className="lb-inner">
            <div className="lb-close" onClick={() => setLbOpen(false)}>×</div>
            <img className="lb-img" src={lbSet[lbIdx]?.src} alt="View" />
            <div className="lb-counter">{lbIdx + 1} / {lbSet.length}</div>
          </div>
          <button className="lb-prev" onClick={() => navigateLightbox(-1)}>‹</button>
          <button className="lb-next" onClick={() => navigateLightbox(1)}>›</button>
        </div>
      )}
    </>
  )
}
