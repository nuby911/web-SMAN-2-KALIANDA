import React from 'react';
import { Users, GraduationCap, Building2, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { siteConfig } from '../../config/siteConfig';

export function StatsWidget() {
  const stats = [
    {
      id: 1,
      value: siteConfig.stats.siswaAktif,
      label: "Peserta Didik Aktif",
      subtext: `Terbagi dalam ${siteConfig.rombel}`,
      icon: Users,
    },
    {
      id: 2,
      value: siteConfig.stats.guruStaff,
      label: "Dewan Guru & Tenaga Kependidikan",
      subtext: "Pendidik profesional bersertifikasi & berdedikasi",
      icon: GraduationCap,
    },
    {
      id: 3,
      value: "2,6 Ha",
      label: "Kawasan Sekolah Hijau",
      subtext: "Lahan asri 26.000 m² berpredikat Sekolah Adiwiyata",
      icon: Building2,
    },
    {
      id: 4,
      value: siteConfig.stats.persentasePtn,
      label: "Tingkat Kelulusan & Lolos PTN",
      subtext: "Alumni diterima di PTN favorit dan sekolah kedinasan",
      icon: Award,
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.id} className="p-6 border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-800 flex items-center justify-center mb-4">
                    <IconComponent className="w-5 h-5 text-navy-700" />
                  </div>

                  <div className="text-3xl font-black text-navy-900 tracking-tight">
                    {item.value}
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mt-1.5 mb-1">
                    {item.label}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
