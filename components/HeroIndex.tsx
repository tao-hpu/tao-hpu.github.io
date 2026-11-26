import Link from 'next/link'

type Item = {
  title: string
  venue: string
  href: string
}

const items: Item[] = [
  {
    title: 'Fidelity Before Structure',
    venue: 'EACL 2027 · Main (to appear)',
    href: 'https://arxiv.org/abs/2601.00821',
  },
  {
    title: 'When Should the Agent Speak?',
    venue: 'TMLR 2026 · Survey',
    href: 'https://openreview.net/forum?id=b0yKEdAXEr',
  },
  {
    title: 'Consensus Density Predicts Output Dispersion',
    venue: 'TMLR 2026',
    href: 'https://openreview.net/forum?id=6ukieTMBcG',
  },
  {
    title: 'AI as Equalizer or Amplifier?',
    venue: 'HHAI 2026 · IOS Press',
    href: 'https://doi.org/10.3233/FAIA260506',
  },
]

export default function HeroIndex() {
  return (
    <aside className="hero-index" aria-labelledby="hero-index-label">
      <p id="hero-index-label" className="hero-index-eyebrow">
        Recent publications
      </p>
      <ul className="hero-index-list">
        {items.map((it) => (
          <li key={it.href} className="hero-index-item">
            <a
              href={it.href}
              className="hero-index-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero-index-title">{it.title}</span>
              <span className="hero-index-venue">{it.venue}</span>
            </a>
          </li>
        ))}
      </ul>
      <Link href="/research" className="hero-index-more">
        All publications <span aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
