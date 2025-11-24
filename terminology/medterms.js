const MEDICAL_TERMS = [
  // Cardiac Terms
  { word: "tachycardia", meaning: "fast heart rate", category: "cardiac", breakdown: "tachy (fast) + cardia (heart)" },
  { word: "bradycardia", meaning: "slow heart rate", category: "cardiac", breakdown: "brady (slow) + cardia (heart)" },
  { word: "myocardial", meaning: "relating to heart muscle", category: "cardiac", breakdown: "myo (muscle) + cardial (heart)" },
  { word: "pericarditis", meaning: "inflammation of heart sac", category: "cardiac", breakdown: "peri (around) + card (heart) + itis (inflammation)" },
  { word: "endocardium", meaning: "inner lining of heart", category: "cardiac", breakdown: "endo (within) + cardium (heart)" },
  
  // Respiratory Terms
  { word: "dyspnea", meaning: "difficulty breathing", category: "respiratory", breakdown: "dys (difficult) + pnea (breathing)" },
  { word: "tachypnea", meaning: "fast breathing", category: "respiratory", breakdown: "tachy (fast) + pnea (breathing)" },
  { word: "apnea", meaning: "absence of breathing", category: "respiratory", breakdown: "a (without) + pnea (breathing)" },
  { word: "hypoxia", meaning: "low oxygen in tissues", category: "respiratory", breakdown: "hypo (low) + oxia (oxygen)" },
  { word: "cyanosis", meaning: "bluish discoloration from low oxygen", category: "respiratory", breakdown: "cyan (blue) + osis (condition)" },
  
  // Blood/Hematology Terms
  { word: "hematemesis", meaning: "vomiting blood", category: "hematology", breakdown: "hemat (blood) + emesis (vomiting)" },
  { word: "hematuria", meaning: "blood in urine", category: "hematology", breakdown: "hemat (blood) + uria (urine)" },
  { word: "hemoptysis", meaning: "coughing up blood", category: "hematology", breakdown: "hemo (blood) + ptysis (spitting)" },
  { word: "anemia", meaning: "low red blood cells", category: "hematology", breakdown: "an (without) + emia (blood)" },
  { word: "leukocytosis", meaning: "elevated white blood cells", category: "hematology", breakdown: "leuko (white) + cyte (cell) + osis (condition)" },
  
  // Neurological Terms
  { word: "hemiplegia", meaning: "paralysis of one side", category: "neuro", breakdown: "hemi (half) + plegia (paralysis)" },
  { word: "paraplegia", meaning: "paralysis of lower body", category: "neuro", breakdown: "para (beside/abnormal) + plegia (paralysis)" },
  { word: "aphasia", meaning: "inability to speak", category: "neuro", breakdown: "a (without) + phasia (speech)" },
  { word: "syncope", meaning: "fainting", category: "neuro", breakdown: "syn (together) + cope (strike)" },
  { word: "paresthesia", meaning: "abnormal sensation (tingling)", category: "neuro", breakdown: "par (abnormal) + esthesia (sensation)" },
  
  // GI Terms
  { word: "hematemesis", meaning: "vomiting blood", category: "gi", breakdown: "hemat (blood) + emesis (vomiting)" },
  { word: "melena", meaning: "black tarry stools", category: "gi", breakdown: "melena (black)" },
  { word: "hematochezia", meaning: "bright red blood in stool", category: "gi", breakdown: "hemato (blood) + chezia (defecation)" },
  { word: "dysphagia", meaning: "difficulty swallowing", category: "gi", breakdown: "dys (difficult) + phagia (swallowing)" },
  { word: "gastritis", meaning: "inflammation of stomach", category: "gi", breakdown: "gastr (stomach) + itis (inflammation)" },
  
  // Trauma/Orthopedic Terms
  { word: "fracture", meaning: "broken bone", category: "trauma", breakdown: "fract (break) + ure (result)" },
  { word: "contusion", meaning: "bruise", category: "trauma", breakdown: "contus (bruised)" },
  { word: "laceration", meaning: "cut or tear", category: "trauma", breakdown: "lacer (torn) + ation (process)" },
  { word: "ecchymosis", meaning: "bruising/discoloration", category: "trauma", breakdown: "ecchym (pour out) + osis (condition)" },
  { word: "avulsion", meaning: "tearing away", category: "trauma", breakdown: "a (away) + vulsion (pulling)" },
  
  // Prefixes/Suffixes Practice
  { word: "hypertension", meaning: "high blood pressure", category: "vital", breakdown: "hyper (high) + tension (pressure)" },
  { word: "hypotension", meaning: "low blood pressure", category: "vital", breakdown: "hypo (low) + tension (pressure)" },
  { word: "hyperglycemia", meaning: "high blood sugar", category: "metabolic", breakdown: "hyper (high) + glyc (sugar) + emia (blood)" },
  { word: "hypoglycemia", meaning: "low blood sugar", category: "metabolic", breakdown: "hypo (low) + glyc (sugar) + emia (blood)" },
  { word: "tachycardia", meaning: "fast heart rate", category: "cardiac", breakdown: "tachy (fast) + cardia (heart)" }
];

