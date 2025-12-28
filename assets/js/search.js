document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('lesson-search');
    const filterPills = document.querySelectorAll('.filter-pill');
    const lessonGrid = document.getElementById('lesson-grid');
    const emptyState = document.getElementById('search-empty');

    if (!lessonGrid) return;

    // Defensive card selection: check grid first, then document as fallback
    let cards = Array.from(lessonGrid.querySelectorAll('.lesson-card, .course-card, article'));
    if (cards.length === 0) {
        cards = Array.from(document.querySelectorAll('.lesson-card, .course-card'));
    }

    let currentSearch = '';
    let currentLevel = 'all';

    function updateDisplay() {
        let visibleCount = 0;

        cards.forEach(card => {
            const title = (card.getAttribute('data-title') || card.innerText || '').toLowerCase();
            const level = card.getAttribute('data-level') || 'all';
            const topic = (card.getAttribute('data-topic') || '').toLowerCase();

            const matchesSearch = currentSearch === '' || title.includes(currentSearch) || topic.includes(currentSearch);
            const matchesLevel = currentLevel === 'all' || level === currentLevel;

            if (matchesSearch && matchesLevel) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (emptyState) {
            if (visibleCount === 0 && cards.length > 0) {
                emptyState.style.setProperty('display', 'block', 'important');
                emptyState.classList.add('is-visible');
                if (lessonGrid) lessonGrid.style.display = 'none';
            } else {
                emptyState.style.setProperty('display', 'none', 'important');
                emptyState.classList.remove('is-visible');
                if (lessonGrid) lessonGrid.style.display = 'grid';
            }
        }
    }

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            updateDisplay();
        });
    }

    // Filter pill handler
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            if (pill.classList.contains('is-active')) return;

            filterPills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');

            currentLevel = pill.getAttribute('data-value');
            updateDisplay();
        });
    });

    // Initial check - delayed slightly to ensure cards are fully rendered
    setTimeout(updateDisplay, 100);
});
