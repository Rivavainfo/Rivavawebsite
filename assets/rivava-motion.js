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

    // 3. REMOVE ANY LEGACY CUSTOM CURSOR DOM ELEMENTS (User requested removal)
    function cleanupLegacyCursor() {
        const aura = document.getElementById('cuberto-cursor-aura');
        if (aura) aura.remove();
        const dot = document.getElementById('cuberto-cursor-dot');
        if (dot) dot.remove();
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
    // 6. HARDWARE-ACCELERATED FLOATING NAVBAR GLIDER
    function initNavbarGlider() {
        const navContainers = document.querySelectorAll('.nav-capsule nav');
        if (!navContainers.length) return;

        // Guarantee styles are present across all pages without layout shift
        if (!document.getElementById('rivava-nav-glider-styles')) {
            const style = document.createElement('style');
            style.id = 'rivava-nav-glider-styles';
            style.textContent = `
                .nav-capsule nav {
                    position: relative !important;
                }
                .nav-glider {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    height: 100% !important;
                    background: rgba(255, 255, 255, 0.12) !important;
                    border-radius: 9999px !important;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                    pointer-events: none !important;
                    z-index: 0 !important;
                    transform: translate3d(0, 0, 0);
                    will-change: transform, width;
                    opacity: 0;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .nav-pill-item {
                    position: relative !important;
                    z-index: 1 !important;
                    background: transparent !important;
                    box-shadow: none !important;
                }
                .nav-pill-item:hover {
                    color: #ffffff !important;
                    background: transparent !important;
                }
                .nav-pill-item.active {
                    color: #ffffff !important;
                    font-weight: 550 !important;
                    background: transparent !important;
                    box-shadow: none !important;
                }
                .nav-pill-item.challenge-pill {
                    color: #00FF7F !important;
                    font-weight: 600 !important;
                    background: transparent !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        navContainers.forEach(nav => {
            const items = Array.from(nav.querySelectorAll('.nav-pill-item'));
            if (!items.length) return;

            let glider = nav.querySelector('.nav-glider');
            if (!glider) {
                glider = document.createElement('div');
                glider.className = 'nav-glider';
                // Explicit inline style to guarantee zero flex space immediately before styles apply
                glider.style.position = 'absolute';
                glider.style.top = '0';
                glider.style.left = '0';
                glider.style.height = '100%';
                glider.style.pointerEvents = 'none';
                glider.style.zIndex = '0';
                glider.style.opacity = '0';
                nav.appendChild(glider);
            }

            let activeItem = nav.querySelector('.nav-pill-item.active') || items[0];

            function moveGlider(target, animate = true) {
                if (!target) {
                    glider.style.opacity = '0';
                    return;
                }
                const navRect = nav.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const offsetX = targetRect.left - navRect.left;
                
                if (!animate) {
                    glider.style.transition = 'none';
                } else {
                    glider.style.transition = 'transform 0.32s cubic-bezier(0.25, 1, 0.5, 1), width 0.32s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease';
                }
                
                glider.style.transform = `translate3d(${offsetX}px, 0, 0)`;
                glider.style.width = `${targetRect.width}px`;
                glider.style.opacity = '1';
            }

            // Recalibrate glider on next frame, window load, and font ready
            requestAnimationFrame(() => moveGlider(activeItem, false));
            setTimeout(() => moveGlider(activeItem, false), 50);
            if (document.fonts) {
                document.fonts.ready.then(() => moveGlider(activeItem, false));
            }
            window.addEventListener('load', () => moveGlider(activeItem, false));

            // Hover and click interactions
            items.forEach(item => {
                item.addEventListener('mouseenter', () => moveGlider(item, true));
                item.addEventListener('focus', () => moveGlider(item, true));
                item.addEventListener('click', () => {
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    activeItem = item;
                    moveGlider(activeItem, true);
                });
            });

            // Return to active item on mouseleave
            nav.addEventListener('mouseleave', () => moveGlider(activeItem, true));
            
            // Handle window resize
            window.addEventListener('resize', () => {
                moveGlider(activeItem, false);
            });
        });
    }

    function start() {
        cleanupLegacyCursor();
        initLenis();
        initCubertoReveals();
        initCubertoMagnetic();
        initSpotlightCards();
        initNavbarGlider();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
