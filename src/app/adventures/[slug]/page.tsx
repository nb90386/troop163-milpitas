import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Photo } from '@/components/photo'
import { TripCover } from '@/components/trip-cover'
import { adventures, getAdventure } from '@/content/adventures'
import { week } from '@/content/week'
import { maybe, photos } from '@/lib/photos'

export function generateStaticParams() {
  return adventures.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps<'/adventures/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const a = getAdventure(slug)
  if (!a) return {}
  const cover = a.cover.map(maybe).find(Boolean)
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/adventures/${a.slug}` },
    openGraph: cover ? { images: [{ url: cover.src, alt: cover.alt }] } : undefined,
  }
}

export default async function AdventurePage({ params }: PageProps<'/adventures/[slug]'>) {
  const { slug } = await params
  const a = getAdventure(slug)
  if (!a) notFound()
  const cover = a.cover.map(maybe).find(Boolean)
  const idx = adventures.indexOf(a)
  const next = adventures[(idx + 1) % adventures.length]
  const extra = (a.photos ?? []).map(maybe).filter((p) => p !== undefined)

  return (
    <article>
      {cover ? (
        <header className="on-dark relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-night text-paper">
          <div className="hero-photo absolute inset-0 -z-10">
            <Photo photo={cover} fill sizes="(max-aspect-ratio: 3/2) 135vh, 100vw" priority />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-3/4 [background:var(--scrim)]" />
          <div className="frame w-full pb-10 md:pb-14">
            <h1 className="hero-line t-head max-w-[14ch] text-[clamp(3rem,1.8rem+5vw,7rem)]">{a.title}</h1>
            <p className="hero-line t-lead mt-5 max-w-[36ch] text-paper/90" style={{ ['--i' as string]: 1 }}>
              {a.summary}
            </p>
          </div>
        </header>
      ) : (
        <header className="frame grid-12 gap-y-10 pt-28 md:pt-36">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="hero-line t-head text-[clamp(3rem,1.8rem+5vw,7rem)]">{a.title}</h1>
            <p className="hero-line t-lead mt-6 max-w-[34ch]" style={{ ['--i' as string]: 1 }}>
              {a.summary}
            </p>
          </div>
          <div className="hero-line col-span-12 lg:col-span-5" style={{ ['--i' as string]: 2 }}>
            <TripCover adventure={a} tall />
          </div>
        </header>
      )}

      <div className="frame">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-10 md:grid-cols-4">
          <div>
            <dt className="t-small text-ink-soft">When</dt>
            <dd className="mt-1">{a.when}</dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">Where</dt>
            <dd className="mt-1">{a.where}</dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">Who</dt>
            <dd className="mt-1">{a.who}</dd>
          </div>
          {a.stats.slice(0, 1).map((s) => (
            <div key={s.label}>
              <dt className="t-small text-ink-soft">{s.label}</dt>
              <dd className="mt-1">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid-12 pb-[var(--section)] pt-6 md:pt-12">
          <div className="prose-journal col-span-12 md:col-span-7 md:col-start-4">
            {a.body.map((b, i) =>
              'p' in b ? (
                <p key={i} className="t-body">
                  {b.p}
                </p>
              ) : (
                <figure key={i} className="my-4">
                  <blockquote className="t-lead">“{b.quote}”</blockquote>
                  <figcaption className="t-small mt-4 text-ink-soft">{b.source}</figcaption>
                </figure>
              ),
            )}
          </div>
        </div>
      </div>

      {a.week && (
        <section aria-labelledby="days-heading" className="bg-paper-2 py-[var(--section)]">
          <div className="frame">
            <h2 id="days-heading" className="t-head">
              Day by day
            </h2>
            <ol className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
              {week.map((d, i) => {
                const lead = d.photo.map(maybe).find(Boolean)
                const others = photos.filter((p) => p.day === d.day && p.source === 'hi-sierra-2023' && p.id !== lead?.id).slice(0, 3)
                return (
                  <li key={d.day} className="grid-12 gap-y-6">
                    <div className={`col-span-12 md:col-span-4 ${i % 2 ? 'md:order-2 md:col-start-9' : ''}`}>
                      <h3 data-reveal className="t-title">
                        {d.title}
                      </h3>
                      <p data-reveal className="t-small mt-1 text-ink-soft">
                        {d.weekday}, {d.date}, 2023
                      </p>
                      <p data-reveal style={{ ['--i' as string]: 1 }} className="t-body mt-4 max-w-[34ch]">
                        {d.text}
                      </p>
                    </div>
                    <div className={`col-span-12 md:col-span-8 ${i % 2 ? 'md:order-1 md:col-start-1' : ''}`}>
                      {lead && (
                        <figure data-reveal="mask">
                          <Photo photo={lead} ratio="3 / 2" sizes="(min-width: 768px) 66vw, 100vw" />
                          <figcaption className="t-small mt-2 text-ink-soft">{lead.caption}</figcaption>
                        </figure>
                      )}
                      {others.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {others.map((p) => (
                            <figure key={p.id}>
                              <Photo photo={p} ratio="1 / 1" sizes="(min-width: 768px) 22vw, 33vw" quality={60} />
                              <figcaption className="sr-only">{p.caption}</figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      )}

      {!a.week && extra.length > 0 && (
        <section aria-label="More photos" className="frame grid grid-cols-2 gap-3 pb-[var(--section)] md:grid-cols-3">
          {extra.map((p) => (
            <Photo key={p.id} photo={p} ratio="4 / 3" sizes="33vw" />
          ))}
        </section>
      )}

      <footer className="frame flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between">
        <p className="t-small max-w-[48ch] text-ink-soft">{a.sourceNote}</p>
        <nav aria-label="More trips" className="flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/adventures" className="link inline-flex items-center gap-2 font-medium">
            <ArrowLeft aria-hidden size={16} /> All adventures
          </Link>
          <Link href={`/adventures/${next.slug}`} className="link inline-flex items-center gap-2 font-medium">
            Next: {next.title} <ArrowRight aria-hidden size={16} />
          </Link>
        </nav>
      </footer>
    </article>
  )
}
