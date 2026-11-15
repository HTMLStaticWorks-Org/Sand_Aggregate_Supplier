/**
 * GRITLINE AGGREGATES — Master Application Controller (main.js)
 * ES6+ Modular Architecture. Clean production runtime. Full WCAG 2.1 AA support.
 */

import { initIcons } from './plugins/icons.js';
import { initTiltCards } from './plugins/tilt.js';
import { initCounters } from './plugins/counter.js';
import { initCalculator } from './plugins/calculator.js';

const STORAGE_KEYS = {
  THEME: 'gritline_theme',
  DIR: 'gritline_dir',
  QUOTE_ITEMS: 'gritline_quote_items',
  CALC_DATA: 'gritline_calc_data'
};

/**
 * 1. Preloader Handler (Disabled)
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.remove();
  }
}

/**
 * 2. Dark / Light Theme Toggle with System Preference Detection
 */
function initTheme() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    toggleBtns.forEach((btn) => {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light sand theme' : 'Switch to dark quarry theme'
      );
      btn.innerHTML = theme === 'dark'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    });
  };

  applyTheme(initialTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

/**
 * 3. RTL / LTR Direction Toggle
 */
function initDirection() {
  const root = document.documentElement;
  const savedDir = localStorage.getItem(STORAGE_KEYS.DIR) || 'ltr';

  const applyDir = (dir) => {
    root.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEYS.DIR, dir);
    document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute(
        'aria-label',
        dir === 'rtl' ? 'Switch layout to Left-to-Right' : 'Switch layout to Right-to-Left'
      );
    });
  };

  applyDir(savedDir);

  document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      applyDir(current === 'rtl' ? 'ltr' : 'rtl');
    });
  });
}

/**
 * 4. Sticky Header, Scroll Progress Bar & Mobile Navigation Drawer
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', scrollTop > 20);
    }
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progressBar.style.width = `${pct}%`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburgerBtn && mobileDrawer) {
    const updateMenuState = (isOpen) => {
      mobileDrawer.classList.toggle('is-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close Menu' : 'Open Menu');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Swap between Lucide menu and close (X) SVG icons
      if (isOpen) {
        hamburgerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      } else {
        hamburgerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      }
    };

    hamburgerBtn.addEventListener('click', () => {
      const willOpen = !mobileDrawer.classList.contains('is-open');
      updateMenuState(willOpen);
    });

    // Close when any navigation link inside drawer is clicked
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        updateMenuState(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        updateMenuState(false);
        hamburgerBtn.focus();
      }
    });

    // Auto-close if screen resized to desktop viewport
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileDrawer.classList.contains('is-open')) {
        updateMenuState(false);
      }
    }, { passive: true });

    // Mobile drawer accordion toggle for submenus (e.g. Home)
    const drawerToggles = mobileDrawer.querySelectorAll('.mobile-drawer__link--toggle');
    drawerToggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isExpanded));
        const subnav = btn.nextElementSibling;
        if (subnav) {
          subnav.classList.toggle('is-open', !isExpanded);
        }
      });
    });
  }

  // Accessible Dropdown Toggle on Click/Keyboard for Home 1 / Home 2 menu
  const dropdownItems = document.querySelectorAll('.nav-item--has-dropdown');
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav-link');
    if (!trigger) return;

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(open));
      }
    });
  });

  initScrollToTop();
}

/**
 * 4b. Floating Scroll to Top Button
 */
function initScrollToTop() {
  let btn = document.getElementById('scroll-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.type = 'button';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
  }

  const toggleScrollTopBtn = () => {
    if (window.scrollY > 280) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
  toggleScrollTopBtn();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 5. Custom Grain-Trail Cursor, Magnetic Buttons & Dust-Puff Button Press
 */
function initMicroInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!prefersReducedMotion && isDesktopPointer) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    let lastGrainTime = 0;
    window.addEventListener(
      'mousemove',
      (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;

        const now = performance.now();
        if (now - lastGrainTime > 65) {
          lastGrainTime = now;
          const grain = document.createElement('span');
          grain.className = 'cursor-grain';
          grain.setAttribute('aria-hidden', 'true');
          grain.style.left = `${e.clientX + (Math.random() * 10 - 5)}px`;
          grain.style.top = `${e.clientY + (Math.random() * 10 - 5)}px`;
          document.body.appendChild(grain);
          setTimeout(() => grain.remove(), 650);
        }
      },
      { passive: true }
    );

    // Subtle Magnetic CTA Buttons
    document.querySelectorAll('.btn--magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.16;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // Dust-Puff Particle Effect on Button Click
  if (!prefersReducedMotion) {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
        const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

        for (let i = 0; i < 5; i++) {
          const puff = document.createElement('span');
          puff.className = 'dust-puff';
          puff.style.left = `${x}px`;
          puff.style.top = `${y}px`;
          const angle = (Math.PI * 2 * i) / 5;
          puff.style.setProperty('--dx', `${Math.cos(angle) * 24}px`);
          puff.style.setProperty('--dy', `${Math.sin(angle) * 24}px`);
          btn.appendChild(puff);
          setTimeout(() => puff.remove(), 550);
        }
      });
    });
  }
}

