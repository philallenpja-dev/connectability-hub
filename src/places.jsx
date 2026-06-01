import React from 'react';
import { A11Y_ATTRS, A11yIcon, Badge, Btn, Card, Input, MOCK_EVENTS, ProgressSteps, SUBURBS } from './shared.jsx';
import { EventCardDesktop } from './desktopScreens.jsx';
import { usePlaces } from './hooks/usePlaces.js';
import { AddressAutocomplete } from './components/AddressAutocomplete.jsx';

// ─── ConnectAbility Hub — Places Feature ─────────────────────────────────────
// Requires hub-shared.jsx to be loaded first

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const PLACE_TYPES = ['All types', 'Hall', 'Café', 'Pub', 'Beach', 'Park', 'Recreation Centre', 'Library', 'Arts Space', 'Other'];

export const AD_TIERS = {
  basic:    { id: 'basic',    name: 'Basic',    price: 'Free',      color: 'gray',   icon: '📋', desc: 'Your place on the map', perks: ['Place profile page', 'List your events', 'Accessibility tags', 'Community reviews'], limit: null },
  featured: { id: 'featured', name: 'Featured', price: '$49/mo',    color: 'teal',   icon: '⭐', desc: 'Stand out in search results', perks: ['Everything in Basic', 'Highlighted in browse', 'Events promoted to participants', 'Monthly analytics report', '"Featured Venue" badge'], limit: 3 },
  premier:  { id: 'premier',  name: 'Premier',  price: '$149/mo',   color: 'amber',  icon: '👑', desc: 'Maximum visibility in your suburb', perks: ['Everything in Featured', 'Homepage spotlight rotation', 'Priority event listing', '"Premier Venue" badge', 'Dedicated account manager', 'Co-branded event cards'], limit: 1 },
};

export const MOCK_PLACES = [
  { id: 1, name: 'Fitzroy Town Hall', type: 'Hall', suburb: 'Fitzroy', address: '201 Napier St, Fitzroy VIC 3065', desc: 'A heritage-listed community hall in the heart of Fitzroy. Fully accessible with lift access, hearing loops, and flexible floor space for events of all sizes.', a11y: ['wheelchair', 'hearing', 'parking', 'companion'], tier: 'premier', capacity: 150, eventIds: [1, 4], owner: 'City of Yarra Council', verified: true, pendingUpdate: false, img: null, featuredSlots: { total: 3, taken: 2 }, premierSlots: { total: 1, taken: 1 } },
  { id: 2, name: 'The Inclusive Brew', type: 'Café', suburb: 'Fitzroy', address: '88 Smith St, Fitzroy VIC 3065', desc: 'Melbourne\'s most accessible café. Wide aisles, sensory-friendly low lighting, hearing loop, and a menu in large print and Easy Read format.', a11y: ['wheelchair', 'sensory', 'hearing', 'companion'], tier: 'featured', capacity: 40, eventIds: [4, 6], owner: 'The Inclusive Brew Pty Ltd', verified: true, pendingUpdate: false, img: null, featuredSlots: { total: 3, taken: 2 }, premierSlots: { total: 1, taken: 1 } },
  { id: 3, name: 'Merri Creek Reserve', type: 'Park', suburb: 'Northcote', address: 'Merri Creek Trail, Northcote VIC 3070', desc: 'A beautiful accessible riverside reserve with paved paths, rest areas, and sensory garden. Perfect for outdoor social events and gentle walks.', a11y: ['wheelchair', 'parking', 'lowstim'], tier: 'basic', capacity: 200, eventIds: [2], owner: 'Darebin City Council', verified: true, pendingUpdate: false, img: null, featuredSlots: { total: 3, taken: 1 }, premierSlots: { total: 1, taken: 0 } },
  { id: 4, name: 'The Brunswick Arms', type: 'Pub', suburb: 'Brunswick', address: '302 Sydney Rd, Brunswick VIC 3056', desc: 'A welcoming local pub with a fully accessible function room, quiet corner spaces, and a sensory-friendly quiet hour every Sunday afternoon.', a11y: ['wheelchair', 'sensory', 'companion'], tier: 'featured', capacity: 80, eventIds: [6], owner: 'Brunswick Arms Holdings', verified: true, pendingUpdate: true, img: null, featuredSlots: { total: 3, taken: 1 }, premierSlots: { total: 1, taken: 0 } },
  { id: 5, name: 'Carlton Library & Community Hub', type: 'Library', suburb: 'Carlton', address: '667 Rathdowne St, Carlton VIC 3053', desc: 'A modern accessible library with event spaces, AUSLAN-friendly programs, and a quiet reading room. Free event space available for community groups.', a11y: ['wheelchair', 'auslan', 'hearing', 'lowstim'], tier: 'basic', capacity: 60, eventIds: [3], owner: 'Melbourne City Council', verified: true, pendingUpdate: false, img: null, featuredSlots: { total: 3, taken: 0 }, premierSlots: { total: 1, taken: 0 } },
  { id: 6, name: 'Docklands Aquatic Centre', type: 'Recreation Centre', suburb: 'Docklands', address: 'Harbour Esplanade, Docklands VIC 3008', desc: 'State-of-the-art aquatic centre with pool hoist, accessible change rooms, and a dedicated lane for supported swimming programs.', a11y: ['wheelchair', 'parking', 'companion'], tier: 'basic', capacity: 100, eventIds: [5], owner: 'VicSport Inc.', verified: false, pendingUpdate: false, img: null, featuredSlots: { total: 3, taken: 0 }, premierSlots: { total: 1, taken: 0 } },
];

