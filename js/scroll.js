
js/scroll.js
javascript
/* ==========================================================================
   scroll.js — scroll-to-top button and smooth anchor scrolling
   ========================================================================== */

(function () {
    'use strict';

    var btn;
    var SHOW_AFTER = 420;

    function update() {
        if (!btn) return;
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    }

    function toTop() {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: 0,
            behavior: reduce ? 'auto' : 'smooth'
        });
    }

    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href === '#') return;

            link.addEventListener('click', function (e) {
                var target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();

                var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var headerHeight = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: top,
                    behavior: reduce ? 'auto' : 'smooth'
                });

                // Update the URL hash without triggering a jump
                if (history.replaceState) {
                    history.replaceState(null, '', href);
                }
            });
        });
    }

    function init() {
        btn = document.getElementById('scrollTop');

        if (btn) {
            btn.addEventListener('click', toTop);
            window.addEventListener('scroll', update, { passive: true });
            update();
        }

        initSmoothAnchors();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
js/main.js
javascript
/* ==========================================================================
   main.js — fade-in observer, misc enhancements
   ========================================================================== */

(function () {
    'use strict';

    function initFadeIn() {
        var elements = document.querySelectorAll('.fade-in');
        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    function init() {
        initFadeIn();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();