
// Contact form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formStatus = document.getElementById('formStatus');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && submitButton) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute('action');
        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
        if (formStatus) {
            formStatus.textContent = '';
        }

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        })
        .then(function(response) {
            if (response.ok) {
                if (formSuccess) {
                    formSuccess.classList.add('show');
                }
                if (formStatus) {
                    formStatus.textContent = '';
                }
                contactForm.reset();
                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.classList.remove('show');
                    }
                }, 5000);
            } else {
                if (formStatus) {
                    formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
                }
            }
        })
        .catch(() => {
            if (formStatus) {
                formStatus.textContent = 'Network error. Please try again or email me directly.';
            }
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
}