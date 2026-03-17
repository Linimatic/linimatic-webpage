# Multilingual SEO Architecture

## Hreflang Implementation

### Every Page Must Include

```html
<link rel="alternate" hreflang="da" href="https://linimatic.dk/da/{path}" />
<link rel="alternate" hreflang="en" href="https://linimatic.dk/en/{path}" />
<link rel="alternate" hreflang="de" href="https://linimatic.dk/de/{path}" />
<link rel="alternate" hreflang="x-default" href="https://linimatic.dk/en/{path}" />
```

**Critical rules:**
- Every page must self-reference (include its own URL in hreflang set)
- `x-default` points to the English version (broadest international audience)
- Hreflang must be bidirectional (if DA points to EN, EN must point to DA)
- Use full absolute URLs, not relative paths

### Next.js Metadata Implementation

```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://linimatic.dk/en/services',
    languages: {
      'da': 'https://linimatic.dk/da/ydelser',
      'en': 'https://linimatic.dk/en/services',
      'de': 'https://linimatic.dk/de/dienstleistungen',
      'x-default': 'https://linimatic.dk/en/services',
    },
  },
};
```

## Locale Detection Middleware

```tsx
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const locales = ['da', 'en', 'de'];
const defaultLocale = 'en';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';

  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  // Skip non-page paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Check for locale cookie first, then detect from header
  const cookieLocale = request.cookies.get('locale')?.value;
  const locale = cookieLocale && locales.includes(cookieLocale)
    ? cookieLocale
    : getPreferredLocale(request);

  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );

  // Set locale cookie for 1 year
  response.cookies.set('locale', locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon).*)'],
};
```

## Content Translation Guidelines for SEO

### Translate, Don't Transliterate

Each language version should feel native, not like a machine translation.

| Aspect | Approach |
|--------|----------|
| URL slugs | Translate to native language words |
| Meta titles | Rewrite for target market search patterns |
| Meta descriptions | Rewrite with market-specific keywords |
| Headings | Translate naturally with target keywords |
| Body copy | Adapt for cultural expectations (especially DE) |

### Meta Description per Language

**English:**
> Denmark's largest zinc die-casting foundry. Precision zamak components from prototype to series production. ISO 9001 certified. Request a quote today.

**Danish:**
> Danmarks største zinkstøberi. Præcisionsstøbte zinkkomponenter fra prototype til serieproduktion. ISO 9001-certificeret. Få et tilbud i dag.

**German:**
> Dänemarks größte spezialisierte Zinkdruckgießerei. Präzise Zamak-Komponenten vom Prototyp bis zur Serienproduktion. ISO 9001-zertifiziert. Fordern Sie ein Angebot an.

### Keyword Localization

| English Keyword | Danish Equivalent | German Equivalent |
|----------------|-------------------|-------------------|
| zinc die-casting | zinktrykstøbning | Zinkdruckguss |
| precision components | præcisionskomponenter | Präzisionsbauteile |
| surface treatment | overfladebehandling | Oberflächenbehandlung |
| quality assurance | kvalitetssikring | Qualitätssicherung |
| request a quote | anmod om tilbud | Angebot anfordern |
| manufacturing services | produktionsydelser | Fertigungsdienstleistungen |

## Avoiding Duplicate Content

1. **Canonical tags** — Each language version is canonical to itself (not to the English version)
2. **Unique content** — Don't publish identical content across language versions (even partially)
3. **Hreflang signals** — Tell search engines these are translations, not duplicates
4. **Separate indexing** — Each language version should be discoverable independently in regional searches

## Open Graph per Language

```tsx
openGraph: {
  title: 'Zinc Die-Casting Services | Linimatic',
  description: 'Precision zinc die-casting from Denmark...',
  type: 'website',
  locale: 'en_DK',          // Primary locale for this page
  alternateLocale: ['da_DK', 'de_DE'],  // Other available locales
  siteName: 'Linimatic A/S',
}
```

Adjust `locale` to match the current page language:
- Danish pages: `locale: 'da_DK'`
- English pages: `locale: 'en_DK'` (or `en_GB` for UK-focused)
- German pages: `locale: 'de_DE'`
