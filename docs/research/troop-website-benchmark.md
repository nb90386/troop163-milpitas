# Troop Website Benchmark — Troop 163 Redesign

Researched 2026-11-14. Ten reference troop sites plus two found by search.
Purpose: learn content and IA patterns for the Join / FAQ / Parents pages and spot pitfalls. None of their photos, text or branding will be reused.

**Evidence key**
- **[H]** fetched HTML converted to text (WebFetch). Reliable for content, IA, alt text and link targets; tells us nothing about visuals.
- **[S]** headless Chromium render (1440×900 desktop / 390×844 mobile): screenshots in `docs/research/screens/`, plus measured load-to-network-idle time, horizontal overflow, image and alt counts.
- **[C]** curl status, redirect and timing check.
- I didn't run Lighthouse or contrast measurements. Contrast notes are judged by eye from screenshots.

## Availability snapshot

| Site | Platform | curl [C] | Browser load [S] | Notes |
|---|---|---|---|---|
| tayhouse.org (T19) | WordPress | 200, 1.4s | 3.5s | OK |
| troop254.org | Squarespace | 200, 0.9s | 3.7s | 22 of 24 images have no alt text |
| troop642.org | Weebly | 200 (→ /index.html) | 3.0s | OK |
| scoutsbsadcgirls.org (T248) | WordPress block theme | **406** to curl | 2.5s | Bot filter; loads fine in a real browser |
| troop691.net | Squarespace | 200 | **6.2s** | Slowest; 10,880px-tall mobile page |
| troop-114.org | Wix | 200, 1.4 MB HTML | **timed out at 30s** (network-idle) | Heavy Wix page; no screenshot |
| bsa365.org (T365) | Google Sites | 200 | 4.9s | All 4 images have no alt text |
| t120.us (T120 Fremont) | Vite SPA (React/Tailwind look) | 200, **761-byte shell** | 1.3–1.7s | Empty without JS; non-JS fetchers see only "Troop 120" |
| troop30.net | Google Sites | 200 | 3.5s | All 4 images have no alt text |
| bsatroop449.org (T449 Fremont) | WordPress (theme "scouttroop") | **406** to curl | 1.4s | Bot filter, like T248 |

No site showed horizontal overflow at 390px [S]. Every site had a working mobile menu toggle in its mobile render [S].

---

## Site-by-site

### 1. Tay House Troop 19 — tayhouse.org  [H + S]
- **Issues:** stray "No results" text above the nav on every page (a leftover search widget). Empty alt text on gallery and hero photos. Icon-only social links with no accessible name. Join page heading levels jump H2 → H6 → H5.
- **Home + join:** split hero with a three-beat headline ("Forge Friendships. Explore… Become a Scout."), two buttons (Join / Events) and a real trail photo. The redundant "Home" page-title band pushes the hero down [S]. The join page has a 5-step "Here's How" list (contact → attend a Monday → apply → fees → start) and a short Q&A covering Cub Scout prerequisite, scout-led vs parent-led, parent committee and funding. It lists no dollar amounts.
- **Images:** real, unstaged troop photos, which is good. The gallery is a single uncaptioned grid of 7 images with camera filenames, no albums and no visible lightbox.
- **Nav/mobile:** clean 6-item nav with an About dropdown (Youth Leadership, Advancement, Outdoor Experiences, Adult Leaders, Fundraising & Parent Involvement). Hamburger on mobile.
- **Strongest idea:** identity built on a long history ("since 1919") and a clear scout-led promise. "About" is split into the questions parents actually ask.
- **Avoid:** placeholder artifacts, generic CTA headline copy, a gallery without context.
- **Adapt:** **"Is it scout-led or parent-led?"** as an explicit FAQ, with an answer that explains who does what.

