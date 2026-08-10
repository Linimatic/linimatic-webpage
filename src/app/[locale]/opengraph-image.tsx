import { routing } from "@/i18n/routing";
import { ogCard, OG_FOOTER, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Linimatic A/S — Zinc Die-Casting Foundry in Denmark";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TAGLINE: Record<string, string> = {
  en: "Denmark's zinc die-casting foundry since 1967",
  da: "Danmarks zinktrykstøberi siden 1967",
  de: "Zinkdruckguss-Gießerei in Dänemark seit 1967",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return ogCard({
    eyebrow: "LINIMATIC A/S",
    title: TAGLINE[locale] ?? TAGLINE.en,
    footer: OG_FOOTER[locale] ?? OG_FOOTER.en,
  });
}
