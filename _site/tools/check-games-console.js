const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const outDir = path.resolve(__dirname, '..', 'logs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'games_console.log');
  const lines = [];

  function log(...args) {
    const line = `[${new Date().toISOString()}] ${args.join(' ')}\n`;
    process.stdout.write(line);
    lines.push(line);
  }

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(15000);

    page.on('console', msg => {
      try {
        const text = msg.args().map(a => a._remoteObject && a._remoteObject.value !== undefined ? a._remoteObject.value : a.toString()).join(' ');
        log('CONSOLE', msg.type().toUpperCase(), text);
      } catch (e) { log('CONSOLE', msg.type().toUpperCase(), msg.text()); }
    });

    page.on('pageerror', err => log('PAGEERROR', err && err.stack ? err.stack : String(err)));
    page.on('error', err => log('ERROR', String(err)));
    page.on('response', resp => {
      if (resp.status() >= 400) log('HTTP_ERROR', resp.status(), resp.url());
    });

    const base = 'http://127.0.0.1:4000';
    const urls = [base + '/games/'];

    for (const url of urls) {
      log('VISIT', url);
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(500);

      // Find start buttons that call startGame(...)
      const startHandles = await page.$$('[onclick]');
      log('FOUND_ONCLICK_COUNT', startHandles.length);

      // Try to filter ones that include startGame or window.*Game.start
      const candidates = await page.$$eval('[onclick]', els =>
        els.map(e => ({ outer: e.outerHTML, onclick: e.getAttribute('onclick') })).filter(x => x.onclick && (x.onclick.includes('startGame') || x.onclick.includes("window.") || x.onclick.includes('start(')))
      );
      log('CANDIDATE_BUTTONS', candidates.length);

      // Click up to 6 candidate buttons sequentially to exercise scripts
      const max = Math.min(6, candidates.length);
      for (let i = 0; i < max; i++) {
        try {
          // Find the element again by onclick snippet (best-effort)
          const snippet = candidates[i].onclick.replace(/'/g, "\\'").slice(0, 80);
          log('CLICK_ATTEMPT', i + 1, snippet);
          await page.evaluate((idx) => {
            const els = Array.from(document.querySelectorAll('[onclick]'));
            const filtered = els.filter(e => e.getAttribute('onclick') && (e.getAttribute('onclick').includes('startGame') || e.getAttribute('onclick').includes('start(') || e.getAttribute('onclick').includes('window.')));
            if (filtered[idx]) filtered[idx].click();
          }, i);
          await page.waitForTimeout(1000);
        } catch (e) {
          log('CLICK_ERROR', String(e));
        }
      }

      // Give some time for any lingering console messages
      await page.waitForTimeout(1000);
      // capture final state screenshot for quick inspection
      const ss = path.join(outDir, 'games_page_snapshot.png');
      await page.screenshot({ path: ss, fullPage: false });
      log('SNAPSHOT', ss);
    }

    await browser.close();
  } catch (err) {
    if (browser) await browser.close();
    log('SCRIPT_ERROR', err && err.stack ? err.stack : String(err));
  } finally {
    fs.writeFileSync(outFile, lines.join(''), 'utf8');
    log('DONE', 'wrote', outFile);
  }
})();
