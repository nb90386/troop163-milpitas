import { Photo } from '@/components/photo'
import { visitMail } from '@/content/site'
import { pick } from '@/lib/photos'

export function Closing() {
  const strip = [pick('archery-silhouettes'), pick('sail-rocks'), pick('closing-campfire')]
  return (
    <section aria-labelledby="closing-heading">
      <div className="grid grid-cols-3">
        {strip.map((p, i) => (
          <div key={p.id} data-reveal="mask" style={{ ['--i' as string]: i }} className="relative h-[28svh] md:h-[40svh]">
            <Photo photo={p} fill sizes="(min-width: 768px) 34vw, 45vw" quality={60} />
          </div>
        ))}
      </div>
      <div className="bg-sage">
        <div className="frame grid-12 py-16 md:min-h-[44svh] md:items-center md:py-20">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <h2 id="closing-heading" className="t-head max-w-[19ch]">
              Your next adventure starts on a Monday.
            </h2>
            <p className="t-lead mt-6 max-w-[30ch]">
              Come see a meeting and decide for yourself.{' '}
              <a href={visitMail} className="link-strong">
                Email us first
              </a>{' '}
              and we’ll send the address.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
