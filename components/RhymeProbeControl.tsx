'use client'

import { useState } from 'react'

/**
 * Positive control at the rhyme-planning position (the newline ending line 1):
 * Jacobian lens vs a trained linear probe vs the probe's permutation control
 * vs a context-only frequency baseline that reads no activations. Pass@10 (%)
 * from the revised working paper, probe table (Section 5.1); within-class
 * top-1 from the Appendix C table (held-out couplets only).
 */
type Split = { lens: number; probe: number; ctrl: number; freq: number }
type Model = { label: string; heldout: Split; official: Split; wcProbe: number; wcFreq: number; pairs: string }

const MODELS: Record<string, Model> = {
  '1.7b': {
    label: 'Qwen3-1.7B',
    heldout: { lens: 1.0, probe: 81.4, ctrl: 11.6, freq: 94.9 },
    official: { lens: 0.0, probe: 26.5, ctrl: 2.0, freq: 57.1 },
    wcProbe: 42.6,
    wcFreq: 49.6,
    pairs: '2,484 / 413',
  },
  '4b': {
    label: 'Qwen3-4B',
    heldout: { lens: 0.0, probe: 59.0, ctrl: 11.9, freq: 88.8 },
    official: { lens: 0.0, probe: 10.2, ctrl: 2.0, freq: 67.3 },
    wcProbe: 36.5,
    wcFreq: 37.8,
    pairs: '1,875 / 312',
  },
  gemma: {
    label: 'Gemma-2-2B',
    heldout: { lens: 0.0, probe: 48.6, ctrl: 6.8, freq: 68.9 },
    official: { lens: 0.0, probe: 22.4, ctrl: 0.0, freq: 46.9 },
    wcProbe: 31.1,
    wcFreq: 31.1,
    pairs: '449 / 74',
  },
}

const ROWS: { key: keyof Split; label: string; kind: 'chunks' | 'artifacts' | 'baseline' }[] = [
  { key: 'lens', label: 'Jacobian lens', kind: 'baseline' },
  { key: 'probe', label: 'trained probe', kind: 'chunks' },
  { key: 'ctrl', label: 'probe, permutation control', kind: 'baseline' },
  { key: 'freq', label: 'frequency baseline (no activations)', kind: 'artifacts' },
]

const barRow = (key: string, label: string, v: number, kind: string) => (
  <div className="mem-bar-row" key={key}>
    <span className="mem-bar-label">{label}</span>
    <span className="mem-bar-track">
      <span className={`mem-bar mem-bar-${kind}`} style={{ width: `${(v / 100) * 80}%` }} />
      <span className="mem-bar-value">{v.toFixed(1)}%</span>
    </span>
  </div>
)

export default function RhymeProbeControl() {
  const [model, setModel] = useState<string>('1.7b')
  const [split, setSplit] = useState<'heldout' | 'official'>('heldout')
  const m = MODELS[model]
  const s = m[split]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        {Object.entries(MODELS).map(([k, v]) => (
          <button key={k} type="button" className={`mem-metric${model === k ? ' on' : ''}`} onClick={() => setModel(k)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="mem-explorer-metrics">
        <button
          type="button"
          className={`mem-metric${split === 'heldout' ? ' on' : ''}`}
          onClick={() => setSplit('heldout')}
        >
          held-out generated couplets
        </button>
        <button
          type="button"
          className={`mem-metric${split === 'official' ? ' on' : ''}`}
          onClick={() => setSplit('official')}
        >
          official 98 couplets
        </button>
      </div>

      <p className="mem-explorer-note">
        <strong>Rhyme word readable at the end of line 1</strong> (pass@10)
      </p>
      <div className="mem-explorer-chart">{ROWS.map((r) => barRow(r.key, r.label, s[r.key], r.kind))}</div>

      <p className="mem-explorer-note">
        <strong>Which rhyme, among the candidates of the right class</strong> (top-1, held-out; chance 1 to 2%)
      </p>
      <div className="mem-explorer-chart">
        {barRow('wc-probe', 'trained probe, best layer', m.wcProbe, 'chunks')}
        {barRow('wc-freq', 'frequency baseline', m.wcFreq, 'artifacts')}
      </div>

      <figcaption>
        Training / held-out pairs for {m.label}: {m.pairs}. The probe reads the upcoming rhyme where the lens reads
        almost nothing, so the lens&rsquo;s silence at this position is a fact about the lens. The frequency baseline
        knows only the rhyme class of line 1&rsquo;s last word and how often the model used each rhyme word in its own
        training couplets. It beats the probe on every model and split, and no fitted layer of any model beats it
        within the rhyme class.
      </figcaption>
    </figure>
  )
}
