import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'smandaka_admin_session';

// Kredensial staf/pengelola resmi portal CMS SMAN 2 Kalianda
const REGISTERED_ACCOUNTS = [
  {
    id: 'usr-admin-1',
    username: 'admin',
    password: 'admin123',
    name: 'Admin Humas & TI',
    role: 'Super Admin CMS',
    email: 'admin@smanegeri2kalianda.sch.id',
    nip: '19740121 199603 1 001',
    divisi: 'Pengelola Website & Informasi Publik'
  },
  {
    id: 'usr-kepsek',
    username: 'kepsek',
    password: 'admin123',
    name: 'Herwansyah, S.Pd., M.Pd.',
    role: 'Kepala Sekolah',
    email: 'kepsek@smanegeri2kalianda.sch.id',
    nip: '19740121 199603 1 001',
    divisi: 'Pimpinan SMA Negeri 2 Kalianda'
  },
  {
    id: 'usr-ppdb',
    username: 'panitia.ppdb',
    password: 'admin123',
    name: 'Panitia SPMB & PPDB',
    role: 'Admin PPDB',
    email: 'ppdb@smanegeri2kalianda.sch.id',
    nip: '19820514 200801 2 015',
    divisi: 'Kesiswaan & Penerimaan Murid Baru'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved auth session:', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to update auth in localStorage:', e);
    }
  }, [user]);

  /**
   * Login method untuk pengelola portal CMS
   */
  const login = async (username, password) => {
    setIsLoading(true);

    // Simulasi delay autentikasi yang halus
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Cocokkan dengan akun terdaftar (username, email, atau nip)
    const matched = REGISTERED_ACCOUNTS.find(
      (acc) =>
        (acc.username.toLowerCase() === cleanUser ||
          acc.email.toLowerCase() === cleanUser ||
          acc.nip.replace(/\s+/g, '') === cleanUser.replace(/\s+/g, '')) &&
        acc.password === cleanPass
    );

    setIsLoading(false);

    if (matched) {
      const { password: _, ...userData } = matched;
      userData.loginTime = new Date().toISOString();
      setUser(userData);
      return { success: true, user: userData };
    }

    return {
      success: false,
      message: 'Username, NIP, atau Kata Sandi salah. Akses dibatasi hanya untuk staf pengelola sekolah.'
    };
  };

  /**
   * Logout method
   */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear auth session:', e);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
