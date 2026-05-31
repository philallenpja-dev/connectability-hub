import React from 'react';
import { A11Y_ATTRS, A11yIcon, Avatar, Badge, BottomSheet, Btn, CATEGORIES, Card, Input, MOCK_ATTENDEES, MOCK_BUSINESSES, MOCK_EVENTS, MOCK_IDEAS, MOCK_PENDING_CONNECTIONS, ProgressSteps, SUBURBS, SectionHeader, Toast } from './shared.jsx';
import { AdminPlacesPanel } from './places.jsx';

// ─── ConnectAbility Hub — Screen Components ───────────────────────────────────

// ── Landing Screen ────────────────────────────────────────────────────────────
export const LandingScreen = ({ onNavigate }) => (
  <div style={{ overflowY: 'auto', height: '100%', background: 'oklch(97% 0.009 75)' }}>
    {/* Hero */}
    <div style={{ background: 'oklch(52% 0.155 195)', padding: '40px 24px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>🤝</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>ConnectAbility Hub</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 12 }}>Your community,<br />your way.</h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 28 }}>Discover accessible events, connect safely with peers, and help shape what happens in your community.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="amber" size="md" onClick={() => onNavigate('register')} style={{ flex: 1 }}>Register free</Btn>
          <Btn variant="ghost" size="md" onClick={() => onNavigate('events')} style={{ flex: 1, color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Find events</Btn>
        </div>
        <button onClick={() => onNavigate('signin')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'block', width: '100%', textAlign: 'center' }}>
          Already have an account? <span style={{ color: '#fff', fontWeight: 600 }}>Sign in</span>
        </button>
      </div>
    </div>

    {/* Featured events */}
    <div style={{ padding: '24px 20px 0' }}>
      <SectionHeader title="Events near you" action="See all" onAction={() => onNavigate('events')} />
      {MOCK_EVENTS.slice(0, 3).map(ev => (
        <EventCard key={ev.id} event={ev} onClick={() => onNavigate('event-detail', ev)} compact />
      ))}
    </div>

    {/* Idea Board teaser */}
    <div style={{ margin: '8px 20px', background: 'oklch(93% 0.05 195)', borderRadius: 16, padding: '18px 18px', border: '1px solid oklch(85% 0.08 195)' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(38% 0.14 195)', marginBottom: 4 }}>💡 Have an idea for an event?</p>
      <p style={{ fontSize: 13, color: 'oklch(44% 0.10 195)', lineHeight: 1.5, marginBottom: 12 }}>"{MOCK_IDEAS[0].title}" — {MOCK_IDEAS[0].interests} people interested</p>
      <Btn variant="secondary" size="sm" onClick={() => onNavigate('ideas')}>See the Idea Board →</Btn>
    </div>

    {/* Businesses */}
    <div style={{ padding: '20px 20px 0' }}>
      <SectionHeader title="Disability Friendly businesses" action="See all" onAction={() => onNavigate('businesses')} />
      {MOCK_BUSINESSES.slice(0, 2).map(b => (
        <Card key={b.id} style={{ marginBottom: 10, padding: '14px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'oklch(93% 0.04 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏪</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'oklch(18% 0.01 80)' }}>{b.name}</span>
                {b.badge && <Badge color="green">✓ Disability Friendly</Badge>}
              </div>
              <span style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{b.category} · {b.suburb}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>

    {/* Sponsor banner */}
    <div style={{ margin: '20px 20px 0', padding: '16px 18px', background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', textAlign: 'center' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'oklch(60% 0.008 80)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Proudly supported by</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {['Scope', 'NDIS', 'DCA', 'Brotherhood'].map(s => (
          <span key={s} style={{ fontSize: 13, fontWeight: 700, color: 'oklch(65% 0.01 80)', letterSpacing: '0.03em' }}>{s}</span>
        ))}
      </div>
    </div>

    <div style={{ padding: '20px 20px 32px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, color: 'oklch(65% 0.008 80)' }}>© 2026 ConnectAbility Hub · Privacy · Terms</p>
    </div>
  </div>
);

// ── Event Card ────────────────────────────────────────────────────────────────
export const EventCard = ({ event: ev, onClick, compact }) => {
  const statusColor = { open: 'green', waitlist: 'amber', full: 'red' }[ev.status];
  const statusLabel = { open: 'Open', waitlist: 'Waitlist', full: 'Full' }[ev.status];
  return (
    <Card style={{ marginBottom: 12, cursor: 'pointer' }} onClick={onClick}>
      <div style={{ background: `oklch(${{ Arts: '88% 0.04 290', Sport: '88% 0.04 195', Education: '88% 0.04 250', Social: '88% 0.04 48', Skills: '88% 0.04 155' }[ev.category] || '90% 0.005 80'})`, height: compact ? 80 : 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
        {{'Arts': '🎨', 'Sport': '⚽', 'Education': '📚', 'Social': '☕', 'Skills': '🍳'}[ev.category] || '📅'}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'oklch(18% 0.01 80)', lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{ev.title}</h3>
          <Badge color={statusColor}>{statusLabel}</Badge>
        </div>
        <p style={{ fontSize: 13, color: 'oklch(50% 0.008 80)', marginBottom: 8 }}>{ev.date} · {ev.time} · {ev.suburb}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {ev.a11y.slice(0, 4).map(a => (
            <div key={a} title={A11Y_ATTRS.find(x => x.id === a)?.label} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'oklch(45% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '3px 7px', borderRadius: 20 }}>
              <A11yIcon type={a} size={12} color="oklch(45% 0.12 195)" />
              <span>{A11Y_ATTRS.find(x => x.id === a)?.label}</span>
            </div>
          ))}
        </div>
        {ev.sponsor && <p style={{ fontSize: 11, color: 'oklch(58% 0.008 80)', marginTop: 6 }}>Supported by {ev.sponsor}</p>}
      </div>
    </Card>
  );
};

// ── Events Screen ─────────────────────────────────────────────────────────────
export const EventsScreen = ({ onNavigate, rsvpState }) => {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeSuburb, setActiveSuburb] = React.useState('All suburbs');
  const [view, setView] = React.useState('list');
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = MOCK_EVENTS.filter(ev => {
    if (search && !ev.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory !== 'All' && ev.category !== activeCategory) return false;
    if (activeSuburb !== 'All suburbs' && ev.suburb !== activeSuburb) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'oklch(97% 0.009 75)' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 20px 0', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: 'oklch(18% 0.01 80)', marginBottom: 12 }}>Events</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…" style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 14, fontFamily: 'inherit', background: 'oklch(97% 0.005 80)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', background: 'oklch(93% 0.005 80)', borderRadius: 10, padding: 3, gap: 2 }}>
            {['list', 'map'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: view === v ? '#fff' : 'transparent', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: 600, color: view === v ? 'oklch(18% 0.01 80)' : 'oklch(55% 0.008 80)', boxShadow: view === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all .15s' }}>
                {v === 'list' ? '☰' : '🗺'}
              </button>
            ))}
          </div>
        </div>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeCategory === c ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: activeCategory === c ? 'oklch(52% 0.155 195)' : '#fff', color: activeCategory === c ? '#fff' : 'oklch(42% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
              {c}
            </button>
          ))}
          <button onClick={() => setShowFilters(true)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activeSuburb !== 'All suburbs' ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: activeSuburb !== 'All suburbs' ? 'oklch(92% 0.05 195)' : '#fff', color: 'oklch(42% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            📍 {activeSuburb !== 'All suburbs' ? activeSuburb : 'Suburb'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {view === 'list' ? (
          filtered.length > 0 ? filtered.map(ev => (
            <EventCard key={ev.id} event={ev} onClick={() => onNavigate('event-detail', ev)} />
          )) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>No events found</p>
              <p style={{ fontSize: 14, color: 'oklch(55% 0.008 80)' }}>Try a different search or filter</p>
            </div>
          )
        ) : (
          <div style={{ background: 'oklch(88% 0.04 195)', borderRadius: 16, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 40 }}>🗺️</span>
            <p style={{ fontSize: 14, color: 'oklch(38% 0.14 195)', fontWeight: 600 }}>Map view</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', padding: '0 20px' }}>
              {filtered.map(ev => (
                <button key={ev.id} onClick={() => onNavigate('event-detail', ev)} style={{ background: 'oklch(52% 0.155 195)', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  📍 {ev.suburb}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomSheet open={showFilters} onClose={() => setShowFilters(false)} title="Filter by suburb">
        {SUBURBS.map(s => (
          <button key={s} onClick={() => { setActiveSuburb(s); setShowFilters(false); }} style={{ display: 'block', width: '100%', padding: '13px 0', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid oklch(93% 0.008 80)', fontSize: 15, fontFamily: 'inherit', color: activeSuburb === s ? 'oklch(52% 0.155 195)' : 'oklch(25% 0.01 80)', fontWeight: activeSuburb === s ? 700 : 400, cursor: 'pointer' }}>
            {s} {activeSuburb === s && '✓'}
          </button>
        ))}
      </BottomSheet>
    </div>
  );
};

// ── Event Detail Screen ───────────────────────────────────────────────────────
export const EventDetailScreen = ({ event: ev, onNavigate, rsvpState, setRsvpState, auth }) => {
  const [showOptIn, setShowOptIn] = React.useState(false);
  const [optedIn, setOptedIn] = React.useState(false);
  const [showAttendees, setShowAttendees] = React.useState(false);
  const currentRsvp = rsvpState[ev.id] || 'none';

  const handleRsvp = () => {
    if (auth === 'guest') { onNavigate('register'); return; }
    if (currentRsvp === 'none') {
      const newStatus = ev.status === 'open' ? 'going' : 'waitlist';
      setRsvpState(prev => ({ ...prev, [ev.id]: newStatus }));
      if (newStatus === 'going') setShowOptIn(true);
    } else {
      setRsvpState(prev => ({ ...prev, [ev.id]: 'none' }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ background: `oklch(${{'Arts':'82% 0.07 290','Sport':'82% 0.07 195','Education':'82% 0.07 250','Social':'82% 0.07 48','Skills':'82% 0.07 155'}[ev.category]||'85% 0.005 80'})`, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, position: 'relative' }}>
          {{'Arts':'🎨','Sport':'⚽','Education':'📚','Social':'☕','Skills':'🍳'}[ev.category]||'📅'}
          <button onClick={() => onNavigate('events')} style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        </div>

        <div style={{ padding: '20px 20px 100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'oklch(18% 0.01 80)', lineHeight: 1.25, flex: 1, paddingRight: 10 }}>{ev.title}</h1>
            <Badge color={{ open:'green', waitlist:'amber', full:'red' }[ev.status]}>{{ open:'Open', waitlist:'Waitlist', full:'Full' }[ev.status]}</Badge>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: 'oklch(50% 0.008 80)' }}>📅 {ev.date} · {ev.time}</span>
            <span style={{ fontSize: 13, color: 'oklch(50% 0.008 80)' }}>📍 {ev.suburb}</span>
            {ev.status === 'open' && ev.spots > 0 && <span style={{ fontSize: 13, color: 'oklch(45% 0.14 155)' }}>✓ {ev.spots} spots left</span>}
          </div>

          {ev.sponsor && (
            <div style={{ background: 'oklch(94% 0.05 50)', border: '1px solid oklch(88% 0.08 50)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🤝</span>
              <span style={{ fontSize: 13, color: 'oklch(40% 0.12 48)', fontWeight: 500 }}>Supported by <strong>{ev.sponsor}</strong></span>
            </div>
          )}

          <p style={{ fontSize: 15, color: 'oklch(35% 0.008 80)', lineHeight: 1.7, marginBottom: 20 }}>{ev.description}</p>

          {/* Accessibility */}
          <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(38% 0.14 195)', marginBottom: 10 }}>♿ Accessibility features</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ev.a11y.map(a => {
                const attr = A11Y_ATTRS.find(x => x.id === a);
                return (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ color: 'oklch(45% 0.14 195)' }}><A11yIcon type={a} size={18} color="oklch(45% 0.14 195)" /></div>
                    <span style={{ fontSize: 14, color: 'oklch(32% 0.01 80)' }}>{attr?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendees */}
          {currentRsvp === 'going' && (
            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setShowAttendees(!showAttendees)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)' }}>People going</span>
                <span style={{ fontSize: 12, color: 'oklch(52% 0.155 195)' }}>{showAttendees ? '▲ hide' : '▼ show'}</span>
              </button>
              {showAttendees && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {MOCK_ATTENDEES.slice(0, optedIn ? 7 : 6).map((a, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <Avatar name={a.name} size={40} />
                      <span style={{ fontSize: 10, color: 'oklch(50% 0.008 80)' }}>{a.name.split(' ')[0]}</span>
                    </div>
                  ))}
                  {optedIn && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <Avatar name="You" size={40} />
                      <span style={{ fontSize: 10, color: 'oklch(52% 0.155 195)', fontWeight: 600 }}>You</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sticky RSVP bar */}
      <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, padding: '12px 20px', background: '#fff', borderTop: '1px solid oklch(92% 0.008 80)' }}>
        {ev.status === 'full' && currentRsvp === 'none' ? (
          <Btn fullWidth disabled>This event is full</Btn>
        ) : currentRsvp === 'going' ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'oklch(93% 0.05 155)', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'oklch(35% 0.14 155)' }}>You're going!</span>
            </div>
            <Btn variant="ghost" size="md" onClick={handleRsvp}>Cancel</Btn>
          </div>
        ) : currentRsvp === 'waitlist' ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'oklch(93% 0.06 50)', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'oklch(45% 0.14 48)' }}>⏳ On waitlist</span>
            </div>
            <Btn variant="ghost" size="md" onClick={handleRsvp}>Leave</Btn>
          </div>
        ) : (
          <Btn fullWidth variant={ev.status === 'waitlist' ? 'amber' : 'primary'} size="lg" onClick={handleRsvp}>
            {ev.status === 'waitlist' ? 'Join Waitlist' : 'RSVP — I\'m going!'}
          </Btn>
        )}
      </div>

      {/* Safe Connect Opt-in sheet */}
      <BottomSheet open={showOptIn} onClose={() => setShowOptIn(false)} title="Let others know you're going?">
        <div style={{ padding: '0 0 16px' }}>
          <div style={{ background: 'oklch(95% 0.04 195)', borderRadius: 12, padding: '12px 14px', marginBottom: 16, fontSize: 14, color: 'oklch(35% 0.12 195)', lineHeight: 1.6 }}>
            Only your <strong>first name and photo</strong> will be visible to others going to <strong>{ev.title}</strong>. No other details are shared.
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>Let others see me at this event</p>
              <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>Default: off. You can change this anytime.</p>
            </div>
            <div onClick={() => setOptedIn(!optedIn)} style={{ width: 50, height: 28, borderRadius: 14, background: optedIn ? 'oklch(52% 0.155 195)' : 'oklch(82% 0.008 80)', padding: 3, cursor: 'pointer', transition: 'background .2s', position: 'relative' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: optedIn ? 25 : 3, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
          <Btn fullWidth variant="primary" size="lg" onClick={() => setShowOptIn(false)}>Confirm</Btn>
        </div>
      </BottomSheet>
    </div>
  );
};

// ── Ideas Screen ──────────────────────────────────────────────────────────────
export const IdeasScreen = ({ auth, onNavigate }) => {
  const [interests, setInterests] = React.useState(new Set());
  const [ideas, setIdeas] = React.useState(MOCK_IDEAS);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [sort, setSort] = React.useState('popular');
  const [newIdea, setNewIdea] = React.useState({ title: '', desc: '', category: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [toast, setToast] = React.useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const toggleInterest = (id) => {
    if (auth === 'guest') { onNavigate('register'); return; }
    setInterests(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast('Interest removed'); }
      else { next.add(id); showToast('💛 Interest recorded!'); }
      return next;
    });
  };

  const sorted = [...ideas].sort((a, b) => sort === 'popular' ? (b.interests + (interests.has(b.id)?1:0)) - (a.interests + (interests.has(a.id)?1:0)) : 0);

  const handleSubmit = () => {
    if (!newIdea.title.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setShowSubmit(false); setSubmitted(false); setNewIdea({ title: '', desc: '', category: '' }); showToast('✓ Your idea is under review'); }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ background: '#fff', padding: '16px 20px 12px', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: 'oklch(18% 0.01 80)', marginBottom: 4 }}>Idea Board</h1>
        <p style={{ fontSize: 13, color: 'oklch(50% 0.008 80)', marginBottom: 12 }}>Suggest events and vote on what matters to you</p>
        <Btn fullWidth variant="amber" size="md" onClick={() => { if (auth === 'guest') { onNavigate('register'); return; } setShowSubmit(true); }}>+ Submit an idea</Btn>
      </div>

      {/* Sort */}
      <div style={{ padding: '10px 20px', display: 'flex', gap: 8 }}>
        {[['popular', 'Most popular'], ['new', 'Newest']].map(([v, l]) => (
          <button key={v} onClick={() => setSort(v)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${sort === v ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: sort === v ? 'oklch(52% 0.155 195)' : '#fff', color: sort === v ? '#fff' : 'oklch(45% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer' }}>{l}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 16px' }}>
        {sorted.map(idea => {
          const liked = interests.has(idea.id);
          const count = idea.interests + (liked ? 1 : 0);
          return (
            <Card key={idea.id} style={{ marginBottom: 12, padding: '16px' }}>
              {idea.status === 'live' && (
                <div style={{ background: 'oklch(93% 0.05 155)', borderRadius: 8, padding: '6px 10px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'oklch(35% 0.14 155)', fontWeight: 700 }}>🎉 Now live! This idea became an event.</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'oklch(18% 0.01 80)', lineHeight: 1.3 }}>{idea.title}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'oklch(48% 0.008 80)', lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{idea.desc}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Badge color="gray">{idea.category}</Badge>
                    <span style={{ fontSize: 11, color: 'oklch(62% 0.008 80)' }}>by {idea.author} · {idea.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 52 }}>
                  <button onClick={() => toggleInterest(idea.id)} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${liked ? 'oklch(63% 0.14 48)' : 'oklch(88% 0.01 80)'}`, background: liked ? 'oklch(93% 0.06 50)' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, transition: 'all .15s', transform: liked ? 'scale(1.05)' : 'scale(1)' }}>
                    <span style={{ fontSize: 16 }}>{liked ? '💛' : '🤍'}</span>
                  </button>
                  <span style={{ fontSize: 12, fontWeight: 700, color: liked ? 'oklch(50% 0.14 48)' : 'oklch(50% 0.008 80)' }}>{count}</span>
                </div>
              </div>
              {idea.status === 'live' && <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => onNavigate('events')}>View event →</Btn>}
            </Card>
          );
        })}
      </div>

      <Toast msg={toast} />

      {/* Submit idea sheet */}
      <BottomSheet open={showSubmit} onClose={() => { setShowSubmit(false); setSubmitted(false); }} title="Share your idea">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Your idea is under review</p>
            <p style={{ fontSize: 14, color: 'oklch(55% 0.008 80)' }}>We'll let you know when it's approved. Thank you!</p>
          </div>
        ) : (
          <div style={{ paddingBottom: 16 }}>
            <Input label="Idea title (required)" placeholder="e.g. Monthly board game afternoon" value={newIdea.title} onChange={e => setNewIdea(p => ({ ...p, title: e.target.value }))} />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>Description <span style={{ fontWeight: 400, color: 'oklch(58% 0.008 80)' }}>(optional)</span></label>
              <textarea value={newIdea.desc} onChange={e => setNewIdea(p => ({ ...p, desc: e.target.value }))} placeholder="Tell us more about your idea…" maxLength={500} rows={3} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid oklch(87% 0.01 80)', fontSize: 14, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }} />
              <p style={{ fontSize: 11, color: 'oklch(60% 0.008 80)', marginTop: 3, textAlign: 'right' }}>{newIdea.desc.length}/500</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 8 }}>Category</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <button key={c} onClick={() => setNewIdea(p => ({ ...p, category: c }))} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${newIdea.category === c ? 'oklch(63% 0.14 48)' : 'oklch(88% 0.01 80)'}`, background: newIdea.category === c ? 'oklch(93% 0.06 50)' : '#fff', color: newIdea.category === c ? 'oklch(42% 0.14 48)' : 'oklch(45% 0.01 80)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>{c}</button>
                ))}
              </div>
            </div>
            <Btn fullWidth variant="amber" size="lg" disabled={!newIdea.title.trim()} onClick={handleSubmit}>Submit idea</Btn>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

// ── Registration Flow ─────────────────────────────────────────────────────────
export const RegistrationFlow = ({ onComplete, onBack }) => {
  const [step, setStep] = React.useState(0);
  const [role, setRole] = React.useState('');
  const [form, setForm] = React.useState({ firstName: '', lastName: '', displayName: '', dob: '', suburb: '', ndisNumber: '', sdm: false, hasCarer: false, carerEmail: '', agreePrivacy: false, agreeTerms: false });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const roles = [
    { id: 'participant', icon: '🙋', label: 'NDIS Participant', desc: 'I participate in the NDIS and want to find events and connect with others' },
    { id: 'carer', icon: '🤗', label: 'Parent / Carer', desc: 'I support an NDIS participant and want to manage their profile and activity' },
    { id: 'provider', icon: '🏥', label: 'Service Provider', desc: 'I provide NDIS services and want to list events for participants' },
    { id: 'business', icon: '🏪', label: 'Local Business', desc: 'I run a local business and want to be listed as disability friendly' },
  ];

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = 'First name is required';
      if (!form.lastName.trim()) e.lastName = 'Last name is required';
      if (!form.dob) e.dob = 'Date of birth is required';
    }
    if (step === 2) {
      if (form.hasCarer && !form.carerEmail.trim()) e.carerEmail = 'Please enter your carer\'s email';
    }
    if (step === 3) {
      if (!form.agreePrivacy) e.privacy = 'You must agree to the Privacy Policy';
      if (!form.agreeTerms) e.terms = 'You must agree to the Terms of Service';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) { if (step === 3) { setSubmitted(true); } else setStep(s => s + 1); } };
  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const steps = ['Account type', 'Your details', 'NDIS info', 'Review'];

  if (submitted) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>📬</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Check your inbox!</h2>
      <p style={{ fontSize: 15, color: 'oklch(48% 0.008 80)', lineHeight: 1.6, marginBottom: 28 }}>We've sent a verification email to confirm your account. Once verified, you're all set!</p>
      <Btn variant="primary" size="lg" fullWidth onClick={() => onComplete(role)}>Continue to ConnectAbility →</Btn>
      <button style={{ background: 'none', border: 'none', fontSize: 13, color: 'oklch(52% 0.155 195)', marginTop: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Resend email</button>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={step === 0 ? onBack : () => setStep(s => s - 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'oklch(42% 0.01 80)', padding: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800 }}>Create your account</h1>
        </div>
        <ProgressSteps steps={steps} current={step} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>
        {step === 0 && (
          <div>
            <p style={{ fontSize: 14, color: 'oklch(48% 0.008 80)', marginBottom: 16, lineHeight: 1.5 }}>Who are you joining as? Select the option that best describes you.</p>
            {roles.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{ display: 'block', width: '100%', padding: '14px 16px', marginBottom: 10, borderRadius: 14, border: `2px solid ${role === r.id ? 'oklch(52% 0.155 195)' : 'oklch(90% 0.008 80)'}`, background: role === r.id ? 'oklch(93% 0.04 195)' : '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: role === r.id ? 'oklch(38% 0.14 195)' : 'oklch(18% 0.01 80)', marginBottom: 3 }}>{r.label}</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)', lineHeight: 1.4 }}>{r.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <Input label="First name (required)" placeholder="Your legal first name" value={form.firstName} onChange={e => f('firstName', e.target.value)} error={errors.firstName} />
            <Input label="Last name (required)" placeholder="Your legal last name" value={form.lastName} onChange={e => f('lastName', e.target.value)} error={errors.lastName} />
            <Input label="Preferred display name" optional placeholder="How you'd like to appear publicly" value={form.displayName} onChange={e => f('displayName', e.target.value)} />
            <Input label="Date of birth (required)" type="date" value={form.dob} onChange={e => f('dob', e.target.value)} error={errors.dob} />
            <Input label="Suburb / postcode" optional placeholder="e.g. Fitzroy 3065" value={form.suburb} onChange={e => f('suburb', e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <Input label="NDIS number" optional placeholder="e.g. 4300123456" value={form.ndisNumber} onChange={e => f('ndisNumber', e.target.value)} hint="Your NDIS number is never shown publicly. We use it to verify eligibility." />
            </div>
            <div style={{ background: 'oklch(95% 0.04 250)', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(28% 0.01 80)', marginBottom: 4 }}>Supported Decision-Making</p>
                  <p style={{ fontSize: 12, color: 'oklch(50% 0.008 80)', lineHeight: 1.5 }}>This lets a trusted person help you make decisions on this platform — like approving connections or RSVPing to events.</p>
                </div>
                <div onClick={() => f('sdm', !form.sdm)} style={{ width: 46, height: 26, borderRadius: 13, background: form.sdm ? 'oklch(52% 0.155 195)' : 'oklch(82% 0.008 80)', padding: 3, cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', marginLeft: form.sdm ? 20 : 0, transition: 'margin .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Do you have a parent/carer managing this account?</p>
                <div onClick={() => f('hasCarer', !form.hasCarer)} style={{ width: 46, height: 26, borderRadius: 13, background: form.hasCarer ? 'oklch(52% 0.155 195)' : 'oklch(82% 0.008 80)', padding: 3, cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', marginLeft: form.hasCarer ? 20 : 0, transition: 'margin .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              {form.hasCarer && <Input label="Carer's email address" placeholder="their@email.com" value={form.carerEmail} onChange={e => f('carerEmail', e.target.value)} error={errors.carerEmail} />}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ background: 'oklch(97% 0.005 80)', borderRadius: 14, padding: '16px', marginBottom: 20, border: '1px solid oklch(90% 0.008 80)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(52% 0.155 195)', marginBottom: 12 }}>Review your details</p>
              {[['Account type', roles.find(r => r.id === role)?.label || '–'], ['Name', `${form.firstName} ${form.lastName}`], ['Display name', form.displayName || form.firstName], ['Date of birth', form.dob || '–'], ['Suburb', form.suburb || '–'], ['SDM enabled', form.sdm ? 'Yes' : 'No']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
                  <span style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'oklch(22% 0.01 80)' }}>{v}</span>
                </div>
              ))}
              <button style={{ fontSize: 12, color: 'oklch(52% 0.155 195)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: 10 }} onClick={() => setStep(1)}>Edit details →</button>
            </div>

            <div onClick={() => f('agreePrivacy', !form.agreePrivacy)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14, cursor: 'pointer' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${errors.privacy ? 'oklch(55% 0.18 20)' : form.agreePrivacy ? 'oklch(52% 0.155 195)' : 'oklch(78% 0.01 80)'}`, background: form.agreePrivacy ? 'oklch(52% 0.155 195)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {form.agreePrivacy && <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: 'oklch(38% 0.008 80)', lineHeight: 1.5 }}>I agree to the <span style={{ color: 'oklch(52% 0.155 195)', fontWeight: 600 }}>Privacy Policy</span>. I understand how my information is used and stored. <span style={{ color: 'oklch(55% 0.18 20)', fontWeight: 600 }}>{errors.privacy}</span></p>
            </div>
            <div onClick={() => f('agreeTerms', !form.agreeTerms)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${errors.terms ? 'oklch(55% 0.18 20)' : form.agreeTerms ? 'oklch(52% 0.155 195)' : 'oklch(78% 0.01 80)'}`, background: form.agreeTerms ? 'oklch(52% 0.155 195)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {form.agreeTerms && <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: 'oklch(38% 0.008 80)', lineHeight: 1.5 }}>I agree to the <span style={{ color: 'oklch(52% 0.155 195)', fontWeight: 600 }}>Terms of Service</span>. I confirm I am eligible to use this platform. <span style={{ color: 'oklch(55% 0.18 20)', fontWeight: 600 }}>{errors.terms}</span></p>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px 20px', borderTop: '1px solid oklch(93% 0.008 80)', background: '#fff' }}>
        <Btn fullWidth variant={step === 3 ? 'amber' : 'primary'} size="lg" disabled={step === 0 && !role} onClick={next}>
          {step === 3 ? 'Create my account →' : step === 2 ? 'Review →' : 'Continue →'}
        </Btn>
      </div>
    </div>
  );
};

// ── Carer Dashboard ───────────────────────────────────────────────────────────
export const CarerDashboard = ({ onNavigate }) => {
  const [active, setActive] = React.useState(0);
  const [pending, setPending] = React.useState(MOCK_PENDING_CONNECTIONS);
  const [toast, setToast] = React.useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const participants = [{ name: 'Emma R.', age: 24, suburb: 'Fitzroy' }, { name: 'Liam R.', age: 20, suburb: 'Carlton' }];

  const handleApprove = (id) => {
    setPending(p => p.filter(c => c.id !== id));
    showToast('✓ Connection approved');
  };
  const handleDecline = (id) => {
    setPending(p => p.filter(c => c.id !== id));
    showToast('Connection declined');
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'oklch(97% 0.009 75)' }}>
      {/* Header */}
      <div style={{ background: 'oklch(52% 0.155 195)', padding: '20px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <button onClick={() => onNavigate('events')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Carer Dashboard</h1>
        </div>
        {/* Profile switcher */}
        <div style={{ display: 'flex', gap: 10 }}>
          {participants.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 24, background: active === i ? '#fff' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Avatar name={p.name} size={26} />
              <span style={{ fontSize: 13, fontWeight: 600, color: active === i ? 'oklch(38% 0.14 195)' : '#fff' }}>{p.name.split(' ')[0]}</span>
            </button>
          ))}
          <button style={{ padding: '8px 14px', borderRadius: 24, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Managing profile for</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{participants[active].name} · {participants[active].suburb}</p>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Pending approvals */}
        {pending.length > 0 && (
          <div style={{ background: 'oklch(93% 0.06 50)', border: '1.5px solid oklch(85% 0.10 50)', borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(40% 0.14 48)', marginBottom: 12 }}>⚠️ {pending.length} connection request{pending.length > 1 ? 's' : ''} need{pending.length === 1 ? 's' : ''} your approval</p>
            {pending.map(conn => (
              <div key={conn.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 10, border: '1px solid oklch(90% 0.008 80)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar name={conn.name} size={40} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)' }}>{conn.name}</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Met at: {conn.event}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="success" size="sm" style={{ flex: 1 }} onClick={() => handleApprove(conn.id)}>✓ Approve</Btn>
                  <Btn variant="danger" size="sm" style={{ flex: 1 }} onClick={() => handleDecline(conn.id)}>✕ Decline</Btn>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming events */}
        <SectionHeader title={`${participants[active].name.split(' ')[0]}'s upcoming events`} />
        {MOCK_EVENTS.slice(0, 2).map(ev => (
          <div key={ev.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid oklch(90% 0.008 80)', padding: '12px 14px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'oklch(18% 0.01 80)', marginBottom: 3 }}>{ev.title}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{ev.date} · {ev.suburb}</p>
            </div>
            <Badge color="green">Going ✓</Badge>
          </div>
        ))}
        <Btn variant="secondary" size="sm" style={{ marginBottom: 20 }} onClick={() => onNavigate('events')}>+ RSVP to event on their behalf</Btn>

        {/* Recent activity */}
        <SectionHeader title="Recent activity" />
        {[
          { icon: '🎉', text: `${participants[active].name.split(' ')[0]} RSVPd to Coffee & Connect Morning`, time: '2 hours ago' },
          { icon: '💛', text: `${participants[active].name.split(' ')[0]} expressed interest in "Movie Night with Audio Description"`, time: 'Yesterday' },
          { icon: '🤝', text: `New connection request from Marcus L.`, time: '2 days ago' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <div>
              <p style={{ fontSize: 13, color: 'oklch(28% 0.01 80)', lineHeight: 1.4, marginBottom: 2 }}>{a.text}</p>
              <p style={{ fontSize: 11, color: 'oklch(60% 0.008 80)' }}>{a.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Toast msg={toast} />
    </div>
  );
};

// ── Admin Dashboard ───────────────────────────────────────────────────────────
export const AdminDashboard = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [pendingItems, setPendingItems] = React.useState([
    { id: 1, type: 'Provider', name: 'Inclusive Recreation Co.', time: '2 hours ago', icon: '🏥' },
    { id: 2, type: 'Event idea', name: '"Board Game Afternoons"', time: '5 hours ago', icon: '💡' },
    { id: 3, type: 'Event submission', name: 'Yoga for All — Brunswick', time: '1 day ago', icon: '📅' },
    { id: 4, type: 'Flagged message', name: 'Message in Coffee & Connect thread', time: '3 days ago', icon: '🚩' },
  ]);

  const handleAction = (id, action) => setPendingItems(p => p.filter(i => i.id !== id));

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'events', icon: '📅', label: 'Events' },
    { id: 'businesses', icon: '🏪', label: 'Businesses' },
    { id: 'places', icon: '📍', label: 'Places' },
    { id: 'ideas', icon: '💡', label: 'Idea Board' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', background: 'oklch(97% 0.009 75)', fontFamily: 'inherit' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: 'oklch(18% 0.012 195)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🤝</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1 }}>ConnectAbility</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Admin portal</p>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 20px', background: activeSection === item.id ? 'rgba(255,255,255,0.12)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: activeSection === item.id ? 600 : 400, textAlign: 'left', borderLeft: `3px solid ${activeSection === item.id ? 'oklch(63% 0.14 48)' : 'transparent'}`, transition: 'all .15s' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => onNavigate('landing')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>← Back to platform</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'oklch(18% 0.012 80)', marginBottom: 2 }}>
              {navItems.find(n => n.id === activeSection)?.label}
            </h1>
            <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>April 23, 2026</p>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
            <input placeholder="Search users, events, businesses…" style={{ padding: '9px 14px 9px 32px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', width: 260, background: '#fff' }} />
          </div>
        </div>

        {activeSection === 'dashboard' && (
          <>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              {[['1,284', 'Total users', '↑ 12%', 'teal'], ['24', 'Active events', '↑ 3', 'green'], ['486', 'Total RSVPs', '↑ 8%', 'amber'], [String(pendingItems.length), 'Pending actions', 'needs review', 'red']].map(([n, l, s, c]) => (
                <div key={l} style={{ background: '#fff', borderRadius: 16, padding: '18px 18px', border: '1px solid oklch(90% 0.008 80)' }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: { teal: 'oklch(52% 0.155 195)', green: 'oklch(45% 0.14 155)', amber: 'oklch(52% 0.14 48)', red: 'oklch(50% 0.18 20)' }[c], marginBottom: 4 }}>{n}</p>
                  <p style={{ fontSize: 13, color: 'oklch(38% 0.01 80)', fontWeight: 600, marginBottom: 3 }}>{l}</p>
                  <p style={{ fontSize: 12, color: 'oklch(58% 0.008 80)' }}>{s}</p>
                </div>
              ))}
            </div>

            {/* Prioritised inbox */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px', marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Pending actions</h2>
              {pendingItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: 'oklch(55% 0.008 80)' }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                  <p style={{ fontWeight: 600 }}>All caught up!</p>
                </div>
              ) : pendingItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'oklch(94% 0.005 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'oklch(22% 0.01 80)', marginBottom: 2 }}>{item.name}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Badge color="gray">{item.type}</Badge>
                      <span style={{ fontSize: 11, color: 'oklch(60% 0.008 80)' }}>{item.time}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleAction(item.id, 'approve')} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'oklch(93% 0.05 155)', color: 'oklch(35% 0.14 155)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                    <button onClick={() => handleAction(item.id, 'reject')} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Reject</button>
                    <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', background: '#fff', color: 'oklch(42% 0.01 80)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Review</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '20px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent admin actions</h2>
              {[
                { text: 'Approved provider: Inclusive Recreation Co.', time: '10 min ago', icon: '✅' },
                { text: 'Featured event: Sensory Friendly Art Class', time: '1 hour ago', icon: '📌' },
                { text: 'Suspended user: spam account #4421', time: '3 hours ago', icon: '🚫' },
                { text: 'Converted idea to event: Board Game Afternoons', time: 'Yesterday', icon: '✨' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid oklch(95% 0.005 80)' }}>
                  <span style={{ fontSize: 16 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: 'oklch(28% 0.01 80)' }}>{a.text}</p>
                    <p style={{ fontSize: 11, color: 'oklch(62% 0.008 80)', marginTop: 2 }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'places' && <AdminPlacesPanel />}

        {activeSection !== 'dashboard' && activeSection !== 'places' && (
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid oklch(90% 0.008 80)', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{navItems.find(n => n.id === activeSection)?.icon}</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 6 }}>{navItems.find(n => n.id === activeSection)?.label}</p>
            <p style={{ fontSize: 14, color: 'oklch(55% 0.008 80)' }}>This section is ready for content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Account Screen ────────────────────────────────────────────────────────────
export const AccountScreen = ({ auth, onNavigate, onSignOut }) => {
  if (auth === 'guest') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#fff', gap: 12 }}>
      <div style={{ fontSize: 56, marginBottom: 8 }}>👋</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, textAlign: 'center' }}>Join ConnectAbility Hub</h2>
      <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', textAlign: 'center', lineHeight: 1.6 }}>Create a free account to RSVP to events, submit ideas, and connect safely with others.</p>
      <Btn fullWidth variant="primary" size="lg" onClick={() => onNavigate('register')}>Create free account</Btn>
      <Btn fullWidth variant="ghost" size="md" onClick={() => onNavigate('signin')}>Sign in</Btn>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        <p style={{ fontSize: 12, color: 'oklch(60% 0.008 80)', textAlign: 'center', marginBottom: 4 }}>Or sign in as demo role:</p>
        {[['participant', '🙋 Participant demo'], ['carer', '🤗 Carer demo'], ['admin', '🔑 Admin demo']].map(([r, l]) => (
          <button key={r} onClick={() => onNavigate('signin', r)} style={{ padding: '10px', borderRadius: 10, border: '1px solid oklch(88% 0.01 80)', background: '#fff', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', color: 'oklch(38% 0.01 80)', fontWeight: 500 }}>{l}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ background: 'oklch(52% 0.155 195)', padding: '28px 20px 32px', textAlign: 'center' }}>
        <Avatar name="Alex M." size={72} />
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 12 }}>Alex M.</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{{ participant: 'NDIS Participant', carer: 'Parent / Carer', admin: 'Platform Admin' }[auth]} · Fitzroy</p>
      </div>
      <div style={{ padding: '20px' }}>
        {auth === 'carer' && <Btn fullWidth variant="secondary" size="md" style={{ marginBottom: 12 }} onClick={() => onNavigate('carer')}>Open Carer Dashboard →</Btn>}
        {auth === 'admin' && <Btn fullWidth variant="amber" size="md" style={{ marginBottom: 12 }} onClick={() => onNavigate('admin')}>Open Admin Dashboard →</Btn>}
        {[['Profile settings', '👤'], ['Notification settings', '🔔'], ['Privacy & safety', '🔒'], ['Accessibility preferences', '♿'], ['Help & support', '❓']].map(([l, i]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fff', borderRadius: 12, marginBottom: 8, border: '1px solid oklch(92% 0.008 80)', cursor: 'pointer' }}>
            <span style={{ fontSize: 18 }}>{i}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'oklch(22% 0.01 80)', flex: 1 }}>{l}</span>
            <span style={{ color: 'oklch(65% 0.008 80)' }}>›</span>
          </div>
        ))}
        <button onClick={onSignOut} style={{ width: '100%', marginTop: 8, padding: '13px', borderRadius: 12, border: '1px solid oklch(88% 0.08 20)', background: 'oklch(96% 0.02 20)', color: 'oklch(45% 0.18 20)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
      </div>
    </div>
  );
};

// ── Messages Screen ───────────────────────────────────────────────────────────
export const MessagesScreen = ({ auth, onNavigate }) => {
  if (auth === 'guest') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', background: '#fff' }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>💬</div>
      <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Sign in to see messages</p>
      <p style={{ fontSize: 14, color: 'oklch(55% 0.008 80)', marginBottom: 20 }}>Connect with others going to the same events.</p>
      <Btn variant="primary" onClick={() => onNavigate('register')}>Get started</Btn>
    </div>
  );
  const threads = [
    { name: 'Priya M.', last: 'See you at the art class!', time: '2m', event: 'Sensory Friendly Art Class', unread: 2 },
    { name: 'James T.', last: 'Thanks for connecting 👋', time: '1h', event: 'Coffee & Connect', unread: 0 },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ background: '#fff', padding: '16px 20px 12px', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Messages</h1>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
        {threads.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 10, border: '1px solid oklch(90% 0.008 80)', cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              <Avatar name={t.name} size={46} />
              {t.unread > 0 && <div style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%', background: 'oklch(52% 0.155 195)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.unread}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)' }}>{t.name}</span>
                <span style={{ fontSize: 11, color: 'oklch(60% 0.008 80)' }}>{t.time}</span>
              </div>
              <p style={{ fontSize: 12, color: 'oklch(50% 0.008 80)', marginBottom: 3 }}>{t.last}</p>
              <Badge color="teal">{t.event}</Badge>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '20px', color: 'oklch(60% 0.008 80)', fontSize: 13 }}>
          Messages are event-based. RSVP to an event to connect with others going. 🔒
        </div>
      </div>
    </div>
  );
};

