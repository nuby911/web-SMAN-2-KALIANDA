import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Eye,
  Trash2,
  Phone,
  Mail,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sliders,
} from 'lucide-react';
import { useSchoolData, updatePPDBStatus, deletePPDBRegistration } from '@/services';
import { Modal, Toast, Badge } from '@/components';

export default function ManagePPDB() {
  const { ppdbRegistrations, ppdbInfo, ppdbWaves } = useSchoolData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [selectedTrack, setSelectedTrack] = useState('Semua');

  const [activeDetail, setActiveDetail] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const statuses = ['Semua', 'Menunggu Verifikasi', 'Terverifikasi', 'Berkas Perlu Dilengkapi'];
  const tracks = ['Semua', ...(ppdbWaves?.map((w) => w.wave) || ['Jalur Prestasi', 'Jalur Zonasi Domisili', 'Jalur Afirmasi KIP / PKH'])];

  const filteredRegistrations = ppdbRegistrations.filter((item) => {
    const matchesStatus = selectedStatus === 'Semua' || item.status === selectedStatus;
    const matchesTrack = selectedTrack === 'Semua' || item.jalurPendaftaran === selectedTrack || item.jalurPendaftaran.includes(selectedTrack.replace('Jalur ', ''));
    const matchesSearch =
      item.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nisn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.asalSekolah.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesTrack && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    updatePPDBStatus(id, newStatus);
    if (activeDetail && activeDetail.id === id) {
      setActiveDetail({ ...activeDetail, status: newStatus });
    }
    setToastMessage({
      title: 'Status Diperbarui',
      message: `Status pendaftaran ${id} diubah menjadi "${newStatus}".`,
      type: 'success',
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus berkas pendaftaran calon siswa: ${name} (${id})?`)) {
      deletePPDBRegistration(id);
      if (activeDetail && activeDetail.id === id) {
        setActiveDetail(null);
      }
      setToastMessage({
        title: 'Berhasil Dihapus',
        message: 'Data pendaftar telah dihapus dari sistem.',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header with Quick Link to Management */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy-900 tracking-tight">
              Data Pendaftar PPDB Masuk ({ppdbRegistrations.length})
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                ppdbInfo?.isOpen !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {ppdbInfo?.isOpen !== false ? '● Pendaftaran Buka' : '○ Pendaftaran Tutup'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Daftar calon peserta didik yang mendaftar online melalui portal formulir PPDB SMAN 2 Kalianda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/ppdb-settings"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Manajemen Jadwal & Informasi PPDB</span>
          </Link>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Pendaftar</p>
            <h3 className="text-xl font-bold text-navy-900">{ppdbRegistrations.length} Siswa</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Berkas Terverifikasi</p>
            <h3 className="text-xl font-bold text-emerald-600">
              {ppdbRegistrations.filter((r) => r.status === 'Terverifikasi').length} Siswa
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Menunggu Verifikasi</p>
            <h3 className="text-xl font-bold text-amber-600">
              {ppdbRegistrations.filter((r) => r.status === 'Menunggu Verifikasi').length} Siswa
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, NISN, no. pendaftaran, atau asal sekolah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-500 font-semibold ml-2">Jalur:</span>
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            {tracks.map((tr) => (
              <option key={tr} value={tr}>
                {tr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table of Registrations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">No. Pendaftaran</th>
                <th className="py-3 px-4">Nama Calon Siswa</th>
                <th className="py-3 px-4">NISN & Asal Sekolah</th>
                <th className="py-3 px-4">Jalur & Peminatan</th>
                <th className="py-3 px-4">Nilai Rapor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    Tidak ada data pendaftaran yang sesuai pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-royal-600">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-navy-900">{item.namaLengkap}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>Ortu: {item.namaOrtu}</span>
                        {item.nomorWhatsapp && (
                          <a
                            href={`https://wa.me/${item.nomorWhatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-0.5"
                          >
                            <Phone className="w-3 h-3" />
                            {item.nomorWhatsapp}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800">{item.nisn}</div>
                      <div className="text-[11px] text-slate-500">{item.asalSekolah}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {item.jalurPendaftaran}
                      </span>
                      <span className="text-[11px] text-slate-500">{item.peminatan}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-navy-900">
                      {item.nilaiRataRata || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          item.status === 'Terverifikasi'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'Berkas Perlu Dilengkapi'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Berkas Perlu Dilengkapi">Berkas Perlu Dilengkapi</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveDetail(item)}
                          title="Lihat Detail & Berkas"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-royal-600 hover:text-royal-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.namaLengkap)}
                          title="Hapus Pendaftar"
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Berkas Calon Siswa */}
      <Modal
        isOpen={!!activeDetail}
        onClose={() => setActiveDetail(null)}
        title="Detail Berkas Calon Siswa Baru"
        maxWidth="max-w-2xl"
      >
        {activeDetail && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Nomor Registrasi
                </span>
                <h4 className="text-base font-black font-mono text-royal-600">
                  {activeDetail.id}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Terdaftar: {new Date(activeDetail.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Status Saat Ini
                </span>
                <Badge
                  variant={
                    activeDetail.status === 'Terverifikasi'
                      ? 'emerald'
                      : activeDetail.status === 'Berkas Perlu Dilengkapi'
                      ? 'rose'
                      : 'amber'
                  }
                  size="md"
                >
                  {activeDetail.status}
                </Badge>
              </div>
            </div>

            {/* Profile table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Nama Lengkap:</span>
                <span className="font-bold text-navy-900 text-sm">
                  {activeDetail.namaLengkap}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">NISN:</span>
                <span className="font-mono font-bold text-navy-900 text-sm">
                  {activeDetail.nisn}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Asal Sekolah SMP/MTs:</span>
                <span className="font-semibold text-slate-800">{activeDetail.asalSekolah}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Nilai Rata-rata Rapor:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  {activeDetail.nilaiRataRata || '-'}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Jalur Pendaftaran:</span>
                <span className="font-semibold text-royal-700">
                  {activeDetail.jalurPendaftaran}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Pilihan Peminatan:</span>
                <span className="font-semibold text-slate-800">{activeDetail.peminatan}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">Nama Orang Tua / Wali:</span>
                <span className="font-semibold text-slate-800">{activeDetail.namaOrtu}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 block text-[11px]">No. WhatsApp & Email:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  {activeDetail.nomorWhatsapp && (
                    <a
                      href={`https://wa.me/${activeDetail.nomorWhatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {activeDetail.nomorWhatsapp}
                    </a>
                  )}
                  {activeDetail.emailOrtu && (
                    <span className="text-slate-500">({activeDetail.emailOrtu})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Berkas Dokumen Persyaratan Yang Diunggah */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <h5 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Dokumen Persyaratan Calon Siswa:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. KK */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      1. Kartu Keluarga (KK)
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {activeDetail.dokumenKKName || (activeDetail.dokumenKK ? 'Berkas Tersedia' : 'Belum Diunggah')}
                    </span>
                  </div>
                  {activeDetail.dokumenKK ? (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewDoc({
                          title: `Kartu Keluarga - ${activeDetail.namaLengkap}`,
                          url: activeDetail.dokumenKK,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-bold text-[11px] inline-flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3 h-3" /> Pratinjau
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Kosong</span>
                  )}
                </div>

                {/* 2. Akta */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      2. Akta Kelahiran
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {activeDetail.dokumenAktaName || (activeDetail.dokumenAkta ? 'Berkas Tersedia' : 'Belum Diunggah')}
                    </span>
                  </div>
                  {activeDetail.dokumenAkta ? (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewDoc({
                          title: `Akta Kelahiran - ${activeDetail.namaLengkap}`,
                          url: activeDetail.dokumenAkta,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-bold text-[11px] inline-flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3 h-3" /> Pratinjau
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Kosong</span>
                  )}
                </div>

                {/* 3. KTP */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      3. KTP Orang Tua / Wali
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {activeDetail.dokumenKTPName || (activeDetail.dokumenKTP ? 'Berkas Tersedia' : 'Belum Diunggah')}
                    </span>
                  </div>
                  {activeDetail.dokumenKTP ? (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewDoc({
                          title: `KTP Orang Tua - ${activeDetail.namaLengkap}`,
                          url: activeDetail.dokumenKTP,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-bold text-[11px] inline-flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3 h-3" /> Pratinjau
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Kosong</span>
                  )}
                </div>

                {/* 4. Ijazah / SKL */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      4. Ijazah / SKL Jenjang SMP
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {activeDetail.dokumenIjazahName || (activeDetail.dokumenIjazah ? 'Berkas Tersedia' : 'Belum Diunggah')}
                    </span>
                  </div>
                  {activeDetail.dokumenIjazah ? (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewDoc({
                          title: `Ijazah / SKL SMP - ${activeDetail.namaLengkap}`,
                          url: activeDetail.dokumenIjazah,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-bold text-[11px] inline-flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3 h-3" /> Pratinjau
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Kosong</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Status Verifikasi Action */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-navy-900 block">
                Ubah Keputusan Verifikasi Panitia:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(activeDetail.id, 'Terverifikasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDetail.status === 'Terverifikasi'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  ✓ Lolos Verifikasi
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(activeDetail.id, 'Menunggu Verifikasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDetail.status === 'Menunggu Verifikasi'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  ⏳ Menunggu Berkas
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(activeDetail.id, 'Berkas Perlu Dilengkapi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDetail.status === 'Berkas Perlu Dilengkapi'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  ✕ Perlu Dilengkapi
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveDetail(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Preview Dokumen */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title || 'Pratinjau Dokumen'}
        maxWidth="max-w-2xl"
      >
        {previewDoc && (
          <div className="space-y-4">
            <div className="max-h-[65vh] overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-2 flex items-center justify-center">
              {previewDoc.url.startsWith('data:image') ? (
                <img
                  src={previewDoc.url}
                  alt={previewDoc.title}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-xs"
                />
              ) : (
                <iframe
                  src={previewDoc.url}
                  title={previewDoc.title}
                  className="w-full h-96 rounded-lg"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Tutup Pratinjau
              </button>
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
