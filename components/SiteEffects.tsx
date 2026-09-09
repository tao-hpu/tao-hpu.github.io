'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Shared per-page behaviors from the legacy site, re-run on every route
 * change: scroll-triggered fade-in.
 *
 * Anchor scrolling used to be handled here, by preventDefault plus a
 * manual scrollTo offset by the nav height. It is gone: html now carries
 * scroll-behavior: smooth and scroll-padding-top, so the browser does the
 * same job, and it keeps what the handler dropped — the URL hash updates,
 * so a section link can be copied, and the back button works.
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

    return () => {
      fadeObserver.disconnect()
    }
  }, [pathname])

  return null
}
