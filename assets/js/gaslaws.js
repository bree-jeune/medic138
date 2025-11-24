document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("gaslaws-app");
  if (!container) return;
  renderGasLaws(container);
});


function showTab(tabName, evt) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');

  if (evt && evt.target) {
    evt.target.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


        function toggleAnswer(answerId) {
            const answer = document.getElementById(answerId);
            const button = event.target;
            
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                button.textContent = 'Hide Answer';
            } else {
                answer.style.display = 'none';
                button.textContent = 'Show Answer';
            }
        }

        /**
 * MEDIC 138 - Gas Laws for Flight and Critical Care
 * Interactive calculator with practice scenarios
 */

// Gas Laws Calculator Functions
function calculateBoyle() {
  const p1 = parseFloat(document.getElementById('boyle-p1').value);
  const v1 = parseFloat(document.getElementById('boyle-v1').value);
  const p2 = parseFloat(document.getElementById('boyle-p2').value);

  if (isNaN(p1) || isNaN(v1) || isNaN(p2)) {
    document.getElementById('boyle-result').innerHTML = '<p style="color: var(--accent);">Please enter all values</p>';
    return;
  }

  const v2 = (p1 * v1) / p2;
  const percentChange = ((v2 - v1) / v1) * 100;

  document.getElementById('boyle-result').innerHTML = `
    <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
      <p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Result:</strong></p>
      <p><strong>V₂ = ${v2.toFixed(2)} mL</strong></p>
      <p style="margin-top: 1rem; color: var(--text-muted);">
        Volume change: ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%
      </p>
      <p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
        <strong>Clinical Pearl:</strong> 
        ${percentChange > 30 ? 'Significant expansion - high risk for tension pneumothorax at altitude!' : 
          percentChange > 10 ? 'Moderate expansion - monitor patient closely during ascent.' : 
          'Minimal expansion - relatively safe for flight.'}
      </p>
    </div>
  `;
}

function calculateCharles() {
  const v1 = parseFloat(document.getElementById('charles-v1').value);
  const t1 = parseFloat(document.getElementById('charles-t1').value) + 273.15; // Convert to Kelvin
  const t2 = parseFloat(document.getElementById('charles-t2').value) + 273.15;

  if (isNaN(v1) || isNaN(t1) || isNaN(t2)) {
    document.getElementById('charles-result').innerHTML = '<p style="color: var(--accent);">Please enter all values</p>';
    return;
  }

  const v2 = (v1 * t2) / t1;
  const percentChange = ((v2 - v1) / v1) * 100;

  document.getElementById('charles-result').innerHTML = `
    <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
      <p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Result:</strong></p>
      <p><strong>V₂ = ${v2.toFixed(2)} mL</strong></p>
      <p style="margin-top: 1rem; color: var(--text-muted);">
        Volume change: ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%
      </p>
      <p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
        <strong>Clinical Pearl:</strong> Temperature changes affect ETT cuff pressure and medication stability.
      </p>
    </div>
  `;
}

function calculateDalton() {
  const pressure = parseFloat(document.getElementById('dalton-pressure').value);
  const fio2 = parseFloat(document.getElementById('dalton-fio2').value) / 100;

  if (isNaN(pressure) || isNaN(fio2)) {
    document.getElementById('dalton-result').innerHTML = '<p style="color: var(--accent);">Please enter all values</p>';
    return;
  }

  const po2 = pressure * fio2;
  const seaLevelPo2 = 760 * fio2;
  const difference = seaLevelPo2 - po2;

  document.getElementById('dalton-result').innerHTML = `
    <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
      <p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Result:</strong></p>
      <p><strong>PO₂ = ${po2.toFixed(1)} mmHg</strong></p>
      <p style="margin-top: 1rem;">At sea level: ${seaLevelPo2.toFixed(1)} mmHg</p>
      <p style="color: var(--text-muted);">Difference: -${difference.toFixed(1)} mmHg</p>
      <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
        <strong>Clinical Pearl:</strong> 
        ${po2 < 60 ? 'CRITICAL - Severe hypoxemia. Increase FiO2 immediately!' : 
          po2 < 80 ? 'CAUTION - Moderate hypoxemia. Consider increasing oxygen support.' : 
          'Adequate oxygenation at this altitude.'}
      </p>
    </div>
  `;
}

