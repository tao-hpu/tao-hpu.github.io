'use client'

import { useState } from 'react'

const questions = [
  {
    id: 'memory',
    label: 'Memory',
    question: 'What should persist from a long conversation?',
    x: 76,
    y: 158,
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    question: 'Which source should the agent recover before answering?',
    x: 210,
    y: 76,
  },
  {
    id: 'intervention',
    label: 'Intervention',
    question: 'When is speaking worth the interruption?',
    x: 344,
    y: 158,
  },
] as const

export default function ResearchInstrument() {
  const [active, setActive] = useState(0)
  const selected = questions[active]

  return (
    <div className="research-instrument">
      <div className="instrument-heading">
        <span>Research questions</span>
        <span>Explore the loop</span>
      </div>
      <div className="instrument-field">
        <svg viewBox="0 0 420 230" aria-hidden="true" focusable="false">
          <path className="instrument-guide" d="M24 158H396M210 24V205" />
          <path className="instrument-orbit" d="M76 158 Q210 -7 344 158 Q210 247 76 158Z" />
          <path className="instrument-route" d="M76 158 L210 76 L344 158" />
          {questions.map((q, index) => (
            <g key={q.id} className={index === active ? 'is-active' : undefined}>
              <circle className="instrument-ring" cx={q.x} cy={q.y} r="23" />
              <circle className="instrument-point" cx={q.x} cy={q.y} r="6" />
            </g>
          ))}
        </svg>
      </div>
      <div className="instrument-controls" role="group" aria-label="Research questions">
        {questions.map((q, index) => (
          <button
            type="button"
            key={q.id}
            className={index === active ? 'is-active' : undefined}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {q.label}
          </button>
        ))}
      </div>
      <p className="instrument-readout" aria-live="polite" aria-atomic="true">
        <span>Question {String(active + 1).padStart(2, '0')}</span>
        {selected.question}
      </p>
    </div>
  )
}
