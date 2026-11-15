import sharp from 'sharp';
const [, , out, ...ids] = process.argv; const W = 640, H = 480, C = 3;
const comps = [];
for (let i = 0; i < ids.length; i++) {
  const buf = await sharp(`source-assets/originals/hisierra-2023/hs23-${ids[i]}.jpg`).rotate().resize(W - 8, H - 8, { fit: 'contain', background: '#222' }).toBuffer();
  const x = (i % C) * W, y = Math.floor(i / C) * H; comps.push({ input: buf, left: x + 4, top: y + 4 });
  comps.push({ input: Buffer.from(`<svg width="70" height="34"><rect width="70" height="34" fill="#000"/><text x="6" y="25" font-size="22" font-family="Arial" fill="#ff0">${ids[i]}</text></svg>`), left: x + 4, top: y + 4 });
}
await sharp({ create: { width: W * C, height: H * Math.ceil(ids.length / C), channels: 3, background: '#111' } }).composite(comps).jpeg({ quality: 80 }).toFile(out);
