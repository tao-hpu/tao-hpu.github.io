'use client'

import { useState } from 'react'

/**
 * E6 causal register control on Qwen3-4B: translate the language-register axis
 * by alpha times the measured population gap, against an amplitude-matched
 * random-direction control. Numbers from the E6 dose table (Appendix B, Table
 * B1); n = 79 baseline-valid items, covert subset n = 24. All values are
 * percent of baseline-valid items.
 */
type Dose = { lang: number; full: number; preserved: number; covert: number; randFlip: number; randPres: number }

const DATA: Record<string, Dose> = {
  '0.0625': { lang: 64.6, full: 49.4, preserved: 78.5, covert: 29.2, randFlip: 0, randPres: 97.5 },
  '0.125': { lang: 91.1, full: 64.6, preserved: 69.6, covert: 29.2, randFlip: 0, randPres: 94.9 },
  '0.25': { lang: 92.4, full: 27.8, preserved: 30.4, covert: 20.8, randFlip: 0, randPres: 91.1 },
}

const ALPHAS = ['0.0625', '0.125', '0.25'] as const

const ROWS: { key: keyof Dose; label: string; kind: 'chunks' | 'artifacts' | 'baseline' }[] = [
  { key: 'lang', label: 'output language flips', kind: 'chunks' },
  { key: 'full', label: 'full flip (language + answer correct)', kind: 'chunks' },
  { key: 'preserved', label: 'answer content preserved', kind: 'artifacts' },
  { key: 'covert', label: 'full flip, covert subset', kind: 'chunks' },
  { key: 'randFlip', label: 'random control (any flip)', kind: 'baseline' },
]

export default function RegisterDoseCurve() {
  const [alpha, setAlpha] = useState<string>('0.125')
  const d = DATA[alpha]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Dose">
        <span className="mem-bar-na" style={{ lineHeight: '1.7', marginRight: '0.2rem' }}>
          translate the register by α ×
        </span>
        {ALPHAS.map((a) => (
          <button key={a} type="button" className={`mem-metric${alpha === a ? ' on' : ''}`} onClick={() => setAlpha(a)}>
            {a}
          </button>
        ))}
        <span className="mem-bar-na" style={{ lineHeight: '1.7' }}>the measured en&harr;zh gap</span>
      </div>

      <div className="mem-explorer-chart">
        {ROWS.map((r) => {
          const v = d[r.key]
          return (
            <div className="mem-bar-row" key={r.key}>
              <span className="mem-bar-label">{r.label}</span>
              <span className="mem-bar-track">
                <span className={`mem-bar mem-bar-${r.kind}`} style={{ width: `${(v / 100) * 80}%` }} />
                <span className="mem-bar-value">{v.toFixed(1)}%</span>
              </span>
            </div>
          )
        })}
      </div>

      <p className="mem-explorer-note">
        Amplitude-matched random control keeps {d.randPres.toFixed(1)}% of answers intact and flips essentially nothing
        &mdash; the register move is not generic perturbation.
      </p>

      <figcaption>
        Pushing the language register flips which language the model speaks on up to 91% of prompts, with a full flip
        (language changed <em>and</em> answer still correct) peaking near the operating point. But on the covert subset
        &mdash; items where the target-language answer form was genuinely absent from the clean output &mdash; full flips
        plateau around 29% while content preservation falls as the dose rises. The register carries the language
        <em> setting</em>, not the content: it moves the tongue, not the fact.
      </figcaption>
    </figure>
  )
}
