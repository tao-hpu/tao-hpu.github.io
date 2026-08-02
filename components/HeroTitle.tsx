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
 * Home hero h1: picks one curated research thesis per page load.
 * Not a carousel. Metadata stays on SITE_TAGLINE.
 */
export default function HeroTitle() {
  const [slogan, setSlogan] = useState<HeroSlogan | null>(null)

  useEffect(() => {
    setSlogan(pickHeroSlogan())
  }, [])

  const ready = slogan !== null
  const display = slogan ?? DEFAULT_HERO_SLOGAN

  return (
    <h1
      key={ready ? display.id : 'pending'}
      className="hero-title"
      data-ready={ready ? 'true' : 'false'}
      aria-label={display.plain}
      aria-busy={!ready}
    >
      <SloganSpans slogan={display} animate={ready} />
    </h1>
  )
}
