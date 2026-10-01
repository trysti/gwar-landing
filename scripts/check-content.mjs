#!/usr/bin/env node
// Content Blacklist check (spec: "Wyszukiwanie tekstowe w kodzie i treści obu wersji nie znajduje
// słów z Content Blacklist – również w alt, meta, schema, nazwach plików").
// Scans everything that gets published (dist/, run after build). Exit 1 on any hit.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const L = '\\p{L}';
// Word stems; matched at a word start (Unicode-aware, so Polish letters count as letters).
const STEMS = [
  'drink', 'koktajl', 'cocktail', 'shot', 'shoty', 'wódk', 'wodk', 'vodka', 'nalewk', 'gwarówk', 'gwarowk',
  'piw', 'beer', 'wino\\b', 'win(?:a|em|ie)\\b', 'wine', 'whisk', 'rum\\b', 'gin\\b', 'tequil', 'prosecco', 'szampan', 'champagne',
  'aperol', 'campari', 'jameson', 'bacardi', 'spritz', 'mojito', 'martini', 'porn star', 'alkohol', 'alcohol', 'booze',
  'happy hour', 'promocj', 'promotion', 'instagram', 'facebook',
  'menu\\.html', 'promotions\\.html', 'hasMenu', '"menu"', 'AggregateRating', '"Review"', '"Offer"',
];
const re = new RegExp(`(?<!${L})(?:${STEMS.join('|')})`, 'giu');
// Allowed on purpose (spec: "Dozwolone"): phrases describing the place, not alcohol.
const ALLOW = [/gwar\.bar/i];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
};
for (const d of ['dist']) {
  try { walk(join(root, d)); } catch { if (d === 'dist') { console.error('dist/ missing – run `npm run build` first'); process.exit(1); } }
}

let hits = 0;
for (const f of files) {
  const rel = relative(root, f);
  // file names count too
  for (const m of rel.matchAll(re)) { hits++; console.log(`${rel}: nazwa pliku zawiera „${m[0]}”`); }
  if (/\.(woff2?|png|jpe?g|webp|avif|gif|ico)$/i.test(f)) continue;
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(re)) {
      const ctx = line.slice(Math.max(0, m.index - 40), m.index + 40);
      if (ALLOW.some((a) => a.test(ctx) && a.source.includes(m[0].toLowerCase()))) continue;
      hits++;
      console.log(`${rel}:${i + 1}: „${m[0]}” … ${ctx.trim()}`);
    }
  });
}
if (hits) {
  console.error(`\nContent Blacklist: ${hits} trafień. Usuń je przed publikacją.`);
  process.exit(1);
}
console.log(`Content Blacklist: OK (${files.length} plików)`);
