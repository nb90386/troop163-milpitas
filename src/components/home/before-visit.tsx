import Link from 'next/link'
import { FaqList } from '@/components/faq-list'
import { Photo } from '@/components/photo'
import { faqs } from '@/content/faq'
import { site, visitMail } from '@/content/site'
import { pick } from '@/lib/photos'

export function BeforeVisit() {
  const tall = pick('canvas-tents')
  const square = pick('buddy-board')
  const items = faqs.filter((f) => ['Who can join?', 'Can we visit before signing up?', 'What happens at a meeting?', 'What gear do I need to start?', 'How much does it cost?'].includes(f.q))
  return (
    <section aria-labelledby="visit-heading" className="bg-paper-2">
      <div className="frame grid gap-y-14 md:grid-cols-12 md:gap-x-8">
        <div className="md:order-2 md:col-span-6 md:col-start-7">
          <div className="relative -mx-[var(--gutter)] md:mx-0 md:-mt-16">
            <Photo photo={tall} ratio="3 / 4" sizes="(min-width: 768px) 50vw, 100vw" className="max-md:!aspect-[4/5]" />
            <div className="absolute -bottom-10 right-[var(--gutter)] w-[38%] md:-left-10 md:bottom-20 md:right-auto md:w-[34%]">
              <Photo photo={square} ratio="1 / 1" sizes="(min-width: 768px) 18vw, 38vw" />
            </div>
          </div>
        </div>
        <div className="pb-[var(--section)] md:order-1 md:col-span-5 md:pt-[var(--section)]">
          <h2 id="visit-heading" data-reveal className="t-head max-w-[10ch]">
            Before your first visit
          </h2>
          <ul data-reveal style={{ ['--i' as string]: 1 }} className="mt-8 space-y-1.5 text-[1.125rem]">
            <li>
              {site.meetings.day}, {site.meetings.time}
            </li>
            <li>In Milpitas. We email the address.</li>
            <li>Ages 11 to 17 (10 with Arrow of Light)</li>
            <li>Boys: Troop 163. Girls: Troop 2163.</li>
          </ul>
          <div className="mt-10">
            <FaqList items={items} />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={visitMail} className="btn">
              Email the troop
            </a>
            <Link href="/join" className="link font-medium">
              Everything about joining
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
