import React, { useState } from 'react';
import { useSchoolData } from '@/services';
import { siteConfig } from '@/config';
import { Card, Badge, PageHero } from '@/components';
import { Trophy, Clock, MapPin, User, Users, Search } from 'lucide-react';

export default function ExtracurricularPage() {
  const { extracurriculars } = useSchoolData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = extracurriculars.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.lead && item.lead.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Dedicated SMAN 2 Kalianda Extracurricular Hero */}
      <PageHero
        badge="Pengembangan Bakat & Karakter"
        title={`Ekstrakurikuler & Prestasi Siswa ${siteConfig.name}`}
        subtitle="Wadah pembinaan minat, bakat, kepemimpinan tegap, dan sportivitas peserta didik SMANDAKA dengan rekam jejak kejuaraan taekwondo, Paskibra, PMR, pramuka, dan studio multimedia PIXEL."
        bgImage="https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969ee131f438IMG-20231106-WA0018.jpg"
        chips={[
          "8+ Cabang Ekstrakurikuler Aktif",
          "Juara Taekwondo KONI Cup 2026",
          "Pengirim Paskibraka Lampung Selatan",
          "Studio PIXEL & Konten Kreator"
        ]}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Search Bar Panel */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari nama ekstrakurikuler, pembina, atau bidang kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          {/* Total Results Counter */}
          <span className="text-xs font-semibold text-slate-500 shrink-0">
            Menampilkan {filteredItems.length} dari {extracurriculars.length} ekstrakurikuler
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col justify-between border-slate-200">
              <div>
                {/* Photo with Overlay Category */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="md">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Operational Details */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                      <span>{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                      <span className="font-semibold text-slate-700">Pembina: {item.lead}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  {item.achievements?.length > 0 && (
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        Prestasi Terbaru:
                      </span>
                      <ul className="space-y-1">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {item.membersCount} Anggota Aktif
                </span>
                <span className="text-emerald-700 font-bold">Pendaftaran Terbuka</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
