import { Photo } from '@/components/photo'
import { pick } from '@/lib/photos'

const rows = [
  {
    title: 'Get out on the water',
    text: 'Swim checks, canoe rescues and, at camp in 2023, an afternoon sailing catamarans on Pinecrest Lake. Every swimmer has a buddy and a tag on the board.',
    photo: 'sails-launch',
    w: 'md:w-[min(30vw,28rem)]',
    ratio: '4 / 5',
  },
  {
    title: 'Climb with a spotter',
    text: 'A climbing tower, granite boulders and a crash pad. Helmet on, and somebody below you watching every move.',
    photo: 'bouldering',
    w: 'md:w-[min(22vw,20rem)]',
    ratio: '3 / 4',
  },
  {
    title: 'Learn the old skills',
    text: 'Knots, lashings, fire-building and camp-stove cooking. At camp it meant pioneering tripods and survival shelters thatched with pine needles.',
    photo: 'lashing-hands',
    w: 'md:w-[min(33vw,30rem)]',
    ratio: '1 / 1',
  },
  {
    title: 'Make something real',
    text: 'Merit badge classes at camp ran from welding and blacksmithing to pottery, leather and wood carving.',
    photo: 'welding',
    w: 'md:w-[min(33vw,31rem)]',
    ratio: '3 / 2',
  },
  {
    title: 'Stay up for the campfire',
    text: 'The opening campfire, the closing ceremony by torchlight and our own fire in the campsite. On Friday it ran past ten.',
    photo: 'campfire-silhouettes',
    w: 'md:w-[min(26vw,24rem)]',
    ratio: '4 / 5',
  },
]

export function Activities() {
  return (
    <section aria-labelledby="do-heading" className="section frame">
      <div className="grid-12">
        <h2 id="do-heading" data-reveal className="t-head col-span-12 max-w-[12ch] md:col-span-8 md:col-start-5">
          What you’ll actually do
        </h2>
      </div>
      <ol className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-24">
        {rows.map((r, i) => {
          const photo = pick(r.photo)
          return (
            <li key={r.title} className="grid-12 items-start gap-y-6">
              <div className="col-span-12 md:col-span-4 md:col-start-5 md:pt-6">
                <h3 data-reveal className="t-title">
                  {r.title}
                </h3>
                <p data-reveal style={{ ['--i' as string]: 1 }} className="t-body mt-4 max-w-[34ch]">
                  {r.text}
                </p>
              </div>
              <div
                data-reveal="mask"
                style={{ ['--i' as string]: 2 }}
                className={`col-span-12 md:col-span-4 md:col-start-9 md:-ml-[20%] md:justify-self-end ${
                  ['w-full', 'ml-auto w-[70%]', 'w-[55%]', 'w-full', 'ml-auto w-[70%]'][i]
                } ${r.w}`}
              >
                <Photo photo={photo} ratio={r.ratio} sizes="(min-width: 768px) 26rem, 70vw" zoom />
                <p className="t-small mt-2 text-ink-soft">{photo.caption}</p>
              </div>
            </li>
          )
        })}
        <li className="grid-12 gap-y-6">
          <div className="col-span-12 md:col-span-6 md:col-start-5">
            <h3 data-reveal className="t-title">
              Give something back at home
            </h3>
            <p data-reveal style={{ ['--i' as string]: 1 }} className="t-body mt-4 max-w-[46ch]">
              In 2020, Troop 2163 sewed masks for the Milpitas Fire Department and ran a back-to-school drive through the Family Giving
              Tree. One Scout’s Eagle project built a bear box that went to the fire department.
            </p>
          </div>
        </li>
      </ol>
    </section>
  )
}
