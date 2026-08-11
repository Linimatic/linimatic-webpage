import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata, type Locale } from "@/lib/seo";
import { NEWS_POSTS, formatNewsDate } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/about/news",
    title: t("news.title"),
    description: t("news.description"),
    absoluteTitle: true,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsPage");
  const tAbout = await getTranslations("aboutPage");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: tAbout("breadcrumb"), href: "/about" },
          { label: t("breadcrumb"), href: "/about/news" },
        ]}
      />

      {/* Hero */}
      <section className="bg-zinc-50 pb-10 sm:pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Post list — one row per post, so the page reads the same with one post
          as with twenty (a grid leaves a lone post stranded in a corner). */}
      <section className="bg-zinc-50 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {NEWS_POSTS.length === 0 ? (
            <p className="text-base text-zinc-600 max-w-2xl">{t("empty")}</p>
          ) : (
            <ul className="border-t border-zinc-200">
              {NEWS_POSTS.map((post) => (
                <li key={post.slug} className="border-b border-zinc-200">
                  <Link
                    href={`/about/news/${post.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-[minmax(0,26rem)_1fr] gap-5 lg:gap-10 py-8 sm:py-10 lg:py-12"
                  >
                    {post.image && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 26rem"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <time
                        dateTime={post.date}
                        className="text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)]"
                      >
                        {formatNewsDate(post.date, locale)}
                      </time>
                      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] leading-tight font-[family-name:var(--font-display)] group-hover:text-ember transition-colors">
                        {t(`items.${post.slug}.title`)}
                      </h2>
                      <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-2xl">
                        {t(`items.${post.slug}.excerpt`)}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 group-hover:text-ember transition-colors">
                        {t("readMore")}
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 grain py-14 sm:py-16 lg:py-20 relative">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
            {t("ctaHeading")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
            >
              {t("ctaButton")}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
