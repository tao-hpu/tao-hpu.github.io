'use client'

import { useMemo, useState, type CSSProperties } from 'react'

/**
 * Chinese text laid out on a fixed character grid, with punctuation
 * "staircases" detected and drawn. Same rule as the analysis: three or more
 * marks on consecutive rows, each 1–3 characters (2–6 half-width cells) left
 * or right of the previous one, all in the same direction.
 */

const SAMPLES = {
  model: {
    label: 'Model reply',
    source: 'Claude Sonnet 5.5 via the API, no system prompt, asked how parents should handle a child hooked on short videos (excerpt).',
    lines: [
      '四、用更好的活动去替代',
      '单纯禁止会留下空白，要让孩子有别的事可做：',
      '- 运动：球类、骑行、游泳，既释放精力又有成就感。',
      '- 兴趣培养：乐器、绘画、编程、手工、阅读。',
      '- 线下社交：多和同学朋友见面。',
      '- 亲子时间：桌游、做饭、散步、周末郊游。每天固定留一段高质量的陪伴。',
    ],
  },
  human: {
    label: 'Human answer',
    source: 'An answer from a Chinese psychology Q&A site, collected before ChatGPT. HC3-Chinese (Guo et al., 2023), CC BY-SA 4.0. Typos kept.',
    lines: [
      '我先来解释第一个，我们直接上例子，这样更直白，在心理学导论还有，心理学中都有，1949年莫尼滋获得诺贝尔生理学奖，他的获奖为，前额叶切除治疗精神分裂和强迫症，这项手术在现在看来极不人道，但是当时却获得吉大推广，原因就是你说的的原话，手术后暴力，焦虑，还有其他神经症无法控制的行为得到及好的控制，人变得温顺，行为可控，为此患者家属得到解脱，但是代价巨大，活动监控，认知情感，甚至言语，相关事件的系列关系都会受到损伤。这就是你说的含义。综合来说，额叶损伤，会引起，运动以及智力改变，抽象思维改变。忽视存在于责任。等，这就包含你所说的含义，失去主动直觉，也不能感知客体。',
    ],
  },
} as const

type SampleKey = keyof typeof SAMPLES
type Mode = 'written' | 'shuffled' | 'scattered'

const PUNCT = new Set('，。、；：？！')
const PUNCT_SPLIT = /([，。、；：？！])/
const LIST_PREFIX = /^\s*([-*•]|\d+[.、)）])\s*/
const WIDE = /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/