/**
 * 6. Scroll Reveal via IntersectionObserver
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .card--settle');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el, idx) => {
    const delay = (idx % 4) * 70;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}

/**
 * 7. ARIA Tabs System (Home 1 Use-Case Selector)
 */
function initTabs() {
  const tablists = document.querySelectorAll('[role="tablist"]');
  tablists.forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    const activateTab = (selectedTab) => {
      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        const panelId = tab.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          panel.classList.toggle('is-active', isSelected);
          panel.hidden = !isSelected;
        }
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (e) => {
        let nextIndex = null;
        if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (nextIndex !== null) {
          e.preventDefault();
          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex]);
        }
      });
    });
  });
}

/**
 * 8. ARIA Accordion System (Material FAQ & Delivery FAQ)
 */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

/**
 * 9. Quote Cart State Manager (localStorage + Header Badge + Pre-fill)
 */
function getQuoteItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTE_ITEMS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveQuoteItems(items) {
  localStorage.setItem(STORAGE_KEYS.QUOTE_ITEMS, JSON.stringify(items));
  updateQuoteBadges();
}

function addQuoteItem(materialName, quantity = 20, unit = 'Tons') {
  const items = getQuoteItems();
  const existing = items.find((i) => i.name === materialName);
  if (existing) {
    existing.quantity = quantity;
    existing.unit = unit;
  } else {
    items.push({ name: materialName, quantity, unit });
  }
  saveQuoteItems(items);
}

function updateQuoteBadges() {
  const items = getQuoteItems();
  document.querySelectorAll('[data-quote-count]').forEach((badge) => {
    badge.textContent = String(items.length);
    badge.style.display = items.length > 0 ? 'inline-flex' : 'none';
  });
}

/**
 * 10. Products Page: Filter Bar, Unit Rate Switcher & Add-to-Quote
 */
function initProductsCatalogue() {
  const filterBtns = document.querySelectorAll('[data-product-filter]');
  const productCards = document.querySelectorAll('[data-product-category]');
  const productGrid = document.getElementById('products-grid');

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-product-filter');
        filterBtns.forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        if (productGrid) {
          productGrid.classList.add('is-loading-skeleton');
          setTimeout(() => {
            productGrid.classList.remove('is-loading-skeleton');
          }, 260);
        }

        productCards.forEach((card) => {
          const cardCat = card.getAttribute('data-product-category');
          const match = category === 'all' || cardCat === category;
          card.style.display = match ? 'flex' : 'none';
        });
      });
    });
  }

  // Unit Selector inside Product Cards (Ton / m³ / Load)
  document.querySelectorAll('[data-unit-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const card = select.closest('.card');
      if (!card) return;
      const priceEl = card.querySelector('[data-product-price]');
      const opt = select.options[select.selectedIndex];
      const priceText = opt.getAttribute('data-price-label');
      if (priceEl && priceText) {
        priceEl.textContent = priceText;
      }
    });
  });

  // Add to Quote Button inside Product Cards
  document.querySelectorAll('[data-add-quote]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const matName = btn.getAttribute('data-add-quote');
      const card = btn.closest('.card');
      const unitSelect = card ? card.querySelector('[data-unit-select]') : null;
      const unit = unitSelect ? unitSelect.value : 'Tons';
      const defaultQty = unit === 'Hyva Load (30 MT)' ? 1 : 25;

      addQuoteItem(matName, defaultQty, unit);

      const originalHTML = btn.innerHTML;
      btn.textContent = 'Added to Quote ✓';
      btn.classList.add('btn--secondary');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('btn--secondary');
        initIcons();
      }, 1800);
    });
  });
}

/**
 * 11. Home 2 Interactive Modules: Timeline Scroll, Gallery Filter + Lightbox, Testimonials Slider
 */
