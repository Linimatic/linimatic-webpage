import Link from "next/link";

/**
 * 404 for requests that never reach a locale segment — an unknown first path
 * segment such as an old WordPress `/wp-login.php`. Those bypass the proxy
 * (its matcher skips anything containing a dot, so real static assets are not
 * locale-rewritten), so `[locale]/layout.tsx` rejects them and the miss lands
 * here, above that layout — which is why this file carries its own html/body:
 * the root layout deliberately renders bare children.
 *
 * English only, and no site chrome. There is no locale to translate into, and
 * the visitor is almost always a crawler holding a dead link from the old site.
 */
export default function NotFound() {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <section className="bg-zinc-50 min-h-screen flex items-center">
          <div className="mx-auto max-w-2xl px-6 py-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600">
                404
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05]">
              This page does not exist
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              The address may be out of date. Start from the front page instead.
            </p>
            <Link
              href="/en"
              className="mt-8 inline-flex items-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
            >
              Go to linimatic.eu
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
