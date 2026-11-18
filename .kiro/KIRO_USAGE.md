# Kiro usage log — GigCrypt (Kiroween 2026)

Kiroween rules disqualify entries with "insufficient use of Kiro", so
every real Kiro session on this project is logged here. Kiro free tier:
50 credits/month, 0 used before 19 Nov 2026. Credits are spent
sparingly — most code is written by the build agent directly; Kiro is
used for directed tasks and as the spec/steering source of truth.

## Sessions

### 1. 2026-11-18 — Scaffold + specs (coordinator agent, via Kiro CLI install)
- Kiro CLI 3.4.0 installed and verified (`kiro-cli --version`).
- `.kiro/steering/` (product, structure, tech) and
  `.kiro/specs/gigcrypt/` (requirements, design, tasks) written first,
  code scaffolded after — spec-driven development.
- App v0.1 built (Vite + React 19 + TS strict), `npm run build` green.

### 2. 2026-11-19 ~01:40 WIB — Kiro CLI agent, non-interactive
- Command: `kiro-cli chat --no-interactive --trust-workspace
  --trust-all-tools --effort low` (run from the repo root, so Kiro
  read `.kiro/steering/` + `.kiro/specs/gigcrypt/tasks.md` itself).
- Task: implement the "due in the next 3 days" reminders strip
  (tasks.md Phase 2, item 1) using the existing `isDueSoon(gig, 3)`
  helper — no re-implemented date logic.
- Result: strip implemented in `src/App.tsx` (`dueSoonText` helper,
  `dueSoon` memo, conditional `<section className="due-soon-strip">`)
  + styles in `src/styles.css`; first build failed on an apostrophe
  in a string literal, Kiro fixed it itself; final build green, zero
  TypeScript errors.
- Credits used by this session: not reported by the CLI; verify at
  https://app.kiro.dev/settings/account (was 0/50 before the session).

## Standing rules for Kiro use on this project
- Directed tasks only, one feature per session, `--effort low`.
- Kiro reads the spec/steering files itself; the task prompt names
  the exact file + helper to reuse.
- No paid upgrade, no plan change, no credit purchase — ever —
  without Anugrah's explicit say-so.