// ── Tier Badge ─────────────────────────────────────────────────────────────────
export const TierBadge = ({ tier, size = 'sm' }) => {
  const t = AD_TIERS[tier];
  if (!t || tier === 'basic') return null;
  const colors = { featured: { bg: 'oklch(92% 0.05 195)', text: 'oklch(38% 0.14 195)', border: 'oklch(82% 0.10 195)' }, premier: { bg: 'oklch(93% 0.06 50)', text: 'oklch(42% 0.14 48)', border: 'oklch(84% 0.10 50)' } };
  const c = colors[tier];
  return <span style={{ fontSize: size === 'sm' ? 11 : 13, fontWeight: 700, padding: size === 'sm' ? '3px 8px' : '5px 12px', borderRadius: 20, background: c.bg, color: c.text, border: `1px solid ${c.border}`, display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>{t.icon} {t.name}</span>;
};

// ── Spots Indicator ───────────────────────────────────────────────────────────
export const SpotsIndicator = ({ slots, tierName, suburb }) => {
  const avail = slots.total - slots.taken;
  const pct = avail / slots.total;
  const color = pct === 0 ? 'red' : pct <= 0.34 ? 'amber' : 'green';
  const colors = { red: { bg: 'oklch(94% 0.05 20)', text: 'oklch(45% 0.18 20)', bar: 'oklch(55% 0.18 20)' }, amber: { bg: 'oklch(94% 0.06 50)', text: 'oklch(42% 0.14 48)', bar: 'oklch(63% 0.14 48)' }, green: { bg: 'oklch(93% 0.05 155)', text: 'oklch(35% 0.14 155)', bar: 'oklch(52% 0.14 155)' } };
  const c = colors[color];
  return (
    <div style={{ background: c.bg, borderRadius: 10, padding: '8px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{tierName} spots in {suburb}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{avail === 0 ? 'Full' : `${avail} of ${slots.total} left`}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${(slots.taken / slots.total) * 100}%`, background: c.bar, borderRadius: 2, transition: 'width .3s' }} />
      </div>
    </div>
  );
};

// ── Place Card ─────────────────────────────────────────────────────────────────
export const PlaceCard = ({ place, onClick, variant = 'grid' }) => {
  const typeEmoji = { Hall: '🏛', Café: '☕', Pub: '🍺', Beach: '🏖', Park: '🌿', 'Recreation Centre': '🏊', Library: '📚', 'Arts Space': '🎨', Other: '📍' };
  const bgColors = { Hall: 'oklch(88% 0.04 250)', Café: 'oklch(88% 0.05 48)', Pub: 'oklch(88% 0.04 35)', Beach: 'oklch(88% 0.05 195)', Park: 'oklch(88% 0.05 155)', 'Recreation Centre': 'oklch(88% 0.05 200)', Library: 'oklch(88% 0.04 290)', 'Arts Space': 'oklch(88% 0.05 320)', Other: 'oklch(88% 0.005 80)' };
  const isPremier = place.tier === 'premier';
  const isFeatured = place.tier === 'featured';

  if (variant === 'list') return (
    <div onClick={onClick} style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', borderRadius: 14, border: `1.5px solid ${isPremier ? 'oklch(84% 0.10 50)' : isFeatured ? 'oklch(82% 0.10 195)' : 'oklch(90% 0.008 80)'}`, padding: '14px 18px', cursor: 'pointer', transition: 'box-shadow .15s', marginBottom: 10 }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
      <div style={{ width: 56, height: 56, borderRadius: 12, background: bgColors[place.type] || bgColors.Other, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{typeEmoji[place.type] || '📍'}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{place.name}</span>
          <TierBadge tier={place.tier} />
          {place.verified && <span style={{ fontSize: 11, color: 'oklch(35% 0.14 155)', fontWeight: 600 }}>✓ Verified</span>}
        </div>
        <p style={{ fontSize: 13, color: 'oklch(52% 0.008 80)', marginBottom: 6 }}>{place.type} · {place.suburb} · Up to {place.capacity} guests</p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {place.a11y.slice(0, 4).map(a => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '2px 7px', borderRadius: 20 }}><A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" /><span>{A11Y_ATTRS.find(x => x.id === a)?.label}</span></div>)}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'oklch(55% 0.008 80)', flexShrink: 0 }}>{place.eventIds.length} events ›</div>
    </div>
  );

  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', border: `1.5px solid ${isPremier ? 'oklch(84% 0.10 50)' : isFeatured ? 'oklch(82% 0.10 195)' : 'oklch(90% 0.008 80)'}`, position: 'relative', transition: 'transform .15s, box-shadow .15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
      {(isPremier || isFeatured) && <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}><TierBadge tier={place.tier} /></div>}
      <div style={{ background: bgColors[place.type] || bgColors.Other, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{typeEmoji[place.type] || '📍'}</div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'oklch(18% 0.01 80)', flex: 1, lineHeight: 1.3 }}>{place.name}</h3>
          {place.verified && <span style={{ fontSize: 11, color: 'oklch(35% 0.14 155)', fontWeight: 700, flexShrink: 0 }}>✓</span>}
        </div>
        <p style={{ fontSize: 13, color: 'oklch(52% 0.008 80)', marginBottom: 8 }}>{place.type} · {place.suburb}</p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {place.a11y.slice(0, 3).map(a => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '2px 7px', borderRadius: 20 }}><A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" /></div>)}
          {place.a11y.length > 3 && <span style={{ fontSize: 11, color: 'oklch(55% 0.008 80)' }}>+{place.a11y.length - 3}</span>}
        </div>
        <p style={{ fontSize: 12, color: 'oklch(58% 0.008 80)' }}>{place.eventIds.length} upcoming event{place.eventIds.length !== 1 ? 's' : ''} · Up to {place.capacity} guests</p>
      </div>
    </Card>
  );
};

// ── Places Screen (Mobile) ────────────────────────────────────────────────────
export const PlacesScreen = ({ auth, onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All types');
  const [view, setView] = React.useState('list');
  const { places, loading, source } = usePlaces(MOCK_PLACES);

  if (auth === 'guest') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ fontSize: 52, marginBottom: 14 }}>📍</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'oklch(18% 0.01 80)' }}>Discover accessible places</h2>
      <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 24 }}>Find accessible pubs, halls, cafés, parks and more near you — and see the events they're hosting for NDIS participants.</p>
      <Btn fullWidth variant="primary" size="lg" onClick={() => onNavigate('register')}>Create free account</Btn>
      <button onClick={() => onNavigate('signin')} style={{ marginTop: 12, background: 'none', border: 'none', fontSize: 14, color: 'oklch(52% 0.155 195)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Sign in →</button>
      {/* Teaser peek */}
      <div style={{ marginTop: 28, width: '100%', opacity: 0.4, pointerEvents: 'none' }}>
        {MOCK_PLACES.slice(0, 2).map(p => <div key={p.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 10, alignItems: 'center', filter: 'blur(2px)' }}><div style={{ width: 40, height: 40, borderRadius: 10, background: 'oklch(90% 0.005 80)' }} /><div><div style={{ width: 120, height: 12, background: 'oklch(85% 0.005 80)', borderRadius: 4, marginBottom: 6 }} /><div style={{ width: 80, height: 10, background: 'oklch(90% 0.005 80)', borderRadius: 4 }} /></div></div>)}
      </div>
    </div>
  );

  const filtered = places.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.suburb.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All types' && p.type !== typeFilter) return false;
    return true;
  });

  // Sort: premier first, then featured, then basic
  const sorted = [...filtered].sort((a, b) => {
    const order = { premier: 0, featured: 1, basic: 2 };
    return (order[a.tier] || 2) - (order[b.tier] || 2);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ background: '#fff', padding: '16px 20px 0', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Places</h1>
          <Btn variant="secondary" size="sm" onClick={() => onNavigate('place-register')}>+ List your place</Btn>
        </div>
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search places or suburbs…" style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 14, fontFamily: 'inherit', background: 'oklch(97% 0.005 80)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {PLACE_TYPES.slice(0, 6).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${typeFilter === t ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: typeFilter === t ? 'oklch(52% 0.155 195)' : '#fff', color: typeFilter === t ? '#fff' : 'oklch(42% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>{t === 'All types' ? 'All' : t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
        {/* Premier spotlight */}
        {sorted.filter(p => p.tier === 'premier').map(p => (
          <div key={p.id} onClick={() => onNavigate('place-detail', p)} style={{ background: 'linear-gradient(135deg, oklch(48% 0.155 200), oklch(54% 0.15 185))', borderRadius: 18, padding: '18px', marginBottom: 16, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>👑 Premier Place</span>
              <Badge color="amber">Sponsored</Badge>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 10 }}>{p.type} · {p.suburb} · {p.eventIds.length} events</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {p.a11y.slice(0, 3).map(a => <div key={a} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}><A11yIcon type={a} size={12} color="#fff" /></div>)}
            </div>
          </div>
        ))}

        {sorted.filter(p => p.tier !== 'premier').map(p => (
          <div key={p.id} onClick={() => onNavigate('place-detail', p)} style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 14, border: `1.5px solid ${p.tier === 'featured' ? 'oklch(82% 0.10 195)' : 'oklch(90% 0.008 80)'}`, padding: '13px 14px', cursor: 'pointer', marginBottom: 10, transition: 'box-shadow .15s' }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: { Hall:'oklch(88% 0.04 250)',Café:'oklch(88% 0.05 48)',Pub:'oklch(88% 0.04 35)',Park:'oklch(88% 0.05 155)','Recreation Centre':'oklch(88% 0.05 200)',Library:'oklch(88% 0.04 290)','Arts Space':'oklch(88% 0.05 320)',Other:'oklch(88% 0.005 80)' }[p.type] || 'oklch(88% 0.005 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              {{'Hall':'🏛','Café':'☕','Pub':'🍺','Park':'🌿','Recreation Centre':'🏊','Library':'📚','Arts Space':'🎨'}[p.type]||'📍'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)' }}>{p.name}</span>
                <TierBadge tier={p.tier} />
              </div>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)', marginBottom: 6 }}>{p.type} · {p.suburb} · {p.capacity} capacity</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {p.a11y.slice(0, 3).map(a => <div key={a} style={{ color: 'oklch(45% 0.12 195)' }}><A11yIcon type={a} size={14} color="oklch(45% 0.12 195)" /></div>)}
                {p.a11y.length > 3 && <span style={{ fontSize: 11, color: 'oklch(58% 0.008 80)', paddingLeft: 2 }}>+{p.a11y.length-3}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontSize: 18, color: 'oklch(65% 0.008 80)' }}>›</span>
              <span style={{ fontSize: 11, color: 'oklch(58% 0.008 80)' }}>{p.eventIds.length} events</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Place Detail Screen (Mobile) ──────────────────────────────────────────────
