document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.course-tabs');

  containers.forEach(container => {
    const courseKey = container.dataset.courseKey || window.location.pathname;
    const tabs = container.querySelectorAll('.course-tabs__tab');
    const panels = container.querySelectorAll('.course-tabs__panel');

    if (!tabs.length || !panels.length) return;

    function activate(targetId) {
      tabs.forEach(tab => {
        const active = tab.dataset.target === targetId;
        tab.classList.toggle('is-active', active);
      });

      panels.forEach(panel => {
        const active = panel.id === targetId;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });

      try {
        localStorage.setItem(`courseTabs:${courseKey}`, targetId);
      } catch (e) {}
    }

    const saved = (() => {
      try {
        return localStorage.getItem(`courseTabs:${courseKey}`);
      } catch (e) {
        return null;
      }
    })();

    const defaultId =
      saved ||
      container.dataset.default ||
      (tabs[0] && tabs[0].dataset.target);

    if (defaultId) {
      activate(defaultId);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab.dataset.target));
    });
  });
});
