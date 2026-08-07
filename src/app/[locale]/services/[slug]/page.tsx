import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ServiceImageGallery } from "@/components/ServiceImageGallery";
import { HeroImageFader } from "@/components/HeroImageFader";
import { buildMetadata, metaDescription, type Locale } from "@/lib/seo";

const SERVICE_SLUGS = [
  "prototyping",
  "die-casting",
  "post-processing",
  "surface-treatment",
  "quality",
  "assembly",
] as const;

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const SERVICE_META: Record<
  ServiceSlug,
  {
    titleKey: string;
    descriptionKey: string;
    relatedServices: ServiceSlug[];
    image: string;
    // Optional extra images. When present, the hero shows all images in a small
    // format where one at a time is enlarged (on hover and on a 2-second cycle).
    gallery?: string[];
    // Optional slideshow images. When present, the hero slot slowly crossfades
    // between them instead of showing the single `image`.
    fader?: string[];
  }
> = {
  prototyping: {
    titleKey: "prototyping",
    descriptionKey: "prototyping",
    relatedServices: ["die-casting", "surface-treatment"],
    image: "/images/services/design-simulation.jpg",
  },
  "die-casting": {
    titleKey: "dieCasting",
    descriptionKey: "dieCasting",
    relatedServices: ["post-processing", "surface-treatment", "quality"],
    image: "/images/services/die-casting-operators-daw125.jpg",
    fader: [
      "/images/services/die-casting-operators-daw125.jpg",
      "/images/services/die-casting-flange-inspection.jpg",
    ],
  },
  "post-processing": {
    titleKey: "postProcessing",
    descriptionKey: "postProcessing",
    relatedServices: ["die-casting", "surface-treatment"],
    image: "/images/services/cnc-post-processing.jpg",
  },
  "surface-treatment": {
    titleKey: "surfaceTreatment",
    descriptionKey: "surfaceTreatment",
    relatedServices: ["die-casting", "quality"],
    image: "/images/services/surface-coating-miljo169.jpg",
    gallery: [
      "/images/services/surface-coating-inspection.jpg",
      "/images/services/surface-coating-miljo169.jpg",
      "/images/services/surface-coating-cromat.jpg",
    ],
  },
  quality: {
    titleKey: "quality",
    descriptionKey: "quality",
    relatedServices: ["die-casting", "assembly"],
    image: "/images/services/quality-assurance.jpg",
  },
  assembly: {
    titleKey: "assembly",
    descriptionKey: "assembly",
    relatedServices: ["quality", "surface-treatment"],
    image: "/images/services/assembly.jpg",
  },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of SERVICE_SLUGS) {
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
  const s = slug as ServiceSlug;
  const meta = SERVICE_META[s];
  if (!meta) return {};

  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const title = t(`${meta.titleKey}.title`);
  const overview = t(`${meta.titleKey}.overview`);
  const description = metaDescription(overview);

  return buildMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title,
    description,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const s = slug as ServiceSlug;
  const meta = SERVICE_META[s];
  if (!meta) notFound();

  const t = await getTranslations(`serviceDetail.${meta.titleKey}`);
  const tServices = await getTranslations("services");

  const specs = t.raw("specs") as Array<{ label: string; value: string }>;
  const specsNote = t.raw("specsNote") as string | undefined;
  const faqItems = t.raw("faq") as Array<{
    question: string;
    answer: string;
  }>;
  const processSteps = t.raw("process") as Array<{
    step: string;
    description: string;
  }>;
  const advantageParagraphs = Object.values(
    t.raw("advantages") as Record<string, string>
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Get related service names
  const relatedServices = meta.relatedServices.map((rs) => {
    const relMeta = SERVICE_META[rs];
    return {
      slug: rs,
      titleKey: relMeta.titleKey,
    };
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <Breadcrumbs
        items={[
          { label: tServices("breadcrumb"), href: "/services" },
          { label: t("title"), href: `/services/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-zinc-50 overflow-hidden">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text */}
            <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-24 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t("title")}
              </h1>
              <div className="mt-6 max-w-2xl space-y-4">
                {t("overview")
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-lg sm:text-xl text-zinc-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
            {/* Image(s) */}
            {meta.gallery ? (
              <div className="relative min-h-[480px] lg:min-h-[560px] flex items-center">
                <ServiceImageGallery
                  images={meta.gallery.map((src) => ({
                    src,
                    alt: t("title"),
                    // The Cromat photo is wide; show its left part (the part with
                    // the threaded holes) rather than the cropped centre strip.
                    position: src.includes("cromat") ? "20% center" : undefined,
                  }))}
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
                {meta.fader ? (
                  <HeroImageFader
                    items={meta.fader.map((src) => ({
                      type: "image" as const,
                      src,
                      alt: t("title"),
                    }))}
                    fit="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    fadeMs={2500}
                  />
                ) : (
                  <Image
                    src={meta.image}
                    alt={t("title")}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent hidden lg:block" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10">
            {t("processHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <span className="text-5xl font-bold text-zinc-100 font-[family-name:var(--font-mono)] leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {step.step}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-zinc-950 grain py-14 sm:py-16 lg:py-20 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              {t("specsEyebrow")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10">
            {t("specsHeading")}
          </h2>
          {specsNote && (
            <p className="text-center text-sm sm:text-base text-zinc-400 font-[family-name:var(--font-mono)] tracking-wide mb-6">
              {specsNote}
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-zinc-950 p-6 sm:p-8">
                <div className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-mono)] tracking-tight">
                  {spec.value}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-6">
              {t("advantagesHeading")}
            </h2>
            <div className="space-y-4 text-base text-zinc-600 leading-relaxed">
              {advantageParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-50 py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10">
              {t("faqHeading")}
            </h2>
            <div className="space-y-8">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-12 sm:py-14 lg:py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-6">
            {t("relatedHeading")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((rs) => (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}`}
                className="group inline-flex items-center gap-2 border border-zinc-300 hover:border-ember px-5 py-3 text-sm text-zinc-700 hover:text-ember transition-colors"
              >
                {tServices(`items.${SERVICE_SLUGS.indexOf(rs.slug as ServiceSlug)}.title`)}
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
            ))}
          </div>
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
