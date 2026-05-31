import { fetchCollection } from './payload.js';

/**
 * Map a Payload `places` doc into the shape the frontend's existing
 * components expect (matches MOCK_PLACES). Fields not yet wired on the
 * CMS side get sensible defaults so the UI doesn't crash.
 */
export function mapPlace(p) {
  return {
    id: p.id,
    name: p.name,
    type: p.type,
    suburb: p.suburb,
    postcode: p.postcode || '',
    address: p.address,
    desc: p.description || '',
    a11y: p.accessibility || [],
    tier: p.tier || 'basic',
    capacity: p.capacity || 0,
    eventIds: [], // wire when we add Events fetch
    owner:
      typeof p.owner === 'object' && p.owner
        ? p.owner.displayName || p.owner.email || ''
        : p.owner || '',
    verified: Boolean(p.verified),
    pendingUpdate: false,
    img: p.image?.url || p.image?.sizes?.card?.url || null,
    // Ad-tier slots are admin-only mock concepts; default to the unconstrained shape.
    featuredSlots: { total: 3, taken: 0 },
    premierSlots: { total: 1, taken: 0 },
  };
}

export async function fetchPlaces({ limit = 50, depth = 1 } = {}) {
  const { docs = [] } = await fetchCollection('places', { limit, depth });
  return docs.map(mapPlace);
}