function initHome2Modules() {
  // Pit-to-Site Horizontal Timeline Scroll Buttons
  const trackWrapper = document.getElementById('pit-to-site-wrapper');
  const prevBtn = document.getElementById('timeline-prev');
  const nextBtn = document.getElementById('timeline-next');

  if (trackWrapper && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      trackWrapper.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      trackWrapper.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Project Gallery Masonry Filter
  const galBtns = document.querySelectorAll('[data-gallery-filter]');
  const galCards = document.querySelectorAll('[data-gallery-item]');
  if (galBtns.length && galCards.length) {
    galBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-gallery-filter');
        galBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
        galCards.forEach((item) => {
          const cat = item.getAttribute('data-gallery-item');
          item.style.display = filter === 'all' || cat === filter ? 'flex' : 'none';
        });
      });
    });
  }

  // Accessible Lightbox Modal for Project Gallery
  const lightbox = document.getElementById('gallery-lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbImgWrap = document.getElementById('lightbox-img-wrap');
  const lbTitle = document.getElementById('lightbox-title');
  const lbMeta = document.getElementById('lightbox-meta');
  const lbClose = document.getElementById('lightbox-close');

  if (lightbox) {
    document.querySelectorAll('[data-lightbox-open]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const title = trigger.getAttribute('data-title') || '';
        const meta = trigger.getAttribute('data-meta') || '';
        const imgSrc = trigger.getAttribute('data-img') || '';

        if (lbTitle) lbTitle.textContent = title;
        if (lbMeta) lbMeta.textContent = meta;

        if (imgSrc && lbImg && lbImgWrap) {
          lbImg.src = imgSrc;
          lbImg.alt = title;
          lbImgWrap.style.display = 'block';
        } else if (lbImgWrap) {
          lbImgWrap.style.display = 'none';
        }

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        if (lbClose) lbClose.focus();
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // Client Testimonials Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevSlideBtn = document.getElementById('testi-prev');
  const nextSlideBtn = document.getElementById('testi-next');
  const indicatorEl = document.getElementById('testi-indicator');

  if (slides.length) {
    let currentSlide = 0;
    const showSlide = (idx) => {
      currentSlide = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === currentSlide));
      if (indicatorEl) {
        indicatorEl.textContent = `${currentSlide + 1} / ${slides.length}`;
      }
    };

    if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  }
}

/**
 * 12. Delivery Page Interactive Zone Selector & Pincode Estimator
 */
function initDeliveryZoneSelector() {
  const zoneBtns = document.querySelectorAll('[data-zone-select]');
  const zoneDetailTitle = document.getElementById('zone-detail-title');
  const zoneDetailLead = document.getElementById('zone-detail-lead');
  const zoneDetailRate = document.getElementById('zone-detail-rate');
  const zoneDetailMin = document.getElementById('zone-detail-min');

  const ZONES = {
    'zone-a': {
      title: 'Zone A (0–25 km Metro & Ring Road Core)',
      lead: 'Same-Day Dispatch (3 to 5 Hours from Weighbridge)',
      rate: 'Base Quarry Rate + ₹140 / MT Freight Slab',
      min: 'Minimum Order: 1 × 6-Wheeler Tipper (10 MT)'
    },
    'zone-b': {
      title: 'Zone B (25–60 km Industrial & Suburban Corridors)',
      lead: 'Priority Next-Slot Dispatch (6 to 10 Hours)',
      rate: 'Base Quarry Rate + ₹260 / MT Freight Slab',
      min: 'Minimum Order: 1 × 10-Wheeler Tandem (20 MT)'
    },
    'zone-c': {
      title: 'Zone C (60–120 km Regional Infrastructure Belt)',
      lead: 'Scheduled 12 to 24 Hour Fleet Convoy',
      rate: 'Base Quarry Rate + ₹410 / MT Freight Slab + Actual Toll',
      min: 'Minimum Order: 1 × 12-Wheeler Tri-Axle Hyva (30 MT)'
    },
    'zone-d': {
      title: 'Zone D (120+ km Bulk Highway & EPC Project Sites)',
      lead: 'Dedicated Contract Schedule (24 to 36 Hours)',
      rate: 'Custom Project Slab via 45-MT Tractor Trailers',
      min: 'Minimum Order: 90 MT (3 × Bulk Loads)'
    }
  };

  zoneBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-zone-select');
      const data = ZONES[key];
      if (!data) return;

      zoneBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      if (zoneDetailTitle) zoneDetailTitle.textContent = data.title;
      if (zoneDetailLead) zoneDetailLead.textContent = data.lead;
      if (zoneDetailRate) zoneDetailRate.textContent = data.rate;
      if (zoneDetailMin) zoneDetailMin.textContent = data.min;
    });
  });

  // Pincode / Distance Quick Checker
  const pinForm = document.getElementById('pincode-check-form');
  const pinInput = document.getElementById('delivery-pincode-input');
  const pinResult = document.getElementById('pincode-check-result');

  if (pinForm && pinInput && pinResult) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = pinInput.value.trim();
      if (!/^\d{6}$/.test(val)) {
        pinResult.textContent = 'Please enter a valid 6-digit Indian delivery pincode (e.g. 411045).';
        pinResult.style.color = 'var(--danger)';
        return;
      }
      const firstDigit = val.charAt(0);
      const zoneLabel =
        firstDigit === '4' || firstDigit === '5'
          ? 'Zone A/B Active Corridor — Same-Day & Overnight Hyva Tippers Available.'
          : 'Zone C/D Regional Dispatch — 24h Scheduled Bulk Tipper Convoy Available.';
      pinResult.textContent = `✓ Pincode ${val} Verified: ${zoneLabel}`;
      pinResult.style.color = 'var(--ochre)';
    });
  }
}

