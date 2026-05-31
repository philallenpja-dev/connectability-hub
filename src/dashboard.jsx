import React from 'react';
import { A11Y_ATTRS, A11yIcon, Avatar, Badge, Btn, Card, MOCK_EVENTS, SectionHeader } from './shared.jsx';
import { EventCardDesktop } from './desktopScreens.jsx';

// ─── ConnectAbility Hub — Participant Dashboard (Desktop) ────────────────────
// Requires hub-shared.jsx + desktop-screens.jsx loaded first.

// ── Helpers ───────────────────────────────────────────────────────────────────
export const PARTICIPANT_PROFILE = {
  name: 'Alex M.',
  firstName: 'Alex',
  suburb: 'Fitzroy',
  pronouns: 'they/them',
  prefs: ['wheelchair', 'sensory', 'lowstim'],
  interests: ['Arts', 'Social', 'Skills'],
};

export const MY_RSVPS = [1, 4]; // Sensory Art Class, Coffee & Connect

export const SUPPORT_NETWORK = [
  { name: 'Sarah M.', role: 'Mum · Primary carer', status: 'online', lastSeen: 'Active now', canApprove: true },
  { name: 'David K.', role: 'Support worker', status: 'online', lastSeen: 'Active 12m ago', canApprove: false },
  { name: 'Jess M.', role: 'Sister', status: 'offline', lastSeen: 'Active yesterday', canApprove: false },
];

export const RECENT_ACTIVITY = [
  { icon: '✓', color: 'green', text: 'Your RSVP for Coffee & Connect is confirmed', time: '2h ago' },
  { icon: '💬', color: 'teal', text: 'Priya M. replied in Sensory Friendly Art Class chat', time: '5h ago' },
  { icon: '💡', color: 'amber', text: 'Your idea "Board Game Afternoons" became an event', time: 'Yesterday' },
  { icon: '🤝', color: 'purple', text: 'Sarah (Mum) approved your connection with Marcus L.', time: '2 days ago' },
  { icon: '🆕', color: 'blue', text: '3 new events near Fitzroy match your preferences', time: '3 days ago' },
];

