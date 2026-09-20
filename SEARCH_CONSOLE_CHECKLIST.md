# Aesthetica Dental Clinic — Google Search Console Post-Deployment Checklist

**Domain**: `https://aestheticadental.github.io/`  
**Purpose**: Step-by-step verification protocols to ensure flawless Google Search Console indexing, crawling, and rich result validation following deployment.  

---

## 1. Google Search Console Configuration & Hygiene Checks

- [ ] **Property Verification**: Confirm GSC property is verified for `https://aestheticadental.github.io/`.
- [ ] **Sitemap Submission**: Submit `https://aestheticadental.github.io/sitemap.xml` under *Sitemaps*.
  - Verify Status returns **"Success"**.
  - Confirm total discovered pages equals **42**.
- [ ] **robots.txt Live Verification**:
  - Open GSC *robots.txt Tester* or inspect live at `https://aestheticadental.github.io/robots.txt`.
  - Confirm HTTP 200 OK.
  - Verify `Sitemap: https://aestheticadental.github.io/sitemap.xml` directive is recognized.
  - Confirm no critical CSS, JS, or image assets are blocked from Googlebot.
- [ ] **Noindex Audit**:
  - Verify that no retained clinical or informational page accidentally contains `<meta name="robots" content="noindex">`.
  - Confirm `noindex` is present ONLY on redirected files and the custom `404.html`.
- [ ] **Canonical URL Hygiene**:
  - Verify zero localhost, staging, or GitHub repository branch URLs exist in `<link rel="canonical">` tags.
  - Verify all canonical tags are absolute HTTPS URLs.
- [ ] **Security & Mixed Content**:
  - Confirm zero mixed content (HTTP resources on HTTPS pages).
  - Verify *Security Issues* tab in GSC reports "No issues detected".

---

## 2. Priority URL Inspection List (URL Inspection Tool)

Execute a live **URL Inspection** and request indexing for the following critical URLs immediately following deployment:

### Group 1: Core Hubs & Clinic Authority
1. `https://aestheticadental.github.io/`
   - *Check*: Canonical is self-referencing; Schema: `Dentist`, `LocalBusiness`, `FAQPage`.
2. `https://aestheticadental.github.io/services.html`
   - *Check*: Discovered from sitemap; all clinical pillar links rendered.
3. `https://aestheticadental.github.io/about-dr-prachi-gupta-garg.html`
   - *Check*: E-E-A-T Person / Physician schema valid.
4. `https://aestheticadental.github.io/contact-us.html`
   - *Check*: NAP consistency, phone click-to-call, embedded map crawlable.

### Group 2: Flagship Clinical Treatment Pillars
5. `https://aestheticadental.github.io/root-canal-treatment-punawale.html`
   - *Check*: BreadcrumbList schema valid; MedicalProcedure schema valid; links to supporting blog posts crawlable.
6. `https://aestheticadental.github.io/dental-implants-punawale.html`
   - *Check*: Self-referencing canonical; breadcrumbs active; pricing links active.
7. `https://aestheticadental.github.io/clear-aligners-punawale.html`
   - *Check*: Valid BreadcrumbList schema; FAQPage schema valid.
8. `https://aestheticadental.github.io/emergency-dental-care-punawale.html`
   - *Check*: Click-to-call phone and WhatsApp CTAs rendered.
9. `https://aestheticadental.github.io/teeth-whitening-punawale.html`
   - *Check*: Distinct canonical from blog post; valid breadcrumbs.
10. `https://aestheticadental.github.io/pediatric-dentist-punawale.html`
    - *Check*: Clean canonical; consolidates previous British spelling variant.
11. `https://aestheticadental.github.io/veneers-punawale.html`
    - *Check*: Included in sitemap; links to dental crown guide.

### Group 3: International Patients & Dental Tourism
12. `https://aestheticadental.github.io/dental-tourism-pune.html`
    - *Check*: Primary cluster pillar indexed; discovered from header navigation.
13. `https://aestheticadental.github.io/dental-treatment-in-india.html`
    - *Check*: Resolved from orphan status; linked from tourism hub.
