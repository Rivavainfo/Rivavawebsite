/**
 * RIVAVA CLIENT INTERACTION & MOTION SYSTEM
 * Powered by Apple Typography, Lenis Smooth Scrolling, GSAP 3 + ScrollTrigger, and Cuberto Text Reveals.
 */

// Global reference for Lenis
let lenis = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scrolling
  initLenis();

  // 2. Initialize GSAP & ScrollTrigger
  initGsapCore();

  // 3. Initialize Cuberto Text Reveals
  initCubertoReveals();

  // 4. Initialize GSAP ScrollTrigger Animations for Cards and Sections
  initGsapCardAnimations();

  // 5. Initialize GSAP Animated Metric Counters
  initNumberCounters();

  // 6. Initialize Magnetic Interactive Buttons
  initMagneticButtons();

  // 7. Dynamic Header Scroll Blur
  initHeaderBlur();

  // 8. Mobile Navigation Menu
  initMobileNavigation();

  // 9. Advisor Dropdowns (Desktop & Mobile)
  initAdvisorDropdowns();

  // 10. Interactive Star Rating System (Used across all Blog pages)
  initStarRatings();

  // 11. QR Payment Modal Logic (Homepage & Donation pages)
  initQrModal();

  // 12. Interactive SIP Wealth Calculator (if present)
  initInteractiveCalculator();

  // 13. Hardware-Accelerated Tabs & Pill Navigation
  initHardwareAcceleratedTabs();

  // 14. Dynamic Copyright Year
  document.querySelectorAll('#year, .current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

/* ==========================================================================
   1. LENIS SMOOTH SCROLLING
   ========================================================================== */
function initLenis() {
  if (typeof Lenis === 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
    return;
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    infinite: false
  });

  window.lenis = lenis;

  // Sync Lenis with GSAP ScrollTrigger if both are present
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Handle in-page anchor links smoothly with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && !targetId.startsWith('#!')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
}

/* ==========================================================================
   2. GSAP CORE REGISTRATION
   ========================================================================== */
function initGsapCore() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

/* ==========================================================================
   3. CUBERTO TEXT REVEAL ENGINE
   Masked line slicing with vertical translation, 3D tilt, and stagger
   ========================================================================== */
function initCubertoReveals() {
  const revealElements = document.querySelectorAll('.cuberto-reveal, [data-cuberto]');

  revealElements.forEach(el => {
    // If element doesn't already have .cuberto-line-wrap or .cuberto-word-wrap, wrap its content
    if (!el.querySelector('.cuberto-line-wrap, .cuberto-word-wrap')) {
      const hasBr = Array.from(el.childNodes).some(n => n.nodeType === Node.ELEMENT_NODE && n.tagName === 'BR');

      if (!hasBr && el.children.length === 0 && el.textContent.trim().split(/\s+/).length > 2) {
        // Word level split for long single-line titles
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = '';
        words.forEach(word => {
          const wordWrap = document.createElement('span');
          wordWrap.className = 'cuberto-word-wrap';
          const innerSpan = document.createElement('span');
          innerSpan.className = 'cuberto-inner';
          innerSpan.textContent = word;
          wordWrap.appendChild(innerSpan);
          el.appendChild(wordWrap);
        });
      } else {
        // Line level split by <br> or existing child elements
        const childNodes = Array.from(el.childNodes);
        const lines = [];
        let currentLine = [];

        childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
            if (currentLine.length > 0) {
              lines.push(currentLine);
              currentLine = [];
            }
          } else {
            currentLine.push(node);
          }
        });
        if (currentLine.length > 0) lines.push(currentLine);

        // Rebuild HTML with masked lines
        el.innerHTML = '';
        lines.forEach(nodes => {
          const lineWrap = document.createElement('span');
          lineWrap.className = 'cuberto-line-wrap';

          const innerSpan = document.createElement('span');
          innerSpan.className = 'cuberto-inner';

          nodes.forEach(n => innerSpan.appendChild(n));
          lineWrap.appendChild(innerSpan);
          el.appendChild(lineWrap);
        });
      }
    }

    const inners = el.querySelectorAll('.cuberto-inner');
    if (inners.length === 0) return;

    if (typeof gsap !== 'undefined') {
      const isHero = el.closest('.hero-section') || el.classList.contains('hero-title');

      if (isHero) {
        gsap.to(inners, {
          y: '0%',
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.15,
          onComplete: () => el.classList.add('cuberto-revealed')
        });
      } else if (typeof ScrollTrigger !== 'undefined') {
        gsap.to(inners, {
          y: '0%',
          rotation: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          },
          onComplete: () => el.classList.add('cuberto-revealed')
        });
      } else {
        el.classList.add('cuberto-revealed');
      }
    } else {
      el.classList.add('cuberto-revealed');
    }
  });
}

