# CLAUDE.md

Landing page Bar Gwar (Mostowa 8, Kazimierz, Kraków) pod kampanie Google Ads → `landing.gwar.bar`.
Statyczny generator w Node ≥ 20, **zero zależności**. Szczegóły dla ludzi: `README.md`.

## Polecenia

```bash
npm run check          # build roboczy + skan Content Blacklist – uruchom po KAŻDEJ zmianie, przed commitem
npm run check:strict   # bramka publikacji (CI na main): błąd, dopóki są znaczniki todo() lub brak danych pkt 1–4
npm run serve          # podgląd dist/ na http://localhost:8080/pl/ (najpierw build)
npm run images         # photos/ → assets/img/ + data/images.json (wymaga: npm install --no-save sharp)
```

Nie ma testów jednostkowych ani lintera – `npm run check` jest testem. Hook w `.claude/settings.json`
uruchamia go automatycznie po każdej edycji w `content/`, `data/`, `src/`, `assets/`, `scripts/`. CI (`.github/workflows/pages.yml`)
uruchamia `check` przy każdym PR/pushu, a deploy na GitHub Pages tylko z `main` i tylko gdy przejdzie `check:strict`.
Na gałęziach roboczych `check:strict` może nie przechodzić (otwarte kwestie) – to normalne, nie „naprawiaj” tego
wymyślaniem danych.

## Architektura

`data/*.json` + `content/*.mjs` + `assets/` → `scripts/build.mjs` → `dist/` (generowany, w `.gitignore`).

| Gdzie | Co |
| --- | --- |
| `data/business.json` | NAP, telefon, Place ID, link do Profilu Google, ID tagu Google, ogródek, ocena z Google |
| `data/hours.json` | godziny i wyjątki → tabela, status w Hero, schema, FAQ (`src/hours.mjs` waliduje i wylicza) |
| `data/reviews.json` | prawdziwe opinie z Google, 3 na język |
| `data/images.json` | zdjęcia – zapisuje `npm run images`, nie edytuj ręcznie |
| `content/pl.mjs`, `content/en.mjs` | wszystkie teksty stron (ta sama struktura kluczy) |
| `content/privacy.mjs` | polityka prywatności |
| `src/render.mjs` | szablony HTML, schema.org, `<head>` z Consent Mode |
| `src/todo.mjs` | `todo(label)` – żółty znacznik „DO UZUPEŁNIENIA”, blokuje `--strict` |
| `assets/styles.css` | tokeny marki w `:root` + style |
| `assets/main.js` | jedyny skrypt: status otwarcia, zdarzenia `gtag`, baner zgód, mapa po kliknięciu, pasek mobilny |

Każdy fakt ma jedno źródło – zmieniaj go tam, nie w szablonie ani w `dist/`.

## Twarde zasady

1. **Content Blacklist.** Żadnych treści alkoholowych ani promocyjnych – nigdzie: tekst, `alt`, meta, schema,
   nazwy plików, komentarze trafiające do `dist/`. Lista rdzeni jest w `scripts/check-content.mjs`
   (drink, piwo/beer, wino/wine, wódka, koktajl, shot, happy hour, promocja, instagram, facebook…).
   Unikaj też parafraz i sugestii, których regex nie złapie. W schema bez `Menu`, `Review`, `AggregateRating`, `Offer`.
   Nie dopisuj wyjątków do `ALLOW`, żeby przepchnąć tekst.
2. **Nie zmyślaj danych.** Brakująca informacja zostaje `null` w `data/` albo `todo('…')` w treści.
   Dotyczy zwłaszcza: godzin (`confirmed`, `exceptionsValidUntil`), kodu pocztowego, Place ID, linków Google,
   oceny/liczby opinii oraz `reviews.json` – tylko prawdziwe opinie z Profilu Google (bez wzmianek o alkoholu).
3. **PL i EN zawsze razem.** Zmiana treści w `pl.mjs` = odpowiednia zmiana w `en.mjs` (te same klucze, ta sama
   kolejność). Ton: prosty, naturalny, przyjazny; akapity do 3 zdań. EN nie jest dosłownym tłumaczeniem.
4. **Zero zależności.** Nie dodawaj pakietów do `package.json`. `sharp` tylko jako `npm install --no-save sharp`.
5. **Działa bez JavaScriptu.** JS (`assets/main.js`, ES5, IIFE) tylko ulepsza stronę – treść i linki
   muszą działać bez niego.
6. **Zgody.** Consent Mode v2 domyślnie `denied` (`src/render.mjs`) – nie zmieniaj domyślnych wartości.
   Nowe CTA mierz atrybutami `data-ev` / `data-cta`; nazwy zdarzeń i `cta_location` są wypisane w README → Pomiar.
7. **Dostępność i marka.** Kolory tylko z tokenów w `:root`; kontrast WCAG AA (dlatego `#E8507F` na ciemnych
   kartach i `#b3b3b3` w stopce). Nagłówki Jean-Luc, tekst Helvetica, przyciski „pill”.
8. **Nie edytuj `dist/`** ani wygenerowanych plików w `assets/img/` – zmień źródło i przebuduj.

## Konwencje

- ESM (`.mjs`), tylko moduły `node:*`. Komentarze w kodzie po angielsku, treści i README po polsku.
- Commity: krótki tryb rozkazujący po angielsku (np. „Reword booking section copy”).
- Zmiany wizualne sprawdź w przeglądarce (`npm run serve`), na mobile i desktopie, w obu językach.
