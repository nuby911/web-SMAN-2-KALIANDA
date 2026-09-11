/**
 * Layanan CRUD PPDB / SPMB, Jadwal Gelombang, dan Validasi Tanggal
 */
import { ppdbWaves, initialPPDBRegistrations, initialPPDBInfo } from '@/data/ppdbData';
import { STORAGE_KEYS, notifyStorageChange } from './storageService';

const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Format string YYYY-MM-DD ke format Indonesia (Contoh: "01 September 2026")
 */
export function formatIndonesianDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${INDO_MONTHS[monthIdx]} ${year}`;
    }
  }
  return dateStr;
}

/**
 * Validasi apakah gelombang sedang aktif sesuai rentang tanggal (startDate & endDate).
 * Menghasilkan:
 * - isActive: boolean (bisa mendaftar atau tidak)
 * - reason: 'active' | 'not_started' | 'expired' | 'manual_closed'
 * - label: 'Sedang Dibuka' | 'Belum Dibuka' | 'Sudah Berakhir' | 'Ditutup'
 * - badge: 'emerald' | 'royal' | 'rose'
 */
export function checkWaveDateStatus(wave) {
  if (!wave) {
    return {
      isActive: false,
      reason: 'invalid',
      label: 'Tidak Diketahui',
      badge: 'slate',
      message: 'Informasi gelombang pendaftaran tidak ditemukan.'
    };
  }

  // Jika admin secara manual menutup status gelombang
  if (wave.status === 'Ditutup') {
    return {
      isActive: false,
      reason: 'manual_closed',
      label: 'Ditutup',
      badge: 'rose',
      message: 'Pendaftaran gelombang ini telah ditutup oleh panitia.'
    };
  }

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const start = wave.startDate;
  const end = wave.endDate;

  // Tanggal belum sampai (belum dibuka)
  if (start && todayStr < start) {
    return {
      isActive: false,
      reason: 'not_started',
      label: 'Belum Dibuka',
      badge: 'royal',
      message: `Pendaftaran belum dibuka. Periode baru akan dimulai pada ${formatIndonesianDate(start)}.`,
      startDateFormatted: formatIndonesianDate(start),
      endDateFormatted: formatIndonesianDate(end),
    };
  }

  // Tanggal sudah lewat (sudah berakhir)
  if (end && todayStr > end) {
    return {
      isActive: false,
      reason: 'expired',
      label: 'Sudah Berakhir',
      badge: 'rose',
      message: `Periode pendaftaran gelombang ini telah berakhir pada ${formatIndonesianDate(end)}.`,
      startDateFormatted: formatIndonesianDate(start),
      endDateFormatted: formatIndonesianDate(end),
    };
  }

  // Dalam periode pendaftaran (aktif)
  return {
    isActive: true,
    reason: 'active',
    label: 'Sedang Dibuka',
    badge: 'emerald',
    message: end ? `Pendaftaran aktif sampai ${formatIndonesianDate(end)}.` : 'Pendaftaran sedang dibuka.',
    startDateFormatted: formatIndonesianDate(start),
    endDateFormatted: formatIndonesianDate(end),
  };
}

// --- PPDB Registrations CRUD ---
export function getStoredPPDBRegistrations() {
  if (typeof window === 'undefined') return initialPPDBRegistrations;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB);
    if (!raw) return initialPPDBRegistrations;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialPPDBRegistrations;
  } catch {
    return initialPPDBRegistrations;
  }
}

export function savePPDBRegistrations(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(items));
  notifyStorageChange();
}

export function addPPDBRegistration(formData) {
  const current = getStoredPPDBRegistrations();
  const regNumber = String(current.length + 1).padStart(3, '0');
  const entry = {
    ...formData,
    id: `REG-2026-${regNumber}`,
    status: 'Menunggu Verifikasi',
    createdAt: new Date().toISOString(),
  };
  const updated = [entry, ...current];
  savePPDBRegistrations(updated);
  return entry;
}

export function updatePPDBStatus(id, newStatus) {
  const current = getStoredPPDBRegistrations();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  savePPDBRegistrations(updated);
}

export function deletePPDBRegistration(id) {
  const current = getStoredPPDBRegistrations();
  const updated = current.filter((item) => item.id !== id);
  savePPDBRegistrations(updated);
}

// --- PPDB Waves (Gelombang) CRUD ---
export function getStoredPPDBWaves() {
  if (typeof window === 'undefined') return ppdbWaves;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB_WAVES);
    if (!raw) return ppdbWaves;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => {
        const fallback = ppdbWaves[idx] || {};
        return {
          ...item,
          startDate: item.startDate || fallback.startDate || '',
          endDate: item.endDate || fallback.endDate || '',
        };
      });
    }
    return ppdbWaves;
  } catch {
    return ppdbWaves;
  }
}

export function savePPDBWaves(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB_WAVES, JSON.stringify(items));
  notifyStorageChange();
}

export function createPPDBWave(newItem) {
  const current = getStoredPPDBWaves();
  const entry = {
    ...newItem,
    id: newItem.id || `WAVE-${Date.now()}`,
    status: newItem.status || 'Segera Dibuka',
    badge: newItem.badge || 'royal',
  };
  const updated = [...current, entry];
  savePPDBWaves(updated);
  return entry;
}

export function updatePPDBWave(idOrIndex, updatedFields) {
  const current = getStoredPPDBWaves();
  const updated = current.map((item, idx) => {
    if (item.id === idOrIndex || idx === Number(idOrIndex) || item.wave === idOrIndex) {
      return { ...item, ...updatedFields };
    }
    return item;
  });
  savePPDBWaves(updated);
}

export function deletePPDBWave(idOrIndex) {
  const current = getStoredPPDBWaves();
  const updated = current.filter((item, idx) => item.id !== idOrIndex && idx !== Number(idOrIndex) && item.wave !== idOrIndex);
  savePPDBWaves(updated);
}

// --- PPDB Info & General Settings CRUD ---
export function getStoredPPDBInfo() {
  if (typeof window === 'undefined') return initialPPDBInfo;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PPDB_INFO);
    if (!raw) return initialPPDBInfo;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? { ...initialPPDBInfo, ...parsed } : initialPPDBInfo;
  } catch {
    return initialPPDBInfo;
  }
}

export function savePPDBInfo(info) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PPDB_INFO, JSON.stringify(info));
  notifyStorageChange();
}
