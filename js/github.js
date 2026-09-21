(function () {
    'use strict';

    var USERNAME = 'nzevgolisda';
    var API =
        'https://api.github.com/users/' +
        USERNAME +
        '/repos?sort=updated&per_page=6';

    var FALLBACK = [
        {
            name: 'nzevgolisda.github.io',
            description: 'Personal portfolio built with plain HTML, CSS, and JavaScript.',
            html_url: 'https://github.com/nzevgolisda/nzevgolisda.github.io',
            language: 'HTML',
            stargazers_count: 0,
            forks_count: 0
        },
        {
            name: 'python-data-projects',
            description: 'Exploratory data analysis scripts using pandas, Matplotlib, and Seaborn.',
            html_url: 'https://github.com/nzevgolisda',
            language: 'Python',
            stargazers_count: 0,
            forks_count: 0
        },
        {
            name: 'sql-practice',
            description: 'Relational database queries and schema exercises with MySQL and PostgreSQL.',
            html_url: 'https://github.com/nzevgolisda',
            language: 'SQL',
            stargazers_count: 0,
            forks_count: 0
        }
    ];

    var grid;

    var LANG_COLORS = {
        Python: '#3572A5',
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        HTML: '#e34c26',
        CSS: '#563d7c',
        SQL: '#e38c00',
        Shell: '#89e051',
        Java: '#b07219',
        'C++': '#f34b7d',
        C: '#555555',
        Go: '#00ADD8',
        Rust: '#dea584',
        Ruby: '#701516',
        PHP: '#4F5D95',
        Jupyter: '#DA5B0B',
        'Jupyter Notebook': '#DA5B0B'
    };

    function t(key) {
        return window.i18n ? window.i18n.t(key) : key;
    }

    function escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function formatDate(iso) {
        if (!iso) return '';
        var d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        var lang = window.i18n ? window.i18n.getLanguage() : 'en';
        try {
            return d.toLocaleDateString(lang === 'el' ? 'el-GR' : 'en-US', {
                year: 'numeric',
                month: 'short'
            });
        } catch (e) {
            return d.toISOString().slice(0, 10);
        }
    }

    function renderRepos(repos) {
        if (!grid) return;

        if (!repos || !repos.length) {
            renderError();
            return;
        }

        var frag = document.createDocumentFragment();

        repos.forEach(function (repo) {
            var desc = repo.description || t('projects.noDescription');
            var color = LANG_COLORS[repo.language] || 'var(--accent)';

            var article = document.createElement('article');
            article.className = 'project-card fade-in';

            article.innerHTML =
                '<div class="project-card__header">' +
                    '<h3 class="project-card__title"><a href="' +
                        escapeHtml(repo.html_url) +
                        '" target="_blank" rel="noopener noreferrer">' +
                        escapeHtml(repo.name) +
                    '</a></h3>' +
                    '<i class="fas fa-arrow-up-right-from-square project-card__icon" aria-hidden="true"></i>' +
                '</div>' +
                '<p class="project-card__desc">' +
                    escapeHtml(desc) +
                '</p>' +
                '<div class="project-card__meta">' +
                    (repo.language
                        ? '<span class="project-card__lang">' +
                              '<span class="project-card__lang-dot" style="background:' +
                              color +
                              '"></span>' +
                              escapeHtml(repo.language) +
                          '</span>'
                        : '') +
                    '<span class="project-card__stat"><i class="fas fa-star" aria-hidden="true"></i>' +
                        (repo.stargazers_count || 0) +
                    '</span>' +
                    '<span class="project-card__stat"><i class="fas fa-code-fork" aria-hidden="true"></i>' +
                        (repo.forks_count || 0) +
                    '</span>' +
                    (repo.updated_at
                        ? '<span class="project-card__stat"><i class="far fa-clock" aria-hidden="true"></i>' +
                              escapeHtml(formatDate(repo.updated_at)) +
                          '</span>'
                        : '') +
                '</div>';

            frag.appendChild(article);
        });

        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');

        // Trigger reveal animation for newly added cards
        requestAnimationFrame(function () {
            grid.querySelectorAll('.fade-in').forEach(function (el) {
                el.classList.add('is-visible');
            });
        });
    }

    function renderError() {
        if (!grid) return;
        grid.innerHTML =
            '<div class="projects-error">' +
                '<i class="fas fa-triangle-exclamation" aria-hidden="true"></i>' +
                '<p>' + escapeHtml(t('projects.error')) + '</p>' +
                '<a href="https://github.com/' + USERNAME + '" target="_blank" rel="noopener noreferrer">github.com/' + USERNAME + '</a>' +
            '</div>';
        grid.setAttribute('aria-busy', 'false');
    }

    function load() {
        fetch(API, {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function (data) {
                if (!Array.isArray(data) || !data.length) {
                    renderRepos(FALLBACK);
                    return;
                }
                renderRepos(data);
            })
            .catch(function () {
                // Use the verified fallback list on rate limit or network error
                renderRepos(FALLBACK);
            });
    }

    function init() {
        grid = document.getElementById('repoGrid');
        if (!grid) return;
        load();

        document.addEventListener('languagechange', function () {
            // Re-render only if we're showing the fallback or error
            if (
                grid.querySelector('.projects-error') ||
                !grid.querySelector('.project-card__lang')
            ) {
                load();
            } else {
                // Update description-less cards
                grid.querySelectorAll('.project-card__desc').forEach(function (p) {
                    if (!p.textContent.trim() || p.textContent === 'No description provided.') {
                        p.textContent = t('projects.noDescription');
                    }
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();