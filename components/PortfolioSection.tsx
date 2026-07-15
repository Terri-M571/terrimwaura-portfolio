'use client'
import Link from 'next/link'

const categories = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    desc: 'Posters, social media graphics, event materials, and digital campaigns for international NGOs.',
    href: '/portfolio/graphic-design',
    cover: '/assets/graphic-design/Design-file-5.png',
    count: '8 Projects',
    icon: '🎨',
  },
  {
    id: 'publications',
    title: 'Publications',
    desc: 'Capacity statements, annual reports, dashboards, and situation reports for World Vision East Africa.',
    href: '/portfolio/publications',
    cover: '/assets/graphic-design/Graphic-1.png',
    count: '13 Publications',
    icon: '📚',
  },
  {
    id: 'branding',
    title: 'Branding',
    desc: 'Roll-up banners, merchandise, campaign materials, and brand assets for regional programmes.',
    href: '/portfolio/branding',
    cover: '/assets/branding/Banner.png',
    count: '16 Assets',
    icon: '✨',
  },
  {
    id: 'photography',
    title: 'Photography',
    desc: 'Event documentation, humanitarian field photography, and portrait photography across East Africa.',
    href: '/portfolio/photography',
    cover: '/assets/photos/293A1218-1.jpg',
    count: '11 Photos',
    icon: '📷',
  },
  {
    id: 'videography',
    title: 'Videography',
    desc: 'Video production, editing, and storytelling for World Vision East Africa, Kenya, and Plan International.',
    href: '/portfolio/videography',
    cover: '/assets/photos/IMG_6930.jpg',
    count: 'View Reel',
    icon: '🎬',
  },
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-tag justify-center mb-4">
            <span className="w-8 h-0.5 bg-orange inline-block" />
            My Work
            <span className="w-8 h-0.5 bg-orange inline-block" />
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary mb-4">
            Portfolio
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A curated showcase of creative work delivered across international development and
            humanitarian organisations — from design and publications to photography and video.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`category-card relative group rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 block stagger-${i + 1} reveal-scale`}
            >
              {/* Cover image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={cat.cover}
                  alt={cat.title}
                  className="cat-img w-full h-full object-cover"
                />
                <div className="cat-overlay" />

                {/* Icon badge */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>

                {/* Count badge */}
                <div className="absolute top-4 right-4 bg-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                  {cat.count}
                </div>
              </div>

              {/* Content */}
              <div className="bg-un-blue p-6">
                <h3 className="font-heading font-bold text-white text-xl mb-2">{cat.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{cat.desc}</p>
                <div className="flex items-center gap-2 text-orange font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
