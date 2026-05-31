# ConnectAbility Hub

POC for an NDIS community platform — event discovery, peer connection with carer-approval safety, idea board, places directory, and admin tooling. Ported from the Claude Design HTML prototype into a Vite + React app.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

> If `node_modules` has a leftover empty `@babel` or `@jridgewell` folder from an earlier partial install, delete `node_modules` first (`rmdir /S /Q node_modules` on Windows) before running `npm install`.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy to Vercel (client-shareable URL)

The fastest path to a live URL the client can click:

**Option A — Vercel CLI (1 minute)**

```bash
npm i -g vercel
vercel
```

Follow the prompts (project name, scope). First deploy gives a preview URL; run `vercel --prod` to promote.

**Option B — GitHub + Vercel dashboard (recommended for ongoing changes)**

1. Push this folder to a GitHub repo.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Vite from `vercel.json`.
3. Click Deploy. You get a `*.vercel.app` URL within ~30 seconds.
4. Every push to `main` redeploys.

## Demo navigation

A floating **⚙️ Demo controls** button (bottom-left) lets you jump between screens and switch the signed-in role (guest / participant / carer / admin) without going through the flows. Useful for client walkthroughs.

You can also navigate naturally:

- **Guest:** landing → register → role picker → onboarding → dashboard
- **Participant:** dashboard, events discovery + RSVP, idea board (submit/vote), places, businesses, messages, account
- **Carer:** profile switcher, pending connection approvals, RSVP on participant's behalf, invite participant flow
- **Admin:** sidebar nav, prioritised inbox, KPIs, places moderation panel

State (current view, signed-in role, RSVPs) persists in `localStorage` so the client can refresh without losing their place.

## Project structure

```
src/
  main.jsx             Entry point
  App.jsx              Router + 3 inline screens (Businesses, Messages, Account)
  shared.jsx           Primitives (Btn, Badge, Card, Avatar…), a11y icons, mock data
  hubScreens.jsx       Mobile-first screens + AdminDashboard
  desktopScreens.jsx   TopNav + desktop variants of every screen
  dashboard.jsx        Participant dashboard (desktop hero)
  places.jsx           Places feature (tiered ads, registration, admin panel)
  carerJourneys.jsx    Carer/participant linking flows
  styles.css           Global CSS + animations
```

All data is mocked in `shared.jsx`, `places.jsx`, `carerJourneys.jsx`, and `dashboard.jsx`. No backend.

## What's intentionally not built

This is a clickable POC for the client to react to — not production-ready software:

- No backend, auth, or persistence beyond `localStorage`
- No real moderation, payment, or NDIS verification
- Mobile-specific screens (`hub-screens.jsx` originals) are imported but the app routes to desktop variants; switching to mobile views needs a responsive shell, which is out of scope here
- Accessibility audited at design level (semantic colours, focus styles, a11y attribute system) but not screen-reader tested end-to-end

## Source design files

Original HTML/JSX prototypes from Claude Design are preserved in the read-only `ConnectAbility Hub` project folder (sibling to this one).
