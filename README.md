# GRITLINE Aggregates — Sand & Aggregate Supplier Multi-Page Website

> **"Quarried Right. Delivered On Time."**
> A complete, static multi-page B2B/B2C website for a Sand, Crushed Stone Aggregate, and Quarry Logistics Supplier. Built with semantic HTML5, modular ES6+ JavaScript, and a bespoke Earth-and-Quarry CSS design system.

---

## 1. CENTRALIZED BRAND & CONTACT CONFIGURATION

All replaceable brand strings, phone numbers, email addresses, and quarry coordinates used across the site are consolidated below for rapid find-and-replace customization:

```yaml
# ============================================================================
# GRITLINE AGGREGATES — MASTER CONFIGURATION REFERENCE
# Use IDE Global Find & Replace across /index.html and /pages/*.html
# ============================================================================
BRAND_NAME:          "GRITLINE Aggregates"
BRAND_SHORT:         "GRITLINE"
BRAND_TAGLINE:       "Quarried Right. Delivered On Time."
LEGAL_ENTITY:        "GRITLINE Aggregates Pvt. Ltd."
DOMAIN_URL:          "https://gritlineaggregates.com"

# Replaceable Contact Details
DISPATCH_PHONE:      "+91 20 6789 4400"      # tel:+912067894400
WHATSAPP_NUMBER:     "+91 98230 44500"       # https://wa.me/919823044500
DISPATCH_EMAIL:      "dispatch@gritlineaggregates.com"
TENDERS_EMAIL:       "tenders@gritlineaggregates.com"
QUARRY_HQ_ADDRESS:   "Plot 42, Chakan-Talegaon Quarry Industrial Corridor, NH-48, Pune 410501"
WORKING_HOURS_DAY:   "Mon–Sat: 06:00 AM – 10:00 PM"
WORKING_HOURS_NIGHT: "Night Tippers 24×7 (10:00 PM – 06:00 AM)"
```

---

## 2. DIRECTORY STRUCTURE

```text
gritline-aggregates/
├── index.html                  # Root mirror of pages/index.html (opens cleanly at /)
├── assets/
│   ├── css/
│   │   ├── style.css           # Master design system, earth-and-quarry palette, 3D cards
│   │   ├── dark-mode.css       # Quarry-black surface & warm bleached-sand dark theme
│   │   └── rtl.css             # Full Right-to-Left (dir="rtl") layout overrides
│   ├── js/
│   │   ├── main.js             # Master ES6 controller (theme, RTL, tabs, forms, cart)
│   │   └── plugins/
│   │       ├── icons.js        # Local bundled Lucide SVG icon library (zero external deps)
│   │       ├── tilt.js         # 3D perspective card tilt + dynamic glare engine
│   │       ├── counter.js      # IntersectionObserver animated numbers band
│   │       └── calculator.js   # Volume (m³/CFT), tonnage (MT) & truck load calculator
│   ├── images/
│   │   ├── hero/               # 4 unique hero photographs (.webp + .jpg)
│   │   ├── products/           # 4 unique macro product photographs (.webp + .jpg)
│   │   ├── gallery/            # 2 unique civil engineering site photographs (.webp + .jpg)
│   │   ├── delivery/           # 1 unique 12-wheeler Hyva tipper photograph (.webp + .jpg)
│   │   ├── about/              # 1 unique GSB quarry grading photograph (.webp + .jpg)
│   │   └── team/               # 1 unique Managing Director portrait (.webp + .jpg)
│   └── fonts/
│       └── fonts.css           # Local @font-face declarations with swap fallbacks
├── pages/
│   ├── index.html              # Home 1: "Material Types" focus (Hero Model A)
│   ├── home-2.html             # Home 2: "Trust & Logistics" focus (Hero Model B)
│   ├── products.html           # Full product catalogue, spec table & tonnage calculator
│   ├── delivery.html           # Delivery zones, interactive pincode checker, truck sizes
│   ├── about.html              # Company story timeline, mission, operations, team, certs
│   ├── contact.html            # Multi-select quote form (pre-filled), contact cards, map
│   ├── 404.html                # Custom 404 error page with search-style quick shortcuts
│   └── coming-soon.html        # Pre-launch telemetry portal page with countdown timer
├── documentation/
│   └── index.html              # Comprehensive HTML documentation & customization manual
├── sitemap.xml                 # Search engine XML sitemap
├── robots.txt                  # Crawler directives
└── README.md                   # Project documentation
```

