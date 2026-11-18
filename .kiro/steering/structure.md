# Structure — GigCrypt

```
kiroween/                  <- repo root (public GitHub repo for Devpost)
├── .kiro/                 <- Kiro specs & steering (required by Kiroween)
│   ├── steering/          <- product / tech / structure guidance for Kiro
│   └── specs/gigcrypt/    <- requirements, design, tasks (spec-driven)
├── public/
│   └── ghost.svg          <- favicon
├── src/
│   ├── main.tsx           <- React entry point
│   ├── App.tsx            <- board UI: stats, form, filters, gig list
│   ├── styles.css         <- haunted theme (dark graveyard + pumpkin)
│   └── lib/
│       ├── types.ts       <- Gig model, statuses, date helpers
│       └── store.ts       <- localStorage load/save, JSON export/import
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── PLAN.md                <- daily build plan 25 Nov – 4 Dec 2026
```

## Rules for contributors (human or agent)
- Keep the app dependency-free at runtime: no analytics, no fonts
  from CDNs, no tracking pixels.
- New features start as a task in `.kiro/specs/gigcrypt/tasks.md`
  and get checked off only when verified in the browser.
- Never store secrets or personal data in the repo; the app itself
  stores user data only in the user's own browser.