// Countdown helper — fakes a near-future date for the demo
const daysUntil = (label) => {
  // simple mock — "Sat 3 May" → 3 days, "Thu 8 May" → 8 days
  if (label.includes('Sat 3')) return 3;
  if (label.includes('Sun 4')) return 4;
  if (label.includes('Wed 7')) return 7;
  if (label.includes('Thu 8')) return 8;
  if (label.includes('Sat 10')) return 10;
  return 12;
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
export const DashboardDesktop = ({ onNavigate, rsvpState }) => {
  const myEvents = MOCK_EVENTS.filter(e => MY_RSVPS.includes(e.id));
  const nextEvent = myEvents[0];
  const otherUpcoming = myEvents.slice(1);

  // Recommended = matches at least one preferred accessibility tag, not already RSVP'd
  const recommended = MOCK_EVENTS
    .filter(e => !MY_RSVPS.includes(e.id))
    .map(e => ({
      ...e,
      matchScore: e.a11y.filter(a => PARTICIPANT_PROFILE.prefs.includes(a)).length
        + (PARTICIPANT_PROFILE.interests.includes(e.category) ? 1 : 0),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  const messagesPreview = [
    { name: 'Priya M.', text: "Amazing! See you there. I'll be the one with the red tote bag 😄", time: '10m', unread: true, event: 'Sensory Art Class' },
    { name: 'Sarah M.', text: 'Just confirmed transport for Saturday — Dad will pick you up at 9:30', time: '1h', unread: true, event: 'Mum' },
    { name: 'James T.', text: 'Same! It was great to meet everyone.', time: 'Yesterday', unread: false, event: 'Coffee & Connect' },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 64px' }}>

      {/* ── Welcome header ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, oklch(48% 0.155 200) 0%, oklch(54% 0.15 185) 100%)',
        borderRadius: 24, padding: '32px 40px', marginBottom: 24, color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -80, right: 120, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: 6 }}>
              Wednesday, 30 April · Good morning
            </p>
            <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
              Hi {PARTICIPANT_PROFILE.firstName} 👋
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, maxWidth: 540 }}>
              You have <strong style={{ color: '#fff' }}>2 events</strong> coming up this week and <strong style={{ color: '#fff' }}>2 new messages</strong>. Here's a quick look at what's happening.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <Btn variant="amber" size="md" onClick={() => onNavigate('events')}>Browse events →</Btn>
              <button onClick={() => onNavigate('ideas')} style={{
                padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 15, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer', backdropFilter: 'blur(6px)',
              }}>💡 Share an idea</button>
            </div>
          </div>
          {/* Profile card */}
          <div style={{
            background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: 18, padding: '20px',
            minWidth: 260, textAlign: 'center',
          }}>
            <Avatar name={PARTICIPANT_PROFILE.name} size={64} />
            <p style={{ fontSize: 17, fontWeight: 700, marginTop: 12, color: '#fff' }}>{PARTICIPANT_PROFILE.name}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
              {PARTICIPANT_PROFILE.pronouns} · {PARTICIPANT_PROFILE.suburb}
            </p>
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
              {PARTICIPANT_PROFILE.prefs.map(p => (
                <div key={p} title={A11Y_ATTRS.find(x => x.id === p)?.label} style={{
                  width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <A11yIcon type={p} size={16} color="#fff" />
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('account')} style={{
              marginTop: 14, fontSize: 12, color: '#fff', background: 'none',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline',
              opacity: 0.85,
            }}>Edit profile →</button>
          </div>
        </div>
      </div>

      {/* ── At-a-glance stats ──────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Events this month', value: 2, accent: 'teal', icon: '📅', sub: 'Next: in 3 days' },
          { label: 'Unread messages', value: 2, accent: 'amber', icon: '💬', sub: 'From Priya, Mum' },
          { label: 'Ideas you backed', value: 7, accent: 'green', icon: '💡', sub: '1 became an event' },
          { label: 'Connections', value: 4, accent: 'purple', icon: '🤝', sub: '1 pending approval' },
        ].map(s => {
          const colors = {
            teal: { bg: 'oklch(93% 0.04 195)', text: 'oklch(38% 0.14 195)' },
            amber: { bg: 'oklch(93% 0.06 50)', text: 'oklch(45% 0.14 48)' },
            green: { bg: 'oklch(93% 0.05 155)', text: 'oklch(36% 0.14 155)' },
            purple: { bg: 'oklch(93% 0.05 290)', text: 'oklch(40% 0.14 290)' },
          }[s.accent];
          return (
            <Card key={s.label} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
                <p style={{ fontSize: 32, fontWeight: 800, color: colors.text, lineHeight: 1 }}>{s.value}</p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(22% 0.01 80)', marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{s.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

        {/* ─────────────────── LEFT COLUMN ─────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Next event — featured */}
          {nextEvent && <NextEventCard event={nextEvent} daysUntil={daysUntil(nextEvent.date)} onNavigate={onNavigate} />}

          {/* Other upcoming events */}
          {otherUpcoming.length > 0 && (
            <section>
              <SectionHeader title={`You're also going to ${otherUpcoming.length} event${otherUpcoming.length>1?'s':''}`} action="See all" onAction={() => onNavigate('events')} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {otherUpcoming.map(ev => <UpcomingRow key={ev.id} event={ev} daysUntil={daysUntil(ev.date)} onClick={() => onNavigate('event-detail', ev)} />)}
              </div>
            </section>
          )}

          {/* Recommended for you */}
          <section>
            <SectionHeader title="Recommended for you" action="See all events" onAction={() => onNavigate('events')} />
            <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)', marginTop: -8, marginBottom: 14 }}>
              Matched to your accessibility preferences and interests
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {recommended.map(ev => <RecommendedCard key={ev.id} event={ev} profile={PARTICIPANT_PROFILE} onClick={() => onNavigate('event-detail', ev)} />)}
            </div>
          </section>

          {/* Idea Board activity */}
          <section>
            <SectionHeader title="Your Idea Board" action="View board" onAction={() => onNavigate('ideas')} />
            <Card style={{ padding: '4px 0' }}>
              {[
                { title: 'Board Game Afternoons', status: 'live', interests: 19, note: 'Became an event!' },
                { title: 'Movie Night with Audio Description', status: 'backed', interests: 34, note: 'You backed this 5d ago' },
                { title: 'Accessible Hiking Group', status: 'backed', interests: 28, note: 'You backed this 1w ago' },
              ].map((idea, i, arr) => (
                <div key={idea.title} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 14, alignItems: 'center',
                  padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid oklch(94% 0.005 80)' : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: idea.status === 'live' ? 'oklch(93% 0.05 155)' : 'oklch(93% 0.06 50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>
                    {idea.status === 'live' ? '✓' : '💡'}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'oklch(20% 0.01 80)', marginBottom: 2 }}>{idea.title}</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{idea.note}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'oklch(50% 0.14 48)' }}>💛 {idea.interests}</span>
                  {idea.status === 'live'
                    ? <Badge color="green">Live event</Badge>
                    : <Badge color="amber">Pending</Badge>}
                </div>
              ))}
            </Card>
          </section>

        </div>

        {/* ─────────────────── RIGHT COLUMN ─────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 84 }}>

          {/* Messages */}
          <section>
            <SectionHeader title="Messages" action="Open inbox" onAction={() => onNavigate('messages')} />
            <Card style={{ padding: '4px 0' }}>
              {messagesPreview.map((m, i, arr) => (
                <button key={i} onClick={() => onNavigate('messages')} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%',
                  padding: '12px 16px', background: m.unread ? 'oklch(98% 0.015 195)' : 'none',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  borderBottom: i < arr.length - 1 ? '1px solid oklch(94% 0.005 80)' : 'none',
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar name={m.name} size={38} />
                    {m.unread && <span style={{
                      position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: '50%',
                      background: 'oklch(55% 0.18 20)', border: '2px solid #fff',
                    }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(20% 0.01 80)' }}>{m.name}</p>
                      <span style={{ fontSize: 11, color: 'oklch(58% 0.008 80)' }}>{m.time}</span>
                    </div>
                    <p style={{
                      fontSize: 12, color: 'oklch(50% 0.008 80)', lineHeight: 1.4,
                      overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>{m.text}</p>
                    <div style={{ marginTop: 5 }}><Badge color={m.name === 'Sarah M.' ? 'purple' : 'teal'}>{m.event}</Badge></div>
                  </div>
                </button>
              ))}
            </Card>
          </section>

          {/* Support network */}
          <section>
            <SectionHeader title="Your support network" action="Manage" onAction={() => onNavigate('participant-support')} />
            <Card style={{ padding: '4px 0' }}>
              {SUPPORT_NETWORK.map((p, i, arr) => (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid oklch(94% 0.005 80)' : 'none',
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar name={p.name} size={38} />
                    <span style={{
                      position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%',
                      background: p.status === 'online' ? 'oklch(55% 0.16 150)' : 'oklch(80% 0.005 80)',
                      border: '2px solid #fff',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(20% 0.01 80)' }}>{p.name}</p>
                    <p style={{ fontSize: 11, color: 'oklch(55% 0.008 80)' }}>{p.role}</p>
                  </div>
                  {p.canApprove && <Badge color="teal">Can approve</Badge>}
                </div>
              ))}
              <div style={{ padding: '12px 16px', borderTop: '1px solid oklch(94% 0.005 80)' }}>
                <button onClick={() => onNavigate('participant-support')} style={{
                  width: '100%', padding: '8px', borderRadius: 10, border: '1.5px dashed oklch(82% 0.01 80)',
                  background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                  color: 'oklch(40% 0.14 195)',
                }}>+ Add someone to your network</button>
              </div>
            </Card>
          </section>

          {/* Recent activity */}
          <section>
            <SectionHeader title="Recent activity" />
            <Card style={{ padding: '12px 16px' }}>
              {RECENT_ACTIVITY.map((a, i) => {
                const colors = {
                  teal: 'oklch(38% 0.14 195)', amber: 'oklch(45% 0.14 48)',
                  green: 'oklch(36% 0.14 155)', purple: 'oklch(40% 0.14 290)',
                  blue: 'oklch(40% 0.14 250)',
                };
                const bg = {
                  teal: 'oklch(93% 0.04 195)', amber: 'oklch(93% 0.06 50)',
                  green: 'oklch(93% 0.05 155)', purple: 'oklch(93% 0.05 290)',
                  blue: 'oklch(93% 0.05 250)',
                };
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid oklch(95% 0.005 80)' : 'none' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: bg[a.color],
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                      color: colors[a.color], flexShrink: 0,
                    }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12.5, color: 'oklch(28% 0.01 80)', lineHeight: 1.45 }}>{a.text}</p>
                      <p style={{ fontSize: 11, color: 'oklch(60% 0.008 80)', marginTop: 2 }}>{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </Card>
          </section>

          {/* Safety / quick help */}
          <Card style={{ padding: '16px 18px', background: 'oklch(97% 0.025 195)', borderColor: 'oklch(88% 0.05 195)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, lineHeight: 1 }}>🛡️</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(30% 0.14 195)', marginBottom: 4 }}>Need support?</p>
                <p style={{ fontSize: 12, color: 'oklch(40% 0.08 195)', lineHeight: 1.5, marginBottom: 10 }}>
                  Our team is here Mon–Fri, 9am–5pm. You can also reach out to your support network.
                </p>
                <Btn variant="secondary" size="sm" fullWidth>Contact support →</Btn>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

// ── Next Event hero card ──────────────────────────────────────────────────────
export const NextEventCard = ({ event: ev, daysUntil, onNavigate }) => {
  const catColor = {
    Arts: 'oklch(85% 0.06 290)', Sport: 'oklch(85% 0.06 195)',
    Education: 'oklch(85% 0.06 250)', Social: 'oklch(85% 0.06 48)',
    Skills: 'oklch(85% 0.06 155)',
  }[ev.category] || 'oklch(90% 0.005 80)';
  const catIcon = { Arts: '🎨', Sport: '⚽', Education: '📚', Social: '☕', Skills: '🍳' }[ev.category] || '📅';

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '10px 20px', background: 'oklch(96% 0.02 195)', borderBottom: '1px solid oklch(90% 0.03 195)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'oklch(40% 0.14 195)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          ⭐ Your next event
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, padding: 24 }}>
        <div style={{
          background: catColor, borderRadius: 16, display: 'flex', alignItems: 'center',
          justifyContent: 'center', position: 'relative', minHeight: 180,
        }}>
          <span style={{ fontSize: 72 }}>{catIcon}</span>
          <div style={{
            position: 'absolute', top: 12, left: 12, background: '#fff', borderRadius: 12,
            padding: '8px 12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: 'oklch(38% 0.14 195)', lineHeight: 1 }}>{daysUntil}</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'oklch(50% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>days to go</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <Badge color="teal">{ev.category}</Badge>
            <Badge color="green">RSVP confirmed</Badge>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'oklch(18% 0.01 80)', marginBottom: 10, lineHeight: 1.2 }}>{ev.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'oklch(40% 0.008 80)' }}>
              <span style={{ width: 18, color: 'oklch(50% 0.14 195)' }}>📅</span>
              <span><strong>{ev.date}</strong> at {ev.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'oklch(40% 0.008 80)' }}>
              <span style={{ width: 18, color: 'oklch(50% 0.14 195)' }}>📍</span>
              <span>{ev.suburb} · 12 min from home</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'oklch(40% 0.008 80)' }}>
              <span style={{ width: 18, color: 'oklch(50% 0.14 195)' }}>👥</span>
              <span>{ev.capacity - ev.spots} of {ev.capacity} attending · Priya M., James T. + 4 others</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {ev.a11y.map(a => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'oklch(42% 0.12 195)', background: 'oklch(93% 0.04 195)', padding: '4px 10px', borderRadius: 20 }}>
                <A11yIcon type={a} size={11} color="oklch(42% 0.12 195)" />
                <span>{A11Y_ATTRS.find(x => x.id === a)?.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
            <Btn variant="primary" size="md" onClick={() => onNavigate('event-detail', ev)}>View event details</Btn>
            <Btn variant="ghost" size="md" onClick={() => onNavigate('messages')}>💬 Event chat</Btn>
            <Btn variant="ghost" size="md">📍 Get directions</Btn>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ── Upcoming event row (compact) ──────────────────────────────────────────────
export const UpcomingRow = ({ event: ev, daysUntil, onClick }) => {
  const catColor = {
    Arts: 'oklch(85% 0.06 290)', Sport: 'oklch(85% 0.06 195)',
    Education: 'oklch(85% 0.06 250)', Social: 'oklch(85% 0.06 48)',
    Skills: 'oklch(85% 0.06 155)',
  }[ev.category] || 'oklch(90% 0.005 80)';
  const catIcon = { Arts: '🎨', Sport: '⚽', Education: '📚', Social: '☕', Skills: '🍳' }[ev.category] || '📅';

  return (
    <Card onClick={onClick} style={{
      padding: '14px 18px', display: 'grid', gridTemplateColumns: 'auto auto 1fr auto auto', gap: 16,
      alignItems: 'center', cursor: 'pointer', transition: 'border-color .15s',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 12, background: catColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
      }}>{catIcon}</div>
      <div style={{ textAlign: 'center', minWidth: 56 }}>
        <p style={{ fontSize: 22, fontWeight: 800, color: 'oklch(38% 0.14 195)', lineHeight: 1 }}>{daysUntil}d</p>
        <p style={{ fontSize: 10, fontWeight: 600, color: 'oklch(55% 0.008 80)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>away</p>
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'oklch(20% 0.01 80)', marginBottom: 4 }}>{ev.title}</p>
        <p style={{ fontSize: 12.5, color: 'oklch(52% 0.008 80)' }}>{ev.date} · {ev.time} · {ev.suburb}</p>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {ev.a11y.slice(0, 3).map(a => (
          <div key={a} title={A11Y_ATTRS.find(x => x.id === a)?.label} style={{
            width: 26, height: 26, borderRadius: 7, background: 'oklch(93% 0.04 195)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <A11yIcon type={a} size={13} color="oklch(42% 0.12 195)" />
          </div>
        ))}
      </div>
      <Badge color="green">Going</Badge>
    </Card>
  );
};

// ── Recommended event card ────────────────────────────────────────────────────
export const RecommendedCard = ({ event: ev, profile, onClick }) => {
  const catColor = {
    Arts: 'oklch(85% 0.06 290)', Sport: 'oklch(85% 0.06 195)',
    Education: 'oklch(85% 0.06 250)', Social: 'oklch(85% 0.06 48)',
    Skills: 'oklch(85% 0.06 155)',
  }[ev.category] || 'oklch(90% 0.005 80)';
  const catIcon = { Arts: '🎨', Sport: '⚽', Education: '📚', Social: '☕', Skills: '🍳' }[ev.category] || '📅';
  const matchedTags = ev.a11y.filter(a => profile.prefs.includes(a));
  const interestMatch = profile.interests.includes(ev.category);

  // Build a "why" string
  const reasons = [];
  if (matchedTags.length) reasons.push(`${matchedTags.length} accessibility match`);
  if (interestMatch) reasons.push(`${ev.category} interest`);
  if (ev.suburb === profile.suburb) reasons.push('Near you');
  const why = reasons.join(' · ') || 'Recommended for you';

  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ background: catColor, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, position: 'relative' }}>
        {catIcon}
        <div style={{
          position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.95)',
          borderRadius: 16, padding: '3px 9px', fontSize: 10, fontWeight: 700,
          color: 'oklch(38% 0.14 155)',
        }}>✨ {why}</div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)', marginBottom: 6, lineHeight: 1.3 }}>{ev.title}</p>
        <p style={{ fontSize: 12, color: 'oklch(52% 0.008 80)', marginBottom: 10 }}>{ev.date} · {ev.suburb}</p>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {ev.a11y.slice(0, 3).map(a => {
            const isMatch = profile.prefs.includes(a);
            return (
              <div key={a} title={A11Y_ATTRS.find(x => x.id === a)?.label} style={{
                width: 22, height: 22, borderRadius: 6,
                background: isMatch ? 'oklch(93% 0.05 155)' : 'oklch(94% 0.005 80)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: isMatch ? '1px solid oklch(75% 0.12 155)' : 'none',
              }}>
                <A11yIcon type={a} size={11} color={isMatch ? 'oklch(36% 0.14 155)' : 'oklch(55% 0.008 80)'} />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

