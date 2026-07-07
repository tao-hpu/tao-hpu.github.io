'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Shared per-page behaviors from the legacy site, re-run on every route
 * change: scroll-triggered fade-in and smooth anchor scrolling with nav
 * offset.
 */
export default function SiteEffects() {
  const pathname = usePathname()

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.fade-on-scroll').forEach((el) => fadeObserver.observe(el))

    const onAnchorClick = (e: Event) => {
      const anchor = (e.target as Element).closest('a[href^="#"]')
      if (!anchor) return
      const target = document.querySelector(anchor.getAttribute('href')!)
      if (!target) return
      e.preventDefault()
      const nav = document.querySelector('.nav')
      const navHeight = nav ? (nav as HTMLElement).offsetHeight : 0
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      fadeObserver.disconnect()
      document.removeEventListener('click', onAnchorClick)
    }
  }, [pathname])

  return null
}
