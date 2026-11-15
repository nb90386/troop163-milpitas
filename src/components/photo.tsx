import Image from 'next/image'
import { objectPosition } from '@/lib/focal'
import type { Photo as PhotoT } from '@/lib/photos'

interface Props {
  photo: PhotoT
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Omit to use the photo's own ratio. */
  ratio?: string
  sizes: string
  priority?: boolean
  className?: string
  zoom?: boolean
  quality?: 60 | 75 | 85
  /** Decorative duplicates (same photo shown twice) can hide from assistive tech. */
  decorative?: boolean
  fill?: boolean
}

/** A cropped, focal-point-aware photo frame. Square corners, tone-step placeholder. */
export function Photo({ photo, ratio, sizes, priority, className = '', zoom, quality = 75, decorative, fill }: Props) {
  const style = fill ? undefined : { aspectRatio: ratio ?? `${photo.width} / ${photo.height}` }
  return (
    <div className={`photo ${zoom ? 'photo-zoom' : ''} ${fill ? 'absolute inset-0' : ''} ${className}`} style={style}>
      <Image
        src={photo.src}
        alt={decorative ? '' : photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        style={{ objectPosition: objectPosition(photo) }}
      />
    </div>
  )
}
