/**
 * Layanan CRUD Ekstrakurikuler SMAN 2 Kalianda
 */
import { extracurricularData } from '@/data/extracurricularData';
import { STORAGE_KEYS, notifyStorageChange } from './storageService';

export function getStoredExtracurriculars() {
  if (typeof window === 'undefined') return extracurricularData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXTRACURRICULAR);
    if (!raw) return extracurricularData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : extracurricularData;
  } catch {
    return extracurricularData;
  }
}

export function saveExtracurriculars(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.EXTRACURRICULAR, JSON.stringify(items));
  notifyStorageChange();
}

export function createExtracurricular(newItem) {
  const current = getStoredExtracurriculars();
  const id = newItem.id || newItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const entry = {
    ...newItem,
    id,
    membersCount: Number(newItem.membersCount) || 30,
    achievements: newItem.achievements || [],
  };
  const updated = [...current, entry];
  saveExtracurriculars(updated);
  return entry;
}

export function updateExtracurricular(id, updatedFields) {
  const current = getStoredExtracurriculars();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveExtracurriculars(updated);
}

export function deleteExtracurricular(id) {
  const current = getStoredExtracurriculars();
  const updated = current.filter((item) => item.id !== id);
  saveExtracurriculars(updated);
}