export const PlaceDetailScreen = ({ place, onNavigate, auth }) => {
  const [showUpgrade, setShowUpgrade] = React.useState(false);
  const hostedEvents = MOCK_EVENTS.filter(e => place.eventIds.includes(e.id));
  const isOwner = auth === 'place-owner';
  const typeEmoji = {'Hall':'🏛','Café':'☕','Pub':'🍺','Beach':'🏖','Park':'🌿','Recreation Centre':'🏊','Library':'📚','Arts Space':'🎨'}[place.type] || '📍';
  const bgColor = {'Hall':'oklch(82% 0.06 250)','Café':'oklch(82% 0.08 48)','Pub':'oklch(82% 0.06 35)','Park':'oklch(82% 0.08 155)','Recreation Centre':'oklch(82% 0.08 200)','Library':'oklch(82% 0.06 290)','Arts Space':'oklch(82% 0.08 320)'}[place.type] || 'oklch(85% 0.005 80)';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ background: bgColor, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, position: 'relative' }}>
          {typeEmoji}
          <button onClick={() => onNavigate('places')} style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          {place.tier !== 'basic' && <div style={{ position: 'absolute', top: 12, right: 12 }}><TierBadge tier={place.tier} /></div>}
        </div>

        <div style={{ padding: '18px 20px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'oklch(14% 0.01 80)', lineHeight: 1.2 }}>{place.name}</h1>
            {place.verified && <Badge color="green">✓ Verified</Badge>}
          </div>
          <p style={{ fontSize: 14, color: 'oklch(52% 0.008 80)', marginBottom: 12 }}>{place.type} · {place.suburb} · Up to {place.capacity} guests</p>
          <p style={{ fontSize: 14, color: 'oklch(32% 0.008 80)', lineHeight: 1.7, marginBottom: 20 }}>{place.desc}</p>

          {/* Address */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'oklch(96% 0.005 80)', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
            <span style={{ fontSize: 16 }}>📍</span>
            <span style={{ fontSize: 13, color: 'oklch(30% 0.01 80)', fontWeight: 500 }}>{place.address}</span>
          </div>

          {/* Accessibility */}
          <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(38% 0.14 195)', marginBottom: 10 }}>♿ Accessibility features</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {place.a11y.map(a => {
                const attr = A11Y_ATTRS.find(x => x.id === a);
                return <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><A11yIcon type={a} size={18} color="oklch(45% 0.14 195)" /><span style={{ fontSize: 13, color: 'oklch(28% 0.01 80)' }}>{attr?.label}</span></div>;
              })}
            </div>
          </div>

          {/* Events hosted here */}
          {hostedEvents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Events at this place</h2>
              {hostedEvents.map(ev => (
                <div key={ev.id} onClick={() => onNavigate('event-detail', ev)} style={{ display: 'flex', gap: 12, background: 'oklch(97% 0.005 80)', borderRadius: 12, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', border: '1px solid oklch(90% 0.008 80)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `oklch(88% 0.05 ${{Arts:'290',Sport:'195',Education:'250',Social:'48',Skills:'155'}[ev.category]||'80'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{{'Arts':'🎨','Sport':'⚽','Education':'📚','Social':'☕','Skills':'🍳'}[ev.category]}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{ev.title}</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{ev.date} · {ev.time}</p>
                  </div>
                  <Badge color={{ open:'green', waitlist:'amber', full:'red' }[ev.status]}>{{ open:'Open', waitlist:'Waitlist', full:'Full' }[ev.status]}</Badge>
                </div>
              ))}
            </div>
          )}

          {/* Pending update notice */}
          {place.pendingUpdate && (
            <div style={{ background: 'oklch(94% 0.06 50)', border: '1px solid oklch(86% 0.10 50)', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: 'oklch(38% 0.14 48)', fontWeight: 600 }}>⏳ Update pending admin approval</p>
              <p style={{ fontSize: 12, color: 'oklch(48% 0.10 48)', marginTop: 3 }}>Your recent changes are under review and will go live once approved.</p>
            </div>
          )}

          {/* Upgrade CTA for non-premier */}
          {place.tier !== 'premier' && (
            <div style={{ background: 'linear-gradient(135deg, oklch(48% 0.155 200), oklch(54% 0.15 185))', borderRadius: 16, padding: '18px', marginBottom: 16 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Reach more participants</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 14 }}>Upgrade to {place.tier === 'basic' ? 'Featured' : 'Premier'} for greater visibility with NDIS participants in {place.suburb}.</p>
              <SpotsIndicator slots={place.tier === 'basic' ? place.featuredSlots : place.premierSlots} tierName={place.tier === 'basic' ? 'Featured' : 'Premier'} suburb={place.suburb} />
              <Btn fullWidth variant="amber" size="md" style={{ marginTop: 12 }} onClick={() => setShowUpgrade(true)}>
                Upgrade listing →
              </Btn>
            </div>
          )}
        </div>
      </div>

      {showUpgrade && <UpgradeModal place={place} onClose={() => setShowUpgrade(false)} />}
    </div>
  );
};

// ── Upgrade Modal ─────────────────────────────────────────────────────────────
export const UpgradeModal = ({ place, onClose }) => {
  const [selected, setSelected] = React.useState(place.tier === 'basic' ? 'featured' : 'premier');
  const [done, setDone] = React.useState(false);
  const tiers = Object.values(AD_TIERS).filter(t => t.id !== 'basic' && t.id !== place.tier);
  if (place.tier === 'featured') tiers.splice(0, 1);

  if (done) return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '32px 24px 40px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Upgrade requested!</h3>
        <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 24 }}>Your upgrade request is with our team. We'll be in touch within 1 business day to confirm your new listing.</p>
        <Btn fullWidth variant="primary" size="lg" onClick={onClose}>Done</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px 20px 32px', width: '100%', maxHeight: '85%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>Upgrade your listing</h3>
          <button onClick={onClose} style={{ background: 'oklch(93% 0.005 80)', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 16, cursor: 'pointer' }}>×</button>
        </div>
        {Object.values(AD_TIERS).filter(t => t.id !== 'basic').map(tier => {
          const slots = tier.id === 'featured' ? place.featuredSlots : place.premierSlots;
          const avail = slots.total - slots.taken;
          const isCurrent = tier.id === place.tier;
          const isSelected = selected === tier.id;
          return (
            <div key={tier.id} onClick={() => !isCurrent && avail > 0 && setSelected(tier.id)} style={{ border: `2px solid ${isSelected ? (tier.id==='premier'?'oklch(63% 0.14 48)':'oklch(52% 0.155 195)') : 'oklch(88% 0.01 80)'}`, borderRadius: 16, padding: '16px', marginBottom: 12, cursor: isCurrent || avail === 0 ? 'default' : 'pointer', background: isSelected ? (tier.id==='premier'?'oklch(93% 0.06 50)':'oklch(93% 0.04 195)') : '#fff', opacity: isCurrent ? 0.5 : 1, transition: 'all .15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{tier.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>{tier.name}</span>
                  {isCurrent && <Badge color="gray">Current</Badge>}
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: tier.id==='premier'?'oklch(42% 0.14 48)':'oklch(38% 0.14 195)' }}>{tier.price}</span>
              </div>
              <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 10 }}>
                {tier.perks.map(p => <li key={p} style={{ fontSize: 13, color: 'oklch(35% 0.008 80)', marginBottom: 4 }}>✓ {p}</li>)}
              </ul>
              {tier.limit && <SpotsIndicator slots={slots} tierName={tier.name} suburb={place.suburb} />}
            </div>
          );
        })}
        <Btn fullWidth variant="amber" size="lg" style={{ marginTop: 8 }} onClick={() => setDone(true)}>Request upgrade</Btn>
      </div>
    </div>
  );
};

// ── Place Registration Flow ───────────────────────────────────────────────────
export const PlaceRegisterFlow = ({ onComplete, onBack }) => {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ name: '', type: '', address: '', suburb: '', capacity: '', desc: '', a11y: new Set(), tier: 'basic' });
  const [submitted, setSubmitted] = React.useState(false);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const steps = ['Place details', 'Accessibility', 'Advertising', 'Review'];

  const toggleA11y = (id) => setForm(p => { const s = new Set(p.a11y); s.has(id) ? s.delete(id) : s.add(id); return { ...p, a11y: s }; });

  const getSuburbSlots = (tierId) => {
    const suburbPlaces = MOCK_PLACES.filter(p => p.suburb === form.suburb || (!form.suburb && p.suburb === 'Fitzroy'));
    if (tierId === 'featured') return { total: 3, taken: suburbPlaces.filter(p => p.tier === 'featured' || p.tier === 'premier').length };
    if (tierId === 'premier') return { total: 1, taken: suburbPlaces.filter(p => p.tier === 'premier').length };
    return { total: 999, taken: 0 };
  };

  if (submitted) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Place submitted!</h2>
      <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 8 }}>Your place listing is under review by our team.</p>
      <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 28 }}>You'll receive an email within 2 business days once it's approved and live on the platform.</p>
      <Btn fullWidth variant="primary" size="lg" onClick={() => onComplete && onComplete()}>Back to Places →</Btn>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={step === 0 ? onBack : () => setStep(s => s - 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'oklch(42% 0.01 80)', padding: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800 }}>List your place</h1>
        </div>
        <ProgressSteps steps={steps} current={step} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>
        {step === 0 && (
          <div>
            <p style={{ fontSize: 14, color: 'oklch(48% 0.008 80)', marginBottom: 16, lineHeight: 1.5 }}>Tell us about your place so NDIS participants can find and book events there.</p>
            <Input label="Place name (required)" placeholder="e.g. The Fitzroy Town Hall" value={form.name} onChange={e => f('name', e.target.value)} />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 8 }}>Place type (required)</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PLACE_TYPES.filter(t => t !== 'All types').map(t => (
                  <button key={t} onClick={() => f('type', t)} style={{ padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${form.type===t?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, background: form.type===t?'oklch(93% 0.04 195)':'#fff', color: form.type===t?'oklch(38% 0.14 195)':'oklch(42% 0.01 80)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}>{t}</button>
                ))}
              </div>
            </div>
            <AddressAutocomplete
              label="Street address"
              required
              value={form.address}
              placeholder="Start typing your address…"
              onSelect={(s) => {
                f('address', s.street || s.label.split(',')[0]);
                f('suburb', [s.suburb, s.postcode].filter(Boolean).join(' '));
                f('latitude', s.latitude);
                f('longitude', s.longitude);
                f('postcode', s.postcode);
                f('state', s.state);
              }}
            />
            <Input label="Suburb / postcode (required)" placeholder="e.g. Fitzroy 3065" value={form.suburb} onChange={e => f('suburb', e.target.value)} />
            <Input label="Maximum capacity" optional placeholder="e.g. 80" type="number" value={form.capacity} onChange={e => f('capacity', e.target.value)} />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>Description <span style={{ fontWeight: 400, color: 'oklch(58% 0.008 80)' }}>(optional)</span></label>
              <textarea value={form.desc} onChange={e => f('desc', e.target.value)} placeholder="Describe your space and what makes it suitable for NDIS participants…" rows={3} maxLength={400} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid oklch(87% 0.01 80)', fontSize: 14, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p style={{ fontSize: 14, color: 'oklch(48% 0.008 80)', marginBottom: 16, lineHeight: 1.5 }}>Select all accessibility features your place genuinely has. This helps participants find the right venue.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {A11Y_ATTRS.map(a => {
                const checked = form.a11y.has(a.id);
                return (
                  <button key={a.id} onClick={() => toggleA11y(a.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${checked?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, background: checked?'oklch(93% 0.04 195)':'#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}>
                    <A11yIcon type={a.id} size={22} color={checked?'oklch(45% 0.14 195)':'oklch(55% 0.008 80)'} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: checked?700:500, color: checked?'oklch(35% 0.14 195)':'oklch(25% 0.01 80)' }}>{a.label}</p>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked?'oklch(52% 0.155 195)':'oklch(78% 0.01 80)'}`, background: checked?'oklch(52% 0.155 195)':'#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {checked && <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p style={{ fontSize: 14, color: 'oklch(48% 0.008 80)', marginBottom: 20, lineHeight: 1.5 }}>Choose how visible you want your place to be. <strong>Limited spots per suburb</strong> — upgrade early for the best position.</p>
            {Object.values(AD_TIERS).map(tier => {
              const slots = getSuburbSlots(tier.id);
              const avail = slots.total - slots.taken;
              const isSelected = form.tier === tier.id;
              const isFull = tier.limit && avail === 0;
              return (
                <button key={tier.id} onClick={() => !isFull && f('tier', tier.id)} style={{ display: 'block', width: '100%', padding: '16px', marginBottom: 12, borderRadius: 16, border: `2px solid ${isSelected?(tier.id==='premier'?'oklch(63% 0.14 48)':tier.id==='featured'?'oklch(52% 0.155 195)':'oklch(78% 0.01 80)'):'oklch(88% 0.01 80)'}`, background: isSelected?(tier.id==='premier'?'oklch(93% 0.06 50)':tier.id==='featured'?'oklch(93% 0.04 195)':'oklch(96% 0.005 80)'):'#fff', cursor: isFull?'not-allowed':'pointer', fontFamily: 'inherit', textAlign: 'left', opacity: isFull?0.5:1, transition: 'all .15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 22 }}>{tier.icon}</span>
                      <span style={{ fontSize: 16, fontWeight: 800 }}>{tier.name}</span>
                      {isFull && <Badge color="red">Full in {form.suburb||'your suburb'}</Badge>}
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: tier.id==='premier'?'oklch(42% 0.14 48)':tier.id==='featured'?'oklch(38% 0.14 195)':'oklch(42% 0.01 80)' }}>{tier.price}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'oklch(48% 0.008 80)', marginBottom: 8 }}>{tier.desc}</p>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: tier.limit ? 10 : 0 }}>
                    {tier.perks.slice(0, 3).map(p => <li key={p} style={{ fontSize: 12, color: 'oklch(42% 0.008 80)', marginBottom: 3 }}>✓ {p}</li>)}
                  </ul>
                  {tier.limit && <SpotsIndicator slots={slots} tierName={tier.name} suburb={form.suburb || 'your suburb'} />}
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ background: 'oklch(97% 0.005 80)', borderRadius: 14, padding: '16px', marginBottom: 20, border: '1px solid oklch(90% 0.008 80)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(52% 0.155 195)', marginBottom: 12 }}>Review your listing</p>
              {[['Place name', form.name||'–'],['Type', form.type||'–'],['Address', form.address ? `${form.address}, ${form.suburb}` : '–'],['Capacity', form.capacity ? `Up to ${form.capacity} guests` : 'Not specified'],['Accessibility', `${form.a11y.size} features selected`],['Advertising tier', AD_TIERS[form.tier]?.name + (form.tier !== 'basic' ? ` (${AD_TIERS[form.tier]?.price})` : ' (Free)')]].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
                  <span style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'oklch(22% 0.01 80)', textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'oklch(94% 0.05 195)', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: 'oklch(35% 0.12 195)', lineHeight: 1.6 }}>
              📋 Your listing will be reviewed by our admin team before going live. This usually takes 1–2 business days.
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px 20px', borderTop: '1px solid oklch(93% 0.008 80)', background: '#fff' }}>
        <Btn fullWidth variant={step === 3 ? 'amber' : 'primary'} size="lg" disabled={step===0 && (!form.name||!form.type||!form.address)} onClick={() => { if (step === 3) setSubmitted(true); else setStep(s => s + 1); }}>
          {step === 3 ? 'Submit for approval →' : 'Continue →'}
        </Btn>
      </div>
    </div>
  );
};

// ── Places Desktop ────────────────────────────────────────────────────────────
export const PlacesDesktop = ({ auth, onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All types');
  const [suburbFilter, setSuburbFilter] = React.useState('All suburbs');
  const [tierFilter, setTierFilter] = React.useState('all');
  const [viewMode, setViewMode] = React.useState('grid');
  const { places, loading, source } = usePlaces(MOCK_PLACES);

  if (auth === 'guest') return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>📍</div>
      <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Discover accessible places</h1>
      <p style={{ fontSize: 18, color: 'oklch(50% 0.008 80)', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>Find accessible pubs, halls, cafés, parks and more — and browse the events they're hosting for NDIS participants. Sign in to unlock the full directory.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <Btn variant="primary" size="lg" onClick={() => onNavigate('register')}>Create free account</Btn>
        <Btn variant="ghost" size="lg" onClick={() => onNavigate('signin')}>Sign in</Btn>
      </div>
      {/* Blurred preview */}
      <div style={{ marginTop: 48, filter: 'blur(4px)', pointerEvents: 'none', opacity: 0.5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {MOCK_PLACES.slice(0, 3).map(p => <PlaceCard key={p.id} place={p} />)}
        </div>
      </div>
    </div>
  );

  const filtered = places.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.suburb.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All types' && p.type !== typeFilter) return false;
    if (suburbFilter !== 'All suburbs' && p.suburb !== suburbFilter) return false;
    if (tierFilter === 'featured' && p.tier !== 'featured') return false;
    if (tierFilter === 'premier' && p.tier !== 'premier') return false;
    return true;
  }).sort((a, b) => ({ premier:0, featured:1, basic:2 }[a.tier]||2) - ({ premier:0, featured:1, basic:2 }[b.tier]||2));

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
      {/* Sidebar */}
      <aside>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px', position: 'sticky', top: 90, marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Filters</h2>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search places…" style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Place type</p>
          {PLACE_TYPES.map(t => <button key={t} onClick={() => setTypeFilter(t)} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '7px 10px', borderRadius: 8, border: 'none', background: typeFilter===t?'oklch(93% 0.04 195)':'none', color: typeFilter===t?'oklch(38% 0.14 195)':'oklch(30% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: typeFilter===t?700:400, cursor: 'pointer', marginBottom: 2 }}><span>{t}</span><span style={{ fontSize: 12, color: 'oklch(60% 0.008 80)' }}>{t==='All types'?places.length:places.filter(p=>p.type===t).length}</span></button>)}
          <div style={{ borderTop: '1px solid oklch(93% 0.008 80)', margin: '12px 0' }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Suburb</p>
          <select value={suburbFilter} onChange={e => setSuburbFilter(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', background: '#fff', marginBottom: 14 }}>
            {SUBURBS.map(s => <option key={s}>{s}</option>)}
          </select>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Listing tier</p>
          {[['all','All places'],['featured','Featured ⭐'],['premier','Premier 👑']].map(([v,l]) => <button key={v} onClick={() => setTierFilter(v)} style={{ display: 'block', width: '100%', padding: '7px 10px', borderRadius: 8, border: 'none', background: tierFilter===v?'oklch(93% 0.04 195)':'none', color: tierFilter===v?'oklch(38% 0.14 195)':'oklch(30% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: tierFilter===v?700:400, cursor: 'pointer', marginBottom: 2, textAlign: 'left' }}>{l}</button>)}
        </div>
        <Btn fullWidth variant="primary" size="md" onClick={() => onNavigate('place-register')}>+ List your place</Btn>
      </aside>

      {/* Main */}
      <main>
        {/* Premier spotlight */}
        {filtered.filter(p => p.tier === 'premier').map(p => (
          <div key={p.id} onClick={() => onNavigate('place-detail', p)} style={{ background: 'linear-gradient(135deg, oklch(48% 0.155 200), oklch(54% 0.15 185))', borderRadius: 20, padding: '28px 32px', marginBottom: 24, cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: 240, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>👑 Premier Place · {p.suburb}</span>
                {p.verified && <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>✓ Verified</span>}
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{p.name}</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16, maxWidth: 500 }}>{p.desc.slice(0, 120)}…</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.a11y.map(a => <div key={a} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}><A11yIcon type={a} size={14} color="#fff" /><span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>{A11Y_ATTRS.find(x=>x.id===a)?.label}</span></div>)}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 8 }}>🏛</div>
              <Btn variant="amber" size="md">{p.eventIds.length} events →</Btn>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'oklch(45% 0.008 80)' }}><strong style={{ color: 'oklch(18% 0.01 80)' }}>{filtered.filter(p=>p.tier!=='premier').length}</strong> places</p>
          <div style={{ display: 'flex', gap: 6, background: 'oklch(93% 0.005 80)', borderRadius: 10, padding: 3 }}>
            {[['grid','⊞'],['list','☰']].map(([v,i]) => <button key={v} onClick={() => setViewMode(v)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: viewMode===v?'#fff':'transparent', cursor: 'pointer', fontSize: 16, boxShadow: viewMode===v?'0 1px 3px rgba(0,0,0,0.1)':'none' }}>{i}</button>)}
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {filtered.filter(p => p.tier !== 'premier').map(p => <PlaceCard key={p.id} place={p} onClick={() => onNavigate('place-detail', p)} />)}
          </div>
        ) : (
          <div>{filtered.filter(p => p.tier !== 'premier').map(p => <PlaceCard key={p.id} place={p} variant="list" onClick={() => onNavigate('place-detail', p)} />)}</div>
        )}

        {/* List your place CTA */}
        <div style={{ marginTop: 32, background: 'oklch(95% 0.04 195)', borderRadius: 20, padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', border: '1px solid oklch(85% 0.08 195)' }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'oklch(30% 0.14 195)', marginBottom: 6 }}>Own an accessible venue?</h3>
            <p style={{ fontSize: 14, color: 'oklch(42% 0.10 195)', lineHeight: 1.6 }}>Register your place and connect with NDIS participants. Limited Featured and Premier advertising spots available per suburb — get in early.</p>
          </div>
          <Btn variant="primary" size="lg" onClick={() => onNavigate('place-register')}>List your place →</Btn>
        </div>
      </main>
    </div>
  );
};

// ── Place Detail Desktop ──────────────────────────────────────────────────────
export const PlaceDetailDesktop = ({ place, onNavigate, auth }) => {
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const hostedEvents = MOCK_EVENTS.filter(e => place.eventIds.includes(e.id));
  const typeEmoji = {'Hall':'🏛','Café':'☕','Pub':'🍺','Beach':'🏖','Park':'🌿','Recreation Centre':'🏊','Library':'📚','Arts Space':'🎨'}[place.type]||'📍';
  const bgColor = {'Hall':'oklch(82% 0.06 250)','Café':'oklch(82% 0.08 48)','Pub':'oklch(82% 0.06 35)','Park':'oklch(82% 0.08 155)','Recreation Centre':'oklch(82% 0.08 200)','Library':'oklch(82% 0.06 290)','Arts Space':'oklch(82% 0.08 320)'}[place.type]||'oklch(85% 0.005 80)';

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <button onClick={() => onNavigate('places')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: 'oklch(52% 0.155 195)', fontWeight: 600, marginBottom: 24 }}>← Back to places</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
        <div>
          <div style={{ background: bgColor, height: 260, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96, marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
            {typeEmoji}
            {place.tier !== 'basic' && <div style={{ position: 'absolute', top: 16, right: 16 }}><TierBadge tier={place.tier} size="md" /></div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: 'oklch(14% 0.01 80)', marginBottom: 6 }}>{place.name}</h1>
              <p style={{ fontSize: 16, color: 'oklch(50% 0.008 80)' }}>{place.type} · {place.suburb} · Up to {place.capacity} guests</p>
            </div>
            {place.verified && <Badge color="green">✓ Verified</Badge>}
          </div>

          <p style={{ fontSize: 16, color: 'oklch(32% 0.008 80)', lineHeight: 1.8, marginBottom: 28 }}>{place.desc}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'oklch(96% 0.005 80)', borderRadius: 12, padding: '12px 18px', marginBottom: 28 }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <span style={{ fontSize: 15, color: 'oklch(28% 0.01 80)', fontWeight: 500 }}>{place.address}</span>
          </div>

          {/* Accessibility */}
          <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 20, padding: '22px 24px', marginBottom: 32 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 16 }}>♿ Accessibility features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {place.a11y.map(a => {
                const attr = A11Y_ATTRS.find(x => x.id === a);
                return <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 10, padding: '10px 14px' }}><A11yIcon type={a} size={20} color="oklch(45% 0.14 195)" /><span style={{ fontSize: 14, color: 'oklch(28% 0.01 80)', fontWeight: 500 }}>{attr?.label}</span></div>;
              })}
            </div>
          </div>

          {/* Events */}
          {hostedEvents.length > 0 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>Events at {place.name}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {hostedEvents.map(ev => <EventCardDesktop key={ev.id} event={ev} onClick={() => onNavigate('event-detail', ev)} />)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Info card */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', padding: '22px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Place details</h3>
            {[['📍', place.address], ['🏠', `${place.type} · ${place.suburb}`], ['👥', `Up to ${place.capacity} guests`], ['📅', `${hostedEvents.length} upcoming event${hostedEvents.length!==1?'s':''}`], ['🏢', `Owner: ${place.owner}`]].map(([i,t]) => (
              <div key={t} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid oklch(95% 0.005 80)' }}>
                <span style={{ fontSize: 16, width: 24 }}>{i}</span>
                <span style={{ fontSize: 13, color: 'oklch(30% 0.01 80)', fontWeight: 500, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
            {place.pendingUpdate && (
              <div style={{ background: 'oklch(94% 0.06 50)', borderRadius: 10, padding: '10px 12px', marginTop: 12 }}>
                <p style={{ fontSize: 12, color: 'oklch(38% 0.14 48)', fontWeight: 600 }}>⏳ Update pending admin approval</p>
              </div>
            )}
          </div>

          {/* Upgrade card */}
          {place.tier !== 'premier' && (
            <div style={{ background: 'linear-gradient(135deg, oklch(48% 0.155 200), oklch(54% 0.15 185))', borderRadius: 20, padding: '22px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Reach more participants</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 14 }}>Upgrade to {place.tier === 'basic' ? 'Featured' : 'Premier'} for greater visibility with NDIS participants in {place.suburb}.</p>
              <SpotsIndicator slots={place.tier === 'basic' ? place.featuredSlots : place.premierSlots} tierName={place.tier === 'basic' ? 'Featured' : 'Premier'} suburb={place.suburb} />
              <Btn fullWidth variant="amber" size="md" style={{ marginTop: 12 }} onClick={() => setShowUpgradeModal(true)}>Upgrade listing →</Btn>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade modal */}
      {showUpgradeModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.target===e.currentTarget && setShowUpgradeModal(false)}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '32px', width: 520, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', animation: 'modalIn .2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>Upgrade your listing</h2>
              <button onClick={() => setShowUpgradeModal(false)} style={{ background: 'oklch(93% 0.005 80)', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
            {Object.values(AD_TIERS).filter(t => t.id !== 'basic').map(tier => {
              const slots = tier.id === 'featured' ? place.featuredSlots : place.premierSlots;
              const avail = slots.total - slots.taken;
              const isCurrent = tier.id === place.tier;
              return (
                <div key={tier.id} style={{ border: `2px solid ${isCurrent?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, borderRadius: 16, padding: '18px', marginBottom: 14, opacity: isCurrent ? 0.6 : 1, background: isCurrent ? 'oklch(93% 0.04 195)' : '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 22 }}>{tier.icon}</span><span style={{ fontSize: 17, fontWeight: 800 }}>{tier.name}</span>{isCurrent && <Badge color="teal">Current plan</Badge>}</div>
                    <span style={{ fontSize: 17, fontWeight: 800 }}>{tier.price}</span>
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: tier.limit ? 12 : 0 }}>
                    {tier.perks.map(p => <li key={p} style={{ fontSize: 14, color: 'oklch(35% 0.008 80)', marginBottom: 5 }}>✓ {p}</li>)}
                  </ul>
                  {tier.limit && <SpotsIndicator slots={slots} tierName={tier.name} suburb={place.suburb} />}
                  {!isCurrent && avail > 0 && <Btn fullWidth variant={tier.id==='premier'?'amber':'primary'} size="md" style={{ marginTop: 14 }} onClick={() => setShowUpgradeModal(false)}>Upgrade to {tier.name}</Btn>}
                  {!isCurrent && avail === 0 && <div style={{ marginTop: 12, textAlign: 'center' }}><Btn fullWidth variant="ghost" size="sm">Join waitlist for {tier.name}</Btn></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Admin Places Panel ────────────────────────────────────────────────────────
export const AdminPlacesPanel = () => {
  const [subSection, setSubSection] = React.useState('queue');
  const [pendingPlaces, setPendingPlaces] = React.useState([
    { id: 10, name: 'Collingwood Arts Warehouse', type: 'Arts Space', suburb: 'Collingwood', tier: 'featured', owner: 'Collingwood Arts Inc.', submitted: '1 day ago' },
    { id: 11, name: 'Northcote Pool & Leisure', type: 'Recreation Centre', suburb: 'Northcote', tier: 'basic', owner: 'Darebin Council', submitted: '3 days ago' },
  ]);
  const [pendingUpdates, setPendingUpdates] = React.useState([
    { id: 4, name: 'The Brunswick Arms', change: 'Added AUSLAN support, updated capacity to 100', submitted: '2 days ago' },
  ]);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteName, setInviteName] = React.useState('');
  const [inviteSent, setInviteSent] = React.useState(false);

  const handleApprove = (id) => setPendingPlaces(p => p.filter(x => x.id !== id));
  const handleReject = (id) => setPendingPlaces(p => p.filter(x => x.id !== id));
  const handleApproveUpdate = (id) => setPendingUpdates(p => p.filter(x => x.id !== id));

  const sections = [['queue','New registrations',pendingPlaces.length],['updates','Pending updates',pendingUpdates.length],['manage','All places',MOCK_PLACES.length],['invite','Invite a place',null]];

  return (
    <div>
      {/* Sub-nav */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'oklch(95% 0.005 80)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
        {sections.map(([id, label, count]) => (
          <button key={id} onClick={() => setSubSection(id)} style={{ padding: '8px 16px', borderRadius: 9, border: 'none', background: subSection===id?'#fff':'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: subSection===id?700:400, color: subSection===id?'oklch(18% 0.01 80)':'oklch(50% 0.008 80)', boxShadow: subSection===id?'0 1px 3px rgba(0,0,0,0.1)':'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            {label}
            {count !== null && count > 0 && <span style={{ background: subSection===id?'oklch(52% 0.155 195)':'oklch(82% 0.008 80)', color: subSection===id?'#fff':'oklch(40% 0.01 80)', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{count}</span>}
          </button>
        ))}
      </div>

      {subSection === 'queue' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New place registrations</h3>
          {pendingPlaces.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'oklch(55% 0.008 80)' }}><div style={{ fontSize: 36, marginBottom: 8 }}>✅</div><p style={{ fontWeight: 600 }}>All caught up — no pending registrations</p></div>
          ) : pendingPlaces.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'oklch(93% 0.04 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📍</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{p.name}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Badge color="gray">{p.type}</Badge>
                  <Badge color="gray">{p.suburb}</Badge>
                  <TierBadge tier={p.tier} />
                  <span style={{ fontSize: 11, color: 'oklch(60% 0.008 80)' }}>{p.submitted} · {p.owner}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleApprove(p.id)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: 'oklch(93% 0.05 155)', color: 'oklch(35% 0.14 155)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                <button onClick={() => handleReject(p.id)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Reject</button>
                <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', background: '#fff', color: 'oklch(42% 0.01 80)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {subSection === 'updates' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Pending place updates</h3>
          {pendingUpdates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'oklch(55% 0.008 80)' }}><div style={{ fontSize: 36, marginBottom: 8 }}>✅</div><p style={{ fontWeight: 600 }}>No pending updates</p></div>
          ) : pendingUpdates.map(u => (
            <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'oklch(94% 0.06 50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>✏️</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{u.name}</p>
                <p style={{ fontSize: 13, color: 'oklch(48% 0.008 80)', marginBottom: 4 }}>Changes: {u.change}</p>
                <span style={{ fontSize: 11, color: 'oklch(60% 0.008 80)' }}>Submitted {u.submitted}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleApproveUpdate(u.id)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: 'oklch(93% 0.05 155)', color: 'oklch(35% 0.14 155)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                <button onClick={() => handleApproveUpdate(u.id)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Reject</button>
                <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', background: '#fff', color: 'oklch(42% 0.01 80)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Compare</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {subSection === 'manage' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>All places ({MOCK_PLACES.length})</h3>
            <input placeholder="Search places…" style={{ padding: '7px 12px', borderRadius: 9, border: '1px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', width: 200 }} />
          </div>
          {MOCK_PLACES.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                  <TierBadge tier={p.tier} />
                  {p.verified && <span style={{ fontSize: 11, color: 'oklch(35% 0.14 155)', fontWeight: 600 }}>✓ Verified</span>}
                  {p.pendingUpdate && <Badge color="amber">Update pending</Badge>}
                </div>
                <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{p.type} · {p.suburb} · {p.owner}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', background: '#fff', color: 'oklch(42% 0.01 80)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                <button style={{ padding: '5px 12px', borderRadius: 8, border: 'none', background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Suspend</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {subSection === 'invite' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '24px', maxWidth: 520 }}>
          {inviteSent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📨</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Invitation sent!</h3>
              <p style={{ fontSize: 14, color: 'oklch(55% 0.008 80)', marginBottom: 20 }}>An invitation to list their place has been sent to {inviteEmail}.</p>
              <Btn variant="secondary" size="md" onClick={() => { setInviteSent(false); setInviteEmail(''); setInviteName(''); }}>Send another invite</Btn>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Invite a place</h3>
              <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 20 }}>Know an accessible venue that would be a great fit? Invite them directly — they'll receive a personalised email with a registration link and a complimentary 3-month Featured trial.</p>
              <Input label="Place / business name" placeholder="e.g. The Fitzroy Community Hall" value={inviteName} onChange={e => setInviteName(e.target.value)} />
              <Input label="Owner / contact email" placeholder="owner@venue.com.au" type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 8 }}>Invite includes</label>
                {['Personalised registration link', '3-month Featured tier trial (free)', 'Onboarding call with our team', 'Dedicated setup support'].map(p => <p key={p} style={{ fontSize: 13, color: 'oklch(35% 0.008 80)', marginBottom: 5 }}>✓ {p}</p>)}
              </div>
              <Btn fullWidth variant="primary" size="lg" disabled={!inviteName||!inviteEmail} onClick={() => setInviteSent(true)}>Send invitation →</Btn>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ── Place Registration (Desktop wrapper) ──────────────────────────────────────
export const PlaceRegisterDesktop = ({ onComplete, onBack }) => (
  <div style={{ minHeight: '100vh', background: 'oklch(97% 0.009 75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
    <div style={{ width: '100%', maxWidth: 580, background: '#fff', borderRadius: 24, border: '1px solid oklch(90% 0.008 80)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <PlaceRegisterFlow onComplete={onComplete} onBack={onBack} />
    </div>
  </div>
);

