'use client'

import { useState } from 'react'

/**
 * Survey §9.2: "no longer 'nobody models interruption cost' but that four
 * communities each model one component and none cites the others. Four costs,
 * four literatures, no unified theta."
 *
 * Status is the survey's verdict, not the paper's own claim.
 */
type Status = 'priced' | 'measured' | 'named' | 'absent'

type Fragment = {
  key: string
  by: string
  status: Status
  /** The survey's verdict on this row, not the paper's own claim. */
  verdict: string
  prices: string
  hole: string
}

const FRAGMENTS: Fragment[] = [
  {
    key: 'False alarm',
    by: 'PRISM (2026)',
    status: 'priced',
    verdict: 'priced',
    prices:
      'The asymmetry between a false alarm and a missed intervention, inside a Bayes-risk threshold. On ProactiveBench it takes the false-alarm rate from 50.22% to 22.94% and F1 from 66.47 to 86.61.',
    hole: 'The cost pair is swept from 1:4 to 1.2:1, never measured from a user, and fixed per deployment. PRISM’s own §6 concedes that LLM-judge proxies "cannot fully capture the cognitive load of ill-timed interruptions during complex flow states."',
  },
  {
    key: 'Cognitive load',
    by: 'Precision Proactivity (2025)',
    status: 'measured',
    verdict: 'measured, not wired',
    prices:
      'Extraneous load against graded work quality in real professional work: β = −0.472 / −0.485, roughly three times the coefficient on intrinsic task difficulty. Model-initiated task switching is the strongest single disruptor at β = −0.271.',
    hole: 'It attaches that measurement to no decision rule. Correlational, single-domain, N = 34. It measures the quantity a gate would need, and stops. This is the C_FA that PRISM leaves as a swept hyperparameter, sitting unclaimed in another literature.',
  },
  {
    key: 'Social violation',
    by: 'EgoSocial (2025)',
    status: 'named',
    verdict: 'named, not charged',
    prices:
      'The social cost of speaking, and it revives the interruptibility state: a positive social-focus signal "acts as a global veto, suppressing prompts when the wearer is cognitively busy."',
    hole: 'The veto is boolean, not a price a sufficiently urgent message could outbid. And its ground truth is a mechanical disjunction of two cue labels, so "a user would least likely want to be disturbed" is asserted, not measured. The social cost is named; it is not charged.',
  },
  {
    key: 'Compute',
    by: 'WakeAnchor, PRPF, ProAgent (2026)',
    status: 'priced',
    verdict: 'priced: compute only',
    prices:
      'The cost of running the gate itself. WakeAnchor’s 1.16M-parameter graph head decides in 11 to 14 ms on about 220 MiB, 4 to 7x faster than any LLM-as-trigger on servers and 12 to 83x on laptops.',
    hole: 'Cheap gates price compute, not interruptibility. WakeAnchor cites Iqbal and Horvitz in its related work and then prices only compute; its own decision threshold is fixed at 0.5 and never tuned across all 14 backbones.',
  },
  {
    key: 'Attentional state',
    by: '—',
    status: 'absent',
    verdict: 'nobody, since 1999',
    prices:
      'Nothing. Horvitz 1999 defined it: the expected cost of alerting, marginalized over the system’s uncertainty about what the user is attending to right now.',
    hole: 'The 2026 wave has boolean vetoes and rate limits in its place. This is the central hole: not one system conditions its interruption price on what the user is doing at this instant, though every perception stack in the survey already computes the posterior it would need.',
  },
  {
    key: 'Cost of silence',
    by: '—',
    status: 'absent',
    verdict: 'nobody, since 1999',
    prices:
      'Nothing. Horvitz 1999 made silence a first-class action and time-discounted it, so that saying nothing had a price too.',
    hole: 'The proof of the hole is empirical: give Proactive Agent one-sided feedback and GPT-4o’s recall collapses from 98.11 to 56.76. Penalize false alarms without valuing timely help, and the optimum is mutism.',
  },
  {
    key: 'Alert fatigue',
    by: 'InterruptMe (2014)',
    status: 'absent',
    verdict: 'nobody, since 2014',
    prices:
      'Interruption cost is path-dependent. Sentiment toward an isolated notification was more than twice as favorable as toward one preceded by eight others in the previous two hours.',
    hole: 'This result is twelve years old and no 2026 system models it. Every instantaneous-context gate since has ignored the fact that a gate driven by context alone fires back to back and exhausts the user it is trying to help.',
  },
  {
    key: 'Personal cost',
    by: 'Sensing What Surveys Miss (2026)',
    status: 'measured',
    verdict: 'one lab implementation',
    prices:
      'The only implemented per-user threshold: it moves by −4δ for a missed struggle against ±δ otherwise, and uptake follows. Acceptance is .676 when well-timed, .444 random, .388 anti-timed.',
    hole: 'Those multipliers are the entire cost theory: never derived, never measured. And the personalization is a scalar, not a memory: nothing about this user at this kind of moment survives the session. It fires on about 73% of trials at roughly 33% specificity, tolerable only inside a twenty-item lab block.',
  },
]

export default function CostFragments() {
  const [sel, setSel] = useState(0)
  const f = FRAGMENTS[sel]

  return (
    <figure className="mem-explorer">
      <div className="it-frag-list">
        {FRAGMENTS.map((x, i) => (
          <button
            key={x.key}
            type="button"
            className={`it-frag${sel === i ? ' on' : ''}`}
            onClick={() => setSel(i)}
          >
            <span className={`it-frag-dot it-frag-${x.status}`} />
            <span className="it-frag-key">{x.key}</span>
            <span className="it-frag-by">{x.by}</span>
            <span className={`it-frag-status it-frag-${x.status}`}>
              {x.verdict}
            </span>
          </button>
        ))}
      </div>

      <div className="pc-detail">
        <p className="pc-detail-prompt">
          <strong>{f.key}.</strong> {f.prices}
        </p>
        <p className="pc-detail-note">
          <span className="it-detail-key">What it still does not do</span> {f.hole}
        </p>
      </div>

      <figcaption>
        The honest status in 2026 is not that nobody prices an interruption. It is that
        four communities each price one component, none of them cites the others, and
        none of them reuses the formalisms they are independently rediscovering. Four
        costs, four literatures, no unified threshold. The two rows with no owner are
        the two that 1999 already had.
      </figcaption>
    </figure>
  )
}
