/**
 * Camp Hi-Sierra, July 2–8 2023, day by day.
 * Every line is backed by a timestamped photo in the shared album
 * ("2023: Hi-Sierra"). Times come from the album's capture times.
 * `photo` lists preferences: the first one available in this build is used.
 */
export interface WeekDay {
  day: number
  weekday: string
  date: string
  title: string
  text: string
  photo: string[]
}

export const week: WeekDay[] = [
  {
    day: 1,
    weekday: 'Sunday',
    date: 'July 2',
    title: 'Arrive',
    text: 'Haul duffels down a dirt road to the campsite, find the waterfront and hang your buddy tag. Opening campfire after dark.',
    photo: ['hauling-gear', 'opening-show'],
  },
  {
    day: 2,
    weekday: 'Monday',
    date: 'July 3',
    title: 'First full day',
    text: 'Flags at 7:48 in the morning, merit badge classes until lunch, and an afternoon on the climbing tower.',
    photo: ['climbing-wall', 'morning-field'],
  },
  {
    day: 3,
    weekday: 'Tuesday',
    date: 'July 4',
    title: 'The Fourth',
    text: 'Morning flags with the whole camp. From the top of the tower you see pines in every direction. After dinner: survival shelters thatched with pine needles.',
    photo: ['tower-view'],
  },
  {
    day: 4,
    weekday: 'Wednesday',
    date: 'July 5',
    title: 'Everything at once',
    text: 'Welding and blacksmithing before ten. Canoe rescues, bouldering and archery after. A campfire in our own site that night.',
    photo: ['welding', 'forge'],
  },
  {
    day: 5,
    weekday: 'Thursday',
    date: 'July 6',
    title: 'The lake',
    text: 'Somebody was up at 5:22 with the moon still out. By three in the afternoon we were sailing catamarans on Pinecrest Lake.',
    photo: ['sail-lone-boat'],
  },
  {
    day: 6,
    weekday: 'Friday',
    date: 'July 7',
    title: 'Build, then say goodbye',
    text: 'Rope, spars and a lot of square lashings in the afternoon. The closing campfire ran by torchlight until after ten.',
    photo: ['closing-campfire'],
  },
  {
    day: 7,
    weekday: 'Saturday',
    date: 'July 8',
    title: 'Home',
    text: 'Packed out by 7:13 in the morning, past the same canvas tents. The trailer was back in the valley and unloaded by mid-afternoon.',
    photo: ['packing-out', 'canvas-tents'],
  },
]
