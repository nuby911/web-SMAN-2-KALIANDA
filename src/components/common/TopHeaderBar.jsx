import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, GraduationCap } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export function TopHeaderBar() {
  return (
    <div className="bg-navy-900 text-slate-300 text-xs border-b border-navy-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Contact info */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${siteConfig.kontak.telepon}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-royal-500" />
            <span>{siteConfig.kontak.telepon}</span>
          </a>
          <a
            href={`mailto:${siteConfig.kontak.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-royal-500" />
            <span>{siteConfig.kontak.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-royal-500" />
            <span>Kalianda, Lampung Selatan</span>
          </span>
        </div>

        {/* Quick Portals */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.monitor.sman2kalianda.sch.id/"
            target="_blank"
            rel="noreferrer"
            title="Monitoring Absensi Siswa SMAN 2 Kalianda"
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Monitoring Absensi</span>
          </a>
          <Link
            to="/admin"
            title="Masuk ke Portal Pengelola CMS"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-royal-400" />
            <span>Portal CMS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
