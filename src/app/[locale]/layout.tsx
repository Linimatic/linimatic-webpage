import type { Metadata } from "next";
import {
  Instrument_Sans,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";

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

export const metadata: Metadata = {
  title: {
    default: "Linimatic A/S — Denmark's Zinc Die-Casting Experts",
    template: "%s | Linimatic A/S",
  },
  description:
    "Denmark's largest dedicated zinc die-casting foundry since 1967. Precision zamak components from prototype to series production. ISO 9001 certified.",
  metadataBase: new URL("https://linimatic.dk"),
  openGraph: {
    type: "website",
    locale: "en_DK",
    siteName: "Linimatic A/S",
    images: [
      {
        url: "/images/og/linimatic-default.jpg",
        width: 1200,
        height: 630,
        alt: "Linimatic A/S — Zinc Die-Casting Foundry in Denmark",
      },
    ],
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
  alternates: {
    canonical: "https://linimatic.dk/en",
    languages: {
      da: "https://linimatic.dk/da",
      en: "https://linimatic.dk/en",
      de: "https://linimatic.dk/de",
      "x-default": "https://linimatic.dk/en",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://linimatic.dk/#organization",
  name: "Linimatic A/S",
  legalName: "Linimatic A/S",
  description:
    "Denmark's largest dedicated zinc die-casting foundry. Precision zamak components from prototype to series production since 1967.",
  url: "https://linimatic.dk",
  logo: "https://linimatic.dk/images/brand/linimatic-logo.png",
  image: "https://linimatic.dk/images/og/linimatic-default.jpg",
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
    latitude: 56.0234,
    longitude: 12.1648,
  },
  telephone: "+45 4876 4040",
  email: "info@linimatic.dk",
  vatID: "DK-20254386",
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
  areaServed: {
    "@type": "GeoShape",
    name: "Europe",
  },
  priceRange: "$$$$",
};

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

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${instrumentSans.variable} ${sourceSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
