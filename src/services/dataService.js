import { useState, useEffect } from 'react';

export const newsData = [
  {
    id: 1,
    title: "Fasilitator Sekolah Model Dampingi SMAN 2 Kalianda, Perkuat Implementasi Pembelajaran Mendalam dan KKA",
    slug: "fasilitator-sekolah-model-dampingi-sman-2-kalianda",
    category: "Akademik",
    date: "03 September 2026",
    author: "Humas SMAN 2 Kalianda",
    readTime: "4 menit baca",
    thumbnail: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6a99f6b75f05dWhatsApp_Image_2026-09-03_at_10.56.06.jpeg",
    excerpt: "SMAN 2 Kalianda kembali memperkuat komitmennya sebagai Sekolah Model Implementasi Pembelajaran Mendalam (PM), Koding, dan Kecerdasan Artifisial (KKA) Provinsi Lampung.",
    content: `Kalianda, 3 September 2026 — SMAN 2 Kalianda kembali memperkuat komitmennya sebagai Sekolah Model Implementasi Pembelajaran Mendalam (PM), Koding, dan Kecerdasan Artifisial (KKA) di Provinsi Lampung. Kegiatan pendampingan intensif ini dihadiri oleh para fasilitator ahli tingkat provinsi bersama seluruh dewan guru.

Kepala SMAN 2 Kalianda, Bapak Herwansyah, S.Pd., M.Pd., menegaskan bahwa integrasi koding dan kecerdasan artifisial ke dalam kurikulum bukan sekadar adopsi teknologi, melainkan transformasi cara berpikir siswa agar lebih analitis, kritis, dan solutif terhadap tantangan era digital.

"Dengan pendampingan ini, para pendidik di SMAN 2 Kalianda siap menghadirkan model pembelajaran interaktif berbasis proyek yang relevan dengan kebutuhan masa depan anak didik kita," tutur beliau.`
  },
  {
    id: 2,
    title: "SMAN 2 Kalianda Gelar Apel Tematik Pencegahan Kekerasan terhadap Anak: Komitmen Anti-Bullying",
    slug: "apel-tematik-pencegahan-kekerasan-anak",
    category: "Kegiatan Siswa",
    date: "03 September 2026",
    author: "Tim Kesiswaan",
    readTime: "3 menit baca",
    thumbnail: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6a99660e4d97eWhatsApp_Image_2026-09-03_at_19.19.21_%282%29.jpeg",
    excerpt: "Meneguhkan komitmen bersama seluruh warga sekolah untuk menciptakan lingkungan pendidikan yang aman, nyaman, dan bebas dari segala bentuk perundungan.",
    content: `Kalianda — SMAN 2 Kalianda menyelenggarakan Apel Tematik Pencegahan Kekerasan terhadap Anak di lapangan upacara utama kampus. Apel ini diikuti oleh jajaran pimpinan, dewan guru, staf tata usaha, serta seluruh peserta didik kelas X, XI, dan XII.

Kegiatan ini merupakan langkah nyata dalam mewujudkan Sekolah Ramah Anak dan membumikan semangat Sakai Sambaiyan yang mengedepankan gotong royong, saling menyayangi, dan menjaga martabat sesama teman. Dalam deklarasi bersama, perwakilan siswa menandatangani komitmen anti-kekerasan dan anti-bullying di hadapan kepala sekolah.`
  },
  {
    id: 3,
    title: "Tiga Siswa SMAN 2 Kalianda Berhasil Lolos ke OSN Tingkat Provinsi 2026",
    slug: "tiga-siswa-lolos-osn-provinsi-2026",
    category: "Prestasi",
    date: "05 Juli 2026",
    author: "Tim Pembina Olimpiade",
    readTime: "4 menit baca",
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6a50c04308f28ChatGPT_Image_Jul_5%2C_2026%2C_12_35_56_PM.png",
    excerpt: "Prestasi membanggakan kembali ditorehkan oleh duta sains SMAN 2 Kalianda yang berhasil menyabet tiket ke Olimpiade Sains Nasional Tingkat Provinsi.",
    content: `Kalianda — Peserta didik SMAN 2 Kalianda kembali mengharumkan nama sekolah di tingkat Kabupaten Lampung Selatan. Tiga siswa berprestasi berhasil lolos seleksi ketat dan mewakili kabupaten ke ajang Olimpiade Sains Nasional Tingkat Provinsi (OSN-P) 2026 untuk bidang Matematika, Biologi, dan Informatika.

Pihak sekolah memberikan apresiasi tinggi dan fasilitas bimbingan intensif dari guru-guru pembina olimpiade serta dosen pembimbing mitra perguruan tinggi negeri di Lampung.`
  },
  {
    id: 4,
    title: "SMAN 2 Kalianda Raih Penghargaan Sekolah Adiwiyata Provinsi Lampung",
    slug: "penghargaan-sekolah-adiwiyata-provinsi-lampung",
    category: "Lingkungan Hidup",
    date: "14 Februari 2026",
    author: "Tim Adiwiyata SMANDAKA",
    readTime: "4 menit baca",
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/698fd6bb87716piagam_Adiwiyata__%281%29_page-0001.jpg",
    excerpt: "Pengakuan bergengsi atas komitmen pelestarian lingkungan hidup berkelanjutan dan penataan kawasan kampus seluas 2,6 hektar yang asri dan hijau.",
    content: `Kalianda — Kerja keras seluruh warga SMAN 2 Kalianda dalam merawat kelestarian lingkungan berbuah manis dengan diraihnya piagam penghargaan Sekolah Adiwiyata Tingkat Provinsi Lampung.

Sebagai sekolah yang memiliki area luas ±26.000 m², SMAN 2 Kalianda secara konsisten mengintegrasikan materi pendidikan lingkungan hidup dalam proses pembelajaran, pengelolaan bank sampah sekolah, budidaya tanaman obat keluarga (TOGA), biopori, dan gerakan pengurangan sampah plastik di kantin sekolah.`
  },
  {
    id: 5,
    title: "Siswa SMAN 2 Kalianda Borong Medali di Kejuaraan Taekwondo KONI Cup & Liga UTI Pro 2026",
    slug: "borong-medali-taekwondo-koni-cup-2026",
    category: "Prestasi",
    date: "21 Februari 2026",
    author: "Official Olahraga SMANDAKA",
    readTime: "3 menit baca",
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6999befedb8c0Templet_Konten_Instagram_%281%29.jpg",
    excerpt: "Atlet taekwondo SMAN 2 Kalianda sukses meraih Juara 1 dan 3 pada Kejuaraan KONI Cup serta ajang Liga Profesional Kyorugi & Poomsae.",
    content: `Kalianda — Prestasi olahraga kembali dipersembahkan oleh kontingen taekwondo SMAN 2 Kalianda. Dalam Kejuaraan KONI Cup Taekwondo Lampung Selatan, siswa SMAN 2 Kalianda berhasil membawa pulang Juara 1 Kyorugi dan Juara 3 Poomsae antar pelajar.

Sebelumnya, pada kejuaraan Universal Taekwondo Indonesia Profesional (UTI Pro), atlet SMANDAKA juga mendominasi podium juara. Prestasi ini membuktikan pembinaan ekstrakurikuler bela diri di SMAN 2 Kalianda berjalan sangat efektif dan didukung penuh oleh sekolah.`
  },
  {
    id: 6,
    title: "Sholat Dhuha Berjamaah dan Pembukaan Kegiatan Pesantren Kilat SMAN 2 Kalianda",
    slug: "sholat-dhuha-dan-sanlat-2026",
    category: "Keagamaan",
    date: "26 Februari 2026",
    author: "Rohis & Guru PAI",
    readTime: "3 menit baca",
    thumbnail: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/slide/qfzjs1772228295.jpeg",
    excerpt: "Pembiasaan ibadah rutin dan penguatan karakter religius peserta didik melalui pembukaan Pesantren Kilat menyambut bulan suci Ramadhan.",
    content: `Kalianda — Sebagai wujud visi sekolah dalam melahirkan generasi religius, SMAN 2 Kalianda melaksanakan pembiasaan Sholat Dhuha berjamaah dilanjutkan dengan pembukaan Pesantren Kilat bagi seluruh peserta didik.

Kegiatan ini diisi dengan tausiyah keagamaan, tadarus Al-Qur'an terpadu, kajian fiqih praktis, serta bakti sosial berbagi untuk masyarakat sekitar kawasan Kedaton Kalianda.`
  }
];

