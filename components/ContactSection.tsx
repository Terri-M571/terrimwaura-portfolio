'use client'
import Image from 'next/image'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-un-blue section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Portrait ── */}
          <div className="reveal-left flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border-2 border-orange/40" />
              <div className="relative w-72 h-80 sm:w-96 sm:h-[26rem] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/photos/profile.jpg"
                  alt="Terri Mwaura"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── Right: Contact info ── */}
          <div className="reveal-right text-white">
            <div className="section-tag mb-4 text-orange">
              <span className="w-8 h-0.5 bg-orange inline-block" />
              Get In Touch
            </div>

            <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-6 leading-tight">
              Let's Work
              <span className="text-orange block">Together</span>
            </h2>

            <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-lg">
              I am available for communications roles, freelance design projects, photography
              assignments, and creative collaborations with NGOs, UN agencies, and international
              organisations.
            </p>

            {/* Contact details */}
            <div className="space-y-5 mb-10">
              {/* Email */}
              <a
                href="mailto:mwauraterri@gmail.com"
                className="flex items-center gap-5 group"
              >
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-orange group-hover:border-orange transition-all duration-300">
                  ✉️
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Email</div>
                  <div className="text-white font-semibold text-lg group-hover:text-orange transition-colors">
                    mwauraterri@gmail.com
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Location</div>
                  <div className="text-white font-semibold text-lg">Nairobi, Kenya</div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  🌍
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Availability</div>
                  <div className="text-white font-semibold text-lg">
                    Open to international opportunities
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="mailto:mwauraterri@gmail.com"
              className="btn-primary inline-flex items-center gap-3 text-base"
            >
              <span>Send Me an Email</span>
              <span>→</span>
            </a>

            {/* Specialisations tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {[
                'NGO Communications', 'Digital Media', 'Graphic Design',
                'Photography', 'Videography', 'Publications',
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
