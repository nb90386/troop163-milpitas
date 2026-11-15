// Downloads review thumbnails (800px) for every photo in the album inventory.
import fs from 'node:fs';
const [, , inv, dir] = process.argv;
const d = JSON.parse(fs.readFileSync(inv, 'utf8'));
fs.mkdirSync(dir, { recursive: true });
const photos = d.items.filter(x => x.label.startsWith('Photo')).map((x, i) => ({ ...x, idx: i, base: (x.src || '').split('=')[0] }));
fs.writeFileSync(inv.replace('.json', '-photos.json'), JSON.stringify(photos, null, 1));
let n = 0;
async function get(p) {
  const f = `${dir}/${String(p.idx).padStart(3, '0')}.jpg`;
  if (fs.existsSync(f)) return;
  const r = await fetch(`${p.base}=w800-h800`);
  if (!r.ok) { console.log('fail', p.idx, r.status); return; }
  fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); n++;
}
const todo = photos.filter(p => p.base);
for (let i = 0; i < todo.length; i += 12) await Promise.all(todo.slice(i, i + 12).map(get));
console.log('downloaded', n, 'of', photos.length);