export const extracurricularData = [
  {
    id: "pixel",
    name: "PIXEL SMAN 2 KALIANDA",
    category: "Multimedia & Konten Kreator",
    lead: "Tim Pembina IT & Multimedia",
    schedule: "Sabtu, 09.00 - 12.00 WIB",
    location: "Lab Komputer & Studio Multimedia",
    membersCount: 42,
    achievements: ["Juara Lomba Video Inspiratif Guru Tingkat Provinsi", "Dokumentasi & Publikasi Media Resmi Sekolah"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/698ff896e9240WhatsApp_Image_2026-02-14_at_11.20.43.jpeg",
    desc: "Ekstrakurikuler kreatif yang bergerak di bidang kreasi konten digital, fotografi, videografi, editing, desain grafis, dan publikasi media sosial resmi SMAN 2 Kalianda."
  },
  {
    id: "paskibra",
    name: "PASKIBRA SMAN 2 KALIANDA",
    category: "Kepemimpinan & Bela Negara",
    lead: "Kurniawan Juli Trianto",
    schedule: "Selasa & Jumat, 15.30 - 17.30 WIB",
    location: "Lapangan Upacara Utama SMANDAKA",
    membersCount: 48,
    achievements: ["Pengirim Anggota Paskibraka Kabupaten Lampung Selatan", "Juara LKBB Antar SMA se-Kabupaten"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969ee131f438IMG-20231106-WA0018.jpg",
    desc: "Wadah pembinaan kedisiplinan tinggi, ketahanan fisik, pembentukan kepribadian tegap berkarakter, dan penguasaan teknik baris-berbaris formal kenegaraan."
  },
  {
    id: "pramuka",
    name: "PRAMUKA SMAN 2 KALIANDA",
    category: "Kepemimpinan & Sosial",
    lead: "Pembina Gugus Depan",
    schedule: "Jumat, 14.00 - 16.30 WIB",
    location: "Bumi Perkemahan & Lapangan Hijau",
    membersCount: 55,
    achievements: ["Gugus Depan Teraktif Kwarran Kalianda", "Peserta Raimuna Cabang Lampung Selatan"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e5466fd60IMG-20231106-WA0017_%281%29.jpg",
    desc: "Menumbuhkan jiwa kepanduan penegak, kecintaan alam bebas, navigasi lapangan, kepemimpinan sosial, dan penanaman nilai gotong royong Sakai Sambaiyan."
  },
  {
    id: "pmr",
    name: "PMR SMAN 2 KALIANDA",
    category: "Kesehatan & Kepedulian Sosial",
    lead: "Pembina UKS & PMR",
    schedule: "Rabu, 15.30 - 17.00 WIB",
    location: "Ruang UKS & Area Sekolah",
    membersCount: 38,
    achievements: ["Juara Pertolongan Pertama Tingkat Kabupaten", "Pelaksana Donor Darah Rutin Warga Sekolah"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/696a1a69e5bb2IMG-20231106-WA0016.jpg",
    desc: "Membekali peserta didik dengan keterampilan pertolongan pertama pada kecelakaan (P3K), kesiapsiagaan bencana, donor darah, dan pola hidup bersih sehat (PHBS)."
  },
  {
    id: "taekwondo",
    name: "TAEKWONDO SMANDAKA",
    category: "Olahraga Bela Diri",
    lead: "Pelatih Sabeum UTI Pro Lamsel",
    schedule: "Senin & Kamis, 16.00 - 17.45 WIB",
    location: "Aula Serbaguna SMAN 2 Kalianda",
    membersCount: 30,
    achievements: ["Juara 1 & 3 Kejuaraan Taekwondo KONI Cup 2026", "Juara 1 Kyorugi & Poomsae UTI Pro"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/699923c60c67fPengumuman_%281%29.jpg",
    desc: "Klub bela diri taekwondo berprestasi tinggi yang melatih teknik kyorugi (tarung) dan poomsae (jurus) dengan pembinaan fisik dan disiplin mental juara."
  },
  {
    id: "futsal",
    name: "FUTSAL & SEPAK BOLA",
    category: "Olahraga",
    lead: "Guru Penjasorkes SMANDAKA",
    schedule: "Selasa & Sabtu, 16.00 - 18.00 WIB",
    location: "Lapangan Olahraga Kampus SMAN 2 Kalianda",
    membersCount: 40,
    achievements: ["Juara IV Futsal Pelajar Titiwangi Cup V 2026", "Finalis Turnamen Antar Pelajar Kalianda"],
    thumbnail: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/699270a05d286WhatsApp_Image_2026-02-16_at_08.18.14.jpeg",
    desc: "Mengembangkan bakat olahraga bola siswa dengan latihan teknik taktik, pembentukan stamina prima, dan sportivitas tinggi dalam kompetisi pelajar."
  },
  {
    id: "rohis",
    name: "ROHIS & MUSHOLLE AL-IKHLAS",
    category: "Keagamaan & Karakter",
    lead: "Guru Pendidikan Agama Islam",
    schedule: "Kamis & Jumat, 12.30 - 14.00 WIB",
    location: "Musholla SMAN 2 Kalianda",
    membersCount: 65,
    achievements: ["Penyelenggara Sholat Dhuha Terpadu & Sanlat", "Juara MTQ dan Da'i Muda Pelajar"],
    thumbnail: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/slide/qfzjs1772228295.jpeg",
    desc: "Pembinaan kerohanian Islam, kajian fiqih remaja, tahsin & tahfidz Al-Qur'an, serta pembentukan karakter akhlak mulia bagi seluruh siswa muslim."
  },
  {
    id: "tari-lampung",
    name: "SANGGAR SENI TARI LAMPUNG",
    category: "Seni & Tradisi Budaya",
    lead: "Guru Seni Budaya SMANDAKA",
    schedule: "Rabu, 15.30 - 17.30 WIB",
    location: "Panggung Pentas & Ruang Kesenian",
    membersCount: 35,
    achievements: ["Juara FLS2N Tari Kreasi Tradisional Tingkat Kabupaten", "Penampil Tari Cangget & Sigeh Penguten Acara Daerah"],
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600",
    desc: "Melestarikan kekayaan seni tari tradisional Lampung (Sigeh Penguten, Tari Melinting, Bedana) serta mengasah musikalitas dan ekspresi estetik nusantara."
  }
];

export const galleryData = [
  {
    id: 1,
    title: "Keluarga Besar SMAN 2 Kalianda",
    category: "Profil",
    type: "image",
    date: "2026",
    url: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/696c53a6da4e5_Keluarga%20Besar%20SMAN%202%20Kalianda%20%281%29.jpg",
    description: "Foto bersama keluarga besar pimpinan, dewan guru, staf tata usaha, dan perwakilan siswa SMAN 2 Kalianda."
  },
  {
    id: 2,
    title: "Gerbang & Kawasan Hijau Kampus SMAN 2 Kalianda",
    category: "Fasilitas",
    type: "image",
    date: "2026",
    url: "https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e64196bc720250513_085627.jpg",
    description: "Kawasan lingkungan belajar SMAN 2 Kalianda seluas 26.000 m² di tepi Jalan Trans Sumatera, Kedaton, Kalianda."
  },
  {
    id: 3,
    title: "Sholat Dhuha Berjamaah & Pembukaan Sanlat",
    category: "Kegiatan",
    type: "image",
    date: "Februari 2026",
    url: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/slide/qfzjs1772228295.jpeg",
    description: "Ratusan peserta didik khusyuk mengikuti Sholat Dhuha berjamaah di lapangan sekolah sebagai pembiasaan religius."
  },
  {
    id: 4,
    title: "Apel Tematik Bersama & Sosialisasi Anti-Kekerasan",
    category: "Kegiatan",
    type: "image",
    date: "September 2026",
    url: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/696c44598cae9_DSC09066.jpg",
    description: "Suasana apel akbar warga sekolah dalam meneguhkan deklarasi anti-bullying dan komitmen Sekolah Ramah Anak."
  },
  {
    id: 5,
    title: "Prestasi Ekstrakurikuler Paskibra & Tata Upacara",
    category: "Prestasi",
    type: "image",
    date: "2026",
    url: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/6969b78651a0d__MG_4669.JPG",
    description: "Regu Paskibra SMAN 2 Kalianda bertugas dengan formasi sempurna dan kedisiplinan tinggi."
  },
  {
    id: 6,
    title: "Dewan Guru & Tenaga Kependidikan SMAN 2 Kalianda",
    category: "Profil",
    type: "image",
    date: "2026",
    url: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/slide/tyxxf1772228447.jpeg",
    description: "Para tenaga pendidik profesional SMAN 2 Kalianda yang berdedikasi membina generasi emas Lampung Selatan."
  }
];

export const teachersData = [
  {
    name: "Herwansyah, S.Pd., M.Pd.",
    role: "Kepala Sekolah",
    subject: "Manajemen & Kebijakan Pendidikan",
    degree: "S2 Magister Pendidikan",
    photo: "https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/kepsek/ptqop1763429734.jpeg"
  },
  {
    name: "Yeti Yulianti",
    role: "Wakil Kepala Sekolah Bidang Kurikulum",
    subject: "Kurikulum Merdeka & Pembelajaran Mendalam",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010641077100331.png"
  },
  {
    name: "Kurniawan Juli Trianto",
    role: "Wakil Kepala Sekolah Bidang Sarpras",
    subject: "Sarana Prasarana & Paskibra",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18710407077400081.png"
  },
  {
    name: "Laili Fathia",
    role: "Wakil Kepala Sekolah Bidang Kesiswaan",
    subject: "Pembinaan Karakter & OSIS",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010657028100051.png"
  },
  {
    name: "Ana Triana Maiyah",
    role: "Wakil Kepala Sekolah Bidang Humas",
    subject: "Hubungan Masyarakat & Kemitraan",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18710560127500051.png"
  },
  {
    name: "Nurrohmah Aini",
    role: "Koordinator Bimbingan Konseling (BK)",
    subject: "Bimbingan Konseling & Karir Siswa",
    degree: "S1 Bimbingan Konseling",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010658039400011.png"
  },
  {
    name: "Ade Ikhsania",
    role: "Wali Kelas & Guru Mata Pelajaran",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/15710846118400011.png"
  },
  {
    name: "Bilkis Nur Izzaty",
    role: "Wali Kelas & Guru Mata Pelajaran",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010651079800031.png"
  },
  {
    name: "Hamzah Nuzulul Fazri Sitompul",
    role: "Wali Kelas & Pembina Kegiatan",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/17710226039200091.png"
  },
  {
    name: "Nur Hilma Budiyani",
    role: "Wali Kelas & Guru Mata Pelajaran",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010664129000031.png"
  },
  {
    name: "Hayati",
    role: "Wali Kelas & Guru Senior",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010653077400051.png"
  },
  {
    name: "Rudi Mardiyanto",
    role: "Guru Mata Pelajaran",
    subject: "Tenaga Pendidik",
    degree: "Sarjana Pendidikan",
    photo: "https://storage.schoolmedia.id/00-universal/smanegeri2kalianda.sch.id/GU/18010630067100031.png"
  }
];

export const ppdbWaves = [
  {
    id: "wave-1",
    wave: "Jalur Prestasi Sekolah Unggul (SPMB Prov. Lampung)",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    period: "01 September - 30 September 2026",
    status: "Sedang Berlangsung",
    badge: "emerald",
    quota: "35% (105 Siswa)",
    desc: "Dikhususkan bagi siswa berprestasi akademik peringkat 1-3 rapor atau peraih kejuaraan sains (OSN), olahraga (O2SN), seni (FLS2N), taekwondo, dan keagamaan tingkat Kabupaten/Provinsi."
  },
  {
    id: "wave-2",
    wave: "Jalur Zonasi Domisili (Wilayah Kalianda & Sekitarnya)",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    period: "01 Oktober - 31 Oktober 2026",
    status: "Segera Dibuka",
    badge: "royal",
    quota: "45% (135 Siswa)",
    desc: "Berdasarkan jarak radius domisili resmi Kartu Keluarga (KK) ke lokasi kampus SMAN 2 Kalianda di Desa Kedaton, Kalianda, Lampung Selatan."
  },
  {
    id: "wave-3",
    wave: "Jalur Afirmasi Khusus & Tahap Awal",
    startDate: "2026-07-01",
    endDate: "2026-08-15",
    period: "01 Juli - 15 Agustus 2026",
    status: "Ditutup",
    badge: "rose",
    quota: "20% (60 Siswa)",
    desc: "Pendaftaran kuota afirmasi siswa pemegang KIP/PKH tahap pembukaan awal."
  }
];

export const facilitiesData = [
  {
    name: "Laboratorium Komputer, Koding & KKA",
    category: "Laboratorium",
    desc: "Fasilitas penunjang Sekolah Model Pembelajaran Mendalam dan Koding dengan puluhan unit PC terkoneksi internet cepat.",
    icon: "Cpu"
  },
  {
    name: "Laboratorium IPA (Fisika, Biologi, Kimia)",
    category: "Laboratorium",
    desc: "Peralatan praktikum sains komprehensif, mikroskop digital, dan sarana riset biologi lingkungan sekolah.",
    icon: "FlaskConical"
  },
  {
    name: "Perpustakaan Sekolah & Pojok Literasi",
    category: "Akademik",
    desc: "Ribuan koleksi buku teks pelajaran, referensi ilmiah, karya sastra, serta area baca representatif dan perpustakaan online.",
    icon: "BookOpen"
  },
  {
    name: "Lapangan Olahraga Multifungsi",
    category: "Olahraga",
    desc: "Area lapangan terbuka yang luas untuk futsal, basket, voli, bulutangkis, latihan taekwondo, dan apel akbar.",
    icon: "Trophy"
  },
  {
    name: "Kawasan Edukasi Adiwiyata (2,6 Hektar)",
    category: "Lingkungan Hidup",
    desc: "Kebun sekolah hijau, taman tanaman obat keluarga (TOGA), sistem biopori, dan lingkungan kampus asri nan rindang.",
    icon: "Building"
  },
  {
    name: "Studio Multimedia & Publikasi PIXEL",
    category: "Kreativitas",
    desc: "Ruang produksi konten kreatif digital, fotografi, podcast edukasi, dan dokumentasi warta sekolah.",
    icon: "Video"
  }
];

// ============================================================================
// LOCAL STORAGE & REACTIVE DEMO CMS LAYER
// ============================================================================

const STORAGE_KEYS = {
  NEWS: 'smandaka_news_data',
  EXTRACURRICULAR: 'smandaka_extracurricular_data',
  PPDB: 'smandaka_ppdb_registrations_data',
  PPDB_WAVES: 'smandaka_ppdb_waves_data',
  PPDB_INFO: 'smandaka_ppdb_info_data',
};

const initialPPDBRegistrations = [
  {
    id: "REG-2026-001",
    namaLengkap: "Rizky Pratama Wijaya",
    nisn: "0081234567",
    asalSekolah: "SMPN 1 Kalianda",
    jalurPendaftaran: "Jalur Prestasi",
    peminatan: "MIPA (Matematika & IPA)",
    namaOrtu: "Bambang Wijaya",
    nomorWhatsapp: "081277889900",
    emailOrtu: "bambang.w@gmail.com",
    nilaiRataRata: "92.5",
    status: "Terverifikasi",
    createdAt: "2026-09-08T10:30:00.000Z"
  },
  {
    id: "REG-2026-002",
    namaLengkap: "Aulia Nur Salsabila",
    nisn: "0082345678",
    asalSekolah: "SMPN 2 Kalianda",
    jalurPendaftaran: "Jalur Zonasi Domisili",
    peminatan: "IPS (Ilmu Pengetahuan Sosial)",
    namaOrtu: "Siti Rahmawati",
    nomorWhatsapp: "081399887766",
    emailOrtu: "siti.rahma@yahoo.com",
    nilaiRataRata: "88.0",
    status: "Menunggu Verifikasi",
    createdAt: "2026-09-09T14:15:00.000Z"
  },
  {
    id: "REG-2026-003",
    namaLengkap: "Dimas Aditya Saputra",
    nisn: "0083456789",
    asalSekolah: "SMP IT Al-Furqan Kalianda",
    jalurPendaftaran: "Jalur Prestasi",
    peminatan: "MIPA (Matematika & IPA)",
    namaOrtu: "Agus Saputra",
    nomorWhatsapp: "082155667788",
    emailOrtu: "agus.saputra@gmail.com",
    nilaiRataRata: "94.2",
    status: "Terverifikasi",
    createdAt: "2026-09-10T09:00:00.000Z"
  }
];

function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('smandaka_data_changed'));
  }
}

// --- Berita (News) CRUD ---
export function getStoredNews() {
  if (typeof window === 'undefined') return newsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) return newsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : newsData;
  } catch {
    return newsData;
  }
}

