
// Theme toggle
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    function getStoredTheme() {
        try {
            const storedTheme = localStorage.getItem('theme');
            return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
        } catch (error) {
            return 'dark';
        }
    }

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        if (icon) {
            icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    applyTheme(getStoredTheme());

    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', newTheme);
        } catch (error) {
            // Ignore storage failures gracefully.
        }
        applyTheme(newTheme);
    });
}