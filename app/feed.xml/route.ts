import { articleUrl, articles } from '../articles/registry'

// The feed used to be a hand-written public/feed.xml. It drifted: six of the
// seven items still carried descriptions from an earlier revision of
// registry.ts. Generating it from the registry keeps one source of truth.
export const dynamic = 'force-static'

const SITE = 'https://tao-hpu.github.io'

function esc(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/** RFC 822, which is what RSS 2.0 pubDate wants. */
function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString()
}

export async function GET() {
  // registry.ts is maintained newest-first, which is also feed order.
  const items = articles
    .map((a) => {
      const url = articleUrl(a)
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <description>${esc(a.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tao An · Articles</title>
    <link>${SITE}/articles</link>
    <description>Web-native research notes by Tao An: interactive figures, permanent URLs, citation metadata.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
