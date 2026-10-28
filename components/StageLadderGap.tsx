'use client'

import { useState } from 'react'

/**
 * Mid-band (layers 8–23) register-axis positions of the Chinese and English
 * probe items at each post-training stage, base Chinese at 0. Positions are
 * rebuilt from the stage-attribution table of the paper (Table 1): zh = shift
 * zh, en = base gap + shift en. Increment norms and cosines with the total
 * base→final drift are from the same table.
 */
type Stage = { stage: string; zh: number; en: number; inc?: number; cos?: number }

const FAMILIES: Record<string, { label: string; base: string; stages: Stage[]; note: string }> = {
  tulu: {
    label: 'Tülu 3',
    base: 'Llama-3.1-8B',
    stages: [
      { stage: 'base', zh: 0, en: 3.975 },
      { stage: 'SFT', zh: 0.358, en: 3.975 - 0.149, inc: 1.425, cos: 0.943 },
      { stage: 'DPO', zh: 0.244, en: 3.975 - 0.25, inc: 0.483, cos: 0.154 },
      { stage: 'RLVR', zh: 0.234, en: 3.975 - 0.256, inc: 0.104, cos: 0.121 },
    ],
    note: 'Both languages move toward each other: Chinese +0.358, English −0.149 at SFT.',
  },
  olmo: {
    label: 'OLMo 2 7B',
    base: 'OLMo-2-1124-7B',
    stages: [
      { stage: 'base', zh: 0, en: 6.187 },
      { stage: 'SFT', zh: 1.385, en: 6.187 + 0.15, inc: 2.285, cos: 0.962 },
      { stage: 'DPO', zh: 1.317, en: 6.187 + 0.107, inc: 0.674, cos: 0.23 },
      { stage: 'RLVR', zh: 1.312, en: 6.187 + 0.107, inc: 0.078, cos: 0.064 },
    ],
    note: 'Chinese does the moving (+1.385 at SFT); English moves +0.150, slightly further toward the English pole.',
  },
}

const W = 480
const ROW = 46
const PAD = { left: 46, right: 104, top: 14, bottom: 40 }
const H = PAD.top + ROW * 4 + PAD.bottom
const XMAX = 6.6

const x = (v: number) => PAD.left + (v / XMAX) * (W - PAD.left - PAD.right)
const y = (i: number) => PAD.top + ROW * i + ROW / 2

export default function StageLadderGap() {
  const [fam, setFam] = useState<keyof typeof FAMILIES>('tulu')
  const f = FAMILIES[fam]
  const base = f.stages[0]
  const baseGap = base.en - base.zh

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-tabs" role="group" aria-label="Model family">
        {(Object.keys(FAMILIES) as (keyof typeof FAMILIES)[]).map((k) => (
          <button key={k} type="button" className={`mem-tab${fam === k ? ' on' : ''}`} onClick={() => setFam(k)}>
            {FAMILIES[k].label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="pc-scatter-svg" role="img"
        aria-label={`Chinese and English register-axis positions across the ${f.label} ladder`}>
        {[0, 1, 2, 3, 4, 5, 6].map((v) => (
          <text key={v} x={x(v)} y={H - PAD.bottom + 16} className="pc-tick" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 6} className="pc-axis" textAnchor="middle">
          position on the base-anchored zh→en axis
        </text>
        <text x={W - 4} y={PAD.top - 2} className="pc-tick" textAnchor="end">
          gap, vs base
        </text>

        {/* base positions carried down every row */}
        {[base.zh, base.en].map((v) => (
          <line key={v} x1={x(v)} x2={x(v)} y1={PAD.top} y2={H - PAD.bottom} className="pc-grid" />
        ))}

        {f.stages.map((s, i) => {
          const gap = s.en - s.zh
          const pct = ((baseGap - gap) / baseGap) * 100
          return (
            <g key={s.stage}>
              <text x={PAD.left - 10} y={y(i) + 4} className="pc-axis" textAnchor="end">
                {s.stage}
              </text>
              <line x1={x(s.zh)} x2={x(s.en)} y1={y(i)} y2={y(i)} stroke="var(--color-muted)" strokeWidth={1.5}
                style={{ transition: 'all 0.35s ease' }} />
              <circle cx={x(s.zh)} cy={y(i)} r={6} className="pc-dot pc-dot-factual" style={{ cursor: 'default', transition: 'cx 0.35s ease' }} />
              <circle cx={x(s.en)} cy={y(i)} r={6} className="pc-dot pc-dot-advice" style={{ cursor: 'default', transition: 'cx 0.35s ease' }} />
              <text x={W - 4} y={y(i) + 4} className="pc-tick" textAnchor="end" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {gap.toFixed(3)}
                {i > 0 ? `  −${pct.toFixed(1)}%` : ''}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mem-explorer-legend" style={{ marginTop: '0.4rem' }}>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch" style={{ background: 'var(--color-accent)' }} />
          Chinese items
        </span>
        <span className="mem-legend-item">
          <span
            className="mem-legend-swatch"
            style={{ background: 'color-mix(in srgb, var(--color-accent) 38%, var(--color-border))' }}
          />
          English items
        </span>
        <span className="mem-legend-item">dashed: base positions</span>
      </div>

      <p className="mem-explorer-note">
        {f.note} Each stage&rsquo;s increment against the total base&rarr;final drift of the Chinese items:{' '}
        {f.stages.slice(1).map((s, i) => (
          <span key={s.stage}>
            {i > 0 ? '; ' : ''}
            {s.stage} norm {s.inc?.toFixed(3)}, cosine {s.cos?.toFixed(3)}
          </span>
        ))}
        .
      </p>

      <figcaption>
        Mean position of 60 Chinese and 60 English probe texts on a register axis estimated once on the base model
        ({f.base}), averaged over layers 8&ndash;23. The gap shrinks at SFT and then re-widens by a few thousandths
        through DPO and RLVR (paired, 3.3% of the SFT contraction on Tülu&nbsp;3 and 2.4% on OLMo&nbsp;2). Both
        families share one horizontal scale, so the base gap on OLMo&nbsp;2 is visibly 1.6&times; larger.
      </figcaption>
    </figure>
  )
}
