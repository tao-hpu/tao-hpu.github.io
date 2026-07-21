import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Building',
  alternates: { canonical: '/building' },
  description:
    'Products and deployments by Tao An / FIM Labs: enterprise agent infrastructure, government, legal, and healthcare AI systems.',
  openGraph: {
    title: 'Building · Tao An',
    description: 'FIM product family and selected production deployments.',
    url: 'https://tao-hpu.github.io/building',
  },
}

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
              (&#127480;&#127468;&nbsp;Singapore). <strong>Products and deployments</strong> for
              government, legal, healthcare, and academic institutions. Courses, coding utilities, and
              the broader OSS catalog live on{' '}
              <a href="/opensource">
                <strong>Open Source</strong>
              </a>
              .
            </p>
          </div>
        </section>

        {/* Flagship */}
        <section className="featured-project-section" id="flagship">
          <h2 className="section-title-small fade-on-scroll">Flagship product (open source)</h2>
          <a
            href="https://github.com/fim-ai/fim-one/"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-project-box fade-on-scroll"
          >
            <div className="featured-project-content">
              <div className="featured-project-header">
                <span className="featured-project-badge">Popular on GitHub</span>
              </div>
              <h3 className="featured-project-name">FIM One</h3>
              <p className="featured-project-desc">
                Self-hosted, model-agnostic enterprise agent platform that wires agents to the systems you
                already run &mdash; ERP, CRM, OA, databases &mdash; without touching existing infrastructure.
                Intelligent DAG planning, ReAct reasoning, full RAG pipeline, visual workflow editor, MCP support.
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
              href="https://decks.fim.ai/fim-scout/"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Scout</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">FIM Scout ↗</span>
                <p className="publication-simple-tldr">Bid-intelligence pipeline &mdash; discovery, openness scoring, and tracking for government &amp; enterprise tenders.</p>
              </div>
            </a>

            <a
              href="https://decks.fim.ai/fim-paperwork/"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Paperwork</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">FIM Paperwork ↗</span>
                <p className="publication-simple-tldr">Turns source code into IP assets &mdash; software-copyright and patent-mining automation.</p>
              </div>
            </a>

            <a
              href="https://www.zicoly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Zico</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Zico ↗</span>
                <p className="publication-simple-tldr">Sovereign contract-lifecycle management &mdash; drafting, review, and tracking with data kept on-prem.</p>
              </div>
            </a>

            <a
              href="https://decks.fim.ai/atlas/"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Atlas</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Atlas ↗</span>
                <p className="publication-simple-tldr">Specialty follow-up-care platform (deployed with Beijing Ditan Hospital).</p>
              </div>
            </a>

            <a
              href="https://aha.fim.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Aha.</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Aha. ↗</span>
                <p className="publication-simple-tldr">Paste an arXiv link and read the paper side-by-side with a plain-language explanation &mdash; a free tool for understanding research faster.</p>
              </div>
            </a>

            <a
              href="https://cito.fim.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="publication-simple-item"
            >
              <div className="publication-simple-meta">
                <span className="venue-badge">Cito</span>
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
                <span className="venue-badge">Hido</span>
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
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Tsinghua</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">AI Writing Platform &mdash; Tsinghua University</span>
                <p className="publication-simple-tldr"><strong>Direct engagement.</strong> Real-time text analysis, grammar &amp; logic feedback, AI-assisted drafting and teacher-assisted grading for students.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Gov</span>
                <span className="venue-badge venue-badge-secondary">Legal</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Regulatory-Document &amp; Legal-Aid Review Systems</span>
                <p className="publication-simple-tldr"><strong>Self-built.</strong> Custom model + RAG for government legal review; cut review cycles from weeks to hours with 60%+ less manual work.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Customs</span>
                <span className="venue-badge venue-badge-secondary">subcontractor</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Trade-Index Analytics &amp; AI Species-Nomenclature Database</span>
                <p className="publication-simple-tldr">Big-data monitoring of technical-trade trends and AI species identification for import compliance; built as a development subcontractor on a China Customs platform.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">PUMCH</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Gynecology Medical Knowledge Graph</span>
                <p className="publication-simple-tldr">Structured gynecology knowledge graph powering clinical decision-support, deployed in a Peking Union Medical College Hospital project; built the application layer.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">PUMCH</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">POP Surgical-Approach Recommendation System</span>
                <p className="publication-simple-tldr">Automated surgical-approach recommendation for pelvic-organ-prolapse (POP) management, deployed in a Peking Union Medical College Hospital project; built the application layer.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Ditan</span>
                <span className="venue-badge venue-badge-secondary">Pro bono</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">HIV Drug-Interaction Reference</span>
                <p className="publication-simple-tldr">Drug&ndash;drug interaction lookup for HIV therapy with Beijing Ditan Hospital / WHO Collaborating Centre; pro bono.</p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Peking Univ.</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">Quantitative-Paleontology Platform</span>
                <p className="publication-simple-tldr">Quantitative-analysis and teaching platform for paleontology.</p>
              </div>
            </div>
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
                  "If I had to launch AI in 2026, I'd start here" &mdash; what's actually working in real deployments,
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
