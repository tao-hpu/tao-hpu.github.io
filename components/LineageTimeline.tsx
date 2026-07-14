'use client'

import { useState } from 'react'

/**
 * The two lineages as the survey reconstructs them (§2 Table 1; §4 Table 3).
 * Every number is the survey's own, which cites a source's tables over its
 * prose wherever the two disagree.
 */
type Node = {
  year: string
  name: string
  what: string
  cost: string
  number: string
  missing: string
}

const LEFT: Node[] = [
  {
    year: '1999',
    name: 'Horvitz, Jacobs & Hovel',
    what: 'Attention-sensitive alerting: the most complete statement of intervention timing as a decision problem.',
    cost: 'ECA, the expected cost of alerting, taken over an inferred latent attentional state. Silence is a first-class action and gets time-discounted.',
    number: 'Inferred message criticality correlates 0.9 with expert hand scores.',
    missing: 'An actor. Nothing could deliver the benefit it priced.',
  },
  {
    year: '2002',
    name: 'McFarlane',
    what: 'Four methods for coordinating interruption, tested on 36 participants in a dual task.',
    cost: 'Measured as an outcome, never formalized. Accuracy, efficiency, completeness and timeliness rank the four methods differently.',
    number: 'Negotiated wins overall; immediate wins on timeliness alone.',
    missing: 'A price. Any scalar threshold silently encodes a weighting over incommensurable costs.',
  },
  {
    year: '2003',
    name: 'Horvitz & Apacible',
    what: 'Learned the cost term from data instead of hand-building it.',
    cost: 'ECI, denominated in dollars: what the user would pay to avoid this disruption, learned by a Bayesian net from desktop events, calendar, audio and head pose.',
    number: 'Within-user accuracy .73 / .64. Cross-user transfer .28 / .32, below majority-class guessing.',
    missing: 'The benefit side, declared out of scope.',
  },
  {
    year: '2005',
    name: 'Fogarty et al.',
    what: 'Predicting interruptibility from cheap sensors: 602 hours of office life, 672 experience samples.',
    cost: 'None, deliberately. The cost estimator stands fully isolated from any decision. The trade is named and deferred four separate times.',
    number: 'Simulated sensors beat human observers (82.4% vs 76.9%). A single "is anyone talking" sensor alone reaches 75.9%.',
    missing: 'The decision itself.',
  },
  {
    year: '2006',
    name: 'Iqbal & Bailey',
    what: 'Relocated cost from ambient signals to where the user sits inside their own goal hierarchy.',
    cost: 'Cost-of-interruption classes derived from task structure alone, with no sensor: boundary depth, data carried over, difficulty of the next subtask.',
    number: 'A 3.7x spread in resumption lag: 464 ms, 1,012 ms, 1,702 ms across boundary classes.',
    missing: 'The decision, and any sensor. Its output was sent to a broader reasoning framework that never arrived.',
  },
  {
    year: '2007',
    name: 'Iqbal & Horvitz',
    what: 'What an interruption actually costs in the field: 27 workers, 2 weeks, 2,267 logged hours, alerts at 3.74/hour.',
    cost: 'Pure field measurement. It supplies the magnitude that indicts every casual cost assumption since.',
    number: 'About 10 minutes on the switch, then another 10 to 15 before focused work resumes: a 20 to 25 minute arc per alert. 27% of alerts left the window unresumed after two hours.',
    missing: 'Any model at all.',
  },
  {
    year: '2014',
    name: 'InterruptMe',
    what: 'Took the gate onto the phone and into the wild for a month.',
    cost: 'Path-dependent. A context-driven gate fires back to back and exhausts the user, ending up worse than context-oblivious random scheduling on sentiment.',
    number: 'Sentiment toward an isolated notification was more than twice as favorable as toward one preceded by eight others in two hours.',
    missing: 'A utility model. The asymmetry is assumed, never estimated.',
  },
  {
    year: '2017',
    name: 'Pielot et al.',
    what: 'Beyond interruptibility: the lineage’s methodological peak and its theoretical low point.',
    cost: 'Degraded to a precision/recall knob. "As we do not have an informed criterion on the relative importance of precision and recall, we used the F1 score."',
    number: '337 users, over 120 million phone events, 78,930 notifications, 197 features. A 5x precision lift. Four self-history features outperform all 197 context features combined.',
    missing: 'The cost model. And it buys precision partly by writing off about 15% of users as never-opportune.',
  },
  {
    year: '2019',
    name: 'Okoshi et al.',
    what: 'Breakpoint deferral at population scale: the lineage shipped.',
    cost: 'Inherited from Iqbal & Bailey, operationalized.',
    number: 'A 382,518-user, 28-day deployment study, up to +60.7% click-rate, then rolled out to all of Yahoo! JAPAN’s 10M+ Android users.',
    missing: 'Still no actor. The ceiling is a message read slightly earlier.',
  },
  {
    year: '2022',
    name: 'Chen, Chang & Chan',
    what: 'Opportune-moment prediction crossed into the headset.',
    cost: 'Inherited.',
    number: 'Four years before the current proactive-MR wave.',
    missing: 'Citations. The MR wave cites none of it.',
  },
]

