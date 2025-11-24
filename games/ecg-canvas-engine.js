**
 * MEDIC 138 - ECG Canvas Drawing Engine
 * Generates realistic ECG waveforms for 12-lead interpretation training
 * 
 * Features:
 * - Accurate P-QRS-T complex morphology
 * - Lead-specific polarity (positive/negative deflections)
 * - ST elevation for STEMI simulation
 * - Variable heart rates
 * - Grid background (standard ECG paper)
 * - Support for bundle branch blocks and VT patterns
 */

/**
 * Main function to draw an ECG waveform on a canvas
 * @param {string} canvasId - ID of the canvas element
 * @param {string} lead - Lead name (I, II, III, aVR, aVL, aVF, V1-V6)
 * @param {boolean} isStemi - Whether to show ST elevation
 * @param {string} qrsType - Type of QRS complex ('Normal', 'LBBB', 'VT')
 * @param {number} rate - Heart rate in bpm (default 70)
 */
function drawECGWave(canvasId, lead, isStemi = false, qrsType = 'Normal', rate = 70) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn(`Canvas ${canvasId} not found`);
    return;
  }

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Draw ECG grid (standard 1mm squares)
  drawECGGrid(ctx, width, height);

  // Calculate waveform parameters
  const baseline = height / 2;
  const pixelsPerSecond = 50; // Standard ECG paper: 25mm/sec, 2px per mm
  const beatInterval = (60 / rate) * pixelsPerSecond; // Pixels between beats
  const numBeats = Math.ceil(width / beatInterval) + 1;

  // Get lead-specific amplitude modifiers
  const leadConfig = getLeadConfiguration(lead);

  // Draw each heartbeat
  for (let i = 0; i < numBeats; i++) {
    const xOffset = i * beatInterval;
    drawHeartbeat(ctx, xOffset, baseline, leadConfig, isStemi, qrsType);
  }
}

/**
 * Draw ECG grid background
 */
function drawECGGrid(ctx, width, height) {
  const smallSquare = 2; // 1mm = 2 pixels
  const largeSquare = smallSquare * 5; // 5mm = 10 pixels

  // Draw small squares (1mm)
  ctx.strokeStyle = 'rgba(255, 100, 100, 0.15)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < width; x += smallSquare) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += smallSquare) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw large squares (5mm)
  ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += largeSquare) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += largeSquare) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

/**
 * Get lead-specific configuration
 * Determines polarity and amplitude for each lead
 */
function getLeadConfiguration(lead) {
  const configs = {
    // Limb Leads
    'I': { pAmplitude: 0.3, qrsAmplitude: 1.0, tAmplitude: 0.4, qrsPolarity: 1 },
    'II': { pAmplitude: 0.4, qrsAmplitude: 1.2, tAmplitude: 0.5, qrsPolarity: 1 },
    'III': { pAmplitude: 0.2, qrsAmplitude: 0.8, tAmplitude: 0.3, qrsPolarity: 1 },
    'aVR': { pAmplitude: -0.2, qrsAmplitude: 0.6, tAmplitude: -0.3, qrsPolarity: -1 },
    'aVL': { pAmplitude: 0.3, qrsAmplitude: 0.7, tAmplitude: 0.4, qrsPolarity: 1 },
    'aVF': { pAmplitude: 0.4, qrsAmplitude: 1.0, tAmplitude: 0.5, qrsPolarity: 1 },
    
    // Precordial Leads
    'V1': { pAmplitude: 0.2, qrsAmplitude: 0.5, tAmplitude: 0.2, qrsPolarity: -1, hasRSPattern: true },
    'V2': { pAmplitude: 0.3, qrsAmplitude: 0.8, tAmplitude: 0.3, qrsPolarity: -1, hasRSPattern: true },
    'V3': { pAmplitude: 0.3, qrsAmplitude: 1.0, tAmplitude: 0.4, qrsPolarity: 0, transition: true },
    'V4': { pAmplitude: 0.4, qrsAmplitude: 1.2, tAmplitude: 0.5, qrsPolarity: 1 },
    'V5': { pAmplitude: 0.4, qrsAmplitude: 1.3, tAmplitude: 0.5, qrsPolarity: 1 },
    'V6': { pAmplitude: 0.4, qrsAmplitude: 1.2, tAmplitude: 0.5, qrsPolarity: 1 }
  };

  return configs[lead] || configs['II']; // Default to Lead II if not found
}

