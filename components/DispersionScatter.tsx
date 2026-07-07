'use client'

import { useState } from 'react'
import { PROMPTS, type PromptRow } from './preferenceCentroidData'

const CATS = ['factual', 'explain', 'judgment', 'advice', 'creative'] as const

const W = 560
const H = 300
const PAD = { left: 46, right: 14, top: 12, bottom: 34 }
const YMAX = 0.62

function x(consensus: number) {
  return PAD.left + (consensus / 100) * (W - PAD.left - PAD.right)
}
function y(disp: number) {
  return H - PAD.bottom - (Math.min(disp, YMAX) / YMAX) * (H - PAD.top - PAD.bottom)
}

export default function DispersionScatter() {
  const [model, setModel] = useState<'claude' | 'gpt4o'>('claude')
  const [selected, setSelected] = useState<PromptRow | null>(
    PROMPTS.find((p) => p.id === '5_creative_open/0') ?? null,
  )

  const disp = (p: PromptRow) => (model === 'claude' ? p.claudeDisp : p.gpt4oDisp)

  return (
    <figure className="pc-scatter">
      <div className="mem-explorer-metrics">
        <button
          type="button"
          className={`mem-metric${model === 'claude' ? ' on' : ''}`}
          onClick={() => setModel('claude')}
        >
          Claude Sonnet 4.6 (ρ = 0.85)
        </button>
        <button
          type="button"
          className={`mem-metric${model === 'gpt4o' ? ' on' : ''}`}
          onClick={() => setModel('gpt4o')}
        >
          GPT-4o replication (ρ = 0.84)
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="pc-scatter-svg" role="img"
        aria-label="Scatter plot: judge-scored consensus versus output dispersion for 20 prompts">
        {[0, 0.2, 0.4, 0.6].map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} className="pc-grid" />
            <text x={PAD.left - 6} y={y(v) + 3} className="pc-tick" textAnchor="end">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map((v) => (
          <text key={v} x={x(v)} y={H - PAD.bottom + 16} className="pc-tick" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 4} className="pc-axis" textAnchor="middle">
          consensus scored by held-out judges, from the prompt alone
        </text>
        <text
          x={12}
          y={(PAD.top + H - PAD.bottom) / 2}
          className="pc-axis"
          textAnchor="middle"
          transform={`rotate(-90 12 ${(PAD.top + H - PAD.bottom) / 2})`}
        >
          output dispersion
        </text>
        {PROMPTS.map((p) => (
          <circle
            key={p.id}
            cx={x(p.consensus)}
            cy={y(disp(p))}
            r={selected?.id === p.id ? 8 : 6}
            className={`pc-dot pc-dot-${p.cat}${selected?.id === p.id ? ' selected' : ''}`}
            onClick={() => setSelected(p)}
          >
            <title>{`${p.prompt} — dispersion ${disp(p).toFixed(3)}, consensus ${p.consensus}`}</title>
          </circle>
        ))}
      </svg>

      <div className="pc-legend">
        {CATS.map((c) => (
          <span className="mem-legend-item" key={c}>
            <span className={`mem-legend-swatch pc-dot-${c}`} /> {c}
          </span>
        ))}
      </div>

      {selected && (
        <div className="pc-detail">
          <p className="pc-detail-prompt">
            <span className={`lossy-fact-type pc-dot-${selected.cat}`}>{selected.cat}</span>
            {selected.prompt}
          </p>
          <p className="pc-detail-stats">
            dispersion {disp(selected).toFixed(3)} ({model === 'claude' ? 'Claude Sonnet 4.6' : 'GPT-4o'}) ·
            judge consensus {selected.consensus}/100
          </p>
          <ul className="pc-detail-samples">
            {selected.samples.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="pc-detail-note">
            3 of the 25 sampled completions (from the Claude run, temperature 1.0).
          </p>
        </div>
      )}

      <figcaption>
        Each dot is one of the paper&rsquo;s 20 prompts: x is how much three held-out judge
        models, shown only the prompt, say knowledgeable people would agree on a good
        answer; y is the measured dispersion of 25 sampled completions (mean pairwise
        cosine distance). Judges never see an output, yet predict dispersion at Spearman
        &rho;&nbsp;=&nbsp;&minus;0.91. Click a dot to read the prompt and actual samples;
        switch models to see the ordering replicate.
      </figcaption>
    </figure>
  )
}
