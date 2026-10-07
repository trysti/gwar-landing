# landing.gwar.bar

Landing page Bar Gwar (Mostowa 8, Kazimierz) dla kampanii Google Ads i ruchu organicznego.
Wdrożenie specyfikacji „GWAR – specyfikacja landing page” z 01.10.2026.

- `/pl/` i `/en/` – dwie osobne wersje (single page z kotwicami), `/pl/polityka-prywatnosci/`, `/en/privacy/`
- strona statyczna, generowana przy budowie (Node ≥ 20, **zero zależności**), działa bez JavaScriptu
- wygląd przejęty z bar.gwar.bar: kolory `#DA3365` / czarne tło, krój Jean-Luc w nagłówkach, Helvetica w tekście,
  logotyp `Gwar_logotype_light_no-bg.svg`, przyciski „pill”. Różowy tekst na ciemnych kartach rozjaśniony do
  `#E8507F`, a szary tekst stopki do `#b3b3b3` (WCAG AA)

## Polecenia

```bash
npm run build          # wersja robocza → dist/ (znaczniki DO UZUPEŁNIENIA widoczne na żółto)
npm run check          # build + skan Content Blacklist w dist/
npm run check:strict   # to co publikacja: błąd, dopóki zostały znaczniki lub brakuje danych z pkt 1–4
npm run serve          # podgląd: http://localhost:8080/pl/
npm run images         # eksport zdjęć z photos/ (wymaga: npm install --no-save sharp)
```

## Gdzie co zmieniać (jedno źródło prawdy)

| Plik | Zawartość |
| --- | --- |
| `data/business.json` | NAP, telefon, kod pocztowy, Place ID, link do Profilu Google, ID tagu Google, ogródek w sezonie / poza, ocena z Google |
| `data/hours.json` | godziny i wyjątki → tabela, status w Hero, schema, FAQ. `confirmed: true` + `exceptionsValidUntil` włączają status |
| `data/reviews.json` | 3 prawdziwe opinie z Google na wersję językową |
| `data/sitelinks.json` | linki do podstron (sitelinki) Google Ads, PL i EN – teksty, opisy, kotwice |
| `data/images.json` | zdjęcia F1…G2 (wypełnia `npm run images`) |
| `content/pl.mjs`, `content/en.mjs` | wszystkie teksty stron |
| `content/privacy.mjs` | polityka prywatności (szkic do weryfikacji) |
| `assets/styles.css` | tokeny marki (`:root`) i style |
| `assets/main.js` | status otwarcia, pomiar zdarzeń, baner zgód, mapa po kliknięciu, pasek mobilny |

Każde `todo()` w treści i każde `null` w danych to pozycja z listy „Otwarte kwestie” w specyfikacji.
`npm run build` wypisuje, ile ich zostało i które blokują publikację.

## Publikacja

Workflow `.github/workflows/pages.yml`: przy PR i pushu sprawdza build i Content Blacklist; z gałęzi `main`
publikuje na GitHub Pages **tylko gdy `check:strict` przechodzi**. Do zrobienia po stronie właściciela:

1. W ustawieniach repo: *Pages → Source: GitHub Actions*.
2. DNS: rekord `CNAME landing → <user>.github.io` u rejestratora gwar.bar; w Pages włączyć *Enforce HTTPS*.
3. GitHub Pages nie umie przekierowania 302 wg `Accept-Language` – `/` to lekka strona wyboru języka,
   która przekierowuje skryptem (z zachowaniem `?gclid=…`/UTM). Reklamy i tak kierują na `/pl/` i `/en/`.
   Na Netlify działa `_redirects` (302 wg języka), a `_headers` ustawia długi cache dla `/assets/*`
   (GitHub Pages ignoruje oba pliki i daje 10 min cache).

## Pomiar

Zdarzenia (`get_directions`, `click_to_call`, `reservation_click`, `address_click`, `maps_open`, `reviews_click`,
`language_switch`, `faq_open`) z parametrami `page_language` i `cta_location` trafiają do `dataLayer` przez `gtag`.
Consent Mode v2 domyślnie `denied`. Tag Google ładuje się dopiero po wpisaniu `ga4MeasurementId`
w `data/business.json` (Etap 3). Poza listą ze specyfikacji dodane są `cta_location`: `garden`
(przycisk trasy w sekcji Ogródek), `header` (ikona telefonu), `faq` (linki w odpowiedziach FAQ).

## Sitelinki Google Ads

`data/sitelinks.json` – 7 sitelinków na wersję językową (Google pokazuje pełny format od 6). Każdy kieruje do sekcji
landingu przez kotwicę, np. `https://landing.gwar.bar/pl/#rezerwacja`; `npm run check` wypisuje gotowe URL-e i pilnuje,
żeby kotwice istniały, teksty mieściły się w limitach (25 / 35 znaków) i nie zawierały słów z Content Blacklist.
Bez sitelinków „Menu”, „Cocktaile”, „Jedzenie” – landing nie ma takich sekcji, a te słowa łamią Content Blacklist.
Jeśli Google Ads odrzuci sitelinki jako duplikaty URL (różnią się tylko `#…`), dopisz parametr przed kotwicą,
np. `/pl/?sl=rezerwacja#rezerwacja` – strona go ignoruje.
