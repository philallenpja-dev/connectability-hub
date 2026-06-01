import React from 'react';
import { fetchEvents } from '../api/events.js';
import { isLive } from '../api/payload.js';

/**
 * Returns events from the live Payload CMS when VITE_CMS_URL is set;
 * otherwise returns the provided `fallback` array (typically MOCK_EVENTS).
 * Falls back to `fallback` on error or when the CMS has no records.
 */
export function useEvents(fallback = []) {
  const live = isLive();
  const [events, setEvents] = React.useState(live ? null : fallback);
  const [loading, setLoading] = React.useState(live);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!live) return;
    let cancelled = false;
    setLoading(true);
    fetchEvents()
      .then((data) => {
        if (cancelled) return;
        setEvents(data.length > 0 ? data : fallback);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setEvents(fallback);
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
    events: events || [],
    loading,
    error,
    source: live ? (error ? 'mock-fallback' : 'live') : 'mock',
  };
}
