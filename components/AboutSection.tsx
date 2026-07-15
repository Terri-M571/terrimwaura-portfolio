'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

interface CounterProps { end: number; suffix?: string; duration?: number }

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref} className="counter-number">{count}{suffix}</span>
}

const stats = [
  { value: 5, suffix: '+', label: 'Years of Experience', desc: 'In humanitarian & development communications' },
  { value: 3, suffix: '', label: 'Organisations', desc: 'World Vision Kenya, WV East Africa, Plan International' },
  { value: 50, suffix: '+', label: 'Creative Projects', desc: 'Designs, videos, publications & campaigns' },
  { value: 13, suffix: '+', label: 'Publications Designed', desc: 'Capacity statements, reports & dashboards' },
  { value: 10, suffix: '+', label: 'Campaigns Delivered', desc: 'Across digital, print & multimedia platforms' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* ── Left: Image ── */}
          <div className="reveal-left">
            <div className="relative">
              {/* Decorative UN Blue block */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-un-blue rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange rounded-xl -z-10" />

              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <Image
                  src="/assets/photos/profile.jpg"
                  alt="Terri Mwaura"
                  width={580}
                  height={680}
                  className="w-full object-cover"
                />
                {/* Blue overlay strip at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-un-blue p-6">
                  <p className="text-white font-heading font-semibold text-lg">Teresia Mwaura</p>
                  <p className="text-white/70 text-sm">Communications & Media Specialist</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Bio ── */}
          <div className="reveal-right">
            <div className="section-tag mb-4">
              <span className="w-8 h-0.5 bg-orange inline-block" />
              About Me
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary mb-8 leading-tight">
              Telling Stories That
              <span className="text-un-blue block">Matter & Create Impact</span>
            </h2>

            <div className="space-y-5 text-text-secondary leading-relaxed text-[1.05rem]">
              <p>
                Hello, nice to meet you. My name is Teresia Mwaura, a Communications and Media
                Specialist who loves telling real stories that inspire people and create impact.
              </p>
              <p>
                I use my skills in graphic design, video editing, photography, and social media
                management to bring ideas to life and connect people to purpose. Working in the
                humanitarian and development world has taught me the power of stories to move
                hearts and make a difference.
              </p>
              <p>
                Whether I'm designing, filming, or creating digital content, my goal is simple:
                to share stories that matter and help others see the good happening around us.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {['Communications', 'Graphic Design', 'Photography', 'Videography', 'Publications', 'Digital Media'].map((tag) => (
                <span
                  key={tag}
                  className="bg-un-blue-light text-un-blue font-medium text-sm px-4 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="bg-un-blue rounded-3xl p-10 reveal">
          <p className="text-center text-white/70 text-sm font-medium tracking-widest uppercase mb-10">
            Impact by the numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center stagger-${i + 1}`}>
                <div className="text-4xl font-bold text-orange mb-2">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white font-heading font-semibold text-base mb-1">{s.label}</div>
                <div className="text-white/50 text-xs leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
