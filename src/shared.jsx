// ─── ConnectAbility Hub — Shared UI + Mock Data ───────────────────────────
import React from 'react';

// ── Accessibility Icons ──────────────────────────────────────────────────────
export const A11yIcon = ({ type, size = 18, color = 'currentColor' }) => {
  const s = { width: size, height: size, display: 'inline-block', flexShrink: 0 };
  const icons = {
    wheelchair: <svg style={s} viewBox="0 0 24 24" fill={color}><circle cx="12" cy="4.5" r="2"/><path d="M9.5 8.5h4.2l1.8 4.5H19v2h-4.5l-1.3-3H10V18H7.5V8.5h2z"/><circle cx="9" cy="20" r="2" fill="none" stroke={color} strokeWidth="2"/><circle cx="16" cy="20" r="2" fill="none" stroke={color} strokeWidth="2"/><path d="M9 20h7" fill="none" stroke={color} strokeWidth="2"/></svg>,
    sensory: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="3" fill={color}/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    hearing: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"/><path d="M10 17v4M14 17v4"/></svg>,
    auslan: <svg style={s} viewBox="0 0 24 24" fill={color}><path d="M7 5.5C7 4.7 7.7 4 8.5 4S10 4.7 10 5.5V12h1V6.5C11 5.7 11.7 5 12.5 5S14 5.7 14 6.5V12h1V7.5C15 6.7 15.7 6 16.5 6S18 6.7 18 7.5V14a6 6 0 01-12 0V8.5C6 7.7 6.7 7 7.5 7S9 7.7 9 8.5V12H7V5.5z"/></svg>,
    parking: <svg style={s} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill={color}/><text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="sans-serif">P</text></svg>,
    companion: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    lowstim: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 22s-8-5.8-8-12a8 8 0 0116 0c0 6.2-8 12-8 12z"/><circle cx="12" cy="10" r="2.5" fill={color}/></svg>,
  };
  return icons[type] || null;
};

export const A11Y_ATTRS = [
  { id: 'wheelchair', label: 'Wheelchair Accessible' },
  { id: 'sensory', label: 'Sensory Friendly' },
  { id: 'hearing', label: 'Hearing Loop' },
  { id: 'auslan', label: 'AUSLAN' },
  { id: 'parking', label: 'Parking Available' },
  { id: 'companion', label: 'Companion Card' },
  { id: 'lowstim', label: 'Low Stimulation' },
];

// ── UI Primitives ─────────────────────────────────────────────────────────────
export const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, style = {}, fullWidth }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    fontFamily: 'inherit', fontWeight: 600, borderRadius: 12, border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all .15s',
    width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.45 : 1,
    ...style,
  };
  const sizes = { sm: { fontSize: 13, padding: '7px 14px' }, md: { fontSize: 15, padding: '12px 20px' }, lg: { fontSize: 16, padding: '15px 24px' } };
  const variants = {
    primary: { background: 'oklch(52% 0.155 195)', color: '#fff' },
    secondary: { background: 'oklch(93% 0.04 195)', color: 'oklch(40% 0.14 195)' },
    amber: { background: 'oklch(63% 0.14 48)', color: '#fff' },
    ghost: { background: 'transparent', color: 'oklch(42% 0.01 80)', border: '1.5px solid oklch(88% 0.01 80)' },
    danger: { background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', border: '1.5px solid oklch(85% 0.08 20)' },
    success: { background: 'oklch(93% 0.05 155)', color: 'oklch(38% 0.14 155)' },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant] }} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {children}
    </button>
  );
};

export const Badge = ({ children, color = 'gray', style = {} }) => {
  const colors = {
    gray: { bg: 'oklch(93% 0.005 80)', text: 'oklch(40% 0.01 80)' },
    teal: { bg: 'oklch(92% 0.05 195)', text: 'oklch(38% 0.14 195)' },
    amber: { bg: 'oklch(93% 0.06 50)', text: 'oklch(45% 0.14 48)' },
    green: { bg: 'oklch(93% 0.05 155)', text: 'oklch(36% 0.14 155)' },
    red: { bg: 'oklch(94% 0.05 20)', text: 'oklch(45% 0.18 20)' },
    blue: { bg: 'oklch(93% 0.05 250)', text: 'oklch(40% 0.14 250)' },
    purple: { bg: 'oklch(93% 0.05 290)', text: 'oklch(40% 0.14 290)' },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: c.bg, color: c.text, display: 'inline-block', letterSpacing: '0.02em', whiteSpace: 'nowrap', ...style }}>
      {children}
    </span>
  );
};

