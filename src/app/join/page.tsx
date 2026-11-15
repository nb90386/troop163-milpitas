import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqList } from '@/components/faq-list'
import { PageHeader } from '@/components/page-header'
import { Photo } from '@/components/photo'
import { faqs } from '@/content/faq'
import { site, visitMail } from '@/content/site'
import { pick } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Join',
  description:
    'How to join Scouts BSA Troop 163 (boys) or Troop 2163 (girls) in Milpitas: who can join, visiting a Monday meeting, gear and costs.',
  alternates: { canonical: '/join' },
}

const steps = [
  {
    word: 'First',
    title: 'Email the troop',
    text: 'Tell us your Scout’s grade and which troop you’re interested in. A leader writes back with the meeting place and a good Monday to come.',
  },
  {
    word: 'Then',
    title: 'Visit a Monday meeting',
    text: 'Meetings run 6:30 to 8:00 in Milpitas. Stay for the whole thing, watch how the Scouts run it and ask the adults whatever you like.',
  },
  {
    word: 'Last',
    title: 'Register',
    text: 'When you’re ready, you’ll complete a Scouting America youth application, which you can start online at BeAScout, plus the troop’s own forms. A leader walks you through it.',
  },
]

const essentials = [
  'Pocketknife (once your Scout has earned the right to carry one)',
  'First aid kit',
  'Extra clothing',
  'Rain gear',
  'Water bottle',
  'Flashlight',
  'Trail food',
  'Matches and fire starters',
  'Sun protection',
  'Map and compass',
]

export default function JoinPage() {
  const groups = [
    { id: 'visit', title: 'Visiting' },
    { id: 'scouts', title: 'For Scouts' },
    { id: 'parents', title: 'For parents' },
  ] as const
  return (
    <>
      <PageHeader
        title="Join us"
        lead="Most families start the same way: an email, a Monday visit, then the paperwork. Here’s the whole path, and the questions people ask on the way."
        photo={pick('two-friends', 'sails-portrait')}
      >
        <a href={visitMail} className="btn">
          Email the troop <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
        </a>
      </PageHeader>

      <section id="visit" aria-labelledby="steps-heading" className="section frame scroll-mt-20">
        <h2 id="steps-heading" data-reveal className="t-head max-w-[12ch]">
          Three steps to your first campout
        </h2>
        <ol className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
          {steps.map((s) => (
            <li key={s.title} data-reveal className="grid-12 items-baseline gap-y-3">
              <p className="col-span-12 font-display text-[clamp(3rem,2rem+4vw,6.5rem)] leading-[0.9] tracking-[-0.04em] text-clay md:col-span-4">{s.word}</p>
              <h3 className="t-title col-span-12 md:col-span-3 md:col-start-5">{s.title}</h3>
              <p className="t-body col-span-12 max-w-[42ch] md:col-span-5 md:col-start-8">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href={visitMail} className="btn">
            Email the troop
          </a>
          <a href={site.links.beAScout} className="link font-medium" rel="noopener">
            BeAScout, Scouting America’s sign-up site
          </a>
        </div>
      </section>

      <section aria-labelledby="who" className="bg-forest text-forest-ink on-dark">
        <div className="frame grid-12 gap-y-10 py-[var(--section)]">
          <h2 id="who" className="t-head col-span-12 md:col-span-5">
            Who can join
          </h2>
          <div className="col-span-12 space-y-5 md:col-span-6 md:col-start-7">
            <p className="t-lead">Scouts BSA is for youth ages 11 through 17.</p>
            <p className="t-body text-forest-soft">
              Ten-year-olds can join once they’ve earned the Arrow of Light, or from March 1 of their fifth-grade year. Boys join
              Troop 163 and girls join Troop 2163. Our families come from {site.serving}.
            </p>
            <p className="t-body text-forest-soft">
              No experience needed. Knots, cooking and camping get taught at meetings and on trips.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="gear" className="section frame">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <h2 id="gear" data-reveal className="t-head">
              Don’t buy gear yet
            </h2>
            <p data-reveal className="t-body mt-6 max-w-[38ch]">
              Ask about borrowing before you shop. For a first campout, Scouts carry the Scout Basic Essentials from the Scouts BSA
              handbook:
            </p>
            <ul className="t-body mt-6 columns-1 gap-8 sm:columns-2">
              {essentials.map((e) => (
                <li key={e} className="mb-2 break-inside-avoid pl-4 [text-indent:-1rem]">
                  <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[3px] bg-clay" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="mask" className="col-span-12 md:col-span-6 md:col-start-7">
            <Photo photo={pick('canvas-tents')} ratio="4 / 5" sizes="(min-width: 768px) 50vw, 100vw" />
            <p className="t-small mt-2 text-ink-soft">At summer camp, Scouts sleep in canvas wall tents like these.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-paper-2 py-[var(--section)]">
        <div className="frame">
          <h2 id="faq-heading" className="t-head">
            Questions
          </h2>
          <div className="mt-12 grid gap-14 lg:grid-cols-3 lg:gap-10">
            {groups.map((g) => (
              <div key={g.id}>
                <h3 className="t-title">{g.title}</h3>
                <div className="mt-4">
                  <FaqList items={faqs.filter((f) => f.group === g.id)} />
                </div>
              </div>
            ))}
          </div>
          <p className="t-body mt-14 max-w-[52ch]">
            Something we didn’t answer?{' '}
            <a href={visitMail} className="link font-medium">
              Ask us by email
            </a>
            , or read the{' '}
            <Link href="/parents" className="link font-medium">
              parents’ page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
