# GlobalBridge

A Next.js 16 (App Router + TypeScript + Tailwind CSS) prototype for an
international education marketplace: universities, scholarships, and mentors, plus
role-based dashboards for students, mentors, and admins. Marketplace content is mocked in
`lib/mock-data.ts`. Authentication and the relational transaction demo use Netlify Database.

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

## Database deployment

Netlify Database supplies the managed PostgreSQL connection automatically. No manual
`DATABASE_URL` is required. The Drizzle schema lives in `db/schema.ts`; generated
migrations in `netlify/database/migrations/` are applied by Netlify during deployment.
This setup starts with an empty database; it does not import data from another provider.

Better Auth uses the Drizzle adapter for users, sessions, accounts, and verifications.
The existing authentication environment settings still apply. The `/prisma-demo` URL
is retained for compatibility and now demonstrates Drizzle transactions, including
nested inserts, audited updates, and rollback. Database demo pages render on request
instead of querying services during static generation.

For local development with Netlify's database environment, run `netlify dev --port 8889`.
After schema changes, generate a migration with
`npx drizzle-kit generate --name describe_your_change` and deploy; do not run the old
standalone table initialization script. The MongoDB catalog is a separate integration
and still requires its own reachable database for persistent catalog data.
