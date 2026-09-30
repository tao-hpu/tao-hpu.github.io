import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Building',
  alternates: { canonical: '/building' },
  description:
    'Products and deployments by Tao An and FIM Labs: FIM One (source-available enterprise agent platform), Zico contract management, research tools, and AI systems for government, legal, and healthcare clients.',
  openGraph: {
    title: 'Building · Tao An',
    description: 'FIM product family and selected production deployments.',
    url: 'https://tao-hpu.github.io/building',
  },
}

// role: how FIM Labs was involved, one vocabulary for every row. Left out
// where the engagement type is not on record.
const DEPLOYMENTS: { client: string; role?: string; title: string; summary: string }[] = [
  {
    client: 'Tsinghua',
    role: 'Direct',
    title: 'AI Writing Platform, Tsinghua University',
    summary:
      'Real-time text analysis, grammar and logic feedback, AI-assisted drafting, and teacher-assisted grading for students.',
  },
  {
    client: 'Government',
    role: 'Self-built',
    title: 'Regulatory-Document & Legal-Aid Review Systems',
    summary:
      'Custom model plus RAG for government legal review; review cycles went from weeks to hours, with over 60% less manual work.',
  },
  {
    client: 'Customs',
    role: 'Subcontractor',
    title: 'Trade-Index Analytics & AI Species-Nomenclature Database',
    summary:
      'Big-data monitoring of technical-trade trends and AI species identification for import compliance, on a China Customs platform.',
  },
  {
    client: 'PUMCH',
    role: 'Application layer',
    title: 'Gynecology Medical Knowledge Graph',
    summary:
      'Structured gynecology knowledge graph for clinical decision support, deployed in a Peking Union Medical College Hospital project.',
  },
  {
    client: 'PUMCH',
    role: 'Application layer',
    title: 'POP Surgical-Approach Recommendation System',
    summary:
      'Surgical-approach recommendation for pelvic-organ-prolapse (POP) management, deployed in a Peking Union Medical College Hospital project.',
  },
  {
    client: 'Ditan',
    role: 'Co-built',
    title: 'Atlas: Specialty Follow-Up-Care Platform',
    summary:
      'Patient follow-up and care management for specialty departments, built and deployed with Beijing Ditan Hospital.',
  },
  {
    client: 'Ditan',
    role: 'Pro bono',
    title: 'HIV Drug-Interaction Reference',
    summary:
      'Drug-drug interaction lookup for HIV therapy with Beijing Ditan Hospital / WHO Collaborating Centre.',
  },
  {
    client: 'Peking Univ.',
    title: 'Quantitative-Paleontology Platform',
    summary: 'Quantitative-analysis and teaching platform for paleontology.',
  },
]

