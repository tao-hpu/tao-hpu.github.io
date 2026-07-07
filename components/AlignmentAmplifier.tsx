'use client'

import { useState } from 'react'

/**
 * Band-level dispersion from the paper's matched Qwen2.5-7B base-vs-instruct
 * run (m1_base_vs_instruct.json summary; 20 prompts, N=25, temperature 1.0).
 */
const BANDS: { label: string; base: number; instruct: number; fold: string }[] = [
  { label: 'factual', base: 0.171, instruct: 0.02, fold: '8.7' },
  { label: 'explain', base: 0.146, instruct: 0.07, fold: '2.1' },
  { label: 'judgment', base: 0.244, instruct: 0.131, fold: '1.9' },
  { label: 'advice', base: 0.252, instruct: 0.12, fold: '2.1' },
  { label: 'creative', base: 0.563, instruct: 0.308, fold: '1.8' },
]

const MAX = 0.6

export default function AlignmentAmplifier() {
  const [aligned, setAligned] = useState(false)

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        <button
          type="button"
          className={`mem-metric${!aligned ? ' on' : ''}`}
          onClick={() => setAligned(false)}
        >
          Qwen2.5-7B (base)
        </button>
        <button
          type="button"
          className={`mem-metric${aligned ? ' on' : ''}`}
          onClick={() => setAligned(true)}
        >
          + instruction tuning
        </button>
      </div>

      <div className="mem-explorer-chart">
        {BANDS.map((b) => {
          const v = aligned ? b.instruct : b.base
          return (
            <div className="mem-bar-row" key={b.label}>
              <span className="mem-bar-label">{b.label}</span>
              <span className="mem-bar-track pc-amp-track">
                <span className="pc-amp-ghost" style={{ width: `${(b.base / MAX) * 80}%` }} />
                <span
                  className="mem-bar mem-bar-chunks pc-amp-bar"
                  style={{ width: `${(v / MAX) * 80}%` }}
                />
                <span className="mem-bar-value">
                  {v.toFixed(3)}
                  {aligned && <em className="pc-amp-fold"> ÷{b.fold}</em>}
                </span>
              </span>
            </div>
          )
        })}
      </div>

      <figcaption>
        The same 20 prompts, run on Qwen2.5-7B and its instruction-tuned sibling,
        differing only in alignment. The outline marks the base model&rsquo;s dispersion;
        press the toggle. Both models carry the same ordering (gradient &rho;&nbsp;=
        0.80 vs. 0.79), but tuning compresses the high-consensus end about 8.7-fold
        against 1.8-fold at the open end. Alignment amplifies a gradient the pretrained
        model already has.
      </figcaption>
    </figure>
  )
}
