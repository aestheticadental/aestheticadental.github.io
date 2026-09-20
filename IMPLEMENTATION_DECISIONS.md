# Aesthetica Dental Clinic — Implementation Decisions Requiring Human Approval

**Repository**: `aestheticadental.github.io`  
**Status**: Awaiting User Review & Approval Before Code Changes  

---

The technical SEO, information architecture, and content audit identified 5 strategic decisions that require human sign-off prior to modifying production files:

---

### Decision 1: Deprecated & Duplicate Page Consolidation (7 URLs)

We identified 7 URLs that represent either 100% byte-for-byte duplicates or outdated, thinner versions of superior surviving pages.

| Legacy URL | Recommended Action | Surviving Target URL | Clinical & Technical Rationale |
| :--- | :---: | :--- | :--- |
| `root-canal-punawale.html` | **REDIRECT** | `root-canal-treatment-punawale.html` | Older 29KB page consolidated into the superior 35.7KB single-sitting RCT pillar page already in sitemap. |
| `aligners-punawale.html` | **REDIRECT** | `clear-aligners-punawale.html` | Older 23.5KB page consolidated into the comprehensive 29.5KB invisible braces clinical pillar. |
| `paediatric-dentist-punawale.html` | **REDIRECT** | `pediatric-dentist-punawale.html` | Older British-spelling duplicate consolidated into the primary 33.9KB pediatric dentistry clinical pillar. |
| `contact.html` | **REDIRECT** | `contact-us.html` | 100% byte-for-byte identical duplicate of `contact-us.html`. |
| `dentist-near-me-punawale-pune.html` | **REDIRECT** | `index.html` (Homepage) | Thin doorway page targeting "dentist near me" with broken canonical (`dentist-in-punawale-pune.html`). Intent is satisfied by homepage. |
| `blog/Why-dental-implants-punawale.html` | **REDIRECT** | `blog/dental-implants-punawale.html` | 100% byte-for-byte identical duplicate with invalid uppercase "Why" in slug. |
| `blog/teeth-whitening-punawale.html` | **REDIRECT** | `blog/what-is-teeth-whitening-punawale.html` | 100% byte duplicate. Consolidating to `what-is-teeth-whitening-punawale.html` cleanly separates educational science from root service page. |

> **Approval Required**: Do you approve deploying the 3-tier GitHub Pages redirect standard (canonical + `<meta http-equiv="refresh">` + client-side script) on these 7 legacy files and updating internal links across the repository to point to their surviving targets?

---

### Decision 2: Retention of Hyper-Local Proximity Pages

We reviewed the existing geo-proximity pages to ensure they are not thin doorway pages:
1. `dentist-near-hinjawadi.html` (Hinjawadi Phase 1 / IT Park — 8 min drive via Marunji Rd, late hours for tech workers).
2. `dentist-near-wakad.html` (Wakad & Bhumkar Chowk — 7 min drive via highway, parking details).
3. `dentist-near-tathawade.html` (Tathawade & JSPM Campus — 5 min drive from Dange Chowk / institutes).

> **Assessment**: Each page contains genuine, unique transit, landmark, and commute information tailored to neighboring areas within a 5–10 minute radius of the Punawale clinic.
> **Recommendation**: **KEEP** all three location pages, but eliminate the redundant doorway page `dentist-near-me-punawale-pune.html` (covered in Decision 1).
> **Approval Required**: Do you approve retaining these 3 specific location pages within the `Areas We Serve` cluster?

---

### Decision 3: FAQ Hub Architecture & Canonical Fix

- Current state: `blog/dental-clinic-faq.html` resides in `/blog/` but acts as the primary clinic-wide FAQ hub covering RCT, Implants, Braces, and Extractions. Its canonical tag currently points to `https://aestheticadental.github.io/faq.html` (which does not exist).
- **Option A (Recommended)**: Keep the file at `blog/dental-clinic-faq.html`, correct its canonical tag to self-referencing (`https://aestheticadental.github.io/blog/dental-clinic-faq.html`), add it to `sitemap.xml`, and link it from the header navigation "FAQ" and footer "Patient Resources".
- **Option B**: Move or duplicate the file to root `/faq.html`.

> **Recommendation**: **Option A** (preserves existing URLs and backlinks while resolving the canonical 404 error).
> **Approval Required**: Do you approve Option A?

---

### Decision 4: Differentiation of Wakad Blog Post vs Wakad Service Page

- `dentist-near-wakad.html` (Root) is the primary local commercial landing page.
- `blog/best-dentist-near-wakad.html` was created in `/blog/` targeting a similar query.
- **Recommendation**: Retain `blog/best-dentist-near-wakad.html` as an educational / comparison article ("Wakad Patient Commute & Practice Comparison Guide"), adjusting headings to emphasize transit convenience, and place a prominent contextual CTA box directing appointment-seeking patients to the primary landing page `../dentist-near-wakad.html`.

> **Approval Required**: Do you approve this editorial differentiation rather than deleting or redirecting the blog post?

---

### Decision 5: Creation of Open Graph Social Sharing Banner (`images/clinic-og-banner.jpg`)

- Current state: **22 HTML pages** declare `<meta property="og:image" content="https://aestheticadental.github.io/images/clinic-og-banner.jpg">`, but the `images/` directory and banner image do not exist in the repository. This causes broken link previews when pages are shared on WhatsApp, LinkedIn, or Facebook.
- **Recommendation**: Create the `images/` folder and generate a high-resolution, lightweight branded clinic preview card (`clinic-og-banner.jpg`, 1200x630 WebP/JPEG) displaying the Aesthetica Dental Clinic branding, Punawale location, and appointment phone number (+91 92266 80164).

> **Approval Required**: Do you approve generating this banner asset to resolve broken social previews across all 22 pages?

---

## Summary of Next Steps Upon Approval

Once you approve these decisions:
1. Production files will be updated in the strict sequence defined in `SEO_IMPLEMENTATION_PLAN_V2.md`.
2. Safe redirects will be implemented on the 7 consolidated URLs.
3. Header and footer navigation will be harmonized across all 42 retained pages.
4. The automated SEO guardrail script (`npm run seo:audit`) will be installed and verified.
5. `sitemap.xml` will be rebuilt with all 42 retained pages (0 dead URLs, 0 redirects).
