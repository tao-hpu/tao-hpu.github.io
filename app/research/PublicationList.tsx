'use client'

import { useEffect, useMemo, useState } from 'react'
import { STATUS_FILTERS, publications, type Publication } from './publications'

type StatusKey = (typeof STATUS_FILTERS)[number]['key']

// Newest first, in the array order of publications.ts; the status tabs do the
// grouping, so the "All" view is a plain timeline.
const ORDERED = publications

function Badge({
  label,
  secondary,
  starred,
}: {
  label: string
  secondary?: boolean
  starred?: boolean
}) {
  return (
    <span className={`venue-badge${secondary ? ' venue-badge-secondary' : ''}`}>
      {starred && (
        <svg className="badge-star" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.2l2.95 6.36 6.85.66-5.16 4.57 1.5 6.71L12 17.6l-6.14 3.5 1.5-6.71L2.2 9.22l6.85-.66z" />
        </svg>
      )}
      {label}
    </span>
  )
}

function PubItem({ pub }: { pub: Publication }) {
  return (
    <div className="publication-simple-item">
      <div className="publication-simple-meta">
        {pub.badges.map((b) => (
          <Badge key={b.label} {...b} />
        ))}
        <span className="venue-year">{pub.year}</span>
        {pub.topics.map((t) => (
          <span key={t.label} className={`topic-tag${t.className ? ` ${t.className}` : ''}`}>
            {t.label}
          </span>
        ))}
      </div>
      <div className="publication-simple-body">
        {pub.titleHref ? (
          <a
            className="publication-simple-title"
            href={pub.titleHref}
            target={pub.titleHref.startsWith('http') ? '_blank' : undefined}
            rel={pub.titleHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {pub.title}
          </a>
        ) : (
          <span className="publication-simple-title">{pub.title}</span>
        )}
        <p className="publication-takeaway">{pub.takeaway}</p>
        <details className="publication-abstract">
          <summary>Abstract</summary>
          <p className="publication-simple-tldr">{pub.tldr}</p>
        </details>
        {(pub.links?.length || pub.bibtex) && (
          <div className="publication-simple-links">
            {pub.links?.map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                target={!l.internal && l.href.startsWith('http') ? '_blank' : undefined}
                rel={!l.internal && l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.label}
              </a>
            ))}
            {pub.bibtex && (
              <button type="button" className="bibtex-toggle" aria-expanded="false">
                BibTeX
              </button>
            )}
          </div>
        )}
        {pub.bibtex && <pre className="bibtex-pre" hidden>{pub.bibtex}</pre>}
      </div>
    </div>
  )
}

const STATUS_KEYS = new Set<string>(STATUS_FILTERS.map((f) => f.key))

// The active tab lives in ?status= so a refresh or a shared link keeps it.
// The page is statically exported, so the query is read on mount (not via
// useSearchParams, which would need a Suspense boundary and render the list
// client-only); the first paint shows "All" and switches if a param is set.
function readStatusFromUrl(): StatusKey {
  const v = new URLSearchParams(window.location.search).get('status')
  return v && STATUS_KEYS.has(v) ? (v as StatusKey) : 'all'
}

export default function PublicationList() {
  const [status, setStatus] = useState<StatusKey>('all')

  useEffect(() => {
    setStatus(readStatusFromUrl())
    const onPop = () => setStatus(readStatusFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const selectStatus = (key: StatusKey) => {
    setStatus(key)
    const url = new URL(window.location.href)
    if (key === 'all') url.searchParams.delete('status')
    else url.searchParams.set('status', key)
    window.history.replaceState(window.history.state, '', url)
  }

  const filtered = useMemo(() => {
    if (status === 'all') return ORDERED
    return ORDERED.filter((p) => p.status === status)
  }, [status])

  return (
    <div className="pub-list-wrap">
      <div className="pub-filters" role="toolbar" aria-label="Filter publications by status">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`pub-filter${status === f.key ? ' is-active' : ''}`}
            aria-pressed={status === f.key}
            onClick={() => selectStatus(f.key)}
          >
            {f.label}
            {f.key !== 'all' && (
              <span className="pub-filter-count">
                {publications.filter((p) => p.status === f.key).length}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="publication-simple-list">
        {filtered.length === 0 ? (
          <p className="pub-empty">No publications in this category.</p>
        ) : (
          filtered.map((pub) => <PubItem key={pub.id} pub={pub} />)
        )}
      </div>
    </div>
  )
}
