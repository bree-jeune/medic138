class GameEngine {
  constructor(gameId, config) {
    this.gameId = gameId;
    this.config = config;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = 0;
    this.startTime = Date.now();
    this.answers = [];
    this.timerInterval = null;
  }

  startTimer() {
    if (this.config.mode === 'Timed Challenge') {
      this.timerInterval = setInterval(() => {
        this.updateTimerDisplay();
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  getElapsedTime() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  updateTimerDisplay() {
    const elapsed = this.getElapsedTime();
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timerEl = document.querySelector('.timer');
    if (timerEl) {
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  checkAnswer(userAnswer, correctAnswer) {
    let isCorrect;
    if (typeof correctAnswer === 'number') {
        const tolerance = correctAnswer * 0.05;
        isCorrect = Math.abs(userAnswer - correctAnswer) <= (Math.max(1, tolerance)); 
    } else if (Array.isArray(correctAnswer)) {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    } else {
        isCorrect = userAnswer === correctAnswer;
    }

    if (isCorrect) this.score++;
    this.answers.push({ userAnswer, correctAnswer, isCorrect });
    return isCorrect;
  }

  getResults() {
    this.stopTimer();
    const elapsed = this.getElapsedTime();
    this.totalQuestions = this.currentScenarios ? this.currentScenarios.length : (this.currentScenario ? this.currentScenario.patients.length : 0);
    const accuracy = this.totalQuestions > 0 ? (this.score / this.totalQuestions) * 100 : 0;
    return {
      score: this.score,
      total: this.totalQuestions,
      accuracy: accuracy.toFixed(1),
      time: elapsed,
      answers: this.answers
    };
  }
}


function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}




function playOxygenRegulator(config) {
  const subMode = config.subMode;
  // pass the full config object through to renderer functions
  if (subMode === 'flow_calculations') {
    return renderFlowCalculations(config);
  } else if (subMode === 'scenario_based') {
    return renderScenarioBased(config);
  }
  return '<div class="game-content"><p>Select an Oxygen Regulator sub-mode to begin.</p></div>';
}

function renderFlowCalculations(config) {
  const difficulty = config.difficulty;
  const scenarios = GAME_DATA.oxygenScenarios.flow_calculations.filter(s =>
    s.difficulty === difficulty || difficulty === 'All'
  );

  window.currentGame = new GameEngine('oxygen_regulator', { ...config, subMode: 'flow_calculations' });
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderFlowCalculationQuestion(0);
}

function renderFlowCalculationQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];
  const tank = scenario.tank;
  const factor = GAME_DATA.tankFactors[tank];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.currentScenarios.length) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Question ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>Tank Type:</strong> ${scenario.tank} Cylinder (Factor: ${factor})</p>
          <p><strong>Current Pressure:</strong> ${scenario.psi} PSI</p>
          <p><strong>Flow Rate:</strong> ${scenario.flowRate} L/min</p>
          <p class="mt-24"><strong>How many minutes will this tank last?</strong></p>
        </div>
        <input type="number" class="input-answer" id="userAnswer" placeholder="Enter duration in minutes" step="1">
        <button class="btn btn-large btn-full mt-24" onclick="submitFlowCalculation()">Submit Answer</button>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitFlowCalculation() {
  const inputEl = document.getElementById('userAnswer');
  const userAnswer = parseFloat(inputEl.value);
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = scenario.answer;
  const tank = scenario.tank;
  const factor = GAME_DATA.tankFactors[tank];
  const calculatedAnswer = Math.floor((scenario.psi * factor) / scenario.flowRate);


  const isCorrect = Math.abs(userAnswer - correctAnswer) <= 1;
  window.currentGame.checkAnswer(userAnswer, correctAnswer);

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! Good math.' : '✗ Incorrect. Check your pattern.'}</div>
    <p><strong>Your answer:</strong> ${userAnswer} minutes</p>
    <p><strong>Correct answer:</strong> ${correctAnswer} minutes (Calculated: ${calculatedAnswer})</p>
    <p class="mt-16"><strong>Calculation:</strong> (PSI × Tank Factor) / Flow Rate = (${scenario.psi} × ${factor}) / ${scenario.flowRate} ≈ ${calculatedAnswer} minutes</p>
    <button class="btn btn-large btn-full mt-24" onclick="nextFlowQuestion()">Next Question</button>
  `;

  inputEl.disabled = true;
  document.querySelector('.btn').style.display = 'none';
  window.updateScoreDisplay();
}

function nextFlowQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderFlowCalculationQuestion(window.currentGame.currentQuestionIndex);
  }
}

function renderScenarioBased(config) {
  const difficulty = config.difficulty;
  const scenarios = GAME_DATA.oxygenScenarios.scenario_based.filter(s =>
    s.difficulty === difficulty || difficulty === 'All'
  );

  window.currentGame = new GameEngine('oxygen_regulator', { ...config, subMode: 'scenario_based' });
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderScenarioQuestion(0);
}

function renderScenarioQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Scenario ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>Patient Presentation:</strong></p>
          <p>${scenario.scenario}</p>
          <p class="mt-24"><strong>What is the most appropriate oxygen therapy?</strong></p>
        </div>
        <div class="answer-options">
          ${scenario.options.map((opt, i) => `
            <button class="answer-btn" onclick="submitScenarioAnswer(${i})">${opt.text}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitScenarioAnswer(selectedIndex) {
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const selectedOption = scenario.options[selectedIndex];
  const correctOption = scenario.options.find(opt => opt.correct);

  window.currentGame.checkAnswer(selectedIndex, scenario.options.indexOf(correctOption));

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (scenario.options[i].correct) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('incorrect');
    }
    btn.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${selectedOption.correct ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${selectedOption.correct ? '✓ Correct! Street-smart move.' : '✗ Incorrect. Always confirm the rationale.'}</div>
    <p><strong>Explanation:</strong> ${selectedOption.explanation}</p>
    ${!selectedOption.correct ? `<p class="mt-16"><strong>Correct action:</strong> ${correctOption.text}</p>` : ''}
    <button class="btn btn-large btn-full mt-24" onclick="nextScenarioQuestion()">Next Question</button>
  `;
  window.updateScoreDisplay();
}

function nextScenarioQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderScenarioQuestion(window.currentGame.currentQuestionIndex);
  }
}


function playInterventionMatching(config) {
  const subType = config.subType;
  const data = GAME_DATA.interventionMatching[subType];

  window.currentGame = new GameEngine('intervention_matching', config);
  window.currentGame.matchingData = shuffleArray(data);
  window.currentGame.totalQuestions = data.length;

  return renderMatchingQuestion(0);
}

function renderMatchingQuestion(index) {
  const item = window.currentGame.matchingData[index];
  const keys = Object.keys(item);
  const question = item[keys[0]];
  const answer = item[keys[1]];


  const wrongAnswers = window.currentGame.matchingData
    .filter((_, i) => i !== index)
    .map(it => it[keys[1]])
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allAnswers = shuffleArray([answer, ...wrongAnswers]);
  

  const questionTitle = keys[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Question ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>${questionTitle}:</strong></p>
          <p>${question}</p>
          <p class="mt-24"><strong>Select the correct match:</strong></p>
        </div>
        <div class="answer-options">
          ${allAnswers.map((ans, i) => `
            <button class="answer-btn" onclick="submitMatchingAnswer('${ans.replace(/'/g, "\\'")}')">${ans}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitMatchingAnswer(selectedAnswer) {
  const item = window.currentGame.matchingData[window.currentGame.currentQuestionIndex];
  const keys = Object.keys(item);
  const correctAnswer = item[keys[1]];

  const isCorrect = selectedAnswer === correctAnswer;
  window.currentGame.checkAnswer(selectedAnswer, correctAnswer);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    } else if (btn.textContent.replace(/'/g, "\\'") === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! That’s the right pattern.' : '✗ Incorrect. Review the clinical rationale.'}</div>
    ${!isCorrect ? `<p><strong>Correct Match:</strong> ${correctAnswer}</p>` : ''}
    <button class="btn btn-large btn-full mt-24" onclick="nextMatchingQuestion()">Next Question</button>
  `;
  window.updateScoreDisplay();
}

function nextMatchingQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderMatchingQuestion(window.currentGame.currentQuestionIndex);
  }
}


function playIVFlowRate(config) {
  const scenarios = GAME_DATA.ivCalculations.filter(s =>
    s.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('iv_flow_rate', config);
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderIVQuestion(0);
}

function renderIVQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">IV Math Question ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p>${scenario.scenario}</p>
          <p class="mt-24"><strong>Calculate your answer (round to nearest whole number):</strong></p>
        </div>
        <input type="number" class="input-answer" id="userAnswer" placeholder="Enter calculated gtt/min or mL/hr" step="1">
        <button class="btn btn-large btn-full mt-24" onclick="submitIVAnswer()">Submit Answer</button>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitIVAnswer() {
  const inputEl = document.getElementById('userAnswer');
  const userAnswer = parseFloat(inputEl.value);
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = scenario.answer;

  const isCorrect = window.currentGame.checkAnswer(userAnswer, correctAnswer);

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! Clinical precision confirmed.' : '✗ Incorrect. Don\'t guess your drip rate.'}</div>
    <p><strong>Your answer:</strong> ${userAnswer}</p>
    <p><strong>Correct answer:</strong> ${correctAnswer}</p>
    <p class="mt-16"><strong>Formula:</strong> ${scenario.formula}</p>
    <p><strong>Calculation:</strong> ${scenario.calculation}</p>
    <button class="btn btn-large btn-full mt-24" onclick="nextIVQuestion()">Next Question</button>
  `;

  inputEl.disabled = true;
  document.querySelector('.btn').style.display = 'none';
  window.updateScoreDisplay();
}

function nextIVQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderIVQuestion(window.currentGame.currentQuestionIndex);
  }
}


function playCardiacRhythms(config) {
  const rhythms = GAME_DATA.cardiacRhythms.filter(r =>
    r.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('cardiac_rhythms', config);
  window.currentGame.currentScenarios = shuffleArray(rhythms);
  window.currentGame.totalQuestions = rhythms.length;

  return renderRhythmCard(0);
}

function renderRhythmCard(index) {
  const rhythm = window.currentGame.currentScenarios[index];


  const wrongAnswers = window.currentGame.currentScenarios
    .filter((_, i) => i !== index)
    .map(r => r.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allAnswers = shuffleArray([rhythm.name, ...wrongAnswers]);

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Rhythm ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="ecg-display">
          <div class="ecg-strip">
            <svg width="100%" height="150" style="display: block;">
              <text x="50%" y="50%" text-anchor="middle" fill="#0f0" font-size="20" font-family="monospace">
                [ECG Rhythm Strip Simulation: ${rhythm.name}]
              </text>
              <text x="50%" y="70%" text-anchor="middle" fill="#0f0" font-size="14" font-family="monospace" opacity="0.7">
                Rate: ${rhythm.rate} bpm | Description: ${rhythm.description}
              </text>
            </svg>
          </div>
        </div>
        <div class="question-text mt-24">
          <p><strong>Identify this cardiac rhythm:</strong></p>
        </div>
        <div class="answer-options">
          ${allAnswers.map(ans => `
            <button class="answer-btn" onclick="submitRhythmAnswer('${ans}')">${ans}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitRhythmAnswer(selectedAnswer) {
  const rhythm = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = rhythm.name;

  const isCorrect = selectedAnswer === correctAnswer;
  window.currentGame.checkAnswer(selectedAnswer, correctAnswer);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! Sharp pattern recognition.' : '✗ Incorrect. Don\'t freeze—treat the cause.'}</div>
    <p><strong>Rhythm:</strong> ${rhythm.name}</p>
    <p><strong>Treatment:</strong> ${rhythm.treatment}</p>
    <button class="btn btn-large btn-full mt-24" onclick="nextRhythmQuestion()">Next Rhythm</button>
  `;
  window.updateScoreDisplay();
}

function nextRhythmQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderRhythmCard(window.currentGame.currentQuestionIndex);
  }
}


function playMedicationDosing(config) {
  const scenarios = GAME_DATA.medicationDosing.filter(s =>
    s.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('medication_dosing', config);
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderMedicationQuestion(0);
}

function renderMedicationQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Medication Dosing ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p>${scenario.scenario}</p>
          <p class="mt-24"><strong>Calculate the dose in ${scenario.unit} (round to nearest tenth):</strong></p>
        </div>
        <input type="number" step="0.1" class="input-answer" id="userAnswer" placeholder="Enter dose">
        <button class="btn btn-large btn-full mt-24" onclick="submitMedicationAnswer()">Submit Answer</button>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitMedicationAnswer() {
  const inputEl = document.getElementById('userAnswer');
  const userAnswer = parseFloat(inputEl.value);
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = scenario.answer;

  const isCorrect = window.currentGame.checkAnswer(userAnswer, correctAnswer);

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! Accuracy matters.' : '✗ Incorrect. Recheck your pediatric conversion.'}</div>
    <p><strong>Your answer:</strong> ${userAnswer} ${scenario.unit}</p>
    <p><strong>Correct answer:</strong> ${correctAnswer} ${scenario.unit}</p>
    ${scenario.calculation ? `<p class="mt-16"><strong>Calculation:</strong> ${scenario.calculation}</p>` : ''}
    ${scenario.explanation ? `<p><strong>Explanation:</strong> ${scenario.explanation}</p>` : ''}
    <button class="btn btn-large btn-full mt-24" onclick="nextMedicationQuestion()">Next Question</button>
  `;

  inputEl.disabled = true;
  document.querySelector('.btn').style.display = 'none';
  window.updateScoreDisplay();
}

function nextMedicationQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderMedicationQuestion(window.currentGame.currentQuestionIndex);
  }
}


function playTraumaAssessment(config) {
  const scenarios = GAME_DATA.traumaScenarios.filter(s =>
    s.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('trauma_assessment', config);
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderTraumaQuestion(0);
}

function renderTraumaQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">Trauma Priority Drill ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>Scenario:</strong> ${scenario.scenario}</p>
          <p class="mt-16"><strong>Key Assessment Findings:</strong></p>
          <ul class="list-disc ml-6">
            ${scenario.findings.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <p class="mt-24 font-bold"><strong>Rank the life threats (1 = highest priority, ${scenario.lifeThreats.length} = lowest):</strong></p>
        </div>
        <div class="mt-24">
          ${scenario.lifeThreats.map((threat, i) => `
            <div class="flex gap-4 items-center mb-3 p-2 bg-gray-100 rounded">
              <input type="number" min="1" max="${scenario.lifeThreats.length}"
                     id="priority_${i}" data-correct="${threat.priority}"
                     class="input-answer w-16 p-2 text-center"
                     placeholder="#" step="1">
              <span class="flex-1 font-medium">${threat.threat}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-large btn-full mt-24" onclick="submitTraumaAnswer()">Submit Rank</button>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitTraumaAnswer() {
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const inputFields = scenario.lifeThreats.map((_, i) => document.getElementById(`priority_${i}`));

  const userAnswers = inputFields.map(input => parseInt(input.value) || 0);
  const correctOrder = scenario.lifeThreats.map(t => t.priority);

  const sortedCorrectThreats = [...scenario.lifeThreats].sort((a, b) => a.priority - b.priority);

  
  let correctMap = {};
  correctOrder.forEach((priority, index) => {
      correctMap[priority] = inputFields[index].id;
  });

  let isCorrect = true;
  inputFields.forEach((input, index) => {
      if (parseInt(input.value) !== correctOrder[index]) {
          isCorrect = false;
      }
  });

  window.currentGame.checkAnswer(userAnswers, correctOrder);

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! You followed the kill chain.' : '✗ Incorrect. You missed the highest priority.'}</div>
    <p class="mt-16 font-bold">The Correct Order (ABCDE Approach):</p>
    <ol class="list-decimal ml-6">
      ${sortedCorrectThreats.map(t => `
        <li><strong>${t.threat}</strong>: ${t.intervention}</li>
      `).join('')}
    </ol>
    <button class="btn btn-large btn-full mt-24" onclick="nextTraumaQuestion()">Next Scenario</button>
  `;

  inputFields.forEach(input => input.disabled = true);
  document.querySelector('.btn').style.display = 'none';
  window.updateScoreDisplay();
}

function nextTraumaQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderTraumaQuestion(window.currentGame.currentQuestionIndex);
  }
}

function playABGInterpretation(config) {
  const scenarios = GAME_DATA.abgInterpretation.filter(s =>
    s.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('abg_interpretation', config);
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;

  return renderABGQuestion(0);
}

function renderABGQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];
  const interpretations = [
    "Respiratory acidosis, uncompensated",
    "Respiratory acidosis, partially compensated",
    "Metabolic acidosis, uncompensated",
    "Metabolic acidosis, partially compensated",
    "Respiratory alkalosis, uncompensated",
    "Metabolic alkalosis, uncompensated",
    "Normal ABG"
  ];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">ABG Interpretation ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>Arterial Blood Gas Results:</strong></p>
          <div class="p-4 rounded-lg bg-gray-800 text-white font-mono mb-4">
            <p><strong>pH:</strong> ${scenario.values.pH} (Normal: 7.35–7.45)</p>
            <p><strong>PaCO2:</strong> ${scenario.values.PaCO2} mmHg (Normal: 35–45)</p>
            <p><strong>HCO3:</strong> ${scenario.values.HCO3} mEq/L (Normal: 22–26)</p>
            <p><strong>PaO2:</strong> ${scenario.values.PaO2} mmHg (Normal: 80–100)</p>
          </div>
          <p class="mt-24"><strong>What is your interpretation?</strong></p>
        </div>
        <div class="answer-options grid grid-cols-1 md:grid-cols-2 gap-3">
          ${interpretations.map(interp => `
            <button class="answer-btn" onclick="submitABGAnswer('${interp}')">${interp}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitABGAnswer(selectedAnswer) {
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = scenario.interpretation;

  const isCorrect = selectedAnswer === correctAnswer;
  window.currentGame.checkAnswer(selectedAnswer, correctAnswer);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! ROME confirmed.' : '✗ Incorrect. Recheck the primary driver.'}</div>
    <p><strong>Correct interpretation:</strong> ${correctAnswer}</p>
    <p><strong>Oxygenation:</strong> ${scenario.oxygenation}</p>
    <p><strong>Likely clinical cause:</strong> ${scenario.likelyCause}</p>
    <button class="btn btn-large btn-full mt-24" onclick="nextABGQuestion()">Next ABG</button>
  `;
  window.updateScoreDisplay();
}

function nextABGQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderABGQuestion(window.currentGame.currentQuestionIndex);
  }
}

function playTriageScenarios(config) {
  const scenarios = GAME_DATA.triageScenarios;

  window.currentGame = new GameEngine('triage_scenarios', config);
  window.currentGame.currentScenario = scenarios[0];
  window.currentGame.totalQuestions = scenarios[0].patients.length;
  window.currentGame.userTriageAnswers = [];

  return renderTriageQuestion(0);
}

function renderTriageQuestion(index) {
  const scenario = window.currentGame.currentScenario;
  const patient = scenario.patients[index];

  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">MCI Triage Drill: Patient ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="question-text">
          <p><strong>Incident:</strong> ${scenario.scenario}</p>
          <div class="p-4 rounded-lg bg-yellow-900 bg-opacity-10 border border-yellow-700 text-lg mb-4">
            <p class="font-bold">Patient ${patient.id} Status:</p>
            <p>${patient.presentation}</p>
          </div>
          <p class="mt-24 font-bold"><strong>Assign triage category (START/SALT Method):</strong></p>
        </div>
        <div class="answer-options grid grid-cols-2 md:grid-cols-4 gap-3">
          <button class="answer-btn" onclick="submitTriageAnswer('RED')" style="background-color: rgba(192, 21, 47, 0.1); border-color: #c0152f;">
            <strong style="color: #c0152f;">RED (Immediate)</strong>
          </button>
          <button class="answer-btn" onclick="submitTriageAnswer('YELLOW')" style="background-color: rgba(168, 75, 47, 0.1); border-color: #a84b2f;">
            <strong style="color: #a84b2f;">YELLOW (Delayed)</strong>
          </button>
          <button class="answer-btn" onclick="submitTriageAnswer('GREEN')" style="background-color: rgba(33, 128, 141, 0.1); border-color: #21808d;">
            <strong style="color: #21808d;">GREEN (Minor)</strong>
          </button>
          <button class="answer-btn" onclick="submitTriageAnswer('BLACK')" style="background-color: rgba(0, 0, 0, 0.1); border-color: #666;">
            <strong style="color: #666;">BLACK (Expectant)</strong>
          </button>
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function submitTriageAnswer(selectedCategory) {
  const patient = window.currentGame.currentScenario.patients[window.currentGame.currentQuestionIndex];
  const correctCategory = patient.correctTriage;

  const isCorrect = selectedCategory === correctCategory;
  window.currentGame.checkAnswer(selectedCategory, correctCategory);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    const btnCategory = btn.textContent.split('(')[0].trim().toUpperCase();
    if (btnCategory.startsWith(correctCategory)) {
      btn.classList.add('correct');
    } else if (btnCategory.startsWith(selectedCategory) && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! Fast, critical decision.' : '✗ Incorrect. Review the RPM steps.'}</div>
    <p><strong>Correct Triage:</strong> ${correctCategory} (Immediate/Delayed/Minor/Expectant)</p>
    <p><strong>Rationale:</strong> ${patient.explanation}</p>
    <button class="btn btn-large btn-full mt-24" onclick="nextTriagePatient()">Next Patient</button>
  `;
  window.updateScoreDisplay();
}

function nextTriagePatient() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderTriageQuestion(window.currentGame.currentQuestionIndex);
  }
}




function playECGInterpretation(config) {
  const scenarios = GAME_DATA.ecgInterpretation.filter(s =>
    s.difficulty === config.difficulty || config.difficulty === 'All'
  );

  window.currentGame = new GameEngine('ecg_interpretation', config);
  window.currentGame.currentScenarios = shuffleArray(scenarios);
  window.currentGame.totalQuestions = scenarios.length;


  setTimeout(drawECGForCurrentQuestion, 0); 
  
  return renderECGQuestion(window.currentGame.currentQuestionIndex);
}

function renderECGQuestion(index) {
  const scenario = window.currentGame.currentScenarios[index];
  const options = [
    "Normal ECG - No ACS",
    "STEMI - Inferior (II, III, aVF)",
    "STEMI - Anterior (V1-V4)",
    "STEMI - Lateral (I, aVL, V5-V6)",
    "STEMI - Posterior"
  ];
  
  
  return `
    <div class="game-content">
      <div class="progress-bar"><div class="progress-fill" style="width: ${(index / window.currentGame.totalQuestions) * 100}%"></div></div>
      <div class="question-container">
        <h3 class="mb-16">12-Lead Pattern Recognition ${index + 1} of ${window.currentGame.totalQuestions}</h3>
        <div class="ecg-display" style="background: #000; padding: 12px; border-radius: 8px;">
          <!-- Canvas Grid for dynamic waveforms -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 4px;">
            ${scenario.leads.map(lead => `
              <div style="background: #111; border-radius: 4px; overflow: hidden; height: 80px; position: relative;">
                <canvas id="ecg-canvas-${lead}" width="200" height="80"></canvas>
                <div style="position: absolute; top: 5px; left: 5px; color: #FFF; font-size: 10px; font-family: monospace;">${lead}</div>
              </div>
            `).join('')}
          </div>
          <p class="text-sm mt-4 text-gray-400 font-mono text-center">Dynamic 12-Lead Simulation: Analyze the QRS and ST patterns.</p>
        </div>
        <div class="question-text mt-24">
          <p><strong>Based on the leads shown, what is the most likely acute pattern?</strong></p>
        </div>
        <div class="answer-options grid grid-cols-1 md:grid-cols-2 gap-3">
          ${options.map(opt => `
            <button class="answer-btn" onclick="submitECGAnswer('${opt}')">${opt}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    </div>
  `;
}

function drawECGForCurrentQuestion() {
  // The logic is now handled entirely by ecg-canvas-engine.js
  if (window.initializeECGCanvases) {
    window.initializeECGCanvases();
  } else {
    console.error("ECG Engine not loaded");
  }
}


function submitECGAnswer(selectedAnswer) {
  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  const correctAnswer = scenario.type === 'Normal' ?
    'Normal ECG - No ACS' :
    `STEMI - ${scenario.location} (${scenario.leads.join(', ')})`;

  const isCorrect = selectedAnswer.includes(scenario.type) &&
                    (scenario.type === 'Normal' || selectedAnswer.includes(scenario.location));

  window.currentGame.checkAnswer(selectedAnswer, correctAnswer);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');

    const expectedTextMatch = btn.textContent.includes(scenario.type) &&
                              (scenario.type === 'Normal' || btn.textContent.includes(scenario.location));

    if (expectedTextMatch) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ Correct! STEMI protocol initiated.' : '✗ Incorrect. Misinterpretation kills time.'}</div>
    <p><strong>Acute Finding:</strong> ${scenario.type} / ${scenario.location}</p>
    ${scenario.type !== 'Normal' ? `
      <p><strong>Leads:</strong> ${scenario.leads.join(', ')}</p>
      <p><strong>Affected Artery:</strong> ${scenario.artery}</p>
      <p><strong>Clinical Pearl (Reciprocal Changes):</strong> ${scenario.reciprocalChanges.length > 0 ? scenario.reciprocalChanges.join(', ') + ' present.' : 'None present. Watch closely.'}</p>
      <p><strong>Treatment Implication:</strong> ${scenario.treatment}</p>
    ` : `<p>No acute ST elevation found. Investigate clinical picture further.</p>`}
    <button class="btn btn-large btn-full mt-24" onclick="nextECGQuestion()">Next ECG</button>
  `;
  window.updateScoreDisplay();
}

function nextECGQuestion() {
  window.currentGame.currentQuestionIndex++;
  if (window.currentGame.currentQuestionIndex >= window.currentGame.totalQuestions) {
    showResults();
  } else {
    document.getElementById('gameContent').innerHTML = renderECGQuestion(window.currentGame.currentQuestionIndex);
  }
}


function showResults() {
  window.currentGame.stopTimer();
  const results = window.currentGame.getResults();
  const minutes = Math.floor(results.time / 60);
  const seconds = results.time % 60;

  const gameTitle = GAMES.find(g => g.id === window.currentGame.gameId).title;

  document.getElementById('app').innerHTML = `
    <div class="header">
      <h1>MEDIC 138</h1>
      <p>Interactive EMS Skills Training</p>
    </div>
    <div class="results-screen">
      <div class="results-card">
        <h2 class="results-title">Game Complete!</h2>
        <h3 class="mb-24">${gameTitle}</h3>
        <div class="results-stats">
          <div class="result-stat">
            <div class="result-stat-value">${results.score}/${results.total}</div>
            <div class="result-stat-label">Correct Answers</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-value">${results.accuracy}%</div>
            <div class="result-stat-label">Accuracy</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</div>
            <div class="result-stat-label">Time</div>
          </div>
        </div>
        <div class="results-actions">
          <button class="btn btn-large" onclick="startGame('${window.currentGame.gameId}')">Play Again</button>
          <button class="btn btn-large btn-secondary" onclick="showMainMenu()">Main Menu</button>
        </div>
      </div>
    </div>
  `;
}

class LeadPlacementGame {
  constructor() {
    this.placedLeads = {};
    this.mode = 'practice'; // 'practice', 'test', 'speed'
    this.score = 0;
    this.attempts = 0;
    this.startTime = null;
    this.currentLead = null;
    this.leadsToPlace = [];
  }

  start(mode) {
    this.mode = mode;
    this.placedLeads = {};
    this.score = 0;
    this.attempts = 0;
    this.startTime = Date.now();
    
    if (mode === 'test' || mode === 'speed') {
      this.leadsToPlace = Object.keys(LEAD_PLACEMENTS);
      this.shuffle(this.leadsToPlace);
    }

    this.render();
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  render() {
    const container = document.getElementById('lead-placement-game');
    if (!container) return;

    if (this.mode === null) {
      this.renderMenu(container);
    } else if (this.mode === 'practice') {
      this.renderPractice(container);
    } else {
      this.renderTest(container);
    }
  }

  renderMenu(container) {
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h2 style="color: var(--primary); margin-bottom: 2rem;">12-Lead Placement Drill</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div onclick="window.leadGame.start('practice')" style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 2px solid var(--border); cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='var(--primary)'" 
               onmouseout="this.style.borderColor='var(--border)'">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Practice Mode</h3>
            <p style="color: var(--text-muted);">Learn placements with hints and feedback</p>
          </div>

          <div onclick="window.leadGame.start('test')" style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 2px solid var(--border); cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='var(--primary)'" 
               onmouseout="this.style.borderColor='var(--border)'">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Test Mode</h3>
            <p style="color: var(--text-muted);">Place all leads without hints</p>
          </div>

          <div onclick="window.leadGame.start('speed')" style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 2px solid var(--border); cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='var(--primary)'" 
               onmouseout="this.style.borderColor='var(--border)'">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Speed Challenge</h3>
            <p style="color: var(--text-muted);">Race against the clock</p>
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border); text-align: left;">
          <h4 style="margin-bottom: 1rem;">Key Landmarks:</h4>
          <ul style="color: var(--text-muted); line-height: 1.8;">
            <li><strong>Sternal Angle (Angle of Louis):</strong> Locate 2nd rib → count down</li>
            <li><strong>Midclavicular Line:</strong> Straight down from middle of clavicle</li>
            <li><strong>Anterior Axillary Line:</strong> Front edge of armpit</li>
            <li><strong>Midaxillary Line:</strong> Middle of armpit</li>
            <li><strong>5th Intercostal Space:</strong> One space below nipple line (male)</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderPractice(container) {
    const leads = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const currentIndex = Object.keys(this.placedLeads).length;
    const currentLead = leads[currentIndex] || null;

    if (currentLead === null) {
      this.renderComplete(container);
      return;
    }

    const placement = LEAD_PLACEMENTS[currentLead];

    container.innerHTML = `
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <button onclick="window.leadGame.mode = null; window.leadGame.render();" class="btn">← Back</button>
          <div style="text-align: right;">
            <p><strong>Progress:</strong> ${currentIndex}/6 precordial leads placed</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <!-- Torso Diagram -->
          <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border);">
            <h3 style="text-align: center; margin-bottom: 1rem;">Place: <span style="color: var(--primary);">${currentLead}</span></h3>
            <div id="torso-container" style="position: relative; width: 100%; padding-bottom: 120%; background: linear-gradient(180deg, #f0e5d8 0%, #e8dcc8 100%); border-radius: 8px; overflow: hidden;">
              ${this.renderTorso()}
              ${this.renderPlacedLeads()}
              <div id="target-zone" style="position: absolute; left: ${placement.x - 5}%; top: ${placement.y - 5}%; width: 10%; height: 10%; border: 3px dashed var(--primary); border-radius: 50%; opacity: 0.5; animation: pulse 2s infinite;"></div>
            </div>
            <button onclick="window.leadGame.placeLead('${currentLead}')" class="btn btn-full" style="margin-top: 1rem;">
              Place ${currentLead} Here
            </button>
          </div>

          <!-- Instructions -->
          <div>
            <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 1rem;">
              <h4 style="color: var(--primary); margin-bottom: 1rem;">Current Lead: ${currentLead}</h4>
              <p style="margin-bottom: 1rem;"><strong>Placement:</strong> ${placement.description}</p>
              <p style="color: var(--text-muted);"><strong>How to find:</strong> ${placement.landmark}</p>
            </div>

            <div style="background: rgba(33, 128, 141, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
              <p style="font-weight: 600; margin-bottom: 0.5rem;">💎 Clinical Pearl:</p>
              <p style="color: var(--text-muted); font-size: 0.9rem;">
                ${this.getLeadPearl(currentLead)}
              </p>
            </div>

            <div id="feedback" style="margin-top: 1rem;"></div>
          </div>
        </div>
      </div>

      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      </style>
    `;
  }

  renderTest(container) {
    const totalLeads = this.leadsToPlace.length;
    const placed = Object.keys(this.placedLeads).length;
    const currentLead = this.leadsToPlace[placed] || null;

    if (currentLead === null) {
      this.renderComplete(container);
      return;
    }

    const elapsed = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0;

    container.innerHTML = `
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; align-items: center;">
          <button onclick="window.leadGame.mode = null; window.leadGame.render();" class="btn">← Exit</button>
          <div style="text-align: center;">
            <h3 style="color: var(--primary);">Place: ${currentLead}</h3>
            <p style="color: var(--text-muted);">Lead ${placed + 1} of ${totalLeads}</p>
          </div>
          <div style="text-align: right;">
            <p><strong>Score:</strong> ${this.score}/${this.attempts}</p>
            ${this.mode === 'speed' ? `<p><strong>Time:</strong> ${elapsed}s</p>` : ''}
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); max-width: 600px; margin: 0 auto;">
          <div id="torso-container" style="position: relative; width: 100%; padding-bottom: 120%; background: linear-gradient(180deg, #f0e5d8 0%, #e8dcc8 100%); border-radius: 8px; overflow: hidden; cursor: crosshair;">
            ${this.renderTorso()}
            ${this.renderPlacedLeads()}
          </div>
          <p style="text-align: center; margin-top: 1rem; color: var(--text-muted);">Click where ${currentLead} should be placed</p>
        </div>

        <div id="feedback" style="max-width: 600px; margin: 2rem auto;"></div>
      </div>
    `;

    // Add click handler for test mode
    const torso = document.getElementById('torso-container');
    torso.addEventListener('click', (e) => {
      const rect = torso.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.checkPlacement(currentLead, x, y);
    });
  }

  renderTorso() {
    return `
      <!-- Simplified torso outline -->
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" viewBox="0 0 100 120">
        <!-- Body outline -->
        <path d="M 30 10 Q 35 5 40 5 L 60 5 Q 65 5 70 10 L 75 50 Q 76 70 75 90 L 70 110 L 60 115 L 40 115 L 30 110 L 25 90 Q 24 70 25 50 Z" 
              fill="none" stroke="#8B7355" stroke-width="1" opacity="0.5"/>
        
        <!-- Clavicles -->
        <line x1="35" y1="15" x2="50" y2="12" stroke="#8B7355" stroke-width="1" opacity="0.3"/>
        <line x1="65" y1="15" x2="50" y2="12" stroke="#8B7355" stroke-width="1" opacity="0.3"/>
        
        <!-- Sternum -->
        <line x1="50" y1="12" x2="50" y2="55" stroke="#8B7355" stroke-width="1.5" opacity="0.4"/>
        
        <!-- Ribs (simplified) -->
        <ellipse cx="50" cy="25" rx="22" ry="5" fill="none" stroke="#8B7355" stroke-width="0.5" opacity="0.2"/>
        <ellipse cx="50" cy="35" rx="24" ry="6" fill="none" stroke="#8B7355" stroke-width="0.5" opacity="0.2"/>
        <ellipse cx="50" cy="45" rx="25" ry="7" fill="none" stroke="#8B7355" stroke-width="0.5" opacity="0.2"/>
        
        <!-- Landmark indicators -->
        <circle cx="50" cy="20" r="1.5" fill="var(--accent)" opacity="0.6"/>
        <text x="52" y="20" font-size="3" fill="var(--accent)" opacity="0.6">Sternal angle</text>
      </svg>
    `;
  }

  renderPlacedLeads() {
    let html = '';
    for (const [lead, pos] of Object.entries(this.placedLeads)) {
      const placement = LEAD_PLACEMENTS[lead];
      html += `
        <div style="position: absolute; left: ${placement.x}%; top: ${placement.y}%; transform: translate(-50%, -50%); 
                    background: var(--primary); color: white; width: 30px; height: 30px; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;
                    border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          ${lead}
        </div>
      `;
    }
    return html;
  }

  getLeadPearl(lead) {
    const pearls = {
      'V1': 'Too high = misses RV changes. Too low = misses septal changes.',
      'V2': 'Mirror V1 across the sternum. Should be at same horizontal level.',
      'V3': 'Always place V4 first, then V3 goes between V2 and V4.',
      'V4': 'Key landmark. Find 5th ICS at midclavicular line. One space below nipple (male).',
      'V5': 'Horizontal from V4. Anterior axillary line = front edge of armpit.',
      'V6': 'Horizontal from V4/V5. Midaxillary line = middle of armpit. Often missed in obese patients.'
    };
    return pearls[lead] || 'Proper placement is critical for accurate interpretation.';
  }

  placeLead(lead) {
    this.placedLeads[lead] = true;
    this.render();
  }

  checkPlacement(lead, x, y) {
    const correct = LEAD_PLACEMENTS[lead];
    const distance = Math.sqrt(Math.pow(x - correct.x, 2) + Math.pow(y - correct.y, 2));
    
    this.attempts++;
    const isCorrect = distance < 8; // 8% tolerance

    if (isCorrect) {
      this.score++;
      this.placedLeads[lead] = true;
    }

    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `
      <div style="background: ${isCorrect ? 'rgba(33, 128, 141, 0.1)' : 'rgba(192, 21, 47, 0.1)'}; 
                  padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${isCorrect ? 'var(--primary)' : 'var(--accent)'};">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">
          <strong>${isCorrect ? '✓ Correct Placement!' : '✗ Incorrect Placement'}</strong>
        </p>
        <p><strong>${lead}:</strong> ${correct.description}</p>
        ${!isCorrect ? `<p style="margin-top: 0.5rem; color: var(--text-muted);">Distance off: ${distance.toFixed(1)}%</p>` : ''}
        <button onclick="window.leadGame.render()" class="btn btn-full" style="margin-top: 1rem;">
          ${isCorrect ? 'Next Lead' : 'Try Again'}
        </button>
      </div>
    `;

    if (!isCorrect) {
      // Show correct location briefly
      const torso = document.getElementById('torso-container');
      const marker = document.createElement('div');
      marker.style.cssText = `position: absolute; left: ${correct.x}%; top: ${correct.y}%; 
                              transform: translate(-50%, -50%); width: 20px; height: 20px; 
                              border: 3px solid var(--accent); border-radius: 50%; 
                              animation: fadeOut 3s forwards; pointer-events: none;`;
      torso.appendChild(marker);
    } else {
      setTimeout(() => this.render(), 1500);
    }
  }

  renderComplete(container) {
    const elapsed = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0;
    const accuracy = this.attempts > 0 ? Math.round((this.score / this.attempts) * 100) : 0;

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 style="color: var(--primary); margin-bottom: 2rem;">
          ${this.mode === 'practice' ? 'Practice Complete!' : 'Test Complete!'}
        </h2>

        ${this.mode !== 'practice' ? `
          <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 2rem;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <div>
                <p style="font-size: 2rem; color: var(--primary); font-weight: bold;">${this.score}/${this.attempts}</p>
                <p style="color: var(--text-muted);">Correct</p>
              </div>
              <div>
                <p style="font-size: 2rem; color: var(--primary); font-weight: bold;">${accuracy}%</p>
                <p style="color: var(--text-muted);">Accuracy</p>
              </div>
              <div>
                <p style="font-size: 2rem; color: var(--primary); font-weight: bold;">${elapsed}s</p>
                <p style="color: var(--text-muted);">Time</p>
              </div>
            </div>
          </div>
        ` : ''}

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button onclick="window.leadGame.start('${this.mode}')" class="btn btn-full">Play Again</button>
          <button onclick="window.leadGame.mode = null; window.leadGame.render();" class="btn">Main Menu</button>
        </div>

        <div style="background: rgba(33, 128, 141, 0.1); padding: 1.5rem; border-radius: 8px; margin-top: 2rem; text-align: left;">
          <p style="font-weight: 600; margin-bottom: 0.5rem;">💎 Remember:</p>
          <ul style="color: var(--text-muted); line-height: 1.8;">
            <li>Always place V4 first (5th ICS, midclavicular line)</li>
            <li>V1 and V2 at 4th ICS (sternal angle + 2 spaces)</li>
            <li>V5 and V6 horizontal from V4</li>
            <li>Breast tissue: place electrodes under or lateral to breast</li>
          </ul>
        </div>
      </div>

      <style>
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      </style>
    `;
  }
}

// Initialize game
const leadGame = new LeadPlacementGame();
window.leadGame = leadGame;

function initLeadPlacement() {
  const container = document.getElementById('lead-placement-game');
  if (container) {
    leadGame.render();
  }
}

// For integration with games.js
function playLeadPlacement(config) {
  window.currentGame = new GameEngine('lead_placement', config);
  window.currentGame.totalQuestions = 10; // For score tracking
  
  // Create container if it doesn't exist
  const gameContent = document.getElementById('gameContent');
  if (gameContent) {
    gameContent.innerHTML = '<div id="lead-placement-game"></div>';
    leadGame.render();
    return '';
  }
  
  return '<div id="lead-placement-game"></div>';
}


function playLeadPlacement(config) {
  window.currentGame = new GameEngine('lead_placement', config);
  window.currentGame.totalQuestions = 10; // For score tracking
  
  // Create container if it doesn't exist
  const gameContent = document.getElementById('gameContent');
  if (gameContent) {
    gameContent.innerHTML = '<div id="lead-placement-game"></div>';
    leadGame.render();
    return '';
  }
  
  return '<div id="lead-placement-game"></div>';
}

// Expose to window for games.js
window.playLeadPlacement = playLeadPlacement;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLeadPlacement);
} else {
  initLeadPlacement();
}


const airwayGame = new AirwayGame();
window.airwayGame = airwayGame;

function playAirwayManagement(config) {
  window.currentGame = new GameEngine('airway_management', config);
  window.currentGame.totalQuestions = 1;
  
  const gameContent = document.getElementById('gameContent');
  if (gameContent) {
    gameContent.innerHTML = '<div id="airway-game"></div>';
    airwayGame.render();
    return '';
  }
  
  return '<div id="airway-game"></div>';
}

window.playAirwayManagement = playAirwayManagement;

function initAirway() {
  const container = document.getElementById('airway-game');
  if (container) {
    airwayGame.render();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAirway);
} else {
  initAirway();
}


const sampleGame = new SAMPLEOPQRSTGame();
window.sampleGame = sampleGame;

function playSampleOpqrst(config) {
  window.currentGame = new GameEngine('sample_opqrst', config);
  window.currentGame.totalQuestions = 1;
  
  const gameContent = document.getElementById('gameContent');
  if (gameContent) {
    gameContent.innerHTML = '<div id="sample-opqrst-game"></div>';
    sampleGame.render();
    return '';
  }
  
  return '<div id="sample-opqrst-game"></div>';
}

window.playSampleOpqrst = playSampleOpqrst;

function initSampleOpqrst() {
  const container = document.getElementById('sample-opqrst-game');
  if (container) {
    sampleGame.render();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSampleOpqrst);
} else {
  initSampleOpqrst();
}