export function saveNews(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(items));
  notifyStorageChange();
}

export function createNews(newItem) {
  const current = getStoredNews();
  const nextId = current.length > 0 ? Math.max(...current.map((n) => Number(n.id) || 0)) + 1 : 1;
  const entry = {
    ...newItem,
    id: nextId,
    slug: newItem.slug || newItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    date: newItem.date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    author: newItem.author || 'Humas SMAN 2 Kalianda',
    readTime: newItem.readTime || '3 menit baca',
  };
  const updated = [entry, ...current];
  saveNews(updated);
  return entry;
}

export function updateNews(id, updatedFields) {
  const current = getStoredNews();
  const targetId = Number(id);
  const updated = current.map((item) => (Number(item.id) === targetId ? { ...item, ...updatedFields } : item));
  saveNews(updated);
}

export function deleteNews(id) {
  const current = getStoredNews();
  const targetId = Number(id);
  const updated = current.filter((item) => Number(item.id) !== targetId);
  saveNews(updated);
}

// --- Ekstrakurikuler CRUD ---
export function getStoredExtracurriculars() {
  if (typeof window === 'undefined') return extracurricularData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXTRACURRICULAR);
    if (!raw) return extracurricularData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : extracurricularData;
  } catch {
    return extracurricularData;
  }
}

