import { Photo } from '@/components/photo'
import { Parallax } from '@/components/motion/parallax'
import { ScrollWords } from '@/components/motion/scroll-words'
import { pick } from '@/lib/photos'

/** One sentence that inks in as you read it, then three photos from that week drifting at different rates. */
export function Intro() {
  const strip = [
    { photo: pick('morning-field'), ratio: '4 / 5', shift: 6, cls: 'md:col-span-4' },
    { photo: pick('canoe-red'), ratio: '3 / 4', shift: -18, cls: 'md:col-span-3 md:col-start-6 md:mt-40' },
    { photo: pick('walking-alone'), ratio: '4 / 5', shift: 12, cls: 'md:col-span-3 md:col-start-10 md:mt-12' },
  ]
  return (
    <section className="section frame" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="sr-only">
        What a week with the troop looks like
      </h2>
      <ScrollWords
        className="font-display text-[clamp(2rem,1.1rem+3.6vw,5rem)] leading-[1.04] tracking-[-0.03em] md:max-w-[22ch]"
        text="Sunday, we hauled duffels down a dirt road. By Saturday we had sailed a mountain lake, welded steel and climbed granite."
      />
      <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-6 md:mt-24 md:grid-cols-12 md:gap-x-8">
        {strip.map(({ photo, ratio, shift, cls }, i) => (
          <figure key={photo.id} className={`${cls} ${i === 0 ? 'col-span-2' : ''} ${i === 2 ? 'mt-12' : ''}`}>
            <Parallax shift={shift}>
              <div data-reveal="mask">
                <Photo photo={photo} ratio={ratio} sizes="(min-width: 768px) 30vw, 50vw" zoom />
              </div>
            </Parallax>
            <figcaption className="t-small mt-3 text-ink-soft">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
