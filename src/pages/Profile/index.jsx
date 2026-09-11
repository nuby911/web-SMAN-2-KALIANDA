import React from 'react';
import { siteConfig } from '@/config';
import { teachersData, facilitiesData } from '@/services';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Card, Badge, PageHero } from '@/components';
import { FileCheck, Target, Award, CheckCircle2, Clock, MapPin, Phone, Mail, Building, Cpu, BookOpen, FlaskConical, Trophy, Video } from 'lucide-react';

export default function ProfilePage() {
  const iconMap = {
    Cpu,
    BookOpen,
    FlaskConical,
    Trophy,
    Building,
    Video,
  };

  const yearsOperating = new Date().getFullYear() - parseInt(siteConfig.tahunBerdiri);

  const schoolTableData = [
    { label: "Nama Resmi Sekolah", value: siteConfig.fullName },
    { label: "Nama Singkat / Populer", value: `${siteConfig.name} (SMANDAKA)` },
    { label: "Nomor Pokok Sekolah Nasional (NPSN)", value: siteConfig.npsn },
    { label: "Bentuk Pendidikan", value: "Sekolah Menengah Atas Negeri (SMAN)" },
    { label: "Status Kelembagaan", value: siteConfig.statusSekolah },
    { label: "Peringkat Akreditasi", value: `${siteConfig.akreditasi.status} (Nilai: ${siteConfig.akreditasi.nilai}/100)` },
    { label: "Nomor SK Akreditasi BAN-S/M", value: siteConfig.akreditasi.noSk },
    { label: "Kepala Sekolah", value: siteConfig.kepalaSekolah.nama },
    { label: "NIP Kepala Sekolah", value: siteConfig.kepalaSekolah.nip },
    { label: "Tahun Berdiri / Operasional", value: `15 Juli ${siteConfig.tahunBerdiri} (${yearsOperating} Tahun Mengabdi)` },
    { label: "Nomor SK Pendirian", value: siteConfig.skPendirian },
    { label: "Jumlah Rombongan Belajar (Rombel)", value: siteConfig.rombel },
    { label: "Kurikulum yang Digunakan", value: "Kurikulum Merdeka & Sekolah Model Pembelajaran Mendalam (PM) / Koding (KKA)" },
    { label: "Luas Lahan & Kawasan Sekolah", value: `${siteConfig.luasTanah} (Sekolah Hijau Asri)` },
    { label: "Alamat Lengkap", value: siteConfig.kontak.alamat },
    { label: "Kontak Telepon & WhatsApp", value: `${siteConfig.kontak.telepon} / ${siteConfig.kontak.teleponKantor}` },
    { label: "Email Resmi", value: `${siteConfig.kontak.email} / ${siteConfig.kontak.emailAlternatif}` },
  ];

  return (
    <div>
      {/* 1. Dedicated SMAN 2 Kalianda Hero Section */}
      <PageHero
        badge="Profil & Kelembagaan Resmi"
        title={`Profil & Sejarah ${siteConfig.name}`}
        subtitle="Membina generasi religius, cerdas, berkarakter luhur, dan berbudaya lingkungan dengan semangat gotong royong Sakai Sambaiyan sejak 15 Juli 1991 di Kalianda, Lampung Selatan."
        bgImage="https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/696c53a6da4e5_Keluarga%20Besar%20SMAN%202%20Kalianda%20%281%29.jpg"
        chips={[
          `NPSN: ${siteConfig.npsn}`,
          "Akreditasi A Unggul (Nilai: 96)",
          "Sekolah Model PM & Koding",
          "Sekolah Adiwiyata Lampung",
          "Kawasan Sekolah 2,6 Hektar"
        ]}
      />

      <div className="py-12 lg:py-16 bg-slate-50 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. TABEL INFORMASI PROFIL SEKOLAH */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight flex items-center gap-2.5">
                <FileCheck className="w-6 h-6 text-royal-600" />
                <span>Tabel Data Pokok & Legalitas Sekolah</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Data pokok identitas resmi dan legalitas kelembagaan berdasarkan basis data Kemendikbudristek & Disdikbud Provinsi Lampung.
              </p>
            </div>
            <Badge variant="emerald" size="lg">
              Data Resmi Terverifikasi
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow hover={false}>
                <TableHead className="w-1/3 text-navy-900">Komponen / Indikator</TableHead>
                <TableHead className="text-navy-900">Keterangan Resmi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schoolTableData.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <TableCell className="font-semibold text-slate-800 text-xs sm:text-sm">
                    {item.label}
                  </TableCell>
                  <TableCell className="text-slate-700 text-xs sm:text-sm font-medium">
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* 2. VISI, MISI, & CORE VALUES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Visi & Misi */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-royal-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                <span>Visi SMAN 2 Kalianda</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-navy-900 leading-relaxed italic bg-slate-50 p-5 rounded-2xl border-l-4 border-royal-600">
                "{siteConfig.visi}"
              </p>
            </div>

            <div>
              <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>Misi Strategis (7 Butir Utama)</span>
              </div>
              <div className="space-y-3">
                {siteConfig.misi.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nilai Budaya & Core Values */}
          <div className="lg:col-span-4 bg-navy-900 text-white rounded-3xl p-5 sm:p-8 shadow-soft space-y-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Nilai Luhur Karakter</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Kearifan Sakai Sambaiyan
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Filosofi gotong royong, kebersamaan, dan kepedulian sosial masyarakat Lampung yang diinternalisasi dalam seluruh aspek kehidupan sekolah.
              </p>

              <div className="space-y-4">
                {siteConfig.coreValues.map((val, idx) => (
                  <div key={idx} className="border-b border-navy-800 pb-3 last:border-0">
                    <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 pl-6">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800 text-xs text-slate-400">
              Motto: <span className="text-white font-medium italic">"Maju Bersama, Hebat Semua"</span>
            </div>
          </div>
        </section>

        {/* 3. REKAM JEJAK SEJARAH */}
        <section className="bg-white rounded-3xl p-5 sm:p-10 border border-slate-200/90 shadow-soft space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-wider">
              Rekam Jejak Sejarah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight mt-1">
              Perjalanan Keunggulan SMAN 2 Kalianda
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {siteConfig.sejarahSingkat}
            </p>
          </div>

          {/* Timeline Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-royal-600">15 Juli 1991</span>
              <h4 className="text-sm font-bold text-navy-900 mt-1">Pendirian Sekolah</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Berdiri resmi berdasarkan SK No. 0426/O/1991 di lahan 26.000 m² Jl. Trans Sumatera Kedaton.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-royal-600">Konsisten</span>
              <h4 className="text-sm font-bold text-navy-900 mt-1">Akreditasi A Unggul</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Menjaga standar mutu pendidikan nasional dengan predikat amat baik dari BAN-S/M.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-royal-600">30 April 2025</span>
              <h4 className="text-sm font-bold text-navy-900 mt-1">Sekolah Unggul Provinsi</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ditetapkan resmi sebagai Sekolah Unggul Provinsi Lampung dengan SPMB jalur prestasi.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-royal-600">2026 - Kini</span>
              <h4 className="text-sm font-bold text-navy-900 mt-1">Sekolah Model PM & KKA</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Penerapan Pembelajaran Mendalam dan integrasi Koding serta Kecerdasan Artifisial.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SARANA & PRASARANA UNGGULAN */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold text-royal-600 uppercase tracking-wider">
              Infrastruktur Sekolah 2,6 Ha
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight mt-1">
              Sarana & Prasarana SMAN 2 Kalianda
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Fasilitas lengkap dan ramah lingkungan yang menunjang aktivitas belajar mengajar, koding, riset IPA, olahraga, dan seni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilitiesData.map((fac, idx) => {
              const IconComponent = iconMap[fac.icon] || Building;
              return (
                <Card key={idx} className="p-6 border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-royal-50 text-royal-600 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {fac.category}
                    </span>
                    <h3 className="text-base font-bold text-navy-900 mt-1 mb-2">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 5. DIREKTORI DEWAN GURU & TENAGA PENDIDIK */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold text-royal-600 uppercase tracking-wider">
              Sumber Daya Pendidik
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight mt-1">
              Dewan Guru & Tenaga Kependidikan SMAN 2 Kalianda
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Dipimpin oleh kepala sekolah berkompeten dan didukung dewan guru profesional berdedikasi tinggi membina potensi peserta didik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachersData.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex items-center gap-4 hover:border-royal-300 transition-colors">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-slate-100 shadow-xs bg-slate-100"
                  onError={(e) => {
                    e.target.src = "https://smanegeri2kalianda.sch.id/assets/img/avatar/avatar-3.png";
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-navy-900 truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs font-semibold text-royal-600 truncate">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {t.subject}
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                    {t.degree}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);
}
