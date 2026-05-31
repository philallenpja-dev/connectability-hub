import React from 'react';
import { Avatar, Badge, BottomSheet, Btn, Card, Input, MOCK_EVENTS, MOCK_PENDING_CONNECTIONS, ProgressSteps, Toast } from './shared.jsx';

// ─── ConnectAbility Hub — Carer / Participant Relationship Journeys ───────────
// Requires hub-shared.jsx to be loaded first

// ── Data ──────────────────────────────────────────────────────────────────────
export const CARER_TYPES = [
  { id: 'parent',   icon: '👨‍👩‍👧', label: 'Parent / Guardian',     desc: 'I am the parent or legal guardian of an NDIS participant' },
  { id: 'support',  icon: '🏥', label: 'NDIS Support Worker',    desc: 'I am a registered support worker providing formal NDIS services' },
  { id: 'minder',   icon: '🤝', label: 'Private Minder',         desc: 'I provide private care and support arrangements' },
  { id: 'informal', icon: '💛', label: 'Informal Carer',         desc: 'I am a family member or friend providing regular support' },
  { id: 'guardian', icon: '⚖️', label: 'Legal Guardian',         desc: 'I hold formal legal guardianship responsibilities' },
];

export const AUTONOMY_LEVELS = [
  { id: 'full',        icon: '🔓', label: 'Full independence',       desc: 'I can see activity but the participant makes all decisions themselves', color: 'green' },
  { id: 'rsvp',        icon: '📅', label: 'Approve RSVPs',           desc: 'I approve event RSVPs before they are confirmed', color: 'teal' },
  { id: 'connections', icon: '🤝', label: 'Approve connections',     desc: 'I approve all connection requests before they are accepted', color: 'amber' },
  { id: 'all',         icon: '🔒', label: 'Approve everything',      desc: 'I approve RSVPs, connections, and messages before they happen', color: 'red' },
];

export const MOCK_LINKED_PARTICIPANTS = [
  { id: 1, name: 'Emma R.', age: 24, suburb: 'Fitzroy', autonomy: 'connections', joined: '3 months ago', avatar: null, activity: [
    { type: 'rsvp',       text: 'RSVPd to Sensory Friendly Art Class', time: '2 hours ago',  icon: '🎉' },
    { type: 'interest',   text: 'Expressed interest in "Movie Night with Audio Description"', time: 'Yesterday', icon: '💛' },
    { type: 'connection', text: 'New connection request from Marcus L. — needs your approval', time: '2 days ago', icon: '🤝', needsApproval: true, requestId: 1 },
    { type: 'message',    text: 'Sent a message to Priya M. about the art class', time: '3 days ago', icon: '💬' },
  ]},
  { id: 2, name: 'Liam R.',  age: 20, suburb: 'Carlton',  autonomy: 'all',    joined: '6 weeks ago',  avatar: null, activity: [
    { type: 'rsvp',       text: 'RSVPd to NDIS Planning Workshop', time: 'Yesterday', icon: '🎉' },
    { type: 'connection', text: 'Connection request from James T. — needs your approval', time: '4 days ago', icon: '🤝', needsApproval: true, requestId: 2 },
  ]},
];

