# Site integration — how a case becomes a live page

Everything mechanical about getting a case onto the website. The writing guidance lives in `SKILL.md`; this file is the wiring.

## Where a case lives

A case is **content in the three translation files** plus **registrations in three code files** plus **one image**. There is no CMS and no database.

| What | Where |
|---|---|
| Listing-card content | `messages/{da,en,de}.json` → `casesPage.items[]` (array entry) |
| Detail-page content | `messages/{da,en,de}.json` → `caseDetail.items.<slug>` (object entry) |
| Slug + hero image registration (detail) | `src/app/[locale]/cases/[slug]/page.tsx` → `CASE_SLUGS`, `CASE_IMAGES` |
| Card image registration (listing) | `src/app/[locale]/cases/page.tsx` → `caseImages` |
| Sitemap registration | `src/app/sitemap.ts` → `CASE_SLUGS` |
| The image itself | `public/images/cases/<slug>-<short-desc>.jpg` |
| Fact sheet (internal, not rendered) | `docs/cases/<slug>.md` |

**Registration is not optional.** The detail route has `dynamicParams = false`: a slug missing from `CASE_SLUGS` in the detail page is a hard 404 even if the JSON content exists. A slug missing from `CASE_IMAGES` crashes the detail page (undefined image src). The listing renders whatever is in `casesPage.items`, so a half-registered case shows a card that leads to a 404 — always do all registrations together.

## New-case checklist

1. Choose a **slug**: kebab-case, short, the customer or product name (`dewalt`, `one-collection`).
2. Put the image in `public/images/cases/` — see *Images* below.
3. Add the slug to `CASE_SLUGS` and `CASE_IMAGES` in `src/app/[locale]/cases/[slug]/page.tsx`.
4. Add the slug to `caseImages` in `src/app/[locale]/cases/page.tsx`.
5. Add the slug to `CASE_SLUGS` in `src/app/sitemap.ts` (and consider bumping `LAST_UPDATED` there — see the comment in that file).
6. Add the `casesPage.items[]` entry and the `caseDetail.items.<slug>` entry to **all three** of `messages/da.json`, `messages/en.json`, `messages/de.json`.
7. If the case introduces a new industry, add it to `casesPage.industries` in all three files (the filter tags on the listing).
8. Preview all three locales, then publish.

## The content model, field by field

`casesPage.items[]` (the card) and `caseDetail.items.<slug>` (the page) **duplicate** `client`, `title`, `industry`, `metric`, `result` by design — keep them character-identical within a language.

| Field | Shown | Guidance |
|---|---|---|
| `slug` | URL | Must match the code registrations exactly. |
| `client` | Card + hero eyebrow | Customer name, or the anonymized descriptor if unnamed. |
| `industry` | Card + hero eyebrow | Short label; align with `casesPage.industries`. |
| `title` | Card + H1 | The narrative headline — the hard thing, customer's-world framing. Roughly 6–12 words. |
| `metaTitle` | Browser tab / search result (detail only) | Short: `Client — what it was`. The long title stays the H1. |
| `metric` | Card + under H1, monospace | 1–2 hard facts joined by ` · ` (`·`). The number-as-punchline. No slogans. |
| `overview` | Hero paragraph; also becomes the meta description | 2–3 sentences a skimmer can stop at. First ~155 chars must stand alone. |
| `challenge` | Section 01 | One solid paragraph: what was hard (technically specific) and what was at stake. |
| `approach` | Section 02 | One solid paragraph: what Linimatic did and *why* — decisions and tradeoffs, not activity lists. |
| `result` | Section 03 + card highlight | The quantified payoff. The only field allowed to be a placeholder (below). |
| `capabilities` | Linked chips (detail only) | Array of service slugs, only from: `prototyping`, `die-casting`, `post-processing`, `surface-treatment`, `quality`, `assembly`. |

## The placeholder convention

When the result number genuinely isn't available yet, the site has a built-in mechanism — **for the `result` field only**:

- Prefix the text with `PLADSHOLDER:` (da) / `PLACEHOLDER:` (en) / `PLATZHALTER:` (de).
- The listing then hides the result line; the detail page renders an amber "Content needed" box instead of prose. Scaffolding text never reaches readers as if it were fact.
- Write the placeholder as a request for the *specific* missing fact: `PLADSHOLDER: Tilføj nøgleresultat — f.eks. '99,2% first-pass yield' eller 'X mio. dele leveret'`.
- Every other field must be final copy — there is no placeholder rendering for them.
- In drafts *outside* the messages files (fact sheets, review docs), mark gaps as `[NEEDS: …]`; convert to the prefix convention when inserting into the site.

Find all outstanding placeholders: `grep -rn "PLADSHOLDER\|PLACEHOLDER\|PLATZHALTER" messages/`.

## Formatting conventions (per language)

- The messages files store special characters as `\uXXXX` escapes (e.g. `±` ±, ` ` thin space, `·` ·, ` ` no-break space). **Match the escaped form when searching/editing** — a literal `±` won't match. New text may use either form, but stay consistent with the surrounding file.
- Numbers: decimal **comma** in da/de (`±0,05 mm`), decimal **point** in en (`±0.05 mm`). Thin space (` `) between value and unit.
- Facts, numbers, units, and customer names are identical across all three files — only prose translates.
- Danish is authored first and is the source of truth; en/de are translations of it.

## Images

- Location: `public/images/cases/`, named `<slug>-<short-desc>.jpg`.
- The card crops to 4:3 and darkens the image under white text; the detail hero is 4:3 (mobile) / tall fill (desktop). Pick photos of the **actual part or product** that survive both crops — subject centered, no critical detail at the edges.
- Unused candidate photos may already exist in that folder (as of 2026-07: `fritz-hansen-chair.jpg`, `montana-legs.jpg`, `frandsen-downlight.jpg`, `howe-flexible.jpg`, and others) — check before requesting new material.

## The fact sheet (`docs/cases/<slug>.md`)

The internal record behind each case, so future sessions never re-interview for known facts. Not rendered on the site. Keep it short:

```markdown
# <Client> — fact sheet
Updated: <date>

## Confirmed facts
- <fact> (source: <who>, <when>)

## Quotes
- "<verbatim>" — <name, role> (on record: yes/no)

## Permission
Name + logo: <yes/no/pending — who approves> (<date>)

## Open gaps
- [NEEDS: <the specific missing fact>] — who could supply it: <name>
```

Off-the-record information stays out of this file and out of the repo.

## Preview and publish

- **Preview**: start the `linimatic-webpage` launch config (`preview_start`) and check `/da/cases/<slug>`, `/en/cases/<slug>`, `/de/cases/<slug>` **and** the `/cases` listing card. Known quirk: Turbopack can serve stale CSS after config-level style changes — if styling looks wrong, delete `.next/` and restart before debugging further.
- **Verify registrations** the fast way: `npm run build` fails or warns loudly on most wiring mistakes and is required before publishing anyway.
- **Publish**: with Jan, use the `/udgiv` command (build → commit → push → Vercel deploys in ~1–2 min). With Marc, ordinary git flow on `master`.
- **Never** say the change is visible on **linimatic.dk** or **linimatic.eu** — both still serve the old WordPress site; the new site deploys to a Vercel address only.
