import React, { useState, useEffect, useCallback } from 'react';
import { galleryData } from '@/services';
import { siteConfig } from '@/config';
import { Badge, PageHero } from '@/components';
import { Image as ImageIcon, Eye, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = ['Semua', 'Profil', 'Fasilitas', 'Kegiatan', 'Prestasi'];

  const filteredGallery = galleryData.filter(
    (item) => selectedCategory === 'Semua' || item.category === selectedCategory
  );

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
    }
  };

  const activePhoto = activeIndex !== null ? filteredGallery[activeIndex] : null;

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (activeIndex === null) return;
    if (e.key === 'ArrowLeft') handlePrev(e);
    else if (e.key === 'ArrowRight') handleNext(e);
    else if (e.key === 'Escape') setActiveIndex(null);
  }, [activeIndex, filteredGallery.length]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        badge="Dokumentasi Visual & Kegiatan"
        title="Galeri Foto & Memori Kampus SMANDAKA"
        subtitle={`Dokumentasi visual dinamika kegiatan belajar, peringatan hari besar, fasilitas pendidikan, dan kebersamaan warga ${siteConfig.name}.`}
        bgImage="https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/6969b78651a0d__MG_4669.JPG"
        chips={['Arsip Kegiatan Resmi', 'Dokumentasi Kampus Hijau 2,6 Ha', 'Pentas Seni & Prestasi']}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-soft max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-800 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-soft border border-slate-200/80 bg-slate-100"
            >
              <img
                src={item.url}
                alt={`${item.title} — ${item.category}`}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

              {/* View Trigger */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-5 h-5" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-royal-600/90 px-2.5 py-0.5 rounded text-white">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2 text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Lightbox Modal with Next / Prev */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-md p-3 sm:p-6 select-none"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all z-20"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all z-20"
            aria-label="Foto Berikutnya"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Content Card */}
          <div
            className="max-w-4xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[60vh] sm:max-h-[68vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[60vh] sm:max-h-[68vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-white">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-royal-50 text-royal-700 border border-royal-200">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activePhoto.date}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {activeIndex + 1} dari {filteredGallery.length}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-navy-900 mb-1">
                {activePhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
