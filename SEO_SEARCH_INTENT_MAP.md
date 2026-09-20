# Aesthetica Dental Clinic — Search Intent & Conversion Architecture Map

**Domain**: `https://aestheticadental.github.io/`  
**Purpose**: Align every indexable URL with patient search psychology, clinical need, and conversion journey.  
**Search Intent Categories**:
- **Commercial / Transactional**: Ready to book, seeking specific treatment, checking dentist credentials.
- **Commercial Investigation**: Comparing treatment options, evaluating costs, analyzing clinic quality.
- **Informational**: Researching symptoms, understanding procedures, looking for post-care instructions.
- **Urgent**: In pain, acute dental emergency, looking for same-day walk-in clinic.
- **Navigational**: Direct brand search, clinic phone number, address, opening hours.

---

## 1. Core Clinic Hubs

### 1. `index.html` (Homepage)
- **Primary Intent**: Navigational & Local Commercial Search
- **Primary Topic**: Aesthetica Dental Clinic, Punawale, Pune
- **Secondary Topics**: Family dentistry, painless treatments, Dr. Prachi Gupta Garg, clinic address, open 7 days.
- **Target Audience**: Local residents in Punawale, Kate Wasti, Marunji, Tathawade, Wakad seeking a trusted dental clinic.
- **Conversion Goal**: Book consultation via WhatsApp / Phone call; navigate to specific treatment.
- **Parent Hub**: Self (Root)
- **Supporting Pages**: `about-us.html`, `services.html`, `service-areas.html`, `dental-treatment-costs-punawale.html`.
- **Related Pages**: All clinical service pillars.
- **Intent Conflict Resolution**: Consolidate doorway page `dentist-near-me-punawale-pune.html` into homepage.

### 2. `services.html` (All Services Hub)
- **Primary Intent**: Commercial Investigation & Directory Navigation
- **Primary Topic**: Comprehensive Dental Treatments in Punawale
- **Secondary Topics**: Specialities overview (Endodontics, Orthodontics, Prosthodontics, Implantology, Pediatric).
- **Target Audience**: Patients seeking an overview of available treatments and clinical capabilities.
- **Conversion Goal**: Click through to specific clinical service pillar; schedule initial checkup.
- **Parent Hub**: `index.html`
- **Supporting Pages**: All 9 clinical service pillars.
- **Related Pages**: `dental-treatment-costs-punawale.html`, `about-dr-prachi-gupta-garg.html`.

---

## 2. Clinical Treatment Pillars

### 3. `root-canal-treatment-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Painless Single-Sitting Root Canal Treatment (RCT) in Punawale
- **Secondary Topics**: Rotary endodontics, digital apex locators, dental cap requirement, tooth infection relief.
- **Target Audience**: Patients with throbbing toothache, deep decay, infected pulp, or cracked tooth.
- **Conversion Goal**: Schedule immediate endodontic consultation; alleviate tooth pain.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/cost-of-root-canal-in-punawale.html`, `blog/signs-you-need-root-canal.html`, `blog/painless-root-canal-treatment-punawale.html`.
- **Related Pages**: `what-is-a-dental-crown.html`, `emergency-dental-care-punawale.html`, `dental-treatment-costs-punawale.html`.
- **Intent Conflict Resolution**: Consolidated older duplicate `root-canal-punawale.html` to this page.

### 4. `dental-implants-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Dental Implants in Punawale, Pune
- **Secondary Topics**: Permanent tooth replacement, titanium implants, implant crown, full mouth rehabilitation, bone grafting.
- **Target Audience**: Patients missing one, several, or all teeth; denture wearers seeking fixed teeth.
- **Conversion Goal**: Book 3D implant assessment and digital scan consultation.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/dental-implants-punawale.html`, `dental-tourism-pune.html`.
- **Related Pages**: `veneers-punawale.html`, `dental-treatment-costs-punawale.html`, `what-is-a-dental-crown.html`.
- **Intent Conflict Resolution**: Serves as the primary transactional pillar; blog post acts as informational Q&A.

### 5. `clear-aligners-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Clear Aligners & Invisible Braces in Punawale
- **Secondary Topics**: Malocclusion, crooked teeth straightening, invisible trays, 3D scanning, adult orthodontics.
- **Target Audience**: Adults, working professionals, and teens seeking discreet teeth straightening without metal wires.
- **Conversion Goal**: Book digital smile scan & clear aligner consultation.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/dental-clinic-faq.html`.
- **Related Pages**: `teeth-whitening-punawale.html`, `pediatric-dentist-punawale.html`, `dental-treatment-costs-punawale.html`.
- **Intent Conflict Resolution**: Consolidated older duplicate `aligners-punawale.html` into this page.

### 6. `teeth-whitening-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Professional In-Clinic Teeth Whitening in Punawale
- **Secondary Topics**: Enamel stains, tea/coffee discoloration removal, safe bleaching, laser/LED whitening.
- **Target Audience**: Individuals with discolored teeth preparing for weddings, interviews, or aesthetic enhancement.
- **Conversion Goal**: Book same-day teeth whitening session.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/what-is-teeth-whitening-punawale.html`.
- **Related Pages**: `veneers-punawale.html`, `teeth-cleaning-scaling-punawale.html`.
- **Intent Conflict Resolution**: Retained as primary commercial pillar; educational science post lives on distinct blog URL.

### 7. `veneers-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Porcelain Veneers & Cosmetic Smile Makeovers in Punawale
- **Secondary Topics**: Composite veneers, chipped tooth correction, midline diastema closure, aesthetic crowns.
- **Target Audience**: Patients looking to reshape worn, chipped, stained, or uneven front teeth.
- **Conversion Goal**: Book cosmetic smile design consultation.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `what-is-a-dental-crown.html`.
- **Related Pages**: `teeth-whitening-punawale.html`, `clear-aligners-punawale.html`, `dental-implants-punawale.html`.

