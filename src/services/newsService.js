/**
 * Layanan CRUD Berita & Artikel SMAN 2 Kalianda
 */
import { newsData } from '@/data/newsData';
import { STORAGE_KEYS, notifyStorageChange } from './storageService';

export function getStoredNews() {
  if (typeof window === 'undefined') return newsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) return newsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : newsData;
  } catch {
    return newsData;
  }
}

export function saveNews(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(items));
  notifyStorageChange();
}

export function createNews(newItem) {
  const current = getStoredNews();
  const nextId = current.length > 0 ? Math.max(...current.map((n) => Number(n.id) || 0)) + 1 : 1;
  const entry = {
    ...newItem,
    id: nextId,
    slug: newItem.slug || newItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    date: newItem.date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    author: newItem.author || 'Humas SMAN 2 Kalianda',
    readTime: newItem.readTime || '3 menit baca',
  };
  const updated = [entry, ...current];
  saveNews(updated);
  return entry;
}

export function updateNews(id, updatedFields) {
  const current = getStoredNews();
  const targetId = Number(id);
  const updated = current.map((item) => (Number(item.id) === targetId ? { ...item, ...updatedFields } : item));
  saveNews(updated);
}

export function deleteNews(id) {
  const current = getStoredNews();
  const targetId = Number(id);
  const updated = current.filter((item) => Number(item.id) !== targetId);
  saveNews(updated);
}
