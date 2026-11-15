/**
 * Curated photo manifest — the single place to add, caption or retire a photo.
 *
 * To add a photo:
 *   1. Put the original in source-assets/originals/<folder>/ (never in public/).
 *   2. Add an entry below.
 *   3. Run `npm run photos`. The script strips metadata (EXIF/GPS), resizes,
 *      and writes public/images/... plus src/content/photo-meta.generated.json.
 *
 * release:
 *   "public"  — no identifiable youth (landscapes, silhouettes, backs, distant figures).
 *               Ships in every build.
 *   "review"  — identifiable youth. Ships ONLY in the protected review build
 *               (PHOTO_MODE=review) until leadership confirms media releases.
 *
 * focal: where the subject sits, as fractions of width/height (0–1). Used for
 * object-position so crops at any aspect keep the subject in frame.
 */

export type PhotoCategory = 'water' | 'climbing' | 'skills' | 'campsite' | 'night' | 'place' | 'history'

export type PhotoRelease = 'public' | 'review'

export interface PhotoEntry {
  id: string
  /** Path relative to source-assets/originals */
  original: string
  source: 'hi-sierra-2023' | 'weebly-2014'
  /** ISO date, only when verified from album metadata or a dated source */
  date?: string
  /** Day of the Hi-Sierra week, 1 = Sun Jul 2, 7 = Sat Jul 8 */
  day?: number
  category: PhotoCategory
  release: PhotoRelease
  alt: string
  caption: string
  focal: { x: number; y: number }
  /** Show in the /gallery grid */
  gallery?: boolean
}

const HS = 'hisierra-2023/hs23-'

