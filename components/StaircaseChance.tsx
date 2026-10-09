/**
 * Staircases per 100 rendered rows (40-character lines), observed vs. a chance
 * baseline that keeps each row's number of marks and line length but places
 * the marks at random positions along the row (10 draws per document).
 */
const ROWS: { label: string; n: string; observed: number; chance: number; human: boolean }[] = [
  { label: 'Human: psychology Q&A answers', n: '400 answers', observed: 15.3, chance: 13.5, human: true },
  { label: 'ChatGPT, December 2022', n: '400 answers', observed: 11.1, chance: 8.9, human: false },
  { label: 'Human: Baidu Baike entries', n: '400 entries', observed: 8.6, chance: 8.4, human: true },
  { label: 'Claude Code, my own sessions', n: '400 replies', observed: 5.1, chance: 5.1, human: false },
  { label: 'Seven chat models, raw API', n: '347 replies', observed: 2.3, chance: 2.3, human: false },
  { label: 'Human: Ruan Yifeng, blog and book', n: '14 long pieces', observed: 1.2, chance: 1.2, human: true },
]

const MAX = 16

export default function StaircaseChance() {
  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-chart">
        {ROWS.map((r) => (
          <div key={r.label} className="stair-chance-row">
            <span className="mem-bar-label">
              {r.label}
              <span className="stair-chance-n">{r.n}</span>
            </span>
            <span className="stair-chance-bars">
              <span className="mem-bar-track">
                <span
                  className={`mem-bar ${r.human ? 'mem-bar-artifacts' : 'mem-bar-chunks'}`}
                  style={{ width: `${(r.observed / MAX) * 85}%`, height: 14 }}
                />
                <span className="mem-bar-value">{r.observed.toFixed(1)}</span>
              </span>
              <span className="mem-bar-track">
                <span
                  className="mem-bar mem-bar-baseline"
                  style={{ width: `${(r.chance / MAX) * 85}%`, height: 8 }}
                />
                <span className="mem-bar-value stair-chance-muted">{r.chance.toFixed(1)} at chance</span>
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="mem-explorer-legend">
        <span className="mem-legend-item">
          <span className="mem-legend-swatch" style={{ background: 'var(--color-accent)' }} />
          machine, observed
        </span>
        <span className="mem-legend-item">
          <span
            className="mem-legend-swatch"
            style={{ background: 'color-mix(in srgb, var(--color-accent) 35%, var(--color-border))' }}
          />
          human, observed
        </span>
        <span className="mem-legend-item">
          <span className="mem-legend-swatch" style={{ background: 'var(--color-border)' }} />
          same marks per row, placed at random
        </span>
      </div>
      <figcaption>
        Staircases per 100 rendered rows at 40 characters per line. Computed before rounding, the
        observed-to-chance ratio is 1.01 to 1.03 for Claude Code, the seven API models, Baidu Baike and
        Ruan Yifeng, 1.14 for the psychology answers and 1.25 for ChatGPT in 2022. Most of the count is
        set by how many marks each row carries and how many full rows are stacked without a break: the
        psychology answers carry 2.9 marks per row with punctuation, the API replies 2.1.
      </figcaption>
    </figure>
  )
}
