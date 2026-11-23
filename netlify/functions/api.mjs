import { getStore } from "@netlify/blobs";
import { defaultLayout } from "./layout.mjs";
import { opening } from "./opening.mjs";

const TITLE = 'Social Media Daily Platform Wise Task Report';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const num = v => {
  if (typeof v === 'number') return v;
  if (v === '' || v == null) return 0;
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ''));
  return isNaN(n) ? 0 : n;
};
const tick = v => (typeof v === 'number' ? v : /^\s*y/i.test(String(v || '')) ? 1 : num(v));
const reply = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });

function addCum(t, o) {
  Object.keys(o).forEach(k => {
    const v = o[k];
    if (Array.isArray(v)) { t[k] = t[k] || []; v.forEach((x, i) => { t[k][i] = (t[k][i] || 0) + num(x); }); }
    else if (v && typeof v === 'object') { t[k] = t[k] || {}; addCum(t[k], v); }
    else t[k] = (t[k] || 0) + num(v);
  });
}

function addInto(cum, d, collabLog, date) {
  const r1 = (d && d.r1) || {}, r2 = (d && d.r2) || {};
  Object.keys(r1.plat || {}).forEach(p => {
    const s = r1.plat[p] || {};
    const c = cum.r1.plat[p] || (cum.r1.plat[p] = { posts: {}, met: [0,0,0,0,0,0], spend: 0 });
    Object.keys(s.posts || {}).forEach(k => { c.posts[k] = (c.posts[k] || 0) + num(s.posts[k]); });
    for (let i = 0; i < 6; i++) c.met[i] += num(s.met ? s.met[i] : 0);
    c.spend += num(s.spend);
  });
  Object.keys(r1.collab || {}).forEach(k => {
    const s = r1.collab[k] || {};
    const c = cum.r1.collab[k] || (cum.r1.collab[k] = { yes: 0, no: 0, views: 0 });
    if (s.done === 'Yes') c.yes++;
    if (s.done === 'No') c.no++;
    c.views += num(s.views);
    if (s.name || s.views) collabLog.push({ date, item: k, name: s.name || '', views: num(s.views) });
  });
  Object.keys(r2.groups || {}).forEach(no => {
    const s = r2.groups[no] || {};
    const c = cum.r2.groups[no] || (cum.r2.groups[no] = { reel: 0, photo: 0 });
    c.reel += tick(s.reel); c.photo += tick(s.photo);
  });
  Object.keys(r2.leads || {}).forEach(k => { cum.r2.leads[k] = (cum.r2.leads[k] || 0) + num(r2.leads[k]); });
  Object.keys(r2.orders || {}).forEach(k => {
    const s = r2.orders[k] || {};
    const c = cum.r2.orders[k] || (cum.r2.orders[k] = { pcs: 0, amt: 0 });
    c.pcs += num(s.pcs); c.amt += num(s.amt);
  });
}

async function buildReport(store, dateKey, from) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(from || '')) || from > dateKey) from = dateKey.slice(0, 7) + '-01';
  const months = [];
  let y = +from.slice(0, 4), m = +from.slice(5, 7);
  const ey = +dateKey.slice(0, 4), em = +dateKey.slice(5, 7);
  while (y < ey || (y === ey && m <= em)) { months.push(y + '-' + String(m).padStart(2, '0')); m++; if (m > 12) { m = 1; y++; } }
  const rows = [];
  for (const mo of months) {
    const { blobs } = await store.list({ prefix: 'day:' + mo });
    for (const b of blobs) {
      const date = b.key.slice(4);
      if (date < from || date > dateKey) continue;
      const data = await store.get(b.key, { type: 'json' });
      if (data) rows.push({ date, data });
    }
  }
  rows.sort((a, b) => (a.date < b.date ? -1 : 1));
  const cum = { r1: { plat: {}, collab: {} }, r2: { groups: {}, leads: {}, orders: {} } };
  const collabLog = [];
  let daily = null;
  rows.forEach(x => { addInto(cum, x.data, collabLog, x.date); if (x.date === dateKey) daily = x.data; });
  let openingIncluded = false;
  if (from <= opening.start && dateKey > opening.through) {
    addCum(cum, opening.cum);
    (opening.collabLog || []).forEach(x => collabLog.push(x));
    openingIncluded = true;
  }
  collabLog.sort((a, b) => (a.date < b.date ? -1 : 1));
  const fd = parseInt(from.slice(8, 10), 10), td = parseInt(dateKey.slice(8, 10), 10);
  const fm = MONTHS[parseInt(from.slice(5, 7), 10) - 1], tm = MONTHS[parseInt(dateKey.slice(5, 7), 10) - 1];
  const rangeLabel = from.slice(0, 7) === dateKey.slice(0, 7) ? fd + ' - ' + td + ' ' + tm : fd + ' ' + fm + ' - ' + td + ' ' + tm;
  return {
    layout: defaultLayout, date: dateKey, from, rangeLabel, mon: tm, dayTo: td,
    daysFilled: rows.length, openingIncluded, daily, cum, collabLog
  };
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Daily report API is running.');
  try {
    const b = await req.json();
    const pin = process.env.ACCESS_CODE || '';
    if (b.fn === 'needsPin') return reply({ ok: true, data: !!pin });
    if (pin && String(b.pin) !== pin) throw new Error('Wrong access code.');
    const store = getStore({ name: 'daily-report', consistency: 'strong' });

    if (b.fn === 'init') return reply({ ok: true, data: { layout: defaultLayout, title: TITLE, cumStart: opening.start } });

    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.date))) throw new Error('Invalid date.');

    if (b.fn === 'load') {
      const saved = await store.get('day:' + b.date, { type: 'json' });
      return reply({ ok: true, data: { saved: saved || null, report: await buildReport(store, b.date, b.from) } });
    }
    if (b.fn === 'save') {
      if (!b.payload || typeof b.payload !== 'object') throw new Error('No data to save.');
      await store.setJSON('day:' + b.date, b.payload);       // same date again = replaces that day
      return reply({ ok: true, data: { report: await buildReport(store, b.date, b.from) } });
    }
    throw new Error('Unknown request.');
  } catch (e) {
    return reply({ ok: false, error: String(e.message || e) });
  }
};

export const config = { path: '/api' };
