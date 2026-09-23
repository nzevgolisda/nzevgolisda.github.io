// 1. THEME
(function () {
    'use strict';
    var STORAGE_KEY = 'nz-theme';
    var root = document.documentElement;

    function getPreferred() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) {}
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function updateButton(theme) {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var icon = btn.querySelector('i');
        var isLight = theme === 'light';
        btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }

    function apply(theme) {
        root.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#fbfaf7' : '#0b0d10');
        updateButton(theme);
    }

    function toggle() {
        var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        var next = current === 'light' ? 'dark' : 'light';
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
        apply(next);
    }

    function init() {
        apply(getPreferred());
        var btn = document.getElementById('themeToggle');
        if (btn) btn.addEventListener('click', toggle);

        var mq = window.matchMedia('(prefers-color-scheme: light)');
        var handler = function (e) {
            try { if (localStorage.getItem(STORAGE_KEY)) return; } catch (err) {}
            apply(e.matches ? 'light' : 'dark');
        };
        if (mq.addEventListener) mq.addEventListener('change', handler);
        else if (mq.addListener) mq.addListener(handler);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

// 2. I18N & LANGUAGE TOGGLE (With 10 Automatic Languages)
(function () {
    'use strict';
    var STORAGE_KEY = 'nz-lang';
    var DEFAULT_LANG = 'en';
    var SUPPORTED = ['en', 'el'];

    var EXTRA_LANGS = {
        'es': 'Español (Spanish)',
        'zh-CN': '中文 (Chinese)',
        'hi': 'हिन्दी (Hindi)',
        'ar': 'العربية (Arabic)',
        'pt': 'Português (Portuguese)',
        'bn': 'বাংলা (Bengali)',
        'ru': 'Русский (Russian)',
        'ja': '日本語 (Japanese)',
        'fr': 'Français (French)',
        'de': 'Deutsch (German)'
    };

    var TRANSLATIONS = {
        en: {
            'common.skip': 'Skip to main content', 'common.downloadCv': 'Download CV', 'common.selectLanguage': 'Select language', 'common.toggleTheme': 'Switch theme mode', 'common.toggleNav': 'Toggle navigation menu', 'common.scrollTop': 'Scroll to top of page',
            'nav.about': 'About', 'nav.experience': 'Experience', 'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
            'hero.availability': 'Available for data & backend projects', 'hero.subtitle': 'Theoretical Mathematics graduate from the University of Crete with 9+ years of tutoring experience. I combine mathematical reasoning with practical software engineering to turn complex problems into clear, useful solutions.', 'hero.explore': 'Explore my work', 'hero.ready': 'ready', 'hero.codeComment': '# teach clearly, build carefully', 'hero.deliberate': 'deliberate by design', 'hero.noShortcuts': '● no shortcuts', 'hero.meta': 'data / APIs / teaching',
            'about.tag': 'About', 'about.title': 'Who I am', 'about.subtitle': "I'm a mathematics graduate who enjoys making difficult ideas easier to understand and practical problems easier to solve. My next step is a career in <strong>data science and backend development</strong>, where careful reasoning can become useful software.", 'about.profileOne': 'My background gives me a patient, structured approach to learning and problem solving. After more than nine years of tutoring, I know how to listen closely, explain clearly, and adapt when the first approach is not the right one.', 'about.profileTwo': 'I have worked with Python, JavaScript, SQL, HTML, and data tools through personal and collaborative projects. I am continuing to grow as a developer while building a strong foundation in analytics, APIs, and reliable systems.', 'about.focusDataTitle': 'Data & insight', 'about.focusDataText': 'Turning structured information into decisions people can use.', 'about.focusBackendTitle': 'Backend foundations', 'about.focusBackendText': 'Learning to build clear, dependable services and workflows.', 'about.focusTeachingTitle': 'Teaching & communication', 'about.focusTeachingText': 'Explaining complex ideas with patience and precision.', 'about.principleLabel': 'Working principle', 'about.principle': 'Make the complex clear, then make the solution useful.',
            'stats.tutoring': 'Years tutoring', 'stats.degree': 'Theoretical Mathematics', 'stats.curiosity': 'Curiosity',
            'meta.born': 'Born 24/11/1992', 'meta.nationality': 'Greek', 'meta.languages': 'English B2 · French A2', 'meta.military': 'Military fulfilled',
            'experience.tag': 'Experience', 'experience.title': 'Teaching & Mentoring', 'experience.subtitle': 'Over 9 years of private tutoring for university and senior high-school students.', 'experience.calculusTitle': 'Calculus & Analysis', 'experience.calculusText': 'Differential & Integral Calculus, Real Analysis, sequences and series.', 'experience.algebraTitle': 'Algebra & Logic', 'experience.algebraText': 'Linear Algebra, Propositional Calculus, Abstract Algebra, Number Theory.', 'experience.probabilityTitle': 'Probability & Stats', 'experience.probabilityText': 'Probability theory, Statistics, Distributions, Hypothesis testing.', 'experience.equationsTitle': 'Differential Equations', 'experience.equationsText': 'ODE, PDE, applications in physics and engineering.', 'experience.pythonTitle': 'Python Programming', 'experience.pythonText': 'Introduction to programming, data analysis, and scientific computing.', 'experience.geometryTitle': 'Geometry', 'experience.geometryText': 'Euclidean and analytic geometry, vector spaces.',
            'skills.tag': 'Skills', 'skills.title': 'Tech Stack', 'skills.subtitle': 'Languages, tools, and platforms I work with.',
            'activity.intro': 'Explore my recent public work and contribution activity on GitHub.', 'activity.label': 'Public activity', 'activity.viewProfile': 'View profile', 'activity.loading': 'Loading contributions…', 'activity.mon': 'Mon', 'activity.wed': 'Wed', 'activity.fri': 'Fri', 'activity.less': 'Less', 'activity.more': 'More', 'activity.contributions': '{n} contributions in the last year', 'activity.oneContribution': '1 contribution in the last year', 'activity.none': 'No contributions in the last year', 'activity.error': 'Contribution data is unavailable right now.',
            'projects.tag': 'Projects', 'projects.title': 'GitHub Repositories', 'projects.subtitle': 'Live feed from', 'projects.loading': 'Loading repositories…', 'projects.viewAll': 'View all on GitHub', 'projects.noDescription': 'No description provided.', 'projects.error': 'Could not load repositories right now. Visit the GitHub profile directly.', 'projects.updated': 'Updated',
            'contact.tag': 'Contact', 'contact.title': "Let's connect", 'contact.subtitle': "I'm always open to discussing data science, backend engineering, or interesting math problems.", 'contact.name': 'Your name', 'contact.email': 'Email address', 'contact.messageLabel': 'How can I help?', 'contact.messagePlaceholder': 'Tell me a little about your project or question.', 'contact.send': 'Send email request', 'contact.directEmail': 'Or email me directly', 'contact.success': 'Thanks! Your message was sent.', 'contact.sending': 'Sending…', 'contact.errorMessage': 'Something went wrong. Please try again or email directly.', 'contact.validationError': 'Please fill in all fields with a valid email address.', 'contact.eyebrow': 'Start a conversation', 'contact.problem': 'Have a problem worth solving?', 'contact.copy': 'Whether you are building a data workflow, improving a backend, or need a patient mathematics tutor, I would be glad to hear what you are working on.',
            'footer': '© 2026 Nikos Zevgolis. Built with care and Python.'
        },
        el: {
            'common.skip': 'Μετάβαση στο κύριο περιεχόμενο', 'common.downloadCv': 'Λήψη βιογραφικού', 'common.selectLanguage': 'Επιλογή γλώσσας', 'common.toggleTheme': 'Εναλλαγή θέματος', 'common.toggleNav': 'Εναλλαγή μενού πλοήγησης', 'common.scrollTop': 'Επιστροφή στην κορυφή',
            'nav.about': 'Σχετικά', 'nav.experience': 'Εμπειρία', 'nav.skills': 'Δεξιότητες', 'nav.projects': 'Έργα', 'nav.contact': 'Επικοινωνία',
            'hero.availability': 'Διαθέσιμος για έργα data & backend', 'hero.subtitle': 'Απόφοιτος Θεωρητικών Μαθηματικών του Πανεπιστημίου Κρήτης με πάνω από 9 χρόνια εμπειρίας στη διδασκαλία. Συνδυάζω τη μαθηματική σκέψη με πρακτική μηχανική λογισμικού για να μετατρέπω σύνθετα προβλήματα σε σαφείς, χρήσιμες λύσεις.', 'hero.explore': 'Δείτε τη δουλειά μου', 'hero.ready': 'έτοιμο', 'hero.codeComment': '# enséñalo claro, constrúyelo con cuidado', 'hero.deliberate': 'σχεδιασμένο με πρόθεση', 'hero.noShortcuts': '● χωρίς συντομεύσεις', 'hero.meta': 'data / APIs / διδασκαλία',
            'about.tag': 'Σχετικά', 'about.title': 'Ποιος είμαι', 'about.subtitle': 'Είμαι απόφοιτος μαθηματικών που απολαμβάνει να κάνει τις δύσκολες ιδέες πιο κατανοητές και τα πρακτικά προβλήματα πιο εύκολα. Το επόμενο βήμα μου είναι μια καριέρα στην <strong>επιστήμη δεδομένων και το backend development</strong>, όπου η προσεκτική σκέψη γίνεται χρήσιμο λογισμικό.', 'about.profileOne': 'Το υπόβαθρό μου μου δίνει μια υπομονετική, δομημένη προσέγγιση στη μάθηση και την επίλυση προβλημάτων. Μετά από πάνω από εννέα χρόνια διδασκαλίας, ξέρω πώς να ακούω προσεκτικά, να εξηγώ καθαρά και να προσαρμόζομαι όταν η πρώτη προσέγγιση δεν είναι η σωστή.', 'about.profileTwo': 'Έχω δουλέψει με Python, JavaScript, SQL, HTML και εργαλεία δεδομένων μέσα από προσωπικά και συνεργατικά έργα. Συνεχίζω να εξελίσσομαι ως developer χτίζοντας γερές βάσεις σε analytics, APIs και αξιόπιστα συστήματα.', 'about.focusDataTitle': 'Δεδομένα & διορατικότητα', 'about.focusDataText': 'Μετατρέπω δομημένη πληροφορία σε αποφάσεις που μπορούν να χρησιμοποιηθούν.', 'about.focusBackendTitle': 'Θεμέλια backend', 'about.focusBackendText': 'Μαθαίνω να χτίζω καθαρές, αξιόπιστες υπηρεσίες και ροές εργασίας.', 'about.focusTeachingTitle': 'Διδασκαλία & επικοινωνία', 'about.focusTeachingText': 'Εξηγώ σύνθετες ιδέες με υπομονή και ακρίβεια.', 'about.principleLabel': 'Αρχή εργασίας', 'about.principle': 'Κάνε το σύνθετο κατανοητό, μετά κάνε τη λύση χρήσιμη.',
            'stats.tutoring': 'Χρόνια διδασκαλίας', 'stats.degree': 'Θεωρητικά Μαθηματικά', 'stats.curiosity': 'Περιέργεια',
            'meta.born': 'Γεννημένος 24/11/1992', 'meta.nationality': 'Έλληνας', 'meta.languages': 'Αγγλικά B2 · Γαλλικά A2', 'meta.military': 'Εκπληρωμένες στρατιωτικές υποχρεώσεις',
            'experience.tag': 'Εμπειρία', 'experience.title': 'Διδασκαλία & Καθοδήγηση', 'experience.subtitle': 'Πάνω από 9 χρόνια ιδιαίτερων μαθημάτων σε φοιτητές και μαθητές λυκείου.', 'experience.calculusTitle': 'Απειροστικός Λογισμός & Ανάλυση', 'experience.calculusText': 'Διαφορικός & Ολοκληρωτικός Λογισμός, Πραγματική Ανάλυση, ακολουθίες και σειρές.', 'experience.algebraTitle': 'Άλγεβρα & Λογική', 'experience.algebraText': 'Γραμμική Άλγεβρα, Προτασιακός Λογισμός, Αφηρημένη Άλγεβρα, Θεωρία Αριθμών.', 'experience.probabilityTitle': 'Πιθανότητες & Στατιστική', 'experience.probabilityText': 'Θεωρία πιθανοτήτων, Στατιστική, Κατανομές, Έλεγχος υποθέσεων.', 'experience.equationsTitle': 'Διαφορικές Εξισώσεις', 'experience.equationsText': 'ΣΔΕ, ΜΔΕ, εφαρμογές στη φυσική και τη μηχανική.', 'experience.pythonTitle': 'Προγραμματισμός Python', 'experience.pythonText': 'Εισαγωγή στον προγραμματισμό, ανάλυση δεδομένων και επιστημονικός υπολογισμός.', 'experience.geometryTitle': 'Γεωμετρία', 'experience.geometryText': 'Ευκλείδεια και αναλυτική γεωμετρία, διανυσματικοί χώροι.',
            'skills.tag': 'Δεξιότητες', 'skills.title': 'Τεχνολογίες', 'skills.subtitle': 'Γλώσσες, εργαλεία και πλατφόρμες που χρησιμοποιώ.',
            'activity.intro': 'Εξερευνήστε τη δημόσια δραστηριότητά μου στο GitHub.', 'activity.label': 'Δημόσια δραστηριότητα', 'activity.viewProfile': 'Προβολή προφίλ', 'activity.loading': 'Φόρτωση συνεισφορών…', 'activity.mon': 'Δευ', 'activity.wed': 'Τετ', 'activity.fri': 'Παρ', 'activity.less': 'Λιγότερες', 'activity.more': 'Περισσότερες', 'activity.contributions': '{n} συνεισφορές τον τελευταίο χρόνο', 'activity.oneContribution': '1 συνεισφορά τον τελευταίο χρόνο', 'activity.none': 'Καμία συνεισφορά τον τελευταίο χρόνο', 'activity.error': 'Τα δεδομένα συνεισφορών δεν είναι διαθέσιμα αυτή τη στιγμή.',
            'projects.tag': 'Έργα', 'projects.title': 'Αποθετήρια GitHub', 'projects.subtitle': 'Ζωντανή ροή από', 'projects.loading': 'Φόρτωση αποθετηρίων…', 'projects.viewAll': 'Προβολή όλων στο GitHub', 'projects.noDescription': 'Δεν υπάρχει περιγραφή.', 'projects.error': 'Δεν ήταν δυνατή η φόρτωση των αποθετηρίων. Επισκεφθείτε απευθείας το προφίλ στο GitHub.', 'projects.updated': 'Ενημερώθηκε',
            'contact.tag': 'Επικοινωνία', 'contact.title': 'Ας συνδεθούμε', 'contact.subtitle': 'Είμαι πάντα ανοιχτός να συζητήσω για data science, backend engineering ή ενδιαφέροντα μαθηματικά προβλήματα.', 'contact.name': 'Το όνομά σας', 'contact.email': 'Διεύθυνση email', 'contact.messageLabel': 'Πώς μπορώ να βοηθήσω;', 'contact.messagePlaceholder': 'Πείτε μου λίγα λόγια για το έργο ή την ερώτησή σας.', 'contact.send': 'Αποστολή αιτήματος', 'contact.directEmail': 'Ή στείλτε μου email απευθείας', 'contact.success': 'Ευχαριστώ! Το μήνυμά σας στάλθηκε.', 'contact.sending': 'Αποστολή…', 'contact.errorMessage': 'Κάτι πήγε λάθος. Δοκιμάστε ξανά ή στείλτε email απευθείας.', 'contact.validationError': 'Συμπληρώστε όλα τα πεδία με έγκυρη διεύθυνση email.', 'contact.eyebrow': 'Ξεκινήστε μια συζήτηση', 'contact.problem': 'Έχετε ένα πρόβλημα που αξίζει λύση;', 'contact.copy': 'Είτε χτίζετε μια ροή δεδομένων, είτε βελτιώνετε ένα backend, είτε χρειάζεστε έναν υπομονετικό καθηγητή μαθηματικών, θα χαρώ να ακούσω τι δουλεύετε.',
            'footer': '© 2026 Nikos Zevgolis. Φτιαγμένο με φροντίδα και Python.'
        }
    };

    function getStoredLang() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (SUPPORTED.indexOf(stored) !== -1) return stored;
        } catch (e) {}
        return DEFAULT_LANG;
    }

    function getByPath(obj, path) {
        var parts = path.split('.'), cur = obj;
        for (var i = 0; i < parts.length; i++) {
            if (cur == null || typeof cur !== 'object') return undefined;
            cur = cur[parts[i]];
        }
        return cur;
    }

    function applyTranslations(lang) {
        var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var val = getByPath(dict, el.getAttribute('data-i18n'));
            if (typeof val === 'string') el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var val = getByPath(dict, el.getAttribute('data-i18n-html'));
            if (typeof val === 'string') el.innerHTML = val;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var val = getByPath(dict, el.getAttribute('data-i18n-placeholder'));
            if (typeof val === 'string') el.setAttribute('placeholder', val);
        });
        document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
            var val = getByPath(dict, el.getAttribute('data-i18n-label'));
            if (typeof val === 'string') el.setAttribute('aria-label', val);
        });
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
    }

    function setLanguage(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        applyTranslations(lang);
    }

    function t(key) {
        var dict = TRANSLATIONS[getStoredLang()] || TRANSLATIONS[DEFAULT_LANG];
        var val = getByPath(dict, key);
        return typeof val === 'undefined' ? key : val;
    }

    function init() {
        var select = document.getElementById('languageSelect');
        if (!select) return;

        // Add the 10 extra languages dynamically
        for (var code in EXTRA_LANGS) {
            if (!select.querySelector('option[value="' + code + '"]')) {
                var opt = document.createElement('option');
                opt.value = code;
                opt.textContent = EXTRA_LANGS[code];
                select.appendChild(opt);
            }
        }

        // Determine active language
        var activeLang = getStoredLang();
        var gtCookie = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
        if (gtCookie && EXTRA_LANGS[gtCookie[1]]) activeLang = gtCookie[1];
        select.value = activeLang;

        if (SUPPORTED.indexOf(activeLang) !== -1) applyTranslations(activeLang);

        select.addEventListener('change', function (e) {
            var lang = e.target.value;
            if (SUPPORTED.indexOf(lang) !== -1) {
                // Return to Custom Native Translation
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
                setLanguage(lang);
                if (gtCookie) window.location.reload(); 
            } else {
                // Trigger Google Translate
                var gtCombo = document.querySelector('.goog-te-combo');
                if (gtCombo) {
                    gtCombo.value = lang;
                    gtCombo.dispatchEvent(new Event('change'));
                } else {
                    document.cookie = 'googtrans=/auto/' + lang + '; path=/';
                    window.location.reload();
                }
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    window.i18n = { t: t, setLanguage: setLanguage, getLanguage: getStoredLang };
})();

// 3. NAVIGATION, SCROLL, & FADE-IN
(function () {
    'use strict';
    var header, navToggle, navLinks, links;
    var btnTop;
    var lastScrollY = 0, ticking = false;
    var DESKTOP_MIN = 761, SHOW_TOP_AFTER = 420;

    function setMenu(open) {
        if (!navLinks) return;
        navLinks.classList.toggle('is-open', open);
        if (navToggle) navToggle.setAttribute('aria-expanded', String(open));
    }

    function handleScroll() {
        var y = window.scrollY || window.pageYOffset;
        var delta = y - lastScrollY;

        // Nav Hide/Show
        if (Math.abs(delta) > 6) {
            if (delta > 0 && y > 120) {
                if (header) header.classList.add('header--hidden');
                setMenu(false);
            } else {
                if (header) header.classList.remove('header--hidden');
            }
            lastScrollY = y;
        }

        // Scroll Top Button
        if (btnTop) btnTop.classList.toggle('is-visible', y > SHOW_TOP_AFTER);

        // Active Link
        if (links && links.length) {
            var currentId = '';
            for (var i = 0; i < links.length; i++) {
                var href = links[i].getAttribute('href') || '';
                if (href.charAt(0) !== '#' || href === '#') continue;
                var section = document.querySelector(href);
                if (section && y >= section.offsetTop - 140) currentId = href;
            }
            if (y < 80) currentId = '';
            links.forEach(function (link) {
                link.classList.toggle('is-active', link.getAttribute('href') === currentId);
            });
        }
        ticking = false;
    }

    function onScroll() {
        if (!ticking) { window.requestAnimationFrame(handleScroll); ticking = true; }
    }

    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href === '#') return;
            link.addEventListener('click', function (e) {
                var target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: reduce ? 'auto' : 'smooth'
                });
                if (history.replaceState) history.replaceState(null, '', href);
                setMenu(false);
            });
        });
    }

    function initFadeIn() {
        var elements = document.querySelectorAll('.fade-in');
        if (!elements.length) return;
        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        elements.forEach(function (el) { observer.observe(el); });
    }

    function init() {
        header = document.getElementById('siteHeader') || document.querySelector('.header');
        navToggle = document.getElementById('navToggle');
        navLinks = document.getElementById('navLinks');
        btnTop = document.getElementById('scrollTop');

        if (navLinks) links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
        if (navToggle) {
            navToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                setMenu(!navLinks.classList.contains('is-open'));
            });
        }
        if (btnTop) {
            btnTop.addEventListener('click', function() {
                var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', function() { if (window.innerWidth >= DESKTOP_MIN) setMenu(false); }, { passive: true });
        document.addEventListener('click', function(e) {
            if (navLinks && navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && (!navToggle || !navToggle.contains(e.target))) setMenu(false);
        });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') setMenu(false); });

        initSmoothAnchors();
        initFadeIn();
        lastScrollY = window.scrollY || 0;
        handleScroll();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

// 4. CONTACT FORM
(function () {
    'use strict';
    var form, statusEl, successEl, submitBtn, submitLabel;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function t(key) { return window.i18n ? window.i18n.t(key) : key; }

    function setStatus(msg, isErr) {
        if (!statusEl) return;
        statusEl.textContent = msg || '';
        statusEl.classList.toggle('form-status--error', !!isErr);
    }

    function handleSubmit(e) {
        e.preventDefault();
        var name = form.querySelector('#contact-name'), email = form.querySelector('#contact-email'), msg = form.querySelector('#contact-message');
        if (!name.value.trim() || !EMAIL_RE.test(email.value.trim()) || !msg.value.trim()) {
            return setStatus(t('contact.validationError'), true);
        }
        setStatus('', false);
        if (submitBtn) submitBtn.disabled = true;
        if (submitLabel) submitLabel.textContent = t('contact.sending');

        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
            .then(function(res) {
                if (!res.ok) throw new Error();
                if (successEl) successEl.classList.add('is-visible');
                form.reset();
            })
            .catch(function() { setStatus(t('contact.errorMessage'), true); })
            .finally(function() {
                if (submitBtn) submitBtn.disabled = false;
                if (submitLabel) submitLabel.textContent = t('contact.send');
            });
    }

    function init() {
        form = document.getElementById('contactForm');
        if (!form) return;
        statusEl = document.getElementById('formStatus');
        successEl = document.getElementById('formSuccess');
        submitBtn = form.querySelector('.contact__submit');
        submitLabel = submitBtn ? submitBtn.querySelector('[data-i18n="contact.send"]') || submitBtn.querySelector('span') : null;

        form.addEventListener('submit', handleSubmit);
        form.addEventListener('input', function () {
            if (statusEl && statusEl.textContent) setStatus('', false);
            if (successEl) successEl.classList.remove('is-visible');
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();