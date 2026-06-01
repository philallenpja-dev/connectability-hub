import React from 'react';
import { searchAddress } from '../api/geocode.js';

/**
 * Search-as-you-type address picker backed by OpenStreetMap Nominatim.
 * Debounces input by 400ms to respect the free API's rate limit.
 *
 * Props:
 *   label        - label shown above the input
 *   value        - initial text value
 *   placeholder  - input placeholder
 *   country      - ISO country code(s) (default 'au')
 *   onSelect     - called with a NormalizedAddress when the user picks a suggestion
 *   required     - shows a "(required)" marker in the label
 */
export function AddressAutocomplete({
  label = 'Address',
  value = '',
  placeholder = 'Start typing an address…',
  country = 'au',
  onSelect,
  required = false,
}) {
  const [query, setQuery] = React.useState(value);
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const timer = React.useRef(null);

  React.useEffect(() => {
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      setError(null);
      searchAddress(query, { country })
        .then(setSuggestions)
        .catch((e) => setError(e.message || 'Lookup failed'))
        .finally(() => setLoading(false));
    }, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, country]);

  const pick = (s) => {
    setQuery(s.street || s.label);
    setSuggestions([]);
    setOpen(false);
    if (onSelect) onSelect(s);
  };

  return (
    <div style={{ marginBottom: 16, position: 'relative' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'oklch(30% 0.01 80)',
            marginBottom: 6,
          }}
        >
          {label}
          {required && <span style={{ color: 'oklch(50% 0.18 25)' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          autoComplete="off"
          style={{
            width: '100%',
            padding: '11px 14px',
            paddingRight: loading ? 90 : 14,
            borderRadius: 10,
            border: '1.5px solid oklch(87% 0.01 80)',
            fontSize: 14,
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />
        {loading && (
          <span
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 12,
              color: 'oklch(55% 0.008 80)',
            }}
          >
            Searching…
          </span>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid oklch(88% 0.01 80)',
            borderRadius: 10,
            marginTop: 4,
            padding: 0,
            listStyle: 'none',
            maxHeight: 280,
            overflowY: 'auto',
            zIndex: 100,
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                fontSize: 13,
                lineHeight: 1.4,
                borderBottom:
                  i < suggestions.length - 1
                    ? '1px solid oklch(94% 0.008 80)'
                    : 'none',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'oklch(96% 0.01 80)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              <div style={{ fontWeight: 600, color: 'oklch(20% 0.01 80)' }}>
                {s.street || s.label.split(',')[0]}
              </div>
              <div style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>
                {[s.suburb, s.state, s.postcode].filter(Boolean).join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p
          style={{
            fontSize: 12,
            color: 'oklch(50% 0.18 25)',
            marginTop: 4,
          }}
        >
          Address lookup unavailable. You can still type the address manually.
        </p>
      )}
      <p
        style={{
          fontSize: 11,
          color: 'oklch(58% 0.008 80)',
          marginTop: 4,
        }}
      >
        Powered by OpenStreetMap
      </p>
    </div>
  );
}
