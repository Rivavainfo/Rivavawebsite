/**
 * Rivava Motion Engine
 * - Lenis Smooth Scrolling
 * - Cuberto-style Silky Text & Element Reveals
 * - Cuberto Magnetic Button & Badge Interactions
 * - Ambient Interactive Cursor Glow Aura (Desktop)
 * - Apple Medium-Bold Design Accents
 */

(function () {
    'use strict';

    // 1. LENIS SMOOTH SCROLL INITIALIZATION
    let lenis = null;
    function initLenis() {
        if (typeof window.Lenis === 'undefined') {
            console.warn('Lenis library not loaded yet.');
            return;
        }

        lenis = new window.Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8,
            infinite: false,
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href.startsWith('#')) {
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        e.preventDefault();
                        lenis.scrollTo(targetEl, {
                            offset: -75,
                            duration: 1.1,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    }
                }
            });
        });

        // Header scroll effect
        const header = document.getElementById('header') || document.querySelector('header');
        if (header) {
            lenis.on('scroll', ({ scroll }) => {
                header.classList.toggle('scrolled', scroll > 30);
            });
        }
    }

    // 2. CUBERTO-STYLE SILKY REVEALS
    function initCubertoReveals() {
        // Tag main section headings with Cuberto reveal classes if not already tagged
        const headings = document.querySelectorAll(
            'section h1:not(.hero-rivava), section h2:not(.hero-rivava), .cuberto-title'
        );

        headings.forEach((heading) => {
            if (heading.dataset.cubertoProcessed) return;
            heading.dataset.cubertoProcessed = 'true';

            // Wrap contents inside a clip-path mask
            const originalContent = heading.innerHTML;
            heading.classList.add('cuberto-reveal-container');
            heading.innerHTML = `<span class="cuberto-reveal-inner">${originalContent}</span>`;
        });

        // Hero immediate reveal
        setTimeout(() => {
            document.querySelectorAll('#hero .cuberto-reveal-inner, #hero .fade-in-up').forEach((el, idx) => {
                setTimeout(() => {
                    el.classList.add('revealed', 'visible');
                }, idx * 60);
            });
        }, 80);

        // IntersectionObserver for scroll-triggered Cuberto text reveals
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('cuberto-in-view');
                        const inner = entry.target.querySelector('.cuberto-reveal-inner');
                        if (inner) inner.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        document.querySelectorAll('.cuberto-reveal-container').forEach((el) => {
            revealObserver.observe(el);
        });

        // IntersectionObserver for cards and fade-in items
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible', 'cuberto-card-in');
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -30px 0px'
            }
        );

        document.querySelectorAll('.fade-in-up:not(#hero .fade-in-up)').forEach((el) => {
            cardObserver.observe(el);
        });
    }

    // 3. CUBERTO AMBIENT CURSOR & GLOW FOLLOWER (Desktop only)
    function initCubertoCursor() {
        // Do not init on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let cursorAura = document.getElementById('cuberto-cursor-aura');
        let cursorDot = document.getElementById('cuberto-cursor-dot');

        if (!cursorAura) {
            cursorAura = document.createElement('div');
            cursorAura.id = 'cuberto-cursor-aura';
            cursorAura.className = 'cuberto-cursor-aura';
            document.body.appendChild(cursorAura);
        }

        if (!cursorDot) {
            cursorDot = document.createElement('div');
            cursorDot.id = 'cuberto-cursor-dot';
            cursorDot.className = 'cuberto-cursor-dot';
            document.body.appendChild(cursorDot);
        }

        let mouseX = -100;
        let mouseY = -100;
        let auraX = -100;
        let auraY = -100;
        let isHovering = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }, { passive: true });

        // Smooth lerp loop
        function renderAura() {
            auraX += (mouseX - auraX) * 0.16;
            auraY += (mouseY - auraY) * 0.16;

            const scale = isHovering ? 1.5 : 1;
            cursorAura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) scale(${scale})`;

            requestAnimationFrame(renderAura);
        }
        requestAnimationFrame(renderAura);

        // Interactive hover states on links, buttons, and cards
        const hoverTargets = document.querySelectorAll(
            'a, button, .btn, .glass-panel, input, textarea, select, .interactive-card, .logo-badge-container'
        );

        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => {
                isHovering = true;
                cursorAura.classList.add('cursor-active');
            });
            target.addEventListener('mouseleave', () => {
                isHovering = false;
                cursorAura.classList.remove('cursor-active');
            });
        });
    }

    // 4. CUBERTO MAGNETIC ELEMENTS
    function initCubertoMagnetic() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const magneticElements = document.querySelectorAll(
            '.btn, .magnetic-elem, #hambBtn'
        );

        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
                el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate3d(0px, 0px, 0)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    // 5. SPOTLIGHT CARD GLOW ON MOUSEMOVE
    function initSpotlightCards() {
        document.querySelectorAll('.glass-panel, .feature-card, .price-card').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // 6. INITIALIZATION
    function start() {
        initLenis();
        initCubertoReveals();
        initCubertoCursor();
        initCubertoMagnetic();
        initSpotlightCards();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
