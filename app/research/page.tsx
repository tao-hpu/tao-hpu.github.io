import type { Metadata } from 'next'
import Link from 'next/link'
import BibtexToggle from './BibtexToggle'

export const metadata: Metadata = {
  title: 'Tao An · Research',
  alternates: { canonical: '/research' },
}

export default function ResearchPage() {
  return (
    <div className="subpage research-page">
      <main className="page-research">
        {/* Hero Section */}
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
              and <strong>knowledge graphs</strong>: formalizing a decade of production practice into
              reproducible research. MS in Artificial Intelligence, Hawaii Pacific University (2026).
            </p>
          </div>
        </section>

        {/* Publications Section */}
        <section className="publications-section" id="publications">
          <h2 className="section-title-small fade-on-scroll">Publications &amp; Patents</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Under Review</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-interp">Interpretability</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://github.com/tao-hpu/jspace-replication"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Registers, Not Plans: What Lives in a Language Model&rsquo;s Workspace That Isn&rsquo;t on
                  Its Tongue
                </a>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; An independent replication and reframing of Anthropic&rsquo;s
                  &ldquo;global workspace&rdquo; (Jacobian-lens) claim on open Qwen3 models. A{' '}
                  <em>mouth-exclusion</em> audit&mdash;scoring a lens readout as covert only when its token is
                  far outside the model&rsquo;s own next-token distribution&mdash;splits the workspace: covert
                  content survives almost only for <em>context registers</em> (the conversation&rsquo;s language,
                  a corrupted word&rsquo;s intended form), while <em>content plans</em> (rhyme, arithmetic,
                  associations) fall to a permutation floor. The surviving registers are causally load-bearing
                  under amplitude-matched steering, and workspace edits rewrite the model&rsquo;s representation
                  of the question itself across a 1.7B&ndash;14B scale ladder.
                </p>
                <div className="publication-simple-links">
                  <a href="https://github.com/tao-hpu/jspace-replication" target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                  <Link href="/articles/workspace-registers">Interactive note</Link>
                </div>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Awaiting Submission</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-safety">AI Safety</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">
                  CGEP: Toward Detecting and Attributing GEO Poisoning in Chinese AI Search
                </span>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; Defines GEO-poisoning detection and attribution for Chinese
                  generative search (DeepSeek, Doubao, Kimi): a five-technique taxonomy of coordinated,
                  inauthentic manipulation, a task reframing from attack-success to detection &rarr;
                  classification &rarr; <em>account-cluster attribution</em>, and a legally-constructed synthetic
                  benchmark. A provenance pilot shows detection and attribution need different substrates&mdash;
                  content features detect that manipulation happened (F1&nbsp;0.93) but only an account-interaction
                  graph attributes it to a seller cluster (0.96)&mdash;and a confidence-gated fusion covers the
                  taxonomy where a learned GNN and a zero-shot LLM both fail.
                </p>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Under Review</span>
                <span className="venue-badge venue-badge-secondary">TMLR</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-hai">Human&ndash;AI</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://openreview.net/forum?id=6ukieTMBcG"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Preference Centroid: Consensus Density Governs Output Dispersion in Aligned LLMs
                </a>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong>, Shuai Feng &mdash; Sampling an aligned LLM repeatedly and
                  embedding the completions, output dispersion (mean pairwise cosine distance) is
                  governed by the <em>consensus density</em> of the task&mdash;near-zero on factual
                  prompts, wide on open-ended ones (Spearman &rho;&nbsp;=&nbsp;0.85), replicating on a
                  second model and predicted by held-out judges that score only the prompt
                  (&rho;&nbsp;=&nbsp;&minus;0.91). A matched base-vs-instruct comparison shows alignment
                  amplifies a gradient the pretrained base already carries, compressing the
                  high-consensus end ~8.7-fold against 1.8-fold at the low end&mdash;grounding the
                  &ldquo;equalizer vs. amplifier&rdquo; boundary at the distribution level rather than
                  in posited task complexity.
                </p>
                <div className="publication-simple-links">
                  <a href="https://openreview.net/forum?id=6ukieTMBcG" target="_blank" rel="noopener noreferrer">
                    OpenReview
                  </a>
                  <Link href="/articles/consensus-dispersion">Interactive note</Link>
                  <button type="button" className="bibtex-toggle" aria-expanded="false">
                    BibTeX
                  </button>
                </div>
                <pre className="bibtex-pre" hidden>
                  {`@misc{an2026preference,
  title  = {The Preference Centroid: Consensus Density Governs
            Output Dispersion in Aligned LLMs},
  author = {An, Tao and Feng, Shuai},
  year   = {2026},
  note   = {Under review at TMLR},
  url    = {`}
                  <a href="https://openreview.net/forum?id=6ukieTMBcG">
                    https://openreview.net/forum?id=6ukieTMBcG
                  </a>
                  {`}
}`}
                </pre>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Under Review</span>
                <span className="venue-badge venue-badge-secondary">ARR</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-mem">LLM Memory</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://arxiv.org/abs/2601.00821"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  It&rsquo;s Fidelity, Not Structure: Verbatim Chunks Beat Lossy Artifact Extraction in
                  Long-Conversation LLM Memory
                </a>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; A controlled ablation isolating the stored memory
                  representation inside one fixed retrieve&ndash;rerank&ndash;reason pipeline:
                  LLM-extracted typed artifacts versus verbatim conversation chunks, holding the model,
                  retriever, reranker, and judge constant. Verbatim chunks win by 15.9 points on LoCoMo
                  (43.9% vs. 28.0%) and 22.0 points on LongMemEval-S (67.4% vs. 45.4%); the
                  extracted-artifact pipeline never beats naive RAG. The mechanism is{' '}
                  <em>lossy distillation</em>&mdash;extraction discards verbatim detail that chunks
                  retain for free&mdash;so structured memory should augment verbatim text, not replace
                  it.
                </p>
                <div className="publication-simple-links">
                  <a href="https://arxiv.org/abs/2601.00821" target="_blank" rel="noopener noreferrer">
                    arXiv
                  </a>
                  <a href="https://aha.fim.ai/paper/2601.00821v3" target="_blank" rel="noopener noreferrer">
                    Read on aha.
                  </a>
                  <Link href="/articles/verbatim-memory">Interactive note</Link>
                  <a href="https://arxiv.org/pdf/2601.00821" target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                  <a href="https://github.com/tao-hpu/cog-canvas" target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                  <a
                    href="https://huggingface.co/datasets/tao-hpu/cog-canvas-benchmark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dataset
                  </a>
                  <button type="button" className="bibtex-toggle" aria-expanded="false">
                    BibTeX
                  </button>
                </div>
                <pre className="bibtex-pre" hidden>
                  {`@article{an2026fidelity,
  title   = {It's Fidelity, Not Structure: Verbatim Chunks Beat Lossy
             Artifact Extraction in Long-Conversation LLM Memory},
  author  = {An, Tao},
  journal = {arXiv preprint arXiv:2601.00821},
  year    = {2026}
}`}
                </pre>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">
                  <svg className="badge-star" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.2l2.95 6.36 6.85.66-5.16 4.57 1.5 6.71L12 17.6l-6.14 3.5 1.5-6.71L2.2 9.22l6.85-.66z" />
                  </svg>
                  HHAI 2026
                </span>
                <span className="venue-badge venue-badge-secondary">IOS Press</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-hai">Human&ndash;AI</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://arxiv.org/abs/2512.10961"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AI as Equalizer or Amplifier? Task Complexity as the Moderating Factor for Human
                  Expertise in Hybrid Intelligence Systems
                </a>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; Published in the proceedings of the 5th International
                  Conference on Hybrid Human-Artificial Intelligence (HHAI&nbsp;2026, Brussels), IOS
                  Press <em>Frontiers in Artificial Intelligence and Applications</em> vol.&nbsp;423,
                  pp.&nbsp;212&ndash;220 (open access, CC&nbsp;BY-NC). Drawing on structured field
                  observations since mid-2024, this position paper reconciles the &ldquo;AI as
                  equalizer&rdquo; and &ldquo;AI as amplifier&rdquo; debates: AI narrows
                  novice&ndash;expert gaps on routine, well-structured tasks but amplifies them on
                  complex tasks requiring deep judgment. Domain expertise&mdash;not prompt
                  engineering&mdash;determines who benefits most from AI.
                </p>
                <div className="publication-simple-links">
                  <a href="https://arxiv.org/abs/2512.10961" target="_blank" rel="noopener noreferrer">
                    arXiv
                  </a>
                  <a href="https://aha.fim.ai/paper/2512.10961v2" target="_blank" rel="noopener noreferrer">
                    Read on aha.
                  </a>
                  <a href="https://arxiv.org/pdf/2512.10961" target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                  <a href="https://doi.org/10.3233/FAIA260506" target="_blank" rel="noopener noreferrer">
                    DOI
                  </a>
                  <a
                    href="https://ebooks.iospress.nl/doi/10.3233/FAIA260506"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IOS Press (Open Access)
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=dzhSFIvbmUU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Talk (video)
                  </a>
                  <a href="https://hhai-conference.org/2026/" target="_blank" rel="noopener noreferrer">
                    Conference
                  </a>
                  <button type="button" className="bibtex-toggle" aria-expanded="false">
                    BibTeX
                  </button>
                </div>
                <pre className="bibtex-pre" hidden>
                  {`@inproceedings{an2026equalizer,
  title     = {AI as Equalizer or Amplifier? Task Complexity as the
               Moderating Factor for Human Expertise in Hybrid
               Intelligence Systems},
  author    = {An, Tao},
  booktitle = {Proc. 5th Int. Conf. on Hybrid Human-Artificial
               Intelligence (HHAI 2026)},
  series    = {Frontiers in Artificial Intelligence and Applications},
  volume    = {423},
  pages     = {212--220},
  publisher = {IOS Press},
  year      = {2026},
  doi       = {10.3233/FAIA260506}
}`}
                </pre>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Preprint</span>
                <span className="venue-year">2025</span>
                <span className="topic-tag topic-mem">LLM Memory</span>
              </div>
              <div className="publication-simple-body">
                <a
                  className="publication-simple-title"
                  href="https://arxiv.org/abs/2508.13171"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cognitive Workspace: Active Memory Management for LLMs
                </a>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; Proposes Cognitive Workspace, a paradigm transcending
                  traditional RAG by emulating human cognitive mechanisms: active memory management,
                  hierarchical cognitive buffers, and task-driven context optimization. Achieves a
                  58.6% memory-reuse rate (vs. 0% for RAG) with 17&ndash;18% net efficiency gain.
                </p>
                <div className="publication-simple-links">
                  <a href="https://arxiv.org/abs/2508.13171" target="_blank" rel="noopener noreferrer">
                    arXiv
                  </a>
                  <a href="https://aha.fim.ai/paper/2508.13171v1" target="_blank" rel="noopener noreferrer">
                    Read on aha.
                  </a>
                  <Link href="/articles/active-memory-revisited">Interactive note</Link>
                  <a href="https://arxiv.org/pdf/2508.13171" target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                  <button type="button" className="bibtex-toggle" aria-expanded="false">
                    BibTeX
                  </button>
                </div>
                <pre className="bibtex-pre" hidden>
                  {`@article{an2025cognitive,
  title   = {Cognitive Workspace: Active Memory Management
             for Large Language Models},
  author  = {An, Tao},
  journal = {arXiv preprint arXiv:2508.13171},
  year    = {2025}
}`}
                </pre>
              </div>
            </div>

            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Patent</span>
                <span className="venue-badge venue-badge-secondary">Pending</span>
                <span className="venue-year">2026</span>
                <span className="topic-tag topic-kg">Knowledge Graphs</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">
                  A Graph-Neural-Network Method for Data-Information Recommendation
                </span>
                <p className="publication-simple-tldr">
                  <strong>Tao An</strong> &mdash; Chinese invention patent, under examination. GNN-based
                  recommendation over heterogeneous data&ndash;information graphs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Service Section */}
        <section className="publications-section" id="service">
          <h2 className="section-title-small fade-on-scroll">Academic Service</h2>

          <div className="publication-simple-list fade-on-scroll">
            <div className="publication-simple-item">
              <div className="publication-simple-meta">
                <span className="venue-badge">Ethics Reviewer</span>
                <span className="venue-badge venue-badge-secondary">NeurIPS 2026</span>
                <span className="venue-year">2026</span>
              </div>
              <div className="publication-simple-body">
                <span className="publication-simple-title">
                  Ethics Review Committee &mdash; Conference on Neural Information Processing Systems
                  (NeurIPS 2026)
                </span>
                <p className="publication-simple-tldr">
                  Reviewing submissions flagged for ethical concerns against the NeurIPS Code of
                  Ethics&mdash;data provenance and informed consent, dual-use and misuse risk,
                  human-subjects considerations, and broader societal impact.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BibtexToggle />
    </div>
  )
}
