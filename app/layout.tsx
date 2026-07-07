import type { Metadata, Viewport } from 'next'
import Footer from '@/components/Footer'
import HandDrawnFilter from '@/components/HandDrawnFilter'
import Nav from '@/components/Nav'
import SiteEffects from '@/components/SiteEffects'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tao-hpu.github.io'),
  title: 'Tao An Official Site',
  description:
    'Tao An: AI Researcher · MS in AI from Hawaii Pacific University (2026). Founder of FIM Labs, building production AI for legal & healthcare.',
  keywords:
    'Tao An, AI Research, Machine Learning, RAG, LLM, FIM Labs, Hawaii Pacific University, Singapore',
  authors: [{ name: 'Tao An' }],
  openGraph: {
    title: 'Tao An',
    description: 'AI Researcher focused on building impactful technology',
    type: 'website',
    url: 'https://tao-hpu.github.io/',
    images: [
      {
        url: 'https://tao-hpu.github.io/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Tao An: From industry to academia, building AI that works.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tao An',
    description: 'AI Researcher focused on building impactful technology',
    images: ['https://tao-hpu.github.io/images/og-cover.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/favicon/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// Runs before paint: motion-ready gate + theme from localStorage/system,
// mirroring the legacy inline scripts (no FOUC, no motion for no-JS).
const bootScript = `
document.documentElement.classList.add('motion-ready');
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'dark' && t !== 'light') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="renderer" content="webkit" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          defer
          src="https://t.aidb.com.cn/script.js"
          data-website-id="42b42b1b-afae-4c4f-a600-ebe17e472814"
        ></script>
      </head>
      <body>
        <HandDrawnFilter />
        <Nav />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  )
}
