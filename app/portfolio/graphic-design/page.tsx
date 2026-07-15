'use client'
import Link from 'next/link'
import { useState } from 'react'

const designs = [
  {
    src: '/assets/graphic-design/Design-file-5.png',
    title: 'Knowledge is Power — Girls Education Campaign',
    org: 'Plan International MEESA',
    category: 'Social Media',
    year: '2024',
  },
  {
    src: '/assets/graphic-design/IWD-Poster.png',
    title: 'International Women\'s Day 2025',
    org: 'World Vision East Africa',
    category: 'Event Poster',
    year: '2025',
  },
  {
    src: '/assets/graphic-design/Easter-Poster-.png',
    title: 'Easter Joint Chapel — FY25',
    org: 'World Vision Kenya',
    category: 'Event Poster',
    year: '2025',
  },
  {
    src: '/assets/graphic-design/Graphic-1.png',
    title: 'Campaign Graphic',
    org: 'World Vision East Africa',
    category: 'Campaign',
    year: '2024',
  },
  {
    src: '/assets/graphic-design/drive-change.png',
    title: 'Drive Change Campaign',
    org: 'World Vision East Africa',
    category: 'Campaign',
    year: '2024',
  },
  {
    src: '/assets/graphic-design/RL.png',
    title: 'Communications Design',
    org: 'World Vision East Africa',
    category: 'Print',
    year: '2024',
  },
  {
    src: '/assets/graphic-design/Editable-file-1.png',
    title: 'Editable Template Design',
    org: 'World Vision East Africa',
    category: 'Template',
    year: '2024',
  },
  {
    src: '/assets/graphic-design/MINE-Editable-file.png',
    title: 'Communications Template',
    org: 'World Vision Kenya',
    category: 'Template',
    year: '2023',
  },
]

const categories = ['All', 'Social Media', 'Event Poster', 'Campaign', 'Print', 'Template']

export default function GraphicDesignPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = filter === 'All' ? designs : designs.filter((d) => d.category === filter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-un-blue text-white section-padding pt-32">
        <div className="container-max">
          <Link href="/#portfolio" className="text-white/60 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors">
            ← Back to Portfolio
          </Link>
          <div className="section-tag text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />
            Creative Work
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4">Graphic Design</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Event posters, social media graphics, campaign materials, and digital designs
            for international NGOs across East Africa.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-bg-light border-b border-border sticky top-0 z-30">
        <div className="container-max px-6 md:px-16 py-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-un-blue text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-un-blue hover:text-un-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style Grid */}
      <div className="container-max section-padding">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((d, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
              onClick={() => setLightbox(d.src)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={d.src}
                  alt={d.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-un-blue/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-heading font-bold text-white text-base mb-1">{d.title}</h3>
                  <p className="text-white/70 text-xs">{d.org}</p>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{d.title}</h3>
                    <p className="text-text-secondary text-xs mt-0.5">{d.org}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-orange/10 text-orange text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {d.category}
                    </span>
                    <span className="text-text-secondary text-[10px]">{d.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-6 text-white text-4xl font-thin hover:text-orange transition-colors" onClick={() => setLightbox(null)}>×</button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
