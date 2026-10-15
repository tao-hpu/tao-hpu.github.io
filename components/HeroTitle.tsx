import { SITE_TAGLINE } from '@/lib/site'

/** Phrases in SITE_TAGLINE that carry the accent underline; absent ones render plain. */
const UNDERLINED = /(production LLMs|act\.)/

export default function HeroTitle() {
  return (
    <p className="hero-title">
      <strong>
        {SITE_TAGLINE.split(UNDERLINED).map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="underline">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </strong>
    </p>
  )
}
