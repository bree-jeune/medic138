/**
 * Anatomy Explorer - Core Functionality
 * Handles SVG initialization, interactions, and information display
 */

class AnatomyExplorer {
    constructor() {
        this.currentView = 'body';
        this.currentLevel = 'basic';
        this.selectedElement = null;
        this.mode = 'explore'; // 'explore' or 'quiz'
        this.audioContext = null;

        this.init();
    }

    init() {
        this.initAudio();
        this.initSVGs();
        this.initViewTabs();
        this.initInfoTabs();
        this.initModeToggle();
        this.initExport();
        this.showEmptyState();
    }

    // ═══════════════════════════════════════════════════════════════════
    // AUDIO
    // ═══════════════════════════════════════════════════════════════════

    initAudio() {
        // Defer AudioContext creation until first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    playSound(type = 'click') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Subtle, tactile sounds
        switch (type) {
            case 'hover':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.03;
                oscillator.type = 'sine';
                break;
            case 'click':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.06;
                oscillator.type = 'triangle';
                break;
            case 'select':
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.08;
                oscillator.type = 'sine';
                // Add a quick pitch rise
                oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 0.05);
                break;
            case 'correct':
                oscillator.frequency.value = 523;
                gainNode.gain.value = 0.08;
                oscillator.type = 'sine';
                oscillator.frequency.exponentialRampToValueAtTime(659, this.audioContext.currentTime + 0.1);
                break;
            case 'incorrect':
                oscillator.frequency.value = 330;
                gainNode.gain.value = 0.08;
                oscillator.type = 'triangle';
                oscillator.frequency.exponentialRampToValueAtTime(220, this.audioContext.currentTime + 0.15);
                break;
        }

