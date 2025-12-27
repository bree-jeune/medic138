---
layout: lesson
title: "History of EMS"
permalink: /lessons/history-of-ems/
---

title: "The Not-Boring History of EMS"
level: "Everyone"
topic: "EMS Systems"
duration: "15 minutes"
summary: "A fast, interactive walk-through of how EMS actually came to be."
---

## Start Here

EMS wasn’t designed.  
It was patched together by:
- War
- Volunteers
- Politics
- One very angry report in 1966

Click through the timeline:

<div class="timeline">
  <button data-year="1966">1966: The White Paper</button>
  <button data-year="1970">1970: Miami Fire innovates paramedicine</button>
  <button data-year="1973">1973: Federal EMS Act</button>
  <button data-year="1980">1980s: EMS splinters into fire + private</button>
</div>

<div id="timeline-output"></div>

<script>
const events = {
  1966: "The White Paper identified that accidental death was the leading cause of mortality. It basically said the entire system was a clown show.",
  1970: "Miami Fire launched the first medic programs patterned after battlefield medicine.",
  1973: "Federal EMS Act funded training, research, and system development.",
  1980: "EMS fractured into fire-based, private, and hospital-based systems."
};

document.querySelectorAll(".timeline button").forEach(btn => {
  btn.addEventListener("click", () => {
    const yr = btn.dataset.year;
    document.getElementById("timeline-output").innerHTML = events[yr];
  });
});
</script>
