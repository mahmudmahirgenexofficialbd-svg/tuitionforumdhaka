# Tuition Forum Dhaka

Bangladesh-wide tuition marketplace connecting guardians, tutors, and
platform administrators.

> **Build status: Phase 2 — Foundation.** This repository currently contains
> the project scaffold, database schema, design system, and homepage. Auth
> flows, dashboards, the marketplace, payments, and the admin panel land in
> later phases (see **Roadmap** below). Links in the navbar/footer to
> not-yet-built pages (`/login`, `/find-tuition`, etc.) will 404 until then —
> that's expected at this stage, not a bug.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js Route Handlers / Server Actions, Node.js
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** Auth.js (NextAuth) — credentials provider, JWT sessions, RBAC
- **File storage:** Cloudinary
- **Deployment target:** Vercel + managed Postgres + Cloudinary

## Requirements

- Node.js 18.18+ (20 LTS recommended)
- A PostgreSQL 14+ database (local install, Docker, or a managed service
  such as Neon, Supabase, or Railway)
- A Cloudinary account (free tier is enough for development)

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:

- `DATABASE_URL` — your Postgres connection string
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` in development
- `CLOUDINARY_*` — from your Cloudinary dashboard

## 3. Set up the database

```bash
npx prisma migrate dev --name init
npm run seed
```

This creates all tables and seeds:

- All 8 divisions and their 64 districts
- A starter subject list and class-level list
- Three **demo** accounts (clearly not real users — see console output
  after seeding for credentials), including one `SUPER_ADMIN`

## 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Other commands

| Command | Purpose |
|---|---|
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run typecheck` | TypeScript check with no emit |
| `npm run lint` | ESLint |
| `npx prisma studio` | Browse/edit the database visually |
| `npx prisma migrate dev` | Create/apply a new migration in development |
| `npx prisma migrate deploy` | Apply pending migrations in production |

## Design system

Tokens live in `tailwind.config.ts` (colors, radii, shadows) and
`src/app/layout.tsx` (fonts). Summary:

- **Palette:** `ink` (near-black text), `paper` (page background), `canal`
  (deep royal-blue primary), `marigold` (warm gold accent for trust/rating/
  verification), `mint` (success), `clay` (destructive/warning), `mist`
  (borders & subtle fills).
- **Type:** Newsreader (serif, `font-display`) for headings; IBM Plex Sans
  (`font-sans`) for UI and body text.
- **Brand mark:** `src/components/ui/logo.tsx` — a single reusable
  component used everywhere the brand appears. Swap the inline `<svg>` in
  `LogoMark` when a final logo is ready; nothing else needs to change.

## Project structure

```
src/
  app/                 Routes (App Router)
    api/auth/...        NextAuth route handler
    globals.css
    layout.tsx
    page.tsx            Homepage
  components/
    ui/                 Button, Card, Badge, Logo — generic primitives
    layout/              Navbar, Footer
    home/                Homepage-specific pieces (search widget, etc.)
  lib/
    auth.ts              Auth.js configuration
    prisma.ts             Prisma client singleton
    utils.ts               cn(), formatBDT()
  middleware.ts          Role-based route protection
  types/next-auth.d.ts   Session/JWT type augmentation
prisma/
  schema.prisma          Full data model
  seed.ts                 Divisions/districts/subjects + demo accounts
```

## Security notes for this phase

- Passwords are hashed with bcrypt (never stored or logged in plain text).
- `middleware.ts` blocks unauthenticated/wrong-role access to
  `/dashboard/*` and `/admin/*` at the edge — but per the project's own
  security rule, **this is a UX layer, not the source of truth.** Every
  Server Action and Route Handler added in later phases re-checks the
  session and role itself before doing anything sensitive.
- `AUTH_SECRET`, database credentials, and Cloudinary secrets stay in
  `.env` (gitignored) — never in client-side code.

## Roadmap (matches the phase plan agreed in discovery)

- [x] Phase 1 — Discovery & architecture
- [x] Phase 2 — Foundation (this repo state)
- [ ] Phase 3 — Authentication (registration, login, password reset, email verification)
- [ ] Phase 4 — Tutor system
- [ ] Phase 5 — Guardian system
- [ ] Phase 6 — Tuition marketplace (posting, approval, search, applications)
- [ ] Phase 7 — Payments (bKash/Nagad manual verification)
- [ ] Phase 8 — Reviews & complaints
- [ ] Phase 9 — Admin panel
- [ ] Phase 10 — SEO & performance
- [ ] Phase 11 — Testing
- [ ] Phase 12 — Deployment

## Troubleshooting

- **`P1001: Can't reach database server`** — check `DATABASE_URL` and that
  Postgres is running/reachable from where you're running the command.
- **Prisma Client out of date after schema changes** — run
  `npx prisma generate` (also runs automatically after `migrate dev`).
- **NextAuth `NEXTAUTH_URL` warning** — set it explicitly in `.env` even in
  development.
