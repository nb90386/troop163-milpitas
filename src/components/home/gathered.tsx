'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Photo } from '@/components/photo'
import type { Photo as PhotoT } from '@/lib/photos'

const RATIOS = ['4 / 5', '3 / 2', '1 / 1', '3 / 2', '4 / 5']

function Row({ photos, x }: { photos: PhotoT[]; x: ReturnType<typeof useTransform<number, string>> }) {
  return (
    <motion.ul className="rm-static flex w-max items-center gap-3 md:gap-5" style={{ x }}>
      {photos.map((p, i) => (
        <li key={p.id} className="relative shrink-0 overflow-hidden" style={{ height: 'clamp(11rem, 30vh, 21rem)', aspectRatio: RATIOS[i % RATIOS.length] }}>
          <Photo photo={p} fill sizes="(min-width: 768px) 30vw, 60vw" quality={60} zoom />
        </li>
      ))}
    </motion.ul>
  )
}

/** Two rows of the week's photos sliding past each other with the scroll, the album count between them. */
export function Gathered({ photos, total }: { photos: PhotoT[]; total: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const half = Math.ceil(photos.length / 2)

  return (
    <section ref={ref} aria-labelledby="gallery-heading" className="overflow-hidden pb-[var(--section)] pt-8 md:pt-12">
      <Row photos={photos.slice(0, half)} x={x1} />
      <div className="frame my-10 md:my-14">
        <div className="grid-12 items-end gap-y-5">
          <h2 id="gallery-heading" className="t-head col-span-12 md:col-span-8">
            {total} photos from one week
          </h2>
          <div className="col-span-12 md:col-span-4 md:justify-self-end md:pb-2">
            <Link href="/gallery" className="btn">
              Open the gallery <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Row photos={photos.slice(half)} x={x2} />
      </div>
    </section>
  )
}
