# Tech — GigCrypt

## Stack
- Vite + React 19 + TypeScript (strict mode).
- No backend. No database. No external API calls at runtime.
- Persistence: browser `localStorage`, one key (`gigcrypt.gigs.v1`).
- Data portability: JSON export / import (same schema, versioned).
- Hosting: static site — GitHub Pages (free).

## Conventions
- All dates stored as ISO strings (`YYYY-MM-DD` for deadlines).
- Money stored as a number in USD; formatting only at render time.
- Every state change goes through `update()` in `App.tsx`, which
  writes to `localStorage` immediately (no silent data loss).
- Components stay small and typed; business rules live in `src/lib/`
  (`types.ts` for the model, `store.ts` for persistence) so they can
  be unit-tested without rendering.
- Accessibility: labels on inputs, `aria-label` on icon-only controls,
  status changes announced by visible text (no color-only meaning).

## Commands
- `npm install` — install dependencies
- `npm run dev` — local dev server
- `npm run build` — type-check + production build
- `npm run preview` — serve the production build locally

## Definition of done (v1)
- `npm run build` passes with zero TypeScript errors.
- Add / move / bury a gig works and survives a page reload.
- Overdue gigs are visually unmistakable (red glow, ☠️ copy).
- Totals (pipeline, paid, overdue) are correct for the stored data.
- Works offline after first load; no network calls at runtime.
