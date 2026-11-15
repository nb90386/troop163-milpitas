# Photo inventory

Generated from the album scrape (`scripts/research/album-inventory.mjs`) on 2026-11-14.

## Source 1: Google Photos shared album "2023: Hi-Sierra" (July 2–8, 2023)

- URL: supplied by the user (the second URL supplied was identical and was deduplicated).
- Accessed with a headless browser through the public share link. No login, no bypass. Originals came from the album's own download control (`=d`).
- **1035 items: 523 photos and 512 videos.** 521 of the 523 photos were reviewed on numbered contact sheets; 2 never exposed a thumbnail URL and were not reviewed.
- No GPS tag was found in the sampled original's EXIF. All published files are re-encoded with every metadata block stripped anyway.

| Day | Photos | Videos |
| --- | ---: | ---: |
| Jul 2, 2023 | 44 | 45 |
| Jul 3, 2023 | 56 | 46 |
| Jul 4, 2023 | 83 | 99 |
| Jul 5, 2023 | 80 | 166 |
| Jul 6, 2023 | 84 | 57 |
| Jul 7, 2023 | 152 | 94 |
| Jul 8, 2023 | 24 | 5 |

### What the album contains (from visual review)

- Arrival and hauling gear (Jul 2), troop group portraits at the Dining Hall, campsite gatherings at "Chippewa".
- Waterfront: buddy-tag board, canoe and kayak rescue practice (Jul 5), **catamaran sailing on Pinecrest Lake (Jul 6)**.
- Climbing tower, bouldering with crash pads and helmets, views from the tower top.
- Program areas: archery, rifle and shotgun ranges, welding and blacksmithing, handicraft, pioneering (tripods, lashings), wilderness survival shelters, surveying, flag ceremonies, dining hall.
- Night: opening campfire show (Jul 2), campsite fires, closing campfire by torchlight (Jul 7).
- Departure (Jul 8): packing out past canvas tents, unloading the troop trailer.
- Other troops appear in some program-area photos (for example a Troop 792 Gilroy shirt), so photos were checked for that before selection.

### Deliberately not used

- Firearm range photos (accurate and supervised, but not the first impression for a recruitment page).
- A Scout asleep on a picnic table, repeated group portraits, blurred or very dark frames, menus and paperwork.

## Source 2: Troop 163's old Weebly site (≤ 2014)

- `clavey-2014.jpg` (697×523), `mt-tam-2014.jpg` (697×523), `hisierra-sign-2014.jpg` (668×501). Low resolution with identifiable youth, so review build only.

## Source 3: TroopWebHost public pages

- 12 photos at 480 px wide, plus a banner. Too small for this design, and most show identifiable youth. Catalogued in `source-photo-leads.md`; none used.

## Other albums

- None linked publicly from either troop site (see `source-photo-leads.md`).

## Where files live

- Originals: `source-assets/originals/` (local only, gitignored, never deployed).
- Review thumbnails and contact sheets: `source-assets/review-thumbs/`, `source-assets/contact-sheets/` (local only).
- Public web masters: `public/images/hi-sierra-2023/`. Review-only masters: `media-review/images/` (gitignored; copied in only for `PHOTO_MODE=review` builds).
