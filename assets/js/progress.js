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
    
    if(fill) fill.style.width = percent + "%";
    if(text) text.textContent = percent + "% complete";
    
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
    } catch(e) { console.error(e); }
  });

  // 2. Load Cloud Data
  window.addEventListener('userReady', async (e) => {
    console.log("User ready, fetching cloud progress...");
    for (const widget of widgets) {
        const rawId = widget.getAttribute("data-storage-key");
        const cleanId = sanitizeId(rawId);
        
        if (window.getCourseData) {
            const cloudData = await window.getCourseData(cleanId);
            if (cloudData) {
                const boxes = widget.querySelectorAll(".m138-checklist__box");
                boxes.forEach(box => {
                    if (cloudData[box.getAttribute("data-step")]) {
                        box.checked = true;
                    }
                });
                updateVisuals(widget, boxes);
                // Sync local
                localStorage.setItem("m138:" + cleanId, JSON.stringify(cloudData));
            }
        }
    }
  });
});