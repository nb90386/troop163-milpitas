import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RevealObserver } from '@/components/reveal-observer'
import { site } from '@/content/site'
import './globals.css'

// Self-hosted (SIL Open Font License, via Fontsource) so builds never depend on a font CDN.
const newsreader = localFont({
  src: [
    { path: '../fonts/newsreader-latin-opsz-normal.woff2', style: 'normal', weight: '200 800' },
    { path: '../fonts/newsreader-latin-opsz-italic.woff2', style: 'italic', weight: '200 800' },
  ],
  variable: '--font-newsreader',
  display: 'swap',
  fallback: ['Iowan Old Style', 'Georgia', 'serif'],
})

const instrument = localFont({
  src: [{ path: '../fonts/instrument-sans-latin-wght-normal.woff2', style: 'normal', weight: '400 700' }],
  variable: '--font-instrument',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Troop 163 · Scouts BSA in Milpitas, California',
    template: '%s · Troop 163 Milpitas',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: 'Troop 163 Milpitas',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'A catamaran with a striped sail on Pinecrest Lake during Camp Hi-Sierra, July 2023.' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: process.env.NEXT_PUBLIC_PHOTO_MODE === 'review' ? { index: false, follow: false } : undefined,
}

export const viewport: Viewport = {
  themeColor: '#18352c',
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Scouts BSA Troops 163 & 2163 Milpitas',
  alternateName: ['Troop 163 Milpitas', 'Troop 2163 Milpitas'],
  url: site.url,
  email: site.email,
  foundingDate: '1993',
  areaServed: ['Milpitas, CA', 'Fremont, CA', 'San Jose, CA'],
  address: { '@type': 'PostalAddress', addressLocality: 'Milpitas', addressRegion: 'CA', addressCountry: 'US' },
  sponsor: { '@type': 'Organization', name: site.sponsor },
  sameAs: [site.links.troopWebHost, site.links.facebook2163],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that JS is running so reveal styles can apply; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  )
}
