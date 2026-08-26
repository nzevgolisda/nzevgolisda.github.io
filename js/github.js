
// Fetch GitHub repos
const repoGrid = document.getElementById('repoGrid');
const GITHUB_USERNAME = 'nzevgolisda';

async function fetchRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();
        renderRepos(repos);
    } catch (error) {
        repoGrid.innerHTML =
            `<div class="error-msg">⚠️ Could not load repositories. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">View on GitHub</a></div>`;
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

fetchRepos();