import Link from 'next/link'
import { articleBibtex, doiUrl, getArticle } from '@/app/articles/registry'
import CopyBibtex from '@/components/CopyBibtex'

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

  return (
    <div className="subpage articles-page">
      <main className="page-articles" id="main">
        <article className="article-container">
          <header className="article-header">
            <p className="article-breadcrumb">
              <Link href="/articles">Articles</Link>
              <span className="article-breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <a href="/feed.xml" className="article-rss-link">
                RSS
              </a>
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

          <div className="article-prose">{children}</div>

          <section className="article-cite">
            <div className="article-cite-header">
              <h2>Citation</h2>
              <CopyBibtex bibtex={bibtex} />
            </div>
            <p>If you refer to this note, please cite it as:</p>
            <pre className="bibtex-pre">{bibtex}</pre>
          </section>
        </article>
      </main>
    </div>
  )
}
