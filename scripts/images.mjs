#!/usr/bin/env node
// Exports photos/<ID>.(jpg|jpeg|png|tif) → assets/img/<id>-<hash>-{480,768,1200}.{avif,webp,jpg}
// (+ F1 1200×630 for Open Graph), strips EXIF/GPS and updates data/images.json.
// Needs sharp: `npm install --no-save sharp`, then `npm run images`.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try { sharp = (await import('sharp')).default; } catch {
  console.error('Brak biblioteki sharp. Uruchom: npm install --no-save sharp');
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'photos');
const out = join(root, 'assets/img');
const dataFile = join(root, 'data/images.json');
const data = JSON.parse(readFileSync(dataFile, 'utf8'));
const WIDTHS = [480, 768, 1200];
mkdirSync(out, { recursive: true });

if (!existsSync(src)) { console.error('Brak katalogu photos/ z oryginałami (F1.jpg, L1.jpg, …).'); process.exit(1); }
for (const file of readdirSync(src)) {
  const id = file.replace(/\.[^.]+$/, '').toUpperCase();
  if (!(id in data) || id.startsWith('_')) { console.log(`pomijam ${file} (nieznany ID)`); continue; }
  const input = readFileSync(join(src, file));
  const base = `${id.toLowerCase()}-${createHash('sha256').update(input).digest('hex').slice(0, 8)}`;
  const img = sharp(input).rotate(); // apply EXIF orientation; metadata is not copied to outputs
  const meta = await img.metadata();
  const ratio = (meta.orientation >= 5 ? meta.width / meta.height : meta.height / meta.width);
  const srcW = meta.orientation >= 5 ? meta.height : meta.width;
  // Never upscale: keep the widths the original can fill, plus its own width if it is smaller.
  const widths = WIDTHS.filter((w) => w <= srcW);
  if (!widths.length || widths[widths.length - 1] < Math.min(srcW, WIDTHS[WIDTHS.length - 1])) widths.push(Math.min(srcW, WIDTHS[WIDTHS.length - 1]));
  for (const w of widths) {
    const r = img.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 50 }).toFile(join(out, `${base}-${w}.avif`));
    await r.clone().webp({ quality: 72 }).toFile(join(out, `${base}-${w}.webp`));
    await r.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(join(out, `${base}-${w}.jpg`));
  }
  const maxW = widths[widths.length - 1];
  const entry = { base, widths, width: maxW, height: Math.round(maxW * ratio) };
  {
    entry.og = `${base}-og.jpg`;
    await img.clone().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(join(out, entry.og));
  }
  data[id] = entry;
  console.log(`${id}: ${base} (${entry.width}×${entry.height})`);
}
writeFileSync(dataFile, JSON.stringify(data, null, 2) + '\n');
