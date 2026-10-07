// Content Blacklist shared by check-content.mjs (dist/) and check-sitelinks.mjs (Google Ads sitelinks).
const L = '\\p{L}';
// Word stems; matched at a word start (Unicode-aware, so Polish letters count as letters).
const STEMS = [
  'drink', 'koktajl', 'cocktail', 'shot', 'shoty', 'wódk', 'wodk', 'vodka', 'nalewk', 'gwarówk', 'gwarowk',
  'piw', 'beer', 'wino\\b', 'win(?:a|em|ie)\\b', 'wine', 'whisk', 'rum\\b', 'gin\\b', 'tequil', 'prosecco', 'szampan', 'champagne',
  'aperol', 'campari', 'jameson', 'bacardi', 'spritz', 'mojito', 'martini', 'porn star', 'alkohol', 'alcohol', 'booze',
  'happy hour', 'promocj', 'promotion', 'instagram', 'facebook',
  'menu\\.html', 'promotions\\.html', 'hasMenu', '"menu"', 'AggregateRating', '"Review"', '"Offer"',
];
export const re = new RegExp(`(?<!${L})(?:${STEMS.join('|')})`, 'giu');
