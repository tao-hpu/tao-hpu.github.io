'use client'

import { useState } from 'react'

/**
 * PRISM's gate (survey §4.4, Eq. 5), the closest LLM-era reconstruction of
 * Horvitz's 1999 net-expected-value rule:
 *
 *   intervene  iff  p_accept >= tau(p_need) = C_FA / (C_FA + p_need * C_FN)
 *
 * derived by Bayes-risk minimization over the asymmetric costs of a false alarm
 * (C_FA) and a missed intervention (C_FN). PRISM sweeps the cost ratio from 1:4
 * to 1.2:1; it never measures it from a user. Reported effect on ProactiveBench
 * (its Table 1): false-alarm rate 50.22% -> 22.94%, F1 66.47 -> 86.61.
 */

const PRESETS = [
  { label: 'PRISM, cautious (1:4)', fa: 1, fn: 4 },
  { label: 'PRISM, eager (1.2:1)', fa: 1.2, fn: 1 },
  { label: 'Symmetric (1:1)', fa: 1, fn: 1 },
] as const

export default function InterventionGate() {
  const [preset, setPreset] = useState(0)
  const [need, setNeed] = useState(0.5)
  const [accept, setAccept] = useState(0.6)

  const { fa, fn } = PRESETS[preset]
  const tau = fa / (fa + need * fn)
  const fires = accept >= tau

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            className={`mem-metric${preset === i ? ' on' : ''}`}
            onClick={() => setPreset(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="mem-explorer-note">
        The cost ratio is a deployment constant here, exactly as PRISM leaves it. It
        does not know what the user is doing right now.
      </p>

      <label className="lossy-slider">
        <span>
          p(need) <em>the user actually wants help</em>
        </span>
        <input
          type="range"
          min={0.05}
          max={1}
          step={0.05}
          value={need}
          onChange={(e) => setNeed(Number(e.target.value))}
        />
        <span className="mem-bar-value">{need.toFixed(2)}</span>
      </label>

      <label className="lossy-slider">
        <span>
          p(accept) <em>calibrated model confidence</em>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={accept}
          onChange={(e) => setAccept(Number(e.target.value))}
        />
        <span className="mem-bar-value">{accept.toFixed(2)}</span>
      </label>

      <div className="it-gate-track">
        <span className="it-gate-fill" style={{ width: `${accept * 100}%` }} />
        <span className="it-gate-tau" style={{ left: `${tau * 100}%` }}>
          <em>&tau; {tau.toFixed(2)}</em>
        </span>
      </div>

      <p className={`it-gate-verdict${fires ? ' on' : ''}`}>
        {fires ? 'INTERVENE' : 'STAY SILENT'}
        <span>
          p(accept) {accept.toFixed(2)} {fires ? '≥' : '<'} &tau; {tau.toFixed(2)} ={' '}
          {fa} / ({fa} + {need.toFixed(2)} &times; {fn})
        </span>
      </p>

      <figcaption>
        This is the whole argument in one control. Raise the cost of a false alarm and
        the gate tightens; raise the user&rsquo;s need or the cost of missing them and it
        relaxes. It is a real rebuild of the 1999 rule with learned probabilities in
        place of elicited ones, and on desktop event streams it cuts the false-alarm
        rate from 50.22% to 22.94%. Now notice what no slider here controls: what the
        user is doing at this instant. The cost pair is fixed for the whole deployment
        and swept by the authors rather than measured from anyone, so the gate charges
        the same price for interrupting a person staring out of a window and a person
        mid-sentence in a meeting. That state dependence is the 1999 insight, and it has
        not come back.
      </figcaption>
    </figure>
  )
}
