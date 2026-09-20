# Aesthetica Dental Clinic — Permanent SEO Architecture Playbook

**Domain**: `https://aestheticadental.github.io/`  
**Clinic**: Aesthetica Dental Clinic, Punawale, Pune  
**Scope**: Technical SEO, Information Architecture, Content Guidelines, and Scalability Playbook  
**Version**: 2.0 (Post-Consolidation Architecture)  

---

## 1. URL Conventions & Standards

1. **Format**: All URLs must be entirely lowercase, using ASCII characters only.
2. **Word Separation**: Use single hyphens (`-`) to separate words. Never use underscores (`_`), camelCase, or spaces.
3. **Trailing Slashes**:
   - The root domain uses a trailing slash: `https://aestheticadental.github.io/`
   - Subdirectories use trailing slashes: `https://aestheticadental.github.io/blog/`
   - Static HTML files use exact `.html` extensions without trailing slashes: e.g., `/clear-aligners-punawale.html`.
4. **Clean Semantic Slugs**: Slugs must be descriptive, concise, and evergreen. Avoid dates in procedure URLs (e.g., use `/cost-of-root-canal-in-punawale.html`, not `/cost-of-root-canal-2026.html`).
5. **No Parameter Indexation**: Tracking query parameters (`?utm_source=`, `?fbclid=`, `?ref=`) must never be indexed. Self-referencing canonical tags must always strip query strings.

---

## 2. Page Hierarchy & Scalability Model

The repository adheres to a **Hub-and-Spoke Information Architecture** designed to scale from 40 to 100+ pages without navigation clutter:

```
HOME (index.html)
│
├── 1. DENTAL SERVICES (services.html)
│   ├── Clinical Procedure Pillars (9 Core Services)
│   └── Specialized Restorative & Cosmetic Guides
│
├── 2. INTERNATIONAL PATIENTS (dental-tourism-pune.html)
│   ├── Travel Logistics & Stay Duration Guides
│   ├── Procedure Packages & Cost Comparisons
│   └── NRI Dental Care Programs
│
├── 3. PATIENT RESOURCES
│   ├── Treatment Costs & Price List (dental-treatment-costs-punawale.html)
│   ├── Clinical FAQs (blog/dental-clinic-faq.html)
│   └── Diagnostic & Technology Guides (dental-x-ray-near-me.html)
│
├── 4. AREAS WE SERVE (service-areas.html)
│   ├── Hinjawadi Phase 1 IT Park (dentist-near-hinjawadi.html)
│   ├── Wakad & Bhumkar Chowk (dentist-near-wakad.html)
│   └── Tathawade & JSPM Campus (dentist-near-tathawade.html)
│
├── 5. DENTAL HEALTH BLOG (blog/index.html)
│   ├── Symptom Guides (Tooth Pain at Night, Signs of Pulp Infection)
│   ├── Procedure Deep Dives (Modern Rotary RCT, Wisdom Tooth Impaction)
│   └── Honest Patient Q&As (Implants Longevity, Whitening Science)
│
└── 6. CLINIC AUTHORITY & TRUST
    ├── About Clinic (about-us.html)
    ├── Chief Clinician Profile (about-dr-prachi-gupta-garg.html)
    ├── Contact & Location (contact-us.html)
    └── Legal / Privacy (privacy-policy.html)
```

---

## 3. Breadcrumb Rules & Taxonomy

1. **Mandatory Visibility**: Every non-homepage inner page must display clean, accessible breadcrumb links above the main page `<h1>` or hero section.
2. **Predictable Taxonomy**:
   - Clinical Services: `Home > Dental Services > [Procedure Name]`
   - International Cluster: `Home > International Patients > [Guide Title]`
   - Patient Resources: `Home > Patient Resources > [Resource Name]`
   - Location Pages: `Home > Areas We Serve > [Location Name]`
   - Blog Posts: `Home > Blog > [Article Title]`
   - About Pages: `Home > About > [Doctor / Clinic]`
3. **Hyperlinked Intermediate Hubs**: Every level in the breadcrumb trail must link to a live, indexable hub page.
4. **Current Page Self-Link Rule**: The final breadcrumb item (current page) must be plain text or `aria-current="page"`, not a redundant clickable link to itself.
5. **Structured Data Requirement**: Every visible breadcrumb must be accompanied by valid Schema.org `BreadcrumbList` JSON-LD.

---

## 4. Internal Linking Strategy & Equity Distribution

1. **Contextual Relevance Over Arbitrary Volume**: Internal links must assist real prospective patients. We do not insert links merely to inflate link count metrics.
2. **Contextual Link Density**: Target **3 to 8 highly relevant links** per content page:
   - Primary parent hub (always linked).
   - 1–2 related clinical procedures.
   - 1 transparent pricing / cost guide.
   - 1 supporting symptom or recovery article.
   - 1 direct consultation CTA (WhatsApp or Phone).
