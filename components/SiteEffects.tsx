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
    // An element counts as seen once it enters the viewport or is already
    // above it: an anchor jump or a fast fling can skip past a section
    // without it ever intersecting, and it must not stay invisible.
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('visible')
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )
    const targets = document.querySelectorAll('.fade-on-scroll')
    targets.forEach((el) => fadeObserver.observe(el))

    // Printing: show faded sections, and open collapsed abstracts, since a
    // closed <details> prints without its content.
    const revealAll = () => {
      targets.forEach((el) => el.classList.add('visible'))
      document.querySelectorAll('details').forEach((d) => (d.open = true))
    }
    window.addEventListener('beforeprint', revealAll)

    return () => {
      fadeObserver.disconnect()
      window.removeEventListener('beforeprint', revealAll)
    }
  }, [pathname])

  return null
}
