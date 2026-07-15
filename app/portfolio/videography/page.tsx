'use client'
import Link from 'next/link'

// All videos link to the public Google Drive folder
const VIDEO_DRIVE = 'https://drive.google.com/drive/folders/16LZBSCt7GsHQd8szzMeyhuiAGY2NY9Ek?usp=sharing'

const videoOrgs = [
  {
    org: 'World Vision East Africa',
    color: '#009EDB',
    period: '2024 – Present',
    desc: 'Video production, editing, and multimedia storytelling for World Vision East Africa — capturing programme impact across 14 countries.',
    icon: '🌍',
    videos: [
      {
        title: 'Regional Programme Impact Documentary',
        desc: 'A documentary-style video showcasing World Vision East Africa\'s impact across child wellbeing, health, and livelihoods programmes.',
        thumb: '/assets/photos/293A1218-1.jpg',
        tags: ['Documentary', 'Regional'],
      },
      {
        title: 'International Women\'s Day Campaign Video',
        desc: 'Campaign video for IWD 2025 — "Accelerate Action, Remove All Barriers" — produced for World Vision East Africa.',
        thumb: '/assets/graphic-design/IWD-Poster.png',
        tags: ['Campaign', 'Event'],
      },
      {
        title: 'CHILD Centre Launch Coverage',
        desc: 'Event coverage and promotional video for the Centre for Child Wellbeing, Innovation, Learning, Research & Development.',
        thumb: '/assets/branding/Banner.png',
        tags: ['Event', 'Institutional'],
      },
    ],
  },
  {
    org: 'World Vision Kenya',
    color: '#009EDB',
    period: '2022 – 2024',
    desc: 'Video production and photography for World Vision Kenya — field stories, programme documentation, and campaign content.',
    icon: '🇰🇪',
    videos: [
      {
        title: 'Field Stories — Community Impact',
        desc: 'Field-based video documentation capturing stories of community transformation and programme impact for World Vision Kenya.',
        thumb: '/assets/photos/293A1420.jpg',
        tags: ['Field Stories', 'Documentary'],
      },
      {
        title: 'Easter Joint Chapel Recording',
        desc: 'Full event video coverage for World Vision Kenya\'s annual Easter Joint Chapel gathering.',
        thumb: '/assets/graphic-design/Easter-Poster-.png',
        tags: ['Event', 'Internal'],
      },
    ],
  },
  {
    org: 'Plan International MEESA',
    color: '#F97316',
    period: 'March – September 2024',
    desc: 'Social media video content and field photography for Plan International MEESA\'s digital communications.',
    icon: '✊',
    videos: [
      {
        title: 'Girls Education Campaign Content',
        desc: 'Social media video content for Plan International MEESA\'s girls education advocacy campaign — "Knowledge is Power".',
        thumb: '/assets/graphic-design/Design-file-5.png',
        tags: ['Social Media', 'Campaign'],
      },
    ],
  },
]

function PlayIcon() {
  return (
    <div className="play-btn w-16 h-16 rounded-full bg-orange flex items-center justify-center shadow-orange">
      <div className="w-0 h-0 border-t-8 border-b-8 border-l-16 border-t-transparent border-b-transparent border-l-white ml-1"
           style={{ borderLeftWidth: 20, borderLeftColor: 'white' }}
      />
    </div>
  )
}

export default function VideographyPage() {
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
            Visual Storytelling
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4">Videography</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Video production, editing, and multimedia storytelling for international NGOs — 
            capturing impact, amplifying voices, and bringing development stories to life.
          </p>
          
          {/* Drive link banner */}
          <div className="mt-8 flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-6 py-5 max-w-xl">
            <div className="text-3xl">🎬</div>
            <div className="flex-1">
              <p className="text-white font-semibold">Full Video Portfolio</p>
              <p className="text-white/60 text-sm">All videos available on Google Drive</p>
            </div>
            <a
              href={VIDEO_DRIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-3 px-6 whitespace-nowrap"
            >
              Watch Videos →
            </a>
          </div>
        </div>
      </div>

      {/* Video sections by org */}
      <div className="container-max section-padding space-y-20">
        {videoOrgs.map((section, si) => (
          <div key={section.org}>
            {/* Org header */}
            <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-border">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: section.color }}
              >
                {section.icon}
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-text-primary">{section.org}</h2>
                <p className="text-text-secondary text-sm mt-0.5">{section.period}</p>
                <p className="text-text-secondary text-sm mt-2 max-w-2xl">{section.desc}</p>
              </div>
            </div>

            {/* Video cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.videos.map((video, vi) => (
                <a
                  key={vi}
                  href={VIDEO_DRIVE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 overflow-hidden bg-un-blue-deep">
                    <img
                      src={video.thumb}
                      alt={video.title}
                      className="video-thumb w-full h-full object-cover opacity-80 transition-transform duration-500"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon />
                    </div>
                    {/* Org tag */}
                    <div
                      className="absolute top-3 left-3 text-white text-[10px] font-bold px-3 py-1 rounded-full"
                      style={{ background: section.color }}
                    >
                      {section.org.split(' ').slice(-2).join(' ')}
                    </div>
                    {/* Duration placeholder */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded font-medium">
                      🎬 Google Drive
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-text-primary text-base mb-2 group-hover:text-un-blue transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{video.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag) => (
                          <span key={tag} className="bg-un-blue-light text-un-blue text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-orange font-semibold text-xs group-hover:gap-2 transition-all whitespace-nowrap">
                        Watch →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Final CTA */}
        <div className="bg-un-blue rounded-3xl p-12 text-center text-white">
          <div className="text-6xl mb-5">🎥</div>
          <h2 className="font-heading font-bold text-3xl mb-3">Watch the Full Video Portfolio</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            All video projects — field documentaries, event coverage, and campaign content — are
            available to view on my Google Drive portfolio.
          </p>
          <a
            href={VIDEO_DRIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-base"
          >
            <span>Open Video Portfolio</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