3. **Anchor Text Naturalness**:
   - Vary anchor text naturally (e.g., "painless single-sitting root canal", "root canal treatment in Punawale", "conservative endodontic therapy").
   - Strictly prohibit generic anchors ("click here", "read more", "learn more").
   - Prohibit identical exact-match repetition across dozens of pages.

---

## 5. Header Navigation Rules

1. **Restraint & Scannability**: Top-level navigation items are capped at 7 essential hubs:
   - Services (`/services.html`)
   - International Patients (`/dental-tourism-pune.html`)
   - Patient Resources (`/dental-treatment-costs-punawale.html`)
   - Areas We Serve (`/service-areas.html`)
   - About Us (`/about-us.html`)
   - Blog (`/blog/index.html`)
   - Contact Us (`/contact-us.html`)
2. **True HTML Anchor Tags**: All navigation items must render as `<a href="...">` links. No JavaScript-dependent click handlers or routing abstractions.
3. **No In-Page Anchor Links in Shared Headers**: Header links on inner pages must never link to homepage fragment IDs (e.g., avoid `href="#services"` on a blog page). Use full canonical pathing.
4. **Accessible Mobile Toggle**: The mobile hamburger menu must utilize proper ARIA states (`aria-expanded`, `aria-label="Toggle navigation menu"`).

---

## 6. Footer Navigation Architecture

1. **Anti-Spam Principle**: The footer is a secondary directory for users, not a dumping ground for 50+ exact-match keywords.
2. **Logical 5-Column Grid**:
   - **Dental Services**: Root Canal, Implants, Aligners, Whitening, Veneers, Pediatric, Cleaning, Restorative, Emergency Care.
   - **International Patients**: Dental Tourism Pune, Treatment in India, Stay Duration, NRI Care, Pune vs Mumbai.
   - **Patient Resources**: Treatment Costs, Dental FAQs, Dental Crown Guide, Teeth Cleaning Costs, Digital X-Rays, HTML Sitemap.
   - **Areas We Serve**: Punawale, Hinjawadi Phase 1, Wakad & Bhumkar Chowk, Tathawade & JSPM.
   - **Clinic & Hours**: Shop 103 Swaraaj Heights address, Open 7 Days (10:15 AM – 8:30 PM), Call, WhatsApp, Privacy Policy.

---

## 7. Blog Linking & Content Silos

1. **Never Orphan a Blog**: Every published blog post must be linked from `blog/index.html` and cross-referenced from its primary service pillar.
2. **Mandatory Upward Link**: Every blog must include at least one prominent contextual link to its corresponding clinical pillar within the first 300 words.
3. **Commercial Handoff**: Educational symptom posts (e.g., "Tooth Pain at Night") must provide a clear conversion path to emergency care or root canal consultation.

---

## 8. XML Sitemap Architecture

1. **Strict Inclusion Criteria**: `sitemap.xml` must contain ONLY 200 OK, preferred canonical, indexable URLs.
2. **Zero-Tolerance Exclusions**:
   - 0 redirecting URLs.
   - 0 deprecated URLs.
   - 0 dead (404) URLs.
   - 0 component snippets (`/components/*`).
   - 0 non-canonical or duplicate URLs.
3. **Deterministic Timestamps**: `<lastmod>` must represent genuine content updates (YYYY-MM-DD), not arbitrary build timestamps.

---

## 9. Robots.txt Architecture

1. **Universal Crawlability**: Allow search engines full access to CSS, JS, and image assets required to render pages accurately.
2. **Disallow Rules**: Disallow only non-public scratch/test directories. Do NOT block `/components/` if client-side fetches rely on it during Googlebot rendering.
3. **Sitemap Directive**: Clearly declare the canonical sitemap index at the bottom:
   `Sitemap: https://aestheticadental.github.io/sitemap.xml`

---

## 10. Canonical Tag Rules

1. **Self-Referencing Canonicals**: Every canonical, indexable page must contain an absolute HTTPS self-referencing canonical URL.
2. **No Trailing Slash Ambiguity**: Match the exact file path convention (`.html`).
3. **Consolidated Duplicate Handling**: Deprecated or duplicate files must have their canonical tag pointed directly to the surviving primary URL.

---

## 11. Structured Data & Schema Standards

1. **Central Schema Hierarchy**:
   - Homepage: `Dentist`, `MedicalClinic`, `LocalBusiness`, `FAQPage`.
   - Doctor Profile: `Person`, `Physician`, `Dentist`.
   - Clinical Service Pages: `MedicalProcedure`, `Service`, `FAQPage`.
   - Blog Posts: `MedicalWebPage`, `BlogPosting` or `Article`.
   - All Inner Pages: `BreadcrumbList`.
2. **Google Compliance**: Structured data must match visible on-page content. Never mark up hidden text, invented review stars, or unsupported claims.