class MedTermGame {
  constructor() {
    this.currentTerm = null;
    this.score = 0;
    this.total = 0;
    this.streak = 0;
    this.mode = 'flashcard'; // 'flashcard', 'multiple-choice', 'spelling'
    this.difficulty = 'all'; // 'all', 'cardiac', 'respiratory', etc.
    this.usedTerms = [];
  }

  getRandomTerm() {
    let availableTerms = MEDICAL_TERMS.filter(t => 
      !this.usedTerms.includes(t.word) && 
      (this.difficulty === 'all' || t.category === this.difficulty)
    );

    if (availableTerms.length === 0) {
      this.usedTerms = [];
      availableTerms = MEDICAL_TERMS.filter(t => 
        this.difficulty === 'all' || t.category === this.difficulty
      );
    }

    const term = availableTerms[Math.floor(Math.random() * availableTerms.length)];
    this.usedTerms.push(term.word);
    return term;
  }

  generateMultipleChoice(correctTerm) {
    const wrongTerms = MEDICAL_TERMS
      .filter(t => t.word !== correctTerm.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(t => t.meaning);

    const allOptions = [correctTerm.meaning, ...wrongTerms];
    return allOptions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(userAnswer, correctAnswer) {
    this.total++;
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      this.score++;
      this.streak++;
    } else {
      this.streak = 0;
    }

    return isCorrect;
  }

  getAccuracy() {
    return this.total === 0 ? 0 : Math.round((this.score / this.total) * 100);
  }
}

// Initialize game
let game = new MedTermGame();

function initMedTermGame() {
  const container = document.getElementById('vocab-game');
  if (!container) return;

  renderMainMenu();
}

function renderMainMenu() {
  const container = document.getElementById('vocab-game');
  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
      <h2 style="color: var(--primary); margin-bottom: 2rem;">Medical Terminology Drill</h2>
      
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Select Category</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
          <button onclick="setDifficulty('all')" class="option-btn ${game.difficulty === 'all' ? 'selected' : ''}">All Terms</button>
          <button onclick="setDifficulty('cardiac')" class="option-btn ${game.difficulty === 'cardiac' ? 'selected' : ''}">Cardiac</button>
          <button onclick="setDifficulty('respiratory')" class="option-btn ${game.difficulty === 'respiratory' ? 'selected' : ''}">Respiratory</button>
          <button onclick="setDifficulty('hematology')" class="option-btn ${game.difficulty === 'hematology' ? 'selected' : ''}">Blood</button>
          <button onclick="setDifficulty('neuro')" class="option-btn ${game.difficulty === 'neuro' ? 'selected' : ''}">Neuro</button>
          <button onclick="setDifficulty('trauma')" class="option-btn ${game.difficulty === 'trauma' ? 'selected' : ''}">Trauma</button>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Select Game Mode</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <button onclick="startGame('flashcard')" class="btn btn-full" style="padding: 1.5rem;">
            <strong>Flashcards</strong><br>
            <small>Learn and review terms</small>
          </button>
          <button onclick="startGame('multiple-choice')" class="btn btn-full" style="padding: 1.5rem;">
            <strong>Multiple Choice</strong><br>
            <small>Test your knowledge</small>
          </button>
          <button onclick="startGame('spelling')" class="btn btn-full" style="padding: 1.5rem;">
            <strong>Spelling Challenge</strong><br>
            <small>Type the meaning</small>
          </button>
        </div>
      </div>

      ${game.total > 0 ? `
        <div style="background: var(--bg-surface); padding: 1rem; border-radius: 8px; border: 1px solid var(--border);">
          <p><strong>Current Session:</strong></p>
          <p>Score: ${game.score}/${game.total} (${game.getAccuracy()}%) | Streak: ${game.streak}</p>
        </div>
      ` : ''}
    </div>
  `;
}

function setDifficulty(level) {
  game.difficulty = level;
  renderMainMenu();
}

function startGame(mode) {
  game.mode = mode;
  game.currentTerm = game.getRandomTerm();

  if (mode === 'flashcard') {
    renderFlashcard();
  } else if (mode === 'multiple-choice') {
    renderMultipleChoice();
  } else if (mode === 'spelling') {
    renderSpelling();
  }
}

function renderFlashcard() {
  const container = document.getElementById('vocab-game');
  const term = game.currentTerm;

  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="text-align: right; margin-bottom: 1rem;">
        <button onclick="renderMainMenu()" class="btn" style="padding: 0.5rem 1rem;">← Back to Menu</button>
      </div>

      <div style="background: var(--bg-surface); border: 2px solid var(--primary); border-radius: 12px; padding: 3rem; text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;">${term.word}</h2>
        <div id="flashcard-answer" style="display: none;">
          <p style="font-size: 1.5rem; margin-bottom: 1rem;"><strong>${term.meaning}</strong></p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${term.breakdown}</p>
        </div>
        <button onclick="flipCard()" id="flip-btn" class="btn btn-full" style="margin-top: 2rem;">Show Meaning</button>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button onclick="nextFlashcard()" class="btn btn-full">Next Term →</button>
      </div>

      <div style="margin-top: 2rem; text-align: center; color: var(--text-muted);">
        <p>Terms Reviewed: ${game.total}</p>
      </div>
    </div>
  `;
}

function flipCard() {
  const answer = document.getElementById('flashcard-answer');
  const btn = document.getElementById('flip-btn');
  
  if (answer.style.display === 'none') {
    answer.style.display = 'block';
    btn.textContent = 'Hide Meaning';
  } else {
    answer.style.display = 'none';
    btn.textContent = 'Show Meaning';
  }
}

function nextFlashcard() {
  game.total++;
  startGame('flashcard');
}

function renderMultipleChoice() {
  const container = document.getElementById('vocab-game');
  const term = game.currentTerm;
  const options = game.generateMultipleChoice(term);

  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <button onclick="renderMainMenu()" class="btn" style="padding: 0.5rem 1rem;">← Menu</button>
        <div style="text-align: right;">
          <p><strong>${game.score}/${game.total}</strong> (${game.getAccuracy()}%)</p>
          <p style="color: var(--primary);">Streak: ${game.streak}</p>
        </div>
      </div>

      <div style="background: var(--bg-surface); border-radius: 8px; padding: 2rem; margin-bottom: 2rem; text-align: center;">
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">What does this mean?</p>
        <h2 style="font-size: 2rem; color: var(--primary);">${term.word}</h2>
      </div>

      <div style="display: grid; gap: 1rem;">
        ${options.map((option, i) => `
          <button onclick="checkMultipleChoice('${option.replace(/'/g, "\\'")}', '${term.meaning.replace(/'/g, "\\'")}')" 
                  class="answer-btn" 
                  style="padding: 1.5rem; text-align: left; font-size: 1.1rem;">
            ${option}
          </button>
        `).join('')}
      </div>

      <div id="feedback" style="margin-top: 2rem;"></div>
    </div>
  `;
}

function checkMultipleChoice(selected, correct) {
  const isCorrect = selected === correct;
  game.checkAnswer(selected, correct);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent.trim() === correct) {
      btn.style.background = 'rgba(33, 128, 141, 0.2)';
      btn.style.borderColor = 'var(--primary)';
      btn.style.color = 'var(--primary)';
    } else if (btn.textContent.trim() === selected && !isCorrect) {
      btn.style.background = 'rgba(192, 21, 47, 0.2)';
      btn.style.borderColor = 'var(--accent)';
      btn.style.color = 'var(--accent)';
    }
  });

  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `
    <div style="background: ${isCorrect ? 'rgba(33, 128, 141, 0.1)' : 'rgba(192, 21, 47, 0.1)'}; 
                padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${isCorrect ? 'var(--primary)' : 'var(--accent)'};">
      <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">
        <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
      </p>
      ${!isCorrect ? `<p style="margin-bottom: 1rem;">The correct answer is: <strong>${correct}</strong></p>` : ''}
      <p style="color: var(--text-muted); margin-bottom: 1rem;">${game.currentTerm.breakdown}</p>
      <button onclick="startGame('multiple-choice')" class="btn btn-full">Next Question</button>
    </div>
  `;
}

function renderSpelling() {
  const container = document.getElementById('vocab-game');
  const term = game.currentTerm;

  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <button onclick="renderMainMenu()" class="btn" style="padding: 0.5rem 1rem;">← Menu</button>
        <div style="text-align: right;">
          <p><strong>${game.score}/${game.total}</strong> (${game.getAccuracy()}%)</p>
          <p style="color: var(--primary);">Streak: ${game.streak}</p>
        </div>
      </div>

      <div style="background: var(--bg-surface); border-radius: 8px; padding: 2rem; margin-bottom: 2rem; text-align: center;">
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">Type the meaning of:</p>
        <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;">${term.word}</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Hint: ${term.breakdown}</p>
      </div>

      <div>
        <input type="text" 
               id="spelling-input" 
               placeholder="Type your answer here..." 
               style="width: 100%; padding: 1rem; font-size: 1.1rem; border: 2px solid var(--border); border-radius: 8px; margin-bottom: 1rem;"
               onkeypress="if(event.key==='Enter') checkSpelling()">
        <button onclick="checkSpelling()" class="btn btn-full" style="padding: 1rem; font-size: 1.1rem;">
          Submit Answer
        </button>
      </div>

      <div id="feedback" style="margin-top: 2rem;"></div>
    </div>
  `;

  document.getElementById('spelling-input').focus();
}

function checkSpelling() {
  const input = document.getElementById('spelling-input');
  const userAnswer = input.value.trim();
  const correct = game.currentTerm.meaning;

  const isCorrect = game.checkAnswer(userAnswer, correct);

  input.disabled = true;
  document.querySelector('button[onclick="checkSpelling()"]').style.display = 'none';

  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `
    <div style="background: ${isCorrect ? 'rgba(33, 128, 141, 0.1)' : 'rgba(192, 21, 47, 0.1)'}; 
                padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${isCorrect ? 'var(--primary)' : 'var(--accent)'};">
      <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">
        <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
      </p>
      <p style="margin-bottom: 0.5rem;"><strong>Your answer:</strong> ${userAnswer}</p>
      ${!isCorrect ? `<p style="margin-bottom: 1rem;"><strong>Correct answer:</strong> ${correct}</p>` : ''}
      <p style="color: var(--text-muted); margin-bottom: 1rem;">${game.currentTerm.breakdown}</p>
      <button onclick="startGame('spelling')" class="btn btn-full">Next Question</button>
    </div>
  `;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMedTermGame);
} else {
  initMedTermGame();
}

// Expose functions to window for onclick handlers
window.setDifficulty = setDifficulty;
window.startGame = startGame;
window.flipCard = flipCard;
window.nextFlashcard = nextFlashcard;
window.checkMultipleChoice = checkMultipleChoice;
window.renderMainMenu = renderMainMenu;
window.checkSpelling = checkSpelling;