### 8. `pediatric-dentist-punawale.html`
- **Primary Intent**: Commercial / Transactional
- **Primary Topic**: Pediatric Dentistry & Gentle Child Dental Care in Punawale
- **Secondary Topics**: Milk tooth fillings, painless pulpectomy, pit & fissure sealants, fluoride therapy, child habit breaking.
- **Target Audience**: Parents in Punawale, Wakad, and Tathawade seeking a gentle, patient dentist for their children.
- **Conversion Goal**: Book child's dental checkup or urgent toothache relief.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/dental-clinic-faq.html`.
- **Related Pages**: `restorative-dentistry-punawale.html`, `emergency-dental-care-punawale.html`.
- **Intent Conflict Resolution**: Consolidated British-spelling duplicate `paediatric-dentist-punawale.html` to this canonical URL.

### 9. `teeth-cleaning-scaling-punawale.html`
- **Primary Intent**: Commercial / Preventative
- **Primary Topic**: Teeth Cleaning & Ultrasonic Scaling in Punawale
- **Secondary Topics**: Plaque removal, tartar scaling, gum bleeding treatment, bad breath (halitosis) cure, polishing.
- **Target Audience**: Routine preventative dental patients; individuals with swollen gums or bleeding while brushing.
- **Conversion Goal**: Book scaling & polishing appointment.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `dental-cleaning-cost-punawale.html`.
- **Related Pages**: `restorative-dentistry-punawale.html`, `teeth-whitening-punawale.html`.

### 10. `restorative-dentistry-punawale.html`
- **Primary Intent**: Commercial / Restorative
- **Primary Topic**: Restorative Dentistry & Composite Fillings in Punawale
- **Secondary Topics**: Tooth-colored restorations, silver filling replacement, dental inlays, onlays, bonding.
- **Target Audience**: Patients with dental cavities, food lodgement, chipped enamel, or worn fillings.
- **Conversion Goal**: Book cavity filling consultation.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `what-is-a-dental-crown.html`.
- **Related Pages**: `root-canal-treatment-punawale.html`, `teeth-cleaning-scaling-punawale.html`.

### 11. `emergency-dental-care-punawale.html`
- **Primary Intent**: Urgent / Transactional
- **Primary Topic**: Emergency Dental Care & Same-Day Relief in Punawale
- **Secondary Topics**: Severe acute toothache, knocked-out tooth, broken tooth, facial swelling, urgent walk-ins.
- **Target Audience**: Patients experiencing unbearable sudden oral pain or trauma requiring same-day treatment.
- **Conversion Goal**: Instant phone call / WhatsApp for immediate walk-in guidance.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `blog/tooth-pain-at-night-punawale.html`.
- **Related Pages**: `root-canal-treatment-punawale.html`, `contact-us.html`.

---

## 3. Patient Resources & Pricing

