# Design tooling: what was available and what was actually used

Audited on 2026-11-14 on the build machine.

## Skills

| Skill | Status | How it was used |
| --- | --- | --- |
| **taste-skill** (`design-taste-frontend` v2.1.5, plugin) | Installed, loaded | Ran `draw.mjs` (sector nonprofit, seed 619430176) and dealt three directions; "The place carries it" was chosen (see `docs/design/visual-direction.md`). Its house rules were applied: no eyebrows, hairlines, gradients, monospace, icon cards, glass or pill nav; headlines of two lines or fewer; equal margins. Its blueprints shaped the sections. The palette and type were redrawn from the brief, with the reasons recorded. `inspect.mjs` was **not** run; equivalent checks ran through our own Playwright scripts (see QA). |
| **impeccable** | Installed | Its write hook scanned every file written ("no deterministic design-quality issues found" each time). The critique followed its structure: top issues, fix, re-shoot, compare. The full `/impeccable audit` command was not run. |
| **scroll-craft** | Installed | Its method (visitor journey, one emotional peak, one bespoke signature move, a separate mobile composition, verification with motion on and with reduced motion) shaped the week scene. Its engine and kie.ai generation were **not** used, since the troop's real photos were the brief. |
| **transitions-agent** (transitions.dev) | Installed | **Not run.** The motion audit was done by hand against Emil Kowalski's rules (below). Running `npx transitions-agent` is a reasonable next step. |
| **stop-slop** | Not installed; cloned to a scratch folder and `SKILL.md` read | Its rules were applied to all copy: no em dashes in site copy, active voice, specifics over abstractions, no "not X, it's Y", no pull-quote lines. |
| **emilkowalski/skills** (`emil-design-eng`, `animate`, `review-animations`, …) | Not installed; cloned to a scratch folder and `emil-design-eng` read | Applied the easing curves (`--ease-out`, `--ease-in-out`, `--ease-drawer`), UI durations under 300ms, `:active` scale 0.97, no `transition: all`, transform and opacity only, and no animation on keyboard-repeated actions (lightbox stepping is a 300ms cross-fade). |
| **ui-ux-pro-max** | Not installed; cloned for reference | Not used beyond a skim. The design system came from the taste-skill draw plus the brief. |

Nothing was installed into the user's global skill folders. The clones live in the session scratch directory.

## Framework and dependencies (pinned)

| Package | Version | Why |
| --- | --- | --- |
| next | 16.4.6 | App Router, static generation, `next/image`, metadata routes |
| react / react-dom | 19.3.1 | |
| motion | 14.14.0 | Scroll-linked week scene, gallery layout animation, menu and lightbox presence |
| lucide-react | 1.73.0 | Four utility icons (arrows, close) |
| tailwindcss / @tailwindcss/postcss | 4.3.5 | Utilities on top of the token CSS |
| typescript | 6.0.3 | TS 7 (native) was available, but Next's type-check integration is proven on 6 |
| eslint 9 + eslint-config-next 16.4.6 | | Flat config |
| sharp | 0.35.5 (dev) | Photo processing script |
| @playwright/test 1.65.1, @axe-core/playwright 4.14.0 | dev | E2E and accessibility tests |
| Fonts | Newsreader and Instrument Sans (Fontsource, OFL) | Self-hosted via `next/font/local`, so builds never depend on a font CDN |

**Evaluated and not added:** shadcn/ui (too component-library looking; native `<details>` and two hand-built dialogs cover it), GSAP/ScrollTrigger and Lenis (Motion already covers the one scroll scene; no scroll-jacking wanted), Magic UI, React Bits and Motion Primitives (decorative effects the brief bans), any CMS, database, analytics or form service.

## Tools

- Playwright's Chromium (already installed) for scraping the album, screenshots and tests. Chromium needs the macOS sandbox disabled to launch on this machine.
- Lighthouse 13.6.0 (via npx) for performance, accessibility, best-practice and SEO scores.
- Vercel CLI 59.0.0 (upgrading to 65 is recommended) for project creation and deploys.
