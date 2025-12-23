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
      try {
        const parsed = JSON.parse(saved) as UserStats;
        const today = getTodayDate();
        
        // LOGIK RESET HARIAN & STREAK
        if (parsed.lastActiveDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (parsed.lastActiveDate === yesterdayStr) {
            // Kekalkan streak sedia ada (streak dikira bertambah bila ada aktiviti hari ini)
          } else if (parsed.lastActiveDate !== '') {
            // Jika skip lebih dari sehari, reset streak ke 0
            parsed.dailyStreak = 0;
          }
          
          parsed.totalZikirToday = 0;
          parsed.lastActiveDate = today;
        }
        return parsed;
      } catch (e) {
        return getDefaultStats();
      }
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
      
      // Jika streak adalah 0, jadikan 1. Jika hari baru bermula, kita kekalkan streak lama.
      const newStreak = prev.dailyStreak === 0 ? 1 : prev.dailyStreak;

      return {
        ...prev,
        surahsRead: [...prev.surahsRead, surahNumber],
        lastActiveDate: today,
        dailyStreak: newStreak
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

      if (updatedHistory.length > 30) updatedHistory = updatedHistory.slice(-30);

      // Logik Streak: Jika baru buat aktiviti hari ini, pastikan streak minimum 1
      const newStreak = prev.dailyStreak === 0 ? 1 : prev.dailyStreak;

      return {
        ...prev,
        totalZikirToday: prev.totalZikirToday + count,
        lastActiveDate: today,
        dailyStreak: newStreak,
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
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    // Return stats yang diperlukan oleh Profil
    surahsReadCount: stats.surahsRead.length || 0,
    totalZikirToday: stats.totalZikirToday || 0,
    dailyStreak: stats.dailyStreak || 0,
    surahsRead: stats.surahsRead,
    getTodayZikir,
    markSurahRead,
    addZikir,
    resetStats,
  };
}