// ── Carer Registration Flow ───────────────────────────────────────────────────
export const CarerRegistrationFlow = ({ onComplete, onBack }) => {
  const [step, setStep] = React.useState(0);
  const [carerType, setCarerType] = React.useState('');
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '', phone: '', org: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const steps = ['Carer type', 'Your details', 'Invite participant'];
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (submitted) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: '#fff', textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'oklch(93% 0.05 155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>You're all set!</h2>
      <p style={{ fontSize: 14, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 28, maxWidth: 300 }}>Your carer account is ready. We've sent an invitation to your participant — you'll be notified when they join.</p>
      <Btn fullWidth variant="primary" size="lg" onClick={() => onComplete && onComplete('carer')}>Go to my dashboard →</Btn>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={step === 0 ? onBack : () => setStep(s => s - 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'oklch(42% 0.01 80)', padding: 0 }}>←</button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800 }}>Register as a carer</h1>
            <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Support someone with their community journey</p>
          </div>
        </div>
        <ProgressSteps steps={steps} current={step} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>

        {/* Step 0 — Carer type */}
        {step === 0 && (
          <div>
            <p style={{ fontSize: 14, color: 'oklch(45% 0.008 80)', lineHeight: 1.6, marginBottom: 18 }}>Tell us about your role. This helps us show you the right tools and permissions for supporting a participant.</p>
            {CARER_TYPES.map(ct => (
              <button key={ct.id} onClick={() => setCarerType(ct.id)} style={{ display: 'block', width: '100%', padding: '14px 16px', marginBottom: 10, borderRadius: 14, border: `2px solid ${carerType === ct.id ? 'oklch(52% 0.155 195)' : 'oklch(90% 0.008 80)'}`, background: carerType === ct.id ? 'oklch(93% 0.04 195)' : '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{ct.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: carerType === ct.id ? 'oklch(35% 0.14 195)' : 'oklch(18% 0.01 80)', marginBottom: 2 }}>{ct.label}</p>
                    <p style={{ fontSize: 12, color: 'oklch(52% 0.008 80)', lineHeight: 1.4 }}>{ct.desc}</p>
                  </div>
                  {carerType === ct.id && <span style={{ marginLeft: 'auto', color: 'oklch(52% 0.155 195)', fontSize: 18, fontWeight: 800 }}>✓</span>}
                </div>
              </button>
            ))}
            {carerType === 'support' && (
              <div style={{ background: 'oklch(94% 0.05 195)', borderRadius: 12, padding: '12px 14px', marginTop: 4, fontSize: 13, color: 'oklch(38% 0.12 195)', lineHeight: 1.5 }}>
                📋 Support Workers will need to provide their NDIS registration number in the next step for verification.
              </div>
            )}
          </div>
        )}

        {/* Step 1 — Carer details */}
        {step === 1 && (
          <div>
            <Input label="First name (required)" placeholder="Your first name" value={form.firstName} onChange={e => f('firstName', e.target.value)} />
            <Input label="Last name (required)" placeholder="Your last name" value={form.lastName} onChange={e => f('lastName', e.target.value)} />
            <Input label="Email address (required)" type="email" placeholder="your@email.com" value={form.email} onChange={e => f('email', e.target.value)} hint="We'll use this to notify you of participant activity" />
            <Input label="Mobile number" optional placeholder="04xx xxx xxx" value={form.phone} onChange={e => f('phone', e.target.value)} hint="For urgent safeguarding notifications" />
            {carerType === 'support' && <Input label="Organisation / agency" optional placeholder="e.g. Scope, Yooralla" value={form.org} onChange={e => f('org', e.target.value)} />}
            {carerType === 'support' && <Input label="NDIS registration number" optional placeholder="e.g. 40xxxxxxx" hint="Required for verified Support Worker status" />}
          </div>
        )}

        {/* Step 2 — Invite participant */}
        {step === 2 && <InviteParticipantStep carerName={form.firstName || 'Your'} />}
      </div>

      <div style={{ padding: '12px 20px 20px', borderTop: '1px solid oklch(93% 0.008 80)', background: '#fff' }}>
        <Btn fullWidth variant={step === 2 ? 'amber' : 'primary'} size="lg"
          disabled={step === 0 && !carerType || (step === 1 && (!form.firstName || !form.lastName || !form.email))}
          onClick={() => { if (step === 2) setSubmitted(true); else setStep(s => s + 1); }}>
          {step === 2 ? 'Complete setup →' : 'Continue →'}
        </Btn>
      </div>
    </div>
  );
};

