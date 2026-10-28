'use client'

import { useState } from 'react'

/**
 * CGEP-Synth attribution harness, seed means. All numbers from the August 2026
 * manuscript, section "CGEP-Synth and What It Can Show": content F1 0.934,
 * seller attribution 0.185 vs 0.959 (one-to-one Hungarian assignment), and
 * graph autoencoder vs Louvain 0.660 vs 0.873 NMI, 0.291 vs 0.514 attribution.
 */
type Row = { label: string; sub: string; value: number; strong: boolean }
type View = { key: string; button: string; rows: Row[]; note: string }

const VIEWS: View[] = [
  {
    key: 'substrate',
    button: 'Content vs interaction graph',
    rows: [
      { label: 'Content features', sub: 'detection F1', value: 0.934, strong: false },
      { label: 'Content clustering', sub: 'seller attribution', value: 0.185, strong: false },
      { label: 'Louvain on interaction graph', sub: 'seller attribution', value: 0.959, strong: true },
    ],
    note: 'Content features tell manipulated items from organic ones but not one seller from another. The interaction graph holds the seller structure because the generator puts every interaction edge inside a T1 cluster.',
  },
  {
    key: 'model',
    button: 'Learned vs classical',
    rows: [
      { label: 'Graph autoencoder', sub: 'cluster NMI', value: 0.66, strong: false },
      { label: 'Louvain', sub: 'cluster NMI', value: 0.873, strong: true },
      { label: 'Graph autoencoder', sub: 'seller attribution', value: 0.291, strong: false },
      { label: 'Louvain', sub: 'seller attribution', value: 0.514, strong: true },
    ],
    note: 'A learned graph model does not beat classical community detection on either clustering quality or attribution.',
  },
]

export default function CgepSubstrateSplit() {
  const [key, setKey] = useState(VIEWS[0].key)
  const view = VIEWS.find((v) => v.key === key) ?? VIEWS[0]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Choose comparison">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            className={`mem-metric${v.key === view.key ? ' on' : ''}`}
            aria-pressed={v.key === view.key}
            onClick={() => setKey(v.key)}
          >
            {v.button}
          </button>
        ))}
      </div>

      <div className="mem-explorer-chart">
        {view.rows.map((r) => (
          <div key={`${r.label}-${r.sub}`} className="cgep-row">
            <span className="mem-bar-label">
              {r.label}
              <span className="stair-chance-n">{r.sub}</span>
            </span>
            <span className="cgep-track" aria-hidden="true">
              <span
                className={`cgep-fill ${r.strong ? 'mem-bar-chunks' : 'mem-bar-artifacts'}`}
                style={{ width: `${r.value * 100}%` }}
              />
            </span>
            <span className="cgep-value">{r.value.toFixed(3)}</span>
          </div>
        ))}
      </div>

      <p className="mem-explorer-note">{view.note}</p>

      <figcaption>
        Synthetic benchmark, means over five generation seeds. Attribution uses one-to-one Hungarian
        assignment of clusters to sellers. The interaction graph is one of the substrates the self-audit marks
        as determined by construction, so these scores bound what a method can recover from a planted
        structure; they do not measure real accounts.
      </figcaption>
    </figure>
  )
}
