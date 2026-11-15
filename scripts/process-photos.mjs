// Processes curated originals into web masters.
// - Applies EXIF orientation, converts to sRGB, strips ALL metadata (incl. GPS).
// - Resizes to max 2400px on the long edge (next/image builds the responsive srcset).
// - public photos  -> public/images/<source>/<id>.jpg
// - review photos  -> media-review/images/<source>/<id>.jpg (copied into public/ only for review builds)
// - Writes src/content/photo-meta.generated.json with dimensions + tiny blur placeholders.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { photoManifest } from '../src/content/photo-manifest.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const meta = {};
let n = 0;
for (const p of photoManifest) {
  const src = path.join(ROOT, 'source-assets/originals', p.original);
  const baseDir = p.release === 'public' ? 'public/images' : 'media-review/images';
  const rel = `${p.source}/${p.id}.jpg`;
  const out = path.join(ROOT, baseDir, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (!fs.existsSync(src)) { console.warn('missing original', src); continue; }
  const img = sharp(src).rotate().toColorspace('srgb');
  const info = await img.clone().resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(out); // sharp drops metadata unless .withMetadata()
  const blur = await img.clone().resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  meta[p.id] = {
    src: `/images/${p.release === 'review' ? 'review/' : ''}${rel}`,
    width: info.width, height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  };
  n++;
}
fs.writeFileSync(path.join(ROOT, 'src/content/photo-meta.generated.json'), JSON.stringify(meta, null, 1) + '\n');
console.log(`processed ${n} photos`);
