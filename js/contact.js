// Contact Form Submission Management via Formspree
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successDiv = document.getElementById("formSuccess");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    form.reset();
                    if (successDiv) successDiv.style.display = "block";
                } else {
                    alert("There was a problem submitting your form.");
                }
            } catch (err) {
                alert("Network error. Please try emailing directly.");
            }
        });
    }
});