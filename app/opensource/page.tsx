import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tao An · Open Source',
  alternates: { canonical: '/opensource' },
  description:
    'Open-source courses and developer tools by Tao An: a from-scratch LLM course, an IELTS whitepaper, tuto for corpus-scale citation-integrity auditing, AI-coding utilities for Claude Code, and ops automation. Free and contribution-welcome.',
  keywords:
    'Tao An, open source, linalg-to-attention, llm-from-scratch, ielts-whitepaper, IELTS, tuto, citation integrity, citation auditing, research tools, nano-spec, Claude Code, AI coding tools, DevOps, ACME, SSL automation',
  openGraph: {
    title: 'Tao An · Open Source',
    description: 'Open courses, AI-coding utilities, and ops automation, all open source.',
    type: 'website',
    url: 'https://tao-hpu.github.io/opensource.html',
    images: [
      {
        url: 'https://tao-hpu.github.io/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Tao An: From industry to academia, building AI that works.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tao An · Open Source',
    description: 'Open courses, AI-coding utilities, and ops automation, all open source.',
    images: ['https://tao-hpu.github.io/images/og-cover.jpg'],
  },
}

export default function OpenSource() {
  return (
    <div className="subpage opensource-page">
      <main className="page-opensource">
        {/* Hero Section */}
        <section className="hero hero-solo">
          <div className="hero-content">
            <h1 className="hero-title">
              <strong>
                <span className="word-fade underline" style={{ '--i': 0 } as React.CSSProperties}>
                  Open
                </span>{' '}
                <span className="word-fade" style={{ '--i': 1 } as React.CSSProperties}>
                  Source.
                </span>
              </strong>
            </h1>
            <p className="hero-description fade-in" style={{ animationDelay: '0.6s' }}>
              <strong>Open courses</strong> &mdash; from building an LLM from scratch to
              reverse-engineering the IELTS &mdash; a handful of <strong>AI-coding utilities</strong>{' '}
              for Claude&nbsp;Code, and the <strong>ops automation</strong> I rely on day to day.
              Everything here is free, permissively licensed, and open to contributions &mdash; built
              in the open while building FIM.
            </p>
          </div>
        </section>

        {/* Learning Section */}
        <section className="publications-section" id="learning">
          <h2 className="section-title-small fade-on-scroll">Learning</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Course</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
                <span className="venue-badge venue-badge-secondary">React · TypeScript</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://l2a.fim.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linalg-to-attention &mdash; 线性代数 → 注意力
                </a>
                <p className="publication-simple-tldr">
                  The visual prelude to <em>llm-from-scratch</em>: building from a single vector all
                  the way up to the attention mechanism, one geometric move at a time. Every page
                  answers a single <em>why</em> &mdash; drag a slider, change a parameter, watch the
                  geometry shift, then one line ties it straight back to LLMs. From vectors and
                  matrices through SVD, softmax, and cross-entropy to self-attention and the
                  Transformer block &mdash; <strong>35 interactive lessons across 9 parts</strong>, so
                  you understand the math behind training, fine-tuning, and inference instead of just
                  calling an API.
                </p>
                <div className="publication-simple-links">
                  <a href="https://l2a.fim.ai" target="_blank" rel="noopener noreferrer">
                    Read online
                  </a>
                  <a
                    href="https://github.com/tao-hpu/linalg-to-attention"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Course</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
                <span className="venue-badge venue-badge-secondary">Python · HTML</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://learn-llm.fim.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  llm-from-scratch &mdash; 从 0 到 1 手搓大模型
                </a>
                <p className="publication-simple-tldr">
                  A from-scratch LLM course in Chinese: build a Transformer by hand, line by line,
                  starting from a character-level bigram and working all the way up to reproducing{' '}
                  <strong>GPT-2 124M</strong> &mdash; with interactive in-browser visualizations at
                  every step. Aimed at readers who want to understand attention, training, and
                  sampling by writing the code, not just calling an API.
                </p>
                <div className="publication-simple-links">
                  <a href="https://learn-llm.fim.ai" target="_blank" rel="noopener noreferrer">
                    Read online
                  </a>
                  <a
                    href="https://github.com/tao-hpu/llm-from-scratch"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Notes</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
                <span className="venue-badge venue-badge-secondary">React · TypeScript</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://algo.fim.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  algo-viz &mdash; 算法可视化实验室
                </a>
                <p className="publication-simple-tldr">
                  The visual counterpart to the LLM courses, turned on algorithms themselves: drag a
                  handle, watch a sorting pass or a graph traversal rearrange, and read off the
                  geometric idea underneath. A living notebook in Chinese that grows one algorithm at a
                  time, for readers who want to <em>see</em> why an algorithm works instead of
                  memorizing its steps.
                </p>
                <div className="publication-simple-links">
                  <a href="https://algo.fim.ai" target="_blank" rel="noopener noreferrer">
                    Read online
                  </a>
                  <a
                    href="https://github.com/tao-hpu/algo-viz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Course</span>
                <span className="venue-badge venue-badge-secondary">中文 · Chinese</span>
                <span className="venue-badge venue-badge-secondary">React · TypeScript</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://ielts.fim.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ielts-whitepaper &mdash; 雅思白皮书
                </a>
                <p className="publication-simple-tldr">
                  Treats IELTS not as an English exam but as{' '}
                  <strong>a scoring system you can reverse-engineer</strong>: starting from the
                  official band descriptors and working backwards to what each of Listening, Reading,
                  Writing, and Speaking actually rewards &mdash; covering score-allocation strategy,
                  question-type maps, speaking and writing frameworks, and a
                  diagnose&nbsp;&rarr;&nbsp;prescribe&nbsp;&rarr;&nbsp;retrain prep loop. Written in
                  Chinese, for everyone heading out into the world.
                </p>
                <div className="publication-simple-links">
                  <a href="https://ielts.fim.ai" target="_blank" rel="noopener noreferrer">
                    Read online
                  </a>
                  <a
                    href="https://github.com/tao-hpu/ielts-whitepaper"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Tools Section */}
        <section className="publications-section" id="research-tools">
          <h2 className="section-title-small fade-on-scroll">Research Tools</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">
                  <svg className="badge-star" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.2l2.95 6.36 6.85.66-5.16 4.57 1.5 6.71L12 17.6l-6.14 3.5 1.5-6.71L2.2 9.22l6.85-.66z" />
                  </svg>
                  Featured
                </span>
                <span className="venue-badge venue-badge-secondary">Python</span>
                <span className="venue-badge venue-badge-secondary">Apache-2.0</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/fim-ai/tuto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tuto &mdash; Citation-integrity auditing at corpus scale
                </a>
                <p className="publication-simple-tldr">
                  Audits whether a paper's references actually exist and, for claim citations, whether
                  the cited paper really supports the claim. The first run swept all{' '}
                  <strong>209,985 references</strong> in the ACL&nbsp;2026 proceedings (4,459 papers):
                  only 2 came back confirmed nonexistent (0.001%), so fabrication is not the real
                  problem, while <strong>16% of papers</strong> carry at least one confirmed
                  unsupported citation. It publishes its own first-pass precision (13%), because the
                  number-one enemy of automated citation checking is its own false positives.
                </p>
                <div className="publication-simple-links">
                  <a href="https://github.com/fim-ai/tuto" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href="https://tuto.fim.ai/report" target="_blank" rel="noopener noreferrer">
                    Report
                  </a>
                  <a href="https://tuto.fim.ai/check" target="_blank" rel="noopener noreferrer">
                    Check a paper
                  </a>
                  <Link href="/articles/acl-2026-citation-audit">Companion note</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Coding Section */}
        <section className="publications-section" id="ai-coding">
          <h2 className="section-title-small fade-on-scroll">AI Coding</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">
                  <svg className="badge-star" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.2l2.95 6.36 6.85.66-5.16 4.57 1.5 6.71L12 17.6l-6.14 3.5 1.5-6.71L2.2 9.22l6.85-.66z" />
                  </svg>
                  Featured
                </span>
                <span className="venue-badge venue-badge-secondary">Methodology</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/tao-hpu/nano-spec"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nano-spec &mdash; Spec-driven thinking, nano-sized docs
                </a>
                <p className="publication-simple-tldr">
                  A lightweight task-specification format for AI-assisted development. Instead of
                  heavyweight specs or no spec at all, nano-spec captures just enough intent &mdash;
                  goal, constraints, acceptance &mdash; in a tiny document the model and you can both
                  hold in your head, so agents build the right thing on the first pass.
                </p>
                <div className="publication-simple-links">
                  <a
                    href="https://github.com/tao-hpu/nano-spec"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Toolkit</span>
                <span className="venue-badge venue-badge-secondary">Python</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/tao-hpu/tao-ai-toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tao-ai-toolkit &mdash; Agents &amp; commands for AI coding
                </a>
                <p className="publication-simple-tldr">
                  A curated collection of specialized AI coding agents and slash commands for
                  Claude&nbsp;Code and other AI coding tools &mdash; the same workflows I use in
                  production, packaged so you can drop them into your own setup.
                </p>
                <div className="publication-simple-links">
                  <a
                    href="https://github.com/tao-hpu/tao-ai-toolkit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">CLI</span>
                <span className="venue-badge venue-badge-secondary">TypeScript</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/tao-hpu/ccmap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ccmap &mdash; Coding heatmap for Claude Code + Codex
                </a>
                <p className="publication-simple-tldr">
                  Scans your local Claude&nbsp;Code and Codex usage and renders a GitHub-style coding
                  heatmap &mdash; both as an embeddable badge and a shareable HTML report, so you can
                  see when and how much you actually code with AI assistants.
                </p>
                <div className="publication-simple-links">
                  <a href="https://github.com/tao-hpu/ccmap" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contributions Section */}
        <section className="publications-section" id="contributions">
          <h2 className="section-title-small fade-on-scroll">Contributions</h2>

          <ul className="contribution-list fade-on-scroll">
            <li className="contribution-item">
              <span className="contribution-status">Merged</span>
              <span className="contribution-text">
                <a
                  href="https://github.com/openai/openai-agents-python/pull/3749"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  openai/openai-agents-python
                </a>{' '}
                &mdash; fixed a resume-time bug where a pending nested agent-as-tool approval could
                bind to the wrong tool call after an earlier entry was filtered out during
                deserialization. Root-caused with a failing regression test;{' '}
                <a
                  href="https://github.com/openai/openai-agents-python/commit/60d3f95219654d68e0a43789ecbd600e38ee2606"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  co-authored into main
                </a>
                .
              </span>
            </li>
          </ul>
        </section>

        {/* DevOps Section */}
        <section className="publications-section" id="devops">
          <h2 className="section-title-small fade-on-scroll">DevOps</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Ops</span>
                <span className="venue-badge venue-badge-secondary">Shell</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/tao-hpu/certease"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  certease &mdash; Bash ACME / SSL orchestration
                </a>
                <p className="publication-simple-tldr">
                  One-command TLS certificates for heterogeneous fleets. Auto-detects the nginx flavor
                  (standard / LNMP / BT panel), gives you unified observability (<code>doctor</code> /{' '}
                  <code>status</code>), and falls back across CAs
                  (ZeroSSL&nbsp;&rarr;&nbsp;Let's&nbsp;Encrypt) &mdash; built for ops managing many
                  servers that were never set up the same way twice.
                </p>
                <div className="publication-simple-links">
                  <a
                    href="https://github.com/tao-hpu/certease"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
