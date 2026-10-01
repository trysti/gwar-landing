// English version. Written for a visitor who is in Krakow right now and doesn't know Polish
// place names; British spelling; same Content Blacklist as /pl/ (no alcohol content).
import { todo } from '../src/todo.mjs';

export default {
  lang: 'en',
  locale: 'en_GB',
  path: '/en/',
  privacyPath: '/en/privacy/',

  title: 'Bar Gwar – Bar in Kazimierz, Krakow · Mostowa Street 8',
  description:
    'Bar Gwar in Kazimierz, by the Father Bernatek Footbridge. Coffee from noon, two gardens, a room for up to 50. Hours, directions and bookings.',
  ogImageAlt: 'Inside Bar Gwar: brick wall, round mirror, green panelling and tables',

  anchors: {
    directions: 'directions',
    whatsHere: 'whats-here',
    garden: 'garden',
    booking: 'booking',
    reviews: 'reviews',
    faq: 'faq',
    map: 'map',
  },

  ui: {
    skip: 'Skip to content',
    home: 'Bar Gwar – home',
    otherLang: 'PL',
    otherLangLabel: 'Wersja polska',
    callIconLabel: 'Call us',
    directions: 'Get directions',
    call: 'Call us',
    book: 'Book a table',
    bookingNote: 'Booking form opens on our main site (switch to EN in the top bar).',
    stickyLabel: 'Quick actions',
    photoTodo: (id) => todo(`Photo ${id} – TO BE SUPPLIED`),
    newTab: '(opens in a new tab)',
  },

  days: {
    mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
  },
  dayRange: (a, b) => `${a}–${b}`,
  hoursFallbackRows: ['Monday–Thursday', 'Friday–Saturday', 'Sunday'],
  closedLabel: 'Closed',
  hoursTodo: todo('TO BE CONFIRMED'),
  formatTime: (t) => (t === '00:00' ? '00:00 (midnight)' : t),

  status: {
    openUntil: 'Open until {t}',
    opensToday: 'Closed · opens today at {t}',
    opensTomorrow: 'Closed · opens tomorrow at {t}',
    closed: 'Closed',
  },

  hero: {
    h1: 'Bar Gwar – a bar in Kazimierz, Krakow',
    sub: (open) => `On Mostowa Street, right by the Father Bernatek Footbridge over the Vistula.${open ? ` Open daily from ${open}.` : ''}`,
    bookLink: 'Book a table',
    features: ['Two gardens', 'Room for up to 50', 'Dogs welcome'],
    photoAlt: 'The entrance to Bar Gwar at Mostowa Street 8 in Kazimierz',
  },

  how: {
    h2: 'How to find us',
    address: (b, postal) => `Mostowa Street 8, ${postal} Krakow – Kazimierz (the old Jewish Quarter)`,
    walkLabel: 'On foot:',
    landmarks: [
      {
        name: 'Father Bernatek Footbridge',
        text: 'The one with the acrobat sculptures. On the Kazimierz side, turn into Mostowa Street. We’re at number 8.',
      },
      {
        name: 'Riverside boulevards and Podgórze',
        text: 'Cross the footbridge to Kazimierz and carry on along Mostowa Street.',
      },
      {
        name: 'Mostowa Street',
        text: 'A few places share number 8. Ours has the GWAR sign.',
      },
    ],
    photoAlt: 'The door and number 8 at the entrance to Bar Gwar, seen from the Mostowa Street pavement',
    photo2Alt: 'View along Mostowa Street towards Bar Gwar',
  },

  whatsHere: {
    h2: 'What you’ll find here',
    intro: 'A small neighbourhood bar in Kazimierz. Coffee from noon, snacks, two gardens and a room for groups.',
    tiles: [
      {
        title: 'In Kazimierz',
        text: 'A small bar on Mostowa Street, a short walk from the Father Bernatek Footbridge. No dress code.',
        photo: 'W1',
        alt: 'Inside Bar Gwar: tables in warm light',
      },
      {
        title: 'Two gardens',
        text: 'One on the street, one on the patio.',
        link: 'garden',
      },
      {
        title: 'Coffee from noon',
        text: 'Mott coffee, Ronnefeldt tea and lemonades.',
        photo: 'W3',
        alt: 'A cup of coffee on a table in daylight',
      },
      {
        title: 'Snacks',
        text: 'Olives, nachos and other small bits for the table.',
      },
      {
        title: 'Room for up to 50',
        text: 'For birthdays, work get-togethers or a big group of friends.',
        link: 'booking',
      },
      {
        title: 'Order at the counter',
        text: 'Tell us what you fancy. Not sure? We’ll help you pick.',
      },
    ],
    factsLabel: 'Good to know',
    facts: [
      { icon: 'wifi', text: 'Free Wi-Fi' },
      { icon: 'dog', text: 'Dogs welcome' },
      { icon: 'card', text: 'Card and phone payments' },
    ],
  },

  garden: {
    h2: 'Outdoor seating on Mostowa Street',
    inSeason: 'We have two gardens. The front one, on the street, has 8 tables. The patio fits about 25 people and is open until 22:00.',
    details: 'You can book the patio. Out front, just take any free table.',
    offSeason: 'The gardens are back in spring. Until then, come inside.',
    photo1Alt: 'Bar Gwar’s outdoor seating on Mostowa Street during the day',
    photo2Alt: 'Bar Gwar’s outdoor seating in the evening, tables under lights',
  },

  booking: {
    h2: 'Book a table, groups & birthdays',
    text: 'For birthdays and bigger groups it’s best to book. Send a request through the form and we’ll confirm.',
    details: 'The room holds up to 50 people. Outside, we take bookings for the patio.',
    callText: 'Want to come today? Give us a call.',
    photoAlt: 'Inside Bar Gwar: brick wall, round mirror, green panelling and tables',
  },

  reviews: {
    h2: 'What guests say',
    rating: (r) => `<strong>${r.rating.replace(',', '.')} ★</strong> · ${r.count.replace(' ', ',')} Google reviews (as of ${r.readDate.split('.').reverse().join('-')})`,
    month: (ym) => {
      const [y, m] = ym.split('-');
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m - 1] + ' ' + y;
    },
    viaGoogle: 'review on Google',
    all: 'All reviews on Google',
    note: 'Reviews come from Bar Gwar’s Google Business Profile; we don’t check whether reviewers have visited.',
  },

  faq: {
    h2: 'FAQ',
    items: (c) => [
      ['Where is Bar Gwar?', `${c.address}, by the Father Bernatek Footbridge.`],
      ['How do I get there from the Father Bernatek Footbridge?', 'On the Kazimierz side, turn into Mostowa Street and walk to number 8. Look for the GWAR sign.'],
      ['Do you have outdoor seating?', 'Yes, two. 8 tables out front and about 25 seats on the patio (until 22:00). Only the patio can be booked.'],
      ['Can I book a table?', `Yes, through our <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>booking form</a> or by phone: <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Can we come as a larger group?', 'Yes. The room holds up to 50 people. Best to book ahead through the form or by phone.'],
      ['Can I pay by card?', 'Yes, by card or phone.'],
      ['Are dogs welcome?', 'Yes, dogs are welcome.'],
      ['Is the bar wheelchair accessible?', 'Sorry, no. There’s a step at the entrance. There is a toilet inside.'],
      ['What are your opening hours?', c.hoursSentence],
      ['How do I order?', 'At the bar. There’s no table service.'],
      ['Is there Wi-Fi?', 'Yes, it’s free.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h]) => `${d} ${h}`).join(', ') + '.',
  },

  map: {
    h2: 'Map, hours & contact',
    loadLabel: 'Show Google Maps',
    caption: 'Sketch of the area. Google Maps loads when you click.',
    iframeTitle: 'Google Maps: Bar Gwar, Mostowa Street 8, Krakow',
    addressH: 'Address',
    phoneH: 'Phone',
    emailH: 'Email',
    hoursH: 'Opening hours',
    openInMaps: 'Open in Google Maps',
    river: 'Vistula',
    bridge: 'Father Bernatek Footbridge',
    north: 'Kazimierz',
    south: 'Podgórze',
  },

  final: {
    h2: 'See you inside',
    text: (open) => `Mostowa Street 8, Kazimierz.${open ? ` Open daily from ${open}.` : ''}`,
  },

  footer: {
    privacy: 'Privacy & cookies',
    google: 'Bar Gwar on Google Maps',
    cookies: 'Cookie settings',
  },

  consent: {
    text: 'With your consent we use Google cookies to see how people find us and how our ads are doing.',
    more: 'Details',
    accept: 'Accept',
    reject: 'Reject',
  },

  notFound: {
    title: 'This page doesn’t exist',
  },
};
