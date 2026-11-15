import { Photo } from '@/components/photo'
import { pick } from '@/lib/photos'

export function Intro() {
  const photo = pick('forest-walk', 'walking-alone')
  return (
    <section className="section frame" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="sr-only">
        What a week with the troop looks like
      </h2>
      <div className="grid-12 gap-y-12">
        <p data-reveal className="t-lead col-span-12 text-ink md:col-span-7 md:col-start-6 md:indent-[3em] lg:col-span-6 lg:col-start-7">
          On a Sunday in July 2023 we hauled duffels down a dirt road to a row of canvas tents. By Saturday, Scouts had sailed a
          mountain lake, welded steel, climbed granite and built shelters out of pine needles.
        </p>
        <div className="col-span-12 grid grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] items-end gap-5 md:col-span-5 md:row-start-2 md:grid-cols-1 md:gap-8 lg:col-span-4 lg:-mt-16">
          <p data-reveal style={{ ['--i' as string]: 1 }} className="t-small order-1 max-w-[15rem] text-ink-soft md:order-2">
            Camp Hi-Sierra is the Silicon Valley Monterey Bay Council’s summer camp, off Highway 108 about thirty miles east of
            Sonora. {photo.id === 'forest-walk' ? 'This was the first walk to the program areas.' : 'Heading back to the campsite on Thursday.'}
          </p>
          <div data-reveal="mask" className="order-2 md:order-1">
            <Photo photo={photo} ratio="4 / 5" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 62vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
