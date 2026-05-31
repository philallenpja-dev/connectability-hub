// Lightweight client for the ConnectAbility Hub Payload CMS.
// If VITE_CMS_URL is not set, the screens fall back to MOCK_* data.

const BASE = (import.meta.env.VITE_CMS_URL || '').replace(/\/$/, '');

export const isLive = () => Boolean(BASE);

export async function fetchCollection(slug, params = {}) {
  if (!BASE) throw new Error('VITE_CMS_URL not set');
  const url = new URL(`${BASE}/api/${slug}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`${slug} fetch failed (${res.status})`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}