/**
 * Draw a single heartbeat (P-QRS-T complex)
 */
function drawHeartbeat(ctx, xOffset, baseline, config, isStemi, qrsType) {
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const scale = 10; // Vertical scale (pixels per mV)

  // Define timing (in pixels at standard speed)
  const prInterval = 35; // ~0.16 sec
  const qrsWidth = qrsType === 'LBBB' || qrsType === 'VT' ? 20 : 8; // Wide vs narrow
  const stSegment = 15;
  const tWaveWidth = 30;

  let currentX = xOffset;

  ctx.beginPath();

  // Baseline before P wave
  ctx.moveTo(currentX, baseline);
  currentX += 10;
  ctx.lineTo(currentX, baseline);

  // P Wave (atrial depolarization)
  drawPWave(ctx, currentX, baseline, config.pAmplitude * scale, config.qrsPolarity);
  currentX += 20;

  // PR Segment (isoelectric)
  ctx.lineTo(currentX, baseline);
  currentX += prInterval;

  // QRS Complex (ventricular depolarization)
  if (qrsType === 'VT') {
    drawVTQRS(ctx, currentX, baseline, config.qrsAmplitude * scale);
    currentX += 25;
  } else if (qrsType === 'LBBB') {
    drawLBBBQRS(ctx, currentX, baseline, config.qrsAmplitude * scale, config.qrsPolarity);
    currentX += 20;
  } else if (qrsType === 'RBBB') {
    drawRBBBQRS(ctx, currentX, baseline, config.qrsAmplitude * scale, config.qrsPolarity);
    currentX += 20;
  } else if (qrsType === 'Hyperkalemia') {
    drawHyperkalemiaQRS(ctx, currentX, baseline, config.qrsAmplitude * scale, config.qrsPolarity);
    currentX += 12;
  } else if (config.hasRSPattern) {
    drawRSPattern(ctx, currentX, baseline, config.qrsAmplitude * scale);
    currentX += qrsWidth;
  } else {
    drawNormalQRS(ctx, currentX, baseline, config.qrsAmplitude * scale, config.qrsPolarity);
    currentX += qrsWidth;
  }

  // ST Segment
  const stElevation = isStemi ? 3 * scale : 0; // 3mm elevation for STEMI
  ctx.lineTo(currentX, baseline - stElevation * config.qrsPolarity);
  currentX += stSegment;

  // T Wave (ventricular repolarization)
  if (qrsType === 'Hyperkalemia') {
    drawPeakedTWave(ctx, currentX, baseline - stElevation * config.qrsPolarity, config.tAmplitude * scale, config.qrsPolarity);
  } else {
    drawTWave(ctx, currentX, baseline - stElevation * config.qrsPolarity, config.tAmplitude * scale, config.qrsPolarity);
  }
  currentX += tWaveWidth;

  // Return to baseline
  ctx.lineTo(currentX, baseline);

  ctx.stroke();
}

/**
 * Draw P Wave
 */
function drawPWave(ctx, x, baseline, amplitude, polarity) {
  const width = 20;
  ctx.bezierCurveTo(
    x + width * 0.3, baseline - amplitude * polarity * 0.3,
    x + width * 0.5, baseline - amplitude * polarity,
    x + width, baseline
  );
}

/**
 * Draw Normal QRS Complex
 */
function drawNormalQRS(ctx, x, baseline, amplitude, polarity) {
  // Q wave (small negative deflection)
  ctx.lineTo(x + 2, baseline + 2 * polarity);
  
  // R wave (tall positive deflection)
  ctx.lineTo(x + 4, baseline - amplitude * polarity);
  
  // S wave (negative deflection after R)
  ctx.lineTo(x + 8, baseline + 3 * polarity);
  ctx.lineTo(x + 10, baseline);
}

/**
 * Draw RS Pattern (common in V1-V2)
 */
function drawRSPattern(ctx, x, baseline, amplitude) {
  // Small R wave
  ctx.lineTo(x + 2, baseline - amplitude * 0.3);
  ctx.lineTo(x + 3, baseline);
  
  // Deep S wave
  ctx.lineTo(x + 8, baseline + amplitude * 1.2);
  ctx.lineTo(x + 10, baseline);
}

