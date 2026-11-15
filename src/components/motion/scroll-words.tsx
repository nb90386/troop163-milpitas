'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

// 0.55 is the floor: unread words still pass WCAG AA large-text contrast (about 3.5:1 on paper).
function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.55, 1])
  return (
    <motion.span style={{ opacity }} className="rm-static inline-block">
      {children}
    </motion.span>
  )
}

/**
 * A sentence that inks in word by word as it scrolls up the screen.
 * Reduced motion: `.rm-static` pins every word at full strength (same DOM, so hydration is stable).
 */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = (i / words.length) * 0.9
        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, start + 0.12]}>
              {w}
            </Word>{' '}
          </span>
        )
      })}
    </p>
  )
}
