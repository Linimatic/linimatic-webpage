# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
