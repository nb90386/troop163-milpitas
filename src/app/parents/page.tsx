import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Photo } from '@/components/photo'
import { site, visitMail } from '@/content/site'
import { pick } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Parents',
  description: 'Practical information for Troop 163 and 2163 families: meetings, summer camp, health forms, Youth Protection and where to find the calendar.',
  alternates: { canonical: '/parents' },
}

const resources = [
  {
    title: 'Annual Health and Medical Record',
    text: 'Every Scout needs Parts A and B on file for any activity. Part C, signed by a doctor, is needed for summer camp and other events longer than 72 hours.',
    href: site.links.healthForm,
    cta: 'Get the form',
  },
  {
    title: 'Youth Protection',
    text: 'The rules every unit follows: two registered adults at every activity, no one-on-one contact between an adult and a Scout, and parents copied on messages to Scouts.',
    href: site.links.youthProtection,
    cta: 'Read the policy',
  },
  {
    title: 'Ranks and merit badges',
    text: 'Official requirements for every rank from Scout to Eagle, and the full merit badge list.',
    href: site.links.advancement,
    cta: 'See requirements',
  },
  {
    title: 'Troop member site',
    text: 'Registered families log in to TroopWebHost for the calendar, sign-ups and troop records.',
    href: site.links.troopWebHost,
    cta: 'Log in',
  },
]

export default function ParentsPage() {
  return (
    <>
      <PageHeader
        title="For parents"
        lead="The practical side of Scouting: when meetings happen, what summer camp is like, which forms you’ll need and who to ask."
      />

      <section aria-label="Key details" className="frame pt-14 md:pt-20">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Meetings', v: `${site.meetings.day}, ${site.meetings.time}` },
            { k: 'Where', v: 'Milpitas. Email us for the address.' },
            { k: 'Contact', v: site.email, href: visitMail },
            { k: 'Sponsor', v: site.sponsor },
          ].map((f) => (
            <div key={f.k} className="bg-paper-2 p-6">
              <dt className="t-small text-ink-soft">{f.k}</dt>
              <dd className="mt-2 break-words text-[1.0625rem] font-medium">
                {f.href ? (
                  <a className="link" href={f.href}>
                    {f.v}
                  </a>
                ) : (
                  f.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="camp" className="section frame">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <h2 id="camp" data-reveal className="t-head">
              Summer camp
            </h2>
            <div className="mt-6 space-y-4">
              <p data-reveal className="t-body">
                In July 2023 both troops spent a week at Camp Hi-Sierra, the Silicon Valley Monterey Bay Council’s camp near Long
                Barn, off Highway 108. Scouts sleep in canvas wall tents by troop, eat in the dining hall and spend the days in merit
                badge classes.
              </p>
              <p data-reveal className="t-body">
                Program areas that week included the waterfront and sailing on Pinecrest Lake, the climbing tower and bouldering,
                archery, metalwork and welding, handicraft, pioneering and wilderness survival. Evenings brought campfires.
              </p>
              <p data-reveal className="t-body">
                Dates, fees and the packing list change every year, so ask us for this year’s details before you buy anything.
              </p>
            </div>
            <a data-reveal href={site.links.campHiSierra} className="link mt-6 inline-block font-medium" rel="noopener">
              Camp Hi-Sierra on the council site
            </a>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-6 md:col-start-7">
            <div data-reveal="mask" className="col-span-2">
              <Photo photo={pick('tower-view')} ratio="3 / 2" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div data-reveal="mask" style={{ ['--i' as string]: 1 }}>
              <Photo photo={pick('canoe-red')} ratio="1 / 1" sizes="25vw" />
            </div>
            <div data-reveal="mask" style={{ ['--i' as string]: 2 }}>
              <Photo photo={pick('handicraft-sign')} ratio="1 / 1" sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="forms" className="bg-paper-2 py-[var(--section)]">
        <div className="frame">
          <h2 id="forms" className="t-head">
            Forms and rules
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {resources.map((r, i) => (
              <li key={r.title} data-reveal style={{ ['--i' as string]: i % 2 }} className="max-w-[44ch]">
                <h3 className="t-title">{r.title}</h3>
                <p className="t-body mt-3">{r.text}</p>
                <a href={r.href} className="link mt-4 inline-block font-medium" rel="noopener">
                  {r.cta}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="help" className="section frame">
        <div className="grid-12 gap-y-8">
          <h2 id="help" data-reveal className="t-head col-span-12 md:col-span-5">
            How you can help
          </h2>
          <div className="col-span-12 space-y-4 md:col-span-6 md:col-start-7">
            <p data-reveal className="t-body">
              Drive to a campout. Cook one weekend. Teach a merit badge you know from work. Join the committee that handles money,
              paperwork and planning. Any of it helps, and none of it requires being outdoorsy.
            </p>
            <p data-reveal className="t-body">
              Every adult volunteer completes Scouting America’s free online Youth Protection training before working with Scouts.
            </p>
            <a data-reveal href={visitMail} className="btn mt-4">
              Email the troop
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
