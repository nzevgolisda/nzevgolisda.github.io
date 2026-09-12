
// Scroll to top button
const scrollBtn = document.getElementById('scrollTop');
const navbar = document.getElementById('navbar');
let navbarTimer;

function updateNavbarVisibility() {
    if (!navbar) return;

    const currentScrollY = window.scrollY;

    clearTimeout(navbarTimer);

    if (currentScrollY <= 0) {
        navbar.classList.remove('navbar--hidden');
        return;
    }

    navbar.classList.add('navbar--hidden');
    navbarTimer = setTimeout(function() {
        navbar.classList.remove('navbar--hidden');
    }, 180);
}

window.addEventListener('scroll', updateNavbarVisibility, { passive: true });
updateNavbarVisibility();

if (scrollBtn) {
    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


