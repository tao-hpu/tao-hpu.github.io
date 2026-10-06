import { articleBibtex, articleUrl, doiUrl, getArticle } from '@/app/articles/registry'
import ArticleToc from '@/components/ArticleToc'
import CopyBibtex from '@/components/CopyBibtex'
import { readingMinutes } from '@/lib/reading-time'
import { SITE_URL } from '@/lib/site'

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export default function ArticleLayout({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const a = getArticle(slug)
  const bibtex = articleBibtex(a)
  const minutes = readingMinutes(slug)
  const url = articleUrl(a)
  // Server-rendered so crawlers that skip JS still read it. The companion paper
  // goes in isBasedOn, not as this page's identifier: the note is not the paper.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: `${SITE_URL}/images/og-cover.jpg`,
    inLanguage: 'en',
    keywords: a.tags?.join(', '),
    ...(a.relatedPaper
      ? { isBasedOn: a.paperDoi ? doiUrl(a.paperDoi) : a.relatedPaper.href }
      : {}),
  }

  return (
    <div className="subpage articles-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page-articles" id="main">
        <article className="article-container">
          <header className="article-header">
            <p className="article-breadcrumb">
              <a href="/articles">Articles</a>
            </p>
            <h1 className="article-title">{a.title}</h1>
            <p className="article-byline">
              Tao An · <time dateTime={a.date}>{formatDate(a.date)}</time>
              {a.updated && (
                <>
                  {' '}
                  · updated <time dateTime={a.updated}>{formatDate(a.updated)}</time>
                </>
              )}
              {minutes > 0 && <> · {minutes} min read</>}
            </p>
            {a.relatedPaper && (
              <p className="article-related">
                Companion paper:{' '}
                <a
                  href={a.relatedPaper.href}
                  target={a.relatedPaper.href.startsWith('http') ? '_blank' : undefined}
                  rel={a.relatedPaper.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {a.relatedPaper.label}
                </a>
                {a.paperDoi && (
                  <>
                    {' · '}
                    <a href={doiUrl(a.paperDoi)} target="_blank" rel="noopener noreferrer">
                      DOI
                    </a>
                  </>
                )}
              </p>
            )}
          </header>

          <ArticleToc />
          <div className="article-prose">{children}</div>

          <section className="article-cite">
            <div className="article-cite-header">
              <h2>Citation</h2>
              <CopyBibtex bibtex={bibtex} />
            </div>
            {a.paperDoi && (
              <p>
                Citing the research rather than this note? Cite the paper:{' '}
                <a href={doiUrl(a.paperDoi)} target="_blank" rel="noopener noreferrer">
                  {a.paperDoi}
                </a>
                . That DOI always resolves to the current version.
              </p>
            )}
            <p>If you refer to this note, please cite it as:</p>
            <pre className="bibtex-pre">{bibtex}</pre>
          </section>
        </article>
      </main>
    </div>
  )
}
