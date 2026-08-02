import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'
import BibtexToggle from './BibtexToggle'
import PublicationList from './PublicationList'
import {
  academicService,
  dreamSeries,
  dreamSeriesIntro,
} from './publications'

export const metadata: Metadata = {
  title: 'Research',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/research' },
  openGraph: {
    title: 'Research · Tao An',
    description: 'Papers on LLM memory, RAG, intervention timing, and human–AI systems.',
    type: 'website',
    url: `${SITE_URL}/research`,
  },
}

export default function ResearchPage() {
  return (
    <div className="subpage research-page">
      <main className="page-research" id="main">
        <section className="hero hero-solo">
          <div className="hero-content">
            <h1 className="hero-title">
              <strong>
                <span className="word-fade underline" style={{ '--i': 0 } as React.CSSProperties}>
                  Research.
                </span>
              </strong>
            </h1>
            <p className="hero-description fade-in" style={{ animationDelay: '0.6s' }}>
              <strong>Retrieval-augmented generation</strong>, <strong>LLM long-term memory</strong>,
              and <strong>when agents should intervene</strong>: formalizing production practice into
              reproducible research. MS in Artificial Intelligence, Hawaii Pacific University (2026).
            </p>
          </div>
        </section>

        <section className="publications-section" id="publications">
          <h2 className="section-title-small fade-on-scroll">Publications &amp; Patents</h2>
          <div className="fade-on-scroll">
            <PublicationList />
          </div>
        </section>

        <section className="publications-section" id="dream-series">
          <h2 className="section-title-small fade-on-scroll">Dream series</h2>
          <div className="dream-series-wrap fade-on-scroll">
            <p className="dream-series-intro">{dreamSeriesIntro}</p>
            <div className="publication-simple-list dream-series-list">
              {dreamSeries.map((p) => (
                <div className="publication-simple-item is-coming-soon" key={p.id}>
                  <div className="publication-simple-meta">
                    <span className="venue-badge venue-badge-coming-soon">Coming soon</span>
                    <span className="venue-year">2026</span>
                    <span className="topic-tag topic-dream">Dream series</span>
                  </div>
                  <div className="publication-simple-body">
                    <span className="publication-simple-title">{p.title}</span>
                    <p className="publication-takeaway">{p.takeaway}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="publications-section" id="service">
          <h2 className="section-title-small fade-on-scroll">Academic Service</h2>
          <div className="publication-simple-list fade-on-scroll">
            {academicService.map((s) => (
              <div className="publication-simple-item" key={s.id}>
                <div className="publication-simple-meta">
                  {s.badges.map((b) => (
                    <span
                      key={b.label}
                      className={`venue-badge${b.secondary ? ' venue-badge-secondary' : ''}`}
                    >
                      {b.label}
                    </span>
                  ))}
                  <span className="venue-year">{s.year}</span>
                </div>
                <div className="publication-simple-body">
                  <span className="publication-simple-title">{s.title}</span>
                  <p className="publication-simple-tldr">{s.tldr}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BibtexToggle />
    </div>
  )
}
