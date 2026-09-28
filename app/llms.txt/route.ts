import { articleUrl, articles } from '../articles/registry'
import { publications } from '../research/publications'
import { PERSON_SAME_AS, SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site'

// Generated from the same modules the pages render, so this summary cannot
// say something the site does not. Static export writes it to out/llms.txt.
export const dynamic = 'force-static'

export function GET() {
  const papers = publications
    .filter((p) => p.status !== 'patent')
    .map((p) => {
      const link = p.titleHref ? `[${p.title}](${p.titleHref})` : p.title
      return `- ${link} (${p.badges.map((b) => b.label).join(', ')}, ${p.year}): ${p.takeaway}`
    })

  const notes = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => `- [${a.title}](${articleUrl(a)}) (${a.date}): ${a.description}`)

  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Founder of FIM Labs Pte Ltd (Singapore · Beijing). Papers are listed with their public',
    'status only: a venue is named once the paper has been accepted there.',
    '',
    '## Pages',
    `- [Research](${SITE_URL}/research): papers, patents, academic service`,
    `- [Articles](${SITE_URL}/articles): interactive companion notes to the papers`,
    `- [Building](${SITE_URL}/building): FIM Labs products and deployments`,
    `- [Open Source](${SITE_URL}/opensource): courses, tools, upstream contributions`,
    '',
    '## Papers',
    ...papers,
    '',
    '## Notes',
    ...notes,
    '',
    '## Profiles',
    ...PERSON_SAME_AS.map((u) => `- ${u}`),
    '',
    '## Contact',
    `- mailto:${SITE_EMAIL}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
