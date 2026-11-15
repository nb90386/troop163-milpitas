/**
 * The trip journal. To add a trip, append an object to `adventures`
 * (newest first) and add its photos to src/content/photo-manifest.ts.
 * Only write what happened. Quote Scouts' own words where we have them.
 */

export interface Adventure {
  slug: string
  title: string
  /** As precise as the source allows. Never guess a date. */
  when: string
  where: string
  who: string
  stats: { label: string; value: string }[]
  summary: string
  /** Paragraphs. Use `quote` for words written by a Scout, with a source line. */
  body: ({ p: string } | { quote: string; source: string })[]
  /** Photo preferences: first available is the cover. Empty = typographic cover. */
  cover: string[]
  photos?: string[]
  /** Show the day-by-day Hi-Sierra week on the story page */
  week?: boolean
  sourceNote: string
}

export const adventures: Adventure[] = [
  {
    slug: 'camp-hi-sierra-2023',
    title: 'A week at Camp Hi-Sierra',
    when: 'July 2–8, 2023',
    where: 'Camp Hi-Sierra, near Long Barn, California',
    who: 'Troops 163 and 2163',
    stats: [
      { label: 'Days', value: '7' },
      { label: 'Photos in the album', value: '523' },
      { label: 'Highway', value: 'CA-108' },
    ],
    summary:
      'Seven days in the Sierra Nevada with both troops. Sailing on Pinecrest Lake, welding, climbing, archery, pioneering and two big campfires.',
    body: [
      {
        p: 'Camp Hi-Sierra belongs to the Silicon Valley Monterey Bay Council and sits off Highway 108, about thirty miles east of Sonora. Scout troops from around the region spend a week there each summer, living in canvas tents and splitting their days between merit badge classes and whatever else they can fit in.',
      },
      {
        p: 'Parents shared 523 photos and 512 short videos from the week in one album. The day-by-day below follows their timestamps, so it is the week as it happened, in order.',
      },
    ],
    cover: ['sail-lone-boat'],
    photos: [
      'sails-launch',
      'welding',
      'bouldering',
      'archery-silhouettes',
      'tower-view',
      'survival-shelter',
      'two-friends',
      'lashing-team',
      'closing-campfire',
      'canvas-tents',
    ],
    week: true,
    sourceNote: 'Source: the troop’s shared album “2023: Hi-Sierra” (July 2–8, 2023).',
  },
  {
    slug: 'snow-camp-hi-sierra-2020',
    title: 'Snow camping at Hi-Sierra',
    when: 'February 2020',
    where: 'Camp Hi-Sierra',
    who: 'Troop 2163',
    stats: [
      { label: 'Month', value: 'Feb' },
      { label: 'Year', value: '2020' },
    ],
    summary:
      'Troop 2163’s last outing before the pandemic: camping in the snow at Camp Hi-Sierra, the same camp both troops spent a week at in July 2023.',
    body: [
      {
        p: 'In February 2020, Troop 2163 went snow camping at Camp Hi-Sierra. That April, meetings moved online. When a later Hi-Sierra trip was cancelled, one of the troop’s Scouts ran a week-long virtual “quarantine camp” instead.',
      },
    ],
    cover: [],
    sourceNote: 'Source: Milpitas Beat, March 25, 2021.',
  },
  {
    slug: 'clavey-backpacking',
    title: 'The Clavey',
    when: 'Before 2015 (exact date not recorded)',
    where: 'The Clavey, in the Sierra Nevada',
    who: 'Troop 163',
    stats: [
      { label: 'Distance', value: '14 mi' },
      { label: 'Climb out', value: '3,000 ft' },
    ],
    summary:
      'Fourteen miles with full packs and a three-thousand-foot climb back out. For a couple of Scouts it was their first backpacking trip.',
    body: [
      {
        quote:
          'This was the time our whole troop did the Clavey. The Clavey is a fourteen mile backpacking trip. It was a very hard backing trip since it was the first backpacking trip for a couple of scouts. The hardest part was going up because we were going up three thousand feet in elevation. It was a fun trip.',
        source: 'A Troop 163 Scout, on the troop’s old website',
      },
    ],
    cover: ['clavey-ridge'],
    sourceNote: 'Source: Troop 163’s earlier website (troop163milpitas.weebly.com, last updated 2014).',
  },
  {
    slug: 'mount-tamalpais',
    title: 'Mount Tamalpais',
    when: 'Before 2015 (exact date not recorded)',
    where: 'Mount Tamalpais, Marin County',
    who: 'Troop 163',
    stats: [
      { label: 'Distance', value: '8 mi' },
      { label: 'Summit', value: '2,571 ft' },
    ],
    summary: 'Eight miles in the sun to the stone lookout at the summit. No shade, one very welcome visitor center.',
    body: [
      {
        quote:
          'This was the time our troop went to Mt. Tamalpais. It was a short eight mile on a hot summer day. There wasn’t any shade there, but there was a visitor center where we could take a rest.',
        source: 'A Troop 163 Scout, on the troop’s old website (spelling corrected)',
      },
    ],
    cover: ['mt-tam-summit'],
    sourceNote: 'Source: Troop 163’s earlier website (troop163milpitas.weebly.com, last updated 2014).',
  },
]

export function getAdventure(slug: string) {
  return adventures.find((a) => a.slug === slug)
}
