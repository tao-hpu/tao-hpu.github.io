export type PubLink = {
  label: string
  href: string
  /** Internal Next.js route (use Link) */
  internal?: boolean
}

export type Publication = {
  id: string
  title: string
  /** One-line scan-friendly takeaway */
  takeaway: string
  /** Longer abstract-style blurb (authors lead) */
  tldr: string
  year: string
  /**
   * Primary status for filtering.
   *
   * There is deliberately no "under review" value. Review status goes stale
   * between site deploys and names a venue that has not accepted the paper,
   * so a submission is listed by what is public about it — `preprint` when
   * there is a citable public version, `working` when there is not — and the
   * venue badge goes on only once the paper is accepted.
   */
  status: 'published' | 'preprint' | 'patent' | 'working'
  /** Author list for structured data; omit when Tao An is the sole author. */
  authors?: string[]
  badges: { label: string; secondary?: boolean; starred?: boolean }[]
  topics: { label: string; className?: string }[]
  /** Primary title href when title is a link */
  titleHref?: string
  links?: PubLink[]
  bibtex?: string
}

export const publications: Publication[] = [
  {
    id: 'machine-science-audit',
    title:
      'Recombination or Discovery? A Retrieval-Grounded Novelty Audit of Machine-Generated Research Papers',
    takeaway:
      'LLM novelty rates are exploratory upper bounds: retrieval misses most known prior art, and another LLM cannot certify a novelty verdict.',
    tldr: 'Tao An. Poster at the NeurIPS 2026 Workshop on AI for Meta-Science (AI4MetaScience; non-archival). A retrieval-grounded, protocol-frozen novelty audit of 166 machine-generated papers (FARS) against 166 topic-matched ICLR 2025 submissions. Each paper is decomposed into contribution claims on four facets (purpose, mechanism, evaluation, domain; 549 machine and 494 human contributions); prior art is retrieved under per-paper submission-date cutoffs; contributions are classified as covered, recombination, or facet-novel under a pre-registered two-judge protocol. Machine contributions are judged facet-novel more often than human ones (56.1% vs. 35.6%), and the gap rests mainly on the purpose facet: requiring an uncovered facet other than purpose shrinks it from 20.5 to 4.1 points (95% CI −0.3 to 8.5). The judge layer cannot be certified by another LLM: adversarial re-auditors return refutation rates from 0% to 100% on the same items depending on auditor model and prompt. A 106-pair gold prior-art audit finds the deployed retrieval surfaces the known prior art for only 25–29% of pairs per arm, so automated novelty rates are exploratory upper bounds. A companion integrity audit of 306 Agents4Science 2025 submissions finds hard fabrication evidence in 0/47 accepted versus 16/197 rejected (one-sided Fisher p = 0.029; 0.072 under conservative coding), an association that reflects both AI-reviewer detection and authors\' own disclosure.',
    year: '2026',
    // Accepted at a non-archival workshop: listed under Published, while the
    // badge says non-archival and the Zenodo DOI stays the citable record.
    status: 'published',
    badges: [
      { label: 'NeurIPS 2026 Workshop · AI4MetaScience' },
      { label: 'Poster · non-archival', secondary: true },
    ],
    topics: [{ label: 'Metascience', className: 'topic-meta' }],
    titleHref: 'https://doi.org/10.5281/zenodo.21696223',
    links: [
      { label: 'PDF (Zenodo)', href: 'https://doi.org/10.5281/zenodo.21696223' },
      { label: 'Code', href: 'https://github.com/tao-hpu/machine-science-audit' },
      { label: 'Video (7 min)', href: 'https://www.youtube.com/watch?v=uik29EAbfAY' },
      { label: 'Interactive note', href: '/articles/novelty-audit', internal: true },
    ],
    bibtex: `@misc{an2026recombination,
  title     = {Recombination or Discovery? A Retrieval-Grounded
               Novelty Audit of Machine-Generated Research Papers},
  author    = {An, Tao},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.21696223},
  note      = {Poster at the NeurIPS 2026 Workshop on AI for
               Meta-Science (non-archival)}
}`,
  },
  {
    id: 'what-citations-get-wrong',
    title:
      'What Citations Get Wrong: A Full-Corpus Audit of Reference Existence and Claim Support in a Major NLP Conference',
    takeaway:
      'Existence errors are a rounding error; a single-run claim-support audit has not established that it measured anything.',
    tldr: 'Tao An. Audits both promises a citation makes on the ACL 2026 proceedings treated as a census: 4,459 papers and 209,985 references. Existence holds: 91.0% of references resolve, and two references (0.001%) are confirmed nonexistent. Claim support, scored by a two-stage language-model judge, does not repeat. An audit of 2,110 claim citations from 100 papers put the confirmed support-defect rate at 0.95%; two further independent draws at the same commit returned 5.66% and 6.12%, pooling to 5.90% [5.12, 6.80] over 3,033 claim citations (7.9 SE from the audited figure). The gap sits in the support-judgment layer and traces to a first-pass judge whose model was read from an unlogged environment variable. The paper reports all three runs and takes the non-replication, not any single rate, as the principal finding: pin and log the judge, and repeatability returns. The existence census is unaffected.',
    year: '2026',
    status: 'working',
    badges: [{ label: 'Working paper' }],
    topics: [{ label: 'Metascience', className: 'topic-meta' }],
    titleHref: 'https://tuto.fim.ai/report',
    links: [
      { label: 'Report', href: 'https://tuto.fim.ai/report' },
      { label: 'Code', href: 'https://github.com/tao-hpu/tuto' },
      {
        label: 'Dataset (Zenodo)',
        href: 'https://doi.org/10.5281/zenodo.21452257',
      },
      {
        label: 'Interactive note',
        href: '/articles/acl-2026-citation-audit',
        internal: true,
      },
    ],
    bibtex: `@misc{an2026citations,
  title  = {What Citations Get Wrong: A Full-Corpus Audit of
            Reference Existence and Claim Support in a Major
            NLP Conference},
  author = {An, Tao},
  year   = {2026},
  note   = {Data DOI 10.5281/zenodo.21452257}
}`,
  },
  {
    id: 'reuse-citation-decoupling',
    title:
      'Weakening in Real Time: The Association Between Artifact Reuse and Citation in Artifact-Dense Research, 2015–2024',
    takeaway:
      'Reuse and citation came apart by half over a decade: a calendar-period effect, not an LLM effect, and it spares the tail.',
    tldr: 'Tao An. Links 20,529 arXiv papers published 2015–2025 to their author-designated GitHub repositories and estimates the rank association between annual fork flow and annual citation flow in every cohort-by-period cell. The association falls from roughly 0.45–0.50 in the late 2010s to roughly 0.25 by 2024, and the variation sits on the calendar-period axis rather than the publication-cohort axis: with period included the cohort coefficient is −0.0017 (p = 0.74), and the 2015 cohort, the same 262 papers throughout, declines from 0.49 to 0.04 over its own lifetime. Two candidate explanations fail on the correct axis. There is no discontinuity at the public release of general-purpose language models (−0.002, 95% CI [−0.061, +0.057]) and no gradient in field-level exposure to them (p = 0.82); nor does the citation mix degrade, with the share of substantively influential citations flat across the decade. Enumerating the full frame of 160,150 papers rather than sampling from it, the association among works that are both substantially reused and substantially cited shows no trend (−0.0031 per year, 95% CI [−0.0156, +0.0094], n = 3,885), an interval that excludes the full-sample estimate: the decoupling is a property of the population, not of its high-impact tail.',
    year: '2026',
    status: 'preprint',
    badges: [{ label: 'Preprint' }],
    topics: [{ label: 'Metascience', className: 'topic-meta' }],
    titleHref: 'https://doi.org/10.5281/zenodo.21452779',
    links: [
      { label: 'PDF (Zenodo)', href: 'https://doi.org/10.5281/zenodo.21452779' },
      {
        label: 'Replication package',
        href: 'https://doi.org/10.5281/zenodo.21444546',
      },
      { label: 'Interactive note', href: '/articles/citation-decoupling', internal: true },
    ],
    bibtex: `@misc{an2026weakening,
  title     = {Weakening in Real Time: The Association Between
               Artifact Reuse and Citation in Artifact-Dense
               Research, 2015--2024},
  author    = {An, Tao},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.21452779}
}`,
  },
  {
    id: 'intervention-timing',
    title:
      'When Should the Agent Speak? A Survey of Intervention Timing for Always-On AI Assistants',
    takeaway:
      'Intervene only when expected benefit exceeds interruption cost, and evaluate that cost term explicitly.',
    tldr: 'Tao An. Transactions on Machine Learning Research (TMLR), 2026. Surveys intervention timing for always-on assistants around one decision rule: intervene iff the expected benefit of acting exceeds the expected cost of interrupting. Reconnects two literatures that do not cite each other, the 1999–2017 interruptibility line that formalized interruption cost but had no capable actor, and the 2024–2026 proactive-agent wave that has actors but rediscovers the cost term only in fragments. Argues evaluation is the gating layer, and proposes a benchmark design for open-world intervention timing with an explicit cost term.',
    year: '2026',
    status: 'published',
    badges: [
      { label: 'TMLR 2026', starred: true },
      { label: 'Survey', secondary: true },
    ],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://openreview.net/forum?id=b0yKEdAXEr',
    links: [
      { label: 'OpenReview', href: 'https://openreview.net/forum?id=b0yKEdAXEr' },
      { label: 'Preprint (Zenodo)', href: 'https://doi.org/10.5281/zenodo.21438396' },
      { label: 'Video (6 min)', href: 'https://www.youtube.com/watch?v=roLy47J2m-M' },
      { label: 'Interactive note', href: '/articles/intervention-timing', internal: true },
      {
        label: 'Living map',
        href: 'https://github.com/tao-hpu/awesome-proactive-agents',
      },
    ],
    bibtex: `@article{an2026timing,
  title   = {When Should the Agent Speak? A Survey of
             Intervention Timing for Always-On AI Assistants},
  author  = {An, Tao},
  journal = {Transactions on Machine Learning Research},
  issn    = {2835-8856},
  year    = {2026},
  url     = {https://openreview.net/forum?id=b0yKEdAXEr}
}`,
  },
  {
    id: 'workspace-registers',
    title:
      "Registers, Not Plans: What Lives in a Language Model's Workspace That Isn't on Its Tongue",
    takeaway:
      'Covert workspace content is mostly context registers, not content plans, and it is causally load-bearing.',
    tldr: "Tao An. An independent replication and reframing of Anthropic's “global workspace” (Jacobian-lens) claim on open Qwen3 models. A mouth-exclusion audit, which scores a lens readout as covert only when its token is far outside the model's own next-token distribution, splits the workspace: covert content survives almost only for context registers (the conversation's language, a corrupted word's intended form), while content plans (rhyme, arithmetic, associations) fall to a permutation floor. The surviving registers are causally load-bearing under amplitude-matched steering, and workspace edits rewrite the model's representation of the question itself across a 1.7B–14B scale ladder. The register and capture findings reproduce on a second architecture (Gemma-2-2B).",
    year: '2026',
    status: 'working',
    badges: [{ label: 'Working paper' }],
    topics: [{ label: 'Interpretability', className: 'topic-interp' }],
    titleHref: 'https://github.com/tao-hpu/jspace-replication',
    links: [
      { label: 'Code', href: 'https://github.com/tao-hpu/jspace-replication' },
      { label: 'Interactive note', href: '/articles/workspace-registers', internal: true },
    ],
  },
  {
    id: 'cgep',
    title: 'CGEP: Toward Detecting and Attributing GEO Poisoning in Chinese AI Search',
    takeaway:
      'GEO poisoning needs detection and account-cluster attribution on different substrates, not only attack success.',
    tldr: 'Tao An. Defines GEO-poisoning detection and attribution for Chinese generative search (DeepSeek, Doubao, Kimi): a five-technique taxonomy of coordinated, inauthentic manipulation, a task reframing from attack-success to detection → classification → account-cluster attribution, and a legally-constructed synthetic benchmark. A provenance pilot shows detection and attribution need different substrates: content features detect that manipulation happened (F1 0.93), but only an account-interaction graph attributes it to a seller cluster (0.96). A confidence-gated fusion covers the taxonomy where a learned GNN and a zero-shot LLM both fail.',
    year: '2026',
    status: 'working',
    badges: [{ label: 'Working paper' }],
    topics: [{ label: 'AI Safety', className: 'topic-safety' }],
  },
  {
    id: 'preference-centroid',
    authors: ['Tao An', 'Shuai Feng'],
    title: 'Consensus Density Predicts Output Dispersion in Aligned LLMs',
    takeaway:
      'Output dispersion tracks task consensus density; alignment amplifies a gradient the base model already carries.',
    tldr: 'Tao An, Shuai Feng. Sampling an aligned LLM repeatedly and embedding the completions, output dispersion (mean pairwise cosine distance) tracks the consensus density of the task: near-zero on factual prompts, wide on open-ended ones (Spearman ρ = 0.85), replicating on a second model and predicted by held-out judges that score only the prompt (ρ = −0.91). A matched base-vs-instruct comparison shows alignment amplifies a gradient the pretrained base already carries, compressing the high-consensus end ~8.7-fold against 1.8-fold at the low end. This places the “equalizer vs. amplifier” boundary at the distribution level rather than in posited task complexity.',
    year: '2026',
    status: 'working',
    badges: [{ label: 'Working paper' }],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://openreview.net/forum?id=6ukieTMBcG',
    links: [
      { label: 'OpenReview', href: 'https://openreview.net/forum?id=6ukieTMBcG' },
      { label: 'Interactive note', href: '/articles/consensus-dispersion', internal: true },
    ],
    bibtex: `@misc{an2026consensus,
  title  = {Consensus Density Predicts Output Dispersion
            in Aligned LLMs},
  author = {An, Tao and Feng, Shuai},
  year   = {2026},
  url    = {https://openreview.net/forum?id=6ukieTMBcG}
}`,
  },
  {
    id: 'verbatim-memory',
    title:
      'Fidelity Before Structure: Verbatim Chunks Beat Lossy Artifact Extraction in Long-Conversation LLM Memory',
    takeaway:
      'Verbatim chunks beat lossy extracted artifacts by 16 to 22 points; structure should augment text, not replace it.',
    tldr: "Tao An. A controlled ablation isolating the stored memory representation inside one fixed retrieve-rerank-reason pipeline: LLM-extracted typed artifacts versus verbatim conversation chunks, holding the model, retriever, reranker, and judge constant. Verbatim chunks win by 15.9 points on LoCoMo (43.9% vs. 28.0%) and 22.0 points on LongMemEval-S (67.4% vs. 45.4%); the extracted-artifact pipeline never beats naive RAG. The mechanism is lossy distillation: extraction discards verbatim detail that chunks retain for free, so structured memory should augment verbatim text, not replace it. (Formerly titled It's Fidelity, Not Structure.)",
    year: '2026',
    status: 'preprint',
    badges: [{ label: 'Preprint' }],
    topics: [{ label: 'LLM Memory', className: 'topic-mem' }],
    titleHref: 'https://arxiv.org/abs/2601.00821',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2601.00821' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2601.00821' },
      { label: 'Code', href: 'https://github.com/tao-hpu/cog-canvas' },
      {
        label: 'Dataset',
        href: 'https://huggingface.co/datasets/tao-hpu/cog-canvas-benchmark',
      },
      { label: 'Interactive note', href: '/articles/verbatim-memory', internal: true },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2601.00821' },
    ],
    bibtex: `@article{an2026fidelity,
  title   = {Fidelity Before Structure: Verbatim Chunks Beat Lossy
             Artifact Extraction in Long-Conversation LLM Memory},
  author  = {An, Tao},
  journal = {arXiv preprint arXiv:2601.00821},
  year    = {2026},
  note    = {Formerly titled It's Fidelity, Not Structure}
}`,
  },
  {
    id: 'equalizer-amplifier',
    title:
      'AI as Equalizer or Amplifier? Task Complexity as the Moderating Factor for Human Expertise in Hybrid Intelligence Systems',
    takeaway:
      'AI equalizes on routine tasks and amplifies expertise on complex ones; domain skill matters more than prompt craft.',
    tldr: 'Tao An. Published in the proceedings of the 5th International Conference on Hybrid Human-Artificial Intelligence (HHAI 2026, Brussels), IOS Press Frontiers in Artificial Intelligence and Applications vol. 423, pp. 212–220 (open access, CC BY-NC). Drawing on structured field observations since mid-2024, this position paper reconciles the “AI as equalizer” and “AI as amplifier” debates: AI narrows novice–expert gaps on routine, well-structured tasks but amplifies them on complex tasks requiring deep judgment. Domain expertise, not prompt engineering, determines who benefits most from AI.',
    year: '2026',
    status: 'published',
    badges: [
      { label: 'HHAI 2026', starred: true },
      { label: 'IOS Press', secondary: true },
    ],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://doi.org/10.3233/FAIA260506',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.3233/FAIA260506' },
      {
        label: 'PDF (IOS Press, open access)',
        href: 'https://ebooks.iospress.nl/doi/10.3233/FAIA260506',
      },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2512.10961' },
      { label: 'Video (5 min)', href: 'https://www.youtube.com/watch?v=O5W_uMm9H8g' },
      { label: 'Talk', href: 'https://www.youtube.com/watch?v=dzhSFIvbmUU' },
      { label: 'Interactive note', href: '/articles/equalizer-amplifier', internal: true },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2512.10961' },
    ],
    bibtex: `@inproceedings{an2026equalizer,
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
}`,
  },
  {
    id: 'cognitive-workspace',
    title: 'Cognitive Workspace: Active Memory Management for LLMs',
    takeaway:
      'Active memory management over pure RAG. Reuse held up; curation as a replacement for verbatim history did not.',
    tldr: 'Tao An. Proposes Cognitive Workspace, an alternative to passive RAG modeled on working memory: active memory management, hierarchical cognitive buffers, and task-driven context optimization. The prototype reuses its own curated state on 58.6% of turns (vs. 0% for RAG), a 17–18% net efficiency gain. It did not test answer accuracy against a verbatim baseline; the 2026 Fidelity Before Structure ablation later found that write-time curation loses to verbatim chunks on accuracy.',
    year: '2025',
    status: 'preprint',
    badges: [{ label: 'Preprint' }],
    topics: [{ label: 'LLM Memory', className: 'topic-mem' }],
    titleHref: 'https://arxiv.org/abs/2508.13171',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2508.13171' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2508.13171' },
      { label: 'Interactive note', href: '/articles/active-memory-revisited', internal: true },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2508.13171' },
    ],
    bibtex: `@article{an2025cognitive,
  title   = {Cognitive Workspace: Active Memory Management
             for Large Language Models},
  author  = {An, Tao},
  journal = {arXiv preprint arXiv:2508.13171},
  year    = {2025}
}`,
  },
  {
    id: 'gnn-patent',
    title: 'A Graph-Neural-Network Method for Data-Information Recommendation',
    takeaway: 'Chinese invention patent (pending): GNN recommendation over heterogeneous graphs.',
    tldr: 'Tao An. Chinese invention patent, under examination. GNN-based recommendation over heterogeneous data–information graphs.',
    year: '2026',
    status: 'patent',
    badges: [
      { label: 'Patent' },
      { label: 'Pending', secondary: true },
    ],
    topics: [{ label: 'Knowledge Graphs', className: 'topic-kg' }],
  },
]

export const academicService = [
  {
    id: 'neurips-2026-ethics',
    badges: [
      { label: 'Ethics Reviewer' },
      { label: 'NeurIPS 2026', secondary: true },
    ],
    year: '2026',
    title:
      'Ethics Review Committee, Conference on Neural Information Processing Systems (NeurIPS 2026)',
    tldr: 'Reviewing submissions flagged for ethical concerns against the NeurIPS Code of Ethics: data provenance and informed consent, dual-use and misuse risk, human-subjects considerations, and broader societal impact.',
  },
]

export type FilterKey = 'all' | Publication['status'] | 'topic:' | string

export const STATUS_FILTERS: { key: Publication['status'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'preprint', label: 'Preprint' },
  { key: 'working', label: 'Working paper' },
  { key: 'patent', label: 'Patent' },
]
