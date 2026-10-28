'use client'

import { useState } from 'react'

/**
 * Share of errors landing on a given option, against the null each design
 * choice implies. All counts from "Imported or Induced?" (Zenodo v2):
 * null = Section 5 and Appendix D (v1, seven standard targets, std arm);
 * cue = Table 3 (high band, route null p0); position = Section 7 and Table 4
 * (v5 Arm P, high band).
 */
type Row = { label: string; sub: string; k: number; n: number; nullShare: number; nullLabel: string }
type View = { key: string; button: string; rows: Row[]; note: string }
type Panel = { views: View[]; legendBar: string; caption: string }

const PANELS: Record<'null' | 'cue' | 'position', Panel> = {
  null: {
    legendBar: 'errors on the doctrine option',
    views: [
      {
        key: 'pos',
        button: 'positional 1/3',
        rows: [
          { label: 'floor band', sub: 'T2 < .40', k: 121, n: 296, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'mid band', sub: '.40 to .80', k: 143, n: 297, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'high band', sub: '≥ .80', k: 25, n: 73, nullShare: 1 / 3, nullLabel: 'null 1/3' },
        ],
        note: 'Against a third, the mid band sits at 48% (two-sided p = 1.4 × 10⁻⁷) and the curve rises, then falls, with competence.',
      },
      {
        key: 'vs',
        button: 'producible-verdict null',
        rows: [
          { label: 'floor band', sub: 'T2 < .40', k: 121, n: 296, nullShare: 120.5 / 296, nullLabel: '120.5 expected' },
          { label: 'mid band', sub: '.40 to .80', k: 143, n: 297, nullShare: 135.3 / 297, nullLabel: '135.3 expected' },
          { label: 'high band', sub: '≥ .80', k: 25, n: 73, nullShare: 23.2 / 73, nullLabel: '23.2 expected' },
        ],
        note: 'Counting only the verdicts each rule set can return, the null expects 120.5, 135.3 and 23.2 doctrine landings against 121, 143 and 25 observed (P = .50, .16, .35).',
      },
    ],
    caption:
      'Same 666 errors in both views; only the null changes. On liens, limitation and negotiorum gestio the doctrine verdict is the only wrong verdict the rules can produce, so a model that stays among producible verdicts lands on it more than a third of the time without knowing any doctrine.',
  },
  cue: {
    legendBar: 'errors on the doctrine verdict',
    views: [
      {
        key: 'cued',
        button: 'cue sentence present',
        rows: [
          { label: 'Lost property', sub: 'v4, high band', k: 66, n: 74, nullShare: 1 / 2, nullLabel: 'null 1/2' },
          { label: 'Strict liability', sub: 'v5, high band', k: 108, n: 123, nullShare: 1, nullLabel: 'null 1' },
        ],
        note: 'With the sentence in place, one misapplied clause already reaches the doctrine verdict. For strict liability it is the only verdict a single misreading reaches (route null 1), so 108 of 123 says nothing about import.',
      },
      {
        key: 'decued',
        button: 'cue sentence deleted',
        rows: [
          { label: 'Lost property', sub: 'v4, high band', k: 20, n: 44, nullShare: 0.4, nullLabel: 'null 0.4' },
          { label: 'Strict liability', sub: 'v5, high band', k: 57, n: 57, nullShare: 1 / 2, nullLabel: 'null 1/2' },
        ],
        note: 'Lost property falls to its null (P = .28). Strict liability does not: all 57 errors choose the new doctrine verdict (full liability). Stated reasons point to an unlisted misreading of clause F5; that reading is post hoc.',
      },
    ],
    caption:
      'Same items in both arms except one sentence of case text: "named the treasure’s private mark exactly" (lost property) and "intruded into the work site" (strict liability). Deleting the strict-liability sentence also changes which verdict is the doctrine one, from halved to full liability.',
  },
  position: {
    legendBar: 'share of high-band errors',
    views: [
      {
        key: 'last',
        button: 'on the last-listed exception',
        rows: [
          { label: 'All models', sub: 'last exception not doctrinal', k: 187, n: 319, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'Qwen2.5-7B', sub: '', k: 75, n: 84, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'Qwen2.5-3B', sub: '', k: 108, n: 229, nullShare: 1 / 3, nullLabel: 'null 1/3' },
        ],
        note: 'Rotating the three exceptions through a Latin square, errors follow whichever clause is listed last (expected 106.3 of 319, P = 2.2 × 10⁻²⁰).',
      },
      {
        key: 'doc',
        button: 'on the doctrine verdict',
        rows: [
          { label: 'Doctrinal exception first', sub: 'conflict items', k: 4, n: 37, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'Doctrinal exception second', sub: 'conflict items', k: 18, n: 32, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'Doctrinal exception last', sub: 'conflict items', k: 21, n: 65, nullShare: 1 / 3, nullLabel: 'null 1/3' },
          { label: 'Counterbalanced, pooled', sub: '44.7 expected', k: 43, n: 134, nullShare: 1 / 3, nullLabel: 'null 1/3' },
        ],
        note: 'Pooled over positions, doctrine landing is at chance (P = .65). The 18 of 32 at second position all come from the thrown-objects site, where Qwen2.5-3B prefers the second exception.',
      },
    ],
    caption:
      'v5 Arm P: each surface rendered three times with the exceptions in rotated order; case text and option order identical across versions. All 134 high-band conflict errors come from Qwen2.5-3B and Qwen2.5-7B, so the pooled result bounds these two models only.',
  },
}

const pct = (k: number, n: number) => Math.round((k / n) * 100)

export default function ImportArtifacts({ artifact }: { artifact: 'null' | 'cue' | 'position' }) {
  const panel = PANELS[artifact]
  const [key, setKey] = useState(panel.views[0].key)
  const view = panel.views.find((v) => v.key === key) ?? panel.views[0]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Choose condition">
        {panel.views.map((v) => (
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
        {view.rows.map((r) => {
          const share = r.k / r.n
          return (
            <div key={r.label} className="imp-row">
              <span className="mem-bar-label">
                {r.label}
                {r.sub && <span className="stair-chance-n">{r.sub}</span>}
              </span>
              <span className="imp-track" aria-hidden="true">
                <span className="imp-fill" style={{ width: `${share * 100}%` }} />
                <span className="imp-null" style={{ left: `${r.nullShare * 100}%` }} />
              </span>
              <span className="imp-value">
                {pct(r.k, r.n)}%
                <span className="imp-count">
                  {r.k}/{r.n} · {r.nullLabel}
                </span>
              </span>
            </div>
          )
        })}
      </div>

      <p className="mem-explorer-note">{view.note}</p>

      <div className="mem-explorer-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-chunks" /> {panel.legendBar}
        </span>
        <span className="mem-legend-item">
          <span className="imp-legend-null" /> what chance predicts
        </span>
      </div>

      <figcaption>{panel.caption}</figcaption>
    </figure>
  )
}
