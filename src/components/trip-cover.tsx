import { adventures, type Adventure } from '@/content/adventures'

/** Dark earth tones, one per trip, so the photo-less covers don't read as identical cards. */
export const COVER_TONES = ['#18352c', '#5a3a2b', '#2e4654']
export const coverTone = (slug: string) => COVER_TONES[(adventures.findIndex((a) => a.slug === slug) + 2) % 3]

/** Typographic cover for trips with no cleared photo: the trip's own numbers, set large. */
export function TripCover({ adventure, tall }: { adventure: Adventure; tall?: boolean }) {
  return (
    <div className={`on-dark flex flex-col justify-between p-6 text-forest-ink transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1 md:p-8 ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} style={{ background: coverTone(adventure.slug) }}>
      <p className="t-small text-forest-soft">
        {adventure.who} · {adventure.when}
      </p>
      <dl className="flex flex-wrap gap-x-10 gap-y-4">
        {adventure.stats.map((s) => (
          <div key={s.label}>
            <dt className="t-small text-forest-soft">{s.label}</dt>
            <dd className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.03em]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
