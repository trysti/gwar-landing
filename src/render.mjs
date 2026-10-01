// HTML templates. Pure functions: (content, data) -> string. No client-side framework.
import { hoursRows, openingHoursSchema, statusEnabled, statusPayload } from './hours.mjs';
import { todo } from './todo.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const attr = (s) => esc(s);
// JSON inside <script>: keep "</script>" and HTML comments from breaking out.
const jsonScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

const ICONS = {
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8.8a15 15 0 0 1 20 0M5 12.6a10 10 0 0 1 14 0M8.5 16.4a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>',
  dog: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.2C10 3.9 8.9 3 7.6 3 5.5 3 4 6 4 8.2c0 1 .5 1.8 1.4 1.8M14 5.2C14 3.9 15.1 3 16.4 3 18.5 3 20 6 20 8.2c0 1-.5 1.8-1.4 1.8M8 14v.5M16 14v.5M11.3 17.5h1.4L12 18.4l-.7-.9z"/><path d="M5.5 10.5C5 12 5 13.8 5.4 15.6 6.3 19.4 9 21 12 21s5.7-1.6 6.6-5.4c.4-1.8.4-3.6-.1-5.1C17.6 7.7 15 6 12 6s-5.6 1.7-6.5 4.5z"/></svg>',
  wheelchair: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.5"/><path d="M12 7v6h5l2 5M12 10h4"/><path d="M8.5 10.5a6 6 0 1 0 7.9 8"/></svg>',
  card: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
};

// ---------- links (one place for every CTA URL) ----------
export function links(b, lang) {
  const dest = `${b.name}, ${b.streetAddress}, ${b.addressLocality}`;
  const enc = encodeURIComponent;
  let directions = `https://www.google.com/maps/dir/?api=1&destination=${enc(dest)}`;
  if (b.googlePlaceId) directions += `&destination_place_id=${enc(b.googlePlaceId)}`;
  let profile = b.googleProfileUrl;
  if (!profile) {
    profile = `https://www.google.com/maps/search/?api=1&query=${enc(dest)}`;
    if (b.googlePlaceId) profile += `&query_place_id=${enc(b.googlePlaceId)}`;
  }
  const { latitude, longitude } = b.geo;
  const embed = `https://maps.google.com/maps?q=${enc(dest)}&ll=${latitude},${longitude}&z=17&hl=${lang}&output=embed`;
  return { directions, profile, embed, tel: `tel:${b.telephone}`, reservation: b.reservationUrl };
}

// ---------- components ----------
const btnDirections = (c, l, loc, cls = 'btn btn-primary') =>
  `<a class="${cls}" href="${attr(l.directions)}" data-ev="get_directions" data-cta="${loc}" data-newtab-desktop>${ICONS.pin}<span>${c.ui.directions}</span></a>`;
const btnCall = (c, l, loc, cls = 'btn btn-secondary') =>
  `<a class="${cls}" href="${l.tel}" data-ev="click_to_call" data-cta="${loc}">${ICONS.phone}<span>${c.ui.call}</span></a>`;
const btnBook = (c, l, loc, cls = 'btn btn-secondary') =>
  `<a class="${cls}" href="${attr(l.reservation)}" data-ev="reservation_click" data-cta="${loc}" data-newtab-desktop>${ICONS.calendar}<span>${c.ui.book}</span></a>`;

