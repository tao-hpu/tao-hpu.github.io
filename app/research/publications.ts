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
  /** Primary status for filtering */
  status: 'published' | 'under-review' | 'preprint' | 'patent'
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
    tldr: 'Tao An — A retrieval-grounded, protocol-frozen novelty audit of 166 machine-generated papers (FARS) against 166 topic-matched ICLR 2025 submissions. Each paper is decomposed into contribution claims on four facets (purpose, mechanism, evaluation, domain; 549 machine and 494 human contributions); prior art is retrieved under per-paper submission-date cutoffs; contributions are classified as covered, recombination, or facet-novel under a pre-registered two-judge protocol. Machine contributions are judged facet-novel more often than human ones (56.1% vs. 35.6%), but the comparison is not certifiable: an adversarial re-audit flags 15–25% of purpose-novel verdicts as potentially covered, and a 106-pair gold prior-art audit finds the deployed retrieval surfaces known prior art for only 25–29% of pairs per arm. Automated novelty rates are therefore exploratory upper bounds. A companion integrity audit of 306 Agents4Science 2025 submissions finds hard fabrication evidence in 0/47 accepted versus 16/197 rejected (one-sided Fisher p = 0.029).',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'NeurIPS 2026 Workshop · AI4MetaScience', secondary: true },
      { label: 'Preprint', secondary: true },
    ],
    topics: [{ label: 'Metascience', className: 'topic-meta' }],
    titleHref: 'https://doi.org/10.5281/zenodo.21696223',
    links: [
      { label: 'PDF (Zenodo)', href: 'https://doi.org/10.5281/zenodo.21696223' },
      { label: 'Code', href: 'https://github.com/tao-hpu/machine-science-audit' },
    ],
    bibtex: `@misc{an2026recombination,
  title     = {Recombination or Discovery? A Retrieval-Grounded
               Novelty Audit of Machine-Generated Research Papers},
  author    = {An, Tao},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.21696223},
  note      = {Under review at NeurIPS 2026 Workshop AI4MetaScience
              (non-archival)}
}`,
  },
  {
    id: 'what-citations-get-wrong',
    title:
      'What Citations Get Wrong: A Full-Corpus Audit of Reference Existence and Claim Support in a Major NLP Conference',
    takeaway:
      'Existence errors are a rounding error; a single-run claim-support audit has not established that it measured anything.',
    tldr: 'Tao An — Audits both promises a citation makes on the ACL 2026 proceedings treated as a census: 4,459 papers and 209,985 references. Existence holds: 91.0% of references resolve, and two references (0.001%) are confirmed nonexistent. Claim support, scored by a two-stage language-model judge, does not repeat. An audit of 2,110 claim citations from 100 papers put the confirmed support-defect rate at 0.95%; two further independent draws at the same commit returned 5.66% and 6.12%, pooling to 5.90% [5.12, 6.80] over 3,033 claim citations (7.9 SE from the audited figure). The gap sits in the support-judgment layer and traces to a first-pass judge whose model was read from an unlogged environment variable. The paper reports all three runs and takes the non-replication, not any single rate, as the principal finding: pin and log the judge, and repeatability returns. The existence census is unaffected.',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'Scientometrics · Technical checks', secondary: true },
    ],
    topics: [{ label: 'Metascience', className: 'topic-meta' }],
    titleHref: 'https://tuto.fim.ai/report',
    links: [
      { label: 'Report', href: 'https://tuto.fim.ai/report' },
      { label: 'Code', href: 'https://github.com/fim-ai/tuto' },
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
  note   = {Under review at Scientometrics;
            data DOI 10.5281/zenodo.21452257}
}`,
  },
  {
    id: 'reuse-citation-decoupling',
    title:
      'Weakening in Real Time: The Association Between Artifact Reuse and Citation in Artifact-Dense Research, 2015–2024',
    takeaway:
      'Reuse and citation came apart by half over a decade: a calendar-period effect, not an LLM effect, and it spares the tail.',
    tldr: 'Tao An — Links 20,529 arXiv papers published 2015–2025 to their author-designated GitHub repositories and estimates the rank association between annual fork flow and annual citation flow in every cohort-by-period cell. The association falls from roughly 0.45–0.50 in the late 2010s to roughly 0.25 by 2024, and the variation sits on the calendar-period axis rather than the publication-cohort axis: with period included the cohort coefficient is −0.0017 (p = 0.74), and the 2015 cohort, the same 262 papers throughout, declines from 0.49 to 0.04 over its own lifetime. Two candidate explanations fail on the correct axis. There is no discontinuity at the public release of general-purpose language models (−0.002, 95% CI [−0.061, +0.057]) and no gradient in field-level exposure to them (p = 0.82); nor does the citation mix degrade, with the share of substantively influential citations flat across the decade. Enumerating the full frame of 160,150 papers rather than sampling from it, the association among works that are both substantially reused and substantially cited shows no trend (−0.0031 per year, 95% CI [−0.0156, +0.0094], n = 3,885), an interval that excludes the full-sample estimate: the decoupling is a property of the population, not of its high-impact tail.',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'Scientometrics · With editor', secondary: true },
    ],
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
  doi       = {10.5281/zenodo.21452779},
  note      = {Under review at Scientometrics (with editor)}
}`,
  },
  {
    id: 'intervention-timing',
    title:
      'When Should the Agent Speak? A Survey of Intervention Timing for Always-On AI Assistants',
    takeaway:
      'Intervene only when expected benefit exceeds interruption cost—and evaluate that cost term explicitly.',
    tldr: 'Tao An — Surveys intervention timing for always-on assistants around one decision rule: intervene iff the expected benefit of acting exceeds the expected cost of interrupting. Reconnects two literatures that do not cite each other, the 1999–2017 interruptibility line that formalized interruption cost but had no capable actor, and the 2024–2026 proactive-agent wave that has actors but rediscovers the cost term only in fragments. Argues evaluation is the gating layer, and proposes a benchmark design for open-world intervention timing with an explicit cost term.',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'TMLR · Assigned AE', secondary: true },
      { label: 'Survey', secondary: true },
    ],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://doi.org/10.5281/zenodo.21438396',
    links: [
      { label: 'PDF (Zenodo)', href: 'https://doi.org/10.5281/zenodo.21438396' },
      { label: 'Interactive note', href: '/articles/intervention-timing', internal: true },
      {
        label: 'Living map',
        href: 'https://github.com/tao-hpu/awesome-proactive-agents',
      },
    ],
    bibtex: `@misc{an2026timing,
  title        = {When Should the Agent Speak? A Survey of
                  Intervention Timing for Always-On AI Assistants},
  author       = {An, Tao},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.21438396},
  note         = {Under review at TMLR (assigned AE)}
}`,
  },
  {
    id: 'workspace-registers',
    title:
      "Registers, Not Plans: What Lives in a Language Model's Workspace That Isn't on Its Tongue",
    takeaway:
      'Covert workspace content is mostly context registers, not content plans—and it is causally load-bearing.',
    tldr: "Tao An — An independent replication and reframing of Anthropic's “global workspace” (Jacobian-lens) claim on open Qwen3 models. A mouth-exclusion audit—scoring a lens readout as covert only when its token is far outside the model's own next-token distribution—splits the workspace: covert content survives almost only for context registers (the conversation's language, a corrupted word's intended form), while content plans (rhyme, arithmetic, associations) fall to a permutation floor. The surviving registers are causally load-bearing under amplitude-matched steering, and workspace edits rewrite the model's representation of the question itself across a 1.7B–14B scale ladder. The register and capture findings reproduce on a second architecture (Gemma-2-2B).",
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'EMNLP 2026 Workshop · BlackboxNLP', secondary: true },
    ],
    topics: [{ label: 'Interpretability', className: 'topic-interp' }],
    titleHref: 'https://openreview.net/forum?id=MNyJaBJ5Mx',
    links: [
      { label: 'Code', href: 'https://github.com/tao-hpu/jspace-replication' },
      { label: 'Interactive note', href: '/articles/workspace-registers', internal: true },
    ],
  },
  {
    id: 'cgep',
    title: 'CGEP: Toward Detecting and Attributing GEO Poisoning in Chinese AI Search',
    takeaway:
      'GEO poisoning needs detection and account-cluster attribution on different substrates—not just attack success.',
    tldr: 'Tao An — Defines GEO-poisoning detection and attribution for Chinese generative search (DeepSeek, Doubao, Kimi): a five-technique taxonomy of coordinated, inauthentic manipulation, a task reframing from attack-success to detection → classification → account-cluster attribution, and a legally-constructed synthetic benchmark. A provenance pilot shows detection and attribution need different substrates—content features detect that manipulation happened (F1 0.93) but only an account-interaction graph attributes it to a seller cluster (0.96)—and a confidence-gated fusion covers the taxonomy where a learned GNN and a zero-shot LLM both fail.',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'EMNLP 2026 Workshop · NLP4PI', secondary: true },
    ],
    topics: [{ label: 'AI Safety', className: 'topic-safety' }],
  },
  {
    id: 'preference-centroid',
    title:
      'The Preference Centroid: Consensus Density Governs Output Dispersion in Aligned LLMs',
    takeaway:
      'Output dispersion tracks task consensus density; alignment amplifies a gradient the base model already carries.',
    tldr: 'Tao An, Shuai Feng — Sampling an aligned LLM repeatedly and embedding the completions, output dispersion (mean pairwise cosine distance) is governed by the consensus density of the task—near-zero on factual prompts, wide on open-ended ones (Spearman ρ = 0.85), replicating on a second model and predicted by held-out judges that score only the prompt (ρ = −0.91). A matched base-vs-instruct comparison shows alignment amplifies a gradient the pretrained base already carries, compressing the high-consensus end ~8.7-fold against 1.8-fold at the low end—grounding the “equalizer vs. amplifier” boundary at the distribution level rather than in posited task complexity.',
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'TMLR', secondary: true },
    ],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://openreview.net/forum?id=6ukieTMBcG',
    links: [
      { label: 'OpenReview', href: 'https://openreview.net/forum?id=6ukieTMBcG' },
      { label: 'Interactive note', href: '/articles/consensus-dispersion', internal: true },
    ],
    bibtex: `@misc{an2026preference,
  title  = {The Preference Centroid: Consensus Density Governs
            Output Dispersion in Aligned LLMs},
  author = {An, Tao and Feng, Shuai},
  year   = {2026},
  note   = {Under review at TMLR},
  url    = {https://openreview.net/forum?id=6ukieTMBcG}
}`,
  },
  {
    id: 'verbatim-memory',
    title:
      'Fidelity Before Structure: Verbatim Chunks Beat Lossy Artifact Extraction in Long-Conversation LLM Memory',
    takeaway:
      'Verbatim chunks beat lossy extracted artifacts by large margins—structure should augment text, not replace it.',
    tldr: "Tao An — A controlled ablation isolating the stored memory representation inside one fixed retrieve–rerank–reason pipeline: LLM-extracted typed artifacts versus verbatim conversation chunks, holding the model, retriever, reranker, and judge constant. Verbatim chunks win by 15.9 points on LoCoMo (43.9% vs. 28.0%) and 22.0 points on LongMemEval-S (67.4% vs. 45.4%); the extracted-artifact pipeline never beats naive RAG. The mechanism is lossy distillation—extraction discards verbatim detail that chunks retain for free—so structured memory should augment verbatim text, not replace it. (ARR Aug 2026 resubmission of the March cycle; former title It's Fidelity, Not Structure.)",
    year: '2026',
    status: 'under-review',
    badges: [
      { label: 'Under Review' },
      { label: 'ARR 2026 August → EACL 2027', secondary: true },
    ],
    topics: [{ label: 'LLM Memory', className: 'topic-mem' }],
    titleHref: 'https://arxiv.org/abs/2601.00821',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2601.00821' },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2601.00821v3' },
      { label: 'Interactive note', href: '/articles/verbatim-memory', internal: true },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2601.00821' },
      { label: 'Code', href: 'https://github.com/tao-hpu/cog-canvas' },
      {
        label: 'Dataset',
        href: 'https://huggingface.co/datasets/tao-hpu/cog-canvas-benchmark',
      },
    ],
    bibtex: `@article{an2026fidelity,
  title   = {Fidelity Before Structure: Verbatim Chunks Beat Lossy
             Artifact Extraction in Long-Conversation LLM Memory},
  author  = {An, Tao},
  journal = {arXiv preprint arXiv:2601.00821},
  year    = {2026},
  note    = {Under review at ACL ARR 2026 August (target EACL 2027);
             formerly titled It's Fidelity, Not Structure}
}`,
  },
  {
    id: 'equalizer-amplifier',
    title:
      'AI as Equalizer or Amplifier? Task Complexity as the Moderating Factor for Human Expertise in Hybrid Intelligence Systems',
    takeaway:
      'AI equalizes on routine tasks and amplifies expertise on complex ones—domain skill beats prompt craft.',
    tldr: 'Tao An — Published in the proceedings of the 5th International Conference on Hybrid Human-Artificial Intelligence (HHAI 2026, Brussels), IOS Press Frontiers in Artificial Intelligence and Applications vol. 423, pp. 212–220 (open access, CC BY-NC). Drawing on structured field observations since mid-2024, this position paper reconciles the “AI as equalizer” and “AI as amplifier” debates: AI narrows novice–expert gaps on routine, well-structured tasks but amplifies them on complex tasks requiring deep judgment. Domain expertise—not prompt engineering—determines who benefits most from AI.',
    year: '2026',
    status: 'published',
    badges: [
      { label: 'HHAI 2026', starred: true },
      { label: 'IOS Press', secondary: true },
    ],
    topics: [{ label: 'Human–AI', className: 'topic-hai' }],
    titleHref: 'https://arxiv.org/abs/2512.10961',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2512.10961' },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2512.10961v2' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2512.10961' },
      { label: 'DOI', href: 'https://doi.org/10.3233/FAIA260506' },
      {
        label: 'IOS Press (Open Access)',
        href: 'https://ebooks.iospress.nl/doi/10.3233/FAIA260506',
      },
      { label: 'Talk (video)', href: 'https://www.youtube.com/watch?v=dzhSFIvbmUU' },
      { label: 'Conference', href: 'https://hhai-conference.org/2026/' },
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
      'Active memory management over pure RAG: hierarchical buffers and task-driven reuse (with later caveats).',
    tldr: 'Tao An — Proposes Cognitive Workspace, a paradigm transcending traditional RAG by emulating human cognitive mechanisms: active memory management, hierarchical cognitive buffers, and task-driven context optimization. Achieves a 58.6% memory-reuse rate (vs. 0% for RAG) with 17–18% net efficiency gain.',
    year: '2025',
    status: 'preprint',
    badges: [{ label: 'Preprint' }],
    topics: [{ label: 'LLM Memory', className: 'topic-mem' }],
    titleHref: 'https://arxiv.org/abs/2508.13171',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2508.13171' },
      { label: 'Read on Aha. (中文)', href: 'https://aha.fim.ai/paper/2508.13171v1' },
      { label: 'Interactive note', href: '/articles/active-memory-revisited', internal: true },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2508.13171' },
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
    tldr: 'Tao An — Chinese invention patent, under examination. GNN-based recommendation over heterogeneous data–information graphs.',
    year: '2026',
    status: 'patent',
    badges: [
      { label: 'Patent' },
      { label: 'Pending', secondary: true },
    ],
    topics: [{ label: 'Knowledge Graphs', className: 'topic-kg' }],
  },
]

