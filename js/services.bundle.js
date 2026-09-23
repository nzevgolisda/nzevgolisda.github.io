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
    var grid;
    var LANG_COLORS = { Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c', SQL: '#e38c00' };

    function t(key) { return window.i18n ? window.i18n.t(key) : key; }
    function escapeHtml(str) { return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }

    function renderRepos(repos) {
        if (!grid) return;
        if (!repos || !repos.length) { grid.innerHTML = '<p>' + escapeHtml(t('projects.error')) + '</p>'; return; }
        
        var frag = document.createDocumentFragment();
        repos.forEach(function (repo) {
            var color = LANG_COLORS[repo.language] || 'var(--accent)';
            var article = document.createElement('article');
            article.className = 'project-card fade-in';
            article.innerHTML = '<div class="project-card__header"><h3 class="project-card__title"><a href="' + escapeHtml(repo.html_url) + '" target="_blank">' + escapeHtml(repo.name) + '</a></h3></div>' +
                '<p class="project-card__desc">' + escapeHtml(repo.description || t('projects.noDescription')) + '</p>' +
                '<div class="project-card__meta">' +
                (repo.language ? '<span class="project-card__lang"><span class="project-card__lang-dot" style="background:' + color + '"></span>' + escapeHtml(repo.language) + '</span>' : '') +
                '<span class="project-card__stat"><i class="fas fa-star"></i>' + (repo.stargazers_count || 0) + '</span></div>';
            frag.appendChild(article);
        });
        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');
        setTimeout(function() { grid.querySelectorAll('.fade-in').forEach(function(el) { el.classList.add('is-visible'); }); }, 50);
    }

    function init() {
        grid = document.getElementById('repoGrid');
        if (!grid) return;
        fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
            .then(function(res) { if (!res.ok) throw new Error(); return res.json(); })
            .then(function(data) { renderRepos(Array.isArray(data) && data.length ? data : FALLBACK); })
            .catch(function() { renderRepos(FALLBACK); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

// 2. GITHUB CONTRIBUTIONS
(function () {
    'use strict';
    var USERNAME = 'nzevgolisda';
    var API = 'https://github-contributions-api.jogruber.de/v4/' + USERNAME + '?y=last';
    var grid, monthsEl, totalEl, yearEl;

    function t(key) { return window.i18n ? window.i18n.t(key) : key; }

    function buildGrid(contributions) {
        if (!grid || !contributions.length) return;
        var frag = document.createDocumentFragment();
        contributions.forEach(function (c) {
            var cell = document.createElement('div');
            cell.className = 'contrib-cell contrib-level level-' + c.level;
            cell.title = c.date + ': ' + c.count;
            frag.appendChild(cell);
        });
        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');
    }

    function init() {
        grid = document.getElementById('contributionGrid');
        totalEl = document.getElementById('contributionTotal');
        yearEl = document.getElementById('contributionYear');
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());

        fetch(API)
            .then(function(res) { if (!res.ok) throw new Error(); return res.json(); })
            .then(function(data) {
                var c = data.contributions || [];
                if (!c.length) throw new Error();
                if (totalEl) totalEl.textContent = t('activity.contributions').replace('{n}', c.reduce(function(s, x){ return s + x.count; }, 0));
                buildGrid(c);
            })
            .catch(function() { if (totalEl) totalEl.textContent = t('activity.error'); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

// 3. GOOGLE TRANSLATE INIT
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'auto', // Επιτρέπει τη δυναμική μετάφραση από οποιαδήποτε πηγή
        includedLanguages: 'en,el,es,zh-CN,hi,ar,pt,bn,ru,ja,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};