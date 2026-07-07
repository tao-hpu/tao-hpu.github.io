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

export const articles: Article[] = [
  {
    slug: 'hello-interactive-articles',
    title: 'Research Notes, in an Interactive Format',
    description:
      'Why this section exists: web-native articles with interactive figures, permanent URLs, and citation metadata, alongside the papers.',
    date: '2026-07-07',
    tags: ['meta'],
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
