---
name: adding-a-page
description: Use when Jan wants a new page on linimatic.eu, wants a page removed or hidden, or wants a page's address changed. Covers the places a page lives on this site — route file, slug lists, menus, sitemap, translations, redirects — so nothing is half-added. Not for editing text on an existing page.
---

# Adding, removing or moving a page

## Add

1. **Route file**: `src/app/[locale]/<route>/page.tsx`, modelled on the most
   similar existing page, with metadata via `buildMetadata` in
   `src/lib/seo.ts` and a new `meta.<key>` in all three messages files.
2. **Slug lists**: a new service, case or news post is an entry in
   `src/lib/routes.ts` (`SERVICE_SLUGS`, `CASE_SLUGS`, `NEWS_SOURCE`) — the
   service and case pages index their copy by position, so append, never
   reorder. News posts: see `news-posts`.
3. **Sitemap**: `src/app/sitemap.ts` reads the slug lists; a wholly new
   static route must be added there too.
4. **Menus**: the arrays at the top of `src/components/Header.tsx`
   (`navigation` labels in messages) and `src/components/Footer.tsx`.
   Ask which menu, if unclear.
5. **Words**: the page's copy in `messages/da.json`, `en.json`, `de.json`.
   Follow `writing-web-copy`.
6. **Check**: `npx tsc --noEmit`, then `npm run build`.

## Remove

Reverse the list, and add a redirect in `src/lib/legacy-redirects.ts` from
the old path to the closest surviving page. Never redirect to the homepage
when a related page exists.

## Move

Add + remove: new route and entries, old path redirected to the new one,
menus and internal links updated in all three languages.

## Say to Jan

Name the page and where it sits in the menu. If a page was removed, say
that visitors with the old address are sent to the page you chose.
