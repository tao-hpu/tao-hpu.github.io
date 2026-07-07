import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages. With trailingSlash unset (false),
  // /research exports as research.html, so the legacy /research.html
  // URLs keep working byte-for-byte on Pages.
  output: 'export',
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
