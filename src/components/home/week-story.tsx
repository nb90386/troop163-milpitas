'use client'

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Photo } from '@/components/photo'
import type { Photo as PhotoT } from '@/lib/photos'
import type { WeekDay } from '@/content/week'

export interface WeekCard extends WeekDay {
  image: PhotoT
}

/** Earth tones for the card panels, one per day, at a similar lightness. */
const TONES = ['#2c4a3f', '#4d3e2d', '#2e4654', '#5a3a2b', '#3d4a2b', '#463a46', '#2b3d3b']

const CARD_W = 560
const GAP = 40

/**
 * Signature scene. Desktop with motion allowed: the aerial forest photo stays
 * pinned while the seven day-cards cross it right-to-left, tied to scroll.
 * Everyone else gets the same cards stacked vertically.
 */
export function WeekStory({ days, ground }: { days: WeekCard[]; ground: PhotoT }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const [pinned, setPinned] = useState(false)
  const [geo, setGeo] = useState({ start: 0, end: 0, height: 0 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px)')
    const update = () => setPinned(mq.matches && !reduce)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!pinned) return
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const trackW = days.length * CARD_W + (days.length - 1) * GAP
      // First card enters to the right of the heading; the last one finishes centred.
      const start = Math.max(vw * 0.5, 620)
      const end = vw / 2 - CARD_W / 2 - (days.length - 1) * (CARD_W + GAP)
      const travel = start - end
      // 1px of scroll moves the track ~1.7px, keeping the pin under ~3.5 screens.
      setGeo({ start, end, height: vh + travel / 1.7 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned, days.length])

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [geo.start, geo.end])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const headingX = useTransform(scrollYProgress, [0, 0.12], [0, -60])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!pinned) return
    // The card nearest the centre of the screen is "today".
    const centre = window.innerWidth / 2
    const trackX = geo.start + (geo.end - geo.start) * v
    const i = Math.round((centre - trackX - CARD_W / 2) / (CARD_W + GAP))
    setActive(Math.max(0, Math.min(days.length - 1, i)))
  })

  const jumpTo = (i: number) => {
    const el = wrap.current
    if (!el) return
    if (!pinned) {
      document.getElementById(`day-${days[i].day}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      return
    }
    const centre = window.innerWidth / 2
    const targetX = centre - CARD_W / 2 - i * (CARD_W + GAP)
    const p = (geo.start - targetX) / (geo.start - geo.end)
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + Math.max(0, Math.min(1, p)) * range, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="week-heading" className="on-dark relative bg-night text-paper">
      <div ref={wrap} style={pinned ? { height: geo.height } : undefined} className="relative">
        <div className={pinned ? 'sticky top-0 h-[100svh] overflow-hidden' : 'relative'}>
          {/* Held ground photo */}
          <div aria-hidden className={pinned ? 'absolute inset-0' : 'absolute inset-x-0 top-0 h-[70svh]'}>
            <Photo photo={ground} fill sizes="(max-aspect-ratio: 3/2) 150vh, 100vw" quality={60} decorative className="brightness-[0.5]" />
            {!pinned && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night/40 to-night" />}
          </div>

          <motion.div
            style={pinned ? { opacity: headingOpacity, x: headingX } : undefined}
            className={`relative z-10 ${pinned ? 'absolute left-[var(--gutter)] top-[22svh] max-w-[30rem]' : 'frame pb-12 pt-[22svh]'}`}
          >
            <h2 id="week-heading" className="t-head max-w-[11ch]">
              Seven days at Hi-Sierra
            </h2>
            <p className="t-body mt-5 max-w-[32ch] text-paper/85">
              July 2–8, 2023, told in order from the photos parents shared that week.
            </p>
          </motion.div>

          <motion.ol
            ref={track}
            style={pinned ? { x, width: days.length * CARD_W + (days.length - 1) * GAP } : undefined}
            className={
              pinned
                ? 'absolute left-0 top-1/2 flex -translate-y-1/2 gap-10'
                : 'frame relative z-10 grid gap-6 pb-[var(--section)] md:grid-cols-2 md:gap-8'
            }
          >
            {days.map((d, i) => (
              <li
                key={d.day}
                id={`day-${d.day}`}
                className={`flex shrink-0 flex-col overflow-hidden ${pinned ? 'h-[min(600px,76svh)] w-[560px]' : 'w-full'}`}
              >
                <div className={pinned ? 'relative min-h-0 flex-1' : 'relative aspect-[4/3]'}>
                  <Photo photo={d.image} fill sizes={pinned ? '560px' : '(min-width: 640px) 40rem, 100vw'} />
                </div>
                <div className="flex shrink-0 flex-col gap-3 p-6" style={{ background: TONES[i % TONES.length] }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="t-title">{d.title}</h3>
                    <p className="t-small shrink-0 text-paper/75">
                      {d.weekday}, {d.date}
                    </p>
                  </div>
                  <p className="max-w-[46ch] text-[0.9375rem] leading-[1.5] text-paper/90">{d.text}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          {pinned && (
            <nav aria-label="Jump to a day" className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night/85 to-transparent px-[var(--gutter)] pb-6 pt-14">
              <ol className="flex gap-1">
                {days.map((d, i) => (
                  <li key={d.day}>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={active === i ? 'step' : undefined}
                      className="group flex min-w-[4.25rem] flex-col items-start gap-2 px-1 py-2 text-left text-sm text-paper/70 transition-colors duration-200 hover:text-paper aria-[current=step]:text-paper"
                    >
                      <span aria-hidden className="relative block h-[3px] w-full overflow-hidden bg-paper/25">
                        <span className="absolute inset-0 origin-left scale-x-0 bg-sage transition-transform duration-500 ease-[var(--ease-out)] group-aria-[current=step]:scale-x-100" />
                      </span>
                      <span>
                        {d.weekday.slice(0, 3)}
                        <span className="sr-only">
                          {d.weekday.slice(3)}, {d.date}: {d.title}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}
