
// Scroll to top button
const scrollBtn = document.getElementById('scrollTop');

if (scrollBtn) {
    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


