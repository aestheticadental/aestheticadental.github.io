# Aesthetica Dental Clinic — SEO Redirection Plan

**Repository**: `aestheticadental.github.io`  
**Hosting Environment**: GitHub Pages (Static Hosting)  
**Standard**: Google Search Central Technical Guidelines  

---

## 1. Hosting Architecture & Redirection Methodology

### Technical Limitation Notice
GitHub Pages is a static file hosting service. It does not provide server-side configuration controls such as Apache `.htaccess`, Nginx rewrite blocks, or Cloudflare Worker edge rules. As a result, native HTTP `301 Moved Permanently` or `308 Permanent Redirect` response headers cannot be issued directly from the origin server without a custom CDN or reverse proxy in front of GitHub Pages.

### Multi-Layered GitHub Pages Redirection Standard
To preserve search equity, prevent 404 drops, and guide patients smoothly, we implement the standard 3-tier GitHub Pages redirection pattern on deprecated URLs:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Tier 1: Canonical Signal to Search Engines -->
  <link rel="canonical" href="https://aestheticadental.github.io/TARGET_URL.html">
  
  <!-- Tier 2: Standard Meta Refresh Header (Instant 0-second transfer) -->
  <meta http-equiv="refresh" content="0; url=https://aestheticadental.github.io/TARGET_URL.html">
  
  <!-- Tier 3: High-Performance Client-Side Script Fallback -->
  <script>
    window.location.replace("https://aestheticadental.github.io/TARGET_URL.html");
  </script>
  
  <title>Redirecting to Aesthetica Dental Clinic...</title>
  <meta name="robots" content="noindex, follow">
</head>
<body>
  <p>This page has moved. If you are not redirected automatically, please visit <a href="https://aestheticadental.github.io/TARGET_URL.html">TARGET_URL</a>.</p>
</body>
</html>
```

### Critical Rules:
1. **Never Mass-Redirect Unrelated Content to the Homepage**: Every redirect must satisfy the user's specific clinical or informational intent.
2. **Zero Redirect Chains**: Every legacy URL points directly to the ultimate canonical destination.
3. **Internal Link Elimination**: All internal links across surviving pages must be updated directly to the canonical URL, ensuring that search crawlers and users never hit redirecting hops internally.
4. **Sitemap Exclusion**: Redirection pages must be excluded from `sitemap.xml`.

---

## 2. Master Redirection Matrix

| # | Legacy / Duplicate URL | Surviving Canonical URL | Clinical Rationale & Intent Match | 301 Header Supported? | Action Plan |
| :-: | :--- | :--- | :--- | :---: | :--- |
| **1** | `root-canal-punawale.html` | `root-canal-treatment-punawale.html` | Older 29KB RCT page consolidated into the superior 35.7KB single-sitting RCT pillar page. | No (Static Host) | Deploy 3-tier redirect + canonical tag pointing to `root-canal-treatment-punawale.html`. Update all references. |
| **2** | `aligners-punawale.html` | `clear-aligners-punawale.html` | Older 23.5KB page consolidated into the comprehensive 29.5KB invisible braces clinical pillar. | No (Static Host) | Deploy 3-tier redirect + canonical tag pointing to `clear-aligners-punawale.html`. Update all references. |
| **3** | `paediatric-dentist-punawale.html` | `pediatric-dentist-punawale.html` | Older British-spelling duplicate consolidated into the primary 33.9KB pediatric dentistry clinical pillar. | No (Static Host) | Deploy 3-tier redirect + canonical tag pointing to `pediatric-dentist-punawale.html`. Update all references. |
| **4** | `contact.html` | `contact-us.html` | 100% byte-for-byte identical duplicate of `contact-us.html`. | No (Static Host) | Deploy 3-tier redirect + canonical tag pointing to `contact-us.html`. Update all references. |
| **5** | `dentist-near-me-punawale-pune.html` | `index.html` (Homepage) | Doorway page targeting "dentist near me" with broken canonical (`dentist-in-punawale-pune.html`). Intent matches clinic homepage. | No (Static Host) | Deploy 3-tier redirect to `https://aestheticadental.github.io/`. |
| **6** | `blog/Why-dental-implants-punawale.html` | `blog/dental-implants-punawale.html` | 100% byte-for-byte identical duplicate with invalid uppercase "Why" in slug. | No (Static Host) | Deploy 3-tier redirect pointing to `blog/dental-implants-punawale.html`. |
| **7** | `blog/teeth-whitening-punawale.html` | `blog/what-is-teeth-whitening-punawale.html` | 100% byte-for-byte identical duplicate of educational post. Slug consolidated to distinguish from root service page. | No (Static Host) | Deploy 3-tier redirect pointing to `blog/what-is-teeth-whitening-punawale.html`. |

---

## 3. Internal Broken Link Rectification Plan

Four broken internal links were discovered during the code-level crawl. These will be corrected directly in the source markup:

| Source File | Broken Link Target | Corrected Canonical Target | Cause & Fix |
| :--- | :--- | :--- | :--- |
| `blog/cost-of-root-canal-in-punawale.html` | `services.html` | `../services.html` | Relative pathing bug inside subdirectory. Fixed by prefixing `../`. |
| `blog/signs-you-need-root-canal.html` | `services.html` | `../services.html` | Relative pathing bug inside subdirectory. Fixed by prefixing `../`. |
| `blog/painless-root-canal-treatment-punawale.html` | `../wisdom-tooth-extraction-punawale.html` | `wisdom-tooth-extraction-punawale.html` | Erroneous root traversal; file exists inside `/blog/`. Fixed to sibling link. |
| `index.html` | `blog/tooth-pain-night-punawale.html` | `blog/tooth-pain-at-night-punawale.html` | Typo in anchor href (missing `-at-`). Fixed to match exact filename. |

---

## 4. Canonical URL Corrections Plan

Three pages currently feature erroneous canonical tags pointing to non-existent URLs. These will be updated to self-referencing canonicals:

| File | Current Faulty Canonical Tag | Corrected Canonical Tag |
| :--- | :--- | :--- |
| `blog/dental-clinic-faq.html` | `https://aestheticadental.github.io/faq.html` (404) | `https://aestheticadental.github.io/blog/dental-clinic-faq.html` |
| `blog/painless-root-canal-treatment-punawale.html` | `https://aestheticadental.github.io/blog/root-canal-treatment-punawale.html` (404) | `https://aestheticadental.github.io/blog/painless-root-canal-treatment-punawale.html` |
| `blog/what-is-teeth-whitening-punawale.html` | `https://aestheticadental.github.io/blog/teeth-whitening-punawale.html` (Duplicate) | `https://aestheticadental.github.io/blog/what-is-teeth-whitening-punawale.html` |

---

## 5. Custom 404 Error Recovery Standard

To ensure that mistyped URLs or broken external inbound links do not result in a blank browser dead-end, a custom `404.html` page is established:
- **Title**: `Page Not Found (404) | Aesthetica Dental Clinic, Punawale`
- **Robots**: `noindex, follow`
- **Patient Recovery Content**:
  - Direct links to primary clinical pillars (Root Canal, Dental Implants, Clear Aligners, Teeth Whitening).
  - Prominent Emergency Dental Care contact box with direct Call and WhatsApp links.
  - Link to the HTML Sitemap (`/sitemap.html`) for full navigation recovery.
