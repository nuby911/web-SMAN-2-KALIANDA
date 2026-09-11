import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Trophy, Leaf, FileText, Globe, GraduationCap, MapPin, Cpu, Users, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSchoolData } from '../../services/dataService';
import { Button } from '../ui/Button';

export function HeroSection() {
  const { ppdbInfo } = useSchoolData();
  const announcementText =
    ppdbInfo?.announcement || 'SPMB Jalur Prestasi Sekolah Unggul 2026 Dibuka. Segera daftarkan diri Anda';
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Official Badges Trio - Desktop/Tablet only, hidden on mobile so it doesn't block the headline */}
        <div className="hidden sm:flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Sekolah Unggul Provinsi Lampung
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-royal-600" />
            Akreditasi A Unggul (BAN-S/M)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Sekolah Adiwiyata Provinsi Lampung
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Desktop SPMB Announcement Pill */}
            <Link
              to="/ppdb"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/90 border border-amber-200 text-amber-900 text-xs font-semibold transition-all shadow-xs group cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
              <span>{announcementText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-snug sm:leading-[1.15]">
              {siteConfig.tagline}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              {siteConfig.shortDesc}
            </p>

            {/* CTA Buttons - Full Width on Mobile, Auto on Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto">
              <Link to="/ppdb" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  icon={FileText}
                  className="w-full sm:w-auto justify-center bg-navy-800 hover:bg-navy-900 font-bold py-3"
                >
                  Pendaftaran SPMB 2026/2027
                </Button>
              </Link>
              <Link to="/profil" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-white hover:bg-slate-50 font-bold border-slate-300 text-slate-800 py-3"
                >
                  Profil SMAN 2 Kalianda
                </Button>
              </Link>
            </div>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-semibold text-slate-500 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-slate-400" />
                NPSN: {siteConfig.npsn}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                Model Pembelajaran Mendalam & KKA
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                Kedaton, Kalianda, Lampung Selatan
              </span>
            </div>

            {/* Mobile Only: Badges & Status relocated here so they don't block the top of the page */}
            <div className="sm:hidden pt-4 border-t border-slate-200/80 space-y-2.5">
              <Link
                to="/ppdb"
                className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-200 text-amber-900 text-xs font-semibold w-full transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                  <span className="truncate">{announcementText}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              </Link>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Sekolah Unggul Provinsi Lampung
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                  Akreditasi A Unggul (BAN-S/M)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white text-navy-800 border border-slate-200 shadow-xs">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Sekolah Adiwiyata Provinsi Lampung
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-soft border border-slate-200 bg-white">
              {/* Campus Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-navy-900">
                <img
                  src="https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e64196bc720250513_085627.jpg"
                  alt={`Gedung ${siteConfig.name}`}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=900";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                {/* Clean Top Badge */}
                <div className="absolute top-4 right-4 bg-navy-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md border border-navy-700 shadow-xs">
                  Kawasan Asri 2,6 Hektar
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-royal-300">
                    SMA NEGERI 2 KALIANDA
                  </span>
                  <h4 className="text-base font-bold leading-snug text-white mt-0.5">
                    Membina Generasi Religius & Berbudaya Lingkungan
                  </h4>
                </div>
              </div>

              {/* Bottom Feature Duo */}
              <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-slate-50 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-royal-50 flex items-center justify-center text-royal-600 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">Lab Koding & KKA</h5>
                    <p className="text-[11px] text-slate-500">Sekolah Model Lampung</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">Sakai Sambaiyan</h5>
                    <p className="text-[11px] text-slate-500">Gotong Royong & Karakter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
