import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Terri Mwaura',
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
