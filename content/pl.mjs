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
    'Bar Gwar na Kazimierzu, przy Kładce Bernatka. Kawa od południa, dwa ogródki, sala na urodziny do 50 osób. Godziny, dojazd i rezerwacje.',
  ogImageAlt: 'Sala Bar Gwar: ceglana ściana, okrągłe lustro, zielona boazeria i stoliki',

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
    sub: (open) => `Przy samej Kładce Bernatka, nad Wisłą.${open ? ` Otwarte codziennie od ${open}.` : ''}`,
    bookLink: 'Zarezerwuj stolik',
    features: ['Dwa ogródki', 'Sala do 50 osób', 'Psy mile widziane'],
    photoAlt: 'Wejście do Bar Gwar przy ul. Mostowej 8 na Kazimierzu',
  },

  how: {
    h2: 'Jak do nas dojść',
    address: (b, postal) => `${b.streetAddress}, ${postal} ${b.addressLocality} (Kazimierz)`,
    walkLabel: 'Pieszo:',
    landmarks: [
      {
        name: 'Kładka Ojca Bernatka',
        text: 'Ta z akrobatami. Po stronie Kazimierza skręć w Mostową, my jesteśmy pod ósemką.',
      },
      {
        name: 'Bulwary wiślane i Podgórze',
        text: 'Przejdź kładką na Kazimierz i dalej ulicą Mostową.',
      },
      {
        name: 'Ulica Mostowa',
        text: 'Pod ósemką jest kilka lokali. Nasz ma szyld GWAR.',
      },
    ],
    photoAlt: 'Drzwi i numer 8 przy wejściu do Bar Gwar, widok z chodnika ul. Mostowej',
    photo2Alt: 'Widok wzdłuż ul. Mostowej w stronę Bar Gwar',
  },

  whatsHere: {
    h2: 'Co u nas znajdziesz',
    tiles: [
      {
        title: 'Na Kazimierzu',
        text: 'Niewielki bar przy Mostowej, kilka kroków od Kładki Bernatka. Bez dress code’u.',
        photo: 'W1',
        alt: 'Wnętrze Bar Gwar: sala ze stolikami w ciepłym świetle',
      },
      {
        title: 'Dwa ogródki',
        text: 'Jeden od ulicy, drugi na patio.',
        link: 'garden',
      },
      {
        title: 'Kawa od południa',
        text: 'Kawa Mott, herbata Ronnefeldt, lemoniady i napoje bezalkoholowe.',
        photo: 'W3',
        alt: 'Filiżanka kawy na stoliku w świetle dziennym',
      },
      {
        title: 'Przekąski',
        text: 'Oliwki, nachosy i inne drobne rzeczy do stolika.',
      },
      {
        title: 'Sala do 50 osób',
        text: 'Na urodziny, integrację albo większe spotkanie ze znajomymi.',
        link: 'booking',
      },
      {
        title: 'Zamawiasz przy barze',
        text: 'Podejdź i powiedz, na co masz ochotę. Jak nie wiesz, pomożemy wybrać.',
      },
    ],
    factsLabel: 'Udogodnienia',
    facts: [
      { icon: 'wifi', text: 'Wi-Fi za darmo' },
      { icon: 'dog', text: 'Psy mile widziane' },
      { icon: 'card', text: 'Karta i telefon' },
    ],
  },

  garden: {
    h2: 'Ogródek przy Mostowej',
    inSeason: 'Mamy dwa ogródki. Od frontu, przy ulicy, stoi 8 stolików. Na patio mieści się około 25 osób i siedzimy tam do 22:00.',
    details: 'Rezerwujemy tylko patio. Przed lokalem siadasz tam, gdzie jest wolne.',
    offSeason: 'Ogródki wrócą wiosną. Do tego czasu zapraszamy do środka.',
    photo1Alt: 'Ogródek Bar Gwar przy ul. Mostowej w ciągu dnia',
    photo2Alt: 'Ogródek Bar Gwar wieczorem, stoliki w świetle lamp',
  },

  booking: {
    h2: 'Rezerwacje, grupy i urodziny',
    text: 'Na urodziny i większe spotkania najlepiej zarezerwować. Wyślij zgłoszenie przez formularz, a my potwierdzimy rezerwację.',
    details: 'Sala mieści do 50 osób. Na zewnątrz rezerwujemy stoliki na patio.',
    callText: 'Jeśli chcesz przyjść jeszcze dziś, zadzwoń.',
    photoAlt: 'Sala Bar Gwar: ceglana ściana, okrągłe lustro, zielona boazeria i stoliki',
  },

  reviews: {
    h2: 'Co mówią goście',
    rating: (r) => `<strong>${r.rating} ★</strong> · ${r.count} opinii w Google (stan na ${r.readDate})`,
    month: (ym) => {
      const [y, m] = ym.split('-');
      return ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'][+m - 1] + ' ' + y;
    },
    viaGoogle: 'opinia w Google',
    all: 'Wszystkie opinie w Google',
    note: 'Opinie pochodzą z Profilu Firmy GWAR w Google; nie weryfikujemy, czy autorzy odwiedzili lokal.',
  },

  faq: {
    h2: 'Najczęstsze pytania',
    items: (c) => [
      ['Gdzie znajduje się GWAR?', `${c.address}, na Kazimierzu, przy Kładce Bernatka.`],
      ['Jak dojść z Kładki Bernatka?', 'Po stronie Kazimierza skręć w Mostową i idź do numeru 8. Szukaj szyldu GWAR.'],
      ['Czy GWAR ma ogródek?', 'Tak, dwa. Od frontu jest 8 stolików, na patio około 25 miejsc (do 22:00). Rezerwujemy tylko patio.'],
      ['Czy można zarezerwować miejsce?', `Tak, przez <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>formularz rezerwacji</a> albo telefonicznie: <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Czy można przyjść większą grupą?', 'Tak. Sala mieści do 50 osób. Najlepiej zarezerwuj ją wcześniej przez formularz albo telefonicznie.'],
      ['Czy można płacić kartą?', 'Tak, kartą i telefonem.'],
      ['Czy można przyjść z psem?', 'Tak, psy są mile widziane.'],
      ['Czy lokal jest dostępny dla wózków?', 'Niestety nie, przy wejściu jest próg. Toaleta jest w lokalu.'],
      ['W jakich godzinach jesteście otwarci?', c.hoursSentence],
      ['Jak zamawiać?', 'Przy barze. Nie mamy obsługi kelnerskiej.'],
      ['Czy macie Wi-Fi?', 'Tak, darmowe.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h], i) => `${i ? d.toLowerCase() : d} ${h}`).join(', ') + '.',
  },

  map: {
    h2: 'Mapa, godziny i kontakt',
    loadLabel: 'Pokaż mapę Google',
    caption: 'Szkic okolicy. Mapa Google ładuje się po kliknięciu.',
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
    h2: 'Do zobaczenia w środku',
    text: (open) => `Mostowa 8, Kazimierz.${open ? ` Codziennie od ${open}.` : ''}`,
  },

  footer: {
    privacy: 'Polityka prywatności i cookies',
    google: 'Bar Gwar w Mapach Google',
    cookies: 'Ustawienia cookies',
  },

  consent: {
    text: 'Za Twoją zgodą używamy cookies Google, żeby sprawdzać, skąd przychodzą goście i jak działają nasze reklamy.',
    more: 'Szczegóły',
    accept: 'Akceptuję',
    reject: 'Odrzuć',
  },

  notFound: {
    title: 'Tej strony nie ma',
  },
};
