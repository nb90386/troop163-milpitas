'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { nav, visitMail } from '@/content/site'

const ease = [0.32, 0.72, 0, 1] as const

export function SiteHeader() {
  const pathname = usePathname()
  const overHero = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu whenever the route changes (React's "adjust state during render" pattern).
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const btn = menuBtn.current
    const first = panel.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>('a,button')]
        const firstEl = items[0]
        const lastEl = items[items.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn?.focus()
    }
  }, [open])

  const solid = !overHero || scrolled
  const tone = solid ? 'text-ink' : 'text-paper on-dark'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[var(--z-header)] transition-[background-color,box-shadow,transform] duration-300 ${
          solid ? 'bg-paper/95 shadow-[0_1px_0_rgb(30_38_34/0.08)]' : 'bg-transparent'
        }`}
      >
        <div className={`frame flex h-16 items-center justify-between gap-6 md:h-[4.5rem] ${tone}`}>
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-[1.625rem] leading-none tracking-[-0.03em]">Troop 163</span>
            <span className={`hidden text-sm sm:inline ${solid ? 'text-ink-soft' : 'text-paper/80'}`}>&amp; 2163 · Milpitas</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="group relative px-3 py-2 text-[0.9375rem] font-medium"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-[2px] origin-left bg-current transition-transform duration-300 ease-[var(--ease-out)] ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    } group-hover:scale-x-100`}
                  />
                </Link>
              )
            })}
            <a href={visitMail} className="btn ml-4 !min-h-0 !py-2.5">
              Come visit
            </a>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.9375rem] font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="h-[2px] w-full bg-current" />
              <span className="h-[2px] w-3/4 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-[var(--z-menu)] flex flex-col bg-forest text-forest-ink"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease }}
          >
            <div className="frame flex h-16 w-full items-center justify-between">
              <Link href="/" className="font-display text-[1.625rem] leading-none tracking-[-0.03em]" onClick={() => setOpen(false)}>
                Troop 163
              </Link>
              <button type="button" className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.9375rem] font-medium" onClick={() => setOpen(false)}>
                Close
                <span aria-hidden className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-[2px] w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-[2px] w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>
            <nav aria-label="Mobile" className="frame mt-6 flex w-full flex-1 flex-col">
              <ul className="flex flex-col">
                {[{ href: '/', label: 'Home' }, ...nav, { href: '/contact', label: 'Contact' }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.12 + i * 0.045, duration: 0.5, ease }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className="block py-2 font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-[1.05] tracking-[-0.03em] aria-[current=page]:text-sage"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
                <a href={visitMail} className="btn w-full justify-center">
                  Come to a Monday meeting
                </a>
                <p className="t-small text-forest-soft">Mondays, 6:30–8:00 PM in Milpitas. Email us for the address.</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
