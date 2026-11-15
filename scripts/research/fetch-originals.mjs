// Downloads original-resolution files (album download control "=d") for the given album indices.
import fs from 'node:fs';
const [, , inv, dir, ...ids] = process.argv;
const photos = JSON.parse(fs.readFileSync(inv, 'utf8'));
fs.mkdirSync(dir, { recursive: true });
async function get(i) {
  const p = photos[i]; const f = `${dir}/hs23-${String(i).padStart(3, '0')}.jpg`;
  if (fs.existsSync(f) && fs.statSync(f).size > 100000) return;
  for (let t = 0; t < 3; t++) {
    try { const r = await fetch(`${p.base}=d`); if (r.ok) { fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); return; } } catch {}
  }
  console.log('fail', i);
}
const list = ids.map(Number);
for (let k = 0; k < list.length; k += 6) await Promise.all(list.slice(k, k + 6).map(get));
console.log('done', fs.readdirSync(dir).length);
