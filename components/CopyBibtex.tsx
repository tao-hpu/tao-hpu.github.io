'use client'

import { useState } from 'react'

export default function CopyBibtex({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Fallback: select the pre if clipboard is blocked
      setCopied(false)
    }
  }

  return (
    <button type="button" className="copy-bibtex-btn" onClick={onCopy}>
      {copied ? 'Copied' : 'Copy BibTeX'}
    </button>
  )
}
