/* GWAR landing – the only first-party script (deferred).
   Opening status, event measurement, consent banner, click-to-load map, sticky bar.
   Everything else on the page works without JavaScript. */
(function () {
  'use strict';
  var doc = document;
  var lang = doc.documentElement.lang;

  function gtagSafe() { if (typeof window.gtag === 'function') window.gtag.apply(null, arguments); }
  function track(name, params) {
    params = params || {};
    params.page_language = lang;
    gtagSafe('event', name, params);
  }

  /* ---------- Desktop: external links in a new tab (mobile stays in the same tab) ---------- */
  var desktop = window.matchMedia && window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches;
  if (desktop) {
    var ext = doc.querySelectorAll('[data-newtab-desktop]');
    for (var i = 0; i < ext.length; i++) { ext[i].target = '_blank'; ext[i].rel = 'noopener'; }
  }

  /* ---------- Events ---------- */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-ev]');
    if (!el) return;
    var name = el.getAttribute('data-ev');
    var params = {};
    var cta = el.getAttribute('data-cta');
    if (cta) params.cta_location = cta;
    if (name === 'get_directions' || name === 'click_to_call' || name === 'reservation_click' || name === 'address_click') {
      params.transport_type = 'beacon';
    }
    if (name === 'language_switch') {
      params.to_language = el.getAttribute('data-to');
      params.transport_type = 'beacon';
      var map = el.getAttribute('data-anchors');
      if (map) {
        var target = currentSection(JSON.parse(map));
        if (target) el.href = el.pathname + '#' + target;
      }
    }
    if (name === 'maps_open' && el.hasAttribute('data-embed')) {
      e.preventDefault();
      loadMap(el);
    }
    track(name, params);
  });

  // <details> toggle does not bubble – listen in the capture phase.
  doc.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d.tagName === 'DETAILS' && d.open && d.hasAttribute('data-faq-id')) {
      track('faq_open', { faq_id: d.getAttribute('data-faq-id') });
    }
  }, true);

  /* ---------- Language switch keeps the section you are reading ---------- */
  function currentSection(map) {
    var best = null;
    var line = window.innerHeight * 0.4;
    for (var id in map) {
      var s = doc.getElementById(id);
      if (s && s.getBoundingClientRect().top <= line) best = map[id];
    }
    return best;
  }

  /* ---------- Map: Google iframe only after a click ---------- */
  function loadMap(link) {
    var box = link.parentNode;
    var f = doc.createElement('iframe');
    f.src = link.getAttribute('data-embed');
    f.title = link.getAttribute('data-title');
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.setAttribute('allowfullscreen', '');
    box.replaceChild(f, link);
  }

  /* ---------- Sticky bar appears after the hero CTA scrolls away ---------- */
  var bar = doc.getElementById('sticky-cta');
  var heroCta = doc.getElementById('hero-cta');
  if (bar && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var past = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', past);
    }).observe(heroCta);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  /* ---------- Consent banner (Consent Mode v2, default denied in <head>) ---------- */
  var KEY = 'gwar_consent';
  var banner = doc.getElementById('consent');
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: ask again next visit */ }
    gtagSafe('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
    if (banner) banner.hidden = true;
  }
  if (banner) {
    if (!stored()) banner.hidden = false;
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) setConsent(b.getAttribute('data-consent'));
    });
    var reopen = doc.querySelectorAll('[data-consent-open]');
    for (var r = 0; r < reopen.length; r++) {
      reopen[r].hidden = false;
      reopen[r].addEventListener('click', function () { banner.hidden = false; });
    }
  }

  /* ---------- Opening status (Europe/Warsaw, not the device's time zone) ---------- */
  var statusEl = doc.getElementById('status');
  var dataEl = doc.getElementById('hours-data');
  if (statusEl && dataEl) {
    try { renderStatus(JSON.parse(dataEl.textContent)); } catch (e) { /* no status rather than a wrong one */ }
  }

  function renderStatus(h) {
    var parts = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: h.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var today = parts.year + '-' + parts.month + '-' + parts.day;
    if (!h.until || today > h.until) return; // exceptions list out of date → hide status
    var now = (+parts.hour) * 60 + (+parts.minute);

    function shift(iso, n) {
      var d = new Date(iso + 'T12:00:00Z');
      d.setUTCDate(d.getUTCDate() + n);
      return d.toISOString().slice(0, 10);
    }
    function intervals(iso) {
      var list = Object.prototype.hasOwnProperty.call(h.exceptions, iso)
        ? h.exceptions[iso]
        : h.weekly[(new Date(iso + 'T12:00:00Z').getUTCDay() + 6) % 7];
      return (list || []).map(function (i) {
        var o = toMin(i.open), c = toMin(i.close);
        if (c <= o) c += 1440; // closes after midnight
        return [o, c, i.open, i.close];
      });
    }
    function toMin(t) { var a = t.split(':'); return (+a[0]) * 60 + (+a[1]); }
    function fmt(t) { return t === '00:00' ? h.midnight : t; }
    function show(open, text) {
      statusEl.className = 'status ' + (open ? 'is-open' : 'is-closed');
      statusEl.innerHTML = '<span class="dot" aria-hidden="true">●</span><span></span>';
      statusEl.lastChild.textContent = text;
      statusEl.hidden = false;
    }

    var y = intervals(shift(today, -1));
    for (var a = 0; a < y.length; a++) {
      if (y[a][1] > 1440 && now < y[a][1] - 1440) return show(true, h.t.openUntil.replace('{t}', fmt(y[a][3])));
    }
    var t = intervals(today);
    for (var b = 0; b < t.length; b++) {
      if (now >= t[b][0] && now < t[b][1]) return show(true, h.t.openUntil.replace('{t}', fmt(t[b][3])));
    }
    for (var c = 0; c < t.length; c++) {
      if (t[c][0] > now) return show(false, h.t.opensToday.replace('{t}', t[c][2]));
    }
    var tomorrow = shift(today, 1);
    if (tomorrow <= h.until) {
      var n = intervals(tomorrow);
      if (n.length) return show(false, h.t.opensTomorrow.replace('{t}', n[0][2]));
    }
    show(false, h.t.closed);
  }
})();