export function saveExtracurriculars(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.EXTRACURRICULAR, JSON.stringify(items));
  notifyStorageChange();
}

export function createExtracurricular(newItem) {
  const current = getStoredExtracurriculars();
  const id = newItem.id || newItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const entry = {
    ...newItem,
    id,
    membersCount: Number(newItem.membersCount) || 30,
    achievements: newItem.achievements || [],
  };
  const updated = [...current, entry];
  saveExtracurriculars(updated);
  return entry;
}

export function updateExtracurricular(id, updatedFields) {
  const current = getStoredExtracurriculars();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveExtracurriculars(updated);
}

export function deleteExtracurricular(id) {
  const current = getStoredExtracurriculars();
  const updated = current.filter((item) => item.id !== id);
  saveExtracurriculars(updated);
}

// --- PPDB Registrations CRUD ---
export function getStoredPPDBRegistrations() {
  if (typeof window === 'undefined') return initialPPDBRegistrations;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB);
    if (!raw) return initialPPDBRegistrations;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialPPDBRegistrations;
  } catch {
    return initialPPDBRegistrations;
  }
}

export function savePPDBRegistrations(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(items));
  notifyStorageChange();
}

export function addPPDBRegistration(formData) {
  const current = getStoredPPDBRegistrations();
  const regNumber = String(current.length + 1).padStart(3, '0');
  const entry = {
    ...formData,
    id: `REG-2026-${regNumber}`,
    status: 'Menunggu Verifikasi',
    createdAt: new Date().toISOString(),
  };
  const updated = [entry, ...current];
  savePPDBRegistrations(updated);
  return entry;
}

