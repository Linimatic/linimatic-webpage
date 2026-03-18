import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Linimatic — Get a Zinc Die-Casting Quote",
  description:
    "Send us your drawings for a free zinc die-casting quote. Response within 24 hours. Call +45 4876 4040 or visit us in Helsinge, Denmark.",
  alternates: {
    canonical: "https://linimatic.dk/en/contact",
    languages: {
      da: "https://linimatic.dk/da/contact",
      en: "https://linimatic.dk/en/contact",
      de: "https://linimatic.dk/de/contact",
      "x-default": "https://linimatic.dk/en/contact",
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

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://linimatic.dk/#organization",
  name: "Linimatic A/S",
  telephone: "+45 4876 4040",
  email: "info@linimatic.dk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bomose Allé 12",
    addressLocality: "Helsinge",
    postalCode: "3200",
    addressCountry: "DK",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "16:00",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  const teamMembers = t.raw("team") as Array<{
    name: string;
    role: string;
    focus: string;
    phone: string;
    email: string;
  }>;

  return (
    <>
      <JsonLd data={contactSchema} />
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/contact" }]} />

      <section className="bg-zinc-50 pb-24">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Hero */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-4 text-lg text-zinc-500">{t("description")}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-sm text-ember font-[family-name:var(--font-mono)]">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {t("responsePromise")}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-700 mb-1.5"
                    >
                      {t("form.name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-zinc-700 mb-1.5"
                    >
                      {t("form.company")} *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-700 mb-1.5"
                    >
                      {t("form.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-zinc-700 mb-1.5"
                    >
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    {t("form.subject")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors bg-white"
                  >
                    <option value="new-project">{t("form.subjectNew")}</option>
                    <option value="existing-project">
                      {t("form.subjectExisting")}
                    </option>
                    <option value="general">{t("form.subjectGeneral")}</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="volume"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    {t("form.volume")}
                  </label>
                  <select
                    id="volume"
                    name="volume"
                    className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors bg-white"
                  >
                    <option value="">{t("form.volumeSelect")}</option>
                    <option value="prototype">
                      {t("form.volumePrototype")}
                    </option>
                    <option value="low">{t("form.volumeLow")}</option>
                    <option value="high">{t("form.volumeHigh")}</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    {t("form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-ember transition-colors resize-y"
                  />
                </div>
                <div>
                  <label
                    htmlFor="files"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    {t("form.fileUpload")}
                  </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    accept=".step,.stp,.iges,.igs,.sldprt,.sldasm,.x_t,.pdf,.dwg,.dxf"
                    className="w-full text-sm text-zinc-500 file:mr-4 file:py-2.5 file:px-4 file:border file:border-zinc-300 file:text-sm file:font-medium file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-100 file:cursor-pointer file:transition-colors"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-400 font-[family-name:var(--font-mono)]">
                    {t("form.fileFormats")}
                  </p>
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
                >
                  {t("form.submit")}
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
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              {/* Direct Contacts */}
              <div>
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-semibold mb-6">
                  {t("directContacts")}
                </h2>
                <div className="space-y-6">
                  {teamMembers.map((member, i) => (
                    <div key={member.name} className="flex gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-200 relative flex-shrink-0">
                        <Image
                          src={teamPhotos[i]}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900">
                          {member.name}
                        </h3>
                        <p className="text-xs text-zinc-500">{member.role}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {member.focus}
                        </p>
                        <div className="mt-1.5 flex flex-col gap-0.5">
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Details */}
              <div>
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-semibold mb-4">
                  {t("companyDetails")}
                </h2>
                <address className="not-italic space-y-2 text-sm text-zinc-600">
                  <p>Linimatic A/S</p>
                  <p>Bomose Allé 12</p>
                  <p>DK-3200 Helsinge</p>
                  <p>Denmark</p>
                  <div className="pt-2 space-y-1">
                    <p>
                      <a
                        href="tel:+4548764040"
                        className="font-[family-name:var(--font-mono)] text-zinc-700 hover:text-ember transition-colors"
                      >
                        +45 4876 4040
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:info@linimatic.dk"
                        className="text-zinc-700 hover:text-ember transition-colors"
                      >
                        info@linimatic.dk
                      </a>
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 pt-2 font-[family-name:var(--font-mono)]">
                    CVR: DK-20254386
                  </p>
                </address>
              </div>

              {/* Hours */}
              <div>
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-semibold mb-4">
                  {t("hours")}
                </h2>
                <div className="text-sm text-zinc-600 space-y-1">
                  <p>{t("hoursWeekday")}</p>
                  <p className="text-zinc-400">{t("hoursWeekend")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
