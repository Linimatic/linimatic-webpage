# Technical SEO Configuration

## Sitemap Configuration

### Using Next.js App Router Sitemap

Create `src/app/sitemap.ts`:

```tsx
import type { MetadataRoute } from 'next';

const locales = ['da', 'en', 'de'];
const baseUrl = 'https://linimatic.dk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/why-zinc', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/cases', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/news', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/jobs', priority: 0.5, changeFrequency: 'weekly' as const },
    { path: '/zinkers', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

### robots.txt

Create `src/app/robots.ts`:

```tsx
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://linimatic.dk/sitemap.xml',
  };
}
```

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP) — Target: < 2.5s

| Strategy | Implementation |
|----------|---------------|
| Preload hero image | `<link rel="preload" as="image" href="...">` or `priority` prop on `next/image` |
| Font preloading | `next/font` handles this automatically with `display: swap` |
| Server Components | Default in App Router — no client JS bundle for static content |
| Image optimization | WebP format via `next/image`, responsive `sizes` attribute |
| Above-fold priority | Mark hero images with `priority={true}` |

### Interaction to Next Paint (INP) — Target: < 200ms

| Strategy | Implementation |
|----------|---------------|
| Minimize client JS | Server Components by default; `"use client"` only when needed |
| Debounce handlers | Debounce search, filter, and form validation |
| Web Workers | Offload heavy computation (if any) |
| React Compiler | Already enabled — optimizes re-renders automatically |

### Cumulative Layout Shift (CLS) — Target: < 0.1

| Strategy | Implementation |
|----------|---------------|
| Image dimensions | Always set `width` and `height` on `next/image` |
| Font display | `display: swap` with matched fallback metrics |
| Reserved space | Set `aspect-ratio` on containers for dynamic content |
| No injected content | Avoid dynamically inserting content above the fold |

## URL Structure

### Pattern
```
https://linimatic.dk/{locale}/{section}/{slug}
```

### URL Mapping Table

| Page | DA URL | EN URL | DE URL |
|------|--------|--------|--------|
| Homepage | `/da` | `/en` | `/de` |
| Services hub | `/da/ydelser` | `/en/services` | `/de/dienstleistungen` |
| Die-casting | `/da/ydelser/trykstobning` | `/en/services/die-casting` | `/de/dienstleistungen/druckguss` |
| Prototypes | `/da/ydelser/prototyper` | `/en/services/prototypes` | `/de/dienstleistungen/prototypen` |
| Post-processing | `/da/ydelser/efterbehandling` | `/en/services/post-processing` | `/de/dienstleistungen/nachbearbeitung` |
| Surface coating | `/da/ydelser/overfladebehandling` | `/en/services/surface-coating` | `/de/dienstleistungen/oberflaechenbehandlung` |
| Quality | `/da/ydelser/kvalitetssikring` | `/en/services/quality-assurance` | `/de/dienstleistungen/qualitaetssicherung` |
| Assembly | `/da/ydelser/montage` | `/en/services/assembly` | `/de/dienstleistungen/montage` |
| Cases | `/da/cases` | `/en/cases` | `/de/referenzen` |
| About | `/da/om-os` | `/en/about` | `/de/ueber-uns` |
| Contact | `/da/kontakt` | `/en/contact` | `/de/kontakt` |
| Why Zinc | `/da/hvorfor-zink` | `/en/why-zinc` | `/de/warum-zink` |
| News | `/da/nyheder` | `/en/news` | `/de/neuigkeiten` |
| Jobs | `/da/job` | `/en/jobs` | `/de/karriere` |
| Zinkers | `/da/zinkers` | `/en/zinkers` | `/de/zinkers` |

## Redirect Strategy

### From Old WordPress URLs

Map old linimatic.dk/linimatic.eu URLs to new structure:

```
301: /services/ → /en/services
301: /about-us/ → /en/about
301: /contact-us/ → /en/contact
301: /category/news/ → /en/news
```

Compile full redirect map from old site's sitemap before launch.

### Locale Redirects

- `/` → Detect browser `Accept-Language` → redirect to `/da`, `/en`, or `/de`
- Default fallback: `/en` (international audience)
- Set `x-default` hreflang to `/en`

## Performance Monitoring

### Tools
- **Google Search Console** — Index coverage, Core Web Vitals, search performance
- **Google PageSpeed Insights** — Per-page performance scoring
- **Lighthouse CI** — Automated performance testing in CI/CD pipeline

### Key Metrics to Track
- Organic impressions and clicks per page
- Core Web Vitals scores (LCP, INP, CLS)
- Index coverage status
- Crawl errors and redirect chains
- Structured data validation errors
