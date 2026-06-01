import { fetchCollection } from './payload.js';

function relativeDate(iso) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const days = Math.round((Date.now() - then) / (1000 * 60 * 60 * 24));
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export function mapIdea(i) {
  const author =
    i.authorDisplay ||
    (typeof i.submittedBy === 'object' && i.submittedBy
      ? i.submittedBy.displayName || i.submittedBy.firstName || 'Community member'
      : 'Community member');
  return {
    id: i.id,
    title: i.title,
    desc: i.description,
    category: i.category,
    suburb: i.suburb || '',
    author,
    date: relativeDate(i.createdAt),
    interests: Number(i.interestCount) || 0,
    status: i.convertedEvent ? 'live' : 'pending',
    eventId: typeof i.convertedEvent === 'object' ? i.convertedEvent?.id : i.convertedEvent || null,
  };
}

export async function fetchIdeas({ limit = 50, depth = 1 } = {}) {
  const { docs = [] } = await fetchCollection('ideas', { limit, depth, sort: '-interestCount' });
  return docs.map(mapIdea);
}
