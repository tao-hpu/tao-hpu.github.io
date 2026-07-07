import type { Metadata } from 'next'

export type Article = {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. '2026-07-07' */
  date: string
  updated?: string
  tags?: string[]
}

// Sorted newest-first on the index page; entries sharing a date keep this
// array order, so within a day arrange them in intended reading order.
export const articles: Article[] = [
  {
    slug: 'verbatim-memory',
    title: 'What Structured Memory Forgets',
    description:
      'Interactive companion to "It\'s Fidelity, Not Structure" (arXiv:2601.00821): explore the benchmark results and see why extraction loses to verbatim chunks at write time.',
    date: '2026-07-07',
    tags: ['llm-memory'],
  },
  {
    slug: 'consensus-dispersion',
    title: 'How Much the Model Agrees with Itself',
    description:
      'Interactive companion to "The Preference Centroid" (TMLR submission): sample clouds, judge-predicted dispersion, alignment as amplifier, and why instruction form is not consensus.',
    date: '2026-07-07',
    tags: ['human-ai'],
  },
  {
    slug: 'active-memory-revisited',
    title: 'What I Got Wrong About LLM Memory',
    description:
      'Cognitive Workspace (2025) argued for actively curated memory; my own 2026 ablation showed curation is lossy deletion. What failed, what survived, and the meta-lesson about measuring claims.',
    date: '2026-07-07',
    tags: ['llm-memory'],
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
