import type { Metadata } from "next";
import { buildMetadata, type Locale } from "@/lib/seo";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/jobs",
    title: t("jobs.title"),
    description: t("jobs.description"),
    absoluteTitle: true,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Regenerate weekly so the build-derived JobPosting dates below keep rolling
// forward on static hosting (no deploy required); validThrough stays ~4 months out.
export const revalidate = 604800;

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("jobsPage");

  const perks = t.raw("perks") as Array<{ title: string; description: string }>;
  const positions = t.raw("positions") as Array<{
    title: string;
    department: string;
    type: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
  }>;

  // Dates derived from the (re)generation time; combined with the weekly
  // `revalidate` above this keeps validThrough rolling ~4 months out so a
  // listing never silently expires. A role drops from search only when
  // removed from the positions list.
  const now = new Date();
  const datePosted = now.toISOString().slice(0, 10);
  const validThrough = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  // Generate JobPosting schema for each open position
  const jobPostingSchemas = positions.map((pos) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: pos.title,
    description: `${pos.description} Responsibilities: ${pos.responsibilities.join(". ")}. Requirements: ${pos.requirements.join(". ")}.`,
    datePosted,
    validThrough,
    employmentType: pos.type === "Full-time" || pos.type === "Fuldtid" || pos.type === "Vollzeit" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      "@id": "https://linimatic.dk/#organization",
      name: "Linimatic A/S",
      sameAs: "https://linimatic.dk",
      logo: "https://linimatic.dk/images/brand/linimatic-logo-zinc.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bomose Allé 12",
        addressLocality: "Helsinge",
        postalCode: "3200",
        addressCountry: "DK",
      },
    },
    industry: "Manufacturing",
    occupationalCategory: pos.department,
  }));

  return (
    <>
      {jobPostingSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/jobs" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-16">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t("heading")}
              </h1>
              {t("description")
                .split("\n\n")
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-lg text-zinc-600 leading-relaxed max-w-xl ${i === 0 ? "mt-6" : "mt-4"}`}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/services/facility-2022.jpg"
                alt={t("heroImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("positionsEyebrow")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("positionsHeading")}
            </h2>
          </div>

          {positions.length > 0 ? (
            <div className="space-y-6">
              {positions.map((pos) => (
                <div
                  key={pos.title}
                  className="bg-white border border-zinc-200 hover:border-zinc-300 transition-colors"
                >
                  {/* Position header */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                        {pos.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] tracking-[0.1em] uppercase text-ember font-[family-name:var(--font-mono)]">
                          {pos.department}
                        </span>
                        <span className="text-zinc-300">|</span>
                        <span className="text-[11px] tracking-[0.1em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                          {pos.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-base text-zinc-600 leading-relaxed max-w-3xl">
                      {pos.description}
                    </p>

                    {pos.contactName && (
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                        <span className="font-medium text-zinc-700">
                          {t("contactLabel")}:
                        </span>
                        <span>{pos.contactName}</span>
                        {pos.contactPhone && (
                          <>
                            <span className="text-zinc-300">·</span>
                            <a
                              href={`tel:${pos.contactPhone.replace(/\s+/g, "")}`}
                              className="hover:text-zinc-900 transition-colors"
                            >
                              {pos.contactPhone}
                            </a>
                          </>
                        )}
                        {pos.contactEmail && (
                          <>
                            <span className="text-zinc-300">·</span>
                            <a
                              href={`mailto:${pos.contactEmail}`}
                              className="hover:text-zinc-900 transition-colors"
                            >
                              {pos.contactEmail}
                            </a>
                          </>
                        )}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 mb-3">
                          {t("responsibilitiesLabel")}
                        </h4>
                        <ul className="space-y-2">
                          {pos.responsibilities.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-zinc-600"
                            >
                              <span className="text-ember mt-1 shrink-0">
                                &bull;
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Requirements */}
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 mb-3">
                          {t("requirementsLabel")}
                        </h4>
                        <ul className="space-y-2">
                          {pos.requirements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-zinc-600"
                            >
                              <span className="text-ember mt-1 shrink-0">
                                &bull;
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href={`mailto:${pos.contactEmail ?? "info@linimatic.dk"}?subject=${encodeURIComponent(t("applySubject", { position: pos.title }))}`}
                        className="group inline-flex items-center gap-3 bg-ember hover:bg-ember-light px-6 py-3 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
                      >
                        {t("applyButton")}
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
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 p-8 sm:p-12 text-center">
              <p className="text-lg text-zinc-600">{t("noPositions")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Work Here */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("whyHeading")}
            </h2>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-2xl">
              {t("whyDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="border border-zinc-200 p-6 hover:border-zinc-300 transition-colors"
              >
                <div className="w-6 h-[2px] bg-ember mb-4" />
                <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application */}
      <section className="bg-zinc-950 grain py-20 relative">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("openApplicationHeading")}
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              {t("openApplicationDescription")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@linimatic.dk?subject=Open%20Application%20%E2%80%94%20Linimatic"
                className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
              >
                {t("openApplicationButton")}
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
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-all"
              >
                {t("learnMoreButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
