import type { Metadata } from 'next'

export type RelatedPaper = {
  label: string
  href: string
}

export type Article = {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. '2026-07-07' */
  date: string
  updated?: string
  tags?: string[]
  /**
   * Zenodo *concept* DOI of the paper this note accompanies, e.g.
   * '10.5281/zenodo.21438396'. Always the concept DOI, never a version DOI:
   * it resolves to the latest version, so publishing a new PDF version needs
   * no change here. This identifies the *paper*, not this note, so it is
   * deliberately absent from `articleBibtex()`.
   */
  paperDoi?: string
  /** Companion paper / report link shown in the article footer. */
  relatedPaper?: RelatedPaper
}

// Sorted newest-first on the index page; entries sharing a date keep this
// array order, so within a day arrange them in intended reading order.
export const articles: Article[] = [
  {
    slug: 'citation-decoupling',
    title: 'The Citation Ledger Is Fine. The Citation Currency Is Dying.',
    description:
      'Citation bundles a ledger (registration, priority) and a currency (reputation) in one act, coupled only because reading was the sole transport layer of science. I argued LLM reader-side consumption is splitting them, and made three falsifiable predictions. Updated with the measurements: reuse and citation did come apart, by roughly half over a decade, but my mechanism lost. No break at model release, no field-exposure gradient, and the 2015 cohort declines as steeply as the 2023 one.',
    date: '2026-07-17',
    updated: '2026-07-20',
    tags: ['metascience'],
    paperDoi: '10.5281/zenodo.21452779',
    relatedPaper: {
      label: 'Weakening in Real Time (Zenodo)',
      href: 'https://doi.org/10.5281/zenodo.21452779',
    },
  },
  {
    slug: 'acl-2026-citation-audit',
    title: 'We Checked All 209,985 Citations in ACL 2026',
    description:
      'Companion note to the Tuto audit report: fabricated references are a rounding error (2 confirmed, 0.001%), unsupported claim citations are not (16% of papers), and the detector error rate is the number that decides whether any of this is publishable.',
    date: '2026-07-17',
    tags: ['metascience'],
  },
  {
    slug: 'intervention-timing',
    title: 'The Missing Cost Term',
    description:
      'Interactive companion to "When Should the Agent Speak?": twenty years of research learned what it costs to interrupt a person, and had no agent capable of earning that cost back. The agents arrived. The price did not come with them.',
    date: '2026-07-14',
    tags: ['human-ai'],
    paperDoi: '10.5281/zenodo.21438396',
    relatedPaper: {
      label: 'When Should the Agent Speak? (Zenodo)',
      href: 'https://doi.org/10.5281/zenodo.21438396',
    },
  },
  {
    slug: 'workspace-registers',
    title: "What the Model Isn't About to Say",
    description:
      'Interactive companion to "Registers, Not Plans" (BlackboxNLP 2026, under review): an independent replication of Anthropic\'s global-workspace claim, and why only context registers, not content plans, survive a strict readout test.',
    date: '2026-07-08',
    tags: ['interpretability'],
    relatedPaper: {
      label: 'Registers, Not Plans (OpenReview)',
      href: 'https://openreview.net/forum?id=MNyJaBJ5Mx',
    },
  },
  {
    slug: 'verbatim-memory',
    title: 'What Structured Memory Forgets',
    description:
      'Interactive companion to "Fidelity Before Structure" (arXiv:2601.00821): explore the benchmark results and see why extraction loses to verbatim chunks at write time.',
    date: '2026-07-07',
    tags: ['llm-memory'],
    relatedPaper: {
      label: 'Fidelity Before Structure (arXiv)',
      href: 'https://arxiv.org/abs/2601.00821',
    },
  },
  {
    slug: 'consensus-dispersion',
    title: 'How Much the Model Agrees with Itself',
    description:
      'Interactive companion to "The Preference Centroid" (TMLR submission): sample clouds, judge-predicted dispersion, alignment as amplifier, and why instruction form is not consensus.',
    date: '2026-07-07',
    tags: ['human-ai'],
    relatedPaper: {
      label: 'The Preference Centroid (OpenReview)',
      href: 'https://openreview.net/forum?id=6ukieTMBcG',
    },
  },
  {
    slug: 'active-memory-revisited',
    title: 'What I Got Wrong About LLM Memory',
    description:
      'Cognitive Workspace (2025) argued for actively curated memory; my own 2026 ablation showed curation is lossy deletion. What failed, what survived, and the meta-lesson about measuring claims.',
    date: '2026-07-07',
    tags: ['llm-memory'],
    relatedPaper: {
      label: 'Cognitive Workspace (arXiv)',
      href: 'https://arxiv.org/abs/2508.13171',
    },
  },
]

export function getArticle(slug: string): Article {
  const a = articles.find((a) => a.slug === slug)
  if (!a) throw new Error(`Unknown article slug: ${slug}`)
  return a
}

export function articleUrl(a: Article): string {
  return `https://tao-hpu.github.io/articles/${a.slug}`
}

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi}`
}

export function articleBibtex(a: Article): string {
  const year = a.date.slice(0, 4)
  const key = `an${year}${a.slug.split('-')[0]}`
  return `@misc{${key},
  title        = {${a.title}},
  author       = {An, Tao},
  year         = {${year}},
  howpublished = {\\url{${articleUrl(a)}}},
  note         = {Personal research notes}
}`
}

/**
 * Page metadata incl. Google Scholar citation tags, so articles are
 * indexable as scholarly items.
 */
export function articleMetadata(slug: string): Metadata {
  const a = getArticle(slug)
  return {
    title: `${a.title} · Tao An`,
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      url: articleUrl(a),
      publishedTime: a.date,
      authors: ['Tao An'],
    },
    other: {
      citation_title: a.title,
      citation_author: 'An, Tao',
      citation_publication_date: a.date.replaceAll('-', '/'),
      citation_online_date: a.date.replaceAll('-', '/'),
      citation_fulltext_html_url: articleUrl(a),
      citation_language: 'en',
    },
  }
}
