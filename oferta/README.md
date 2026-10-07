# ofertafirmowa.gwar.bar

Oferta dla firm Bar Gwar: wigilie, integracje, wynajem na wyłączność, z koktajlami jako główną pozycją.

**Osobna strona, poza landingiem.** `landing.gwar.bar` ma Content Blacklist (zero alkoholu) i build w `dist/`.
Ten katalog nie trafia do `dist/` ani do skanu `npm run check`, a strona ma `noindex` i nie jest podpinana pod Google Ads.

- statyczny HTML, jeden plik `index.html`, bez buildu; animacje: GSAP 3.13 (ScrollTrigger, SplitText) w `vendor/`
  (darmowa licencja „Standard no-charge” GSAP, także do użytku komercyjnego)
- `media/` – zdjęcia z sesji (Drive „photo”) w WebP 800/1600 px, `bar-loop.mp4` – 4 klipy z barmanem (Drive „video”)
- krój Jean-Luc i kolory marki jak na landingu; logo wstawione inline (kolor `--cream`)

Podgląd lokalnie: `cd oferta && python3 -m http.server 8090` → http://localhost:8090/

## Do uzupełnienia (żółte znaczniki na stronie)

- karta koktajli: nazwy i składy z „Menu Firmowe GWAR” (Claude Design)
- pakiety: skład i ceny
- e-mail do ofert, `LEAD_EMAIL` w skrypcie na dole `index.html` (formularz składa gotową wiadomość do wysłania mailem; brak backendu)
- czas odpowiedzi, zaliczka, faktura VAT, catering, obsługa na eventach, tort/dekoracje, warsztaty koktajlowe
- link do polityki prywatności

## Publikacja na ofertafirmowa.gwar.bar

GitHub Pages obsługuje jedną domenę na repozytorium (tu: landing). Najprościej: osobne repo z zawartością tego katalogu
+ Pages + `CNAME` z `ofertafirmowa.gwar.bar`, albo Netlify / Cloudflare Pages z katalogiem `oferta/`.
DNS: rekord `CNAME ofertafirmowa → …` u rejestratora gwar.bar.
