import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata, metaDescription, type Locale } from "@/lib/seo";

const CASE_SLUGS = [
  "dewalt",
  "one-collection",
  "velux",
  "supplier-proximity",
] as const;
type CaseSlug = (typeof CASE_SLUGS)[number];

const SERVICE_SLUGS = [
  "prototyping",
  "die-casting",
  "post-processing",
  "surface-treatment",
  "quality",
  "assembly",
] as const;

const CASE_IMAGES: Record<CaseSlug, string> = {
  dewalt: "/images/services/brake-bracket-component.jpg",
  "one-collection": "/images/cases/one-collection-finn-juhl.jpg",
  velux: "/images/cases/velux-motor-frame.jpg",
  "supplier-proximity": "/images/cases/supplier-proximity.jpg",
};

function isPlaceholder(text: string) {
  return (
    text.startsWith("PLACEHOLDER") ||
    text.startsWith("PLADSHOLDER") ||
    text.startsWith("PLATZHALTER")
  );
}

function ContentNeeded({ hint }: { hint: string }) {
  return (
    <div className="relative border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-800 rounded-sm">
      <span className="absolute -top-2.5 left-3 bg-amber-400 text-amber-950 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
        Content needed
      </span>
      <div className="mt-1">{hint}</div>
    </div>
  );
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of CASE_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// Only the slugs above exist; any other slug returns a real 404 (not a soft-200).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(CASE_SLUGS as readonly string[]).includes(slug)) return {};

  const t = await getTranslations({ locale, namespace: "caseDetail" });
  // Short metaTitle for the <title>; the long narrative title stays as the H1.
  const title = t(`items.${slug}.metaTitle`);
  const overview = t(`items.${slug}.overview`);
  const description = metaDescription(overview);

  return buildMetadata({
    locale: locale as Locale,
    path: `/cases/${slug}`,
    title,
    description,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!(CASE_SLUGS as readonly string[]).includes(slug)) {
    notFound();
  }

  const caseSlug = slug as CaseSlug;

  const t = await getTranslations("caseDetail");
  const tCases = await getTranslations("casesPage");
  const tServices = await getTranslations("services");

  const client = t(`items.${caseSlug}.client`);
  const industry = t(`items.${caseSlug}.industry`);
  const title = t(`items.${caseSlug}.title`);
  const metric = t(`items.${caseSlug}.metric`);
  const overview = t(`items.${caseSlug}.overview`);
  const challenge = t(`items.${caseSlug}.challenge`);
  const approach = t(`items.${caseSlug}.approach`);
  const result = t(`items.${caseSlug}.result`);
  const capabilities = t.raw(`items.${caseSlug}.capabilities`) as string[];

  const otherSlugs = CASE_SLUGS.filter((s) => s !== caseSlug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: tCases("breadcrumb"), href: "/cases" },
          { label: title, href: `/cases/${caseSlug}` },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-zinc-50 overflow-hidden">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text */}
            <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-24 flex flex-col justify-center">
              {/* Eyebrow: client · industry */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                  {client}
                  <span className="mx-2 text-zinc-300">·</span>
                  {industry}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {title}
              </h1>
              <p className="mt-4 text-base font-[family-name:var(--font-mono)] text-ember tracking-tight">
                {metric}
              </p>
              <p className="mt-5 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl">
                {overview}
              </p>
            </div>
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
              <Image
                src={CASE_IMAGES[caseSlug]}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              01
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-6">
            {t("challengeHeading")}
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed max-w-3xl">
            {challenge}
          </p>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="bg-zinc-950 grain py-20 relative">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              02
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)] mb-6">
            {t("approachHeading")}
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
            {approach}
          </p>
        </div>
      </section>

      {/* ── The Result ── */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              03
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-6">
            {t("resultHeading")}
          </h2>
          {isPlaceholder(result) ? (
            <div className="max-w-3xl">
              <ContentNeeded
                hint={result.replace(
                  /^(PLACEHOLDER|PLADSHOLDER|PLATZHALTER):\s*/,
                  ""
                )}
              />
            </div>
          ) : (
            <p className="text-base text-zinc-600 leading-relaxed max-w-3xl">
              {result}
            </p>
          )}
        </div>
      </section>

      {/* ── Capabilities Applied ── */}
      <section className="bg-zinc-50 py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-6">
            {t("capabilitiesHeading")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {capabilities.map((capSlug) => {
              const idx = (SERVICE_SLUGS as readonly string[]).indexOf(capSlug);
              const label =
                idx >= 0
                  ? tServices(`items.${idx}.title`)
                  : capSlug;
              return (
                <Link
                  key={capSlug}
                  href={`/services/${capSlug}`}
                  className="group inline-flex items-center gap-2 border border-zinc-300 hover:border-ember px-5 py-3 text-sm text-zinc-700 hover:text-ember transition-colors"
                >
                  {label}
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Other Cases ── */}
      <section className="bg-white py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              {tCases("breadcrumb")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherSlugs.map((otherSlug) => (
              <Link
                key={otherSlug}
                href={`/cases/${otherSlug}`}
                className="group relative bg-zinc-900 overflow-hidden"
              >
                <div className="aspect-[16/7] relative">
                  <Image
                    src={CASE_IMAGES[otherSlug]}
                    alt={t(`items.${otherSlug}.title`)}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)]">
                      {t(`items.${otherSlug}.client`)}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-white leading-tight font-[family-name:var(--font-display)] tracking-tight">
                      {t(`items.${otherSlug}.title`)}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-zinc-950 grain py-20 relative">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
            {t("ctaHeading")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <a
              href="tel:+4548764040"
              className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-all font-[family-name:var(--font-mono)]"
            >
              +45 4876 4040
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
