---
name: manufacturing-seo
description: This skill should be used when implementing SEO for the Linimatic manufacturing website. It provides schema.org markup templates, keyword strategy, meta description patterns, structured data, technical SEO configuration, and multilingual SEO architecture. Use this skill whenever the user mentions "SEO", "search engine", "meta tags", "schema markup", "structured data", "keywords", "sitemap", "robots.txt", "hreflang", "Core Web Vitals", "page speed", "search ranking", or when creating any page that needs proper metadata, headings, or search optimization. Also trigger when building layouts with heading hierarchy, implementing breadcrumbs, adding Open Graph tags, or optimizing content structure for search visibility.
---

# Manufacturing SEO — B2B Industrial Search Optimization

SEO strategy and implementation patterns for Linimatic A/S, a zinc die-casting foundry targeting B2B procurement professionals, engineers, and manufacturing decision-makers in Denmark and internationally. Manufacturing SEO differs significantly from B2C — the audience uses technical search queries, buyer journeys are longer, and domain authority in niche industrial terms is more valuable than broad traffic.

## Core SEO Principles for Manufacturing

1. **Technical specificity wins** — "zinc die-casting zamak 5 tolerances" converts better than "metal casting services"
2. **Content depth over breadth** — One authoritative page on zinc alloy properties outranks ten thin pages
3. **Local + industry authority** — Combine geographic signals (Denmark, Scandinavia) with industry expertise
4. **Multilingual without duplication** — Proper hreflang prevents cannibalization across DA/EN/DE versions
5. **Trust signals matter** — Certifications (ISO, IATF), years of operation, and client logos build E-E-A-T

## Page-Level SEO Checklist

Apply to every page:

- [ ] Unique, keyword-rich `<title>` tag (50-60 characters)
- [ ] Compelling `<meta name="description">` (150-160 characters)
- [ ] Single `<h1>` containing primary keyword
- [ ] Logical heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Schema.org structured data (type depends on page)
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`)
- [ ] Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- [ ] Hreflang alternate links for DA/EN/DE versions
- [ ] Canonical URL
- [ ] Breadcrumb navigation with BreadcrumbList schema
- [ ] Internal links to related content (2-5 per page)
- [ ] Images with descriptive `alt` text and optimized filenames
- [ ] Lazy loading for below-fold images (`next/image` handles this)

## Heading Hierarchy Pattern

```
<h1>Primary Page Topic (one per page)</h1>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
```

Headings are semantic, not presentational. Style with Tailwind classes, not heading levels.

## Meta Tag Implementation in Next.js

Use the Next.js Metadata API in each page's `layout.tsx` or `page.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zinc Die-Casting Services | Linimatic A/S',
  description: 'Denmark\'s largest zinc die-casting foundry. Precision zamak components with ±0.05mm tolerances. ISO 9001 certified. Get a quote today.',
  alternates: {
    canonical: 'https://linimatic.dk/en/services',
    languages: {
      'da': 'https://linimatic.dk/da/ydelser',
      'en': 'https://linimatic.dk/en/services',
      'de': 'https://linimatic.dk/de/dienstleistungen',
    },
  },
  openGraph: {
    title: 'Zinc Die-Casting Services | Linimatic',
    description: 'Precision zinc die-casting from Denmark\'s largest dedicated foundry.',
    type: 'website',
    locale: 'en_DK',
    alternateLocale: ['da_DK', 'de_DE'],
  },
};
```

## Schema.org Quick Reference

| Page Type | Schema Type | Key Properties |
|-----------|-------------|----------------|
| Homepage | `Organization` + `LocalBusiness` | name, address, geo, foundingDate, numberOfEmployees |
| Service page | `Service` | name, description, provider, areaServed, serviceType |
| Case study | `Article` + `Product` | headline, datePublished, about, manufacturer |
| About | `Organization` | history, awards, certifications |
| Contact | `ContactPage` + `LocalBusiness` | telephone, email, address, openingHours |
| FAQ section | `FAQPage` + `Question` | name, acceptedAnswer |
| Job listing | `JobPosting` | title, description, datePosted, employmentType |
| News/blog | `Article` + `BlogPosting` | headline, author, datePublished, image |

For complete schema templates with JSON-LD code for each page type, consult **`references/schema-templates.md`**.

## Keyword Strategy Overview

**Primary keyword clusters:**

| Cluster | Example Terms | Target Pages |
|---------|---------------|--------------|
| Core service | zinc die-casting, zamak casting, zinc alloy components | Homepage, Services hub |
| Technical | zamak 2/3/5 properties, die-casting tolerances, zinc alloy specifications | Why Zinc, technical pages |
| Process | die-casting process, post-processing, surface treatment, CNC machining | Individual service pages |
| Geographic | die-casting Denmark, zinc foundry Scandinavia, European zinc casting | Homepage, About, Contact |
| Industry | automotive zinc components, electronics enclosures, industrial fittings | Case studies, service pages |
| Product | lead-free fishing sinkers, zinc fishing weights, Zinkers | Sinkers/Zinkers section |

For the complete keyword matrix with search volume estimates, intent mapping, and content recommendations, consult **`references/keyword-strategy.md`**.

## Technical SEO Configuration

### Sitemap

Generate with `next-sitemap` or a custom `sitemap.ts` in the app directory. Include all language variants. Prioritize service pages and case studies.

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://linimatic.dk/sitemap.xml
```

### Core Web Vitals Targets

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Optimize hero images, Server Components, font preloading |
| INP | < 200ms | Minimize client-side JS, Server Components by default |
| CLS | < 0.1 | Set explicit image dimensions, font-display: swap |

For detailed technical SEO configuration including redirect patterns, URL structure, crawl budget optimization, and performance monitoring, consult **`references/technical-seo.md`**.

## Multilingual SEO Architecture

**URL structure:** `/{locale}/path` — e.g., `/da/ydelser`, `/en/services`, `/de/dienstleistungen`

**Implementation with Next.js middleware:**
- Detect browser language on first visit
- Set locale cookie for subsequent visits
- Redirect root `/` to detected or default locale
- Each page exports metadata with hreflang alternates

**Critical rules:**
- Every page must have hreflang self-reference AND alternates for all languages
- Include `x-default` hreflang pointing to the English version
- Translate URL slugs (not just content) — `/ydelser` not `/da/services`
- Unique meta descriptions per language (translate, don't transliterate)

For multilingual URL mapping tables and middleware implementation patterns, consult **`references/multilingual-seo.md`**.

## Additional Resources

### Reference Files

For detailed templates, code examples, and extended guidance, consult:

- **`references/schema-templates.md`** — Complete JSON-LD schema markup templates for every page type
- **`references/keyword-strategy.md`** — Full keyword matrix with intent mapping, search volume estimates, and content planning
- **`references/technical-seo.md`** — robots.txt, sitemap configuration, redirect patterns, performance monitoring, and crawl optimization
- **`references/multilingual-seo.md`** — Hreflang implementation, URL slug translations, middleware patterns, and locale detection
- **`references/meta-templates.md`** — Title and meta description templates for each page type with character counts and keyword placement

### Utility Scripts

- **`scripts/validate-schema.sh`** — Validate JSON-LD schema markup against schema.org specifications
