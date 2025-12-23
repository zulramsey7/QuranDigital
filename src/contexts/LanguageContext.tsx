import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ms' | 'en';

interface Translations {
  [key: string]: {
    ms: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { ms: 'Utama', en: 'Home' },
  quran: { ms: 'Al-Quran', en: 'Quran' },
  qibla: { ms: 'Kiblat', en: 'Qibla' },
  doa: { ms: 'Doa', en: 'Duas' },
  tasbih: { ms: 'Tasbih', en: 'Tasbih' },
  profile: { ms: 'Profil', en: 'Profile' },
  settings: { ms: 'Tetapan', en: 'Settings' },
  
  // Greetings
  goodMorning: { ms: 'Selamat Pagi', en: 'Good Morning' },
  goodAfternoon: { ms: 'Selamat Petang', en: 'Good Afternoon' },
  goodEvening: { ms: 'Selamat Malam', en: 'Good Evening' },
  
  // Prayer Times
  prayerTimes: { ms: 'Waktu Solat', en: 'Prayer Times' },
  fajr: { ms: 'Subuh', en: 'Fajr' },
  sunrise: { ms: 'Syuruk', en: 'Sunrise' },
  dhuhr: { ms: 'Zohor', en: 'Dhuhr' },
  asr: { ms: 'Asar', en: 'Asr' },
  maghrib: { ms: 'Maghrib', en: 'Maghrib' },
  isha: { ms: 'Isyak', en: 'Isha' },
  nextPrayer: { ms: 'Solat Seterusnya', en: 'Next Prayer' },
  timeUntil: { ms: 'Masa Berbaki', en: 'Time Until' },
  
  // Quran
  surah: { ms: 'Surah', en: 'Surah' },
  ayat: { ms: 'Ayat', en: 'Verses' },
  juz: { ms: 'Juzuk', en: 'Juz' },
  translation: { ms: 'Terjemahan', en: 'Translation' },
  search: { ms: 'Cari', en: 'Search' },
  bookmark: { ms: 'Penanda Buku', en: 'Bookmark' },
  lastRead: { ms: 'Bacaan Terakhir', en: 'Last Read' },
  
  // Doa & Zikir
  dailyDoa: { ms: 'Doa Harian', en: 'Daily Duas' },
  prophetDoa: { ms: 'Doa Para Nabi', en: 'Prophet\'s Duas' },
  hisnulMuslim: { ms: 'Hisnul Muslim', en: 'Hisnul Muslim' },
  tahlil: { ms: 'Tahlil', en: 'Tahlil' },
  yasin: { ms: 'Yasin', en: 'Yasin' },
  
  // Tasbih
  counter: { ms: 'Bilangan', en: 'Count' },
  reset: { ms: 'Set Semula', en: 'Reset' },
  target: { ms: 'Sasaran', en: 'Target' },
  completed: { ms: 'Selesai', en: 'Completed' },
  
  // Profile
  totalReading: { ms: 'Jumlah Bacaan', en: 'Total Reading' },
  dailyStreak: { ms: 'Rekod Harian', en: 'Daily Streak' },
  surahRead: { ms: 'Surah Dibaca', en: 'Surah Read' },
  zikirToday: { ms: 'Zikir Hari Ini', en: 'Zikir Today' },
  
  // Settings
  language: { ms: 'Bahasa', en: 'Language' },
  location: { ms: 'Lokasi', en: 'Location' },
  autoLocation: { ms: 'Lokasi Auto', en: 'Auto Location' },
  manualLocation: { ms: 'Lokasi Manual', en: 'Manual Location' },
  fontSize: { ms: 'Saiz Tulisan', en: 'Font Size' },
  notifications: { ms: 'Notifikasi', en: 'Notifications' },
  azanNotification: { ms: 'Notifikasi Azan', en: 'Azan Notification' },
  
  // Common
  loading: { ms: 'Memuatkan...', en: 'Loading...' },
  error: { ms: 'Ralat', en: 'Error' },
  retry: { ms: 'Cuba Semula', en: 'Retry' },
  save: { ms: 'Simpan', en: 'Save' },
  cancel: { ms: 'Batal', en: 'Cancel' },
  
  // Days
  today: { ms: 'Hari Ini', en: 'Today' },
  
  // Qibla
  qiblaDirection: { ms: 'Arah Kiblat', en: 'Qibla Direction' },
  distanceToKaaba: { ms: 'Jarak ke Kaabah', en: 'Distance to Kaaba' },
  calibrate: { ms: 'Kalibrasi', en: 'Calibrate' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'ms';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
