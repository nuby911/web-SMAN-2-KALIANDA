import { useState, useEffect } from 'react';
import { getStoredNews } from '@/services/newsService';
import { getStoredExtracurriculars } from '@/services/extracurricularService';
import {
  getStoredPPDBRegistrations,
  getStoredPPDBWaves,
  getStoredPPDBInfo,
} from '@/services/ppdbService';
import { getStoredMessages } from '@/services/messageService';

/**
 * Custom React Hook untuk sinkronisasi data sekolah secara real-time (multi-tab & multi-komponen)
 */
export function useSchoolData() {
  const [news, setNews] = useState(() => getStoredNews());
  const [extracurriculars, setExtracurriculars] = useState(() => getStoredExtracurriculars());
  const [ppdbRegistrations, setPpdbRegistrations] = useState(() => getStoredPPDBRegistrations());
  const [ppdbWaves, setPpdbWaves] = useState(() => getStoredPPDBWaves());
  const [ppdbInfo, setPpdbInfo] = useState(() => getStoredPPDBInfo());
  const [messages, setMessages] = useState(() => getStoredMessages());

  useEffect(() => {
    const handleSync = () => {
      setNews(getStoredNews());
      setExtracurriculars(getStoredExtracurriculars());
      setPpdbRegistrations(getStoredPPDBRegistrations());
      setPpdbWaves(getStoredPPDBWaves());
      setPpdbInfo(getStoredPPDBInfo());
      setMessages(getStoredMessages());
    };

    window.addEventListener('smandaka_data_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('smandaka_data_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  return {
    news,
    extracurriculars,
    ppdbRegistrations,
    ppdbWaves,
    ppdbInfo,
    messages,
  };
}
