'use client'

import { useState } from 'react'

const LAYERS = 28

/**
 * A small interactive figure: select a contiguous band of transformer
 * layers. Exists to demonstrate what web-native articles can do that a
 * static PDF cannot.
 */
export default function LayerBandDemo() {
  const [start, setStart] = useState(9)
  const [end, setEnd] = useState(21)

  const lo = Math.min(start, end)
  const hi = Math.max(start, end)

  return (
    <figure className="layer-band-demo">
      <div className="layer-band-track" role="img" aria-label={`Layers ${lo} to ${hi} selected of ${LAYERS}`}>
        {Array.from({ length: LAYERS }, (_, i) => (
          <span
            key={i}
            className={`layer-band-cell${i >= lo && i <= hi ? ' on' : ''}`}
            title={`layer ${i}`}
          />
        ))}
      </div>
      <div className="layer-band-controls">
        <label>
          from <strong>{lo}</strong>
          <input
            type="range"
            min={0}
            max={LAYERS - 1}
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          />
        </label>
        <label>
          to <strong>{hi}</strong>
          <input
            type="range"
            min={0}
            max={LAYERS - 1}
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </label>
      </div>
      <figcaption>
        Drag the sliders: a band of {hi - lo + 1} layers ({lo}&ndash;{hi}) out of {LAYERS} is
        selected. In a PDF this would be four hard-coded screenshots; here it is the actual
        parameter.
      </figcaption>
    </figure>
  )
}
