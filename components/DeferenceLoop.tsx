'use client'

import { useState } from 'react'

/**
 * Schematic of the sycophancy mechanism (HHAI 2026 §3.5, Fig. 3). Both users
 * start from the same first draft. Each refinement turn the model moves the
 * draft toward whatever the user's feedback points at, by an amount set by its
 * deference; the expert's feedback points up, the novice's points at their own
 * misconception. The paper cites near-100% compliance even for logically flawed
 * requests; it does not report a per-turn rate, so the dynamics are illustrative.
 */

const W = 560
const H = 250
const PAD = { top: 16, right: 16, bottom: 36, left: 40 }
const TURNS = 6
const x = (t: number) => PAD.left + (t / TURNS) * (W - PAD.left - PAD.right)
const y = (v: number) => PAD.top + (1 - v) * (H - PAD.top - PAD.bottom)

const FIRST_DRAFT = 0.55
const EXPERT_AIM = 0.93
const NOVICE_AIM = 0.3
const STEP = 0.4

function trajectory(aim: number, deference: number) {
  const q = [FIRST_DRAFT]
  for (let t = 0; t < TURNS; t++) q.push(q[t] + STEP * deference * (aim - q[t]))
  return q
}

// How settled the output reads. Rises with every accepted revision, for both users.
const assurance = (t: number, deference: number) => 1 - 0.5 * Math.pow(1 - 0.28 * deference, t)

export default function DeferenceLoop() {
  const [deference, setDeference] = useState(1)
  const [turn, setTurn] = useState(TURNS)

  const ex = trajectory(EXPERT_AIM, deference)
  const nv = trajectory(NOVICE_AIM, deference)
  const line = (q: number[]) =>
    q
      .slice(0, turn + 1)
      .map((v, t) => `${t ? 'L' : 'M'}${x(t).toFixed(1)},${y(v).toFixed(1)}`)
      .join(' ')

  return (
    <figure className="mem-explorer">
      <label className="lossy-slider">
        <span>
          Deference <em>how far the model follows feedback</em>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={deference}
          onChange={(e) => setDeference(Number(e.target.value))}
        />
        <span className="mem-bar-value">{Math.round(deference * 100)}%</span>
      </label>

      <label className="lossy-slider">
        <span>
          Refinement turns <em>feedback, revise, repeat</em>
        </span>
        <input type="range" min={0} max={TURNS} step={1} value={turn} onChange={(e) => setTurn(Number(e.target.value))} />
        <span className="mem-bar-value">{turn}</span>
      </label>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="pc-scatter-svg"
        role="img"
        aria-label="Schematic: draft quality over refinement turns for an expert and a novice"
      >
        {[0.25, 0.5, 0.75].map((v) => (
          <line key={v} x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} className="pc-grid" />
        ))}
        {Array.from({ length: TURNS + 1 }, (_, t) => (
          <text key={t} x={x(t)} y={H - PAD.bottom + 16} className="pc-tick" textAnchor="middle">
            {t === 0 ? 'first draft' : t}
          </text>
        ))}
        <path d={line(ex)} className="ea-line ea-expert" />
        <path d={line(nv)} className="ea-line ea-novice" />
        {ex.slice(0, turn + 1).map((v, t) => (
          <circle key={`e${t}`} cx={x(t)} cy={y(v)} r={3.5} className="ea-dot ea-dot-expert" />
        ))}
        {nv.slice(0, turn + 1).map((v, t) => (
          <circle key={`n${t}`} cx={x(t)} cy={y(v)} r={3.5} className="ea-dot ea-dot-novice" />
        ))}
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 4} className="pc-axis" textAnchor="middle">
          refinement turn
        </text>
        <text
          x={12}
          y={(PAD.top + H - PAD.bottom) / 2}
          className="pc-axis"
          textAnchor="middle"
          transform={`rotate(-90 12 ${(PAD.top + H - PAD.bottom) / 2})`}
        >
          draft quality (schematic)
        </text>
      </svg>

      <div className="pc-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch ea-swatch-expert" /> expert&rsquo;s feedback
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch ea-swatch-novice" /> novice&rsquo;s feedback
        </span>
      </div>

      <p className="mem-explorer-note">
        {turn > 0 && deference > 0 ? (
          <>
            After {turn} {turn === 1 ? 'turn' : 'turns'}: gap {((ex[turn] - nv[turn]) * 100).toFixed(0)} (it started at
            0). Both drafts now read {Math.round(assurance(turn, deference) * 100)}% settled, up from 50%. The
            novice&rsquo;s draft reads as finished as the expert&rsquo;s.
          </>
        ) : (
          <>Both users hold the same first draft: gap 0, both 50% settled.</>
        )}
      </p>

      <figcaption>
        Same model, same first draft. The only difference is where each person&rsquo;s feedback
        points, and a deferential model follows it either way. Set deference to 0 and both lines
        stay flat: a model that ignored feedback would neither help the expert nor mislead the
        novice. At the compliance levels the paper cites, every turn copies the quality of the
        feedback into the draft, and the gap grows with each round. The &ldquo;settled&rdquo;
        figure is the part a novice cannot see: revisions make both drafts sound more assured,
        whichever direction they moved. Values are illustrative; the direction of each line is the
        paper&rsquo;s claim.
      </figcaption>
    </figure>
  )
}
