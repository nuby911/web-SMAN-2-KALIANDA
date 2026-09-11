import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Users,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import {
  useSchoolData,
  createExtracurricular,
  updateExtracurricular,
  deleteExtracurricular
} from '@/services';
import { Modal, Toast, ImageUploadPicker } from '@/components';

export default function ManageExtracurricular() {
  const { extracurriculars } = useSchoolData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentId, setCurrentId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const initialFormState = {
    name: '',
    category: 'Olahraga',
    lead: 'Guru Pembina SMANDAKA',
    schedule: 'Jumat, 15.30 - 17.00 WIB',
    location: 'Area Sekolah SMAN 2 Kalianda',
    membersCount: 35,
    thumbnail: 'https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/698ff896e9240WhatsApp_Image_2026-02-14_at_11.20.43.jpeg',
    desc: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const categories = [
    'Semua',
    'Multimedia & Konten Kreator',
    'Kepemimpinan & Bela Negara',
    'Kepemimpinan & Sosial',
    'Kesehatan & Kepedulian Sosial',
    'Olahraga Bela Diri',
    'Olahraga',
    'Keagamaan & Karakter',
    'Seni & Tradisi Budaya'
  ];

  const filteredItems = extracurriculars.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.lead && item.lead.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
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
      name: item.name,
      category: item.category,
      lead: item.lead,
      schedule: item.schedule,
      location: item.location,
      membersCount: item.membersCount || 30,
      thumbnail: item.thumbnail,
      desc: item.desc,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus ekstrakurikuler: "${name}"?`)) {
      deleteExtracurricular(id);
      setToastMessage({
        title: 'Berhasil Dihapus',
        message: `Ekstrakurikuler "${name}" telah dihapus.`,
        type: 'success',
      });
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Nama ekstrakurikuler wajib diisi';
    if (!formData.desc.trim()) err.desc = 'Deskripsi kegiatan wajib diisi';
    if (!formData.thumbnail.trim()) err.thumbnail = 'URL thumbnail wajib diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (modalMode === 'create') {
      createExtracurricular(formData);
      setToastMessage({
        title: 'Berhasil Ditambahkan',
        message: 'Ekstrakurikuler baru berhasil ditambahkan dan aktif di web publik.',
        type: 'success',
      });
    } else {
      updateExtracurricular(currentId, formData);
      setToastMessage({
        title: 'Perubahan Disimpan',
        message: 'Data ekstrakurikuler telah diperbarui.',
        type: 'success',
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900 tracking-tight">
            Daftar Ekstrakurikuler ({extracurriculars.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data organisasi siswa, pembina, jadwal kegiatan, dan dokumentasi
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Ekstrakurikuler
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama ekskul atau pembina..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 font-semibold shrink-0">Kategori Bidang:</span>
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left border-collapse text-xs table-fixed">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 w-[32%]">Ekstrakurikuler</th>
                <th className="py-3.5 px-4 w-[18%]">Bidang</th>
                <th className="py-3.5 px-4 w-[24%]">Pembina & Anggota</th>
                <th className="py-3.5 px-4 w-[18%]">Jadwal & Tempat</th>
                <th className="py-3.5 px-4 w-[8%] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Tidak ditemukan ekstrakurikuler yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 pr-2">
                          <h4 className="font-bold text-navy-900 text-xs truncate leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 align-middle">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle text-slate-600">
                      <div className="font-semibold text-slate-800 truncate">{item.lead || '-'}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>±{item.membersCount || 30} Siswa Aktif</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 align-middle text-slate-600">
                      <div className="flex items-center gap-1 font-semibold text-slate-700 truncate">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.schedule}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-royal-600 hover:bg-royal-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="/ekstrakurikuler"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Lihat di Web Publik"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
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

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tambah Ekstrakurikuler Baru' : 'Sunting Ekstrakurikuler'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Ekstrakurikuler <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: PIXEL SMAN 2 KALIANDA"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.name && <p className="text-[11px] text-rose-600 mt-0.5">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bidang / Kategori</label>
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
              <label className="block font-bold text-slate-700 mb-1">Nama Pembina / Pelatih</label>
              <input
                type="text"
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block font-bold text-slate-700 mb-1">Estimasi Anggota</label>
              <input
                type="number"
                placeholder="35"
                value={formData.membersCount}
                onChange={(e) => setFormData({ ...formData, membersCount: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block font-bold text-slate-700 mb-1">Jadwal Latihan</label>
              <input
                type="text"
                placeholder="Jumat, 15.30 WIB"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block font-bold text-slate-700 mb-1">Lokasi Latihan</label>
              <input
                type="text"
                placeholder="Lapangan Utama"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          {/* Foto Dokumentasi dengan dukungan upload galeri HP/laptop & galeri sekolah */}
          <ImageUploadPicker
            label="Foto Dokumentasi Ekstrakurikuler"
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

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Deskripsi Singkat Kegiatan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan tujuan dan kegiatan utama ekstrakurikuler..."
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.desc ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.desc && <p className="text-[11px] text-rose-600 mt-0.5">{errors.desc}</p>}
          </div>

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
              Simpan Data
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast with auto-dismiss */}
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
