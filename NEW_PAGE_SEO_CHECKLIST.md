# Aesthetica Dental Clinic — New Page SEO Quality Gate Checklist

**Purpose**: This checklist serves as the mandatory pre-publication architectural gatekeeper for any new service page, patient resource, location guide, or blog article.  
**Rule**: No page may be merged into the repository or deployed to production unless all 15 core architectural questions and technical quality checks are verified and approved.

> [!CAUTION]
> **STRICT REJECTION CRITERIA**: A page **MUST FAIL** this checklist and be rejected if it is merely *another keyword variation of an existing page* or a templated *doorway page* (e.g. `best-dentist-*`, `dentist-in-[neighborhood]`, `cheap-dentist-*`).

---

## 15 Mandatory Pre-Publication Architectural Questions

Before writing a single line of HTML or staging content, answer and record the following 15 questions:

- [ ] **1. What user/search intent does this page satisfy?**  
  *Define specifically: Informational, Commercial Investigation, Local Transactional, or Urgent Care. Vague queries (e.g., "dental ranking") are rejected.*
- [ ] **2. Does an existing page already satisfy that intent?**  
  *Cross-reference `SEO_URL_INVENTORY.md` and `SEO_SEARCH_INTENT_MAP.md`. If an existing URL addresses this query, update that page instead of creating a competing page.*
- [ ] **3. If an existing page touches this topic, why isn't the existing page sufficient?**  
  *Document the exact gap. Merely wanting a different keyword in the URL is NOT an acceptable rationale.*
- [ ] **4. What unique information will this page provide?**  
  *Identify clinic-specific photos, unique doctor explanations, proprietary procedures, or distinct local travel/neighborhood guidance.*
- [ ] **5. Which architecture pillar does it belong to?**  
  *Must fit cleanly into one of the 5 established pillars:*
  1. *Dental Services Pillar*
  2. *International Patients & Dental Tourism Pillar*
  3. *Patient Resources & Pricing Pillar*
  4. *Areas We Serve (Location) Pillar*
  5. *Clinic Authority / Blog Pillar*
- [ ] **6. Which canonical URL should exist?**  
  *Must follow established URL conventions (e.g., root-level for core pillars, `/blog/[slug].html` for articles). Exact lowercase, hyphenated.*
- [ ] **7. Which existing pages should link to it?**  
  *List at least 2–4 existing pages that will provide natural contextual discovery paths (including its parent hub).*
- [ ] **8. Which pages should it link to?**  
  *List downstream pages: consultation booking, parent pillar, related treatments, and transparent pricing.*
- [ ] **9. Does it risk keyword cannibalization?**  
  *Confirm that this page will not compete with existing target rankings for primary keywords.*
- [ ] **10. Is it a doorway/localization page?**  
  *If this is a location page, does it provide genuine neighborhood value (parking, metro/bus transit, landmarks, localized emergency care), or is it just swapped neighborhood text? Swapped text is strictly prohibited.*
- [ ] **11. Is it indexable?**  
  *Confirm `<meta name="robots" content="index, follow">`. If it is a utility, staging, or legal page, assign `<meta name="robots" content="noindex, follow">`.*
- [ ] **12. Should it be in `sitemap.xml`?**  
  *Only canonical, indexable, high-value pages belong in `sitemap.xml`.*
- [ ] **13. Does it require `BreadcrumbList`?**  
  *Child pages require visible breadcrumbs AND matching Schema.org `BreadcrumbList` with at least 2 sequential `ListItem` positions.*
- [ ] **14. Does it require `Article` or other structured data?**  
  *Select relevant schemas: `MedicalProcedure`, `Dentist`, `FAQPage`, `Article`. Markup must strictly reflect visible page text.*
- [ ] **15. What measurable business/user purpose does it serve?**  
  *Explain how it assists the patient (e.g., alleviates dental anxiety, clarifies treatment cost, guides an overseas patient) and converts to an appointment.*

---

## Technical & On-Page Implementation Standards

### A. Head & Metadata Hygiene
- [ ] **Canonical Tag**: Single, absolute canonical pointing to production HTTPS URL (`<link rel="canonical" href="https://aestheticadental.github.io/...">`).
- [ ] **Page Title**: Unique, natural, descriptive, under 70 characters. Clinic branding included.
- [ ] **Meta Description**: Compelling, informative summary between 120 and 160 characters.
- [ ] **Single H1**: Exactly one `<h1>` that aligns with the search intent.
- [ ] **Open Graph Tags**: Complete `og:title`, `og:description`, `og:url`, `og:image` pointing to `/images/clinic-og-banner.jpg`.

### B. Medical Content Integrity (YMYL / Healthcare Quality)
- [ ] **Clinician Attribution**: Attributed to Dr. Prachi Gupta Garg (BDS, PGDEMS).
- [ ] **Responsible Medical Phrasing**: No guaranteed outcomes, no "100% painless" claims, no fabricated statistics, and transparent discussion of treatment longevity, candidacy, and maintenance.
- [ ] **Transparent Costs**: Any price references must match the official fee schedule in `dental-treatment-costs-punawale.html`.

### C. Components & Navigation
- [ ] **Global Injections**: Script `components.js` loaded.
- [ ] **Relative Path Safety**: If in a subfolder (e.g., `/blog/`), component injection pathing must be verified.
- [ ] **Emergency Contact CTAs**: Direct WhatsApp link (`https://wa.me/919011016358`) and phone call (`tel:+919011016358`) functioning.

---

## Automated Verification Sign-Off

Before any pull request is submitted or code is merged to `main`, run:

```bash
# 1. Run full repository audit suite
npm run seo:audit

# 2. Run live HTTP production validation (if updating production)
npm run seo:live
```

Required pass metrics:
- [ ] **0 Errors**
- [ ] **0 Broken Links**
- [ ] **0 Unintentional Orphans**
- [ ] **0 Canonical Mismatches**
- [ ] **0 Invalid JSON-LD Syntax Errors**
- [ ] **0 Exposed Credentials/Secrets**
