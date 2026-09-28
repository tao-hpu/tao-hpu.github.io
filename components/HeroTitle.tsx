'use client'

import {
  DEFAULT_HERO_SLOGAN,
  pickHeroSlogan,
  type HeroSlogan,
} from '@/lib/hero-slogans'
import { Fragment, useEffect, useState, type CSSProperties } from 'react'

function SloganSpans({ slogan, animate }: { slogan: HeroSlogan; animate: boolean }) {
  return (
    <strong>
      {slogan.segments.map((seg, i) => (
        <Fragment key={`${slogan.id}-${i}`}>
          {i > 0 ? ' ' : null}
          <span
            className={[
              'word-fade',
              seg.underline ? 'underline' : '',
              animate ? '' : 'word-fade-pending',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ '--i': i } as CSSProperties}
          >
            {seg.text}
          </span>
        </Fragment>
      ))}
    </strong>
  )
}

/**
 * Home hero headline: picks one curated research thesis per page load.
 * Not a carousel. Rendered as <p>: the page's h1 is the name above it, so the
 * heading search engines read does not change on every load.
 */
export default function HeroTitle() {
  const [slogan, setSlogan] = useState<HeroSlogan | null>(null)

  useEffect(() => {
    setSlogan(pickHeroSlogan())
  }, [])

  const ready = slogan !== null
  const display = slogan ?? DEFAULT_HERO_SLOGAN

  return (
    <p
      key={ready ? display.id : 'pending'}
      className="hero-title"
      data-ready={ready ? 'true' : 'false'}
    >
      <SloganSpans slogan={display} animate={ready} />
    </p>
  )
}
