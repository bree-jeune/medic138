// Scenario level selector
document.querySelectorAll('.scenario-level__buttons').forEach(group => {
  const key = group.dataset.scenarioKey || 'default';
  const storageKey = 'scenarioLevel:' + key;
  const buttons = group.querySelectorAll('button[data-level]');

  // restore previous choice
  const saved = window.localStorage.getItem(storageKey);
  if (saved) {
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.level === saved);
    });
  }

  group.addEventListener('click', event => {
    const btn = event.target.closest('button[data-level]');
    if (!btn) return;

    buttons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    window.localStorage.setItem(storageKey, btn.dataset.level);

    // hook for later: randomization or level-specific text
    group.dispatchEvent(
      new CustomEvent('scenarioLevelChange', {
        detail: { level: btn.dataset.level },
        bubbles: true
      })
    );
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('js-nav-toggle');
  const menu = document.getElementById('js-nav-links');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-active');
      document.body.classList.toggle('nav-open');
    });
  }
});