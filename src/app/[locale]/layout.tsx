import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Instrument_Sans,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  SITE_URL,
  OG_LOCALE,
  POSTAL_ADDRESS,
  ogAlternateLocales,
  type Locale,
} from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { ZinkTemadagPopup } from "@/components/ZinkTemadagPopup";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  const l = locale as Locale;

  return {
    title: {
      default: t("home.title"),
      template: "%s | Linimatic A/S",
    },
    description: t("home.description"),
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      siteName: "Linimatic A/S",
      locale: OG_LOCALE[l],
      alternateLocale: ogAlternateLocales(l),
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function organizationSchema(description: string) {
  return {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  // Derived, never hand-written: the Service and Product nodes on other pages
  // reference this exact @id, so a literal here would silently detach the whole
  // entity graph the moment SITE_URL changed — with no build or schema error.
  "@id": `${SITE_URL}/#organization`,
  name: "Linimatic A/S",
  legalName: "Linimatic A/S",
  description,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/linimatic-logo-zinc.png`,
  image: `${SITE_URL}/images/services/facility-2022.jpg`,
  foundingDate: "1967",
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.0201,
    longitude: 12.1676,
  },
  telephone: "+45 4876 4040",
  email: "linimatic@linimatic.dk",
  vatID: "DK20254386",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "16:00",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 99,
  },
  knowsAbout: [
    "Zinc die-casting",
    "Zamak alloys",
    "Hot-chamber die-casting",
    "Surface treatment",
    "CNC machining",
    "Quality assurance",
    "Prototyping",
    "Design for manufacturing",
  ],
  sameAs: ["https://www.linkedin.com/company/linimatic"],
  areaServed: { "@type": "Place", name: "Europe" },
  priceRange: "$$$$",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // An unknown first path segment renders here with `locale` set to whatever
  // that segment was — old WordPress addresses like /wp-login.php reach this
  // point, because the proxy's matcher skips any path containing a dot. Without
  // this guard next-intl falls back to the default messages and the segment is
  // served as a 200 copy of the front page, carrying a canonical that points at
  // itself: every dead legacy URL becomes an indexable duplicate of the
  // homepage. Reject the locale instead, so the address 404s as it should.
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${instrumentSans.variable} ${sourceSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema(t("home.description"))} />
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <ConsentAnalytics />
          <ZinkTemadagPopup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