        // Quick fade out
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.12);
    }

    // ═══════════════════════════════════════════════════════════════════
    // SVG INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    initSVGs() {
        const containers = document.querySelectorAll('.svg-container');

        containers.forEach(container => {
            const svg = container.querySelector('svg');
            if (svg) {
                this.initializeSVG(svg);
            }
        });
    }

    initializeSVG(svgElement) {
        // Find all UBERON-labeled elements
        const uberonElements = svgElement.querySelectorAll('[id^="UBERON"]');

        uberonElements.forEach(el => {
            // Remove visibility:hidden attribute
            el.removeAttribute('visibility');
            el.style.visibility = 'visible';

            // Apply default styling to make elements visible
            const paths = el.querySelectorAll('path, polygon, ellipse, circle, rect');
            paths.forEach(path => {
                // Override the fill:none;stroke:none defaults
                if (!path.style.fill || path.style.fill === 'none') {
                    path.style.fill = 'var(--anatomy-default-fill)';
                }
                if (!path.style.stroke || path.style.stroke === 'none') {
                    path.style.stroke = 'var(--anatomy-default-stroke)';
                    path.style.strokeWidth = '0.5';
                }
            });

            // If it's a direct path element
            if (el.tagName.toLowerCase() === 'path') {
                if (!el.style.fill || el.style.fill === 'none') {
                    el.style.fill = 'var(--anatomy-default-fill)';
                }
                if (!el.style.stroke || el.style.stroke === 'none') {
                    el.style.stroke = 'var(--anatomy-default-stroke)';
                    el.style.strokeWidth = '0.5';
                }
            }

            // Add event listeners
            el.addEventListener('mouseenter', (e) => this.handleHover(e, el));
            el.addEventListener('mouseleave', (e) => this.handleHoverEnd(e, el));
            el.addEventListener('click', (e) => this.handleClick(e, el));
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // EVENT HANDLERS
    // ═══════════════════════════════════════════════════════════════════

    handleHover(e, element) {
        if (this.mode === 'quiz' && window.quizMode && window.quizMode.isWaitingForAnswer) {
            return; // Don't show hover info during quiz
        }
        this.playSound('hover');
    }

    handleHoverEnd(e, element) {
        // Could add tooltip hiding logic here
    }

    handleClick(e, element) {
        e.stopPropagation();
        const uberonId = element.id;

        // In quiz mode, delegate to quiz handler
        if (this.mode === 'quiz' && window.quizMode) {
            window.quizMode.handleSelection(uberonId);
            return;
        }

        // In explore mode, show info
        this.playSound('select');
        this.selectElement(element, uberonId);
    }

    selectElement(element, uberonId) {
        // Deselect previous
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
        }

        // Select new
        element.classList.add('selected');
        this.selectedElement = element;

        // Zoom to the selected element
        this.zoomToElement(element);

        // Update info panel
        this.showInfo(uberonId);
    }

    zoomToElement(element) {
        const svg = element.closest('svg');
        if (!svg) return;

        const container = svg.parentElement;
        if (!container) return;

        // Get element bounds
        const bbox = element.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;

        // Get SVG viewBox
        const viewBox = svg.viewBox.baseVal;
        const svgWidth = viewBox.width || svg.clientWidth;
        const svgHeight = viewBox.height || svg.clientHeight;

        // Calculate zoom (limit to 2x max)
        const scale = Math.min(2, Math.min(
            svgWidth / (bbox.width * 3),
            svgHeight / (bbox.height * 3)
        ));

        // Apply transform with smooth transition
        svg.style.transition = 'transform 0.4s ease-out';
        svg.style.transformOrigin = `${(centerX / svgWidth) * 100}% ${(centerY / svgHeight) * 100}%`;
        svg.style.transform = `scale(${scale})`;
    }

    resetZoom() {
        const containers = document.querySelectorAll('.svg-container');
        containers.forEach(container => {
            const svg = container.querySelector('svg');
            if (svg) {
                svg.style.transition = 'transform 0.3s ease-out';
                svg.style.transform = 'scale(1)';
            }
        });
    }

    deselectAll() {
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
            this.selectedElement = null;
        }
        this.resetZoom();
        this.showEmptyState();
    }

    // ═══════════════════════════════════════════════════════════════════
    // VIEW TABS
    // ═══════════════════════════════════════════════════════════════════

    initViewTabs() {
        const tabs = document.querySelectorAll('.view-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const view = tab.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(view) {
        this.currentView = view;

        // Update tab states
        document.querySelectorAll('.view-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });

        // Show/hide containers
        document.querySelectorAll('.svg-container').forEach(container => {
            container.classList.toggle('hidden', container.dataset.view !== view);
        });

        // Deselect current element
        this.deselectAll();

        this.playSound('click');
    }

    // ═══════════════════════════════════════════════════════════════════
    // INFO TABS
    // ═══════════════════════════════════════════════════════════════════

    initInfoTabs() {
        const tabs = document.querySelectorAll('.info-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchInfoTab(tabId);
            });
        });
    }

    switchInfoTab(tabId) {
        // Update tab states
        document.querySelectorAll('.info-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        // Show/hide content
        document.querySelectorAll('.info-tab-content').forEach(content => {
            content.classList.toggle('active', content.dataset.tab === tabId);
        });

        this.playSound('click');
    }

    // ═══════════════════════════════════════════════════════════════════
    // INFO DISPLAY
    // ═══════════════════════════════════════════════════════════════════

    showEmptyState() {
        const header = document.querySelector('.info-header');
        const content = document.querySelector('.info-content');

        if (header) {
            header.innerHTML = `
        <div class="info-empty">
          <div class="info-empty-icon">+</div>
          <p>Select an anatomical structure to explore</p>
        </div>
      `;
        }

        if (content) {
            content.innerHTML = '';
        }
    }

    showInfo(uberonId) {
        const data = ANATOMY_DATA[uberonId];

        if (!data) {
            this.showUnknownElement(uberonId);
            return;
        }

        const system = BODY_SYSTEMS[data.system] || { color: '#888', abbrev: '??' };
        const levelInfo = typeof EMS_LEVELS !== 'undefined' ? EMS_LEVELS[data.level] : null;
        const levelBadge = levelInfo ? `<span class="info-level-tag ${data.level}">${levelInfo.abbrev}</span>` : '';

        // Update header
        const header = document.querySelector('.info-header');
        if (header) {
            header.innerHTML = `
        <div class="info-tabs">
          <button class="info-tab active" data-tab="overview">Overview</button>
          <button class="info-tab" data-tab="clinical">Clinical</button>
          <button class="info-tab" data-tab="systems">Systems</button>
        </div>
        <h2 class="info-title">${data.name}</h2>
        <p class="info-latin">${data.latin}</p>
        <span class="info-system-tag" style="border-color: ${system.color}; color: ${system.color};">
          ${system.abbrev} - ${data.system}
        </span>
        ${levelBadge}
      `;

            // Re-init info tabs
            this.initInfoTabs();
        }

        // Update content
        const content = document.querySelector('.info-content');
        if (content) {
            content.innerHTML = `
        <!-- Overview Tab -->
        <div class="info-tab-content active" data-tab="overview">
          <div class="info-section">
            <h3 class="info-section-title">Description</h3>
            <div class="info-section-content">
              <p>${data.description}</p>
            </div>
          </div>
          <div class="info-section">
            <h3 class="info-section-title">Ontology ID</h3>
            <span class="uberon-id">${uberonId.replace('_', ':')}</span>
          </div>
        </div>
        
        <!-- Clinical Tab -->
        <div class="info-tab-content" data-tab="clinical">
          <div class="info-section">
            <h3 class="info-section-title">Clinical Relevance</h3>
            <div class="info-section-content">
              <p>${data.clinical}</p>
            </div>
          </div>
          <div class="info-section">
            <h3 class="info-section-title">Associated Conditions</h3>
            <ul class="conditions-list">
              ${data.conditions.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <!-- Systems Tab -->
        <div class="info-tab-content" data-tab="systems">
          <div class="info-section">
            <h3 class="info-section-title">Body System</h3>
            <div class="info-section-content">
              <p><strong>${data.system}</strong></p>
              <p>${system.description || ''}</p>
            </div>
          </div>
          <div class="info-section">
            <h3 class="info-section-title">Related Structures</h3>
            <div class="info-section-content">
              <p>${this.getRelatedStructures(data.system, uberonId)}</p>
            </div>
          </div>
        </div>
      `;
        }
    }

    showUnknownElement(uberonId) {
        const header = document.querySelector('.info-header');
        const content = document.querySelector('.info-content');

        if (header) {
            header.innerHTML = `
        <h2 class="info-title">Unknown Structure</h2>
        <span class="uberon-id">${uberonId.replace('_', ':')}</span>
      `;
        }

        if (content) {
            content.innerHTML = `
        <div class="info-section">
          <div class="info-section-content">
            <p>This anatomical structure is present in the diagram but detailed information is not yet available in our database.</p>
          </div>
        </div>
      `;
        }
    }

    getRelatedStructures(system, currentId) {
        const related = Object.entries(ANATOMY_DATA)
            .filter(([id, data]) => data.system === system && id !== currentId)
            .slice(0, 5)
            .map(([id, data]) => data.name);

        if (related.length === 0) {
            return 'No related structures in database.';
        }

        return related.join(', ');
    }

    // ═══════════════════════════════════════════════════════════════════
    // MODE TOGGLE
    // ═══════════════════════════════════════════════════════════════════

    initModeToggle() {
        const toggleBtns = document.querySelectorAll('.mode-toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode);
            });
        });
    }

    setMode(mode) {
        this.mode = mode;

        // Update button states
        document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Show/hide appropriate containers
        const exploreContainer = document.querySelector('.explore-container');
        const quizContainer = document.querySelector('.quiz-container');

        if (mode === 'explore') {
            if (exploreContainer) exploreContainer.style.display = 'block';
            if (quizContainer) quizContainer.classList.remove('active');
            this.deselectAll();
        } else if (mode === 'quiz') {
            if (exploreContainer) exploreContainer.style.display = 'none';
            if (quizContainer) quizContainer.classList.add('active');
            if (window.quizMode) {
                window.quizMode.start();
            }
        }

        this.playSound('click');
    }

    // ═══════════════════════════════════════════════════════════════════
    // LEVEL FILTERING
    // ═══════════════════════════════════════════════════════════════════

    setLevel(level) {
        this.currentLevel = level;

        // Update quiz mode if active
        if (window.quizMode) {
            window.quizMode.currentLevel = level;
        }

        // Deselect current element
        this.deselectAll();

        this.playSound('click');
    }

    // Check if a structure is visible at current level
    isVisibleAtLevel(uberonId) {
        const data = ANATOMY_DATA[uberonId];
        if (!data || !data.level) return true;

        const levelOrder = ['basic', 'aemt', 'paramedic', 'advanced'];
        const currentLevelIndex = levelOrder.indexOf(this.currentLevel);
        const structureLevelIndex = levelOrder.indexOf(data.level);

        return structureLevelIndex <= currentLevelIndex;
    }

    // ═══════════════════════════════════════════════════════════════════
    // EXPORT
    // ═══════════════════════════════════════════════════════════════════

    initExport() {
        const pdfBtn = document.getElementById('export-pdf');
        const ankiBtn = document.getElementById('export-anki');

        if (pdfBtn) {
            pdfBtn.addEventListener('click', () => this.exportPDF());
        }

        if (ankiBtn) {
            ankiBtn.addEventListener('click', () => this.exportAnki());
        }
    }

    exportPDF() {
        if (window.exportManager) {
            window.exportManager.generatePDF(this.currentLevel);
        }
    }

    exportAnki() {
        if (window.exportManager) {
            window.exportManager.generateAnkiDeck(this.currentLevel);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.anatomyExplorer = new AnatomyExplorer();
});
