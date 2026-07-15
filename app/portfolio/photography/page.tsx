'use client'
import Link from 'next/link'
import { useState } from 'react'

const photos = [
  {
    src: '/assets/photos/293A1218-1.jpg',
    title: 'World Vision Staff Training',
    org: 'World Vision East Africa',
    category: 'Events',
    desc: 'Field staff workshop and training session — documenting learning and development within World Vision East Africa.',
  },
  {
    src: '/assets/photos/293A1420.jpg',
    title: 'Field Event Photography',
    org: 'World Vision East Africa',
    category: 'Events',
    desc: 'Event documentation for World Vision East Africa regional activities and gatherings.',
  },
  {
    src: '/assets/photos/293A1451.jpg',
    title: 'Organisational Event',
    org: 'World Vision East Africa',
    category: 'Events',
    desc: 'Photography capturing key moments from World Vision East Africa team activities.',
  },
  {
    src: '/assets/photos/stop-gbv.jpeg',
    title: 'Stop Gender-Based Violence',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'A powerful humanitarian portrait with a clear message — Stop Gender-Based Violence. Captured for advocacy campaigns.',
  },
  {
    src: '/assets/photos/A7407370.jpg',
    title: 'Humanitarian Field Photography',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'Documentary photography from humanitarian programme activities in the field.',
  },
  {
    src: '/assets/photos/A7407391.jpg',
    title: 'Community Impact Documentation',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'Capturing stories of change and community impact for donor and stakeholder communications.',
  },
  {
    src: '/assets/photos/A7407442.jpg',
    title: 'Field Documentation',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'Programme documentation from field visits and community engagement activities.',
  },
  {
    src: '/assets/photos/A7407452.jpg',
    title: 'Community Stories',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'Story-driven photography highlighting the human dimension of development work.',
  },
  {
    src: '/assets/photos/A7407473.jpg',
    title: 'Field Photography',
    org: 'World Vision East Africa',
    category: 'Humanitarian',
    desc: 'Documentary photography for NGO communications and impact reporting.',
  },
  {
    src: '/assets/photos/IMG_6930.jpg',
    title: 'Event Photography',
    org: 'World Vision East Africa',
    category: 'Conferences',
    desc: 'High-quality event photography from conferences and organisational gatherings.',
  },
  {
    src: '/assets/photos/IMG_6935.jpg',
    title: 'Conference Coverage',
    org: 'World Vision East Africa',
    category: 'Conferences',
    desc: 'Professional photography capturing key moments from regional conferences and events.',
  },
]

const categories = ['All', 'Events', 'Humanitarian', 'Conferences']

export default function PhotographyPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? photos : photos.filter((p) => p.category === filter)

  const prev = () => {
    if (lightbox === null) return
    const idx = filtered.findIndex((p) => p.src === photos[lightbox]?.src)
    setLightbox(lightbox > 0 ? lightbox - 1 : filtered.length - 1)
  }
  const next = () => {
    if (lightbox === null) return
    setLightbox(lightbox < filtered.length - 1 ? lightbox + 1 : 0)
  }

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
            Visual Stories
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4">Photography</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Documentary, humanitarian, and event photography — telling stories that matter
            from across East Africa's development and humanitarian landscape.
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
              <span className="ml-2 text-xs opacity-60">
                {cat === 'All' ? photos.length : photos.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-style masonry gallery */}
      <div className="container-max section-padding">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <div
              key={i}
              className="photo-card break-inside-avoid rounded-2xl overflow-hidden shadow-card cursor-pointer relative group"
              onClick={() => setLightbox(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="photo-overlay rounded-2xl">
                <span className="bg-orange/20 text-orange text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {photo.category}
                </span>
                <h3 className="font-heading font-bold text-white text-base text-center px-4">{photo.title}</h3>
                <p className="text-white/70 text-xs text-center px-4 mt-1">{photo.org}</p>
                <div className="mt-3 text-white/90 text-2xl">🔍</div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3 bg-un-blue/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {photo.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Close */}
          <button
            className="absolute top-4 right-6 text-white text-4xl font-thin hover:text-orange transition-colors z-10"
            onClick={() => setLightbox(null)}
          >×</button>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/70 hover:text-white text-3xl z-10 p-3 bg-white/10 rounded-full hover:bg-orange transition-all"
            onClick={prev}
          >‹</button>

          {/* Image */}
          <div className="flex flex-col items-center max-w-5xl w-full">
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-heading font-bold text-white text-lg">{filtered[lightbox].title}</h3>
              <p className="text-white/60 text-sm mt-1">{filtered[lightbox].org} · {filtered[lightbox].category}</p>
              <p className="text-white/50 text-xs mt-2 max-w-lg">{filtered[lightbox].desc}</p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white/70 hover:text-white text-3xl z-10 p-3 bg-white/10 rounded-full hover:bg-orange transition-all"
            onClick={next}
          >›</button>

          {/* Counter */}
          <div className="absolute bottom-4 text-white/40 text-sm">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </div>
  )
}
