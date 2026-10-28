'use client'

import { useState } from 'react'

/**
 * Mouth-exclusion audit of the six official evaluation sets: covert readout
 * rate (lens rank < 10, mouth rank >= T) swept across T, with permutation
 * floors under identical scoring. Numbers from the revised working paper,
 * Appendix B threshold-sweep table (Qwen3-4B / Qwen3-1.7B); the multilingual
 * slot split is Table 1 (strict cut, T = 100 only).
 */
type Sweep = { covert: Record<string, number>; floor: Record<string, number> }
type Family = { key: string; label: string; group: 'other-form' | 'output-form' }

const FAMILIES: Family[] = [
  { key: 'multilingual', label: 'multilingual', group: 'other-form' },
  { key: 'typo', label: 'typo correction', group: 'other-form' },
  { key: 'poetry', label: 'poetry (rhyme)', group: 'output-form' },
  { key: 'orderops', label: 'order-of-ops', group: 'output-form' },
  { key: 'assoc', label: 'association', group: 'output-form' },
  { key: 'multihop', label: 'multi-hop (bridge)', group: 'output-form' },
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

/** Multilingual set split by intermediate slot, strict cut (T = 100). */
const SLOTS: Record<string, { label: string; covert: number; floor: number }[]> = {
  '4b': [
    { label: 'language name', covert: 6.5, floor: 0 },
    { label: 'relation, input (English)', covert: 28.0, floor: 3.7 },
    { label: 'answer (English)', covert: 62.6, floor: 5.6 },
  ],
  '1.7b': [
    { label: 'language name', covert: 7.5, floor: 0 },
    { label: 'relation, input (English)', covert: 16.4, floor: 1.9 },
    { label: 'answer (English)', covert: 54.2, floor: 1.9 },
  ],
}

const THRESHOLDS = ['10', '50', '100', '500'] as const
const MAXV = 70

type Row = { label: string; covert: number; floor: number; kind: 'chunks' | 'baseline' }

export default function RegisterPlanBars() {
  const [model, setModel] = useState<'4b' | '1.7b'>('4b')
  const [t, setT] = useState<string>('100')

  const rows = (group: Family['group']): Row[] =>
    FAMILIES.filter((f) => f.group === group).map((f) => {
      const s = DATA[model][f.key]
      return { label: f.label, covert: s.covert[t], floor: s.floor[t], kind: group === 'other-form' ? 'chunks' : 'baseline' }
    })

  const bar = (r: Row) => (
    <div className="mem-bar-row" key={r.label}>
      <span className="mem-bar-label">{r.label}</span>
      <span className="mem-bar-track pc-amp-track">
        <span className="pc-amp-ghost" style={{ width: `${(r.floor / MAXV) * 80}%` }} />
        <span className={`mem-bar pc-amp-bar mem-bar-${r.kind}`} style={{ width: `${(r.covert / MAXV) * 80}%` }} />
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

      <div className="mem-explorer-metrics" role="group" aria-label="Mouth-rank cut">
        <span className="mem-bar-na" style={{ lineHeight: '1.7', marginRight: '0.2rem' }}>
          count a lens hit only if its token sits at mouth rank ≥
        </span>
        {THRESHOLDS.map((v) => (
          <button key={v} type="button" className={`mem-metric${t === v ? ' on' : ''}`} onClick={() => setT(v)}>
            {v}
          </button>
        ))}
      </div>

      <p className="mem-explorer-note">
        <strong>Target in another surface form</strong>: the decoded token is not the form the model is about to emit.
      </p>
      <div className="mem-explorer-chart">{rows('other-form').map(bar)}</div>

      <p className="mem-explorer-note">
        <strong>Target in the output&rsquo;s own form</strong>: the rhyme word, an arithmetic intermediate, a bridge
        entity.
      </p>
      <div className="mem-explorer-chart">{rows('output-form').map(bar)}</div>

      <p className="mem-explorer-note">
        <strong>Multilingual, split by slot</strong> (strict cut T = 100 only, whatever is selected above).
      </p>
      <div className="mem-explorer-chart">
        {SLOTS[model].map((s) => bar({ ...s, kind: 'chunks' }))}
      </div>

      <div className="mem-explorer-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-chunks" /> other surface form
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-baseline" /> output&rsquo;s own form
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch" style={{ border: '1px dashed var(--color-muted)', background: 'none' }} />{' '}
          permutation floor
        </span>
      </div>

      <figcaption>
        Covert readout rate per evaluation set: the lens puts the target in its top 10 while the model&rsquo;s own
        next-token distribution ranks it at T or below. At T = 50 and T = 100 the two groups separate: multilingual and
        typo stay above their floors, the four content sets sit at or near theirs. At T = 10 and T = 500 the groups are
        close. Within the multilingual set, most surviving hits are English content words and the English form of the
        answer; the language name accounts for 6.5 to 7.5% of items.
      </figcaption>
    </figure>
  )
}
