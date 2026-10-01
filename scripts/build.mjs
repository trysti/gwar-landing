#!/usr/bin/env node
// Static build: data/ + content/ + assets/ -> dist/
//   node scripts/build.mjs           draft build (TODO markers visible, warnings listed)
//   node scripts/build.mjs --strict  publish build: fails while any TODO marker or missing required data remains
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pl from '../content/pl.mjs';
import en from '../content/en.mjs';
import * as privacy from '../content/privacy.mjs';
import { validateHours, statusEnabled } from '../src/hours.mjs';
import { landingPage, links, simplePage } from '../src/render.mjs';
import { TODO_ATTR } from '../src/todo.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const strict = process.argv.includes('--strict');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

const business = readJson('data/business.json');
const hours = readJson('data/hours.json');
const reviews = readJson('data/reviews.json');
const images = readJson('data/images.json');

// ---------- publish gate (spec: "Bez punktów 1–4 strony nie wolno publikować") ----------
const blockers = [];
const hourErrors = validateHours(hours);
if (hourErrors.length) {
  console.error('data/hours.json is invalid:\n  ' + hourErrors.join('\n  '));
  process.exit(1);
}
if (!statusEnabled(hours)) blockers.push('hours.json: godziny niepotwierdzone / niekompletne lub brak exceptionsValidUntil (pkt 1)');
if (!business.postalCode) blockers.push('business.json: postalCode (pkt 2)');
if (!business.googlePlaceId) blockers.push('business.json: googlePlaceId (pkt 3)');
if (!business.googleProfileUrl) blockers.push('business.json: googleProfileUrl (pkt 3)');

// ---------- assets ----------
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'assets', 'img'), { recursive: true });
mkdirSync(join(dist, 'assets', 'fonts'), { recursive: true });

const js = readFileSync(join(root, 'assets/main.js'));
const jsName = `/assets/main.${hash(js)}.js`;
writeFileSync(join(dist, jsName), js);

const font = readFileSync(join(root, 'assets/fonts/jeanluc-bold.woff2'));
const fontName = `/assets/fonts/jeanluc-bold.${hash(font)}.woff2`;
writeFileSync(join(dist, fontName), font);

const css = readFileSync(join(root, 'assets/styles.css'), 'utf8')
  .replace("/assets/fonts/jeanluc-bold.woff2", fontName)
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '\n')
  .trim();

const logoSvg = readFileSync(join(root, 'assets/logo.svg'), 'utf8')
  .replace('<svg ', '<svg role="img" aria-hidden="true" focusable="false" ')
  .trim();

// Images are pre-exported by scripts/images.mjs with content hashes in their names.
if (existsSync(join(root, 'assets/img'))) {
  cpSync(join(root, 'assets/img'), join(dist, 'assets/img'), {
    recursive: true,
    filter: (src) => !src.endsWith('.md'),
  });
}
const og = images.F1 && images.F1.og ? `/assets/img/${images.F1.og}` : null;

writeFileSync(
  join(dist, 'favicon.svg'),
  readFileSync(join(root, 'assets/logo.svg'), 'utf8')
    .replace('viewBox="163 390 754 300"', 'viewBox="133 240 814 600"')
    .replace(/currentColor/g, '#DA3365')
    .replace('fill="none">', 'fill="none"><rect x="133" y="240" width="814" height="600" rx="120" fill="#000"/>'),
);

const assets = { css, js: jsName, font: fontName, logo: logoSvg };

// ---------- pages ----------
const pages = [];
const page = (path, html) => pages.push([path, html]);

for (const [c, other] of [[pl, en], [en, pl]]) {
  const ctx = { c, other, b: business, l: links(business, c.lang), hours, reviews, images, assets, ogImage: og };
  page(`${c.lang}/index.html`, landingPage(ctx));
  const p = privacy[c.lang](business);
  page(
    `${c.privacyPath.slice(1)}index.html`,
    simplePage(ctx, {
      title: p.title,
      description: p.description,
      canonical: c.privacyPath,
      alternates: { pl: pl.privacyPath, en: en.privacyPath, 'x-default': en.privacyPath },
      otherHref: other.privacyPath,
      html: p.html,
    }),
  );
}

