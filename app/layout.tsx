import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import Footer from '@/components/Footer'
import HandDrawnFilter from '@/components/HandDrawnFilter'
import Nav from '@/components/Nav'
import PersonJsonLd from '@/components/PersonJsonLd'
import SiteEffects from '@/components/SiteEffects'
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Official Site`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_TAGLINE,
    images: [`${SITE_URL}/images/og-cover.jpg`],
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
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'Tao An · Articles' }],
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f3' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <head>
        <meta name="renderer" content="webkit" />
        <link rel="alternate" type="application/rss+xml" title="Tao An · Articles" href="/feed.xml" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          defer
          src="https://t.aidb.com.cn/script.js"
          data-website-id="42b42b1b-afae-4c4f-a600-ebe17e472814"
        ></script>
        <PersonJsonLd />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HandDrawnFilter />
        <Nav />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  )
}