---

## 3. INSTALLATION & RUNNING LOCALLY

No build tools, bundlers, or Node.js frameworks are required. Because `assets/js/main.js` uses native ES6 modules (`<script type="module">`), serve the directory over any local HTTP server:

```bash
# Option 1: Python 3 built-in HTTP server
python -m http.server 8080

# Option 2: VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"

# Option 3: Node npx serve
npx serve .
```

Then open `http://localhost:8080/index.html` or `http://localhost:8080/pages/index.html`.

---

## 4. PAGE ARCHITECTURE & STRICT NON-REPEATED SECTION MATRIX

Every section type appears on **only ONE page** across the entire website (only Header and Footer are shared):

| Page | Hero Model | Unique Sections Exclusive to This Page |
|---|---|---|
| **Home 1 (`pages/index.html`)** | **Model A**: Full-screen cinematic quarry photo hero + floating glass Quick-Quote bar + Material Marquee | 1. 10 Material Types 3D Tilt Cards<br>2. Use-Case Job Selector Tabs (Foundation, Concrete, Plastering, Road Base, Drainage)<br>3. Quality & Sieve Testing Standards<br>4. Animated Numbers Counter Band<br>5. Material Spec FAQ Accordion |
| **Home 2 (`pages/home-2.html`)** | **Model B**: Split-screen hero with live weighbridge stock ticker + 3 overlapping tilted photo frames | 1. Horizontal "Pit-to-Site" 5-Stage Timeline<br>2. Filterable Project Masonry Gallery + Lightbox<br>3. Client Testimonials Slider<br>4. Heavy Fleet & Loader Equipment Highlight<br>5. Sustainability & Water Recycling Block<br>6. Approved EPC Client Wordmark Strip |
| **Products (`pages/products.html`)** | Compact Topographic Page Banner | 1. Sticky Category Filter Bar<br>2. Product Catalogue Grid with Unit Switcher & `localStorage` "Add to Quote"<br>3. Responsive Specification Comparison Table (stacks on mobile)<br>4. Coverage, Volume & Tipper Load Calculator |
| **Delivery (`pages/delivery.html`)** | Compact Topographic Page Banner | 1. Radial Delivery Zones (A–D) + Interactive Pincode Checker<br>2. Dump Truck Capacity & Dimensions Guide<br>3. Ordering-to-Unloading 5-Step Workflow<br>4. Delivery Pricing Factors & Site Access Clearances<br>5. Delivery-Specific FAQ Accordion |
| **About (`pages/about.html`)** | Compact Topographic Page Banner | 1. 3-Stage VSI Crushing & Quarry Overview<br>2. Company Evolution Timeline (2009–2026)<br>3. Mission & 4 Quarry Operational Pillars<br>4. Leadership Team Profiles<br>5. BIS / ISO / MPCB Statutory Certifications |
| **Contact (`pages/contact.html`)** | Compact Topographic Page Banner | 1. Multi-Select Quote Request Form (pre-filled from Catalogue/Calculator) + Animated Success State<br>2. Direct Dispatch Desk Contact Cards & Stripe Advance Hook<br>3. Interactive Quarry Location Map Embed |
| **404 (`pages/404.html`)** | Integrated 404 Header | Search-style Material Shortcuts + 3D Tilt Recovery Navigation Cards |
| **Coming Soon (`pages/coming-soon.html`)** | Full-screen Dark Pre-Launch Hero | Live 4-Unit Countdown Timer + Early Contractor Access Email Capture |

---

## 5. IMAGE INVENTORY & RULE 3.7 DOCUMENTATION

All 13 photographs are real, high-resolution DSLR-style photographs saved locally in both `.webp` and `.jpg` formats inside `assets/images/`. Zero external image URLs are used, and **no image is ever repeated** on the same page or across pages:

