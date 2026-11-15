'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Photo } from '@/components/photo'
import type { Photo as PhotoT } from '@/lib/photos'

/** Positions on desktop (percent of the band) and drift rates. Hand-placed, not a grid. */
const SPOTS = [
  { left: 24, top: 6, w: 13, rate: 10 },
  { left: 44, top: 0, w: 11, rate: -6 },
  { left: 63, top: 9, w: 13, rate: 8 },
  { left: 22, top: 58, w: 11, rate: -9 },
  { left: 38, top: 72, w: 13, rate: 6 },
  { left: 57, top: 66, w: 11, rate: -7 },
  { left: 70, top: 46, w: 10, rate: 12 },
  { left: 13, top: 30, w: 10, rate: -5 },
]

function Drift({ progress, rate, children }: { progress: MotionValue<number>; rate: number; children: React.ReactNode }) {
  const y = useTransform(progress, [0, 1], [`${rate}%`, `${-rate}%`])
  return <motion.div style={{ y }}>{children}</motion.div>
}

export function Gathered({ photos, total }: { photos: PhotoT[]; total: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} aria-labelledby="gallery-heading" className="section overflow-hidden">
      {/* Desktop: photos scattered round the heading */}
      <div className="frame relative hidden h-[min(100svh,58rem)] md:block">
        {photos.slice(0, SPOTS.length).map((p, i) => {
          const s = SPOTS[i]
          const img = <Photo photo={p} ratio="9 / 10" sizes="14vw" quality={60} />
          return (
            <div key={p.id} className="absolute" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.w}%` }}>
              {/* Same element tree on server and client; reduced motion just zeroes the drift. */}
              <Drift progress={scrollYProgress} rate={reduce ? 0 : s.rate}>
                {img}
              </Drift>
            </div>
          )
        })}
        <div className="absolute left-1/2 top-1/2 w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-paper px-8 py-7 text-center">
          <h2 id="gallery-heading" className="t-title">
            {total} photos from one week
          </h2>
          <p className="t-body mt-3">Parents shared all of them. We kept the ones you’d want to see.</p>
          <Link href="/gallery" className="link-strong mt-4 inline-block font-medium">
            Open the gallery
          </Link>
        </div>
      </div>

      {/* Phone: five photos offset around the heading */}
      <div className="frame md:hidden">
        <div className="grid grid-cols-3 items-end gap-3">
          <div className="col-start-1 w-full">
            <Photo photo={photos[0]} ratio="9 / 10" sizes="30vw" quality={60} />
          </div>
          <div className="col-start-3 w-full -translate-y-6">
            <Photo photo={photos[1]} ratio="9 / 10" sizes="30vw" quality={60} />
          </div>
        </div>
        <div className="py-10 text-center">
          <h2 className="t-title">{total} photos from one week</h2>
          <p className="t-body mt-3">Parents shared all of them. We kept the ones you’d want to see.</p>
          <Link href="/gallery" className="link-strong mt-4 inline-block font-medium">
            Open the gallery
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {photos.slice(2, 5).map((p, i) => (
            <div key={p.id} className={i === 1 ? 'translate-y-8' : ''}>
              <Photo photo={p} ratio="9 / 10" sizes="30vw" quality={60} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
