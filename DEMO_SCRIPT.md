# Naskah Video Demo GigCrypt — < 3 menit

Target durasi: **~2:30**. Rekam layar (HP/laptop) + suara secukupnya
(bisa tanpa suara — teks di layar + musik bebas sudah cukup, tapi suara
penjelasan singkat lebih baik). Upload ke **YouTube** (publik atau
unlisted), tempel link di Devpost. Rekam oleh Anugrah, 1 Des 2026.

## Persiapan sebelum rekam (5 menit)
1. Buka app di `https://asfel307.github.io/gigcrypt/` (atau preview lokal).
2. Bersihkan data lama: buka DevTools → Application → Local Storage →
   hapus key `gigcrypt.gigs.v1`, lalu reload — board kembali ke 3 sample
   gig (satu overdue, sengaja).
3. Siapkan satu gig untuk ditambah (contoh di adegan 1).
4. Matikan notifikasi HP/laptop supaya tidak muncul di rekaman.

## Urutan adegan (4 adegan, tanpa intro panjang)

### Adegan 1 — Tambah gig (0:00–0:40)
- Isi form "Summon a new gig": Title `Kiroween 2026 — Costume Contest`,
  Platform `Devpost`, Kind `Bounty`, Prize `5000`, Deadline `2026-12-04`.
- Klik **Summon 👻**. Kartu gig muncul di atas board; stats berubah
  (total gigs +1, pipeline +$5.000).
- Narasi: "GigCrypt — satu papan untuk semua bounty, gig, dan lamaran.
  Saya tambah satu gig, dan nilainya langsung masuk pipeline."

### Adegan 2 — Pindah ke Paid (0:40–1:20)
- Di kartu gig baru, ubah status dari Hunting → **Paid** lewat dropdown.
- Stats berubah: pipeline turun $5.000, "already paid" naik $5.000.
- Narasi: "Begitu hadiah cair, satu klik pindah ke Paid — total yang
  sudah dibayar langsung kehitung."

### Adegan 3 — Gig overdue bangkit (1:20–2:00)
- Scroll ke kartu sample "Admin staff application" (deadline lewat,
  status Submitted): kartu merah menyala, teks
  "☠️ overdue — it rose from the dead!".
- Tunjuk juga strip "Due in the next 3 days" di atas board (gig yang
  deadline-nya dekat muncul di sana).
- Narasi: "Deadline yang kelewat tidak diam-diam hilang — dia bangkit,
  merah menyala, supaya tidak kelewat lagi."

### Adegan 4 — Export JSON (2:00–2:30)
- Klik **Export JSON** — file `gigcrypt-export.json` terunduh.
- (Opsional, 10 detik) Klik **Import JSON**, pilih file yang sama —
  pesan "already in the crypt — skipped" muncul, data tidak ganda.
- Narasi penutup: "Semua data tersimpan di browser sendiri, bisa
  diekspor kapan saja. Tidak ada akun, tidak ada server."
- Layar akhir: logo + tagline "GigCrypt — Where dead gigs rise again."

## Checklist pasca-rekam
- [ ] Durasi < 3:00 (potong bila lebih).
- [ ] Suara jelas / teks terbaca; tidak ada data pribadi di layar.
- [ ] Upload YouTube (publik/unlisted), salin link ke Muse untuk
      ditempel di submission Devpost.
