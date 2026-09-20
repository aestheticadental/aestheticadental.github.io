#!/usr/bin/env node
/**
 * AESTHETICA DENTAL CLINIC — AUTOMATED TECHNICAL SEO AUDIT SUITE
 * 
 * Enforces technical correctness, zero broken links, canonical integrity,
 * metadata standards, zero unintentional orphans, and XML sitemap validity.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Redirected legacy files (expected to have meta refresh & canonical to target)
const REDIRECTED_FILES = new Set([
  'aligners-punawale.html',
  'contact.html',
  'dentist-near-me-punawale-pune.html',
  'paediatric-dentist-punawale.html',
  'root-canal-punawale.html',
  'blog/teeth-whitening-punawale.html',
  'blog/Why-dental-implants-punawale.html'
]);

// Component snippets (not standalone pages)
function isComponentFile(relPath) {
  return relPath.startsWith('components/');
}

// Helper: Recursively get all HTML files
function getAllHtmlFiles(dir, base = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'scratch') {
        results = results.concat(getAllHtmlFiles(fullPath, relPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(relPath.replace(/\\/g, '/'));
    }
  }
  return results;
}

// Helper: Extract tag attribute
function extractMeta(html, nameOrProperty) {
  const regex = new RegExp(`<meta\\s+[^>]*?(?:name|property)=["']${nameOrProperty}["'][^>]*?content=["']([^"']*?)["']`, 'i');
  const match = html.match(regex);
  if (match) return match[1];
  const regexAlt = new RegExp(`<meta\\s+[^>]*?content=["']([^"']*?)["'][^>]*?(?:name|property)=["']${nameOrProperty}["']`, 'i');
  const matchAlt = html.match(regexAlt);
  return matchAlt ? matchAlt[1] : null;
}

// Helper: Extract canonical href
function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']*?)["']/i);
  if (match) return match[1];
  const matchAlt = html.match(/<link\s+[^>]*?href=["']([^"']*?)["'][^>]*?rel=["']canonical["']/i);
  return matchAlt ? matchAlt[1] : null;
}

// Helper: Extract all internal links from HTML
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
    
    // Resolve relative path
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
    // normalize path (e.g. blog/../index.html -> index.html)
    resolved = path.normalize(resolved).replace(/\\/g, '/');
    if (resolved.endsWith('/')) resolved += 'index.html';
    links.push(resolved);
  }
  return links;
}

async function runAudit() {
  console.log('\n=============================================================');
  console.log('  AESTHETICA DENTAL CLINIC — TECHNICAL SEO & INTEGRITY AUDIT ');
  console.log('=============================================================\n');

  const allHtmlFiles = getAllHtmlFiles(ROOT_DIR);
  console.log(`Discovered ${allHtmlFiles.length} total HTML files in repository.\n`);

  let totalErrors = 0;
  let totalWarnings = 0;

  // 1. Audit Redirected Files
  console.log('--- TEST 1: Redirect Validation for Deprecated URLs ---');
  for (const redFile of REDIRECTED_FILES) {
    const fullPath = path.join(ROOT_DIR, redFile);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ ERROR: Redirect file missing: ${redFile}`);
      totalErrors++;
      continue;
    }
    const html = fs.readFileSync(fullPath, 'utf8');
    const hasCanonical = extractCanonical(html);
    const hasMetaRefresh = /<meta\s+http-equiv=["']refresh["']/i.test(html);
    const hasJsFallback = /window\.location\.replace/i.test(html);
    if (hasCanonical && hasMetaRefresh && hasJsFallback) {
      console.log(`  ✓ ${redFile} -> 3-Tier Redirect verified (Canonical: ${hasCanonical})`);
    } else {
      console.error(`❌ ERROR: ${redFile} missing 3-tier redirect standards!`);
      totalErrors++;
    }
  }
  console.log('');

  // 2. Identify Retained Canonical Pages
  const retainedPages = allHtmlFiles.filter(f => !REDIRECTED_FILES.has(f) && !isComponentFile(f));
  console.log(`--- TEST 2: Retained Canonical Pages Audit (${retainedPages.length} pages) ---`);

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
      console.error(`❌ ERROR: Missing <title> in ${page}`);
      totalErrors++;
    } else if (title.length < 25 || title.length > 90) {
      console.warn(`  ⚠️ WARN: Title length (${title.length} chars) suboptimal in ${page}: "${title}"`);
      totalWarnings++;
    }

    // Meta Description
    const metaDesc = extractMeta(html, 'description');
    if (!metaDesc) {
      console.error(`❌ ERROR: Missing meta description in ${page}`);
      totalErrors++;
    }

    // H1 Heading
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      console.error(`❌ ERROR: Missing <h1> in ${page}`);
      totalErrors++;
    } else if (h1Matches.length > 1) {
      console.warn(`  ⚠️ WARN: Multiple <h1> tags (${h1Matches.length}) in ${page}`);
      totalWarnings++;
    }

    // Canonical Tag
    const canonical = extractCanonical(html);
    if (!canonical) {
      console.error(`❌ ERROR: Missing canonical URL in ${page}`);
      totalErrors++;
    } else {
      // Expected canonical format
      let expectedCanonical;
      if (page === 'index.html') {
        expectedCanonical = 'https://aestheticadental.github.io/';
      } else if (page === 'blog/index.html') {
        expectedCanonical = 'https://aestheticadental.github.io/blog/';
      } else {
        expectedCanonical = `https://aestheticadental.github.io/${page}`;
      }
      if (canonical !== expectedCanonical && canonical !== `https://aestheticadental.github.io/${page}`) {
        console.error(`❌ ERROR: Canonical mismatch in ${page}! Expected "${expectedCanonical}", found "${canonical}"`);
        totalErrors++;
      }
    }

    // Check for double-clear typos
    if (html.includes('clear-clear-aligners')) {
      console.error(`❌ ERROR: double-clear typo found in ${page}!`);
      totalErrors++;
    }
  }
  console.log(`  ✓ All ${retainedPages.length} retained pages inspected for metadata and canonical integrity.\n`);

  // 3. Broken Internal Links & Graph Inbound Link Check
  console.log('--- TEST 3: Internal Link Graph & Broken Link Discovery ---');
  let brokenLinksCount = 0;

  for (const page of retainedPages) {
    const fullPath = path.join(ROOT_DIR, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const links = extractInternalLinks(html, page);

    for (const target of links) {
      // Check if target file exists
      const targetFilePath = path.join(ROOT_DIR, target);
      if (!fs.existsSync(targetFilePath)) {
        console.error(`❌ BROKEN LINK: ${page} -> "${target}" (File not found on disk)`);
        brokenLinksCount++;
        totalErrors++;
      } else {
        // Check if linking to a redirected page
        if (REDIRECTED_FILES.has(target)) {
          console.warn(`  ⚠️ WARN: ${page} links to deprecated redirect target: ${target}`);
          totalWarnings++;
        }
        if (inboundLinkCount[target] !== undefined) {
          inboundLinkCount[target]++;
        }
      }
    }
  }

  if (brokenLinksCount === 0) {
    console.log(`  ✓ Zero broken internal links discovered across all ${retainedPages.length} pages.`);
  } else {
    console.error(`❌ Found ${brokenLinksCount} broken internal links!`);
  }
  console.log('');

  // 4. Orphan Page Detection
  console.log('--- TEST 4: Orphan Page Discovery ---');
  let orphanCount = 0;
  for (const [page, count] of Object.entries(inboundLinkCount)) {
    if (page === 'index.html') continue; // homepage has external/brand root inbound
    if (count === 0) {
      console.error(`❌ UNINTENTIONAL ORPHAN: ${page} has 0 inbound internal links!`);
      orphanCount++;
      totalErrors++;
    }
  }
  if (orphanCount === 0) {
    console.log(`  ✓ Zero unintentional orphan pages! Every page has at least 1 inbound contextual link.`);
  }
  console.log('');

  // 5. XML Sitemap Validation
  console.log('--- TEST 5: sitemap.xml Compliance & Integrity ---');
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ ERROR: sitemap.xml does not exist!`);
    totalErrors++;
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
    const sitemapUrls = locMatches.map(m => m.replace(/<\/?loc>/g, '').trim());
    console.log(`  sitemap.xml declares ${sitemapUrls.length} URLs.`);

    for (const url of sitemapUrls) {
      let relPath = url.replace('https://aestheticadental.github.io', '');
      if (relPath === '' || relPath === '/') relPath = 'index.html';
      if (relPath === '/blog/') relPath = 'blog/index.html';
      if (relPath.startsWith('/')) relPath = relPath.substring(1);

      const targetFile = path.join(ROOT_DIR, relPath);
      if (!fs.existsSync(targetFile)) {
        console.error(`❌ ERROR in sitemap.xml: Declared URL "${url}" corresponds to missing file "${relPath}"`);
        totalErrors++;
      }
      if (REDIRECTED_FILES.has(relPath)) {
        console.error(`❌ ERROR in sitemap.xml: Redirected URL "${url}" should NOT be in sitemap.xml!`);
        totalErrors++;
      }
      if (isComponentFile(relPath)) {
        console.error(`❌ ERROR in sitemap.xml: Component snippet "${url}" should NOT be in sitemap.xml!`);
        totalErrors++;
      }
    }

    // Check that all retained pages are in sitemap.xml
    for (const page of retainedPages) {
      let expectedUrl;
      if (page === 'index.html') expectedUrl = 'https://aestheticadental.github.io/';
      else if (page === 'blog/index.html') expectedUrl = 'https://aestheticadental.github.io/blog/';
      else expectedUrl = `https://aestheticadental.github.io/${page}`;

      if (!sitemapUrls.includes(expectedUrl) && !sitemapUrls.includes(`https://aestheticadental.github.io/${page}`)) {
        console.error(`❌ ERROR: Retained canonical page missing from sitemap.xml: ${page} (${expectedUrl})`);
        totalErrors++;
      }
    }
    console.log(`  ✓ sitemap.xml has 100% valid, non-redirected canonical URLs.`);
  }
  console.log('');

  // 6. Robots.txt Validation
  console.log('--- TEST 6: robots.txt Directives ---');
  const robotsPath = path.join(ROOT_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.error(`❌ ERROR: robots.txt does not exist!`);
    totalErrors++;
  } else {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    if (!robots.includes('Allow: /')) {
      console.warn(`  ⚠️ WARN: robots.txt missing 'Allow: /'`);
      totalWarnings++;
    }
    if (!robots.includes('sitemap.xml')) {
      console.error(`❌ ERROR: robots.txt missing Sitemap directive!`);
      totalErrors++;
    }
    if (robots.includes('Disallow: /components')) {
      console.error(`❌ ERROR: robots.txt blocks /components/! This breaks client-side JS rendering!`);
      totalErrors++;
    } else {
      console.log(`  ✓ robots.txt correctly permits component rendering and links sitemap index.`);
    }
  }
  console.log('');

  // Final Summary
  console.log('=============================================================');
  if (totalErrors === 0) {
    console.log(`  🎉 AUDIT PASSED! 0 Errors, ${totalWarnings} Warnings.`);
    console.log('  Site architecture is 100% compliant with Technical SEO rules.');
    console.log('=============================================================\n');
    process.exit(0);
  } else {
    console.error(`  ❌ AUDIT FAILED: ${totalErrors} Critical Errors Found!`);
    console.log('=============================================================\n');
    process.exit(1);
  }
}

runAudit();