const RIGHT: Node[] = [
  {
    year: '2024',
    name: 'Proactive Agent',
    what: 'Trains a reward model on human accept/reject labels and makes speak-or-stay-silent a first-class prediction.',
    cost: 'One-sided. Penalize false alarms without valuing timely help, and the optimum is mutism.',
    number: 'F1 66.47 at a 50.22% false-alarm rate. With reward-model feedback at inference, GPT-4o recall collapses from 98.11 to 56.76.',
    missing: 'Any temporal notion: no too-early, no too-late, no latency, no window.',
  },
  {
    year: '2025',
    name: 'YETI',
    what: 'The cleanest modern statement of rule-based timing: frame differencing plus script alignment, deviation implies intervene.',
    cost: 'None. Cost is rate-limited, never modeled: a 1-second minimum gap so the agent does not intervene too often. That is a knob, not a price.',
    number: '41.86 precision on HoloAssist intervention detection: it over-interrupts roughly seven times for every five correct calls.',
    missing: 'Ground truth. It invents its own five-second window around HoloAssist labels.',
  },
  {
    year: '2025',
    name: 'ProAssist',
    what: 'Learned per-frame speak/silent decision on streaming egocentric video.',
    cost: 'Compressed into a single threshold, chosen by validation F1. The same move Pielot made in 2017, seven years later and one layer deeper.',
    number: 'Dialogue F1 up to 36.25, "highly sensitive" to the threshold.',
    missing: 'The utilities. Conservative versus impulsive talking styles is a utility trade-off with the utilities left implicit.',
  },
  {
    year: '2026',
    name: 'VisionClaw',
    what: 'Always-on perception, strictly reactive action, in the wild on Meta Ray-Bans.',
    cost: 'Not applicable: no decision is made.',
    number: '555 voice-initiated interactions across 55 participant-days. Median latency 12.2 s.',
    missing: 'The decision, on purpose. The most deployable systems of 2026 solve the timing problem by not having one: the human remains the gate.',
  },
  {
    year: '2026',
    name: 'SIAgent',
    what: 'The most detailed embodied signal set in this literature: 30 Hz gaze, hand pose, five finger shapes, all translated to language.',
    cost: 'None. No interruption cost, no false-alarm penalty, no timing metric in the paper.',
    number: 'Gaze alone gives 30.2% rank-1 intent; gaze plus hand motion 58.3%. Sampling is a metronome: a fixed 3-second window.',
    missing: 'The gate. Users select from the model’s ranked predictions, so the human still decides when.',
  },
  {
    year: '2026',
    name: 'PRISM',
    what: 'The first LLM-era system to rebuild the intervention decision as explicit expected-cost minimization.',
    cost: 'Two-sided, Bayes-risk derived, but the cost pair is fixed per deployment and swept, not measured.',
    number: 'False alarms 50.22% to 22.94%; F1 66.47 to 86.61. Its cost ratio is swept from 1:4 to 1.2:1, never measured from a user.',
    missing: 'State dependence. The central insight of 1999, cost as a function of what the user is doing right now, is still absent.',
  },
  {
    year: '2026',
    name: 'WakeAnchor',
    what: 'Pushes the gate argument to its limit: the trigger need not be an LLM at all. A temporal-graph encoder fires, and only then is the LLM called to phrase the message.',
    cost: 'Prices compute. It cites Iqbal and Horvitz in related work, and then prices only compute.',
    number: '11 to 14 ms per event, about 220 MiB, 4 to 7x faster than every LLM-as-trigger config on servers and 12 to 83x on laptops.',
    missing: 'Interruptibility. Its threshold is fixed at 0.5 and never tuned across all 14 backbones.',
  },
  {
    year: '2026',
    name: 'Pro²Bench',
    what: 'The field’s first unification: five public corpora re-annotated into one benchmark with per-decision-point intervention labels.',
    cost: 'Written into the metric semantics, and then dropped.',
    number: '29,337 videos, 42,275 evaluation clips. No zero-shot baseline exceeds .51 average G-Mean F1.',
    missing: 'The asymmetry. Its score assigns 0 to a false positive and 0 to a false negative: interrupting mid-pour with something irrelevant and silently watching the dish burn are the same outcome.',
  },
]

