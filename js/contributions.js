
(function () {
    'use strict';

    var USERNAME = 'nzevgolisda';
    var API = 'https://github-contributions-api.jogruber.de/v4/' + USERNAME + '?y=last';

    var grid;
    var monthsEl;
    var totalEl;
    var yearEl;

    var MONTHS_SHORT = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        el: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
    };

    function getLang() {
        try {
            return window.i18n ? window.i18n.getLanguage() : 'en';
        } catch (e) {
            return 'en';
        }
    }

    function t(key) {
        return window.i18n ? window.i18n.t(key) : key;
    }

    function formatTotal(count) {
        if (count === 0) return t('activity.none');
        if (count === 1) return t('activity.oneContribution');
        return t('activity.contributions').replace('{n}', count);
    }

    function toISODate(date) {
        var y = date.getFullYear();
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function parseISO(str) {
        var parts = str.split('-');
        return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }

    function dayOfWeek(date) {
        return date.getDay(); // 0 Sun .. 6 Sat
    }

    function buildGrid(contributions) {
        if (!contributions || !contributions.length) return;

        var map = {};
        contributions.forEach(function (c) {
            map[c.date] = c;
        });

        var first = parseISO(contributions[0].date);
        var last = parseISO(contributions[contributions.length - 1].date);

        // Back up to the previous Sunday
        var start = new Date(first.getTime());
        start.setDate(start.getDate() - dayOfWeek(start));

        // Forward to the next Saturday
        var end = new Date(last.getTime());
        end.setDate(end.getDate() + (6 - dayOfWeek(end)));

        var weeks = [];
        var cursor = new Date(start.getTime());
        var safety = 0;

        while (cursor <= end && safety < 400) {
            var week = [];
            for (var d = 0; d < 7; d++) {
                week.push(new Date(cursor.getTime()));
                cursor.setDate(cursor.getDate() + 1);
            }
            weeks.push(week);
            safety++;
        }

        render(weeks, map);
    }

    function render(weeks, map) {
        if (!grid) return;

        var frag = document.createDocumentFragment();

        weeks.forEach(function (week) {
            week.forEach(function (date) {
                var iso = toISODate(date);
                var entry = map[iso];
                var level = entry ? entry.level : 0;
                var count = entry ? entry.count : 0;

                var cell = document.createElement('div');
                cell.className = 'contrib-cell contrib-level level-' + level;
                cell.setAttribute('role', 'img');
                cell.setAttribute(
                    'aria-label',
                    iso + ' — ' + count + ' contribution' + (count === 1 ? '' : 's')
                );
                cell.title = iso + ': ' + count;
                frag.appendChild(cell);
            });
        });

        grid.innerHTML = '';
        grid.appendChild(frag);
        grid.setAttribute('aria-busy', 'false');
    }

    function renderMonths(contributions) {
        if (!monthsEl || !contributions || !contributions.length) return;

        var lang = getLang();
        var names = MONTHS_SHORT[lang] || MONTHS_SHORT.en;

        var seen = {};
        var cells = [];

        // Build a 7-row grid, columns = weeks
        var first = parseISO(contributions[0].date);
        var last = parseISO(contributions[contributions.length - 1].date);
        var start = new Date(first.getTime());
        start.setDate(start.getDate() - dayOfWeek(start));

        var totalWeeks = Math.ceil(
            ((last - start) / (1000 * 60 * 60 * 24) + dayOfWeek(last) + 1) / 7
        );

        var lastMonth = -1;
        var lastColumnPlaced = -10;

        for (var w = 0; w < totalWeeks; w++) {
            var colDate = new Date(start.getTime());
            colDate.setDate(colDate.getDate() + w * 7);
            var month = colDate.getMonth();

            if (month !== lastMonth && w - lastColumnPlaced >= 3) {
                cells.push({
                    label: names[month],
                    column: w + 1
                });
                lastColumnPlaced = w;
                lastMonth = month;
            }
        }

        monthsEl.innerHTML = '';
        monthsEl.style.gridTemplateColumns =
            'repeat(' + totalWeeks + ', minmax(0, 12px))';

        var cursor = 0;
        cells.forEach(function (c) {
            // Fill blanks before this label
            while (cursor < c.column - 1) {
                monthsEl.appendChild(document.createElement('span'));
                cursor++;
            }
            var span = document.createElement('span');
            span.textContent = c.label;
            monthsEl.appendChild(span);
            cursor++;
        });
    }

    function setTotal(contributions) {
        if (!totalEl) return;
        var total = contributions.reduce(function (sum, c) {
            return sum + (c.count || 0);
        }, 0);
        totalEl.textContent = formatTotal(total);
    }

    function setYear() {
        if (!yearEl) return;
        var now = new Date();
        yearEl.textContent = String(now.getFullYear());
    }

    function showError() {
        if (!totalEl) return;
        totalEl.textContent = t('activity.error');
        if (grid) {
            grid.setAttribute('aria-busy', 'false');
        }
    }

    function load() {
        fetch(API)
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function (data) {
                var contributions = data.contributions || [];
                if (!contributions.length) {
                    showError();
                    return;
                }
                setTotal(contributions);
                renderMonths(contributions);
                buildGrid(contributions);
            })
            .catch(showError);
    }

    function reloadText() {
        if (!totalEl) return;
        // Re-render the total in the active language
        if (totalEl.dataset.count) {
            totalEl.textContent = formatTotal(Number(totalEl.dataset.count));
        }
    }

    function init() {
        grid = document.getElementById('contributionGrid');
        monthsEl = document.getElementById('contributionMonths');
        totalEl = document.getElementById('contributionTotal');
        yearEl = document.getElementById('contributionYear');

        setYear();
        load();

        document.addEventListener('languagechange', function () {
            // Re-render months in the new language
            if (grid && grid.children.length) {
                var cells = Array.prototype.slice.call(
                    grid.querySelectorAll('.contrib-cell')
                );
                // Rebuild contributions list from DOM to re-render months
                var list = cells.map(function (cell) {
                    var parts = (cell.title || '').split(': ');
                    return {
                        date: parts[0],
                        count: parseInt(parts[1], 10) || 0,
                        level: (function () {
                            for (var i = 0; i < 5; i++) {
                                if (cell.classList.contains('level-' + i)) return i;
                            }
                            return 0;
                        })()
                    };
                });
                renderMonths(list);
                reloadText();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();