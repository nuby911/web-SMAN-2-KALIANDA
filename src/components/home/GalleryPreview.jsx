import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, Eye, X } from 'lucide-react';
import { galleryData } from '../../services/dataService';
import { Button } from '../ui/Button';

export function GalleryPreview() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="py-16 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              Dokumentasi Kampus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Galeri Kegiatan & Fasilitas
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Potret aktivitas belajar mengajar, sarana modern, dan dinamika prestasi siswa.
            </p>
          </div>

          <Link to="/galeri">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="font-bold">
              Buka Galeri Lengkap
            </Button>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-soft border border-slate-200/80 bg-slate-100"
            >
              <img
                src={item.url}
                alt={`${item.title} — ${item.category}`}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Eye Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-royal-600/90 px-2 py-0.5 rounded text-white mb-1.5">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold leading-snug line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-elevated">
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-royal-50 text-royal-700 border border-royal-200">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activePhoto.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-1">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-600">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
