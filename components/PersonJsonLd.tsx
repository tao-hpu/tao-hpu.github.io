import { PERSON_SAME_AS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

/** Server-rendered Person schema for academic / knowledge-graph SEO. */
export default function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/avatar-400.jpg`,
    jobTitle: 'AI Researcher',
    description: SITE_DESCRIPTION,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Hawaii Pacific University',
    },
    affiliation: {
      '@type': 'Organization',
      name: 'FIM Labs Pte Ltd',
      url: 'https://fim.ai',
    },
    sameAs: [...PERSON_SAME_AS],
    email: 'mailto:tan1@my.hpu.edu',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