### 2. Troop & Crew 254 — troop254.org  [H + S]
- **Issues:** hero headline sits under the fixed header and is clipped at 1440px [S]. White wash over the hero photo flattens it [S]. Logo file is still named "Squarespace Logo.png". The newsletter block shows a setup error ("needs a storage option"). Upcoming Events is empty. The "Join Venturing" button points to a `test.` subdomain. 22 of 24 images have no alt text. A guessed Webelos URL returned 404; the real one wasn't found.
- **Home + join:** a 14-section homepage. "The Patrol Method" section is a heading with no body. Joining means two buttons at the very bottom that go to a generic contact page.
- **Images:** slider hero with arrows and dots [S]. Some images look like stock.
- **Nav/mobile:** utility-heavy nav (Board of Review, Reimbursements, Scoutbook) aimed at current members, not newcomers.
- **Strongest idea:** an inline stats band (Eagles, service hours) and a single site for the troop and its Venturing crew.
- **Avoid:** carousels, empty sections, section headings with no content, unreplaced template defaults.
- **Adapt:** a small **"by the numbers" strip, but only with verified figures**.

### 3. Troop 642 "The Rainmakers" — troop642.org  [H + S]
- **Issues:** every image has the alt text "Picture" and no caption. The Troop Calendar heading has nothing under it. The join page has empty links and typos.
- **Home + join:** the homepage *is* the trip feed: dated campout recaps (date range, 50–150 words, photo grid, some with a Scout byline). Join page: contact a named adult; the **prospective Scout must make the scheduling call himself**; then a joining conference before the meeting at 6:30 PM. It lists forms as PDFs with file sizes. No costs, no eligibility, no what-to-bring.
- **Images:** real trip photography in grids. The mobile hero is a group photo under a dark scrim with thin light text [S]. A "Like us on Facebook" pull quote in pale grey italic has weak contrast [S].
- **Nav/mobile:** 12 flat nav items. The blog archive goes back to 2017 by month with an RSS feed but has gaps.
- **Strongest idea:** **Scout-written trip recaps** with bylines. Scouting Magazine singled this troop out in 2019 for its youth-written blog.
- **Avoid:** uncaptioned photo dumps, inconsistent bylines, flat month archives with no filtering.
- **Adapt:** a **trip recap card**: title = place + month, date range, 1–2 paragraph Scout-voice summary, Scout first name/patrol only, a 3–6 photo set with captions.

### 4. Troop 248 for Girls (DC) — scoutsbsadcgirls.org  [H + S]
- **Issues:** returns 406 to non-browser clients. The body's parent link and the nav's parent link point to different URLs. A "Contact Information Form" link goes to the volunteers page. Some content is dated (a 2018 gift page). Eligibility wording is convoluted.
- **Home + join:** the most practical homepage of the set. The hero gives four buttons (**Join · Meeting & Location · Volunteer · Parent Information**) [S]. The first paragraph answers *when and where*: Saturdays 10–12, Sept–June, a named church with a transit landmark and a transportation link. The join page has three paths: **new to Scouting / crossing over from Cub Scouts / just visiting**.
- **Parents page:** the best reference content found. **Real costs** (semester dues, ~$40 per campout including food, ~$500 summer camp), a sibling discount, "camperships" financial aid, no product sales, time commitment (meetings 2–3×/month, ~8 optional overnights/year with ≥4 recommended), drives within 2 hours, a uniform bank, loaner gear, "expensive gear not required", and adult safety/training explained.
- **Images:** almost none: one low-resolution patch thumbnail. The hero is a dark photo behind red pill buttons [S].
- **Nav/mobile:** Join / About / Adults dropdowns that are clearly audience-split. The About menu covers Uniforms, Camping, Troop Organization, Buddy System and more.
- **Strongest idea:** **answer cost, time and logistics up front**, plus the *"uniforms can come later"* reassurance.
- **Avoid:** long undifferentiated text pages, typos, link drift between nav and body.
- **Adapt:** a **"What it really costs" table** (dues / campout / summer camp / uniform) with financial aid and loaner-gear notes beside it.

### 5. Troop 691 (Irvine) — troop691.net  [H + S]
- **Issues:** slowest load (6.2s) and a 10,880px mobile page [S]. Raw, malformed application URLs are printed in the body text (trailing ")"), visible on mobile [S]. Duplicated section headings, stray "SCROLL DOWN" text, testimonial typos. The photo gallery is password-protected. 5 of 17 images have no alt text. Meeting time is inconsistent ("7 to about 8:30" vs "every Monday").
- **Home + join:** a dense intro card over a photo with the history (founded 1972, 190+ Eagles), the meeting time, "email to arrange a visit", a video link and an apply link, all in one italic block [S].
- **Images:** mostly icons and graphics (Scout Law image, logos). The real photos sit behind the password.
- **Nav/mobile:** a "Troop Secured Information" menu mixes public and private content in the main nav.
- **Strongest idea:** **testimonials** from Eagle Scouts and a parent. A private photo area is a defensible youth-privacy choice.
- **Avoid:** pasting raw URLs, italic body copy, member-only links in public nav.
- **Adapt:** **2–3 short attributed quotes** (Scout first name + rank/year, or "parent of a first-year Scout"), placed on the Join page.