/* ==========================================================================
   4. GSAP SCROLLTRIGGER ANIMATIONS FOR CARDS & SECTIONS
   ========================================================================== */
function initGsapCardAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: Reveal on scroll via IntersectionObserver
    initIntersectionFallback();
    return;
  }

  // Hero timeline animation
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const badge = heroSection.querySelector('.inline-flex.items-center.gap-2.px-4');
    const subtitle = heroSection.querySelector('p.text-base, p.text-lg');
    const ctas = heroSection.querySelectorAll('.btn-primary, .btn-secondary, .btn-ghost, a[href^="tel:"], a[href^="https://wa.me"]');
    const statsPill = heroSection.querySelector('.inline-flex.items-center.justify-center.gap-6');
    const heroPreview = heroSection.querySelector('.preview-card-frame, .hero-terminal-frame, img');

    if (badge) tl.fromTo(badge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1);
    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4);
    if (ctas.length > 0) tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.55);
    if (statsPill) tl.fromTo(statsPill, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
    if (heroPreview) tl.fromTo(heroPreview, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 0.6);
  }

  // Staggered Cards across Sections
  const cardContainers = document.querySelectorAll(
    '.grid, .card-grid, .features-grid, .leadership-grid, .tier-grid'
  );

  cardContainers.forEach(container => {
    const cards = container.querySelectorAll(
      '.feature-card, .research-card, .learning-path-card, .tier-card, .leadership-card, .blog-card, .card-obsidian'
    );

    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 92%',
            once: true
          }
        }
      );
    }
  });

  // Standalone reveal elements
  document.querySelectorAll('.gsap-fade-up, .reveal-on-scroll:not([data-animated])').forEach(el => {
    el.setAttribute('data-animated', 'true');
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 93%',
          once: true
        }
      }
    );
  });
}

function initIntersectionFallback() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in-up');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible', 'visible'));
  }
}

/* ==========================================================================
   5. GSAP METRIC COUNTER ANIMATIONS
   ========================================================================== */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-counter') || counter.textContent.replace(/[^0-9.]/g, ''));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals'), 10) : (target % 1 !== 0 ? 1 : 0);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 90%',
        once: true
      },
      onUpdate: () => {
        counter.textContent = prefix + obj.val.toFixed(decimals) + suffix;
      }
    });
  });
}

/* ==========================================================================
   6. MAGNETIC INTERACTIVE BUTTONS
   ========================================================================== */
function initMagneticButtons() {
  // Only enable on fine pointer devices (desktop/trackpad)
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-elite, .magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull factor (max 6px)
      const pullX = x * 0.18;
      const pullY = y * 0.18;

      if (typeof gsap !== 'undefined') {
        gsap.to(btn, { x: pullX, y: pullY, duration: 0.3, ease: 'power2.out' });
      } else {
        btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      } else {
        btn.style.transform = 'translate(0px, 0px)';
      }
    });
  });
}

/* ==========================================================================
   7. DYNAMIC HEADER SCROLL BLUR
   ========================================================================== */
function initHeaderBlur() {
  const headerWrapper = document.getElementById('header-wrapper') || document.querySelector('.site-header-wrapper');
  if (!headerWrapper) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   8. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNavigation() {
  const hambBtn = document.getElementById('hambBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hambBtn || !mobileMenu) return;

  hambBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.id !== 'chatWithAdvisorBtnMobile') {
        mobileMenu.classList.add('hidden');
      }
    });
  });
}

/* ==========================================================================
   9. ADVISOR DROPDOWNS
   ========================================================================== */
