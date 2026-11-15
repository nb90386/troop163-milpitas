import { pick } from '@/lib/photos'
import { ActivityStack, type Activity } from './activity-stack'

export function Activities() {
  const items: Activity[] = [
    { title: 'Sail a mountain lake', line: 'Swim check, buddy tag, then catamarans on Pinecrest Lake.', photo: pick('sails-launch') },
    { title: 'Climb granite', line: 'Helmet on, crash pad down, a spotter watching every move.', photo: pick('bouldering') },
    { title: 'Weld steel', line: 'Camp merit badges ran from welding and blacksmithing to pottery and leather.', photo: pick('welding') },
    { title: 'Hit the bullseye', line: 'Archery and the range safety rules that come with it.', photo: pick('archery-silhouettes') },
    { title: 'Stay up for the fire', line: 'The opening campfire, then the closing ceremony by torchlight. Friday ran past ten.', photo: pick('campfire-ring') },
  ]
  return (
    <section aria-labelledby="do-heading">
      <div className="frame pb-14 pt-[var(--section)] md:pb-20">
        <div className="grid-12 items-end gap-y-5">
          <h2 id="do-heading" data-reveal className="t-head col-span-12 max-w-[11ch] md:col-span-7">
            What you’ll actually do
          </h2>
          <p data-reveal style={{ ['--i' as string]: 1 }} className="t-body col-span-12 max-w-[34ch] text-ink-soft md:col-span-4 md:col-start-9">
            One week at Camp Hi-Sierra, July 2023. Keep scrolling.
          </p>
        </div>
      </div>
      <ActivityStack items={items} />
    </section>
  )
}
