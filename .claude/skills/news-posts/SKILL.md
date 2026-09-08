---
name: news-posts
description: Use when Jan wants a news item, announcement, event notice or short update on linimatic.eu — "nyhed", "vi holder lukket", "temadag", "ny medarbejder", "vi var på messe". Covers the two-step wiring for a post under About → News and how the listing, sitemap and structured data pick it up. Customer cases are a different thing: use case-study-writing.
---

# Adding a news post

A post is two edits, nothing else. Everything that shows a post — the
listing at `/about/news`, the post page, the "Seneste nyt" block on
`/about`, the sitemap and the Article structured data — reads from these.

1. **Entry** at the top of `NEWS_SOURCE` in `src/lib/routes.ts`: `slug`
   (kebab-case), `date` (a real ISO date — it drives the displayed date and
   the sitemap), optional `image` under `public/images/` (see `new-photo`).
   Newest first.
2. **Copy** as `newsPage.items.<slug>` in `messages/da.json`, `en.json`
   and `de.json`: `title`, `excerpt` (one or two sentences), `body` (an array
   of paragraphs). All three languages, written natively — a slug with copy
   missing in one language fails the build on purpose.

Write it as news, not as marketing: what happened or will happen, when,
where, for whom, and what to do about it (call, sign up, visit). First
sentence carries the fact. Follow `writing-web-copy` for the title.

A short notice that is not really news (closed in week 42, new phone hours)
usually belongs on the homepage or the contact page as a line of text, not
as a post. Ask Jan which he means if it could be either.

Check: `npx tsc --noEmit`, then `npm run build`.

## Editing the messages files

Change JSON with the file-edit tool, one entry at a time. Never regenerate a
messages file with a script: it re-serialises the whole file, turns escaped
characters and spacing into a page-long diff, and the owner's change list
then reads "everything changed". A blown-up file is reverted, not committed.
