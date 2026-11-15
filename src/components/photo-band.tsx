import { Photo } from '@/components/photo'
import { Parallax } from '@/components/motion/parallax'
import type { Photo as PhotoT } from '@/lib/photos'

/** A full-bleed photo that drifts against the scroll, with its caption laid on the bottom edge. */
export function PhotoBand({ photo, line }: { photo: PhotoT; line?: string }) {
  return (
    <figure className="on-dark relative h-[72svh] min-h-[22rem] overflow-hidden bg-night text-paper md:h-[86svh]">
      <Parallax shift={14} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <div className="relative h-full">
          <Photo photo={photo} fill sizes="(max-aspect-ratio: 1/1) 160vh, 100vw" quality={75} />
        </div>
      </Parallax>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 [background:var(--scrim)]" />
      <figcaption className="frame absolute inset-x-0 bottom-0 pb-8 md:pb-12">
        {line ? <p className="font-display max-w-[18ch] text-[clamp(2.25rem,1.2rem+4vw,5.5rem)] leading-[0.95] tracking-[-0.035em]">{line}</p> : null}
        <p className="t-small mt-3 text-paper/75">{photo.caption}</p>
      </figcaption>
    </figure>
  )
}
