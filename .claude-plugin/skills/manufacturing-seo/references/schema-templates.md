# Schema.org Markup Templates — JSON-LD

Complete JSON-LD structured data templates for each Linimatic page type. Implement in the page's `<head>` via Next.js metadata or a `<script type="application/ld+json">` tag.

## Organization (Global — every page)

Include on every page, typically in the root layout:

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://linimatic.dk/#organization",
  "name": "Linimatic A/S",
  "legalName": "Linimatic A/S",
  "description": "Denmark's largest dedicated zinc die-casting foundry. Precision zamak components from prototype to series production since 1967.",
  "url": "https://linimatic.dk",
  "logo": {
    "@type": "ImageObject",
    "url": "https://linimatic.dk/images/linimatic-logo.svg",
    "width": 300,
    "height": 80
  },
  "image": "https://linimatic.dk/images/linimatic-facility.jpg",
  "foundingDate": "1967",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Helsinge",
    "postalCode": "[Postal Code]",
    "addressRegion": "Hovedstaden",
    "addressCountry": "DK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 56.0234,
    "longitude": 12.1648
  },
  "telephone": "+45 [PHONE]",
  "email": "info@linimatic.dk",
  "sameAs": [
    "https://www.linkedin.com/company/linimatic",
    "https://www.facebook.com/linimatic"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 99
  },
  "knowsAbout": [
    "Zinc die-casting",
    "Zamak alloys",
    "Hot-chamber die-casting",
    "Surface treatment",
    "CNC machining",
    "Quality assurance"
  ],
  "areaServed": [
    {"@type": "Country", "name": "Denmark"},
    {"@type": "Country", "name": "Germany"},
    {"@type": "Continent", "name": "Europe"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Zinc Die-Casting Services",
    "itemListElement": [
      {"@type": "OfferCatalog", "name": "Prototypes"},
      {"@type": "OfferCatalog", "name": "Die-Casting"},
      {"@type": "OfferCatalog", "name": "Post-Processing"},
      {"@type": "OfferCatalog", "name": "Surface Coating"},
      {"@type": "OfferCatalog", "name": "Quality Assurance"},
      {"@type": "OfferCatalog", "name": "Assembly"}
    ]
  }
}
```

## BreadcrumbList (every page except homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://linimatic.dk/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://linimatic.dk/en/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Zinc Die-Casting",
      "item": "https://linimatic.dk/en/services/zinc-die-casting"
    }
  ]
}
```

## Service Page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zinc Die-Casting",
  "description": "Precision hot-chamber zinc die-casting in zamak alloys. Volumes from 100 to 5 million units per year with ±0.05mm tolerances.",
  "provider": {"@id": "https://linimatic.dk/#organization"},
  "serviceType": "Manufacturing",
  "category": "Die-Casting",
  "areaServed": {
    "@type": "Continent",
    "name": "Europe"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Zinc Die-Casting Options",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prototype Die-Casting",
          "description": "Low-volume prototype casting for design validation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Series Production",
          "description": "High-volume production runs up to 5 million units/year"
        }
      }
    ]
  }
}
```

## Case Study / Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Automotive Bracket Production — 2.4M Units/Year",
  "description": "How Linimatic achieved 99.2% first-pass yield on precision automotive brackets using 4-cavity zinc die-casting.",
  "author": {"@id": "https://linimatic.dk/#organization"},
  "publisher": {"@id": "https://linimatic.dk/#organization"},
  "datePublished": "2025-06-15",
  "dateModified": "2025-06-20",
  "image": "https://linimatic.dk/images/cases/automotive-bracket.jpg",
  "about": {
    "@type": "Product",
    "name": "Zinc Die-Cast Automotive Bracket",
    "manufacturer": {"@id": "https://linimatic.dk/#organization"},
    "material": "Zamak 5"
  }
}
```

## FAQ Page (Why Zinc)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the advantages of zinc die-casting over aluminum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zinc die-casting offers tighter tolerances (±0.05mm vs ±0.1mm), longer die life (up to 1 million shots), faster cycle times, and superior surface finish compared to aluminum die-casting."
      }
    },
    {
      "@type": "Question",
      "name": "What zamak alloys does Linimatic work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We primarily work with Zamak 2, Zamak 3, and Zamak 5. Zamak 3 is the most common general-purpose alloy, while Zamak 5 offers higher strength for structural applications."
      }
    }
  ]
}
```

## Job Posting

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "CNC Machinist — Zinc Die-Casting",
  "description": "Join Denmark's largest zinc die-casting foundry...",
  "datePosted": "2025-09-01",
  "validThrough": "2025-12-01",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {"@id": "https://linimatic.dk/#organization"},
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Helsinge",
      "addressCountry": "DK"
    }
  }
}
```

## Blog/News Post

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "New 400-Ton Die-Casting Machine Expands Capacity",
  "author": {"@id": "https://linimatic.dk/#organization"},
  "publisher": {"@id": "https://linimatic.dk/#organization"},
  "datePublished": "2025-11-10",
  "image": "https://linimatic.dk/images/news/new-machine.jpg",
  "articleSection": "Company News"
}
```

## Implementation Pattern in Next.js

Create a reusable component for JSON-LD injection:

```tsx
// src/components/JsonLd.tsx
type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Usage in page:
```tsx
import { JsonLd } from '@/components/JsonLd';

export default function ServicePage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Page content */}
    </>
  );
}
```
