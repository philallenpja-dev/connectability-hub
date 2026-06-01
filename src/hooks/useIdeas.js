import React from 'react';
import { fetchIdeas } from '../api/ideas.js';
import { isLive } from '../api/payload.js';

export function useIdeas(fallback = []) {
  const live = isLive();
  const [ideas, setIdeas] = React.useState(live ? null : fallback);
  const [loading, setLoading] = React.useState(live);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!live) return;
    let cancelled = false;
    setLoading(true);
    fetchIdeas()
      .then((data) => {
        if (cancelled) return;
        setIdeas(data.length > 0 ? data : fallback);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setIdeas(fallback);
        setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [live, fallback]);

  return {
    ideas: ideas || [],
    loading,
    error,
    source: live ? (error ? 'mock-fallback' : 'live') : 'mock',
  };
}
