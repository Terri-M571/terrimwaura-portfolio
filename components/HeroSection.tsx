'use client'
import Image from 'next/image'

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen bg-un-blue flex items-center pt-20 overflow-hidden"
    >
      {/* Decorative geometric shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-un-blue-dark rounded-full opacity-40 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-un-blue-deep rounded-full opacity-50 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-orange rounded-full opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white rounded-full opacity-20 pointer-events-none" />

      <div className="container-max section-padding w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Portrait ── */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-none">
            <div className="relative float-anim">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-orange/30" />
              <div className="absolute -inset-8 rounded-3xl border border-white/10" />

              {/* Photo */}
              <div className="relative w-72 h-80 sm:w-96 sm:h-[28rem] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/photos/profile.jpg"
                  alt="Terri Mwaura — Communications & Creative Media Professional"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 288px, 384px"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-orange text-white rounded-2xl px-5 py-4 shadow-orange">
                <div className="font-heading font-bold text-2xl">5+</div>
                <div className="text-xs font-medium opacity-90">Years in NGOs</div>
              </div>

              {/* UN Blue accent block */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-card">
                <div className="font-heading font-bold text-un-blue text-lg">5</div>
                <div className="text-xs text-text-secondary font-medium">Organizations</div>
              </div>
            </div>
          </div>

          {/* ── Right: Text content ── */}
          <div className="text-white order-none lg:order-1">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-orange inline-block" />
              <span className="text-sm font-medium text-white/90 tracking-wider uppercase">
                Creative Professional
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              Terri
              <br />
              <span className="text-orange">Mwaura</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 font-medium text-lg mb-6 tracking-wide">
              Communications&nbsp;|&nbsp;Digital Media&nbsp;|&nbsp;Graphic Design Specialist
            </p>

            {/* Bio intro */}
            <p className="text-white/80 text-base leading-relaxed max-w-xl mb-10">
              A Communications and Media Specialist who loves telling real stories that inspire
              people and create impact — through graphic design, video, photography, and digital
              content for international NGOs and development organisations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => scrollTo('portfolio')}
                className="btn-primary"
              >
                View Portfolio
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-outline-white"
              >
                Contact Me
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 border-t border-white/20 pt-8">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Creative Projects' },
                { value: '13+', label: 'Publications' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-3xl text-orange">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="scroll-indicator w-px h-12 bg-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-orange animate-pulse" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
