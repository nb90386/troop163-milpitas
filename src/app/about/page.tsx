import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Photo } from '@/components/photo'
import { site } from '@/content/site'
import { pick } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Troop 163 has served Milpitas since 1993. Troop 2163, the first all-girl troop in Milpitas, joined in 2019. How our Scout-led troops work.',
  alternates: { canonical: '/about' },
}

const history = [
  { year: '1993', text: 'Troop 163 starts in Milpitas.' },
  {
    year: '2014',
    text: 'The troop’s old website describes weekly meetings, hikes, backpacking and a week of summer camp each year, plus a fourteen-mile trip on the Clavey and an eight-mile day on Mount Tamalpais.',
  },
  { year: '2019', text: 'Troop 2163 forms on March 1 with six Scouts, and grows to thirteen in its first year. It’s the first all-girl troop in Milpitas.' },
  { year: '2020', text: 'Snow camping at Camp Hi-Sierra in February. In April, meetings move online. Troop 2163 sews masks for the Milpitas Fire Department and runs a back-to-school drive through the Family Giving Tree.' },
  { year: '2021', text: 'A Troop 2163 Scout becomes the first female Eagle Scout in Milpitas.' },
  { year: '2023', text: 'Both troops spend July 2 to 8 at Camp Hi-Sierra.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About the troop"
        lead="Two troops that share a sponsor, a contact address and a lot of campouts. Troop 163 for boys, since 1993. Troop 2163 for girls, since 2019."
        photo={pick('troop-at-dining-hall', 'campsite-lineup')}
      />

      <section aria-labelledby="led" className="section frame">
        <div className="grid-12 gap-y-10">
          <h2 id="led" data-reveal className="t-head col-span-12 md:col-span-5">
            Scouts lead. Adults coach.
          </h2>
          <div className="col-span-12 space-y-5 md:col-span-6 md:col-start-7">
            <p data-reveal className="t-lead">
              “We are a scout led troop and we believe that each scout is on their own unique journey through scouting.”
            </p>
            <p data-reveal className="t-small text-ink-soft">
              From the troops’ own description
            </p>
            <p data-reveal className="t-body">
              That line comes from our troop site. In practice, Scouts BSA troops work the same way everywhere: Scouts belong to small
              patrols, elect their own patrol leaders and a senior patrol leader, and plan the meetings and trips themselves. Older
              Scouts teach the younger ones knots, cooking and first aid. When a plan goes sideways, the Scouts fix it, and that’s
              where most of the learning happens.
            </p>
            <p data-reveal className="t-body">
              We also encourage Scouts to “challenge themselves by earning rank, completing merit badges, participating in high
              adventure outings, and making new friends from diverse backgrounds and other troops.”
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="adults" className="bg-paper-2">
        <div className="frame grid-12 items-center gap-y-10 py-[var(--section)]">
          <div data-reveal="mask" className="col-span-12 md:col-span-6">
            <Photo photo={pick('scout-teaching', 'morning-assembly')} ratio="4 / 3" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <h2 id="adults" data-reveal className="t-head">
              The adults
            </h2>
            <p data-reveal className="t-body mt-6">
              Adult leaders are volunteers, mostly parents. Their job is to keep everyone safe, sign off on advancement and coach
              the Scouts who are running things. Scouting America requires every adult volunteer to complete Youth Protection
              training, and two registered adults attend every activity.
            </p>
            <p data-reveal className="t-body mt-4">
              If you’re a parent with a skill to share, from cooking to car camping to first aid, there’s room for you.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="history" className="section frame">
        <h2 id="history" data-reveal className="t-head">
          A short history
        </h2>
        <ol className="mt-14 flex flex-col">
          {history.map((h) => (
            <li key={h.year} data-reveal className="grid-12 gap-y-2 border-t-0 py-6 md:py-8">
              <p className="col-span-12 font-display text-[clamp(2.5rem,2rem+2.5vw,4.5rem)] leading-none tracking-[-0.03em] text-forest md:col-span-3">{h.year}</p>
              <p className="t-body col-span-12 max-w-[52ch] md:col-span-7 md:col-start-5 md:pt-2">{h.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="family" className="on-dark bg-forest text-forest-ink">
        <div className="frame grid-12 gap-y-10 py-[var(--section)]">
          <h2 id="family" className="t-head col-span-12 md:col-span-5">
            The wider family
          </h2>
          <div className="col-span-12 space-y-5 md:col-span-6 md:col-start-7">
            <p className="t-body">
              The {site.sponsor} sponsors both troops, along with Cub Scout Pack 163 for kids in kindergarten through fifth grade and
              Venturing Crew 163 for ages 14 to 20.
            </p>
            <p className="t-body text-forest-soft">
              Camp Hi-Sierra, where we spent July 2023, belongs to the Silicon Valley Monterey Bay Council.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 font-medium">
              <a className="link" href={site.links.rotary} rel="noopener">
                Rotary Club of Milpitas
              </a>
              <a className="link" href="https://cubpack163.com/" rel="noopener">
                Cub Scout Pack 163
              </a>
              <Link className="link" href="/join">
                How to join
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
