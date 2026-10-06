import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export type ArticleCover = {
  src: string
  thumbnailSrc: string
  alt: string
  /** A 1200 × 630 share image, composed from the same artwork. */
  socialSrc: string
}

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
  cover?: ArticleCover
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
    slug: 'novelty-audit',
    cover: {
      src: '/images/articles/novelty-audit.webp',
      thumbnailSrc: '/images/articles/novelty-audit-thumb.webp',
      alt: 'Similar stone forms in a blue landscape, with a single mint-colored facet.',
      socialSrc: '/images/articles/novelty-audit-og.jpg',
    },
    title: 'Machine Papers Look More Novel. Mostly in One Facet.',
    description:
      'Companion note to "Recombination or Discovery?" (NeurIPS 2026 AI4MetaScience workshop poster): machine contributions are judged facet-novel more often than matched human ones (56.1% vs. 35.6%), but the gap rests mainly on the purpose facet, LLM re-auditors return refutation rates from 0% to 100% on the same items, and retrieval finds the known prior art for only 25 to 29% of gold pairs. Plus an integrity audit: hard fabrication evidence in 0 of 47 accepted and 16 of 197 rejected Agents4Science 2025 submissions.',
    date: '2026-09-30',
    tags: ['metascience'],
    paperDoi: '10.5281/zenodo.21696223',
    relatedPaper: {
      label: 'Recombination or Discovery? (NeurIPS 2026 Workshop, AI4MetaScience)',
      href: 'https://doi.org/10.5281/zenodo.21696223',
    },
  },
  {
    slug: 'equalizer-amplifier',
    cover: {
      src: '/images/articles/equalizer-amplifier.webp',
      thumbnailSrc: '/images/articles/equalizer-amplifier-thumb.webp',
      alt: 'A shared mint-colored gate with paths leading to different elevations.',
      socialSrc: '/images/articles/equalizer-amplifier-og.jpg',
    },
    title: 'Same Tool, Opposite Verdicts',
    description:
      'Interactive companion to the HHAI 2026 paper "AI as Equalizer or Amplifier?": why AI compresses the novice-expert gap on routine tasks and widens it on judgment-heavy ones, how model deference compounds the difference turn by turn, and what the position paper cannot yet show.',
    date: '2026-09-24',
    tags: ['human-ai'],
    relatedPaper: {
      label: 'AI as Equalizer or Amplifier? (HHAI 2026)',
      href: 'https://doi.org/10.3233/FAIA260506',
    },
  },
  {
    slug: 'citation-decoupling',
    cover: {
      src: '/images/articles/citation-decoupling.webp',
      thumbnailSrc: '/images/articles/citation-decoupling-thumb.webp',
      alt: 'Two intact stone archives connected by a mint bridge with a gap in the middle.',
      socialSrc: '/images/articles/citation-decoupling-og.jpg',
    },
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
    cover: {
      src: '/images/articles/acl-2026-citation-audit-v2.webp',
      thumbnailSrc: '/images/articles/acl-2026-citation-audit-v2-thumb.webp',
      alt: 'Three documents under magnifying glasses receive different verdicts: a check, a question mark, and a cross.',
      socialSrc: '/images/articles/acl-2026-citation-audit-v2-og.jpg',
    },
    title: 'We Checked All 209,985 Citations in ACL 2026',
    description:
      'Companion note to the Tuto audit report and the paper behind it: fabricated references are a rounding error (2 confirmed, 0.001%); claim-support rates did not replicate across three identical-pipeline runs, so the paper takes non-replication, not any single rate, as the principal finding.',
    date: '2026-07-17',
    updated: '2026-09-28',
    tags: ['metascience'],
    relatedPaper: {
      label: 'What Citations Get Wrong (report)',
      href: 'https://tuto.fim.ai/report',
    },
  },
  {
    slug: 'intervention-timing',
    cover: {
      src: '/images/articles/intervention-timing.webp',
      thumbnailSrc: '/images/articles/intervention-timing-thumb.webp',
      alt: 'A path approaches a stone gate beside a mint balance beam on a quiet hillside.',
      socialSrc: '/images/articles/intervention-timing-og.jpg',
    },
    title: 'The Missing Cost Term',
    description:
      'Interactive companion to "When Should the Agent Speak?": twenty years of research learned what it costs to interrupt a person, and had no agent capable of earning that cost back. The agents arrived. The price did not come with them.',
    date: '2026-07-14',
    updated: '2026-09-28',
    tags: ['human-ai'],
    paperDoi: '10.5281/zenodo.21438396',
    relatedPaper: {
      label: 'When Should the Agent Speak? (TMLR 2026)',
      href: 'https://openreview.net/forum?id=b0yKEdAXEr',
    },
  },
  {
    slug: 'workspace-registers',
    cover: {
      src: '/images/articles/workspace-registers.webp',
      thumbnailSrc: '/images/articles/workspace-registers-thumb.webp',
      alt: 'Geometric forms occupy open stone compartments beside a path hidden beyond the ridge.',
      socialSrc: '/images/articles/workspace-registers-og.jpg',
    },
    title: "What the Model Isn't About to Say",
    description:
      'Interactive companion to the working paper "Registers, Not Plans": an independent replication of Anthropic\'s global-workspace claim, and why only context registers, not content plans, survive a strict readout test.',
    date: '2026-07-08',
    tags: ['interpretability'],
    relatedPaper: {
      label: 'Registers, Not Plans (code and data)',
      href: 'https://github.com/tao-hpu/jspace-replication',
    },
  },
  {
    slug: 'verbatim-memory',
    cover: {
      src: '/images/articles/verbatim-memory.webp',
      thumbnailSrc: '/images/articles/verbatim-memory-thumb.webp',
      alt: 'A continuous ribbon passes through stone arches and emerges as fragments.',
      socialSrc: '/images/articles/verbatim-memory-og.jpg',
    },
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
    cover: {
      src: '/images/articles/consensus-dispersion.webp',
      thumbnailSrc: '/images/articles/consensus-dispersion-thumb.webp',
      alt: 'Two stone basins contrast a tight cluster of pebbles with a broadly dispersed group.',
      socialSrc: '/images/articles/consensus-dispersion-og.jpg',
    },
    title: 'How Much the Model Agrees with Itself',
    description:
      'Interactive companion to the working paper "Consensus Density Predicts Output Dispersion in Aligned LLMs": sample clouds, judge-predicted dispersion, alignment as amplifier, and why instruction form is not consensus.',
    date: '2026-07-07',
    tags: ['human-ai'],
    relatedPaper: {
      label: 'Consensus Density Predicts Output Dispersion (OpenReview)',
      href: 'https://openreview.net/forum?id=6ukieTMBcG',
    },
  },
  {
    slug: 'active-memory-revisited',
    cover: {
      src: '/images/articles/active-memory-revisited-v2.webp',
      thumbnailSrc: '/images/articles/active-memory-revisited-v2-thumb.webp',
      alt: 'A summary is missing a key-shaped piece; an arrow leads back to the original notebook, where a magnifying glass reveals it.',
      socialSrc: '/images/articles/active-memory-revisited-v2-og.jpg',
    },
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
  const image = {
    url: `${SITE_URL}${a.cover?.socialSrc ?? '/images/og-cover.jpg'}`,
    width: 1200,
    height: 630,
    alt: a.cover?.alt ?? a.title,
  }
  return {
    // The root layout's title template already appends " · Tao An".
    title: a.title,
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      url: articleUrl(a),
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      siteName: SITE_NAME,
      authors: ['Tao An'],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.description,
      images: [image],
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