### 12. `dental-treatment-costs-punawale.html`
- **Primary Intent**: Commercial Investigation & Pricing Transparency
- **Primary Topic**: Dental Treatment Costs & Price List in Punawale, Pune
- **Secondary Topics**: RCT costs, implant prices, aligners EMI, crown pricing, no hidden fee pledge.
- **Target Audience**: Cost-conscious patients seeking honest upfront price ranges before committing to treatment.
- **Conversion Goal**: Inquire about personalized quote / EMI options on WhatsApp.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `dental-cleaning-cost-punawale.html`, `blog/cost-of-root-canal-in-punawale.html`.
- **Related Pages**: All clinical service pillars.

### 13. `dental-cleaning-cost-punawale.html`
- **Primary Intent**: Commercial Investigation
- **Primary Topic**: Teeth Cleaning Cost & Scaling Charges in Punawale, Pune
- **Secondary Topics**: Regular scaling cost vs deep subgingival scaling, polishing charges, insurance coverage.
- **Target Audience**: Patients researching exact costs for professional teeth cleaning.
- **Conversion Goal**: Book teeth cleaning appointment.
- **Parent Hub**: `dental-treatment-costs-punawale.html`
- **Supporting Pages**: `teeth-cleaning-scaling-punawale.html`.

### 14. `dental-x-ray-near-me.html`
- **Primary Intent**: Local Diagnostic Search
- **Primary Topic**: Digital Dental X-Ray (RVG) in Punawale, Pune
- **Secondary Topics**: Low-radiation X-rays, instant chairside sensor radiography, diagnostic precision.
- **Target Audience**: Patients needing rapid dental X-rays for toothache diagnosis or orthodontic planning.
- **Conversion Goal**: Walk in for instant diagnostic digital X-ray.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `root-canal-treatment-punawale.html`, `dental-implants-punawale.html`.

### 15. `what-is-a-dental-crown.html`
- **Primary Intent**: Educational / Informational
- **Primary Topic**: Dental Crown Types, Procedure & Costs
- **Secondary Topics**: Zirconia vs PFM vs Ceramic crowns, tooth cap after root canal, tooth protection.
- **Target Audience**: Patients advised to get a dental crown who want to compare materials and longevity.
- **Conversion Goal**: Select crown material and schedule crown placement.
- **Parent Hub**: `services.html`
- **Supporting Pages**: `root-canal-treatment-punawale.html`, `veneers-punawale.html`.

### 16. `blog/dental-clinic-faq.html`
- **Primary Intent**: Informational Research
- **Primary Topic**: Comprehensive Dental Health & Treatment FAQs
- **Secondary Topics**: Pain concerns, healing times, appointments, walk-ins, payment methods.
- **Target Audience**: Prospective patients with questions before their first clinic visit.
- **Conversion Goal**: Clear doubts and transition to WhatsApp consultation.
- **Parent Hub**: `services.html`

---

## 4. International Patients & Dental Tourism Cluster

### 17. `dental-tourism-pune.html`
- **Primary Intent**: Commercial Dental Tourism
- **Primary Topic**: Dental Tourism in Pune, India
- **Secondary Topics**: Cost savings (up to 70% vs UK/US/Australia), high-grade sterilization, implant packages.
- **Target Audience**: Overseas patients and tourists planning dental work abroad.
- **Conversion Goal**: Request a remote pre-travel dental assessment via WhatsApp/Email.
- **Parent Hub**: `index.html`
- **Supporting Pages**: All 7 international guides below.
- **Related Pages**: `dental-implants-punawale.html`, `veneers-punawale.html`.

### 18. `dental-treatment-in-india.html`
- **Primary Intent**: Informational / Trust Building
- **Primary Topic**: Quality & Safety Standards of Dental Care in India
- **Secondary Topics**: English-speaking doctors, international dental materials (Straumann, Nobel Biocare), sterilization.
- **Target Audience**: Foreign patients evaluating whether dental care in India is safe and reliable.
- **Conversion Goal**: Contact clinic for hospital credential verification.
- **Parent Hub**: `dental-tourism-pune.html`

### 19. `how-long-to-stay-in-pune-for-dental-treatment.html`
- **Primary Intent**: Informational Logistics
- **Primary Topic**: Required Stay Duration for Dental Procedures in Pune
- **Secondary Topics**: Day-by-day schedules for single crowns (3–5 days), implants (immediate vs delayed loading), veneers.
- **Target Audience**: Overseas patients planning flight bookings and hotel stay in Pune.
- **Conversion Goal**: Submit treatment requirements to get a custom stay timeline.
- **Parent Hub**: `dental-tourism-pune.html`

