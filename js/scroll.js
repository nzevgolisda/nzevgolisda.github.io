
// Scroll to top button
const scrollBtn = document.getElementById('scrollTop');
const navbar = document.getElementById('navbar');
let previousScrollY = window.scrollY;

function updateNavbarVisibility() {
    if (!navbar) return;

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > previousScrollY;
    const scrollingUp = currentScrollY < previousScrollY;

    if (currentScrollY <= 0 || scrollingUp) {
        navbar.classList.remove('navbar--hidden');
    } else if (scrollingDown) {
        navbar.classList.add('navbar--hidden');
    }

    previousScrollY = currentScrollY;
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


