# Supporting Pages — Content Requirements

Content requirements for About, Contact, Why Zinc, News/Blog, Jobs, and Zinkers.

---

## About Page

### Page Goal
Build trust through history, people, facility, and certifications. Often the deciding factor for buyers choosing between shortlisted suppliers.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Company story | Required | Founding narrative (1967), growth, current position, vision. 2-3 paragraphs. |
| Key facts | Required | Founded year, employee count, machine count, facility size, annual production |
| History milestones | Recommended | 6-10 key dates with milestone descriptions (timeline format) |
| Facility showcase | Recommended | Factory photos showing modern equipment, clean production floor, scale |
| Certifications | Required | ISO 9001, IATF 16949 (if held), any other quality certifications with years obtained |
| Team/leadership | Optional | Key people with name, title, and photo. 4-8 people max. |
| Values/approach | Recommended | 3-4 concrete values tied to customer benefit |
| Location | Recommended | Helsinge, Denmark — proximity to Copenhagen, accessibility for European visitors |

### SEO: Organization schema, "about linimatic" keywords

---

## Contact Page

### Page Goal
Convert inquiries with zero friction. Make every contact method immediately visible.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Contact methods | Required | Phone, email, address — all visible without scrolling |
| Quote request form | Required | Fields: Name, Company, Email, Phone, Project description, Expected volume, File upload (for drawings/CAD) |
| Response promise | Required | "We respond within 24 hours" or similar commitment |
| Business hours | Required | Operating hours with timezone |
| Map/location | Recommended | Helsinge location, directions from Copenhagen |
| Department contacts | Optional | Sales, technical, general — if different contact points exist |

### Form Design Requirements
- File upload for technical drawings (PDF, STEP, IGES)
- Volume range selector (prototype < 1,000 / low 1,000-100,000 / high 100,000+)
- Clear validation and error messages
- Success state confirming submission and expected response time
- Server-side submission (Server Action or API route)

### SEO: ContactPage + LocalBusiness schema

---

## Why Zinc Page

### Page Goal
Educational resource targeting awareness-stage searches. Position Linimatic as a thought leader. Capture traffic from engineers researching die-casting material options.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Zinc advantages | Required | Key benefits: tolerances, die life, cycle time, surface finish, cost at volume, thin walls, complex geometry |
| Material comparison | Required | Zinc vs. aluminum vs. plastic — data-driven comparison across key properties |
| Zamak alloy guide | Required | Properties of Zamak 2, 3, and 5: composition, tensile strength, elongation, hardness, applications |
| Application examples | Recommended | Industries and component types suited to zinc die-casting |
| FAQ | Recommended | 6-10 common questions about zinc die-casting (for FAQPage schema) |
| Design guidelines | Optional | Wall thickness, draft angles, tolerances achievable — DFM guidance |

### Data Points for Comparison Table
- Achievable tolerances
- Die/mold life (shots)
- Typical cycle time
- Tensile strength range
- Elongation at break
- Surface finish (Ra)
- Minimum wall thickness
- Relative cost per part at high volume
- Recyclability

### SEO: FAQPage + Article schema, targeting "zinc die-casting advantages", "zamak properties"

---

## News / Blog

### Page Goal
Fresh content for SEO. Demonstrate ongoing activity. Thought leadership.

### Required Content Elements

**Listing page:**
| Element | Priority |
|---------|----------|
| Post collection with date, title, excerpt | Required |
| Category/tag filtering | Recommended |
| Featured/pinned post | Optional |
| Pagination | Required (if >10 posts) |

**Individual post:**
| Element | Priority |
|---------|----------|
| Title, date, author | Required |
| Body content (markdown/rich text) | Required |
| Featured image | Recommended |
| Related posts | Recommended |
| Social sharing | Optional |

### Content Categories
- Company news (new equipment, certifications, milestones)
- Technical articles (process insights, material knowledge)
- Industry insights (market trends, regulation changes)
- Event recaps (trade shows, factory tours)

### SEO: Blog + BlogPosting schema, rel="next"/rel="prev" for pagination

---

## Jobs Page

### Page Goal
Attract skilled manufacturing talent to Helsinge.

### Required Content Elements

**Listing page:**
| Element | Priority |
|---------|----------|
| Open positions list | Required |
| Why work at Linimatic (benefits, culture) | Recommended |
| Facility/team photos | Recommended |
| Open application option | Optional |

**Individual job posting:**
| Element | Priority |
|---------|----------|
| Job title and department | Required |
| Full description and responsibilities | Required |
| Requirements / qualifications | Required |
| Employment type (full-time, part-time) | Required |
| Location (Helsinge) | Required |
| Application method (form or email) | Required |
| Benefits | Recommended |
| Salary range | Optional (if policy allows) |

### SEO: JobPosting schema per position

---

## Zinkers (Lead-Free Fishing Sinkers)

### Page Goal
Showcase product line. This is the most B2C section of the site — tone is more accessible.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Product line overview | Required | What Zinkers are, why lead-free matters |
| Environmental story | Required | Impact of lead in waterways, zinc as safe alternative |
| Product range | Required | Available weights, styles, specifications per product |
| Material quality | Recommended | Precision die-cast, consistent weight, Danish-made |
| Where to buy | Required | Retailer list and/or direct order mechanism |
| Product images | Required | Individual product photos with weight/size info |

### Unique Tone
This section targets consumers and fishing retailers, not B2B manufacturing buyers. The tone should be more conversational and benefit-focused while maintaining Linimatic's quality credibility.

### SEO: Product schema per sinker type, "lead-free fishing sinkers" keywords
