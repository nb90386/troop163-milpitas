// Screenshot QA: node scripts/qa/shots.mjs <baseUrl> <outDir> [paths=/,/gallery] [viewports=1440x900,390x844] [--full]
import fs from 'node:fs';
import { launch } from '../research/browser.mjs';
const [, , base, out, pathsArg = '/', vpArg = '1440x900,390x844', ...flags] = process.argv;
const full = flags.includes('--full');
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const errors = [];
for (const vp of vpArg.split(',')) {
  const [width, height] = vp.split('x').map(Number);
  // Full-page captures use reduced motion so every section shows its final state (motion is checked in viewport shots).
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: full ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${vp}] ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`[${vp}] pageerror ${e.message}`));
  for (const p of pathsArg.split(',')) {
    await page.goto(base + p, { waitUntil: 'load', timeout: 120000 });
    await page.waitForTimeout(1600);
    const name = (p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_/, '')) + `-${width}`;
    await page.screenshot({ path: `${out}/${name}-top.png` });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) errors.push(`[${vp}] ${p} horizontal overflow ${overflow}px`);
    for (let y = 0; y < (await page.evaluate(() => document.documentElement.scrollHeight)); y += Math.round(height * 0.6)) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(160); }
    await page.waitForTimeout(900);
    if (full) {
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager')));
      await page.waitForLoadState('load'); await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
      await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    }
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${out}/console-errors.txt`, errors.join('\n'));
console.log('errors:', errors.length ? '\n' + errors.join('\n') : 'none');
