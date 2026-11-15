# Leadership review before launch

The preview is live at **https://troop163-milpitas.vercel.app** (public build: no close-ups of Scouts). It's a separate Vercel project. The TroopWebHost site and the old Weebly site are untouched.

## 1. Facts to confirm

Each item below appears on the site. Edit `src/content/site.ts` or `src/content/faq.ts` to change it.

| Shown on the site | Source | Confirm |
| --- | --- | --- |
| Meetings: **Mondays, 6:30–8:00 PM, in Milpitas** | TroopWebHost home page (undated) | Still current? Same night for both troops? |
| Meeting **address is not published**; families get it by email | — | OK to keep it private, or publish it? |
| Contact: **bsa2163girlsmilpitas@gmail.com** for both troops | TroopWebHost About page | Is it monitored? Is there a Troop 163 address that should be used instead or as well? |
| Troop 163 founded **1993**; Troop 2163 **March 1, 2019**, first all-girl troop in Milpitas | TroopWebHost About; Milpitas Beat (2021) | ✓ |
| Sponsor: **Rotary Club of Milpitas** | TroopWebHost; the Rotary's own page says "Milpitas Rotary Foundation" | Which legal name should appear? |
| Serving **Milpitas, Fremont and San Jose** | TroopWebHost home | ✓ |
| Motto: **"Have fun!"** | TroopWebHost home | ✓ |
| Sister units: Pack 163 (K–5), Venturing Crew 163 (ages 14–20) | Rotary site | Is the crew active? |
| 2020 service: masks for Milpitas Fire Dept, Family Giving Tree drive; a bear-box Eagle project | Milpitas Beat (2021) | OK to mention? |
| 2021: first female Eagle Scout in Milpitas came from Troop 2163 | Milpitas Beat (2021) | The site doesn't name her. OK as written? |
| Clavey (14 mi, 3,000 ft) and Mount Tamalpais (8 mi) trips, **undated** | Old Weebly site (≤ 2014), quoting Scouts | Rough years? |
| Camp Hi-Sierra July 2–8, 2023 with **both troops** | The shared album | ✓ |
| Join steps: email, then visit a meeting, then BeAScout application and troop forms | General Scouting America process | Does the troop prefer a different first step (for example a sign-up form)? |
| FAQ "How much does it cost?" says ask by email | No published fees | Publish dues, campout and camp fees? |

Not on the site because no current source exists: current Scoutmasters and adult leaders, member counts, Eagle counts, upcoming events, council and district (stated only for the Pack).

## 2. Photo releases (most important)

- **Public build:** 34 photos with no identifiable youth (landscapes, silhouettes, backs, distant figures). Please still confirm the troop is happy for the 2023 album to be used on the website at all.
- **Review build:** adds 18 photos showing identifiable Scouts (16 from Hi-Sierra 2023, 2 from the old website). It's a login-protected Vercel preview (anonymous visitors are redirected to Vercel login) and set to `noindex`.
- **Before turning on the review photos publicly:** confirm with each family that a current media release covers website use, or tell us which photos to drop. The list is in `docs/content/photo-selection.md` (rows with `release: review`).
- To publish them, change `release: 'review'` to `'public'` for each cleared photo in `src/content/photo-manifest.ts`, then run `npm run photos` and deploy. The site needs no other change, since every placement falls back automatically.
- **Takedown:** the Contact page invites families to ask for removal. Agree who handles those emails.

## 3. Ownership and access

- The Vercel project is under the account that built it (`neel-s-projects9`). Decide who owns it long term and invite a second adult.
- To show the review build to leaders without Vercel accounts, create a **Shareable Link** for that preview deployment in the Vercel dashboard (Deployments → the preview → Share). Don't turn off Deployment Protection for the whole project.
- Custom domain: none attached. If the troop wants one, add it in Vercel → Domains. Don't point any existing troop domain at it until the content is approved.

## 4. Keeping it current

- New trip: add an entry to `src/content/adventures.ts`, add photos to `photo-manifest.ts`, run `npm run photos`, then commit and deploy. (See the README.)
- Check `site.ts` every September (new year, new meeting details).
- Any adult can edit with basic GitHub skills. Scouts can write trip recaps for an adult to paste in.

## 5. Launch checklist

- [ ] Facts in section 1 confirmed or corrected
- [ ] Contact email confirmed as monitored
- [ ] Photo-use permission for the 2023 album confirmed
- [ ] Media releases checked before any review photo goes public
- [ ] Project ownership transferred or shared
- [ ] Decide on a domain, or keep the vercel.app address
- [ ] TroopWebHost: optionally link to the new site from its home page (that's a troop decision; nothing has been changed there)
- [ ] Old Weebly site: decide whether to retire it (2014 content)
