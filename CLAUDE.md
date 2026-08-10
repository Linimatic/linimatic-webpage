@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Who is using this Claude session

Two distinct people work in this codebase: **Marc** (the creator/developer) and **Jan** (the CEO of Linimatic). They are technically very different, so identifying who you're talking to matters. Use these signals, in order — an explicit statement always wins:

1. **Explicit statement** — if the person says who they are ("I'm Marc" / "det er Jan"), that is decisive.
2. **Git configured `user.name`** — intentionally set and almost always correct; treat it as the default assumption. It is *not* a misconfiguration when the configured name and email look like they belong to different people.
3. **Language** — English is usually Marc; Danish is usually Jan. Not foolproof.
4. **Communication style** — terse / technical / file-paths = Marc; outcome-focused / non-technical = Jan.

When the signals genuinely conflict *and* it changes how you'd act, ask once:
> "Just so I can help you best — are you Marc, or Jan?"

> This same Marc-vs-Jan model is used in the sibling project `oee-next` and summarized in the workspace-root `CLAUDE.md` (one level up). Keep all three in sync if you change one.

### Marc — the creator (git: `Marc Vanman` / `marcvanman@hotmail.com`)

Marc built this site and knows the full stack. He communicates in terse technical terms, usually in English.

**Behavior**:
- Be direct. No preamble.
- Follow global CLAUDE.md: atomic commits, no dead code, no secrets in output.
- Confirmation is only required for irreversible or external actions (git pushes, publishing, external API calls). Local file edits and dev-server runs need no confirmation.

### Jan — the CEO (git: `Jan Jørgensen` / `jaj@linimatic.dk`)

Jan runs Linimatic. He is non-technical and usually writes in Danish. He has full authority to request changes to the website. **Jan decides *what* the site should say and show; Claude is the technical lead and owns *how*.**

**Default to Danish.** Reply in Danish unless Jan switches to English.

**Behavior when talking to Jan (the CEO):**

- **Claude owns all technical decisions.** Implementation, structure, tooling, fixes — decide yourself, reasoning from first principles about what best serves the end goal. Never ask Jan technical questions or offer him technical options. Do not halt work to "check with Marc" over ordinary technical decisions. Involve Marc **only in emergencies**: the site is badly broken in a way you cannot confidently fix, a security problem, or anything touching the linimatic.eu / linimatic.dk domains or DNS.
- **Plain language always.** Never use terms like "component", "deploy", "App Router", or "i18n" without immediately translating them.
- **Confirm intent, not implementation.** Before changing what the site shows, describe the effect in one or two plain sentences and wait for a yes/no. This confirms *what* Jan wants — never turn it into a technical choice for him.
- **This is a marketing website, not the OEE app.** There is no database here. Most requests will be about page copy, images, layout, or contact-form behavior.
- **The site is trilingual (Danish, English, German).** When Jan asks for a text change, remember it may need to be made in all three languages. If he only gives you one, ask whether the other languages should change too.
- **Publishing is one step for Jan.** To save and publish changes, use the `udgiv` skill — it commits and pushes, and Vercel then deploys (~1–3 minutes). Tell Jan in plain language when it's sent and when it's live.
- **The live site is still the OLD website, and its home is linimatic.eu.** linimatic.dk currently redirects to linimatic.eu, which serves the legacy WordPress site — live, and unrelated to this codebase. This project deploys to a Vercel address only. Never tell Jan a change is visible on linimatic.dk or linimatic.eu.
- **linimatic.eu — not .dk — is the new site's canonical domain.** Google treats `.dk` as a country-code TLD that signals "this site is for Denmark", while `.eu` counts as generic; the old site's whole search history already sits on `.eu`. So the new site's canonicals, hreflang, sitemap and structured data all name `https://linimatic.eu`, and `SITE_URL` in `src/lib/seo.ts` is the single source for it. linimatic.dk stays as a Danish entry point: the bare domain sends visitors to `/da`, deeper paths keep their own language. The DNS switch happens later and only when Marc explicitly does it — never touch domain/DNS configuration.

## Project Overview

Corporate website for **Linimatic A/S** — Denmark's largest dedicated zinc die-casting foundry, founded 1967, located in Helsinge. This is a full rebuild/redesign migrating from an old WordPress site (linimatic.dk / linimatic.eu) to a modern Next.js application.

The site is multilingual (Danish, English, German) and serves as both a marketing site and technical resource for B2B customers in manufacturing.

### Key site sections (from the existing WordPress site)
- **Why Zinc** — educational content on zinc die-casting benefits
- **Services** — 10 service categories (prototypes, casting foundry, post-processing, surface coating, quality assurance, assembly, etc.)
- **Cases** — customer case studies. Creating or editing these: follow `.claude-plugin/skills/case-study-writing/SKILL.md` (fact-gathering questionnaire + site wiring included)
- **Sinkers/Zinkers** — lead-free zinc fishing gear (a notable product line)
- **News** — blog/updates
- **About Us**, **Jobs**, **Contact**

### Homepage messaging & brand positioning (keep consistent)

The homepage hero defines Linimatic's public positioning. Keep future copy aligned with this message — **"we are the best at the hardest jobs."**

- **Heading:** "Præcision i zink"
- **Tagline / positioning line:** "De bedste til det sværeste"
- **Intro paragraph (the core value proposition):** many years of experience combined with modern, automated zinc die-casting; automation, robots and efficient process control → high quality at competitive prices, produced in Denmark; helping customers where precision, function, finish and stable quality are decisive; high technical knowhow and close dialogue from idea to finished part — solutions that last, also when requirements are complex.

