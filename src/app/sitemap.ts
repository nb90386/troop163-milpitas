import type { MetadataRoute } from 'next'
import { adventures } from '@/content/adventures'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/adventures', '/gallery', '/about', '/join', '/parents', '/contact']
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...adventures.map((a) => ({ url: `${site.url}/adventures/${a.slug}`, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ]
}
