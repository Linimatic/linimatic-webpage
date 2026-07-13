import type { Metadata } from "next";
import {
  Instrument_Sans,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  SITE_URL,
  OG_LOCALE,
  ogAlternateLocales,
  type Locale,
} from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";

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
  "@id": "https://linimatic.dk/#organization",
  name: "Linimatic A/S",
  legalName: "Linimatic A/S",
  description,
  url: "https://linimatic.dk",
  logo: "https://linimatic.dk/images/brand/linimatic-logo-zinc.png",
  image: "https://linimatic.dk/images/services/facility-2022.jpg",
  foundingDate: "1967",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bomose Allé 12",
    addressLocality: "Helsinge",
    postalCode: "3200",
    addressRegion: "Hovedstaden",
    addressCountry: "DK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.0201,
    longitude: 12.1676,
  },
  telephone: "+45 4876 4040",
  email: "info@linimatic.dk",
  vatID: "DK-20254386",
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
