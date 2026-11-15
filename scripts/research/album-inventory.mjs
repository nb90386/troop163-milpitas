// Inventory a public Google Photos shared album: collects photo page links + base image URLs.
// Usage: node scripts/research/album-inventory.mjs <albumUrl> <outJson>
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , url, out] = process.argv;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(4000);
const title = await page.title();
const seen = new Map();
let stall = 0;
for (let i = 0; i < 900; i++) {
  const items = await page.$$eval('a[href*="/photo/"]', as => as.map(a => {
    const img = a.querySelector('[style*="googleusercontent"], img');
    let src = img?.getAttribute('src') || '';
    const st = img?.getAttribute('style') || '';
    const m = st.match(/url\("?([^")]+)"?\)/); if (m) src = m[1];
    return { href: a.href, src, label: a.getAttribute('aria-label') || '' };
  }));
  let added = 0;
  for (const it of items) { const prev = seen.get(it.href); if (!prev) { seen.set(it.href, it); added++; } else if (!prev.src && it.src) prev.src = it.src; }
  const moved = await page.evaluate(() => {
    const els = [...document.querySelectorAll('*')].filter(e => {
      const cs = getComputedStyle(e); return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 50;
    }).sort((a, b) => b.scrollHeight - a.scrollHeight);
    const el = els[0] || document.scrollingElement;
    const before = el.scrollTop; el.scrollTop += 450; return el.scrollTop !== before;
  });
  await page.waitForTimeout(1300);
  if (!moved && i > 3) { stall = (stall||0)+1; if (stall > 4) break; } else stall = 0;
  if (added === 0 && i > 10) {
    const again = await page.$$eval('a[href*="/photo/"]', as => as.length);
    if (again <= seen.size) { /* keep scrolling a few more */ }
  }
}
const bodyText = (await page.innerText('body')).slice(0, 600);
await page.screenshot({ path: out.replace('.json', '.png') });
fs.writeFileSync(out, JSON.stringify({ title, bodyText, count: seen.size, items: [...seen.values()] }, null, 2));
console.log(title, seen.size);
await browser.close();
