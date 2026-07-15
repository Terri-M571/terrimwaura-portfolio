import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Terri Mwaura | Communications & Creative Media Professional',
  description:
    'Portfolio of Terri Mwaura — Communications, Digital Media, Graphic Design, Photography, Videography & Publication Design Specialist working with international NGOs.',
  keywords: [
    'Terri Mwaura', 'Communications Specialist', 'Digital Media', 'Graphic Design',
    'Photography', 'Videography', 'Publication Design', 'NGO Communications',
    'World Vision', 'Plan International', 'Kenya',
  ],
  openGraph: {
    title: 'Terri Mwaura | Communications & Creative Media Professional',
    description: 'Telling real stories that inspire people and create impact.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
