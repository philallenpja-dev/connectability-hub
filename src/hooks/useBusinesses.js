import React from 'react';
import { fetchBusinesses } from '../api/businesses.js';
import { isLive } from '../api/payload.js';

export function useBusinesses(fallback = []) {
  const live = isLive();
  const [businesses, setBusinesses] = React.useState(live ? null : fallback);
  const [loading, setLoading] = React.useState(live);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!live) return;
    let cancelled = false;
    setLoading(true);
    fetchBusinesses()
      .then((data) => {
        if (cancelled) return;
        setBusinesses(data.length > 0 ? data : fallback);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setBusinesses(fallback);
        setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [live, fallback]);

  return {
    businesses: businesses || [],
    loading,
    error,
    source: live ? (error ? 'mock-fallback' : 'live') : 'mock',
  };
}
