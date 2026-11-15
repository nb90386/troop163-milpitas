import type { Metadata } from 'next'
import { Gallery } from '@/components/gallery/gallery'
import { PageHeader } from '@/components/page-header'
import { albumStats, categories, photos, photoMode } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from Troop 163 and Troop 2163 at Camp Hi-Sierra, July 2023: sailing, climbing, campfires and camp life.',
  alternates: { canonical: '/gallery' },
}

export default function GalleryPage() {
  // Chronological through the week, so every column mixes activities.
  const list = photos.filter((p) => p.gallery).sort((a, b) => (a.day ?? 9) - (b.day ?? 9))
  return (
    <>
      <PageHeader
        title="The gallery"
        lead={`Parents shared ${albumStats.photos} photos and ${albumStats.videos} videos from one week at Camp Hi-Sierra. These are the ones we keep coming back to.`}
      />
      <section aria-label="Photos" className="frame pb-[var(--section)] pt-14 md:pt-20">
        <Gallery photos={list} categories={categories} />
        {photoMode === 'public' && (
          <p className="t-small mt-14 max-w-[60ch] text-ink-soft">
            This public version leaves out close-up photos of Scouts while the troop confirms photo permissions with families.
          </p>
        )}
      </section>
    </>
  )
}
