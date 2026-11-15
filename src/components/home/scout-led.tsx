import Link from 'next/link'
import { Photo } from '@/components/photo'
import { pick } from '@/lib/photos'
import { site } from '@/content/site'
import { Parallax } from '@/components/motion/parallax'

export function ScoutLed() {
  const photo = pick('scout-teaching', 'campsite-lineup')
  const facts = [
    { k: 'Troop 163', v: `Boys, since ${site.troops.boys.founded}` },
    { k: 'Troop 2163', v: `Girls, since ${site.troops.girls.founded}` },
    { k: 'Meetings', v: `${site.meetings.day}, ${site.meetings.time}` },
    { k: 'Sponsor', v: site.sponsor },
    { k: 'Service, 2020', v: 'Masks for Milpitas Fire' },
    { k: 'Serving', v: site.serving },
  ]
  return (
    <section aria-labelledby="led-heading" className="section bg-paper-2">
      <div className="frame">
        <div className="grid-12 gap-y-6">
          <h2 id="led-heading" data-reveal className="t-head col-span-12 md:col-span-6">
            Scouts run it.
          </h2>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p data-reveal style={{ ['--i' as string]: 1 }} className="t-body">
              Scouts elect their leaders, plan the menus and teach the younger Scouts. Adults keep it safe and do the driving.
            </p>
            <Link data-reveal style={{ ['--i' as string]: 2 }} href="/about" className="link mt-5 inline-block font-medium">
              How the troop works
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-12">
          <div data-reveal="mask" className="relative md:col-span-8">
            <Parallax shift={-8} className="overflow-hidden"><Photo photo={photo} ratio="16 / 10" sizes="(min-width: 768px) 66vw, 100vw" className="scale-[1.08]" /></Parallax>
            <p className="t-small bg-paper p-5 text-ink md:absolute md:right-0 md:top-0 md:w-[20rem]">
              {photo.id === 'scout-teaching'
                ? 'Camp, Thursday morning. A Scout runs the lesson at the whiteboard.'
                : 'Evening flags in the campsite. Scouts run the ceremony.'}
            </p>
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 }} className="on-dark flex flex-col justify-between gap-10 bg-forest p-7 text-forest-ink md:col-span-4 md:p-8">
            <div>
              <p className="font-display text-[clamp(3rem,2rem+3vw,5.5rem)] leading-[0.9] tracking-[-0.03em]">“{site.motto}”</p>
              <p className="t-small mt-2 text-forest-soft">The troop motto</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="t-small text-forest-soft">{f.k}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
