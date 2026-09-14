
// Typing effect
const typedElement = document.getElementById('typedText');
const phrasesByLanguage = {
    en: ['Math Enthusiast', 'Data Scientist', 'Backend Developer', 'Problem Solver'],
    gr: ['Math Geek', 'Data Science', 'Backend Developer', 'Problem Solver']
};
let phrases = phrasesByLanguage.en;
let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function typeEffect() {
    if (!typedElement) return;

    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }
    setTimeout(typeEffect, typingSpeed);
}

if (typedElement) {
    typeEffect();
    document.addEventListener('languagechange', function(event) {
        phrases = phrasesByLanguage[event.detail.language] || phrasesByLanguage.en;
        phraseIndex = 0;
        charIndex = 0;
        isDeleting = false;
    });
}