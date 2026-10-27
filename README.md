# GlobalBridge

A frontend-only Next.js 16 (App Router + TypeScript + Tailwind CSS) prototype for an
international education marketplace: universities, scholarships, and mentors, plus
role-based dashboards for students, mentors, and admins. All data is mocked in
`lib/mock-data.ts` — no backend, database, or auth.

## Getting started

This project's dependencies could not be installed in the sandbox that generated it
(no network access), so run these on your own machine:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure highlights

- `app/` — route tree matching the requested architecture (marketplace routes,
  dynamic `[id]` pages, and nested `dashboard/{student,mentor,admin}` layouts).
- `components/marketing/` — landing page sections and marketplace cards.
- `components/dashboard/` — sidebar, top nav, and role tab navigation.
- `components/ui/` — skeletons, empty states, progress bars, stat cards, theme toggle.
- `lib/mock-data.ts` — all mock content and formatting helpers.

## Design notes

Palette and type are intentionally academic-travel themed (deep navy `ink`, muted gold
`gold` for scholarships/achievement, teal `harbor` for growth/global signals), paired
with Fraunces (display), Inter (body), and IBM Plex Mono (data/labels). The signature
`.stub-card` component (see `app/globals.css`) gives marketplace cards a torn
boarding-pass silhouette, echoing the study-abroad subject matter.

Dark mode is a manual class toggle (`ThemeToggle`) rather than relying only on
`prefers-color-scheme`, so it can be switched from the navbar.
