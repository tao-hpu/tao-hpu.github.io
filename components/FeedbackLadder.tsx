'use client'

import { useState } from 'react'

/**
 * Survey §7.2: "each rung is a truer measure of intervention quality than the
 * one below, and each is harder to attribute to the intervention that caused it."
 *
 * The two bars encode that stated ordering, not a measurement: they are ordinal.
 */
type Rung = {
  id: string
  signal: string
  truth: number
  attrib: number
  evidence: string
  problem: string
}

const RUNGS: Rung[] = [
  {
    id: 'L0',
    signal: 'explicit response: accept, dismiss, reject',
    truth: 1,
    attrib: 4,
    evidence:
      'Acceptance runs .676 when the moment is well chosen, .444 at random and .388 when anti-timed. But gating on acceptance alone drives PRISM’s false-alarm rate to 62.50%, because users often accept helpful but ill-timed suggestions.',
    problem:
      'Cheap, instant, perfectly attributable, and biased. Acceptance measures whether the content was wanted, not whether the moment was right.',
  },
  {
    id: 'L1',
    signal: 'implicit behavior: what the user does next',
    truth: 2,
    attrib: 3,
    evidence:
      'Pielot’s receptivity signal is the mobile-era version. WakeAnchor sketches the desktop analogue and does not implement it.',
    problem:
      'Abundant and weakly attributable. Ignoring a suggestion is not the same as rejecting it, and no system distinguishes the two.',
  },
  {
    id: 'L2',
    signal: 'task outcome: did the user do better work?',
    truth: 3,
    attrib: 2,
    evidence:
      'One content-controlled demonstration exists: answer accuracy of 62% under aligned timing, 55% random, 51% anti-aligned. The honest condition effects are 7 to 10 points, not the abstract’s headline 21%.',
    problem:
      'A session holds many interventions and exactly one outcome. Credit cannot be assigned.',
  },
  {
    id: 'L3',
    signal: 'long-term trust: does the user keep the assistant switched on?',
    truth: 4,
    attrib: 1,
    evidence:
      'No work in the survey reports a longitudinal disabling or retention metric. The only shadow of it is a single lab session: perceived benevolence −0.667 and cognitive effort +0.562 under mistimed help.',
    problem:
      'L3 is the truest reward, and at horizons of weeks it is attributable to no single intervention at all. This is the rung the field would need, and the rung nobody has measured.',
  },
]

export default function FeedbackLadder() {
  const [sel, setSel] = useState(0)
  const r = RUNGS[sel]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        {RUNGS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            className={`mem-metric${sel === i ? ' on' : ''}`}
            onClick={() => setSel(i)}
          >
            {x.id}
          </button>
        ))}
      </div>

      <p className="mem-explorer-note">{r.signal}</p>

      <div className="mem-explorer-chart">
        <div className="mem-bar-row">
          <span className="mem-bar-label">truer measure of timing</span>
          <span className="mem-bar-track">
            <span
              className="mem-bar mem-bar-chunks"
              style={{ width: `${(r.truth / 4) * 80}%` }}
            />
          </span>
        </div>
        <div className="mem-bar-row">
          <span className="mem-bar-label">attributable to one act</span>
          <span className="mem-bar-track">
            <span
              className="mem-bar mem-bar-artifacts"
              style={{ width: `${(r.attrib / 4) * 80}%` }}
            />
          </span>
        </div>
      </div>

      <div className="pc-detail">
        <p className="pc-detail-prompt">{r.evidence}</p>
        <p className="pc-detail-note">
          <span className="it-detail-key">Why it cannot be the reward</span> {r.problem}
        </p>
      </div>

      <figcaption>
        The two bars are the survey&rsquo;s stated ordering, not a measurement: every rung
        up the ladder is a truer measure of whether an intervention was well timed, and
        every rung up is harder to pin on the intervention that caused it. The field
        trains on the bottom rung because it is the only one that is cheap and
        attributable, and the bottom rung is the one that confuses <em>I wanted this</em>{' '}
        with <em>I wanted this now</em>. Nobody has measured the top rung at all.
      </figcaption>
    </figure>
  )
}
