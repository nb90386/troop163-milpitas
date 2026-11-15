# Troop 163 · Milpitas

The website for Scouts BSA Troops 163 (boys) and 2163 (girls) in Milpitas, California: an image-led "adventure journal" built around the troops' real week at Camp Hi-Sierra in July 2023.

- **Live preview:** https://troop163-milpitas.vercel.app
- Pages: Home, Adventures (plus one page per trip), Gallery, About, Join, Parents, Contact.
- Stack: Next.js 16 (App Router, fully static), React 19, Tailwind CSS 4, Motion, TypeScript. No database, CMS, analytics or form service.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npm run test:e2e     # Playwright + axe (run `npm run build` first, or set BASE_URL to a live URL)
```

Node 24 is used on Vercel; 22 or newer works locally.

## Edit content

Everything editable is plain TypeScript in `src/content/`:

| File | What's in it |
| --- | --- |
| `site.ts` | Meeting day and time, contact email, sponsor, founding years, external links. **Start here each September.** |
| `faq.ts` | Questions for Join and Home. Each answer is tagged `troop`, `scouting` or `ask`, so you know where it came from. |
| `adventures.ts` | Trip journal entries (newest first). |
| `week.ts` | The Hi-Sierra day-by-day text used on Home and the trip page. |
| `photo-manifest.ts` | Every photo: source, caption, alt text, focal point, category, and release status. |

Write like a person who was there. Only state what happened, and give an honest date ("before 2015" is fine).

## Add photos

1. Put originals in `source-assets/originals/<folder>/` (this folder is never committed or deployed).
2. Add an entry to `src/content/photo-manifest.ts`. Set `release: 'public'` **only** if no Scout can be identified; otherwise use `'review'`.
3. Run `npm run photos`. It strips all metadata (including GPS), resizes, and writes `public/images/…` (public) or `media-review/images/…` (review).
4. Set `focal` to where the subject is (0–1 across, 0–1 down), so every crop keeps it in frame.

## Add a trip

Add an object to `adventures` in `src/content/adventures.ts`:

```ts
{
  slug: 'pinnacles-2025',            // becomes /adventures/pinnacles-2025
  title: 'Pinnacles in the rain',
  when: 'March 2025',
  where: 'Pinnacles National Park',
  who: 'Troop 163',
  stats: [{ label: 'Distance', value: '9 mi' }],
  summary: 'One or two sentences for cards and search results.',
  body: [{ p: 'A paragraph.' }, { quote: 'Words a Scout wrote.', source: 'A Troop 163 Scout' }],
  cover: ['photo-id-from-manifest'], // empty array = typographic cover
  sourceNote: 'Written by the patrol leaders.',
}
```

The page, sitemap entry and gallery photos appear automatically.

## Photo privacy: two builds

| Build | Command | Shows identifiable youth? | Who can see it |
| --- | --- | --- | --- |
| Public | `vercel deploy --prod` | No | Everyone |
| Review | `vercel deploy --build-env PHOTO_MODE=review` | Yes | Vercel-authenticated team members (preview protection), `noindex` |

`media-review/` is gitignored, so review photos never land in a public repository. The Vercel CLI still uploads them because `.vercelignore` takes precedence. A Playwright test fails if a public build ever references `/images/review/`.

## Deploy

```bash
vercel link --project troop163-milpitas   # once
vercel deploy --prod                      # public site
vercel deploy --build-env PHOTO_MODE=review   # protected review preview
```

`vercel.json` pins the Next.js framework preset. Without it, a project created from the CLI serves only static files.

## Docs

- `docs/content/source-of-truth.md`: verified facts, sources and unknowns
- `docs/content/photo-inventory.md`, `photo-selection.md`: what exists, what's used, and permissions
- `docs/design/DESIGN.md`, `visual-direction.md`: the design system and why
- `docs/research/troop-website-benchmark.md`: ten troop sites studied
- `docs/engineering/design-tooling.md`: skills and dependencies actually used
- `docs/qa/final-audit.md`: test results and remaining issues
- `docs/launch/leadership-review.md`: **what leadership needs to confirm before launch**

This is the troops' own website, not an official site of Scouting America or the Silicon Valley Monterey Bay Council. Photos © the troop families; please don't reuse them.
