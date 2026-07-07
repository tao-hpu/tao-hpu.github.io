'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/building', label: 'Building' },
  { href: '/opensource', label: 'Open Source' },
  { href: '/articles', label: 'Articles' },
]

function normalize(path: string): string {
  const p = path.replace(/\.html$/, '').replace(/\/$/, '')
  return p === '' ? '/' : p
}

export default function Nav() {
  const pathname = normalize(usePathname() ?? '/')
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="nav">
      <div className="nav-container" ref={navRef}>
        <Link href="/" className="nav-logo">
          <span className="logo-char">T</span>
          <span className="logo-char">\</span>
          <span className="logo-char">A</span>
        </Link>

        <div className="nav-right">
          <div className={`nav-links${open ? ' open' : ''}`}>
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? 'active' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <button
            className={`nav-toggle${open ? ' is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation()
              setOpen((v) => !v)
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // The inline script in layout has already stamped data-theme before paint.
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'dark' || current === 'light') setTheme(current)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light', false)
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyTheme(next: 'light' | 'dark', persist: boolean) {
    document.documentElement.setAttribute('data-theme', next)
    if (persist) localStorage.setItem('theme', next)
    setTheme(next)
    // Custom event so page visualizations (e.g. D3) can re-render colors.
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }))
  }

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      aria-label="Toggle dark mode"
      onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark', true)}
    >
      <svg className="sun-icon" viewBox="0 0 24 24" style={{ display: theme === 'dark' ? 'block' : 'none' }}>
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg className="moon-icon" viewBox="0 0 24 24" style={{ display: theme === 'dark' ? 'none' : 'block' }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  )
}
