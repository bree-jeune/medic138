document.addEventListener("DOMContentLoaded", () => {
  const widgets = document.querySelectorAll(".m138-checklist");
  if (!widgets.length) return;

  // Helper: Sanitize URL for Firestore ID (Replace / with _)
  const sanitizeId = (id) => id.replace(/[^a-zA-Z0-9]/g, "_");

  function updateVisuals(widget, boxes) {
    const fill = widget.querySelector(".m138-progress-bar__fill");
    const text = widget.querySelector(".m138-progress-bar__text");

    let done = 0;
    boxes.forEach(b => { if (b.checked) done++; });

    const total = boxes.length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    if (fill) fill.style.width = percent + "%";
    if (text) text.textContent = percent + "% complete";

    // Auto-Save on Change
    const rawId = widget.getAttribute("data-storage-key");
    if (rawId && window.saveProgressToCloud) {
      const cleanId = sanitizeId(rawId);
      const data = {};
      boxes.forEach(b => data[b.getAttribute("data-step")] = b.checked);

      console.log("Saving to:", cleanId, data);
      window.saveProgressToCloud(cleanId, data);
    }
  }

  // Initialize
  widgets.forEach(widget => {
    const rawId = widget.getAttribute("data-storage-key");
    const cleanId = sanitizeId(rawId);
    const boxes = widget.querySelectorAll(".m138-checklist__box");

    // 1. Load LocalStorage
    try {
      const localData = JSON.parse(localStorage.getItem("m138:" + cleanId) || "{}");
      boxes.forEach(box => {
        const step = box.getAttribute("data-step");
        if (localData[step]) box.checked = true;

        box.addEventListener("change", () => {
          localData[step] = box.checked;
          localStorage.setItem("m138:" + cleanId, JSON.stringify(localData));
          updateVisuals(widget, boxes);
        });
      });
      updateVisuals(widget, boxes);
    } catch (e) { console.error(e); }
  });

  // --- Global Lesson Completion Logic ---

  const lessonPath = window.location.pathname;
  const isLessonPage = lessonPath.includes('/lesson/') || lessonPath.includes('/course/');

  function markLessonComplete(path) {
    const completed = JSON.parse(localStorage.getItem('medic138_completed_lessons') || '[]');
    if (!completed.includes(path)) {
      completed.push(path);
      localStorage.setItem('medic138_completed_lessons', JSON.stringify(completed));
      console.log('Lesson marked complete:', path);
    }
  }

  function unmarkLessonComplete(path) {
    let completed = JSON.parse(localStorage.getItem('medic138_completed_lessons') || '[]');
    completed = completed.filter(item => item !== path);
    localStorage.setItem('medic138_completed_lessons', JSON.stringify(completed));
  }

  // Hook into updateVisuals to mark lesson as complete if checklist is 100%
  const originalUpdateVisuals = updateVisuals;
  updateVisuals = function (widget, boxes) {
    originalUpdateVisuals(widget, boxes);

    let done = 0;
    boxes.forEach(b => { if (b.checked) done++; });
    const total = boxes.length;

    if (total > 0 && done === total) {
      markLessonComplete(lessonPath);
    } else {
      unmarkLessonComplete(lessonPath);
    }
  };

  // --- Index Card Visuals ---
  const indexCards = document.querySelectorAll('.course-card, .lesson-card');
  if (indexCards.length > 0) {
    const completed = JSON.parse(localStorage.getItem('medic138_completed_lessons') || '[]');
    indexCards.forEach(card => {
      const link = card.querySelector('a');
      if (!link) return;

      const path = new URL(link.href).pathname;
      if (completed.includes(path)) {
        // Add completion badge
        const badge = document.createElement('div');
        badge.className = 'lesson-status-badge is-completed';
        badge.innerHTML = '✓ Completed';
        card.prepend(badge);

        // Add full progress bar
        const bar = document.createElement('div');
        bar.className = 'lesson-progress-bar';
        bar.innerHTML = '<div class="lesson-progress-inner" style="width: 100%;"></div>';
        card.appendChild(bar);
      }
    });
  }
});