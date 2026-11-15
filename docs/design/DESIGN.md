# Design system: Troop 163, the Adventure Journal

The tokens live in `src/app/globals.css` (`:root` plus `@theme inline` for Tailwind). Component classes (`.t-*`, `.btn`, `.photo`, `.frame`, `.grid-12`) sit in `@layer components`, so Tailwind utilities can always override them.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F3F0E8` | Page ground (granite paper) |
| `--paper-2` / `--paper-3` | `#E7E3D7` / `#DCD6C6` | Tone steps for alternate sections and image placeholders |
| `--ink` | `#1E2622` | Running text (13.6:1 on paper) |
| `--ink-soft` | `#4A524C` | Captions and secondary notes (7.1:1) |
| `--forest` / `--forest-2` | `#18352C` / `#20443A` | Dark fields: Who can join, footer, motto tile |
| `--forest-soft` | `#B9C1AE` | Secondary text on forest |
| `--sage` | `#C2BE9A` | The closing field; the active marker in the day strip |
| `--clay` | `#A9512F` | **The one accent**: primary buttons and step words (white text 5.38:1) |
| `--clay-tone` | `#C26C46` | Decorative underline on strong links |
| `--night` | `#0F1613` | Behind photos (hero, week scene, lightbox) |

Rules: one accent, used for actions. Surfaces are separated by tone steps, never by hairlines. No gradients, except the neutral scrim under text on photos.

## Type

- **Newsreader** (variable, optical sizes 6–72, self-hosted, OFL) for display, headings, lead statements and quotes.
- **Instrument Sans** (variable, self-hosted, OFL) for body text, UI and captions.

| Role | Class | Size | Notes |
| --- | --- | --- | --- |
| Display | `.t-display` | clamp(5rem, 2rem + 15vw, 17rem) | Wordmark only. Leading 0.82, tracking −0.045em, opsz 72 |
| Head | `.t-head` | clamp(2.5rem, 1.6rem + 3.6vw, 5rem) | Section titles, max two lines |
| Lead | `.t-lead` | clamp(1.375rem, 1.1rem + 1vw, 2rem) | Statements, at most three lines |
| Title | `.t-title` | clamp(1.625rem, 1.3rem + 1.2vw, 2.5rem) | Row and card titles |
| Body | `.t-body` | clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem) | Leading 1.6, measure 34–56ch |
| Small | `.t-small` | 0.875rem | Captions and labels. Sentence case, never tracked caps |

No eyebrows, no monospace, no index numbers, and no styled accent words in headlines.

## Layout

- `.frame`: equal outer margins, `--gutter` = clamp(1rem, 0.6rem + 2vw, 2.5rem); max width 1680px.
- `.grid-12`: twelve columns, gap clamp(0.75rem, 0.4rem + 1.2vw, 1.75rem).
- `--section`: clamp(6rem, 4rem + 8vw, 13rem) between sections.
- Photos have square corners. Buttons use a 2px radius, decided once.

## Photography

- `<Photo>` (`src/components/photo.tsx`) is a focal-point-aware `next/image` frame. The aspect ratio is set per placement, and `object-position` comes from the manifest's focal point.
- The loading state is the `--paper-3` tone. Blur placeholders were removed after Lighthouse showed their SVG blur filter cost about 2.4s of main-thread time on mobile.
- For cover crops of landscape photos in portrait frames, `sizes` accounts for the crop (for example `(max-aspect-ratio: 3/2) 195vh, 100vw`), so phones get sharp images.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | cubic-bezier(0.23, 1, 0.32, 1) | Entrances and press feedback |
| `--ease-in-out` | cubic-bezier(0.77, 0, 0.175, 1) | Mask reveals (on-screen movement) |
| `--ease-drawer` | cubic-bezier(0.32, 0.72, 0, 1) | Mobile menu sheet |
| `--dur-press` | 140ms | Button `:active` scale(0.97) |
| `--dur-ui` | 220ms | Hovers, colour changes |
| `--dur-reveal` | 900ms | Section entrances, 80ms stagger |

- **Signature:** the pinned week scene (Motion `useScroll` + `useTransform`, transform only).
- **Hero:** a CSS-only entrance (photo settles from scale 1.06, then the words rise), which runs before hydration.
- **Reveals:** `[data-reveal]` rises 24px and fades in, and `[data-reveal="mask"]` wipes open with clip-path. Content is hidden only when `html.js` is set and motion is allowed, so without JavaScript everything stays visible.
- **Gallery:** the filter pill slides between options with a shared `layoutId` spring. Items fade and scale 0.97 to 1. The lightbox cross-fades, steps with the arrow keys or a swipe, and preloads its neighbours.
- `prefers-reduced-motion`: no pin, no drift, no rises. Only short fades remain.

## Accessibility contract

Visible focus (a 2px clay outline, sage on dark), a skip link, one `h1` per page, and native `<details>` for FAQs. The menu and lightbox are modal dialogs with focus traps, close on Escape and return focus. Every control has a 44px target, and visible labels match accessible names.
