# 👻 GigCrypt — Where Dead Gigs Rise Again

**Kiroween 2026 entry · Category: Costume Contest**

One haunted board for every bounty, freelance gig, and job
application you are chasing — with deadlines that refuse to stay
buried.

## The problem

People who earn from many small opportunities — coding bounties,
freelance gigs, job applications — juggle them across platforms,
spreadsheets, and chat messages. Deadlines slip, prizes are
forgotten, and nobody sees the total pipeline value. Existing
trackers are built for sales teams, not for one person chasing
many small prizes.

## What GigCrypt does

- **Summon a gig** — title, platform, kind (bounty / freelance /
  job / other), prize in USD, deadline.
- **The Crypt** — filter the board by status: Hunting, Submitted,
  Won, Lost, Paid. Move a gig with one click; bury it with another.
- **Dead-lines that rise** — a gig past its deadline while still
  open is flagged ☠️ "it rose from the dead!", glows red, and is
  counted separately. Due-today gigs get a ⏰ warning.
- **Money overview** — total gigs, active hunts, pipeline value,
  paid total, overdue count, always visible at the top.
- **Your data stays yours** — local-first: everything lives in the
  browser's `localStorage`. No account, no server, no tracking.
  Export / import as JSON any time.

## Why Costume Contest

The spookiness *is* the function. In GigCrypt, "deadline" is
literal: missed deadlines rise from the grave as ghosts, the board
is a crypt, deleting is burying. The haunted UI makes the most
important information — what is overdue — impossible to miss.

## Tech

- Vite + React 19 + TypeScript (strict)
- No backend, no database, no runtime network calls
- Static hosting (GitHub Pages, free)
- Built with **Kiro** (CLI 3.4.0) using spec-driven development:
  see [`.kiro/steering/`](.kiro/steering/) and
  [`.kiro/specs/gigcrypt/`](.kiro/specs/gigcrypt/) — requirements,
  design, and tasks were written before the code.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

## Status

v1.0 feature-complete (19 Nov 2026, pulled forward from the 25–30 Nov
plan): core board works (add / move / bury / filter / stats / overdue
flagging / JSON export + import / "Bury the samples" / deadline sort /
search / due-soon strip / per-filter empty states / mobile 360px /
favicon + social preview). `npm run build` green; 30 lib checks pass.
Remaining: real-browser click-through check, GitHub repo + Pages
deploy, demo video, Devpost submission. See [`STATUS.md`](STATUS.md).

## License

MIT
