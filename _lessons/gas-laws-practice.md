---
layout: default
title: "Gas Laws for Flight and Critical Care"
permalink: /courses/gas-laws-practice/
---


# Gas Laws for Flight and Critical Care

**Level:** Advanced
**Topic:** Flight Physiology · Gas Laws · Hyperbarics
**Duration:** Comprehensive deep dive

***
<div id="gaslaws-app">

<div class="course-tabs" data-default="arrival" data-course-key="{{ page.url }}">

  <div class="course-tabs__tabs">
    <button class="course-tabs__tab" data-target="arrival">Arrival Scenario</button>
    <button class="course-tabs__tab" data-target="breakdown">Breakdown</button>
    <button class="course-tabs__tab" data-target="calculators">Calculators</button>
    <button class="course-tabs__tab" data-target="scenarios">Practice Scenarios</button>
    <button class="course-tabs__tab" data-target="reflection">Reflection</button>
  </div>

  <div class="course-tabs__panels">

    <section class="course-tabs__panel" id="arrival">
## Arrival Scenario

You're crewed for a medevac flight with an intubated trauma patient. During ascent, the SpO₂ drops, cuff pressure of the ETT rises, and you notice the OG tube's balloon looks tense. The IV pump is suddenly chiming.
**Pattern recognition time:** Which gas laws are in play and what threats must you mitigate before something breaks?

***

## Warm-Up Questions

1. What gas law causes an ETT cuff to expand during ascent?
2. How does altitude physiologically decrease oxygen availability?
3. Which aspect of ventilator management changes most after takeoff?
4. Why might a trauma patient desaturate rapidly at altitude?
5. How can atmospheric pressure changes impact medication delivery?

***

## Optional Tally Embed

*Insert Tally quiz placeholder here.*

***

<section class="course-tabs__panel" id="breakdown">

## Explanation / Breakdown

### Core Gas Laws

- **Boyle’s Law:** Pressure ↓ → Volume ↑ (applies to ETT cuffs, air in balloons, GI tract)[^1]
- **Dalton’s Law:** Total pressure = sum of partial pressures (explains O₂ fraction at various altitudes)[^2]
- **Henry’s Law:** Gas dissolved in liquid ∝ partial pressure (decompression illness in blood/tissues)[^2]
- **Fick’s Law:** Gas transfer depends on surface area, gradient (key for hypoxic patients)[^3]
- **Charles’ Law:** Gas volume ∝ absolute temperature (secondary in most EMS scenarios)[^2]

</section>

<section class="course-tabs__panel" id="calculators">
      <h2>Gas Law Calculators</h2>

<h3>Boyle’s Law</h3>
<div class="gaslaw-card">
  <label>P₁ (mmHg)</label>
  <input type="number" id="boyle-p1" placeholder="760">
  <label>V₁ (mL)</label>
  <input type="number" id="boyle-v1" placeholder="100">
  <label>P₂ (mmHg)</label>
  <input type="number" id="boyle-p2" placeholder="564">
  <button onclick="calculateBoyle()" class="btn btn-full">Calculate</button>
  <div id="boyle-result"></div>
</div>

<h3>Charles’ Law</h3>
<div class="gaslaw-card">
  <label>V₁ (mL)</label>
  <input type="number" id="charles-v1" placeholder="100">
  <label>T₁ (°C)</label>
  <input type="number" id="charles-t1" placeholder="20">
  <label>T₂ (°C)</label>
  <input type="number" id="charles-t2" placeholder="37">
  <button onclick="calculateCharles()" class="btn btn-full">Calculate</button>
  <div id="charles-result"></div>
</div>

<h3>Dalton’s Law</h3>
<div class="gaslaw-card">
  <label>Atmospheric Pressure (mmHg)</label>
  <input type="number" id="dalton-pressure" placeholder="564">
  <label>FiO₂ (%)</label>
  <input type="number" id="dalton-fio2" placeholder="30">
  <button onclick="calculateDalton()" class="btn btn-full">Calculate</button>
  <div id="dalton-result"></div>
</div>

<h3>Henry’s Law</h3>
<div class="gaslaw-card">
  <label>Dive Depth (ft)</label>
  <input type="number" id="henry-depth" placeholder="80">
  <label>Bottom Time (min)</label>
  <input type="number" id="henry-time" placeholder="45">
  <button onclick="calculateHenry()" class="btn btn-full">Calculate</button>
  <div id="henry-result"></div>
</div>

    </section>

### Flight Physiology