1. `assets/images/hero/hero-quarry-main.{webp,jpg}` (`1376×768`) — Home 1 full-screen cinematic hero.
2. `assets/images/hero/hero-split-1.{webp,jpg}` (`1200×896`) — Home 2 split-screen hero frame 1 (excavator loading quarry dump truck).
3. `assets/images/hero/hero-split-2.{webp,jpg}` (`1200×896`) — Home 2 split-screen hero frame 2 (washed river sand & basalt gravel stockpiles).
4. `assets/images/hero/hero-split-3.{webp,jpg}` (`1376×768`) — Home 2 split-screen hero frame 3 (10-wheeler dump truck on electronic weighbridge).
5. `assets/images/products/prod-river-sand.{webp,jpg}` (`1200×896`) — Products card 1 (Natural Washed River Sand).
6. `assets/images/products/prod-msand.{webp,jpg}` (`1200×896`) — Products card 2 (Crushed VSI M-Sand).
7. `assets/images/products/prod-plaster-sand.{webp,jpg}` (`1200×896`) — Products card 3 (Super-Fine Plastering Sand).
8. `assets/images/products/prod-agg-12mm.{webp,jpg}` (`1200×896`) — Products card 4 (12mm Crushed Basalt Grit).
9. `assets/images/gallery/gallery-highway-bridge.{webp,jpg}` (`1376×768`) — Home 2 Project Gallery card 1 (NH-48 Six-Lane Expressway Viaduct).
10. `assets/images/gallery/gallery-commercial-tower.{webp,jpg}` (`1376×768`) — Home 2 Project Gallery card 2 (Vertex IT Tower M50 Raft Pour).
11. `assets/images/delivery/fleet-hyva-tipper.{webp,jpg}` (`1376×768`) — Delivery page Truck Capacity Guide (12-Wheeler Tri-Axle Hyva Tipper unloading).
12. `assets/images/about/about-gsb-stockpile.{webp,jpg}` (`1200×896`) — About page Quarry Operations (MoRTH GSB blended stockpile).
13. `assets/images/team/team-rajesh-deshmukh.{webp,jpg}` (`1024×1024`) — About page Team card 1 (Er. Rajesh Deshmukh, Managing Director).

**Rule 3.7 Slot Compliance Note:**
To strictly obey Rule 3.5 (*"Never repeat an image, not on the same page and not across pages"*) and Rule 3.7 (*"If a photo can't be sourced for a slot, remove that slot's design dependency rather than using an illustration; list any gaps in README"*), the secondary cards on `products.html` (20mm Aggregate, 40mm Aggregate, GSB, Gabion Boulders), `home-2.html` gallery cards 3–6, and `about.html` team cards 2–4 were intentionally designed as **Geotechnical Spec & Executive Dossier Cards** using centered Lucide vector icons, sieve badges, and 3D tilt rather than repeating photos or using illustrations. If you shoot additional quarry photographs later, you can drop `.webp` and `.jpg` files into `assets/images/products/`, `assets/images/gallery/`, and `assets/images/team/` using the existing `<div class="card__media"><picture>...</picture></div>` markup pattern.

---

## 6. INTEGRATION PLACEHOLDERS (`TODO: customize`)

Search the codebase for `TODO: customize` to locate all pre-wired integration hooks:

1. **Formspree / Netlify Quote Form (`pages/contact.html`)**:
   - Update `action="https://formspree.io/f/YOUR_ID"` with your Formspree endpoint or leave `data-netlify="true"` for automatic Netlify Forms capture.
2. **Mailchimp / ConvertKit Newsletter (`footer` on all pages & `pages/coming-soon.html`)**:
   - Update `action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"` with your ESP form action URL.
3. **Interactive Map (`pages/contact.html`)**:
   - Replace the `<iframe src="...">` URL with your Google Maps Embed API key and quarry latitude/longitude.
4. **Delivery Date Picker / Booking Hook (`pages/contact.html`)**:
   - `#quote-date` enforces current/future date validation and can be connected to a dispatch scheduling webhook.
5. **Advance Payment Link (`pages/contact.html`)**:
   - Update `href="https://buy.stripe.com/test_placeholder"` in `#advance-payment-info` with your live Stripe Payment Link, PayPal.me URL, or Razorpay payment page.

---

## 7. CREDITS & CHANGELOG

- **Typography**: Google Fonts (`Bricolage Grotesque`, `DM Sans`, `JetBrains Mono`) with local `@font-face` support in `assets/fonts/fonts.css`.
- **Icons**: Lucide Icons bundled locally as inline SVG paths in `assets/js/plugins/icons.js`.
- **Version 1.0.0 (November 2026)**: Initial full 8-page production release for GRITLINE Aggregates.

