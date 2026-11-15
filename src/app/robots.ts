import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  // Review builds (with youth photos pending release checks) are never indexed.
  if (process.env.NEXT_PUBLIC_PHOTO_MODE === 'review') return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` }
}
