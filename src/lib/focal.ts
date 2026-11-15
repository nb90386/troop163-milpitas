/** Kept separate from lib/photos so client components never bundle the photo manifest. */
export function objectPosition(p: { focal: { x: number; y: number } }) {
  return `${Math.round(p.focal.x * 100)}% ${Math.round(p.focal.y * 100)}%`
}
