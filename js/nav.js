
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    function closeNavigation() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
    }

    navToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    document.querySelectorAll('.navbar__links a').forEach(function(link) {
        link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNavigation();
            navToggle.focus();
        }
    });
}