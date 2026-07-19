import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from './registry'

export const metadata: Metadata = {
  title: 'Articles',
  alternates: { canonical: '/articles' },
  description:
    'Web-native research notes by Tao An: interactive figures, permanent URLs, citation metadata.',
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="subpage articles-page">
      <main className="page-articles" id="main">
        <section className="hero hero-solo">
          <div className="hero-content">
            <h1 className="hero-title">
              <strong>
                <span className="word-fade underline" style={{ '--i': 0 } as React.CSSProperties}>
                  Articles.
                </span>
              </strong>
            </h1>
            <p className="hero-description fade-in" style={{ animationDelay: '0.6s' }}>
              <strong>Research notes in a web-native format</strong>: interactive figures where a
              static PDF falls short, permanent URLs, and citation metadata. Longer-form and less
              formal than the <Link href="/research">papers</Link>.{' '}
              <a href="/feed.xml">Subscribe via RSS</a>.
            </p>
          </div>
        </section>

        <section className="articles-section" id="articles">
          <h2 className="section-title-small fade-on-scroll">All Notes</h2>
          <div className="publication-simple-list fade-on-scroll">
            {sorted.map((a) => (
              <div className="publication-simple-item" key={a.slug}>
                <div className="publication-simple-meta">
                  <span className="venue-year">{formatDate(a.date)}</span>
                  {a.tags?.map((t) => (
                    <span className="topic-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="publication-simple-body">
                  <Link className="publication-simple-title" href={`/articles/${a.slug}`}>
                    {a.title}
                  </Link>
                  <p className="publication-simple-tldr">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