- **Airway Devices:** Air expands at lower pressure (cuffs, OG/NG balloons). Fill with saline pre-flight.
- **Chest Trauma/Pneumothorax:** Trapped gas expands—risk of tension pneumo, especially during ascent.
- **IV Infusions:** Air bubbles can form/grow as pressure drops—watch for "air in line" alarms.
- **Oxygenation:** Atmospheric pressure drops mean less available O₂—Dalton \& Henry at play.
- **Sedation/Analgesia:** Gas solubility drops at altitude—can slightly alter effect of some anesthetics.

***

## Common Mistakes

- Leaving air in balloons/cuffs (risking mucosal injury)
- Failing to preoxygenate before ascent
- Using ground-level ventilator settings after altitude change
- Ignoring SpO₂ trends—calling them "monitor error"
- Forgetting to document altitude/pressure changes

***

## Clinical Pearls

- Always fill airway device balloons with **saline**, not air.
- Recheck and adjust ventilator after any major altitude shift.
- If SpO₂ drops post-takeoff, always suspect true hypoxia first.
- Expect expansion: **tension pneumo can worsen rapidly at altitude.**
- Note cabin pressure changes in your chart—valuable for later case review.

***

## Decision Trees

**Airway Device Management During Flight**

1. Any air-filled tubes/balloons?
    - Yes → Deflate, refill with saline
    - No → Move to airway/vent check
2. Is patient ventilated?
    - Yes → Reassess vent settings after ascent
    - No → Monitor SpO₂; preoxygenate pre-ramp
3. Trauma/pneumo risk present?
    - Yes → Prepare for rapid tension/decompression management
    - No → Maintain routine observation

***

<section class="course-tabs__panel" id="scenarios">
<div id="scenario-container">

## Practice Cases

### Case 1: Expanding Cuff

- Patient: 45M, traumatic intubation, ground SpO₂ 98%.
- **After ascent (8000ft):** SpO₂ falls to 90%. ETT cuff bulges.
- Vitals: HR 110 · BP 132/80 · RR 18 (vent) · Temp 36.8°C
- **Timeline:** 0 min—takeoff · 10 min—drop in O₂ · 15 min—cuff firm
> **Which gas law applies, and what’s your intervention?**


### Case 2: Sudden Pneumothorax

- Patient: 33F, blunt chest trauma, stable at ground.
- **At 6000ft:** Sudden dyspnea, pain, SpO₂ 95→85%
- Vitals: HR 120 · BP 90/68 · RR 26 · Temp 37.0°C
- **Timeline:** 0 min—takeoff · 12 min—distress · 14 min—tension signs
> **How do Boyle’s/Henry’s Law explain this? Actions?**


### Case 3: Infusion Trouble

- Patient: 27M, septic, on norepi drip, IV pump alarms "air in line" after ascent.
- Vitals: HR 124 · BP 84/60 · RR 20 · SpO₂ 93% · Temp 37.2°C
- **Timeline:** 0 min—takeoff · 5 min—alarm · 10 min—BP drop
> **Describe the altitude risk. What should you do?**


### Case 4: GI Balloon Distension

- Patient: 60F, intubated, NG tube balloon inflated.
- **At 10,000ft:** Balloon expands, ventilator alarms.
- Vitals: HR 100 · BP 138/78 · RR 14 (vent) · SpO₂ 97% · Temp 36.4°C
- **Timeline:** 2 min—takeoff · 18 min—alarm
> **What’s happening? Intervention?**


### Case 5: Brain Injury, Hypoxia at Altitude

- Patient: 18M, acute TBI, GCS 6, stable at ground.
- **After rapid climb:** SpO₂ drops to 88%, becomes agitated.
- Vitals: HR 112 · BP 118/80 · RR 22 · Temp 36.9°C
- **Timeline:** 0 min—takeoff · 5 min—agitation/desat
> **How do gas laws connect to neuro compromise? Field strategy?**


### Case 6: Diver DCS

- Patient: 40M, recent dive, joint pain/confusion after ascent.
- Vitals: HR 96 · BP 140/90 · RR 20 · SpO₂ 95% · Temp 36.6°C
- **Timeline:** 0 min—takeoff · 8 min—symptoms start
> **Which law is responsible? Key intervention?**

</div>

</section>

***

<section class="course-tabs__panel" id="reflection">
## Reflection

**Structured Reflection Questions:**

- Which gas law do you grasp best, and which needs deeper understanding?
- Describe a scenario where recognizing gas law effects changed your management.
- What will you add or change in your next pre-flight checklist?
- How has gas law pattern recognition improved your confidence for flight/critical care?

</section>

  </div>
</div>
</div>