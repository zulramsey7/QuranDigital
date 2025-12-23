import { useState, useEffect, useCallback } from 'react';

interface DailyZikir {
  date: string;
  counts: {
    [zikir: string]: number;
  };
}

interface UserStats {
  surahsRead: number[];
  totalZikirToday: number;
  dailyStreak: number;
  lastActiveDate: string;
  zikirHistory: DailyZikir[];
}

const STORAGE_KEY = 'user-stats';
const getTodayDate = () => new Date().toISOString().split('T')[0];

const getDefaultStats = (): UserStats => ({
  surahsRead: [],
  totalZikirToday: 0,
  dailyStreak: 0,
  lastActiveDate: '',
  zikirHistory: [],
});

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as UserStats;
      const today = getTodayDate();
      
      // LOGIK RESET HARIAN & STREAK
      if (parsed.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (parsed.lastActiveDate === yesterdayStr) {
          // Jika semalam aktif, tambah streak
          parsed.dailyStreak += 1;
        } else {
          // Jika skip hari, streak kembali ke 0 (atau 1 jika baru mula hari ini)
          parsed.dailyStreak = 0;
        }
        
        parsed.totalZikirToday = 0;
        parsed.lastActiveDate = today;
      }
      return parsed;
    }
    return getDefaultStats();
  });

  // Simpan ke localStorage automatik bila 'stats' berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  // Fungsi simpan surah yang dibaca
  const markSurahRead = useCallback((surahNumber: number) => {
    setStats(prev => {
      if (prev.surahsRead.includes(surahNumber)) return prev;
      const today = getTodayDate();
      return {
        ...prev,
        surahsRead: [...prev.surahsRead, surahNumber],
        lastActiveDate: today,
        dailyStreak: prev.dailyStreak === 0 ? 1 : prev.dailyStreak
      };
    });
  }, []);

  // Fungsi simpan jumlah zikir
  const addZikir = useCallback((zikirName: string, count: number = 1) => {
    setStats(prev => {
      const today = getTodayDate();
      let updatedHistory = [...prev.zikirHistory];
      const todayIndex = updatedHistory.findIndex(h => h.date === today);
      
      if (todayIndex >= 0) {
        updatedHistory[todayIndex] = {
          ...updatedHistory[todayIndex],
          counts: {
            ...updatedHistory[todayIndex].counts,
            [zikirName]: (updatedHistory[todayIndex].counts[zikirName] || 0) + count,
          }
        };
      } else {
        updatedHistory.push({
          date: today,
          counts: { [zikirName]: count }
        });
      }

      // Simpan sejarah 30 hari sahaja untuk jimat memori browser
      if (updatedHistory.length > 30) updatedHistory = updatedHistory.slice(-30);

      return {
        ...prev,
        totalZikirToday: prev.totalZikirToday + count,
        lastActiveDate: today,
        dailyStreak: prev.dailyStreak === 0 ? 1 : prev.dailyStreak,
        zikirHistory: updatedHistory,
      };
    });
  }, []);

  const getTodayZikir = useCallback(() => {
    const today = getTodayDate();
    const todayData = stats.zikirHistory.find(h => h.date === today);
    return todayData?.counts || {};
  }, [stats.zikirHistory]);

  const resetStats = useCallback(() => {
    if (confirm("Adakah anda pasti mahu memadam semua rekod aktiviti?")) {
      setStats(getDefaultStats());
    }
  }, []);

  return {
    surahsReadCount: stats.surahsRead.length,
    surahsRead: stats.surahsRead,
    totalZikirToday: stats.totalZikirToday,
    dailyStreak: stats.dailyStreak,
    getTodayZikir,
    markSurahRead,
    addZikir,
    resetStats,
  };
}