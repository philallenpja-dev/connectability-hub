import { fetchCollection } from './payload.js';

/**
 * Walk a Lexical rich-text tree and return plain text.
 * Payload stores rich text as Lexical JSON; the existing UI expects a string.
 */
function lexicalToText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const walk = (node) => {
    if (!node) return '';
    if (typeof node.text === 'string') return node.text;
    if (Array.isArray(node.children)) return node.children.map(walk).join('');
    if (node.root) return walk(node.root);
    return '';
  };
  return walk(value).trim();
}

function statusFor(capacity, rsvpCount) {
  const c = Number(capacity) || 0;
  const r = Number(rsvpCount) || 0;
  if (c === 0) return 'open';
  if (r >= c) return 'full';
  if (r >= c * 0.85) return 'waitlist';
  return 'open';
}

function formatDateTime(iso) {
  if (!iso) return { date: '', time: '' };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: '', time: '' };
  return {
    date: d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }),
    time: d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
}

export function mapEvent(ev) {
  const { date, time } = formatDateTime(ev.startsAt);
  const place = typeof ev.place === 'object' && ev.place ? ev.place : null;
  const sponsor = typeof ev.sponsor === 'object' && ev.sponsor ? ev.sponsor : null;
  const capacity = Number(ev.capacity) || 0;
  const rsvpCount = Number(ev.rsvpCount) || 0;
  return {
    id: ev.id,
    title: ev.title,
    date,
    time,
    startsAt: ev.startsAt,
    suburb: place?.suburb || '',
    placeName: place?.name || '',
    placeId: place?.id ?? null,
    category: ev.category,
    a11y: ev.accessibility || [],
    status: statusFor(capacity, rsvpCount),
    spots: Math.max(0, capacity - rsvpCount),
    capacity,
    sponsor: sponsor?.name || null,
    image: ev.coverImage?.url || ev.coverImage?.sizes?.card?.url || null,
    description: lexicalToText(ev.description),
    featured: Boolean(ev.featured),
  };
}

export async function fetchEvents({ limit = 100, depth = 2 } = {}) {
  const { docs = [] } = await fetchCollection('events', {
    limit,
    depth,
    sort: 'startsAt',
  });
  return docs.map(mapEvent);
}
