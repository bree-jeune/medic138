const VENT_SCENARIOS = [
  {
    id: 1,
    title: 'Post-Intubation RSI - Normal Lungs',
    difficulty: 'Paramedic',
    patient: {
      age: 45,
      weight: 80,
      height: 175,
      indication: 'Altered mental status, GCS 6, airway protection',
      lungCompliance: 'Normal',
      resistance: 'Normal'
    },
    currentSettings: {
      mode: 'None - just intubated',
      tv: 0,
      rr: 0,
      peep: 0,
      fio2: 100
    },
    bloodGas: {
      pH: null,
      pco2: null,
      po2: null
    },
    targetSettings: {
      mode: 'AC or SIMV',
      tv: 480, // 6-8 mL/kg IBW
      rr: 12,
      peep: 5,
      fio2: 40
    },
    teachingPoints: [
      'Start with lung-protective ventilation: 6-8 mL/kg IBW',
      'Initial RR 10-12 for normal lungs',
      'PEEP 5 is standard starting point',
      'Wean FiO2 to keep SpO2 92-96%',
      'IBW (male) = 50 + 2.3(height in inches - 60)'
    ]
  },
  {
    id: 2,
    title: 'ARDS - Hypoxemic Respiratory Failure',
    difficulty: 'Critical Care',
    patient: {
      age: 58,
      weight: 90,
      height: 170,
      indication: 'Severe pneumonia, refractory hypoxemia',
      lungCompliance: 'Very poor (stiff lungs)',
      resistance: 'Normal'
    },
    currentSettings: {
      mode: 'AC',
      tv: 720, // TOO HIGH
      rr: 12,
      peep: 5, // TOO LOW
      fio2: 100
    },
    bloodGas: {
      pH: 7.32,
      pco2: 48,
      po2: 58,
      spo2: 88
    },
    targetSettings: {
      mode: 'AC',
      tv: 360, // LOW tidal volume for ARDS (6 mL/kg IBW)
      rr: 18, // Increase RR to compensate for low TV
      peep: 12, // HIGH PEEP for recruitment
      fio2: 80 // May need high FiO2 initially
    },
    teachingPoints: [
      'ARDS = lung-protective ventilation (6 mL/kg IBW max)',
      'High PEEP (10-15) for alveolar recruitment',
      'Accept permissive hypercapnia (pH > 7.20)',
      'Keep plateau pressure < 30 cmH2O',
      'May need neuromuscular blockade'
    ]
  },
  {
    id: 3,
    title: 'COPD - Permissive Hypercapnia',
    difficulty: 'Critical Care',
    patient: {
      age: 72,
      weight: 70,
      height: 168,
      indication: 'COPD exacerbation, respiratory failure despite BiPAP',
      lungCompliance: 'Normal-decreased',
      resistance: 'Very high (air trapping)'
    },
    currentSettings: {
      mode: 'AC',
      tv: 560,
      rr: 16, // TOO HIGH - will cause air trapping
      peep: 8, // TOO HIGH - intrinsic PEEP already present
      fio2: 100 // TOO HIGH for COPD
    },
    bloodGas: {
      pH: 7.18,
      pco2: 88,
      po2: 110, // Hyperoxic
      spo2: 99
    },
    targetSettings: {
      mode: 'AC or Pressure Control',
      tv: 420, // Lower TV
      rr: 10, // LOW rate, long expiratory time
      peep: 0, // Zero or low PEEP (has auto-PEEP)
      fio2: 40 // Lower FiO2, target SpO2 88-92%
    },
    teachingPoints: [
      'COPD: LOW rate, long expiratory time (I:E 1:3 or 1:4)',
      'Avoid auto-PEEP (air trapping) - use low RR',
      'Minimal PEEP (0-5) to avoid worsening hyperinflation',
      'Permissive hypercapnia OK if pH > 7.20',
      'Target SpO2 88-92%, not 100%'
    ]
  },
  {
    id: 4,
    title: 'Asthma - Status Asthmaticus',
    difficulty: 'Critical Care',
    patient: {
      age: 28,
      weight: 65,
      height: 165,
      indication: 'Severe asthma, impending respiratory arrest',
      lungCompliance: 'Normal',
      resistance: 'Extremely high'
    },
    currentSettings: {
      mode: 'AC',
      tv: 500,
      rr: 20, // TOO HIGH
      peep: 8,
      fio2: 100
    },
    bloodGas: {
      pH: 7.22,
      pco2: 68,
      po2: 88,
      spo2: 92
    },
    targetSettings: {
      mode: 'Pressure Control preferred',
      tv: 390, // 6 mL/kg
      rr: 10, // Very low RR
      peep: 0, // Minimal PEEP
      fio2: 60
    },
    teachingPoints: [
      'Status asthmaticus: like COPD - avoid air trapping',
      'Very low RR (8-10) with long expiratory time',
      'Minimal PEEP to prevent dynamic hyperinflation',
      'Consider ketamine, magnesium, inhaled anesthetics',
      'Accept high CO2 temporarily (permissive hypercapnia)'
    ]
  },
  {
    id: 5,
    title: 'Head Injury - ICP Management',
    difficulty: 'Critical Care',
    patient: {
      age: 35,
      weight: 85,
      height: 180,
      indication: 'Severe TBI, GCS 5, needs airway and ICP control',
      lungCompliance: 'Normal',
      resistance: 'Normal'
    },
    currentSettings: {
      mode: 'AC',
      tv: 680,
      rr: 10, // TOO LOW - need to control CO2
      peep: 10, // TOO HIGH - increases ICP
      fio2: 60
    },
    bloodGas: {
      pH: 7.30,
      pco2: 52, // TOO HIGH for head injury
      po2: 120,
      spo2: 98
    },
    targetSettings: {
      mode: 'AC',
      tv: 510, // 6 mL/kg
      rr: 14, // Target normocarbia initially, then mild hypocapnia if high ICP
      peep: 5, // Minimal PEEP
      fio2: 40
    },
    teachingPoints: [
      'Head injury: target PaCO2 35-40 (normocarbia)',
      'If herniation suspected: brief hyperventilation to PaCO2 30-35',
      'Avoid hyperventilation routinely (decreases cerebral perfusion)',
      'Keep PEEP low (≤5) to minimize ICP elevation',
      'Maintain PaO2 > 80, avoid hypoxia at all costs'
    ]
  }
];

