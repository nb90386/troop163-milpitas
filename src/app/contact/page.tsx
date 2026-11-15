import type { Metadata } from 'next'
import { ContactComposer } from '@/components/contact-composer'
import { PageHeader } from '@/components/page-header'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email Troops 163 and 2163 in Milpitas to ask a question or arrange a visit to a Monday meeting.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        lead="Email reaches the troops’ adult leaders. If you’re under 18, please ask a parent or guardian to write to us with you."
      />
      <section aria-label="Email the troop" className="frame grid-12 gap-y-16 py-16 md:py-24">
        <div className="col-span-12 lg:col-span-7">
          <ContactComposer />
        </div>
        <aside className="col-span-12 space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="t-title">Meetings</h2>
            <p className="t-body mt-3">
              {site.meetings.day}, {site.meetings.time} in Milpitas. We send the address by email.
            </p>
          </div>
          <div>
            <h2 className="t-title">Elsewhere</h2>
            <ul className="t-body mt-3 space-y-2">
              <li>
                <a className="link" href={site.links.troopWebHost} rel="noopener">
                  Member site on TroopWebHost
                </a>
              </li>
              <li>
                <a className="link" href={site.links.facebook2163} rel="noopener">
                  Troop 2163 on Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="t-title">Photos</h2>
            <p className="t-body mt-3">
              If you see a photo of your Scout you’d like removed, email us with the page and a description and we’ll take it down.
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