export const Input = ({ label, type = 'text', placeholder, value, onChange, optional, hint, error, ...rest }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>
      {label} {optional && <span style={{ fontWeight: 400, color: 'oklch(58% 0.008 80)' }}>(optional)</span>}
    </label>}
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${error ? 'oklch(70% 0.18 20)' : 'oklch(87% 0.01 80)'}`, fontSize: 15, fontFamily: 'inherit', background: '#fff', color: 'oklch(18% 0.01 80)', outline: 'none', boxSizing: 'border-box' }}
      {...rest}
    />
    {hint && !error && <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)', marginTop: 4 }}>{hint}</p>}
    {error && <p style={{ fontSize: 12, color: 'oklch(50% 0.18 20)', marginTop: 4 }}>{error}</p>}
  </div>
);

export const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', ...style }}>
    {children}
  </div>
);

export const SectionHeader = ({ title, action, onAction }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
    <h2 style={{ fontSize: 17, fontWeight: 700, color: 'oklch(18% 0.012 80)' }}>{title}</h2>
    {action && <button onClick={onAction} style={{ fontSize: 13, color: 'oklch(52% 0.155 195)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{action}</button>}
  </div>
);

export const Avatar = ({ name, photo, size = 40 }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  const colors = ['oklch(62% 0.14 195)', 'oklch(62% 0.14 48)', 'oklch(55% 0.14 155)', 'oklch(60% 0.14 290)', 'oklch(60% 0.14 20)'];
  const bg = colors[name ? name.charCodeAt(0) % colors.length : 0];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: photo ? undefined : bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.36, fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden' }}>
      {photo ? <img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </div>
  );
};

export const ProgressSteps = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: i < current ? 'oklch(52% 0.155 195)' : i === current ? 'oklch(52% 0.155 195)' : 'oklch(90% 0.008 80)', color: i <= current ? '#fff' : 'oklch(60% 0.008 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, transition: 'all .3s' }}>
            {i < current ? '✓' : i + 1}
          </div>
          <span style={{ fontSize: 10, marginTop: 4, color: i <= current ? 'oklch(52% 0.155 195)' : 'oklch(62% 0.008 80)', fontWeight: i === current ? 600 : 400, textAlign: 'center', lineHeight: 1.2 }}>{s}</span>
        </div>
        {i < steps.length - 1 && <div style={{ height: 2, flex: 0.5, background: i < current ? 'oklch(52% 0.155 195)' : 'oklch(90% 0.008 80)', marginBottom: 20, transition: 'background .3s' }} />}
      </React.Fragment>
    ))}
  </div>
);

// ── Bottom Sheet ──────────────────────────────────────────────────────────────
export const BottomSheet = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0', padding: '0 0 32px', maxHeight: '85%', display: 'flex', flexDirection: 'column', animation: 'slideUp .25s ease' }}>
        <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'oklch(88% 0.008 80)', margin: '0 auto 0 auto' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'oklch(93% 0.005 80)', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '0 20px' }}>{children}</div>
      </div>
    </div>
  );
};

// ── Toast ─────────────────────────────────────────────────────────────────────
export const Toast = ({ msg }) => msg ? (
  <div style={{ position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', background: 'oklch(20% 0.01 80)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 200, textAlign: 'center', animation: 'fadeIn .2s', maxWidth: 400 }}>
    {msg}
  </div>
) : null;

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const MOCK_EVENTS = [
  { id: 1, title: 'Sensory Friendly Art Class', date: 'Sat 3 May', time: '10:00 AM', suburb: 'Fitzroy', category: 'Arts', a11y: ['wheelchair', 'sensory', 'lowstim'], status: 'open', spots: 6, capacity: 12, sponsor: 'Scope', image: null, description: 'A relaxed art class in a low-stimulation environment. All skill levels welcome. Materials provided. Wheelchair accessible studio with wide aisles and quiet background music only.' },
  { id: 2, title: 'Wheelchair Basketball Social', date: 'Sun 4 May', time: '2:00 PM', suburb: 'Docklands', category: 'Sport', a11y: ['wheelchair', 'parking', 'companion'], status: 'open', spots: 3, capacity: 16, sponsor: null, image: null, description: 'Join our weekly wheelchair basketball social game. Equipment available. Transport support can be arranged — contact us in advance.' },
  { id: 3, title: 'NDIS Planning Workshop', date: 'Wed 7 May', time: '11:00 AM', suburb: 'Carlton', category: 'Education', a11y: ['wheelchair', 'hearing', 'auslan'], status: 'waitlist', spots: 0, capacity: 20, sponsor: 'NDIS', image: null, description: 'Learn how to get the most out of your NDIS plan. An AUSLAN interpreter will be present. Morning tea provided.' },
  { id: 4, title: 'Coffee & Connect Morning', date: 'Thu 8 May', time: '9:30 AM', suburb: 'Collingwood', category: 'Social', a11y: ['wheelchair', 'companion'], status: 'open', spots: 12, capacity: 20, sponsor: null, image: null, description: 'A relaxed coffee morning for NDIS participants to meet others in their community. Held at a Disability Friendly café.' },
  { id: 5, title: 'Supported Swimming Session', date: 'Sat 10 May', time: '8:00 AM', suburb: 'Northcote', category: 'Sport', a11y: ['wheelchair', 'companion', 'parking'], status: 'full', spots: 0, capacity: 10, sponsor: null, image: null, description: 'Supported swimming sessions with trained lifeguards and support workers available. Pool has a hoist for easy access.' },
  { id: 6, title: 'Inclusive Cooking Class', date: 'Tue 13 May', time: '6:00 PM', suburb: 'Brunswick', category: 'Skills', a11y: ['wheelchair', 'sensory'], status: 'open', spots: 4, capacity: 8, sponsor: null, image: null, description: 'Learn to cook simple, nutritious meals in an accessible kitchen. All abilities welcome. Support workers welcome to attend.' },
];

export const MOCK_IDEAS = [
  { id: 1, title: 'Movie Night with Audio Description', desc: 'A monthly movie night using audio description technology so everyone can enjoy the film together. Could be held at a local accessible cinema.', category: 'Arts', suburb: 'Melbourne CBD', author: 'Priya M.', date: '2 days ago', interests: 34, status: 'pending' },
  { id: 2, title: 'Accessible Hiking Group', desc: 'Gentle walks on accessible trails with a social lunch after. Would love to connect with other participants who enjoy the outdoors.', category: 'Sport', suburb: 'Various', author: 'James T.', date: '5 days ago', interests: 28, status: 'pending' },
  { id: 3, title: 'Board Game Afternoons', desc: 'A regular afternoon of board games — relaxed, social, low-stimulation environment. All games in accessible formats where possible.', category: 'Social', suburb: 'Fitzroy', author: 'Sasha R.', date: '1 week ago', interests: 19, status: 'live', eventId: 4 },
  { id: 4, title: 'Adaptive Photography Workshop', desc: 'Photography workshop adapted for participants with various disabilities. Camera equipment available to borrow. Beginners very welcome.', category: 'Arts', suburb: 'St Kilda', author: 'Marcus L.', date: '2 weeks ago', interests: 15, status: 'pending' },
  { id: 5, title: 'Supported Gardening Group', desc: 'Community gardening at a local accessible garden. Great for wellbeing, social connection, and growing your own food.', category: 'Skills', suburb: 'Northcote', author: 'Amira K.', date: '3 weeks ago', interests: 11, status: 'pending' },
];

export const MOCK_BUSINESSES = [
  { id: 1, name: 'The Inclusive Brew', category: 'Café', suburb: 'Fitzroy', a11y: ['wheelchair', 'sensory', 'companion'], badge: true },
  { id: 2, name: 'Accessible Arts Space', category: 'Venue', suburb: 'Collingwood', a11y: ['wheelchair', 'hearing', 'parking'], badge: true },
  { id: 3, name: 'Healthy Steps Allied Health', category: 'Allied Health', suburb: 'Carlton', a11y: ['wheelchair', 'auslan'], badge: false },
];

export const MOCK_ATTENDEES = [
  { name: 'Priya M.' }, { name: 'James T.' }, { name: 'Sasha R.' }, { name: 'Marcus L.' }, { name: 'Amira K.' }, { name: 'Tom B.' }, { name: 'Zoe C.' }
];

export const MOCK_PENDING_CONNECTIONS = [
  { id: 1, name: 'Marcus L.', event: 'Sensory Friendly Art Class', age: 28 },
  { id: 2, name: 'Sasha R.', event: 'Coffee & Connect Morning', age: 24 },
];

export const CATEGORIES = ['All', 'Arts', 'Sport', 'Education', 'Social', 'Skills'];
export const SUBURBS = ['All suburbs', 'Fitzroy', 'Docklands', 'Carlton', 'Collingwood', 'Northcote', 'Brunswick'];
