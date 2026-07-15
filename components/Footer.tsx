'use client'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-un-blue-deep">
      {/* Top divider */}
      <div className="h-1 bg-orange" />

      <div className="container-max px-6 md:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / name */}
          <div>
            <span className="font-heading font-bold text-white text-xl">
              Terri<span className="text-orange">.</span>
            </span>
            <p className="text-white/50 text-xs mt-1">
              Communications & Creative Media Professional
            </p>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} Terri Mwaura. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-orange hover:border-orange transition-all duration-300"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
