import React from 'react';
import { BookOpen, Trophy, Leaf, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

export function ProgramsSection() {
  const programs = [
    {
      id: 1,
      title: "Model Pembelajaran Mendalam & KKA",
      category: "Inovasi Kurikulum",
      desc: "SMAN 2 Kalianda menjadi Sekolah Model Pembelajaran Mendalam (PM), Koding, dan Kecerdasan Artifisial (KKA) dengan pendekatan analitis dan berbasis pemecahan masalah riil.",
      icon: BookOpen,
      iconColor: "text-royal-600 bg-royal-50",
      accent: "border-royal-200",
    },
    {
      id: 2,
      title: "SPMB Jalur Prestasi Sekolah Unggul",
      category: "Standar Keunggulan Provinsi",
      desc: "Sebagai Sekolah Unggul Provinsi Lampung, SMAN 2 Kalianda membuka jalur penerimaan khusus siswa berprestasi di bidang akademik, sains, olahraga, seni budaya, dan keagamaan.",
      icon: Trophy,
      iconColor: "text-amber-600 bg-amber-50",
      accent: "border-amber-200",
    },
    {
      id: 3,
      title: "Sekolah Adiwiyata & Sakai Sambaiyan",
      category: "Karakter & Lingkungan Hidup",
      desc: "Integrasi pendidikan kelestarian lingkungan di lahan asri 2,6 hektar berpadu dengan kearifan lokal gotong royong Sakai Sambaiyan guna menumbuhkan kepedulian sosial tinggi.",
      icon: Leaf,
      iconColor: "text-emerald-600 bg-emerald-50",
      accent: "border-emerald-200",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-royal-50 text-royal-700 border border-royal-200 mb-3">
            Program Unggulan Sekolah
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            Pilar Keunggulan SMAN 2 Kalianda
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Mengintegrasikan kurikulum modern, literasi digital dan koding, serta kearifan lokal Lampung untuk mencetak generasi berkarakter juara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const IconComp = prog.icon;
            return (
              <Card key={prog.id} className={`p-6 border ${prog.accent} flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${prog.iconColor}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {prog.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to="/profil"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 hover:text-navy-900 transition-colors"
                  >
                    <span>Pelajari Profil & Fasilitas</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
