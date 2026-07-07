'use client'

import { useState } from 'react'

type Row = {
  label: string
  kind: 'chunks' | 'artifacts' | 'baseline'
  values: Record<string, number | null>
}

type Benchmark = {
  key: string
  label: string
  note: string
  defaultMetric: string
  metrics: { key: string; label: string }[]
  rows: Row[]
}

/**
 * All numbers are from arXiv:2601.00821v3, Tables 1-4.
 * Values are accuracy / pass rate in percent; null = not reported.
 */
const BENCHMARKS: Benchmark[] = [
  {
    key: 'locomo',
    label: 'LoCoMo',
    note: '10 real long conversations, 699 questions. LLM judge, binary correct/incorrect.',
    defaultMetric: 'overall',
    metrics: [
      { key: 'overall', label: 'Overall' },
      { key: 'single', label: 'Single-hop' },
      { key: 'temporal', label: 'Temporal' },
      { key: 'multi', label: 'Multi-hop' },
    ],
    rows: [
      {
        label: 'Verbatim chunks',
        kind: 'chunks',
        values: { overall: 43.9, single: 35.5, temporal: 50.2, multi: 47.9 },
      },
      {
        label: 'Chunks + 1-hop graph',
        kind: 'chunks',
        values: { overall: 43.1, single: 36.5, temporal: 47.7, multi: 46.9 },
      },
      {
        label: 'Chunks ∪ artifacts (union)',
        kind: 'chunks',
        values: { overall: 42.5, single: 35.8, temporal: 48.3, multi: 42.7 },
      },
      {
        label: 'RAG + rerank (baseline)',
        kind: 'baseline',
        values: { overall: 30.5, single: 41.1, temporal: 16.5, multi: 45.8 },
      },
      {
        label: 'Artifacts, budget-matched',
        kind: 'artifacts',
        values: { overall: 29.2, single: 25.2, temporal: 30.2, multi: 37.5 },
      },
      {
        label: 'Artifacts + graph',
        kind: 'artifacts',
        values: { overall: 28.0, single: 22.3, temporal: 31.2, multi: 34.4 },
      },
      {
        label: 'GraphRAG (best of 9 configs)',
        kind: 'baseline',
        values: { overall: 13.0, single: 12.8, temporal: 7.5, multi: 32.3 },
      },
    ],
  },
  {
    key: 'lme',
    label: 'LongMemEval-S',
    note: '500 questions over multi-session histories. Same fixed pipeline, same judge.',
    defaultMetric: 'overall',
    metrics: [
      { key: 'overall', label: 'Overall' },
      { key: 'ie', label: 'Info extraction' },
      { key: 'msr', label: 'Multi-session' },
      { key: 'ku', label: 'Knowledge updates' },
      { key: 'tr', label: 'Temporal' },
      { key: 'abs', label: 'Abstention' },
    ],
    rows: [
      {
        label: 'Verbatim chunks',
        kind: 'chunks',
        values: { overall: 67.4, ie: 84.7, msr: 62.8, ku: 77.8, tr: 50.4, abs: 46.7 },
      },
      {
        label: 'RAG + rerank (baseline)',
        kind: 'baseline',
        values: { overall: 64.8, ie: 85.3, msr: 61.2, ku: 72.2, tr: 38.6, abs: 70.0 },
      },
      {
        label: 'Chunks ∪ artifacts (union)',
        kind: 'chunks',
        values: { overall: 64.6, ie: 80.7, msr: 58.7, ku: 76.4, tr: 51.2, abs: 36.7 },
      },
      {
        label: 'Artifacts, budget-matched',
        kind: 'artifacts',
        values: { overall: 47.4, ie: 50.7, msr: 36.4, ku: 69.4, tr: 40.9, abs: 50.0 },
      },
      {
        label: 'Artifacts + graph',
        kind: 'artifacts',
        values: { overall: 45.4, ie: 50.7, msr: 34.7, ku: 69.4, tr: 36.2, abs: 43.3 },
      },
    ],
  },
  {
    key: 'synthetic',
    label: 'Synthetic (the trap)',
    note: '50 generated conversations, written before the real benchmarks were run. Here extraction looks like the right idea.',
    defaultMetric: 'multi',
    metrics: [
      { key: 'multi', label: 'Multi-hop pass rate' },
      { key: 'retention', label: 'Retention (recall)' },
    ],
    rows: [
      {
        label: 'Artifacts + graph',
        kind: 'artifacts',
        values: { multi: 81.0, retention: 97.5 },
      },
      {
        label: 'RAG (baseline)',
        kind: 'baseline',
        values: { multi: 55.5, retention: null },
      },
      {
        label: 'Chunks + graph',
        kind: 'chunks',
        values: { multi: 25.0, retention: 92.5 },
      },
      {
        label: 'Summarization',
        kind: 'baseline',
        values: { multi: 0.0, retention: 19.0 },
      },
    ],
  },
]

const KIND_LABEL: Record<Row['kind'], string> = {
  chunks: 'verbatim store',
  artifacts: 'extracted store',
  baseline: 'baseline',
}

export default function MemoryBenchmarkExplorer() {
  const [benchKey, setBenchKey] = useState('locomo')
  const bench = BENCHMARKS.find((b) => b.key === benchKey)!
  const [metricByBench, setMetricByBench] = useState<Record<string, string>>({})
  const metric = metricByBench[benchKey] ?? bench.defaultMetric

  const rows = [...bench.rows].sort(
    (a, b) => (b.values[metric] ?? -1) - (a.values[metric] ?? -1),
  )
  const max = Math.max(...rows.map((r) => r.values[metric] ?? 0))

  return (
    <figure className="mem-explorer">
      <div className="mem-explorer-tabs" role="tablist" aria-label="Benchmark">
        {BENCHMARKS.map((b) => (
          <button
            key={b.key}
            type="button"
            role="tab"
            aria-selected={b.key === benchKey}
            className={`mem-tab${b.key === benchKey ? ' on' : ''}`}
            onClick={() => setBenchKey(b.key)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <p className="mem-explorer-note">{bench.note}</p>

      <div className="mem-explorer-metrics">
        {bench.metrics.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`mem-metric${m.key === metric ? ' on' : ''}`}
            onClick={() => setMetricByBench((s) => ({ ...s, [benchKey]: m.key }))}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mem-explorer-chart">
        {rows.map((r) => {
          const v = r.values[metric]
          return (
            <div className="mem-bar-row" key={r.label}>
              <span className="mem-bar-label">{r.label}</span>
              <span className="mem-bar-track">
                {v === null ? (
                  <span className="mem-bar-na">not reported</span>
                ) : (
                  <>
                    <span
                      className={`mem-bar mem-bar-${r.kind}`}
                      style={{ width: `${max > 0 ? (v / max) * 80 : 0}%` }}
                    />
                    <span className="mem-bar-value">{v.toFixed(1)}%</span>
                  </>
                )}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mem-explorer-legend">
        {(['chunks', 'artifacts', 'baseline'] as const).map((k) => (
          <span className="mem-legend-item" key={k}>
            <span className={`mem-legend-swatch mem-bar-${k}`} /> {KIND_LABEL[k]}
          </span>
        ))}
      </div>

      <figcaption>
        Accuracy by stored representation, everything downstream held fixed (retriever,
        reranker, answerer, judge). Data from Tables 1&ndash;4 of{' '}
        <a href="https://arxiv.org/abs/2601.00821" target="_blank" rel="noopener noreferrer">
          arXiv:2601.00821
        </a>
        . Switch benchmarks and question categories; note who wins on the synthetic tab
        versus the real ones.
      </figcaption>
    </figure>
  )
}
