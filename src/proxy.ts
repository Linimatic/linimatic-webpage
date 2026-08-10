import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const handleI18n = createMiddleware(routing);

const CANONICAL_HOST = 'linimatic.eu';

/**
 * Hosts allowed to be indexed. Everything else — Vercel deployment URLs,
 * previews, localhost — is served `noindex`.
 *
 * Apex only. Every canonical names the bare host, so if www ever answers
 * without being redirected to the apex it must not become a second indexable
 * copy of the site. Keying on the request host rather than an env var means
 * indexing switches on by itself the moment DNS moves, with nothing to
 * remember to flip on launch day.
 */
const INDEXABLE_HOSTS = new Set([CANONICAL_HOST]);

/**
 * linimatic.dk is kept as a Danish entry point rather than retired. Someone who
 * types the .dk address is almost certainly Danish, so the bare domain lands
 * them on the Danish site instead of on locale detection.
 *
 * Only the root is forced to /da. Any deeper path keeps its own path so the
 * legacy URL map still decides the destination — an old English URL like
 * /about-us was an English page and should stay English, and rewriting it to
 * Danish would hand it to a page it never ranked for.
 *
 * This requires linimatic.dk to be attached to the Vercel project WITHOUT a
 * platform-level redirect; a domain redirect configured in Vercel cannot add
 * the /da prefix for the root alone.
 */
const DANISH_ENTRY_HOSTS = new Set(['linimatic.dk', 'www.linimatic.dk']);

/** Send a request to the canonical host, optionally forcing a landing path. */
function toCanonical(request: NextRequest, forceRootPath?: string) {
  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  url.host = CANONICAL_HOST;
  url.port = '';
  if (forceRootPath && url.pathname === '/') url.pathname = forceRootPath;
  return NextResponse.redirect(url, 308);
}

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase() ?? '';

  if (DANISH_ENTRY_HOSTS.has(host)) {
    return toCanonical(request, '/da');
  }

  // www folds into the apex rather than merely being excluded from indexing:
  // noindex alone leaves a fully working but invisible duplicate of the site if
  // the domain-level www → apex redirect is ever missing or removed.
  if (host === `www.${CANONICAL_HOST}`) {
    return toCanonical(request);
  }

  const response = handleI18n(request);

  if (!INDEXABLE_HOSTS.has(host)) {
    // Sent as a header rather than a robots.txt `Disallow` on purpose: a
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
