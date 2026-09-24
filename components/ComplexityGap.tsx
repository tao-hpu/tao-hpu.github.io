'use client'

import { useState } from 'react'

/**
 * Schematic of the HHAI 2026 reconciliation (§3.2, Fig. 1, Table 1): inside the
 * model's capability frontier AI supplies a ceiling of competent output and the
 * novice-expert gap compresses; beyond it AI supplies raw material that has to be
 * directed and judged, and the gap widens. The paper reports no curve, so every
 * value here is illustrative. Only the shape (compress, then widen, with the
 * crossover at the frontier) is the paper's claim.
 */

const W = 560
const H = 316
const PAD = { top: 34, right: 16, bottom: 44, left: 40 }
const x = (v: number) => PAD.left + v * (W - PAD.left - PAD.right)
const y = (v: number) => PAD.top + (1 - v) * (H - PAD.top - PAD.bottom)

const TASKS = [
  { at: 0.06, label: 'Formulaic customer-service reply' },
  { at: 0.18, label: 'Boilerplate code' },
  { at: 0.3, label: 'Standard email draft' },
  { at: 0.52, label: 'Architectural design' },
  { at: 0.66, label: 'Strategic analysis' },
  { at: 0.8, label: 'Legal reasoning on a contested case' },
  { at: 0.94, label: 'Novel research' },
]

// Unaided performance: both fall with complexity, novices faster.
const expert0 = (c: number) => 0.9 - 0.25 * c
const novice0 = (c: number) => 0.62 - 0.45 * c
// 1 well inside the frontier, 0 well beyond it.
const inside = (c: number, f: number) => 1 / (1 + Math.exp((c - f) / 0.05))
// Inside: AI lifts both toward a competent ceiling. Beyond: the expert directs
// and gains; the novice accepts plausible errors and ends below unaided.
const expertAI = (c: number, f: number) => {
  const s = inside(c, f)
  return s * Math.max(0.88, expert0(c)) + (1 - s) * Math.min(0.98, expert0(c) + 0.1)
}
const noviceAI = (c: number, f: number) => {
  const s = inside(c, f)
  return s * 0.84 + (1 - s) * Math.max(0.02, novice0(c) - 0.06)
}

const path = (fn: (c: number) => number) =>
  Array.from({ length: 81 }, (_, i) => i / 80)
    .map((c, i) => `${i ? 'L' : 'M'}${x(c).toFixed(1)},${y(fn(c)).toFixed(1)}`)
    .join(' ')

export default function ComplexityGap() {
  const [task, setTask] = useState(2)
  const [frontier, setFrontier] = useState(0.42)
  const [showUnaided, setShowUnaided] = useState(true)

  const c = TASKS[task].at
  const gapAI = expertAI(c, frontier) - noviceAI(c, frontier)
  const gap0 = expert0(c) - novice0(c)
  const amplifies = gapAI > gap0

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics" role="group" aria-label="Task">
        {TASKS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            className={`mem-metric${task === i ? ' on' : ''}`}
            onClick={() => setTask(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="lossy-slider">
        <span>
          Model capability <em>moves the frontier</em>
        </span>
        <input
          type="range"
          min={0.2}
          max={0.8}
          step={0.01}
          value={frontier}
          onChange={(e) => setFrontier(Number(e.target.value))}
        />
        <span className="mem-bar-value">{frontier < 0.35 ? 'weaker' : frontier > 0.6 ? 'stronger' : 'today'}</span>
      </label>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="pc-scatter-svg"
        role="img"
        aria-label="Schematic: expert and novice output quality with AI, as task complexity rises"
      >
        <rect
          x={x(frontier)}
          y={PAD.top}
          width={x(1) - x(frontier)}
          height={y(0) - PAD.top}
          className="ea-zone-amp"
        />
        <line x1={x(frontier)} x2={x(frontier)} y1={PAD.top - 30} y2={y(0)} className="ea-frontier" />
        <text x={x(frontier) - 6} y={PAD.top - 8} className="pc-tick" textAnchor="end">
          equalizer zone
        </text>
        <text x={x(frontier) + 6} y={PAD.top - 8} className="pc-tick">
          amplifier zone
        </text>
        <text x={x(frontier) + 6} y={PAD.top - 20} className="ea-frontier-label">
          capability frontier
        </text>

        {showUnaided && (
          <>
            <path d={path(expert0)} className="ea-line ea-expert ea-unaided" />
            <path d={path(novice0)} className="ea-line ea-novice ea-unaided" />
          </>
        )}
        <path d={path((v) => expertAI(v, frontier))} className="ea-line ea-expert" />
        <path d={path((v) => noviceAI(v, frontier))} className="ea-line ea-novice" />

        <line x1={x(c)} x2={x(c)} y1={PAD.top} y2={y(0)} className="ea-cursor" />
        <line
          x1={x(c)}
          x2={x(c)}
          y1={y(expertAI(c, frontier))}
          y2={y(noviceAI(c, frontier))}
          className="ea-gap"
        />
        <circle cx={x(c)} cy={y(expertAI(c, frontier))} r={4.5} className="ea-dot ea-dot-expert" />
        <circle cx={x(c)} cy={y(noviceAI(c, frontier))} r={4.5} className="ea-dot ea-dot-novice" />

        {TASKS.map((t) => (
          <line key={t.label} x1={x(t.at)} x2={x(t.at)} y1={y(0)} y2={y(0) + 5} className="ea-tickmark" />
        ))}
        <text x={x(0)} y={H - 26} className="pc-tick">
          routine, well-structured
        </text>
        <text x={x(1)} y={H - 26} className="pc-tick" textAnchor="end">
          ill-defined, judgment-heavy
        </text>
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 6} className="pc-axis" textAnchor="middle">
          task complexity
        </text>
        <text
          x={12}
          y={(PAD.top + H - PAD.bottom) / 2}
          className="pc-axis"
          textAnchor="middle"
          transform={`rotate(-90 12 ${(PAD.top + H - PAD.bottom) / 2})`}
        >
          output quality (schematic)
        </text>
      </svg>

      <div className="pc-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch ea-swatch-expert" /> expert + AI
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch ea-swatch-novice" /> novice + AI
        </span>
        <label className="mem-legend-item ea-toggle">
          <input type="checkbox" checked={showUnaided} onChange={(e) => setShowUnaided(e.target.checked)} /> dashed:
          same people without AI
        </label>
      </div>

      <p className={`it-gate-verdict${amplifies ? ' on' : ''}`}>
        {amplifies ? 'AMPLIFIER' : 'EQUALIZER'}
        <span>
          {TASKS[task].label}: the expert&ndash;novice gap goes from {(gap0 * 100).toFixed(0)} without AI to{' '}
          {(gapAI * 100).toFixed(0)} with it (illustrative units).
        </span>
      </p>

      <figcaption>
        Pick a task, then drag model capability. Nothing on the y-axis is measured: the paper
        proposes the shape, not the values. What the shape claims is that one tool produces both
        published results. On the left the model supplies a competent ceiling, novices are lifted
        to it and experts are already there, which is what the customer-service field experiment
        measured (+14% on average, +34% for the least-skilled agents). On the right the model
        supplies material someone has to judge, and a novice who cannot judge it ends below where
        they started without AI, which is what the consultant study found outside the frontier.
        Stronger models move the frontier right. They do not remove the right-hand zone; the
        judgment-heavy work relocates to wherever the new frontier is.
      </figcaption>
    </figure>
  )
}
