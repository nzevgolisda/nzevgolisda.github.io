(function () {
    'use strict';

    const header = document.querySelector('.header');
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!header) return;

    /* ---------- Mobile menu ---------- */
    function setMenu(open) {
        if (!links || !toggle) return;
        links.classList.toggle('is-open', open);
        toggle.classList.toggle('is-active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('nav-open', open);
    }

    function closeMenu() { setMenu(false); }

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            setMenu(!links.classList.contains('is-open'));
        });

        links.addEventListener('click', (e) => {
            if (e.target.closest('a')) closeMenu();
        });

        document.addEventListener('click', (e) => {
            if (!links.classList.contains('is-open')) return;
            if (header.contains(e.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) closeMenu();
        });
    }

    /* ---------- Hide on scroll down, show on scroll up ---------- */
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const y = Math.max(0, window.scrollY);
        header.classList.toggle('is-scrolled', y > 12);

        const menuOpen = links && links.classList.contains('is-open');
        if (!menuOpen) {
            if (y > lastY + 6 && y > 160) header.classList.add('is-hidden');
            else if (y < lastY - 6 || y <= 160) header.classList.remove('is-hidden');
        }
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    /* ---------- Active section highlighting ---------- */
    const navLinks = links ? Array.from(links.querySelectorAll('a[href^="#"]')) : [];
    const sections = navLinks
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = '#' + entry.target.id;
                navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(s => io.observe(s));
    }
})();