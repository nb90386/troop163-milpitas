// Builds numbered contact sheets (6x5) from review thumbnails for visual curation.
import sharp from 'sharp';
import fs from 'node:fs';
const [, , dir, out] = process.argv;
fs.mkdirSync(out, { recursive: true });
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
const W = 320, H = 240, C = 6, R = 5, per = C * R;
for (let s = 0; s * per < files.length; s++) {
  const batch = files.slice(s * per, (s + 1) * per);
  const comps = [];
  for (let i = 0; i < batch.length; i++) {
    const buf = await sharp(`${dir}/${batch[i]}`).resize(W - 6, H - 6, { fit: 'contain', background: '#222' }).toBuffer();
    const x = (i % C) * W, y = Math.floor(i / C) * H;
    comps.push({ input: buf, left: x + 3, top: y + 3 });
    const label = Buffer.from(`<svg width="64" height="30"><rect width="64" height="30" fill="#000" opacity=".75"/><text x="6" y="22" font-size="20" font-family="Arial" font-weight="bold" fill="#ff0">${batch[i].replace('.jpg', '')}</text></svg>`);
    comps.push({ input: label, left: x + 3, top: y + 3 });
  }
  await sharp({ create: { width: W * C, height: H * R, channels: 3, background: '#111' } }).composite(comps).jpeg({ quality: 72 }).toFile(`${out}/sheet-${String(s).padStart(2, '0')}.jpg`);
}
console.log('sheets', Math.ceil(files.length / per));
