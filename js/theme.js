(function () {
    'use strict';

    var STORAGE_KEY = 'nz-theme';
    var root = document.documentElement;

    function getPreferred() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) {}
        return window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    }

    function updateButton(theme) {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var icon = btn.querySelector('i');
        var isLight = theme === 'light';

        btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');

        if (icon) {
            icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    function apply(theme) {
        root.setAttribute('data-theme', theme);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === 'light' ? '#fbfaf7' : '#0b0d10');
        }

        updateButton(theme);
    }

    function setTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {}
        apply(theme);
    }

    function toggle() {
        var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
    }

    function init() {
        apply(getPreferred());

        var btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', toggle);
        }

        // Follow the OS preference if the user hasn't chosen explicitly
        var mq = window.matchMedia('(prefers-color-scheme: light)');
        var handler = function (e) {
            try {
                if (localStorage.getItem(STORAGE_KEY)) return;
            } catch (err) {}
            apply(e.matches ? 'light' : 'dark');
        };

        if (mq.addEventListener) {
            mq.addEventListener('change', handler);
        } else if (mq.addListener) {
            mq.addListener(handler);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
