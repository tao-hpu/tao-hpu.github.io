import { PERSON_SAME_AS, SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site'

/**
 * Server-rendered Person + WebSite schema for academic / knowledge-graph SEO.
 * `#person` is the id other schema on the site (articles, publications) point at.
 */
export default function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/images/avatar-400.jpg`,
        jobTitle: 'AI Researcher',
        description: SITE_DESCRIPTION,
        knowsAbout: [
          'Retrieval-augmented generation',
          'LLM memory architectures',
          'Knowledge graphs',
          'Intervention timing for always-on assistants',
        ],
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
        email: `mailto:${SITE_EMAIL}`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
