
// Theme toggle
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}