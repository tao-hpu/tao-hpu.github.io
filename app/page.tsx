import NeuralNetwork from './NeuralNetwork'

export default function Home() {
  return (
    <div className="home-page">
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <strong>
                <span className="word-fade" style={{ '--i': 5 } as React.CSSProperties}>
                  From
                </span>{' '}
                <span className="word-fade underline" style={{ '--i': 2 } as React.CSSProperties}>
                  industry
                </span>{' '}
                <span className="word-fade" style={{ '--i': 7 } as React.CSSProperties}>
                  to
                </span>{' '}
                <span className="word-fade underline" style={{ '--i': 0 } as React.CSSProperties}>
                  academia,
                </span>{' '}
                <span className="word-fade" style={{ '--i': 6 } as React.CSSProperties}>
                  building
                </span>{' '}
                <span className="word-fade" style={{ '--i': 1 } as React.CSSProperties}>
                  AI
                </span>{' '}
                <span className="word-fade" style={{ '--i': 3 } as React.CSSProperties}>
                  that
                </span>{' '}
                <span className="word-fade" style={{ '--i': 8 } as React.CSSProperties}>
                  works.
                </span>
              </strong>
            </h1>
            <p className="hero-description fade-in" style={{ animationDelay: '1.2s' }}>
              <strong>MS in Artificial Intelligence</strong> from Hawaii Pacific University (2026). A
              decade in tech. Pivoted to <strong>AI in 2021</strong>. Now formalizing{' '}
              <strong>production experience</strong> through academic research.
            </p>
          </div>
          <div className="hero-visual fade-in" style={{ animationDelay: '0s' }}>
            {/* D3.js Neural Network */}
            <NeuralNetwork />
          </div>
        </section>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="about-container">
            <div className="about-avatar fade-on-scroll">
              <img src="/images/avatar.jpg" alt="Tao An" className="avatar-img" />
            </div>
            <div className="about-content fade-on-scroll">
              <h2 className="section-title">About Tao An</h2>
              <p className="about-text">
                Founder of{' '}
                <a href="https://fim.ai" target="_blank" rel="noopener noreferrer">
                  <strong>FIM Labs Pte Ltd</strong>
                </a>{' '}
                (🇸🇬 Singapore · 🇨🇳 Beijing), building{' '}
                <a href="https://github.com/fim-ai/fim-one" target="_blank" rel="noopener noreferrer">
                  <strong>FIM One</strong>
                </a>
                , an open-source AI connector hub that links agents to enterprise systems (Feishu,
                Slack, Teams &amp; more). Also serving government and enterprise clients in China,
                with production AI systems focused on <strong>legal</strong> and{' '}
                <strong>healthcare</strong> domains.
              </p>
              <p className="about-text">
                <strong>Research interests:</strong> Retrieval-Augmented Generation, LLM memory
                architectures, knowledge graphs.
              </p>
            </div>
          </div>
        </section>

        {/* News */}
        <section className="news-section" id="news">
          <h2 className="section-title-small fade-on-scroll">News</h2>
          <div className="news-list fade-on-scroll">
            <div className="news-item">
              <span className="news-date">2026.07</span>
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
              <span className="news-date">2026.06</span>
              <p className="news-body">
                <span className="news-dot news-dot-research"></span>Joined the{' '}
                <a href="/research#service">NeurIPS 2026 Ethics Review Committee</a>.
              </p>
            </div>
            <div className="news-item">
              <span className="news-date">2026.04</span>
              <p className="news-body">
                <span className="news-dot news-dot-research"></span>
                <a href="https://arxiv.org/abs/2512.10961" target="_blank" rel="noopener noreferrer">
                  AI as Equalizer or Amplifier?
                </a>{' '}
                accepted to <strong>HHAI&nbsp;2026</strong> (Brussels; IOS Press proceedings).
              </p>
            </div>
            <div className="news-item">
              <span className="news-date">2026.01</span>
              <p className="news-body">
                <span className="news-dot news-dot-research"></span>New preprint &mdash;{' '}
                <a href="https://arxiv.org/abs/2601.00821" target="_blank" rel="noopener noreferrer">
                  Verbatim Chunks Beat Extracted Artifacts
                </a>
                , a controlled ablation of memory representations for long LLM conversations (under
                review, ARR).
              </p>
            </div>
            <div className="news-item">
              <span className="news-date">2026.01</span>
              <p className="news-body">
                <span className="news-dot news-dot-building"></span>Interviewed by Medium &mdash;{' '}
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
              <span className="news-date">2025.08</span>
              <p className="news-body">
                <span className="news-dot news-dot-research"></span>New preprint &mdash;{' '}
                <a href="https://arxiv.org/abs/2508.13171" target="_blank" rel="noopener noreferrer">
                  Cognitive Workspace: Active Memory Management for LLMs
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Explore */}
        <section className="cards-section" id="explore">
          <div className="cards-grid">
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
              <h3 className="card-title">Research &rarr;</h3>
              <p className="card-subtitle">Papers &middot; LLM memory &middot; RAG &middot; knowledge graphs</p>
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
              <h3 className="card-title">Building &rarr;</h3>
              <p className="card-subtitle">FIM product family &middot; government &amp; healthcare AI</p>
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
              <h3 className="card-title">Open Source &rarr;</h3>
              <p className="card-subtitle">Open courses &middot; AI-coding tools &middot; ops automation</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
