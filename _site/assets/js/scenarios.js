document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("scenario-select");
  const randomBtn = document.getElementById("scenario-random");
  const container = document.querySelector(".course-tabs");

  if (!select || !randomBtn || !container) return;


  const panels = {
    dispatched: document.getElementById("dispatched"),
    enRoute: document.getElementById("en-route"),
    sceneArrival: document.getElementById("scene-arrival"),
    explanation: document.getElementById("explanation"),
    decisionTree: document.getElementById("decision-tree"),
    transporting: document.getElementById("transporting"),
    hospital: document.getElementById("hospital"),
    backInService: document.getElementById("back-in-service"),
    reflection: document.getElementById("reflection")
  };

  const scenarios = [
    {
      id: "poly-trauma-mvc",
      label: "High-speed MVC with multi-system trauma",
      dispatched: `
        <h2>Dispatched</h2>
        <p>High-speed MVC on highway. One ejected, one entrapped, one walking wounded.</p>
        <p>Update: "BP dropping, GCS 6, open femur, distended belly."</p>
      `,
      enRoute: `
        <h2>En Route</h2>
        <p>Think through platinum 10 minutes, X-ABCDE, and early trauma activation.</p>
        <ul>
          <li>Which patient will you see first?</li>
          <li>What is your plan for hemorrhage control?</li>
          <li>What are your "must-do" airway preparations?</li>
        </ul>
      `,
      sceneArrival: `
        <h2>Scene Arrival</h2>
        <p>Estimate number of patients, check hazards, call for more resources.</p>
        <p>Do a rapid sweep and assign triage tags mentally.</p>
      `,
      explanation: `
        <h2>Explanation</h2>
        <p>This call focuses on prioritizing exsanguination, airway, and rapid transport in multi-system trauma.</p>
      `,
      decisionTree: `
        <h2>Decision Tree</h2>
        <ol>
          <li>Control massive hemorrhage?</li>
          <li>Is airway failing or at risk?</li>
          <li>Can you move to ambulance in &lt; 10 minutes?</li>
          <li>Which facility and what activation level?</li>
        </ol>
      `,
      transporting: `
        <h2>Transporting</h2>
        <p>Monitor for shock, TBI progression, and tension physiology.</p>
      `,
      hospital: `
        <h2>Hospital / Transfer</h2>
        <p>Give a tight, structured trauma handoff with MOI, initial status, interventions, and trends.</p>
      `,
      backInService: `
        <h2>Back in Service</h2>
        <p>Debrief with your crew: what worked, what bogged you down, and what you will do faster next time.</p>
      `,
      reflection: `
        <h2>Reflection</h2>
        <ul>
          <li>Where did you spend too much time on scene?</li>
          <li>Did your destination choice fit the injuries?</li>
        </ul>
      `
    },
    {
      id: "resp-failure-copd",
      label: "Respiratory failure in severe COPD",
      dispatched: `
        <h2>Dispatched</h2>
        <p>Shortness of breath, 68-year-old with known COPD. "Can't catch my breath."</p>
      `,
      enRoute: `
        <h2>En Route</h2>
        <p>Review your NIV criteria vs need for intubation. Think through permissive hypoxia vs hyperoxia risk.</p>
      `,
      sceneArrival: `
        <h2>Scene Arrival</h2>
        <p>Tripod, pursed-lip breathing, accessory muscle use, altered mental status.</p>
      `,
      explanation: `
        <h2>Explanation</h2>
        <p>This scenario trains recognition of respiratory fatigue and timely escalation from meds to NIV or advanced airway.</p>
      `,
      decisionTree: `
        <h2>Decision Tree</h2>
        <ol>
          <li>Does this patient need immediate airway or can NIV buy time?</li>
          <li>What is your bronchodilator and steroid plan?</li>
          <li>What are your red flags for failure?</li>
        </ol>
      `,
      transporting: `
        <h2>Transporting</h2>
        <p>Watch for declining mental status and rising CO2 signs. Adjust support early.</p>
      `,
      hospital: `
        <h2>Hospital / Transfer</h2>
        <p>Handoff: baseline status, home meds, last good time, escalation path you followed.</p>
      `,
      backInService: `
        <h2>Back in Service</h2>
        <p>Ask: did we recognize fatigue early enough or did we wait for a crash?</p>
      `,
      reflection: `
        <h2>Reflection</h2>
        <p>What will you do one step sooner next time?</p>
      `
    },
    {
      id: "sepsis-obstructed-uti",
      label: "Septic shock from obstructed UTI",
      dispatched: `
        <h2>Dispatched</h2>
        <p>Fever, weakness, 73-year-old, "possible UTI, not acting right."</p>
      `,
      enRoute: `
        <h2>En Route</h2>
        <p>Think about SIRS, sepsis, and shock. What data will you chase first?</p>
      `,
      sceneArrival: `
        <h2>Scene Arrival</h2>
        <p>Warm skin, bounding pulses, confused, hypotensive relative to baseline.</p>
      `,
      explanation: `
        <h2>Explanation</h2>
        <p>Focus is early sepsis recognition and prehospital shock management: fluids within protocol, early notification.</p>
      `,
      decisionTree: `
        <h2>Decision Tree</h2>
        <ol>
          <li>Does this meet your sepsis alert criteria?</li>
          <li>What is your fluid strategy and when do you stop?</li>
          <li>Which hospital can handle this quickly?</li>
        </ol>
      `,
      transporting: `
        <h2>Transporting</h2>
        <p>Trend MAP, mental status, and perfusion signs. Adjust care if the patient tips toward cold shock.</p>
      `,
      hospital: `
        <h2>Hospital / Transfer</h2>
        <p>Handoff: suspected source, onset, vitals trends, fluid volume, response.</p>
      `,
      backInService: `
        <h2>Back in Service</h2>
        <p>Did you frame this as "weak and UTI" or "early septic shock" in your mind?</p>
      `,
      reflection: `
        <h2>Reflection</h2>
        <p>How quickly did you recognize sepsis, and would you have called a sepsis alert?</p>
      `
    }
  ];

  function populateSelect() {
    scenarios.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.label;
      select.appendChild(opt);
    });
  }

  function renderScenario(scenario) {
    if (!scenario) return;


    if (panels.dispatched) panels.dispatched.innerHTML = scenario.dispatched;
    if (panels.enRoute) panels.enRoute.innerHTML = scenario.enRoute;
    if (panels.sceneArrival) panels.sceneArrival.innerHTML = scenario.sceneArrival;
    if (panels.explanation) panels.explanation.innerHTML = scenario.explanation;
    if (panels.decisionTree) panels.decisionTree.innerHTML = scenario.decisionTree;
    if (panels.transporting) panels.transporting.innerHTML = scenario.transporting;
    if (panels.hospital) panels.hospital.innerHTML = scenario.hospital;
    if (panels.backInService) panels.backInService.innerHTML = scenario.backInService;
    if (panels.reflection) panels.reflection.innerHTML = scenario.reflection;
  }

  function pickRandomScenario() {
    const index = Math.floor(Math.random() * scenarios.length);
    return scenarios[index];
  }

  populateSelect();

  select.addEventListener("change", () => {
    const value = select.value;
    const scenario = scenarios.find(s => s.id === value);
    renderScenario(scenario);
  });

  randomBtn.addEventListener("click", () => {
    const scenario = pickRandomScenario();
    if (!scenario) return;
    select.value = scenario.id;
    renderScenario(scenario);
  });
});
