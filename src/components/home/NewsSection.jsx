import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight, User, Clock, ChevronRight } from 'lucide-react';
import { useSchoolData } from '@/services';
import { Card, Button, Modal, Badge } from '@/components';

export function NewsSection() {
  const { news } = useSchoolData();
  const [selectedNews, setSelectedNews] = useState(null);

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Prestasi':
        return 'emerald';
      case 'Pengumuman':
        return 'amber';
      case 'Akademik':
        return 'royal';
      default:
        return 'slate';
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-royal-50 text-royal-700 border border-royal-200 mb-2">
              <Newspaper className="w-3.5 h-3.5 text-royal-600" />
              Warta & Agenda Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Berita & Kegiatan Terkini
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Ikuti kabar pencapaian siswa, pengumuman resmi, dan dinamika kegiatan kampus.
            </p>
          </div>

          <Link to="/berita">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="font-bold">
              Lihat Semua Berita
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col justify-between border-slate-200">
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} — ${item.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={getCategoryBadge(item.category)} size="md">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy-900 line-clamp-2 leading-snug mb-2 hover:text-royal-600 cursor-pointer transition-colors"
                      onClick={() => setSelectedNews(item)}>
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Oleh {item.author}
                </span>
                <button
                  onClick={() => setSelectedNews(item)}
                  className="text-xs font-bold text-royal-600 hover:text-navy-900 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.category || 'Berita Sekolah'}
        maxWidth="max-w-3xl"
      >
        {selectedNews && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-snug">
              {selectedNews.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-royal-600" />
                {selectedNews.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-royal-600" />
                {selectedNews.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-royal-600" />
                {selectedNews.readTime}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-80 w-full shadow-soft">
              <img
                src={selectedNews.thumbnail}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-2">
              {selectedNews.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedNews(null)}>
                Tutup Artikel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
