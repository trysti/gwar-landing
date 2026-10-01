// Treść wersji polskiej. Zasady: CONTENT BLACKLIST ze specyfikacji (zero treści alkoholowych),
// akapity do 3 zdań. Miejsca oznaczone todo() muszą zostać uzupełnione przed publikacją.
import { todo } from '../src/todo.mjs';

export default {
  lang: 'pl',
  locale: 'pl_PL',
  path: '/pl/',
  privacyPath: '/pl/polityka-prywatnosci/',

  title: 'Bar Gwar – bar na Kazimierzu, Mostowa 8, Kraków',
  description:
    'Bar przy Kładce Ojca Bernatka na Kazimierzu. Ogródek, sala na urodziny i rezerwacje. Sprawdź godziny i wyznacz trasę.',
  ogImageAlt: 'Fasada Bar Gwar przy ul. Mostowej 8 na Kazimierzu',

  anchors: {
    directions: 'trasa',
    whatsHere: 'oferta',
    garden: 'ogrodek',
    booking: 'rezerwacja',
    reviews: 'opinie',
    faq: 'faq',
    map: 'mapa',
  },

  ui: {
    skip: 'Przejdź do treści',
    home: 'Bar Gwar – strona główna',
    otherLang: 'EN',
    otherLangLabel: 'English version',
    callIconLabel: 'Zadzwoń',
    directions: 'Wyznacz trasę',
    call: 'Zadzwoń',
    book: 'Zarezerwuj',
    bookingNote: '',
    stickyLabel: 'Szybkie akcje',
    photoTodo: (id) => todo(`Zdjęcie ${id} – DO UZUPEŁNIENIA`),
    newTab: '(otwiera się w nowej karcie)',
  },

  days: {
    mon: 'Poniedziałek', tue: 'Wtorek', wed: 'Środa', thu: 'Czwartek', fri: 'Piątek', sat: 'Sobota', sun: 'Niedziela',
  },
  dayRange: (a, b) => `${a}–${b.toLowerCase()}`,
  hoursFallbackRows: ['Poniedziałek–czwartek', 'Piątek–sobota', 'Niedziela'],
  closedLabel: 'Zamknięte',
  hoursTodo: todo('DO UZUPEŁNIENIA'),
  formatTime: (t) => t,

  status: {
    openUntil: 'Otwarte do {t}',
    opensToday: 'Zamknięte · otwieramy dziś o {t}',
    opensTomorrow: 'Zamknięte · otwieramy jutro o {t}',
    closed: 'Zamknięte',
  },

  hero: {
    h1: 'Bar Gwar – bar na Kazimierzu, Mostowa 8',
    sub: 'Tuż przy Kładce Ojca Bernatka, nad Wisłą. Wpadnij teraz.',
    bookLink: 'Zarezerwuj stolik',
    features: ['Ogródek', 'Grupy i urodziny', 'Rezerwacje'],
    photoAlt: 'Wejście do Bar Gwar przy ul. Mostowej 8 na Kazimierzu',
  },

  how: {
    h2: 'Jak do nas dojść',
    address: (b, postal) => `${b.streetAddress}, ${postal} ${b.addressLocality} (Kazimierz)`,
    walkLabel: 'Pieszo:',
    landmarks: [
      {
        name: 'Kładka Ojca Bernatka',
        text: 'Z kładki skręć w ul. Mostową i idź do numeru 8.',
      },
      {
        name: 'Bulwary wiślane i Podgórze',
        text: 'Przejdź kładką na stronę Kazimierza i idź ul. Mostową.',
      },
      {
        name: 'Ulica Mostowa',
        text: 'Szukaj szyldu GWAR pod numerem 8. Pod tym adresem są też inne lokale – wejdź tam, gdzie szyld GWAR.',
      },
    ],
    photoAlt: 'Drzwi i numer 8 przy wejściu do Bar Gwar, widok z chodnika ul. Mostowej',
    photo2Alt: 'Widok wzdłuż ul. Mostowej w stronę Bar Gwar',
  },

  whatsHere: {
    h2: 'Co u nas znajdziesz',
    tiles: [
      {
        title: 'Miejsce na Kazimierzu',
        text: `Kameralny bar przy Mostowej, kilka kroków od Kładki Ojca Bernatka. Swobodna atmosfera.`,
        photo: 'W1',
        alt: 'Wnętrze Bar Gwar: sala ze stolikami w ciepłym świetle',
      },
      {
        title: 'Ogródek',
        text: 'Stoliki na zewnątrz – szczegóły w sekcji Ogródek.',
        link: 'garden',
      },
      {
        title: 'W ciągu dnia',
        text: 'Od południa kawa Mott, herbata Ronnefeldt, lemoniady i napoje bezalkoholowe.',
        photo: 'W3',
        alt: 'Filiżanka kawy na stoliku w świetle dziennym',
      },
      {
        title: 'Grupy i urodziny',
        text: 'Większa grupa? Mamy salę na urodziny i integracje.',
        link: 'booking',
      },
      {
        title: 'Zamawiasz przy barze',
        text: 'U nas zamawia się przy barze – podejdź, załoga pomoże wybrać.',
      },
    ],
  },

  garden: {
    h2: 'Ogródek przy Mostowej',
    inSeason: 'W ciepłe dni siadamy na zewnątrz, przy samej ulicy Mostowej.',
    offSeason: 'Ogródek wraca wiosną – w środku czeka ciepłe wnętrze.',
    photo1Alt: 'Ogródek Bar Gwar przy ul. Mostowej w ciągu dnia',
    photo2Alt: 'Ogródek Bar Gwar wieczorem, stoliki w świetle lamp',
  },

  booking: {
    h2: 'Rezerwacje, grupy i urodziny',
    text: 'Przychodzisz większą grupą albo planujesz urodziny? Zarezerwuj stolik lub salę – odezwiemy się z potwierdzeniem.',
    callText: 'Rezerwacja na dziś? Najszybciej telefonicznie.',
    photoAlt: 'Sala w Bar Gwar przygotowana dla grupy',
  },

  reviews: {
    h2: 'Co mówią goście',
    rating: (r) => `<strong>${r.rating} ★</strong> · ${r.count} opinii w Google (stan na ${r.readDate})`,
    month: (ym) => {
      const [y, m] = ym.split('-');
      return ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'][+m - 1] + ' ' + y;
    },
    viaGoogle: 'opinia w Google',
    all: 'Zobacz wszystkie opinie w Google',
    note: 'Opinie pochodzą z Profilu Firmy GWAR w Google; nie weryfikujemy, czy autorzy odwiedzili lokal.',
  },

  faq: {
    h2: 'Najczęstsze pytania',
    items: (c) => [
      ['Gdzie znajduje się GWAR?', `${c.address} – na Kazimierzu, przy Kładce Ojca Bernatka.`],
      ['Jak dojść z Kładki Ojca Bernatka?', 'Z kładki skręć w ul. Mostową i idź do numeru 8 – szukaj szyldu GWAR.'],
      ['Czy GWAR ma ogródek?', 'Tak, mamy ogródek przy Mostowej.'],
      ['Czy można zarezerwować miejsce?', `Tak – przez <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>formularz rezerwacji</a> lub telefonicznie pod numerem <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Czy można przyjść większą grupą?', 'Tak, przyjmujemy grupy i organizujemy urodziny w sali. Zarezerwuj ją przez formularz albo zadzwoń.'],
      ['W jakich godzinach jesteście otwarci?', c.hoursSentence],
      ['Jak zamawiać?', 'Zamawiasz przy barze – jesteśmy lokalem samoobsługowym.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h]) => `${d}: ${h}`).join('; ') + '.',
  },

  map: {
    h2: 'Mapa, godziny i kontakt',
    loadLabel: 'Kliknij, aby załadować mapę Google',
    caption: 'Schemat poglądowy. Mapa Google ładuje się dopiero po kliknięciu.',
    iframeTitle: 'Mapa Google: Bar Gwar, Mostowa 8, Kraków',
    addressH: 'Adres',
    phoneH: 'Telefon',
    emailH: 'E-mail',
    hoursH: 'Godziny otwarcia',
    openInMaps: 'Otwórz w Mapach Google',
    river: 'Wisła',
    bridge: 'Kładka Ojca Bernatka',
    north: 'Kazimierz',
    south: 'Podgórze',
  },

  final: {
    h2: 'Do zobaczenia na Mostowej',
    text: 'Bar Gwar – Mostowa 8, Kazimierz. Wyznacz trasę, zadzwoń albo zarezerwuj stolik.',
  },

  footer: {
    privacy: 'Polityka prywatności i cookies',
    google: 'Bar Gwar w Mapach Google',
    cookies: 'Ustawienia cookies',
  },

  consent: {
    text: 'Używamy plików cookies Google do analizy ruchu i mierzenia skuteczności reklam – tylko za Twoją zgodą.',
    more: 'Szczegóły',
    accept: 'Akceptuję',
    reject: 'Odrzuć',
  },

  notFound: {
    title: 'Nie ma takiej strony',
  },
};
