'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['home', 'about', 'experience', 'portfolio', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-un-blue shadow-lg backdrop-blur-sm'
          : 'bg-un-blue'
      }`}
    >
      <div className="container-max flex items-center justify-between px-6 py-4 md:px-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="font-heading font-bold text-white text-xl tracking-tight"
        >
          Terri<span className="text-orange">.</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`nav-link text-white/90 hover:text-white font-medium text-sm transition-colors ${
                active === item.href.replace('#', '') ? 'active text-white' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Contact CTA */}
        <a
          href="mailto:mwauraterri@gmail.com"
          className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6"
        >
          Get In Touch
        </a>

        {/* Mobile hamburger */}
        <button
          className={`hamburger flex flex-col gap-1.5 md:hidden ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-un-blue-dark overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-left py-3 text-white/90 hover:text-white font-medium border-b border-white/10 last:border-0 transition-colors ${
                active === item.href.replace('#', '') ? 'text-orange' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:mwauraterri@gmail.com"
            className="btn-primary text-center mt-4 text-sm py-3"
          >
            Get In Touch
          </a>
        </nav>
      </div>
    </header>
  )
}
