import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Photo } from '@/components/photo'
import { PhotoBand } from '@/components/photo-band'
import { TripCover } from '@/components/trip-cover'
import { adventures } from '@/content/adventures'
import { maybe, pick } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Adventures',
  description: 'The Troop 163 and 2163 trip journal: Camp Hi-Sierra 2023, snow camping, the Clavey backpacking trip and Mount Tamalpais.',
  alternates: { canonical: '/adventures' },
}

export default function AdventuresPage() {
  const [feature, ...rest] = adventures
  return (
    <>
      <PageHeader
        title="Adventures"
        lead="Where the troops have been, written from what we can show: photos, dates and Scouts’ own words. More trips get added as Scouts write them up."
      />

      <section aria-labelledby="feature-title" className="frame pt-16 md:pt-24">
        <Link href={`/adventures/${feature.slug}`} className="group grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Photo photo={pick(...feature.cover)} ratio="16 / 10" sizes="(min-width: 1024px) 66vw, 100vw" zoom priority />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="t-small text-ink-soft">{feature.when}</p>
            <h2 id="feature-title" className="t-head mt-2 text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
              {feature.title}
            </h2>
            <p className="t-body mt-4 max-w-[38ch]">{feature.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium">
              Read the week day by day <ArrowRight aria-hidden size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      <div className="mt-[var(--section)]">
        <PhotoBand photo={pick('tower-view')} />
      </div>

      <section aria-labelledby="older-heading" className="frame py-[var(--section)]">
        <h2 id="older-heading" className="t-title">
          Earlier trips
        </h2>
        <ul className="mt-10 flex flex-col gap-16 md:gap-20">
          {rest.map((a) => {
            const cover = a.cover.map(maybe).find(Boolean)
            return (
              <li key={a.slug} data-reveal>
                <Link href={`/adventures/${a.slug}`} className="group grid-12 items-start gap-y-5">
                  <div className="col-span-12 md:col-span-5">
                    {cover ? <Photo photo={cover} ratio="4 / 3" sizes="(min-width: 768px) 40vw, 100vw" zoom /> : <TripCover adventure={a} />}
                  </div>
                  <div className="col-span-12 md:col-span-6 md:col-start-7">
                    <h3 className="t-head text-[clamp(2rem,1.5rem+2vw,3.25rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">{a.title}</h3>
                    <p className="t-small mt-3 text-ink-soft">
                      {a.when} · {a.who}
                    </p>
                    <p className="t-body mt-4 max-w-[44ch]">{a.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-medium">
                      Read it <ArrowRight aria-hidden size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