/**
 * Dream-series teaser (separate from the AI publication list).
 * Titles and claims only; no PDF/DOI until a paper is public.
 * Promote an entry into `publications` when a DOI or venue page exists.
 */
export type DreamSeriesTeaser = {
  id: string
  title: string
  takeaway: string
}

export const dreamSeriesIntro =
  'Five manuscripts from a ten-year single-subject dream series (2015–2024, recorded in Chinese). Distinct research questions on the same corpus; under peer review. Links and BibTeX will appear here as each paper becomes public.'

export const dreamSeries: DreamSeriesTeaser[] = [
  {
    id: 'agency-not-altitude',
    title:
      'Agency, not altitude: affective polarity of self-initiated versus imposed vertical motion in a ten-year single-subject dream series',
    takeaway:
      'In this corpus, vertical-motion affect tracks agency over the motion, not altitude or direction.',
  },
  {
    id: 'somatic-incorporation',
    title:
      'Site-specific somatic incorporation, annotated at the time of recording: seven cases from a ten-year dream series',
    takeaway:
      'Seven cases where a waking bodily state and a matching dream element were annotated together at recording time.',
  },
  {
    id: 'llm-human-kappa',
    title:
      'What a reported LLM–human agreement coefficient does not tell you: a decomposition, five ablations, and four things to report',
    takeaway:
      'A single LLM–human κ mixes abstention with substance and can be raised by design choices that do not add knowledge.',
  },
  {
    id: 'inheritance-contradiction',
    title:
      'Inheritance, abandonment, contradiction: a ten-year dream series read against the teaching text of the tradition that trained it',
    takeaway:
      'What a trained dreamer kept, abandoned, and contradicted from an inherited rule system; contradiction is the finding.',
  },
  {
    id: 'dying-does-not-end',
    title:
      'Dying does not end the dream: continuation formats after in-dream death in a ten-year dream series',
    takeaway:
      'Narrative death inside the dream does not terminate it; four continuation formats, with most of the furniture inherited and the claim itself not taught.',
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
      'Ethics Review Committee — Conference on Neural Information Processing Systems (NeurIPS 2026)',
    tldr: 'Reviewing submissions flagged for ethical concerns against the NeurIPS Code of Ethics—data provenance and informed consent, dual-use and misuse risk, human-subjects considerations, and broader societal impact.',
  },
]

export type FilterKey = 'all' | Publication['status'] | 'topic:' | string

export const STATUS_FILTERS: { key: Publication['status'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'under-review', label: 'Under review' },
  { key: 'preprint', label: 'Preprint' },
  { key: 'patent', label: 'Patent' },
]
