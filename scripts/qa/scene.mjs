// Captures the pinned week scene at several scroll positions (motion on): node scripts/qa/scene.mjs <base> <outDir> [WxH]
import fs from 'node:fs';
import { launch } from '../research/browser.mjs';
const [, , base, out, vp = '1440x900'] = process.argv;
const [width, height] = vp.split('x').map(Number);
fs.mkdirSync(out, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width, height } });
await p.goto(base + '/', { waitUntil: 'load' });
await p.waitForTimeout(1200);
const { top, range } = await p.evaluate(() => {
  const s = document.querySelector('section[aria-labelledby="week-heading"]');
  const w = s.firstElementChild;
  return { top: s.getBoundingClientRect().top + scrollY, range: w.offsetHeight - innerHeight };
});
console.log('week top', top, 'pin range', range);
for (const f of [0, 0.15, 0.35, 0.55, 0.75, 1]) {
  // approach gradually so scroll-linked values settle
  const target = top + range * f;
  await p.evaluate((t) => window.scrollTo(0, t - 300), target); await p.waitForTimeout(150);
  await p.evaluate((t) => window.scrollTo(0, t), target); await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/week-${width}-${Math.round(f * 100)}.png` });
}
await b.close();
