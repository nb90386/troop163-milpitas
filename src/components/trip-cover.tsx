import type { Adventure } from '@/content/adventures'

/** Typographic cover for trips with no cleared photo: the trip's own numbers, set large. */
export function TripCover({ adventure, tall }: { adventure: Adventure; tall?: boolean }) {
  return (
    <div className={`on-dark flex flex-col justify-between bg-forest p-6 text-forest-ink transition-colors duration-300 group-hover:bg-forest-2 md:p-8 ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
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
