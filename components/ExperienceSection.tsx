'use client'
import { useState } from 'react'
import Image from 'next/image'

/* ── Experience Data ── */
const experiences = [
  {
    id: 'wvea',
    org: 'World Vision East Africa',
    role: 'Communications & Media Specialist',
    period: 'October 2024 – Present',
    location: 'Nairobi, Kenya',
    color: '#009EDB',
    logo: '/assets/branding/Banner.png',
    logoAlt: 'World Vision East Africa logo',
    achievements: [
      'Produced multimedia content — video, photography, design — for regional campaigns across East Africa',
      'Designed 9+ capacity statements used in donor reporting and stakeholder engagement',
      'Created the FY24 Q1 Dashboard report and Situation Report templates',
      'Supported internal and external communications across 14 country programmes',
      'Designed event materials for conferences, workshops, and field activities',
    ],
    projects: [
      '/assets/graphic-design/IWD-Poster.png',
      '/assets/graphic-design/Easter-Poster-.png',
      '/assets/branding/Banner.png',
    ],
  },
  {
    id: 'wvk',
    org: 'World Vision Kenya',
    role: 'Communications Professional',
    period: '2022 – 2024',
    location: 'Nairobi, Kenya',
    color: '#009EDB',
    logo: null,
    logoAlt: 'World Vision Kenya',
    achievements: [
      'Produced the Imara Report — a flagship publication for World Vision Kenya',
      'Managed social media platforms and digital content strategy',
      'Designed print and digital materials for campaigns and field activities',
      'Captured photography and video for field stories and donor communication',
      'Supported communications for child protection, health, and livelihoods programmes',
    ],
    projects: [
      '/assets/graphic-design/Graphic-1.png',
      '/assets/graphic-design/drive-change.png',
    ],
  },
  {
    id: 'plan',
    org: 'Plan International MEESA',
    role: 'Social Media Marketer & Manager (Volunteer)',
    period: 'March – September 2024',
    location: 'Nairobi, Kenya',
    color: '#F97316',
    logo: null,
    logoAlt: 'Plan International',
    achievements: [
      'Supported the communications team in managing digital platforms and social media',
      'Created engaging content that amplified Plan International\'s work across the MEESA region',
      'Captured impactful photography that told stories from the field',
      'Assisted in various communication activities to strengthen online presence',
      'Connected organisational work with wider audiences across digital channels',
    ],
    projects: [
      '/assets/graphic-design/Design-file-5.png',
    ],
  },
]

/* ── Tools Data ── */
const tools = [
  { name: 'Adobe Photoshop', icon: '🎨', category: 'Design', level: 90 },
  { name: 'Adobe Illustrator', icon: '✏️', category: 'Design', level: 85 },
  { name: 'Adobe InDesign', icon: '📄', category: 'Publishing', level: 92 },
  { name: 'Adobe Premiere Pro', icon: '🎬', category: 'Video', level: 85 },
  { name: 'Adobe Lightroom', icon: '📷', category: 'Photography', level: 88 },
  { name: 'Adobe After Effects', icon: '✨', category: 'Motion', level: 75 },
  { name: 'Adobe Acrobat', icon: '📑', category: 'Publishing', level: 95 },
  { name: 'Canva', icon: '🖼️', category: 'Design', level: 98 },
  { name: 'WordPress', icon: '🌐', category: 'Web', level: 80 },
  { name: 'Mailchimp', icon: '📧', category: 'Marketing', level: 85 },
  { name: 'Microsoft Office', icon: '💼', category: 'Productivity', level: 95 },
  { name: 'Google Workspace', icon: '🔗', category: 'Productivity', level: 98 },
]

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<string | null>('wvea')

  return (
    <section id="experience" className="bg-bg-light section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-tag justify-center mb-4">
            <span className="w-8 h-0.5 bg-orange inline-block" />
            My Journey
            <span className="w-8 h-0.5 bg-orange inline-block" />
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary mb-4">
            Experience & Tools
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A proven track record delivering impactful communications across international
            development and humanitarian organisations in East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Timeline ── */}
          <div className="reveal-left">
            <h3 className="font-heading font-bold text-2xl text-text-primary mb-8 flex items-center gap-3">
              <span className="w-10 h-1 bg-un-blue inline-block" />
              Professional Experience
            </h3>

            <div className="relative pl-14">
              {/* Vertical line */}
              <div className="timeline-line" />

              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className={`stagger-${idx + 1}`}>
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                      style={{ background: exp.color, top: `${idx === 0 ? 0 : 'auto'}`, marginTop: idx === 0 ? 0 : undefined }}
                    >
                      {idx + 1}
                    </div>

                    <div
                      className={`bg-white rounded-2xl p-6 shadow-card cursor-pointer transition-all duration-300 border-2 ${
                        expanded === exp.id ? 'border-un-blue' : 'border-transparent hover:border-un-blue/30'
                      }`}
                      onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-heading font-bold text-text-primary text-lg">{exp.org}</h4>
                          <p className="text-un-blue font-semibold text-sm mt-0.5">{exp.role}</p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="text-text-secondary text-xs flex items-center gap-1">
                              📅 {exp.period}
                            </span>
                            <span className="text-text-secondary text-xs flex items-center gap-1">
                              📍 {exp.location}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            expanded === exp.id ? 'bg-un-blue text-white rotate-180' : 'bg-bg-light text-text-secondary'
                          }`}
                        >
                          ↓
                        </div>
                      </div>

                      {/* Expanded content */}
                      {expanded === exp.id && (
                        <div className="mt-5 pt-5 border-t border-border">
                          <h5 className="font-semibold text-text-primary text-sm mb-3">Key Achievements</h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="flex gap-2 text-sm text-text-secondary">
                                <span className="text-orange mt-0.5 flex-shrink-0">▸</span>
                                {a}
                              </li>
                            ))}
                          </ul>

                          {exp.projects.length > 0 && (
                            <div className="mt-5">
                              <h5 className="font-semibold text-text-primary text-sm mb-3">Related Work</h5>
                              <div className="flex gap-2 flex-wrap">
                                {exp.projects.map((src, i) => (
                                  <div key={i} className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Tools ── */}
          <div className="reveal-right">
            <h3 className="font-heading font-bold text-2xl text-text-primary mb-8 flex items-center gap-3">
              <span className="w-10 h-1 bg-orange inline-block" />
              Tools I Use
            </h3>

            <p className="text-text-secondary text-sm mb-8 leading-relaxed">
              I am proficient in a range of creative tools for storytelling and communications within
              international NGOs — producing industry-standard designs and videos that strengthen
              narrative impact across multiple platforms.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <div
                  key={tool.name}
                  className={`tool-card bg-white rounded-xl p-4 border border-border text-center cursor-default transition-all duration-300 hover:-translate-y-1 stagger-${(i % 5) + 1}`}
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <div className="font-semibold text-text-primary text-xs leading-tight mb-2">{tool.name}</div>

                  {/* Proficiency bar */}
                  <div className="w-full bg-bg-light rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-un-blue transition-all duration-1000"
                      style={{ width: `${tool.level}%` }}
                    />
                  </div>
                  <div className="text-un-blue text-xs font-medium mt-1">{tool.level}%</div>

                  <span className="inline-block bg-orange/10 text-orange text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
