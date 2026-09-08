---
name: embeds-and-consent
description: Use when Jan asks to embed a map, video, social feed, booking or chat widget, or any third-party script or iframe on linimatic.eu, or asks why an embed does not show. Covers the site's security policy, cookie consent, and the plain-link alternative that usually serves the visitor better.
---

# Embeds, third-party scripts and consent

## Default: a link, not an embed

Embeds slow the page, set cookies before consent, and show a grey box to
visitors who decline. Offer the link first: "Åbn i Google Maps", a YouTube
link with a still image from `new-photo`. Only embed when Jan insists after
hearing that.

## If Jan insists

1. **Security policy**: the Content-Security-Policy header in
   `next.config.ts` blocks unknown hosts. Add the provider's host to the
   right directive (`frame-src` for iframes, `script-src` for scripts).
   Nothing else is allowed by default, and that is deliberate.
2. **Consent gate**: render the embed only when the visitor has agreed.
   Follow `src/components/ConsentAnalytics.tsx` and `CookieConsent.tsx`:
   read the stored consent, listen for changes, and show a placeholder with
   the link and a "cookie settings" button (`CookieSettingsButton`) while
   consent is missing.
3. **Privacy and cookie pages**: add the provider under `privacyPage` and
   `cookiePolicyPage` in all three languages — what it receives and a link to
   its policy. `docs/privacy-data-handling.md` lists the processors; add it
   there too.
4. **Check**: `npm run build`, and tell Jan that visitors who decline
   cookies see a link instead.

## Never

- Load a third-party script outside the gate "just to test".
- Widen the security policy to a wildcard.
- Add tracking or analytics Jan did not ask for by name.
