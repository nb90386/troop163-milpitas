// Prebuild step. In review builds (PHOTO_MODE=review) copy review-only photos into public/.
// In public builds make sure none are present.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const target = path.join(ROOT, 'public/images/review');
fs.rmSync(target, { recursive: true, force: true });
if (process.env.PHOTO_MODE === 'review') {
  fs.cpSync(path.join(ROOT, 'media-review/images'), target, { recursive: true });
  console.log('[photos] review build: copied review-only photos into public/images/review');
} else {
  console.log('[photos] public build: review-only photos excluded');
}
