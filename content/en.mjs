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
    'A relaxed bar in Kazimierz by the Father Bernatek Footbridge. Outdoor seating, groups and table bookings. Check hours and get directions.',
  ogImageAlt: 'The front of Bar Gwar at Mostowa Street 8 in Kazimierz, Krakow',

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
    sub: 'On Mostowa Street, right by the Father Bernatek Footbridge over the Vistula. Drop by now.',
    bookLink: 'Book a table',
    features: ['Outdoor seating', 'Groups & birthdays', 'Table bookings'],
    photoAlt: 'The entrance to Bar Gwar at Mostowa Street 8 in Kazimierz',
  },

  how: {
    h2: 'How to find us',
    address: (b, postal) => `Mostowa Street 8, ${postal} Krakow – Kazimierz (the old Jewish Quarter)`,
    walkLabel: 'On foot:',
    intro: `Cross the Father Bernatek Footbridge to the Kazimierz side and walk up Mostowa Street – we’re at number 8.`,
    landmarks: [
      {
        name: 'Father Bernatek Footbridge',
        text: 'The pedestrian bridge with acrobat sculptures. From the bridge, turn into Mostowa Street and walk to number 8.',
      },
      {
        name: 'Riverside boulevards and Podgórze',
        text: 'Cross the footbridge to the Kazimierz side and walk up Mostowa Street.',
      },
      {
        name: 'Mostowa Street',
        text: 'Look for the GWAR sign at number 8. Other venues share this address – go in under the GWAR sign.',
      },
    ],
    photoAlt: 'The door and number 8 at the entrance to Bar Gwar, seen from the Mostowa Street pavement',
    photo2Alt: 'View along Mostowa Street towards Bar Gwar',
  },

  whatsHere: {
    h2: 'What you’ll find here',
    intro: 'A relaxed neighbourhood bar in Kazimierz. Coffee and lemonades from noon, a street-side garden and a room for groups.',
    tiles: [
      {
        title: 'A spot in Kazimierz',
        text: `A small, relaxed bar on Mostowa Street, a short walk from the Father Bernatek Footbridge. Come as you are.`,
        photo: 'W1',
        alt: 'Inside Bar Gwar: tables in warm light',
      },
      {
        title: 'Outdoor seating',
        text: 'Tables outside on the street – see Outdoor seating below.',
        link: 'garden',
      },
      {
        title: 'During the day',
        text: 'From noon: Mott coffee, Ronnefeldt tea and lemonades.',
        photo: 'W3',
        alt: 'A cup of coffee on a table in daylight',
      },
      {
        title: 'Groups & birthdays',
        text: 'Coming as a bigger group? We have a room for birthdays and team nights out.',
        link: 'booking',
      },
      {
        title: 'Order at the counter',
        text: 'We’re a self-service bar – order at the counter and the team will help you choose.',
      },
    ],
  },

  garden: {
    h2: 'Outdoor seating on Mostowa Street',
    inSeason: 'On warm days we sit outside, right on Mostowa Street.',
    offSeason: 'Our garden is back in spring – it’s warm and cosy inside.',
    photo1Alt: 'Bar Gwar’s outdoor seating on Mostowa Street during the day',
    photo2Alt: 'Bar Gwar’s outdoor seating in the evening, tables under lights',
  },

  booking: {
    h2: 'Book a table, groups & birthdays',
    text: 'Coming as a group or planning a birthday? Book a table or the room – we’ll get back to you to confirm.',
    callText: 'Want a table today? Calling is quickest.',
    photoAlt: 'The room at Bar Gwar set up for a group',
  },

  reviews: {
    h2: 'What guests say',
    rating: (r) => `<strong>${r.rating.replace(',', '.')} ★</strong> · ${r.count.replace(' ', ',')} Google reviews (as of ${r.readDate.split('.').reverse().join('-')})`,
    month: (ym) => {
      const [y, m] = ym.split('-');
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m - 1] + ' ' + y;
    },
    viaGoogle: 'review on Google',
    all: 'See all reviews on Google',
    note: 'Reviews come from Bar Gwar’s Google Business Profile; we don’t check whether reviewers have visited.',
  },

  faq: {
    h2: 'FAQ',
    items: (c) => [
      ['Where is Bar Gwar?', `${c.address}, by the Father Bernatek Footbridge.`],
      ['How do I get there from the Father Bernatek Footbridge?', 'From the footbridge, turn into Mostowa Street and walk to number 8 – look for the GWAR sign.'],
      ['Do you have outdoor seating?', 'Yes, we have a garden on Mostowa Street.'],
      ['Can I book a table?', `Yes – use our <a href="${c.reservationUrl}" data-ev="reservation_click" data-cta="faq" data-newtab-desktop>booking form</a> or call us on <a href="${c.tel}" data-ev="click_to_call" data-cta="faq">${c.phone}</a>.`],
      ['Can we come as a larger group?', 'Yes. We welcome groups and host birthdays in our room – book it with the form or give us a call.'],
      ['What are your opening hours?', c.hoursSentence],
      ['How do I order?', 'Order at the counter – we’re a self-service bar.'],
    ],
    hoursSentence: (rows) => rows.map(([d, h]) => `${d}: ${h}`).join('; ') + '.',
  },

  map: {
    h2: 'Map, hours & contact',
    loadLabel: 'Click to load Google Maps',
    caption: 'Simplified sketch. Google Maps only loads after you click.',
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
    text: 'Bar Gwar – Mostowa Street 8, Kazimierz. Get directions, give us a call or book a table.',
  },

  footer: {
    privacy: 'Privacy & cookies',
    google: 'Bar Gwar on Google Maps',
    cookies: 'Cookie settings',
  },

  consent: {
    text: 'We use Google cookies to understand visits and measure our ads – only if you agree.',
    more: 'Details',
    accept: 'Accept',
    reject: 'Reject',
  },

  notFound: {
    title: 'Page not found',
  },
};
