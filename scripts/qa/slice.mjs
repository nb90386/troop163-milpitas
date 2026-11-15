// Slices tall full-page screenshots into readable JPEG parts: node scripts/qa/slice.mjs <dir>
import sharp from 'sharp';
import fs from 'node:fs';
const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('-full.png'))) {
  const m = await sharp(`${dir}/${f}`).metadata();
  const step = m.width > 1000 ? 3600 : 3000;
  for (let i = 0; i * step < m.height; i++) {
    const h = Math.min(step, m.height - i * step);
    await sharp(`${dir}/${f}`).extract({ left: 0, top: i * step, width: m.width, height: h }).resize({ width: m.width > 1000 ? 720 : 390 }).jpeg({ quality: 70 }).toFile(`${dir}/${f.replace('.png', '')}-p${i}.jpg`);
  }
}