function initAdvisorDropdowns() {
  const advisorBtn = document.getElementById('advisorDropdownBtn');
  const advisorMenu = document.getElementById('advisorDropdownMenu');
  if (advisorBtn && advisorMenu) {
    advisorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      advisorMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!advisorMenu.contains(e.target) && !advisorBtn.contains(e.target)) {
        advisorMenu.classList.add('hidden');
      }
    });
  }

  const mobileAdvisorBtn = document.getElementById('chatWithAdvisorBtnMobile');
  const mobileAdvisorMenu = document.getElementById('mobileAdvisorDropdownMenu');
  if (mobileAdvisorBtn && mobileAdvisorMenu) {
    mobileAdvisorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileAdvisorMenu.classList.toggle('hidden');
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE STAR RATING SYSTEM (BLOG DETAIL PAGES)
   ========================================================================== */
function initStarRatings() {
  const starWidgets = document.querySelectorAll('.blog-rating-widget');
  starWidgets.forEach(widget => {
    const blogId = widget.getAttribute('data-blog-id') || window.location.pathname;
    const stars = widget.querySelectorAll('.star-btn');
    const resultText = widget.querySelector('.rating-result-text');
    const savedRating = localStorage.getItem(`rivava_rating_${blogId}`);

    const applyRatingState = (score) => {
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        if (val <= score) {
          s.classList.add('is-active');
        } else {
          s.classList.remove('is-active');
        }
      });
      if (resultText) {
        resultText.textContent = `You rated this ${score} / 5 stars. Thank you for your feedback!`;
        resultText.classList.remove('hidden');
      }
    };

    if (savedRating) {
      applyRatingState(parseInt(savedRating, 10));
    }

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.getAttribute('data-value'), 10);
        stars.forEach(s => {
          if (parseInt(s.getAttribute('data-value'), 10) <= val) {
            s.classList.add('hovered');
          } else {
            s.classList.remove('hovered');
          }
        });
      });

      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
      });

      star.addEventListener('click', () => {
        const score = parseInt(star.getAttribute('data-value'), 10);
        localStorage.setItem(`rivava_rating_${blogId}`, score);
        applyRatingState(score);
      });
    });
  });
}

/* ==========================================================================
   11. QR PAYMENT MODAL LOGIC
   ========================================================================== */
function initQrModal() {
  const qrModal = document.getElementById('qrModal');
  const closeQr = document.getElementById('closeQr');
  const qrCodeDiv = document.getElementById('qrcode');
  if (!qrModal) return;

  const paymentStepSection = document.getElementById('paymentStepSection');
  const iHavePaidBtn = document.getElementById('iHavePaidBtn');
  const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
  const downloadSection = document.getElementById('downloadSection');
  const verificationSection = document.getElementById('verificationSection');
  const paymentKeyInput = document.getElementById('paymentKeyInput');
  const paymentError = document.getElementById('paymentError');
  const qrModalTitle = document.getElementById('qrModalTitle');
  const whatsappContactLink = document.getElementById('whatsappContactLink');
  let selectedPlan = "Rivava Elite";

  const isDesktop = () => !(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

  document.querySelectorAll('.qr-pay-btn, [data-open-qr]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const upiUrl = this.getAttribute('href') || "upi://pay?pa=8881176909@kotakbank&pn=Rivava&am=399&cu=INR&tn=Rivava%20Elite";
      selectedPlan = this.getAttribute('data-plan') || "Rivava Elite";

      if (isDesktop() || this.hasAttribute('data-force-qr')) {
        e.preventDefault();
        if (qrCodeDiv && typeof QRCode !== 'undefined') {
          qrCodeDiv.innerHTML = "";
          new QRCode(qrCodeDiv, {
            text: upiUrl,
            width: 220,
            height: 220,
            colorDark: "#000000",
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
          });
        }

        if (paymentStepSection) {
          paymentStepSection.classList.remove('hidden');
          paymentStepSection.classList.add('flex');
        }
        if (verificationSection) verificationSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.add('hidden');
        if (paymentError) paymentError.classList.add('hidden');
        if (paymentKeyInput) paymentKeyInput.value = "";
        if (qrModalTitle) qrModalTitle.textContent = `Scan to Subscribe - ${selectedPlan}`;

        qrModal.classList.remove('hidden');
        qrModal.classList.add('flex');
      }
    });
  });

  if (iHavePaidBtn) {
    iHavePaidBtn.addEventListener('click', () => {
      if (paymentStepSection) paymentStepSection.classList.add('hidden');
      if (verificationSection) {
        verificationSection.classList.remove('hidden');
        verificationSection.classList.add('flex');
      }
      if (qrModalTitle) qrModalTitle.textContent = "Payment Verification Key";
      const phoneNumber = "918881176909";
      const message = encodeURIComponent(`Hello Rivava Team, I have completed payment for ${selectedPlan}. Please share my research access key.`);
      if (whatsappContactLink) whatsappContactLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
    });
  }

  if (verifyPaymentBtn) {
    verifyPaymentBtn.addEventListener('click', () => {
      const key = (paymentKeyInput ? paymentKeyInput.value.trim() : '');
      const isValid = /^rivrubi@\d{5}$/.test(key) || key.toLowerCase() === 'rivava100' || key.toLowerCase() === 'elite2026';
      if (isValid) {
        if (verificationSection) verificationSection.classList.add('hidden');
        if (downloadSection) {
          downloadSection.classList.remove('hidden');
          downloadSection.classList.add('flex');
        }
        if (qrModalTitle) qrModalTitle.textContent = "Access Granted! Download Reports";
        if (paymentError) paymentError.classList.add('hidden');
      } else {
        if (paymentError) paymentError.classList.remove('hidden');
      }
    });
  }

  if (closeQr) {
    closeQr.addEventListener('click', () => {
      qrModal.classList.add('hidden');
      qrModal.classList.remove('flex');
    });
  }

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
      qrModal.classList.add('hidden');
      qrModal.classList.remove('flex');
    }
  });
}

