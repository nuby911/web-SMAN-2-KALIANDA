import React, { useState, useMemo } from 'react';
import {
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Send,
  MessageSquare,
  AlertCircle,
  Download,
  CheckCheck,
  ExternalLink,
  Phone,
  User,
  Inbox,
  X,
  MessageCircle,
} from 'lucide-react';
import {
  useSchoolData,
  updateMessageStatus,
  replyMessage,
  deleteMessage,
  markAllMessagesAsRead,
} from '@/services';
import { Card, Badge, Button, Toast } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function ManageMessages() {
  const { messages } = useSchoolData();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [replyInput, setReplyInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const categories = [
    'Semua',
    'Pendaftaran PPDB',
    'Informasi Umum',
    'Layanan Akademik',
    'Kemitraan & Kerjasama',
    'Pengaduan Masyarakat',
  ];

  const statuses = ['Semua', 'Baru', 'Dibaca', 'Dibalas'];

  // Metrics calculation
  const totalCount = messages.length;
  const newCount = messages.filter((m) => m.status === 'Baru').length;
  const readCount = messages.filter((m) => m.status === 'Dibaca').length;
  const repliedCount = messages.filter((m) => m.status === 'Dibalas').length;

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchCategory = selectedCategory === 'Semua' || msg.kategori === selectedCategory;
      const matchStatus = selectedStatus === 'Semua' || msg.status === selectedStatus;

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        msg.nama?.toLowerCase().includes(q) ||
        msg.ticketNumber?.toLowerCase().includes(q) ||
        msg.email?.toLowerCase().includes(q) ||
        msg.telepon?.toLowerCase().includes(q) ||
        msg.subjek?.toLowerCase().includes(q) ||
        msg.pesan?.toLowerCase().includes(q);

      return matchCategory && matchStatus && matchSearch;
    });
  }, [messages, selectedCategory, selectedStatus, searchQuery]);

  const handleOpenDetail = (msg) => {
    // If status is 'Baru', automatically mark as 'Dibaca' when opened
    if (msg.status === 'Baru') {
      updateMessageStatus(msg.id, 'Dibaca');
    }
    setSelectedMessage(msg);
    setReplyInput(msg.replyText || '');
    setIsDetailOpen(true);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!selectedMessage) return;
    if (!replyInput.trim()) {
      alert('Mohon ketikkan catatan atau balasan respon terlebih dahulu.');
      return;
    }

    const adminName = user?.name || 'Administrator Humas & TI';
    replyMessage(selectedMessage.id, replyInput, adminName);
    
    setToastMessage({
      title: 'Respon Tersimpan!',
      message: `Tindak lanjut untuk tiket ${selectedMessage.ticketNumber} berhasil dicatat dengan status "Dibalas".`,
      type: 'success',
    });

    setIsDetailOpen(false);
    setSelectedMessage(null);
  };

  const handleMarkAllRead = () => {
    markAllMessagesAsRead();
    setToastMessage({
      title: 'Status Diperbarui',
      message: 'Seluruh pesan baru telah ditandai sebagai sudah dibaca.',
      type: 'success',
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteMessage(deleteConfirmId);
    setDeleteConfirmId(null);
    setToastMessage({
      title: 'Pesan Dihapus',
      message: 'Data pesan permohonan informasi telah dihapus dari sistem.',
      type: 'info',
    });
    if (selectedMessage?.id === deleteConfirmId) {
      setIsDetailOpen(false);
      setSelectedMessage(null);
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) {
      alert('Tidak ada data pesan untuk diekspor.');
      return;
    }

    const headers = ['No Tiket', 'Tanggal', 'Nama Pengirim', 'Email', 'Telepon/WA', 'Kategori', 'Subjek', 'Isi Pesan', 'Status', 'Respon Admin'];
    const rows = messages.map((m) => [
      `"${m.ticketNumber}"`,
      `"${m.createdAt}"`,
      `"${m.nama}"`,
      `"${m.email}"`,
      `"${m.telepon}"`,
      `"${m.kategori}"`,
      `"${(m.subjek || '').replace(/"/g, '""')}"`,
      `"${(m.pesan || '').replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${(m.replyText || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Pesan_SMAN2_Kalianda_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage({
      title: 'Ekspor Berhasil',
      message: 'File CSV pesan masuk berhasil diunduh ke perangkat Anda.',
      type: 'success',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Baru':
        return <Badge variant="rose">Baru</Badge>;
      case 'Dibaca':
        return <Badge variant="royal">Dibaca</Badge>;
      case 'Dibalas':
        return <Badge variant="emerald">Dibalas</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Header Banner */}
      <div className="bg-navy-900 text-white rounded-2xl p-6 shadow-sm border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-royal-500/30 text-royal-200 border border-royal-400/40">
              Layanan Aspirasi & PTSP
            </span>
            {newCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {newCount} Pesan Baru
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Pesan Masuk & Permohonan Informasi
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Semua aspirasi, pertanyaan pendaftaran PPDB, permohonan legalisir/studi banding, dan pesan dari form halaman kontak publik tersimpan di sini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {newCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              icon={CheckCheck}
              onClick={handleMarkAllRead}
              className="bg-navy-800 text-slate-200 border-navy-700 hover:bg-navy-700 text-xs font-semibold"
            >
              Tandai Semua Dibaca
            </Button>
          )}
          <Button
            variant="royal"
            size="sm"
            icon={Download}
            onClick={handleExportCSV}
            className="text-xs font-bold shadow-sm"
          >
            Ekspor CSV
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between border-slate-200">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pesan</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{totalCount}</h3>
            <span className="text-[11px] text-slate-500 mt-1 block">Aspirasi publik & pemohon</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-200">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pesan Baru</p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{newCount}</h3>
            <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" /> Memerlukan perhatian
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-200">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telah Dibaca</p>
            <h3 className="text-2xl font-bold text-navy-900 mt-1">{readCount}</h3>
            <span className="text-[11px] text-royal-600 font-semibold flex items-center gap-1 mt-1">
              <Eye className="w-3 h-3" /> Dalam penelaahan
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-200">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tuntas Dibalas</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{repliedCount}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Respon tersampaikan
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-5 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, subjek, isi pesan, email, atau no telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter kategori pesan"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Semua' ? 'Semua Kategori' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2">Status Pesan:</span>
          {statuses.map((st) => {
            const count =
              st === 'Semua'
                ? messages.length
                : messages.filter((m) => m.status === st).length;

            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedStatus === st
                    ? 'bg-royal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{st}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedStatus === st
                      ? 'bg-royal-800 text-royal-100'
                      : 'bg-white text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Messages Table & Card View */}
      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Pengirim & Kontak</th>
                <th className="py-3.5 px-4">Kategori & Subjek</th>
                <th className="py-3.5 px-4">Cuplikan Pesan</th>
                <th className="py-3.5 px-4">Waktu Masuk</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="font-semibold text-slate-600">Tidak ada pesan yang sesuai kriteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau filter status.</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      msg.status === 'Baru' ? 'bg-rose-50/30 font-medium' : ''
                    }`}
                  >
                    {/* Pengirim */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {msg.nama ? msg.nama.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <div className="font-bold text-navy-900 flex items-center gap-1.5">
                            <span>{msg.nama}</span>
                            {msg.status === 'Baru' && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex flex-col sm:flex-row sm:gap-2">
                            <span>{msg.email}</span>
                            {msg.telepon && msg.telepon !== '-' && (
                              <span className="text-royal-600 font-semibold">{msg.telepon}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori & Subjek */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 mb-1">
                        {msg.kategori}
                      </span>
                      <div className="font-semibold text-navy-900 line-clamp-1 max-w-xs">
                        {msg.subjek || 'Tanpa Subjek'}
                      </div>
                    </td>

                    {/* Cuplikan Pesan */}
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {msg.pesan}
                      </p>
                    </td>

                    {/* Waktu */}
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="font-mono text-[11px]">{msg.ticketNumber}</div>
                      <div className="text-[11px] mt-0.5">{msg.createdAt}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(msg.status)}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(msg)}
                          className="px-2.5 py-1.5 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 font-semibold text-xs transition-colors flex items-center gap-1"
                          title="Buka & Balas Pesan"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Buka</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(msg.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus Pesan"
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
      </Card>

      {/* Detail & Reply Modal */}
      {isDetailOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-navy-900 text-white p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-royal-700 text-white font-semibold">
                    {selectedMessage.ticketNumber}
                  </span>
                  {getStatusBadge(selectedMessage.status)}
                  <span className="text-xs text-slate-300">| {selectedMessage.kategori}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">
                  {selectedMessage.subjek || 'Permohonan Informasi'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">Diterima pada {selectedMessage.createdAt}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Sender Info Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Pengirim Pesan:</div>
                  <div className="text-sm font-bold text-navy-900">{selectedMessage.nama}</div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Email: <strong>{selectedMessage.email || '-'}</strong></span>
                    <span>No. HP/WA: <strong>{selectedMessage.telepon || '-'}</strong></span>
                  </div>
                </div>

                {/* Quick Action Contact Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {selectedMessage.telepon && selectedMessage.telepon !== '-' && (
                    <a
                      href={`https://wa.me/${selectedMessage.telepon.replace(/\D/g, '').replace(/^0/, '62')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat WhatsApp
                    </a>
                  )}
                  {selectedMessage.email && selectedMessage.email !== '-' && (
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Tanggapan Respon SMAN 2 Kalianda: ${encodeURIComponent(selectedMessage.subjek)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-royal-50 hover:bg-royal-100 text-royal-700 text-xs font-bold border border-royal-200 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                  Isi Pesan / Pertanyaan Lengkap:
                </label>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-inner">
                  {selectedMessage.pesan}
                </div>
              </div>

              {/* Previous Reply if available */}
              {selectedMessage.replyText && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Tanggapan / Respon Resmi yang Dicatat
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {selectedMessage.repliedAt}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.replyText}
                  </p>
                  <p className="text-[11px] text-emerald-700 italic pt-1">
                    Dicatat oleh: {selectedMessage.repliedBy || 'Administrator'}
                  </p>
                </div>
              )}

              {/* Reply / Follow-up Action Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Tulis Tindak Lanjut / Balasan Respon:
                </label>
                <textarea
                  rows={3}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Ketikkan ringkasan jawaban, arahan PTSP, atau solusi yang telah diberikan kepada pemohon..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-slate-500">
                    Status akan otomatis berubah menjadi <strong className="text-emerald-700">Dibalas</strong> setelah disimpan.
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDetailOpen(false)}
                      className="text-xs"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      variant="royal"
                      size="sm"
                      icon={Send}
                      className="text-xs font-bold"
                    >
                      Simpan Tindak Lanjut
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="text-base font-bold text-navy-900">Hapus Pesan Masuk?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Pesan ini akan dihapus secara permanen dari daftar permohonan informasi.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
