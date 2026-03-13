import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '..');
const srcMale = path.join(basePath, 'node_modules/@ebi-gene-expression-group/anatomogram/lib/svg/homo_sapiens.male.svg');
const srcBrain = path.join(basePath, 'node_modules/@ebi-gene-expression-group/anatomogram/lib/svg/homo_sapiens.brain.svg');

const outDir = path.join(basePath, 'public/anatomy');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function processSvg(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`File not found: ${src}`);
    return;
  }
  let content = fs.readFileSync(src, 'utf-8');
  
  // Clean restrictive inline styles
  content = content.replace(/visibility\s*[:=]\s*["']?hidden["']?/ig, 'visibility="visible"');
  content = content.replace(/display\s*[:=]\s*["']?none["']?/ig, 'display="inline"');
  
  // Strip hardcoded fills to allow CSS control (except maybe for the outline)
  // Actually, we can just inject a global style
  const styleInjection = `
  <style>
    g[id^="UBERON_"] path, g[id^="UBERON_"] polygon, g[id^="UBERON_"] ellipse {
      fill: currentColor;
      transition: fill 0.2s ease, filter 0.2s ease;
      cursor: pointer;
    }
    g[id^="UBERON_"]:hover path, g[id^="UBERON_"]:hover polygon, g[id^="UBERON_"]:hover ellipse {
      filter: brightness(1.2);
    }
  </style>
  `;
  content = content.replace(/<defs[^>]*>/, (match) => match + styleInjection);

  fs.writeFileSync(dest, content);
  console.log(`Processed ${src} -> ${dest}`);
}

processSvg(srcMale, path.join(outDir, 'homo_sapiens.male.svg'));
processSvg(srcBrain, path.join(outDir, 'homo_sapiens.brain.svg'));
