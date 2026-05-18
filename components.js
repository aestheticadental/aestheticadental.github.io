/**
 * AESTHETICA DENTAL CLINIC — components.js
 * Injects shared header, footer, floating WhatsApp & sticky CTA on every page.
 *
 * SEO NOTE: This file only injects UI/navigation components.
 * All NAP (name, address, phone), schema markup, canonical tags,
 * meta tags, breadcrumbs, and page content remain inline in each HTML file
 * so Google can crawl them without executing JavaScript.
 *
 * PATH DETECTION: Automatically resolves asset paths whether the page
 * is at root level (index, service pages) or one level deep (blog/).
 */

(function () {
  'use strict';

  /* ── Detect path depth ──────────────────────────────────────────────────
     Pages in /blog/ need "../" prefix for root assets.
     All other pages (root-level service pages, index) use "./".
  ────────────────────────────────────────────────────────────────────── */
  const isInSubfolder = window.location.pathname.split('/').filter(Boolean).length > 1 &&
                        !window.location.pathname.endsWith('/');
  const root = isInSubfolder ? '../' : '';

  /* ── WhatsApp number & default message ─────────────────────────────── */
  const WA_NUMBER  = '919226680164';
  const WA_DEFAULT = 'Hello%2C%20I%20want%20to%20book%20a%20dental%20appointment%20at%20Aesthetica%20Dental%20Clinic%2C%20Punawale.';
  const WA_LINK    = `https://wa.me/${WA_NUMBER}?text=${WA_DEFAULT}`;

  /* ── WhatsApp SVG ───────────────────────────────────────────────────── */
  const WA_SVG = `<svg viewBox="0 0 24 24" fill="white" aria-hidden="true" style="width:22px;height:22px;">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.523 5.84L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.368l-.36-.214-3.76.892.952-3.672-.233-.376A9.818 9.818 0 1112 21.818z"/>
  </svg>`;

  /* ══════════════════════════════════════════════════════════════════════
     HEADER
  ══════════════════════════════════════════════════════════════════════ */
  function injectHeader() {
    const existing = document.querySelector('.header');
    if (existing) return; // page has its own header — skip

    const header = document.createElement('header');
    header.className = 'header';
    header.setAttribute('role', 'banner');
    header.innerHTML = `
      <nav class="nav-container" aria-label="Main navigation">
        <div class="logo-section">
          <a href="${root}index.html" class="logo">
            <img src="${root}logo.webp" alt="Aesthetica Dental Clinic" class="logo-image" width="38" height="38">
            <span class="logo-text">AESTHETICA</span>
          </a>
          <div class="tagline">Your trusted dental care partner in Punawale</div>
        </div>
        <ul class="nav-menu" id="navMenu">
          <li><a href="${root}index.html#services" class="nav-link">Services</a></li>
          <li><a href="${root}index.html#areas"    class="nav-link">Areas</a></li>
          <li><a href="${root}index.html#about"    class="nav-link">About</a></li>
          <li><a href="${root}index.html#doctor"   class="nav-link">Our Doctor</a></li>
          <li><a href="/blog/index.html"           class="nav-link">Blog</a></li>
          <li><a href="${root}index.html#faq"      class="nav-link">FAQ</a></li>
          <li><a href="/contact-us.html"     class="nav-link">Contact</a></li>
        </ul>
        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation menu">
          <span aria-hidden="true">☰</span>
        </button>
      </nav>`;
    document.body.prepend(header);

    // Mobile menu toggle
    const toggle = header.querySelector('#mobileMenuToggle');
    const menu   = header.querySelector('#navMenu');
    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-active');
      toggle.querySelector('span').textContent = menu.classList.contains('mobile-active') ? '✕' : '☰';
    });
    header.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
      menu.classList.remove('mobile-active');
      toggle.querySelector('span').textContent = '☰';
    }));

    // Scroll effect
    window.addEventListener('scroll', () => {
      header.style.background  = window.scrollY > 80 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
      header.style.boxShadow   = window.scrollY > 80 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     FOOTER
  ══════════════════════════════════════════════════════════════════════ */
  function injectFooter() {
    const existing = document.querySelector('.footer');
    if (existing) {
      // Update existing footer links to use correct paths
      existing.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel')) {
          // Already has root prefix or needs none — leave as-is for inline footers
        }
      });
      return;
    }

    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
      <div class="container">
        <div class="footer-links">
          <a href="${root}root-canal-punawale.html">Root Canal</a>
          <a href="${root}dental-implants-punawale.html">Dental Implants</a>
          <a href="${root}aligners-punawale.html">Aligners</a>
          <a href="${root}teeth-whitening-punawale.html">Teeth Whitening</a>
          <a href="${root}veneers-punawale.html">Veneers</a>
          <a href="${root}paediatric-dentist-punawale.html">Paediatric Dentist</a>
          <a href="${root}teeth-cleaning-scaling-punawale.html">Teeth Cleaning</a>
          <a href="${root}restorative-dentistry-punawale.html">Restorative</a>
          <a href="${root}blog/">Blog</a>
          <a href="${root}contact-us.html">Contact Us</a>
          <a href="${root}privacy-policy.html">Privacy Policy</a>
        </div>
        <p class="footer-copy">
          &copy; ${year} Aesthetica Dental Clinic &middot;
          Shop 103, Swaraaj Heights, Kate Wasti Rd, Punawale, Pune 411033 &middot;
          +91 92266 80164
        </p>
      </div>`;
    document.body.appendChild(footer);
  }

  /* ══════════════════════════════════════════════════════════════════════
     FLOATING WHATSAPP BUTTON
  ══════════════════════════════════════════════════════════════════════ */
  function injectFloatingWA() {
    if (document.querySelector('.floating-whatsapp')) return;
    const btn = document.createElement('a');
    btn.href            = WA_LINK;
    btn.className       = 'floating-whatsapp';
    btn.target          = '_blank';
    btn.rel             = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat with Aesthetica Dental Clinic on WhatsApp');
    btn.innerHTML       = WA_SVG;
    document.body.appendChild(btn);
  }

  /* ══════════════════════════════════════════════════════════════════════
     STICKY MOBILE CTA BAR
  ══════════════════════════════════════════════════════════════════════ */
  function injectStickyCTA() {
    if (document.querySelector('.sticky-cta-bar')) return;
    const bar = document.createElement('div');
    bar.className       = 'sticky-cta-bar';
    bar.setAttribute('aria-label', 'Quick contact');
    bar.innerHTML = `
      <a href="tel:+919226680164" class="call-btn">📞 Call Now</a>
      <a href="${WA_LINK}" class="wa-btn" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>`;
    document.body.appendChild(bar);
  }

  /* ══════════════════════════════════════════════════════════════════════
     SMOOTH SCROLL (for anchor links on same page)
  ══════════════════════════════════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     INTERSECTION OBSERVER — scroll-in animations
  ══════════════════════════════════════════════════════════════════════ */
  function initAnimations() {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-fade-in'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll(
      '.service-card,.feature-item,.faq-item,.testimonial-card,.area-card,.blog-card,.step-card,.related-card,.pricing-card'
    ).forEach(el => io.observe(el));
  }

  /* ══════════════════════════════════════════════════════════════════════
     GA4 TRACKING HELPER
  ══════════════════════════════════════════════════════════════════════ */
  function trackEvent(cat, action, label) {
    if (typeof gtag !== 'undefined') gtag('event', action, { event_category: cat, event_label: label });
  }

  function initTracking() {
    // Section view tracking
    const sio = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) trackEvent('engagement', 'section_view', e.target.id); }),
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach(s => sio.observe(s));

    // Time on page milestones
    [30, 60, 180, 300].forEach(s => setTimeout(() => trackEvent('engagement', 'time_on_page', s + 's'), s * 1000));

    // Page load / exit
    trackEvent('engagement', 'page_load', location.pathname);
    window.addEventListener('beforeunload', () => {
      const t = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
      trackEvent('engagement', 'page_exit', 'total_' + t + 's');
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     INIT — run after DOM is ready
  ══════════════════════════════════════════════════════════════════════ */
  function init() {
    injectHeader();
    injectFooter();
    injectFloatingWA();
    injectStickyCTA();
    initSmoothScroll();
    initAnimations();
    initTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
