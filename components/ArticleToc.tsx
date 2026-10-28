'use client'

import { useEffect, useRef, useState } from 'react'

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
 * DOM 里读，不另算一份 slug，省掉两边对不上的可能。宽屏为侧边目录，
 * 窄屏为正文前的折叠目录。
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

  // 宽屏目录是 position: fixed，滚到页尾会压在页脚上。页脚顶端进入目录范围后，
  // 把目录整体上移同样的距离，效果等同于目录随正文末尾一起滚走。
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const nav = navRef.current
    const footer = document.querySelector('footer')
    if (!nav || !footer) return

    const GAP = 48
    const place = () => {
      if (getComputedStyle(nav).position !== 'fixed') {
        nav.style.transform = ''
        return
      }
      nav.style.transform = ''
      const overlap = nav.getBoundingClientRect().bottom + GAP - footer.getBoundingClientRect().top
      if (overlap > 0) nav.style.transform = `translateY(${-overlap}px)`
    }

    place()
    window.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <nav ref={navRef} className="article-toc" aria-label="On this page">
      <details className="article-toc-mobile">
        <summary>On this page</summary>
        <ul>
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'article-toc-sub' : undefined}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ul>
      </details>
      <ul className="article-toc-desktop">
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