export default function Building() {
  return (
    <div className="subpage building-page">
      <main className="page-building" id="main">
        {/* Hero Section */}
        <section className="hero hero-solo">
          <div className="hero-content">
            <h1 className="hero-title">
              <strong>
                <span className="word-fade underline" style={{ '--i': 0 } as CSSProperties}>
                  Building.
                </span>
              </strong>
            </h1>
            <p className="hero-description fade-in" style={{ animationDelay: '0.6s' }}>
              Founder of{' '}
              <a href="https://fim.ai" target="_blank" rel="noopener noreferrer">
                <strong>FIM&nbsp;Labs</strong>
              </a>{' '}
              (&#127480;&#127468;&nbsp;Singapore · &#127464;&#127475;&nbsp;Beijing).{' '}
              <strong>Products and deployments</strong> for government, legal, healthcare, and
              academic institutions. Courses, coding utilities, and upstream contributions are on{' '}
              <a href="/opensource">
                <strong>Open Source</strong>
              </a>
              .
            </p>

            <nav className="section-jump-links" aria-label="On this page">
              <a href="#flagship">FIM One</a>
              <a href="#products">Products</a>
              <a href="#deployments">Deployments</a>
              <a href="#media">Featured in</a>
            </nav>
          </div>
        </section>

        {/* Flagship */}
        <section className="featured-project-section" id="flagship">
          <h2 className="section-title-small fade-on-scroll">Flagship product</h2>
          <a
            href="https://github.com/fim-ai/fim-one/"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-project-box fade-on-scroll"
          >
            <div className="featured-project-content">
              <div className="featured-project-header">
                <span className="featured-project-badge">Source-available</span>
              </div>
              <h3 className="featured-project-name">FIM One</h3>
              <p className="featured-project-desc">
                Self-hosted, model-agnostic enterprise agent platform that connects agents to the
                systems a company already runs (ERP, CRM, OA, databases, Feishu, WeCom, Slack)
                without changing that infrastructure. DAG planning, ReAct reasoning, a RAG pipeline,
                a visual workflow editor, and MCP support. Released under the FIM One Source
                Available License: the code is public and can be self-hosted; it is not an
                OSI-approved open-source license.
              </p>
              <div className="featured-project-tags">
                <span className="project-tag">Agent Runtime</span>
                <span className="project-tag">Enterprise AI</span>
                <span className="project-tag">RAG Pipeline</span>
                <span className="project-tag">China + Global Stack</span>
              </div>
              <span className="featured-project-cta">View on GitHub &rarr;</span>
            </div>
          </a>
        </section>

        {/* Product family */}
        <section className="publications-section" id="products">
          <h2 className="section-title-small fade-on-scroll">FIM Product Family</h2>
          <div className="publication-simple-list fade-on-scroll">
            <a
              href="https://zico.fim.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Legal</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Zico ↗</span>
                <p className="publication-simple-tldr">Self-hosted contract-lifecycle management: drafting, AI risk review, negotiation, approval, and archiving, integrated with Feishu, WeCom, DingTalk, or an existing OA system.</p>
              </div>
            </a>

            <a
              href="https://aha.fim.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Reading</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Aha. ↗</span>
                <p className="publication-simple-tldr">Paste an arXiv link and read the paper side by side with a plain-language explanation. Free to use.</p>
              </div>
            </a>

            <a
              href="https://cito.fim.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Search</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Cito ↗</span>
                <p className="publication-simple-tldr">Semantic search over academic papers: start from a landmark paper and pull the neighborhood around it by meaning, not keywords. Runs over Semantic Scholar with SPECTER2 embeddings.</p>
              </div>
            </a>

            <a
              href="https://hido.fim.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Peer review</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Hido ↗</span>
                <p className="publication-simple-tldr">Anonymous code hosting for double-blind peer review. Hand over a GitHub repo; reviewers get a no-login link to browse, download, and clone an identity-stripped mirror. One anonymization pipeline, prerendered for static serving.</p>
              </div>
            </a>
          </div>
        </section>

        {/* Selected Deployments */}
        <section className="publications-section" id="deployments">
          <h2 className="section-title-small fade-on-scroll">Selected Deployments</h2>
          <div className="publication-simple-list fade-on-scroll">
            {DEPLOYMENTS.map((d) => (
              <div className="publication-simple-item" key={d.title}>
                <div className="publication-simple-meta">
                  <span className="venue-badge">{d.client}</span>
                  {d.role && <span className="venue-badge venue-badge-secondary">{d.role}</span>}
                </div>
                <div className="publication-simple-body">
                  <span className="publication-simple-title">{d.title}</span>
                  <p className="publication-simple-tldr">{d.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured In Section */}
        <section className="featured-section" id="media">
          <h2 className="section-title-small fade-on-scroll">Featured In</h2>
          <div className="featured-list fade-on-scroll">
            <a
              href="https://medium.com/@sanjays_8381/if-i-had-to-launch-ai-in-2026-id-start-here-expert-interview-ca62024f2ae8"
              target="_blank"
              rel="noopener noreferrer"
              className="featured-item"
            >
              <div className="featured-content">
                <span className="featured-source">Medium &middot; Sanjay Singhania</span>
                <h3 className="featured-title">The Truth About AI Right Now: An Expert Interview Without the Hype</h3>
                <p className="featured-excerpt">
                  &ldquo;If I had to launch AI in 2026, I&rsquo;d start here&rdquo;: what works in real deployments,
                  where AI creates measurable value today, and common technical decisions that go wrong.
                </p>
                <span className="featured-date">January 2026</span>
              </div>
            </a>
          </div>
        </section>

      </main>
    </div>
  )
}
