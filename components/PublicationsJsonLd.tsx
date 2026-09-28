import { publications } from '@/app/research/publications'
import { SITE_URL } from '@/lib/site'

const PERSON_ID = `${SITE_URL}/#person`

/** Leading "Tao An." / "Tao An, Shuai Feng." is display-only author credit. */
function abstractOf(tldr: string): string {
  return tldr.replace(/^Tao An(, [^.]+)?\.\s*/, '')
}

function doiOf(links: { href: string }[] | undefined, titleHref?: string): string | undefined {
  const hrefs = [titleHref, ...(links ?? []).map((l) => l.href)]
  const hit = hrefs.find((h) => h?.startsWith('https://doi.org/'))
  return hit?.slice('https://doi.org/'.length)
}

/**
 * Server-rendered list of the research page's papers. Every field is read from
 * publications.ts, so the schema cannot drift from what the page shows.
 */
export default function PublicationsJsonLd() {
  const items = publications
    .filter((p) => p.status !== 'patent')
    .map((p, i) => {
      const doi = doiOf(p.links, p.titleHref)
      const authors = p.authors ?? ['Tao An']
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'ScholarlyArticle',
          headline: p.title,
          name: p.title,
          abstract: abstractOf(p.tldr),
          datePublished: p.year,
          author: authors.map((name) =>
            name === 'Tao An' ? { '@id': PERSON_ID } : { '@type': 'Person', name },
          ),
          ...(p.titleHref ? { url: p.titleHref } : {}),
          ...(doi
            ? {
                identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: doi },
                sameAs: `https://doi.org/${doi}`,
              }
            : {}),
          keywords: p.topics.map((t) => t.label).join(', '),
          creativeWorkStatus: p.badges[0]?.label,
        },
      }
    })

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/research#publications`,
    name: 'Publications by Tao An',
    itemListElement: items,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
