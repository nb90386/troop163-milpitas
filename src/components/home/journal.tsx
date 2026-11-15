import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Photo } from '@/components/photo'
import { adventures } from '@/content/adventures'
import { maybe, pick } from '@/lib/photos'

export function Journal() {
  const [feature, ...rest] = adventures
  const strip = ['sail-rocks', 'welding', 'tower-view', 'archery-silhouettes', 'closing-campfire', 'canvas-tents', 'bouldering'].map((id) => pick(id))
  return (
    <section aria-labelledby="journal-heading" className="section">
      <div className="frame">
        <h2 id="journal-heading" data-reveal className="t-head max-w-[12ch]">
          From the trip log
        </h2>
      </div>

      <div className="mt-14 md:mt-20">
        <ul
          aria-label={`Photos from ${feature.title}`}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[11vw] md:gap-5 md:px-[13.5vw]"
          tabIndex={0}
        >
          {strip.map((p) => (
            <li key={p.id} className="w-[78vw] shrink-0 snap-center md:w-[73vw]">
              <Photo photo={p} ratio="16 / 9" sizes="78vw" quality={75} className="max-md:!aspect-[4/5]" />
            </li>
          ))}
        </ul>
        <div className="frame mt-7">
          <div className="grid-12 gap-y-3 text-[0.9375rem]">
            <div className="col-span-12 md:col-span-3">
              <h3 className="t-title">{feature.title}</h3>
              <Link href={`/adventures/${feature.slug}`} className="link mt-3 inline-flex items-center gap-2 font-medium">
                Read the week day by day <ArrowRight aria-hidden size={16} />
              </Link>
            </div>
            <p className="col-span-6 text-ink-soft md:col-span-3 md:col-start-4">{feature.when}</p>
            <p className="col-span-6 text-ink-soft md:col-span-3">{feature.where}</p>
            <p className="col-span-12 text-ink-soft md:col-span-3">{feature.who}</p>
          </div>
        </div>
      </div>

      <div className="frame mt-24 md:mt-32">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
          {rest.map((a, i) => {
            const cover = a.cover.map(maybe).find(Boolean)
            return (
              <li key={a.slug} data-reveal style={{ ['--i' as string]: i }}>
                <Link href={`/adventures/${a.slug}`} className="group block">
                  {cover ? (
                    <Photo photo={cover} ratio="4 / 3" sizes="(min-width: 768px) 30vw, 100vw" zoom />
                  ) : (
                    <div className="on-dark flex aspect-[4/3] flex-col justify-between bg-forest p-6 text-forest-ink transition-colors duration-300 group-hover:bg-forest-2">
                      <p className="t-small text-forest-soft">{a.who}</p>
                      <dl className="flex gap-8">
                        {a.stats.map((s) => (
                          <div key={s.label}>
                            <dt className="t-small text-forest-soft">{s.label}</dt>
                            <dd className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none tracking-[-0.03em]">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  <h3 className="t-title mt-5 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{a.title}</h3>
                  <p className="t-small mt-1 text-ink-soft">{a.when}</p>
                  <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed">{a.summary}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