/**
 * 13. Home 1 Quick-Quote Glass Form Handler
 */
function initQuickQuoteStrip() {
  const quickForm = document.getElementById('hero-quick-quote-form');
  if (!quickForm) return;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mat = document.getElementById('qq-material')?.value || 'Crushed VSI M-Sand (Zone II)';
    const qty = parseFloat(document.getElementById('qq-tonnage')?.value || '30');
    const pin = document.getElementById('qq-pincode')?.value || '';

    addQuoteItem(mat, qty, 'Tons');
    if (pin) {
      localStorage.setItem('gritline_prefill_pincode', pin);
    }

    const targetUrl = quickForm.getAttribute('data-target-url') || 'contact.html';
    window.location.href = targetUrl;
  });
}

/**
 * 14. Contact Page Quote Form Pre-Fill & Client-Side Validation
 */
function initContactQuoteForm() {
  const form = document.getElementById('quote-request-form');
  if (!form) return;

  const prefillBanner = document.getElementById('quote-prefill-notice');
  const clearCartBtn = document.getElementById('clear-quote-cart');
  const qtyInput = document.getElementById('quote-quantity');
  const unitSelect = document.getElementById('quote-unit');
  const pincodeInput = document.getElementById('quote-pincode');
  const msgInput = document.getElementById('quote-message');
  const dateInput = document.getElementById('quote-date');

  // Set minimum required date to today
  if (dateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', todayStr);
  }

  // Pre-fill from localStorage Quote Cart
  const items = getQuoteItems();
  const savedPincode = localStorage.getItem('gritline_prefill_pincode');
  if (savedPincode && pincodeInput && !pincodeInput.value) {
    pincodeInput.value = savedPincode;
  }

  if (items.length > 0) {
    let totalQty = 0;
    const summaryLines = [];

    items.forEach((item) => {
      totalQty += Number(item.quantity) || 0;
      summaryLines.push(`• ${item.name}: ${item.quantity} ${item.unit}`);

      // Check matching material checkbox
      const checkboxes = form.querySelectorAll('input[name="materials"]');
      checkboxes.forEach((cb) => {
        if (
          item.name.toLowerCase().includes(cb.value.toLowerCase()) ||
          cb.value.toLowerCase().includes(item.name.toLowerCase())
        ) {
          cb.checked = true;
        }
      });
    });

    if (qtyInput && totalQty > 0) {
      qtyInput.value = String(totalQty);
    }
    if (unitSelect && items[0]?.unit) {
      unitSelect.value = items[0].unit;
    }
    if (msgInput && !msgInput.value) {
      msgInput.value = `Pre-selected Materials from Catalogue:\n${summaryLines.join('\n')}\n\nPlease share landed bulk rate and earliest dispatch slot.`;
    }
    if (prefillBanner) {
      prefillBanner.style.display = 'flex';
    }
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEYS.QUOTE_ITEMS);
      updateQuoteBadges();
      if (prefillBanner) prefillBanner.style.display = 'none';
      form.reset();
    });
  }

  // Validation helper
  const setFieldError = (inputEl, isValid, errorMsg) => {
    const group = inputEl.closest('.form-group');
    const errEl = group ? group.querySelector('.form-error') : null;
    inputEl.classList.toggle('is-invalid', !isValid);
    inputEl.classList.toggle('is-valid', isValid);
    if (group) group.classList.toggle('has-error', !isValid);
    if (errEl && errorMsg) errEl.textContent = errorMsg;
    return isValid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('quote-name');
    const phoneEl = document.getElementById('quote-phone');
    const emailEl = document.getElementById('quote-email');
    const pinEl = document.getElementById('quote-pincode');
    const qEl = document.getElementById('quote-quantity');
    const reqDateEl = document.getElementById('quote-date');
    const checkedMaterials = form.querySelectorAll('input[name="materials"]:checked');
    const matGroup = document.getElementById('materials-group');

    let allValid = true;

    if (nameEl) {
      allValid =
        setFieldError(nameEl, nameEl.value.trim().length >= 2, 'Please enter your full name (min 2 characters).') &&
        allValid;
    }

    if (phoneEl) {
      const cleanPhone = phoneEl.value.replace(/[\s\-+()]/g, '');
      const validPhone = /^\d{10,13}$/.test(cleanPhone);
      allValid =
        setFieldError(phoneEl, validPhone, 'Please enter a valid 10-digit mobile or dispatch number.') &&
        allValid;
    }

    if (emailEl) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
      allValid =
        setFieldError(emailEl, validEmail, 'Please enter a valid work or personal email address.') &&
        allValid;
    }

    if (matGroup) {
      const hasMat = checkedMaterials.length > 0;
      matGroup.classList.toggle('has-error', !hasMat);
      if (!hasMat) allValid = false;
    }

    if (qEl) {
      const qVal = parseFloat(qEl.value);
      allValid =
        setFieldError(qEl, !isNaN(qVal) && qVal > 0, 'Quantity must be greater than 0.') &&
        allValid;
    }

    if (pinEl) {
      const validPin = /^\d{5,6}$/.test(pinEl.value.trim()) || pinEl.value.trim().length >= 5;
      allValid =
        setFieldError(pinEl, validPin, 'Please enter a valid 6-digit pincode or site address.') &&
        allValid;
    }

    if (reqDateEl) {
      const selectedDate = new Date(reqDateEl.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const validDate = Boolean(reqDateEl.value) && selectedDate >= today;
      allValid =
        setFieldError(reqDateEl, validDate, 'Please select a delivery date today or in the future.') &&
        allValid;
    }

    if (!allValid) {
      const firstInvalid = form.querySelector('.is-invalid, .has-error input');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Show Animated Success State without page reload
    const successPanel = document.getElementById('quote-success-panel');
    const refSpan = document.getElementById('quote-ref-id');
    if (refSpan) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      refSpan.textContent = `GRT-2026-${randomNum}`;
    }

    form.style.display = 'none';
    if (prefillBanner) prefillBanner.style.display = 'none';
    if (successPanel) {
      successPanel.classList.add('is-visible');
      successPanel.focus();
    }

    localStorage.removeItem(STORAGE_KEYS.QUOTE_ITEMS);
    updateQuoteBadges();
  });
}