function photo(ctx, id, alt, { cls = '', eager = false, sizes = '(min-width: 900px) 50vw, 100vw' } = {}) {
  const img = ctx.images[id];
  if (!img) return ctx.draft ? `<div class="photo photo-ph ${cls}" role="img" aria-label="${attr(alt)}">${ctx.c.ui.photoTodo(id)}</div>` : '';
  const src = (w, ext) => `/assets/img/${img.base}-${w}.${ext}`;
  const set = (ext) => img.widths.map((w) => `${src(w, ext)} ${w}w`).join(', ');
  const mid = img.widths[Math.min(1, img.widths.length - 1)];
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<picture class="photo ${cls}">
<source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
<img src="${src(mid, 'jpg')}" srcset="${set('jpg')}" sizes="${sizes}" width="${img.width}" height="${img.height}" alt="${attr(alt)}" ${loading}>
</picture>`;
}

function postal(ctx) {
  return ctx.b.postalCode || todo(ctx.c.lang === 'pl' ? 'kod pocztowy DO POTWIERDZENIA' : 'postcode TO BE CONFIRMED');
}

function hoursTable(ctx) {
  const rows = hoursRows(ctx.hours, ctx.c);
  return `<table class="hours-table"><tbody>${rows
    .map(([d, h]) => `<tr><th scope="row">${d}</th><td>${h}</td></tr>`)
    .join('')}</tbody></table>`;
}

function mapSketch(c) {
  // Simplified, decorative sketch (not to scale): river, footbridge, Mostowa Street, pin.
  return `<svg viewBox="0 0 400 300" aria-hidden="true">
<rect width="400" height="300" fill="#0b0b0b"/>
<g stroke="#1c1c1c" stroke-width="10" fill="none"><path d="M-10 70 L410 40"/><path d="M60 -10 L120 210"/><path d="M300 -10 L330 200"/></g>
<path d="M-10 225 C 120 195, 260 205, 410 175 L410 250 C 260 280, 120 270, -10 300 Z" fill="#12263a"/>
<text x="330" y="232" fill="#7fa7c9" font-size="14" font-family="Helvetica, Arial, sans-serif">${c.map.river}</text>
<path d="M205 120 L222 285" stroke="#3a3a3a" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M216 205 L226 290" stroke="#e2e1d8" stroke-width="3" stroke-dasharray="6 5" fill="none"/>
<text x="208" y="262" fill="#ddd" font-size="12" text-anchor="end" font-family="Helvetica, Arial, sans-serif">${c.map.bridge}</text>
<text x="226" y="160" fill="#ddd" font-size="12" font-family="Helvetica, Arial, sans-serif">Mostowa</text>
<text x="24" y="120" fill="#888" font-size="16" font-family="Helvetica, Arial, sans-serif" letter-spacing="2">${c.map.north.toUpperCase()}</text>
<text x="24" y="292" fill="#888" font-size="13" font-family="Helvetica, Arial, sans-serif" letter-spacing="2">${c.map.south.toUpperCase()}</text>
<g transform="translate(210 140)"><path d="M0 0 C -14 -18 -18 -26 -18 -34 A18 18 0 1 1 18 -34 C 18 -26 14 -18 0 0 Z" fill="#DA3365" stroke="#fff" stroke-width="2"/><circle cx="0" cy="-34" r="6" fill="#fff"/></g>
<text x="176" y="80" fill="#fff" font-size="15" font-weight="bold" font-family="Helvetica, Arial, sans-serif">GWAR · Mostowa 8</text>
</svg>`;
}

// ---------- page chrome ----------
function head(ctx, { title, description, canonical, alternates, ogImage, noindex = false, jsonLd = null }) {
  const { c, assets, b } = ctx;
  const alt = alternates
    ? Object.entries(alternates)
        .map(([hl, href]) => `<link rel="alternate" hreflang="${hl}" href="${b.siteUrl}${href}">`)
        .join('\n')
    : '';
  const ga = b.ga4MeasurementId;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
${canonical ? `<link rel="canonical" href="${b.siteUrl}${canonical}">` : ''}
${alt}
<meta name="theme-color" content="#000000">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${b.name}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
${canonical ? `<meta property="og:url" content="${b.siteUrl}${canonical}">` : ''}
${ogImage ? `<meta property="og:image" content="${b.siteUrl}${ogImage}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="${attr(c.ogImageAlt)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="${assets.font}" as="font" type="font/woff2" crossorigin>
<style>${assets.css}</style>
<script>
document.documentElement.className+=' js';
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{if(localStorage.getItem('gwar_consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
${ga ? `gtag('js',new Date());gtag('config','${ga}');` : ''}
</script>
${ga ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>` : ''}
${jsonLd ? `<script type="application/ld+json">${jsonScript(jsonLd)}</script>` : ''}
<script src="${assets.js}" defer></script>
</head>`;
}

function header(ctx, { otherHref, anchorMap }) {
  const { c, other, l, b } = ctx;
  return `<a class="skip" href="#main">${c.ui.skip}</a>
<header class="site-header">
<div class="container">
<a class="logo" href="${c.path}" aria-label="${attr(c.ui.home)}">${ctx.assets.logo}</a>
<a class="header-link" href="${otherHref}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${attr(c.ui.otherLangLabel)}" data-ev="language_switch" data-to="${other.lang}"${anchorMap ? ` data-anchors="${attr(JSON.stringify(anchorMap))}"` : ''}>${c.ui.otherLang}</a>
<a class="header-link" href="${l.tel}" aria-label="${attr(`${c.ui.callIconLabel} ${b.telephoneDisplay}`)}" data-ev="click_to_call" data-cta="header">${ICONS.phone}<span class="tel-text">${b.telephoneDisplay}</span></a>
</div>
</header>`;
}

function footer(ctx) {
  const { c, b, l } = ctx;
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
<div class="container">
<a class="logo" href="${c.path}" aria-label="${attr(c.ui.home)}">${ctx.assets.logo}</a>
<address>
<strong>${b.name}</strong><br>
${b.streetAddress}, ${postal(ctx)} ${b.addressLocality}<br>
<a href="${l.tel}" data-ev="click_to_call" data-cta="footer">${b.telephoneDisplay}</a>${b.email ? `<br><a href="mailto:${b.email}">${b.email}</a>` : ''}
</address>
<ul class="footer-links">
<li><a href="${c.privacyPath}">${c.footer.privacy}</a></li>
<li><a href="${attr(l.profile)}" data-ev="address_click" data-cta="footer" data-newtab-desktop>${c.footer.google}</a></li>
<li><button type="button" class="linklike" data-consent-open hidden>${c.footer.cookies}</button></li>
</ul>
<p>© ${year} ${b.name}</p>
</div>
</footer>
<div class="consent" id="consent" role="dialog" aria-live="polite" aria-label="Cookies" hidden>
<p>${c.consent.text} <a href="${c.privacyPath}">${c.consent.more}</a></p>
<div class="consent-actions">
<button type="button" class="btn btn-secondary" data-consent="denied">${c.consent.reject}</button>
<button type="button" class="btn btn-secondary" data-consent="granted">${c.consent.accept}</button>
</div>
</div>`;
}

// ---------- landing page ----------
export function jsonLd(ctx) {
  const { b, c, hours } = ctx;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': `${b.siteUrl}/#bar`,
    name: b.name,
    url: `${b.siteUrl}${c.path}`,
    telephone: b.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.streetAddress,
      addressLocality: b.addressLocality,
      addressCountry: b.addressCountry,
      ...(b.postalCode ? { postalCode: b.postalCode } : {}),
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.latitude, longitude: b.geo.longitude },
    acceptsReservations: true,
  };
  const ohs = openingHoursSchema(hours);
  if (ohs) ld.openingHoursSpecification = ohs;
  if (b.googleProfileUrl) ld.hasMap = b.googleProfileUrl;
  if (b.priceRange) ld.priceRange = b.priceRange;
  if (b.email) ld.email = b.email;
  const imgs = ['F1', 'W1', 'G1'].map((id) => ctx.images[id]).filter(Boolean);
  if (imgs.length) ld.image = imgs.map((i) => `${b.siteUrl}/assets/img/${i.base}-${i.widths[i.widths.length - 1]}.jpg`);
  return ld;
}

export function landingPage(ctx) {
  const { c, other, b, l, hours, reviews } = ctx;
  const a = c.anchors;
  const anchorMap = Object.fromEntries(Object.keys(a).map((k) => [a[k], other.anchors[k]]));
  const showStatus = statusEnabled(hours);
  const address = c.how.address(b, postal(ctx));
  const hoursSentence = c.faq.hoursSentence(hoursRows(hours, c));
  const faqItems = c.faq.items({
    address: c.lang === 'pl' ? `${b.streetAddress}, ${postal(ctx)} ${b.addressLocality}` : `Mostowa Street 8, ${postal(ctx)} Krakow – in Kazimierz (the old Jewish Quarter)`,
    reservationUrl: l.reservation,
    tel: l.tel,
    phone: b.telephoneDisplay,
    hoursSentence,
  });
  const bookingNote = c.ui.bookingNote ? `<p class="btn-note">${c.ui.bookingNote}</p>` : '';
  const quotes = (reviews[c.lang] || []).slice(0, 3);
  const heroPhoto = photo(ctx, 'F1', c.hero.photoAlt, { cls: 'hero-photo', eager: true });
  const pair = (...html) => (html.some(Boolean) ? `<div class="photos-2">\n${html.join('\n')}\n</div>` : '');
  const howPhotos = pair(
    photo(ctx, 'L1', c.how.photoAlt, { sizes: '(min-width: 900px) 20vw, 50vw' }),
    photo(ctx, 'L2', c.how.photo2Alt, { sizes: '(min-width: 900px) 20vw, 50vw' }),
  );
  const gardenPhotos = pair(
    photo(ctx, 'G1', c.garden.photo1Alt, { sizes: '(min-width: 900px) 25vw, (min-width: 600px) 50vw, 100vw' }),
    photo(ctx, 'G2', c.garden.photo2Alt, { sizes: '(min-width: 900px) 25vw, (min-width: 600px) 50vw, 100vw' }),
  );
  const bookPhoto = photo(ctx, 'W2', c.booking.photoAlt);
  const split = (has, extra = '') => (has ? `container split ${extra}` : 'container');

  const tiles = c.whatsHere.tiles
    .map((t) => {
      const body = `<div class="tile-body"><h3>${t.title}</h3><p>${t.text}${t.link ? ` <a href="#${a[t.link]}">→</a>` : ''}</p></div>`;
      return `<li class="tile">${t.photo ? photo(ctx, t.photo, t.alt, { sizes: '(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw' }) : ''}${body}</li>`;
    })
    .join('\n');

  const landmarks = c.how.landmarks
    .map(
      (m) =>
        `<li><h3>${m.name}</h3><p>${m.text}</p>${m.time ? `<span class="walk">${c.how.walkLabel} ${m.time}</span>` : ''}</li>`,
    )
    .join('\n');

  const quoteHtml = quotes.length
    ? `<ul class="quotes">${quotes
        .map(
          (q) =>
            `<li><figure class="quote"><blockquote><p>„${esc(q.text)}”</p></blockquote><figcaption>${esc(q.author)} · ${c.reviews.month(q.date)} · <a href="${attr(q.url)}" rel="noopener" data-newtab-desktop>${c.reviews.viaGoogle}</a></figcaption></figure></li>`,
        )
        .join('')}</ul>`
    : '';

  const body = `<body>
${header(ctx, { otherHref: other.path, anchorMap })}
<main id="main">

<section class="hero${heroPhoto ? '' : ' hero-text-only'}" id="start" aria-labelledby="h1">
<div class="container">
${heroPhoto}
<div class="hero-text">
<h1 id="h1">${c.hero.h1}</h1>
<p class="hero-sub">${c.hero.sub}</p>
${showStatus ? '<p class="status" id="status" hidden aria-live="polite"></p>' : ''}
<div class="btn-row" id="hero-cta">
${btnDirections(c, l, 'hero')}
${btnCall(c, l, 'hero')}
</div>
<p class="hero-book"><a href="${attr(l.reservation)}" data-ev="reservation_click" data-cta="hero" data-newtab-desktop>${c.hero.bookLink} →</a></p>
<p class="hero-address"><a href="#${a.map}">${address}</a></p>
<ul class="features">${c.hero.features.map((f) => `<li>${f}</li>`).join('')}</ul>
</div>
</div>
</section>

<section id="${a.directions}" aria-labelledby="h-dir">
<div class="${split(howPhotos, 'split-wide')}">
<div>
<h2 id="h-dir">${c.how.h2}</h2>
<p class="address-big"><strong>${address}</strong></p>
${c.how.intro ? `<p class="lead">${c.how.intro}</p>` : ''}
<ul class="landmarks">
${landmarks}
</ul>
<div class="btn-row">${btnDirections(c, l, 'how_to_get_here')}</div>
</div>
${howPhotos}
</div>
</section>

<section id="${a.whatsHere}" aria-labelledby="h-what">
<div class="container">
<h2 id="h-what">${c.whatsHere.h2}</h2>
${c.whatsHere.intro ? `<p class="lead">${c.whatsHere.intro}</p>` : ''}
<ul class="tiles">
${tiles}
</ul>
${c.whatsHere.facts ? `<ul class="facts" aria-label="${attr(c.whatsHere.factsLabel)}">
${c.whatsHere.facts.map((f) => `<li>${ICONS[f.icon]}${f.text}</li>`).join('\n')}
</ul>` : ''}
</div>
</section>

<section id="${a.garden}" aria-labelledby="h-garden">
<div class="${split(gardenPhotos)}">
<div>
<h2 id="h-garden">${c.garden.h2}</h2>
<p class="lead">${b.garden.inSeason ? c.garden.inSeason : c.garden.offSeason}</p>
${c.garden.details ? `<p>${c.garden.details}</p>` : ''}
<div class="btn-row">${btnDirections(c, l, 'garden')}</div>
</div>
${gardenPhotos}
</div>
</section>

<section class="booking" id="${a.booking}" aria-labelledby="h-book">
<div class="${split(bookPhoto)}">
<div>
<h2 id="h-book">${c.booking.h2}</h2>
<p class="lead">${c.booking.text}</p>
${c.booking.details ? `<p>${c.booking.details}</p>` : ''}
<div class="btn-row">
${btnBook(c, l, 'booking_section', 'btn btn-primary')}
${btnCall(c, l, 'booking_section')}
</div>
${bookingNote}
<p class="btn-note">${c.booking.callText}</p>
</div>
${bookPhoto}
</div>
</section>

<section id="${a.reviews}" aria-labelledby="h-rev">
<div class="container">
<h2 id="h-rev">${c.reviews.h2}</h2>
<p class="rating">${c.reviews.rating(b.reviews)}</p>
${quoteHtml}
<p><a href="${attr(l.profile)}" data-ev="reviews_click" data-newtab-desktop>${c.reviews.all} →</a></p>
<p class="source-note">${c.reviews.note}</p>
</div>
</section>

<section id="${a.faq}" aria-labelledby="h-faq">
<div class="container">
<h2 id="h-faq">${c.faq.h2}</h2>
<div class="faq-list">
${faqItems.map(([q, ans], i) => `<details data-faq-id="${i + 1}"><summary>${q}</summary><div><p>${ans}</p></div></details>`).join('\n')}
</div>
</div>
</section>

<section id="${a.map}" aria-labelledby="h-map">
<div class="container">
<h2 id="h-map">${c.map.h2}</h2>
<div class="split">
<div>
<div class="map-box" id="map-box">
<a class="map-static" href="${attr(l.profile)}" data-ev="maps_open" data-cta="map_section" data-embed="${attr(l.embed)}" data-title="${attr(c.map.iframeTitle)}">
${mapSketch(c)}
<span class="map-cta">${c.map.loadLabel}</span>
</a>
</div>
<p class="map-caption">${c.map.caption}</p>
</div>
<div class="contact-card">
<h3>${c.map.addressH}</h3>
<address><a href="${attr(l.profile)}" data-ev="address_click" data-cta="map_section" data-newtab-desktop>${b.name}<br>${address}</a></address>
<h3>${c.map.phoneH}</h3>
<p><a href="${l.tel}" data-ev="click_to_call" data-cta="map_section">${b.telephoneDisplay}</a></p>
${b.email ? `<h3>${c.map.emailH}</h3><p><a href="mailto:${b.email}">${b.email}</a></p>` : ''}
<h3>${c.map.hoursH}</h3>
${hoursTable(ctx)}
<div class="btn-row">
${btnDirections(c, l, 'map_section')}
${btnCall(c, l, 'map_section')}
</div>
</div>
</div>
</div>
</section>

<section class="final" aria-labelledby="h-final">
<div class="container">
<h2 id="h-final">${c.final.h2}</h2>
<p class="lead">${c.final.text}</p>
<div class="btn-row">
${btnDirections(c, l, 'final_cta')}
${btnCall(c, l, 'final_cta')}
${btnBook(c, l, 'final_cta')}
</div>
${bookingNote}
</div>
</section>

</main>
${footer(ctx)}
<nav class="sticky-cta" id="sticky-cta" aria-label="${attr(c.ui.stickyLabel)}">
${btnDirections(c, l, 'sticky')}
${btnCall(c, l, 'sticky')}
</nav>
${showStatus ? `<script type="application/json" id="hours-data">${jsonScript(statusPayload(hours, c))}</script>` : ''}
</body>
</html>`;

  return (
    head(ctx, {
      title: c.title,
      description: c.description,
      canonical: c.path,
      alternates: { pl: '/pl/', en: '/en/', 'x-default': '/en/' },
      ogImage: ctx.ogImage,
      jsonLd: jsonLd(ctx),
    }) + body
  );
}

// ---------- simple pages ----------
export function simplePage(ctx, { title, description, canonical, alternates, otherHref, html, noindex = false, chrome = true }) {
  const { c } = ctx;
  const main = `<main id="main" class="container prose">${html}</main>`;
  return `${head(ctx, { title, description, canonical, alternates, noindex })}
<body>
${chrome ? header(ctx, { otherHref }) : ''}
${main}
${chrome ? footer(ctx) : ''}
</body>
</html>`;
}
