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
    'Kameralny bar na Kazimierzu, tuż przy Kładce Ojca Bernatka. Dwa ogródki, sala na urodziny do 50 osób, psy mile widziane. Sprawdź godziny i wpadaj!',
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
    sub: 'Tuż przy Kładce Ojca Bernatka, nad samą Wisłą. Jesteś w okolicy? Wpadnij teraz!',
    bookLink: 'Wolisz mieć pewny stolik? Zarezerwuj',
    features: ['Dwa ogródki', 'Urodziny i grupy do 50 osób', 'Psy mile widziane'],
    photoAlt: 'Wejście do Bar Gwar przy ul. Mostowej 8 na Kazimierzu',
  },

  how: {
    h2: 'Jak do nas dojść',
    address: (b, postal) => `${b.streetAddress}, ${postal} ${b.addressLocality} (Kazimierz)`,
    walkLabel: 'Pieszo:',
    intro: 'Najprościej od Kładki Ojca Bernatka – stamtąd to dosłownie kilka kroków.',
    landmarks: [
      {
        name: 'Kładka Ojca Bernatka',
        text: 'Z kładki skręć w Mostową i idź do numeru 8 – to już my.',
      },
      {
        name: 'Bulwary wiślane i Podgórze',
        text: 'Spacerujesz bulwarami albo jesteś w Podgórzu? Przejdź kładką na stronę Kazimierza i dalej ul. Mostową.',
      },
      {
        name: 'Ulica Mostowa',
        text: 'Pod ósemką jest kilka lokali – wypatruj szyldu GWAR i wchodź śmiało.',
      },
    ],
    photoAlt: 'Drzwi i numer 8 przy wejściu do Bar Gwar, widok z chodnika ul. Mostowej',
    photo2Alt: 'Widok wzdłuż ul. Mostowej w stronę Bar Gwar',
  },

  whatsHere: {
    h2: 'Co u nas znajdziesz',
    tiles: [
      {
        title: 'Luz na Kazimierzu',
        text: 'Kameralne miejsce przy Mostowej, kilka kroków od Kładki Ojca Bernatka. Przyjdź, jak stoisz – dress code’u brak.',
        photo: 'W1',
        alt: 'Wnętrze Bar Gwar: sala ze stolikami w ciepłym świetle',
      },
      {
        title: 'Dwa ogródki',
        text: 'Jeden od ulicy, drugi na patio. Wybierz swój.',
        link: 'garden',
      },
      {
        title: 'W ciągu dnia',
        text: 'Od południa parzymy kawę Mott i herbatę Ronnefeldt, są też lemoniady i napoje bezalkoholowe. W sam raz na przerwę od zwiedzania.',
        photo: 'W3',
        alt: 'Filiżanka kawy na stoliku w świetle dziennym',
      },
      {
        title: 'Coś do chrupania',
        text: 'Oliwki, nachosy i inne małe przekąski – do stolika i do rozmowy.',
      },
      {
        title: 'Urodziny i większe ekipy',
        text: 'Sala mieści do 50 osób – na urodziny, integrację albo spotkanie całej paczki znajomych.',
        link: 'booking',
      },
      {
        title: 'Zamawiasz przy barze',
        text: 'Podejdź do baru i powiedz, na co masz ochotę – chętnie coś doradzimy.',
      },
    ],
    factsLabel: 'Udogodnienia',
    facts: [
      { icon: 'wifi', text: 'Darmowe Wi-Fi' },
      { icon: 'dog', text: 'Psy mile widziane' },
      { icon: 'card', text: 'Płacisz kartą lub telefonem' },
    ],
  },

  garden: {
    h2: 'Ogródek przy Mostowej',
    inSeason: 'Kiedy tylko pogoda pozwala, siadamy na zewnątrz. Do wyboru masz dwa ogródki: od frontu, przy samej Mostowej (8 stolików), albo na patio (ok. 25 osób, otwarte do 22:00).',
    details: 'Chcesz mieć pewny stolik na zewnątrz? Zarezerwuj go na patio – w ogródku od ulicy siadasz, gdzie jest wolne.',
    offSeason: 'Ogródki odpoczywają do wiosny – w środku jest ciepło i przytulnie.',
    photo1Alt: 'Ogródek Bar Gwar przy ul. Mostowej w ciągu dnia',
    photo2Alt: 'Ogródek Bar Gwar wieczorem, stoliki w świetle lamp',
  },

  booking: {
    h2: 'Rezerwacje, grupy i urodziny',
    text: 'Urodziny, integracja, a może po prostu większa paczka znajomych? Zarezerwuj stolik albo salę, a my odezwiemy się z potwierdzeniem.',
    details: 'Sala mieści do 50 osób. Na zewnątrz rezerwujemy stoliki na patio.',
    callText: 'Chcesz wpaść jeszcze dziś? Zadzwoń – tak będzie najszybciej.',
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
    all: 'Przeczytaj wszystkie opinie w Google',
    note: 'Opinie pochodzą z Profilu Firmy GWAR w Google; nie weryfikujemy, czy autorzy odwiedzili lokal.',
  },

  faq: {
    h2: 'Masz pytanie?',
    items: (c) => [
      ['Gdzie znajduje się GWAR?', `${c.address} – na Kazimierzu, tuż przy Kładce Ojca Bernatka.`],
      ['Jak dojść z Kładki Ojca Bernatka?', 'Z kładki skręć w Mostową i idź do numeru 8. Wypatruj szyldu GWAR – to my.'],
      ['Czy GWAR ma ogródek?', 'Mamy aż dwa! Od frontu, przy Mostowej (8 stolików), i na patio (ok. 25 osób, otwarte do 22:00). Stoliki rezerwujemy na patio.'],
      ['Czy można zarezerwować miejsce?', `Jasne – przez <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>formularz rezerwacji</a> albo telefonicznie: <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Czy można przyjść większą grupą?', 'Pewnie! Sala mieści do 50 osób – w sam raz na urodziny i integracje. Zarezerwuj ją przez formularz albo zadzwoń.'],
      ['Czy można płacić kartą?', 'Tak, kartą i telefonem.'],
      ['Czy można przyjść z psem?', 'Jasne, psy są u nas mile widziane.'],
      ['Czy lokal jest dostępny dla wózków?', 'Niestety nie – przy wejściu jest próg. Toaletę mamy na miejscu.'],
      ['W jakich godzinach jesteście otwarci?', c.hoursSentence],
      ['Jak zamawiać?', 'Przy barze – podejdź śmiało, powiedz, na co masz ochotę, a my chętnie doradzimy.'],
      ['Czy macie Wi-Fi?', 'Tak, i to darmowe.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h]) => `${d}: ${h}`).join('; ') + '.',
  },

  map: {
    h2: 'Mapa, godziny i kontakt',
    loadLabel: 'Pokaż mapę Google',
    caption: 'Uproszczony szkic okolicy. Mapa Google ładuje się dopiero po kliknięciu.',
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
    text: 'Wpadaj, kiedy masz ochotę – kawa, ogródek i dobre towarzystwo czekają. Wyznacz trasę, zadzwoń albo zarezerwuj stolik.',
  },

  footer: {
    privacy: 'Polityka prywatności i cookies',
    google: 'Bar Gwar w Mapach Google',
    cookies: 'Ustawienia cookies',
  },

  consent: {
    text: 'Chcemy wiedzieć, jak do nas trafiasz i czy nasze reklamy działają. Do tego potrzebne są pliki cookies Google – tylko jeśli się zgodzisz.',
    more: 'Szczegóły',
    accept: 'Akceptuję',
    reject: 'Odrzuć',
  },

  notFound: {
    title: 'Ups, tej strony tu nie ma',
  },
};
