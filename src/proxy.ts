import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const handleI18n = createMiddleware(routing);

/**
 * Hosts that are allowed to be indexed. Everything else — Vercel deployment
 * URLs, previews, localhost — is served `noindex`.
 *
 * linimatic.dk still points at the old WordPress site, so this app is currently
 * reachable only on its Vercel URL. Every page's canonical already claims
 * `https://linimatic.dk/...`, so a crawler that indexed the Vercel host would
 * file pages under a canonical that resolves to an entirely different site.
 * Keying on the request host rather than an env var means indexing switches on
 * by itself the moment DNS moves, with nothing to remember to flip.
 *
 * Apex only. Every canonical names the bare host, so if www ever answers without
 * being redirected to the apex it must not be a second indexable copy of the
 * site. The domain-level www → apex redirect is still the right fix; this makes
 * the failure mode harmless rather than duplicated.
 */
const INDEXABLE_HOSTS = new Set(['linimatic.dk']);

export default function proxy(request: NextRequest) {
  const response = handleI18n(request);

  const host = request.headers.get('host')?.split(':')[0].toLowerCase() ?? '';
  if (!INDEXABLE_HOSTS.has(host)) {
    // Sent as a header rather than robots.txt `Disallow` on purpose: a
    // disallowed page can still be indexed URL-only from an external link,
    // because the crawler never fetches it and so never sees the exclusion.
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  // Two separate exclusions, and both are load-bearing:
  //
  // `.*\..*` covers static assets by file extension. The matcher used to name
  // each one individually, so adding icon.png and apple-icon.png silently sent
  // them through locale detection and they 307'd to /en/icon.png. Matching on
  // "has a dot" covers assets added later too.
  //
  // `_vercel` is still listed explicitly because the extension rule does not
  // reach it: the analytics beacon at /_vercel/insights/view has no file
  // extension, so it would fall through and be rewritten into a locale path.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
