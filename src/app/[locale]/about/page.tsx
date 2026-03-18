import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Linimatic — Denmark's Zinc Die-Casting Experts Since 1967",
  description:
    "Founded in 1967, Linimatic A/S is Denmark's largest dedicated zinc die-casting foundry. 50+ specialists, ISO 9001 certified, full value chain under one roof in Helsinge.",
  alternates: {
    canonical: "https://linimatic.dk/en/about",
    languages: {
      da: "https://linimatic.dk/da/about",
      en: "https://linimatic.dk/en/about",
      de: "https://linimatic.dk/de/about",
      "x-default": "https://linimatic.dk/en/about",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const teamPhotos = [
  "/images/team/jan-v-jorgensen.jpg",
  "/images/team/torben-m-jensen.jpg",
  "/images/team/rene-johnsen.jpg",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const certifications = t.raw("certifications") as Array<{
    name: string;
    detail: string;
  }>;
  const industries = t.raw("industries") as Array<{
    name: string;
    clients: string;
  }>;
  const teamMembers = t.raw("team.members") as Array<{
    name: string;
    role: string;
    focus: string;
    phone: string;
    email: string;
  }>;

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/about" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-20">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t("heading")}
              </h1>
              <div className="mt-8 space-y-4 text-base text-zinc-600 leading-relaxed max-w-xl">
                <p>{t("story.p1")}</p>
                <p>{t("story.p2")}</p>
                <p>{t("story.p3")}</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/services/facility-2022.jpg"
                alt={t("facilityAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-zinc-950 grain">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 lg:py-10 ${i > 0 ? "border-l border-zinc-800 pl-6 lg:pl-8" : ""}`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-mono)]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
              {t("certificationsEyebrow")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10">
            {t("certificationsHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="border border-zinc-200 p-6 hover:border-zinc-300 transition-colors"
              >
                <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {cert.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                {t("sustainabilityEyebrow")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-6">
              {t("sustainabilityHeading")}
            </h2>
            <div className="space-y-4 text-base text-zinc-600 leading-relaxed">
              <p>{t("sustainability.p1")}</p>
              <p>{t("sustainability.p2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-4">
            {t("industriesHeading")}
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mb-10">
            {t("industriesDescription")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div key={industry.name} className="pb-6 border-b border-zinc-200">
                <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {industry.name}
                </h3>
                <p className="mt-1 text-sm text-ember font-[family-name:var(--font-mono)]">
                  {industry.clients}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("team.heading")}
            </h2>
            <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
              {t("team.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="text-center">
                <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-zinc-200 relative">
                  <Image
                    src={teamPhotos[i]}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {member.name}
                </h3>
                <p className="text-sm text-zinc-500">{member.role}</p>
                <p className="text-xs text-zinc-400 mt-1">{member.focus}</p>
                <div className="mt-3 flex flex-col gap-1">
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className="text-xs text-zinc-400 hover:text-ember transition-colors font-[family-name:var(--font-mono)]"
                  >
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-zinc-400 hover:text-ember transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 grain py-20 relative">
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