type Cell = { ch: string; row: number; col: number; w: number; line: number }

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(xs: T[], rnd: () => number): T[] {
  const a = xs.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function shuffleClauses(line: string, rnd: () => number): string {
  const m = line.match(LIST_PREFIX)
  const head = m ? m[0] : ''
  const parts = line.slice(head.length).split(PUNCT_SPLIT)
  const segs: string[] = []
  for (let i = 0; i < parts.length; i += 2) segs.push(parts[i] + (parts[i + 1] ?? ''))
  return head + shuffle(segs.filter(Boolean), rnd).join('')
}

function layout(lines: string[], width: number): { cells: Cell[]; rows: number } {
  const cells: Cell[] = []
  let row = 0
  lines.forEach((line, li) => {
    let col = 0
    for (const ch of Array.from(line)) {
      const w = WIDE.test(ch) ? 2 : 1
      if (col + w > width) {
        row += 1
        col = 0
      }
      cells.push({ ch, row, col, w, line: li })
      col += w
    }
    row += 1
  })
  return { cells, rows: row }
}

/** Swap every mark with a random full-width character on its own row. */
function scatter(cells: Cell[], rnd: () => number): Cell[] {
  const out = cells.map((c) => ({ ...c }))
  const byRow = new Map<number, number[]>()
  out.forEach((c, i) => {
    if (c.w === 2) byRow.set(c.row, [...(byRow.get(c.row) ?? []), i])
  })
  for (const idx of byRow.values()) {
    const marks = idx.filter((i) => PUNCT.has(out[i].ch))
    const slots = shuffle(idx, rnd).slice(0, marks.length)
    const chars = idx.map((i) => out[i].ch)
    const markChars = marks.map((i) => out[i].ch)
    const rest = chars.filter((ch) => !PUNCT.has(ch))
    const slotSet = new Set(slots)
    let r = 0
    let m = 0
    for (const i of idx) out[i].ch = slotSet.has(i) ? markChars[m++] : rest[r++]
  }
  return out
}

/** Same rule as the analysis: each mark joins at most one chain per direction. */
function findChains(cells: Cell[]): Cell[][] {
  const marks = cells
    .filter((c) => PUNCT.has(c.ch))
    .sort((a, b) => a.row - b.row || a.col - b.col)
  const byRow = new Map<number, Cell[]>()
  for (const c of marks) byRow.set(c.row, [...(byRow.get(c.row) ?? []), c])
  const found: Cell[][] = []
  for (const sgn of [1, -1]) {
    const used = new Set<Cell>()
    for (const p of marks) {
      if (used.has(p)) continue
      const chain = [p]
      for (;;) {
        const last = chain[chain.length - 1]
        const cand = (byRow.get(last.row + 1) ?? []).filter((q) => {
          const d = sgn * (q.col - last.col)
          return !used.has(q) && d >= 2 && d <= 6
        })
        if (!cand.length) break
        chain.push(cand.reduce((x, y) => (Math.abs(x.col - last.col) <= Math.abs(y.col - last.col) ? x : y)))
      }
      if (chain.length >= 3) {
        found.push(chain)
        chain.forEach((q) => used.add(q))
      }
    }
  }
  return found
}

export default function StaircaseDemo() {
  const [sample, setSample] = useState<SampleKey>('model')
  const [chars, setChars] = useState(26)
  const [mode, setMode] = useState<Mode>('written')
  const [blank, setBlank] = useState(false)
  const [seed, setSeed] = useState(7)

  const width = chars * 2
  const { cells, rows, chains } = useMemo(() => {
    const rnd = mulberry32(seed)
    let lines: string[] = [...SAMPLES[sample].lines]
    if (mode === 'shuffled') lines = lines.map((l) => shuffleClauses(l, rnd))
    if (blank) lines = lines.flatMap((l) => [l, ''])
    const laid = layout(lines, width)
    const cs = mode === 'scattered' ? scatter(laid.cells, rnd) : laid.cells
    return { cells: cs, rows: laid.rows, chains: findChains(cs) }
  }, [sample, mode, blank, seed, width])

  // Grid geometry in half-width cells; CSS turns one cell into
  // min(10px, container width / width) via a container query unit.
  const ROW = 3.1
  const inChain = new Set(chains.flat())
  const crossItem = chains.filter((c) => new Set(c.map((q) => q.line)).size > 1).length

  return (
    <figure className="mem-explorer stair-demo">
      <div className="mem-explorer-tabs" role="group" aria-label="Text sample">
        {(Object.keys(SAMPLES) as SampleKey[]).map((k) => (
          <button
            key={k}
            type="button"
            className={`mem-tab${k === sample ? ' on' : ''}`}
            aria-pressed={k === sample}
            onClick={() => setSample(k)}
          >
            {SAMPLES[k].label}
          </button>
        ))}
      </div>

      <div className="stair-controls">
        <div className="mem-explorer-metrics" role="group" aria-label="Transform">
          {(
            [
              ['written', 'As written'],
              ['shuffled', 'Shuffle clauses'],
              ['scattered', 'Scatter marks at random'],
            ] as [Mode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              className={`mem-metric${m === mode ? ' on' : ''}`}
              aria-pressed={m === mode}
              onClick={() => setMode(m)}
            >
              {label}
            </button>
          ))}
          {mode !== 'written' && (
            <button type="button" className="mem-metric" onClick={() => setSeed((s) => s + 1)}>
              reroll
            </button>
          )}
          <button
            type="button"
            className={`mem-metric${blank ? ' on' : ''}`}
            aria-pressed={blank}
            onClick={() => setBlank((b) => !b)}
          >
            Blank line after each line
          </button>
        </div>
        <label className="stair-width">
          <span>line width {chars} characters</span>
          <input
            type="range"
            min={14}
            max={40}
            value={chars}
            onChange={(e) => setChars(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="stair-box">
        <div
          className="stair-grid"
          role="img"
          aria-label={`${chains.length} staircases in ${rows} rows`}
          style={{ '--stair-cols': width, '--stair-rows': rows } as CSSProperties}
        >
          {cells.map((c, i) => (
            <span
              key={i}
              className={`stair-ch${PUNCT.has(c.ch) ? ' p' : ''}${inChain.has(c) ? ' on' : ''}`}
              style={{ '--c': c.col, '--r': c.row, '--w': c.w } as CSSProperties}
            >
              {c.ch}
            </span>
          ))}
          <svg className="stair-lines" viewBox={`0 0 ${width} ${rows * ROW}`} preserveAspectRatio="none" aria-hidden="true">
            {chains.map((ch, i) => (
              <polyline
                key={i}
                points={ch.map((q) => `${q.col + q.w / 2},${(q.row + 0.5) * ROW}`).join(' ')}
              />
            ))}
          </svg>
        </div>
      </div>

      <p className="mem-explorer-note" style={{ marginBottom: 0 }}>
        <strong>{chains.length}</strong> {chains.length === 1 ? 'staircase' : 'staircases'} in {rows} rows
        {chains.length > 0 && <>, {crossItem} crossing from one line of the source into the next</>}.{' '}
        {SAMPLES[sample].source}
      </p>

      <figcaption>
        Drag the width and the staircases move, appear and vanish: the model never sees where its lines
        break, so it cannot be aiming for them. Shuffling the clauses inside each line, or scattering
        the marks at random along their own row, usually leaves some standing; reroll to see the
        spread. The human paragraph was written before ChatGPT existed. The model excerpt was picked
        because it shows staircases well, so a single sample says little; the corpus counts are below.
      </figcaption>
    </figure>
  )
}