// Root: GitHub Pages cannot do an Accept-Language 302, so a tiny language-choice page
// redirects by browser language (query string kept for gclid/UTM). Netlify uses _redirects.
{
  const ctx = { c: en, other: pl, b: business, l: links(business, 'en'), hours, reviews, images, assets };
  page(
    'index.html',
    simplePage(ctx, {
      title: 'Bar Gwar – Kazimierz, Krakow',
      description: en.description,
      alternates: { pl: '/pl/', en: '/en/', 'x-default': '/en/' },
      noindex: true,
      chrome: false,
      html: `<div class="lang-choice">
<a class="logo" href="/en/" aria-label="Bar Gwar">${logoSvg}</a>
<div class="btn-row">
<a class="btn btn-primary" href="/pl/" hreflang="pl" lang="pl">Polski</a>
<a class="btn btn-secondary" href="/en/" hreflang="en">English</a>
</div>
</div>
<script>(function(){var l=(navigator.languages||[navigator.language||'']).some(function(x){return /^pl\\b/i.test(x)})?'pl':'en';location.replace('/'+l+'/'+location.search+location.hash);})();</script>`,
    }),
  );
  page(
    '404.html',
    simplePage(ctx, {
      title: 'Nie ma takiej strony / Page not found – Bar Gwar',
      description: en.description,
      noindex: true,
      chrome: false,
      html: `<div class="lang-choice">
<a class="logo" href="/en/" aria-label="Bar Gwar">${logoSvg}</a>
<h1>${pl.notFound.title} / <span lang="en">${en.notFound.title}</span></h1>
<div class="btn-row">
<a class="btn btn-primary" href="/pl/" hreflang="pl" lang="pl">Bar Gwar – PL</a>
<a class="btn btn-secondary" href="/en/" hreflang="en">Bar Gwar – EN</a>
</div>
</div>`,
    }),
  );
}

for (const [path, html] of pages) {
  const file = join(dist, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html.replace(/\n{2,}/g, '\n'));
}

// ---------- technical files ----------
const site = business.siteUrl;
const today = new Date().toISOString().slice(0, 10);
const urlEntry = (loc, alts) => `<url><loc>${site}${loc}</loc><lastmod>${today}</lastmod>
${Object.entries(alts).map(([hl, href]) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${site}${href}"/>`).join('\n')}
</url>`;
const landingAlts = { pl: '/pl/', en: '/en/', 'x-default': '/en/' };
const privAlts = { pl: pl.privacyPath, en: en.privacyPath, 'x-default': en.privacyPath };
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntry('/pl/', landingAlts)}
${urlEntry('/en/', landingAlts)}
${urlEntry(pl.privacyPath, privAlts)}
${urlEntry(en.privacyPath, privAlts)}
</urlset>
`,
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
writeFileSync(join(dist, 'CNAME'), new URL(site).host + '\n');
// Used by Netlify / Cloudflare Pages; ignored by GitHub Pages.
writeFileSync(
  join(dist, '_headers'),
  `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  Cache-Control: public, max-age=300\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`,
);
writeFileSync(join(dist, '_redirects'), `/  /pl/  302  Language=pl\n/  /en/  302\n`);

// ---------- report ----------
let todoCount = 0;
for (const [path, html] of pages) {
  const n = html.split(TODO_ATTR).length - 1;
  if (n) console.log(`  ${String(n).padStart(3)} × DO UZUPEŁNIENIA  ${path}`);
  todoCount += n;
}
const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' KB';
console.log(`\nBuilt ${pages.length} pages → dist/  (pl/index.html ${kb(pages[0][1])}, JS ${kb(js)}, font ${kb(font)})`);
for (const b of blockers) console.log(`  BLOKUJE PUBLIKACJĘ: ${b}`);
console.log(`  Znaczniki DO UZUPEŁNIENIA: ${todoCount}`);
if (strict && (todoCount || blockers.length)) {
  console.error('\n--strict: strona nie jest gotowa do publikacji (patrz lista powyżej).');
  process.exit(1);
}
