import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSchoolData } from '@/services';
import { siteConfig } from '@/config';
import { Card, Badge, Button, Modal, PageHero } from '@/components';
import { Search, Calendar, User, Clock, ChevronRight, Newspaper, Share2, Check } from 'lucide-react';

export default function NewsPage() {
  const { news } = useSchoolData();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeArticle, setActiveArticle] = useState(null);
  const [copied, setCopied] = useState(false);

  // Check if an article id was passed in the URL (e.g. ?id=1)
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && news.length > 0) {
      const found = news.find((n) => n.id === parseInt(idParam, 10));
      if (found) setActiveArticle(found);
    }
  }, [searchParams, news]);

  const categories = ['Semua', 'Akademik', 'Prestasi', 'Kegiatan Siswa', 'Lingkungan Hidup', 'Keagamaan', 'Pengumuman'];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = news[0] || null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        badge="Warta & Publikasi Resmi"
        title="Berita & Agenda Kegiatan SMAN 2 Kalianda"
        subtitle={`Pusat informasi resmi, siaran pers humas, laporan prestasi siswa, dan publikasi agenda akademik ${siteConfig.name}.`}
        bgImage="https://storage.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/galeri/696c44598cae9_DSC09066.jpg"
        chips={['Rilis Resmi Humas', 'Sekolah Model PM & KKA', 'Prestasi Akademik & Ekskul']}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Article Banner */}
        {featured && (
          <div
            onClick={() => setActiveArticle(featured)}
            className="group relative rounded-3xl overflow-hidden shadow-elevated border border-slate-200 cursor-pointer bg-navy-900"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
              <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy-950 via-transparent to-transparent opacity-80" />
              </div>

              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-navy-950 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-amber-500 text-navy-950 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Sorotan Utama
                    </span>
                    <span className="text-xs text-slate-400">
                      {featured.date}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black leading-snug group-hover:text-amber-300 transition-colors">
                    {featured.title}
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-navy-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Oleh {featured.author}
                  </span>
                  <span className="text-xs font-bold text-amber-400 inline-flex items-center gap-1">
                    <span>Baca Liputan Lengkap</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Cari berdasarkan judul atau konten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Menampilkan {filteredNews.length} artikel
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col justify-between border-slate-200">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="md">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(item)}
                    className="text-base font-bold text-navy-900 leading-snug line-clamp-2 cursor-pointer hover:text-royal-600 transition-colors"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 mt-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {item.author}
                </span>
                <button
                  onClick={() => setActiveArticle(item)}
                  className="font-bold text-royal-600 hover:text-navy-900 inline-flex items-center gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>

      {/* Article Detail Reader Modal */}
      <Modal
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        title={activeArticle?.category || 'Berita Sekolah'}
        maxWidth="max-w-3xl"
      >
        {activeArticle && (
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-snug">
              {activeArticle.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <User className="w-4 h-4 text-royal-600" />
                  {activeArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-royal-600" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-royal-600" />
                  {activeArticle.readTime}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-96 w-full shadow-soft">
              <img
                src={activeArticle.thumbnail}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setActiveArticle(null)}>
                Tutup Jendela
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