function calculateHenry() {
  const depth = parseFloat(document.getElementById('henry-depth').value);
  const time = parseFloat(document.getElementById('henry-time').value);

  if (isNaN(depth) || isNaN(time)) {
    document.getElementById('henry-result').innerHTML = '<p style="color: var(--accent);">Please enter all values</p>';
    return;
  }

  // Calculate pressure at depth (33 ft seawater = 1 atm)
  const atmospheres = 1 + (depth / 33);
  const nitrogenLoad = atmospheres * time;
  
  // Simple risk assessment
  let risk = 'LOW';
  let waitTime = 0;
  
  if (depth > 60 || time > 60) {
    risk = 'HIGH';
    waitTime = 24;
  } else if (depth > 30 || time > 30) {
    risk = 'MODERATE';
    waitTime = 12;
  }

  document.getElementById('henry-result').innerHTML = `
    <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${risk === 'HIGH' ? 'var(--accent)' : 'var(--primary)'};">
      <p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Decompression Sickness Risk:</strong></p>
      <p><strong>Risk Level: ${risk}</strong></p>
      <p style="margin-top: 1rem;">Pressure at depth: ${atmospheres.toFixed(2)} ATM</p>
      <p>Nitrogen loading factor: ${nitrogenLoad.toFixed(1)}</p>
      <p style="margin-top: 1rem; padding: 1rem; background: ${risk === 'HIGH' ? 'rgba(192, 21, 47, 0.1)' : 'rgba(33, 128, 141, 0.1)'}; border-radius: 4px;">
        <strong>Recommendation:</strong> 
        ${waitTime > 0 ? `Wait at least ${waitTime} hours before flying` : 'Safe to fly after standard surface interval'}
      </p>
      <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
        <strong>Clinical Pearl:</strong> If DCS suspected, transport at LOWEST possible altitude or by ground. Give 100% O2.
      </p>
    </div>
  `;
}

// Practice Scenarios
const GAS_LAW_SCENARIOS = [
  {
    id: 1,
    law: 'Boyle',
    title: 'Small Pneumothorax at Altitude',
    scenario: `A 45-year-old male with a small pneumothorax (10% on CXR) is being flown from a community hospital to a trauma center. 
    The pneumothorax volume is estimated at 100 mL at sea level (760 mmHg). The aircraft will cruise at 8,000 ft cabin altitude (564 mmHg).`,
    question: 'What will the pneumothorax volume be at cruise altitude?',
    p1: 760,
    v1: 100,
    p2: 564,
    correctAnswer: 135,
    explanation: 'The pneumothorax expands by 35% at 8,000 ft. This could progress to tension pneumothorax. ALL pneumothoraces need chest tubes before flight.'
  },
  {
    id: 2,
    law: 'Boyle',
    title: 'ETT Cuff Pressure Management',
    scenario: `An intubated patient's ETT cuff is inflated to 30 mL at sea level (760 mmHg). 
    During ascent to 10,000 ft (523 mmHg), the cuff pressure will change.`,
    question: 'What will the cuff volume be at 10,000 ft?',
    p1: 760,
    v1: 30,
    p2: 523,
    correctAnswer: 44,
    explanation: 'The cuff volume increases by ~45%. This can cause tracheal ischemia. Always check cuff pressure at altitude using a manometer.'
  },
  {
    id: 3,
    law: 'Dalton',
    title: 'Hypoxic COPD Patient',
    scenario: `A COPD patient maintains SpO2 91% on 4L NC at sea level (PaO2 ~58 mmHg on 30% FiO2, 760 mmHg pressure). 
    The aircraft climbs to 8,000 ft (564 mmHg cabin pressure).`,
    question: 'What is the new partial pressure of oxygen if we keep FiO2 at 30%?',
    pressure: 564,
    fio2: 30,
    correctAnswer: 169,
    explanation: 'PO2 drops to ~169 mmHg inspired, resulting in lower PaO2. This patient will decompensate. Increase FiO2 to 40-50% prophylactically.'
  },
  {
    id: 4,
    law: 'Henry',
    title: 'Post-Dive Flight Request',
    scenario: `A 32-year-old male went scuba diving to 80 ft for 45 minutes yesterday. 
    Today he's requesting air transport for a non-urgent medical issue.`,
    question: 'Is it safe to fly this patient?',
    depth: 80,
    time: 45,
    correctAnswer: 'NO',
    explanation: 'High DCS risk. Deep dive + recent timing = wait 24 hours before flying. If flight necessary, use lowest possible altitude or ground transport.'
  }
];

let currentScenarioIndex = 0;

function loadScenario(index) {
  currentScenarioIndex = index;
  const scenario = GAS_LAW_SCENARIOS[index];
  const container = document.getElementById('scenario-container');

  if (!container) return;

  container.innerHTML = `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <h3 style="color: var(--primary);">${scenario.title}</h3>
        <span style="background: var(--primary); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem;">
          ${scenario.law}'s Law
        </span>
      </div>
      
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">${scenario.scenario}</p>
      
      <p style="font-weight: 600; margin-bottom: 1rem;">Question: ${scenario.question}</p>
      
      ${renderScenarioInputs(scenario)}
      
      <button onclick="checkScenario()" class="btn btn-full" style="margin-top: 1rem;">
        Submit Answer
      </button>
      
      <div id="scenario-feedback"></div>
    </div>

    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button onclick="loadScenario(${index > 0 ? index - 1 : GAS_LAW_SCENARIOS.length - 1})" class="btn">
        ← Previous
      </button>
      <span style="display: flex; align-items: center; color: var(--text-muted);">
        Scenario ${index + 1} of ${GAS_LAW_SCENARIOS.length}
      </span>
      <button onclick="loadScenario(${index < GAS_LAW_SCENARIOS.length - 1 ? index + 1 : 0})" class="btn">
        Next →
      </button>
    </div>
  `;
}

