// Language toggle
const languageToggle = document.getElementById('languageToggle');

if (languageToggle) {
    const translations = {
        en: {
            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'hero.availability': 'Available for data & backend projects',
            'hero.title': 'Math Enthusiast',
            'hero.ready': 'ready',
            'hero.codeComment': '# teach clearly, build carefully',
            'hero.deliberate': 'deliberate by design',
            'hero.noShortcuts': '● no shortcuts',
            'hero.subtitle': 'Theoretical Mathematics graduate from the University of Crete with 9+ years of tutoring experience. I combine mathematical reasoning with practical software engineering to turn complex problems into clear, useful solutions.',
            'hero.explore': 'Explore my work',
            'hero.meta': 'data / APIs / teaching',
            'common.downloadCv': 'Download CV',
            'about.tag': 'About',
            'about.title': 'Who I am',
            'about.subtitle': 'I am a mathematics graduate who enjoys making difficult ideas easier to understand and practical problems easier to solve. My next step is a career in <strong>data science and backend development</strong>, where careful reasoning can become useful software.',
            'about.profileOne': 'My background gives me a patient, structured approach to learning and problem solving. After more than nine years of tutoring, I know how to listen closely, explain clearly, and adapt when the first approach is not the right one.',
            'about.profileTwo': 'I have worked with Python, JavaScript, SQL, HTML, and data tools through personal and collaborative projects. I am continuing to grow as a developer while building a strong foundation in analytics, APIs, and reliable systems.',
            'about.focusDataTitle': 'Data & insight',
            'about.focusDataText': 'Turning structured information into decisions people can use.',
            'about.focusBackendTitle': 'Backend foundations',
            'about.focusBackendText': 'Learning to build clear, dependable services and workflows.',
            'about.focusTeachingTitle': 'Teaching & communication',
            'about.focusTeachingText': 'Explaining complex ideas with patience and precision.',
            'about.principleLabel': 'Working principle',
            'about.principle': 'Make the complex clear, then make the solution useful.',
            'stats.tutoring': 'Years tutoring',
            'stats.degree': 'Theoretical Mathematics',
            'stats.curiosity': 'Curiosity',
            'meta.nationality': 'Greek',
            'meta.languages': 'English B2 · French A2',
            'meta.military': 'Military fulfilled',
            'experience.tag': 'Experience',
            'experience.title': 'Teaching & Mentoring',
            'experience.subtitle': 'Over 9 years of private tutoring for university and senior high-school students.',
            'experience.calculusTitle': 'Calculus & Analysis',
            'experience.calculusText': 'Differential & Integral Calculus, Real Analysis, sequences and series.',
            'experience.algebraTitle': 'Algebra & Logic',
            'experience.algebraText': 'Linear Algebra, Propositional Calculus, Abstract Algebra, Number Theory.',
            'experience.probabilityTitle': 'Probability & Stats',
            'experience.probabilityText': 'Probability theory, Statistics, Distributions, Hypothesis testing.',
            'experience.equationsTitle': 'Differential Equations',
            'experience.equationsText': 'ODE, PDE, applications in physics and engineering.',
            'experience.pythonTitle': 'Python Programming',
            'experience.pythonText': 'Introduction to programming, data analysis, and scientific computing.',
            'experience.geometryTitle': 'Geometry',
            'experience.geometryText': 'Euclidean and analytic geometry, vector spaces.',
            'skills.tag': 'Skills',
            'skills.title': 'Tech Stack',
            'skills.subtitle': 'Languages, tools, and platforms I work with.',
            'projects.tag': 'Projects',
            'projects.title': 'GitHub Repositories',
            'projects.subtitle': 'Live feed from',
            'projects.loading': 'Loading repositories…',
            'projects.viewAll': 'View all on GitHub',
            'activity.intro': 'Explore my recent public work and contribution activity on GitHub.',
            'activity.label': 'Public activity',
            'activity.viewProfile': 'View profile',
            'activity.settings': 'Contribution settings',
            'activity.mon': 'Mon',
            'activity.wed': 'Wed',
            'activity.fri': 'Fri',
            'activity.less': 'Less',
            'activity.more': 'More',
            'contact.tag': 'Contact',
            'contact.title': "Let's connect",
            'contact.subtitle': "I'm always open to discussing data science, backend engineering, or interesting math problems.",
            'contact.name': 'Your name',
            'contact.email': 'Email address',
            'contact.messageLabel': 'How can I help?',
            'contact.messagePlaceholder': 'Tell me a little about your project or question.',
            'contact.send': 'Send email request',
            'contact.directEmail': 'Or email me directly',
            'contact.success': 'Thanks! Your message was sent.',
            'contact.eyebrow': 'Start a conversation',
            'contact.problem': 'Have a problem worth solving?',
            'contact.copy': 'Whether you are building a data workflow, improving a backend, or need a patient mathematics tutor, I would be glad to hear what you are working on.',
            footer: '&copy; 2026 Nikos Zevgolis. Built with care and Python.'
        },
        gr: {
            'nav.about': 'Σχετικά',
            'nav.experience': 'Εμπειρία',
            'nav.skills': 'Δεξιότητες',
            'nav.projects': 'Έργα',
            'nav.contact': 'Επικοινωνία',
            'hero.availability': 'Έτοιμος για έργα δεδομένων και backend',
            'hero.title': 'Λάτρης των Μαθηματικών',
            'hero.ready': 'έτοιμο',
            'hero.codeComment': '# δίδαξε καθαρά, χτίσε προσεκτικά',
            'hero.deliberate': 'μελετημένο από τον σχεδιασμό',
            'hero.noShortcuts': '● χωρίς συντομεύσεις',
            'hero.subtitle': 'Απόφοιτος Θεωρητικών Μαθηματικών του Πανεπιστημίου Κρήτης με περισσότερα από 9 χρόνια εμπειρίας στη διδασκαλία. Συνδυάζω τη μαθηματική σκέψη με την πρακτική ανάπτυξη λογισμικού για να μετατρέπω σύνθετα προβλήματα σε σαφείς και χρήσιμες λύσεις.',
            'hero.explore': 'Δείτε τη δουλειά μου',
            'hero.meta': 'δεδομένα / APIs / διδασκαλία',
            'common.downloadCv': 'Λήψη βιογραφικού',
            'about.tag': 'Σχετικά',
            'about.title': 'Ποιος είμαι',
            'about.subtitle': 'Είμαι απόφοιτος μαθηματικών και μου αρέσει να κάνω τις δύσκολες ιδέες πιο κατανοητές και τα πρακτικά προβλήματα πιο εύκολα στη λύση. Το επόμενο βήμα μου είναι μια καριέρα στην <strong>επιστήμη δεδομένων και την ανάπτυξη backend</strong>, όπου η προσεκτική σκέψη γίνεται χρήσιμο λογισμικό.',
            'about.profileOne': 'Το υπόβαθρό μου με έχει μάθει να προσεγγίζω τη μάθηση και την επίλυση προβλημάτων με υπομονή και μεθοδικότητα. Μετά από περισσότερα από εννέα χρόνια διδασκαλίας, ξέρω να ακούω προσεκτικά, να εξηγώ καθαρά και να προσαρμόζομαι όταν η πρώτη προσέγγιση δεν είναι η σωστή.',
            'about.profileTwo': 'Έχω εργαστεί με Python, JavaScript, SQL, HTML και εργαλεία δεδομένων μέσα από προσωπικά και συνεργατικά έργα. Συνεχίζω να εξελίσσομαι ως developer, χτίζοντας ισχυρές βάσεις στην ανάλυση, τα APIs και τα αξιόπιστα συστήματα.',
            'about.focusDataTitle': 'Δεδομένα και insight',
            'about.focusDataText': 'Μετατρέπω δομημένες πληροφορίες σε αποφάσεις που μπορούν να χρησιμοποιηθούν.',
            'about.focusBackendTitle': 'Βάσεις backend',
            'about.focusBackendText': 'Μαθαίνω να δημιουργώ σαφείς και αξιόπιστες υπηρεσίες και ροές εργασίας.',
            'about.focusTeachingTitle': 'Διδασκαλία και επικοινωνία',
            'about.focusTeachingText': 'Εξηγώ σύνθετες ιδέες με υπομονή και ακρίβεια.',
            'about.principleLabel': 'Αρχή εργασίας',
            'about.principle': 'Κάνε το σύνθετο κατανοητό και μετά κάνε τη λύση χρήσιμη.',
            'stats.tutoring': 'Χρόνια διδασκαλίας',
            'stats.degree': 'Θεωρητικά Μαθηματικά',
            'stats.curiosity': 'Περιέργεια',
            'meta.nationality': 'Έλληνας',
            'meta.languages': 'Αγγλικά B2 · Γαλλικά A2',
            'meta.military': 'Εκπληρωμένη στρατιωτική θητεία',
            'experience.tag': 'Εμπειρία',
            'experience.title': 'Διδασκαλία και καθοδήγηση',
            'experience.subtitle': 'Περισσότερα από 9 χρόνια ιδιαίτερων μαθημάτων σε φοιτητές και μαθητές λυκείου.',
            'experience.calculusTitle': 'Απειροστικός Λογισμός και Ανάλυση',
            'experience.calculusText': 'Διαφορικός και ολοκληρωτικός λογισμός, πραγματική ανάλυση, ακολουθίες και σειρές.',
            'experience.algebraTitle': 'Άλγεβρα και Λογική',
            'experience.algebraText': 'Γραμμική άλγεβρα, προτασιακός λογισμός, αφηρημένη άλγεβρα, θεωρία αριθμών.',
            'experience.probabilityTitle': 'Πιθανότητες και Στατιστική',
            'experience.probabilityText': 'Θεωρία πιθανοτήτων, στατιστική, κατανομές, έλεγχοι υποθέσεων.',
            'experience.equationsTitle': 'Διαφορικές Εξισώσεις',
            'experience.equationsText': 'Συνήθεις και μερικές διαφορικές εξισώσεις, εφαρμογές στη φυσική και τη μηχανική.',
            'experience.pythonTitle': 'Προγραμματισμός Python',
            'experience.pythonText': 'Εισαγωγή στον προγραμματισμό, ανάλυση δεδομένων και επιστημονικοί υπολογισμοί.',
            'experience.geometryTitle': 'Γεωμετρία',
            'experience.geometryText': 'Ευκλείδεια και αναλυτική γεωμετρία, διανυσματικοί χώροι.',
            'skills.tag': 'Δεξιότητες',
            'skills.title': 'Τεχνολογίες',
            'skills.subtitle': 'Γλώσσες, εργαλεία και πλατφόρμες που χρησιμοποιώ.',
            'projects.tag': 'Έργα',
            'projects.title': 'Αποθετήρια GitHub',
            'projects.subtitle': 'Ζωντανή ροή από',
            'projects.loading': 'Φόρτωση αποθετηρίων…',
            'projects.viewAll': 'Δείτε όλα στο GitHub',
            'activity.intro': 'Εξερευνήστε την πρόσφατη δημόσια δουλειά και τη δραστηριότητά μου στο GitHub.',
            'activity.label': 'Δημόσια δραστηριότητα',
            'activity.viewProfile': 'Προβολή προφίλ',
            'activity.settings': 'Ρυθμίσεις συνεισφορών',
            'activity.mon': 'Δευ',
            'activity.wed': 'Τετ',
            'activity.fri': 'Παρ',
            'activity.less': 'Λιγότερα',
            'activity.more': 'Περισσότερα',
            'contact.tag': 'Επικοινωνία',
            'contact.title': 'Ας μιλήσουμε',
            'contact.subtitle': 'Είμαι πάντα ανοιχτός να συζητήσουμε για επιστήμη δεδομένων, ανάπτυξη backend ή ενδιαφέροντα μαθηματικά προβλήματα.',
            'contact.name': 'Το όνομά σας',
            'contact.email': 'Διεύθυνση email',
            'contact.messageLabel': 'Πώς μπορώ να βοηθήσω;',
            'contact.messagePlaceholder': 'Πείτε μου λίγα λόγια για το έργο ή την ερώτησή σας.',
            'contact.send': 'Αποστολή αιτήματος email',
            'contact.directEmail': 'Ή στείλτε μου email απευθείας',
            'contact.success': 'Ευχαριστώ! Το μήνυμά σας στάλθηκε.',
            'contact.eyebrow': 'Ας ξεκινήσουμε μια συζήτηση',
            'contact.problem': 'Έχετε ένα πρόβλημα που αξίζει να λυθεί;',
            'contact.copy': 'Είτε δημιουργείτε μια ροή δεδομένων, βελτιώνετε ένα backend είτε χρειάζεστε έναν υπομονετικό καθηγητή μαθηματικών, θα χαρώ να ακούσω τι δουλεύετε.',
            footer: '&copy; 2026 Νίκος Ζευγόλης. Δημιουργήθηκε με φροντίδα και Python.'
        }
    };

    function getStoredLanguage() {
        try {
            return localStorage.getItem('language') === 'gr' ? 'gr' : 'en';
        } catch (error) {
            return 'en';
        }
    }

    function applyLanguage(language) {
        const dictionary = translations[language];
        document.documentElement.lang = language === 'gr' ? 'el' : 'en';
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            const value = dictionary[element.dataset.i18n];
            if (value) element.innerHTML = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(element) {
            const value = dictionary[element.dataset.i18nPlaceholder];
            if (value) element.setAttribute('placeholder', value);
        });
        languageToggle.setAttribute('aria-pressed', String(language === 'gr'));
        languageToggle.setAttribute('aria-label', language === 'gr' ? 'Switch to English' : 'Switch to Greek');
        document.getElementById('languageToggleLabel').textContent = language === 'gr' ? 'EN' : 'GR';
        document.title = language === 'gr' ? 'Νίκος Ζευγόλης · Data & Backend' : 'Nikos Zevgolis · Data & Backend';
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: language } }));
    }

    let language = getStoredLanguage();
    applyLanguage(language);

    languageToggle.addEventListener('click', function() {
        language = language === 'en' ? 'gr' : 'en';
        try {
            localStorage.setItem('language', language);
        } catch (error) {
            // Ignore storage failures gracefully.
        }
        applyLanguage(language);
    });
}