### 6. Littleton Troop 114 — troop-114.org  [H only; render timed out]
- **Issues:** the Wix page never reached network-idle within 30s [S attempt]. 1.4 MB of HTML [C]. "Join Troop 114" and "Welcome" both point to `/webelos` (titled "Activities for Webelos"). The camping schedule is an image labeled 2020. "Calender" typo. Event dates without years. A YPT link points to the wrong learning plan.
- **Home + join:** opens with the facts (founded 1941, grades 6–12, Thu 7:00–8:30). Upcoming Eagle projects and Courts of Honor with RSVP links. Join page: **named "visit nights"** (skills competition, urban survival, game night), "join any time", "just show up or email", a "Top 10 reasons" list, and an "Ask a question" pre-filled email.
- **Images:** event posters and inline photo grids. Many images have empty alt text.
- **Nav/mobile:** **Scout's Corner / Parent's Corner** split, Downloads, Camping, member Log In. No mobile check was possible.
- **Strongest idea:** **themed open-house nights for visitors**, plus audience-split corners.
- **Avoid:** image-only schedules, stale years, heavy builder pages.
- **Adapt:** the **"Ask a question" low-commitment CTA** next to "Plan a visit".

### 7. Troop 365 (Worthington, OH) — bsa365.org  [H + S]
- **Issues:** Google Sites. All 4 homepage images have no alt text [S]. "Merit badges" appears three times in one list. Empty anchor blocks. Links wrapped in Google redirects. The FAQ has a stale "2025 dues" note and an orphaned question.
- **Home + join:** welcome with meeting time and place, "What we do" tags, an embedded Google Calendar, fundraisers, policies, forms, and finally "Visit Us" (Google Form) and "Apply Now" buttons at the bottom.
- **Parent FAQ (the standout):** **38 questions in 6 groups** (General; Patrols & Advancement; Dues/Fundraisers/Escrow; Websites & Tech; Gear & Uniforms; Camping & High Adventure) with a linked index at the top. It answers with real numbers (annual dues, $20–45 per campout, ~$325 summer camp, ~$70 uniform plus a uniform closet) and covers the anxious-parent questions: *"Do I have to attend camp outings?"*, *"Our family has never camped… what should we buy?"* (answer: don't buy yet, talk to a leader), *"Can Scouts use phones?"*, "parents can't sign off on requirements", and two-deep adult supervision.
- **IA:** the deepest nav in the set (Trip Planning: sleeping warm, cooking, backpacking; PLC Meetings; Patrols). Thorough but overwhelming for a newcomer.
- **Strongest idea:** **FAQ grouped by topic, with an index, honest numbers and empathetic questions.**
- **Avoid:** putting internal policies and committee news on the public homepage, embedded calendar iframes as the main event UI.
- **Adapt:** the **grouped FAQ with a jump index**, including the "never camped before" and "do I have to come camping" questions.

### 8. Troop 120 (Fremont) — t120.us  [S; H failed]
- **Issues:** **client-rendered SPA**: a 761-byte HTML shell [C], so WebFetch and any non-JS crawler or link preview sees only "Troop 120" (bad for SEO and sharing). Nav items are `<button>`s, not links, and **the URL never changes** (`/join` and `/join-us` both render the homepage), so pages can't be bookmarked, shared or reached with the back button [S]. The Gallery page rendered with no photos at time of check [S].
- **Home + join:** a three-photo mosaic hero (flag ceremony, campfire, kayak) [S], intro copy, four icon cards (Scout-Led / 10–11 Campouts / First Year Program / Community Service), and **meeting info split into school-year and summer locations**. The Join view is the best-written join flow in the set: *"Getting Started is Easy — three steps, no commitment required to visit"*. 1) Visit a Wednesday meeting, "no registration needed for your first visit". 2) Meet the Scouts & leaders, "we'll introduce you to the New Scout patrol". 3) Join, "our New Member Coordinator will guide you". Then a "What to Expect" section that names parent worries ("trying something new can feel uncertain"): Fun, Safety First (trained, background-checked adults), Leadership, Inclusive. An optional "Let us know you're coming" form ("you're always welcome to just show up").
- **About:** honest specifics: ~50 Scouts with 8–10 first-years, ages 10½–18, founded Oct 2017 after splitting from Troop 199, 25+ average attendance, chartered org and council named.
- **Images:** real photos, but used as a cropped banner mosaic. Icon cards in tinted circles are generic SaaS styling [S].
- **Strongest idea:** **reassurance-first join copy and a named New Member Coordinator plus New Scout patrol.** It is also the closest geographic peer (same council area as Milpitas).
- **Avoid:** SPA without SSR or real routes, button-based nav, generic icon-card grid.
- **Adapt:** **three-step "Visit → Meet → Join" with a microcopy line under each step**, plus the "optional heads-up form" pattern.

