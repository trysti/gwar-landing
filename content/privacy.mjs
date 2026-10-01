// Privacy & cookies policy. Draft – to be reviewed by the owner (and ideally a lawyer)
// before publishing; controller details are marked todo().

export const pl = (b) => ({
  title: 'Polityka prywatności i cookies – Bar Gwar',
  description: 'Jak Bar Gwar przetwarza dane osobowe i używa plików cookies na stronie landing.gwar.bar.',
  html: `<h1>Polityka prywatności i cookies</h1>
<h2>Administrator danych</h2>
<p>Administratorem danych osobowych jest T&amp;K Investment spółka z ograniczoną odpowiedzialnością, z siedzibą przy ul. Św. Łazarza 3/2, 31-530 Kraków, wpisana do rejestru przedsiębiorców KRS pod numerem 0001029689, NIP: 6751780846, REGON: 524976310 (dalej: „Administrator”).</p>
<p>Administrator prowadzi lokal ${b.name}, ${b.streetAddress}, ${b.postalCode} ${b.addressLocality}. Kontakt: <a href="tel:${b.telephone}">${b.telephoneDisplay}</a>${b.email ? `, <a href="mailto:${b.email}">${b.email}</a>` : ''}.</p>
<h2>Jakie dane zbiera ta strona</h2>
<ul>
<li><strong>Bez Twojej zgody</strong> strona nie zapisuje plików cookies analitycznych ani reklamowych. Zapamiętujemy jedynie Twój wybór w banerze zgód (w pamięci przeglądarki).</li>
<li><strong>Za Twoją zgodą</strong> używamy narzędzi Google (Google Analytics 4, Google Ads), aby wiedzieć, ile osób odwiedza stronę i klika „Wyznacz trasę”, „Zadzwoń” lub „Zarezerwuj”. Google może zapisywać pliki cookies i przetwarzać m.in. adres IP, informacje o urządzeniu i przeglądarce. Bez zgody tagi Google działają w trybie ograniczonym (Consent Mode) i nie zapisują cookies.</li>
<li><strong>Mapa Google</strong> ładuje się dopiero po kliknięciu. Wtedy Google może zapisać własne pliki cookies zgodnie ze swoją polityką prywatności.</li>
</ul>
<p>Na tej stronie nie ma formularzy. Nie przekazujemy do analityki żadnych danych, które wpisujesz w formularzu rezerwacji.</p>
<h2>Rezerwacje</h2>
<p>Przycisk „Zarezerwuj” prowadzi do formularza na stronie <a href="${b.reservationUrl}">bar.gwar.bar</a>. Dane z formularza (imię i nazwisko, data, godzina, liczba osób, e-mail, telefon, uwagi) przetwarzamy wyłącznie w celu obsługi rezerwacji (art. 6 ust. 1 lit. b RODO) i przechowujemy je tylko przez czas potrzebny do jej obsługi.</p>
<h2>Podstawa prawna i okres przechowywania</h2>
<p>Analityka i reklamy: Twoja zgoda (art. 6 ust. 1 lit. a RODO), którą możesz w każdej chwili wycofać przyciskiem „Ustawienia cookies” w stopce strony. Dane w Google Analytics przechowujemy przez 2 miesiące (ustawienie domyślne).</p>
<h2>Odbiorcy danych</h2>
<p>Google Ireland Limited (Google Analytics, Google Ads, Mapy Google). Dane mogą być przekazywane do USA na podstawie decyzji Komisji Europejskiej w sprawie odpowiedniego stopnia ochrony (EU-US Data Privacy Framework).</p>
<h2>Twoje prawa</h2>
<p>Masz prawo do dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz cofnięcia zgody w dowolnym momencie. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</p>
<p><a href="/pl/">← Wróć na stronę główną</a></p>`,
});

export const en = (b) => ({
  title: 'Privacy & cookies – Bar Gwar',
  description: 'How Bar Gwar handles personal data and cookies on landing.gwar.bar.',
  html: `<h1>Privacy &amp; cookies</h1>
<h2>Who we are</h2>
<p>The data controller is T&amp;K Investment spółka z ograniczoną odpowiedzialnością, ul. Św. Łazarza 3/2, 31-530 Krakow, Poland, entered in the National Court Register (KRS) under no. 0001029689, tax ID (NIP) 6751780846, REGON 524976310, which runs ${b.name}, Mostowa Street 8, Krakow, Poland. Contact: <a href="tel:${b.telephone}">${b.telephoneDisplay}</a>${b.email ? `, <a href="mailto:${b.email}">${b.email}</a>` : ''}.</p>
<h2>What this site collects</h2>
<ul>
<li><strong>Without your consent</strong> this site sets no analytics or advertising cookies. We only remember your choice in the cookie banner (in your browser’s storage).</li>
<li><strong>With your consent</strong> we use Google tools (Google Analytics 4, Google Ads) to see how many people visit and tap “Get directions”, “Call us” or “Book a table”. Google may set cookies and process data such as your IP address and device and browser details. Without consent, Google tags run in a restricted mode (Consent Mode) and set no cookies.</li>
<li><strong>Google Maps</strong> loads only after you click it. Google may then set its own cookies under its privacy policy.</li>
</ul>
<p>There are no forms on this site. Nothing you type into the booking form is sent to analytics.</p>
<h2>Bookings</h2>
<p>“Book a table” takes you to the form on <a href="${b.reservationUrl}">bar.gwar.bar</a>. We use what you enter there (name, date, time, party size, email, phone, notes) only to handle your booking (Art. 6(1)(b) GDPR) and keep it only as long as needed to handle it.</p>
<h2>Legal basis and retention</h2>
<p>Analytics and ads: your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time with “Cookie settings” in the footer. Google Analytics keeps data for 2 months (the default setting).</p>
<h2>Who receives the data</h2>
<p>Google Ireland Limited (Google Analytics, Google Ads, Google Maps). Data may be transferred to the USA under the European Commission’s adequacy decision (EU-US Data Privacy Framework).</p>
<h2>Your rights</h2>
<p>You can ask for access, correction, deletion, restriction, portability, object to processing and withdraw consent at any time. You can also complain to the Polish data protection authority (Prezes UODO, ul. Stawki 2, 00-193 Warsaw).</p>
<p><a href="/en/">← Back to the main page</a></p>`,
});
