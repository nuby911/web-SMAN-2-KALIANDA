import React, { useState, useRef, useEffect } from 'react';
import { useSchoolData, newsData, addPPDBRegistration, checkWaveDateStatus, formatIndonesianDate } from '@/services';
import { siteConfig } from '@/config';
import { Card, Badge, Button, Toast, Modal, PageHero } from '@/components';
import {
  FileText,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
  Download,
  AlertCircle,
  ChevronDown,
  User,
  Phone,
  Mail,
  School,
  UploadCloud,
  Eye,
  Trash2,
  Paperclip,
  FileCheck,
} from 'lucide-react';

/**
 * Kompresi berkas gambar dokumen agar ringan (<120KB) untuk penyimpanan browser
 */
function compressDocumentFile(file, maxWidth = 1000, maxHeight = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({ dataUrl, name: file.name });
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve({ dataUrl: event.target.result, name: file.name });
      };
      reader.onerror = (err) => reject(err);
    }
  });
}

/**
 * Komponen Kartu Unggah Dokumen Persyaratan
 */
function DocumentUploadCard({
  id,
  label,
  requirement,
  value,
  fileName,
  onChange,
  onRemove,
  onPreview,
  error,
}) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB.');
      return;
    }

    try {
      setIsProcessing(true);
      const { dataUrl, name } = await compressDocumentFile(file);
      onChange(dataUrl, name);
    } catch (err) {
      console.error('Failed to read file:', err);
      alert('Gagal memproses file. Silakan coba kembali.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          {label} <span className="text-rose-500">*</span>
        </label>
        <span className="text-[10px] text-slate-400 font-medium">{requirement}</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept="image/*,application/pdf"
        onChange={handleFile}
        className="hidden"
      />

      {value ? (
        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">{fileName || 'Dokumen Terunggah'}</p>
              <p className="text-[10px] text-emerald-600 font-medium">Berkas Siap Diverifikasi</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onPreview(label, value)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold transition-colors flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-royal-600" />
              <span>Lihat</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold transition-colors"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
              title="Hapus file"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
            error
              ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/60'
              : 'border-slate-300 hover:border-royal-500 bg-slate-50/60 hover:bg-royal-50/30'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-500">
            <UploadCloud className="w-4 h-4 text-royal-600" />
          </div>
          <p className="text-xs font-bold text-slate-700">
            {isProcessing ? 'Memproses Berkas...' : 'Unggah File / Ambil Foto'}
          </p>
          <p className="text-[10px] text-slate-400">Format: JPG, PNG, atau PDF (Maks. 5MB)</p>
        </div>
      )}

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
}

export default function PPDBPage() {
  const { ppdbWaves = [], ppdbInfo = {} } = useSchoolData();

  const activeWaves = ppdbWaves.filter((w) => checkWaveDateStatus(w).isActive);
  const firstActiveWave = activeWaves[0]?.wave || ppdbWaves[0]?.wave || 'Jalur Prestasi';

  const [formData, setFormData] = useState({
    namaLengkap: '',
    nisn: '',
    asalSekolah: '',
    jalurPendaftaran: firstActiveWave,
    peminatan: 'MIPA (Matematika & IPA)',
    namaOrtu: '',
    nomorWhatsapp: '',
    emailOrtu: '',
    nilaiRataRata: '',
    persetujuan: false,
    dokumenKK: '',
    dokumenKKName: '',
    dokumenAkta: '',
    dokumenAktaName: '',
    dokumenKTP: '',
    dokumenKTPName: '',
    dokumenIjazah: '',
    dokumenIjazahName: '',
  });

  // Sinkronkan pilihan jalur dengan gelombang aktif yang tersedia
  useEffect(() => {
    if (ppdbWaves.length > 0) {
      setFormData((prev) => {
        const found = ppdbWaves.find((w) => w.wave === prev.jalurPendaftaran);
        if (!found || !checkWaveDateStatus(found).isActive) {
          const firstValid = ppdbWaves.find((w) => checkWaveDateStatus(w).isActive);
          if (firstValid) {
            return { ...prev, jalurPendaftaran: firstValid.wave };
          }
        }
        return prev;
      });
    }
  }, [ppdbWaves]);

  const selectedWaveObj = ppdbWaves.find((w) => w.wave === formData.jalurPendaftaran) || ppdbWaves[0];
  const selectedWaveDateStatus = checkWaveDateStatus(selectedWaveObj);
  const canSubmit = ppdbInfo?.isOpen !== false && selectedWaveDateStatus.isActive;

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [previewModalDoc, setPreviewModalDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const tracks = [
    {
      name: "Jalur Prestasi Sekolah Unggul (SPMB Prov. Lampung)",
      quota: "Kuota: 35% (105 Kursi)",
      desc: "Dikhususkan bagi siswa berprestasi peringkat kelas 1-3 rapor atau peraih kejuaraan sains (OSN), olahraga (O2SN), seni (FLS2N), taekwondo, dan keagamaan minimal tingkat Kabupaten/Provinsi.",
      color: "border-amber-200 bg-amber-50/40 text-amber-900"
    },
    {
      name: "Jalur Zonasi Domisili",
      quota: "Kuota: 45% (135 Kursi)",
      desc: "Berdasarkan jarak radius domisili resmi Kartu Keluarga (KK) ke lokasi kampus SMAN 2 Kalianda di Desa Kedaton, Kalianda, Kabupaten Lampung Selatan.",
      color: "border-royal-200 bg-royal-50/40 text-royal-900"
    },
    {
      name: "Jalur Afirmasi KIP / PKH",
      quota: "Kuota: 15% (45 Kursi)",
      desc: "Dikhususkan bagi calon peserta didik pemegang Kartu Indonesia Pintar (KIP), Program Keluarga Harapan (PKH), atau keluarga prasejahtera.",
      color: "border-emerald-200 bg-emerald-50/40 text-emerald-900"
    },
    {
      name: "Jalur Mutasi / Tugas Orang Tua",
      quota: "Kuota: 5% (15 Kursi)",
      desc: "Bagi calon peserta didik yang mengikuti perpindahan domisili tugas dinas orang tua dari luar daerah atau anak guru di lingkungan SMAN 2 Kalianda.",
      color: "border-purple-200 bg-purple-50/40 text-purple-900"
    }
  ];

  const faqs = [
    {
      q: "Bagaimana tahapan seleksi setelah mengisi formulir online?",
      a: "Setelah pendaftaran online berhasil, calon siswa akan memperoleh Nomor Registrasi Resmi. Berkas akan diverifikasi panitia SPMB SMAN 2 Kalianda dalam 1x24 jam. Jika lolos verifikasi berkas, siswa mengikuti tahapan tes peminatan dan wawancara sesuai jadwal."
    },
    {
      q: "Apakah tersedia pembinaan dan beasiswa bagi siswa berprestasi?",
      a: `Ya. ${siteConfig.name} memberikan program pembinaan intensif dan penghargaan prestasi bagi peraih medali/kejuaraan tingkat Kabupaten, Provinsi, maupun Nasional di bidang olimpiade sains (OSN), olahraga (O2SN/KONI Cup), dan seni (FLS2N).`
    },
    {
      q: "Berapa batas usia maksimal pendaftar?",
      a: "Batas usia pendaftar maksimal adalah 21 tahun pada tanggal 1 Juli tahun berjalan dan telah dinyatakan lulus dari jenjang SMP/MTs sederajat."
    },
    {
      q: "Apakah calon siswa dari luar kecamatan Kalianda dapat mendaftar?",
      a: "Tentu bisa. Calon siswa dari luar kecamatan Kalianda maupun luar kabupaten Lampung Selatan dapat mendaftar melalui Jalur Prestasi Sekolah Unggul dan Jalur Mutasi Tugas Orang Tua tanpa batasan zonasi."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.namaLengkap.trim()) newErrors.namaLengkap = 'Nama lengkap wajib diisi.';
    if (!formData.nisn.trim()) {
      newErrors.nisn = 'NISN wajib diisi.';
    } else if (!/^\d{10}$/.test(formData.nisn.trim())) {
      newErrors.nisn = 'NISN harus terdiri dari 10 digit angka.';
    }
    if (!formData.asalSekolah.trim()) newErrors.asalSekolah = 'Asal sekolah SMP/MTs wajib diisi.';
    if (!formData.namaOrtu.trim()) newErrors.namaOrtu = 'Nama orang tua/wali wajib diisi.';
    if (!formData.nomorWhatsapp.trim()) {
      newErrors.nomorWhatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (formData.nomorWhatsapp.trim().length < 9) {
      newErrors.nomorWhatsapp = 'Nomor WhatsApp tidak valid.';
    }
    if (!formData.nilaiRataRata || parseFloat(formData.nilaiRataRata) < 0 || parseFloat(formData.nilaiRataRata) > 100) {
      newErrors.nilaiRataRata = 'Nilai rapor rata-rata skala 0-100 tidak valid.';
    }

    // Validasi 4 Dokumen Wajib
    if (!formData.dokumenKK) {
      newErrors.dokumenKK = 'Kartu Keluarga (minimal 1 tahun) wajib diunggah.';
    }
    if (!formData.dokumenAkta) {
      newErrors.dokumenAkta = 'Akta Kelahiran calon peserta didik wajib diunggah.';
    }
    if (!formData.dokumenKTP) {
      newErrors.dokumenKTP = 'KTP Orang Tua / Wali wajib diunggah.';
    }
    if (!formData.dokumenIjazah) {
      newErrors.dokumenIjazah = 'Ijazah atau SKL jenjang SMP/MTs wajib diunggah.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (ppdbInfo?.isOpen === false) {
      setToastMessage({
        title: 'Pendaftaran Ditutup',
        message: 'Mohon maaf, pendaftaran online saat ini sedang ditutup sementara oleh panitia SPMB.',
        type: 'warning',
      });
      return;
    }

    if (!selectedWaveDateStatus.isActive) {
      setToastMessage({
        title: 'Pendaftaran Ditolak',
        message: `Gelombang "${selectedWaveObj?.wave || formData.jalurPendaftaran}" tidak dapat didaftarkan karena ${selectedWaveDateStatus.label.toLowerCase()} (${selectedWaveDateStatus.message})`,
        type: 'warning',
      });
      return;
    }

    if (!formData.persetujuan) {
      setToastMessage({
        title: 'Verifikasi Ditolak',
        message: 'Harap centang persetujuan keabsahan data sebelum mengirim formulir.',
        type: 'warning',
      });
      return;
    }

    const newEntry = addPPDBRegistration({
      namaLengkap: formData.namaLengkap,
      nisn: formData.nisn,
      asalSekolah: formData.asalSekolah,
      jalurPendaftaran: formData.jalurPendaftaran,
      peminatan: formData.peminatan,
      namaOrtu: formData.namaOrtu,
      nomorWhatsapp: formData.nomorWhatsapp,
      emailOrtu: formData.emailOrtu,
      nilaiRataRata: formData.nilaiRataRata,
      dokumenKK: formData.dokumenKK,
      dokumenKKName: formData.dokumenKKName,
      dokumenAkta: formData.dokumenAkta,
      dokumenAktaName: formData.dokumenAktaName,
      dokumenKTP: formData.dokumenKTP,
      dokumenKTPName: formData.dokumenKTPName,
      dokumenIjazah: formData.dokumenIjazah,
      dokumenIjazahName: formData.dokumenIjazahName,
    });

    const registrationNumber = newEntry?.id || `SMANDAKA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = {
      ...formData,
      registrationNumber,
      tanggalDaftar: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      statusVerifikasi: 'Menunggu Verifikasi Berkas (1x24 Jam)',
    };

    setSubmittedData(result);
    setIsReceiptModalOpen(true);
    setToastMessage({
      title: 'Pendaftaran Berhasil!',
      message: `Nomor Registrasi Anda: ${registrationNumber}. Data berhasil disimpan dan masuk ke antrean verifikasi panitia.`,
      type: 'success',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        badge={`PPDB Online ${ppdbInfo?.tahunAjaran || '2026/2027'}`}
        title="Penerimaan Siswa Baru (PPDB) SMAN 2 Kalianda"
        subtitle={ppdbInfo?.heroSubtitle || "Bergabunglah bersama Sekolah Unggul Provinsi Lampung. Pendaftaran dilaksanakan secara transparan, akuntabel, dan terdigitalisasi."}
        bgImage="https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e64196bc720250513_085627.jpg"
        chips={[
          `Daya Tampung: ${ppdbInfo?.kuotaTotal || '300 Siswa (9 Rombel)'}`,
          'Jalur Prestasi SPMB (35%)',
          'Jalur Zonasi Domisili (45%)',
          'Afirmasi & Mutasi (20%)'
        ]}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Dynamic Announcement Banner */}
          {ppdbInfo?.announcement && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-royal-950 to-navy-900 text-white border border-royal-700/50 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0"></span>
                <p className="text-xs sm:text-sm text-amber-200">
                  <strong className="text-white font-bold mr-1.5 uppercase tracking-wide">Pengumuman:</strong>
                  {ppdbInfo.announcement}
                </p>
              </div>
              <span className="text-[11px] text-slate-300 shrink-0 font-medium bg-navy-800/80 px-3 py-1 rounded-full border border-navy-700 self-start sm:self-auto">
                Tahun Ajaran {ppdbInfo?.tahunAjaran || '2026/2027'}
              </span>
            </div>
          )}

          {/* Registration Closed Warning */}
          {ppdbInfo?.isOpen === false && (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3.5 text-rose-900 shadow-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Pendaftaran Online Ditutup Sementara</h4>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                  Pendaftaran online PPDB / SPMB Tahun Ajaran {ppdbInfo?.tahunAjaran || '2026/2027'} saat ini sedang ditutup atau belum dimulai oleh panitia. Anda tetap dapat mencermati jadwal gelombang dan persyaratan berkas di bawah. Untuk konsultasi, hubungi hotline panitia: <strong>{ppdbInfo?.kontakHotline || '083187937270'}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* 1. JADWAL GELOMBANG PENDAFTARAN */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">
                Jadwal Gelombang Pendaftaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Perhatikan periode pembukaan setiap gelombang untuk memastikan kelengkapan berkas Anda.
              </p>
            </div>

            {ppdbWaves.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                Jadwal gelombang pendaftaran sedang diperbarui oleh panitia.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ppdbWaves.map((wave, idx) => {
                  const dateStatus = checkWaveDateStatus(wave);
                  return (
                    <Card
                      key={wave.id || idx}
                      className={`p-6 border relative flex flex-col justify-between transition-all hover:shadow-card ${
                        dateStatus.isActive
                          ? 'border-emerald-300 ring-2 ring-emerald-500/10 bg-gradient-to-b from-emerald-50/20 to-white'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-royal-600 bg-royal-50 px-2.5 py-1 rounded-md">
                            Gelombang {idx + 1}
                          </span>
                          <Badge
                            variant={
                              dateStatus.isActive
                                ? 'emerald'
                                : dateStatus.reason === 'not_started'
                                ? 'royal'
                                : 'rose'
                            }
                            size="sm"
                          >
                            {dateStatus.label}
                          </Badge>
                        </div>

                        <h3 className="text-base font-bold text-navy-900 mb-2">
                          {wave.wave}
                        </h3>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2.5 bg-slate-50 p-2.5 rounded-xl">
                          <Calendar className="w-4 h-4 text-royal-600 shrink-0" />
                          <span>{wave.period}</span>
                        </div>

                        {/* Live Date Status Alert */}
                        <div
                          className={`flex items-start gap-2 text-xs font-medium p-2.5 rounded-xl mb-3 ${
                            dateStatus.isActive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : dateStatus.reason === 'not_started'
                              ? 'bg-sky-50 text-sky-800 border border-sky-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{dateStatus.message}</span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">
                          {wave.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-slate-400 font-medium">Kuota Terbuka:</span>
                          <span className="font-bold text-navy-900">{wave.quota}</span>
                        </div>

                        {dateStatus.isActive ? (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, jalurPendaftaran: wave.wave }));
                              const formEl = document.getElementById('formulir-pendaftaran');
                              if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-card group cursor-pointer"
                          >
                            <span>Daftar Gelombang Ini</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ) : dateStatus.reason === 'not_started' ? (
                          <div className="w-full py-2 px-3 rounded-xl bg-sky-50 text-sky-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-sky-200 select-none">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Belum Dibuka (Mulai {dateStatus.startDateFormatted})</span>
                          </div>
                        ) : (
                          <div className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 select-none">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Pendaftaran Ditutup / Berakhir</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

        {/* 2. JALUR PENERIMAAN */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">
              4 Jalur Penerimaan Siswa Baru
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilih jalur yang paling sesuai dengan kualifikasi dan domisili Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tracks.map((tr, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${tr.color} shadow-xs space-y-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold leading-snug">
                    {tr.name}
                  </h3>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white shadow-xs">
                    {tr.quota}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {tr.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FORMULIR PENDAFTARAN ONLINE INTERAKTIF */}
        <section id="formulir-pendaftaran" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft space-y-8 scroll-mt-24">
          <div className="border-b border-slate-100 pb-6">
            <span className="inline-block text-royal-700 text-xs font-bold uppercase tracking-wider mb-1">
              Formulir Pendaftaran Siswa Baru
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Registrasi Calon Siswa Baru (Online)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Harap isi data dengan benar sesuai dokumen Ijazah SMP, Kartu Keluarga, dan Rapor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group 1: Data Calon Siswa */}
            <div>
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 text-royal-600">
                1. Data Pribadi Calon Siswa
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Lengkap Siswa *
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    placeholder="Sesuai akta kelahiran"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.namaLengkap ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.namaLengkap && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.namaLengkap}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    NISN (10 Digit) *
                  </label>
                  <input
                    type="text"
                    name="nisn"
                    maxLength={10}
                    placeholder="Contoh: 0071234567"
                    value={formData.nisn}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.nisn ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.nisn && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.nisn}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Asal Sekolah SMP/MTs *
                  </label>
                  <input
                    type="text"
                    name="asalSekolah"
                    placeholder="Nama SMP asal"
                    value={formData.asalSekolah}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.asalSekolah ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.asalSekolah && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.asalSekolah}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Group 2: Pilihan Jalur & Jurusan */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 text-royal-600">
                2. Jalur Pendaftaran & Peminatan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pilihan Jalur Masuk / Gelombang *
                  </label>
                  <select
                    name="jalurPendaftaran"
                    value={formData.jalurPendaftaran}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white ${
                      !selectedWaveDateStatus.isActive
                        ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  >
                    {ppdbWaves.map((wave, idx) => {
                      const wStatus = checkWaveDateStatus(wave);
                      return (
                        <option
                          key={wave.id || idx}
                          value={wave.wave}
                          disabled={!wStatus.isActive}
                          className={!wStatus.isActive ? 'text-slate-400 bg-slate-50' : 'text-slate-900 font-medium'}
                        >
                          {wave.wave} — [{wStatus.label}] {!wStatus.isActive ? '🔒 (Tutup)' : '✅ (Buka)'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Peminatan Kurikulum *
                  </label>
                  <select
                    name="peminatan"
                    value={formData.peminatan}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
                  >
                    <option>MIPA (Matematika & IPA)</option>
                    <option>IPS (Ilmu Pengetahuan Sosial)</option>
                    <option>Bahasa & Komunikasi Global</option>
                    <option>Cambridge International Stream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Rata-Rata Nilai Rapor SMP (Skala 100) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="nilaiRataRata"
                    placeholder="Contoh: 88.5"
                    value={formData.nilaiRataRata}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.nilaiRataRata ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.nilaiRataRata && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.nilaiRataRata}</p>
                  )}
                </div>

                {/* Banner Status Jalur Terpilih */}
                <div
                  className={`col-span-1 sm:col-span-3 p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                    selectedWaveDateStatus.isActive
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-300 text-rose-950'
                  }`}
                >
                  {selectedWaveDateStatus.isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs leading-relaxed">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <strong className="font-bold text-sm">
                        {selectedWaveObj?.wave || formData.jalurPendaftaran}
                      </strong>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          selectedWaveDateStatus.isActive
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {selectedWaveDateStatus.label}
                      </span>
                    </div>
                    <p className="text-slate-700">
                      {selectedWaveDateStatus.message}
                    </p>
                    {!selectedWaveDateStatus.isActive && (
                      <div className="mt-2 pt-2 border-t border-rose-200/80 text-rose-800 font-semibold">
                        ⚠️ Perhatian: Gelombang ini tidak dapat didaftarkan karena jadwal pendaftaran belum sampai atau sudah lewat tanggal penutupan. Tombol pengiriman formulir dinonaktifkan secara otomatis.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Group 3: Data Orang Tua / Wali */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 text-royal-600">
                3. Kontak Orang Tua / Wali
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Ayah / Ibu / Wali *
                  </label>
                  <input
                    type="text"
                    name="namaOrtu"
                    placeholder="Nama orang tua/wali"
                    value={formData.namaOrtu}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.namaOrtu ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.namaOrtu && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.namaOrtu}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    name="nomorWhatsapp"
                    placeholder="Contoh: 081234567890"
                    value={formData.nomorWhatsapp}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.nomorWhatsapp ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:ring-royal-500'
                    }`}
                  />
                  {errors.nomorWhatsapp && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.nomorWhatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Kontak (Opsional)
                  </label>
                  <input
                    type="email"
                    name="emailOrtu"
                    placeholder="email@domain.com"
                    value={formData.emailOrtu}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>
            </div>

            {/* Group 4: Dokumen Persyaratan Wajib */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider text-royal-600">
                  4. Upload Dokumen Persyaratan Wajib
                </h3>
                <span className="text-[11px] text-slate-500">
                  Format: Gambar (JPG/PNG) atau PDF, maks. 5MB per file
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 mb-5 flex items-start gap-3 text-xs text-amber-800 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ketentuan Berkas:</strong> {ppdbInfo?.catatanSyarat || "Dokumen wajib meliputi Kartu Keluarga (minimal 1 tahun), Akta Kelahiran, KTP orang tua/wali, dan Ijazah atau SKL untuk jenjang SMP. Pastikan foto atau pindaian dokumen dapat dibaca dengan jelas oleh panitia verifikasi."}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DocumentUploadCard
                  id="doc-kk"
                  label="1. Kartu Keluarga (KK)"
                  requirement="Minimal 1 tahun masa penerbitan"
                  value={formData.dokumenKK}
                  fileName={formData.dokumenKKName}
                  onChange={(url, name) => {
                    setFormData((prev) => ({ ...prev, dokumenKK: url, dokumenKKName: name }));
                    if (errors.dokumenKK) setErrors((prev) => ({ ...prev, dokumenKK: null }));
                  }}
                  onRemove={() => setFormData((prev) => ({ ...prev, dokumenKK: '', dokumenKKName: '' }))}
                  onPreview={(title, url) => setPreviewModalDoc({ title, url })}
                  error={errors.dokumenKK}
                />

                <DocumentUploadCard
                  id="doc-akta"
                  label="2. Akta Kelahiran"
                  requirement="Asli atau fotokopi legalisir"
                  value={formData.dokumenAkta}
                  fileName={formData.dokumenAktaName}
                  onChange={(url, name) => {
                    setFormData((prev) => ({ ...prev, dokumenAkta: url, dokumenAktaName: name }));
                    if (errors.dokumenAkta) setErrors((prev) => ({ ...prev, dokumenAkta: null }));
                  }}
                  onRemove={() => setFormData((prev) => ({ ...prev, dokumenAkta: '', dokumenAktaName: '' }))}
                  onPreview={(title, url) => setPreviewModalDoc({ title, url })}
                  error={errors.dokumenAkta}
                />

                <DocumentUploadCard
                  id="doc-ktp"
                  label="3. KTP Orang Tua / Wali"
                  requirement="Foto / scan e-KTP Ayah/Ibu/Wali"
                  value={formData.dokumenKTP}
                  fileName={formData.dokumenKTPName}
                  onChange={(url, name) => {
                    setFormData((prev) => ({ ...prev, dokumenKTP: url, dokumenKTPName: name }));
                    if (errors.dokumenKTP) setErrors((prev) => ({ ...prev, dokumenKTP: null }));
                  }}
                  onRemove={() => setFormData((prev) => ({ ...prev, dokumenKTP: '', dokumenKTPName: '' }))}
                  onPreview={(title, url) => setPreviewModalDoc({ title, url })}
                  error={errors.dokumenKTP}
                />

                <DocumentUploadCard
                  id="doc-ijazah"
                  label="4. Ijazah atau SKL Jenjang SMP"
                  requirement="Ijazah atau Surat Keterangan Lulus"
                  value={formData.dokumenIjazah}
                  fileName={formData.dokumenIjazahName}
                  onChange={(url, name) => {
                    setFormData((prev) => ({ ...prev, dokumenIjazah: url, dokumenIjazahName: name }));
                    if (errors.dokumenIjazah) setErrors((prev) => ({ ...prev, dokumenIjazah: null }));
                  }}
                  onRemove={() => setFormData((prev) => ({ ...prev, dokumenIjazah: '', dokumenIjazahName: '' }))}
                  onPreview={(title, url) => setPreviewModalDoc({ title, url })}
                  error={errors.dokumenIjazah}
                />
              </div>
            </div>

            {/* Persetujuan Keabsahan Data */}
            <div className="pt-6 border-t border-slate-100">
              <label
                htmlFor="persetujuan-checkbox"
                className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  formData.persetujuan
                    ? 'bg-royal-50/60 border-royal-400 ring-2 ring-royal-200/50'
                    : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200'
                }`}
              >
                <input
                  id="persetujuan-checkbox"
                  type="checkbox"
                  name="persetujuan"
                  checked={formData.persetujuan}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 rounded text-royal-600 border-slate-300 focus:ring-royal-500 cursor-pointer shrink-0"
                />
                <div className="text-xs text-slate-700 leading-relaxed select-none">
                  <span className="font-bold text-navy-900 block text-sm mb-1">
                    Pernyataan Keabsahan Dokumen & Data Calon Peserta Didik *
                  </span>
                  <span>
                    Saya menyatakan dengan sesungguhnya bahwa seluruh data, identitas, dan nilai rapor yang diisikan di atas adalah benar, sah, dan dapat dipertanggungjawabkan sesuai dokumen asli. Apabila di kemudian hari ditemukan pemalsuan data, saya bersedia menerima sanksi pembatalan kelulusan SPMB/PPDB SMA Negeri 2 Kalianda.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Centang kotak persetujuan di atas sebelum menekan tombol kirim formulir.
              </p>
              <Button
                type="submit"
                variant={!canSubmit ? 'outline' : 'royal'}
                size="lg"
                disabled={!canSubmit}
                icon={FileText}
                className={`w-full sm:w-auto font-bold px-8 ${
                  !canSubmit
                    ? 'opacity-60 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-300'
                    : 'shadow-card'
                }`}
              >
                {!canSubmit
                  ? ppdbInfo?.isOpen === false
                    ? 'Pendaftaran Ditutup Sementara'
                    : `Pendaftaran Ditutup (${selectedWaveDateStatus.label})`
                  : 'Kirim Pendaftaran Sekarang'}
              </Button>
            </div>
          </form>
        </section>

        {/* 4. FAQ ACCORDION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ PPDB)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Temukan jawaban atas pertanyaan umum seputar proses pendaftaran dan syarat berkas.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/70 transition-colors"
                >
                  <span className="text-sm font-bold text-navy-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. BANTUAN & HOTLINE PPDB */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900">Butuh Bantuan Pendaftaran PPDB/SPMB?</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hubungi panitia penerimaan peserta didik baru SMAN 2 Kalianda melalui hotline resmi.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${(ppdbInfo?.kontakHotline || '083187937270').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: {ppdbInfo?.kontakHotline || '083187937270'}</span>
            </a>
            <a
              href={`mailto:${ppdbInfo?.emailPPDB || 'ppdb@smanegeri2kalianda.sch.id'}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors w-full sm:w-auto"
            >
              <Mail className="w-4 h-4" />
              <span>{ppdbInfo?.emailPPDB || 'Email Panitia'}</span>
            </a>
          </div>
        </section>
      </div>
    </div>

      {/* Proof Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Bukti Tanda Pendaftaran PPDB Online"
        maxWidth="max-w-2xl"
      >
        {submittedData && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-base font-black text-navy-900 uppercase">
                    {siteConfig.name}
                  </h4>
                  <p className="text-xs text-slate-500">Panitia PPDB 2026/2027</p>
                </div>
                <Badge variant="emerald" size="md">
                  Status: Berhasil Terkirim
                </Badge>
              </div>

              {/* Registration Code Banner */}
              <div className="bg-royal-600 text-white p-4 rounded-xl text-center">
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
                  Nomor Registrasi Resmi
                </span>
                <div className="text-2xl font-black font-mono mt-0.5 tracking-wider">
                  {submittedData.registrationNumber}
                </div>
                <span className="text-[11px] opacity-90 block mt-1">
                  Harap catat atau cetak nomor registrasi ini
                </span>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Nama Calon Siswa:</span>
                  <span className="font-bold text-slate-800">{submittedData.namaLengkap}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">NISN:</span>
                  <span className="font-bold text-slate-800">{submittedData.nisn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Asal Sekolah:</span>
                  <span className="font-bold text-slate-800">{submittedData.asalSekolah}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jalur Pilihan:</span>
                  <span className="font-bold text-slate-800">{submittedData.jalurPendaftaran}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Peminatan:</span>
                  <span className="font-bold text-slate-800">{submittedData.peminatan}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Nama Orang Tua:</span>
                  <span className="font-bold text-slate-800">{submittedData.namaOrtu}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">No. WhatsApp:</span>
                  <span className="font-bold text-slate-800">{submittedData.nomorWhatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tanggal Registrasi:</span>
                  <span className="font-bold text-slate-800">{submittedData.tanggalDaftar}</span>
                </div>
              </div>

              {/* Status Berkas Terunggah */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-500 block text-[11px] mb-2 font-bold">Dokumen Persyaratan Terunggah:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Kartu Keluarga (KK)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Akta Kelahiran</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">KTP Orang Tua</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Ijazah / SKL SMP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => window.print()}
                className="w-full sm:w-auto"
              >
                Cetak / Simpan Bukti PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsReceiptModalOpen(false)}
                className="w-full sm:w-auto bg-navy-800"
              >
                Tutup Jendela
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!previewModalDoc}
        onClose={() => setPreviewModalDoc(null)}
        title={previewModalDoc?.title || 'Pratinjau Dokumen'}
        maxWidth="max-w-2xl"
      >
        {previewModalDoc && (
          <div className="space-y-4">
            <div className="max-h-[65vh] overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-2 flex items-center justify-center">
              {previewModalDoc.url.startsWith('data:image') ? (
                <img
                  src={previewModalDoc.url}
                  alt={previewModalDoc.title}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-xs"
                />
              ) : (
                <iframe
                  src={previewModalDoc.url}
                  title={previewModalDoc.title}
                  className="w-full h-96 rounded-lg"
                />
              )}
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setPreviewModalDoc(null)}>
                Tutup Pratinjau
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Feedback */}
      {toastMessage && (
        <Toast
          isOpen={!!toastMessage}
          onClose={() => setToastMessage(null)}
          title={toastMessage.title}
          message={toastMessage.message}
          type={toastMessage.type}
        />
      )}
    </div>
  );
}
