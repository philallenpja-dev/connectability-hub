import React from 'react';
import { A11Y_ATTRS, A11yIcon, Avatar, Badge, Btn, CATEGORIES, Card, Input, MOCK_ATTENDEES, MOCK_BUSINESSES, MOCK_EVENTS, MOCK_IDEAS, MOCK_PENDING_CONNECTIONS, SUBURBS } from './shared.jsx';
import { useEvents } from './hooks/useEvents.js';
import { useIdeas } from './hooks/useIdeas.js';
import { RegistrationFlow } from './hubScreens.jsx';

// ─── ConnectAbility Hub — Desktop Screen Components ──────────────────────────
// Requires hub-shared.jsx to be loaded first

// ── Top Navigation ────────────────────────────────────────────────────────────
export const TopNav = ({ auth, view, onNavigate, onSignOut, carerName }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const navLinks = [
    ...(auth === 'participant' || auth === 'carer' ? [{ id: 'dashboard', label: 'Dashboard' }] : []),
    { id: 'events', label: 'Events' },
    { id: 'places', label: 'Places' },
    { id: 'ideas', label: 'Idea Board' },
    { id: 'businesses', label: 'Businesses' },
  ];
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
      {carerName && (
        <div style={{ background: 'oklch(52% 0.155 195)', padding: '6px 0', textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>Managing profile for: {carerName} — <button onClick={() => onNavigate('carer')} style={{ color: 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, textDecoration: 'underline' }}>Switch</button></span>
        </div>
      )}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', gap: 0 }}>
        {/* Logo */}
        <button onClick={() => onNavigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginRight: 40, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'oklch(52% 0.155 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤝</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'oklch(18% 0.01 80)' }}>ConnectAbility</span>
        </button>
        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => onNavigate(l.id)} style={{ padding: '8px 16px', borderRadius: 10, background: view === l.id ? 'oklch(93% 0.04 195)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: view === l.id ? 700 : 500, color: view === l.id ? 'oklch(40% 0.14 195)' : 'oklch(38% 0.01 80)', transition: 'all .15s' }}>
              {l.label}
            </button>
          ))}
          {auth === 'admin' && <button onClick={() => onNavigate('admin')} style={{ padding: '8px 16px', borderRadius: 10, background: view === 'admin' ? 'oklch(93% 0.06 50)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: view === 'admin' ? 'oklch(42% 0.14 48)' : 'oklch(38% 0.01 80)' }}>Admin</button>}
        </nav>
        {/* Auth */}
        {auth === 'guest' ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="ghost" size="sm" onClick={() => onNavigate('signin')}>Sign in</Btn>
            <Btn variant="primary" size="sm" onClick={() => onNavigate('register')}>Register free</Btn>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 6 }}>🔔<span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: 'oklch(55% 0.18 20)' }} /></button>
            <button onClick={() => setProfileOpen(!profileOpen)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'oklch(95% 0.005 80)', border: '1px solid oklch(88% 0.01 80)', borderRadius: 24, padding: '5px 12px 5px 6px', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Avatar name="Alex M." size={28} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'oklch(22% 0.01 80)' }}>Alex M.</span>
              <span style={{ fontSize: 10, color: 'oklch(55% 0.008 80)' }}>▾</span>
            </button>
            {profileOpen && (
              <div style={{ position: 'absolute', top: 44, right: 0, background: '#fff', border: '1px solid oklch(90% 0.008 80)', borderRadius: 14, padding: '8px', width: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 100 }}>
                {[['Profile settings','👤','account'], ['Carer dashboard','🤗','carer'], ['Notification settings','🔔',null]].map(([l, i, nav]) => (
                  <button key={l} onClick={() => { setProfileOpen(false); if (nav) onNavigate(nav); }} style={{ display: 'flex', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: 'oklch(28% 0.01 80)', textAlign: 'left', alignItems: 'center' }}>
                    <span>{i}</span>{l}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid oklch(93% 0.008 80)', margin: '4px 0' }} />
                <button onClick={() => { setProfileOpen(false); onSignOut(); }} style={{ display: 'flex', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: 'oklch(50% 0.18 20)', textAlign: 'left', alignItems: 'center' }}>
                  <span>🚪</span>Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Landing Desktop ───────────────────────────────────────────────────────────
export const LandingDesktop = ({ onNavigate }) => (
  <div style={{ background: 'oklch(97% 0.009 75)' }}>
    {/* Hero */}
    <div style={{ background: 'linear-gradient(135deg, oklch(48% 0.155 200) 0%, oklch(54% 0.15 185) 100%)', padding: '80px 32px 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <Badge color="teal" style={{ marginBottom: 20 }}>NDIS Community Platform</Badge>
          <h1 style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20, marginTop: 12 }}>Your community,<br />your way.</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>Discover accessible events near you, connect safely with peers, and help shape what activities happen in your community.</p>
          <div style={{ display: 'flex', gap: 14 }}>
            <Btn variant="amber" size="lg" onClick={() => onNavigate('register')} style={{ fontSize: 16, padding: '15px 32px' }}>Register free →</Btn>
            <Btn variant="ghost" size="lg" onClick={() => onNavigate('events')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', fontSize: 16, padding: '15px 32px' }}>Browse events</Btn>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>1,284 participants · 24 active events · Free to join</p>
        </div>
        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['🗓', 'Accessible Events', 'Filter by wheelchair access, sensory-friendly, AUSLAN, and more'],['🔒','Safe Connect','Connect with peers at events — with carer approval built in'],['💡','Idea Board','Suggest activities and vote on what your community wants'],['🏪','Local Businesses','Find Disability Friendly cafés, venues, and services near you']].map(([i, t, d]) => (
            <div key={t} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{i}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Featured events */}
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'oklch(18% 0.01 80)', marginBottom: 4 }}>Events near you</h2>
          <p style={{ fontSize: 15, color: 'oklch(52% 0.008 80)' }}>Upcoming accessible events in your area</p>
        </div>
        <Btn variant="secondary" size="md" onClick={() => onNavigate('events')}>See all events →</Btn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
        {MOCK_EVENTS.slice(0, 3).map(ev => <EventCardDesktop key={ev.id} event={ev} onClick={() => onNavigate('event-detail', ev)} />)}
      </div>
    </div>

    {/* Split: Idea Board teaser + Stats */}
    <div style={{ background: '#fff', borderTop: '1px solid oklch(92% 0.008 80)', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Badge color="amber">Community Ideas</Badge>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginTop: 12, marginBottom: 14, color: 'oklch(18% 0.01 80)', lineHeight: 1.2 }}>Have an idea for an event?</h2>
          <p style={{ fontSize: 16, color: 'oklch(48% 0.008 80)', lineHeight: 1.7, marginBottom: 24 }}>The Idea Board lets participants suggest activities and vote on what matters to them. The most popular ideas get turned into real events.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {MOCK_IDEAS.slice(0, 3).map(idea => (
              <div key={idea.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'oklch(97% 0.005 80)', borderRadius: 12, border: '1px solid oklch(90% 0.008 80)' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'oklch(25% 0.01 80)' }}>{idea.title}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'oklch(50% 0.14 48)' }}>💛 {idea.interests}</span>
              </div>
            ))}
          </div>
          <Btn variant="amber" size="md" onClick={() => onNavigate('ideas')}>View Idea Board →</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['1,284', 'Community members', 'teal'], ['24', 'Active events this month', 'amber'], ['486', 'Total RSVPs', 'green'], ['89%', 'Satisfaction rating', 'blue']].map(([n, l, c]) => (
            <div key={l} style={{ background: 'oklch(97% 0.005 80)', borderRadius: 20, padding: '28px 24px', border: '1px solid oklch(90% 0.008 80)', textAlign: 'center' }}>
              <p style={{ fontSize: 40, fontWeight: 800, color: {teal:'oklch(48% 0.155 195)',amber:'oklch(52% 0.14 48)',green:'oklch(42% 0.14 155)',blue:'oklch(45% 0.14 250)'}[c], marginBottom: 8 }}>{n}</p>
              <p style={{ fontSize: 13, color: 'oklch(45% 0.008 80)', fontWeight: 500, lineHeight: 1.4 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Businesses */}
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'oklch(18% 0.01 80)', marginBottom: 4 }}>Disability Friendly businesses</h2>
          <p style={{ fontSize: 15, color: 'oklch(52% 0.008 80)' }}>Verified accessible venues near you</p>
        </div>
        <Btn variant="secondary" size="md" onClick={() => onNavigate('businesses')}>See all businesses →</Btn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 56 }}>
        {MOCK_BUSINESSES.map(b => (
          <Card key={b.id} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'oklch(93% 0.04 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏪</div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{b.name}</p>
                <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{b.category} · {b.suburb}</p>
              </div>
            </div>
            {b.badge && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'oklch(93% 0.05 155)', borderRadius: 20, padding: '4px 10px', marginBottom: 12 }}><span style={{ fontSize: 11, fontWeight: 700, color: 'oklch(35% 0.14 155)' }}>✓ Disability Friendly</span></div>}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {b.a11y.map(a => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '3px 8px', borderRadius: 20 }}><A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" /><span>{A11Y_ATTRS.find(x => x.id === a)?.label}</span></div>)}
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* Sponsor strip */}
    <div style={{ borderTop: '1px solid oklch(92% 0.008 80)', background: '#fff', padding: '32px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'oklch(60% 0.008 80)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Proudly supported by</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          {['Harvey Normal', 'Dapth', 'What Ability', '', 'Ford and Doonan'].map((s, i) => s ? <span key={i} style={{ fontSize: 18, fontWeight: 800, color: 'oklch(70% 0.01 80)', letterSpacing: '0.04em' }}>{s}</span> : null)}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div style={{ background: 'oklch(18% 0.012 195)', padding: '40px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🤝</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>ConnectAbility Hub</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 280 }}>A safe, accessible community platform for NDIS participants, carers, and the people who support them.</p>
        </div>
        {[['Platform', ['Events', 'Idea Board', 'Businesses', 'Sponsors']], ['Support', ['Help Centre', 'Accessibility', 'Safeguarding', 'Contact Us']], ['Legal', ['Privacy Policy', 'Terms of Service', 'Cookie Policy']]].map(([section, links]) => (
          <div key={section}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{section}</p>
            {links.map(l => <p key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 8, cursor: 'pointer' }}>{l}</p>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '24px auto 0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>© 2026 ConnectAbility Hub. All rights reserved. WCAG 2.1 AA compliant.</p>
      </div>
    </div>
  </div>
);

// ── Event Card (desktop) ──────────────────────────────────────────────────────
export const EventCardDesktop = ({ event: ev, onClick }) => {
  const statusColor = { open: 'green', waitlist: 'amber', full: 'red' }[ev.status];
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ background: `oklch(${{ Arts:'85% 0.06 290',Sport:'85% 0.06 195',Education:'85% 0.06 250',Social:'85% 0.06 48',Skills:'85% 0.06 155' }[ev.category]||'90% 0.005 80'})`, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>
        {{'Arts':'🎨','Sport':'⚽','Education':'📚','Social':'☕','Skills':'🍳'}[ev.category]||'📅'}
      </div>
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(18% 0.01 80)', lineHeight: 1.3, flex: 1, paddingRight: 10 }}>{ev.title}</h3>
          <Badge color={statusColor}>{{ open:'Open',waitlist:'Waitlist',full:'Full' }[ev.status]}</Badge>
        </div>
        <p style={{ fontSize: 13, color: 'oklch(52% 0.008 80)', marginBottom: 10 }}>{ev.date} · {ev.time} · {ev.suburb}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ev.a11y.slice(0, 3).map(a => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '3px 8px', borderRadius: 20 }}><A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" /><span>{A11Y_ATTRS.find(x=>x.id===a)?.label}</span></div>)}
          {ev.a11y.length > 3 && <span style={{ fontSize: 11, color: 'oklch(55% 0.008 80)', padding: '3px 6px' }}>+{ev.a11y.length-3} more</span>}
        </div>
        {ev.sponsor && <p style={{ fontSize: 12, color: 'oklch(58% 0.008 80)', marginTop: 10 }}>Supported by {ev.sponsor}</p>}
      </div>
    </Card>
  );
};

// ── Events Desktop ────────────────────────────────────────────────────────────
export const EventsDesktop = ({ onNavigate, rsvpState }) => {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeSuburb, setActiveSuburb] = React.useState('All suburbs');
  const [a11yFilters, setA11yFilters] = React.useState(new Set());
  const [view, setView] = React.useState('grid');
  const [sort, setSort] = React.useState('date');
  const { events, loading, source } = useEvents(MOCK_EVENTS);

  const toggleA11y = (id) => setA11yFilters(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = events.filter(ev => {
    if (search && !ev.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory !== 'All' && ev.category !== activeCategory) return false;
    if (activeSuburb !== 'All suburbs' && ev.suburb !== activeSuburb) return false;
    if (a11yFilters.size > 0 && ![...a11yFilters].every(f => ev.a11y.includes(f))) return false;
    return true;
  });

  const activeFilterCount = (activeCategory !== 'All' ? 1 : 0) + (activeSuburb !== 'All suburbs' ? 1 : 0) + a11yFilters.size;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
      {/* Sidebar filters */}
      <aside>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px', position: 'sticky', top: 90 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Filters</h2>
            {activeFilterCount > 0 && <button onClick={() => { setActiveCategory('All'); setActiveSuburb('All suburbs'); setA11yFilters(new Set()); }} style={{ fontSize: 12, color: 'oklch(52% 0.155 195)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Clear all ({activeFilterCount})</button>}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…" style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', background: 'oklch(98% 0.004 80)', boxSizing: 'border-box' }} />
          </div>

          {/* Category */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Category</p>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '8px 10px', borderRadius: 8, border: 'none', background: activeCategory === c ? 'oklch(93% 0.04 195)' : 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: activeCategory === c ? 'oklch(38% 0.14 195)' : 'oklch(30% 0.01 80)', fontWeight: activeCategory === c ? 600 : 400, marginBottom: 2 }}>
              <span>{c}</span>
              <span style={{ fontSize: 12, color: 'oklch(60% 0.008 80)' }}>{c === 'All' ? events.length : events.filter(e => e.category === c).length}</span>
            </button>
          ))}

          <div style={{ borderTop: '1px solid oklch(93% 0.008 80)', margin: '14px 0' }} />

          {/* Suburb */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Suburb</p>
          <select value={activeSuburb} onChange={e => setActiveSuburb(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 14, fontFamily: 'inherit', background: '#fff', marginBottom: 16 }}>
            {SUBURBS.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Accessibility */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Accessibility</p>
          {A11Y_ATTRS.map(a => (
            <button key={a.id} onClick={() => toggleA11y(a.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', borderRadius: 8, border: 'none', background: a11yFilters.has(a.id) ? 'oklch(93% 0.04 195)' : 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: a11yFilters.has(a.id) ? 'oklch(38% 0.14 195)' : 'oklch(32% 0.01 80)', marginBottom: 2 }}>
              <A11yIcon type={a.id} size={16} color={a11yFilters.has(a.id) ? 'oklch(38% 0.14 195)' : 'oklch(55% 0.008 80)'} />
              <span style={{ flex: 1, textAlign: 'left' }}>{a.label}</span>
              {a11yFilters.has(a.id) && <span style={{ fontSize: 12, fontWeight: 700 }}>✓</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Event grid */}
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: 'oklch(45% 0.008 80)' }}><strong style={{ color: 'oklch(18% 0.01 80)' }}>{filtered.length}</strong> events found</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 12px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', background: '#fff' }}>
              <option value="date">Sort: Date</option>
              <option value="name">Sort: Name</option>
              <option value="spots">Sort: Spots available</option>
            </select>
            <div style={{ display: 'flex', background: 'oklch(93% 0.005 80)', borderRadius: 10, padding: 3 }}>
              {[['grid','⊞'],['list','☰']].map(([v,i]) => (
                <button key={v} onClick={() => setView(v)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: view===v ? '#fff' : 'transparent', cursor: 'pointer', fontSize: 16, boxShadow: view===v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all .15s' }}>{i}</button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No events found</p>
            <p style={{ fontSize: 15, color: 'oklch(55% 0.008 80)', marginBottom: 20 }}>Try adjusting your filters</p>
            <Btn variant="secondary" size="md" onClick={() => { setActiveCategory('All'); setActiveSuburb('All suburbs'); setA11yFilters(new Set()); setSearch(''); }}>Clear all filters</Btn>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {filtered.map(ev => <EventCardDesktop key={ev.id} event={ev} onClick={() => onNavigate('event-detail', ev)} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(ev => (
              <div key={ev.id} onClick={() => onNavigate('event-detail', ev)} style={{ background: '#fff', borderRadius: 14, border: '1px solid oklch(90% 0.008 80)', padding: '16px 20px', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center', transition: 'box-shadow .15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow=''}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: `oklch(${{ Arts:'85% 0.06 290',Sport:'85% 0.06 195',Education:'85% 0.06 250',Social:'85% 0.06 48',Skills:'85% 0.06 155' }[ev.category]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {{'Arts':'🎨','Sport':'⚽','Education':'📚','Social':'☕','Skills':'🍳'}[ev.category]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{ev.title}</h3>
                    <Badge color={{ open:'green',waitlist:'amber',full:'red' }[ev.status]}>{{ open:'Open',waitlist:'Waitlist',full:'Full' }[ev.status]}</Badge>
                  </div>
                  <p style={{ fontSize: 13, color: 'oklch(52% 0.008 80)', marginBottom: 8 }}>{ev.date} · {ev.time} · {ev.suburb}</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {ev.a11y.slice(0,4).map(a => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '2px 8px', borderRadius: 20 }}><A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" /><span>{A11Y_ATTRS.find(x=>x.id===a)?.label}</span></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// ── Event Detail Desktop ──────────────────────────────────────────────────────
export const EventDetailDesktop = ({ event: ev, onNavigate, rsvpState, setRsvpState, auth }) => {
  const [showOptIn, setShowOptIn] = React.useState(false);
  const [optedIn, setOptedIn] = React.useState(false);
  const currentRsvp = rsvpState[ev.id] || 'none';

  const handleRsvp = () => {
    if (auth === 'guest') { onNavigate('register'); return; }
    if (currentRsvp === 'none') {
      const ns = ev.status === 'open' ? 'going' : 'waitlist';
      setRsvpState(p => ({ ...p, [ev.id]: ns }));
      if (ns === 'going') setShowOptIn(true);
    } else {
      setRsvpState(p => ({ ...p, [ev.id]: 'none' }));
    }
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <button onClick={() => onNavigate('events')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: 'oklch(52% 0.155 195)', fontWeight: 600, marginBottom: 24 }}>
        ← Back to events
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
        {/* Main content */}
        <div>
          <div style={{ background: `oklch(${{ Arts:'82% 0.08 290',Sport:'82% 0.08 195',Education:'82% 0.08 250',Social:'82% 0.08 48',Skills:'82% 0.08 155' }[ev.category]})`, height: 280, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96, marginBottom: 28 }}>
            {{'Arts':'🎨','Sport':'⚽','Education':'📚','Social':'☕','Skills':'🍳'}[ev.category]}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: 'oklch(14% 0.01 80)', lineHeight: 1.2, flex: 1, paddingRight: 20 }}>{ev.title}</h1>
            <Badge color={{ open:'green',waitlist:'amber',full:'red' }[ev.status]}>{{ open:'Open',waitlist:'Waitlist',full:'Full' }[ev.status]}</Badge>
          </div>
          {ev.sponsor && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'oklch(94% 0.05 50)', borderRadius: 10, padding: '8px 14px', marginBottom: 20 }}><span style={{ fontSize: 16 }}>🤝</span><span style={{ fontSize: 14, color: 'oklch(40% 0.12 48)', fontWeight: 600 }}>Supported by {ev.sponsor}</span></div>}
          <p style={{ fontSize: 16, color: 'oklch(32% 0.008 80)', lineHeight: 1.8, marginBottom: 32 }}>{ev.description}</p>

          {/* Accessibility */}
          <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 16, padding: '20px 24px', marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 14 }}>♿ Accessibility features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ev.a11y.map(a => {
                const attr = A11Y_ATTRS.find(x => x.id === a);
                return (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 10, padding: '10px 14px' }}>
                    <A11yIcon type={a} size={20} color="oklch(45% 0.14 195)" />
                    <span style={{ fontSize: 14, color: 'oklch(28% 0.01 80)', fontWeight: 500 }}>{attr?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendees */}
          {currentRsvp === 'going' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>People going</h2>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {MOCK_ATTENDEES.map((a, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Avatar name={a.name} size={52} />
                    <span style={{ fontSize: 12, color: 'oklch(50% 0.008 80)' }}>{a.name.split(' ')[0]}</span>
                  </div>
                ))}
                {optedIn && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><Avatar name="You" size={52} /><span style={{ fontSize: 12, color: 'oklch(52% 0.155 195)', fontWeight: 600 }}>You</span></div>}
              </div>
            </div>
          )}
        </div>

        {/* Sticky sidebar */}
        <div style={{ position: 'sticky', top: 90 }}>
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            <div style={{ display: 'flex', flex: 'column', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[['📅', `${ev.date} · ${ev.time}`], ['📍', ev.suburb], ['👥', ev.status === 'open' ? `${ev.spots} of ${ev.capacity} spots left` : ev.status === 'full' ? 'Event is full' : 'Join the waitlist']].map(([i, t]) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, width: 26 }}>{i}</span>
                  <span style={{ fontSize: 14, color: 'oklch(30% 0.01 80)', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>

            {ev.status === 'full' && currentRsvp === 'none' ? (
              <Btn fullWidth disabled>This event is full</Btn>
            ) : currentRsvp === 'going' ? (
              <div>
                <div style={{ background: 'oklch(93% 0.05 155)', borderRadius: 12, padding: '14px', textAlign: 'center', marginBottom: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'oklch(35% 0.14 155)' }}>✓ You're going!</p>
                </div>
                <Btn fullWidth variant="ghost" size="sm" onClick={handleRsvp}>Cancel RSVP</Btn>
              </div>
            ) : currentRsvp === 'waitlist' ? (
              <div>
                <div style={{ background: 'oklch(93% 0.06 50)', borderRadius: 12, padding: '14px', textAlign: 'center', marginBottom: 10 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'oklch(42% 0.14 48)' }}>⏳ On waitlist</p>
                </div>
                <Btn fullWidth variant="ghost" size="sm" onClick={handleRsvp}>Leave waitlist</Btn>
              </div>
            ) : (
              <Btn fullWidth variant={ev.status === 'waitlist' ? 'amber' : 'primary'} size="lg" onClick={handleRsvp}>
                {ev.status === 'waitlist' ? 'Join Waitlist' : 'RSVP — I\'m going!'}
              </Btn>
            )}

            {auth === 'guest' && <p style={{ fontSize: 12, color: 'oklch(58% 0.008 80)', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>You'll need to <button onClick={() => onNavigate('register')} style={{ color: 'oklch(52% 0.155 195)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, padding: 0 }}>create a free account</button> to RSVP.</p>}
          </div>

          {/* Safe Connect opt-in */}
          {currentRsvp === 'going' && (
            <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 16, padding: '18px 20px', border: '1px solid oklch(88% 0.07 195)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 8 }}>🔒 Safe Connect</p>
              <p style={{ fontSize: 13, color: 'oklch(42% 0.10 195)', lineHeight: 1.5, marginBottom: 14 }}>Let others at this event see your first name and photo.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'oklch(28% 0.01 80)', fontWeight: 500 }}>Visible to attendees</span>
                <div onClick={() => setOptedIn(!optedIn)} style={{ width: 46, height: 26, borderRadius: 13, background: optedIn ? 'oklch(52% 0.155 195)' : 'oklch(82% 0.008 80)', padding: 3, cursor: 'pointer', position: 'relative', transition: 'background .2s' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: optedIn ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Ideas Desktop ─────────────────────────────────────────────────────────────
export const IdeasDesktop = ({ auth, onNavigate }) => {
  const [interests, setInterests] = React.useState(new Set());
  const [sort, setSort] = React.useState('popular');
  const [showModal, setShowModal] = React.useState(false);
  const [newIdea, setNewIdea] = React.useState({ title: '', desc: '', category: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const { ideas, loading, source } = useIdeas(MOCK_IDEAS);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const toggleInterest = (id) => {
    if (auth === 'guest') { onNavigate('register'); return; }
    setInterests(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    showToast(interests.has(id) ? 'Interest removed' : '💛 Interest recorded!');
  };
  const sorted = [...ideas].sort((a, b) => sort === 'popular' ? (b.interests + (interests.has(b.id)?1:0)) - (a.interests + (interests.has(a.id)?1:0)) : 0);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40, alignItems: 'start' }}>
      {/* Sidebar */}
      <aside>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '24px', position: 'sticky', top: 90 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Idea Board</h2>
          <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 20 }}>Suggest events and vote on what matters to your community. The most popular ideas get turned into real events!</p>
          <Btn fullWidth variant="amber" size="md" onClick={() => { if (auth === 'guest') { onNavigate('register'); return; } setShowModal(true); }}>+ Submit your idea</Btn>
          <div style={{ marginTop: 20, borderTop: '1px solid oklch(93% 0.008 80)', paddingTop: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Sort by</p>
            {[['popular','Most popular'],['new','Newest']].map(([v,l]) => (
              <button key={v} onClick={() => setSort(v)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 12px', borderRadius: 10, border: 'none', background: sort===v ? 'oklch(93% 0.04 195)' : 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: sort===v ? 700 : 400, color: sort===v ? 'oklch(38% 0.14 195)' : 'oklch(32% 0.01 80)', marginBottom: 4 }}>
                {l} {sort===v && '✓'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, background: 'oklch(95% 0.04 155)', borderRadius: 12, padding: '14px 16px' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(35% 0.14 155)', marginBottom: 4 }}>🎉 {ideas.filter(i=>i.status==='live').length} idea turned event!</p>
            <p style={{ fontSize: 12, color: 'oklch(42% 0.10 155)', lineHeight: 1.5 }}>Community ideas that got enough interest are now live events.</p>
          </div>
        </div>
      </aside>

      {/* Ideas feed */}
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: 'oklch(45% 0.008 80)' }}><strong style={{ color: 'oklch(18% 0.01 80)' }}>{ideas.length}</strong> community ideas</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sorted.map(idea => {
            const liked = interests.has(idea.id);
            const count = idea.interests + (liked ? 1 : 0);
            return (
              <Card key={idea.id} style={{ padding: '20px 24px' }}>
                {idea.status === 'live' && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(93% 0.05 155)', borderRadius: 8, padding: '6px 12px', marginBottom: 12 }}><span style={{ fontSize: 13, color: 'oklch(32% 0.14 155)', fontWeight: 700 }}>🎉 This idea became an event!</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'oklch(18% 0.01 80)', marginBottom: 8 }}>{idea.title}</h3>
                    <p style={{ fontSize: 14, color: 'oklch(45% 0.008 80)', lineHeight: 1.6, marginBottom: 12 }}>{idea.desc}</p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Badge color="gray">{idea.category}</Badge>
                      <span style={{ fontSize: 12, color: 'oklch(60% 0.008 80)' }}>by {idea.author} · {idea.date}</span>
                      {idea.suburb && <span style={{ fontSize: 12, color: 'oklch(60% 0.008 80)' }}>📍 {idea.suburb}</span>}
                    </div>
                    {idea.status === 'live' && <Btn variant="secondary" size="sm" style={{ marginTop: 12 }} onClick={() => onNavigate('events')}>View event →</Btn>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => toggleInterest(idea.id)} style={{ width: 56, height: 56, borderRadius: 16, border: `2px solid ${liked ? 'oklch(63% 0.14 48)' : 'oklch(88% 0.01 80)'}`, background: liked ? 'oklch(93% 0.06 50)' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transition: 'all .15s', transform: liked ? 'scale(1.05)' : 'scale(1)' }}>
                      <span style={{ fontSize: 22 }}>{liked ? '💛' : '🤍'}</span>
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 700, color: liked ? 'oklch(50% 0.14 48)' : 'oklch(50% 0.008 80)' }}>{count}</span>
                    <span style={{ fontSize: 11, color: 'oklch(65% 0.008 80)' }}>interested</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {toast && <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'oklch(18% 0.01 80)', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 200, animation: 'fadeIn .2s' }}>{toast}</div>}

      {/* Submit modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: 520, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Idea submitted!</h3>
                <p style={{ fontSize: 15, color: 'oklch(55% 0.008 80)', marginBottom: 24 }}>Your idea is under review. We'll let you know when it's approved.</p>
                <Btn variant="primary" size="lg" onClick={() => { setShowModal(false); setSubmitted(false); setNewIdea({ title:'',desc:'',category:'' }); }}>Done</Btn>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800 }}>Share your idea</h2>
                  <button onClick={() => setShowModal(false)} style={{ background: 'oklch(93% 0.005 80)', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 18, cursor: 'pointer' }}>×</button>
                </div>
                <Input label="Idea title (required)" placeholder="e.g. Monthly board game afternoon" value={newIdea.title} onChange={e => setNewIdea(p => ({ ...p, title: e.target.value }))} />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>Description <span style={{ fontWeight: 400, color: 'oklch(58% 0.008 80)' }}>(optional)</span></label>
                  <textarea value={newIdea.desc} onChange={e => setNewIdea(p => ({ ...p, desc: e.target.value }))} placeholder="Tell us more…" maxLength={500} rows={4} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid oklch(87% 0.01 80)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
                  <p style={{ fontSize: 12, color: 'oklch(60% 0.008 80)', textAlign: 'right', marginTop: 3 }}>{newIdea.desc.length}/500</p>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 8 }}>Category</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <button key={c} onClick={() => setNewIdea(p => ({ ...p, category: c }))} style={{ padding: '7px 16px', borderRadius: 20, border: `1.5px solid ${newIdea.category===c ? 'oklch(63% 0.14 48)':'oklch(88% 0.01 80)'}`, background: newIdea.category===c ? 'oklch(93% 0.06 50)':'#fff', color: newIdea.category===c ? 'oklch(42% 0.14 48)':'oklch(45% 0.01 80)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>{c}</button>
                    ))}
                  </div>
                </div>
                <Btn fullWidth variant="amber" size="lg" disabled={!newIdea.title.trim()} onClick={() => { setSubmitted(true); }}>Submit idea</Btn>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Registration Desktop ──────────────────────────────────────────────────────
export const RegistrationDesktop = ({ onComplete, onBack }) => (
  <div style={{ minHeight: '100vh', background: 'oklch(97% 0.009 75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
    <div style={{ width: '100%', maxWidth: 560, background: '#fff', borderRadius: 24, border: '1px solid oklch(90% 0.008 80)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <RegistrationFlow onComplete={onComplete} onBack={onBack} />
    </div>
  </div>
);

// ── Carer Desktop ─────────────────────────────────────────────────────────────
export const CarerDesktop = ({ onNavigate }) => {
  const [active, setActive] = React.useState(0);
  const [pending, setPending] = React.useState(MOCK_PENDING_CONNECTIONS);
  const [toast, setToast] = React.useState('');
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const participants = [{ name: 'Emma R.', age: 24, suburb: 'Fitzroy' }, { name: 'Liam R.', age: 20, suburb: 'Carlton' }];
  const handleApprove = id => { setPending(p => p.filter(c => c.id !== id)); showToast('✓ Connection approved'); };
  const handleDecline = id => { setPending(p => p.filter(c => c.id !== id)); showToast('Connection declined'); };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Carer Dashboard</h1>
      <p style={{ fontSize: 15, color: 'oklch(50% 0.008 80)', marginBottom: 28 }}>Manage profiles and approvals for the people in your care</p>

      {/* Profile switcher */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {participants.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 16, border: `2px solid ${active===i ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: active===i ? 'oklch(93% 0.04 195)' : '#fff', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
            <Avatar name={p.name} size={40} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: active===i ? 'oklch(38% 0.14 195)' : 'oklch(18% 0.01 80)' }}>{p.name}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Age {p.age} · {p.suburb}</p>
            </div>
          </button>
        ))}
        <button style={{ padding: '14px 20px', borderRadius: 16, border: '2px dashed oklch(85% 0.01 80)', background: '#fff', cursor: 'pointer', fontSize: 14, color: 'oklch(52% 0.155 195)', fontFamily: 'inherit', fontWeight: 600 }}>+ Add participant</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Pending approvals */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Connection requests</h2>
          {pending.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'oklch(38% 0.14 155)' }}>All caught up!</p>
              <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)', marginTop: 4 }}>No pending connection requests</p>
            </div>
          ) : (
            <div style={{ background: 'oklch(94% 0.06 50)', border: '1.5px solid oklch(86% 0.10 50)', borderRadius: 16, padding: '16px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(40% 0.14 48)', marginBottom: 14 }}>⚠️ {pending.length} request{pending.length>1?'s':''} need{pending.length===1?'s':''} your approval</p>
              {pending.map(conn => (
                <div key={conn.id} style={{ background: '#fff', borderRadius: 14, padding: '16px', marginBottom: 12, border: '1px solid oklch(90% 0.008 80)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                    <Avatar name={conn.name} size={48} />
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 700 }}>{conn.name}</p>
                      <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>Met at: {conn.event}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Btn variant="success" size="sm" style={{ flex: 1 }} onClick={() => handleApprove(conn.id)}>✓ Approve connection</Btn>
                    <Btn variant="danger" size="sm" style={{ flex: 1 }} onClick={() => handleDecline(conn.id)}>✕ Decline</Btn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming events */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{participants[active].name.split(' ')[0]}'s upcoming events</h2>
          {MOCK_EVENTS.slice(0, 3).map(ev => (
            <div key={ev.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid oklch(90% 0.008 80)', padding: '14px 18px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{ev.title}</p>
                <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{ev.date} · {ev.suburb}</p>
              </div>
              <Badge color="green">Going ✓</Badge>
            </div>
          ))}
          <Btn variant="secondary" size="md" style={{ marginTop: 8 }} onClick={() => onNavigate('events')}>+ RSVP on their behalf</Btn>
        </div>

        {/* Activity feed */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Recent activity</h2>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '8px 20px' }}>
            {[
              { icon: '🎉', text: `${participants[active].name.split(' ')[0]} RSVPd to Coffee & Connect Morning`, time: '2 hours ago' },
              { icon: '💛', text: `${participants[active].name.split(' ')[0]} expressed interest in "Movie Night with Audio Description"`, time: 'Yesterday' },
              { icon: '🤝', text: 'New connection request from Marcus L. — awaiting your approval', time: '2 days ago' },
              { icon: '📅', text: `${participants[active].name.split(' ')[0]} attended Sensory Friendly Art Class`, time: '1 week ago' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid oklch(95% 0.005 80)' }}>
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                <div>
                  <p style={{ fontSize: 14, color: 'oklch(25% 0.01 80)', lineHeight: 1.4, marginBottom: 3 }}>{a.text}</p>
                  <p style={{ fontSize: 12, color: 'oklch(62% 0.008 80)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'oklch(18% 0.01 80)', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 200, animation: 'fadeIn .2s' }}>{toast}</div>}
    </div>
  );
};

