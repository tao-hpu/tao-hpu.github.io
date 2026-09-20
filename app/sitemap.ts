import type { MetadataRoute } from 'next'
import { articleUrl, articles } from './articles/registry'

// Generated rather than hand-written for the same reason as feed.xml: an
// article added to registry.ts must not need a second edit here to be indexed.
export const dynamic = 'force-static'

const SITE = 'https://tao-hpu.github.io'

// Paths are written without a trailing slash and without .html, matching
// trailingSlash: false in next.config.mjs and the URLs already indexed.
const PAGES: { path: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/research', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/building', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/opensource', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/articles', changeFrequency: 'weekly', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({
      url: p.path === '/' ? `${SITE}/` : `${SITE}${p.path}`,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...articles.map((a) => ({
      url: articleUrl(a),
      lastModified: a.updated ?? a.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