/**
 * 15. Coming Soon Countdown Timer & Newsletter Form Validation
 */
function initComingSoonAndNewsletter() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Target 18 days from current session load
    const targetTime = Date.now() + 18 * 24 * 60 * 60 * 1000 + 6 * 3600 * 1000;

    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    };

    tick();
    setInterval(tick, 1000);
  }

  // Newsletter Forms (Footer + Coming Soon)
  document.querySelectorAll('[data-newsletter-form]').forEach((nForm) => {
    nForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = nForm.querySelector('input[type="email"]');
      const msgEl = nForm.querySelector('[data-newsletter-msg]');
      if (!emailInput) return;

      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      if (!valid) {
        if (msgEl) {
          msgEl.textContent = 'Please enter a valid email address.';
          msgEl.style.color = '#FF8A7A';
        }
        return;
      }

      emailInput.value = '';
      if (msgEl) {
        msgEl.textContent = '✓ Subscribed to weekly quarry rate & dispatch bulletins.';
        msgEl.style.color = '#8CE596';
      }
    });
  });
}

/**
 * Initialize all modules on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initIcons();
  initTheme();
  initDirection();
  initNavigation();
  initTiltCards();
  initMicroInteractions();
  initScrollReveal();
  initTabs();
  initAccordions();
  initCounters();
  updateQuoteBadges();
  initProductsCatalogue();
  initCalculator((matName, tons, unit) => addQuoteItem(matName, tons, unit));
  initHome2Modules();
  initDeliveryZoneSelector();
  initQuickQuoteStrip();
  initContactQuoteForm();
  initComingSoonAndNewsletter();
});
