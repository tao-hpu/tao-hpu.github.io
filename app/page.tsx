import type { Metadata } from 'next'
import HeroTitle from '@/components/HeroTitle'
import ResearchInstrument from '@/components/ResearchInstrument'
import { SITE_DESCRIPTION, SITE_EMAIL, SITE_TAGLINE, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Tao An',
    description: SITE_TAGLINE,
    url: SITE_URL,
  },
}

export default function Home() {
  return (
    <div className="home-page">
      <main id="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-eyebrow fade-in">Tao An · AI researcher</h1>
            <HeroTitle />
            <p className="hero-description fade-in" style={{ animationDelay: '1.0s' }}>
              I study <strong>LLM memory</strong>, <strong>retrieval</strong>, and when AI
              assistants should act. My research draws on a decade in tech and systems shipped
              for legal and healthcare.
            </p>
            <p className="hero-links fade-in" style={{ animationDelay: '1.25s' }}>
              <a href="/research">Research →</a>
              <a href="/articles">Interactive notes →</a>
              <a href={`mailto:${SITE_EMAIL}`}>Email</a>
            </p>
          </div>
          <div className="hero-visual">
            <ResearchInstrument />
          </div>
        </section>

        {/* Explore */}
        <section className="cards-section" id="explore">
          <div className="home-explore-heading">
            <h2 className="section-title">Explore the work</h2>
          </div>
          <div className="cards-grid cards-grid-4">
            <a
              href="/research"
              className="card card-green fade-on-scroll"
              aria-label="Research: papers and academic work"
            >
              <div className="card-icon">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 12 L50 12 L62 24 L62 68 L18 68 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M50 12 L50 24 L62 24" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="24" y="32" width="32" height="4" rx="1" fill="currentColor" />
                  <rect x="24" y="42" width="32" height="4" rx="1" fill="currentColor" />
                  <rect x="24" y="52" width="20" height="4" rx="1" fill="currentColor" />
                </svg>
              </div>
              <span className="card-eyebrow">Academia</span>
              <h3 className="card-title">Research →</h3>
              <p className="card-subtitle">Papers on memory, retrieval, and when agents should act</p>
            </a>

            <a
              href="/articles"
              className="card card-amber fade-on-scroll"
              aria-label="Articles: interactive research notes"
            >
              <div className="card-icon">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="16" y="14" width="48" height="52" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M28 28h24M28 38h24M28 48h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="56" cy="54" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M56 50v8M52 54h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="card-eyebrow">Notes</span>
              <h3 className="card-title">Articles →</h3>
              <p className="card-subtitle">Research ideas explained through interactive figures</p>
            </a>

            <a
              href="/building"
              className="card card-purple fade-on-scroll"
              aria-label="Building: products and deployments"
            >
              <div className="card-icon">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 66 L68 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <rect x="20" y="50" width="40" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="22" y="34" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="41" y="34" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="31" y="18" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="card-eyebrow">Industry</span>
              <h3 className="card-title">Building →</h3>
              <p className="card-subtitle">Products and AI systems built with FIM Labs</p>
            </a>

            <a
              href="/opensource"
              className="card card-beige fade-on-scroll"
              aria-label="Open Source: courses and developer tools"
            >
              <div className="card-icon">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M30 24 L16 40 L30 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M50 24 L64 40 L50 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <line x1="44" y1="20" x2="36" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="card-eyebrow">Community</span>
              <h3 className="card-title">Open Source&nbsp;→</h3>
              <p className="card-subtitle">Open courses, developer tools, and upstream contributions</p>
            </a>
          </div>
        </section>
        {/* About Section */}
        <section className="about-section" id="about">
          <div className="about-container">
            <div className="about-avatar fade-on-scroll">
              <img
                src="/images/avatar-400.jpg"
                alt="Tao An"
                className="avatar-img"
                width={400}
                height={400}
                decoding="async"
              />
            </div>
            <div className="about-content fade-on-scroll">
              <h2 className="section-title">About Tao An</h2>
              <p className="about-text">
                Founder of{' '}
                <a href="https://fim.ai" target="_blank" rel="noopener noreferrer">
                  <strong>FIM Labs Pte Ltd</strong>
                </a>{' '}
                (Singapore · Beijing), building{' '}
                <a href="https://github.com/fim-ai/fim-one" target="_blank" rel="noopener noreferrer">
                  <strong>FIM One</strong>
                </a>
                , a source-available agent platform that connects agents to the enterprise systems
                a company already runs. I work across research and delivery, from agent memory
                to production AI for government and enterprise clients.
              </p>
              <p className="about-text">
                MS in Artificial Intelligence, Hawaii Pacific University (2026). Working in AI
                since 2021, with interests in memory architectures, knowledge graphs, and
                intervention timing for always-on assistants.
              </p>
            </div>
          </div>
        </section>

        {/* News */}
        <section className="news-section" id="news">
          <div className="news-container">
            <header className="news-header">
              <h2 className="section-title">News</h2>
              <p>Recent research, writing, and work in the open.</p>
            </header>
            <div className="news-list">
              <div className="news-item">
                <time className="news-date" dateTime="2026-09">2026.09</time>
                <p className="news-body">
                  <span className="news-dot news-dot-research"></span>
                  <a href="https://doi.org/10.5281/zenodo.21696223" target="_blank" rel="noopener noreferrer">
                    Recombination or Discovery?
                  </a>{' '}
                  accepted as a poster at the <strong>NeurIPS&nbsp;2026 Workshop on AI for
                  Meta-Science</strong> (AI4MetaScience, non-archival).
                </p>
              </div>
              <div className="news-item">
                <time className="news-date" dateTime="2026-09">2026.09</time>
                <p className="news-body">
                  <span className="news-dot news-dot-research"></span>
                  <a href="https://openreview.net/forum?id=b0yKEdAXEr" target="_blank" rel="noopener noreferrer">
                    When Should the Agent Speak?
                  </a>{' '}
                  published in <strong>TMLR</strong> (Transactions on Machine Learning Research), a
                  survey of intervention timing for always-on assistants.
                </p>
              </div>
              <div className="news-item">
                <time className="news-date" dateTime="2026-09">2026.09</time>
                <p className="news-body">
                  <span className="news-dot news-dot-building"></span>
                  New interactive note:{' '}
                  <a href="/articles/equalizer-amplifier">Same Tool, Opposite Verdicts</a>, the
                  companion to the HHAI&nbsp;2026 paper.
                </p>
              </div>
              <div className="news-item">
                <time className="news-date" dateTime="2026-09">2026.09</time>
                <p className="news-body">
                  <span className="news-dot news-dot-building"></span>
                  Fixes merged upstream in openai-agents-python, docling, acme.sh, and docx-editor.{' '}
                  <a href="/opensource#contributions">Contributions</a>
                </p>
              </div>
            </div>
            <details className="news-archive">
              <summary>Earlier updates <span>2025–2026</span></summary>
              <div className="news-list">
                <div className="news-item">
                  <time className="news-date" dateTime="2026-07">2026.07</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>New preprint:{' '}
                    <a href="https://doi.org/10.5281/zenodo.21696223" target="_blank" rel="noopener noreferrer">
                      Recombination or Discovery?
                    </a>
                    , a retrieval-grounded novelty audit of machine-generated research papers.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-07">2026.07</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>New preprint:{' '}
                    <a href="https://doi.org/10.5281/zenodo.21452779" target="_blank" rel="noopener noreferrer">
                      Weakening in Real Time
                    </a>
                    , on the decade-long decoupling of artifact reuse and citation.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-07">2026.07</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>
                    <a href="https://doi.org/10.3233/FAIA260506" target="_blank" rel="noopener noreferrer">
                      AI as Equalizer or Amplifier?
                    </a>{' '}
                    published in the <strong>HHAI&nbsp;2026</strong> proceedings (IOS Press, FAIA
                    vol.&nbsp;423, open access).
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-07">2026.07</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-building"></span>
                    New interactive notes:{' '}
                    <a href="/articles/citation-decoupling">citation decoupling</a>,{' '}
                    <a href="/articles/intervention-timing">intervention timing</a>, and the{' '}
                    <a href="/articles/acl-2026-citation-audit">ACL 2026 citation audit</a>.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-06">2026.06</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>Joined the{' '}
                    <a href="/research#service">NeurIPS 2026 Ethics Review Committee</a>.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-04">2026.04</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>
                    <a href="https://arxiv.org/abs/2512.10961" target="_blank" rel="noopener noreferrer">
                      AI as Equalizer or Amplifier?
                    </a>{' '}
                    accepted to <strong>HHAI&nbsp;2026</strong> (Brussels; IOS Press proceedings).
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-01">2026.01</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>New preprint:{' '}
                    <a href="https://arxiv.org/abs/2601.00821" target="_blank" rel="noopener noreferrer">
                      Fidelity Before Structure
                    </a>
                    , a controlled ablation of memory representations for long LLM conversations.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2026-01">2026.01</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-building"></span>Interviewed by Sanjay Singhania
                    on Medium:{' '}
                    <a
                      href="https://medium.com/@sanjays_8381/if-i-had-to-launch-ai-in-2026-id-start-here-expert-interview-ca62024f2ae8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      The Truth About AI Right Now
                    </a>
                    , on what actually works in real deployments.
                  </p>
                </div>
                <div className="news-item">
                  <time className="news-date" dateTime="2025-08">2025.08</time>
                  <p className="news-body">
                    <span className="news-dot news-dot-research"></span>New preprint:{' '}
                    <a href="https://arxiv.org/abs/2508.13171" target="_blank" rel="noopener noreferrer">
                      Cognitive Workspace: Active Memory Management for LLMs
                    </a>
                    .
                  </p>
                </div>
              </div>
            </details>
            <p className="news-legend" aria-hidden="true">
              <span>
                <span className="news-dot news-dot-research"></span>Research
              </span>
              <span>
                <span className="news-dot news-dot-building"></span>Building &amp; writing
              </span>
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
