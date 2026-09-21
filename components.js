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
  const currentPath = window.location.pathname.toLowerCase();
  const isInSubfolder = currentPath.includes('/blog/') || currentPath.endsWith('/blog') || currentPath.endsWith('/blog/');
  const root = isInSubfolder ? '../' : '';

  /* ── WhatsApp number & dynamic contextual message ─────────────────── */
  const WA_NUMBER  = '919226680164';
  function getContextualWaLink() {
    let topic = 'a dental appointment';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('root-canal') || path.includes('rct')) topic = 'Root Canal Treatment (RCT)';
    else if (path.includes('aligner')) topic = 'Clear Aligners';
    else if (path.includes('implant')) topic = 'Dental Implants';
    else if (path.includes('whitening')) topic = 'Teeth Whitening';
    else if (path.includes('emergency') || path.includes('tooth-pain')) topic = 'Urgent Emergency Dental Care';
    else if (path.includes('tourism') || path.includes('nri') || path.includes('india')) topic = 'Dental Tourism & NRI Care';
    else if (path.includes('cost') || path.includes('price')) topic = 'Treatment Pricing & EMI Plans';
    else if (path.includes('pediatric') || path.includes('paediatric')) topic = 'Pediatric Dental Care for my child';
    else if (path.includes('crown') || path.includes('veneer') || path.includes('makeover')) topic = 'Dental Crowns & Cosmetic Veneers';
    else if (path.includes('clean') || path.includes('scaling')) topic = 'Teeth Cleaning & Scaling';
    else if (path.includes('x-ray')) topic = 'Digital Dental X-Ray (RVG)';
    else if (path.includes('tmj') || path.includes('bruxism') || path.includes('night-guard')) topic = 'TMJ Jaw Pain & Nightguards';
    else if (path.includes('steriliz') || path.includes('safety')) topic = 'Clinic Sterilization & Safety Standards';
    else if (path.includes('laser') || path.includes('depigmentation')) topic = 'Laser Dentistry & Gum Aesthetics';
    else if (path.includes('diabetic') || path.includes('cardiac')) topic = 'Dental Care for Medical Conditions';
    else if (path.includes('aftercare') || path.includes('post-op')) topic = 'Post-Treatment Recovery & Aftercare';
    else if (path.includes('pregnancy')) topic = 'Dental Care During Pregnancy';
    const text = encodeURIComponent(`Hello Dr. Prachi, I would like to consult and book an appointment for ${topic} at Aesthetica Dental Clinic, Punawale.`);
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }
  const WA_LINK = getContextualWaLink();

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
          <a href="${root || "/"}" class="logo">
            <img src="${root}logo.webp" alt="Aesthetica Dental Clinic" class="logo-image" width="38" height="38">
            <span class="logo-text">AESTHETICA</span>
          </a>
          <div class="tagline">Your trusted dental care partner in Punawale</div>
        </div>
        <ul class="nav-menu" id="navMenu">
          <li><a href="${root}services.html" class="nav-link">Services</a></li>
          <li><a href="${root}dental-tourism-pune.html" class="nav-link">International</a></li>
          <li><a href="${root}dental-treatment-costs-punawale.html" class="nav-link">Costs</a></li>
          <li><a href="${root}service-areas.html" class="nav-link">Areas</a></li>
          <li><a href="${root}about-us.html" class="nav-link">About</a></li>
          <li><a href="${root}blog/dental-clinic-faq.html" class="nav-link">FAQ</a></li>
          <li><a href="${root}blog/index.html" class="nav-link">Blog</a></li>
          <li><a href="${root}contact-us.html" class="nav-link">Contact</a></li>
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
        <div class="footer-links" style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem 1.5rem;margin-bottom:1.5rem;">
          <a href="${root}root-canal-treatment-punawale.html">Root Canal</a>
          <a href="${root}dental-implants-punawale.html">Dental Implants</a>
          <a href="${root}clear-aligners-punawale.html">Clear Aligners</a>
          <a href="${root}teeth-whitening-punawale.html">Teeth Whitening</a>
          <a href="${root}veneers-punawale.html">Veneers & Crowns</a>
          <a href="${root}pediatric-dentist-punawale.html">Pediatric Dentistry</a>
          <a href="${root}teeth-cleaning-scaling-punawale.html">Teeth Cleaning</a>
          <a href="${root}restorative-dentistry-punawale.html">Restorative Fillings</a>
          <a href="${root}emergency-dental-care-punawale.html">Emergency Dental Care</a>
          <a href="${root}dental-tourism-pune.html">Dental Tourism</a>
          <a href="${root}dental-treatment-costs-punawale.html">Treatment Costs</a>
          <a href="${root}service-areas.html">Areas We Serve</a>
          <a href="${root}blog/dental-clinic-faq.html">FAQs</a>
          <a href="${root}blog/index.html">Blog</a>
          <a href="${root}sitemap.html">HTML Sitemap</a>
          <a href="${root}contact-us.html">Contact Us</a>
          <a href="${root}privacy-policy.html">Privacy Policy</a>
        </div>
        <p class="footer-copy" style="text-align:center;font-size:0.86rem;line-height:1.7;color:#94a3b8;margin-top:1rem;">
          &copy; ${year} Aesthetica Dental Clinic &middot;
          1st floor, Shop no 103, Swaraaj Heights, Kate Wasti Rd, opp. Legacy IVy, Kate Wasti, Punawale, Pimpri-Chinchwad, Maharashtra 411033<br>
          Phone: <a href="tel:+919226680164" style="color:#38bdf8;text-decoration:none;">092266 80164</a> &middot;
          Hours: Monday-Sunday 10:15 am–8:30 pm
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
     INTERACTIVE TOOL: DENTAL COST ESTIMATOR & EMI CALCULATOR
  ══════════════════════════════════════════════════════════════════════ */
  function initCostCalculator() {
    const rootEl = document.getElementById('dental-cost-calculator');
    if (!rootEl) return;

    const treatments = {
      rct: { name: 'Single-Sitting Root Canal (Rotary)', minINR: 3500, maxINR: 5500, perTooth: true },
      crown: { name: 'Zirconia Crown (CAD/CAM Metal-Free)', minINR: 6500, maxINR: 10000, perTooth: true },
      implant: { name: 'Dental Implant (Titanium + Abutment)', minINR: 25000, maxINR: 35000, perTooth: true },
      aligner: { name: 'Clear Aligners (Invisible Braces)', minINR: 60000, maxINR: 95000, perTooth: false },
      whitening: { name: 'Professional Teeth Whitening', minINR: 4000, maxINR: 7000, perTooth: false },
      scaling: { name: 'Ultrasonic Teeth Cleaning & Polishing', minINR: 800, maxINR: 1500, perTooth: false }
    };

    const rates = { INR: 1, USD: 0.012, AED: 0.044, GBP: 0.0095 };
    const symbols = { INR: '₹', USD: '$', AED: 'AED ', GBP: '£' };

    let currentCur = 'INR';
    const selectEl = rootEl.querySelector('#calc-treatment-select');
    const qtySlider = rootEl.querySelector('#calc-qty-slider');
    const qtyVal = rootEl.querySelector('#calc-qty-val');
    const displayEl = rootEl.querySelector('#calc-price-display');
    const emiEl = rootEl.querySelector('#calc-emi-badge');
    const ctaBtn = rootEl.querySelector('#calc-wa-cta');
    const pills = rootEl.querySelectorAll('.currency-pill');

    function update() {
      const key = selectEl ? selectEl.value : 'rct';
      const t = treatments[key] || treatments.rct;
      const qty = t.perTooth && qtySlider ? parseInt(qtySlider.value, 10) : 1;
      
      if (qtySlider) {
        qtySlider.disabled = !t.perTooth;
        if (qtyVal) qtyVal.textContent = t.perTooth ? `${qty} Tooth/Teeth` : 'Full Procedure';
      }

      const totalMinINR = t.minINR * qty;
      const totalMaxINR = t.maxINR * qty;

      const rate = rates[currentCur] || 1;
      const sym = symbols[currentCur] || '₹';

      const dispMin = Math.round(totalMinINR * rate).toLocaleString();
      const dispMax = Math.round(totalMaxINR * rate).toLocaleString();

      if (displayEl) displayEl.textContent = `${sym}${dispMin} – ${sym}${dispMax}`;

      const emiINR = Math.round(totalMinINR / 6).toLocaleString();
      if (emiEl) emiEl.textContent = `Or ₹${emiINR} / mo (No-Cost EMI Available)`;

      if (ctaBtn) {
        const msg = encodeURIComponent(`Hello Dr. Prachi, I used the online cost calculator for ${t.name} (Estimated ${sym}${dispMin} - ${sym}${dispMax}). I would like to schedule a consultation.`);
        ctaBtn.href = `https://wa.me/919226680164?text=${msg}`;
      }
    }

    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        currentCur = p.getAttribute('data-cur') || 'INR';
        update();
      });
    });

    if (selectEl) selectEl.addEventListener('change', update);
    if (qtySlider) qtySlider.addEventListener('input', update);
    update();
  }

  /* ══════════════════════════════════════════════════════════════════════
     INTERACTIVE TOOL: EMERGENCY SYMPTOM CHECKER & TRIAGE
  ══════════════════════════════════════════════════════════════════════ */
  function initSymptomChecker() {
    const rootEl = document.getElementById('symptom-checker');
    if (!rootEl) return;

    let painType = 'throbbing';
    let nightPain = 'yes';
    let visible = 'swelling';

    const painOptions = rootEl.querySelectorAll('[data-pain]');
    const nightOptions = rootEl.querySelectorAll('[data-night]');
    const visibleOptions = rootEl.querySelectorAll('[data-visible]');

    const badgeEl = rootEl.querySelector('#triage-badge');
    const titleEl = rootEl.querySelector('#triage-title');
    const adviceEl = rootEl.querySelector('#triage-advice');
    const ctaBtn = rootEl.querySelector('#triage-wa-cta');

    function evaluate() {
      let dx = 'Acute Dental Pulpitis (Infected Tooth Nerve)';
      let urgency = 'urgency-high';
      let urgencyText = '🚨 High Urgency — Same Day RCT Recommended';
      let advice = 'The infection has reached the internal tooth pulp. Pain radiates when lying down. Modern single-sitting rotary RCT completely removes the infected nerve under targeted anesthesia, stopping pain in 45 minutes.';

      if (visible === 'swelling') {
        dx = 'Periapical Abscess / Active Infection';
        urgency = 'urgency-high';
        urgencyText = '🚨 Urgent — Immediate Drainage & Evaluation Required';
        advice = 'Facial or gum swelling indicates active infection spreading beyond the root apex. Please call or visit immediately. Keep head elevated, apply a cold compress externally, and do NOT apply heat.';
      } else if (painType === 'sharp' && nightPain === 'no') {
        dx = 'Dental Enamel Sensitivity / Early Cavity';
        urgency = 'urgency-med';
        urgencyText = '⚠️ Moderate — Dental Checkup Advised';
        advice = 'Likely exposed dentin or early cavity. Avoid ice-cold or very sweet foods. An in-clinic fluoride varnish or composite filling can seal the tooth and prevent root canal need.';
      } else if (painType === 'trauma') {
        dx = 'Traumatic Tooth Fracture / Chipped Tooth';
        urgency = 'urgency-high';
        urgencyText = '🚨 Urgent — Tooth Preservation Critical';
        advice = 'Broken tooth structure leaves nerve exposed to oral bacteria. Prompt restorative bonding or crown placement preserves tooth vitality.';
      }

      if (badgeEl) {
        badgeEl.className = `triage-urgency-badge ${urgency}`;
        badgeEl.textContent = urgencyText;
      }
      if (titleEl) titleEl.textContent = dx;
      if (adviceEl) adviceEl.textContent = advice;
      if (ctaBtn) {
        const msg = encodeURIComponent(`Hello Dr. Prachi, I completed the emergency symptom triage on your website. Result: "${dx}". Symptoms: ${painType} pain, night pain: ${nightPain}, physical signs: ${visible}. Please let me know when I can visit.`);
        ctaBtn.href = `https://wa.me/919226680164?text=${msg}`;
      }
    }

    function setupGroup(options, setter) {
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          setter(opt.getAttribute('data-val'));
          evaluate();
        });
      });
    }

    setupGroup(painOptions, val => { painType = val; });
    setupGroup(nightOptions, val => { nightPain = val; });
    setupGroup(visibleOptions, val => { visible = val; });

    evaluate();
  }

  /* ══════════════════════════════════════════════════════════════════════
     INTERACTIVE BEFORE/AFTER CASE SLIDER
  ══════════════════════════════════════════════════════════════════════ */
  function initBeforeAfterSliders() {
    const containers = document.querySelectorAll('.ba-compare-container');
    containers.forEach(container => {
      const visual = container.querySelector('.ba-slider-visual');
      const divider = container.querySelector('.ba-divider');
      const afterLayer = container.querySelector('.ba-after-layer');
      if (!visual || !divider || !afterLayer) return;

      let isDragging = false;

      function updatePosition(clientX) {
        const rect = visual.getBoundingClientRect();
        let posX = clientX - rect.left;
        if (posX < 0) posX = 0;
        if (posX > rect.width) posX = rect.width;
        const percent = (posX / rect.width) * 100;
        divider.style.left = `${percent}%`;
        afterLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        updatePosition(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
      }

      function stopDrag() {
        isDragging = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', stopDrag);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', stopDrag);
      }

      divider.addEventListener('pointerdown', e => {
        isDragging = true;
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', stopDrag);
      });

      divider.addEventListener('touchstart', e => {
        isDragging = true;
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', stopDrag);
      }, { passive: true });

      visual.addEventListener('click', e => {
        updatePosition(e.clientX);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     POST-OPERATIVE CARE PRINT & SHARE HELPER
  ══════════════════════════════════════════════════════════════════════ */
  function initPostOpPrint() {
    const printBtns = document.querySelectorAll('.print-care-btn');
    printBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.print();
      });
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
    initCostCalculator();
    initSymptomChecker();
    initBeforeAfterSliders();
    initPostOpPrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
