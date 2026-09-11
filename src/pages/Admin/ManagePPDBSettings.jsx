import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Power,
  Users,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  useSchoolData,
  createPPDBWave,
  updatePPDBWave,
  deletePPDBWave,
  savePPDBInfo,
  initialPPDBInfo,
  checkWaveDateStatus,
  formatIndonesianDate,
} from '@/services';
import { Modal, Toast, Badge } from '@/components';

export default function ManagePPDBSettings() {
  const { ppdbWaves, ppdbInfo, ppdbRegistrations } = useSchoolData();

  // Tab State: 'jadwal' | 'informasi'
  const [activeTab, setActiveTab] = useState('jadwal');

  // --- TAB 1: JADWAL GELOMBANG STATE ---
  const [isWaveModalOpen, setIsWaveModalOpen] = useState(false);
  const [editingWave, setEditingWave] = useState(null);
  const [waveFormData, setWaveFormData] = useState({
    wave: '',
    startDate: '',
    endDate: '',
    period: '',
    status: 'Sedang Berlangsung',
    badge: 'amber',
    quota: '',
    desc: '',
  });

  // --- TAB 2: INFORMASI PPDB STATE ---
  const [infoForm, setInfoForm] = useState({
    tahunAjaran: '2026/2027',
    kuotaTotal: '300 Siswa (9 Rombel)',
    isOpen: true,
    announcement: '',
    heroSubtitle: '',
    kontakHotline: '',
    emailPPDB: '',
    catatanSyarat: '',
  });

  // Global Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Sync infoForm with stored ppdbInfo
  useEffect(() => {
    if (ppdbInfo) {
      setInfoForm({
        tahunAjaran: ppdbInfo.tahunAjaran || '2026/2027',
        kuotaTotal: ppdbInfo.kuotaTotal || '300 Siswa (9 Rombel)',
        isOpen: ppdbInfo.isOpen !== false,
        announcement: ppdbInfo.announcement || '',
        heroSubtitle: ppdbInfo.heroSubtitle || '',
        kontakHotline: ppdbInfo.kontakHotline || '',
        emailPPDB: ppdbInfo.emailPPDB || '',
        catatanSyarat: ppdbInfo.catatanSyarat || '',
      });
    }
  }, [ppdbInfo]);

  // --- HANDLERS: TAB 1 (JADWAL GELOMBANG) ---
  const handleOpenAddWave = () => {
    setEditingWave(null);
    setWaveFormData({
      wave: '',
      startDate: '',
      endDate: '',
      period: '',
      status: 'Sedang Berlangsung',
      badge: 'amber',
      quota: '',
      desc: '',
    });
    setIsWaveModalOpen(true);
  };

  const handleOpenEditWave = (wave) => {
    setEditingWave(wave);
    setWaveFormData({
      wave: wave.wave || '',
      startDate: wave.startDate || '',
      endDate: wave.endDate || '',
      period: wave.period || '',
      status: wave.status || 'Sedang Berlangsung',
      badge: wave.badge || 'amber',
      quota: wave.quota || '',
      desc: wave.desc || '',
    });
    setIsWaveModalOpen(true);
  };

  const handleDateChange = (field, val) => {
    setWaveFormData((prev) => {
      const updated = { ...prev, [field]: val };
      const s = field === 'startDate' ? val : prev.startDate;
      const e = field === 'endDate' ? val : prev.endDate;
      if (s && e) {
        updated.period = `${formatIndonesianDate(s)} - ${formatIndonesianDate(e)}`;
      }
      return updated;
    });
  };

  const handleSaveWave = (e) => {
    e.preventDefault();
    if (!waveFormData.wave.trim() || !waveFormData.period.trim()) {
      alert('Nama Gelombang dan Periode wajib diisi.');
      return;
    }

    if (editingWave) {
      updatePPDBWave(editingWave.id || editingWave.wave, waveFormData);
      setToastMessage({
        title: 'Jadwal Diperbarui',
        message: `Gelombang "${waveFormData.wave}" berhasil diperbarui.`,
        type: 'success',
      });
    } else {
      createPPDBWave(waveFormData);
      setToastMessage({
        title: 'Gelombang Ditambahkan',
        message: `Gelombang baru "${waveFormData.wave}" berhasil dibuat.`,
        type: 'success',
      });
    }
    setIsWaveModalOpen(false);
  };

  const handleDeleteWave = (wave) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus gelombang pendaftaran "${wave.wave}"?`)) {
      deletePPDBWave(wave.id || wave.wave);
      setToastMessage({
        title: 'Gelombang Dihapus',
        message: `Gelombang "${wave.wave}" telah dihapus.`,
        type: 'success',
      });
    }
  };

  const handleQuickWaveStatus = (wave, newStatus, newBadge) => {
    updatePPDBWave(wave.id || wave.wave, { status: newStatus, badge: newBadge });
    setToastMessage({
      title: 'Status Gelombang Diubah',
      message: `Status "${wave.wave}" kini: ${newStatus}`,
      type: 'success',
    });
  };

  // --- HANDLERS: TAB 2 (INFORMASI PPDB) ---
  const handleSaveInfo = (e) => {
    e?.preventDefault?.();
    savePPDBInfo(infoForm);
    setToastMessage({
      title: 'Pengaturan Disimpan',
      message: 'Informasi PPDB dan SPMB berhasil diperbarui secara publik.',
      type: 'success',
    });
  };

  const handleToggleRegistration = () => {
    const nextState = !infoForm.isOpen;
    const updated = { ...infoForm, isOpen: nextState };
    setInfoForm(updated);
    savePPDBInfo(updated);
    setToastMessage({
      title: nextState ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup',
      message: nextState
        ? 'Pendaftaran online PPDB sekarang dibuka untuk umum.'
        : 'Pendaftaran online PPDB berhasil ditutup sementara.',
      type: nextState ? 'success' : 'warning',
    });
  };

  const handleResetInfoDefault = () => {
    if (window.confirm('Kembalikan semua informasi & pengaturan PPDB ke data bawaan sekolah?')) {
      setInfoForm(initialPPDBInfo);
      savePPDBInfo(initialPPDBInfo);
      setToastMessage({
        title: 'Pengaturan Direset',
        message: 'Informasi PPDB telah dikembalikan ke data default.',
        type: 'info',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy-900 tracking-tight">
              Manajemen PPDB & SPMB
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                infoForm.isOpen
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {infoForm.isOpen ? '● Sistem Pendaftaran Dibuka' : '○ Pendaftaran Ditutup'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi jadwal gelombang pendaftaran, daya tampung kuota, serta informasi dan pengumuman publik PPDB.
          </p>
        </div>

        {/* Action Link to Pendaftar */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin/ppdb"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <Users className="w-4 h-4 text-royal-600" />
            <span>Lihat Data Pendaftar ({ppdbRegistrations.length})</span>
          </Link>
          <a
            href="/ppdb"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-royal-50 hover:bg-royal-100 text-royal-700 text-xs font-bold transition-colors border border-royal-200/60"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Halaman Publik</span>
          </a>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('jadwal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jadwal'
              ? 'bg-royal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Atur Jadwal & Gelombang</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'jadwal' ? 'bg-royal-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {ppdbWaves.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('informasi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'informasi'
              ? 'bg-royal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan Informasi & Syarat</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ATUR JADWAL & GELOMBANG */}
      {/* ========================================================================= */}
      {activeTab === 'jadwal' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Daftar Gelombang Pendaftaran PPDB ({ppdbWaves.length} Gelombang)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Atur nama jalur, periode pelaksanaan, daya tampung kuota, dan status aktif pendaftaran.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddWave}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Gelombang Baru</span>
            </button>
          </div>

          {/* Wave Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ppdbWaves.map((wave, idx) => {
              const dateStatus = checkWaveDateStatus(wave);
              return (
                <div
                  key={wave.id || idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-soft transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-royal-600 bg-royal-50 px-2.5 py-1 rounded-md">
                        Gelombang {idx + 1}
                      </span>
                      <Badge variant={dateStatus.isActive ? 'emerald' : dateStatus.reason === 'not_started' ? 'royal' : 'rose'} size="sm">
                        {dateStatus.label}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-navy-900 leading-snug mb-2">
                      {wave.wave}
                    </h4>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 bg-slate-50 p-2.5 rounded-xl">
                      <Calendar className="w-4 h-4 text-royal-600 shrink-0" />
                      <span>{wave.period}</span>
                    </div>

                    {/* Live System Date Status Box */}
                    <div
                      className={`flex items-start gap-2 text-[11px] font-medium p-2 rounded-xl mb-3 ${
                        dateStatus.isActive
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : dateStatus.reason === 'not_started'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">
                          Status Sistem: {dateStatus.label}
                        </span>
                        <span className="text-[10px] leading-tight opacity-90 block mt-0.5">
                          {dateStatus.message}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                      {wave.desc || 'Tidak ada keterangan tambahan.'}
                    </p>
                  </div>

                <div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-400 font-medium">Kuota Terbuka:</span>
                    <span className="font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">
                      {wave.quota}
                    </span>
                  </div>

                  {/* Quick Status Buttons */}
                  <div className="mb-4">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Status Cepat:
                    </label>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => handleQuickWaveStatus(wave, 'Sedang Berlangsung', 'amber')}
                        className={`py-1 rounded font-bold transition-all ${
                          wave.status === 'Sedang Berlangsung'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        Buka
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickWaveStatus(wave, 'Segera Dibuka', 'royal')}
                        className={`py-1 rounded font-bold transition-all ${
                          wave.status === 'Segera Dibuka'
                            ? 'bg-royal-100 text-royal-800 border border-royal-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        Segera
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickWaveStatus(wave, 'Ditutup', 'rose')}
                        className={`py-1 rounded font-bold transition-all ${
                          wave.status === 'Ditutup'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        Tutup
                      </button>
                    </div>
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenEditWave(wave)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-royal-50 text-slate-700 hover:text-royal-700 font-bold text-xs transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Gelombang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteWave(wave)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus Gelombang"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PENGATURAN INFORMASI & SYARAT PPDB */}
      {/* ========================================================================= */}
      {activeTab === 'informasi' && (
        <div className="space-y-6">
          {/* Master Operational Switch Card */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              infoForm.isOpen
                ? 'bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50 border-emerald-300'
                : 'bg-gradient-to-r from-rose-50 via-rose-50/70 to-orange-50 border-rose-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    infoForm.isOpen ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  <Power className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-navy-900">
                      Status Operasional Pendaftaran Online
                    </h3>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                        infoForm.isOpen
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {infoForm.isOpen ? 'AKTIF DIBUKA' : 'DITUTUP SEMENTARA'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                    {infoForm.isOpen
                      ? 'Formulir pendaftaran online di halaman PPDB publik sedang aktif dan siap menerima data siswa.'
                      : 'Formulir pendaftaran online ditutup sementara. Pengunjung website akan melihat pemberitahuan penutupan.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleRegistration}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto ${
                  infoForm.isOpen
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {infoForm.isOpen ? 'Tutup Pendaftaran Sekarang' : 'Buka Pendaftaran Sekarang'}
              </button>
            </div>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveInfo} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-900">
                  Informasi Umum & Konten Website SPMB
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Perubahan akan langsung sinkron pada halaman publik PPDB dan banner header portal.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetInfoDefault}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-navy-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tahun Ajaran */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tahun Ajaran Aktif PPDB *
                </label>
                <input
                  type="text"
                  value={infoForm.tahunAjaran}
                  onChange={(e) => setInfoForm({ ...infoForm, tahunAjaran: e.target.value })}
                  placeholder="Contoh: 2026/2027"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tampil pada badge hero halaman PPDB dan tanda bukti registrasi.
                </span>
              </div>

              {/* Total Kuota */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Total Daya Tampung / Kuota Keseluruhan *
                </label>
                <input
                  type="text"
                  value={infoForm.kuotaTotal}
                  onChange={(e) => setInfoForm({ ...infoForm, kuotaTotal: e.target.value })}
                  placeholder="Contoh: 300 Siswa (9 Rombel)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Ditampilkan pada chip kapasitas penerimaan siswa baru.
                </span>
              </div>

              {/* Kontak Hotline WA Panitia */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  No. Hotline WhatsApp Panitia PPDB *
                </label>
                <input
                  type="text"
                  value={infoForm.kontakHotline}
                  onChange={(e) => setInfoForm({ ...infoForm, kontakHotline: e.target.value })}
                  placeholder="Contoh: 083187937270 (Panitia SPMB)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tombol chat WhatsApp calon siswa terhubung ke nomor ini.
                </span>
              </div>

              {/* Email Resmi PPDB */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Resmi Panitia PPDB *
                </label>
                <input
                  type="email"
                  value={infoForm.emailPPDB}
                  onChange={(e) => setInfoForm({ ...infoForm, emailPPDB: e.target.value })}
                  placeholder="ppdb@smanegeri2kalianda.sch.id"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tujuan surat menyurat dan permohonan informasi calon peserta didik.
                </span>
              </div>
            </div>

            {/* Teks Pengumuman Header */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Teks Pengumuman / Banner Berjalan (Header & Halaman PPDB)
              </label>
              <input
                type="text"
                value={infoForm.announcement}
                onChange={(e) => setInfoForm({ ...infoForm, announcement: e.target.value })}
                placeholder="Contoh: SPMB Jalur Prestasi Sekolah Unggul 2026 Dibuka. Segera daftarkan diri Anda sebelum kuota terpenuhi."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Tampil di baris TopHeader gelap website dan kotak pengumuman atas halaman PPDB.
              </span>
            </div>

            {/* Subjudul Hero */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subjudul Deskripsi Hero PPDB
              </label>
              <input
                type="text"
                value={infoForm.heroSubtitle}
                onChange={(e) => setInfoForm({ ...infoForm, heroSubtitle: e.target.value })}
                placeholder="Deskripsi singkat di bawah judul halaman PPDB..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            {/* Catatan Ketentuan Berkas Wajib */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Catatan Persyaratan Berkas Wajib (Upload Dokumen)
              </label>
              <textarea
                rows="3"
                value={infoForm.catatanSyarat}
                onChange={(e) => setInfoForm({ ...infoForm, catatanSyarat: e.target.value })}
                placeholder="Instruksi berkas wajib bagi calon peserta didik..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Tampil pada kotak kuning instruksi dokumen di formulir pendaftaran calon siswa.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs transition-colors shadow-card"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Informasi</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT JADWAL GELOMBANG */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isWaveModalOpen}
        onClose={() => setIsWaveModalOpen(false)}
        title={editingWave ? 'Edit Gelombang Pendaftaran' : 'Tambah Gelombang Baru'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveWave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Gelombang / Jalur Pendaftaran *
            </label>
            <input
              type="text"
              value={waveFormData.wave}
              onChange={(e) => setWaveFormData({ ...waveFormData, wave: e.target.value })}
              placeholder="Contoh: Jalur Prestasi Sekolah Unggul (SPMB)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Buka (Mulai)
              </label>
              <input
                type="date"
                value={waveFormData.startDate || ''}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Jika belum sampai tanggal ini, siswa belum bisa mendaftar.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Tutup (Berakhir)
              </label>
              <input
                type="date"
                value={waveFormData.endDate || ''}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Jika sudah lewat tanggal ini, pendaftaran otomatis terkunci.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Label Periode Pelaksanaan *
              </label>
              <input
                type="text"
                value={waveFormData.period}
                onChange={(e) => setWaveFormData({ ...waveFormData, period: e.target.value })}
                placeholder="Contoh: 01 September - 30 September 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Otomatis terisi dari tanggal di atas atau ubah teks sesuai kebutuhan.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kuota Terbuka *
              </label>
              <input
                type="text"
                value={waveFormData.quota}
                onChange={(e) => setWaveFormData({ ...waveFormData, quota: e.target.value })}
                placeholder="Contoh: 35% (105 Siswa)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Gelombang *
              </label>
              <select
                value={waveFormData.status}
                onChange={(e) => {
                  const val = e.target.value;
                  let autoBadge = 'royal';
                  if (val === 'Sedang Berlangsung') autoBadge = 'amber';
                  if (val === 'Akan Datang') autoBadge = 'emerald';
                  if (val === 'Ditutup') autoBadge = 'rose';
                  setWaveFormData({ ...waveFormData, status: val, badge: autoBadge });
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
              >
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Segera Dibuka">Segera Dibuka</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Ditutup">Ditutup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Warna Badge Label
              </label>
              <select
                value={waveFormData.badge}
                onChange={(e) => setWaveFormData({ ...waveFormData, badge: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
              >
                <option value="amber">Amber (Kuning Emas)</option>
                <option value="royal">Royal (Biru SMANDAKA)</option>
                <option value="emerald">Emerald (Hijau)</option>
                <option value="rose">Rose (Merah)</option>
                <option value="purple">Purple (Ungu)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi & Ketentuan Jalur
            </label>
            <textarea
              rows="3"
              value={waveFormData.desc}
              onChange={(e) => setWaveFormData({ ...waveFormData, desc: e.target.value })}
              placeholder="Jelaskan kriteria pendaftar untuk gelombang ini..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsWaveModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold shadow-xs"
            >
              {editingWave ? 'Simpan Perubahan' : 'Tambahkan Gelombang'}
            </button>
          </div>
        </form>
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
