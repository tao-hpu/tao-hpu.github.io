'use client'

import { useState } from 'react'

/**
 * CGEP-ITW, 124 citation groups (one per generative-search answer), collected
 * 11 July 2026. Counts are groups where the signal fires. Source: August 2026
 * manuscript, Tables "profile and signal rates" and "treatment against
 * control"; S7-geo per stratum from itw-anchor/FINDINGS-full.md §3.
 */
type SignalKey = 'S1' | 'S4' | 'S7' | 'S7geo'
type Signal = {
  key: SignalKey
  button: string
  name: string
  treat: [number, number]
  control: [number, number]
  stats: string
  strata: Record<string, number>
}

const STRATA: { key: string; label: string; n: number; control: boolean }[] = [
  { key: 'A', label: 'A · appliances, electronics', n: 30, control: false },
  { key: 'B', label: 'B · education, certification', n: 30, control: false },
  { key: 'C', label: 'C · medical aesthetics, health', n: 20, control: false },
  { key: 'D', label: 'D · major brands', n: 20, control: false },
  { key: 'E1', label: 'E1 · low-ticket commodities', n: 14, control: true },
  { key: 'E2', label: 'E2 · factual entities', n: 6, control: true },
  { key: 'Dcal', label: 'Dcal · non-Chinese brands', n: 4, control: true },
]

const SIGNALS: Signal[] = [
  {
    key: 'S1',
    button: 'S1 low authority',
    name: '≥ 50% of citations on domains outside the Tranco top 100k',
    treat: [25, 100],
    control: [8, 24],
    stats: 'Odds ratio 0.67, one-sided Fisher p = 0.86. Continuous share 0.325 vs 0.351, p = 0.53.',
    strata: { A: 6, B: 14, C: 3, D: 2, E1: 8, E2: 0, Dcal: 0 },
  },
  {
    key: 'S4',
    button: 'S4 host–content gap',
    name: 'popular host, user-submission path, commercial recommendation text',
    treat: [46, 100],
    control: [2, 24],
    stats: 'Odds ratio 9.37, one-sided Fisher p = 3.5 × 10⁻⁴. S4 needs coder judgment.',
    strata: { A: 19, B: 11, C: 6, D: 10, E1: 2, E2: 0, Dcal: 0 },
  },
  {
    key: 'S7',
    button: 'S7 purchasable',
    name: 'a cited host appears in the paid-placement price list',
    treat: [75, 100],
    control: [6, 24],
    stats: 'Odds ratio 9.00, one-sided Fisher p = 8.4 × 10⁻⁶. Page share 0.375 vs 0.043, p = 3.0 × 10⁻⁷. S7 is a table lookup.',
    strata: { A: 26, B: 19, C: 18, D: 12, E1: 6, E2: 0, Dcal: 0 },
  },
  {
    key: 'S7geo',
    button: 'S7-geo',
    name: 'the matching offer is sold explicitly as GEO or AI inclusion',
    treat: [70, 100],
    control: [4, 24],
    stats: 'Odds ratio 11.67, one-sided Fisher p = 2.3 × 10⁻⁶.',
    strata: { A: 25, B: 15, C: 18, D: 12, E1: 4, E2: 0, Dcal: 0 },
  },
]

export default function CgepSignalContrast() {
  const [sigKey, setSigKey] = useState<SignalKey>('S1')
  const [split, setSplit] = useState<'pooled' | 'strata'>('pooled')
  const sig = SIGNALS.find((s) => s.key === sigKey) ?? SIGNALS[0]

  const rows =
    split === 'pooled'
      ? [
          { label: 'Treatment', sub: 'A, B, C, D', k: sig.treat[0], n: sig.treat[1], control: false },
          { label: 'Control', sub: 'E1, E2, Dcal', k: sig.control[0], n: sig.control[1], control: true },
        ]
      : STRATA.map((s) => ({ label: s.label, sub: '', k: sig.strata[s.key], n: s.n, control: s.control }))

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Choose signal">
        {SIGNALS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`mem-metric${s.key === sig.key ? ' on' : ''}`}
            aria-pressed={s.key === sig.key}
            onClick={() => setSigKey(s.key)}
          >
            {s.button}
          </button>
        ))}
      </div>
      <div className="mem-explorer-tabs cgep-split" role="group" aria-label="Choose grouping">
        <button
          type="button"
          className={`mem-tab${split === 'pooled' ? ' on' : ''}`}
          aria-pressed={split === 'pooled'}
          onClick={() => setSplit('pooled')}
        >
          treatment vs control
        </button>
        <button
          type="button"
          className={`mem-tab${split === 'strata' ? ' on' : ''}`}
          aria-pressed={split === 'strata'}
          onClick={() => setSplit('strata')}
        >
          by stratum
        </button>
      </div>

      <p className="cgep-metric">{sig.name}</p>

      <div className="mem-explorer-chart">
        {rows.map((r) => (
          <div key={r.label} className="cgep-row">
            <span className="mem-bar-label">
              {r.label}
              {r.sub && <span className="stair-chance-n">{r.sub}</span>}
            </span>
            <span className="cgep-track" aria-hidden="true">
              <span
                className={`cgep-fill ${r.control ? 'mem-bar-baseline cgep-fill-control' : 'mem-bar-chunks'}`}
                style={{ width: `${(r.k / r.n) * 100}%` }}
              />
            </span>
            <span className="cgep-value">
              {Math.round((r.k / r.n) * 100)}%
              <span className="cgep-count">
                {r.k}/{r.n}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="mem-explorer-note">{sig.stats}</p>

      <div className="mem-explorer-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-chunks" /> commercial-motive strata
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch mem-bar-baseline cgep-fill-control" /> control strata
        </span>
      </div>

      <figcaption>
        Share of citation groups in which each signal fires. One group is all pages cited by one answer; 124
        groups over 62 entities, two query templates per entity. E1 asks the same &ldquo;worth buying&rdquo; and
        &ldquo;X or Y&rdquo; questions as the treatment strata about products too cheap to be worth promoting.
        Single-author coding.
      </figcaption>
    </figure>
  )
}
