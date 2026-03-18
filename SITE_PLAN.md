# Linimatic Website — Site Plan

> **Brand DNA**: "The best for the most complex."
> **Positioning**: Premium complexity specialist. Not the cheapest — the most capable. Expertise, reliability, quality.
> **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, trilingual (DA/EN/DE)
> **Domain**: linimatic.dk

This plan was designed from first principles, validated by SEO best practices (2025–2026) and stress-tested against three B2B buyer personas: Anna (senior engineer), Henrik (procurement manager), and Søren (VP operations / decision maker).

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Site Architecture](#2-site-architecture)
3. [Page Inventory](#3-page-inventory)
4. [Buying Journey Mapping](#4-buying-journey-mapping)
5. [Topic Cluster Strategy](#5-topic-cluster-strategy)
6. [Internal Linking Strategy](#6-internal-linking-strategy)
7. [Structured Data Plan](#7-structured-data-plan)
8. [Build Phases](#8-build-phases)
9. [Content Requirements from Marc](#9-content-requirements-from-marc)

---

## 1. Design Principles

These principles override all other decisions. When in doubt, refer back here.

### Fewer, deeper pages over many thin ones
Six strong service pages with real technical depth outrank ten shallow pages. Every page must justify its existence with unique search intent and substantial content. If two pages share the same audience and moment in the buyer journey, merge them.

### Structure for the buyer, not the org chart
Service pages map to how prospects evaluate a supplier ("can you cast it, can you finish it, can you inspect it"), not to Linimatic's internal departments. "Tooling" isn't a service a buyer searches for — it's part of the casting story. "Logistics" isn't a service — it's part of assembly and supply.

### Proof over claims
Every claim needs evidence. "High quality" means nothing. "ISO 9001 since 1993, CMM-verified, 99.2% first-pass yield" means everything. Case studies with real metrics are the single strongest trust signal for B2B manufacturing buyers.

### Don't launch what you can't fill
An empty blog looks worse than no blog. A Jobs page with zero listings looks worse than a "We're hiring" line on the About page. Launch only what has real content behind it. Expand when the content pipeline exists.

### The homepage is a routing device
Its job is to answer three questions in 30 seconds: What do you do? Are you credible? How do I engage? Everything else belongs on dedicated pages.

---

## 2. Site Architecture

```
linimatic.dk
├── /[locale]/                          ← Homepage
├── /[locale]/services/                 ← Services hub (capability matrix)
│   ├── /services/prototyping           ← Prototyping & Design Review
│   ├── /services/die-casting           ← Hot-Chamber Die Casting
│   ├── /services/post-processing       ← CNC Post-Processing
│   ├── /services/surface-treatment     ← Surface Treatment & Coating
│   ├── /services/quality               ← Quality & Certification
│   └── /services/assembly              ← Assembly & Supply Chain
├── /[locale]/cases/                    ← Case Studies listing (with industry filters)
│   └── /cases/[slug]                   ← Individual case study
├── /[locale]/why-zinc/                 ← Educational pillar page
├── /[locale]/about/                    ← Company story, team, facility, certifications
├── /[locale]/contact/                  ← Contact form, map, direct contacts
├── /[locale]/zinkers/                  ← Zinkers product line (footer link only)
├── /[locale]/privacy/                  ← Privacy Policy ✅ exists
├── /[locale]/cookies/                  ← Cookie Policy ✅ exists
├── /sitemap.xml                        ← Auto-generated, multilingual alternates
└── /robots.txt                         ← Auto-generated
```

**Locales**: `/da/`, `/en/`, `/de/` — subdirectory pattern (preserves single domain authority)

**Total pages at launch**: ~15 (homepage + services hub + 6 service detail + cases listing + 3 case studies + why zinc + about + contact + zinkers + 2 legal)

### What is NOT at launch

| Page | Why deferred | When to add |
|------|-------------|-------------|
| **News / Blog** | An empty or barely-populated blog signals neglect, not activity. Worse than no blog at all. | When Linimatic can commit to monthly publishing (1–2 articles/month minimum). Article ideas are listed in Phase 3 below. |
| **Jobs (standalone)** | A 50-person company typically has 0–2 openings. A standalone page would look sparse. | When there are 3+ open positions. Until then, a "We're hiring" section on the About page with a mailto link is proportional. |
| **Industry landing pages** | Pages like `/industries/automotive` need enough case studies per sector to be credible. With only 3 cases at launch, these would be thin. | When there are 2+ case studies per industry. The Cases page with industry filter tags serves this need in the meantime. |

### What was consolidated (and why)

| Old structure (8–10 pages) | New structure (6 pages) | Rationale |
|---------------------------|------------------------|-----------|
| Prototypes + Design Optimization + Casting Tools | **Prototyping & Design Review** | These are the same customer journey step: "I have a CAD file, I need DFM feedback and first samples." Nobody searches for "casting tools" or "design assistance" independently. Tool design, tool ownership, and tool transfer are covered as sections on this page. |
| Casting Foundry (standalone) | **Hot-Chamber Die Casting** | Core page. Tooling information (die design, multi-cavity, maintenance, die life) becomes a section here — it's inseparable from the casting decision. |
| Post-Processing (standalone) | **CNC Post-Processing** | Kept as-is — distinct search intent ("CNC machining die cast parts"). |
| Surface Coating (standalone) | **Surface Treatment & Coating** | Kept as-is — strong differentiator, distinct search intent ("chrome plating zinc"). |
| Quality Assurance (standalone) | **Quality & Certification** | Kept as-is. Must be substantial: CMM equipment specs, SPC methodology, PPAP capability, traceability system. Not just an ISO logo. |
| Assembly + Logistics | **Assembly & Supply Chain** | Merged. Logistics (kanban, EDI, call-offs, ERP integration) is part of the delivery story, not a standalone service. |
| Sustainability (standalone) | → Section on **About** page | Sustainability is a company value and a procurement checkbox, not a service. Specific and measurable (recycling rates, energy data), not vague. |

---

## 3. Page Inventory

### 3.1 Homepage — `/[locale]/`

**Status**: ✅ Built (needs revision)
**Purpose**: Route visitors into the funnel in under 30 seconds. Establish credibility. Convert to inquiry.
**Primary keyword**: `zinc die casting Denmark` / `zinkstøberi Danmark` / `Zinkdruckguss Dänemark`
**Search intent**: Navigational / Commercial

**Sections (7):**

| # | Section | Purpose | Content |
|---|---------|---------|---------|
| 1 | **Hero** | Instant positioning | "The best for the most complex." Headline, tagline, 2 CTAs (primary: "Bring Us Your Challenge" → contact; secondary: "Our Services" → services hub). Hero image of precision casting, `priority` flag for LCP. |
| 2 | **Stats strip** | Instant credibility | Founded 1967 · 12M+ parts/year · 12 die-cast machines · ISO 9001 since 1993 · 50+ specialists. Monospace, dark background. |
| 3 | **Value chain** | Show integrated capability | 6-step visual: Design → Cast → Machine → Finish → Inspect → Deliver. Each step with specs. Key message: "Everything under one roof — zero handoffs." Links to service pages. |
| 4 | **Social proof** | Trust through association | Client logos (B&O, Fritz Hansen, VELUX, One Collection, HOWE, Montana, Frandsen, ClimaWin). Scrolling carousel. **Customer testimonial** (real quote from a named person — MUST be filled before launch). **Industry tags line**: `Automotive · Furniture · Lighting · Building · Electronics · Industrial` — single text line, not a full section. Gives Henrik his 10-second industry scan without adding weight. |
| 5 | **Featured cases** | Proof through outcomes | 3 case study cards: DeWalt, One Collection, VELUX. Each with client name, challenge title, key metric, and **real result** (yield rate, volume delivered, years in production — MUST be filled). Links to full case studies. |
| 6 | **Team** | Human connection | "Talk to the people who do the work. No call centres. No account managers who've never seen a casting machine." 3 key contacts with photo, name, role, phone, email. This section is psychologically distinct from the CTA — it says "we are real people", not "click the button." |
| 7 | **CTA** | Convert | "Let's talk about your next project." + response promise ("Within 24 hours"). Phone number + contact button. Background: facility photo at low opacity. Visually adjacent to Team but serving a different purpose (action vs. trust). |

**Removed from homepage:**
- ~~Industries section (6 cards)~~ → Replaced by a single industry-tags text line in the Social proof section + Cases page with industry filters
- ~~Why Zinc teaser (4 spec boxes)~~ → The nav item routes Anna there directly. The homepage should focus on "what Linimatic does for you", not "why zinc as a material"

**SEO metadata:**
```
Title: Linimatic A/S — Denmark's Zinc Die-Casting Experts
Description: Denmark's largest dedicated zinc die-casting foundry since 1967.
             Precision zamak components from prototype to series production. ISO 9001 certified.
Schema: Organization + LocalBusiness ✅ (already implemented)
OG image: 1200×630px branded image of facility/casting process
```

---

### 3.2 Services Hub — `/[locale]/services/`

**Status**: 🔴 Not built
**Purpose**: Scannable capability overview. This is the page Henrik screenshots for his supplier comparison matrix. Must function as both a visual overview AND a quick-reference data sheet.
**Primary keyword**: `zinc die casting services` / `full service die casting`
**Search intent**: Commercial

**Page sections:**

1. **Hero** — "Everything under one roof." One paragraph emphasizing that competitors outsource steps; Linimatic doesn't. Single point of contact, consistent quality, faster turnaround.

2. **Value chain visual** — Full 6-step process flow (Design → Cast → Machine → Finish → Inspect → Deliver) with links to individual service pages. More detailed than homepage version.

3. **Capability matrix** — This is the key differentiator of this page. A structured, scannable summary of ALL capabilities on one view:

   | Capability | Key Specs | Certifications |
   |-----------|-----------|---------------|
   | Prototyping & DFM | First samples in 3–4 weeks · 48h response | — |
   | Hot-Chamber Die Casting | 12 machines, 80–400T · Zamak 2/3/5 · ±0.05mm | ISO 9001 |
   | CNC Post-Processing | Milling, turning, threading · Tight secondary tolerances | — |
   | Surface Treatment | Chrome · Powder coat · Wet paint · Laser engrave | — |
   | Quality & Inspection | CMM · SPC · PPAP · Full traceability | ISO 9001 since 1993 |
   | Assembly & Supply | Sub-assembly · Kanban · JIT delivery | — |

   Each row links to the detail page. This is designed to be screenshotted/exported.

4. **Key differentiators** — Why the integrated model matters: fewer handoffs, no quality gaps between suppliers, single responsible partner, faster time-to-market.

5. **CTA** — "Bring us your drawing" / "Get a quote"

**SEO metadata:**
```
Title: Zinc Die-Casting Services — Prototype to Production | Linimatic
Description: Full-service zinc die-casting under one roof: prototyping, hot-chamber casting,
             CNC machining, surface coating, quality assurance & assembly. Helsinge, Denmark.
Schema: BreadcrumbList
```

**Roadmap item:** Downloadable capability PDF summarizing this page's content. Procurement professionals need a document they can circulate internally — they won't send their boss a website URL. Not required at launch, but high-value addition soon after.

---

### 3.3 Service Detail Pages — `/[locale]/services/[slug]`

All 6 service pages share a template. Each page must be substantive — deep enough that Anna (engineer) judges Linimatic's technical competence by it.

**Shared template structure:**

1. **Hero** — Service name, one-line value proposition, primary image
2. **Overview** — What this service is, written to answer the primary search query directly in the first 40–60 words (AI Overview / featured snippet optimization)
3. **Process description** — Step-by-step: how Linimatic delivers this service, from customer engagement to delivery
4. **Technical specifications** — Concrete data in scannable format (tables, spec cards). This is what Anna evaluates. Vague claims here = lost prospect.
5. **Advantages** — Why Linimatic's approach is superior, tied to brand positioning (complexity expertise, reliability, quality)
6. **FAQ section** — 3–5 questions with concise answers (for FAQPage schema → featured snippets + People Also Ask)
7. **Related case studies** — 1–2 relevant cases with links
8. **Related services** — 2–3 complementary services (cross-linking + SEO)
9. **CTA** — Service-specific prompt (e.g., "Get a casting quote", not generic "Contact us")

---

#### `/services/prototyping` — Prototyping & Design Review

**Merges**: old Prototypes + Design Optimization + Casting Tools pages
**Primary keyword**: `zinc die casting prototype` / `DFM die casting`
**Search intent**: Commercial / Decision

**Content focus:**
- DFM review service: send a CAD file, get feedback within 48 hours
- Wall thickness guidance, draft angles, simulation, material selection advice
- Rapid tooling for pre-series (gravity casting and soft tooling options)
- Speed to first sample: 3–4 weeks
- Bridge to production tooling
- Converting parts from other processes (plastic → zinc, machined → cast)
- **Tool ownership & transfer section**: Who owns the tool? Can tools be transferred from another foundry? Tool storage and maintenance.

**Specifications table:**
- Response time: 48h
- First samples: 3–4 weeks
- Pre-series volumes: 50–10,000 pcs
- File formats accepted: STEP, IGES, Solidworks, Parasolid
- Simulation: mold flow analysis available

**FAQ topics:**
- "How fast can I get a zinc die-cast prototype?"
- "What is DFM for die casting?"
- "Can you convert my plastic part to zinc?"
- "What's the minimum wall thickness for zinc die casting?"
- "Who owns the casting tool?"
- "Can you transfer tooling from another foundry?"

**Schema**: FAQPage + HowTo + BreadcrumbList

---

#### `/services/die-casting` — Hot-Chamber Die Casting

**Core technical credibility page.** Anna will judge the entire company by its depth.
**Primary keyword**: `hot chamber zinc die casting` / `zinc foundry Denmark`
**Search intent**: Commercial

**Content focus:**
- 12 automated hot-chamber machines with robotic handling
- Machine tonnage range: 80–400T
- Part weight range: 1g to 3kg
- 24-hour operation capability
- Cycle times, shot-by-shot consistency
- **Alloy specification table** (MUST include — Anna demands this):

  | Property | Zamak 2 | Zamak 3 | Zamak 5 |
  |----------|---------|---------|---------|
  | Tensile strength | 397 MPa | 283 MPa | 331 MPa |
  | Elongation | 7% | 10% | 7% |
  | Hardness (Brinell) | 100 | 82 | 91 |
  | Density | 6.8 g/cm³ | 6.6 g/cm³ | 6.7 g/cm³ |
  | Primary use | High-strength | General purpose | High-performance |

- **Tolerance capability chart** — as-cast vs. post-machined, by feature type (linear, bore, flatness)
- **Tooling section**: Die design capability, multi-cavity dies, die life expectancy (1M+ shots), maintenance program, tool storage

**FAQ topics:**
- "What is hot-chamber die casting?"
- "Which Zamak alloy should I use?"
- "What part sizes can you cast?"
- "How long does a zinc die-casting tool last?"
- "What tolerances can zinc die casting achieve?"

**Schema**: FAQPage + BreadcrumbList

---

#### `/services/post-processing` — CNC Post-Processing

**Primary keyword**: `CNC machining die cast parts` / `zinc die casting finishing`
**Search intent**: Commercial

**Content focus:**
- In-house CNC milling, turning, drilling, threading
- Deburring, trimming, tumbling
- Key message: parts never leave the building between casting and machining — consistent quality, faster turnaround
- Achievable tolerances post-machining
- When secondary machining is needed vs. as-cast accuracy

**FAQ topics:**
- "Do zinc die-cast parts need machining?"
- "What tolerances can secondary machining achieve?"
- "What deburring methods do you use?"

**Schema**: FAQPage + BreadcrumbList

---

#### `/services/surface-treatment` — Surface Treatment & Coating

**Strong differentiator** — many foundries outsource surface treatment.
**Primary keyword**: `zinc die casting surface treatment` / `chrome plating zinc parts`
**Search intent**: Commercial

**Content focus:**
- Full range: chromium plating, powder coating, wet painting, e-coating, laser engraving
- Class A cosmetic finishes (chrome-ready as-cast surface quality: 0.8 Ra μm)
- Corrosion protection options (salt spray test hours, coating thicknesses)
- Color matching capability
- Environmental compliance of coating processes

**FAQ topics:**
- "What surface finishes are available for zinc die-cast parts?"
- "How does chrome plating work on zamak?"
- "Which coating is best for outdoor use?"
- "Can zinc die-cast parts achieve Class A cosmetic finish?"

**Schema**: FAQPage + BreadcrumbList

---

#### `/services/quality` — Quality & Certification

**MUST be substantial** — Anna explicitly flags thin quality pages as a trust-killer.
**Primary keyword**: `zinc die casting quality control` / `ISO 9001 die casting`
**Search intent**: Commercial / Trust

**Content focus:**
- ISO 9001 certification since 1993 — not a recent checkbox exercise
- **CMM equipment**: brand, model, measurement volume — not just "we have a CMM"
- **SPC implementation**: real-time statistical process control, how it's applied
- **PPAP capability**: what documentation Linimatic can provide (PPAP levels, APQP if applicable)
- **First article inspection** process
- **Traceability system**: lot tracking, material certificates, inspection records
- Sample inspection report screenshot or redacted example (if possible)

**FAQ topics:**
- "What quality certifications does Linimatic hold?"
- "Can you provide PPAP documentation?"
- "How do you ensure dimensional accuracy?"
- "What traceability do you provide per batch?"

**Schema**: FAQPage + BreadcrumbList

---

#### `/services/assembly` — Assembly & Supply Chain

**Primary keyword**: `die casting assembly services` / `turnkey zinc components`
**Search intent**: Commercial

**Content focus:**
- Sub-assembly capability: insert pressing, fastening, multi-component assembly
- Kanban delivery, JIT supply, consignment stock
- Packaging options (standard, custom, branded)
- Forecast planning and call-off scheduling
- **Procurement-specific details** (Henrik cares about these): ERP system, EDI capability, delivery lead times, minimum order quantities
- Key message: "We ship finished products on your schedule, not loose parts"

**FAQ topics:**
- "Can you deliver assembled components?"
- "Do you offer kanban or JIT delivery?"
- "What ERP system do you use?"
- "What packaging options do you provide?"

**Schema**: FAQPage + BreadcrumbList

---

### 3.4 Case Studies — `/[locale]/cases/`

**Status**: 🔴 Not built (homepage has 3 placeholder cards)
**Purpose**: Proof points. The strongest E-E-A-T signal for a B2B manufacturer. The Cases page with industry filter tags replaces the need for a standalone Industries page or section.
**Primary keyword**: `zinc die casting case studies` / `die casting projects`
**Search intent**: Commercial / Informational

**Listing page sections:**
1. **Hero** — "Difficult problems, delivered."
2. **Industry filter tags** — Automotive · Furniture & Design · Lighting · Building & HVAC · Consumer Electronics · Industrial & Tools. Clicking a tag filters the grid. This replaces the old standalone Industries section.
3. **Case study grid** — cards with image, client name, project title, key metric, industry tag
4. **CTA** — "Have a similar challenge?"

**Individual case page template** (`/cases/[slug]`):

| Section | Content |
|---------|---------|
| Hero | Client name, project title, hero image of the finished component |
| The Challenge | What was difficult — complexity, tolerances, surface requirements, volume demands, why other foundries couldn't quote it |
| The Solution | What Linimatic did differently — process choices, tooling innovation, material selection, value chain integration |
| The Result | **Quantified outcomes** — yield rate, parts delivered, cost reduction, lead time improvement, years in production. This MUST contain real numbers. |
| Technical Specs | Material (alloy), part weight, key tolerances, surface finish, annual volume — structured data panel |
| Gallery | Process photos, finished parts, before/after (real photos, never stock) |
| Client Quote | Named testimonial if available |
| Services Used | Links to relevant service pages (internal linking for SEO) |
| CTA | "Discuss a similar project" |

**Launch cases (3):**
- **DeWalt** — tight-tolerance power tool internals, high-volume series
- **One Collection** — Finn Juhl dining table fittings, Class A chrome finish
- **VELUX** — precision motor frames, automated production

**Additional cases to request from Marc:**
- Bang & Olufsen — consumer electronics housing
- Fritz Hansen — furniture fittings
- An automotive Tier 1 / Tier 2 case
- A high-volume industrial case

**SEO metadata per case:**
```
Title: [Client] — [Short Challenge Description] | Linimatic Case Study
Description: How Linimatic solved [specific challenge] for [Client]. [Key result].
Schema: Article + BreadcrumbList
```

---

### 3.5 Why Zinc — `/[locale]/why-zinc/`

**Status**: 🔴 Not built
**Purpose**: Educational pillar page. The single biggest SEO opportunity on the site. Targets awareness-stage queries from engineers researching material options. Positions Linimatic as the authority on zinc die-casting.
**Primary keyword**: `why zinc die casting` / `zinc vs aluminum die casting` / `zinc die casting advantages`
**Search intent**: Informational

**Page sections:**

1. **Hero** — "Why zinc die-casting?" with a direct answer in the first 60 words (AI Overview target): "Zinc die-casting produces precision metal components with ±0.05mm tolerances, chrome-ready surface finish, and cycle times under 45 seconds — outperforming aluminum and plastic in complexity, precision, and cost at volume."

2. **Key advantages** — 6 benefit blocks:
   - **Precision**: ±0.05mm as-cast (tighter than aluminum or plastic)
   - **Tool life**: 1M+ shots per die (5–10× longer than aluminum dies)
   - **Speed**: 10–45 second cycles (fastest of all metal die-casting)
   - **Surface**: 0.8 Ra μm as-cast — chrome-ready without polishing
   - **Thin walls**: down to 0.6mm — impossible with most other metals
   - **Net shape**: minimal machining → lower total cost

3. **Material comparison table** — Zinc vs. Aluminum vs. Magnesium vs. Plastic injection molding:

   | Property | Zinc | Aluminum | Magnesium | Plastic |
   |----------|------|----------|-----------|---------|
   | Achievable tolerance | ±0.05mm | ±0.1mm | ±0.08mm | ±0.1mm |
   | Die life (shots) | 1M+ | 100–200K | 200–300K | 500K–1M |
   | Cycle time | 10–45s | 30–120s | 20–60s | 15–60s |
   | Min. wall thickness | 0.6mm | 1.5mm | 1.0mm | 0.5mm |
   | Surface finish (Ra) | 0.8 μm | 1.6 μm | 1.2 μm | 0.2 μm |
   | Tensile strength | 280–400 MPa | 150–300 MPa | 200–250 MPa | 30–80 MPa |
   | Recyclability | 100% | 100% | 100% | Limited |

4. **Zamak alloy guide** — Zamak 2, 3, 5, 7 with properties, composition, and use-case recommendations

5. **When to choose zinc** — Decision guide: ideal for complex geometry, tight tolerances, high surface quality requirements, high-volume production, components needing chrome or decorative finish

6. **Environmental benefits** — Zinc is infinitely recyclable, lower melting point = less energy, lead-free options (ties to Zinkers)

7. **FAQ section** — 5–8 questions targeting "People Also Ask":
   - "What is zinc die casting?"
   - "Is zinc stronger than aluminum?"
   - "What is Zamak alloy?"
   - "How much does zinc die casting cost?"
   - "What industries use zinc die casting?"
   - "Can zinc parts be chrome plated?"
   - "Is zinc die casting environmentally friendly?"
   - "What is the difference between zinc and zamak?"

8. **CTA** — "Still deciding? Talk to our engineers — we'll tell you honestly if zinc is right for your part."

**SEO metadata:**
```
Title: Why Zinc Die-Casting? Advantages, Alloys & Material Comparison | Linimatic
Description: Zinc die-casting offers ±0.05mm tolerances, 1M+ shot die life, and chrome-ready
             surfaces. Compare zinc vs aluminum vs plastic. Learn which Zamak alloy fits your project.
Schema: FAQPage + BreadcrumbList
```

---

### 3.6 About — `/[locale]/about/`

**Status**: 🔴 Not built
**Purpose**: E-E-A-T trust builder. The deciding factor for buyers choosing between shortlisted suppliers (per Søren). Must be a compelling narrative, not a corporate timeline.
**Primary keyword**: `Linimatic` / `zinc die casting company Denmark`
**Search intent**: Navigational / Informational

**Page sections:**

1. **Hero** — "Since 1967, Denmark's largest dedicated zinc die-casting foundry."

2. **Company narrative** — Written as a story, not bullet points. Answer WHY this company exists and what it refuses to compromise on. Not "we bought machine #7 in 2004" — the spine is "The best for the most complex."
   - Founded 1967 in Helsinge, North Zealand
   - Denmark's largest *dedicated* zinc die-casting foundry (emphasize "dedicated" — not a general foundry that also does zinc)
   - What "the best for the most complex" means in practice — projects other foundries turn away
   - Full value chain under one roof — born from necessity, now a competitive advantage

3. **Facility showcase** — Real factory photos (never stock):
   - 12 hot-chamber die-casting machines (80–400T)
   - CNC machining center
   - Surface treatment lines
   - Quality lab with CMM
   - Floor area, capacity, 24h operation

4. **Team** — Key contacts with name, role, photo, direct phone, direct email. Expand beyond the 3 on the homepage. Include leadership and department heads.

5. **Certifications & Standards:**
   - ISO 9001 (since 1993 — 30+ years of certified quality)
   - Environmental compliance and programs
   - Material certifications
   - Automotive standards (IATF 16949 if held)

6. **Sustainability** — Specific and measurable, not vague "we care":
   - Zinc recycling rate (what % of scrap is recycled?)
   - Energy sources and reduction programs
   - Lead-free initiatives (connects to Zinkers)
   - Waste reduction metrics
   - This section satisfies procurement sustainability checkboxes (a real requirement for European B2B in 2026).

7. **Industries served** — Brief summary with links to relevant case studies. This is where the industry information lives (moved from homepage):
   - Furniture & Design (Fritz Hansen, One Collection, Montana, HOWE)
   - Lighting (Frandsen, Belux)
   - Building & HVAC (VELUX, ClimaWin)
   - Consumer Electronics (Bang & Olufsen)
   - Automotive (European Tier 1 & 2)
   - Industrial & Tools (DeWalt, Ditlev Burke)

8. **"We're hiring" section** (replaces standalone Jobs page) — If there are open positions, list them here with a mailto/form. If not, a standing "Interested in joining us? Send us your CV" prompt.

9. **CTA** — "Visit us in Helsinge" / "Get in touch"

**SEO metadata:**
```
Title: About Linimatic — Denmark's Zinc Die-Casting Experts Since 1967
Description: Founded in 1967, Linimatic A/S is Denmark's largest dedicated zinc die-casting
             foundry. 50+ specialists, ISO 9001 certified, full value chain under one roof in Helsinge.
Schema: Organization + BreadcrumbList
```

---

### 3.7 Contact — `/[locale]/contact/`

**Status**: 🔴 Not built
**Purpose**: Conversion page. Zero friction. Every contact method visible without scrolling.
**Primary keyword**: `contact zinc die casting` / `zinc die casting quote`
**Search intent**: Transactional

**Page sections:**

1. **Hero** — "Let's discuss your project." + "Response within 24 hours."

2. **Contact form** (Server Action or API route):
   - Name, Company, Email, Phone
   - Subject: New Project / Existing Project / General Inquiry
   - Project description (textarea)
   - Expected volume: Prototype (<1,000) / Low (1,000–100,000) / High (100,000+)
   - **File upload for technical drawings** — accepted formats clearly stated: STEP, IGES, Solidworks (.sldprt/.sldasm), Parasolid (.x_t), PDF. Max file size stated.
   - Clear validation, error states, success confirmation with expected response time

3. **Direct contacts** — 3 key people (Jan, Torben, René) with:
   - Photo, name, role, area of focus
   - Direct phone and direct email
   - "Who to contact for what" guidance (strategy & key accounts / DFM & engineering / new projects & support)

4. **Company details** — Full address, CVR number, main phone, general email

5. **Map** — Helsinge location, proximity to Copenhagen (~60 km), directions

**SEO metadata:**
```
Title: Contact Linimatic — Get a Zinc Die-Casting Quote
Description: Send us your drawings for a free zinc die-casting quote. Response within 24 hours.
             Call +45 4876 4040 or visit us in Helsinge, Denmark.
Schema: LocalBusiness + BreadcrumbList
```

---

### 3.8 Zinkers — `/[locale]/zinkers/`

**Status**: 🔴 Not built
**Purpose**: Consumer product line showcase. Different audience (anglers/retailers), different tone (more conversational), different buying journey. Accessible via footer link only — NOT in main nav.
**Primary keyword**: `lead free fishing sinkers` / `zinc fishing weights` / `blyfri fiskevægte`
**Search intent**: Commercial / Transactional

**Page sections:**
1. **Hero** — "Zinkers: lead-free fishing sinkers. Same density, zero toxicity."
2. **Why lead-free** — environmental impact of lead in waterways, regulatory trends, zinc as safe alternative
3. **Product range** — weights, shapes, applications (freshwater, sea, ice fishing)
4. **Where to buy** — dealer/retailer list or online shop link
5. **Technical specs** — material (zinc alloy), weight options, corrosion resistance
6. **FAQ** — "Are zinc sinkers as heavy as lead?", "Are lead sinkers banned in Denmark?", "How long do zinc sinkers last?"

**SEO metadata:**
```
Title: Zinkers — Lead-Free Zinc Fishing Sinkers | Linimatic
Description: Lead-free fishing sinkers made from pure zinc. Same density, zero toxicity.
             Better for fish, water, and you. Precision die-cast in Denmark.
Schema: Product + FAQPage + BreadcrumbList
```

**Design note**: This page can feel visually distinct (lighter, more consumer-friendly) while staying within the brand framework. It should NOT feel like the same B2B pitch as the rest of the site.

---

### 3.9 Legal Pages

- **Privacy** — `/[locale]/privacy/` ✅ exists
- **Cookies** — `/[locale]/cookies/` ✅ exists

Ensure both are available in all 3 languages and linked from the footer.

---

## 4. Buying Journey Mapping

### Awareness — "I have a need but don't know the solution yet"

| Page | Target Queries | Persona |
|------|---------------|---------|
| Why Zinc | "what is zinc die casting", "zinc vs aluminum", "benefits of die casting", "zamak alloy properties" | Anna |
| Service page FAQs | "how fast can I get a prototype", "what tolerances can die casting achieve", "what is DFM" | Anna |
| Future articles | "how to design for die casting", "surface finishing options for metal parts" | Anna |

### Consideration — "I'm evaluating suppliers and approaches"

| Page | Target Queries | Persona |
|------|---------------|---------|
| Services hub | "zinc die casting services", "full service die casting foundry" | Henrik |
| Service detail pages | "hot chamber die casting", "die casting surface treatment", "DFM die casting" | Anna, Henrik |
| Cases | "zinc die casting case study [industry]", "complex die casting projects" | Henrik, Søren |
| About | "Linimatic", "zinc die casting company Denmark" | Søren |

### Decision — "I'm ready to engage a supplier"

| Page | Target Queries | Persona |
|------|---------------|---------|
| Contact | "zinc die casting quote", "die casting manufacturer Denmark", "zinc foundry Europe" | Henrik |
| Homepage | "Linimatic A/S" (branded search) | All |

---

## 5. Topic Cluster Strategy

### Cluster 1: Zinc Die-Casting (Educational)
- **Pillar**: Why Zinc (`/why-zinc/`)
- **Cluster pages**: Die Casting service page, Prototyping service page (DFM content), future articles on alloys and material comparison
- **Internal links**: Why Zinc → Die Casting + Prototyping service pages; service pages → Why Zinc for material background

### Cluster 2: Full Value Chain (Commercial)
- **Pillar**: Services hub (`/services/`)
- **Cluster pages**: All 6 service detail pages
- **Internal links**: Every service page → Services hub; each service page → 2–3 related services; every service page → relevant case studies

### Cluster 3: Proven Expertise (Trust)
- **Pillar**: Cases (`/cases/`)
- **Cluster pages**: Individual case studies, About page (for company credibility context)
- **Internal links**: Case studies → services used; service pages → relevant cases; About → case studies as evidence

---

## 6. Internal Linking Strategy

### Navigation

**Header** (5 items + services dropdown):
- Services → `/services/` (dropdown: 6 sub-services + "All Services" link)
- Cases → `/cases/`
- Why Zinc → `/why-zinc/`
- About → `/about/`
- Contact → `/contact/`
- Plus: Language switcher (DA / EN / DE), phone number, "Get a Quote" CTA button

**Footer** (3 columns + brand):
- Brand column: Logo, 1–2 sentence description, LinkedIn
- Services: Prototyping, Die Casting, Post-Processing, Surface Treatment, Quality, Assembly
- Company: About Us, Cases, Why Zinc, Zinkers
- Contact: Address, phone, email

**Sub-footer**: Copyright, Privacy, Cookies

### Contextual links (within page content)

- Homepage hero CTAs → `/contact/` (primary) + `/services/` (secondary)
- Every service page → 1–2 relevant case studies
- Every service page → 2–3 related service pages
- Every case study → services used + contact CTA
- Why Zinc → Die Casting and Prototyping service pages
- About → case studies (as evidence of claims)
- All pages → Contact CTA section at bottom

### Breadcrumbs (every inner page)

```
Home > Services > Surface Treatment
Home > Cases > VELUX Motor Frames
Home > Why Zinc
Home > About
```

Implement as `BreadcrumbList` schema + visible breadcrumb navigation component.

---

## 7. Structured Data Plan

| Page | Schema Types |
|------|-------------|
| Homepage | `Organization` + `LocalBusiness` ✅ exists |
| All inner pages | `BreadcrumbList` |
| Services hub | `BreadcrumbList` |
| Service detail pages | `BreadcrumbList` + `FAQPage` |
| Prototyping | `BreadcrumbList` + `FAQPage` + `HowTo` |
| Case studies | `BreadcrumbList` + `Article` |
| Why Zinc | `BreadcrumbList` + `FAQPage` |
| About | `BreadcrumbList` + `Organization` |
| Contact | `BreadcrumbList` + `LocalBusiness` |
| Zinkers | `BreadcrumbList` + `Product` + `FAQPage` |

Future additions (when pages are built):
- News articles: `Article` with author, dates, publisher
- Job listings: `JobPosting` per position

---

## 8. Build Phases

### Phase 1 — Core Pages (launch-blocking)

| # | Page | Why first |
|---|------|-----------|
| 1 | **Homepage revision** | Remove Industries section + Why Zinc teaser. Add industry tags line. Fill placeholder testimonial + case results. |
| 2 | **`/services/`** | Services hub with capability matrix — visitors clicking "Services" in nav must land somewhere. |
| 3 | **`/contact/`** | Every CTA on the site points here. Needs form with file upload. |
| 4 | **`/about/`** | Trust builder. Søren goes here to decide if he trusts Linimatic. Includes team, facility, sustainability, industries served, and "We're hiring" section. |
| 5 | **`/why-zinc/`** | Biggest SEO opportunity. Educational pillar capturing awareness-stage traffic. |
| 6 | **`/cases/`** | Listing page + 3 case study pages (DeWalt, One Collection, VELUX). Needs real metrics. |

### Phase 2 — Service Detail Pages

All 6 use the same template. Priority order is based on search volume, differentiation, and buyer impact:

| # | Page | Why this order |
|---|------|---------------|
| 7 | **`/services/die-casting`** | Core technical credibility page. Highest search volume. Anna judges Linimatic by this page. |
| 8 | **`/services/prototyping`** | Decision-stage page. Prospects often start here ("can I get samples?"). |
| 9 | **`/services/surface-treatment`** | Strong differentiator. Many foundries outsource this — Linimatic doing it in-house is a competitive advantage. |
| 10 | **`/services/quality`** | Trust signal. Must be substantial (CMM specs, SPC detail, PPAP capability). A thin quality page kills credibility. |
| 11 | **`/services/post-processing`** | Completes the "everything in-house" story. |
| 12 | **`/services/assembly`** | Completes the value chain. Includes procurement-relevant details (ERP, EDI, kanban). |

### Phase 3 — Growth Content

| # | Item | When |
|---|------|------|
| 13 | **`/zinkers/`** | When product details, pricing, and dealer list are available. |
| 14 | **Downloadable capability PDF** | Soon after launch. Procurement professionals need a document to circulate internally. |
| 15 | **Additional case studies** | Ongoing — add as client approvals come in. Target: 2+ per industry for filter credibility. |
| 16 | **`/news/` + initial articles** | When a monthly publishing cadence is committed. Launch with 3+ articles, not fewer. Suggested first articles: "What is zinc die-casting?", "Zinc vs aluminum comparison", "Zamak alloy selection guide". |
| 17 | **Standalone `/jobs/` page** | When there are 3+ open positions. Until then, "We're hiring" section on About is sufficient. |
| 18 | **Industry landing pages** | When there are 2+ case studies per industry. Until then, the Cases page industry filters serve this need. |

### Phase 4 — SEO Infrastructure

| # | Task | Notes |
|---|------|-------|
| 19 | `app/sitemap.ts` | Auto-generated sitemap with multilingual `alternates.languages` for all pages |
| 20 | `app/robots.ts` | Disallow `/api/`, point to sitemap |
| 21 | Dynamic OG images | Per-page OG image generation via `next/og` ImageResponse |
| 22 | `BreadcrumbList` component | Shared Server Component for all inner pages — both visual breadcrumbs and JSON-LD schema |
| 23 | hreflang validation | Ensure all hreflang links are bidirectional, all have `x-default`, test with Screaming Frog or GSC |
| 24 | Google Search Console | Property per locale, international targeting configured, monitor hreflang errors |
| 25 | Google Business Profile | Claim and optimize for Helsinge: accurate NAP, facility photos, business categories, regular posts |

---

## 9. Content Requirements from Marc

### Must-have for launch

These items block launch or significantly degrade the homepage:

- [ ] **Customer testimonial** — Real quote from an engineering director or procurement manager at a named client (e.g., Fritz Hansen, VELUX, B&O). About Linimatic's ability to handle complex geometry, reliability, or the full value chain. A named quote from a named person at a named company is the single most powerful trust element on the entire homepage.
- [ ] **Case study results** — Specific, quantified metrics for DeWalt, One Collection, and VELUX. Examples: "99.2% first-pass yield", "continuous supply since 2003", "2.4 million parts delivered". These numbers go into procurement supplier scorecards — vague descriptions are not sufficient.
- [ ] **Missing client logos** — Fritz Hansen, VELUX, Montana, Frandsen (vector/high-res PNG)
- [ ] **Facility photos** — Real photos of factory floor, casting machines, CNC center, quality lab, team at work. Stock photography or renders would immediately erode trust for decision makers evaluating credibility.
- [ ] **Company narrative** — The founding story in Marc's words. Not a timeline — a story. Why does this company exist? What does it refuse to compromise on? What kind of partner does it want to be?

### High-value for Phase 2

- [ ] **Additional case studies** — B&O, Fritz Hansen, an automotive client, a high-volume industrial case. Target: enough to have 2+ per industry filter category.
- [ ] **Expanded team bios** — Beyond Jan, Torben, René. Include department heads and key specialists.
- [ ] **Quality equipment details** — CMM brand/model, measurement capabilities. SPC system description. Sample PPAP documentation (redacted if needed). Anna judges the whole company by the Quality page depth.
- [ ] **Sustainability data** — Zinc recycling rate, energy sources, waste reduction metrics. Specific numbers, not vague claims. This is a procurement checkbox in 2026.
- [ ] **Zamak alloy data** — Linimatic-specific alloy recommendations per application. Confirm the mechanical properties table values.
- [ ] **Process photos** — Step-by-step images for each stage of the value chain (casting, machining, coating, inspection, assembly). These go on service detail pages.
- [ ] **Zinkers product details** — Weights, shapes, specifications, pricing, dealer/retailer list.