The hero text lives in `messages/<locale>.json` under the `hero` key (`headline1`, `headline2`, `headlineAccent`, `tagline`, `description`). When changing it, update **all language versions** (da, en, de) so they stay in sync — as of this writing the Danish (`da.json`) hero was updated but `en.json` / `de.json` may still hold older copy.

> Editing note: some values in the `messages/*.json` files store special characters as `\uXXXX` escapes (e.g. `±` for ±, ` ` for a non-breaking space). Match those exactly, or replace the whole line, when editing — a literal `±` or a normal space will not match the escaped form.

## Tech Stack

- **Framework:** Next.js 16 with App Router (`src/app/`)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **React:** v19 with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Runtime:** Node.js 22+, npm

## Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint (flat config, eslint.config.mjs)
```

## Architecture

### App Router structure
All routes live under `src/app/`. Uses Next.js App Router conventions:
- `layout.tsx` — root layout, wraps all pages
- `page.tsx` — route page component
- `loading.tsx` — loading UI (Suspense boundary)
- `error.tsx` — error boundary
- Route groups `(groupName)/` for organizational grouping without affecting URL

### Path alias
`@/*` maps to `./src/*` — use this for all imports (e.g., `@/components/Header`).

### Styling approach
Tailwind CSS v4 is configured through PostCSS (`postcss.config.mjs`). Theme tokens are defined as CSS custom properties in `src/app/globals.css` using `@theme inline`. No `tailwind.config.ts` file — Tailwind v4 uses CSS-first configuration.

### Fonts
Currently uses Geist Sans and Geist Mono via `next/font/google`. These should be replaced with brand-appropriate fonts for Linimatic.

## Responsive design — applies to every visual change

The site must look deliberate at **every** width, not just the one that happened to be open in the preview. Layout, spacing, type size and placement are not finished until they have been checked across the range below. A width you did not look at is not "probably fine" — it is unreviewed, and unreviewed widths are where this site currently breaks.

Tailwind breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.

### 1. One page shell, never improvised

Every full-width section's inner wrapper uses exactly this and nothing else:

```
mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20
```

This is what makes headings and text in different sections line up on the same vertical edge. A section that invents its own gutter (`px-8`, `px-6 lg:px-10`, or no padding at all) silently breaks alignment with every section above and below it — that misalignment only becomes visible at some widths, which is why it survives review. If a section genuinely needs different padding, it needs a reason in the code comment.

### 2. Vertical spacing scales — a bare `py-20` is a bug

Section padding must step with the viewport. Use:

- **Standard section:** `py-16 sm:py-20 lg:py-24 xl:py-32`
- **Compact section:** `py-12 sm:py-16 lg:py-20`

A fixed `py-20` is too heavy on a phone and too thin on a large monitor. Fixed vertical padding is only acceptable on small internal elements (buttons, table rows, nav items). The same applies to `gap-*` between grid items: large gaps (`gap-8` and up) get a smaller mobile value.

### 3. Do not skip `md:` — that band is where it looks worst

Going straight from `sm:` to `lg:` means everything between 640px and 1023px — tablets in portrait, split-screen windows, small laptops — renders the phone layout at desktop width. Column counts step through the range:

- 1 → 2 at `sm:` or `md:` → 3 at `lg:` → 4 at `xl:`
- **Never jump to 3 or 4 columns at `sm:`.** At 640px a quarter of the screen is ~150px; cards collapse into unreadable slivers.

Two-column split layouts (text beside image) stay stacked until `lg:` — a side-by-side at 768px gives each half too little room for a headline.

### 4. Type scales

Headings get at least three steps, e.g. `text-3xl sm:text-4xl lg:text-5xl`. Never ship a heading at one fixed size. Arbitrary pixel sizes (`text-[5.5rem]`) are allowed only as the top step of a scale, never on their own. Body text may stay fixed.

### 5. Line length is capped independently of the shell

The shell is 1800px wide; a paragraph is not. Prose gets `max-w-2xl` / `max-w-3xl` (or `max-w-4xl` for intros) regardless of how wide the section is. A full-bleed paragraph on a wide monitor is unreadable even though nothing looks "broken".

### 6. Nothing overflows horizontally, ever

No fixed width wider than the smallest supported viewport (360px). Long unbroken strings (part numbers, emails, URLs) need `break-words`. Anything genuinely wide — tables, spec lists, image rows — scrolls inside its own `overflow-x-auto` container; the page body never scrolls sideways.

### 7. Images and touch

- Always `next/image` with an accurate `sizes` prop, and a fixed aspect ratio plus `object-cover` so the surrounding layout does not jump.
- Interactive elements are at least 44×44px on touch widths.
- Anything revealed only on hover needs an equivalent that works without hover — hover does not exist on a phone.

### 8. Verify before reporting done

Run the preview (`preview_start` → `linimatic-webpage`) and use `resize_window` at **390, 768, 1024, 1440 and 1920**, with a screenshot at each. For a change to a grid, a hero, or section spacing, check all five. For a small text edit inside an existing block, 390 and 1440 are enough.

Never report a layout change as finished based on a single width. When Jan says something "looks off" or "isn't aligned", assume the problem is at a width that was never checked, and start by reproducing it across the full range rather than guessing at the code.

## Conventions

- Server Components by default; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Use `next/image` for all images (optimization, lazy loading, responsive)
- Use `next/link` for internal navigation
- ESLint uses the flat config format (eslint.config.mjs) with Next.js core-web-vitals and TypeScript rules
