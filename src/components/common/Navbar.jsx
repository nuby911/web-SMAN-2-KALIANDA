import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ShieldCheck, Search, ChevronRight, PhoneCall, GraduationCap } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Button';

export function Navbar({ onOpenSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change & prevent background scroll when open
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil Sekolah', path: '/profil' },
    { name: 'Ekstrakurikuler', path: '/ekstrakurikuler' },
    { name: 'Berita', path: '/berita' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-2.5 border-b border-slate-200/80'
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & School Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-white p-0.5 border border-slate-200 shadow-md shadow-navy-900/5 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center shrink-0">
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
                <Shield className="w-6 h-6 text-amber-500" />
              )}
            </div>
            <div>
              <span className="block font-black text-lg tracking-tight text-navy-900 uppercase group-hover:text-royal-600 transition-colors">
                {siteConfig.name}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center font-bold text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {siteConfig.akreditasi.grade}
                </span>
                <span className="text-slate-500 font-medium">
                  NPSN: {siteConfig.npsn}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-royal-600 bg-royal-50/80 font-bold'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/80'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Search Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Cari Berita & Agenda (Ctrl+K)"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link to="/ppdb">
              <Button
                variant="primary"
                size="sm"
                className="bg-navy-800 hover:bg-navy-900 shadow-sm font-bold"
              >
                SPMB / PPDB Online
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-navy-900 rounded-lg"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-navy-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-navy-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white shadow-xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-royal-50 text-royal-600 font-bold border-l-4 border-royal-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}

            {/* Quick Portals for Mobile */}
            <div className="pt-3 pb-1 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href="https://www.monitor.sman2kalianda.sch.id/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Absensi</span>
              </a>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-royal-600" />
                <span>Portal CMS</span>
              </Link>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/ppdb" className="w-full">
                <Button variant="primary" className="w-full justify-center py-2.5 bg-navy-800 font-bold">
                  Daftar PPDB / SPMB Online
                </Button>
              </Link>
              <a
                href={`https://wa.me/62${siteConfig.kontak.whatsapp.replace(/^0/, '')}?text=Halo%20Admin%20${encodeURIComponent(siteConfig.name)},%20saya%20ingin%20bertanya%20informasi%20sekolah.`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
