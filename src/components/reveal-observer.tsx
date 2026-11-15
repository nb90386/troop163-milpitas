'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Adds `.is-in` to every [data-reveal] element as it scrolls into view.
 * Elements are only hidden while html.js is set (see globals.css), so if this
 * never runs the page is still fully readable.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    observe()
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })
    // Safety net: anything still hidden after 2.5s (e.g. observer quirks) is shown.
    const t = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add('is-in')
      })
    }, 2500)
    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(t)
    }
  }, [pathname])

  return null
}