export default function LineageTimeline() {
  const [sel, setSel] = useState<{ side: 'L' | 'R'; i: number }>({ side: 'L', i: 0 })
  const node = sel.side === 'L' ? LEFT[sel.i] : RIGHT[sel.i]

  return (
    <figure className="mem-explorer">
      <div className="it-lineage">
        <div className="it-lane">
          <p className="it-lane-head">
            1999&ndash;2022 <span>the cost term formalized, no actor</span>
          </p>
          {LEFT.map((n, i) => (
            <button
              key={n.year + n.name}
              type="button"
              className={`it-node${sel.side === 'L' && sel.i === i ? ' on' : ''}`}
              onClick={() => setSel({ side: 'L', i })}
            >
              <span className="it-node-year">{n.year}</span>
              <span className="it-node-name">{n.name}</span>
            </button>
          ))}
        </div>

        <div className="it-split" aria-hidden="true">
          <span className="it-split-line" />
          <span className="it-split-label">neither lineage cites the other</span>
          <span className="it-split-line" />
        </div>

        <div className="it-lane">
          <p className="it-lane-head">
            2024&ndash;2026 <span>capable actors, the cost term in fragments</span>
          </p>
          {RIGHT.map((n, i) => (
            <button
              key={n.year + n.name}
              type="button"
              className={`it-node${sel.side === 'R' && sel.i === i ? ' on' : ''}`}
              onClick={() => setSel({ side: 'R', i })}
            >
              <span className="it-node-year">{n.year}</span>
              <span className="it-node-name">{n.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pc-detail">
        <p className="pc-detail-prompt">
          <strong>
            {node.year} &middot; {node.name}
          </strong>{' '}
          {node.what}
        </p>
        <ul className="it-detail-list">
          <li>
            <span className="it-detail-key">Cost term</span> {node.cost}
          </li>
          <li>
            <span className="it-detail-key">Key number</span> {node.number}
          </li>
          <li>
            <span className="it-detail-key">Missing half</span> {node.missing}
          </li>
        </ul>
      </div>

      <figcaption>
        Two literatures hold the two halves of one decision, and they do not build on
        each other. The left lane spent twenty years learning what an interruption
        costs, and could never deliver a benefit large enough to justify one: the
        ceiling was a message read slightly earlier. The right lane has actors that can
        finish the task, and rebuilt the decision layer from scratch. Only one paper on
        the right cites the left at all, and it goes on to price compute.
      </figcaption>
    </figure>
  )
}
