'use client'

import { useState } from 'react'

/**
 * Language-register write on Qwen3-4B: shift the residual along a language
 * axis by alpha times the measured English/Chinese population gap, against an
 * amplitude-matched random-direction control. Numbers from the revised working
 * paper, dose table (Section 6) and direction table (Appendix D); n = 79
 * prompts that pass the clean-answer gate. Random-arm preservation is given to
 * the paper's precision (whole percent).
 */
type Dose = { lang: number; full: number; preserved: number; randFlip: number; randPres: number }

const DATA: Record<string, Dose> = {
  '0.0625': { lang: 64.6, full: 49.4, preserved: 78.5, randFlip: 0, randPres: 97 },
  '0.125': { lang: 91.1, full: 64.6, preserved: 69.6, randFlip: 0, randPres: 95 },
  '0.25': { lang: 92.4, full: 27.8, preserved: 30.4, randFlip: 0, randPres: 91 },
}

const ALPHAS = ['0.0625', '0.125', '0.25'] as const

const ROWS: { key: keyof Dose; label: string; kind: 'chunks' | 'artifacts' | 'baseline' }[] = [
  { key: 'lang', label: 'output language flips', kind: 'chunks' },
  { key: 'full', label: 'full flip (language flipped, answer correct)', kind: 'chunks' },
  { key: 'preserved', label: 'answer kept, either language', kind: 'artifacts' },
  { key: 'randFlip', label: 'random control, language flips', kind: 'baseline' },
]

/** Full flips at alpha = 0.125 by direction (Appendix D). */
const DIRECTION = [
  { label: 'en → zh, all facts', v: 92.3, note: '36/39' },
  { label: 'zh → en, all facts', v: 37.5, note: '15/40' },
  { label: 'zh → en, capital template', v: 100, note: '13/13' },
  { label: 'zh → en, other facts', v: 7.4, note: '2/27' },
]

export default function RegisterDoseCurve() {
  const [alpha, setAlpha] = useState<string>('0.125')
  const d = DATA[alpha]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Dose">
        <span className="mem-bar-na" style={{ lineHeight: '1.7', marginRight: '0.2rem' }}>
          shift along the language axis by α ×
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
        The amplitude-matched random direction keeps {d.randPres}% of answers and flips the language on none.
      </p>

      <p className="mem-explorer-note">
        <strong>Full flips at α = 0.125, by direction</strong>
      </p>
      <div className="mem-explorer-chart">
        {DIRECTION.map((r) => (
          <div className="mem-bar-row" key={r.label}>
            <span className="mem-bar-label">{r.label}</span>
            <span className="mem-bar-track">
              <span className="mem-bar mem-bar-chunks" style={{ width: `${(r.v / 100) * 80}%` }} />
              <span className="mem-bar-value">{r.note}</span>
            </span>
          </div>
        ))}
      </div>

      <figcaption>
        Qwen3-4B. The operating point α = 0.125 is the dose with the highest full-flip rate on these same items, so it
        is selected on the test set. Language flips occur in both directions, but the answer survives mainly when the
        output flips into Chinese; from Chinese into English it survives on the capital template and almost nowhere
        else.
      </figcaption>
    </figure>
  )
}
