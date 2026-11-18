# Draf Submission Devpost — GigCrypt (Kiroween 2026, Costume Contest)

> Draf ini untuk ditempel ke form submission Devpost oleh Muse (2 Des).
> Jangan submit sebelum repo publik + link live + video YouTube lengkap.

## Judul
**GigCrypt — Where Dead Gigs Rise Again**

## Tagline (1 kalimat)
One haunted board for every bounty, freelance gig and job application —
with deadlines that refuse to stay buried.

## Cerita / deskripsi (untuk kolom "Tell us about your project")
Gig hunters juggle opportunities across a dozen places — coding
bounties, freelance marketplaces, job portals, spreadsheets, chat
messages. Deadlines slip, prizes are forgotten, and nobody sees the
total pipeline value. Existing trackers are built for sales teams, not
for one person chasing many small prizes.

GigCrypt is one board for all of it. Summon a gig with a title,
platform, kind (bounty / freelance / job / other), prize in USD and
deadline. Move it through Hunting → Submitted → Won → Paid (or Lost)
with one click. The header always shows the money: total gigs, active
hunts, pipeline value, paid total, and how many deadlines have risen
from the dead.

The spookiness *is* the function. In GigCrypt, "deadline" is literal:
a gig past its deadline while still open is flagged ☠️ "it rose from
the dead!", glows red, and is counted separately. Gigs due within 3
days gather in a "Due in the next 3 days" strip so nothing sneaks up.
Deleting is burying. The haunted UI makes the most important
information — what is overdue — impossible to miss.

Your data stays yours: everything lives in the browser's localStorage.
No account, no server, no tracking. Export and import as JSON any time.
The app works offline after first load and costs nothing to host.

Built with Kiro (CLI 3.4.0) using spec-driven development: requirements,
design and tasks were written in `.kiro/specs/gigcrypt/` before the code,
and the Kiro CLI agent implemented the due-soon reminders strip
directly from that spec. The `.kiro` directory is in the public repo —
steering, specs and the Kiro usage log included.

## Cara pakai Kiro (untuk kolom "How did you use Kiro")
- Wrote the product spec first: `.kiro/steering/` (product, structure,
  tech) and `.kiro/specs/gigcrypt/` (requirements, design, tasks) —
  the app was built to the spec, not the other way around.
- Kiro CLI 3.4.0 (Builder ID login) ran as an agent in the repo: it
  read the spec itself and implemented the "due in the next 3 days"
  reminders strip from the task list, fixed its own build error, and
  reported the result. Usage is logged in `.kiro/KIRO_USAGE.md`.
- The free tier (50 credits/month) was enough — most code was written
  directly to the spec, Kiro was used for directed tasks only.

## Link yang dibutuhkan saat submit
- [ ] Repo GitHub publik: https://github.com/asfel307/gigcrypt
      (isi: app + `/.kiro` di root + `LICENSE` MIT + workflow Pages)
- [ ] URL app live: https://asfel307.github.io/gigcrypt/
- [ ] Video demo (< 3 menit, YouTube publik/unlisted): _link diisi
      setelah Anugrah merekam 1 Des — lihat `DEMO_SCRIPT.md`_
- [ ] Kategori: Costume Contest

## Screenshot yang dibutuhkan (ambil setelah deploy, 2 Des)
1. **Board penuh** — hero + stats + strip due-soon + 3 sample gig
   (satu overdue merah). Ukuran desktop 1280×800.
2. **Tambah gig** — form terisi + kartu baru di atas board.
3. **Paid** — gig berstatus Paid + stats "already paid" terisi.
4. **Overdue dekat** — kartu merah "risen from the dead" (crop).
5. **Mobile 360px** — board di lebar HP (cek tap target + form 1 kolom).
6. **Export/Import** — tombol + pesan hasil import (opsional).
7. **Social preview** — `og-preview.png` sudah ada di repo
   (`public/og-preview.png`).

## Checklist sebelum submit (4 Des siang WIB)
- [ ] `npm run build` hijau + link live dicek dari browser bersih.
- [ ] Repo publik, `/.kiro` terlihat di root, lisensi MIT terlihat.
- [ ] Video YouTube < 3 menit, link bisa dibuka tanpa login.
- [ ] Deskripsi + cara pakai Kiro terisi dari draf di atas.
- [ ] Submit sebelum 14:00 PT / 05:00 WIB 5 Des — target 4 Des siang WIB.
