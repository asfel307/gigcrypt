# GigCrypt — Rencana Build Harian (25 Nov – 4 Des 2026)

Deadline submit: **Jumat, 4 Des 2026 14:00 PT = Sabtu, 5 Des 05:00 WIB**.
Pemenang diumumkan ~3 Feb 2027. Fondasi selesai 18 Nov 2026
(Kiro CLI 3.4.0 terinstal, scaffold v0.1 jalan).

## Yang sudah selesai (18 Nov, malam ini)
- [x] Kiro CLI terinstal & terverifikasi (`kiro-cli 3.4.0`)
- [x] Rules + kategori Kiroween dibaca (Devpost)
- [x] Ide terpilih: GigCrypt, kategori Costume Contest
- [x] Scaffold repo + `.kiro/` + app v0.1 (lihat README)

## Kalender build

| Tanggal | Fokus | Target selesai |
|---|---|---|
| 25 Nov (Rab) | Setup repo publik + Kiro login | Repo GitHub publik `asfel307/gigcrypt` (atau nama final), folder `/.kiro` di root; `kiro-cli login` oleh Anugrah; `npm install` + `npm run build` hijau |
| 26 Nov (Kam) | Core board tuntas | JSON import + "Bury the samples"; sort by deadline; search box |
| 27 Nov (Jum) | Verifikasi browser | Uji di browser asli: tambah/pindah/bury/reload; perbaiki bug |
| 28 Nov (Sab) | Polish hantu #1 | Strip "due in next 3 days"; empty state tiap filter |
| 29 Nov (Min) | Polish hantu #2 | Mobile pass (lebar 360px); favicon + social preview |
| 30 Nov (Sen) | Deploy | GitHub Pages live dari repo publik; cek link publik |
| 1 Des (Sel) | Demo video | Rekam video < 3 menit (tambah gig → pindah ke Paid → gig overdue bangkit → export JSON) |
| 2 Des (Rab) | Submission Devpost | Draf cerita + cara pakai Kiro + screenshot |
| 3 Des (Kam) | Bonus + buffer | Blog post publik (Bonus Blog Prize, 2.000 kredit Kiro); uji akhir build + link |
| 4 Des (Jum) | Submit | Submit di Devpost **sebelum 14:00 PT / 05:00 WIB 5 Des**; konfirmasi receipt |

Buffer: 3 Des kosong sebagian — dipakai untuk bug yang muncul
belakangan. Jangan submit di menit terakhir; target submit 4 Des
siang WIB.

## Yang butuh Anugrah (hanya dia yang bisa)

1. **Akun Devpost** — daftar / login di kiroween.devpost.com
   (gratis), lalu daftarkan diri ke hackathon. Perlu Kiro user ID
   atau AWS account ID saat registrasi.
2. **Login Kiro** — jalankan `kiro-cli login` dan selesaikan
   sign-in di browser (GitHub / Google / AWS Builder ID — gratis,
   tanpa kartu kredit; free tier 50 kredit/bulan). Tanpa ini Kiro
   CLI tidak bisa dipakai sebagai agent (hanya binary-nya yang
   terinstal).
3. **Repo GitHub publik** — buat repo publik (mis. `gigcrypt`) di
   akun `asfel307`, push folder ini; aktifkan GitHub Pages.
   (Alternatif: Anugrah memberi izin dan saya yang push — tetap
   butuh dia untuk repo + Pages bila belum ada akses tulis.)
4. **Video demo** — rekam layar < 3 menit (bisa dari HP/laptop),
   upload ke **YouTube** (publik/unlisted), tempel link di Devpost.
   Saya siapkan naskah + urutan adegannya tanggal 1 Des.
5. **Keputusan akhir** — cek hasil tiap fase (khususnya tampilan
   akhir 29–30 Nov) dan konfirmasi submit 4 Des.

## Yang TIDAK butuh Anugrah / tidak ada biaya

- Instalasi Kiro CLI: selesai, gratis.
- Build app, deploy GitHub Pages, tulisan submission: dikerjakan agent.
- Tidak ada entry fee, tidak ada layanan berbayar yang dipakai.

## Risiko & mitigasi

- **Kiro free tier habis (50 kredit/bulan)** → bangun mayoritas
  dengan agent ini; Kiro dipakai untuk tugas terarah + bukti
  pemakaian (steering/specs sudah ada). Bila perlu, upgrade
  diputuskan Anugrah — jangan bayar tanpa izin.
- **GitHub Pages lambat / gagal** → fallback: preview lokal +
  tetap submit repo + video; link live bukan syarat mutlak
  selama app bisa dijalankan dari repo.
- **Video > 3 menit** → potong ke 4 adegan inti saja (lihat tugas
  1 Des); tanpa intro panjang.
- **Indonesia eligible** — terkonfirmasi: daftar negara yang
  dikecualikan di rules tidak mencakup Indonesia.
