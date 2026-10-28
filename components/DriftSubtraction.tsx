'use client'

import { useState } from 'react'

/**
 * Inference-time edits on the Tülu 3 final (RLVR) model, hooks on layers 8–23.
 * Numbers from the surgery table of the paper (Table 4). Naturalness and
 * usefulness come from a two-axis blind LLM-judge protocol and are comparable
 * within this figure only. random = same-norm random directions at α = 0.5,
 * three seeds (gaps 3.46–3.48, mean shown; judged scores pooled).
 */
type Cond = { key: string; label: string; gap: number; natural?: number; useful?: number; en: string }

const CONDS: Cond[] = [
  { key: 'control', label: 'no edit', gap: 3.485, natural: 4.11, useful: 3.59, en: '0/20' },
  { key: 'tv05', label: 'subtract 0.5 × drift', gap: 3.692, natural: 3.63, useful: 3.47, en: '0/20' },
  { key: 'random', label: 'random direction', gap: 3.47, natural: 3.98, useful: 3.51, en: '0/60' },
  { key: 'proj1', label: 'project out top-1', gap: 2.894, natural: 3.97, useful: 3.6, en: '0/20' },
  { key: 'proj3', label: 'project out top-3', gap: 2.603, natural: 3.68, useful: 3.34, en: '0/20' },
  { key: 'tv10', label: 'subtract 1.0 × drift', gap: 3.523, en: '19/20' },
]

type Metric = 'gap' | 'natural' | 'useful'

const METRICS: Record<Metric, { label: string; lo: number; hi: number; ticks: number[]; axis: string }> = {
  gap: { label: 'representation gap', lo: 2.4, hi: 4.1, ticks: [2.5, 3, 3.5, 4], axis: 'zh–en gap on the register axis (mid-band)' },
  natural: { label: 'judged naturalness', lo: 3, hi: 4.5, ticks: [3, 3.5, 4, 4.5], axis: 'Chinese naturalness, LLM judge (1–5)' },
  useful: { label: 'judged usefulness', lo: 3, hi: 4.5, ticks: [3, 3.5, 4, 4.5], axis: 'Chinese usefulness, LLM judge (1–5)' },
}

const W = 480
const ROW = 34
const PAD = { left: 132, right: 92, top: 22, bottom: 40 }
const H = PAD.top + ROW * CONDS.length + PAD.bottom

export default function DriftSubtraction() {
  const [metric, setMetric] = useState<Metric>('gap')
  const m = METRICS[metric]
  const x = (v: number) => PAD.left + ((v - m.lo) / (m.hi - m.lo)) * (W - PAD.left - PAD.right)
  const y = (i: number) => PAD.top + ROW * i + ROW / 2
  const refs: { v: number; label: string }[] =
    metric === 'gap'
      ? [
          { v: 3.975, label: 'base' },
          { v: 3.485, label: 'untouched' },
        ]
      : [{ v: metric === 'natural' ? 4.11 : 3.59, label: 'no edit' }]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Measure">
        {(Object.keys(METRICS) as Metric[]).map((k) => (
          <button key={k} type="button" className={`mem-metric${metric === k ? ' on' : ''}`} onClick={() => setMetric(k)}>
            {METRICS[k].label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="pc-scatter-svg" role="img" aria-label={`Inference-time edits: ${m.label}`}>
        {refs.map((r) => (
          <g key={r.label}>
            <line x1={x(r.v)} x2={x(r.v)} y1={PAD.top} y2={H - PAD.bottom} className="pc-grid" />
            <text x={x(r.v)} y={PAD.top - 8} className="pc-tick" textAnchor="middle">
              {r.label}
            </text>
          </g>
        ))}
        {m.ticks.map((v) => (
          <text key={v} x={x(v)} y={H - PAD.bottom + 16} className="pc-tick" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 6} className="pc-axis" textAnchor="middle">
          {m.axis}
        </text>

        {CONDS.map((c, i) => {
          const v = metric === 'gap' ? c.gap : metric === 'natural' ? c.natural : c.useful
          const highlight = c.key === 'tv05'
          return (
            <g key={c.key}>
              <text x={PAD.left - 12} y={y(i) + 4} className="pc-axis" textAnchor="end"
                style={highlight ? { fill: 'var(--color-text)', fontWeight: 600 } : undefined}>
                {c.label}
              </text>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(i)} y2={y(i)} stroke="var(--color-border)" strokeWidth={0.5} />
              {v === undefined ? (
                <text x={PAD.left + 4} y={y(i) + 4} className="pc-tick">
                  60/60 Chinese outputs loop
                </text>
              ) : (
                <>
                  <circle cx={x(v)} cy={y(i)} r={6}
                    className={`pc-dot ${highlight ? 'pc-dot-factual' : c.key === 'random' ? 'pc-dot-creative' : 'pc-dot-judgment'}`}
                    style={{ cursor: 'default', transition: 'cx 0.35s ease' }} />
                  <text x={W - 4} y={y(i) + 4} className="pc-tick" textAnchor="end" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {metric === 'gap' ? v.toFixed(3) : v.toFixed(2)}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </svg>

      <p className="mem-explorer-note">
        {metric === 'gap' &&
          'Subtracting half the mean Chinese drift vector moves the gap from 3.485 to 3.692, 42% of the way back to the base 3.975. Same-norm random directions leave it at 3.46–3.48. Projecting out the drift subspace shrinks the gap instead: it deletes register information from both languages.'}
        {metric === 'natural' &&
          'At the dose that restores 42% of the representation gap, judged naturalness is lower than with no edit (3.63 vs 4.11; item-paired −0.51, 95% CI −0.75 to −0.27).'}
        {metric === 'useful' &&
          'Usefulness stays flat under the restoring edit (item-paired −0.09, 95% CI −0.33 to +0.16). Layout is excluded from this judgment.'}{' '}
        Degenerate English outputs on a 20-item probe: {CONDS.map((c) => `${c.label} ${c.en}`).join(', ')}.
      </p>

      <figcaption>
        Inference-time edits on the Tülu&nbsp;3 final model, applied at layers 8&ndash;23. The judge scores here
        come from a separate two-axis protocol and are not comparable with the judge scores elsewhere in this note.
        One family, one symmetric edit, one working dose, scored by an LLM judge.
      </figcaption>
    </figure>
  )
}