class VentilatorGame {
  constructor() {
    this.currentScenario = null;
    this.userSettings = {};
    this.attempts = 0;
    this.score = 0;
  }

  start() {
    this.selectScenario();
  }

  selectScenario() {
    this.currentScenario = VENT_SCENARIOS[Math.floor(Math.random() * VENT_SCENARIOS.length)];
    this.userSettings = {
      mode: '',
      tv: 0,
      rr: 0,
      peep: 0,
      fio2: 0
    };
    this.attempts = 0;
    this.render();
  }

  render() {
    const container = document.getElementById('vent-game');
    if (!container) return;

    if (!this.currentScenario) {
      this.renderMenu(container);
    } else {
      this.renderVentilator(container);
    }
  }

  renderMenu(container) {
    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <h2 style="color: var(--primary); margin-bottom: 2rem;">Ventilator Management Simulator</h2>
        
        <p style="margin-bottom: 2rem; color: var(--text-muted); line-height: 1.6;">
          Practice setting initial ventilator parameters based on patient pathophysiology. 
          Master lung-protective ventilation strategies.
        </p>

        <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 2rem; text-align: left;">
          <h3 style="margin-bottom: 1rem;">Key Concepts:</h3>
          <ul style="color: var(--text-muted); line-height: 1.8;">
            <li><strong>Tidal Volume (TV):</strong> 6-8 mL/kg ideal body weight (lung-protective)</li>
            <li><strong>Respiratory Rate (RR):</strong> 10-16 typically, adjust based on pathology</li>
            <li><strong>PEEP:</strong> 5 cmH2O standard, higher for ARDS, lower for COPD/asthma</li>
            <li><strong>FiO2:</strong> Start high, wean to maintain SpO2 92-96% (88-92% for COPD)</li>
            <li><strong>IBW:</strong> Male = 50 + 2.3(height in inches - 60), Female = 45.5 + 2.3(height in inches - 60)</li>
          </ul>
        </div>

        <button onclick="window.ventGame.start()" class="btn btn-full" style="padding: 1.5rem; font-size: 1.1rem;">
          Start Practice
        </button>
      </div>
    `;
  }

  renderVentilator(container) {
    const s = this.currentScenario;
    const p = s.patient;
    const ibw = this.calculateIBW(p.height, 'M'); // Simplified

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <button onclick="window.ventGame.currentScenario = null; window.ventGame.render();" class="btn">← Back</button>
          <span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 4px;">
            ${s.difficulty}
          </span>
        </div>

        <h2 style="color: var(--primary); margin-bottom: 1rem;">${s.title}</h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
          <!-- Patient Info -->
          <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border);">
            <h3 style="margin-bottom: 1rem;">Patient Information</h3>
            <p><strong>Age:</strong> ${p.age} years</p>
            <p><strong>Weight:</strong> ${p.weight} kg</p>
            <p><strong>Height:</strong> ${p.height} cm</p>
            <p><strong>IBW:</strong> ${ibw} kg</p>
            <p style="margin-top: 1rem;"><strong>Indication:</strong> ${p.indication}</p>
            <p><strong>Lung Compliance:</strong> ${p.lungCompliance}</p>
            <p><strong>Airway Resistance:</strong> ${p.resistance}</p>
          </div>

          <!-- Current Status -->
          <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border);">
            <h3 style="margin-bottom: 1rem;">Current Status</h3>
            ${s.bloodGas.pH ? `
              <div style="margin-bottom: 1rem;">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">Blood Gas:</h4>
                <p>pH: ${s.bloodGas.pH}</p>
                <p>PaCO2: ${s.bloodGas.pco2} mmHg</p>
                <p>PaO2: ${s.bloodGas.po2} mmHg</p>
                <p>SpO2: ${s.bloodGas.spo2}%</p>
              </div>
            ` : '<p style="color: var(--text-muted);">Post-intubation, no ABG yet</p>'}
            
            ${s.currentSettings.mode !== 'None - just intubated' ? `
              <div>
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">Current Vent Settings:</h4>
                <p>Mode: ${s.currentSettings.mode}</p>
                <p>TV: ${s.currentSettings.tv} mL</p>
                <p>RR: ${s.currentSettings.rr}</p>
                <p>PEEP: ${s.currentSettings.peep} cmH2O</p>
                <p>FiO2: ${s.currentSettings.fio2}%</p>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Ventilator Controls -->
        <div style="background: var(--bg-surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1.5rem;">Set Ventilator Parameters</h3>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Mode:</label>
              <select id="vent-mode" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
                <option value="">Select Mode</option>
                <option value="AC">AC (Assist Control)</option>
                <option value="SIMV">SIMV</option>
                <option value="Pressure Control">Pressure Control</option>
              </select>
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
                Tidal Volume (mL):
                <span style="color: var(--text-muted); font-weight: normal; font-size: 0.9rem;">Target: 6-8 mL/kg IBW (${Math.round(ibw * 6)}-${Math.round(ibw * 8)} mL)</span>
              </label>
              <input type="number" id="vent-tv" placeholder="Enter TV in mL" min="0" max="1000" step="10"
                     style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Respiratory Rate:</label>
              <input type="number" id="vent-rr" placeholder="Enter RR" min="0" max="40" step="1"
                     style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">PEEP (cmH2O):</label>
              <input type="number" id="vent-peep" placeholder="Enter PEEP" min="0" max="20" step="1"
                     style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">FiO2 (%):</label>
              <input type="number" id="vent-fio2" placeholder="Enter FiO2" min="21" max="100" step="5"
                     style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 4px; font-size: 1rem;">
            </div>
          </div>

          <button onclick="window.ventGame.checkSettings()" class="btn btn-full" style="margin-top: 2rem; padding: 1rem; font-size: 1.1rem;">
            Apply Settings & Check
          </button>
        </div>

        <div id="vent-feedback"></div>
      </div>
    `;
  }

  calculateIBW(heightCm, gender) {
    const heightInches = heightCm / 2.54;
    if (gender === 'M') {
      return Math.round(50 + 2.3 * (heightInches - 60));
    } else {
      return Math.round(45.5 + 2.3 * (heightInches - 60));
    }
  }

  checkSettings() {
    this.attempts++;

    const mode = document.getElementById('vent-mode').value;
    const tv = parseInt(document.getElementById('vent-tv').value);
    const rr = parseInt(document.getElementById('vent-rr').value);
    const peep = parseInt(document.getElementById('vent-peep').value);
    const fio2 = parseInt(document.getElementById('vent-fio2').value);

    if (!mode || !tv || !rr || !peep || !fio2) {
      document.getElementById('vent-feedback').innerHTML = `
        <div style="background: rgba(192, 21, 47, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--accent);">
          <p><strong>Please fill in all settings</strong></p>
        </div>
      `;
      return;
    }

    this.userSettings = { mode, tv, rr, peep, fio2 };

    const target = this.currentScenario.targetSettings;
    const p = this.currentScenario.patient;
    const ibw = this.calculateIBW(p.height, 'M');

    // Calculate scoring
    let errors = [];
    let warnings = [];
    let correct = [];

    // Check TV (within 50 mL of target)
    if (Math.abs(tv - target.tv) <= 50) {
      correct.push('Tidal Volume appropriate for lung-protective ventilation');
      this.score++;
    } else if (tv > ibw * 10) {
      errors.push(`Tidal Volume too high (${tv} mL). Risk of volutrauma. Use 6-8 mL/kg IBW.`);
    } else if (tv < ibw * 5) {
      warnings.push(`Tidal Volume quite low (${tv} mL). May cause atelectasis.`);
    } else {
      warnings.push(`Tidal Volume suboptimal. Target: ${target.tv} mL (based on ${ibw} kg IBW)`);
    }

    // Check RR (within 2 of target)
    if (Math.abs(rr - target.rr) <= 2) {
      correct.push('Respiratory Rate appropriate for this pathology');
      this.score++;
    } else if (this.currentScenario.id === 2 && rr < 14) {
      errors.push(`RR too low for ARDS. With low TV, need higher RR to maintain minute ventilation.`);
    } else if ((this.currentScenario.id === 3 || this.currentScenario.id === 4) && rr > 14) {
      errors.push(`RR too high for obstructive disease. Risk of air trapping. Use lower RR with longer expiratory time.`);
    } else {
      warnings.push(`RR suboptimal. Target: ${target.rr} for this condition.`);
    }

    // Check PEEP (within 2 of target)
    if (Math.abs(peep - target.peep) <= 2) {
      correct.push('PEEP appropriate');
      this.score++;
    } else if (peep > target.peep + 3) {
      if (this.currentScenario.id === 3 || this.currentScenario.id === 4) {
        errors.push(`PEEP too high for obstructive disease. Risk of worsening auto-PEEP.`);
      } else if (this.currentScenario.id === 5) {
        errors.push(`PEEP too high for head injury. Can increase ICP.`);
      } else {
        warnings.push(`PEEP higher than needed.`);
      }
    } else if (peep < target.peep - 3) {
      if (this.currentScenario.id === 2) {
        errors.push(`PEEP too low for ARDS. Need higher PEEP for alveolar recruitment.`);
      }
    }

    // Check FiO2 (within 20% of target)
    if (Math.abs(fio2 - target.fio2) <= 20) {
      correct.push('FiO2 reasonable');
      this.score++;
    } else if (fio2 > 80 && this.currentScenario.id !== 2) {
      warnings.push(`FiO2 quite high. Try to wean to avoid oxygen toxicity.`);
    } else if (this.currentScenario.id === 3 && fio2 > 60) {
      warnings.push(`FiO2 higher than needed for COPD. Target SpO2 88-92%, not 100%.`);
    }

    const allCorrect = errors.length === 0 && warnings.length === 0;

    document.getElementById('vent-feedback').innerHTML = `
      <div style="background: ${allCorrect ? 'rgba(33, 128, 141, 0.1)' : 'rgba(192, 21, 47, 0.1)'}; 
                  padding: 2rem; border-radius: 8px; border-left: 4px solid ${allCorrect ? 'var(--primary)' : 'var(--accent)'};">
        <h3 style="margin-bottom: 1rem;">${allCorrect ? '✓ Excellent Settings!' : '⚠️ Settings Need Adjustment'}</h3>
        
        ${correct.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">✓ Correct:</h4>
            <ul style="color: var(--text-muted);">
              ${correct.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${warnings.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">⚠ Warnings:</h4>
            <ul style="color: var(--text-muted);">
              ${warnings.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${errors.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: var(--accent); margin-bottom: 0.5rem;">✗ Errors:</h4>
            <ul style="color: var(--text-muted);">
              ${errors.map(e => `<li>${e}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="background: rgba(33, 128, 141, 0.1); padding: 1rem; border-radius: 4px; margin-top: 1rem;">
          <h4 style="margin-bottom: 0.5rem;">Optimal Settings:</h4>
          <p>Mode: ${target.mode}</p>
          <p>TV: ${target.tv} mL (${Math.round(target.tv / ibw)} mL/kg)</p>
          <p>RR: ${target.rr}</p>
          <p>PEEP: ${target.peep} cmH2O</p>
          <p>FiO2: ${target.fio2}%</p>
        </div>

        <div style="background: var(--bg-surface); padding: 1rem; border-radius: 4px; margin-top: 1rem;">
          <h4 style="margin-bottom: 0.5rem;">💎 Teaching Points:</h4>
          <ul style="color: var(--text-muted); line-height: 1.8;">
            ${this.currentScenario.teachingPoints.map(tp => `<li>${tp}</li>`).join('')}
          </ul>
        </div>

        <button onclick="window.ventGame.selectScenario()" class="btn btn-full" style="margin-top: 1.5rem;">
          Next Scenario
        </button>
      </div>
    `;
  }
}

// Initialize
const ventGame = new VentilatorGame();
window.ventGame = ventGame;

function initVentGame() {
  const container = document.getElementById('vent-game');
  if (container) {
    ventGame.render();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVentGame);
} else {
  initVentGame();
}