// ── Invite Participant Step ────────────────────────────────────────────────────
export const InviteParticipantStep = ({ carerName }) => {
  const [method, setMethod] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [autonomy, setAutonomy] = React.useState('connections');

  return (
    <div>
      <div style={{ background: 'oklch(93% 0.04 195)', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 4 }}>🌟 Their profile, their community</p>
        <p style={{ fontSize: 13, color: 'oklch(42% 0.10 195)', lineHeight: 1.6 }}>The participant will create their own account and feel fully in control of their experience. Your role is to support and keep them safe — not to restrict them.</p>
      </div>

      {/* Autonomy level */}
      <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(22% 0.01 80)', marginBottom: 8 }}>How much independence will they have?</p>
      <p style={{ fontSize: 13, color: 'oklch(50% 0.008 80)', marginBottom: 12, lineHeight: 1.5 }}>You can always change this later. We recommend starting with connection approval and reviewing after a few months.</p>
      {AUTONOMY_LEVELS.map(lvl => {
        const colors = { green:'oklch(93% 0.05 155)', teal:'oklch(93% 0.04 195)', amber:'oklch(93% 0.06 50)', red:'oklch(94% 0.05 20)' };
        const textColors = { green:'oklch(35% 0.14 155)', teal:'oklch(35% 0.14 195)', amber:'oklch(40% 0.14 48)', red:'oklch(40% 0.18 20)' };
        const isSelected = autonomy === lvl.id;
        return (
          <button key={lvl.id} onClick={() => setAutonomy(lvl.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', padding: '12px 14px', marginBottom: 8, borderRadius: 12, border: `2px solid ${isSelected ? (colors[lvl.color].replace('93%','70%').replace('94%','70%')) : 'oklch(90% 0.008 80)'}`, background: isSelected ? colors[lvl.color] : '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{lvl.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: isSelected ? textColors[lvl.color] : 'oklch(20% 0.01 80)', marginBottom: 2 }}>{lvl.label}</p>
              <p style={{ fontSize: 12, color: isSelected ? textColors[lvl.color] : 'oklch(52% 0.008 80)', lineHeight: 1.4, opacity: isSelected ? 0.9 : 1 }}>{lvl.desc}</p>
            </div>
            {isSelected && <span style={{ color: textColors[lvl.color], fontWeight: 800, flexShrink: 0 }}>✓</span>}
          </button>
        );
      })}

      <div style={{ borderTop: '1px solid oklch(92% 0.008 80)', margin: '20px 0' }} />

      {/* Invite method */}
      <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(22% 0.01 80)', marginBottom: 12 }}>Invite them to join</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['email','✉️ Send email'],['link','🔗 Copy link'],['later','⏭ Skip for now']].map(([m, l]) => (
          <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: '9px 0', borderRadius: 10, border: `1.5px solid ${method===m?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, background: method===m?'oklch(93% 0.04 195)':'#fff', color: method===m?'oklch(38% 0.14 195)':'oklch(42% 0.01 80)', fontSize: 12, fontFamily: 'inherit', fontWeight: method===m?700:500, cursor: 'pointer' }}>{l}</button>
        ))}
      </div>

      {method === 'email' && !sent && (
        <div>
          <Input label="Their email address" type="email" placeholder="participant@email.com" value={email} onChange={e => setEmail(e.target.value)} hint="They'll receive a warm, personalised invitation" />
          <Btn fullWidth variant="primary" size="md" disabled={!email} onClick={() => setSent(true)}>Send invitation</Btn>
        </div>
      )}
      {method === 'email' && sent && (
        <div style={{ background: 'oklch(93% 0.05 155)', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(35% 0.14 155)', marginBottom: 4 }}>✓ Invitation sent!</p>
          <p style={{ fontSize: 13, color: 'oklch(42% 0.10 155)' }}>They'll receive a personalised email from ConnectAbility Hub.</p>
        </div>
      )}
      {method === 'link' && (
        <div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1.5px solid oklch(87% 0.01 80)', fontSize: 13, color: 'oklch(45% 0.008 80)', background: 'oklch(97% 0.004 80)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              connectabilityhub.com.au/join?invite=abc123xyz
            </div>
            <Btn variant="secondary" size="md">Copy</Btn>
          </div>
          <p style={{ fontSize: 12, color: 'oklch(58% 0.008 80)', marginTop: 8 }}>Link expires in 7 days. Share it via text, WhatsApp, or hand them a printed QR code.</p>
        </div>
      )}
      {method === 'later' && (
        <div style={{ background: 'oklch(94% 0.06 50)', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: 'oklch(40% 0.12 48)', lineHeight: 1.5 }}>
          ⏭ No problem — you can invite participants from your dashboard at any time.
        </div>
      )}
    </div>
  );
};

// ── Participant Onboarding via Invite ─────────────────────────────────────────
export const ParticipantInviteOnboarding = ({ onComplete, onBack }) => {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ displayName: '', dob: '', suburb: '', photo: false });
  const [submitted, setSubmitted] = React.useState(false);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // Mock — who invited them
  const inviter = { name: 'Sarah R.', role: 'Parent / Guardian', type: 'parent' };
  const steps = ['Welcome', 'Your profile', 'Your privacy'];

  if (submitted) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: 'oklch(52% 0.155 195)', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Welcome to your community!</h2>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 32, maxWidth: 300 }}>Your profile is yours. {inviter.name} is there to support you — but this is your space, your way.</p>
      <Btn variant="amber" size="lg" fullWidth onClick={() => onComplete && onComplete('participant')}>Start exploring →</Btn>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* Step 0 — Welcome screen */}
      {step === 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ background: 'oklch(52% 0.155 195)', padding: '40px 24px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>You've been invited to join ConnectAbility Hub 🎉</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>Invited by <strong>{inviter.name}</strong> ({inviter.role})</p>
          </div>

          <div style={{ padding: '24px 20px', flex: 1 }}>
            <div style={{ background: 'oklch(93% 0.04 195)', borderRadius: 16, padding: '18px 18px', marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: 'oklch(32% 0.14 195)', marginBottom: 8 }}>This is YOUR space 🌟</p>
              <p style={{ fontSize: 14, color: 'oklch(40% 0.10 195)', lineHeight: 1.6 }}>Your profile belongs to you. You choose your display name, your photo, and what you share. You can discover events, connect with people, and share ideas — all on your terms.</p>
            </div>

            <p style={{ fontSize: 15, fontWeight: 700, color: 'oklch(22% 0.01 80)', marginBottom: 12 }}>How {inviter.name} supports you</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {[
                { icon: '✅', text: `${inviter.name} can see your activity so you're always safe`, positive: true },
                { icon: '🤝', text: 'They help approve new connections — so you only chat with good people', positive: true },
                { icon: '🔔', text: 'They get notified if anything needs their attention', positive: true },
                { icon: '🔓', text: 'You still make your own choices — they are there to help, not control', positive: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: '#fff', borderRadius: 12, border: '1px solid oklch(90% 0.008 80)' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <p style={{ fontSize: 13, color: 'oklch(28% 0.01 80)', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'oklch(94% 0.05 50)', borderRadius: 12, padding: '12px 14px', marginBottom: 24, fontSize: 13, color: 'oklch(38% 0.12 48)', lineHeight: 1.5 }}>
              💬 <strong>Not comfortable?</strong> If at any point you'd like to change what {inviter.name} can see, you can update this in your privacy settings. Our team is also here to help.
            </div>
          </div>

          <div style={{ padding: '12px 20px 24px' }}>
            <Btn fullWidth variant="primary" size="lg" onClick={() => setStep(1)}>Sounds good — let's go! →</Btn>
            <button style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: 12, background: 'none', border: 'none', fontSize: 13, color: 'oklch(55% 0.008 80)', cursor: 'pointer', fontFamily: 'inherit' }}>I have questions first</button>
          </div>
        </div>
      )}

      {/* Steps 1 & 2 */}
      {step > 0 && (
        <>
          <div style={{ padding: '16px 20px 0', borderBottom: '1px solid oklch(93% 0.008 80)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'oklch(42% 0.01 80)', padding: 0 }}>←</button>
              <h1 style={{ fontSize: 18, fontWeight: 800 }}>Set up your profile</h1>
            </div>
            <ProgressSteps steps={steps} current={step} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>
            {step === 1 && (
              <div>
                <p style={{ fontSize: 14, color: 'oklch(45% 0.008 80)', marginBottom: 16, lineHeight: 1.5 }}>Choose how you appear to others in the community. You're in control of what people see.</p>
                <Input label="Your display name" placeholder="e.g. Emma or Em (whatever you prefer)" value={form.displayName} onChange={e => f('displayName', e.target.value)} hint="This is what other participants see — not your full legal name" />
                <Input label="Date of birth" type="date" value={form.dob} onChange={e => f('dob', e.target.value)} hint="Used to find age-appropriate events — never shown publicly" />
                <Input label="Suburb" optional placeholder="e.g. Fitzroy" value={form.suburb} onChange={e => f('suburb', e.target.value)} hint="Helps us show events near you" />

                {/* Profile photo */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'oklch(30% 0.01 80)', marginBottom: 8 }}>Profile photo <span style={{ fontWeight: 400, color: 'oklch(58% 0.008 80)' }}>(optional)</span></label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: form.photo ? 'oklch(52% 0.155 195)' : 'oklch(90% 0.005 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: form.photo ? 32 : 24, color: 'oklch(55% 0.008 80)' }}>
                      {form.photo ? '😊' : '👤'}
                    </div>
                    <div>
                      <Btn variant="secondary" size="sm" onClick={() => f('photo', !form.photo)}>{form.photo ? 'Remove photo' : 'Add photo'}</Btn>
                      <p style={{ fontSize: 11, color: 'oklch(60% 0.008 80)', marginTop: 5 }}>Only visible to people at the same event</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p style={{ fontSize: 14, color: 'oklch(45% 0.008 80)', marginBottom: 16, lineHeight: 1.5 }}>You're always in control of your privacy. Here's how your account is set up to keep you safe.</p>

                {/* Current privacy setup summary */}
                <div style={{ background: 'oklch(93% 0.04 195)', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 10 }}>Your privacy settings</p>
                  {[
                    ['Your full name', 'Never shown to other participants'],
                    ['Your profile', `Visible to other participants at shared events`],
                    ['Your NDIS details', 'Only visible to you and your carer'],
                    ['Your messages', 'Visible to you, your contacts, and your carer'],
                    ['Event RSVPs', 'Visible to you and your carer'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid oklch(88% 0.08 195)' }}>
                      <span style={{ fontSize: 13, color: 'oklch(40% 0.10 195)' }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(35% 0.14 195)', textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Carer visibility */}
                <div style={{ background: 'oklch(96% 0.005 80)', borderRadius: 14, padding: '14px 16px', marginBottom: 16, border: '1px solid oklch(88% 0.01 80)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Avatar name={`S R`} size={36} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(22% 0.01 80)' }}>Sarah R. (Parent / Guardian)</p>
                      <p style={{ fontSize: 11, color: 'oklch(58% 0.008 80)' }}>Part of your support network</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'oklch(42% 0.008 80)', lineHeight: 1.5 }}>Sarah can see your events, connections, and messages. She will approve connection requests before you start chatting with someone new.</p>
                  <button style={{ fontSize: 12, color: 'oklch(52% 0.155 195)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, marginTop: 8, padding: 0 }}>Change what Sarah can see →</button>
                </div>

                <div style={{ background: 'oklch(94% 0.05 50)', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: 'oklch(38% 0.12 48)', lineHeight: 1.5 }}>
                  🔒 You can always update your privacy settings from your Account page. If you ever have concerns, contact our safeguarding team.
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '12px 20px 20px', borderTop: '1px solid oklch(93% 0.008 80)', background: '#fff' }}>
            <Btn fullWidth variant={step === 2 ? 'amber' : 'primary'} size="lg"
              disabled={step === 1 && !form.displayName}
              onClick={() => { if (step === 2) setSubmitted(true); else setStep(s => s + 1); }}>
              {step === 2 ? 'I\'m ready — take me in! 🎉' : 'Continue →'}
            </Btn>
          </div>
        </>
      )}
    </div>
  );
};

// ── Carer Oversight Dashboard (enhanced) ─────────────────────────────────────
export const CarerOversightDashboard = ({ onNavigate }) => {
  const [activeParticipant, setActiveParticipant] = React.useState(0);
  const [pendingConnections, setPendingConnections] = React.useState(MOCK_PENDING_CONNECTIONS);
  const [activityFilter, setActivityFilter] = React.useState('all');
  const [showPermissions, setShowPermissions] = React.useState(false);
  const [permissions, setPermissions] = React.useState({ rsvp: 'independent', connections: 'approval', messages: 'independent' });
  const [toast, setToast] = React.useState('');
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const participant = MOCK_LINKED_PARTICIPANTS[activeParticipant];
  const activity = participant.activity.filter(a => activityFilter === 'all' || a.type === activityFilter);

  const handleApprove = id => { setPendingConnections(p => p.filter(c => c.id !== id)); showToast('✓ Connection approved'); };
  const handleDecline = id => { setPendingConnections(p => p.filter(c => c.id !== id)); showToast('Connection declined'); };

  const pendingItems = participant.activity.filter(a => a.needsApproval);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'oklch(97% 0.009 75)' }}>
      {/* Header */}
      <div style={{ background: 'oklch(52% 0.155 195)', padding: '20px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button onClick={() => onNavigate('events')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Support Dashboard</h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>You are supporting {MOCK_LINKED_PARTICIPANTS.length} participant{MOCK_LINKED_PARTICIPANTS.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Participant switcher */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {MOCK_LINKED_PARTICIPANTS.map((p, i) => (
            <button key={p.id} onClick={() => setActiveParticipant(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 24, background: activeParticipant === i ? '#fff' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, transition: 'all .15s' }}>
              <Avatar name={p.name} size={26} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: activeParticipant === i ? 'oklch(35% 0.14 195)' : '#fff', lineHeight: 1 }}>{p.name.split(' ')[0]}</p>
                {p.activity.filter(a => a.needsApproval).length > 0 && (
                  <span style={{ fontSize: 10, background: 'oklch(63% 0.14 48)', color: '#fff', borderRadius: 10, padding: '1px 6px', fontWeight: 700 }}>
                    {p.activity.filter(a => a.needsApproval).length} pending
                  </span>
                )}
              </div>
            </button>
          ))}
          <button onClick={() => onNavigate('carer-register')} style={{ padding: '8px 14px', borderRadius: 24, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontFamily: 'inherit', flexShrink: 0, fontWeight: 600 }}>+ Add</button>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* Participant quick-view card */}
        <Card style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Avatar name={participant.name} size={48} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'oklch(14% 0.01 80)' }}>{participant.name}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Age {participant.age} · {participant.suburb} · Joined {participant.joined}</p>
            </div>
            <button onClick={() => setShowPermissions(true)} style={{ background: 'oklch(93% 0.04 195)', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'oklch(38% 0.14 195)', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer' }}>⚙️ Settings</button>
          </div>
          {/* Autonomy level indicator */}
          {(() => {
            const lvl = AUTONOMY_LEVELS.find(l => l.id === participant.autonomy);
            const colors = { green:'oklch(93% 0.05 155)', teal:'oklch(93% 0.04 195)', amber:'oklch(93% 0.06 50)', red:'oklch(94% 0.05 20)' };
            const textColors = { green:'oklch(35% 0.14 155)', teal:'oklch(35% 0.14 195)', amber:'oklch(40% 0.14 48)', red:'oklch(40% 0.18 20)' };
            return lvl ? (
              <div style={{ background: colors[lvl.color], borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{lvl.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: textColors[lvl.color] }}>{lvl.label}</p>
                  <p style={{ fontSize: 11, color: textColors[lvl.color], opacity: 0.8 }}>{lvl.desc}</p>
                </div>
              </div>
            ) : null;
          })()}
        </Card>

        {/* Pending approvals */}
        {pendingItems.length > 0 && (
          <div style={{ background: 'oklch(93% 0.06 50)', border: '1.5px solid oklch(85% 0.10 50)', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(38% 0.14 48)', marginBottom: 12 }}>
              ⚠️ {pendingItems.length} item{pendingItems.length > 1 ? 's' : ''} need{pendingItems.length === 1 ? 's' : ''} your approval
            </p>
            {pendingConnections.slice(0, 2).map(conn => (
              <div key={conn.id} style={{ background: '#fff', borderRadius: 12, padding: '12px', marginBottom: 8, border: '1px solid oklch(90% 0.008 80)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar name={conn.name} size={38} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'oklch(18% 0.01 80)' }}>{conn.name} wants to connect</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Met {participant.name.split(' ')[0]} at {conn.event}</p>
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
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: 15, fontWeight: 700 }}>{participant.name.split(' ')[0]}'s events</p>
            <button onClick={() => onNavigate('events')} style={{ fontSize: 13, color: 'oklch(52% 0.155 195)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>+ RSVP for them</button>
          </div>
          {MOCK_EVENTS.slice(0, 2).map(ev => (
            <div key={ev.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid oklch(90% 0.008 80)', padding: '12px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{ev.title}</p>
                <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{ev.date} · {ev.suburb}</p>
              </div>
              <Badge color="green">Going ✓</Badge>
            </div>
          ))}
        </div>

        {/* Activity feed with filters */}
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Activity</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[['all','All'],['rsvp','Events'],['connection','Connections'],['message','Messages'],['interest','Ideas']].map(([v, l]) => (
              <button key={v} onClick={() => setActivityFilter(v)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${activityFilter===v?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, background: activityFilter===v?'oklch(52% 0.155 195)':'#fff', color: activityFilter===v?'#fff':'oklch(42% 0.01 80)', fontSize: 12, fontFamily: 'inherit', fontWeight: activityFilter===v?600:400, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{l}</button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid oklch(90% 0.008 80)', padding: '4px 16px' }}>
            {activity.length === 0 ? (
              <p style={{ fontSize: 13, color: 'oklch(60% 0.008 80)', textAlign: 'center', padding: '20px 0' }}>No activity in this category yet</p>
            ) : activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: i < activity.length - 1 ? '1px solid oklch(95% 0.005 80)' : 'none' }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: 'oklch(25% 0.01 80)', lineHeight: 1.4, marginBottom: 2 }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: 'oklch(62% 0.008 80)' }}>{a.time}</p>
                </div>
                {a.needsApproval && <Badge color="amber">Pending</Badge>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permission settings sheet */}
      <BottomSheet open={showPermissions} onClose={() => setShowPermissions(false)} title={`${participant.name.split(' ')[0]}'s permissions`}>
        <div style={{ paddingBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 16 }}>Adjust what {participant.name.split(' ')[0]} can do independently. Changes take effect immediately and {participant.name.split(' ')[0]} will be notified.</p>
          {AUTONOMY_LEVELS.map(lvl => {
            const colors = { green:'oklch(93% 0.05 155)', teal:'oklch(93% 0.04 195)', amber:'oklch(93% 0.06 50)', red:'oklch(94% 0.05 20)' };
            const textColors = { green:'oklch(35% 0.14 155)', teal:'oklch(35% 0.14 195)', amber:'oklch(40% 0.14 48)', red:'oklch(40% 0.18 20)' };
            const isSelected = participant.autonomy === lvl.id;
            return (
              <div key={lvl.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid oklch(94% 0.005 80)', cursor: 'pointer' }}>
                <span style={{ fontSize: 20 }}>{lvl.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: isSelected ? textColors[lvl.color] : 'oklch(20% 0.01 80)' }}>{lvl.label}</p>
                  <p style={{ fontSize: 12, color: 'oklch(52% 0.008 80)', lineHeight: 1.4 }}>{lvl.desc}</p>
                </div>
                {isSelected && <span style={{ color: textColors[lvl.color], fontWeight: 800, fontSize: 16 }}>✓</span>}
              </div>
            );
          })}
          <Btn fullWidth variant="primary" size="lg" style={{ marginTop: 16 }} onClick={() => { setShowPermissions(false); showToast('✓ Permissions updated'); }}>Save changes</Btn>
        </div>
      </BottomSheet>

      <Toast msg={toast} />
    </div>
  );
};

// ── Participant's Own View — Support Network ──────────────────────────────────
export const ParticipantSupportView = ({ onNavigate }) => {
  const carer = { name: 'Sarah R.', role: 'Parent / Guardian', icon: '👨‍👩‍👧' };
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'oklch(97% 0.009 75)' }}>
      <div style={{ background: '#fff', padding: '16px 20px 12px', borderBottom: '1px solid oklch(92% 0.008 80)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => onNavigate('account')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 0, color: 'oklch(42% 0.01 80)' }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800 }}>My support network</h1>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        <div style={{ background: 'oklch(93% 0.04 195)', borderRadius: 16, padding: '16px 18px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'oklch(35% 0.14 195)', marginBottom: 6 }}>🌟 Your community, your way</p>
          <p style={{ fontSize: 13, color: 'oklch(40% 0.10 195)', lineHeight: 1.6 }}>Your support network helps keep you safe while you explore ConnectAbility Hub. You're always in control of your own choices.</p>
        </div>

        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>People supporting you</p>
        <Card style={{ padding: '16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'oklch(93% 0.04 195)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{carer.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{carer.name}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>{carer.role}</p>
            </div>
            <Badge color="green">Active</Badge>
          </div>
          <div style={{ background: 'oklch(96% 0.005 80)', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'oklch(35% 0.008 80)', marginBottom: 6 }}>What Sarah can see</p>
            {[['Your events','✓ Yes'],['Your connections','✓ Yes — approves first'],['Your messages','✓ Yes'],['Your NDIS details','✗ No']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid oklch(93% 0.005 80)' }}>
                <span style={{ fontSize: 12, color: 'oklch(45% 0.008 80)' }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: v.startsWith('✓') ? 'oklch(35% 0.14 195)' : 'oklch(50% 0.008 80)' }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPrivacy(true)} style={{ fontSize: 13, color: 'oklch(52% 0.155 195)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}>Change what Sarah can see →</button>
        </Card>

        <Btn fullWidth variant="secondary" size="md" style={{ marginBottom: 12 }}>+ Invite another supporter</Btn>

        <div style={{ background: 'oklch(94% 0.05 50)', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: 'oklch(38% 0.12 48)', lineHeight: 1.5 }}>
          💬 Not happy with your support settings? <button style={{ color: 'oklch(42% 0.14 48)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, padding: 0 }}>Contact our safeguarding team</button>
        </div>
      </div>

      <BottomSheet open={showPrivacy} onClose={() => setShowPrivacy(false)} title="Change Sarah's access">
        <div style={{ paddingBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'oklch(50% 0.008 80)', lineHeight: 1.6, marginBottom: 16 }}>You can choose what Sarah can see. Some settings may require her agreement to change.</p>
          {[['See my events','yes'],['Approve my connections','yes'],['See my messages','yes'],['See my NDIS details','no']].map(([label, val]) => {
            const [v, setV] = React.useState(val === 'yes');
            return (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid oklch(94% 0.005 80)' }}>
                <span style={{ fontSize: 14, color: 'oklch(22% 0.01 80)', fontWeight: 500 }}>{label}</span>
                <div onClick={() => setV(!v)} style={{ width: 46, height: 26, borderRadius: 13, background: v ? 'oklch(52% 0.155 195)' : 'oklch(82% 0.008 80)', padding: 3, cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: v ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            );
          })}
          <Btn fullWidth variant="primary" size="lg" style={{ marginTop: 16 }} onClick={() => setShowPrivacy(false)}>Save my preferences</Btn>
        </div>
      </BottomSheet>
    </div>
  );
};

// ── Desktop: Carer Oversight ──────────────────────────────────────────────────
export const CarerOversightDesktop = ({ onNavigate }) => {
  const [activeParticipant, setActiveParticipant] = React.useState(0);
  const [pendingConnections, setPendingConnections] = React.useState(MOCK_PENDING_CONNECTIONS);
  const [activityFilter, setActivityFilter] = React.useState('all');
  const [toast, setToast] = React.useState('');
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const participant = MOCK_LINKED_PARTICIPANTS[activeParticipant];
  const activity = participant.activity.filter(a => activityFilter === 'all' || a.type === activityFilter);
  const pendingItems = participant.activity.filter(a => a.needsApproval);

  const handleApprove = id => { setPendingConnections(p => p.filter(c => c.id !== id)); showToast('✓ Connection approved'); };
  const handleDecline = id => { setPendingConnections(p => p.filter(c => c.id !== id)); showToast('Connection declined'); };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Support Dashboard</h1>
          <p style={{ fontSize: 15, color: 'oklch(50% 0.008 80)' }}>Overseeing {MOCK_LINKED_PARTICIPANTS.length} participant{MOCK_LINKED_PARTICIPANTS.length !== 1 ? 's' : ''}</p>
        </div>
        <Btn variant="secondary" size="md" onClick={() => onNavigate('carer-invite')}>+ Invite a participant</Btn>
      </div>

      {/* Participant switcher tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {MOCK_LINKED_PARTICIPANTS.map((p, i) => (
          <button key={p.id} onClick={() => setActiveParticipant(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 16, border: `2px solid ${activeParticipant===i ? 'oklch(52% 0.155 195)' : 'oklch(88% 0.01 80)'}`, background: activeParticipant===i ? 'oklch(93% 0.04 195)' : '#fff', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', position: 'relative' }}>
            <Avatar name={p.name} size={40} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: activeParticipant===i ? 'oklch(35% 0.14 195)' : 'oklch(18% 0.01 80)' }}>{p.name}</p>
              <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Age {p.age} · {p.suburb}</p>
            </div>
            {p.activity.filter(a => a.needsApproval).length > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: 'oklch(55% 0.18 20)', color: '#fff', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.activity.filter(a => a.needsApproval).length}
              </span>
            )}
          </button>
        ))}
        <button onClick={() => onNavigate('carer-invite')} style={{ padding: '14px 20px', borderRadius: 16, border: '2px dashed oklch(85% 0.01 80)', background: '#fff', cursor: 'pointer', fontSize: 14, color: 'oklch(52% 0.155 195)', fontFamily: 'inherit', fontWeight: 600 }}>+ Add participant</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 28 }}>
        {/* Left: participant summary + approvals */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Profile */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid oklch(90% 0.008 80)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar name={participant.name} size={52} />
              <div>
                <p style={{ fontSize: 17, fontWeight: 800 }}>{participant.name}</p>
                <p style={{ fontSize: 13, color: 'oklch(55% 0.008 80)' }}>Age {participant.age} · {participant.suburb}</p>
                <p style={{ fontSize: 12, color: 'oklch(60% 0.008 80)' }}>Joined {participant.joined}</p>
              </div>
            </div>
            {/* Autonomy */}
            {(() => {
              const lvl = AUTONOMY_LEVELS.find(l => l.id === participant.autonomy);
              const colors = { green:'oklch(93% 0.05 155)', teal:'oklch(93% 0.04 195)', amber:'oklch(93% 0.06 50)', red:'oklch(94% 0.05 20)' };
              const textColors = { green:'oklch(35% 0.14 155)', teal:'oklch(35% 0.14 195)', amber:'oklch(40% 0.14 48)', red:'oklch(40% 0.18 20)' };
              return lvl ? (
                <div style={{ background: colors[lvl.color], borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 18 }}>{lvl.icon}</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: textColors[lvl.color] }}>{lvl.label}</p>
                  </div>
                  <p style={{ fontSize: 12, color: textColors[lvl.color], opacity: 0.85, lineHeight: 1.4 }}>{lvl.desc}</p>
                </div>
              ) : null;
            })()}
            <Btn fullWidth variant="secondary" size="sm">⚙️ Manage permissions</Btn>
          </div>

          {/* Pending approvals */}
          <div style={{ background: pendingItems.length > 0 ? 'oklch(93% 0.06 50)' : '#fff', borderRadius: 18, border: `1px solid ${pendingItems.length > 0 ? 'oklch(85% 0.10 50)' : 'oklch(90% 0.008 80)'}`, padding: '18px' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: pendingItems.length > 0 ? 'oklch(38% 0.14 48)' : 'oklch(22% 0.01 80)', marginBottom: pendingItems.length > 0 ? 12 : 0 }}>
              {pendingItems.length > 0 ? `⚠️ ${pendingItems.length} pending approval${pendingItems.length > 1 ? 's' : ''}` : '✅ Nothing pending'}
            </p>
            {pendingConnections.map(conn => (
              <div key={conn.id} style={{ background: '#fff', borderRadius: 12, padding: '14px', marginBottom: 10, border: '1px solid oklch(90% 0.008 80)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <Avatar name={conn.name} size={40} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{conn.name}</p>
                    <p style={{ fontSize: 12, color: 'oklch(55% 0.008 80)' }}>Met at {conn.event}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="success" size="sm" style={{ flex: 1 }} onClick={() => handleApprove(conn.id)}>✓ Approve</Btn>
                  <Btn variant="danger" size="sm" style={{ flex: 1 }} onClick={() => handleDecline(conn.id)}>✕ Decline</Btn>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid oklch(90% 0.008 80)', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ fontSize: 15, fontWeight: 700 }}>Upcoming events</p>
              <button onClick={() => onNavigate('events')} style={{ fontSize: 13, color: 'oklch(52% 0.155 195)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>+ RSVP for them</button>
            </div>
            {MOCK_EVENTS.slice(0, 2).map(ev => (
              <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid oklch(95% 0.005 80)' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{ev.title}</p>
                  <p style={{ fontSize: 11, color: 'oklch(55% 0.008 80)' }}>{ev.date}</p>
                </div>
                <Badge color="green">Going ✓</Badge>
              </div>
            ))}
          </div>
        </aside>

        {/* Right: activity feed */}
        <main>
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid oklch(90% 0.008 80)', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Activity feed</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['all','All'],['rsvp','Events'],['connection','Connections'],['message','Messages'],['interest','Ideas']].map(([v, l]) => (
                  <button key={v} onClick={() => setActivityFilter(v)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${activityFilter===v?'oklch(52% 0.155 195)':'oklch(88% 0.01 80)'}`, background: activityFilter===v?'oklch(52% 0.155 195)':'#fff', color: activityFilter===v?'#fff':'oklch(42% 0.01 80)', fontSize: 13, fontFamily: 'inherit', fontWeight: activityFilter===v?600:400, cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
            </div>
            {activity.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: 'oklch(60% 0.008 80)' }}>
                <p style={{ fontSize: 18, marginBottom: 8 }}>🔍</p>
                <p style={{ fontWeight: 600 }}>No activity in this category</p>
              </div>
            ) : activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: i < activity.length - 1 ? '1px solid oklch(95% 0.005 80)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'oklch(95% 0.005 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: 'oklch(22% 0.01 80)', lineHeight: 1.5, marginBottom: 3 }}>{a.text}</p>
                  <p style={{ fontSize: 12, color: 'oklch(62% 0.008 80)' }}>{a.time}</p>
                </div>
                {a.needsApproval && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleApprove(1)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'oklch(93% 0.05 155)', color: 'oklch(35% 0.14 155)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                    <button onClick={() => handleDecline(1)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'oklch(94% 0.05 20)', color: 'oklch(45% 0.18 20)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Decline</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'oklch(18% 0.01 80)', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 200, animation: 'fadeIn .2s' }}>{toast}</div>}
    </div>
  );
};

// ── Desktop: Carer Invite standalone page ─────────────────────────────────────
export const CarerInviteDesktop = ({ onComplete, onBack }) => (
  <div style={{ minHeight: '100vh', background: 'oklch(97% 0.009 75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
    <div style={{ width: '100%', maxWidth: 560, background: '#fff', borderRadius: 24, border: '1px solid oklch(90% 0.008 80)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <CarerRegistrationFlow onComplete={onComplete} onBack={onBack} />
    </div>
  </div>
);

