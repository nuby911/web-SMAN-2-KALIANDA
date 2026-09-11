/**
 * Layanan CRUD Pesan Masuk & Permohonan Informasi Publik SMAN 2 Kalianda
 */
import { initialMessagesData } from '@/data/messageData';
import { STORAGE_KEYS, notifyStorageChange } from './storageService';

export function getStoredMessages() {
  if (typeof window === 'undefined') return initialMessagesData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!raw) return initialMessagesData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialMessagesData;
  } catch {
    return initialMessagesData;
  }
}

export function saveMessages(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(items));
  notifyStorageChange();
}

export function createMessage(newMessage) {
  const current = getStoredMessages();
  const nextNumericId = current.length > 0 ? Math.max(...current.map((m) => Number(m.id) || 0)) + 1 : 1;
  const ticketNumber = `MSG-2026-${String(nextNumericId).padStart(3, '0')}`;

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })}, ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;

  const entry = {
    id: nextNumericId,
    ticketNumber,
    nama: newMessage.nama?.trim() || 'Anonim',
    email: newMessage.email?.trim() || '-',
    telepon: newMessage.telepon?.trim() || '-',
    kategori: newMessage.kategori || 'Informasi Umum',
    subjek: newMessage.subjek?.trim() || 'Permohonan Informasi Publik',
    pesan: newMessage.pesan?.trim() || '',
    createdAt: formattedDate,
    status: 'Baru', // 'Baru' | 'Dibaca' | 'Dibalas'
    replyText: '',
    repliedAt: '',
    repliedBy: '',
  };

  const updated = [entry, ...current];
  saveMessages(updated);
  return entry;
}

export function updateMessageStatus(id, newStatus) {
  const current = getStoredMessages();
  const targetId = Number(id);
  const updated = current.map((item) =>
    Number(item.id) === targetId ? { ...item, status: newStatus } : item
  );
  saveMessages(updated);
}

export function replyMessage(id, replyText, repliedBy = 'Administrator Humas & TI') {
  const current = getStoredMessages();
  const targetId = Number(id);
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })}, ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;

  const updated = current.map((item) => {
    if (Number(item.id) === targetId) {
      return {
        ...item,
        status: 'Dibalas',
        replyText: replyText.trim(),
        repliedAt: formattedDate,
        repliedBy,
      };
    }
    return item;
  });
  saveMessages(updated);
}

export function markAllMessagesAsRead() {
  const current = getStoredMessages();
  const updated = current.map((item) => (item.status === 'Baru' ? { ...item, status: 'Dibaca' } : item));
  saveMessages(updated);
}

export function deleteMessage(id) {
  const current = getStoredMessages();
  const targetId = Number(id);
  const updated = current.filter((item) => Number(item.id) !== targetId);
  saveMessages(updated);
}
