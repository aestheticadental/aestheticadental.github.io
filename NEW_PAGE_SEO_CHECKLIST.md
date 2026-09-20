# Aesthetica Dental Clinic — New Page SEO Quality Gate Checklist

**Purpose**: This checklist serves as the mandatory pre-publication gatekeeper for any new service page, patient resource, location guide, or blog article.  
**Rule**: No page may be merged into the repository or deployed to production unless all 20 quality checks are verified and checked off.  

---

## Pre-Publication 20-Point Quality Gate

### 1. Intent & Cannibalization Prevention
- [ ] **1. What search intent does this page satisfy?**  
  *Define precisely: Informational, Commercial Investigation, Transactional, or Urgent. If the intent cannot be clearly articulated, do not build the page.*
- [ ] **2. Does another page already satisfy this intent?**  
  *Check `SEO_SEARCH_INTENT_MAP.md` and `CONTENT_CONSOLIDATION_PLAN.md`. If an existing page covers this topic, improve the existing page instead of creating a competing URL.*
- [ ] **3. Is the content genuinely unique and valuable?**  
  *Does it provide unique clinical insights, real treatment explanations, or localized details? Reject templated doorway content or AI-generated filler.*

### 2. URL, Title & Metadata Hygiene
- [ ] **4. Does it have a clean, unique URL?**  
  *Must be lowercase, hyphen-separated, evergreen, and located in the correct directory (e.g., `/blog/` for articles, root for service pillars). No uppercase characters, underscores, or dates.*
- [ ] **5. Does it have a unique, descriptive page title?**  
  *Under 60 characters. Clearly communicates topic, intent, and clinic name where appropriate. No keyword stuffing.*
- [ ] **6. Does it have a single, intent-aligned `<h1>`?**  
  *Exactly one `<h1>` per page. Directly addresses the user's primary query.*
- [ ] **7. Does it have a compelling meta description?**  
  *Between 120 and 155 characters. Accurately summarizes page content and provides an incentive for searchers to click.*
- [ ] **8. Does it have an absolute self-referencing canonical tag?**  
  *`<link rel="canonical" href="https://aestheticadental.github.io/exact-slug.html">`. Must use HTTPS and match the preferred file convention.*

### 3. Architecture, Breadcrumbs & Discoverability
- [ ] **9. Does it have visible breadcrumb navigation?**  
  *Visible to users at the top of the content with crawlable `<a href="...">` links representing a realistic user path.*
- [ ] **10. Does it have matching `BreadcrumbList` schema?**  
  *Valid Schema.org JSON-LD matching the visible breadcrumb trail.*
- [ ] **11. Is it linked from a relevant parent hub?**  
  *Must be linked from its logical parent (`services.html`, `service-areas.html`, `dental-tourism-pune.html`, or `blog/index.html`). Never create orphan pages.*
- [ ] **12. Does it link out to 3–8 relevant pages?**  
  *Contextually connects to related procedures, treatment costs, and emergency care. No arbitrary link counts; prioritize semantic relevance.*
- [ ] **13. Does at least one relevant blog post link to it?**  
  *For service pages: ensure supporting educational articles pass topical relevance to the commercial pillar.*

### 4. Indexation & Technical SEO
- [ ] **14. Is it included in `sitemap.xml`?**  
  *Add to sitemap with correct canonical URL, current date in `<lastmod>`, and priority aligned with the page tier.*
- [ ] **15. Is it included in the HTML sitemap (`sitemap.html`)?**  
  *Listed under the appropriate category header for human navigation.*
- [ ] **16. Is it verified as indexable?**  
  *Confirm `<meta name="robots" content="index, follow">` is present. Ensure it is not blocked by `robots.txt`.*
- [ ] **17. Does it include appropriate structured data?**  
  *Implement `MedicalProcedure`, `MedicalWebPage`, `LocalBusiness`, or `FAQPage` where visible on-page content justifies it.*

### 5. Conversion, Assets & Experience
- [ ] **18. Are all images optimized and tagged?**  
  *Modern WebP format under 150 KB. Explicit `width` and `height` attributes to prevent CLS. Contextual, descriptive `alt` text.*
- [ ] **19. Is the page fully mobile-responsive and accessible?**  
  *Tested on mobile viewport (<768px). Touch targets ≥48px. Clean font legibility, no horizontal overflow.*
- [ ] **20. Does it have a clear, patient-first conversion path?**  
  *Prominent, frictionless action steps: WhatsApp consultation link with pre-filled text, direct phone call button, or clinic address for urgent walk-ins.*

---

## Verification Sign-Off

Before publishing, run the repository validation tool:
```bash
npm run seo:audit
```
Confirm:
- [ ] 0 Errors
- [ ] 0 Broken Links
- [ ] 0 Unintentional Orphans
- [ ] 0 Canonical Mismatches
