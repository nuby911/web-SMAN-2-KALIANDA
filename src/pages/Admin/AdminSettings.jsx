import React, { useState } from 'react';
import {
  RotateCcw,
  Database,
  CheckCircle2,
  Cloud,
} from 'lucide-react';
import { useSchoolData, resetAllToDefault } from '@/services';
import { Toast } from '@/components';

export default function AdminSettings() {
  const { news, extracurriculars, ppdbRegistrations } = useSchoolData();
  const [toastMessage, setToastMessage] = useState(null);

  const handleReset = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin mengembalikan seluruh data berita, ekstrakurikuler, dan pendaftaran PPDB ke data bawaan awal?'
      )
    ) {
      resetAllToDefault();
      setToastMessage({
        title: 'Data Direset',
        message: 'Seluruh konten telah dikembalikan ke data default pabrikan.',
        type: 'info',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Overview Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy-900">
              Pengaturan & Status Penyimpanan
            </h2>
            <p className="text-xs text-slate-500">
              Informasi arsitektur data CMS dan opsi reset konten demo
            </p>
          </div>
        </div>

        {/* Current State Explanation */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-navy-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Mode Demo Internal Aktif (LocalStorage)
          </div>
          <p className="leading-relaxed text-slate-600">
            Saat ini, seluruh perubahan data (tambah, edit, dan hapus) disimpan secara lokal di peramban (browser) menggunakan <strong>HTML5 LocalStorage</strong>. Data tersimpan permanen di perangkat Anda dan otomatis sinkron ke seluruh halaman publik website ini.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-[11px] font-semibold text-slate-400 block">Koleksi Berita</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{news.length} Artikel</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-[11px] font-semibold text-slate-400 block">Ekstrakurikuler</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{extracurriculars.length} Organisasi</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-[11px] font-semibold text-slate-400 block">Registrasi PPDB</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{ppdbRegistrations.length} Formulir</span>
          </div>
        </div>
      </div>

      {/* Production Integration Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-navy-900">Langkah Menuju Server Cloud (Tahap Selanjutnya)</h3>
            <p className="text-[11px] text-slate-500">
              Ketika sekolah siap meluncurkan website ke domain resmi (publik)
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Setelah Anda selesai menguji coba seluruh alur di panel ini, sistem ini dapat langsung disambungkan ke <strong>Supabase</strong> atau <strong>Firebase</strong>. Antarmuka dan form yang baru saja Anda coba tidak perlu diubah lagi—hanya service penyimpanannya yang dialihkan dari <code>localStorage</code> ke cloud database.
        </p>
      </div>

      {/* Danger Zone: Reset Button */}
      <div className="bg-white rounded-xl p-6 border border-rose-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-sm text-rose-900">Reset Seluruh Data ke Bawaan</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hapus semua berita atau data uji coba yang Anda tambahkan dan kembalikan ke konten orisinal sekolah.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            Reset ke Data Default
          </button>
        </div>
      </div>

      {/* Toast */}
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
