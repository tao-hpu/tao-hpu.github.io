import { SITE_TAGLINE } from '@/lib/site'

/** A stable first-paint thesis keeps the title readable before hydration. */
export default function HeroTitle() {
  return (
    <p className="hero-title">
      <strong>{SITE_TAGLINE}</strong>
    </p>
  )
}