export const photoManifest: PhotoEntry[] = [
  // ——— On the water (Pinecrest Lake sailing + camp waterfront) ———
  { id: 'sail-lone-boat', original: `${HS}328.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'water', release: 'public', gallery: true,
    alt: 'A small catamaran with a red, yellow and blue sail crosses a sparkling mountain lake below a forested granite ridge.',
    caption: 'Sailing on Pinecrest Lake, Thursday afternoon.', focal: { x: 0.22, y: 0.62 } },
  { id: 'sail-rocks', original: `${HS}321.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'water', release: 'public', gallery: true,
    alt: 'Granite boulders in the shallows in front of a row of beached catamarans with striped sails.',
    caption: 'Waiting for a turn at the boats.', focal: { x: 0.7, y: 0.5 } },
  { id: 'sails-launch', original: `${HS}317.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'water', release: 'public', gallery: true,
    alt: 'Scouts in life jackets push off on catamarans with tall rainbow sails, pine forest lining the far shore.',
    caption: 'Pushing off.', focal: { x: 0.6, y: 0.55 } },
  { id: 'sails-portrait', original: `${HS}318.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'water', release: 'public', gallery: true,
    alt: 'Three catamarans with bright striped sails rigged at the edge of a blue lake.',
    caption: 'Rigged and ready.', focal: { x: 0.5, y: 0.55 } },
  { id: 'sails-shallows', original: `${HS}322.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'water', release: 'public', gallery: true,
    alt: 'A swimmer near a granite outcrop as catamarans with striped sails sit in the shallows.',
    caption: 'Swim check before sailing.', focal: { x: 0.6, y: 0.55 } },
  { id: 'canoe-red', original: `${HS}194.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'water', release: 'public', gallery: true,
    alt: 'Two paddlers in a red canoe on a green river pool below a rocky bank.',
    caption: 'Canoeing on the camp waterfront.', focal: { x: 0.5, y: 0.45 } },
  { id: 'canoe-rescue', original: `${HS}196.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'water', release: 'public', gallery: true,
    alt: 'Scouts in a kayak and canoe practice a capsize rescue on a calm river pool.',
    caption: 'Practicing a capsized-canoe rescue.', focal: { x: 0.55, y: 0.5 } },
  { id: 'buddy-board', original: `${HS}022.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'water', release: 'public', gallery: true,
    alt: 'A hand-painted blue "Buddy Tags" board with round swim tags hung on hooks.',
    caption: 'Nobody swims alone: the buddy board at the waterfront.', focal: { x: 0.5, y: 0.5 } },

  // ——— Climbing ———
  { id: 'climbing-wall', original: `${HS}080.jpg`, source: 'hi-sierra-2023', date: '2023-07-03', day: 2, category: 'climbing', release: 'review', gallery: true,
    alt: 'Two climbers in helmets and harnesses partway up a tall climbing wall among pines.',
    caption: 'The climbing tower, day two.', focal: { x: 0.55, y: 0.35 } },
  { id: 'bouldering', original: `${HS}214.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'climbing', release: 'public', gallery: true,
    alt: 'A Scout in an orange helmet climbs a mossy granite boulder while another spots from below.',
    caption: 'Bouldering, with a spotter.', focal: { x: 0.5, y: 0.4 } },
  { id: 'bouldering-start', original: `${HS}212.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'climbing', release: 'review', gallery: true,
    alt: 'Scouts in climbing helmets gather at the base of a large granite boulder with a crash pad.',
    caption: 'Working out the first move.', focal: { x: 0.5, y: 0.45 } },

  // ——— Skills ———
  { id: 'archery-silhouettes', original: `${HS}240.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'skills', release: 'public', gallery: true,
    alt: 'Two archers in silhouette draw their bows toward round targets on a sunlit range.',
    caption: 'Archery range, mid-afternoon.', focal: { x: 0.45, y: 0.5 } },
  { id: 'archery-draw', original: `${HS}241.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'skills', release: 'public', gallery: true,
    alt: 'Backlit archers at full draw, targets lined up on hay bales behind them.',
    caption: 'Full draw.', focal: { x: 0.5, y: 0.5 } },
  { id: 'welding', original: `${HS}191.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'skills', release: 'public', gallery: true,
    alt: 'A Scout in a welding helmet lays a bead inside a copper-lit welding booth, sparks glowing.',
    caption: 'Welding at the metalwork shop.', focal: { x: 0.6, y: 0.5 } },
  { id: 'lashing-hands', original: `${HS}429.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'skills', release: 'public', gallery: true,
    alt: 'Close view of hands pulling rope tight around two wooden spars.',
    caption: 'Square lashing, pulled tight.', focal: { x: 0.5, y: 0.55 } },
  { id: 'tripod-lashing', original: `${HS}440.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'skills', release: 'public', gallery: true,
    alt: 'Rope wrapped around the top of a wooden tripod under a white canvas tent.',
    caption: 'A pioneering tripod going up.', focal: { x: 0.5, y: 0.35 } },
  { id: 'survival-shelter', original: `${HS}174.jpg`, source: 'hi-sierra-2023', date: '2023-07-04', day: 3, category: 'skills', release: 'public', gallery: true,
    alt: 'A lean-to shelter built from branches and thick layers of pine needles in the forest.',
    caption: 'A wilderness survival shelter, built that evening.', focal: { x: 0.5, y: 0.5 } },
  { id: 'shelter-detail', original: `${HS}176.jpg`, source: 'hi-sierra-2023', date: '2023-07-04', day: 3, category: 'skills', release: 'public', gallery: true,
    alt: 'Pine-needle thatching layered over a branch frame against a burned tree trunk.',
    caption: 'Thatched with pine needles.', focal: { x: 0.5, y: 0.5 } },
  { id: 'handicraft-sign', original: `${HS}281.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'skills', release: 'public', gallery: true,
    alt: 'A wooden Handicraft sign listing art, leather, pottery, wood carving and painting.',
    caption: 'Handicraft area: pottery, leather, wood carving.', focal: { x: 0.35, y: 0.45 } },
  { id: 'berries', original: `${HS}129.jpg`, source: 'hi-sierra-2023', date: '2023-07-04', day: 3, category: 'skills', release: 'public', gallery: true,
    alt: 'Fingers holding a sprig with small red berries up to the light.',
    caption: 'Plant ID on a nature walk.', focal: { x: 0.5, y: 0.5 } },

  // ——— Campsite life ———
  { id: 'forest-walk', original: `${HS}016.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'campsite', release: 'review', gallery: true,
    alt: 'A line of Scouts walks away down a dusty trail between tall pines, sunlight slanting through.',
    caption: 'First walk to the program areas.', focal: { x: 0.6, y: 0.75 } },
  { id: 'walking-alone', original: `${HS}331.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'campsite', release: 'public', gallery: true,
    alt: 'A Scout seen from behind walks along a shaded forest road toward camp.',
    caption: 'Heading back to the campsite.', focal: { x: 0.5, y: 0.5 } },
  { id: 'canvas-tents', original: `${HS}343.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'campsite', release: 'public', gallery: true,
    alt: 'A row of green canvas wall tents among pine trunks in the evening.',
    caption: 'Home for the week.', focal: { x: 0.45, y: 0.5 } },
  { id: 'tents-evening', original: `${HS}345.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'campsite', release: 'public', gallery: true,
    alt: 'Canvas tents in a forest clearing with one Scout crossing in the distance.',
    caption: 'Campsite, after dinner.', focal: { x: 0.5, y: 0.55 } },
  { id: 'campsite-gate', original: `${HS}064.jpg`, source: 'hi-sierra-2023', date: '2023-07-03', day: 2, category: 'place', release: 'public', gallery: true,
    alt: 'A log gateway at the entrance to a campsite in a shady pine forest.',
    caption: 'A campsite gateway.', focal: { x: 0.5, y: 0.5 } },
  { id: 'campsite-lineup', original: `${HS}249.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'campsite', release: 'public', gallery: true,
    alt: 'Scouts lined up for flag lowering beside a huge pine trunk in a campsite.',
    caption: 'Evening flags in the campsite.', focal: { x: 0.5, y: 0.6 } },
  { id: 'morning-assembly', original: `${HS}106.jpg`, source: 'hi-sierra-2023', date: '2023-07-04', day: 3, category: 'campsite', release: 'public', gallery: true,
    alt: 'Hundreds of campers gathered for morning flags in front of a lodge under a deep blue sky.',
    caption: 'Fourth of July morning flags.', focal: { x: 0.5, y: 0.65 } },
  { id: 'morning-field', original: `${HS}052.jpg`, source: 'hi-sierra-2023', date: '2023-07-03', day: 2, category: 'campsite', release: 'public', gallery: true,
    alt: 'Early sun and campfire haze over a meadow with flagpoles and tall pines.',
    caption: 'First full morning.', focal: { x: 0.5, y: 0.55 } },

  // ——— After dark ———
  { id: 'closing-campfire', original: `${HS}494.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'night', release: 'public', gallery: true,
    alt: 'A circle of figures holding torches around a small fire in a dark forest clearing.',
    caption: 'The last campfire of the week.', focal: { x: 0.45, y: 0.6 } },
  { id: 'campfire-silhouettes', original: `${HS}496.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'night', release: 'public', gallery: true,
    alt: 'Silhouetted heads in the foreground watch a fire burn in front of a row of torch-bearers.',
    caption: 'Front row at the closing campfire.', focal: { x: 0.6, y: 0.65 } },
  { id: 'campfire-ring', original: `${HS}486.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'night', release: 'public', gallery: true,
    alt: 'A long curved line of campers lit warm orange against total darkness.',
    caption: 'The whole camp in one ring.', focal: { x: 0.5, y: 0.45 } },
  { id: 'opening-show', original: `${HS}040.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'night', release: 'public', gallery: true,
    alt: 'A spotlight projects a round camp emblem into smoke above a crowd lit red by a campfire.',
    caption: 'Opening campfire, the first night.', focal: { x: 0.45, y: 0.4 } },
  { id: 'lodge-dusk', original: `${HS}039.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'night', release: 'public', gallery: true,
    alt: 'A lodge glowing with warm window light under a dusky sky framed by dark pines.',
    caption: 'Lights on at the lodge, 8:49 pm.', focal: { x: 0.5, y: 0.6 } },
  { id: 'dawn-cabin', original: `${HS}263.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'place', release: 'public', gallery: true,
    alt: 'A cabin roof beneath tall pines with the moon still up in a pale blue dawn sky.',
    caption: '5:22 am. Somebody was up early.', focal: { x: 0.5, y: 0.6 } },

  // ——— The place ———
  { id: 'tower-view', original: `${HS}140.jpg`, source: 'hi-sierra-2023', date: '2023-07-04', day: 3, category: 'place', release: 'public', gallery: true,
    alt: 'View from the top of the climbing tower over camp buildings, a flag and miles of pine forest.',
    caption: 'The view from the top of the tower.', focal: { x: 0.55, y: 0.45 } },
  { id: 'forest-from-tower', original: `${HS}232.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'place', release: 'public', gallery: true,
    alt: 'Looking straight down on dense pine forest with campsites and tents tucked between the trees.',
    caption: 'Camp from above.', focal: { x: 0.5, y: 0.5 } },
  { id: 'camp-from-tower', original: `${HS}234.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'place', release: 'public', gallery: true,
    alt: 'An aerial-style view of camp roofs, a parking area and forest stretching to the hills.',
    caption: 'Camp Hi-Sierra from the climbing tower.', focal: { x: 0.5, y: 0.5 } },

  // ——— Review only: identifiable youth (needs media-release confirmation) ———
  { id: 'troop-at-dining-hall', original: `${HS}000.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'campsite', release: 'review', gallery: true,
    alt: 'Troops 163 and 2163 in uniform, seated in rows in front of the timber Dining Hall entrance.',
    caption: 'Troops 163 and 2163 on arrival day.', focal: { x: 0.5, y: 0.7 } },
  { id: 'hauling-gear', original: `${HS}007.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'campsite', release: 'review', gallery: true,
    alt: 'Scouts carry sleeping bags and duffels down a sunny forest road toward their campsite.',
    caption: 'Hauling gear in, Sunday afternoon.', focal: { x: 0.5, y: 0.65 } },
  { id: 'trail-arrival', original: `${HS}017.jpg`, source: 'hi-sierra-2023', date: '2023-07-02', day: 1, category: 'campsite', release: 'review', gallery: true,
    alt: 'Scouts walk a dusty path into a hazy, sunlit meadow ringed by pines.',
    caption: 'Into camp.', focal: { x: 0.55, y: 0.6 } },
  { id: 'color-guard', original: `${HS}085.jpg`, source: 'hi-sierra-2023', date: '2023-07-03', day: 2, category: 'campsite', release: 'review', gallery: true,
    alt: 'A Scout carries the troop flag ahead of a line of Scouts leaving their campsite.',
    caption: 'Troop flag leading the way to dinner.', focal: { x: 0.35, y: 0.55 } },
  { id: 'forge', original: `${HS}189.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'skills', release: 'review', gallery: true,
    alt: 'Scouts in leather aprons gather around a glowing forge at the blacksmithing area.',
    caption: 'Blacksmithing, Wednesday morning.', focal: { x: 0.5, y: 0.55 } },
  { id: 'campfire-evening', original: `${HS}262.jpg`, source: 'hi-sierra-2023', date: '2023-07-05', day: 4, category: 'night', release: 'review', gallery: true,
    alt: 'Scouts in headlamps sit around a fire ring at night in their campsite.',
    caption: 'Campsite fire, Wednesday night.', focal: { x: 0.5, y: 0.55 } },
  { id: 'scout-teaching', original: `${HS}287.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'skills', release: 'review', gallery: true,
    alt: 'A Scout writes on a whiteboard while other Scouts sit and listen.',
    caption: 'Scouts teaching Scouts.', focal: { x: 0.6, y: 0.4 } },
  { id: 'dining-cleanup', original: `${HS}366.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'campsite', release: 'review', gallery: true,
    alt: 'A Scout sweeps under long dining tables after a meal.',
    caption: 'Table duty after lunch.', focal: { x: 0.6, y: 0.6 } },
  { id: 'board-game', original: `${HS}371.jpg`, source: 'hi-sierra-2023', date: '2023-07-06', day: 5, category: 'campsite', release: 'review', gallery: true,
    alt: 'Scouts crowd around a picnic table playing checkers at the trading post.',
    caption: 'Downtime at the trading post.', focal: { x: 0.5, y: 0.55 } },
  { id: 'two-friends', original: `${HS}406.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'campsite', release: 'review', gallery: true,
    alt: 'Two grinning Scouts in matching blue camp shirts throw peace signs at the camera.',
    caption: 'Day six. Still smiling.', focal: { x: 0.5, y: 0.4 } },
  { id: 'lashing-team', original: `${HS}444.jpg`, source: 'hi-sierra-2023', date: '2023-07-07', day: 6, category: 'skills', release: 'review', gallery: true,
    alt: 'Three Scouts lean in to tie off a lashing on a wooden tripod.',
    caption: 'Three people, one knot.', focal: { x: 0.5, y: 0.45 } },
  { id: 'packing-out', original: `${HS}500.jpg`, source: 'hi-sierra-2023', date: '2023-07-08', day: 7, category: 'campsite', release: 'review', gallery: true,
    alt: 'Scouts carry backpacks and sleeping pads past a row of canvas tents on the last morning.',
    caption: 'Packing out, 7:13 am.', focal: { x: 0.45, y: 0.55 } },
  { id: 'trailer-home', original: `${HS}521.jpg`, source: 'hi-sierra-2023', date: '2023-07-08', day: 7, category: 'campsite', release: 'review', gallery: true,
    alt: 'Scouts unload gear from the troop trailer in a sunny parking lot.',
    caption: 'Back in Milpitas, unloading the trailer.', focal: { x: 0.5, y: 0.5 } },

  // ——— Historical (Troop 163 Weebly site, 2014 or earlier) ———
  { id: 'clavey-ridge', original: 'weebly/clavey-2014.jpg', source: 'weebly-2014', category: 'history', release: 'review',
    alt: 'A line of backpackers with full packs on a rocky ridge above a deep forested valley.',
    caption: 'The Clavey backpacking trip (undated, before 2015).', focal: { x: 0.5, y: 0.5 } },
  { id: 'mt-tam-summit', original: 'weebly/mt-tam-2014.jpg', source: 'weebly-2014', category: 'history', release: 'review',
    alt: 'Scouts in green troop shirts at the stone summit lookout of Mount Tamalpais.',
    caption: 'Mount Tamalpais summit (undated, before 2015).', focal: { x: 0.5, y: 0.5 } },
]
