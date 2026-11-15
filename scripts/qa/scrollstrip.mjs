// Scroll-position strip with motion ON: node scripts/qa/scrollstrip.mjs <url> <outDir> <WxH> [stepFraction=0.75]
import fs from 'node:fs';
import sharp from 'sharp';
import { launch } from '../research/browser.mjs';
const [, , url, out, vp = '1440x900', stepArg = '0.75'] = process.argv;
const [width, height] = vp.split('x').map(Number);
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1800);
const H = await page.evaluate(() => document.documentElement.scrollHeight);
const shots = [];
let n = 0;
for (let y = 0; y < H - height / 2; y += Math.round(height * Number(stepArg))) {
  // scroll in small increments so scroll-linked motion settles like a real wheel
  await page.evaluate(async (target) => { const s = scrollY; for (let k = 1; k <= 6; k++) { scrollTo(0, s + ((target - s) * k) / 6); await new Promise((r) => requestAnimationFrame(r)); } }, y);
  await page.waitForTimeout(700);
  const f = `${out}/${String(n++).padStart(2, '0')}.jpg`;
  await page.screenshot({ path: f, type: 'jpeg', quality: 70 });
  shots.push(f);
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
await browser.close();
// contact sheets, 6 per sheet (2 columns)
const tw = width > 800 ? 720 : 300, th = Math.round((tw * height) / width);
const cols = width > 800 ? 2 : 4, per = width > 800 ? 6 : 8;
for (let s = 0; s * per < shots.length; s++) {
  const group = shots.slice(s * per, s * per + per);
  const rows = Math.ceil(group.length / cols);
  const comps = await Promise.all(group.map(async (f, i) => ({ input: await sharp(f).resize(tw, th).toBuffer(), left: (i % cols) * (tw + 8), top: Math.floor(i / cols) * (th + 8) })));
  await sharp({ create: { width: cols * (tw + 8), height: rows * (th + 8), channels: 3, background: '#ff00ff' } }).composite(comps).jpeg({ quality: 72 }).toFile(`${out}/sheet-${s}.jpg`);
}
console.log(JSON.stringify({ frames: shots.length, H, overflow, errors }));
