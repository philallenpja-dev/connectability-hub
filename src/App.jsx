import React from 'react';
import {
  Avatar, Btn, Badge, A11yIcon, A11Y_ATTRS, Card, MOCK_BUSINESSES
} from './shared.jsx';
import {
  TopNav, LandingDesktop, EventsDesktop, EventDetailDesktop,
  IdeasDesktop, RegistrationDesktop
} from './desktopScreens.jsx';
import { AdminDashboard } from './hubScreens.jsx';
import { DashboardDesktop } from './dashboard.jsx';
import {
  PlacesDesktop, PlaceDetailDesktop, PlaceRegisterDesktop
} from './places.jsx';
import { useBusinesses } from './hooks/useBusinesses.js';
import {
  CarerOversightDesktop, CarerInviteDesktop,
  ParticipantInviteOnboarding, ParticipantSupportView
} from './carerJourneys.jsx';

const TWEAK_DEFAULTS = {
  startView: 'landing',
  startAuth: 'guest',
  showCarerBanner: false,
};

export default function App() {
  const [view, setView] = React.useState(() => localStorage.getItem('dhub_view') || TWEAK_DEFAULTS.startView);
  const [auth, setAuth] = React.useState(() => localStorage.getItem('dhub_auth') || TWEAK_DEFAULTS.startAuth);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [rsvpState, setRsvpState] = React.useState({});
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('dhub_view', view);
    localStorage.setItem('dhub_auth', auth);
  }, [view, auth]);

  React.useEffect(() => {
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const navigate = (to, data) => {
    if (to === 'signin') {
      const role = data || 'participant';
      setAuth(role);
      setView(role === 'carer' ? 'carer' : role === 'admin' ? 'admin' : 'dashboard');
    } else if (to === 'event-detail') {
      setSelectedEvent(data);
      setView('event-detail');
    } else if (to === 'place-detail') {
      setSelectedPlace(data);
      setView('place-detail');
    } else {
      setView(to);
    }
  };

  const signOut = () => { setAuth('guest'); setView('landing'); };

  const carerBannerName = auth === 'carer' && !['carer', 'landing', 'register'].includes(view) ? 'Emma R.' : null;

  const renderPage = () => {
    switch (view) {
      case 'landing':     return <LandingDesktop onNavigate={navigate} />;
      case 'dashboard':   return <DashboardDesktop onNavigate={navigate} rsvpState={rsvpState} />;
      case 'register':    return <RegistrationDesktop onComplete={role => { setAuth(role); setView('dashboard'); }} onBack={() => setView('landing')} />;
      case 'events':      return <EventsDesktop onNavigate={navigate} rsvpState={rsvpState} />;
      case 'event-detail': return selectedEvent
        ? <EventDetailDesktop event={selectedEvent} onNavigate={navigate} rsvpState={rsvpState} setRsvpState={setRsvpState} auth={auth} />
        : null;
      case 'ideas':       return <IdeasDesktop auth={auth} onNavigate={navigate} />;
      case 'messages':    return <MessagesDesktop auth={auth} onNavigate={navigate} />;
      case 'carer':             return <CarerOversightDesktop onNavigate={navigate} />;
      case 'carer-register':    return <CarerInviteDesktop onComplete={() => { setAuth('carer'); setView('carer'); }} onBack={() => setView('landing')} />;
      case 'carer-invite':      return <CarerInviteDesktop onComplete={() => { setAuth('carer'); setView('carer'); }} onBack={() => setView('carer')} />;
      case 'participant-invite': return (
        <div style={{ minHeight: '100vh', background: 'oklch(97% 0.009 75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 520, background: '#fff', borderRadius: 24, border: '1px solid oklch(90% 0.008 80)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <ParticipantInviteOnboarding onComplete={role => { setAuth(role); setView('events'); }} onBack={() => setView('landing')} />
          </div>
        </div>
      );
      case 'participant-support': return (
        <div style={{ maxWidth: 560, margin: '40px auto', padding: '0 20px' }}>
          <ParticipantSupportView onNavigate={navigate} />
        </div>
      );
      case 'admin':       return <AdminDashboard onNavigate={navigate} />;
      case 'account':     return <AccountDesktop auth={auth} onNavigate={navigate} onSignOut={signOut} />;
      case 'businesses':  return <BusinessesDesktop onNavigate={navigate} />;
      case 'places':       return <PlacesDesktop auth={auth} onNavigate={navigate} />;
      case 'place-detail': return selectedPlace ? <PlaceDetailDesktop place={selectedPlace} onNavigate={navigate} auth={auth} /> : null;
      case 'place-register': return <PlaceRegisterDesktop onComplete={() => setView('places')} onBack={() => setView('places')} />;
      default:            return <LandingDesktop onNavigate={navigate} />;
    }
  };

  const noNav = ['register', 'admin', 'place-register'].includes(view);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {!noNav && (
        <TopNav
          auth={auth}
          view={view}
          onNavigate={navigate}
          onSignOut={signOut}
          carerName={carerBannerName}
        />
      )}

      <main style={{ flex: 1 }} key={view}>
        <div className="page-enter">
          {renderPage()}
        </div>
      </main>

      {/* Floating "tweaks" toggle so you can demo nav states without dev tools */}
      <button
        onClick={() => setTweaksOpen(o => !o)}
        title="Demo controls"
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 998,
          background: '#fff', border: '1px solid oklch(90% 0.008 80)',
          borderRadius: '50%', width: 44, height: 44, fontSize: 20,
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}
      >⚙️</button>

      <div className={`tweaks-panel ${tweaksOpen ? 'open' : ''}`}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'oklch(22% 0.01 80)' }}>⚙️ Demo controls</p>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: 'oklch(50% 0.008 80)', marginBottom: 5 }}>Navigate to</p>
          <select onChange={e => navigate(e.target.value)} value={view}
            style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>
            <option value="landing">Landing (homepage)</option>
            <option value="dashboard">Participant Dashboard</option>
            <option value="events">Events discovery</option>
            <option value="ideas">Idea Board</option>
            <option value="businesses">Businesses directory</option>
            <option value="places">Places</option>
            <option value="place-register">Register a place</option>
            <option value="register">Registration flow</option>
            <option value="carer">Carer — Oversight dashboard</option>
            <option value="carer-register">Carer — Registration flow</option>
            <option value="participant-invite">Participant — Invite onboarding</option>
            <option value="participant-support">Participant — Support network</option>
            <option value="admin">Admin Dashboard</option>
            <option value="account">Account</option>
            <option value="messages">Messages</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: 'oklch(50% 0.008 80)', marginBottom: 5 }}>Signed in as</p>
          <select value={auth} onChange={e => {
            const r = e.target.value;
            setAuth(r);
            if (r === 'guest') setView('landing');
            else if (r === 'admin') setView('admin');
            else if (r === 'carer') setView('carer');
            else setView('dashboard');
          }} style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>
            <option value="guest">Guest (not signed in)</option>
            <option value="participant">Participant</option>
            <option value="carer">Carer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: 'oklch(50% 0.008 80)', marginBottom: 5 }}>Reset RSVPs</p>
          <button onClick={() => setRsvpState({})} style={{ width: '100%', padding: '7px', borderRadius: 8, border: '1px solid oklch(88% 0.01 80)', fontSize: 12, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', background: '#fff' }}>Clear all RSVPs</button>
        </div>

        <div style={{ borderTop: '1px solid oklch(93% 0.008 80)', paddingTop: 12, marginTop: 4 }}>
          <p style={{ fontSize: 11, color: 'oklch(62% 0.008 80)', lineHeight: 1.5 }}>
            Desktop prototype — all screens from the brief
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Businesses Desktop ────────────────────────────────────────────────────────
function BusinessesDesktop({ onNavigate }) {
  const [cat, setCat] = React.useState('All');
  const categories = ['All', 'Café', 'Venue', 'Allied Health', 'Recreation', 'Retail', 'Transport'];
  const fallback = React.useMemo(() => [
    ...MOCK_BUSINESSES,
    { id: 4, name: 'Accessible Transport Co.', category: 'Transport', suburb: 'Melbourne CBD', a11y: ['wheelchair', 'parking'], badge: true },
    { id: 5, name: 'Sensory Play Space', category: 'Recreation', suburb: 'Northcote', a11y: ['sensory', 'lowstim', 'companion'], badge: true },
    { id: 6, name: 'Companion Card Diner', category: 'Café', suburb: 'Brunswick', a11y: ['wheelchair', 'companion', 'parking'], badge: false },
  ], []);
  const { businesses } = useBusinesses(fallback);
  const filtered = businesses.filter(b => cat === 'All' || b.category === cat);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Local businesses</h1>
          <p style={{ fontSize: 16, color: 'oklch(50% 0.008 80)' }}>Disability Friendly venues and services near you</p>
        </div>
        <Btn variant="primary" size="md" onClick={() => onNavigate('register')}>Register your business</Btn>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 18px', borderRadius: 20, border: `1.5px solid ${cat === c ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: cat === c ? 'oklch(52% 0.155 195)' : '#fff', color: cat === c ? '#fff' : 'oklch(38% 0.01 80)', fontSize: 14, fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer', transition: 'all .15s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {filtered.map(b => (
          <Card key={b.id} style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'oklch(93% 0.04 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🏪</div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{b.name}</p>
                <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{b.category} · {b.suburb}</p>
              </div>
            </div>
            {b.badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'oklch(93% 0.05 155)', borderRadius: 20, padding: '5px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'oklch(35% 0.14 155)' }}>✓ Disability Friendly</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {b.a11y.map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '3px 8px', borderRadius: 20 }}>
                  <A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" />
                  <span>{A11Y_ATTRS.find(x => x.id === a)?.label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <Btn variant="secondary" size="sm" style={{ flex: 1 }}>View profile</Btn>
              <Btn variant="ghost" size="sm">Website ↗</Btn>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 40, background: 'linear-gradient(135deg, oklch(48% 0.155 200), oklch(54% 0.15 185))', borderRadius: 24, padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Run an accessible business?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>Register your venue and earn the Disability Friendly badge. Verified by our team after a review of your accessibility features.</p>
        </div>
        <Btn variant="amber" size="lg" onClick={() => onNavigate('register')}>Register your business</Btn>
      </div>
    </div>
  );
}

// ── Messages Desktop ──────────────────────────────────────────────────────────
function MessagesDesktop({ auth, onNavigate }) {
  const [activeThread, setActiveThread] = React.useState(0);
  const [msg, setMsg] = React.useState('');
  const [messages, setMessages] = React.useState([
    [
      { from: 'them', text: 'Hi! Are you going to the art class on Saturday?', time: '10:22 AM' },
      { from: 'me', text: 'Yes! Really looking forward to it 😊', time: '10:24 AM' },
      { from: 'them', text: 'Amazing! See you there. I\'ll be the one with the red tote bag 😄', time: '10:26 AM' },
    ],
    [
      { from: 'them', text: 'Hey! Thanks for connecting. Really enjoyed the Coffee & Connect morning.', time: 'Yesterday' },
      { from: 'me', text: 'Same! It was great to meet everyone.', time: 'Yesterday' },
    ],
  ]);

  const threads = [
    { name: 'Priya M.', event: 'Sensory Friendly Art Class', unread: 0 },
    { name: 'James T.', event: 'Coffee & Connect', unread: 0 },
  ];

  if (auth === 'guest') return (
    <div style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>💬</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Sign in to see messages</h1>
      <p style={{ fontSize: 16, color: 'oklch(50% 0.008 80)', marginBottom: 28, lineHeight: 1.6 }}>Messages are only available to registered users. Connect with others who are going to the same events.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Btn variant="primary" size="lg" onClick={() => onNavigate('register')}>Create free account</Btn>
        <Btn variant="ghost" size="lg" onClick={() => onNavigate('signin')}>Sign in</Btn>
      </div>
    </div>
  );

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages(prev => { const n = [...prev]; n[activeThread] = [...n[activeThread], { from: 'me', text: msg, time: 'Just now' }]; return n; });
    setMsg('');
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Messages</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, height: 580 }}>
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
            <input placeholder="Search messages…" style={{ width: '100%', padding: '9px 14px', borderRadius: 10, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 13, fontFamily: 'inherit', background: 'oklch(98% 0.004 80)' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {threads.map((t, i) => (
              <button key={i} onClick={() => setActiveThread(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 20px', background: activeThread === i ? 'oklch(93% 0.04 195)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
                <Avatar name={t.name} size={44} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: activeThread === i ? 'oklch(35% 0.14 195)' : 'oklch(18% 0.01 80)', marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{messages[i]?.[messages[i].length - 1]?.text?.slice(0, 36)}…</p>
                  <div style={{ marginTop: 4 }}><Badge color="teal">{t.event}</Badge></div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid oklch(93% 0.008 80)', background: 'oklch(97% 0.004 80)' }}>
            <p style={{ fontSize: 11, color: 'oklch(58% 0.008 80)', lineHeight: 1.5, textAlign: 'center' }}>🔒 Messages are event-based and moderated for safety</p>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid oklch(93% 0.008 80)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={threads[activeThread].name} size={40} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{threads[activeThread].name}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Met at {threads[activeThread].event}</p>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(messages[activeThread] || []).map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '70%', background: m.from === 'me' ? 'oklch(52% 0.155 195)' : 'oklch(95% 0.005 80)', color: m.from === 'me' ? '#fff' : 'oklch(22% 0.01 80)', borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '10px 16px', fontSize: 14, lineHeight: 1.5 }}>
                  <p>{m.text}</p>
                  <p style={{ fontSize: 11, opacity: 0.65, marginTop: 4, textAlign: 'right' }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 24px', borderTop: '1px solid oklch(93% 0.008 80)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type a message…" style={{ flex: 1, padding: '11px 16px', borderRadius: 12, border: '1.5px solid oklch(88% 0.01 80)', fontSize: 14, fontFamily: 'inherit', background: 'oklch(98% 0.004 80)' }} />
            <Btn variant="primary" size="md" onClick={sendMsg} disabled={!msg.trim()}>Send</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Account Desktop ───────────────────────────────────────────────────────────
function AccountDesktop({ auth, onNavigate, onSignOut }) {
  if (auth === 'guest') return (
    <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Join ConnectAbility Hub</h1>
      <p style={{ fontSize: 16, color: 'oklch(50% 0.008 80)', marginBottom: 28, lineHeight: 1.6 }}>Create a free account to RSVP to events, share ideas, and connect safely with others.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn fullWidth variant="primary" size="lg" onClick={() => onNavigate('register')}>Create free account</Btn>
        <Btn fullWidth variant="ghost" size="lg" onClick={() => onNavigate('signin')}>Sign in</Btn>
      </div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 13, color: 'oklch(60% 0.008 80)' }}>Or sign in as a demo role:</p>
        {[['participant', '🙋 Participant demo'], ['carer', '🤗 Carer demo'], ['admin', '🔑 Admin demo']].map(([r, l]) => (
          <button key={r} onClick={() => onNavigate('signin', r)} style={{ padding: '11px', borderRadius: 12, border: '1px solid oklch(88% 0.01 80)', background: '#fff', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', color: 'oklch(30% 0.01 80)', fontWeight: 500 }}>{l}</button>
        ))}
      </div>
    </div>
  );
  const roleLabel = { participant: 'NDIS Participant', carer: 'Parent / Carer', admin: 'Platform Admin' }[auth];
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'start' }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', padding: '28px', textAlign: 'center' }}>
        <Avatar name="Alex M." size={80} />
        <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: 14, marginBottom: 4 }}>Alex M.</h2>
        <p style={{ fontSize: 14, color: 'oklch(52% 0.008 80)', marginBottom: 4 }}>{roleLabel}</p>
        <Badge color="teal">Fitzroy</Badge>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {auth === 'carer' && <Btn fullWidth variant="secondary" size="sm" onClick={() => onNavigate('carer')}>Carer Dashboard →</Btn>}
          {auth === 'admin' && <Btn fullWidth variant="amber" size="sm" onClick={() => onNavigate('admin')}>Admin Dashboard →</Btn>}
          <button onClick={onSignOut} style={{ padding: '10px', borderRadius: 10, border: '1px solid oklch(88% 0.08 20)', background: 'oklch(97% 0.02 20)', color: 'oklch(45% 0.18 20)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
        </div>
      </div>
      <div>
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid oklch(90% 0.008 80)', padding: '24px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Account settings</h2>
          {[['Profile settings', 'Manage your name, photo and display preferences', '👤'], ['Privacy & safety', 'Control who can see your profile and connect with you', '🔒'], ['Notification settings', 'Choose which events and updates you\'re notified about', '🔔'], ['Accessibility preferences', 'Set your preferred accessibility requirements for event discovery', '♿'], ['NDIS details', 'Update your NDIS number and Supported Decision-Making settings', '📋'], ['Help & support', 'Get help, report an issue, or contact our team', '❓']].map(([title, desc, icon]) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid oklch(95% 0.005 80)', cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'oklch(95% 0.005 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'oklch(18% 0.01 80)', marginBottom: 2 }}>{title}</p>
                <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>{desc}</p>
              </div>
              <span style={{ color: 'oklch(65% 0.008 80)', fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
