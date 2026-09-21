
js/contact.js
javascript
/* ==========================================================================
   contact.js — Formspree submission with validation and status feedback
   ========================================================================== */

(function () {
    'use strict';

    var form;
    var statusEl;
    var successEl;
    var submitBtn;
    var submitLabel;

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function t(key) {
        return window.i18n ? window.i18n.t(key) : key;
    }

    function setStatus(message, isError) {
        if (!statusEl) return;
        statusEl.textContent = message || '';
        statusEl.classList.toggle('form-status--error', !!isError);
    }

    function validate() {
        if (!form) return false;
        var name = form.querySelector('#contact-name');
        var email = form.querySelector('#contact-email');
        var message = form.querySelector('#contact-message');

        if (!name.value.trim()) return false;
        if (!EMAIL_RE.test(email.value.trim())) return false;
        if (!message.value.trim()) return false;
        return true;
    }

    function setLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        if (submitLabel) {
            submitLabel.textContent = isLoading ? t('contact.sending') : t('contact.send');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            setStatus(t('contact.validationError'), true);
            return;
        }

        setStatus('', false);
        setLoading(true);

        var data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
        })
            .then(function (res) {
                if (res.ok) return res.json().catch(function () { return {}; });
                return res.json().then(function (body) {
                    throw new Error((body && body.error) || 'Request failed');
                });
            })
            .then(function () {
                if (successEl) successEl.classList.add('is-visible');
                setStatus('', false);
                form.reset();
            })
            .catch(function () {
                setStatus(t('contact.errorMessage'), true);
            })
            .finally(function () {
                setLoading(false);
            });
    }

    function init() {
        form = document.getElementById('contactForm');
        if (!form) return;

        statusEl = document.getElementById('formStatus');
        successEl = document.getElementById('formSuccess');
        submitBtn = form.querySelector('.contact__submit');
        submitLabel = submitBtn
            ? submitBtn.querySelector('[data-i18n="contact.send"]') ||
              submitBtn.querySelector('span')
            : null;

        form.addEventListener('submit', handleSubmit);

        // Clear status as the user types
        form.addEventListener('input', function () {
            if (statusEl && statusEl.textContent) setStatus('', false);
            if (successEl) successEl.classList.remove('is-visible');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();