---
name: new-photo
description: Use when Jan sends a photo or asks to swap, add or remove an image anywhere on linimatic.eu — hero, team, cases, services, client logos, products. Covers where image files live, sizing, alt text in three languages, and keeping the page's image settings intact.
---

# Putting a photo on the site

## Receiving it

A message may end with `[Attached photo: /mnt/uploads/…]`. That is the file.
Open it and look at it first: alt text and placement depend on what is in it.

## Preparing it

- Save under `public/images/<role>/` (`hero`, `team`, `cases`, `services`,
  `clients`, `products`, `zink-temadag`) with a descriptive kebab-case name.
- At most 2000 px on the long edge, metadata stripped; use `sharp` from
  `node_modules` when present, otherwise copy as is.
- JPEG for photographs; PNG only for logos and cut-outs. Never replace
  anything under `public/images/brand/` unless Jan asks for a new logo.

## Placing it

- Keep the existing `next/image` props on the slot (`sizes`, `priority`,
  width, height, `fill`); only `src` and `alt` change.
- Alt text in Danish, English and German describing what is in the photo,
  never keywords. Decorative images get an empty alt.
- Client logos on the homepage live in `public/images/clients/` and the list
  on the homepage; a case photo is named in the case's copy; a news post's
  image is named in `NEWS_SOURCE` in `src/lib/routes.ts`.
- A new slot copies the nearest existing image markup on that page.

## Before saving

`npx tsc --noEmit`, then `npm run build`.
