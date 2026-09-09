'use client'

import { useEffect, useState } from 'react'

type TocItem = {
  id: string
  text: string
  level: number
}

/**
 * 二级标题少于这个数量就不出目录。按当前七篇的实际分布，5 这条线把
 * 千字以上、读者记不住结构的三篇留下，四篇千字上下的短文排除在外。
 */
const MIN_HEADINGS = 5

/**
 * 文章目录。标题与 id 都由 rehype-slug 在编译期生成，这里直接从渲染好的
 * DOM 里读，不另算一份 slug，省掉两边对不上的可能。宽度不够时整块不出现
 * （见 prose.css 的断点），所以移动端不用另做折叠式目录。
 */
export default function ArticleToc() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.article-prose h2, .article-prose h3')
    ).filter((el) => el.id)

    if (headings.filter((el) => el.tagName === 'H2').length < MIN_HEADINGS) return

    setItems(
      headings.map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H3' ? 3 : 2,
      }))
    )
    setActiveId(headings[0].id)

    // 判定线取视口上四分之一处：取最后一个越过判定线的标题
    const update = () => {
      const line = window.innerHeight * 0.25
      let current = headings[0].id
      for (const el of headings) {
        if (el.getBoundingClientRect().top > line) break
        current = el.id
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <nav className="article-toc" aria-label="On this page">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={`article-toc-item${item.level === 3 ? ' article-toc-sub' : ''}${
              activeId === item.id ? ' is-active' : ''
            }`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
