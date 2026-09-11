import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MainLayout, AdminLayout } from '@/layouts';
import {
  HomePage,
  ProfilePage,
  ExtracurricularPage,
  NewsPage,
  GalleryPage,
  PPDBPage,
  ContactPage,
  NotFoundPage,
  DashboardOverview,
  ManageNews,
  ManageExtracurricular,
  ManagePPDB,
  ManagePPDBSettings,
  ManageMessages,
  AdminSettings,
  AdminLogin,
} from '@/pages';
import { useAuth } from '@/context/AuthContext';

// Helper component to automatically scroll to top when changing routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

// Protected Route Guard khusus portal pengelola CMS
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="ekstrakurikuler" element={<ExtracurricularPage />} />
          <Route path="berita" element={<NewsPage />} />
          <Route path="galeri" element={<GalleryPage />} />
          <Route path="ppdb" element={<PPDBPage />} />
          <Route path="kontak" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Internal Admin CMS Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="berita" element={<ManageNews />} />
          <Route path="ekstrakurikuler" element={<ManageExtracurricular />} />
          <Route path="ppdb" element={<ManagePPDB />} />
          <Route path="ppdb-settings" element={<ManagePPDBSettings />} />
          <Route path="pesan" element={<ManageMessages />} />
          <Route path="pengaturan" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}
