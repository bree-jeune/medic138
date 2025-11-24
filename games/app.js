// Main application logic

let currentGameConfig = null;

export function renderGameMenu() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="games-grid">
        ${GAMES.map(game => `
          <div class="game-card" onclick="startGame('${game.id}')">
            <div class="game-card-icon">${game.icon || '🚑'}</div>
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            ${game.isPremium ? '<span class="badge badge--pro">PRO</span>' : ''}
          </div>
        `).join('')}
      </div>
    `;
}

// Concept Code
function onGameSelect(gameId) {
  const user = auth.currentUser;
  const game = GAMES.find(g => g.id === gameId);

  if (game.isPremium && !user.customClaims.isPro) {
    showPaywallModal();
    return;
  }
  
  startGame(gameId);
}

// games/app.js

function startGame(gameId) {
  const game = GAMES.find(g => g.id === gameId);
  
  // 1. Premium Gate Check (Keep existing logic)
  if (game.isPremium && !window.currentUser) {
      showPaywall("Login Required", "Please log in to access this simulation.");
      return;
  }

  currentGameConfig = { gameId };
  
  // 2. If game has NO difficulty levels, auto-select "Standard" and skip that UI section
  if (game.hasDifficulty === false) {
      currentGameConfig.difficulty = 'Standard'; // Default internal value
  }

  renderConfigScreen(game);
}

function renderConfigScreen(game) {
  const app = document.getElementById('app');
  
  // Logic to HIDE difficulty section if not needed
  const difficultyHTML = game.hasDifficulty !== false ? `
        <div class="config-section">
          <h3>Select Level</h3>
          <div class="option-group">
            ${DIFFICULTY_LEVELS.map(level => `
              <button class="option-btn" onclick="selectDifficulty('${level}')">${level}</button>
            `).join('')}
          </div>
        </div>` : '';

  // Render the screen
  app.innerHTML = `
    <div class="header">
      <h1>MEDIC 138</h1>
      <p>${game.title}</p>
    </div>
    <div class="config-screen">
      <div class="back-nav">
        <button class="back-btn" onclick="showMainMenu()">← Menu</button>
      </div>
      <div class="config-card">
        
        ${difficultyHTML}
        
        <div class="config-section">
          <h3>Mode</h3>
          <div class="option-group">
            ${GAME_MODES.map(mode => `
              <button class="option-btn" onclick="selectMode('${mode}')">${mode}</button>
            `).join('')}
          </div>
        </div>

        ${renderSubModes(game)} 
        
        <button class="btn btn-large btn-full mt-24" onclick="launchGame()" id="startBtn" disabled>
          Start Simulation
        </button>
      </div>
    </div>
  `;
  
  // Auto-check config if difficulty is already "Standard"
  checkConfigComplete();
}

// Helper for submodes to clean up HTML above
function renderSubModes(game) {
    if (game.hasSubModes) {
        return `
          <div class="config-section">
            <h3>Scenario Type</h3>
            <div class="option-group">
              ${game.subModes.map(mode => `
                <button class="option-btn" onclick="selectSubMode('${mode}')">
                  ${mode.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              `).join('')}
            </div>
          </div>`;
    }
    return '';
}

function showPaywall(title, msg) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="config-screen" style="text-align: center; padding-top: 4rem;">
      <div class="config-card" style="max-width: 500px; margin: 0 auto;">
        <h2 style="color: var(--accent); margin-bottom: 1rem;">🔒 ${title}</h2>
        <p>${msg}</p>
        <button class="btn btn--primary btn--lg" onclick="window.authService.login()">Login to Unlock</button>
        <br><br>
        <button class="btn btn--secondary" onclick="showMainMenu()">Back to Menu</button>
      </div>
    </div>
  `;
}

function selectDifficulty(level) {
  currentGameConfig.difficulty = level;
  updateSelectedButton('difficulty', level);
  checkConfigComplete();
}

function selectMode(mode) {
  currentGameConfig.mode = mode;
  updateSelectedButton('mode', mode);
  checkConfigComplete();
}

function selectSubMode(subMode) {
  currentGameConfig.subMode = subMode;
  updateSelectedButton('subMode', subMode);
  checkConfigComplete();
}

function selectSubType(subType) {
  currentGameConfig.subType = subType;
  updateSelectedButton('subType', subType);
  checkConfigComplete();
}

function updateSelectedButton(type, value) {
  const displayValue = value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Clear previous selections for this group
  let group = document.querySelector('.config-card').querySelector('.config-section').querySelectorAll('.option-btn');
  document.querySelectorAll('.option-group').forEach(groupEl => {
      if (groupEl.innerHTML.includes(displayValue)) {
          groupEl.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
      }
  });

  document.querySelectorAll('.option-btn').forEach(btn => {
    if (btn.textContent.trim() === displayValue) {
      btn.classList.add('selected');
    }
  });
}


