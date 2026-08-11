import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, metaDescription, SITE_URL, type Locale } from "@/lib/seo";
import {
  NEWS_POSTS,
  NEWS_SLUGS,
  formatNewsDate,
  getNewsPost,
  isNewsSlug,
  type NewsSlug,
} from "@/lib/routes";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of NEWS_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// Only the posts listed in routes.ts exist; anything else is a real 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isNewsSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: "newsPage" });
  return buildMetadata({
    locale: locale as Locale,
    path: `/about/news/${slug}`,
    title: t(`items.${slug}.title`),
    description: metaDescription(t(`items.${slug}.excerpt`)),
    absoluteTitle: true,
  });
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isNewsSlug(slug)) {
    notFound();
  }

  const newsSlug = slug as NewsSlug;
  const post = getNewsPost(newsSlug);

  const t = await getTranslations("newsPage");
  const tAbout = await getTranslations("aboutPage");

  const title = t(`items.${newsSlug}.title`);
  const excerpt = t(`items.${newsSlug}.excerpt`);
  const body = t.raw(`items.${newsSlug}.body`) as string[];
  const otherPosts = NEWS_POSTS.filter((p) => p.slug !== newsSlug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: excerpt,
    datePublished: post.date,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/about/news/${newsSlug}`,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    author: { "@type": "Organization", name: "Linimatic A/S" },
    publisher: { "@type": "Organization", name: "Linimatic A/S" },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <Breadcrumbs
        items={[
          { label: tAbout("breadcrumb"), href: "/about" },
          { label: t("breadcrumb"), href: "/about/news" },
          { label: title, href: `/about/news/${newsSlug}` },
        ]}
      />

      <article className="bg-zinc-50 pb-16 sm:pb-20 lg:pb-24">
        {/* Header */}
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <time
                dateTime={post.date}
                className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]"
              >
                {formatNewsDate(post.date, locale)}
              </time>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.1] font-[family-name:var(--font-display)]">
              {title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed">
              {excerpt}
            </p>
          </div>

          {post.image && (
            <div className="mt-10 lg:mt-12 relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-zinc-200">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1800px) 100vw, 1800px"
              />
            </div>
          )}

          {/* Body */}
          <div className="mt-10 lg:mt-14 max-w-3xl space-y-5 text-base text-zinc-600 leading-relaxed">
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/about/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-ember transition-colors"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              {t("backToOverview")}
            </Link>
          </div>
        </div>
      </article>

      {/* More news */}
      {otherPosts.length > 0 && (
        <section className="bg-white py-12 sm:py-14 lg:py-16 border-t border-zinc-200">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("moreHeading")}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/about/news/${other.slug}`}
                  className="group block"
                >
                  {other.image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200">
                      <Image
                        src={other.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <time
                    dateTime={other.date}
                    className="mt-4 block text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)]"
                  >
                    {formatNewsDate(other.date, locale)}
                  </time>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-tight font-[family-name:var(--font-display)] group-hover:text-ember transition-colors">
                    {t(`items.${other.slug}.title`)}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
