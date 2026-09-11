import React from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Award,
  Users,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { useSchoolData } from '@/services';

export default function DashboardOverview() {
  const { news, extracurriculars, ppdbRegistrations, ppdbInfo, messages = [] } = useSchoolData();

  const verifiedCount = ppdbRegistrations.filter((r) => r.status === 'Terverifikasi').length;
  const pendingCount = ppdbRegistrations.filter((r) => r.status === 'Menunggu Verifikasi').length;
  const newMessagesCount = messages.filter((m) => m.status === 'Baru').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Welcome Banner */}
      <div className="bg-navy-900 text-white rounded-2xl p-6 shadow-sm border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-royal-400 uppercase tracking-wider">
            Selamat Datang di Panel Pengelola
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Pusat Pengelolaan Konten SMAN 2 Kalianda
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Di panel ini pihak sekolah dapat mengelola berita, ekstrakurikuler, pendaftaran calon siswa PPDB, dan membalas permohonan informasi publik secara langsung.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/berita"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tulis Berita Baru
          </Link>
          <Link
            to="/admin/ppdb"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-navy-700 transition-all"
          >
            <Users className="w-4 h-4 text-royal-400" />
            PPDB ({pendingCount} Baru)
          </Link>
          <Link
            to="/admin/pesan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <Mail className="w-4 h-4" />
            Pesan Masuk ({newMessagesCount} Baru)
          </Link>
        </div>
      </div>

      {/* Metrics Row - 5 Columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Berita */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Berita</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{news.length}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Siap dibaca publik
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Ekstrakurikuler */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ekstrakurikuler</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{extracurriculars.length}</h3>
            <span className="text-[11px] text-slate-500 mt-1 block">Organisasi & Klub</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Pendaftar PPDB */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pendaftar PPDB</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{ppdbRegistrations.length}</h3>
            <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" /> {pendingCount} Perlu Ditinjau
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Pesan Masuk / PTSP */}
        <Link
          to="/admin/pesan"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between hover:border-rose-300 hover:shadow-soft transition-all group"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pesan Kontak</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{messages.length}</h3>
            <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1 group-hover:underline">
              <Clock className="w-3 h-3" /> {newMessagesCount} Belum Dibaca
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </Link>

        {/* Status SPMB */}
        <Link
          to="/admin/ppdb-settings"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between hover:border-royal-300 hover:shadow-soft transition-all group"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status SPMB</p>
            <h3
              className={`text-base font-bold mt-1 ${
                ppdbInfo?.isOpen !== false ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {ppdbInfo?.isOpen !== false ? 'Pendaftaran Buka' : 'Pendaftaran Tutup'}
            </h3>
            <span className="text-[11px] text-royal-600 font-semibold mt-1 group-hover:underline block">
              Atur Jadwal & Info →
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center font-black text-sm">
            {ppdbInfo?.tahunAjaran ? ppdbInfo.tahunAjaran.slice(0, 4) : '2026'}
          </div>
        </Link>
      </div>

      {/* Grid: Berita Terkini & Pendaftar Masuk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-royal-600" />
              <h3 className="font-bold text-sm text-navy-900">Daftar Berita Terbaru</h3>
            </div>
            <Link
              to="/admin/berita"
              className="text-xs font-bold text-royal-600 hover:text-royal-800 flex items-center gap-1"
            >
              Kelola Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {news.slice(0, 4).map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-royal-50 text-royal-700 mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-xs text-navy-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.date} • Oleh {item.author}</p>
                </div>
                <Link
                  to="/admin/berita"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent PPDB Registrations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-navy-900">Pendaftar PPDB Masuk</h3>
            </div>
            <Link
              to="/admin/ppdb"
              className="text-xs font-bold text-royal-600 hover:text-royal-800 flex items-center gap-1"
            >
              Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {ppdbRegistrations.slice(0, 4).map((reg) => (
              <div key={reg.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-navy-900 truncate">{reg.namaLengkap}</span>
                    <span className="text-[10px] text-slate-400">({reg.id})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Asal: {reg.asalSekolah} • Nilai: <strong className="text-slate-700">{reg.nilaiRataRata}</strong>
                  </p>
                  <p className="text-[10px] text-royal-600 font-semibold truncate">{reg.jalurPendaftaran}</p>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      reg.status === 'Terverifikasi'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {reg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-sm text-navy-900">Pesan Masuk & Permohonan Informasi Terkini</h3>
          </div>
          <Link
            to="/admin/pesan"
            className="text-xs font-bold text-royal-600 hover:text-royal-800 flex items-center gap-1"
          >
            Buka Kotak Masuk ({newMessagesCount} Baru) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {messages.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">Belum ada pesan yang masuk.</div>
          ) : (
            messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-navy-900 truncate">{msg.nama}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({msg.ticketNumber})</span>
                    <span className="inline-block px-2 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                      {msg.kategori}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1 truncate">{msg.subjek}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{msg.pesan}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      msg.status === 'Baru'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : msg.status === 'Dibaca'
                        ? 'bg-royal-50 text-royal-700 border border-royal-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {msg.status}
                  </span>
                  <Link
                    to="/admin/pesan"
                    className="px-2.5 py-1.5 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Tinjau</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
