import React from 'react';
import { fetchPlaces } from '../api/places.js';
import { isLive } from '../api/payload.js';

/**
 * Returns places from the live Payload CMS when VITE_CMS_URL is set;
 * otherwise returns the provided `fallback` array (typically MOCK_PLACES).
 * Falls back to `fallback` on error so the UI never breaks.
 * `source` lets callers show a "Live data" badge for transparency.
 *
 * @param {Array} fallback - Mock data array to use when live fetch is off or fails.
 */
export function usePlaces(fallback = []) {
  const live = isLive();
  const [places, setPlaces] = React.useState(live ? null : fallback);
  const [loading, setLoading] = React.useState(live);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!live) return;
    let cancelled = false;
    setLoading(true);
    fetchPlaces()
      .then((data) => {
        if (cancelled) return;
        // If the CMS has no records yet, fall back so the UI is populated.
        setPlaces(data.length > 0 ? data : fallback);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setPlaces(fallback);
        setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [live, fallback]);

  return {
    places: places || [],
    loading,
    error,
    source: live ? (error ? 'mock-fallback' : 'live') : 'mock',
  };
}
