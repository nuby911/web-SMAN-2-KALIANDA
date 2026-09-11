# **Product Requirement Document (PRD) & Project Structure**

## ---

**Website Official Sekolah (School Website Platform)**

## **1\. Overview & Objectives**

### **1.1 Executive Summary**

Proyek ini bertujuan untuk membangun portal web resmi sekolah yang modern, interaktif, responsif, dan terstruktur menggunakan **React**. Platform ini berfungsi sebagai media informasi publik, pusat berita kegiatan sekolah, serta portal informasi untuk siswa, guru, orang tua, dan calon pendaftar.

### **1.2 Key Objectives**

* **Branding & Informasi:** Menyediakan profil sekolah, visi-misi, fasilitas, dan keunggulan secara terstruktur.  
* **UI Interaktif & Dinamis:** Menyediakan User Interface (UI) yang interaktif pada setiap menu navigasi di halaman utama.  
* **Informasi Terpadu:** Menyajikan berita kegiatan sekolah, galeri visual, serta widget statistik jumlah guru dan siswa.  
* **Performa & SEO:** Menjamin kecepatan muat tinggi, ramah mesin pencari, dan sepenuhnya responsif di semua perangkat.

## **2\. Target Audience & Personas**

| User Persona | Deskripsi & Kebutuhan   |
| :---- | :---- |
| **Masyarakat / Orang Tua** | Mencari informasi profil sekolah, fasilitas, statistik guru & siswa, serta alur pendaftaran. |
| **Siswa Aktif** | Mengakses berita kegiatan sekolah, jadwal ekstrakurikuler, galeri, dan pengumuman terkini. |
| **Guru & Staff** | Mengakses direktori staff, data akademis, dan portal pengumuman internal/eksternal. |
| **Admin Sekolah** | Mengelola konten berita, statistik guru & siswa, galeri, dan pesan masuk kontak. |

## **3\. Panduan Pengembangan & Feature Requirements (Spesifikasi Utama)**

Berikut adalah spesifikasi dan panduan wajib yang diintegrasikan ke dalam proyek:

### **3.1 User Interface (UI) & Navigasi Halaman Utama**

* **UI Interaktif pada Halaman Utama:** Menu navigasi dan elemen di halaman utama harus responsif dan interaktif (efek hover, transisi smooth, active state indicator, serta drawer menu untuk perangkat mobile).  
* **Menu Utama Terpisah:** Setiap menu utama memiliki halaman (\*routed view\*) tersendiri menggunakan React Router v6. Menu utama meliputi:  
  * **Beranda (Home):** Pusat informasi utama dan ringkasan portal.  
  * **Profil Sekolah:** Halaman khusus profil terperinci.  
  * **Ekstrakurikuler:** Halaman daftar kegiatan dan jadwal ekstrakurikuler siswa.  
  * **Galeri:** Halaman dokumentasi foto dan video kegiatan.  
  * **Berita & Kegiatan:** Halaman daftar berita dan artikel kegiatan sekolah.  
  * **Kontak & PPDB:** Halaman layanan pesan dan pendaftaran siswa baru.

### **3.2 Komponen Konten Halaman Utama (Beranda)**

* **Berita Kegiatan Sekolah:** Kartu berita interaktif (\*news cards\*) yang menampilkan berita terkini lengkap dengan tanggal, kategori, dan tombol baca selengkapnya.  
* **Galeri Foto/Video:** Grid galeri interaktif dengan preview gambar kegiatan sekolah dan fitur lightbox/modal saat diklik.  
* **Statistik Data Sekolah:** Counter interaktif yang menampilkan jumlah siswa aktif, jumlah guru/tenaga pendidik, jumlah kelas, dan statistik pencapaian sekolah.

### **3.3 Menu Profil Sekolah**

