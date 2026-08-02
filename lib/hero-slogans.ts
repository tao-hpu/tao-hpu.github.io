/**
 * Home hero h1 variants. Curated research theses, not a carousel.
 * Metadata / OG keep SITE_TAGLINE; only the visible h1 rotates on load.
 *
 * Layout rule: never start a segment with punctuation. Trailing .,?!:
 * stay on the same segment as the word they close, so line wraps cannot
 * orphan them at the start of the next line (word-fade is inline-block).
 */

export type HeroSegment = {
  text: string
  underline?: boolean
}

export type HeroSlogan = {
  id: string
  plain: string
  segments: HeroSegment[]
}

export const HERO_SLOGANS: HeroSlogan[] = [
  {
    id: 'remember-and-act',
    plain: 'How production LLMs remember and when to act.',
    segments: [
      { text: 'How' },
      { text: 'production LLMs', underline: true },
      { text: 'remember' },
      { text: 'and when to' },
      { text: 'act.', underline: true },
    ],
  },
  {
    id: 'fidelity-before-structure',
    plain: 'Fidelity before structure in long-conversation memory.',
    segments: [
      { text: 'Fidelity', underline: true },
      { text: 'before' },
      { text: 'structure', underline: true },
      { text: 'in long-conversation' },
      { text: 'memory.' },
    ],
  },
  {
    id: 'when-to-speak',
    plain: 'When should the agent speak? What does interruption cost?',
    segments: [
      { text: 'When should the' },
      { text: 'agent speak?', underline: true },
      { text: 'What does' },
      { text: 'interruption cost?', underline: true },
    ],
  },
  {
    id: 'citations-get-wrong',
    plain: 'What citations get wrong in a full-conference audit.',
    segments: [
      { text: 'What' },
      { text: 'citations get wrong', underline: true },
      { text: 'in a full-conference' },
      { text: 'audit.' },
    ],
  },
  {
    id: 'equalizer-or-amplifier',
    plain: 'AI as equalizer or amplifier. Task complexity decides.',
    segments: [
      { text: 'AI as' },
      { text: 'equalizer', underline: true },
      { text: 'or' },
      { text: 'amplifier.', underline: true },
      { text: 'Task complexity decides.' },
    ],
  },
]

export const DEFAULT_HERO_SLOGAN = HERO_SLOGANS[0]

const STORAGE_KEY = 'hero-slogan-id'

/** Pick a slogan on the client. Avoids immediately repeating the last one in this tab. */
export function pickHeroSlogan(): HeroSlogan {
  let pool = HERO_SLOGANS
  try {
    const last = sessionStorage.getItem(STORAGE_KEY)
    if (last && HERO_SLOGANS.length > 1) {
      const filtered = HERO_SLOGANS.filter((s) => s.id !== last)
      if (filtered.length > 0) pool = filtered
    }
  } catch {
    // private mode / blocked storage
  }

  const picked = pool[Math.floor(Math.random() * pool.length)]!
  try {
    sessionStorage.setItem(STORAGE_KEY, picked.id)
  } catch {
    // ignore
  }
  return picked
}
