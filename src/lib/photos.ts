import meta from '@/content/photo-meta.generated.json'
import { photoManifest, type PhotoCategory, type PhotoEntry } from '@/content/photo-manifest'

export type Photo = PhotoEntry & {
  src: string
  width: number
  height: number
  blurDataURL: string
}

/** "review" builds include photos of identifiable youth; public builds never do. */
export const photoMode: 'public' | 'review' =
  process.env.NEXT_PUBLIC_PHOTO_MODE === 'review' ? 'review' : 'public'

const metaMap = meta as Record<string, { src: string; width: number; height: number; blurDataURL: string }>

const all: Photo[] = photoManifest
  .filter((p) => metaMap[p.id])
  .map((p) => ({ ...p, ...metaMap[p.id] }))

export const photos: Photo[] = all.filter((p) => photoMode === 'review' || p.release === 'public')

const byId = new Map(photos.map((p) => [p.id, p]))

/** Returns the first available photo from a list of preferences. */
export function pick(...ids: string[]): Photo {
  for (const id of ids) {
    const p = byId.get(id)
    if (p) return p
  }
  throw new Error(`No available photo among: ${ids.join(', ')}`)
}

export function maybe(id: string): Photo | undefined {
  return byId.get(id)
}

export const categories: { id: PhotoCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'water', label: 'On the water' },
  { id: 'climbing', label: 'Climbing' },
  { id: 'skills', label: 'Skills' },
  { id: 'campsite', label: 'Camp life' },
  { id: 'night', label: 'After dark' },
  { id: 'place', label: 'The place' },
]

export { objectPosition } from '@/lib/focal'

export const albumStats = {
  photos: 523,
  videos: 512,
  title: '2023: Hi-Sierra',
  dates: 'July 2–8, 2023',
}
