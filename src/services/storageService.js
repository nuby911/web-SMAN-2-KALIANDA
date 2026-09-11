/**
 * Storage Keys & Reactive Event Service
 */

export const STORAGE_KEYS = {
  NEWS: 'smandaka_news_data',
  EXTRACURRICULAR: 'smandaka_extracurricular_data',
  PPDB: 'smandaka_ppdb_registrations_data',
  PPDB_WAVES: 'smandaka_ppdb_waves_data',
  PPDB_INFO: 'smandaka_ppdb_info_data',
};

/**
 * Notifikasi ke seluruh listener (antar tab maupun komponen dalam tab yang sama)
 */
export function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('smandaka_data_changed'));
  }
}

/**
 * Reset seluruh data demo ke kondisi awal (Factory Reset)
 */
export function resetAllToDefault() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.NEWS);
  localStorage.removeItem(STORAGE_KEYS.EXTRACURRICULAR);
  localStorage.removeItem(STORAGE_KEYS.PPDB);
  localStorage.removeItem(STORAGE_KEYS.PPDB_WAVES);
  localStorage.removeItem(STORAGE_KEYS.PPDB_INFO);
  notifyStorageChange();
}
