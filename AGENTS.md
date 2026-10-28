# Panduan Project — partisiruangrapat.web.id

Website spesialis niche **Partisi Ruang Rapat** (Peredam Suara, Partisi Geser Movable Wall, dan Pintu Lipat Akustik) di bawah naungan **CV Pireki Asia (PIREKI)**.

## Komunikasi & Bahasa
- **WAJIB**: Selalu berkomunikasi dan menulis respons dalam **Bahasa Indonesia**. Ringkas, padat, profesional.

## Standar Penulisan & Konten
- **Sumber Pengetahuan Tunggal**: `SUMBER-PENGETAHUAN.md` di root project. Semua spesifikasi teknis (Rockwool 80 kg/m³, 60 dB, mekanisme jack, garansi, portofolio) merujuk ke file ini.
- **Peta Jalan Konten**: `rencana-konten.md` di root project sebagai daftar antrean judul artikel Teknis dan Blog.
- **Skill Wajib Penulisan Artikel**: Gunakan skill **`penulis-ahli`** untuk membuat atau mengedit konten blog/edukasi/produk (Humanizer + SEO/GEO 2026 + Non-Commodity Content).
- **Riset & Arsitektur Keyword**: Gunakan skill **`pakar-entity-seo`** sebelum artikel diproduksi.

## Alur Kerja Otomatis: "Buat Konten Apa Kita Hari Ini"
Jika pengguna mengirim instruksi seperti **"buat konten apa kita hari ini"** (atau pertanyaan serupa tentang konten yang harus dibuat hari ini), AI Agent WAJIB mengikuti alur kerja berikut:

1. **Pemeriksaan Status Konten**:
   - Buka dan baca file `rencana-konten.md`.
   - Periksa file yang sudah ada di `src/content/artikel/` untuk melihat judul mana saja yang sudah terbit dan mana yang belum dibuat.
   - Prioritaskan judul dari daftar **Prioritas Batch 1** (baik rubrik Teknis maupun Blog).

2. **Rekomendasi Judul**:
   - Tampilkan 2–3 opsi judul yang belum dibuat secara ringkas dan terstruktur kepada pengguna, beserta alasan singkat mengapa judul tersebut penting diproduksi.
   - Minta pengguna memilih atau menyetujui salah satu judul.

3. **Eksekusi Bertahap Pasca-Persetujuan Pengguna**:
   - **Tahap 1 (Riset Semantik):** Jalankan skill **`pakar-entity-seo`** untuk meriset keyword semantik, pemetaan entitas Schema.org, knowledge graph, dan outline E-E-A-T mendalam berdasarkan H1 judul yang dipilih.
   - **Tahap 2 (Eksekusi Penulisan):** Lanjutkan penulisan ke skill **`penulis-ahli`** untuk menuliskan artikel final ke dalam `src/content/artikel/[slug].md` (kaidah humanizer, tanpa em-dash, SEO/GEO 2026, non-komoditas). **WAJIB:** Penulis wajib memeriksa `SUMBER-PENGETAHUAN.md` Bab 8 dan menyisipkan frasa kata kunci target (Homepage `/`, tipe produk, sektor penerapan, pilar teknis, dan kota yang relevan) secara natural dalam paragraf tanpa link manual, agar auto-linker memprosesnya otomatis saat build.
   - **Tahap 3 (Update Status):** Perbarui status artikel tersebut di `rencana-konten.md` menjadi sudah terbit.

## Tech Stack & Performa
- **Framework**: Astro 7 (Static Site Generation / SSG).
- **Hosting**: Shared Hosting Domainesia (cPanel / Apache). Output folder `dist/` siap deploy.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`.
- **Navigasi & Transisi**: `ClientRouter` (Astro View Transitions) + Prefetch `prefetchAll: true`.
- **URL Standar**: `trailingSlash: 'always'`.
- **Desain**: Industrial deluxe, mobile-first responsive, micro-animations, fast LCP, zero layout shifts.

## Perintah Pengembangan
- `npm run dev` atau `astro dev --background`
- `npm run build` (menghasilkan folder `dist/`)
- `npm run preview`
