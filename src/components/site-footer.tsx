import Link from 'next/link'
import { Photo } from '@/components/photo'
import { nav, site, visitMail } from '@/content/site'
import { pick } from '@/lib/photos'

export function SiteFooter() {
  const photo = pick('dawn-cabin')
  return (
    <footer className="on-dark bg-forest text-forest-ink">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[22rem] md:min-h-[38rem]">
          <Photo photo={photo} fill sizes="(min-width: 768px) 60vw, 100vw" />
          <p className="t-small absolute bottom-4 left-[var(--gutter)] right-[var(--gutter)] text-paper/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
            Camp Hi-Sierra, 5:22 am, July 6, 2023
          </p>
        </div>

        <div className="flex flex-col gap-14 px-[var(--gutter)] py-16 md:py-20 lg:px-16">
          <div>
            <h2 className="t-title max-w-[18ch]">Troops 163 &amp; 2163, Milpitas</h2>
            <p className="t-body mt-4 max-w-[34ch] text-forest-soft">
              {site.meetings.day}, {site.meetings.time} in {site.meetings.where}. Email us and we’ll send the address.
            </p>
            <a href={visitMail} className="link mt-5 inline-block break-all font-medium">
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-[0.9375rem]">
            <nav aria-label="Footer">
              <h3 className="t-small mb-3 text-forest-soft">Pages</h3>
              <ul className="space-y-2">
                {[...nav, { href: '/contact', label: 'Contact' }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="t-small mb-3 text-forest-soft">Elsewhere</h3>
              <ul className="space-y-2">
                <li>
                  <a className="link" href={site.links.troopWebHost} rel="noopener">
                    Member site (TroopWebHost)
                  </a>
                </li>
                <li>
                  <a className="link" href={site.links.facebook2163} rel="noopener">
                    Troop 2163 on Facebook
                  </a>
                </li>
                <li>
                  <a className="link" href={site.links.scoutsBsa} rel="noopener">
                    Scouting America
                  </a>
                </li>
                <li>
                  <a className="link" href={site.links.council} rel="noopener">
                    Silicon Valley Monterey Bay Council
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="t-small mt-auto space-y-3 text-forest-soft">
            <p>
              Scouts BSA Troops 163 and 2163 of Milpitas, California, sponsored by the {site.sponsor}. This is the troops’ own
              website, not an official site of Scouting America or the council.
            </p>
            <p>
              Photos were taken by troop families. Please don’t reuse them, and{' '}
              <Link href="/contact" className="link text-forest-ink">
                tell us
              </Link>{' '}
              if you’d like one taken down.
            </p>
          </div>
        </div>
      </div>
      {/* Decorative sign-off: generated content, so it is texture rather than text for assistive tech. */}
      <div aria-hidden className="footer-mark overflow-hidden px-[var(--gutter)] pb-2 pt-6" />
    </footer>
  )
}