### 9. Troop 30 (Phoenix) — troop30.net  [H + S]
- **Issues:** Google Sites. All images have no alt text [S]. Empty headings and anchors. Location wording is inconsistent (Phoenix vs Paradise Valley). Saturated blue band with white headline (readable but harsh) [S]. The join page has no dues amount, and its FAQ is only a link to an external BSA FAQ.
- **Home + join:** group photo hero [S], program summary, Scoutmaster email, embedded calendar, map image linked to Google Maps, and a "COME CHECK US OUT!" block with time and address plus "contact us in advance". The join page is organized into Online Application / Dues / Meetings / **Documents and Forms (which medical form parts are needed for which trip length)** / Campouts (**each patrol buys its own food**) / Come Visit Us.
- **Strongest idea:** the **map plus meeting block** on the homepage, and a clear explanation of medical form A/B vs C.
- **Avoid:** repeated "More" menu, outsourcing the FAQ to national.
- **Adapt:** a **"Forms you'll need, and when" mini-table** (Part A/B for short campouts; A/B/C for summer camp or high adventure).

### 10. Troop 449 (Fremont) — bsatroop449.org  [H + S]
- **Issues:** 406 to curl. Hero image is the theme vendor's demo photo (Eagle uniform close-up), hosted off-site [S]. Grey bordered box "buttons" [S]. The homepage is a blog post "by Webmaster". The FAQ publishes adult leaders' personal emails, includes a misspelled email domain, a broken relative uniform link and typos ("Camp High Serria"). "8 of last 10 Eagle" claim. "Privacy Policy" sits in the primary nav.
- **Home + join:** welcome post, then "About Our Troop" (Location & Meetings, Inclusive Community, Adventures & Service) and "Why Join". No join page: the CTA is Contact.
- **FAQ:** 19 questions on one flat page with no grouping or accordion. It starts well ("What is Scouting America?", **"Is there an easy way to figure out if I like the troop before joining?"**, Who can join, How to join), then mixes in advancement, Eagle process and data handling. **No costs anywhere.** Good line: anyone under 18 must have a parent contact the troop, and parents are copied on Scout emails (youth protection made visible).
- **Strongest idea:** an FAQ that covers safety/supervision, conduct, service hours (including the high-school service requirement) and a privacy answer.
- **Avoid:** stock or theme imagery, a flat 19-item list, publishing personal emails, unverifiable claims.
- **Adapt:** **"How do you keep Scouts safe?"** and **"What happens to our information?"** as plain FAQ answers.

### Extra finds (web search)
- **Pack 907 "New Parents"** (ncac-pack907.pages.dev/new-parents/) [H]: a Cub pack, so different audience, but the best-structured *page* found. **"Your First Few Weeks" as 6 numbered steps**, a **"Communication Channels" table (which info lives in which tool)**, uniform-by-event, dues coverage plus aid, "What to Expect at Meetings". Static site, skip link, clear headings. Flaw: its table markup is broken in source.
- **Troop One (Brentwood TN)** (troopone.org) [H]: I looked at it and **didn't include it as a model**: thumbnail grid with filename alt text, a "TempWebBanner" file, no join content. Its 2026 onboarding handbook PDF has a useful "bring to meetings: handbook, pen, uniform over Scout tee" list.
- Scouting Magazine's 2019 roundup praised **brief write-ups per past event** (Troop 310), **clear and comprehensive campout pages over fancy design** (Troop 570) and **youth-written blogs** (Troop 642). BSA guidance from the same sources: don't expose Scouts' last names, trip itineraries or member contact details.

