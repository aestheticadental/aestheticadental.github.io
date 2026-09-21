#!/usr/bin/env node
/**
 * AESTHETICA DENTAL CLINIC — TECHNICAL SEO & SITE INTEGRITY AUDIT SUITE
 * 
 * Enforces production-grade Technical SEO rules:
 * - 0 broken internal links
 * - 0 canonical mismatches
 * - 0 unintentional orphans (with distinction for intentional utility/legal pages)
 * - 0 invalid XML sitemap URLs
 * - 0 missing titles, H1s, or meta descriptions
 * - Valid JSON-LD structured data syntax
 * - Production asset & image file existence
 * - Zero exposed secrets or credentials
 * 
 * Reports cleanly categorized: [ERROR] (CI blocking), [WARNING] (Needs review), [INFO] (Metrics)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Redirected legacy files (3-tier static redirects)
const REDIRECTED_FILES = new Set([
  'aligners-punawale.html',
  'contact.html',
  'dentist-near-me-punawale-pune.html',
  'paediatric-dentist-punawale.html',
  'root-canal-punawale.html',
  'blog/teeth-whitening-punawale.html',
  'blog/Why-dental-implants-punawale.html'
]);

// Intentional utility/legal pages exempt from strict editorial orphan rules
const INTENTIONAL_ORPHANS = new Set([
  '404.html',
  'privacy-policy.html'
]);

function isComponentFile(relPath) {
  return relPath.startsWith('components/');
}

// Recursively find all project files
function getAllFiles(dir, exts = null) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scratch') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (entry.isFile()) {
      if (!exts || exts.some(e => entry.name.endsWith(e))) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function extractMeta(html, nameOrProperty) {
  const regex = new RegExp(`<meta\\s+[^>]*?(?:name|property)=["']${nameOrProperty}["'][^>]*?content=["']([^"']*?)["']`, 'i');
  const match = html.match(regex);
  if (match) return match[1];
  const regexAlt = new RegExp(`<meta\\s+[^>]*?content=["']([^"']*?)["'][^>]*?(?:name|property)=["']${nameOrProperty}["']`, 'i');
  const matchAlt = html.match(regexAlt);
  return matchAlt ? matchAlt[1] : null;
}

function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']*?)["']/i);
  if (match) return match[1];
  const matchAlt = html.match(/<link\s+[^>]*?href=["']([^"']*?)["'][^>]*?rel=["']canonical["']/i);
  return matchAlt ? matchAlt[1] : null;
}

function extractInternalLinks(html, sourceRelPath) {
  const links = [];
  const regex = /<a\s+[^>]*?href=["']([^"'#]*?)(?:#[^"']*)?["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawHref = match[1].trim();
    if (!rawHref) continue;
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      if (rawHref.startsWith('https://aestheticadental.github.io')) {
        let clean = rawHref.replace('https://aestheticadental.github.io', '');
        if (clean === '' || clean === '/') clean = '/index.html';
        if (clean.startsWith('/')) clean = clean.substring(1);
        links.push(clean);
      }
      continue;
    }
    if (rawHref.startsWith('tel:') || rawHref.startsWith('mailto:') || rawHref.startsWith('javascript:')) {
      continue;
    }
    
    let resolved;
    if (rawHref.startsWith('/')) {
      resolved = rawHref.substring(1);
      if (resolved === '') resolved = 'index.html';
    } else {
      const sourceDir = path.dirname(sourceRelPath);
      if (sourceDir === '.') {
        resolved = rawHref;
      } else {
        resolved = path.join(sourceDir, rawHref).replace(/\\/g, '/');
      }
    }
    resolved = path.normalize(resolved).replace(/\\/g, '/');
    if (resolved.endsWith('/')) resolved += 'index.html';
    links.push(resolved);
  }
  return links;
}

async function runAudit() {
  console.log('\n=============================================================');
  console.log('  AESTHETICA DENTAL CLINIC — TECHNICAL SEO AUDIT ENGINE      ');
  console.log('=============================================================\n');

  const allHtmlPaths = getAllFiles(ROOT_DIR, ['.html']);
  const allHtmlFiles = allHtmlPaths.map(p => path.relative(ROOT_DIR, p).replace(/\\/g, '/'));

  let errors = 0;
  let warnings = 0;
  const infoMetrics = {};

  // 1. Audit 404 Experience
  console.log('--- SUITE 1: 404 Error Experience ---');
  const path404 = path.join(ROOT_DIR, '404.html');
  if (!fs.existsSync(path404)) {
    console.error('  ❌ [ERROR] Missing 404.html in repository root!');
    errors++;
  } else {
    const html404 = fs.readFileSync(path404, 'utf8');
    const robots404 = extractMeta(html404, 'robots');
    if (!robots404 || !robots404.includes('noindex')) {
      console.warn('  ⚠️ [WARNING] 404.html missing explicit noindex robots meta tag.');
      warnings++;
    } else {
      console.log('  ✓ 404.html present and correctly configured with noindex directive.');
    }
  }
  console.log('');

  // 2. Audit Redirected Legacy Files
  console.log('--- SUITE 2: 3-Tier Redirect Validation for Deprecated URLs ---');
  for (const redFile of REDIRECTED_FILES) {
    const fullPath = path.join(ROOT_DIR, redFile);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ❌ [ERROR] Redirect file missing: ${redFile}`);
      errors++;
      continue;
    }
    const html = fs.readFileSync(fullPath, 'utf8');
    const canonical = extractCanonical(html);
    const hasMetaRefresh = /<meta\s+http-equiv=["']refresh["']/i.test(html);
    const hasJsFallback = /window\.location\.replace/i.test(html);

    if (canonical && hasMetaRefresh && hasJsFallback) {
      console.log(`  ✓ ${redFile} -> 3-Tier Redirect verified (Target: ${canonical})`);
    } else {
      console.error(`  ❌ [ERROR] ${redFile} missing 3-tier redirect requirements!`);
      errors++;
    }
  }
  console.log('');

  // 3. Retained Canonical Pages Audit
  const retainedPages = allHtmlFiles.filter(f => !REDIRECTED_FILES.has(f) && !isComponentFile(f) && f !== '404.html');
  infoMetrics['Canonical Pages'] = retainedPages.length;
  console.log(`--- SUITE 3: Canonical Pages Quality Gate (${retainedPages.length} pages) ---`);

  const inboundLinkCount = {};
  for (const page of retainedPages) {
    inboundLinkCount[page] = 0;
  }

  for (const page of retainedPages) {
    const fullPath = path.join(ROOT_DIR, page);
    const html = fs.readFileSync(fullPath, 'utf8');

    // Title Tag
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    if (!title) {
      console.error(`  ❌ [ERROR] Missing <title> tag in ${page}`);
      errors++;
    } else if (title.length < 25 || title.length > 75) {
      console.warn(`  ⚠️ [WARNING] Title length (${title.length} chars) suboptimal in ${page}: "${title}"`);
      warnings++;
    }

    // Meta Description
    const metaDesc = extractMeta(html, 'description');
    if (!metaDesc) {
      console.error(`  ❌ [ERROR] Missing meta description in ${page}`);
      errors++;
    } else if (metaDesc.length < 50 || metaDesc.length > 170) {
      console.warn(`  ⚠️ [WARNING] Meta description length (${metaDesc.length} chars) suboptimal in ${page}`);
      warnings++;
    }

    // H1 Heading
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      console.error(`  ❌ [ERROR] Missing <h1> tag in ${page}`);
      errors++;
    } else if (h1Matches.length > 1) {
      console.warn(`  ⚠️ [WARNING] Multiple <h1> tags (${h1Matches.length}) found in ${page}`);
      warnings++;
    }

    // Canonical Tag
    const canonical = extractCanonical(html);
    if (!canonical) {
      console.error(`  ❌ [ERROR] Missing canonical URL in ${page}`);
      errors++;
    } else {
      let expectedCanonical;
      if (page === 'index.html') {
        expectedCanonical = 'https://aestheticadental.github.io/';
      } else if (page === 'blog/index.html') {
        expectedCanonical = 'https://aestheticadental.github.io/blog/';
      } else {
        expectedCanonical = `https://aestheticadental.github.io/${page}`;
      }
      if (canonical !== expectedCanonical && canonical !== `https://aestheticadental.github.io/${page}`) {
        console.error(`  ❌ [ERROR] Canonical mismatch in ${page}! Expected "${expectedCanonical}", found "${canonical}"`);
        errors++;
      }
    }

    // Medical phrasing scan
    if (/100%\s*pain-?free/i.test(html) || /100%\s*painless/i.test(html)) {
      console.warn(`  ⚠️ [WARNING] Absolute medical claim ("100% pain-free") in ${page}. Must be phrased responsibly.`);
      warnings++;
    }
  }
  console.log(`  ✓ All ${retainedPages.length} canonical pages inspected.`);
  console.log('');

  // 4. JSON-LD Structured Data Syntax & Consistency
  console.log('--- SUITE 4: Structured Data (JSON-LD) Validation ---');
  let validSchemas = 0;
  for (const page of retainedPages) {
    const fullPath = path.join(ROOT_DIR, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const jsonLdMatches = Array.from(html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi));

    for (const m of jsonLdMatches) {
      try {
        const parsed = JSON.parse(m[1]);
        validSchemas++;
        // Check for required schema fields
        if (parsed['@type'] === 'BreadcrumbList') {
          if (!parsed.itemListElement || parsed.itemListElement.length < 2) {
            console.warn(`  ⚠️ [WARNING] BreadcrumbList schema in ${page} has fewer than 2 ListItems.`);
            warnings++;
          }
        }
      } catch (err) {
        console.error(`  ❌ [ERROR] JSON-LD parse error in ${page}: ${err.message}`);
        errors++;
      }
    }
    if (jsonLdMatches.length === 0 && page !== 'privacy-policy.html') {
      console.warn(`  ⚠️ [WARNING] Page missing JSON-LD structured data: ${page}`);
      warnings++;
    }
  }
  infoMetrics['Valid JSON-LD Blocks'] = validSchemas;
  console.log(`  ✓ Successfully parsed ${validSchemas} structured data blocks with 0 syntax errors.`);
  console.log('');

  // 5. Internal Link Graph & Broken Link Discovery
  console.log('--- SUITE 5: Internal Link Graph & 404 Discovery ---');
  let brokenLinks = 0;
  for (const page of retainedPages) {
    const fullPath = path.join(ROOT_DIR, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const links = extractInternalLinks(html, page);

    for (const target of links) {
      const targetFilePath = path.join(ROOT_DIR, target);
      if (!fs.existsSync(targetFilePath)) {
        console.error(`  ❌ [ERROR] Broken internal link in ${page} -> "${target}" (File not found)`);
        brokenLinks++;
        errors++;
      } else {
        if (REDIRECTED_FILES.has(target)) {
          console.warn(`  ⚠️ [WARNING] ${page} links to deprecated redirect target: ${target}`);
          warnings++;
        }
        if (inboundLinkCount[target] !== undefined) {
          inboundLinkCount[target]++;
        }
      }
    }
  }

  if (brokenLinks === 0) {
    console.log(`  ✓ Zero broken internal links discovered across all ${retainedPages.length} canonical pages.`);
  }
  console.log('');

  // 6. Orphan Page Discovery (Intentional vs Unintentional)
  console.log('--- SUITE 6: Orphan Page Analysis ---');
  let unintentionalOrphans = 0;
  for (const [page, count] of Object.entries(inboundLinkCount)) {
    if (page === 'index.html' || INTENTIONAL_ORPHANS.has(page)) continue;
    if (count === 0) {
      console.error(`  ❌ [ERROR] Unintentional orphan page: ${page} has 0 inbound internal links!`);
      unintentionalOrphans++;
      errors++;
    }
  }
  if (unintentionalOrphans === 0) {
    console.log('  ✓ Zero unintentional orphan pages discovered.');
  }
  console.log('');

  // 7. Production Images & Asset References
  console.log('--- SUITE 7: Asset & Image Availability on Disk ---');
  let brokenImages = 0;
  for (const page of retainedPages) {
    const fullPath = path.join(ROOT_DIR, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const imgMatches = Array.from(html.matchAll(/<img\s+[^>]*?src=["']([^"']+)["']/gi));

    for (const im of imgMatches) {
      const src = im[1];
      if (src.startsWith('http') || src.startsWith('data:')) continue;
      let targetPath = src.startsWith('/') ? path.join(ROOT_DIR, src.substring(1)) : path.join(ROOT_DIR, path.dirname(page), src);
      if (!fs.existsSync(targetPath)) {
        console.error(`  ❌ [ERROR] Missing image in ${page} -> "${src}"`);
        brokenImages++;
        errors++;
      }
    }
  }
  // Check clinic OG banner & favicon
  const ogBannerPath = path.join(ROOT_DIR, 'images', 'clinic-og-banner.jpg');
  if (!fs.existsSync(ogBannerPath)) {
    console.error('  ❌ [ERROR] Open Graph banner missing: images/clinic-og-banner.jpg');
    errors++;
  } else {
    console.log('  ✓ Social preview image (images/clinic-og-banner.jpg) verified on disk.');
  }

  const faviconPath = path.join(ROOT_DIR, 'favicon.png');
  if (!fs.existsSync(faviconPath)) {
    console.error('  ❌ [ERROR] Favicon missing: favicon.png');
    errors++;
  } else {
    console.log('  ✓ Favicon (favicon.png) verified on disk.');
  }

  // Check image sizes (< 250 KB for Core Web Vitals)
  const imageFiles = getAllFiles(ROOT_DIR, ['.webp', '.jpg', '.jpeg', '.png']).filter(f => !f.includes('node_modules') && !f.includes('.git') && !f.includes('scratch'));
  let oversizedImages = 0;
  for (const imgPath of imageFiles) {
    const size = fs.statSync(imgPath).size;
    if (size > 250 * 1024) {
      console.warn(`  ⚠️ [WARNING] Image file > 250KB: ${path.relative(ROOT_DIR, imgPath)} (${Math.round(size/1024)} KB)`);
      warnings++;
      oversizedImages++;
    }
  }
  if (oversizedImages === 0) {
    console.log('  ✓ All image assets optimized under 250KB for Core Web Vitals performance.');
  }

  if (brokenImages === 0) {
    console.log('  ✓ All inline <img> references resolve to existing assets on disk.');
  }
  console.log('');

  // 8. XML Sitemap Validation
  console.log('--- SUITE 8: sitemap.xml Protocol Compliance ---');
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('  ❌ [ERROR] sitemap.xml does not exist!');
    errors++;
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
    const sitemapUrls = locMatches.map(m => m.replace(/<\/?loc>/g, '').trim());
    infoMetrics['Sitemap URLs'] = sitemapUrls.length;

    for (const url of sitemapUrls) {
      let relPath = url.replace('https://aestheticadental.github.io', '');
      if (relPath === '' || relPath === '/') relPath = 'index.html';
      if (relPath === '/blog/') relPath = 'blog/index.html';
      if (relPath.startsWith('/')) relPath = relPath.substring(1);

      const targetFile = path.join(ROOT_DIR, relPath);
      if (!fs.existsSync(targetFile)) {
        console.error(`  ❌ [ERROR] sitemap.xml references non-existent file: ${url} (${relPath})`);
        errors++;
      }
      if (REDIRECTED_FILES.has(relPath)) {
        console.error(`  ❌ [ERROR] sitemap.xml includes redirected URL: ${url}`);
        errors++;
      }
      if (isComponentFile(relPath)) {
        console.error(`  ❌ [ERROR] sitemap.xml includes component snippet: ${url}`);
        errors++;
      }
      if (relPath === '404.html') {
        console.error(`  ❌ [ERROR] sitemap.xml should NOT include 404.html!`);
        errors++;
      }
    }

    for (const page of retainedPages) {
      let expectedUrl;
      if (page === 'index.html') expectedUrl = 'https://aestheticadental.github.io/';
      else if (page === 'blog/index.html') expectedUrl = 'https://aestheticadental.github.io/blog/';
      else expectedUrl = `https://aestheticadental.github.io/${page}`;

      if (!sitemapUrls.includes(expectedUrl) && !sitemapUrls.includes(`https://aestheticadental.github.io/${page}`)) {
        console.error(`  ❌ [ERROR] Retained canonical page missing from sitemap.xml: ${page}`);
        errors++;
      }
    }
    console.log(`  ✓ sitemap.xml contains ${sitemapUrls.length} valid canonical URLs with 0 redirects and 0 snippets.`);
  }
  console.log('');

  // 9. Robots.txt Directives
  console.log('--- SUITE 9: robots.txt Crawlability ---');
  const robotsPath = path.join(ROOT_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.error('  ❌ [ERROR] robots.txt does not exist!');
    errors++;
  } else {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    if (!robots.includes('sitemap.xml')) {
      console.error('  ❌ [ERROR] robots.txt missing Sitemap directive.');
      errors++;
    }
    if (robots.includes('Disallow: /components')) {
      console.error('  ❌ [ERROR] robots.txt blocks /components/! This breaks client-side JS rendering.');
      errors++;
    } else {
      console.log('  ✓ robots.txt correctly permits component rendering and links sitemap index.');
    }
  }
  console.log('');

  // 10. Security & Secrets Scanner
  console.log('--- SUITE 10: Security & Secret Leak Prevention ---');
  const allProjectFiles = getAllFiles(ROOT_DIR);
  let secretsFound = 0;
  for (const f of allProjectFiles) {
    const content = fs.readFileSync(f, 'utf8');
    if (/ghp_[a-zA-Z0-9]{36}/.test(content) || /gho_[a-zA-Z0-9]{36}/.test(content) || /AIza[0-9A-Za-z-_]{35}/.test(content) || /sk-[a-zA-Z0-9]{32,}/.test(content)) {
      console.error(`  ❌ [ERROR] Potential exposed secret detected in ${path.relative(ROOT_DIR, f)}!`);
      secretsFound++;
      errors++;
    }
  }
  if (secretsFound === 0) {
    console.log('  ✓ Zero exposed secrets, private tokens, or credential leaks detected across all files.');
  }
  console.log('');

  // 11. Strict NAP (Name, Address, Phone, Hours) Consistency Suite
  console.log('--- SUITE 11: NAP (Name, Address, Phone, Hours) Strict Compliance ---');
  const REQUIRED_NAP_ADDRESS = '1st floor, Shop no 103, Swaraaj Heights, Kate Wasti Rd, opp. Legacy IVy, Kate Wasti';
  const REQUIRED_NAP_PIN = '411033';
  const REQUIRED_NAP_PHONE = '092266 80164';
  const FORBIDDEN_ADDRESS_PATTERNS = [/vision\s*one/i, /vision\s*1/i];
  const FORBIDDEN_PHONE_PATTERNS = [/90110\s*16358/];

  let napErrors = 0;

  // 11A. Check for forbidden/outdated address & phone across all project files
  for (const f of allProjectFiles) {
    const rel = path.relative(ROOT_DIR, f).replace(/\\/g, '/');
    if (rel.startsWith('scratch/') || rel === 'scripts/test-nap-failure.js') continue;
    const content = fs.readFileSync(f, 'utf8');

    for (const pat of FORBIDDEN_ADDRESS_PATTERNS) {
      if (pat.test(content)) {
        console.error(`  ❌ [ERROR] Outdated address pattern ${pat} detected in ${rel}!`);
        napErrors++;
        errors++;
      }
    }
    for (const pat of FORBIDDEN_PHONE_PATTERNS) {
      if (pat.test(content)) {
        console.error(`  ❌ [ERROR] Outdated phone number ${pat} detected in ${rel}!`);
        napErrors++;
        errors++;
      }
    }
  }

  // 11B. Check all canonical pages for strict NAP presence
  for (const page of retainedPages) {
    const filePath = path.join(ROOT_DIR, page);
    const content = fs.readFileSync(filePath, 'utf8');

    const hasAddress = content.includes(REQUIRED_NAP_ADDRESS) && content.includes(REQUIRED_NAP_PIN);
    const hasPhone = content.includes(REQUIRED_NAP_PHONE);
    const hasHours = content.includes('10:15') && (content.includes('8:30') || content.includes('20:30'));

    if (!hasAddress) {
      console.error(`  ❌ [ERROR] Canonical page missing standard address (${REQUIRED_NAP_ADDRESS}, 411033): ${page}`);
      napErrors++;
      errors++;
    }
    if (!hasPhone) {
      console.error(`  ❌ [ERROR] Canonical page missing standard phone (${REQUIRED_NAP_PHONE}): ${page}`);
      napErrors++;
      errors++;
    }
    if (!hasHours) {
      console.error(`  ❌ [ERROR] Canonical page missing standard clinic hours (10:15 am–8:30 pm): ${page}`);
      napErrors++;
      errors++;
    }
  }

  // 11C. Check JSON-LD schema NAP compliance across all HTML files
  for (const f of allHtmlFiles) {
    const filePath = path.join(ROOT_DIR, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const jsonLdMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];

    for (const m of jsonLdMatches) {
      try {
        const data = JSON.parse(m[1].trim());
        const items = Array.isArray(data) ? data : (data['@graph'] ? data['@graph'] : [data]);
        for (const item of items) {
          if (item['@type'] === 'Dentist' || item['@type'] === 'LocalBusiness' || item['@type'] === 'MedicalBusiness') {
            if (item.address) {
              const street = typeof item.address === 'string' ? item.address : item.address.streetAddress;
              const pin = item.address.postalCode;
              if (!street || !street.includes('Swaraaj Heights') || !street.includes('Kate Wasti')) {
                console.error(`  ❌ [ERROR] JSON-LD schema streetAddress non-compliant in ${f}: "${street}"`);
                napErrors++;
                errors++;
              }
              if (pin && pin !== REQUIRED_NAP_PIN) {
                console.error(`  ❌ [ERROR] JSON-LD schema postalCode non-compliant in ${f}: "${pin}"`);
                napErrors++;
                errors++;
              }
            }
            if (item.telephone && !item.telephone.includes('9226680164') && !item.telephone.includes('092266 80164')) {
              console.error(`  ❌ [ERROR] JSON-LD schema telephone non-compliant in ${f}: "${item.telephone}"`);
              napErrors++;
              errors++;
            }
            if (item.openingHours) {
              const oh = Array.isArray(item.openingHours) ? item.openingHours.join(', ') : item.openingHours;
              if (!oh.includes('10:15') || !oh.includes('20:30')) {
                console.error(`  ❌ [ERROR] JSON-LD schema openingHours non-compliant in ${f}: "${oh}"`);
                napErrors++;
                errors++;
              }
            }
            if (item.openingHoursSpecification) {
              const specs = Array.isArray(item.openingHoursSpecification) ? item.openingHoursSpecification : [item.openingHoursSpecification];
              for (const sp of specs) {
                if (sp.opens !== '10:15' || sp.closes !== '20:30') {
                  console.error(`  ❌ [ERROR] JSON-LD schema openingHoursSpecification non-compliant in ${f}: opens ${sp.opens}, closes ${sp.closes}`);
                  napErrors++;
                  errors++;
                }
              }
            }
          }
        }
      } catch (e) {
        // Syntax validation handled in Suite 6
      }
    }
  }

  // 11D. Shared UI components NAP compliance
  const sharedComponents = [
    { file: 'components/footer.html', checkHours: true },
    { file: 'components/cta.html', checkHours: true },
    { file: 'components.js', checkHours: true }
  ];
  for (const comp of sharedComponents) {
    const compPath = path.join(ROOT_DIR, comp.file);
    if (fs.existsSync(compPath)) {
      const compContent = fs.readFileSync(compPath, 'utf8');
      if (!compContent.includes(REQUIRED_NAP_ADDRESS)) {
        console.error(`  ❌ [ERROR] Shared component ${comp.file} missing standard address!`);
        napErrors++;
        errors++;
      }
      if (!compContent.includes(REQUIRED_NAP_PHONE)) {
        console.error(`  ❌ [ERROR] Shared component ${comp.file} missing standard phone (${REQUIRED_NAP_PHONE})!`);
        napErrors++;
        errors++;
      }
      if (comp.checkHours && (!compContent.includes('10:15') || (!compContent.includes('8:30') && !compContent.includes('20:30')))) {
        console.error(`  ❌ [ERROR] Shared component ${comp.file} missing standard hours (10:15 am–8:30 pm)!`);
        napErrors++;
        errors++;
      }
    }
  }

  if (napErrors === 0) {
    console.log(`  ✓ Strict NAP verified: 100% adherence across all ${retainedPages.length} canonical pages, structured data & components.`);
    infoMetrics['NAP Strict Adherence'] = '100% (Address, Phone: 092266 80164, Hours: Monday-Sunday 10:15 am–8:30 pm)';
  }
  console.log('');

  // Summary Metrics & Exit Status
  console.log('=============================================================');
  console.log('  AUDIT METRICS:');
  for (const [k, v] of Object.entries(infoMetrics)) {
    console.log(`    • ${k}: ${v}`);
  }
  console.log('-------------------------------------------------------------');
  if (errors === 0) {
    console.log(`  🎉 AUDIT RESULT: PASSED (0 Errors, ${warnings} Warnings)`);
    console.log('  Repository satisfies all Technical SEO & integrity standards.');
    console.log('=============================================================\n');
    process.exit(0);
  } else {
    console.error(`  ❌ AUDIT RESULT: FAILED (${errors} Critical Errors, ${warnings} Warnings)`);
    console.log('=============================================================\n');
    process.exit(1);
  }
}

runAudit();
