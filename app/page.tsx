'use client'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import PortfolioSection from '@/components/PortfolioSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
