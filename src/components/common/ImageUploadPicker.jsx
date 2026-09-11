import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link2, X, Check } from 'lucide-react';
import { galleryData } from '@/services';
import { Modal } from '@/components';

/**
 * Utility to compress image file using HTML5 Canvas
 * Keeps base64 strings lightweight (< 150KB) so localStorage is never exhausted.
 */
function compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
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
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function ImageUploadPicker({
  value,
  onChange,
  error,
  label = 'Foto / Thumbnail',
  required = false,
  helperText = 'Bisa upload dari galeri perangkat Anda, pilih dari galeri sekolah, atau tautan web.',
}) {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('Semua');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Semua', 'Kegiatan', 'Fasilitas', 'Profil', 'Prestasi'];

  const filteredSchoolGallery = galleryData.filter(
    (item) => selectedGalleryCategory === 'Semua' || item.category === selectedGalleryCategory
  );

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WEBP, dll).');
      return;
    }

    try {
      setIsCompressing(true);
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Gagal memproses gambar. Silakan coba gambar lain.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSelectFromSchoolGallery = (url) => {
    onChange(url);
    setIsGalleryModalOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-700 text-xs">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {helperText && <span className="text-[10px] text-slate-400">{helperText}</span>}
      </div>

      {/* When an image is selected: Show Preview Box */}
      {value ? (
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-3 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-slate-200 border border-slate-300/80 shrink-0">
            <img
              src={value}
              alt="Pratinjau Foto"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=900';
              }}
            />
          </div>

          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-700 font-bold">
              <Check className="w-4 h-4" />
              <span>Gambar Berhasil Dipilih</span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1 break-all">
              {value.startsWith('data:') ? 'Foto dari Galeri Perangkat (File)' : value}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-royal-600" />
                <span>Ganti dari Galeri HP/Laptop</span>
              </button>

              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Pilih Galeri Sekolah</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                title="Hapus Gambar"
              >
                <X className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* When NO image is selected: Interactive Upload & Selection Cards */
        <div className="space-y-2.5">
          {/* Action Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 1. Upload from Device Gallery */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 border-dashed border-royal-300 hover:border-royal-500 bg-royal-50/50 hover:bg-royal-50 text-royal-700 transition-all text-xs font-bold active:scale-98"
            >
              <Upload className="w-4 h-4 text-royal-600" />
              <span>{isCompressing ? 'Memproses Foto...' : 'Upload dari Galeri / File HP'}</span>
            </button>

            {/* 2. Choose from School Media Gallery */}
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(true)}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-slate-700 hover:text-amber-800 transition-all text-xs font-bold active:scale-98"
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Pilih dari Galeri Sekolah ({galleryData.length} Foto)</span>
            </button>
          </div>

          {/* 3. Or Paste URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Link2 className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Atau tempelkan tautan URL gambar web (https://...)"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              } text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white`}
            />
          </div>
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-[11px] text-rose-600 mt-0.5">{error}</p>}

      {/* Modal: School Media Gallery Picker */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title="Pilih Foto dari Galeri Resmi SMAN 2 Kalianda"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          {/* Category Tabs inside Picker */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedGalleryCategory === cat
                    ? 'bg-navy-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto pr-1">
            {filteredSchoolGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectFromSchoolGallery(item.url)}
                className="group relative h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:border-royal-500 hover:shadow-md transition-all"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-royal-600/90 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <p className="text-[10px] font-bold truncate mt-0.5">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Klik foto untuk memilih sebagai gambar postingan</span>
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
