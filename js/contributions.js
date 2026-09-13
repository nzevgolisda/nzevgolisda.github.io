(function() {
    const grid = document.getElementById('contributionGrid');
    const graph = grid ? grid.closest('.contribution-graph') : null;
    const weekCount = 53;

    if (!grid) return;

    if (graph) {
        graph.style.setProperty('--week-count', weekCount);
    }

    grid.innerHTML = Array.from({ length: weekCount * 7 }, function() {
        return '<span class="level-0"></span>';
    }).join('');
})();
