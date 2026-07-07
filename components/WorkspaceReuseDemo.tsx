'use client'

import { useState } from 'react'

/**
 * Per-turn numbers from the Cognitive Workspace PoC run reported in
 * arXiv:2508.13171 (multi-turn condition, gpt-3.5-turbo backend):
 * cumulative memory-reuse rate per turn, and operation counts.
 */
const TURNS: { q: string; cwReuse: number }[] = [
  { q: 'What is artificial intelligence?', cwReuse: 0.5 },
  { q: 'How does it learn?', cwReuse: 0.55 },
  { q: 'What are the main techniques?', cwReuse: 0.567 },
  { q: 'Which technique is most effective?', cwReuse: 0.564 },
]

const CW_OPS_PER_TURN = 39
const RAG_OPS_PER_TURN = 7.5

export default function WorkspaceReuseDemo() {
  const [turn, setTurn] = useState(0)
  const t = TURNS[turn]

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-metrics">
        {TURNS.map((x, i) => (
          <button
            key={i}
            type="button"
            className={`mem-metric${i === turn ? ' on' : ''}`}
            onClick={() => setTurn(i)}
          >
            turn {i + 1}
          </button>
        ))}
      </div>

      <p className="pc-detail-prompt" style={{ marginBottom: '1rem' }}>
        &ldquo;{t.q}&rdquo;
      </p>

      <div className="mem-explorer-chart">
        <div className="mem-bar-row">
          <span className="mem-bar-label">Cognitive Workspace, memory reuse</span>
          <span className="mem-bar-track">
            <span
              className="mem-bar mem-bar-chunks pc-amp-bar"
              style={{ width: `${t.cwReuse * 80}%` }}
            />
            <span className="mem-bar-value">{(t.cwReuse * 100).toFixed(1)}%</span>
          </span>
        </div>
        <div className="mem-bar-row">
          <span className="mem-bar-label">Traditional RAG, memory reuse</span>
          <span className="mem-bar-track">
            <span className="mem-bar mem-bar-baseline" style={{ width: '2px' }} />
            <span className="mem-bar-value">0.0%</span>
          </span>
        </div>
      </div>

      <p className="mem-explorer-note" style={{ marginTop: '0.9rem', marginBottom: 0 }}>
        cumulative operations after this turn: workspace {(turn + 1) * CW_OPS_PER_TURN} ·
        RAG {Math.round((turn + 1) * RAG_OPS_PER_TURN)}. The workspace does 3.3&times;
        more work per turn (planning, curating, promoting buffers) and earns it back by
        not re-fetching what it already holds; the paper reports a 17&ndash;18% net
        efficiency gain.
      </p>

      <figcaption>
        The multi-turn condition from the Cognitive Workspace proof of concept
        (arXiv:2508.13171): a four-question conversation about AI. From turn one the
        workspace answers partly from its own curated buffers, and the reuse rate holds
        around 55&ndash;57% as the conversation deepens; stateless RAG re-retrieves
        everything, every time. This part of the claim held up. What the experiment never
        measured is the part that didn&rsquo;t.
      </figcaption>
    </figure>
  )
}
