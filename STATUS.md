# GigCrypt — Status Build (koordinator)

Terakhir diperbarui: 2026-11-19 ~01:47 WIB.
Deadline submit: **4 Des 2026 14:00 PT = 5 Des 05:00 WIB** (target submit
4 Des siang WIB). Pendaftaran SELESAI (Anugrah, 19 Nov ~01:21 WIB).
Kiro user ID: tersimpan di MEMORY.md (jangan tulis di repo publik).

## Ringkasan
App **v1.0 feature-complete** — pekerjaan kalender 25–30 Nov ditarik maju
dan selesai 19 Nov. `npm run build` hijau, 30 uji logika lolos.
Tersisa: verifikasi klik di browser asli, repo GitHub + Pages, video
demo, submission Devpost.

## Selesai
- **Fase 0 — Fondasi (18 Nov):** Kiro CLI 3.4.0, rules dibaca, ide +
  kategori (Costume Contest), scaffold v0.1 + `.kiro/` steering/specs.
- **Fase 1 — Core board (19 Nov):** JSON import (validasi + dedupe by ID,
  file rusak tidak menghapus data) + "Bury the samples" + sort deadline
  (soonest/latest/prize/newest) + search box (judul/platform/kind/notes).
  Uji: 30/30 lolos (`/tmp/gt/test.js` — sort, search, due-soon,
  overdue, sample, import, save/load).
- **Fase 2 — Polish (19 Nov):**
  - Strip pengingat "due in the next 3 days" — **dikerjakan kiro-cli**
    (sesi non-interaktif, `--effort low`, 19 Nov ~01:40 WIB; log di
    `.kiro/KIRO_USAGE.md`). Build sempat gagal 1x (apostrof di string),
    Kiro memperbaiki sendiri, build akhir hijau.
  - Empty state ber-copy hantu untuk tiap filter + hasil search kosong.
  - Mobile pass: tap target ≥ 44px, form 1 kolom ≤ 480px, stats 2 kolom,
    aksi gig full-width.
  - Favicon `ghost.svg` + social preview `og-preview.png` 1200×630
    (digambar PIL, sudah dicek visual) + meta OG/Twitter di `index.html`.
- **Siap deploy:** `LICENSE` (MIT) + `.github/workflows/deploy.yml`
  (build + publish ke Pages otomatis tiap push ke `main`).
- **Perbaikan form "Summon" meluber (19 Nov ~01:47 WIB):** di desktop 1920px, kolom tanggal + tombol Summon menggantung ~280px di luar tepi kanan kartu (grid `2fr 1.4fr 1fr 1fr 1.2fr auto` + lebar minimum input tanggal memaksa grid lebih lebar dari panel 960px). Perbaikan di `src/styles.css` saja: track jadi `minmax(0, …)` + `.form > * { min-width: 0; }` (kolom tanggal 1.4fr ≈ 157px di 890px lebar panel — cukup untuk segmen tanggal), dan breakpoint layout 2-kolom naik dari 760px ke **1024px** supaya tablet tidak lagi memakai satu baris yang sempit. Breakpoint mobile 480px (1 kolom) tidak berubah. `npm run build` hijau. Perlu verifikasi ulang di browser asli oleh Muse (tidak ada headless browser di VM ini).
  - Catatan: uji logika `/tmp/gt/test.js` flaky pada 1 butir ("newest" — 3 gig dibuat dalam milidetik yang sama, `createdAt` seri; file tes sendiri mengakui "createdAt ms ties possible"). Tiga kali jalan: 30/30, 29/30, 30/30. Bukan akibat perbaikan CSS ini (tes tidak mengimpor CSS).

## Butuh Muse (browser — koordinator tidak bisa)
1. **Repo GitHub publik `asfel307/gigcrypt`** — buat repo (GitHub App
   tidak bisa buat repo), push seluruh isi `~/workspace/kiroween/`
   termasuk `/.kiro`, `LICENSE`, `.github/workflows/`. Pastikan `/.kiro`
   TIDAK di-gitignore (cek: `.gitignore` saat ini hanya
   `node_modules/`, `dist/`, `.DS_Store` — aman).
2. **Aktifkan GitHub Pages** — source "GitHub Actions" (workflow sudah
   siap); verifikasi URL live `https://asfel307.github.io/gigcrypt/`.
   Jika nama repo akhirnya BUKAN `gigcrypt`, kabari koordinator:
   URL `og:image`/`twitter:image` di `index.html` harus diubah.
3. **Verifikasi klik di browser asli** (tidak ada headless browser di VM
   ini): tambah gig → pindah status → bury → reload (data bertahan) →
   import JSON hasil export → cek strip due-soon + tampilan 360px.
   Atau serahkan ke cek tampilan akhir Anugrah 29–30 Nov.

## Butuh Anugrah (hanya dia yang bisa)
1. **Video demo < 3 menit (1 Des)** — rekam layar + upload YouTube
   (publik/unlisted); naskah + urutan adegan di `DEMO_SCRIPT.md`.
2. **Cek tampilan akhir (29–30 Nov)** — buka link Pages di HP, nilai
   tampilan + copy; beri tahu bila ada yang harus diubah.
3. **Konfirmasi submit (4 Des siang WIB)** — Muse submit di Devpost;
   Anugrah konfirmasi receipt.
4. **Form kredit Kiro 4.000 (deadline 1 Des 12:00 PT)** — tugas Muse/
   Anugrah, BUKAN koordinator build. Kiro user ID sudah tercatat di atas.

## Catatan / risiko
- **Kredit Kiro:** free tier 50/bulan, 0 terpakai sebelum 19 Nov. Satu
  sesi agent kiro-cli dipakai 19 Nov (~01:40 WIB); jumlah kredit yang
  terpakai TIDAK dilaporkan CLI — cek di dashboard Kiro bila perlu.
  Jangan upgrade/bayar tanpa izin Anugrah.
- **OG image URL absolut** mengasumsikan repo `asfel307/gigcrypt` —
  sesuaikan bila nama repo berbeda (lihat poin 2 di atas).
- **Data demo:** app memuat 3 sample gig saat pertama dibuka (satu
  overdue) — sengaja, supaya board langsung hidup; tombol
  "Bury the samples" menghapus ketiganya sekaligus.
- **Blog Bonus Prize (2.000 kredit Kiro):** belum dikerjakan — opsi
  3 Des bila waktu luang; bukan syarat submit.