/* ==========================================================================
   12. INTERACTIVE SIP WEALTH CALCULATOR
   ========================================================================== */
function initInteractiveCalculator() {
  const calcContainer = document.getElementById('wealth-growth-calc');
  if (!calcContainer) return;

  const monthlyInput = document.getElementById('calc-monthly-amount');
  const yearsInput = document.getElementById('calc-years');
  const returnInput = document.getElementById('calc-return-rate');

  const investedDisplay = document.getElementById('calc-total-invested');
  const estReturnDisplay = document.getElementById('calc-est-returns');
  const totalWealthDisplay = document.getElementById('calc-total-wealth');

  const updateCalculation = () => {
    if (!monthlyInput || !yearsInput || !returnInput) return;
    const P = parseFloat(monthlyInput.value) || 5000;
    const t = parseFloat(yearsInput.value) || 10;
    const annualRate = parseFloat(returnInput.value) || 14;

    const r = (annualRate / 100) / 12;
    const n = t * 12;

    // SIP Future Value formula = P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const wealthGain = futureValue - totalInvested;

    const inrFormatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });

    if (investedDisplay) investedDisplay.textContent = inrFormatter.format(totalInvested);
    if (estReturnDisplay) estReturnDisplay.textContent = inrFormatter.format(wealthGain);
    if (totalWealthDisplay) totalWealthDisplay.textContent = inrFormatter.format(futureValue);

    const monthlyValLabel = document.getElementById('calc-monthly-label');
    const yearsValLabel = document.getElementById('calc-years-label');
    const rateValLabel = document.getElementById('calc-rate-label');

    if (monthlyValLabel) monthlyValLabel.textContent = inrFormatter.format(P);
    if (yearsValLabel) yearsValLabel.textContent = `${t} Years`;
    if (rateValLabel) rateValLabel.textContent = `${annualRate}%`;
  };

  [monthlyInput, yearsInput, returnInput].forEach(slider => {
    if (slider) slider.addEventListener('input', updateCalculation);
  });
  updateCalculation();
}

/* ==========================================================================
   14. HARDWARE ACCELERATED TABS & GLIDING PILL INDICATOR
   Hardware accelerated via translate3d / GPU transform compositing layer
   ========================================================================== */
function initHardwareAcceleratedTabs() {
  const pillNavs = document.querySelectorAll('.apple-pill-nav, .tab-nav-container');

  pillNavs.forEach(nav => {
    // Add glider indicator if not present
    let indicator = nav.querySelector('.apple-pill-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'apple-pill-indicator';
      nav.prepend(indicator);
    }
    nav.classList.add('has-glider');

    const tabs = Array.from(nav.querySelectorAll('.apple-pill-link, .tab-item-link, .tab-btn'));
    if (!tabs.length) return;

    let activeTab = nav.querySelector('.apple-pill-link.is-active, .tab-item-link.is-active, .tab-btn.is-active') || tabs[0];

    const moveGlider = (targetTab, animate = true) => {
      if (!targetTab) {
        indicator.style.opacity = '0';
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const tabRect = targetTab.getBoundingClientRect();
      const xOffset = tabRect.left - navRect.left;
      const width = tabRect.width;

      if (!animate) {
        indicator.style.transition = 'none';
      } else {
        indicator.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), width 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
      }

      // Hardware accelerated translate3d (GPU layer)
      indicator.style.transform = `translate3d(${xOffset}px, 0, 0)`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = '1';
    };

    // Position immediately without transition on load
    requestAnimationFrame(() => {
      moveGlider(activeTab, false);
    });

    // Hover glider movement
    tabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => moveGlider(tab, true));
      tab.addEventListener('focus', () => moveGlider(tab, true));
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('is-active'));
        this.classList.add('is-active');
        activeTab = this;
        moveGlider(this, true);
      });
    });

    // Return to active tab on mouseleave
    nav.addEventListener('mouseleave', () => {
      moveGlider(activeTab, true);
    });

    // Resize recalculation
    window.addEventListener('resize', () => {
      moveGlider(activeTab, false);
    }, { passive: true });
  });
}

