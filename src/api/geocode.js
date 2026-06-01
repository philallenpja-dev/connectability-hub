// Free address lookup via OpenStreetMap Nominatim.
// No API key required. Usage policy: <1 req/sec, identify your app, cache results.
// Docs: https://nominatim.org/release-docs/develop/api/Search/
//
// For higher-volume production usage, swap to Mapbox/Geoscape or proxy via the CMS.

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';

/**
 * Search for addresses matching the query string.
 * @param {string} query - partial address text (min 3 chars)
 * @param {object} opts
 * @param {string} [opts.country='au'] - ISO country code(s), comma-separated
 * @param {number} [opts.limit=5] - max suggestions to return
 * @returns {Promise<Array<NormalizedAddress>>}
 */
export async function searchAddress(query, { country = 'au', limit = 5 } = {}) {
  if (!query || query.trim().length < 3) return [];

  const url = new URL(NOMINATIM);
  url.searchParams.set('q', query.trim());
  url.searchParams.set('format', 'json');
  url.searchParams.set('countrycodes', country);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('addressdetails', '1');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Nominatim ${res.status}`);
    const data = await res.json();
    return data.map(normalize);
  } finally {
    clearTimeout(timeout);
  }
}

function normalize(item) {
  const a = item.address || {};
  const street = [a.house_number, a.road].filter(Boolean).join(' ');
  return {
    label: item.display_name,
    street,
    suburb: a.suburb || a.city || a.town || a.village || a.hamlet || '',
    state: a.state || '',
    postcode: a.postcode || '',
    country: a.country || '',
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon),
    raw: item,
  };
}
