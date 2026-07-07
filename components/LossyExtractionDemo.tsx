'use client'

import { useState } from 'react'

type Fact = {
  id: string
  /** Salience as an extractor might score it: higher = more obviously "worth keeping". */
  salience: number
  /** Whether the base query surfaces this fact, if it survived extraction. */
  baseRetrieved: boolean
  text: string
  artifactType: string
}

/**
 * Illustrative example, not from the paper's data. The failure statistics in
 * the caption are from arXiv:2601.00821v3, Appendices D and G.
 */
const FACTS: Fact[] = [
  { id: 'trip', salience: 0.95, baseRetrieved: true, text: 'booked a trip to Lisbon', artifactType: 'Event' },
  { id: 'date', salience: 0.8, baseRetrieved: true, text: 'flying on March 14th', artifactType: 'Event' },
  { id: 'ana', salience: 0.7, baseRetrieved: false, text: 'sister Ana is joining', artifactType: 'Relationship' },
  { id: 'time', salience: 0.55, baseRetrieved: true, text: '9:40am flight out of Boston', artifactType: 'KeyFact' },
  { id: 'veg', salience: 0.5, baseRetrieved: false, text: 'Ana is vegetarian now', artifactType: 'PersonAttribute' },
  { id: 'price', salience: 0.35, baseRetrieved: true, text: 'direct flight was $1,240', artifactType: 'KeyFact' },
]

const QUESTIONS: { q: string; needs: string }[] = [
  { q: 'When do they fly to Lisbon?', needs: 'date' },
  { q: 'Who is coming along?', needs: 'ana' },
  { q: 'What time does the flight leave?', needs: 'time' },
  { q: 'Why look for vegetarian-friendly restaurants?', needs: 'veg' },
  { q: 'How much did the direct flight cost?', needs: 'price' },
]

const TURN =
  'Finally booked the trip! We fly to Lisbon on March 14th, the 9:40am flight out of ' +
  'Boston, since the direct one was $1,240. Oh, and my sister Ana decided to join. ' +
  'She’s vegetarian now, so let’s find restaurants that work for her.'

export default function LossyExtractionDemo() {
  const [threshold, setThreshold] = useState(0.6)
  const [expanded, setExpanded] = useState(false)

  const keptIds = new Set(FACTS.filter((f) => f.salience >= threshold).map((f) => f.id))
  const retrievedIds = new Set(
    FACTS.filter((f) => keptIds.has(f.id) && (expanded || f.baseRetrieved)).map((f) => f.id),
  )
  const answerable = QUESTIONS.filter((q) => retrievedIds.has(q.needs)).length

  return (
    <figure className="lossy-demo">
      <p className="lossy-turn">
        <span className="lossy-turn-label">one conversation turn</span>
        {TURN}
      </p>

      <label className="lossy-slider">
        extractor keeps facts it scores above{' '}
        <strong>{threshold.toFixed(2)}</strong>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>

      <label className="lossy-toggle">
        <input
          type="checkbox"
          checked={expanded}
          onChange={(e) => setExpanded(e.target.checked)}
        />
        <span>
          1-hop graph expansion: retrieve every artifact the store still holds (in the
          paper, recall 25.8% &rarr; 71.8%)
        </span>
      </label>

      <div className="lossy-stores">
        <div className="lossy-store">
          <h4>
            Extracted artifacts{' '}
            <span className="lossy-store-count">
              {keptIds.size}/{FACTS.length} facts survive, {retrievedIds.size} retrieved
            </span>
          </h4>
          <ul>
            {FACTS.map((f) => {
              const state = !keptIds.has(f.id)
                ? 'dropped'
                : retrievedIds.has(f.id)
                  ? 'kept'
                  : 'unretrieved'
              return (
                <li key={f.id} className={state}>
                  <span className="lossy-fact-type">{f.artifactType}</span> {f.text}
                  {state === 'unretrieved' && (
                    <span className="lossy-fact-note">stored, not retrieved</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="lossy-store">
          <h4>
            Verbatim chunk{' '}
            <span className="lossy-store-count">everything survives</span>
          </h4>
          <p className="lossy-chunk-text">&ldquo;{TURN}&rdquo;</p>
        </div>
      </div>

      <div className="lossy-questions">
        <h4>
          Questions asked 40 sessions later{' '}
          <span className="lossy-store-count">
            artifacts answer {answerable}/{QUESTIONS.length}, chunks {QUESTIONS.length}/
            {QUESTIONS.length}
          </span>
        </h4>
        <ul>
          {QUESTIONS.map((q) => {
            const ok = retrievedIds.has(q.needs)
            const reason = ok
              ? null
              : keptIds.has(q.needs)
                ? 'stored but not retrieved'
                : 'never extracted'
            return (
              <li key={q.needs}>
                <span className={`lossy-mark ${ok ? 'ok' : 'fail'}`}>{ok ? '✓' : '✗'}</span>
                {q.q}
                {reason && <span className="lossy-reason">{reason}</span>}
              </li>
            )
          })}
        </ul>
      </div>

      <figcaption>
        An illustrative turn, not the paper&rsquo;s data. The slider is the part you
        don&rsquo;t get to control in a real system: the extractor decides at write time
        what is worth keeping, before it knows the questions. The toggle is why better
        retrieval is a red herring: expansion recovers facts that were stored but missed
        by the query, and does nothing for facts that were never extracted. In the
        paper&rsquo;s error analysis those two failure modes split 31% / 69%, and lifting
        retrieval recall to 71.8% left answer accuracy unchanged (Appendices D and G of{' '}
        <a href="https://arxiv.org/abs/2601.00821" target="_blank" rel="noopener noreferrer">
          arXiv:2601.00821
        </a>
        ).
      </figcaption>
    </figure>
  )
}
