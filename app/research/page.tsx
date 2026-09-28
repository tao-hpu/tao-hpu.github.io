import type { Metadata } from 'next'
import PublicationsJsonLd from '@/components/PublicationsJsonLd'
import { SITE_URL } from '@/lib/site'
import BibtexToggle from './BibtexToggle'
import PublicationList from './PublicationList'
import { academicService } from './publications'

const RESEARCH_DESCRIPTION =
  'Papers by Tao An: a TMLR survey on intervention timing for always-on assistants, an HHAI 2026 paper on AI as equalizer or amplifier, and preprints on LLM memory, metascience, and interpretability.'

export const metadata: Metadata = {
  title: 'Research',
  description: RESEARCH_DESCRIPTION,
  alternates: { canonical: '/research' },
  openGraph: {
    title: 'Research · Tao An',
    description: RESEARCH_DESCRIPTION,
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
      <PublicationsJsonLd />
    </div>
  )
}
