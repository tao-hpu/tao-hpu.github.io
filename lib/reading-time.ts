import { readFileSync } from 'node:fs'
import path from 'node:path'

/** 每分钟词数，取英文非小说阅读的常用值 */
const WORDS_PER_MINUTE = 225

/**
 * 按 MDX 源文件估算阅读时长。构建期读一次，不写进 registry：
 * 写进去就要人工维护，跟 feed.xml / sitemap.xml 一样迟早会漏。
 * 交互图组件不计入词数，读者不"读"它们。
 */
export function readingMinutes(slug: string): number {
  let source: string
  try {
    source = readFileSync(path.join(process.cwd(), 'app', 'articles', slug, 'page.mdx'), 'utf8')
  } catch {
    return 0
  }

  const prose = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^(?:import|export)\s.*$/gm, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#*_>|[\]()]/g, ' ')

  const words = prose.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
