// Everything derived from data/hours.json: the hours table, the FAQ answer,
// schema.org openingHoursSpecification and the payload for the browser status.
export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const SCHEMA_DAY = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export function validateHours(hours) {
  const errors = [];
  const checkIntervals = (list, where) => {
    if (list === null) return;
    if (!Array.isArray(list)) return errors.push(`${where}: expected an array or null`);
    for (const i of list) {
      if (!TIME.test(i.open) || !TIME.test(i.close)) errors.push(`${where}: bad time ${JSON.stringify(i)}`);
    }
  };
  for (const d of DAYS) checkIntervals(hours.weekly[d], `weekly.${d}`);
  for (const e of hours.exceptions || []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`exceptions: bad date ${e.date}`);
    checkIntervals(e.hours, `exceptions.${e.date}`);
  }
  if (hours.exceptionsValidUntil && !/^\d{4}-\d{2}-\d{2}$/.test(hours.exceptionsValidUntil)) {
    errors.push('exceptionsValidUntil: expected YYYY-MM-DD');
  }
  return errors;
}

export const weeklyComplete = (hours) => DAYS.every((d) => Array.isArray(hours.weekly[d]));

/** Status may be shown only with confirmed, complete hours and a current exceptions list. */
export const statusEnabled = (hours) =>
  hours.confirmed === true && weeklyComplete(hours) && typeof hours.exceptionsValidUntil === 'string';

function formatIntervals(list, c) {
  if (!list.length) return c.closedLabel;
  return list.map((i) => `${i.open}–${c.formatTime(i.close)}`).join(', ');
}

/** Opening time shared by every day of the week ("open daily from 12:00"), or null. */
export function dailyOpening(hours) {
  if (!weeklyComplete(hours)) return null;
  const firsts = DAYS.map((d) => (hours.weekly[d][0] || {}).open);
  return firsts.every((t) => t && t === firsts[0]) ? firsts[0] : null;
}

/** Rows [label, value] for the hours table; consecutive days with equal hours are grouped. */
export function hoursRows(hours, c) {
  if (!weeklyComplete(hours)) return c.hoursFallbackRows.map((label) => [label, c.hoursTodo]);
  const groups = [];
  for (const d of DAYS) {
    const key = JSON.stringify(hours.weekly[d]);
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.days.push(d);
    else groups.push({ key, days: [d], list: hours.weekly[d] });
  }
  return groups.map((g) => {
    const first = c.days[g.days[0]];
    const label = g.days.length === 1 ? first : c.dayRange(first, c.days[g.days[g.days.length - 1]]);
    return [label, formatIntervals(g.list, c)];
  });
}

export function openingHoursSchema(hours) {
  if (!weeklyComplete(hours)) return undefined;
  const specs = [];
  for (const d of DAYS) {
    for (const i of hours.weekly[d]) {
      const same = specs.find((s) => s.opens === i.open && s.closes === i.close && !s.validFrom);
      if (same) same.dayOfWeek.push(SCHEMA_DAY[d]);
      else specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: [SCHEMA_DAY[d]], opens: i.open, closes: i.close });
    }
  }
  for (const e of hours.exceptions || []) {
    const list = e.hours.length ? e.hours : [{ open: '00:00', close: '00:00' }];
    for (const i of list) {
      specs.push({ '@type': 'OpeningHoursSpecification', validFrom: e.date, validThrough: e.date, opens: i.open, closes: i.close });
    }
  }
  return specs;
}

/** Minimal payload for assets/main.js (opening status). */
export function statusPayload(hours, c) {
  return {
    tz: hours.timezone,
    until: hours.exceptionsValidUntil,
    weekly: DAYS.map((d) => hours.weekly[d]),
    exceptions: Object.fromEntries((hours.exceptions || []).map((e) => [e.date, e.hours])),
    t: c.status,
    midnight: c.formatTime('00:00'),
  };
}
