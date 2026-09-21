
js/nav.js
javascript
/* ==========================================================================
   nav.js — mobile menu, scroll-hide behavior, active link highlighting
   ========================================================================== */

(function () {
    'use strict';

    var header;
    var navToggle;
    var navLinks;
    var links;
    var lastScrollY = 0;
    var ticking = false;
    var DESKTOP_MIN = 761;

    function closeMenu() {
        if (!navLinks) return;
        navLinks.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        if (!navLinks) return;
        navLinks.classList.add('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    }

    function toggleMenu() {
        if (!navLinks) return;
        if (navLinks.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function handleScroll() {
        var y = window.scrollY || window.pageYOffset;
        var delta = y - lastScrollY;

        // Hide on scroll down, show on scroll up (only when past the header height)
        if (Math.abs(delta) > 6) {
            if (delta > 0 && y > 120) {
                if (header) header.classList.add('header--hidden');
                closeMenu();
            } else {
                if (header) header.classList.remove('header--hidden');
            }
            lastScrollY = y;
        }

        updateActiveLink(y);
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    function updateActiveLink(y) {
        if (!links || !links.length) return;

        var offset = 140;
        var currentId = '';

        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href') || '';
            if (href.charAt(0) !== '#' || href === '#') continue;
            var section = document.querySelector(href);
            if (!section) continue;
            var top = section.offsetTop - offset;
            if (y >= top) {
                currentId = href;
            }
        }

        // At the very top, clear active state
        if (y < 80) currentId = '';

        links.forEach(function (link) {
            var isActive =
                currentId && link.getAttribute('href') === currentId;
            link.classList.toggle('is-active', !!isActive);
        });
    }

    function handleResize() {
        if (window.innerWidth >= DESKTOP_MIN) {
            closeMenu();
        }
    }

    function handleOutsideClick(e) {
        if (!navLinks || !navLinks.classList.contains('is-open')) return;
        if (navLinks.contains(e.target) || (navToggle && navToggle.contains(e.target))) {
            return;
        }
        closeMenu();
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') closeMenu();
    }

    function init() {
        header = document.getElementById('siteHeader');
        navToggle = document.getElementById('navToggle');
        navLinks = document.getElementById('navLinks');

        if (navLinks) {
            links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
            links.forEach(function (link) {
                link.addEventListener('click', function () {
                    if (window.innerWidth < DESKTOP_MIN) closeMenu();
                });
            });
        }

        if (navToggle) {
            navToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu();
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleKeydown);

        // Initial state
        lastScrollY = window.scrollY || 0;
        updateActiveLink(lastScrollY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();