14. `https://aestheticadental.github.io/how-long-to-stay-in-pune-for-dental-treatment.html`
    - *Check*: Valid breadcrumbs; sitemap inclusion.
15. `https://aestheticadental.github.io/nri-dental-care-pune.html`
    - *Check*: Demographically targeted metadata rendering.

### Group 4: Patient Resources & Diagnostics
16. `https://aestheticadental.github.io/dental-treatment-costs-punawale.html`
    - *Check*: Price transparency schema; structured tables crawlable.
17. `https://aestheticadental.github.io/dental-x-ray-near-me.html`
    - *Check*: Resolved from orphan status; internal links from RCT active.
18. `https://aestheticadental.github.io/what-is-a-dental-crown.html`
    - *Check*: OpenGraph image banner resolving; MedicalProcedure schema valid.
19. `https://aestheticadental.github.io/blog/dental-clinic-faq.html`
    - *Check*: Canonical tag correctly self-referencing (NOT pointing to 404 `/faq.html`).

### Group 5: Local Proximity Hubs
20. `https://aestheticadental.github.io/service-areas.html`
    - *Check*: Hub links to all local neighborhood pages.
21. `https://aestheticadental.github.io/dentist-near-hinjawadi.html`
    - *Check*: Local business schema; commute directions crawlable.
22. `https://aestheticadental.github.io/dentist-near-wakad.html`
    - *Check*: Differentiated from Wakad comparison blog article.

### Group 6: Cornerstones of the Dental Health Blog
23. `https://aestheticadental.github.io/blog/index.html`
    - *Check*: All 10 retained articles discoverable through HTML links.
24. `https://aestheticadental.github.io/blog/wisdom-tooth-extraction-punawale.html`
    - *Check*: Path correctly resolved under `/blog/` in sitemap; MedicalArticle schema valid.
25. `https://aestheticadental.github.io/blog/tooth-pain-at-night-punawale.html`
    - *Check*: Homepage link resolved; emergency care cross-links functional.
26. `https://aestheticadental.github.io/blog/painless-root-canal-treatment-punawale.html`
    - *Check*: Canonical tag fixed (no longer pointing to 404 URL).

---

## 3. Redirection & Deprecated URL Verification

Use the URL Inspection Tool to confirm that the 7 consolidated legacy URLs are properly recognized as redirected and NOT indexed as duplicate pages:

1. `https://aestheticadental.github.io/root-canal-punawale.html`
   - *Expected*: Google detects canonical pointing to `root-canal-treatment-punawale.html`; "Page with redirect".
2. `https://aestheticadental.github.io/aligners-punawale.html`
   - *Expected*: Canonical points to `clear-aligners-punawale.html`; "Page with redirect".
3. `https://aestheticadental.github.io/paediatric-dentist-punawale.html`
   - *Expected*: Canonical points to `pediatric-dentist-punawale.html`; "Page with redirect".
4. `https://aestheticadental.github.io/contact.html`
   - *Expected*: Canonical points to `contact-us.html`; "Page with redirect".
5. `https://aestheticadental.github.io/dentist-near-me-punawale-pune.html`
   - *Expected*: Canonical points to `https://aestheticadental.github.io/`; "Page with redirect".
6. `https://aestheticadental.github.io/blog/Why-dental-implants-punawale.html`
   - *Expected*: Canonical points to `blog/dental-implants-punawale.html`; "Page with redirect".
7. `https://aestheticadental.github.io/blog/teeth-whitening-punawale.html`
   - *Expected*: Canonical points to `blog/what-is-teeth-whitening-punawale.html`; "Page with redirect".

---

## 4. Rich Results & Schema Validation Testing

Test the live URLs on the official **Google Rich Results Test** (`https://search.google.com/test/rich-results`):
- [ ] Homepage: Valid `Dentist` & `FAQPage` rich results.
- [ ] Clinical Services: Valid `BreadcrumbList` & `MedicalProcedure` rich results.
- [ ] Blog Posts: Valid `BreadcrumbList` & `Article` rich results.
- [ ] Ensure 0 critical errors and 0 missing required field warnings across all schemas.
