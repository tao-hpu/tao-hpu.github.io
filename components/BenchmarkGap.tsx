'use client'

import { useState } from 'react'

/**
 * Survey §8: a timing policy at deployment must answer three questions. "No
 * existing benchmark answers all three." Marks are the survey's verdicts, from
 * its per-benchmark dissection in §7.1.
 */
type Mark = 'y' | 'p' | 'n'

type Row = {
  name: string
  welcome: Mark
  caught: Mark
  priced: Mark
  scale: string
  number: string
  blind: string
  proposed?: boolean
}

const MARK: Record<Mark, string> = { y: '●', p: '◐', n: '○' }

const ROWS: Row[] = [
  {
    name: 'HoloAssist',
    welcome: 'n',
    caught: 'n',
    priced: 'n',
    scale: '166 h egocentric collaborative manipulation',
    number:
      'Intervention-type prediction: best modality mix reaches 48.75 / 47.75 precision and recall against RGB’s 47.92 / 46.09 (its Table 8; the prose reports a row the table does not contain, so we cite the table).',
    blind:
      'The window is anchored on an intervention known to occur. The model classifies which of three types it will be, never whether to speak. Its mistake-detection precision is 12.96: an agent gated on it would speak wrongly seven times in eight and violate no metric in the paper, because an instructor’s utterance is free by construction.',
  },
  {
    name: 'ProactiveBench',
    welcome: 'y',
    caught: 'p',
    priced: 'n',
    scale: '136 scenarios, 6,790 training and 233 test events, desktop-synthetic',
    number: 'Best system: F1 66.47 at a 50.22% false-alarm rate. Half of all proposals are unwanted.',
    blind:
      'The blind spot is temporal: no too-early, no too-late, no latency, no window. The objective seals it, since the agent aims to maximize the expected acceptance rate of the tasks it proposes. And it is trained on the same pipeline’s annotations it is scored against, so acceptance is circular.',
  },
  {
    name: 'ProactiveEval',
    welcome: 'n',
    caught: 'n',
    priced: 'n',
    scale: '328 synthesized environments, 6 domains, 22 LLMs',
    number:
      'The strongest content-quality yardstick in the field: a human-validated judge at κ 0.826 / 0.721.',
    blind:
      'Every environment is pre-certified as warranting proactivity and the trigger arrives as static text. There is no abstention and no cost of interrupting, so false alarms are structurally unmeasurable. It brackets timing on purpose.',
  },
  {
    name: 'ProAgentBench',
    welcome: 'y',
    caught: 'y',
    priced: 'n',
    scale: '28,528 events over 500+ hours of real screen recordings',
    number:
      'The only benchmark on authentically real traces. When-to-assist is near chance: best zero-shot 64.4% accuracy, precision 51 to 61 against recall 81 to 99.',
    blind:
      'The blind spot is the target itself. Ground truth is the moment the user actually opened an assistant, so an agent that fires early enough to make that query unnecessary is scored a false positive. Its success is erased from the record.',
  },
  {
    name: 'EgoSocial',
    welcome: 'p',
    caught: 'p',
    priced: 'n',
    scale: '1,500 ten-second segments, 13,500 annotated pairs',
    number:
      'The only work whose headline metric is timing itself, and the numbers it got back are brutal: four frontier models land between 12.50% and 17.67% intervention-timing accuracy, while the same models reach 51.65 to 56.08 macro-F1 on merely detecting that a social interaction is under way.',
    blind:
      'Timing is the metric, but over the social slice only, at ten-second granularity. Its social cost is a boolean veto rather than a price a sufficiently urgent message could outbid.',
  },
  {
    name: 'PAUC',
    welcome: 'p',
    caught: 'y',
    priced: 'n',
    scale: 'Human-validated against pairwise preference',
    number:
      'The most sophisticated timing metric in the field: the area under a cumulative-correctness curve against time, anchored at 0.5 because no response beats a wrong one. Agreement with human preference rises from κ 0.23–0.31 time-agnostic to 0.30–0.45 time-weighted, against a human-human ceiling of only 0.34–0.55.',
    blind:
      'PAUC prices lateness and wrongness. It does not price speaking. Redundant responses inside a window are free: one model repeats itself on 99.4% of its egocentric turns and pays only in a diagnostic side table, while a near-mute model scores a respectable 25.0 on the silence floor. It is half a metric: a validated benefit curve with no cost curve beneath it.',
  },
  {
    name: 'Pro²Bench',
    welcome: 'y',
    caught: 'y',
    priced: 'n',
    scale: '29,337 videos, 42,275 evaluation clips, five corpora unified',
    number:
      'The most decision-theoretically mature entry, and the first unification. Its G-Mean F1 collapses to 0 for both the all-interrupt and the all-silent policy. No zero-shot baseline exceeds .51.',
    blind:
      'Its quality score assigns 0 to a false positive and 0 to a false negative. Interrupting mid-pour with something irrelevant and silently watching the dish burn score identically. It even ships safety-critical tags to enable interrupt suppression, and then no metric uses them. Unifying five script-anchored benchmarks yields a large script-anchored benchmark.',
  },
  {
    name: 'The design in §8',
    welcome: 'y',
    caught: 'y',
    priced: 'y',
    proposed: true,
    scale: 'Design only. 200–300 windows, three annotators each, on HoloAssist and Ego4D',
    number:
      'Three-way per-moment labels: must intervene, may intervene, must not intervene. Four numbers reported together and never collapsed into one: timing recall, violation rate, a cost-weighted score whose exchange rate is swept as a curve rather than fixed as a constant, and a discount for graduated actions.',
    blind:
      'This is a design, not a result. Offline replay cannot measure counterfactual or delayed benefit, annotated receptivity is a proxy, and 200 windows will rank policies rather than train one. Those are accepted costs of a design whose only purpose is to make the trade-off visible in the open world for the first time.',
  },
]

export default function BenchmarkGap() {
  const [sel, setSel] = useState(0)
  const r = ROWS[sel]

  return (
    <figure className="mem-explorer">
      <div className="it-bench-head">
        <span />
        <span>welcome?</span>
        <span>caught?</span>
        <span>priced?</span>
      </div>

      <div className="it-bench-grid">
        {ROWS.map((row, i) => (
          <button
            key={row.name}
            type="button"
            className={`it-bench-row${sel === i ? ' on' : ''}${row.proposed ? ' proposed' : ''}`}
            onClick={() => setSel(i)}
          >
            <span className="it-bench-name">{row.name}</span>
            <span className={`it-bench-mark m-${row.welcome}`}>{MARK[row.welcome]}</span>
            <span className={`it-bench-mark m-${row.caught}`}>{MARK[row.caught]}</span>
            <span className={`it-bench-mark m-${row.priced}`}>{MARK[row.priced]}</span>
          </button>
        ))}
      </div>

      <div className="pc-detail">
        <p className="pc-detail-stats">{r.scale}</p>
        <p className="pc-detail-prompt">{r.number}</p>
        <p className="pc-detail-note">
          <span className="it-detail-key">{r.proposed ? 'What it will not solve' : 'The blind spot'}</span>{' '}
          {r.blind}
        </p>
      </div>

      <figcaption>
        Three questions a timing policy must answer the day it ships. Of the moments you
        chose to act, how many were welcome? Of the moments that needed you, how many did
        you catch? And how much did your mistakes cost? Every benchmark in the field
        answers one or two. The third column is empty all the way down, which is why no
        two systems in this survey can be compared on the quantity the survey is about.
      </figcaption>
    </figure>
  )
}
