# Tuition Forum Dhaka: Frontend (Phase 2)

Next.js 14 (App Router) + TypeScript + Tailwind CSS. This zip is the **frontend only**.
Everything runs on sample data in `lib/mock-data.ts`. Nothing is saved, and there is no real login yet.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```
Requires Node 18.17+ (Node 20 or 22 recommended). Fonts load from Google Fonts at build time.

## What works now
- Public: home, find tuition (search, 12 filters, sort, card/list), tuition details, tutors, tutor profile, district/subject pages, about, how it works, FAQ, contact, policies (draft text), sitemap, robots, JSON-LD.
- Auth screens: login, guardian/tutor register (Zod validation, Bangladesh mobile check), forgot/reset/verify pages.
- Tutor and guardian dashboards: overview, profile, applications (withdraw / shortlist / select one tutor), tuition, post-tuition form, payments (bKash/Nagad instruction + transaction submit), reviews, notifications (mark read).
- Admin: dashboard with time filters, and management tables with approve / reject / verify / suspend actions that require a note where needed; website, payment, homepage settings; admin users; activity logs.
- Mobile bottom navigation for tutors and guardians, drawer for admin and public menu.

## What is NOT real yet (backend phases)
- All data is fictional sample data. Form submits call `lib/api-stub.ts`, which only waits and returns success. Replace it with real API calls.
- No authentication, database, file upload, emails or payment verification. The "Preview the dashboards" links on `/login` are demo shortcuts and must be removed once Auth.js is added.
- Payment numbers in `lib/settings.ts` are placeholders. Real values will be stored in the database and edited in Admin > Payment settings.
- Only a sample of Bangladesh locations is in `lib/constants.ts`. The full 64-district hierarchy comes with the database seed.
- Legal pages contain placeholder text that needs a lawyer's review.
- The logo is a temporary component: `components/ui/logo.tsx`.

## Where to change things
- Colors and fonts: `tailwind.config.ts`, `app/layout.tsx`
- Site name and contact: `config/site.ts`
- Validation rules: `lib/schemas.ts` (reused on the server later)