### 20. `how-to-plan-dental-treatment-during-india-trip.html`
- **Primary Intent**: Informational Planning
- **Primary Topic**: How to Plan Dental Appointments During an India Trip
- **Secondary Topics**: Scheduling first appointments on arrival, coordinating family visits, follow-up buffers.
- **Target Audience**: Diaspora and international travelers planning a combined personal/dental trip.
- **Conversion Goal**: Book pre-trip appointment slots.
- **Parent Hub**: `dental-tourism-pune.html`

### 21. `nri-dental-care-pune.html`
- **Primary Intent**: Commercial / Demographic
- **Primary Topic**: NRI Dental Care & Smile Makeovers in Pune
- **Secondary Topics**: Holiday treatment packages, fast-track appointments, zero waiting time, digital follow-up.
- **Target Audience**: Non-Resident Indians (US, UK, UAE, Canada, Australia) visiting Pune during vacations.
- **Conversion Goal**: Book priority vacation treatment slot.
- **Parent Hub**: `dental-tourism-pune.html`

### 22. `pune-vs-mumbai-dental-treatment.html`
- **Primary Intent**: Commercial Investigation
- **Primary Topic**: Pune vs Mumbai Dental Care: Cost, Transit & Comfort
- **Secondary Topics**: Express highway transit from Mumbai airport, lower accommodation costs, relaxed pace.
- **Target Audience**: International patients comparing whether to stay in Mumbai or travel 2.5 hours to Pune.
- **Conversion Goal**: Inquire about Pune airport pickup and clinic consultation.
- **Parent Hub**: `dental-tourism-pune.html`

### 23. `combine-holiday-with-dental-treatment-india.html`
- **Primary Intent**: Informational Leisure
- **Primary Topic**: Combining Vacation & Holiday with Dental Care in Maharashtra
- **Secondary Topics**: Local sightseeing in Pune, Lonavala hill station, Western Ghats, culinary tours.
- **Target Audience**: Overseas dental tourists seeking leisure alongside dental procedures.
- **Conversion Goal**: Request clinic's guide on nearby accommodations and sightseeing recommendations.
- **Parent Hub**: `dental-tourism-pune.html`

### 24. `dental-records-before-traveling-to-india.html`
- **Primary Intent**: Informational Pre-Consultation
- **Primary Topic**: What Dental Records, X-Rays & Scans to Send Before Traveling
- **Secondary Topics**: Panoramic OPG, CBCT 3D DICOM files, intraoral photographs, medical history.
- **Target Audience**: Overseas patients ready to get a quote before booking flights.
- **Conversion Goal**: Email or WhatsApp digital X-rays to Dr. Prachi for evaluation.
- **Parent Hub**: `dental-tourism-pune.html`

---

## 5. Areas We Serve (Geo-Proximity Hubs)

### 25. `service-areas.html`
- **Primary Intent**: Local Navigational
- **Primary Topic**: Areas Served by Aesthetica Dental Clinic in PCMC & Pune
- **Secondary Topics**: Punawale, Hinjawadi Phase 1, Wakad, Tathawade, Ravet, Marunji.
- **Target Audience**: Patients in northwestern Pune looking for proximity to the clinic.
- **Conversion Goal**: Select neighborhood page or get driving directions on Google Maps.
- **Parent Hub**: `index.html`

### 26. `dentist-near-hinjawadi.html`
- **Primary Intent**: Local Commercial
- **Primary Topic**: Dentist Near Hinjawadi Phase 1 & IT Park
- **Secondary Topics**: 8–10 minute commute via Marunji road, evening appointments after office hours, tech worker dental care.
- **Target Audience**: IT professionals working in Hinjawadi IT companies.
- **Conversion Goal**: Book evening or weekend appointment.
- **Parent Hub**: `service-areas.html`

### 27. `dentist-near-wakad.html`
- **Primary Intent**: Local Commercial
- **Primary Topic**: Dentist Near Wakad & Bhumkar Chowk
- **Secondary Topics**: 7-minute drive via Bhumkar Chowk / Highway, dedicated parking, family dentistry.
- **Target Audience**: Families and residents of Wakad seeking uncrowded, modern dental clinic.
- **Conversion Goal**: Book appointment; get driving directions.
- **Parent Hub**: `service-areas.html`

