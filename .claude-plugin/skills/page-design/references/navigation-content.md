# Navigation — Content & Structure Requirements

## Primary Navigation Items

| Nav Item | Links To | Notes |
|----------|----------|-------|
| Services | Services hub | Dropdown/mega-menu with all service categories |
| Cases | Case studies listing | |
| Why Zinc | Why Zinc page | |
| About | About page | |
| Contact | Contact page | |

**Also present in header:**
- Logo (links to homepage in current locale)
- Language switcher (DA / EN / DE)
- Primary CTA button ("Request a Quote" / locale equivalent)

## Services Dropdown Content

List all service categories so visitors can jump directly:

1. Prototypes
2. Casting Foundry (Die-Casting)
3. Post-Processing
4. Surface Coating
5. Quality Assurance
6. Assembly
7. Tooling
8. Design Assistance
9. Logistics
10. Sustainability

Plus a "View All Services" link to the hub page.

## Footer Link Structure

**Column 1 — Brand:**
- Logo
- 1-2 sentence company description
- Social media links (LinkedIn, Facebook)

**Column 2 — Services:**
- Links to all 10 service pages (or top 6 with "View all" link)

**Column 3 — Company:**
- About Us, Cases, News, Jobs, Why Zinc, Zinkers

**Column 4 — Contact:**
- Physical address (Helsinge, Denmark)
- Phone number
- Email address

**Sub-footer:**
- Copyright notice
- Privacy Policy link
- Cookie Policy link
- Sitemap link
- Language switcher (alternate position)

## Breadcrumb Hierarchy

```
Homepage
├── Services
│   ├── Prototypes
│   ├── Die-Casting
│   ├── Post-Processing
│   ├── Surface Coating
│   ├── Quality Assurance
│   ├── Assembly
│   ├── Tooling
│   ├── Design Assistance
│   ├── Logistics
│   └── Sustainability
├── Cases
│   └── [Individual Case Study]
├── Why Zinc
├── About
├── Contact
├── News
│   └── [Individual Post]
├── Jobs
│   └── [Individual Listing]
└── Zinkers
```

Present breadcrumbs on all pages except the homepage.

## Language Switcher Requirements

- Must preserve the current page when switching languages
- Requires a URL mapping between locale-specific slugs (see manufacturing-seo skill: `references/technical-seo.md` for the full URL mapping table)
- Display format: two-letter codes (DA, EN, DE) for compact header; full names with flags for mobile menu or footer
- Current language should be visually distinct (bold, underline, or different color)
- Implementation: set locale cookie on switch for future visit detection

## Mobile Navigation Requirements

- Hamburger/menu icon triggers full navigation
- Services section expandable (accordion within menu)
- CTA button prominent within mobile menu
- Language options accessible within mobile menu
- Focus trap when menu is open (accessibility)
- Close on Escape key, outside click, or X button

## Active State Logic

- Current page's nav item is visually marked as active
- When on a service detail page, "Services" parent nav item shows as active
- When on a case study detail page, "Cases" parent nav item shows as active
- Same pattern for news and job detail pages
