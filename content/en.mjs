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
    'A laid-back bar in Kazimierz, right by the Father Bernatek Footbridge. Two gardens, a room for up to 50, dogs welcome. Check hours and drop by!',
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
    sub: 'On Mostowa Street, right by the Father Bernatek Footbridge over the Vistula. In the area? Come on in!',
    bookLink: 'Want a table saved for you? Book here',
    features: ['Two gardens', 'Groups & birthdays up to 50', 'Dogs welcome'],
    photoAlt: 'The entrance to Bar Gwar at Mostowa Street 8 in Kazimierz',
  },

  how: {
    h2: 'How to find us',
    address: (b, postal) => `Mostowa Street 8, ${postal} Krakow – Kazimierz (the old Jewish Quarter)`,
    walkLabel: 'On foot:',
    intro: 'Easiest way: cross the Father Bernatek Footbridge to the Kazimierz side and walk up Mostowa Street – we’re at number 8.',
    landmarks: [
      {
        name: 'Father Bernatek Footbridge',
        text: 'The pedestrian bridge with the acrobat sculptures. From the bridge, turn into Mostowa Street and head for number 8 – that’s us.',
      },
      {
        name: 'Riverside boulevards and Podgórze',
        text: 'Strolling along the river or over in Podgórze? Cross the footbridge to the Kazimierz side and walk up Mostowa Street.',
      },
      {
        name: 'Mostowa Street',
        text: 'A few places share number 8 – look for the GWAR sign and come on in.',
      },
    ],
    photoAlt: 'The door and number 8 at the entrance to Bar Gwar, seen from the Mostowa Street pavement',
    photo2Alt: 'View along Mostowa Street towards Bar Gwar',
  },

  whatsHere: {
    h2: 'What you’ll find here',
    intro: 'A laid-back neighbourhood bar in Kazimierz. Coffee and lemonades from noon, snacks for the table, two gardens and a room for your crew.',
    tiles: [
      {
        title: 'Laid-back Kazimierz',
        text: 'A cosy spot on Mostowa Street, a short walk from the Father Bernatek Footbridge. Come as you are – no dress code.',
        photo: 'W1',
        alt: 'Inside Bar Gwar: tables in warm light',
      },
      {
        title: 'Two gardens',
        text: 'One on the street, one on the patio. Take your pick.',
        link: 'garden',
      },
      {
        title: 'During the day',
        text: 'From noon we brew Mott coffee and Ronnefeldt tea, plus lemonades. A nice break from sightseeing.',
        photo: 'W3',
        alt: 'A cup of coffee on a table in daylight',
      },
      {
        title: 'Snacks',
        text: 'Olives, nachos and other small bites for the table.',
      },
      {
        title: 'Groups & birthdays',
        text: 'Our room fits up to 50 people – birthdays, team nights or just a big group of friends.',
        link: 'booking',
      },
      {
        title: 'Order at the counter',
        text: 'Come up to the counter and tell us what you fancy – we’re happy to help you choose.',
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
    inSeason: 'Whenever the weather plays along, we sit outside. Pick from two gardens: at the front, right on Mostowa Street (8 tables), or on the patio (about 25 people, open until 22:00).',
    details: 'Want a guaranteed table outside? Book one on the patio – the front garden is first come, first served.',
    offSeason: 'Our gardens are resting until spring – it’s warm and cosy inside.',
    photo1Alt: 'Bar Gwar’s outdoor seating on Mostowa Street during the day',
    photo2Alt: 'Bar Gwar’s outdoor seating in the evening, tables under lights',
  },

  booking: {
    h2: 'Book a table, groups & birthdays',
    text: 'Birthday, team night or just a big group of friends? Book a table or the room and we’ll get back to you to confirm.',
    details: 'The room holds up to 50 people. Outside, we take bookings for the patio.',
    callText: 'Fancy coming today? Give us a call – it’s quickest.',
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
    all: 'Read all our Google reviews',
    note: 'Reviews come from Bar Gwar’s Google Business Profile; we don’t check whether reviewers have visited.',
  },

  faq: {
    h2: 'Got questions?',
    items: (c) => [
      ['Where is Bar Gwar?', `${c.address}, by the Father Bernatek Footbridge.`],
      ['How do I get there from the Father Bernatek Footbridge?', 'From the footbridge, turn into Mostowa Street and head for number 8. Look for the GWAR sign – that’s us.'],
      ['Do you have outdoor seating?', 'We’ve got two! One at the front on Mostowa Street (8 tables) and one on the patio (about 25 people, open until 22:00). We take bookings for the patio.'],
      ['Can I book a table?', `Sure – use our <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>booking form</a> or call us on <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Can we come as a larger group?', 'Absolutely! Our room fits up to 50 people – perfect for birthdays and team nights. Book it with the form or give us a call.'],
      ['Can I pay by card?', 'Yes, by card or phone.'],
      ['Are dogs welcome?', 'Of course – bring them along.'],
      ['Is the bar wheelchair accessible?', 'Sorry, not yet – there’s a step at the entrance. We do have a toilet on site.'],
      ['What are your opening hours?', c.hoursSentence],
      ['How do I order?', 'At the counter – come up, tell us what you fancy and we’ll happily help you choose.'],
      ['Is there Wi-Fi?', 'Yes, it’s free.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h]) => `${d}: ${h}`).join('; ') + '.',
  },

  map: {
    h2: 'Map, hours & contact',
    loadLabel: 'Show Google Maps',
    caption: 'A simple sketch of the area. Google Maps only loads when you click.',
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
    h2: 'See you on Mostowa Street',
    text: 'Drop by whenever you like – coffee, the garden and good company are waiting. Get directions, call us or book a table.',
  },

  footer: {
    privacy: 'Privacy & cookies',
    google: 'Bar Gwar on Google Maps',
    cookies: 'Cookie settings',
  },

  consent: {
    text: 'We’d like to know how people find us and whether our ads work. For that we need Google cookies – only if you say yes.',
    more: 'Details',
    accept: 'Accept',
    reject: 'Reject',
  },

  notFound: {
    title: 'Oops, nothing here',
  },
};
