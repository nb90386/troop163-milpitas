'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Photo } from '@/components/photo'
import type { Photo as PhotoT } from '@/lib/photos'

export interface Activity {
  title: string
  line: string
  photo: PhotoT
}

/** Each panel occupies HOLD svh of scroll: 100 to slide in, the rest to sit still before the next one arrives. */
const HOLD = 140

function Panel({ a, i, n, progress }: { a: Activity; i: number; n: number; progress: MotionValue<number> }) {
  // Progress (0..1 over the whole stack) at a given scroll distance in svh.
  const P = (svh: number) => Math.min(1, Math.max(0, svh / (n * HOLD - 100)))
  const last = i === n - 1
  // While the next panel slides over this one, this one sinks back and dims.
  // Input ranges stay inside 0..1: Motion hands these to the browser's ScrollTimeline.
  const outRange: [number, number] = last ? [0, 1] : [P((i + 1) * HOLD - 100), P((i + 1) * HOLD)]
  const scale = useTransform(progress, outRange, [1, last ? 1 : 0.9])
  const dim = useTransform(progress, outRange, [0, last ? 0 : 0.65])
  // The incoming photo settles from a slight zoom, and its words rise, as it covers the one before.
  const inRange: [number, number] = i === 0 ? [0, 1] : [P(i * HOLD - 100), P(i * HOLD)]
  const enter = useTransform(progress, inRange, i === 0 ? [1, 1] : [1.14, 1])
  const textY = useTransform(progress, inRange, i === 0 ? [0, 0] : [80, 0])

  return (
    <li className="sticky top-0 h-[100svh] overflow-hidden" style={{ marginBottom: `${HOLD - 100}svh` }}>
      <motion.div className="rm-static on-dark relative h-full w-full origin-top overflow-hidden bg-night text-paper" style={{ scale }}>
        <motion.div className="rm-static absolute inset-0" style={{ scale: enter }}>
          <Photo photo={a.photo} fill sizes="(max-aspect-ratio: 1/1) 160vh, 100vw" quality={75} />
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] [background:var(--scrim)]" />
        <motion.div className="frame relative flex h-full flex-col justify-end pb-[clamp(2rem,6vh,4.5rem)]">
          <motion.div className="rm-static grid-12 items-end gap-y-4" style={{ y: textY }}>
            <h3 className="col-span-12 font-display text-[clamp(3rem,1.4rem+7vw,9.5rem)] leading-[0.88] tracking-[-0.04em] md:col-span-8">
              {a.title}
            </h3>
            <div className="col-span-12 md:col-span-4 md:pb-3">
              <p className="t-body max-w-[32ch] text-paper [text-shadow:0_1px_12px_rgb(0_0_0/0.4)]">{a.line}</p>
              <p className="t-small mt-3 text-paper/70">{a.photo.caption}</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div aria-hidden className="rm-static pointer-events-none absolute inset-0 bg-night" style={{ opacity: dim }} />
      </motion.div>
    </li>
  )
}

/**
 * Full-screen activity panels that stack: each one slides up over the last,
 * which sinks back and dims. Pure CSS sticky does the stacking, so it still
 * works (without the scale and dim) with reduced motion or without JS.
 */
export function ActivityStack({ items }: { items: Activity[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <ol ref={ref} className="relative bg-night">
      {items.map((a, i) => (
        <Panel key={a.title} a={a} i={i} n={items.length} progress={scrollYProgress} />
      ))}
    </ol>
  )
}