* **Tabel Informasi Profil Sekolah:** Di halaman Profil Sekolah wajib menyajikan **Tabel Informasi Profil Sekolah** yang rapi dan terstruktur, berisi data fundamental seperti:  
  * Nama Sekolah & NPSN  
  * Akreditasi & No. SK  
  * Alamat Lengkap & Kontak  
  * Kepala Sekolah & Tahun Berdiri  
  * Jumlah Rombongan Belajar (Rombel)  
* **Visi, Misi, & Sejarah:** Bagian penjelas sejarah singkat dan poin Visi-Misi sekolah.

## **4\. Tech Stack & Tools**

* **Core Framework:** React 18+ (Vite sebagai build tool)  
* **Language:** JavaScript (ES6+)  
* **Styling:** Tailwind CSS  
* **Routing:** React Router v6  
* **Icons:** Lucide React / React Icons  
* **State Management:** React Context API  
* **Form & Validation:** React Hook Form & Zod  
* **HTTP Client:** Fetch API

## **5\. Non-Functional Requirements**

* **Performance:** Skor Lighthouse min. 90 untuk Performance dan Accessibility.  
* **Responsiveness:** Tampilan optimal pada ukuran layar Mobile (360px+), Tablet, dan Desktop.  
* **Security:** Proteksi input form terhadap XSS dan sanitasi data.  
* **Maintainability:** Arsitektur folder modular dan komponen reusable.

## **6\. Directory Structure (Updated V2)**

Struktur folder disesuaikan untuk mendukung seluruh rute menu utama, komponen tabel profil, dan widget interaktif:

`school-website/`  
`├── public/`  
`│   ├── favicon.ico`  
`│   ├── assets/`  
`│   └── robots.txt`  
`├── src/`  
`│   ├── assets/                # Gambar statis, logo, ikon, dan file media`  
`│   │   ├── images/`  
`│   │   └── icons/`  
`│   ├── components/            # Komponen umum / reusable (Global UI)`  
`│   │   ├── ui/                # UI dasar (Button, Card, Modal, Input, Badge, Table)`  
`│   │   ├── common/            # Komponen tata letak (Navbar, Footer, Sidebar, Hero)`  
`│   │   ├── home/              # Komponen khusus Beranda (NewsSection, GalleryPreview, StatsWidget)`  
`│   │   └── feedback/          # Loading spinner, Toast, Alert`  
`│   ├── config/                # Konfigurasi aplikasi (API endpoint, site metadata)`  
`│   ├── context/               # React Context (misal: ThemeContext, AuthContext)`  
`│   ├── hooks/                 # Custom React Hooks (useFetch, useDebounce, useTheme)`  
`│   ├── layouts/               # Layout wrapper (MainLayout, AuthLayout)`  
`│   ├── pages/                 # Halaman utama (Routed Views)`  
`│   │   ├── Home/              # Halaman Beranda`  
`│   │   ├── Profile/           # Halaman Profil Sekolah (termasuk Tabel Informasi Profil)`  
`│   │   ├── Extracurricular/   # Halaman Ekstrakurikuler`  
`│   │   ├── News/              # Halaman Berita & Kegiatan`  
`│   │   ├── Gallery/           # Halaman Galeri Foto/Video`  
`│   │   ├── PPDB/              # Halaman Informasi PPDB`  
`│   │   ├── Contact/           # Halaman Kontak`  
`│   │   └── NotFound.jsx`  
`│   ├── routes/                # Pengaturan routing (AppRoutes.jsx)`  
`│   ├── services/              # API Client & panggilan endpoint (fetch wrapper)`  
`│   │   ├── api.js`  
`│   │   └── newsService.js`  
`│   ├── styles/                # Global CSS / Tailwind setup`  
`│   │   └── index.css`  
`│   ├── utils/                 # Helper functions (date formatter, validator)`  
`│   ├── App.jsx`  
`│   └── main.jsx`  
`├── .env.example`  
`├── .gitignore`  
`├── index.html`  
`├── package.json`  
`├── README.md`  
`└── vite.config.js`  
