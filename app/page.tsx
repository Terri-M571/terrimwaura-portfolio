'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [openTimeline, setOpenTimeline] = useState<number | null>(0)

  // Lightbox State
  const [lbOpen, setLbOpen] = useState(false)
  const [lbSet, setLbSet] = useState<{ src: string }[]>([])
  const [lbIdx, setLbIdx] = useState(0)

  // Counter animation state
  const [statsAnimated, setStatsAnimated] = useState(false)

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

    // Navbar scrolled observer
    const handleScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 40)
      }
      const progressBar = document.getElementById('progress-bar')
      if (progressBar) {
        const scrollTop = window.scrollY
        const docH = document.documentElement.scrollHeight - window.innerHeight
        progressBar.style.width = `${docH > 0 ? (scrollTop / docH) * 100 : 0}%`
      }
      
      const sections = ['contact', 'portfolio', 'experience', 'about', 'hero']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`)
          if (activeLink) activeLink.classList.add('active')
          break;
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      statsObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
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
    { src: '/assets/new-graphic-design/Design file (5).png' },
    { src: '/assets/new-graphic-design/IWD Poster.png' },
    { src: '/assets/new-graphic-design/Easter Poster .png' },
    { src: '/assets/new-graphic-design/Graphic 1.png' },
    { src: '/assets/new-graphic-design/drive change.png' },
    { src: '/assets/new-graphic-design/RL.png' },
    { src: '/assets/new-graphic-design/Editable-file-(1).png' },
    { src: '/assets/new-graphic-design/MINE-Editable-file.png' },
    { src: '/assets/new-graphic-design/1752579612512.jpg' },
    { src: '/assets/new-graphic-design/1754054448832.jpg' },
    { src: '/assets/new-graphic-design/1754919488850.jpg' },
    { src: '/assets/new-graphic-design/1755075836257.jpg' },
    { src: '/assets/new-graphic-design/1756143078313.jpg' },
    { src: '/assets/new-graphic-design/1759745073542.jpg' },
    { src: '/assets/new-graphic-design/1761050996259.jpg' },
    { src: '/assets/new-graphic-design/1780257969237.jpg' },
    { src: '/assets/new-graphic-design/1780662821068.jpg' },
    { src: '/assets/new-graphic-design/Call-for-submission-2-A4-landscape.jpg' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 00.jpg' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 01.jpg' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 02.jpg' },
    { src: '/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 03.jpg' },
    { src: '/assets/new-graphic-design/Uganda.jpg' }
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
      const el = document.getElementById('panel-' + panelId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
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
      {/* Progress Bar */}
  <div id="progress-bar"></div>

  {/* ═══════════════════════════════════════
       NAVBAR
  ═══════════════════════════════════════ */}
  <nav id="navbar">
    <div className="nav-inner">
      <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); smoothTo("hero"); }}>Terri<span>.</span></a>
      <ul className="nav-links">
        <li><a href="#about"      className="nav-link" onClick={(e) => { e.preventDefault(); smoothTo("about"); }}>About</a></li>
        <li><a href="#experience" className="nav-link" onClick={(e) => { e.preventDefault(); smoothTo("experience"); }}>Experience</a></li>
        <li><a href="#portfolio"  className="nav-link" onClick={(e) => { e.preventDefault(); smoothTo("portfolio"); }}>Portfolio</a></li>
        <li><a href="#contact"    className="nav-link" onClick={(e) => { e.preventDefault(); smoothTo("contact"); }}>Contact</a></li>
      </ul>
      <div className="nav-controls">
        <button className="theme-toggle" id="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>☀️</button>
        <a href="mailto:mwauraterri@gmail.com" className="nav-cta">Get In Touch</a>
        <button id="hamburger" className={menuOpen ? "hamburger open" : "hamburger"} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  {/* Mobile Menu */}
  <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
    <a href="#about"      onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothTo("about"); }}>About</a>
    <a href="#experience" onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothTo("experience"); }}>Experience</a>
    <a href="#portfolio"  onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothTo("portfolio"); }}>Portfolio</a>
    <a href="#contact"    onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothTo("contact"); }}>Contact</a>
    <a href="mailto:mwauraterri@gmail.com" className="mobile-cta">mwauraterri@gmail.com</a>
  </div>

  {/* ═══════════════════════════════════════
       HERO
  ═══════════════════════════════════════ */}
  <section id="hero">
    <div className="hero-bg-shape s1"></div>
    <div className="hero-bg-shape s2"></div>

    <div className="container">
      <div className="hero-grid">
        {/* Photo Column (Removed floating badges) */}
        <div className="hero-photo-wrap">
          <div className="hero-photo-inner">
            <div className="hero-photo-ring"></div>
            <div className="hero-photo">
              <img src="/assets/photos/profile.jpg" alt="Terri Mwaura" />
            </div>
          </div>
        </div>

        {/* Text Column (Removed hero stats section) */}
        <div className="hero-text">
          <div className="hero-pill">
            <div className="hero-pill-dot"></div>
            Communications &amp; Multimedia Specialists
          </div>
          <h1 className="hero-name">
            Terri<br /><span className="orange">Mwaura</span>
          </h1>
          <p className="hero-role">Communications &amp; Multimedia Specialists</p>
          <p className="hero-desc">
            A Communications and Multimedia Specialist who loves telling real stories that inspire people and create impact — through graphic design, video, photography, and digital content for international NGOs and development organisations.
          </p>
          <div className="hero-btns">
            <a href="#portfolio" className="btn-primary" onClick={(e) => { e.preventDefault(); smoothTo("portfolio"); }}>
              View Portfolio <span>→</span>
            </a>
            <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); smoothTo("contact"); }}>
              Contact Me
            </a>
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

  {/* ═══════════════════════════════════════
       ABOUT
  ═══════════════════════════════════════ */}
  <section id="about" className="section">
    <div className="container">
      <div className="about-grid">
        {/* Image */}
        <div className="reveal-left">
          <div className="about-img-wrap">
            <div className="about-img-deco1"></div>
            <div className="about-img-deco2"></div>
            <div className="about-img-frame">
              <img src="/assets/photos/profile.jpg" alt="Terri Mwaura" />
              <div className="about-img-strip">
                <div className="name">Teresia Mwaura</div>
                <div className="role">Communications &amp; Multimedia Specialists</div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="reveal-right">
          <div className="section-eyebrow">About Me</div>
          <h2 className="section-title">
            Telling Stories That<br />
            <span className="accent">Matter &amp; Create Impact</span>
          </h2>
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
            <a href="#contact" className="btn-blue-outline" onClick={(e) => { e.preventDefault(); smoothTo("contact"); }}>Work With Me →</a>
          </div>
        </div>
      </div>

      {/* Stats Bar (Updated as requested: 5 Organisations) */}
      <div className="stats-bar reveal" style={{ marginTop: '80px' }}>
        <div className="stats-bar-label">Impact by the numbers</div>
        <div className="stats-bar-grid">
          <div className="stat-box d1">
            <div className="count"><StatCounter target={3} suffix="+" /></div>
            <div className="title">Years Experience</div>
            <div className="sub">In humanitarian &amp; development communications</div>
          </div>
          <div className="stat-box d2">
            <div className="count"><StatCounter target={5} suffix="" /></div>
            <div className="title">Organisations</div>
            <div className="sub">WV Kenya, WV East Africa, Plan International, FilmAid Kenya, IHF</div>
          </div>
          <div className="stat-box d3">
            <div className="count"><StatCounter target={50} suffix="+" /></div>
            <div className="title">Creative Projects</div>
            <div className="sub">Designs, videos, publications &amp; multimedia assets</div>
          </div>
          <div className="stat-box d4">
            <div className="count"><StatCounter target={13} suffix="+" /></div>
            <div className="title">Publications Designed</div>
            <div className="sub">Capacity statements, reports &amp; dashboards</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ═══════════════════════════════════════
       EXPERIENCE & TOOLS
  ═══════════════════════════════════════ */}
  <section id="experience" className="section">
    <div className="container">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="section-eyebrow reveal" style={{ justifyContent: 'center', display: 'flex' }}>My Journey</div>
        <h2 className="section-title reveal">Experience &amp; Tools</h2>
        <p className="section-sub reveal" style={{ margin: '0 auto' }}>A proven track record delivering impactful communications across international development and humanitarian organisations.</p>
      </div>

      <div className="exp-tools-grid">
        {/* Timeline (Arranged from most recent, no posters, pure responsibilities) */}
        <div className="reveal-left">
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: '700', fontSize: '1.3rem', color: 'var(--text)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '3px', background: 'var(--blue)' }}></span>
            Professional Experience
          </h3>
          <div className="timeline">
            {/* FilmAid Kenya */}
            <div className="tl-item">
              <div className="tl-dot">1</div>
              <div className={`tl-card \${openTimeline === 0 ? "open" : ""}`} onClick={() => setOpenTimeline(openTimeline === 0 ? null : 0)}>
                <div className="tl-card-head">
                  <div>
                    <div className="tl-org">FilmAid Kenya</div>
                    <div className="tl-role">Communication Consultant</div>
                    <div className="tl-meta">
                      <span>📅 June 2026 – Present</span>
                      <span>📍 Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div className="tl-chevron">▼</div>
                </div>
                <div className="tl-body">
                  <ul>
                    <li>Designs and produces branded visual communication materials, including reports, brochures, banners, posters, infographics, social media graphics, and awareness campaigns.</li>
                    <li>Develops creative concepts aligned with organizational branding.</li>
                    <li>Manages end-to-end design projects and event branding.</li>
                    <li>Collaborates with programme teams and vendors.</li>
                    <li>Maintains digital asset libraries.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* International Humanity Foundation */}
            <div className="tl-item">
              <div className="tl-dot">2</div>
              <div className={`tl-card \${openTimeline === 1 ? "open" : ""}`} onClick={() => setOpenTimeline(openTimeline === 1 ? null : 1)}>
                <div className="tl-card-head">
                  <div>
                    <div className="tl-org">International Humanity Foundation</div>
                    <div className="tl-role">Graphic Designer (Part time Volunteer)</div>
                    <div className="tl-meta">
                      <span>📅 May 2026 – Present</span>
                      <span>📍 Graphics Team</span>
                    </div>
                  </div>
                  <div className="tl-chevron">▼</div>
                </div>
                <div className="tl-body">
                  <ul>
                    <li>Designed visual assets for humanitarian programmes.</li>
                    <li>Turned programme data into donor-facing content.</li>
                    <li>Maintained brand consistency.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* World Vision Kenya */}
            <div className="tl-item">
              <div className="tl-dot">3</div>
              <div className={`tl-card \${openTimeline === 2 ? "open" : ""}`} onClick={() => setOpenTimeline(openTimeline === 2 ? null : 2)}>
                <div className="tl-card-head">
                  <div>
                    <div className="tl-org">World Vision Kenya</div>
                    <div className="tl-role">Communications Professional</div>
                    <div className="tl-meta">
                      <span>📅 Jan 2026 – March 2026</span>
                      <span>📍 Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div className="tl-chevron">▼</div>
                </div>
                <div className="tl-body">
                  <ul>
                    <li>Produced the Imara Report — a flagship publication for World Vision Kenya.</li>
                    <li>Managed social media platforms and digital content strategy.</li>
                    <li>Designed print and digital materials for campaigns and field activities.</li>
                    <li>Captured photography and video for field stories and donor communication.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* World Vision East Africa */}
            <div className="tl-item">
              <div className="tl-dot">4</div>
              <div className={`tl-card \${openTimeline === 3 ? "open" : ""}`} onClick={() => setOpenTimeline(openTimeline === 3 ? null : 3)}>
                <div className="tl-card-head">
                  <div>
                    <div className="tl-org">World Vision East Africa</div>
                    <div className="tl-role">Communications &amp; Multimedia Specialist</div>
                    <div className="tl-meta">
                      <span>📅 October 2024 – December 2025</span>
                      <span>📍 Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div className="tl-chevron">▼</div>
                </div>
                <div className="tl-body">
                  <ul>
                    <li>Leading communications, media production, and visual storytelling for World Vision East Africa's programmes.</li>
                    <li>Producing annual reports, photography campaigns, video documentaries, and social media content that showcases the impact of humanitarian work across 9 countries in the region.</li>
                    <li>Designed capacity statements used in donor reporting and stakeholder engagement.</li>
                    <li>Created quarterly performance dashboards and situation report templates.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan International */}
            <div className="tl-item">
              <div className="tl-dot orange">5</div>
              <div className={`tl-card \${openTimeline === 4 ? "open" : ""}`} onClick={() => setOpenTimeline(openTimeline === 4 ? null : 4)}>
                <div className="tl-card-head">
                  <div>
                    <div className="tl-org">Plan International MEESA</div>
                    <div className="tl-role">Social Media Marketer &amp; Manager</div>
                    <div className="tl-meta">
                      <span>📅 March 2024 – September 2024</span>
                      <span>📍 Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div className="tl-chevron">▼</div>
                </div>
                <div className="tl-body">
                  <ul>
                    <li>Supported the communications team in managing digital platforms, creating engaging content, and capturing impactful photos that told stories from the field.</li>
                    <li>I developed FY25 annual Reports and capacity statements.</li>
                    <li>Strengthened the organisation's online presence and connected field programmes to donors.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools (Removed MS Office Suite) */}
        <div className="reveal-right">
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: '700', fontSize: '1.3rem', color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '3px', background: 'var(--orange)' }}></span>
            Tools I Use
          </h3>
          <p className="tools-desc">
            I am proficient in a range of creative tools for storytelling and communications within international NGOs — producing industry-standard designs and videos that strengthen narrative impact across multiple platforms.
          </p>
          <div className="tools-grid">
            <div className="tool-card d1 reveal"><div className="tool-icon">🎨</div><div className="tool-name">Adobe Photoshop</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="95"></div></div><div className="tool-pct">95%</div><div className="tool-cat">Design</div></div>
            <div className="tool-card d2 reveal"><div className="tool-icon">✏️</div><div className="tool-name">Adobe Illustrator</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="90"></div></div><div className="tool-pct">90%</div><div className="tool-cat">Design</div></div>
            <div className="tool-card d3 reveal"><div className="tool-icon">📄</div><div className="tool-name">Adobe InDesign</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="92"></div></div><div className="tool-pct">92%</div><div className="tool-cat">Publishing</div></div>
            <div className="tool-card d1 reveal"><div className="tool-icon">🎬</div><div className="tool-name">Premiere Pro</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="85"></div></div><div className="tool-pct">85%</div><div className="tool-cat">Video</div></div>
            <div className="tool-card d2 reveal"><div className="tool-icon">📷</div><div className="tool-name">Lightroom</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="88"></div></div><div className="tool-pct">88%</div><div className="tool-cat">Photography</div></div>
            <div className="tool-card d3 reveal"><div className="tool-icon">✨</div><div className="tool-name">After Effects</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="75"></div></div><div className="tool-pct">75%</div><div className="tool-cat">Motion</div></div>
            <div className="tool-card d1 reveal"><div className="tool-icon">🖼️</div><div className="tool-name">Canva Pro</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="98"></div></div><div className="tool-pct">98%</div><div className="tool-cat">Design</div></div>
            <div className="tool-card d2 reveal"><div className="tool-icon">🌐</div><div className="tool-name">WordPress</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="80"></div></div><div className="tool-pct">80%</div><div className="tool-cat">Web</div></div>
            <div className="tool-card d3 reveal"><div className="tool-icon">📧</div><div className="tool-name">Mailchimp</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="85"></div></div><div className="tool-pct">85%</div><div className="tool-cat">Marketing</div></div>
            <div className="tool-card d1 reveal"><div className="tool-icon">🔗</div><div className="tool-name">Google Workspace</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="98"></div></div><div className="tool-pct">98%</div><div className="tool-cat">Productivity</div></div>
            <div className="tool-card d2 reveal"><div className="tool-icon">📑</div><div className="tool-name">Adobe Acrobat</div><div className="tool-bar-wrap"><div className="tool-bar-fill" style={{ width: '0' }} data-w="95"></div></div><div className="tool-pct">95%</div><div className="tool-cat">Publishing</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ═══════════════════════════════════════
       PORTFOLIO
  ═══════════════════════════════════════ */}
  <section id="portfolio" className="section">
    <div className="container">
      <div className="portfolio-intro reveal">
        <div className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>My Work</div>
        <h2 className="section-title">Portfolio</h2>
        <p className="section-sub">A curated showcase of creative work delivered across international development and humanitarian organisations — from design and publications to photography and video.</p>
      </div>

      {/* 5 Category Cards */}
      <div className="cat-grid">
        <div className="cat-card reveal d1" onClick={() => handleOpenPanel("graphic-design")}>
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

        <div className="cat-card reveal d2" onClick={() => handleOpenPanel("publications")}>
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

        <div className="cat-card reveal d3" onClick={() => handleOpenPanel("branding")}>
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

        <div className="cat-card reveal d4" onClick={() => handleOpenPanel("photography")}>
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

        <div className="cat-card reveal d5" onClick={() => handleOpenPanel("videography")}>
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

      {/* ── GRAPHIC DESIGN PANEL (Images only, no text/descriptions) ── */}
      <div className={`gallery-panel \${activePanel === "graphic-design" ? "open" : ""}`} id="panel-graphic-design">
        <div className="panel-header">
          <div>
            <div className="section-eyebrow">Portfolio</div>
            <div className="panel-title">🎨 Graphic Design</div>
          </div>
          <button className="panel-close" onClick={() => handleClosePanel("graphic-design")} aria-label="Close">✕</button>
        </div>
        <div className="masonry" id="gd-grid">
          {/* 23 GD Poster Items */}
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 0)}><img src="/assets/new-graphic-design/Design file (5).png" alt="Poster 1" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 1)}><img src="/assets/new-graphic-design/IWD Poster.png" alt="Poster 2" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 2)}><img src="/assets/new-graphic-design/Easter Poster .png" alt="Poster 3" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 3)}><img src="/assets/new-graphic-design/Graphic 1.png" alt="Poster 4" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 4)}><img src="/assets/new-graphic-design/drive change.png" alt="Poster 5" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 5)}><img src="/assets/new-graphic-design/RL.png" alt="Poster 6" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 6)}><img src="/assets/new-graphic-design/Editable-file-(1).png" alt="Poster 7" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 7)}><img src="/assets/new-graphic-design/MINE-Editable-file.png" alt="Poster 8" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 8)}><img src="/assets/new-graphic-design/1752579612512.jpg" alt="Poster 9" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 9)}><img src="/assets/new-graphic-design/1754054448832.jpg" alt="Poster 10" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 10)}><img src="/assets/new-graphic-design/1754919488850.jpg" alt="Poster 11" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 11)}><img src="/assets/new-graphic-design/1755075836257.jpg" alt="Poster 12" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 12)}><img src="/assets/new-graphic-design/1756143078313.jpg" alt="Poster 13" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 13)}><img src="/assets/new-graphic-design/1759745073542.jpg" alt="Poster 14" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 14)}><img src="/assets/new-graphic-design/1761050996259.jpg" alt="Poster 15" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 15)}><img src="/assets/new-graphic-design/1780257969237.jpg" alt="Poster 16" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 16)}><img src="/assets/new-graphic-design/1780662821068.jpg" alt="Poster 17" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 17)}><img src="/assets/new-graphic-design/Call-for-submission-2-A4-landscape.jpg" alt="Poster 18" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 18)}><img src="/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 00.jpg" alt="Poster 19" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 19)}><img src="/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 01.jpg" alt="Poster 20" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 20)}><img src="/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 02.jpg" alt="Poster 21" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 21)}><img src="/assets/new-graphic-design/Carousel Assana Gnoussiado Akoyiki - 03.jpg" alt="Poster 22" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(gdImages, 22)}><img src="/assets/new-graphic-design/Uganda.jpg" alt="Poster 23" /><div className="m-overlay"><div className="m-zoom">🔍</div></div></div>
        </div>
      </div>

      {/* ── PUBLICATIONS PANEL ── */}
      <div className={`gallery-panel \${activePanel === "publications" ? "open" : ""}`} id="panel-publications">
        <div className="panel-header">
          <div>
            <div className="section-eyebrow">Digital Library</div>
            <div className="panel-title">📚 Publications</div>
          </div>
          <button className="panel-close" onClick={() => handleClosePanel("publications")} aria-label="Close">✕</button>
        </div>
        <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.8rem' }}>📂</span>
          <div style={{ flex: '1' }}>
            <div style={{ fontWeight: '600', color: 'var(--text)' }}>Full Publications Library</div>
            <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>All 13 documents available on Google Drive</div>
          </div>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Drive →</a>
        </div>
        <div className="pub-grid">
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>📗</span><div className="pub-type-badge">Annual Report</div></div><div className="pub-body"><div className="pub-title">A5 Imara Report</div><div className="pub-desc">Flagship publication documenting World Vision Kenya's impact and programme results across communities.</div><div className="pub-footer"><span className="pub-org">World Vision Kenya · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🛡️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Child Protection &amp; Participation</div><div className="pub-desc">Capacity statement highlighting expertise in child protection and participation across the East Africa region.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>💼</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Economic Empowerment &amp; Livelihoods</div><div className="pub-desc">Documenting capabilities and impact in economic empowerment and sustainable livelihoods programmes.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🏥</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Health &amp; Nutrition</div><div className="pub-desc">Overview of programme expertise and reach in health and nutrition across East Africa.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#FB9704' }}><span>🚨</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Humanitarian &amp; Emergency Affairs</div><div className="pub-desc">Showcasing humanitarian response capabilities and emergency preparedness expertise.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🕊️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Peacebuilding &amp; Conflict Sensitivity</div><div className="pub-desc">Highlighting peacebuilding approaches and conflict-sensitive programming work.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>📖</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">ESCA Capacity Statement</div><div className="pub-desc">Expertise in education, social cohesion and accountability programming.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>🌱</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">Environment Capacity Statement</div><div className="pub-desc">Environmental programming, climate resilience, and natural resource management capacity.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#FB9704' }}><span>📊</span><div className="pub-type-badge">Dashboard</div></div><div className="pub-body"><div className="pub-title">FY24 Q1 Dashboard</div><div className="pub-desc">Quarterly performance dashboard consolidating key indicators and programme milestones for FY2024 Q1.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>⚧️</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">GEDSI Capacity Statement</div><div className="pub-desc">Gender Equality, Disability and Social Inclusion capacity for donor and partner engagement.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#024ebc' }}><span>🗺️</span><div className="pub-type-badge">Regional Brief</div></div><div className="pub-body"><div className="pub-title">Regional Context Overview</div><div className="pub-desc">Strategic overview of the regional context and programming landscape across East Africa.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>📋</span><div className="pub-type-badge">Template</div></div><div className="pub-body"><div className="pub-title">Sitrep Template</div><div className="pub-desc">Situation Report template for standardised field reporting across emergency and development programmes.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
          <a href="https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link" target="_blank" rel="noopener" className="pub-card"><div className="pub-cover" style={{ background: '#0468fb' }}><span>💧</span><div className="pub-type-badge">Capacity Statement</div></div><div className="pub-body"><div className="pub-title">WASH Capacity Statement</div><div className="pub-desc">Water, Sanitation and Hygiene capacity documenting programme expertise and community impact.</div><div className="pub-footer"><span className="pub-org">WV East Africa · 2024</span><span className="pub-arrow">↗</span></div></div></a>
        </div>
      </div>

      {/* ── BRANDING PANEL (No descriptions, links to Drive) ── */}
      <div className={`gallery-panel \${activePanel === "branding" ? "open" : ""}`} id="panel-branding">
        <div className="panel-header">
          <div>
            <div className="section-eyebrow">Portfolio</div>
            <div className="panel-title">✨ Branding</div>
          </div>
          <button className="panel-close" onClick={() => handleClosePanel("branding")} aria-label="Close">✕</button>
        </div>
        <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: '600', color: 'var(--text)' }}>📂 Branding Catalogs &amp; Folders</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href="https://drive.google.com/file/d/1981qZfaKTI9TtNuYaa7XicY9DD9gihxN/view?usp=sharing" target="_blank" rel="noopener" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Branding Catalogue →</a>
            <a href="https://drive.google.com/drive/folders/1dd-mV95e49AfbExrWdrpJYcIsrb_dKWp?usp=sharing" target="_blank" rel="noopener" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem', background: 'var(--blue)' }}>Open More Banners Folder →</a>
          </div>
        </div>
        <div className="brand-grid">
          <div className="brand-card" onClick={() => openLightbox(brandImages, 0)}>
            <div className="brand-img"><img src="/assets/branding/Banner.png" alt="Branding 1" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
          <div className="brand-card" onClick={() => openLightbox(brandImages, 1)}>
            <div className="brand-img"><img src="/assets/branding/Orange-Sash.png" alt="Branding 2" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
          <div className="brand-card" onClick={() => openLightbox(brandImages, 2)}>
            <div className="brand-img"><img src="/assets/branding/TAGS-2.png" alt="Branding 3" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
          <div className="brand-card" onClick={() => openLightbox(brandImages, 3)}>
            <div className="brand-img"><img src="/assets/branding/Tshirt-1-.png" alt="Branding 4" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
          <div className="brand-card" onClick={() => openLightbox(brandImages, 4)}>
            <div className="brand-img"><img src="/assets/branding/Umbrella-orange-no-bg.png" alt="Branding 5" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
          <div className="brand-card" onClick={() => openLightbox(brandImages, 5)}>
            <div className="brand-img"><img src="/assets/branding/Water-B.png" alt="Branding 6" /><div className="hover-label">View Full Size 🔍</div></div>
          </div>
        </div>
      </div>

      {/* ── PHOTOGRAPHY PANEL (All photos, no tags/filters) ── */}
      <div className={`gallery-panel \${activePanel === "photography" ? "open" : ""}`} id="panel-photography">
        <div className="panel-header">
          <div>
            <div className="section-eyebrow">Visual Stories</div>
            <div className="panel-title">📷 Photography</div>
          </div>
          <button className="panel-close" onClick={() => handleClosePanel("photography")} aria-label="Close">✕</button>
        </div>
        <div className="masonry" id="photo-grid">
          {/* 38 Photo Items */}
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 0)}><img src="/assets/new-photos/IMG_6522.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 1)}><img src="/assets/new-photos/IMG_6552.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 2)}><img src="/assets/new-photos/IMG_6620.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 3)}><img src="/assets/new-photos/IMG_6624.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 4)}><img src="/assets/new-photos/IMG_6647.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 5)}><img src="/assets/new-photos/IMG_6724.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 6)}><img src="/assets/new-photos/IMG_6730.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 7)}><img src="/assets/new-photos/IMG_6749.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 8)}><img src="/assets/new-photos/IMG_6758.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 9)}><img src="/assets/new-photos/IMG_6764.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 10)}><img src="/assets/new-photos/IMG_6781.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 11)}><img src="/assets/new-photos/IMG_6786.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 12)}><img src="/assets/new-photos/IMG_6842.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 13)}><img src="/assets/new-photos/IMG_7227.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 14)}><img src="/assets/new-photos/IMG_2172.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 15)}><img src="/assets/new-photos/IMG_2196.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 16)}><img src="/assets/new-photos/Kitchen garden edited-6.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 17)}><img src="/assets/new-photos/Kitchen garden edited-7.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 18)}><img src="/assets/new-photos/R6CC9653.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 19)}><img src="/assets/new-photos/R6CC9699.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 20)}><img src="/assets/new-photos/R6CC9701.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 21)}><img src="/assets/new-photos/R6CC9704.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 22)}><img src="/assets/new-photos/R6CC9705.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 23)}><img src="/assets/new-photos/R6CC9902.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 24)}><img src="/assets/new-photos/R6CC9965.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 25)}><img src="/assets/new-photos/R6CC9973.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 26)}><img src="/assets/new-photos/R6CC9976.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 27)}><img src="/assets/new-photos/kORR Hospital edited-10.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 28)}><img src="/assets/new-photos/kORR Hospital edited-11.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 29)}><img src="/assets/new-photos/kORR Hospital edited-21.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 30)}><img src="/assets/new-photos/kORR Hospital edited-22.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 31)}><img src="/assets/new-photos/kORR Hospital edited-32.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 32)}><img src="/assets/new-photos/kORR Hospital edited-33.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 33)}><img src="/assets/new-photos/kORR Hospital edited-4.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 34)}><img src="/assets/new-photos/kORR Hospital edited-49.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 35)}><img src="/assets/new-photos/kORR Hospital edited-53.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 36)}><img src="/assets/new-photos/kORR Hospital edited-64.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
          <div className="masonry-item" onClick={() => openLightbox(photoImages, 37)}><img src="/assets/new-photos/kORR Hospital edited-72.jpg" alt="Photo" /><div className="photo-overlay"><div className="m-zoom">🔍</div></div></div>
        </div>
      </div>

      {/* ── VIDEOGRAPHY PANEL (YouTube embeds & LinkedIn link) ── */}
      <div className={`gallery-panel \${activePanel === "videography" ? "open" : ""}`} id="panel-videography">
        <div className="panel-header">
          <div>
            <div className="section-eyebrow">Portfolio</div>
            <div className="panel-title">🎬 Videography</div>
          </div>
          <button className="panel-close" onClick={() => handleClosePanel("videography")} aria-label="Close">✕</button>
        </div>
        <div style={{ background: 'rgba(4,104,251,.06)', border: '1px solid rgba(4,104,251,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.8rem' }}>🎬</span>
          <div style={{ flex: '1' }}>
            <div style={{ fontWeight: '600', color: 'var(--text)' }}>Full Video Portfolio</div>
            <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>All videos available on Google Drive</div>
          </div>
          <a href="https://drive.google.com/drive/folders/16LZBSCt7GsHQd8szzMeyhuiAGY2NY9Ek?usp=sharing" target="_blank" rel="noopener" className="btn-primary" style={{ padding: '10px 20px', fontSize: '.82rem' }}>Open Google Drive Folder →</a>
        </div>
        <div className="video-grid">
          {/* Video 1 */}
          <div className="video-card">
            <div className="video-card-thumb" onClick={(e) => { e.currentTarget.innerHTML = `<iframe src=\'https://www.youtube.com/embed/O0huRhWKBVs?si=2o2ErOa1B1e6Og5d&autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'position:absolute;top:0;left:0;width:100%;height:100%;border:0;\'></iframe>` }}>
              <img src="https://img.youtube.com/vi/O0huRhWKBVs/maxresdefault.jpg" alt="World Vision East Africa" onError={(e) => { e.currentTarget.src = "https://img.youtube.com/vi/O0huRhWKBVs/hqdefault.jpg"; }} />
              <div className="video-play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
            </div>
            <div className="video-info">
              <div className="video-title">World Vision East Africa | Response Impact</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div className="video-tags"><span className="video-tag">Advocacy</span><span className="video-tag">NGO</span></div>
                <a href="https://youtu.be/O0huRhWKBVs?si=2o2ErOa1B1e6Og5d" target="_blank" rel="noopener" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: '600', textDecoration: 'underline' }}>Watch on YouTube ↗</a>
              </div>
            </div>
          </div>
          {/* Video 2 */}
          <div className="video-card">
            <div className="video-card-thumb" onClick={(e) => { e.currentTarget.innerHTML = `<iframe src=\'https://www.youtube.com/embed/R9IV7VIRfjs?si=D1ccKbJi0IM7KTzc&autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'position:absolute;top:0;left:0;width:100%;height:100%;border:0;\'></iframe>` }}>
              <img src="https://img.youtube.com/vi/R9IV7VIRfjs/maxresdefault.jpg" alt="Plan International MEESA" onError={(e) => { e.currentTarget.src = "https://img.youtube.com/vi/R9IV7VIRfjs/hqdefault.jpg"; }} />
              <div className="video-play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
            </div>
            <div className="video-info">
              <div className="video-title">Plan International MEESA | Campaign Showcase</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div className="video-tags"><span className="video-tag">Documentary</span><span className="video-tag">Field</span></div>
                <a href="https://youtu.be/R9IV7VIRfjs?si=D1ccKbJi0IM7KTzc" target="_blank" rel="noopener" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: '600', textDecoration: 'underline' }}>Watch on YouTube ↗</a>
              </div>
            </div>
          </div>
          {/* Video 3 */}
          <div className="video-card">
            <div className="video-card-thumb" onClick={(e) => { e.currentTarget.innerHTML = `<iframe src=\'https://www.youtube.com/embed/Yoidmzy-JJE?si=1xFP3hfPsHlVmdK4&autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'position:absolute;top:0;left:0;width:100%;height:100%;border:0;\'></iframe>` }}>
              <img src="https://img.youtube.com/vi/Yoidmzy-JJE/maxresdefault.jpg" alt="World Vision Kenya" onError={(e) => { e.currentTarget.src = "https://img.youtube.com/vi/Yoidmzy-JJE/hqdefault.jpg"; }} />
              <div className="video-play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
            </div>
            <div className="video-info">
              <div className="video-title">World Vision Kenya | Documentary Reel</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div className="video-tags"><span className="video-tag">Storytelling</span><span className="video-tag">Campaign</span></div>
                <a href="https://youtu.be/Yoidmzy-JJE?si=1xFP3hfPsHlVmdK4" target="_blank" rel="noopener" style={{ color: 'var(--blue)', fontSize: '.8rem', fontWeight: '600', textDecoration: 'underline' }}>Watch on YouTube ↗</a>
              </div>
            </div>
          </div>
          {/* LinkedIn Post Video Card */}
          <div className="video-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--blue-light)', padding: '40px 24px', textAlign: 'center', fontSize: '2.5rem', flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🌍
            </div>
            <div className="video-info">
              <div className="video-title">World Humanitarian Day Campaign</div>
              <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: '16px', lineHeight: '1.5' }}>Watch our special regional coverage for World Humanitarian Day on LinkedIn.</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="video-tags"><span className="video-tag">LinkedIn Video</span></div>
                <a href="https://www.linkedin.com/posts/world-vision-east-africa-region_actforhumanity-worldhumanitarianday-activity-7366075050527010819-IzQU?utm_source=share&utm_medium=member_desktop&rcm=ACoAACj0YLwBNUtEr_6u2BoMUoX-QuxEDIGMv04" target="_blank" rel="noopener" className="btn-primary" style={{ padding: '6px 14px', fontSize: '.75rem' }}>Watch Video ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* ═══════════════════════════════════════
       CONTACT (Updated image to IMG_2103.jpg)
  ═══════════════════════════════════════ */}
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
                <div className="c-value">mwauraterri@gmail.com</div>
              </div>
            </a>
            <div className="contact-item">
              <div className="c-icon">📍</div>
              <div>
                <div className="c-label">Location</div>
                <div className="c-value">Nairobi, Kenya</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">🌍</div>
              <div>
                <div className="c-label">Availability</div>
                <div className="c-value">Open to international opportunities</div>
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

  {/* ═══════════════════════════════════════
       FOOTER
  ═══════════════════════════════════════ */}
  <footer>
    <div className="footer-line"></div>
    <div className="footer-inner">
      <div className="footer-logo">Terri<span>.</span></div>
      <p className="footer-copy">© 2025 Terri Mwaura. All rights reserved.</p>
      <button className="footer-top-btn" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>↑ Back to Top</button>
    </div>
  </footer>



  

      {/* Dynamic Lightbox */}
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
