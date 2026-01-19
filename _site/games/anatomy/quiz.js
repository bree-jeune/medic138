/**
 * Quiz Mode for Anatomy Explorer
 * Handles quiz logic, scoring, and accuracy tracking
 */

class QuizMode {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;
        this.isWaitingForAnswer = false;
        this.currentCorrectAnswer = null;
        this.currentLevel = 'basic';

        // Track accuracy by system
        this.systemStats = {};
        this.loadStats();
    }

    // ═══════════════════════════════════════════════════════════════════
    // STORAGE
    // ═══════════════════════════════════════════════════════════════════

    loadStats() {
        try {
            const stored = localStorage.getItem('anatomy_quiz_stats');
            if (stored) {
                this.systemStats = JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Could not load quiz stats:', e);
        }

        // Initialize any missing systems
        Object.keys(BODY_SYSTEMS).forEach(system => {
            if (!this.systemStats[system]) {
                this.systemStats[system] = { correct: 0, total: 0 };
            }
        });
    }

    saveStats() {
        try {
            localStorage.setItem('anatomy_quiz_stats', JSON.stringify(this.systemStats));
        } catch (e) {
            console.warn('Could not save quiz stats:', e);
        }
    }

    resetStats() {
        Object.keys(this.systemStats).forEach(system => {
            this.systemStats[system] = { correct: 0, total: 0 };
        });
        this.saveStats();
        this.updateStatsDisplay();
    }

    // ═══════════════════════════════════════════════════════════════════
    // QUESTION GENERATION
    // ═══════════════════════════════════════════════════════════════════

    generateQuestions(count = 10) {
        this.questions = [];

        // Get current level from explorer if available
        if (window.anatomyExplorer) {
            this.currentLevel = window.anatomyExplorer.currentLevel;
        }

        // Get all structures with quiz data, filtered by level
        const levelOrder = ['basic', 'aemt', 'paramedic', 'advanced'];
        const currentLevelIndex = levelOrder.indexOf(this.currentLevel);

        const quizableStructures = Object.entries(ANATOMY_DATA)
            .filter(([id, data]) => {
                if (!data.quiz || data.quiz.length === 0) return false;
                // Filter by level - only include structures at or below current level
                const structureLevelIndex = levelOrder.indexOf(data.level || 'basic');
                return structureLevelIndex <= currentLevelIndex;
            });

        if (quizableStructures.length === 0) {
            console.warn('No quizable structures found for level:', this.currentLevel);
            return;
        }

        // Shuffle and pick
        const shuffled = this.shuffle([...quizableStructures]);
        const selected = shuffled.slice(0, Math.min(count, shuffled.length));

        selected.forEach(([uberonId, data]) => {
            // Pick a random quiz question for this structure
            const quizItem = data.quiz[Math.floor(Math.random() * data.quiz.length)];

            this.questions.push({
                uberonId,
                question: quizItem.q,
                type: quizItem.type,
                answer: data.name,
                system: data.system,
                level: data.level
            });
        });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ═══════════════════════════════════════════════════════════════════
    // QUIZ FLOW
    // ═══════════════════════════════════════════════════════════════════

    start() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;

        this.generateQuestions(10);
        this.updateStatsDisplay();
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.currentCorrectAnswer = question.uberonId;
        this.isWaitingForAnswer = true;

        // Update UI
        const progressEl = document.querySelector('.quiz-progress');
        const questionEl = document.querySelector('.quiz-question');
        const instructionEl = document.querySelector('.quiz-instruction');
        const feedbackEl = document.querySelector('.quiz-feedback');
        const scoreEl = document.querySelector('.quiz-score');

        if (progressEl) {
            progressEl.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }

        if (questionEl) {
            questionEl.textContent = question.question;
        }

        if (instructionEl) {
            instructionEl.textContent = 'Click on the correct structure in the diagram';
        }

        if (feedbackEl) {
            feedbackEl.classList.add('hidden');
            feedbackEl.classList.remove('correct', 'incorrect');
        }

        if (scoreEl) {
            scoreEl.textContent = `Score: ${this.score}/${this.totalAnswered}`;
        }

        // Highlight that we're in quiz mode
        this.highlightQuizTarget();
    }

    highlightQuizTarget() {
        // Could add visual hints here if needed
    }

    handleSelection(uberonId) {
        if (!this.isWaitingForAnswer) return;

        this.isWaitingForAnswer = false;
        this.totalAnswered++;

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = uberonId === this.currentCorrectAnswer;

        // Update system stats
        if (question.system) {
            if (!this.systemStats[question.system]) {
                this.systemStats[question.system] = { correct: 0, total: 0 };
            }
            this.systemStats[question.system].total++;
            if (isCorrect) {
                this.systemStats[question.system].correct++;
            }
            this.saveStats();
        }

        if (isCorrect) {
            this.score++;
            this.showFeedback(true, question.answer);
            if (window.anatomyExplorer) {
                window.anatomyExplorer.playSound('correct');
            }
        } else {
            const selectedData = ANATOMY_DATA[uberonId];
            const selectedName = selectedData ? selectedData.name : 'Unknown';
            this.showFeedback(false, question.answer, selectedName);
            if (window.anatomyExplorer) {
                window.anatomyExplorer.playSound('incorrect');
            }
        }

        // Highlight correct answer
        this.highlightAnswer(this.currentCorrectAnswer, isCorrect);
    }

    showFeedback(isCorrect, correctAnswer, selectedAnswer = null) {
        const feedbackEl = document.querySelector('.quiz-feedback');
        const scoreEl = document.querySelector('.quiz-score');

        if (feedbackEl) {
            feedbackEl.classList.remove('hidden', 'correct', 'incorrect');

            if (isCorrect) {
                feedbackEl.classList.add('correct');
                feedbackEl.textContent = `Correct! That is the ${correctAnswer}.`;
            } else {
                feedbackEl.classList.add('incorrect');
                feedbackEl.textContent = `Incorrect. You selected ${selectedAnswer}. The correct answer was ${correctAnswer}.`;
            }
        }

        if (scoreEl) {
            scoreEl.textContent = `Score: ${this.score}/${this.totalAnswered}`;
        }

        // Auto-advance after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 2500);
    }

    highlightAnswer(uberonId, wasCorrect) {
        // Find the element and temporarily highlight it
        const svg = document.querySelector('.svg-container:not(.hidden) svg');
        if (!svg) return;

        const element = svg.getElementById(uberonId);
        if (element) {
            element.classList.add('selected');

            setTimeout(() => {
                element.classList.remove('selected');
            }, 2000);
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    showResults() {
        const container = document.querySelector('.quiz-container');
        if (!container) return;

        const percentage = this.totalAnswered > 0
            ? Math.round((this.score / this.totalAnswered) * 100)
            : 0;

        let resultMessage = '';
        if (percentage >= 90) {
            resultMessage = 'Excellent! You have a strong grasp of human anatomy.';
        } else if (percentage >= 70) {
            resultMessage = 'Good work! Keep studying to strengthen weaker areas.';
        } else if (percentage >= 50) {
            resultMessage = 'Fair performance. Review the systems you struggled with.';
        } else {
            resultMessage = 'Keep practicing. Focus on one system at a time.';
        }

        // Identify weak systems
        const weakSystems = this.getWeakSystems();
        let weakSystemsHtml = '';
        if (weakSystems.length > 0) {
            weakSystemsHtml = `
        <div class="info-section">
          <h3 class="info-section-title">Areas for Improvement</h3>
          <div class="info-section-content">
            <p>You may want to focus on: <strong>${weakSystems.join(', ')}</strong></p>
          </div>
        </div>
      `;
        }

        container.innerHTML = `
      <div class="quiz-results">
        <h2 class="info-title">Quiz Complete</h2>
        <div class="quiz-stats">
          <div class="quiz-stats-grid">
            <div class="quiz-stat">
              <div class="quiz-stat-value">${this.score}</div>
              <div class="quiz-stat-label">Correct</div>
            </div>
            <div class="quiz-stat">
              <div class="quiz-stat-value">${this.totalAnswered}</div>
              <div class="quiz-stat-label">Total</div>
            </div>
            <div class="quiz-stat">
              <div class="quiz-stat-value">${percentage}%</div>
              <div class="quiz-stat-label">Accuracy</div>
            </div>
          </div>
        </div>
        <div class="info-section">
          <div class="info-section-content">
            <p>${resultMessage}</p>
          </div>
        </div>
        ${weakSystemsHtml}
        ${this.renderSystemBreakdown()}
        <div class="quiz-actions">
          <button class="anatomy-btn anatomy-btn--primary" onclick="window.quizMode.start()">
            Try Again
          </button>
          <button class="anatomy-btn" onclick="window.anatomyExplorer.setMode('explore')">
            Back to Explore
          </button>
          <button class="anatomy-btn anatomy-btn--sm" onclick="window.quizMode.resetStats()">
            Reset Stats
          </button>
        </div>
      </div>
    `;
    }

    getWeakSystems() {
        const weak = [];
        Object.entries(this.systemStats).forEach(([system, stats]) => {
            if (stats.total >= 2) {
                const accuracy = stats.correct / stats.total;
                if (accuracy < 0.6) {
                    weak.push(system);
                }
            }
        });
        return weak;
    }

    renderSystemBreakdown() {
        const systemsWithData = Object.entries(this.systemStats)
            .filter(([_, stats]) => stats.total > 0)
            .sort((a, b) => {
                const accA = a[1].correct / a[1].total;
                const accB = b[1].correct / b[1].total;
                return accA - accB; // Sort by worst first
            });

        if (systemsWithData.length === 0) {
            return '';
        }

        const bars = systemsWithData.map(([system, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            const systemColor = BODY_SYSTEMS[system]?.color || '#888';
            return `
        <div class="system-bar">
          <span class="system-bar-label">${system}</span>
          <div class="system-bar-track">
            <div class="system-bar-fill" style="width: ${percentage}%; background: ${systemColor};"></div>
          </div>
          <span class="system-bar-value">${percentage}%</span>
        </div>
      `;
        }).join('');

        return `
      <div class="system-breakdown">
        <h3 class="quiz-stats-title">Performance by System</h3>
        ${bars}
      </div>
    `;
    }

    updateStatsDisplay() {
        const breakdown = document.querySelector('.system-breakdown');
        if (breakdown) {
            breakdown.innerHTML = this.renderSystemBreakdown();
        }
    }
}

// Initialize
window.quizMode = new QuizMode();
