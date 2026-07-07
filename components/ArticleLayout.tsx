import Link from 'next/link'
import { articleBibtex, getArticle } from '@/app/articles/registry'

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

  return (
    <div className="subpage articles-page">
      <main className="page-articles">
        <article className="article-container">
          <header className="article-header">
            <p className="article-breadcrumb">
              <Link href="/articles">Articles</Link>
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
          </header>

          <div className="article-prose">{children}</div>

          <section className="article-cite">
            <h2>Citation</h2>
            <p>If you refer to this note, please cite it as:</p>
            <pre className="bibtex-pre">{articleBibtex(a)}</pre>
          </section>
        </article>
      </main>
    </div>
  )
}