---

## Patterns we will adapt for Troop 163

**Join page (parent-oriented)**
- **Answer-first hero:** who it's for (ages/grades), when (day, time, months) and where (named venue + Milpitas). Primary CTA "Plan a visit", secondary "Ask a question". *(T248, T114)*
- **Three steps: Visit → Meet the troop → Register**, each with one reassurance line ("No registration needed for your first visit", "You'll meet our new-Scout patrol", "A named adult will walk you through registration"). *(T120)*
- **First-visit checklist:** what to wear (comfortable clothes; no uniform needed yet), what to bring (water bottle, notebook/pen), when to arrive (10 min early, which door, parking), who will greet you, how long it lasts, whether parents stay. *(gap in every site; partials in T248, Pack 907, Troop One)*
- **Optional heads-up form** ("Let us know you're coming — or just show up"). *(T120, T365)*
- **Three entry paths:** new to Scouting / crossing over from Cub Scouts / transferring from another troop. *(T248)*
- **Eligibility in one plain sentence**, not legal-style OR chains (several sites got this wrong). Every age rule must be verified against current Scouting America rules.
- **"Is it scout-led?"** explained in two sentences on the page. *(T19, T120)*
- **Short quotes:** 2–3 attributed by first name and role, e.g. "parent of a first-year Scout". Only real, permissioned quotes. *(T691)*

**Parents page**
- **"What it really costs" table:** annual dues, typical campout, summer camp, uniform. Next to it: financial aid, the uniform/loaner gear bank, and "don't buy gear before your first campout". *(T248, T365)* Only figures the committee confirms.
- **Time commitment at a glance:** weekly meeting length, outings per year, summer camp week, minimum participation expectations (or "none"). *(T248, T365)*
- **"Forms you'll need, and when":** Health form A/B vs A/B/C by trip type, and when they're due. *(T30, T642)*
- **Communication channels table:** where announcements, the calendar, RSVPs and advancement live, mapped to whatever tools Troop 163 actually uses. *(Pack 907, T365)*
- **Safety & Youth Protection in plain language:** trained, background-checked adults; two-deep leadership; parents copied on Scout messages. *(T120, T449, T365)*
- **How parents help:** drivers, committee, merit badge counselor, campout chaperone (with the YPT/registration requirement stated). *(T248, T449)*

**FAQ**
- **Grouped by audience, then topic**, with a jump index and native `<details>` accordions:
  - *For parents:* cost, time, safety, "do I have to come camping?", "we've never camped, what should we buy?", "can my Scout do sports too?", phones on trips.
  - *For Scouts:* what a patrol is, how ranks work, what campouts are like, leadership roles.
  - *Getting started:* "can we try it before joining?", Cub Scout crossover, mid-year joining. *(T365 grouping, T449 opening questions)*
