
# 🍔 BiMyEat

Aplikasi frontend BiMyEat adalah prototype antar muka pemesanan makanan dan kantin digital yang dibangun menggunakan React + Vite dan diadaptasi dari desain Figma.

---

## ✨ Fitur

- **Tampilan kantin** — halaman daftar kantin dan kategori menu.
- **Menu makanan** — detail produk, harga, dan opsi pesanan.
- **Navigasi interaktif** — antarmuka modern dengan halaman dinamis.
- **UI komponen reusable** — menggunakan Radix UI dan Tailwind untuk konsistensi.
- **Responsive layout** — mendukung tampilan desktop dan mobile.

---

## 🛠️ Teknologi

- React
- Vite
- Tailwind CSS
- Radix UI
- Material UI Icons
- React Router
- Emotion
- Recharts

---

## 📁 Struktur Project

```
BiMyEat/
├── apps/
│   └── web/
│       ├── public/          # aset publik
│       ├── src/             # kode sumber React
│       ├── package.json     # dependensi aplikasi web
│       └── vite.config.ts   # konfigurasi Vite
├── package.json             # workspace level (dependency root)
├── pnpm-workspace.yaml      # konfigurasi monorepo pnpm
└── README.md                # dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

### 1. Masuk ke folder proyek

```bash
cd BiMyEat
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Jalankan aplikasi web

```bash
cd apps/web
pnpm dev
```

### 4. Buka browser

Aplikasi akan tersedia di URL yang ditampilkan oleh Vite, biasanya:

```bash
http://localhost:5173
```

> Jika belum memasang `pnpm`, pasang dulu dengan `npm install -g pnpm`.

---

## 📖 Cara Pakai

1. Buka halaman web BiMyEat di browser.
2. Jelajahi daftar kantin dan menu.
3. Pilih item makanan untuk melihat detail.
4. Gunakan navigasi untuk beralih antar halaman.

---

## 📝 Catatan

- `apps/web` adalah aplikasi frontend utama.
- Folder `.cph/` di repository bersifat metadata lokal dan tidak diperlukan untuk build aplikasi web.
- Proyek ini cocok untuk eksplorasi UI, presentasi prototype, atau dasar untuk fitur pemesanan makanan.

---

## 👩‍💻 Developer

Dibuat oleh Felicia — Data Science Student @ Binus University
