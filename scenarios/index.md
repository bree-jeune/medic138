---
layout: course
title: "Interactive Scenarios"
description: "Run randomized calls and walk them from dispatch to back in service."
level: "All Levels"
topic: "Scenarios"
duration: "Self-Paced"
permalink: /scenarios/
tabbed: true
custom_js: "scenarios"
---


<section class="section-header">
  <div class="section-label">Lessons</div>
  <div class="section-header-body">
    <h2>Build your street sense</h2>
    <p>Short, focused lessons you can run between calls.</p>
  </div>
</section>

<div class="course-tabs" data-default="dispatched" data-course-key="{{ page.url }}">

  <div class="course-tabs__nav">
    <button type="button" class="course-tabs__tab" data-target="dispatched">Dispatched</button>
    <button type="button" class="course-tabs__tab" data-target="en-route">En Route</button>
    <button type="button" class="course-tabs__tab" data-target="scene-arrival">Scene Arrival</button>
    <button type="button" class="course-tabs__tab" data-target="explanation">Explanation</button>
    <button type="button" class="course-tabs__tab" data-target="decision-tree">Decision Tree</button>
    <button type="button" class="course-tabs__tab" data-target="transporting">Transporting</button>
    <button type="button" class="course-tabs__tab" data-target="hospital">Hospital / Transfer</button>
    <button type="button" class="course-tabs__tab" data-target="back-in-service">Back in Service</button>
    <button type="button" class="course-tabs__tab" data-target="reflection">Reflection</button>
  </div>



  <div class="course-tabs__panels">

    <!-- DISPATCHED -->
    <section id="dispatched" class="course-tabs__panel">
      <h2>Dispatched</h2>

      <div class="scenario-level">
        <p><strong>Pick your crew level for this call:</strong></p>
        <div class="scenario-level__buttons" data-scenario-key="mvc-multi-1">
          <button type="button" data-level="BLS" class="is-active">BLS</button>
          <button type="button" data-level="ILS">ILS</button>
          <button type="button" data-level="ALS">ALS</button>
          <button type="button" data-level="Ground CCT">Ground CCT</button>
          <button type="button" data-level="Flight">Flight</button>
        </div>
        <p class="scenario-level__hint">
          The call details stay the same.  
          What you can actually do depends on the level you pick.
        </p>
      </div>

      <p class="scenario-dispatch" data-call-id="mvc-multi-1">
        <strong>Dispatch:</strong> “Multiple vehicle crash, one ejected, one entrapped,
        one walking wounded. Possible rollover. Police on scene, fire en route.”
      </p>

      <p>Note: later we can add a pool of calls and randomize which one loads here.</p>
    </section>

    <!-- EN ROUTE -->
    <section id="en-route" class="course-tabs__panel">
      <h2>En Route</h2>

      <p>
        While you are rolling, list what you want to know and what you are already planning  
        based on the crew level you chose.
      </p>

      <ul>
        <li>What information do you radio for?</li>
        <li>What gear do you pull before you arrive?</li>
        <li>What is your rough primary plan and backup plan?</li>
      </ul>
    </section>

    <!-- SCENE ARRIVAL -->
    <section id="scene-arrival" class="course-tabs__panel">
      <h2>Scene Arrival</h2>

      <p>
        Describe your first 60–90 seconds on scene.  
        Who do you look at first, and what do you do with your hands?
      </p>
    </section>

    <!-- EXPLANATION -->
    <section id="explanation" class="course-tabs__panel">
      <h2>Explanation</h2>

      <p>
        This tab will hold the teaching breakdown for this scenario:
        priorities, red flags, and the “why” behind each step.
      </p>
    </section>

    <!-- DECISION TREE -->
    <section id="decision-tree" class="course-tabs__panel">
      <h2>Decision Tree</h2>

      <p>Sketch your decision points from first contact to handoff.</p>
    </section>

    <!-- TRANSPORTING -->
    <section id="transporting" class="course-tabs__panel">
      <h2>Transporting</h2>

      <p>What changes once you are moving. Interventions, re-assessment, and comms.</p>
    </section>

    <!-- HOSPITAL / TRANSFER -->
    <section id="hospital" class="course-tabs__panel">
      <h2>Hospital / Transfer of Care</h2>

      <p>What you hand off, how you say it, and what you document.</p>
    </section>

    <!-- BACK IN SERVICE -->
    <section id="back-in-service" class="course-tabs__panel">
      <h2>Back in Service</h2>

      <p>Quick debrief. What went well, what you would change next time.</p>
    </section>

    <!-- REFLECTION -->
    <section id="reflection" class="course-tabs__panel">
      <h2>Reflection</h2>

      <ul>
        <li>Did your plan match your level of training and scope?</li>
        <li>Where did you hesitate and why?</li>
        <li>What will you look for sooner on the next similar call?</li>
      </ul>
    </section>

  </div>
</div>