/**
 * Draw Left Bundle Branch Block QRS
 */
function drawLBBBQRS(ctx, x, baseline, amplitude, polarity) {
  // Wide, notched QRS
  ctx.lineTo(x + 3, baseline + 2 * polarity);
  ctx.lineTo(x + 8, baseline - amplitude * polarity * 0.7);
  ctx.lineTo(x + 10, baseline - amplitude * polarity * 0.5);
  ctx.lineTo(x + 15, baseline - amplitude * polarity);
  ctx.lineTo(x + 20, baseline);
}

/**
 * Draw Right Bundle Branch Block QRS
 */
function drawRBBBQRS(ctx, x, baseline, amplitude, polarity) {
  // Wide QRS with RSR' pattern (rabbit ears)
  ctx.lineTo(x + 2, baseline - amplitude * polarity * 0.4); // R wave
  ctx.lineTo(x + 4, baseline + 2 * polarity); // S wave
  ctx.lineTo(x + 10, baseline - amplitude * polarity * 0.6); // R' wave (notch)
  ctx.lineTo(x + 15, baseline - amplitude * polarity); // R' peak
  ctx.lineTo(x + 20, baseline);
}

/**
 * Draw Hyperkalemia Pattern
 */
function drawHyperkalemiaQRS(ctx, x, baseline, amplitude, polarity) {
  // Peaked T waves and wide QRS
  ctx.lineTo(x + 2, baseline + 2 * polarity);
  ctx.lineTo(x + 6, baseline - amplitude * polarity);
  ctx.lineTo(x + 10, baseline + 3 * polarity);
  ctx.lineTo(x + 12, baseline);
}

/**
 * Draw Peaked T Wave (Hyperkalemia)
 */
function drawPeakedTWave(ctx, x, yStart, amplitude, polarity) {
  const width = 20;
  // Sharp, tent-like T wave
  ctx.lineTo(x + width * 0.3, yStart - amplitude * polarity * 0.6);
  ctx.lineTo(x + width * 0.5, yStart - amplitude * polarity * 1.5); // Peaked
  ctx.lineTo(x + width * 0.7, yStart - amplitude * polarity * 0.6);
  ctx.lineTo(x + width, yStart);
}

/**
 * Draw Ventricular Tachycardia QRS
 */
function drawVTQRS(ctx, x, baseline, amplitude) {
  // Wide, bizarre QRS
  ctx.lineTo(x + 2, baseline + 5);
  ctx.lineTo(x + 8, baseline - amplitude * 1.2);
  ctx.lineTo(x + 12, baseline - amplitude * 0.8);
  ctx.lineTo(x + 18, baseline + 8);
  ctx.lineTo(x + 25, baseline);
}

/**
 * Draw T Wave
 */
function drawTWave(ctx, x, yStart, amplitude, polarity) {
  const width = 30;
  ctx.bezierCurveTo(
    x + width * 0.2, yStart - amplitude * polarity * 0.5,
    x + width * 0.5, yStart - amplitude * polarity,
    x + width, yStart
  );
}

/**
 * Helper function to be called after DOM is ready
 * Draws all ECG canvases for the current question
 */
function initializeECGCanvases() {
  if (!window.currentGame || window.currentGame.gameId !== 'ecg_interpretation') {
    return;
  }

  const scenario = window.currentGame.currentScenarios[window.currentGame.currentQuestionIndex];
  
  // Wait for canvases to be in DOM
  setTimeout(() => {
    scenario.leads.forEach(lead => {
      const canvasId = `ecg-canvas-${lead}`;
      const isStemi = scenario.type === 'STEMI';
      drawECGWave(canvasId, lead, isStemi, 'Normal', scenario.rate || 75);
    });
  }, 50);
}

/**
 * Export functions to global scope for use in games.js
 */
if (typeof window !== 'undefined') {
  window.drawECGWave = drawECGWave;
  window.initializeECGCanvases = initializeECGCanvases;
}

// Also expose drawECGForCurrentQuestion as an alias (used in games.js)
window.drawECGForCurrentQuestion = initializeECGCanvases;