// games/app.js - Update checkConfigComplete
function checkConfigComplete() {
  const game = GAMES.find(g => g.id === currentGameConfig.gameId);
  
  // Only check difficulty if the game actually HAS difficulty
  const difficultyOk = (game.hasDifficulty === false) || currentGameConfig.difficulty;

  const hasRequiredConfig = 
    difficultyOk && 
    currentGameConfig.mode &&
    (!game.hasSubModes || currentGameConfig.subMode) &&
    (!game.hasSubTypes || currentGameConfig.subType);
  
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.disabled = !hasRequiredConfig;
  }
}

function launchGame() {
  const app = document.getElementById('app');
  const game = GAMES.find(g => g.id === currentGameConfig.gameId);
  
  let gameContent = '';
  
  // Route to appropriate game engine
  switch(currentGameConfig.gameId) {
    case 'oxygen_regulator':
      gameContent = playOxygenRegulator(currentGameConfig);
      break;
    case 'intervention_matching':
      gameContent = playInterventionMatching(currentGameConfig);
      break;
    case 'iv_flow_rate':
      gameContent = playIVFlowRate(currentGameConfig);
      break;
    case 'cardiac_rhythms':
      gameContent = playCardiacRhythms(currentGameConfig);
      break;
    case 'medication_dosing':
      gameContent = playMedicationDosing(currentGameConfig);
      break;
    case 'trauma_assessment':
      gameContent = playTraumaAssessment(currentGameConfig);
      break;
    case 'abg_interpretation':
      gameContent = playABGInterpretation(currentGameConfig);
      break;
    case 'triage_scenarios':
      gameContent = playTriageScenarios(currentGameConfig);
      break;
    case 'ecg_interpretation':
      gameContent = playECGInterpretation(currentGameConfig);
      break;
    case 'lead_placement':
      gameContent = playLeadPlacement(currentGameConfig);
      break;
    case 'airway_management':
      gameContent = playAirwayManagement(currentGameConfig);
      break;
    case 'sample_opqrst':
      gameContent = playSampleOpqrst(currentGameConfig);
      break;
    case 'ventilator_management':
        // We need to ensure vent.js exposes a start function similar to others
        // Since vent.js uses a class window.ventGame, we might need a wrapper logic here
        // Or simply:
        if (window.ventGame) {
            window.ventGame.start();
            gameContent = '<div id="vent-game"></div>'; 
        }
      break;
    default:
      gameContent = '<div class="game-content"><p>This game is coming soon! Focus on the fundamentals first.</p></div>';
  }
  
  app.innerHTML = `
    <div class="header">
      <h1>MEDIC 138</h1>
      <p>${game.title}</p>
    </div>
    <div class="game-screen">
      <div class="back-nav">
        <button class="back-btn" onclick="confirmExit()">← Exit Game</button>
      </div>
      <div class="game-header">
        <div class="game-info">
          <h2>${game.title}</h2>
          <p>${currentGameConfig.difficulty} - ${currentGameConfig.mode}</p>
        </div>
        <div class="game-stats">
          <div class="stat">
            <span class="stat-label">Score</span>
            <span class="stat-value" id="scoreDisplay">0/0</span>
          </div>
          ${currentGameConfig.mode === 'Timed Challenge' ? `
            <div class="stat">
              <span class="stat-label">Time</span>
              <span class="stat-value timer">0:00</span>
            </div>
          ` : ''}
        </div>
      </div>
      <div id="gameContent">
        ${gameContent}
      </div>
    </div>
  `;
  
  // Start timer if in challenge mode
  if (window.currentGame && currentGameConfig.mode === 'Timed Challenge') {
    window.currentGame.startTimer();
  }
  
  updateScoreDisplay();
}

window.updateScoreDisplay = function() { 
  const scoreEl = document.getElementById('scoreDisplay');
  if (scoreEl && window.currentGame) {
    scoreEl.textContent = `${window.currentGame.score}/${window.currentGame.totalQuestions}`;
  }
}

function confirmExit() {
  if (confirm("End this run and return to the main menu?")) {
    showMainMenu();
  }
}

/* ---------- Global hooks for inline handlers ---------- */

// Expose functions so onclick="..." in the generated HTML works
window.startGame = startGame;
window.showMainMenu = showMainMenu;
window.selectDifficulty = selectDifficulty;
window.selectMode = selectMode;
window.selectSubMode = selectSubMode;
window.selectSubType = selectSubType;
window.launchGame = launchGame;
window.confirmExit = confirmExit;



