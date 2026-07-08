'use client'

import { useState } from 'react'

/**
 * Covert-strict readout rate per official evaluation set, swept across the
 * mouth-rank exclusion threshold T. Numbers from the mouth-exclusion audit
 * (Appendix A threshold-sweep tables, Qwen3-4B and Qwen3-1.7B); floor = the
 * permutation-control false-positive rate under the identical scoring.
 */
type Sweep = { covert: Record<string, number>; floor: Record<string, number> }
type Family = { key: string; label: string; kind: 'register' | 'plan' }

const FAMILIES: Family[] = [
  { key: 'multilingual', label: 'multilingual', kind: 'register' },
  { key: 'typo', label: 'typo correction', kind: 'register' },
  { key: 'poetry', label: 'poetry (rhyme)', kind: 'plan' },
  { key: 'orderops', label: 'order-of-ops', kind: 'plan' },
  { key: 'assoc', label: 'association', kind: 'plan' },
  { key: 'multihop', label: 'multi-hop', kind: 'plan' },
]

const DATA: Record<string, Record<string, Sweep>> = {
  '4b': {
    multilingual: { covert: { 10: 35.3, 50: 33.4, 100: 31.3, 500: 21.7 }, floor: { 10: 3.7, 50: 3.3, 100: 3.3, 500: 2.3 } },
    typo: { covert: { 10: 26.0, 50: 21.9, 100: 15.6, 500: 1.0 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    poetry: { covert: { 10: 0, 50: 0, 100: 0, 500: 0 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    orderops: { covert: { 10: 11.8, 50: 6.4, 100: 1.8, 500: 0 }, floor: { 10: 7.3, 50: 3.6, 100: 2.7, 500: 0 } },
    assoc: { covert: { 10: 1.0, 50: 1.0, 100: 1.0, 500: 1.0 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    multihop: { covert: { 10: 21.4, 50: 5.8, 100: 2.9, 500: 1.0 }, floor: { 10: 1.0, 50: 0, 100: 0, 500: 0 } },
  },
  '1.7b': {
    multilingual: { covert: { 10: 26.4, 50: 25.5, 100: 23.6, 500: 19.2 }, floor: { 10: 1.6, 50: 1.6, 100: 1.4, 500: 1.2 } },
    typo: { covert: { 10: 55.2, 50: 46.9, 100: 36.5, 500: 6.2 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    poetry: { covert: { 10: 0, 50: 0, 100: 0, 500: 0 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    orderops: { covert: { 10: 4.5, 50: 0.9, 100: 0.9, 500: 0.9 }, floor: { 10: 3.6, 50: 2.7, 100: 1.8, 500: 0.9 } },
    assoc: { covert: { 10: 2.0, 50: 2.0, 100: 2.0, 500: 2.0 }, floor: { 10: 0, 50: 0, 100: 0, 500: 0 } },
    multihop: { covert: { 10: 13.6, 50: 8.7, 100: 4.9, 500: 1.0 }, floor: { 10: 2.9, 50: 0, 100: 0, 500: 0 } },
  },
}

const THRESHOLDS = ['10', '50', '100', '500'] as const
const MAXV = 60

export default function RegisterPlanBars() {
  const [model, setModel] = useState<'4b' | '1.7b'>('4b')
  const [t, setT] = useState<string>('100')

  const rows = (kind: 'register' | 'plan') =>
    FAMILIES.filter((f) => f.kind === kind).map((f) => {
      const s = DATA[model][f.key]
      return { ...f, covert: s.covert[t], floor: s.floor[t] }
    })

  const bar = (r: { label: string; kind: string; covert: number; floor: number }) => (
    <div className="mem-bar-row" key={r.label}>
      <span className="mem-bar-label">{r.label}</span>
      <span className="mem-bar-track pc-amp-track">
        <span className="pc-amp-ghost" style={{ width: `${(r.floor / MAXV) * 80}%` }} />
        <span
          className={`mem-bar pc-amp-bar mem-bar-${r.kind === 'register' ? 'chunks' : 'baseline'}`}
          style={{ width: `${(r.covert / MAXV) * 80}%` }}
        />
        <span className="mem-bar-value">
          {r.covert.toFixed(1)}%
          <em className="pc-amp-fold"> floor {r.floor.toFixed(1)}%</em>
        </span>
      </span>
    </div>
  )

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        <button type="button" className={`mem-metric${model === '4b' ? ' on' : ''}`} onClick={() => setModel('4b')}>
          Qwen3-4B
        </button>
        <button type="button" className={`mem-metric${model === '1.7b' ? ' on' : ''}`} onClick={() => setModel('1.7b')}>
          Qwen3-1.7B
        </button>
      </div>

      <div className="mem-explorer-metrics" role="group" aria-label="Mouth-rank exclusion threshold">
        <span className="mem-bar-na" style={{ lineHeight: '1.7', marginRight: '0.2rem' }}>
          keep only lens hits whose token sits at mouth rank ≥
        </span>
        {THRESHOLDS.map((v) => (
          <button key={v} type="button" className={`mem-metric${t === v ? ' on' : ''}`} onClick={() => setT(v)}>
            {v}
          </button>
        ))}
      </div>

      <p className="mem-explorer-note">
        <strong>Context registers</strong> &mdash; metadata about the conversation the model is <em>not</em> about to emit.
      </p>
      <div className="mem-explorer-chart">{rows('register').map(bar)}</div>

      <p className="mem-explorer-note">
        <strong>Content plans</strong> &mdash; prospective content the model is building toward saying.
      </p>
      <div className="mem-explorer-chart">{rows('plan').map(bar)}</div>

      <div className="mem-explorer-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-chunks" /> context register
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-baseline" /> content plan
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch" style={{ border: '1px dashed var(--color-muted)', background: 'none' }} /> permutation
          floor
        </span>
      </div>

      <figcaption>
        A lens readout is <em>covert</em> only when its token is far outside the model&rsquo;s own next-token
        distribution &mdash; below mouth rank T, so it is not mere output anticipation. Drag T from 10 to 500: the two
        register families barely move, while the plan families collapse into their permutation floors. The split is a
        property of the content, not of where the cut is placed.
      </figcaption>
    </figure>
  )
}
