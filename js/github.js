
// Fetch GitHub repos
const repoGrid = document.getElementById('repoGrid');
const GITHUB_USERNAME = 'nzevgolisda';
const contributionGrid = document.getElementById('contributionGrid');
const contributionMonths = document.getElementById('contributionMonths');
const contributionTotal = document.getElementById('contributionTotal');
const contributionYear = document.getElementById('contributionYear');
const FALLBACK_REPOS = [
    {
        name: 'nzevgolisda.github.io',
        html_url: 'https://github.com/nzevgolisda/nzevgolisda.github.io',
        description: 'Personal portfolio website.',
        language: 'HTML',
        stargazers_count: 1,
        forks_count: 0,
    },
    {
        name: 'tox.gr-frontend',
        html_url: 'https://github.com/nzevgolisda/tox.gr-frontend',
        description: 'Frontend for a social messaging and forum application.',
        language: 'CSS',
        stargazers_count: 1,
        forks_count: 0,
    },
    {
        name: 'dev-toolkit',
        html_url: 'https://github.com/nzevgolisda/dev-toolkit',
        description: 'Dashboards, engines, visualizers, and utilities for web and data.',
        language: 'HTML',
        stargazers_count: 1,
        forks_count: 0,
    },
    {
        name: 'Games',
        html_url: 'https://github.com/nzevgolisda/Games',
        description: 'Board games and casual old-school shooters.',
        language: 'Python',
        stargazers_count: 1,
        forks_count: 0,
    },
    {
        name: 'science-tools',
        html_url: 'https://github.com/nzevgolisda/science-tools',
        description: 'Reusable modules for numerical calculus, simulations, algebra, and geometry.',
        language: 'Python',
        stargazers_count: 1,
        forks_count: 0,
    },
    {
        name: 'minesweeper_python',
        html_url: 'https://github.com/nzevgolisda/minesweeper_python',
        description: 'A Minesweeper game in Python using Pygame.',
        language: 'Python',
        stargazers_count: 1,
        forks_count: 0,
    },
];

async function fetchRepos() {
    if (!repoGrid) return;

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
            { headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();
        if (!Array.isArray(repos)) throw new Error('Invalid GitHub API response');
        renderRepos(repos);
    } catch (error) {
        renderRepos(FALLBACK_REPOS);
        console.error(error);
    }
}

function renderRepos(repos) {
    if (!repos.length) {
        repoGrid.innerHTML = `<div class="loading">No public repositories found.</div>`;
        return;
    }
    repoGrid.innerHTML = repos.map(function(repo) {
        return `
            <div class="repo-card fade-in">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided.'}</p>
                <div class="repo-meta">
                    <span>
                        ${repo.language ? `<span class="repo-language-dot" style="background:${getLanguageColor(repo.language)}"></span> ${repo.language}` : '🌐'}
                    </span>
                    <span>⭐ ${repo.stargazers_count} · 🍴 ${repo.forks_count}</span>
                </div>
            </div>
        `;
    }).join('');
    // Re-trigger fade-in
    document.querySelectorAll('.repo-card.fade-in').forEach(function(el, i) {
        el.style.animationDelay = (i * 0.06) + 's';
    });
}

function getLanguageColor(lang) {
    const colors = {
        Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c',
        SQL: '#e38c00', JupyterNotebook: '#DA5B0B', TypeScript: '#3178c6',
        Java: '#b07219', C: '#555555', 'C++': '#f34b7d', Ruby: '#701516',
        Go: '#00ADD8', Rust: '#dea584', Swift: '#ffac45', PHP: '#4F5D95', Shell: '#89e051'
    };
    return colors[lang] || '#6b7a93';
}

async function fetchContributions() {
    if (!contributionGrid) return;

    try {
        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!response.ok) throw new Error('Contribution API error');

        const data = await response.json();
        if (!Array.isArray(data.contributions) || !data.contributions.length) {
            throw new Error('Invalid contribution response');
        }

        renderContributions(data);
    } catch (error) {
        console.error(error);
    }
}

function renderContributions(data) {
    const contributions = data.contributions;
    const weeks = Math.ceil(contributions.length / 7);
    const contributionGraph = contributionGrid.closest('.contribution-graph');

    contributionGrid.innerHTML = contributions.map(function(contribution) {
        const level = Math.max(0, Math.min(4, Number(contribution.level) || 0));
        return `<span class="level-${level}" title="${contribution.date}: ${contribution.count} contributions"></span>`;
    }).join('');
    if (contributionGraph) {
        contributionGraph.style.setProperty('--week-count', weeks);
    }

    if (contributionTotal && data.total && data.total.lastYear !== undefined) {
        contributionTotal.textContent = `${data.total.lastYear} contributions in the last year`;
    }

    if (contributionYear) {
        const lastDate = contributions[contributions.length - 1].date;
        contributionYear.textContent = new Date(`${lastDate}T00:00:00`).getFullYear();
    }

    if (contributionMonths) {
        const months = [];
        contributions.forEach(function(contribution, index) {
            const date = new Date(`${contribution.date}T00:00:00`);
            if (date.getDate() <= 7 && date.getDay() === 0) {
                months.push({
                    label: date.toLocaleString('en', { month: 'short' }),
                    start: Math.floor(index / 7),
                });
            }
        });

        contributionMonths.innerHTML = months.map(function(month, index) {
            const nextStart = months[index + 1] ? months[index + 1].start : weeks;
            const span = Math.max(1, nextStart - month.start);
            return `<span style="grid-column: ${month.start + 1} / span ${span};">${month.label}</span>`;
        }).join('');
    }
}

fetchRepos();
fetchContributions();