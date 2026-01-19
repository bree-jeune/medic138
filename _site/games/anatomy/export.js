/**
 * Export Manager for Anatomy Explorer
 * Handles PDF study guide generation and Anki flashcard export
 */

class ExportManager {
    constructor() {
        this.jspdfLoaded = false;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PDF GENERATION
    // ═══════════════════════════════════════════════════════════════════

    async generatePDF(level = 'basic') {
        // Load jsPDF if not already loaded
        if (!this.jspdfLoaded) {
            await this.loadJsPDF();
        }

        if (typeof window.jspdf === 'undefined') {
            alert('PDF library failed to load. Please try again.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'letter'
        });

        // Colors (using site's cyan)
        const primaryColor = [6, 182, 212];
        const textColor = [229, 231, 235];
        const mutedColor = [156, 163, 175];

        let yPos = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);

        // Title
        doc.setFontSize(24);
        doc.setTextColor(...primaryColor);
        doc.text('Anatomy Study Guide', pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;

        doc.setFontSize(10);
        doc.setTextColor(...mutedColor);
        doc.text('Generated from Medic 138 Anatomy Explorer', pageWidth / 2, yPos, { align: 'center' });
        yPos += 15;

        // Group structures by system, filtered by level
        const bySystem = this.groupBySystem(level);
        const levelName = typeof EMS_LEVELS !== 'undefined' && EMS_LEVELS[level] ? EMS_LEVELS[level].name : level;

        // Add level subtitle
        doc.setFontSize(10);
        doc.setTextColor(...mutedColor);
        doc.text(`Level: ${levelName}`, pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;

        Object.entries(bySystem).forEach(([system, structures]) => {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // System header
            doc.setFontSize(14);
            doc.setTextColor(...primaryColor);
            doc.text(system, margin, yPos);
            yPos += 2;

            // Underline
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, margin + 50, yPos);
            yPos += 8;

            structures.forEach(({ id, data }) => {
                // Check if we need a new page
                if (yPos > 265) {
                    doc.addPage();
                    yPos = 20;
                }

                // Structure name
                doc.setFontSize(11);
                doc.setTextColor(...textColor);
                doc.setFont(undefined, 'bold');
                doc.text(data.name, margin, yPos);

                // Latin name
                doc.setFont(undefined, 'italic');
                doc.setTextColor(...mutedColor);
                doc.setFontSize(9);
                doc.text(`(${data.latin})`, margin + doc.getTextWidth(data.name + ' ') + 2, yPos);
                yPos += 5;

                // Description
                doc.setFont(undefined, 'normal');
                doc.setTextColor(...textColor);
                doc.setFontSize(9);
                const descLines = doc.splitTextToSize(data.description, contentWidth);
                descLines.forEach(line => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, margin, yPos);
                    yPos += 4;
                });
                yPos += 2;

                // Clinical note
                doc.setFontSize(8);
                doc.setTextColor(100, 70, 70);
                const clinicalLines = doc.splitTextToSize(`Clinical: ${data.clinical}`, contentWidth);
                clinicalLines.slice(0, 3).forEach(line => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, margin, yPos);
                    yPos += 3.5;
                });

                yPos += 5;
            });

            yPos += 5;
        });

        // Footer on last page
        doc.setFontSize(8);
        doc.setTextColor(...mutedColor);
        doc.text(
            `Generated ${new Date().toLocaleDateString()} | Medic 138 Anatomy Explorer`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );

        // Save
        doc.save('anatomy-study-guide.pdf');
    }

    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf) {
                this.jspdfLoaded = true;
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                this.jspdfLoaded = true;
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    groupBySystem(level = 'basic') {
        const grouped = {};
        const levelOrder = ['basic', 'aemt', 'paramedic', 'advanced'];
        const currentLevelIndex = levelOrder.indexOf(level);

        Object.entries(ANATOMY_DATA).forEach(([id, data]) => {
            // Filter by level
            const structureLevelIndex = levelOrder.indexOf(data.level || 'basic');
            if (structureLevelIndex > currentLevelIndex) return;

            const system = data.system || 'Other';
            if (!grouped[system]) {
                grouped[system] = [];
            }
            grouped[system].push({ id, data });
        });

        // Sort systems alphabetically
        const sorted = {};
        Object.keys(grouped).sort().forEach(key => {
            // Sort structures within each system
            grouped[key].sort((a, b) => a.data.name.localeCompare(b.data.name));
            sorted[key] = grouped[key];
        });

        return sorted;
    }

    // ═══════════════════════════════════════════════════════════════════
    // ANKI EXPORT
    // ═══════════════════════════════════════════════════════════════════

    generateAnkiDeck(level = 'basic') {
        const cards = [];
        const levelOrder = ['basic', 'aemt', 'paramedic', 'advanced'];
        const currentLevelIndex = levelOrder.indexOf(level);

        // Header for Anki import
        cards.push('#separator:tab');
        cards.push('#html:true');
        cards.push('#tags column:3');

        Object.entries(ANATOMY_DATA).forEach(([id, data]) => {
            // Filter by level
            const structureLevelIndex = levelOrder.indexOf(data.level || 'basic');
            if (structureLevelIndex > currentLevelIndex) return;

            const tags = `anatomy ${data.system.toLowerCase().replace(/\s+/g, '_')} ${data.level || 'basic'}`;

            // Card 1: Name → Description
            const front1 = this.escapeAnki(`<b>${data.name}</b><br><i>${data.latin}</i>`);
            const back1 = this.escapeAnki(`${data.description}<br><br><b>Clinical:</b> ${data.clinical}`);
            cards.push(`${front1}\t${back1}\t${tags}`);

            // Card 2: Description → Name (reversed)
            const front2 = this.escapeAnki(`<i>Identify this structure:</i><br><br>${data.description.substring(0, 150)}...`);
            const back2 = this.escapeAnki(`<b>${data.name}</b> (${data.latin})<br><br>System: ${data.system}`);
            cards.push(`${front2}\t${back2}\t${tags}`);

            // Card 3: Clinical correlation
            if (data.conditions && data.conditions.length > 0) {
                const front3 = this.escapeAnki(`<b>${data.name}</b><br><br>What conditions are associated with this structure?`);
                const back3 = this.escapeAnki(`<ul>${data.conditions.map(c => `<li>${c}</li>`).join('')}</ul><br><b>Clinical context:</b> ${data.clinical}`);
                cards.push(`${front3}\t${back3}\t${tags}`);
            }
        });

        // Create and download file
        const content = cards.join('\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `anatomy-flashcards-${level}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showExportSuccess('Anki flashcards downloaded! Import into Anki using File → Import.');
    }

    escapeAnki(text) {
        // Escape special characters for Anki TSV format
        return text
            .replace(/\t/g, ' ')
            .replace(/\n/g, '<br>')
            .replace(/"/g, '""');
    }

    showExportSuccess(message) {
        // Create a temporary notification using site colors
        const notification = document.createElement('div');
        notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--primary, #06b6d4);
      color: var(--text-main, #f1f5f9);
      padding: 16px 24px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      font-size: 14px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
        notification.textContent = message;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize
window.exportManager = new ExportManager();
