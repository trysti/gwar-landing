#!/usr/bin/env node
// Google Ads sitelinks (data/sitelinks.json): every anchor must exist in the built page,
// texts must fit Google Ads limits and pass the Content Blacklist. Run after build. Exit 1 on any problem.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { re } from './blacklist.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/sitelinks.json'), 'utf8'));
const { siteUrl } = JSON.parse(readFileSync(join(root, 'data/business.json'), 'utf8'));

const errors = [];
for (const lang of ['pl', 'en']) {
  const links = data[lang];
  let html;
  try { html = readFileSync(join(root, 'dist', lang, 'index.html'), 'utf8'); } catch {
    console.error('dist/ missing – run `npm run build` first');
    process.exit(1);
  }
  if (links.length < 6) errors.push(`${lang}: ${links.length} sitelinków, Google Ads chce co najmniej 6`);
  const seen = new Set();
  for (const s of links) {
    const where = `${lang} „${s.text}”`;
    if (seen.has(s.anchor)) errors.push(`${where}: kotwica #${s.anchor} użyta drugi raz`);
    seen.add(s.anchor);
    if (!html.includes(`id="${s.anchor}"`)) errors.push(`${where}: brak sekcji id="${s.anchor}" w dist/${lang}/index.html`);
    for (const [field, max] of [['text', data.limits.text], ['description1', data.limits.description], ['description2', data.limits.description]]) {
      const v = s[field] ?? '';
      if (!v) errors.push(`${where}: brak ${field}`);
      if ([...v].length > max) errors.push(`${where}: ${field} ma ${[...v].length} znaków (limit ${max})`);
      for (const m of v.matchAll(re)) errors.push(`${where}: ${field} zawiera „${m[0]}” (Content Blacklist)`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n') + `\n\nSitelinki: ${errors.length} problemów.`);
  process.exit(1);
}
for (const lang of ['pl', 'en']) {
  console.log(`\n${lang.toUpperCase()}:`);
  for (const s of data[lang]) console.log(`  ${s.text} → ${siteUrl}/${lang}/#${s.anchor}`);
}
console.log('\nSitelinki: OK');
