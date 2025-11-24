---
layout: course
title: "Gas Laws for Flight and Critical Care"
description: "How Boyle, Dalton, Henry, and Charles team up to mess with your patients at altitude."
level: "Advanced"
topic: "Flight / Critical Care"
duration: "40–60 minutes"
permalink: /courses/gas-laws/
tabbed: true
---


<div class="course-tabs" data-default="overview" data-course-key="{{ page.url }}">

  <div class="course-tabs__nav">
    <button class="course-tabs__tab" data-target="overview">Overview</button>
    <button class="course-tabs__tab" data-target="boyle">Boyle's Law</button>
    <button class="course-tabs__tab" data-target="dalton">Dalton's Law</button>
    <button class="course-tabs__tab" data-target="henry">Henry's Law</button>
    <button class="course-tabs__tab" data-target="charles">Charles' Law</button>
    <button class="course-tabs__tab" data-target="practice">Practice + Cases</button>
  </div>

  <div class="course-tabs__panels">

    <section id="overview" class="course-tabs__panel">
      <h2>Why Gas Laws Matter in Transport</h2>
      <p>Gas laws explain why patients who were fine on the ground fall apart in the air. Any time volume, pressure, temperature, or dissolved gases change, your patients are paying the bill.</p>

      <ul>
        <li><strong>Boyle</strong>: pressure ↔ volume (barotrauma, balloon cuffs, pneumo expansion).</li>
        <li><strong>Dalton</strong>: partial pressures (hypoxia with altitude, FiO₂ games).</li>
        <li><strong>Henry</strong>: gases dissolving out of liquid (DCS, gas bubbles, bends).</li>
        <li><strong>Charles</strong>: temperature ↔ volume (O₂ tanks, cold environments).</li>
      </ul>

      <div class="callout">
        <strong>Clinical Pearl</strong>
        If a cavity is full of trapped gas, assume it will expand as pressure drops. Think pneumo, bowel gas, air in cuffs, and trapped air in dressings.
      </div>
    </section>

    <section id="boyle" class="course-tabs__panel">
      <h2>Boyle's Law: Pressure vs Volume</h2>
      <p><strong>Formula</strong>: P₁V₁ = P₂V₂</p>
      <p>If pressure drops, volume increases. If pressure rises, volume shrinks.</p>

      <h3>Prehospital hits</h3>
      <ul>
        <li>Pneumothorax expansion with ascent.</li>
        <li>ETT cuffs over-inflating as ambient pressure falls.</li>
        <li>Mask seals changing as cabin pressure shifts.</li>
      </ul>

      <div class="callout">
        <strong>Remember</strong>
        Boyle is your pneumo law. Any air-filled space is a problem child when you change altitude.
      </div>
    </section>

    <section id="dalton" class="course-tabs__panel">
      <h2>Dalton's Law: Partial Pressures</h2>
      <p>Total pressure is the sum of each gas’s partial pressure. When ambient pressure changes, each gas’s partial pressure shifts too.</p>

      <h3>Why you care</h3>
      <ul>
        <li>Lower ambient pressure at altitude = lower PaO₂, even if FiO₂ stays the same.</li>
        <li>High-risk patients: COPD, ARDS, right-heart strain, anemia.</li>
      </ul>
    </section>

    <section id="henry" class="course-tabs__panel">
      <h2>Henry's Law: Gases in Liquid</h2>
      <p>The amount of gas dissolved in liquid is proportional to its partial pressure. Drop the pressure, gas comes back out.</p>

      <h3>Clinical tie-ins</h3>
      <ul>
        <li>Decompression sickness and gas bubbles.</li>
        <li>Long transports after dives or high-pressure exposures.</li>
        <li>Transport decisions for patients with recent dive history.</li>
      </ul>
    </section>

    <section id="charles" class="course-tabs__panel">
      <h2>Charles' Law: Temperature vs Volume</h2>
      <p>When gas temperature changes, volume shifts with it (at constant pressure).</p>

      <h3>Flight applications</h3>
      <ul>
        <li>O₂ tank pressure changes with temp.</li>
        <li>Cold environments affecting tank readings and gas delivery.</li>
      </ul>
    </section>

    <section id="practice" class="course-tabs__panel">
      <h2>Practice Scenarios</h2>

      <details class="reveal-card">
        <summary>🚁 Case 1: Worsening pneumo in flight</summary>
        <p>Ground CXR shows small right pneumo. Patient is comfortable on 2 L NC. Twenty minutes into flight they develop pleuritic pain and increased work of breathing. Which gas law explains this change, and what should you do?</p>
        <p class="reveal-card__answer">
          <strong>Answer:</strong> Boyle’s Law. As cabin pressure drops, trapped intrapleural gas expands. Treat as tension pneumo risk: reassess, prepare for needle or finger thoracostomy per protocol, adjust altitude if possible.
        </p>
      </details>

      <details class="reveal-card">
        <summary>🫁 Case 2: Hypoxia at altitude</summary>
        <p>Patient satting 96% on 4 L NC on the ground drops to 86% at flight level with the same FiO₂. Which gas law explains the drop in oxygenation?</p>
        <p class="reveal-card__answer">
          <strong>Answer:</strong> Dalton’s Law. Total barometric pressure drops, so partial pressure of oxygen falls even though FiO₂ is unchanged.
        </p>
      </details>

      <p style="margin-top: 1.5rem;">Mark this tab complete when you can match real-world changes to the correct gas law without thinking about it.</p>
    </section>

  </div>
</div>