export function updatePPDBStatus(id, newStatus) {
  const current = getStoredPPDBRegistrations();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  savePPDBRegistrations(updated);
}

export function deletePPDBRegistration(id) {
  const current = getStoredPPDBRegistrations();
  const updated = current.filter((item) => item.id !== id);
  savePPDBRegistrations(updated);
}

// --- PPDB Settings & Schedule CRUD ---
export const initialPPDBInfo = {
  tahunAjaran: "2026/2027",
  kuotaTotal: "300 Siswa (9 Rombel)",
  isOpen: true,
  announcement: "SPMB Jalur Prestasi Sekolah Unggul 2026 Dibuka. Segera daftarkan diri Anda sebelum kuota terpenuhi.",
  heroSubtitle: "Bergabunglah bersama Sekolah Unggul Provinsi Lampung. Pendaftaran dilaksanakan secara transparan, akuntabel, dan terdigitalisasi.",
  kontakHotline: "083187937270 (Panitia SPMB)",
  emailPPDB: "ppdb@smanegeri2kalianda.sch.id",
  catatanSyarat: "Wajib melampirkan KK minimal 1 tahun, Akta Kelahiran, KTP orang tua, dan Ijazah/SKL SMP asli yang dapat dibaca jelas."
};

const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function formatIndonesianDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${INDO_MONTHS[monthIdx]} ${year}`;
    }
  }
  return dateStr;
}

/**
 * Validasi apakah gelombang sedang aktif sesuai rentang tanggal (startDate & endDate).
 * Menghasilkan:
 * - isActive: boolean (bisa mendaftar atau tidak)
 * - reason: 'active' | 'not_started' | 'expired' | 'manual_closed'
 * - label: 'Sedang Dibuka' | 'Belum Dibuka' | 'Sudah Berakhir' | 'Ditutup'
 * - badge: 'emerald' | 'royal' | 'rose'
 */
export function checkWaveDateStatus(wave) {
  if (!wave) {
    return {
      isActive: false,
      reason: 'invalid',
      label: 'Tidak Diketahui',
      badge: 'slate',
      message: 'Informasi gelombang pendaftaran tidak ditemukan.'
    };
  }

  // Jika admin secara manual menutup status gelombang
  if (wave.status === 'Ditutup') {
    return {
      isActive: false,
      reason: 'manual_closed',
      label: 'Ditutup',
      badge: 'rose',
      message: 'Pendaftaran gelombang ini telah ditutup oleh panitia.'
    };
  }

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const start = wave.startDate;
  const end = wave.endDate;

  // Tanggal belum sampai (belum dibuka)
  if (start && todayStr < start) {
    return {
      isActive: false,
      reason: 'not_started',
      label: 'Belum Dibuka',
      badge: 'royal',
      message: `Pendaftaran belum dibuka. Periode baru akan dimulai pada ${formatIndonesianDate(start)}.`,
      startDateFormatted: formatIndonesianDate(start),
      endDateFormatted: formatIndonesianDate(end),
    };
  }

  // Tanggal sudah lewat (sudah berakhir)
  if (end && todayStr > end) {
    return {
      isActive: false,
      reason: 'expired',
      label: 'Sudah Berakhir',
      badge: 'rose',
      message: `Periode pendaftaran gelombang ini telah berakhir pada ${formatIndonesianDate(end)}.`,
      startDateFormatted: formatIndonesianDate(start),
      endDateFormatted: formatIndonesianDate(end),
    };
  }

  // Dalam periode pendaftaran (aktif)
  return {
    isActive: true,
    reason: 'active',
    label: 'Sedang Dibuka',
    badge: 'emerald',
    message: end ? `Pendaftaran aktif sampai ${formatIndonesianDate(end)}.` : 'Pendaftaran sedang dibuka.',
    startDateFormatted: formatIndonesianDate(start),
    endDateFormatted: formatIndonesianDate(end),
  };
}

export function getStoredPPDBWaves() {
  if (typeof window === 'undefined') return ppdbWaves;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB_WAVES);
    if (!raw) return ppdbWaves;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => {
        const fallback = ppdbWaves[idx] || {};
        return {
          ...item,
          startDate: item.startDate || fallback.startDate || '',
          endDate: item.endDate || fallback.endDate || '',
        };
      });
    }
    return ppdbWaves;
  } catch {
    return ppdbWaves;
  }
}

export function savePPDBWaves(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB_WAVES, JSON.stringify(items));
  notifyStorageChange();
}

export function createPPDBWave(newItem) {
  const current = getStoredPPDBWaves();
  const entry = {
    ...newItem,
    id: newItem.id || `WAVE-${Date.now()}`,
    status: newItem.status || 'Segera Dibuka',
    badge: newItem.badge || 'royal',
  };
  const updated = [...current, entry];
  savePPDBWaves(updated);
  return entry;
}

export function updatePPDBWave(idOrIndex, updatedFields) {
  const current = getStoredPPDBWaves();
  const updated = current.map((item, idx) => {
    if (item.id === idOrIndex || idx === Number(idOrIndex) || item.wave === idOrIndex) {
      return { ...item, ...updatedFields };
    }
    return item;
  });
  savePPDBWaves(updated);
}

export function deletePPDBWave(idOrIndex) {
  const current = getStoredPPDBWaves();
  const updated = current.filter((item, idx) => item.id !== idOrIndex && idx !== Number(idOrIndex) && item.wave !== idOrIndex);
  savePPDBWaves(updated);
}

export function getStoredPPDBInfo() {
  if (typeof window === 'undefined') return initialPPDBInfo;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB_INFO);
    if (!raw) return initialPPDBInfo;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? { ...initialPPDBInfo, ...parsed } : initialPPDBInfo;
  } catch {
    return initialPPDBInfo;
  }
}

export function savePPDBInfo(info) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB_INFO, JSON.stringify(info));
  notifyStorageChange();
}

// --- Global Reset to Default ---
export function resetAllToDefault() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.NEWS);
  localStorage.removeItem(STORAGE_KEYS.EXTRACURRICULAR);
  localStorage.removeItem(STORAGE_KEYS.PPDB);
  localStorage.removeItem(STORAGE_KEYS.PPDB_WAVES);
  localStorage.removeItem(STORAGE_KEYS.PPDB_INFO);
  notifyStorageChange();
}

// --- React Hook for Live Data Sync ---
export function useSchoolData() {
  const [news, setNews] = useState(() => getStoredNews());
  const [extracurriculars, setExtracurriculars] = useState(() => getStoredExtracurriculars());
  const [ppdbRegistrations, setPpdbRegistrations] = useState(() => getStoredPPDBRegistrations());
  const [ppdbWaves, setPpdbWaves] = useState(() => getStoredPPDBWaves());
  const [ppdbInfo, setPpdbInfo] = useState(() => getStoredPPDBInfo());

  useEffect(() => {
    const handleSync = () => {
      setNews(getStoredNews());
      setExtracurriculars(getStoredExtracurriculars());
      setPpdbRegistrations(getStoredPPDBRegistrations());
      setPpdbWaves(getStoredPPDBWaves());
      setPpdbInfo(getStoredPPDBInfo());
    };

    window.addEventListener('smandaka_data_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('smandaka_data_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  return {
    news,
    extracurriculars,
    ppdbRegistrations,
    ppdbWaves,
    ppdbInfo,
    refreshData: () => {
      setNews(getStoredNews());
      setExtracurriculars(getStoredExtracurriculars());
      setPpdbRegistrations(getStoredPPDBRegistrations());
      setPpdbWaves(getStoredPPDBWaves());
      setPpdbInfo(getStoredPPDBInfo());
    },
  };
}