- Every answer short (2–4 sentences) and linked to the deeper page. Show a visible "last reviewed" date so stale numbers are obvious. *(T365's stale-dues problem)*

**Trips / gallery**
- **Trip recap entries:** place + month title, date range, 1–2 paragraph Scout-voice summary, first-name or patrol byline only, captioned photo set. *(T642, Troop 310 per Scouting Magazine)*
- **Album-based gallery** filterable by trip/season/activity, with descriptive alt text and captions. *(the opposite of T19, T642, Troop One)*
- **Verified "by the numbers" strip** (year chartered, Eagles, campouts per year) only if each figure is sourced. *(T254, T120)*

**Site-wide**
- An **audience-split nav entry** ("New families" vs "Current Scouts & parents") so member utilities don't crowd out newcomers. *(T248, T114)*
- A **meeting block** in the footer of every page: day, time, venue, map link, school-year vs summer variants if needed. *(T120, T30)*

## Common weaknesses to avoid
- **Placeholder and template leftovers:** "No results", "Squarespace Logo", newsletter setup errors, theme demo images, "by Webmaster" posts, `test.` links. (T19, T254, T449)
- **Empty or headline-only sections:** "Upcoming Events" with no events, a "Patrol Method" heading with no body, a "Troop Calendar" heading with nothing under it. (T254, T642)
- **Missing or useless alt text:** empty alt, "Picture", camera filenames. This affected 8 of 10 sites.
- **Costs hidden "until application"** (T19, T30, T449). This was the most common gap, and the question parents most want answered.
- **Stale facts:** undated event years, "2025 dues" notes, a 2020 schedule image, 2018 pages. Every time-bound fact needs a date and an owner.
- **SPA without real URLs or SSR** (T120): no deep links, no back button, invisible to crawlers and link previews.
- **Raw URLs, italic paragraphs, typos, and contradictory meeting times** (T691, T449, T114).
- **Member-only and policy links in primary nav** ("Troop Secured Information", "Privacy Policy", Reimbursements).
- **Carousels/sliders** that hide the headline (T254), **generic icon-card grids** (T120, T254), **washed-out hero overlays** (T254), **low-contrast grey italic pull quotes** (T642).
- **Privacy slips:** personal leader emails on public pages (T449), full Scout names alongside photos. Use a role address (e.g. a troop inbox) and first names only.
- **Embedded Google Calendar as the main events UI** (T365, T30): poor on mobile and unstyled.
- **Unverifiable marketing claims** ("premier", "8 of last 10…") with no source.

## Original design decisions for Troop 163
Concept: **"Adventure Journal"**. Editorial, photo-led, honest. These are deliberate departures from every site above, none of which treats its photography as the main content.

1. **Photography as content, not decoration.** The Camp Hi-Sierra (July 2023) album is the visual spine. Show images large and edge-to-edge or on a deliberate editorial grid, never cropped into a banner mosaic or tucked in thumbnails. Every image gets a caption (place, activity, month/year) and descriptive alt text. No stock, no theme imagery.
2. **Paper, forest, clay.** Warm ivory/paper backgrounds, deep forest green for text and structure, clay/terracotta for the single action color. Define these as tokens with a tested dark-on-paper contrast of at least 4.5:1 for body text. No gradients, glows or glass.
3. **Editorial serif headlines plus a quiet sans for UI.** Generous measure (~65ch), real hierarchy (one H1 per page, no level skipping), journal-style dates and place lines ("Camp Hi-Sierra · July 2023").
4. **One signature scroll-driven photo story:** "A Week at Camp Hi-Sierra", told day by day as a sequence of captioned photographs with short Scout-voice lines. Use pinned/sequenced imagery, not parallax for its own sake. It must work with `prefers-reduced-motion` (it becomes a plain vertical photo essay) and on mobile (its own composition, not a squeezed desktop layout). This is the only bespoke motion on the site.
5. **Filterable gallery with lightbox.** Albums by trip, filters by season or activity. Use an accessible lightbox: focus trap, Esc to close, arrow keys, swipe on touch, captions shown inside the lightbox, URL-addressable images so a photo can be shared. Lazy-load responsive images (AVIF/WebP with explicit dimensions) to avoid the 3–6s loads seen above.
6. **Parent-oriented join path as a guided page, not a form dump.** Order: answer-first facts → three steps → first-visit checklist → costs and time → safety → grouped FAQ → "Plan a visit / Ask a question". The CTA appears once at the top and once at the end, never as a stack of four buttons.
7. **Honest, verified facts only.** Every number (dues, campouts per year, Eagles, founding year, meeting time and place) comes from the troop committee and carries a "last verified" date in a single data source, so the site never shows a stale or invented figure. Where a fact isn't confirmed, omit it. Don't use placeholder copy.
8. **Real routes, static-first rendering.** Every page and every gallery album/photo gets a shareable URL, server-rendered or statically generated HTML (unlike T120's SPA shell), proper `<a>` navigation, and Open Graph images built from real trip photos.
9. **Youth privacy built in.** Scout first names or patrol names only. No itineraries for upcoming trips. A role email address instead of personal ones. Group shots chosen over identifiable close-ups where permission is unclear. A visible note that photos are shared with family permission.
10. **Navigation in two registers.** A primary nav for newcomers (Journal/Trips, Gallery, About, Join, Parents/FAQ) and a separate, low-key "Members" area for calendar, forms and tools, so utility links never crowd the story.
