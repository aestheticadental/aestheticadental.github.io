#!/usr/bin/env node
/**
 * AESTHETICA DENTAL CLINIC — LIVE PRODUCTION VALIDATION SUITE
 * 
 * Tests the live production domain https://aestheticadental.github.io/
 * Distinguishes repository code state from live deployed state.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const LIVE_DOMAIN = 'https://aestheticadental.github.io';

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AestheticaBot/1.0; +https://aestheticadental.github.io/)' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        url,
        statusCode: null,
        error: err.message,
        headers: {},
        body: ''
      });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        url,
        statusCode: null,
        error: 'Timeout after 8000ms',
        headers: {},
        body: ''
      });
    });
  });
}

// Retained canonical relative paths
const canonicalPages = [
  '',
  'services.html',
  'root-canal-treatment-punawale.html',
  'dental-implants-punawale.html',
  'clear-aligners-punawale.html',
  'emergency-dental-care-punawale.html',
  'pediatric-dentist-punawale.html',
  'teeth-cleaning-scaling-punawale.html',
  'teeth-whitening-punawale.html',
  'veneers-punawale.html',
  'restorative-dentistry-punawale.html',
  'dental-tourism-pune.html',
  'dental-treatment-in-india.html',
  'nri-dental-care-pune.html',
  'how-to-plan-dental-treatment-during-india-trip.html',
  'how-long-to-stay-in-pune-for-dental-treatment.html',
  'pune-vs-mumbai-dental-treatment.html',
  'dental-records-before-traveling-to-india.html',
  'combine-holiday-with-dental-treatment-india.html',
  'dental-treatment-costs-punawale.html',
  'dental-cleaning-cost-punawale.html',
  'dental-x-ray-near-me.html',
  'what-is-a-dental-crown.html',
  'blog/dental-clinic-faq.html',
  'service-areas.html',
  'dentist-near-hinjawadi.html',
  'dentist-near-wakad.html',
  'dentist-near-tathawade.html',
  'blog/best-dentist-near-wakad.html',
  'about-us.html',
  'about-dr-prachi-gupta-garg.html',
  'contact-us.html',
  'privacy-policy.html',
  'blog/',
  'blog/painless-root-canal-treatment-punawale.html',
  'blog/cost-of-root-canal-in-punawale.html',
  'blog/signs-you-need-root-canal.html',
  'blog/tooth-pain-at-night-punawale.html',
  'blog/wisdom-tooth-extraction-punawale.html',
  'blog/wisdom-tooth-pain-punawale.html',
  'blog/dental-implants-punawale.html',
  'blog/what-is-teeth-whitening-punawale.html',
  'sitemap.html'
];

const staticAssets = [
  'robots.txt',
  'sitemap.xml',
  'images/clinic-og-banner.jpg',
  'styles.css',
  'components.js',
  'logo.webp'
];

const legacyRedirects = [
  'root-canal-punawale.html',
  'aligners-punawale.html',
  'paediatric-dentist-punawale.html',
  'contact.html',
  'dentist-near-me-punawale-pune.html',
  'blog/Why-dental-implants-punawale.html',
  'blog/teeth-whitening-punawale.html'
];

async function runLiveValidation() {
  console.log('=============================================================');
  console.log(`  LIVE PRODUCTION VALIDATION: ${LIVE_DOMAIN}`);
  console.log('=============================================================\n');

  console.log(`Checking ${canonicalPages.length} canonical pages against live domain...`);
  const canonicalResults = [];
  let live200Count = 0;
  let live404Count = 0;

  for (const p of canonicalPages) {
    const fullUrl = p === '' ? `${LIVE_DOMAIN}/` : `${LIVE_DOMAIN}/${p}`;
    const res = await fetchUrl(fullUrl);
    const hasCanonical = res.body ? /<link\s+[^>]*?rel=["']canonical["']/i.test(res.body) : false;
    const hasH1 = res.body ? /<h1[^>]*>/i.test(res.body) : false;
    const titleMatch = res.body ? res.body.match(/<title>([^<]*)<\/title>/i) : null;
    const title = titleMatch ? titleMatch[1].trim() : null;

    if (res.statusCode === 200) live200Count++;
    else if (res.statusCode === 404) live404Count++;

    canonicalResults.push({
      url: fullUrl,
      statusCode: res.statusCode,
      hasCanonical,
      hasH1,
      title: title ? title.substring(0, 40) + '...' : null
    });
    process.stdout.write(res.statusCode === 200 ? '.' : 'x');
  }
  console.log(`\nCanonical pages: ${live200Count} responding 200, ${live404Count} responding 404.\n`);

  console.log(`Checking ${staticAssets.length} key static assets & infrastructure files...`);
  const assetResults = [];
  for (const a of staticAssets) {
    const fullUrl = `${LIVE_DOMAIN}/${a}`;
    const res = await fetchUrl(fullUrl);
    assetResults.push({
      asset: a,
      url: fullUrl,
      statusCode: res.statusCode,
      contentLength: res.headers['content-length'] || res.body.length
    });
    console.log(`  [${res.statusCode || 'ERR'}] ${a} (${res.headers['content-type'] || 'unknown type'})`);
  }
  console.log('');

  console.log(`Checking ${legacyRedirects.length} legacy URLs on live domain...`);
  const redirectResults = [];
  for (const r of legacyRedirects) {
    const fullUrl = `${LIVE_DOMAIN}/${r}`;
    const res = await fetchUrl(fullUrl);
    const hasMetaRefresh = res.body ? /<meta\s+http-equiv=["']refresh["']/i.test(res.body) : false;
    const hasCanonical = res.body ? /<link\s+[^>]*?rel=["']canonical["']/i.test(res.body) : false;
    redirectResults.push({
      legacyUrl: r,
      statusCode: res.statusCode,
      hasMetaRefresh,
      hasCanonical
    });
    console.log(`  [${res.statusCode || 'ERR'}] ${r} (MetaRefresh: ${hasMetaRefresh}, Canonical: ${hasCanonical})`);
  }

  // Save report
  const output = {
    domain: LIVE_DOMAIN,
    timestamp: new Date().toISOString(),
    live200Count,
    live404Count,
    canonicalResults,
    assetResults,
    redirectResults
  };

  const outPath = path.join('C:\\Users\\nikhi\\.gemini\\antigravity-ide\\brain\\fade372b-b7a4-49ca-8331-63e1c24bfcc2\\scratch', 'live_production_results.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\nComplete live validation saved to scratch/live_production_results.json`);
}

runLiveValidation();
