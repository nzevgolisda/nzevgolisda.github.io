
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
});

document.querySelectorAll('.navbar__links a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
    });
});