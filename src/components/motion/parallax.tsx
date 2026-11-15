'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/**
 * Moves its children against the scroll while the element crosses the screen.
 * `shift` is the total travel in percent of the element's own height.
 * Reduced motion: `.rm-static` cancels the transform in CSS (same DOM on server and client).
 */
export function Parallax({ shift = 10, className = '', children }: { shift?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift / 2}%`, `${shift / 2}%`])
  return (
    <div ref={ref} className={className}>
      <motion.div className="rm-static h-full" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

/** Hero layers: each moves at its own rate through the first screen of scroll. */
export function HeroLayer({ rate, fade, className = '', children }: { rate: number; fade?: boolean; className?: string; children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * rate])
  const opacity = useTransform(scrollY, [0, 560], [1, 0])
  return (
    <motion.div className={`rm-static ${className}`} style={fade ? { y, opacity } : { y }}>
      {children}
    </motion.div>
  )
}