function renderScenarioInputs(scenario) {
  if (scenario.law === 'Boyle') {
    return `
      <div style="background: var(--bg-body); padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        <p style="margin-bottom: 0.5rem;"><strong>Given:</strong></p>
        <p>P₁ = ${scenario.p1} mmHg (initial pressure)</p>
        <p>V₁ = ${scenario.v1} mL (initial volume)</p>
        <p>P₂ = ${scenario.p2} mmHg (final pressure)</p>
      </div>
      <div style="margin-top: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Calculate V₂ (final volume in mL):</label>
        <input type="number" id="scenario-answer" placeholder="Enter volume in mL" 
               style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
      </div>
    `;
  } else if (scenario.law === 'Dalton') {
    return `
      <div style="background: var(--bg-body); padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        <p style="margin-bottom: 0.5rem;"><strong>Given:</strong></p>
        <p>Atmospheric Pressure = ${scenario.pressure} mmHg</p>
        <p>FiO2 = ${scenario.fio2}%</p>
      </div>
      <div style="margin-top: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Calculate PO₂ (mmHg):</label>
        <input type="number" id="scenario-answer" placeholder="Enter PO₂ in mmHg" 
               style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
      </div>
    `;
  } else if (scenario.law === 'Henry') {
    return `
      <div style="background: var(--bg-body); padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        <p style="margin-bottom: 0.5rem;"><strong>Given:</strong></p>
        <p>Dive Depth = ${scenario.depth} feet</p>
        <p>Bottom Time = ${scenario.time} minutes</p>
      </div>
      <div style="margin-top: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Is it safe to fly? (YES/NO):</label>
        <div style="display: flex; gap: 1rem;">
          <button onclick="setScenarioAnswer('YES')" id="answer-yes" class="answer-btn" style="flex: 1; padding: 1rem;">YES - Safe to Fly</button>
          <button onclick="setScenarioAnswer('NO')" id="answer-no" class="answer-btn" style="flex: 1; padding: 1rem;">NO - Wait</button>
        </div>
        <input type="hidden" id="scenario-answer">
      </div>
    `;
  }
}

function setScenarioAnswer(value) {
  document.getElementById('scenario-answer').value = value;
  document.getElementById('answer-yes').style.borderColor = value === 'YES' ? 'var(--primary)' : 'var(--border)';
  document.getElementById('answer-no').style.borderColor = value === 'NO' ? 'var(--primary)' : 'var(--border)';
}

function checkScenario() {
  const scenario = GAS_LAW_SCENARIOS[currentScenarioIndex];
  const userAnswer = document.getElementById('scenario-answer').value.trim();
  const feedback = document.getElementById('scenario-feedback');

  if (!userAnswer) {
    feedback.innerHTML = '<p style="color: var(--accent); margin-top: 1rem;">Please enter an answer</p>';
    return;
  }

  let isCorrect = false;
  let correctValue = '';

  if (scenario.law === 'Boyle') {
    const userNum = parseFloat(userAnswer);
    const correct = scenario.correctAnswer;
    isCorrect = Math.abs(userNum - correct) <= correct * 0.05; // 5% tolerance
    correctValue = correct.toFixed(1);
  } else if (scenario.law === 'Dalton') {
    const userNum = parseFloat(userAnswer);
    const correct = scenario.correctAnswer;
    isCorrect = Math.abs(userNum - correct) <= correct * 0.05;
    correctValue = correct.toFixed(1);
  } else if (scenario.law === 'Henry') {
    isCorrect = userAnswer.toUpperCase() === scenario.correctAnswer;
    correctValue = scenario.correctAnswer;
  }

  feedback.innerHTML = `
    <div style="background: ${isCorrect ? 'rgba(33, 128, 141, 0.1)' : 'rgba(192, 21, 47, 0.1)'}; 
                padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${isCorrect ? 'var(--primary)' : 'var(--accent)'}; 
                margin-top: 1.5rem;">
      <p style="font-size: 1.2rem; margin-bottom: 1rem;">
        <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
      </p>
      <p><strong>Your Answer:</strong> ${userAnswer}</p>
      ${!isCorrect ? `<p style="margin-top: 0.5rem;"><strong>Correct Answer:</strong> ${correctValue}</p>` : ''}
      <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); color: var(--text-muted);">
        <strong>Explanation:</strong> ${scenario.explanation}
      </p>
    </div>
  `;

  document.querySelector('button[onclick="checkScenario()"]').disabled = true;
}

// Initialize on page load
function initGasLaws() {
  // Check if we're on the gas laws page
  if (document.getElementById('scenario-container')) {
    loadScenario(0);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGasLaws);
} else {
  initGasLaws();
}

// Expose functions to window
window.calculateBoyle = calculateBoyle;
window.calculateCharles = calculateCharles;
window.calculateDalton = calculateDalton;
window.calculateHenry = calculateHenry;
window.loadScenario = loadScenario;
window.checkScenario = checkScenario;
window.setScenarioAnswer = setScenarioAnswer;