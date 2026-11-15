import type { Faq } from '@/content/faq'

/** Native <details> accordion: works without JS, keyboard accessible by default. */
export function FaqList({ items, tone = 'paper' }: { items: Faq[]; tone?: 'paper' | 'forest' }) {
  return (
    <div className="flex flex-col">
      {items.map((f) => (
        <details key={f.q} className="group py-3.5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[1.1875rem] font-medium leading-snug">
            {f.q}
            <span aria-hidden className="relative block h-3 w-3 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] group-open:rotate-180">
              <span className="absolute left-0 top-1/2 h-[2px] w-[9px] origin-right -translate-y-1/2 rotate-[40deg] bg-current" />
              <span className="absolute right-0 top-1/2 h-[2px] w-[9px] origin-left -translate-y-1/2 -rotate-[40deg] bg-current" />
            </span>
          </summary>
          <p className={`t-body mt-2 max-w-[56ch] pb-1 ${tone === 'forest' ? 'text-forest-soft' : 'text-ink-soft'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
