'use client'

import Image from 'next/image'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { objectPosition } from '@/lib/focal'
import type { Photo } from '@/lib/photos'

type Cat = { id: string; label: string }

const ease = [0.23, 1, 0.32, 1] as const

export function Gallery({ photos, categories }: { photos: Photo[]; categories: Cat[] }) {
  const reduce = useReducedMotion()
  const [cat, setCat] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: photos.length }
    for (const p of photos) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [photos])
  const visibleCats = categories.filter((c) => counts[c.id])
  const shown = useMemo(() => (cat === 'all' ? photos : photos.filter((p) => p.category === cat)), [photos, cat])

  // Deep links: /gallery?photo=<id> opens the lightbox; Back closes it.
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get('photo')
      setOpenId(id && photos.some((p) => p.id === id) ? id : null)
    }
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [photos])

  const open = (id: string) => {
    window.history.pushState({ photo: id }, '', `?photo=${id}`)
    setOpenId(id)
  }
  const close = useCallback(() => {
    if (window.history.state?.photo) window.history.back()
    else {
      window.history.replaceState(null, '', window.location.pathname)
      setOpenId(null)
    }
  }, [])
  const go = useCallback(
    (dir: 1 | -1) => {
      const list = shown.some((p) => p.id === openId) ? shown : photos
      const i = list.findIndex((p) => p.id === openId)
      const next = list[(i + dir + list.length) % list.length]
      window.history.replaceState({ photo: next.id }, '', `?photo=${next.id}`)
      setOpenId(next.id)
    },
    [shown, photos, openId],
  )

  return (
    <>
      <div role="group" aria-label="Filter photos" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1">
        <LayoutGroup>
          {visibleCats.map((c) => {
            const active = c.id === cat
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCat(c.id)}
                className={`relative flex min-h-11 shrink-0 items-center gap-2 rounded-[2px] px-4 text-[0.9375rem] font-medium transition-[color,transform] duration-200 active:scale-[0.97] ${
                  active ? 'text-paper' : 'text-ink hover:bg-paper-3/60'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-[2px] bg-forest"
                    transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative">{c.label}</span>
                <span className={`relative text-sm tabular-nums ${active ? 'text-paper/70' : 'text-ink-soft'}`}>{counts[c.id]}</span>
              </button>
            )
          })}
        </LayoutGroup>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} photos
      </p>

      <motion.ul layout={!reduce} className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="mb-3 break-inside-avoid md:mb-4"
            >
              <button
                type="button"
                onClick={() => open(p.id)}
                className="group block w-full text-left"
                aria-label={`Open photo: ${p.caption}`}
              >
                <span className="photo photo-zoom block" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
                    quality={60}
                    placeholder="blur"
                    blurDataURL={p.blurDataURL}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    style={{ objectPosition: objectPosition(p) }}
                  />
                </span>
                <span className="t-small mt-2 block text-ink-soft transition-colors duration-200 group-hover:text-ink">{p.caption}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {openId && (
          <Lightbox
            key="lightbox"
            photo={photos.find((p) => p.id === openId)!}
            list={shown.some((p) => p.id === openId) ? shown : photos}
            onClose={close}
            onStep={go}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function Lightbox({ photo, list, onClose, onStep }: { photo: Photo; list: Photo[]; onClose: () => void; onStep: (d: 1 | -1) => void }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const startX = useRef<number | null>(null)
  const [loaded, setLoaded] = useState<string | null>(null)
  const index = list.findIndex((p) => p.id === photo.id)
  const neighbours = [list[(index + 1) % list.length], list[(index - 1 + list.length) % list.length]]

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeBtn.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onStep(1)
      else if (e.key === 'ArrowLeft') onStep(-1)
      else if (e.key === 'Tab' && ref.current) {
        const items = [...ref.current.querySelectorAll<HTMLElement>('button')]
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="on-dark fixed inset-0 z-[var(--z-lightbox)] flex flex-col bg-night/97 text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.25, ease }}
      onPointerDown={(e) => {
        startX.current = e.clientX
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        startX.current = null
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1)
      }}
    >
      <div className="frame flex h-16 w-full shrink-0 items-center justify-between">
        <p className="t-small tabular-nums text-paper/70" aria-live="polite">
          {index + 1} of {list.length}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className="-mr-2 flex h-11 items-center gap-2 px-2 font-medium">
          Close <X aria-hidden size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 touch-pan-y">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={photo.id}
            className="absolute inset-0 mx-[var(--gutter)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.3, ease }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              onLoad={() => setLoaded(photo.id)}
              className="object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
        {loaded !== photo.id && (
          <span aria-hidden className="absolute bottom-4 left-1/2 h-[2px] w-16 -translate-x-1/2 overflow-hidden bg-paper/20">
            <span className="block h-full w-1/3 animate-[loadbar_900ms_linear_infinite] bg-paper/80" />
          </span>
        )}
        {/* Warm the cache for neighbours so stepping feels instant */}
        <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
          {neighbours.map((n) => (
            <Image key={n.id} src={n.src} alt="" width={64} height={64} sizes="100vw" quality={85} />
          ))}
        </div>
      </div>

      <div className="frame flex w-full shrink-0 items-center justify-between gap-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button type="button" onClick={() => onStep(-1)} className="flex h-12 w-12 shrink-0 items-center justify-center bg-paper/10 transition-colors hover:bg-paper/20 active:scale-[0.96]" aria-label="Previous photo">
          <ArrowLeft aria-hidden size={20} strokeWidth={1.75} />
        </button>
        <div className="min-w-0 text-center">
          <p className="text-[0.9375rem] font-medium">{photo.caption}</p>
          <p className="t-small mt-0.5 text-paper/60">
            {photo.source === 'hi-sierra-2023' ? 'Camp Hi-Sierra' : 'Troop 163 archive'}
            {photo.date ? `, ${new Date(photo.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
          </p>
        </div>
        <button type="button" onClick={() => onStep(1)} className="flex h-12 w-12 shrink-0 items-center justify-center bg-paper/10 transition-colors hover:bg-paper/20 active:scale-[0.96]" aria-label="Next photo">
          <ArrowRight aria-hidden size={20} strokeWidth={1.75} />
        </button>
      </div>
    </motion.div>
  )
}
