# Tasks — GigCrypt

## Phase 0 — Foundation (done 18 Nov 2026)
- [x] Install Kiro CLI 3.4.0 on the build VM, verify `kiro-cli --version`
- [x] Read Kiroween 2026 rules + categories from Devpost
- [x] Choose idea + category (Costume Contest)
- [x] Scaffold repo: Vite + React + TS, `.kiro/` steering + specs
- [x] Working v0.1: add gig, status moves, bury, filters, stats,
      overdue flagging, JSON export, seed demo data

## Phase 1 — Core board (19 Nov, ditarik maju dari 25–27 Nov)
- [x] `npm install` + `npm run build` green on the VM
- [x] JSON import (R4.3) + "Bury the samples" one-click seed clear
- [x] Deadline sort (soonest first) + search box
- [x] Lib tests: 30 checks pass (`/tmp/gt/test.js`, node + tsc)
- [ ] Verify in a real browser: add / move / bury / reload persistence
      (no headless browser on this VM — needs Muse browser task or
      Anugrah's final look 29–30 Nov)

## Phase 2 — Haunted polish (19 Nov, ditarik maju dari 28–30 Nov)
- [x] Deadline reminders strip: "due in the next 3 days" section
      (implemented with kiro-cli, 19 Nov — see `.kiro/KIRO_USAGE.md`)
- [x] Empty states with ghost copy for every filter
- [x] Mobile pass: tap targets ≥ 44px, layout at 360px wide
- [x] Favicon + social preview card (ghost.svg + og-preview.png 1200×630)

## Phase 3 — Ship (30 Nov–3 Dec)
- [ ] Deploy to GitHub Pages from the public repo
      (needs Muse browser task: create repo asfel307/gigcrypt + Pages)
- [ ] Record demo video (< 3 min): add a gig, move it to Paid,
      show an overdue gig rising, export JSON (Anugrah records, 1 Dec;
      script in `DEMO_SCRIPT.md`)
- [ ] Write Devpost submission: story, how Kiro was used, screenshots
      (draft in `SUBMISSION_DRAFT.md`)
- [ ] Bonus Blog Prize: publish a public blog post mentioning
      Kiroween 2026 (third-party platform)

## Phase 4 — Submit (4 Dec, before 14:00 PT / 05:00 WIB 5 Dec)
- [ ] Final `npm run build` + live link check
- [ ] Submit on Devpost with public repo URL + video URL
- [ ] Confirm submission receipt; keep the repo public
