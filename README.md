# Website Official SMAN 2 Kalianda (SMANDAKA)

Platform portal web resmi SMA Negeri 2 Kalianda yang modern, interaktif, responsif, dan terstruktur berbasis **React**, **Vite**, dan **Tailwind CSS**.

---

## 📁 Struktur Direktori Standar Perusahaan

```text
Web-sekolah/
├── docs/                        # Dokumentasi teknis & spesifikasi proyek
│   └── PRD.md                   # Product Requirement Document
├── public/                      # Asset statis publik
├── src/
│   ├── components/              # Komponen modular & reusable
│   │   ├── common/              # Komponen layout global (Navbar, Footer, Header, dll)
│   │   ├── feedback/            # Komponen notifikasi & error handling (Toast, ErrorBoundary)
│   │   ├── home/                # Komponen spesifik halaman beranda
│   │   ├── ui/                  # Atomic Design UI primitives (Button, Card, Modal, dll)
│   │   └── index.js             # Re-export agregator komponen
│   ├── config/                  # Konfigurasi aplikasi & metadata sekolah
│   │   ├── siteConfig.js
│   │   └── index.js
│   ├── hooks/                   # Custom React Hooks reusable
│   │   ├── useScrollReveal.js
│   │   └── index.js
│   ├── layouts/                 # Shell & template tata letak aplikasi
│   │   ├── MainLayout.jsx
│   │   └── index.js
│   ├── pages/                   # Komponen rute halaman (Routed Views)
│   │   ├── Contact/             # Halaman Kontak & Lokasi
│   │   ├── Extracurricular/     # Halaman Ekstrakurikuler
│   │   ├── Gallery/             # Halaman Galeri Foto & Video
│   │   ├── Home/                # Halaman Beranda Utama
│   │   ├── News/                # Halaman Berita & Artikel
│   │   ├── NotFound/            # Halaman 404 Fallback
│   │   ├── PPDB/                # Halaman Informasi & Simulasi PPDB
│   │   ├── Profile/             # Halaman Profil, Guru & Fasilitas
│   │   └── index.js             # Centralized page export
│   ├── routes/                  # Konfigurasi navigasi & routing
│   │   └── AppRoutes.jsx
│   ├── services/                # API client, data dummy & business logic
│   │   ├── dataService.js
│   │   └── index.js
│   ├── styles/                  # Styling global & utility classes
│   │   └── index.css
│   ├── utils/                   # Helper functions, formatter, & utility
│   │   ├── formatters.js
│   │   └── index.js
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── package.json                 # Manifest dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind design tokens & themes
└── vite.config.js               # Vite build tool configuration
```

---

## 🚀 Skrip Pengembangan

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan local development server dengan hot reload |
| `npm run build` | Melakukan compile & bundle produksi ke folder `dist` |
| `npm run preview` | Meninjau hasil build produksi secara lokal |

---

## 🛠️ Arsitektur & Best Practices

- **Atomic & Domain-Driven Components**: Komponen dibagi rapi antara UI primitif (`ui/`), komponen global (`common/`), dan fitur spesifik (`home/`).
- **Barrel Exports Pattern**: Setiap modul memiliki `index.js` untuk memudahkan clean imports (`import { Button } from '@/components/ui'`).
- **Path Aliasing**: Menggunakan `@/*` yang merujuk langsung ke `src/` untuk path yang konsisten dan bebas dari `../../..`.
- **Konsistensi Penamaan**:
  - Komponen React & Halaman: **PascalCase** (`HeroSection.jsx`, `NotFound/index.jsx`).
  - Hooks: **camelCase** berawalan `use` (`useScrollReveal.js`).
  - Utils & Services: **camelCase** (`formatters.js`, `dataService.js`).
  - Direktori modul: **kebab-case** atau **lowercase** konsisten.
