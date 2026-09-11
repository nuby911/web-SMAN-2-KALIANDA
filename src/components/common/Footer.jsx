import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Clock, ArrowRight, Instagram, Youtube, Facebook } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: Brand Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center border border-slate-700 overflow-hidden shrink-0 shadow-md">
                {siteConfig.logoUrl ? (
                  <img
                    src={siteConfig.logoUrl}
                    alt={`Logo ${siteConfig.name}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Shield className="w-6 h-6 text-amber-400" />
                )}
              </div>
              <div>
                <span className="block font-black text-base tracking-tight text-white uppercase">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {siteConfig.akreditasi.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Membina generasi religius, cerdas, berkarakter luhur, dan berwawasan lingkungan dengan semangat kearifan lokal Sakai Sambaiyan.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.sosmed.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-royal-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.sosmed.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-royal-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.sosmed.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-royal-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-royal-500 pl-3">
              Tautan Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Beranda Utama</span>
                </Link>
              </li>
              <li>
                <Link to="/profil" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Profil & Visi Misi</span>
                </Link>
              </li>
              <li>
                <Link to="/profil" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Tabel Informasi Sekolah</span>
                </Link>
              </li>
              <li>
                <Link to="/ekstrakurikuler" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Kegiatan Ekstrakurikuler</span>
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Warta & Berita Kegiatan</span>
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-royal-500" />
                  <span>Dokumentasi Galeri</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan PPDB & Akademik */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-emerald-500 pl-3">
              Layanan PPDB & Siswa
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ppdb" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Informasi Alur PPDB</span>
                </Link>
              </li>
              <li>
                <Link to="/ppdb" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Formulir Pendaftaran Online</span>
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Layanan Pengaduan & FAQ</span>
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/62${siteConfig.kontak.whatsapp.replace(/^0/, '')}?text=Halo%20Admin%20PPDB%20${encodeURIComponent(siteConfig.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-3.5 py-2 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition-colors text-xs font-semibold"
                >
                  <span>WhatsApp Panitia PPDB</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi Kontak & Lokasi */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-amber-500 pl-3">
              Kantor & Kontak Resmi
            </h4>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{siteConfig.kontak.alamat}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.kontak.telepon} / {siteConfig.kontak.whatsapp}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.kontak.email}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.kontak.jamKerja}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <Link to="/kontak" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</Link>
            <span>•</span>
            <Link to="/kontak" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