### 28. `dentist-near-tathawade.html`
- **Primary Intent**: Local Commercial
- **Primary Topic**: Dentist Near Tathawade & JSPM Campus
- **Secondary Topics**: Proximity to Dange Chowk and college campuses, affordable preventative student care.
- **Target Audience**: Students and families residing in Tathawade.
- **Conversion Goal**: Book checkup or emergency visit.
- **Parent Hub**: `service-areas.html`

---

## 6. Dental Health Blog

### 29. `blog/index.html`
- **Primary Intent**: Educational Navigational
- **Primary Topic**: Aesthetica Dental Clinic Health & Oral Hygiene Blog
- **Secondary Topics**: Root canal guides, wisdom tooth surgery, toothache symptoms, whitening science.
- **Target Audience**: Patients seeking reliable dental advice written by registered dentists.
- **Conversion Goal**: Read article; transition to clinical consultation.
- **Parent Hub**: `index.html`

### 30. `blog/cost-of-root-canal-in-punawale.html`
- **Primary Intent**: Informational / Financial
- **Primary Topic**: Detailed Breakdown of Root Canal Costs in Punawale
- **Conversion Goal**: Book RCT appointment on `root-canal-treatment-punawale.html`.

### 31. `blog/signs-you-need-root-canal.html`
- **Primary Intent**: Informational / Symptom Self-Assessment
- **Primary Topic**: 7 Warning Signs of Nerve Damage & Tooth Infection
- **Conversion Goal**: Get tooth evaluated before abscess develops.

### 32. `blog/painless-root-canal-treatment-punawale.html`
- **Primary Intent**: Informational / Anxiety Relief
- **Primary Topic**: How Modern Rotary Instruments Eliminate Root Canal Pain
- **Conversion Goal**: Book anxiety-free root canal treatment.

### 33. `blog/tooth-pain-at-night-punawale.html`
- **Primary Intent**: Urgent Informational
- **Primary Topic**: Causes of Night Toothache & When to Seek Emergency Care
- **Conversion Goal**: Call emergency dental number (+91 92266 80164).

### 34. `blog/wisdom-tooth-extraction-punawale.html`
- **Primary Intent**: Procedural / Surgical Information
- **Primary Topic**: Surgical vs Simple Wisdom Tooth Extraction Guide
- **Conversion Goal**: Book wisdom tooth consultation & X-ray.

### 35. `blog/wisdom-tooth-pain-punawale.html`
- **Primary Intent**: Informational / Symptom Assessment
- **Primary Topic**: Recognizing Impacted Third Molar Pain & Gum Swelling
- **Conversion Goal**: Get dental X-ray to inspect tooth angulation.

### 36. `blog/what-is-teeth-whitening-punawale.html`
- **Primary Intent**: Educational Science
- **Primary Topic**: Science of Teeth Bleaching: OTC Products vs Dental Clinic
- **Conversion Goal**: Book professional whitening on `teeth-whitening-punawale.html`.

### 37. `blog/dental-implants-punawale.html`
- **Primary Intent**: Informational Research
- **Primary Topic**: Comprehensive Q&A on Dental Implants (Longevity, Success, Procedure)
- **Conversion Goal**: Book implant consultation on `dental-implants-punawale.html`.

### 38. `blog/best-dentist-near-wakad.html`
- **Primary Intent**: Commercial Comparison / Commute
- **Primary Topic**: Wakad Resident Commute Guide to Aesthetica Dental Punawale
- **Conversion Goal**: Book appointment on `dentist-near-wakad.html`.

---

## 7. Clinic Authority & Legal

### 39. `about-us.html`
- **Primary Intent**: Navigational / Clinic Trust
- **Primary Topic**: Aesthetica Dental Clinic Overview, Sterilization & Technology
- **Conversion Goal**: Visit clinic / book appointment.

### 40. `about-dr-prachi-gupta-garg.html`
- **Primary Intent**: Clinician E-E-A-T & Credential Verification
- **Primary Topic**: Dr. Prachi Gupta Garg Qualifications, Experience & Certifications
- **Conversion Goal**: Book appointment with Dr. Prachi.

### 41. `contact-us.html`
- **Primary Intent**: Direct Conversion / Location Details
- **Primary Topic**: Clinic Contact, Phone (+91 92266 80164), Map Directions, Hours
- **Conversion Goal**: Direct call or WhatsApp booking.

### 42. `privacy-policy.html`
- **Primary Intent**: Legal / Trust
- **Primary Topic**: Patient Privacy & Website Data Policy
- **Conversion Goal**: Establish institutional credibility.
