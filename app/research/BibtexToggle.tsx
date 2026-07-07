'use client'

import { useEffect } from 'react'

/**
 * BibTeX toggle — show/hide the code block below the clicked button without
 * moving it. Mirrors the legacy page script via event delegation: flip
 * aria-expanded and toggle `hidden` on the <pre> that is the nextElementSibling
 * of the closest .publication-simple-links.
 */
export default function BibtexToggle() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest('.bibtex-toggle')
      if (!btn) return
      const pre = btn.closest('.publication-simple-links')
        ?.nextElementSibling as HTMLElement | null
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!expanded))
      if (pre) pre.hidden = expanded
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
