'use client'
import Link from 'next/link'
import { useState } from 'react'

const brandingAssets = [
  {
    src: '/assets/branding/Banner.png',
    title: 'World Vision CHILD Banner',
    org: 'World Vision East Africa',
    type: 'Roll-up Banner',
    desc: 'Centre for Child Wellbeing, Innovation, Learning, Research & Development — large format banner for events and conferences.',
    featured: true,
  },
  {
    src: '/assets/branding/Orange-Sash.png',
    title: 'Campaign Sash — Orange',
    org: 'World Vision East Africa',
    type: 'Merchandise',
    desc: 'Branded campaign sash in World Vision signature orange for field activities and awareness events.',
    featured: false,
  },
  {
    src: '/assets/branding/TAGS-2.png',
    title: 'Event Name Tags',
    org: 'World Vision East Africa',
    type: 'Event Materials',
    desc: 'Branded name tags designed for regional conferences, workshops, and organisational events.',
    featured: false,
  },
  {
    src: '/assets/branding/Tshirt-1-.png',
    title: 'Campaign T-Shirt Design',
    org: 'World Vision East Africa',
    type: 'Merchandise',
    desc: 'Branded t-shirt design for World Vision East Africa campaign and field team use.',
    featured: false,
  },
  {
    src: '/assets/branding/Umbrella-orange-no-bg.png',
    title: 'Branded Umbrella',
    org: 'World Vision East Africa',
    type: 'Merchandise',
    desc: 'Campaign umbrella in World Vision branding — designed for outdoor events and field activities.',
    featured: false,
  },
  {
    src: '/assets/branding/Water-B.png',
    title: 'Water Campaign Asset',
    org: 'World Vision East Africa',
    type: 'Campaign',
    desc: 'Campaign visual asset for World Vision East Africa\'s WASH and water security initiatives.',
    featured: false,
  },
]

const brandingTypes = ['All', 'Roll-up Banner', 'Merchandise', 'Event Materials', 'Campaign']

export default function BrandingPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = filter === 'All' ? brandingAssets : brandingAssets.filter((b) => b.type === filter)

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
            Brand & Identity
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4">Branding</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Brand assets, merchandise, campaign materials, and large-format banners designed
            for World Vision East Africa's regional programmes and events.
          </p>
        </div>
      </div>

      {/* Featured case study */}
      <div className="bg-bg-light border-b border-border">
        <div className="container-max px-6 md:px-16 py-12">
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img
                  src="/assets/branding/Banner.png"
                  alt="World Vision CHILD"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="section-tag mb-4">
                  <span className="w-6 h-0.5 bg-orange" />
                  Featured Case Study
                </span>
                <h2 className="font-heading font-bold text-3xl text-text-primary mb-3">
                  World Vision CHILD Banner
                </h2>
                <p className="text-un-blue font-semibold text-sm mb-4">World Vision East Africa</p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Large-format roll-up banner for the Centre for Child Wellbeing, Innovation,
                  Learning, Research & Development (CHILD). Designed for use at high-level regional
                  conferences, donor meetings, and public awareness events across East Africa.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Large Format Print', 'Brand Identity', 'Event Materials', 'Regional Programme'].map((tag) => (
                    <span key={tag} className="bg-un-blue-light text-un-blue text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container-max px-6 md:px-16 py-4 flex flex-wrap gap-2">
          {brandingTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === type
                  ? 'bg-un-blue text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-un-blue hover:text-un-blue'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((asset, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => setLightbox(asset.src)}
            >
              <div className="relative h-64 overflow-hidden bg-bg-light">
                <img
                  src={asset.src}
                  alt={asset.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {asset.featured && (
                  <div className="absolute top-3 left-3 bg-orange text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-un-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">View Full Size 🔍</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-text-primary text-base">{asset.title}</h3>
                  <span className="bg-orange/10 text-orange text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{asset.type}</span>
                </div>
                <p className="text-un-blue font-medium text-xs mb-2">{asset.org}</p>
                <p className="text-text-secondary text-sm leading-snug">{asset.desc}</p>
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
          <button className="absolute top-4 right-6 text-white text-4xl font-thin hover:text-orange transition-colors">×</button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
