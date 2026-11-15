import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    qualities: [60, 75, 85],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
  },
  env: {
    NEXT_PUBLIC_PHOTO_MODE: process.env.PHOTO_MODE === 'review' ? 'review' : 'public',
  },
  async redirects() {
    // Browsers and crawlers still ask for /favicon.ico; point them at the real icon.
    return [{ source: '/favicon.ico', destination: '/favicon-48.png', permanent: true }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
