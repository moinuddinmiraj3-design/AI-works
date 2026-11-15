# Lasso

AI candidate sourcing and outreach. Describe the person you're hiring, Lasso finds and scores matching profiles, you shortlist them into collections and reach out with email sequences from your own Gmail.

This repository is the **MVP front end**: every screen in the MVP scope, built with sample data. No backend is connected yet.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 with the Lasso design tokens (`src/app/globals.css`)
- shadcn/ui-style components on Radix (`src/components/ui`)
- Sample data in `src/lib/*-mock.ts`

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Area | Routes |
|---|---|
| Dashboard | `/` · `/welcome` (new workspace) |
| Sourcing | `/search/new` (AI chat) · `/search/searching` · `/search/[id]` |
| Library | `/collections/[id]` · `/candidates/[id]` |
| Outreach | `/outreach` · `/outreach/sequences/[id]` |
| Account | `/settings` · `/settings/members` · `/settings/plan` |
| Auth | `/login` · `/signup` · `/forgot-password` · `/check-email` · `/onboarding` |

## Docs

- `docs/MVP_SCOPE.md`: what's in and out of the MVP, the 10 core pages and flows
- `docs/NEXT_PHASE_INTERACTIONS.md`: interaction audit and what still needs the backend
- `docs/design-system/`: the original design-system reference
- `previews/`: screenshots of each page

## Not built yet (needs the backend)

Real AI search and refinement, loading more matches, and saving or sending anything (emails, enrolment, invites, imports, settings, uploads, billing). These actions show a confirmation message today.
