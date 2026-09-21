// Fetch repositories from GitHub API with fallback mechanism
document.addEventListener("DOMContentLoaded", async () => {
    const repoGrid = document.getElementById("repoGrid");
    if (!repoGrid) return;

    try {
        const response = await fetch("https://api.github.com/users/nzevgolisda/repos?sort=updated&per_page=6");
        if (!response.ok) throw new Error("API rate limit or network issue");
        const repos = await response.json();
        
        repoGrid.innerHTML = "";
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                <p>${repo.description || "No description provided."}</p>
                <div class="project-meta"><span><i class="fas fa-code"></i> ${repo.language || "Code"}</span></div>
            `;
            repoGrid.appendChild(card);
        });
    } catch (error) {
        repoGrid.innerHTML = `<p class="fallback-text">Could not load live repositories at the moment. Please visit <a href="https://github.com/nzevgolisda" target="_blank">GitHub profile</a> directly.</p>`;
    }
});