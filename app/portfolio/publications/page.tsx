'use client'
import Link from 'next/link'

// All publications link to the public Google Drive folder
const DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1cr8jybFZdQkifaln0XGDoPse9YW_JFrq?usp=drive_link'

const publications = [
  {
    title: 'A5 Imara Report',
    org: 'World Vision Kenya',
    year: '2024',
    category: 'Annual Report',
    desc: 'The Imara Report — a flagship publication documenting World Vision Kenya\'s impact and programme results across communities.',
    icon: '📗',
    color: '#009EDB',
  },
  {
    title: 'Child Protection & Participation Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'A comprehensive capacity statement highlighting World Vision East Africa\'s expertise in child protection and participation across the region.',
    icon: '🛡️',
    color: '#009EDB',
  },
  {
    title: 'Economic Empowerment & Livelihoods Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Documenting the organisation\'s capabilities and impact in economic empowerment and sustainable livelihoods programmes.',
    icon: '💼',
    color: '#009EDB',
  },
  {
    title: 'Health & Nutrition Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'A detailed overview of programme expertise and reach in health and nutrition across East Africa.',
    icon: '🏥',
    color: '#009EDB',
  },
  {
    title: 'Humanitarian & Emergency Affairs Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Showcasing humanitarian response capabilities, emergency preparedness, and rapid response expertise.',
    icon: '🚨',
    color: '#F97316',
  },
  {
    title: 'Peacebuilding & Conflict Sensitivity Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Highlighting peacebuilding approaches, conflict-sensitive programming, and community reconciliation work.',
    icon: '🕊️',
    color: '#009EDB',
  },
  {
    title: 'ESCA Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Documenting expertise and programme capacity in education, social cohesion, and accountability.',
    icon: '📖',
    color: '#009EDB',
  },
  {
    title: 'Environment Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'A capacity statement covering environmental programming, climate resilience, and natural resource management.',
    icon: '🌱',
    color: '#009EDB',
  },
  {
    title: 'FY24 Q1 Dashboard',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Dashboard',
    desc: 'Quarterly performance dashboard consolidating key indicators, programme milestones, and regional data for FY2024 Q1.',
    icon: '📊',
    color: '#F97316',
  },
  {
    title: 'GEDSI Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Gender Equality, Disability and Social Inclusion capacity statement for donor and partner engagement.',
    icon: '⚧️',
    color: '#009EDB',
  },
  {
    title: 'Regional Context Overview',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Regional Brief',
    desc: 'A strategic overview of the regional context, programming landscape, and organisational presence across East Africa.',
    icon: '🗺️',
    color: '#009EDB',
  },
  {
    title: 'Sitrep Template',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Template',
    desc: 'Situation Report template for standardised field reporting across emergency and development programmes.',
    icon: '📋',
    color: '#009EDB',
  },
  {
    title: 'WASH Capacity Statement',
    org: 'World Vision East Africa',
    year: '2024',
    category: 'Capacity Statement',
    desc: 'Water, Sanitation and Hygiene capacity statement documenting programme expertise and community impact.',
    icon: '💧',
    color: '#009EDB',
  },
]

const categories = ['All', 'Annual Report', 'Capacity Statement', 'Dashboard', 'Regional Brief', 'Template']

export default function PublicationsPage() {
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
            Digital Library
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4">Publications</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            A collection of capacity statements, reports, dashboards, and publications designed
            for World Vision East Africa, World Vision Kenya, and partner organisations.
          </p>
          <div className="mt-6 flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4 max-w-lg">
            <span className="text-2xl">📂</span>
            <div>
              <p className="text-white font-semibold text-sm">Full Publications Library</p>
              <p className="text-white/60 text-xs">All documents available on Google Drive</p>
            </div>
            <a
              href={DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto bg-orange text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-orange-hover transition-colors whitespace-nowrap"
            >
              Open Drive →
            </a>
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, i) => (
            <a
              key={i}
              href={DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-card group bg-white border border-border rounded-2xl overflow-hidden flex flex-col hover:border-un-blue"
            >
              {/* Cover colour block */}
              <div
                className="h-32 flex items-center justify-center text-6xl relative overflow-hidden"
                style={{ background: pub.color }}
              >
                <span>{pub.icon}</span>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-black/10" />
                <div className="absolute top-2 right-3 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pub.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-text-primary text-base mb-2 leading-tight group-hover:text-un-blue transition-colors">
                  {pub.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">{pub.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-un-blue font-semibold text-xs">{pub.org}</p>
                    <p className="text-text-secondary text-xs">{pub.year}</p>
                  </div>
                  <span className="flex items-center gap-1 text-orange font-semibold text-xs group-hover:gap-2 transition-all">
                    View
                    <span>↗</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Drive CTA */}
        <div className="mt-16 bg-un-blue rounded-3xl p-10 text-center text-white">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="font-heading font-bold text-3xl mb-3">View All Publications</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            All 13 publications are available for viewing and download on my Google Drive library.
          </p>
          <a
            href={DRIVE_FOLDER}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3"
          >
            Open Publications Library →
          </a>
        </div>
      </div>
    </div>
  )
}
