import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopHeaderBar } from '../components/common/TopHeaderBar';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Modal } from '../components/ui/Modal';
import { Search, MessageSquare, ArrowUpRight } from 'lucide-react';
import { newsData } from '../services/dataService';
import { siteConfig } from '../config/siteConfig';

export function MainLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredNews = searchQuery.trim()
    ? newsData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectNews = (id) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/berita?id=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <TopHeaderBar />

      {/* Main Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Content Routed Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Help Hub */}
      <a
        href={`https://wa.me/62${siteConfig.kontak.whatsapp.replace(/^0/, '')}?text=Halo%20Admin%20${encodeURIComponent(siteConfig.name)},%20saya%20ingin%20konsultasi%20informasi%20sekolah.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-3 sm:px-4 sm:py-3 rounded-full shadow-elevated transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Konsultasi WhatsApp Sekolah"
        title="Tanya Informasi Sekolah via WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-emerald-100 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs sm:text-sm font-bold pr-1">Tanya Sekolah</span>
      </a>

      {/* Quick Search Modal */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Cari Berita & Informasi Sekolah"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Ketik kata kunci (misal: SPMB, OSN, Adiwiyata, Paskibra)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 focus:bg-white"
            />
          </div>

          {/* Search suggestions or results */}
          {searchQuery.trim() ? (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hasil Pencarian ({filteredNews.length})
              </p>
              {filteredNews.length > 0 ? (
                filteredNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectNews(item.id)}
                    className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-royal-600 bg-royal-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h5 className="text-sm font-bold text-navy-900 mt-1 line-clamp-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {item.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  Tidak ditemukan hasil untuk "{searchQuery}".
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-500 space-y-2">
              <p className="font-semibold text-slate-700">Pencarian Populer:</p>
              <div className="flex flex-wrap gap-2">
                {['SPMB Jalur Prestasi', 'OSN Provinsi', 'Sekolah Adiwiyata', 'Paskibra', 'PIXEL Multimedia', 'Dewan Guru'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
