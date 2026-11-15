'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Photo } from '@/components/photo'
import { visitMail } from '@/content/site'
import type { Photo as PhotoT } from '@/lib/photos'

/**
 * The last campfire opens from a small frame to the whole screen as you scroll,
 * then the invitation lands on it. Reduced motion: the full-screen photo, static.
 */
export function Closing({ photo }: { photo: PhotoT }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useTransform(scrollYProgress, [0, 0.55], ['inset(14% 24% 14% 24%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.25, 1])
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1])
  const textY = useTransform(scrollYProgress, [0.45, 0.75], [60, 0])
  const leadOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section ref={ref} aria-labelledby="closing-heading" className="relative h-[240svh] bg-paper motion-reduce:h-auto">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.p
          aria-hidden
          style={{ opacity: leadOpacity }}
          className="rm-static t-small absolute inset-x-0 top-[6%] text-center text-ink-soft motion-reduce:hidden"
        >
          {photo.caption}
        </motion.p>
        <motion.div className="rm-static on-dark absolute inset-0 bg-night" style={{ clipPath: clip }}>
          <motion.div className="rm-static absolute inset-0" style={{ scale }}>
            <Photo photo={photo} fill sizes="(max-aspect-ratio: 1/1) 160vh, 100vw" quality={75} />
          </motion.div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[65%] [background:var(--scrim)]" />
        </motion.div>
        <motion.div style={{ opacity: textOpacity, y: textY }} className="rm-static on-dark frame relative flex h-full flex-col justify-end pb-[clamp(2.5rem,9vh,6rem)] text-paper">
          <h2 id="closing-heading" className="font-display text-[clamp(3rem,1.2rem+7.4vw,10rem)] leading-[0.88] tracking-[-0.04em] md:max-w-[12ch]">
            See you Monday.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={visitMail} className="btn">
              Email to visit a meeting
            </a>
            <p className="t-body max-w-[30ch] text-paper/85">We’ll reply with the address.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
