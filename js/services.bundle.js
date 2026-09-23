// 1. GITHUB REPOSITORIES
(function () {
    'use strict';
    var USERNAME = 'nzevgolisda';
    var API = 'https://api.github.com/users/' + USERNAME + '/repos?sort=updated&per_page=6';
    var FALLBACK = [
        { name: 'nzevgolisda.github.io', description: 'Personal portfolio built with plain HTML, CSS, and JavaScript.', html_url: 'https://github.com/nzevgolisda/nzevgolisda.github.io', language: 'HTML', stargazers_count: 0, forks_count: 0 },
        { name: 'python-data-projects', description: 'Exploratory data analysis scripts using pandas, Matplotlib, and Seaborn.', html_url: 'https://github.com/nzevgolisda', language: 'Python', stargazers_count: 0, forks_count: 0 },
        { name: 'sql-practice', description: 'Relational database queries and schema exercises with MySQL and PostgreSQL.', html_url: 'https://github.com/nzevgolisda', language: 'SQL', stargazers_count: 0, forks_count: 0 }
    ];
    var LANG_COLORS = { Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c', SQL: '#e38c00' };

    var grid;
    var lastRepos = null;

    function t(key) { return window.i18n ? window.i18n.t(key) : key; }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderRepos(repos) {
        if (!grid) return;
        lastRepos = repos;

        if (!repos || !repos.length) {
            grid.innerHTML = '<p class="projects-error">' + escapeHtml(t('projects.error')) + '</p>';
            grid.setAttribute('aria-busy', 'false');
            return;
        }

        var frag = document.createDocumentFragment();
        repos.forEach(function (repo) {
            var color = LANG_COLORS[repo.language] || 'var(--accent)';
            var article = document.createElement('article');
            article.className = 'project-card fade-in';
            article.innerHTML =
                '<div class="project-card__header">' +
                    '<h3 class="project-card__title">' +
                        '<a href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noopener noreferrer">' +
                            escapeHtml(repo.name) +
                        '</a>' +
                    '</h3>' +
                '</div>' +
                '<p class="project-card__desc">' +
                    escapeHtml(repo.description || t('projects.noDescription')) +
                '</p>' +
                '<div class="project-card__meta">' +
                    (repo.language
                        ? '<span class="project-card__lang"><span class="project-card__lang-dot" style="background:' + color + '"></span>' + escapeHtml(repo.language) + '</span>'
                        : '') +
                    '<span class="project-card__stat"><i class="fas fa-star" aria-hidden="true"></i>' + (repo.stargazers_count || 0) + '</span>' +
                '</div>';
            frag.appendChild(article);
        });

        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');

        requestAnimationFrame(function () {
            grid.querySelectorAll('.fade-in').forEach(function (el) {
                el.classList.add('is-visible');
            });
        });
    }

    function init() {
        grid = document.getElementById('repoGrid');
        if (!grid) return;

        fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
            .then(function (res) {
                if (!res.ok) throw new Error('bad status');
                return res.json();
            })
            .then(function (data) {
                renderRepos(Array.isArray(data) && data.length ? data : FALLBACK);
            })
            .catch(function () { renderRepos(FALLBACK); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    document.addEventListener('languagechange', function () {
        if (lastRepos) renderRepos(lastRepos);
    });
})();

// 2. GITHUB CONTRIBUTIONS
(function () {
    'use strict';
    var USERNAME = 'nzevgolisda';
    var API = 'https://github-contributions-api.jogruber.de/v4/' + USERNAME + '?y=last';
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var grid, monthsEl, totalEl, yearEl;
    var lastContribs = null;

    function t(key) { return window.i18n ? window.i18n.t(key) : key; }

    function padStart(contributions) {
        // Sunday-start weeks (GitHub convention)
        var first = new Date(contributions[0].date + 'T00:00:00');
        return first.getDay(); // 0 = Sunday
    }

    function updateTotal(c) {
        if (!totalEl) return;
        var sum = c.reduce(function (s, x) { return s + x.count; }, 0);
        if (sum === 0) {
            totalEl.textContent = t('activity.none');
        } else if (sum === 1) {
            totalEl.textContent = t('activity.oneContribution');
        } else {
            totalEl.textContent = t('activity.contributions').replace('{n}', sum);
        }
    }

    function buildGrid(c) {
        if (!grid) return;
        var pad = padStart(c);
        var frag = document.createDocumentFragment();

        for (var i = 0; i < pad; i++) {
            var empty = document.createElement('div');
            empty.className = 'contrib-cell contrib-level level-0';
            empty.style.visibility = 'hidden';
            frag.appendChild(empty);
        }

        c.forEach(function (day) {
            var cell = document.createElement('div');
            cell.className = 'contrib-cell contrib-level level-' + day.level;
            cell.title = day.date + ': ' + day.count;
            frag.appendChild(cell);
        });

        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');
    }

    function buildMonths(c) {
        if (!monthsEl) return;
        var pad = padStart(c);
        var totalCells = pad + c.length;
        var numWeeks = Math.ceil(totalCells / 7);
        var frag = document.createDocumentFragment();
        var lastMonth = -1;

        for (var w = 0; w < numWeeks; w++) {
            var idx = w * 7 - pad;
            if (idx < 0) idx = 0;

            var label = '';
            if (idx < c.length) {
                var d = new Date(c[idx].date + 'T00:00:00');
                var m = d.getMonth();
                if (m !== lastMonth) {
                    label = MONTHS[m];
                    lastMonth = m;
                }
            }

            var cell = document.createElement('div');
            cell.textContent = label;
            frag.appendChild(cell);
        }

        monthsEl.innerHTML = '';
        monthsEl.appendChild(frag);
    }

    function renderAll(c) {
        lastContribs = c;
        updateTotal(c);
        buildGrid(c);
        buildMonths(c);
    }

    function init() {
        grid = document.getElementById('contributionGrid');
        monthsEl = document.getElementById('contributionMonths');
        totalEl = document.getElementById('contributionTotal');
        yearEl = document.getElementById('contributionYear');

        if (yearEl) yearEl.textContent = String(new Date().getFullYear());
        if (!grid) return;

        fetch(API)
            .then(function (res) {
                if (!res.ok) throw new Error('bad status');
                return res.json();
            })
            .then(function (data) {
                var c = (data && data.contributions) || [];
                if (!c.length) throw new Error('empty');
                c.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
                renderAll(c);
            })
            .catch(function () {
                if (totalEl) totalEl.textContent = t('activity.error');
            });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    document.addEventListener('languagechange', function () {
        if (lastContribs) updateTotal(lastContribs);
    });
})();

// 3. GOOGLE TRANSLATE INIT
window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate) return;
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,el,es,zh-CN,hi,ar,pt,bn,ru,ja,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};