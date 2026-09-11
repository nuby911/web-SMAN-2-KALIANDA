import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Globe,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config';

export default function AdminLogin() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Jika sudah terautentikasi, alihkan langsung ke dashboard admin
  const destination = location.state?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim()) {
      setErrorMessage('Harap masukkan username, email, atau NIP pengelola.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Harap masukkan kata sandi akun pengelola.');
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      setSuccessMessage(`Selamat datang, ${result.user.name}! Mengalihkan ke dashboard...`);
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 500);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-gradient-to-br from-[#0a1b38] via-[#153e75] to-[#4c1d95] font-sans">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-500/25 blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      {/* Main Container Card (Split Layout matching the mockup image) */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl shadow-navy-950/40 overflow-hidden relative z-10 border border-white/30 grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT PANEL: Inner Gradient Card */}
        <div className="lg:col-span-5 p-3 sm:p-4 flex">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1d4ed8] via-[#4338ca] to-[#7e22ce] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-inner">
            {/* Ambient inner card pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top Brand Header */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 p-1.5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                  <img
                    src={siteConfig.logoUrl}
                    alt={siteConfig.name}
                    className="w-full h-full object-contain drop-shadow"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <ShieldCheck className="w-7 h-7 text-amber-300 hidden only-child:block" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">
                    {siteConfig.name}
                  </h3>
                  <span className="text-[11px] font-medium text-blue-200 tracking-wide block">
                    Portal Pengelola CMS
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Welcome Text */}
            <div className="my-8 sm:my-auto relative z-10 space-y-4">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-white/20">
                <span>Sekolah Unggul Prov. Lampung</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Welcome to Portal
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Silakan masuk untuk mengelola portal informasi berita, kesiswaan, ekstrakurikuler, dan layanan PPDB resmi SMAN 2 Kalianda.
              </p>
            </div>

            {/* Bottom Website Link */}
            <div className="relative z-10 pt-4 border-t border-white/15">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-blue-100 hover:text-white transition-colors group"
              >
                <Globe className="w-3.5 h-3.5 text-blue-300 group-hover:rotate-45 transition-transform" />
                <span className="tracking-wide">www.smanegeri2kalianda.sch.id</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Clean Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Form Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Login
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                Portal Manajemen Khusus Staf & Pengelola Sekolah
              </p>
            </div>

            {/* Feedback Banners */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-700 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form Inputs (Minimalist Underline Style matching the mockup image) */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Username */}
              <div className="space-y-1">
                <div className="flex items-center gap-3 border-b-2 border-slate-300 focus-within:border-royal-600 transition-colors pb-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id="admin-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type your username / NIP / email"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div className="space-y-1">
                <div className="flex items-center gap-3 border-b-2 border-slate-300 focus-within:border-royal-600 transition-colors pb-2">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id="admin-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                    title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-royal-600 focus:ring-royal-500 w-3.5 h-3.5"
                  />
                  <span>Ingat saya</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-royal-600 hover:text-royal-700 font-medium transition-colors hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* LOGIN BUTTON (Gradient pill button matching the reference mockup) */}
              <div className="pt-2">
                <button
                  id="admin-login-button"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#d946ef] text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 hover:brightness-105 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memverifikasi Akses...</span>
                    </>
                  ) : (
                    <span>LOGIN</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Back Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-royal-600 transition-colors font-medium group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Website Utama</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password / Reset Help Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center mb-2">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Bantuan Akses Pengelola</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Untuk menjaga keamanan data sekolah, pengaturan ulang kata sandi portal CMS hanya dapat dilakukan melalui Administrator Humas & Koordinator IT SMA Negeri 2 Kalianda.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp / Telp: <strong>{siteConfig.kontak.telepon}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-royal-600" />
                <span>Email: <strong>{siteConfig.kontak.email}</strong></span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
