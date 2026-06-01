import { fetchCollection } from './payload.js';

export function mapBusiness(b) {
  return {
    id: b.id,
    name: b.name,
    category: b.category,
    suburb: b.suburb || '',
    postcode: b.postcode || '',
    address: b.address || '',
    description: b.description || '',
    a11y: b.accessibility || [],
    badge: Boolean(b.disabilityFriendlyBadge),
    contactEmail: b.contactEmail || '',
    contactPhone: b.contactPhone || '',
    websiteUrl: b.websiteUrl || '',
  };
}

export async function fetchBusinesses({ limit = 100, depth = 1 } = {}) {
  const { docs = [] } = await fetchCollection('businesses', { limit, depth, sort: 'name' });
  return docs.map(mapBusiness);
}
