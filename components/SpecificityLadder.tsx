'use client'

import { useState } from 'react'

const BASE = 'Write the opening sentence of a short story about the sea.'

/**
 * Batch-2 specificity ladder (specificity_ladder.json) with prompt-only judge
 * consensus scores for each arm (judge_conditioned.json). Arms are ordered by
 * how much the instruction appears to constrain.
 */
const ARMS: {
  id: string
  label: string
  added: string | null
  disp: number
  sd: number
  consensus: number
}[] = [
  {
    id: 'uncond',
    label: 'no constraint',
    added: null,
    disp: 0.229,
    sd: 0.013,
    consensus: 17,
  },
  {
    id: 'light',
    label: 'light theme',
    added: 'The story is about an old fisherman.',
    disp: 0.264,
    sd: 0.02,
    consensus: 47,
  },
  {
    id: 'medium',
    label: 'medium scene',
    added: 'The story is about an old fisherman who returns to a quiet harbor at dawn with an empty boat.',
    disp: 0.16,
    sd: 0.004,
    consensus: 59,
  },
  {
    id: 'strict',
    label: 'strict scene pin',
    added:
      'Describe a gray, still, and completely empty sea under a cold morning sky, with no people, no boats, and no movement at all.',
    disp: 0.152,
    sd: 0.007,
    consensus: 79,
  },
  {
    id: 'diverge',
    label: 'avoid the typical',
    added:
      'Write it in a wildly unconventional, surprising style; deliberately avoid any opening a typical writer would choose.',
    disp: 0.34,
    sd: 0.008,
    consensus: 14,
  },
]

const MAX = 0.4
const UNCOND = 0.229

export default function SpecificityLadder() {
  const [sel, setSel] = useState('diverge')
  const arm = ARMS.find((a) => a.id === sel)!

  return (
    <figure className="mem-explorer">
      <p className="mem-explorer-note">
        Base prompt: &ldquo;{BASE}&rdquo; Arms below add instructions of increasing
        apparent constraint. Click one.
      </p>

      <div className="mem-explorer-chart">
        {ARMS.map((a) => (
          <div className="mem-bar-row" key={a.id}>
            <button
              type="button"
              className={`mem-bar-label pc-arm-label${a.id === sel ? ' on' : ''}`}
              onClick={() => setSel(a.id)}
            >
              {a.label}
            </button>
            <span className="mem-bar-track pc-ladder-track">
              <span
                className={`mem-bar pc-ladder-bar${a.id === sel ? ' mem-bar-chunks' : ' mem-bar-artifacts'}`}
                style={{ width: `${(a.disp / MAX) * 80}%` }}
                onClick={() => setSel(a.id)}
              />
              <span className="mem-bar-value">{a.disp.toFixed(3)}</span>
              <span
                className="pc-uncond-line"
                style={{ left: `${(UNCOND / MAX) * 80}%` }}
                aria-hidden="true"
              />
            </span>
          </div>
        ))}
      </div>

      <div className="pc-detail">
        <p className="pc-detail-prompt">
          {arm.added ? (
            <>
              {BASE} <strong>{arm.added}</strong>
            </>
          ) : (
            BASE
          )}
        </p>
        <p className="pc-detail-stats">
          dispersion {arm.disp.toFixed(3)} ± {arm.sd.toFixed(3)} (4 runs × 25 samples) ·
          judges score this destination&rsquo;s consensus at {arm.consensus}/100
        </p>
      </div>

      <figcaption>
        Dispersion is non-monotone in how constraining the instruction looks. Naming a
        subject (&ldquo;an old fisherman&rdquo;) <em>raises</em> dispersion above the
        unconditioned default (vertical line): it opens a narrative space. Pinning a
        specific scene drops it well below. And the longest, most elaborate instruction,
        &ldquo;avoid anything typical&rdquo;, raises it most. What predicts the spread is
        the judge-scored consensus of the destination (arm-level &rho;&nbsp;=
        &minus;0.90), not the amount of constraint. Form is not consensus.
      </figcaption>
    </figure>
  )
}
