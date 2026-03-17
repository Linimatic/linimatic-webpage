---
name: page-design
description: This skill should be used when designing or building pages for the Linimatic manufacturing website. It provides content requirements, audience goals, and information architecture for each B2B manufacturing page type — without prescribing specific layouts or visual design. The manufacturing-web-designer agent decides the visual approach. Use this skill whenever the user asks to "design a page", "build the homepage", "create a service page", "structure a page", or mentions any specific page type. Also trigger when discussing page content, conversion goals, or information architecture for the site.
---

# Page Design — Content Requirements & Information Architecture

Content requirements and audience goals for each Linimatic A/S page type. This skill defines **what** content each page needs and **why** — the manufacturing-web-designer agent (or the designer) decides **how** it looks.

## Design Process

For each page:

1. **Identify the page type** — Consult the reference files below for content requirements
2. **Understand the audience** — Each page serves different buyer journey stages
3. **Gather content** — Ensure all required content elements are available or planned
4. **Apply brand** — Use the linimatic-brand skill for colors, typography, and tone
5. **Implement SEO** — Use the manufacturing-seo skill for metadata, schema, and heading hierarchy
6. **Design freely** — Choose layouts, components, and visual approach that best serve the content goals

## Page Types & Audience Goals

| Page | Primary Audience | Buyer Stage | Core Goal | Schema Type |
|------|-----------------|-------------|-----------|-------------|
| Homepage | All visitors | Awareness/Consideration | Establish authority, route to relevant content | Organization + LocalBusiness |
| Service Hub | Engineers, Procurement | Consideration | Show breadth of capabilities | Service (collection) |
| Service Detail | Engineers, Procurement | Consideration/Decision | Prove technical competence in specific area | Service |
| Case Study | Decision makers, Engineers | Decision | Provide evidence of successful delivery | Article + Product |
| About | All visitors | Consideration | Build trust through history, people, quality | Organization |
| Contact | Ready-to-buy | Decision | Remove friction from inquiry | ContactPage + LocalBusiness |
| Why Zinc | Engineers, Designers | Awareness | Educate on material benefits, attract search traffic | FAQPage + Article |
| News/Blog | All visitors | Awareness | Demonstrate ongoing activity, thought leadership | Blog + BlogPosting |
| Jobs | Potential employees | N/A | Attract skilled talent | JobPosting |
| Zinkers | Consumers, Retailers | Awareness/Decision | Showcase product line, drive orders | Product |

## Required Content Elements Per Page

Each reference file below lists the **content elements** a page needs (not how to arrange them). Elements are marked as:
- **Required** — Page is incomplete without this
- **Recommended** — Strengthens the page significantly
- **Optional** — Include if content is available

## File Structure

The Next.js App Router file structure for multilingual routing:

```
src/app/[locale]/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout with header/footer
├── services/
│   ├── page.tsx          # Services hub
│   └── [slug]/
│       └── page.tsx      # Individual service
├── cases/
│   ├── page.tsx          # Case studies listing
│   └── [slug]/
│       └── page.tsx      # Individual case study
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── why-zinc/
│   └── page.tsx
├── news/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── jobs/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── zinkers/
    └── page.tsx
```

## Shared Components

These components appear across multiple pages and should be built as reusable Server Components:

- **Header/Navigation** — Logo, main nav with services dropdown, language switcher, CTA
- **Footer** — Brand, service links, company links, contact info, legal
- **Breadcrumbs** — Hierarchical navigation (all pages except homepage)
- **CTA Section** — Conversion prompt, adaptable text per context
- **Language Switcher** — DA/EN/DE switching preserving current page path
- **JsonLd** — Reusable structured data injection component

## Key Design Constraints

These are hard requirements regardless of visual approach:

- **Accessibility:** WCAG 2.1 AA — proper contrast, keyboard nav, ARIA, focus states
- **Performance:** Server Components by default, lazy load below-fold content, optimized images
- **Responsiveness:** Mobile-first; significant tablet traffic from factory/office settings
- **Multilingual:** All user-facing text must support DA/EN/DE; German text runs ~30% longer than English
- **SEO:** Semantic HTML, proper heading hierarchy, schema markup per page type

## Additional Resources

### Reference Files — Content Requirements

For detailed content requirements per page type:

- **`references/homepage-content.md`** — Homepage content elements, audience goals, and conversion requirements
- **`references/service-pages-content.md`** — Service hub and detail page content requirements including technical specification needs
- **`references/case-study-content.md`** — Case study content framework (challenge/solution/results) and required data points
- **`references/supporting-pages-content.md`** — Content requirements for About, Contact, Why Zinc, News, Jobs, and Zinkers
- **`references/navigation-content.md`** — Navigation structure, link hierarchy, and language switching requirements
