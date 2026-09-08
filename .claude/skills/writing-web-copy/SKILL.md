---
name: writing-web-copy
description: Use whenever new or rewritten text goes on linimatic.eu — a headline, a paragraph, a page title or description, a service or product blurb — and whenever Jan asks to be "found on Google", "rank for", "show up in ChatGPT", or to "improve SEO". Covers how text on this site reaches search engines and AI assistants, the three-language rule, and the checks before saving. Not for photos (new-photo), new pages (adding-a-page) or cases (case-study-writing).
---

# Writing text that gets found

Search engines and AI assistants read the same words visitors do. Good copy is
specific, answers a question in its first sentence, and says the same thing in
Danish, English and German. Nothing here is a trick; it is writing machines
can quote.

## Where the machine-facing text comes from

- Page title and description: the `meta.<key>` entry in `messages/da.json`,
  `en.json` and `de.json`. `buildMetadata` in `src/lib/seo.ts` turns it into
  the title tag, description, canonical, hreflang and Open Graph — never write
  those tags by hand, and never touch `SITE_URL`.
- Structured data lives in `src/lib/seo.ts` and `src/components/JsonLd.tsx`
  (organisation, services, events, articles). When the text is an event,
  article or product, the matching schema belongs on the page.
- `public/llms.txt` summarises the site for AI assistants; when a fact it
  states changes (phone, address, what the company does), change it there too.

## Rules that move the needle

1. **Title**: 50–60 characters, the page's subject first, "Linimatic" last.
   One `h1` per page, saying the same thing as the title.
2. **Description**: 120–155 characters, a full sentence a person would click.
   What the page offers and for whom; no slogans.
3. **First sentence answers the question** the page exists for. Facts,
   numbers, materials, tolerances, Helsinge — those get quoted.
4. **Headings are questions or claims**, not labels.
5. **Danish is the original.** A change of meaning goes into all three
   languages, written as a native would say it. A fix to one language stays in
   that language. Some values store special characters as `\uXXXX`; match
   the escaped form or replace the whole line.
6. **Never invent** a figure, a certification, a customer or a date. Ask.
7. **Positioning to keep**: "Præcision i zink" / "De bedste til det
   sværeste" — the best at the hardest jobs. See `linimatic-brand`.

## Before saving

- Every edited JSON file parses; the same keys exist in all three files.
- Title and description lengths are inside the ranges above in each language.
- `llms.txt` still agrees with the site.

## Editing the messages files

Change JSON with the file-edit tool, one entry at a time. Never regenerate a
messages file with a script: it re-serialises the whole file, turns escaped
characters and spacing into a page-long diff, and the owner's change list
then reads "everything changed". A blown-up file is reverted, not committed.
