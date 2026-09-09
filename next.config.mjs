import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages. With trailingSlash unset (false),
  // /research exports as research.html, so the legacy /research.html
  // URLs keep working byte-for-byte on Pages.
  output: 'export',
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Pin the file-tracing root to this repo. A stray pnpm-lock.yaml in
  // the home directory makes Next.js walk up and misdetect ~/ as the
  // workspace root, turning the whole home dir into the tracing root
  // during builds (memory explosion / OOM).
  outputFileTracingRoot: __dirname,
}

// rehype-slug 给正文里的 h2 / h3 生成 id，文章目录和分享出去的
// #锚点都依赖它；标题是英文，slug 出来可读，不需要百分号转义。
const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeSlug],
  },
})

export default withMDX(nextConfig)
