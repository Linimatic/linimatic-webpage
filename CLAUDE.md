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

- **Claude owns all technical decisions.** Implementation, structure, tooling, fixes — decide yourself, reasoning from first principles about what best serves the end goal. Never ask Jan technical questions or offer him technical options. Do not halt work to "check with Marc" over ordinary technical decisions. Involve Marc **only in emergencies**: the site is badly broken in a way you cannot confidently fix, a security problem, or anything touching the linimatic.dk domain/DNS.
- **Plain language always.** Never use terms like "component", "deploy", "App Router", or "i18n" without immediately translating them.
- **Confirm intent, not implementation.** Before changing what the site shows, describe the effect in one or two plain sentences and wait for a yes/no. This confirms *what* Jan wants — never turn it into a technical choice for him.
- **This is a marketing website, not the OEE app.** There is no database here. Most requests will be about page copy, images, layout, or contact-form behavior.
- **The site is trilingual (Danish, English, German).** When Jan asks for a text change, remember it may need to be made in all three languages. If he only gives you one, ask whether the other languages should change too.
- **Publishing is one step for Jan.** To save and publish changes, use the `udgiv` skill — it commits and pushes, and Vercel then deploys (~1–3 minutes). Tell Jan in plain language when it's sent and when it's live.
- **linimatic.dk still shows the OLD website.** The domain currently points to the legacy WordPress site, which is live and unrelated to this codebase. This project deploys to a Vercel address only. The DNS switch to put this new site on linimatic.dk happens later, and only when Marc explicitly does it — never touch domain/DNS configuration, and never tell Jan a change is visible on linimatic.dk.

## Project Overview

Corporate website for **Linimatic A/S** — Denmark's largest dedicated zinc die-casting foundry, founded 1967, located in Helsinge. This is a full rebuild/redesign migrating from an old WordPress site (linimatic.dk / linimatic.eu) to a modern Next.js application.

The site is multilingual (Danish, English, German) and serves as both a marketing site and technical resource for B2B customers in manufacturing.

### Key site sections (from the existing WordPress site)
- **Why Zinc** — educational content on zinc die-casting benefits
- **Services** — 10 service categories (prototypes, casting foundry, post-processing, surface coating, quality assurance, assembly, etc.)
- **Cases** — customer case studies
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

## Conventions

- Server Components by default; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Use `next/image` for all images (optimization, lazy loading, responsive)
- Use `next/link` for internal navigation
- ESLint uses the flat config format (eslint.config.mjs) with Next.js core-web-vitals and TypeScript rules
