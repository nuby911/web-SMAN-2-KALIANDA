/**
 * Data Awal Gelombang, Pendaftaran, dan Pengaturan PPDB / SPMB SMAN 2 Kalianda
 */

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

export const initialPPDBRegistrations = [
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
