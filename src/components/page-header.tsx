import { Photo } from '@/components/photo'
import type { Photo as PhotoT } from '@/lib/photos'

/**
 * Subpage opening. Title large on the left, one supporting sentence, and an
 * optional photograph that runs off the right edge on desktop.
 */
export function PageHeader({ title, lead, photo, children }: { title: string; lead: string; photo?: PhotoT; children?: React.ReactNode }) {
  return (
    <header className="pt-28 md:pt-36">
      <div className="frame grid-12 items-end gap-y-10">
        <div className={photo ? 'col-span-12 lg:col-span-6' : 'col-span-12 lg:col-span-9'}>
          <h1 className="hero-line t-head text-[clamp(3rem,1.8rem+5vw,6.5rem)]">{title}</h1>
          <p className="hero-line t-lead mt-6 max-w-[34ch] text-ink" style={{ ['--i' as string]: 1 }}>
            {lead}
          </p>
          {children && (
            <div className="hero-line mt-8" style={{ ['--i' as string]: 2 }}>
              {children}
            </div>
          )}
        </div>
        {photo && (
          <div className="hero-line col-span-12 -mr-[var(--gutter)] lg:col-span-6 lg:col-start-7" style={{ ['--i' as string]: 2 }}>
            <Photo photo={photo} ratio="4 / 3" sizes="(min-width: 1024px) 50vw, 100vw" priority />
            <p className="t-small mt-2 pr-[var(--gutter)] text-ink-soft">{photo.caption}</p>
          </div>
        )}
      </div>
    </header>
  )
}
