# Final audit

Date: 2026-11-14. Target: **https://troop163-milpitas.vercel.app** (public build). Everything below was measured; nothing is estimated.

## Deterministic checks

| Check | Result |
| --- | --- |
| `next build` (Next 16.4.6, Turbopack) | ✅ 15 static routes, 4 SSG trip pages |
| `tsc --noEmit` | ✅ no errors |
| `eslint .` | ✅ 0 errors, 0 warnings |
| Playwright + axe (`tests/site.spec.ts`), desktop 1440 and mobile 390 projects, **against the live URL** | ✅ **51 passed**, 1 skipped (a mobile-only test in the desktop project) |

The suite covers: every route returns 200 with one `h1` and no console errors; axe WCAG 2.0/2.1/2.2 A and AA rules show **no serious or critical violations** on all 9 pages at both widths; the 404 page; no horizontal overflow at 320px on every page; main navigation plus Back/Forward; the mobile menu (opens, Escape closes, focus returns); gallery filters (`aria-pressed`, counts change), the lightbox (opens, `?photo=` URL, ArrowRight steps, Escape closes and clears the URL, deep link opens); the contact composer builds a real `mailto:`; content visible with reduced motion; and the public build never references `/images/review/` (and that path returns 404).

## Lighthouse 13.6.0 (live site, default throttling)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| desktop / | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| desktop /gallery | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| desktop /join | 100 | 100 | 100 | 100 | 0.3 s | 0 | 0 ms |
| desktop /adventures/camp-hi-sierra-2023 | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| mobile / | 99 | 100 | 100 | 100 | 1.0 s | 0 | 140 ms |
| mobile /join | 94 | 100 | 100 | 100 | 3.0 s | 0 | 40 ms |
| mobile /gallery | 91 | 100 | 100 | 100 | 3.6 s | 0 | 40 ms |
| mobile /adventures/camp-hi-sierra-2023 | **85** | 100 | 100 | 100 | **4.4 s** | 0 | 40 ms |

**Below target:** the mobile trip page (Performance 85; simulated LCP 4.4s against a 2.5s target). Its LCP element is the full-bleed cover photo. The trace's observed breakdown is about 450ms (TTFB 146, load delay 59, download 153, render 94); the simulated figure comes from Lighthouse modelling a ~1,900px-wide cover over slow 4G. A quality-60 experiment scored no better (80–81, within noise), so it was reverted. Possible follow-up: art-direct a narrower mobile crop for trip covers.

**Fixed during QA** (measured before and after): mobile home Performance went from 71 to 99–100 and TBT from 2,430ms to 30–140ms, after removing `next/image` blur placeholders (their SVG blur filter was the 2.4s "unattributable" long task). Best practices went from 96 to 100 after adding an icon (the only console error was a `favicon.ico` 404).

## Visual QA passes

Screenshots: `docs/qa/screens/` (curated) and `docs/qa/raw/` (all passes, local only). Viewports checked: 1920×1080, 1440×900, 1280×800, 768×1024, 390×844, 375×812, 320×700.

**Pass 0 → 1**
1. The hero wordmark sat on top of the sailboat (the focal point). Recomposed: subject left, wordmark right-aligned at 13.2vw, caption bottom-left.
2. The 390px wordmark overflowed. Root cause: component classes were unlayered CSS, beating Tailwind's layered utilities. Moved them into `@layer components`.
3. The same root cause collapsed every `fill` photo to 0px (`.photo { position: relative }` overrode `absolute`).
4. The activity rows lost their 35% axis because `lg:col-span-4` reset `md:col-start-5`.
5. The "Before your first visit" inset photo was positioned against the grid cell instead of the photo.

**Pass 1 → 2**
1. Cover-cropped photos used `sizes="100vw"`, so phones got a soft 390px image for a 1,270px crop. `sizes` now accounts for the crop.
2. Join's "three steps" was a row of identical cards. It's now an editorial row: a large clay word, title and text.
3. The tripod fallback photo cropped to the back of a head. Replaced on Home and About.
4. With reduced motion on desktop, the week cards stacked in one narrow column. Now a two-column grid.
5. Privacy re-check: `forest-walk`, `climbing-wall` and `bouldering-start` showed identifiable faces at large crops. Moved to review-only.

**Pass 2 → 3**
1. The pinned week scene's heading collided with the first card (the `.frame` auto margins centred it). Now pinned to the gutter.
2. The last card never reached centre, so the day strip ended on Friday. The end position now centres Saturday.
3. Long card titles squeezed the right-aligned paragraph. The panel is now stacked and left-aligned.
4. Day-strip contrast over the busy photo: added a scrim and raised the label opacity.
5. On phones the hero lead sat on the bright sail. A taller, bottom-anchored photo lifts the sail above the copy, plus a soft text shadow.

**Bugs found by tests:** a hydration mismatch (React #418) in the gallery band under reduced motion, fixed with an identical element tree; axe label-in-name on the logo and day buttons, fixed; axe contrast on the decorative footer wordmark, now CSS-generated content; a 10px overflow at 320px from the story-cover entrance scale, fixed with `overflow-hidden`.

**Deployment bug caught by verification:** the first deploy reported **Ready** but served 404 for every route, because the CLI-created project had no framework preset. Fixed with `vercel.json` (`"framework": "nextjs"`) and re-verified anonymously.

## Creative-director pass (anti-slop)

- **Is it a genuine outdoor publication?** Yes. Photography leads every section, and the week scene is built from the troop's own timestamps.
- **Would a parent know what to do next?** "Come visit a meeting" is in the hero, the header, the "Before your first visit" section, the closing band, Join and Contact. Meeting day and time are stated plainly, along with the honest note that the address comes by email.
- **Would a 12–16-year-old think it looks fun?** Sailing, welding, climbing and torchlit campfires carry the page. The strongest kid-facing photos (two grinning Scouts, three Scouts on one knot) are in the review build pending releases. **The public site is noticeably less personal without them;** clearing releases is the biggest single upgrade available.
- **Template tells?** No icon-card grids, eyebrows, gradients (other than the scrim), glass, pill nav, fake stats or testimonials. Square photos, one accent.
- **Copy:** checked against stop-slop. No em dashes in site copy, none of the brief's banned phrases, and every fact traced to `source-of-truth.md`.

## Not run

- Taste-skill `inspect.mjs`, the transitions-agent motion audit and the full Impeccable audit command. Equivalent checks were done with our own Playwright scripts and manual review, as described above. Running them is a reasonable next step.
- Real-device testing (iOS Safari, Android Chrome). All browser testing used Chromium.
- INP: not measurable in the lab; TBT stands in for it.
