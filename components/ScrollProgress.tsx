'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setWidth((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div id="scroll-progress" style={{ width: `${width}%` }} />
}
