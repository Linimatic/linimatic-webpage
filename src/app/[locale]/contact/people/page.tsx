import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, type Locale } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactTabs } from "@/components/ContactTabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact/people",
    title: t("contactPeople.title"),
    description: t("contactPeople.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

const teamPhotos = [
  "/images/team/torben-m-jensen.jpg",
  "/images/team/rene-johnsen.jpg",
  "/images/team/jan-v-jorgensen.jpg",
  "/images/team/rikke-ostrup-fisker.jpg",
  "/images/team/thomas-hjorth.jpg",
  "/images/team/dorthe-kondrup.jpg",
];

export default async function ContactPeoplePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPeoplePage");

  const team = t.raw("team") as Person[];

  return (
    <>
      <Breadcrumbs
        items={[{ label: t("breadcrumb"), href: "/contact/people" }]}
      />

      <section className="bg-zinc-50 pb-24">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <ContactTabs active="people" />

          {/* Hero */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-4 text-lg text-zinc-600">{t("intro")}</p>
          </div>

          {/* Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
            {team.map((person, i) => (
              <PersonCard key={person.name} person={person} photo={teamPhotos[i]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PersonCard({ person, photo }: { person: Person; photo: string }) {
  return (
    <div className="bg-white border border-zinc-200 flex flex-col items-center text-center">
      <div className="relative aspect-[3/4] w-[72%] mt-6 bg-zinc-200">
        <Image
          src={photo}
          alt={person.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 36vw, 24vw"
        />
      </div>
      <div className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
          {person.name}
        </h3>
        <p className="mt-1 text-sm text-zinc-600">{person.role}</p>
        <div className="mt-3 flex flex-col items-center gap-1">
          <a
            href={`tel:${person.phone.replace(/\s/g, "")}`}
            className="text-sm text-zinc-600 hover:text-ember transition-colors font-[family-name:var(--font-mono)]"
          >
            {person.phone}
          </a>
          <a
            href={`mailto:${person.email}`}
            className="text-sm text-zinc-600 hover:text-ember transition-colors"
          >
            {person.email}
          </a>
        </div>
      </div>
    </div>
  );
}
