import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useSchoolData, createNews, updateNews, deleteNews } from '@/services';
import { Modal, Toast, ImageUploadPicker } from '@/components';

export default function ManageNews() {
  const { news } = useSchoolData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [currentId, setCurrentId] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const initialFormState = {
    title: '',
    category: 'Akademik',
    author: 'Humas SMAN 2 Kalianda',
    readTime: '3 menit baca',
    thumbnail: 'https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6a99f6b75f05dWhatsApp_Image_2026-09-03_at_10.56.06.jpeg',
    excerpt: '',
    content: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const categories = [
    'Semua',
    'Akademik',
    'Prestasi',
    'Kegiatan Siswa',
    'Lingkungan Hidup',
    'Keagamaan',
    'Pengumuman'
  ];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setModalMode('create');
    setCurrentId(null);
    setFormData(initialFormState);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      author: item.author,
      readTime: item.readTime || '3 menit baca',
      thumbnail: item.thumbnail,
      excerpt: item.excerpt,
      content: item.content,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Yakin ingin menghapus berita: "${title}"?`)) {
      deleteNews(id);
      setToastMessage({ title: 'Berhasil', message: 'Berita berhasil dihapus.', type: 'success' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Judul berita wajib diisi';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Ringkasan berita wajib diisi';
    if (!formData.content.trim()) newErrors.content = 'Konten lengkap berita wajib diisi';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'URL Foto wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (modalMode === 'create') {
      createNews(formData);
      setToastMessage({
        title: 'Berhasil Terbit',
        message: 'Berita baru telah ditambahkan dan tayang di website publik.',
        type: 'success',
      });
    } else {
      updateNews(currentId, formData);
      setToastMessage({
        title: 'Berhasil Diperbarui',
        message: 'Perubahan berita telah tersimpan.',
        type: 'success',
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900 tracking-tight">
            Katalog Berita & Artikel ({news.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tambah, sunting, atau hapus publikasi berita sekolah
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Berita Baru
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul berita atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 font-semibold shrink-0">Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500 shrink-0"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left border-collapse text-xs table-fixed">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 w-[46%]">Info Berita</th>
                <th className="py-3.5 px-4 w-[16%]">Kategori</th>
                <th className="py-3.5 px-4 w-[26%]">Tanggal & Penulis</th>
                <th className="py-3.5 px-4 w-[12%] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Tidak ditemukan berita dengan kata kunci tersebut.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-md">
                          <h4 className="font-bold text-navy-900 text-xs line-clamp-1 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-royal-50 text-royal-700 border border-royal-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                      <div className="font-semibold text-slate-700">{item.date}</div>
                      <div className="text-[10px] text-slate-400">{item.author}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-royal-600 hover:bg-royal-50 transition-colors"
                          title="Edit Berita"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <a
                          href={`/berita?id=${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Lihat di Web"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Berita */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tambah Berita Baru' : 'Sunting Berita'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Judul */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Judul Berita <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: SMAN 2 Kalianda Raih Juara 1 Olimpiade..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.title ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.title && <p className="text-[11px] text-rose-600 mt-0.5">{errors.title}</p>}
          </div>

          {/* Grid Kategori & Penulis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-royal-500"
              >
                {categories.filter((c) => c !== 'Semua').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Penulis / Tim Humas</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          {/* Foto / Thumbnail dengan pilihan Upload dari Galeri HP/Laptop & Galeri Sekolah */}
          <ImageUploadPicker
            label="Foto / Thumbnail Berita"
            value={formData.thumbnail}
            onChange={(url) => {
              setFormData({ ...formData, thumbnail: url });
              if (errors.thumbnail) {
                setErrors({ ...errors, thumbnail: null });
              }
            }}
            error={errors.thumbnail}
            required
            helperText="Bisa upload dari galeri perangkat Anda, pilih foto sekolah, atau masukkan URL."
          />

          {/* Ringkasan */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Ringkasan Singkat (Excerpt) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="Ringkasan 1-2 kalimat yang tampil di kartu berita..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.excerpt ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.excerpt && <p className="text-[11px] text-rose-600 mt-0.5">{errors.excerpt}</p>}
          </div>

          {/* Konten Lengkap */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Isi Konten Berita Lengkap <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Tulis artikel atau berita lengkap di sini..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.content ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.content && <p className="text-[11px] text-rose-600 mt-0.5">{errors.content}</p>}
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              {modalMode === 'create' ? 'Simpan & Publikasikan' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </Modal>

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
