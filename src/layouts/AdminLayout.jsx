import React, { useState } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Award,
  Users,
  Settings,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Database,
  LogOut,
  UserCheck,
  CalendarDays,
  Mail,
} from 'lucide-react';
import { siteConfig } from '@/config';
import { useAuth } from '@/context/AuthContext';
import { useSchoolData } from '@/services';

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { messages } = useSchoolData();
  const unreadMessagesCount = messages.filter((m) => m.status === 'Baru').length;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Kelola Berita', href: '/admin/berita', icon: Newspaper },
    { name: 'Ekstrakurikuler', href: '/admin/ekstrakurikuler', icon: Award },
    { name: 'Pendaftar PPDB', href: '/admin/ppdb', icon: Users, exact: true },
    { name: 'Manajemen PPDB & SPMB', href: '/admin/ppdb-settings', icon: CalendarDays },
    { name: 'Pesan & Informasi', href: '/admin/pesan', icon: Mail, badge: unreadMessagesCount },
    { name: 'Pengaturan & Demo', href: '/admin/pengaturan', icon: Settings },
  ];

  const isRouteActive = (item) => {
    if (item.exact) return location.pathname === item.href;
    return location.pathname === item.href || location.pathname.startsWith(item.href + '/');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin') return 'Ringkasan Dashboard';
    if (location.pathname.startsWith('/admin/berita')) return 'Manajemen Berita & Artikel';
    if (location.pathname.startsWith('/admin/ekstrakurikuler')) return 'Manajemen Ekstrakurikuler';
    if (location.pathname.startsWith('/admin/ppdb-settings')) return 'Manajemen PPDB & SPMB';
    if (location.pathname.startsWith('/admin/ppdb')) return 'Data Pendaftar PPDB Masuk';
    if (location.pathname.startsWith('/admin/pesan')) return 'Pesan Masuk & Permohonan Informasi';
    if (location.pathname.startsWith('/admin/pengaturan')) return 'Pengaturan Sistem & Demo';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen lg:h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800 font-sans lg:overflow-hidden">
      {/* Sidebar for Desktop - Fixed & Stationary */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-navy-900 text-white shrink-0 shadow-xl border-r border-navy-800 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto">
        {/* Brand Header */}
        <div className="h-18 p-5 border-b border-navy-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-600 flex items-center justify-center font-black text-white text-base shadow-sm">
              S2
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight text-white leading-tight">
                {siteConfig.name}
              </h2>
              <span className="text-[11px] font-semibold text-royal-300 uppercase tracking-wider">
                Portal Admin
              </span>
            </div>
          </div>
        </div>

        {/* Demo Status Indicator */}
        <div className="mx-4 mt-4 p-2.5 rounded-lg bg-navy-800/80 border border-navy-700/60 flex items-center gap-2 text-xs text-slate-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
          <span>Mode Demo: <strong>LocalStorage</strong></span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item);

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-royal-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {Boolean(item.badge) && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-navy-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-royal-600 flex items-center justify-center font-bold text-white text-xs">
            S2
          </div>
          <div>
            <span className="font-bold text-sm block leading-tight">{siteConfig.name}</span>
            <span className="text-[10px] text-royal-300 block">Portal Admin</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-navy-800 text-slate-200 hover:text-white"
          aria-label="Buka Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 text-white border-b border-navy-800 px-4 py-3 space-y-1 shadow-lg">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item);

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-royal-600 text-white' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {Boolean(item.badge) && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
          
          <div className="pt-3 mt-2 border-t border-navy-800 space-y-2 text-xs">
            <div className="flex items-center justify-between px-1">
              <span className="text-slate-300 text-[11px] font-semibold">
                {user?.name || 'Admin Humas'}
              </span>
              <span className="text-royal-400 text-[10px]">{user?.role || 'Pengelola'}</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-3 rounded-lg bg-navy-800 text-royal-300 text-xs font-medium"
              >
                Buka Web Publik
              </Link>
              <button
                type="button"
                onClick={handleLogoutClick}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-500/20 text-red-300 text-xs font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:h-screen lg:overflow-hidden">
        {/* Top Navbar - Sticky Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs shrink-0 sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-navy-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-slate-500">
              Kelola dan perbarui konten website sekolah secara mandiri
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* User Profile Badge */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="w-7 h-7 rounded-full bg-royal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="text-left">
                <span className="font-bold text-slate-800 block text-xs leading-tight">
                  {user?.name || 'Administrator Humas & TI'}
                </span>
                <span className="text-[10px] text-royal-600 font-semibold block leading-tight">
                  {user?.role || 'Super Admin CMS'}
                </span>
              </div>
            </div>

            {/* Buka Web Publik Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-royal-50 hover:text-royal-700 hover:border-royal-300 text-slate-700 text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-royal-600" />
              <span>Buka Web Publik</span>
            </Link>

            {/* Keluar Portal CMS Button */}
            <button
              type="button"
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-colors"
              title="Keluar dari sesi portal pengelola"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">Keluar Portal CMS</span>
            </button>
          </div>
        </header>

        {/* Dynamic Outlet Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Modal Dialog Konfirmasi Keluar (Logout) yang Estetik */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl shadow-navy-950/30 border border-slate-100 relative overflow-hidden space-y-4">
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600"></div>

            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-red-50/60">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="pr-6">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                  Keluar dari Portal Pengelola?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Sesi kerja Anda saat ini akan diakhiri. Pastikan semua artikel, berita, atau data PPDB telah disimpan sebelum keluar.
                </p>
              </div>
            </div>

            {/* Active session info box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800 text-xs truncate">
                  {user?.name || 'Administrator Humas'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {user?.role || 'Staf Pengelola CMS'} • {siteConfig.name}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-md shadow-red-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Ya, Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
