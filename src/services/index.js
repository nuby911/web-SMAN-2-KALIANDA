/**
 * Central Services & Data Layer Barrel Export
 * Menyediakan akses terpusat yang modular ke data statis, layanan CRUD, dan hooks.
 */

// Data Statis & Seed Awal
export * from '@/data';

// Layanan Penyimpanan & State Event
export * from './storageService';

// Layanan Berita & Artikel
export * from './newsService';

// Layanan Ekstrakurikuler
export * from './extracurricularService';

// Layanan PPDB & SPMB
export * from './ppdbService';

// Layanan Pesan Kontak & Permohonan Informasi
export * from './messageService';

// Reaktif Hooks
export { useSchoolData } from '@/hooks/useSchoolData';
