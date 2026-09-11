import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Button';

export function PrincipalWelcome() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-10 border border-slate-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Photo & Credentials */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-elevated border-4 border-white mb-4 bg-slate-100">
              <img
                src={siteConfig.kepalaSekolah.foto}
                alt={siteConfig.kepalaSekolah.nama}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
            </div>

            <h4 className="text-lg font-bold text-navy-900">
              {siteConfig.kepalaSekolah.nama}
            </h4>
            <p className="text-xs font-semibold text-royal-600 mb-1">
              Kepala {siteConfig.name}
            </p>
            <span className="text-[11px] text-slate-400 font-mono">
              NIP: {siteConfig.kepalaSekolah.nip}
            </span>
          </div>

          {/* Right Column: Statement & Vision */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              <Quote className="w-3.5 h-3.5 text-amber-600" />
              <span>Prakata Kepala Sekolah</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-snug">
              Membangun Generasi Emas dengan Semangat Sakai Sambaiyan
            </h2>

            <blockquote className="text-slate-600 text-base leading-relaxed italic border-l-4 border-royal-500 pl-4">
              "{siteConfig.kepalaSekolah.sambutan}"
            </blockquote>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sekolah Unggul Provinsi Lampung</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nilai Sakai Sambaiyan & Karakter Religius</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sekolah Adiwiyata Berbudaya Lingkungan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Model Pembelajaran Mendalam & Koding (KKA)</span>
              </div>
            </div>

            <div className="pt-3">
              <Link to="/profil">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="font-bold">
                  Baca Profil SMAN 2 Kalianda Selengkapnya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
