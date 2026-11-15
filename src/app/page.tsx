import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { WeekStory } from '@/components/home/week-story'
import { Activities } from '@/components/home/activities'
import { ScoutLed } from '@/components/home/scout-led'
import { Journal } from '@/components/home/journal'
import { Gathered } from '@/components/home/gathered'
import { BeforeVisit } from '@/components/home/before-visit'
import { Closing } from '@/components/home/closing'
import { week } from '@/content/week'
import { albumStats, pick } from '@/lib/photos'

export default function HomePage() {
  const days = week.map((d) => ({ ...d, image: pick(...d.photo) }))
  const gathered = ['dawn-cabin', 'canoe-red', 'two-friends', 'archery-draw', 'opening-show', 'climbing-wall', 'sails-portrait', 'tents-evening', 'shelter-detail']
    .map((id) => {
      try {
        return pick(id)
      } catch {
        return null
      }
    })
    .filter((p) => p !== null)
  return (
    <>
      <Hero />
      <Intro />
      <WeekStory days={days} ground={pick('forest-from-tower')} />
      <Activities />
      <ScoutLed />
      <Journal />
      <Gathered photos={gathered} total={albumStats.photos} />
      <BeforeVisit />
      <Closing />
    </>
  )
}
