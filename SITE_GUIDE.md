# SITE_GUIDE.md — map of this site for the editing agent

Hand-maintained: this site predates the website kit, so it is not generated from source
the way kit-built sites' guides are. Keep it in step with the code when structure changes.

## What this is

Corporate website for **Linimatic A/S**, a zinc die-casting foundry in Helsinge, Denmark.
Next.js 16 App Router, React 19, Tailwind v4, next-intl. Three languages: **Danish is the
original** (`da`), English (`en`) and German (`de`) are translations. Live at
https://linimatic.eu (linimatic.dk redirects there). The live branch is `master`.

Checks: `npx tsc --noEmit` (there is no `npm run check`), then `npm run build`. The build
must pass with **no environment variables set** — never move a `process.env` read to module
scope.

## Pages → files

Every page lives at `src/app/[locale]/<route>/page.tsx` and reads its words from
`messages/<locale>.json` via next-intl.

| Visitor URL (after `/da`, `/en` or `/de`) | Page file | Words live under (messages key) |
|---|---|---|
| `/` homepage | `src/app/[locale]/page.tsx` | `hero`, `stats`, `valueChain`, `cases`, `industryTags`, `team`, `clients`, `cta` |
| `/services` and `/services/<slug>` | `services/page.tsx`, `services/[slug]/page.tsx` | `services`, `serviceDetail` |
| `/cases` and `/cases/<slug>` | `cases/page.tsx`, `cases/[slug]/page.tsx` | `casesPage`, `caseDetail` |
| `/why-zinc` | `why-zinc/page.tsx` | `whyZincPage` |
| `/zinkers` (lead-free fishing sinkers) | `zinkers/page.tsx` | `zinkersPage` |
| `/zink-temadag` (seminar day) | `zink-temadag/page.tsx` | `zinkTemadagPage`, `zinkTemadagPopup` |
| `/about` | `about/page.tsx` | `aboutPage` |
| `/about/news` and `/about/news/<slug>` | `about/news/page.tsx`, `about/news/[slug]/page.tsx` | `newsPage` |
| `/about/sustainability`, `/about/co2`, `/about/code-of-conduct` | `about/<name>/page.tsx` | `sustainabilityPage`, `co2Page`, `codeOfConductPage` |
| `/jobs` | `jobs/page.tsx` | `jobsPage` |
| `/contact` (form) and `/contact/people` | `contact/page.tsx`, `contact/people/page.tsx` | `contactPage`, `contactTabs`, `contactPeoplePage` |
| `/privacy`, `/cookies` | `privacy/page.tsx`, `cookies/page.tsx` | `privacyPage`, `cookiePolicyPage` |

Page titles and descriptions for search engines: `meta` key in each messages file, wired
through `buildMetadata` in `src/lib/seo.ts`. The site's own address for canonicals and
structured data is `SITE_URL` in `src/lib/seo.ts` — never change it.

## Lists that drive several places at once

`src/lib/routes.ts` is the single source for:
- `SERVICE_SLUGS` — order matters; service pages index `services.items.N` by position.
- `CASE_SLUGS` — the case studies that exist.
- `NEWS_POSTS` — newest first; each has `slug`, ISO `date`, optional `image`.

**Adding a news post** = one entry at the top of `NEWS_SOURCE` in `src/lib/routes.ts` plus a
`newsPage.items.<slug>` block (`title`, `excerpt`, `body` as an array of paragraphs) in **all
three** messages files. A slug without copy in every language fails the build on purpose.

**Adding a service or case** touches `src/lib/routes.ts`, the matching messages blocks in all
three languages, and the menus below. Removing a page also needs a redirect (see below).

## Menus, header, footer

- Header menu and its dropdowns: hand-written arrays at the top of `src/components/Header.tsx`
  (labels come from the `navigation` messages key).
- Footer: `src/components/Footer.tsx` (labels under `footer`).

## Contact details are duplicated on purpose — change every copy

- Phone `+45 4876 4040` and `linimatic@linimatic.dk`: as `tel:`/`mailto:` links in
  `src/components/Footer.tsx`, as visible text under `contactPage` / `contactPeoplePage` /
  `footer` in all three messages files, and in the structured data in `src/lib/seo.ts`.
- Individual staff phone numbers and emails: `contactPeoplePage` in the messages files.
- Search every form a number can take (`+45 4876 4040`, `+4548764040`) before saying it is
  changed everywhere.
- Where contact-form submissions are delivered is code in `src/app/actions/contact.ts`
  (`CONTACT_RECIPIENTS`); treat it as agency-owned — do not change it for the owner.

## Images

Under `public/images/<role>/`: `hero/`, `services/`, `cases/`, `clients/` (logos), `team/`,
`products/`, `brand/` (logo files — never replace), `zink-temadag/`. Pages reference them by
`/images/...` path with `next/image`; keep the existing `sizes`, `priority` and dimension
props when swapping a photo. News post images are named in `src/lib/routes.ts`.

## Translations

`messages/da.json`, `en.json`, `de.json` are the full files (no fragments, no merge step).
Some values store special characters as `\uXXXX` escapes — match the escaped form or replace
the whole line. A text fix in one language is one language's change; a change of meaning
must be carried into all three, written idiomatically.

Brand positioning to keep intact on the homepage hero: "Præcision i zink" / "De bedste til
det sværeste" — the company is positioned as the best at the hardest jobs.

## Look and feel

Design tokens are CSS custom properties in `src/app/globals.css` (`@theme inline`). Fonts via
`next/font`. Cookie consent (`src/components/CookieConsent.tsx`) gates analytics; the hero
image fader waits for the banner to be answered.

## Redirects and old URLs

`src/lib/legacy-redirects.ts` maps the old WordPress site's URLs onto this site and is applied
from `next.config.ts`. When a page goes away, add a redirect there to the closest page.

## Do not touch

- `SITE_URL`, canonicals, hreflang, sitemap (`src/app/sitemap.ts`), robots — the domain setup.
- `.github/` — automation; pushes that change it are rejected anyway.
- `src/app/actions/` — the contact form's sending, spam protection and rate limit.
- `public/images/brand/` — logo files.
- Cookie consent behaviour, privacy and cookie policy wording beyond what the owner asks.