---

## 12. Local Proximity & Location Page Standards

1. **Anti-Doorway Quality Gate**: Never generate location pages by swapping town names on templated text.
2. **Mandatory Unique Local Value**:
   - Accurate travel times from major local landmarks (e.g., "8 mins from Infosys Phase 1 Circle via Hinjawadi-Marunji link road").
   - Transit directions, highway junctions (Bhumkar Chowk, Dange Chowk), and parking availability.
   - Genuine alignment with clinic catchment area.

---

## 13. International Dental Tourism Standards

1. **No Artificial Country Doorways**: Do not create generic country pages (e.g., `/dentist-for-usa-patients.html`) without unique localized value (such as currency comparisons, specific flight corridors, or international insurance guidelines).
2. **Focus on Practical Logistics**: Answer real patient inquiries: duration of stay, airport transfers from Mumbai (BOM) or Pune (PNQ), sterilization certifications, and pre-travel digital record assessments.

---

## 14. Clinical Content Quality & Healthcare Trust (E-E-A-T)

1. **Zero Unsubstantiated Superlatives**: Avoid prohibited medical marketing terms: "100% painless", "best dentist", "guaranteed success", "cheapest".
2. **Realistic Clinical Context**: Acknowledge realistic treatment timelines, healing phases, bone integration periods for implants, and oral hygiene responsibilities.
3. **Lead Clinician Authority**: Clearly cite Dr. Prachi Gupta Garg (BDS, Certified Cosmetologist, Dental Council of India registration) on all clinical materials.

---

## 15. Image SEO Standards

1. **Descriptive Filenames**: Use lowercase, hyphen-separated image filenames (e.g., `modern-rotary-endodontics-punawale.webp`).
2. **Contextual Alt Attributes**: Alt text must describe the image accurately for screen readers and search engines without stuffing keywords.
3. **Explicit Dimensions & WebP**: Always define `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS). Compress all photographic assets into WebP format under 150 KB.

---

## 16. Web Performance & Core Web Vitals (CWV)

1. **LCP Optimization**: Preload above-the-fold brand logos and critical hero assets. Compress hero portraits (`dr-prachi.webp`).
2. **CLS Elimination**: Reserve space for dynamic elements and asynchronous scripts.
3. **INP Responsiveness**: Ensure mobile menus and FAQ accordions respond instantaneously (<50ms) to touch/click interactions.

---

## 17. Protocol for Adding a New Service Page

Before creating a new service URL, complete the following mandatory checks:
1. **Search Intent Verification**: Confirm the service represents a distinct clinical search intent not already satisfied by an existing page.
2. **Cannibalization Check**: Verify against `CONTENT_CONSOLIDATION_PLAN.md` and `SEO_URL_INVENTORY.md`.
3. **Parent Hub Assignment**: Link the page from `services.html`.
4. **Breadcrumb Configuration**: Implement `Home > Dental Services > [New Service Name]` with `BreadcrumbList` schema.
5. **Contextual Cross-Linking**: Add 3–5 contextual links to related services and pricing.
6. **Sitemap Inclusion**: Add the URL to `sitemap.xml` and `sitemap.html`.
7. **Validation**: Run `npm run seo:audit` to verify zero errors.

---

## 18. Protocol for Publishing a New Blog Post

1. **Intent Formulation**: Base the article on a verified patient symptom, question, or comparison.
2. **Service Pillar Mapping**: Identify the primary clinical pillar it supports.
3. **Upward Linking**: Include a contextual link to the service pillar within the opening paragraphs.
4. **Author Credentialing**: Tag author as Dr. Prachi Gupta Garg with proper medical schema.
5. **Directory Placement**: Save inside `/blog/` with clean lowercase slug.
6. **Index & Sitemap**: Link from `blog/index.html` and add to `sitemap.xml`.

---

## 19. Protocol for Changing an Existing URL

1. **Avoid Unnecessary URL Changes**: Never change a stable, indexed URL for cosmetic reasons alone.
2. **GitHub Pages Redirect Setup**:
   - Retain the old file.
   - Add `<link rel="canonical" href="NEW_URL">`.
   - Add `<meta http-equiv="refresh" content="0; url=NEW_URL">`.
   - Add fallback script `window.location.replace("NEW_URL")`.
3. **Update Internal Links**: Update all internal links across the repository to point to the new URL.
4. **Sitemap Update**: Replace the old URL in `sitemap.xml` with the new canonical URL.
5. **Document Change**: Record the change in `SEO_REDIRECT_PLAN.md`.

---

## 20. Automated SEO Guardrail Commands

To maintain code hygiene and prevent regression:

```bash
# Run complete technical SEO audit & guardrail verification
npm run seo:audit

# Validate link graph and broken internal links
node scripts/check-links.js

# Validate sitemap integrity
node scripts/validate-sitemap.js
```
