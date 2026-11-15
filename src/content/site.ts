/**
 * Verified public facts about the troops. Every value here has a source in
 * docs/content/source-of-truth.md. Anything marked `confirm` still needs a
 * leadership check before launch (see docs/launch/leadership-review.md).
 */

export const site = {
  name: 'Troop 163',
  fullName: 'Troops 163 & 2163',
  city: 'Milpitas, California',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://troop163-milpitas.vercel.app',
  description:
    'Scouts BSA Troops 163 (boys) and 2163 (girls) in Milpitas, California. A Scout-led troop with weekly meetings, campouts and summer camp in the Sierra.',
  serving: 'Milpitas, Fremont and San Jose',
  motto: 'Have fun!',
  troops: {
    boys: { number: '163', founded: '1993' },
    girls: { number: '2163', founded: 'March 1, 2019' },
  },
  sponsor: 'Rotary Club of Milpitas',
  meetings: {
    day: 'Mondays',
    time: '6:30–8:00 PM',
    where: 'Milpitas',
    /** The street address is not published. Families get it by email. */
    addressPublished: false,
    confirm: true,
  },
  email: 'bsa2163girlsmilpitas@gmail.com',
  links: {
    troopWebHost: 'https://www.troopwebhost.org/Troop163and2163Milpitas/Index.htm',
    facebook2163: 'https://www.facebook.com/troop2163',
    scoutingAmerica: 'https://www.scouting.org/',
    scoutsBsa: 'https://www.scouting.org/programs/scouts-bsa/',
    beAScout: 'https://beascout.scouting.org/',
    council: 'https://svmbc.org/',
    campHiSierra: 'https://svmbc.org/venue/camp-hi-sierra',
    healthForm: 'https://www.scouting.org/health-and-safety/ahmr/',
    youthProtection: 'https://www.scouting.org/training/youth-protection/',
    advancement: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/',
    rotary: 'https://www.milpitasrotary.org/scouts',
  },
} as const

export const nav = [
  { href: '/adventures', label: 'Adventures' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/join', label: 'Join' },
  { href: '/parents', label: 'Parents' },
] as const

export function mailto(subject: string, body?: string) {
  const q = new URLSearchParams({ subject, ...(body ? { body } : {}) })
  return `mailto:${site.email}?${q.toString().replace(/\+/g, '%20')}`
}

export const visitMail = mailto(
  'Visiting a Troop 163 / 2163 meeting',
  "Hi! We'd like to visit a Monday meeting.\n\nParent or guardian name:\nScout's grade:\nBoys' troop (163) or girls' troop (2163):\nQuestions:\n",
)
