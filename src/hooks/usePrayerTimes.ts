import { useState, useEffect } from 'react';
import { toast } from "sonner";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        month: { en: string; ar: string };
        year: string;
        day: string;
      };
      gregorian: {
        date: string;
        month: { en: string };
        year: string;
        day: string;
      };
    };
    meta: {
      timezone: string;
    };
  };
}

export interface PrayerInfo {
  name: string;
  nameKey: string;
  time: string;
  timestamp: Date;
}

export function usePrayerTimes(latitude: number, longitude: number) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerInfo[]>([]);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=3`
        );
        
        if (!response.ok) throw new Error('Failed to fetch prayer times');
        
        const data: PrayerTimesResponse = await response.json();
        const timings = data.data.timings;
        
        const prayerList: PrayerInfo[] = [
          { name: 'Fajr', nameKey: 'fajr', time: timings.Fajr, timestamp: parseTime(timings.Fajr) },
          { name: 'Sunrise', nameKey: 'sunrise', time: timings.Sunrise, timestamp: parseTime(timings.Sunrise) },
          { name: 'Dhuhr', nameKey: 'dhuhr', time: timings.Dhuhr, timestamp: parseTime(timings.Dhuhr) },
          { name: 'Asr', nameKey: 'asr', time: timings.Asr, timestamp: parseTime(timings.Asr) },
          { name: 'Maghrib', nameKey: 'maghrib', time: timings.Maghrib, timestamp: parseTime(timings.Maghrib) },
          { name: 'Isha', nameKey: 'isha', time: timings.Isha, timestamp: parseTime(timings.Isha) },
        ];
        
        setPrayerTimes(prayerList);
        const hijri = data.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}H`);
        setGregorianDate(data.data.date.readable);
        setError(null);
      } catch (err) {
        setError('Failed to load prayer times');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchPrayerTimes();
    }
  }, [latitude, longitude]);

  return { prayerTimes, hijriDate, gregorianDate, loading, error };
}

// Menukar string "HH:mm" kepada objek Date yang betul
function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Logik utama untuk pengiraan baki masa dan notifikasi Azan
export function getNextPrayer(prayers: PrayerInfo[]): { prayer: PrayerInfo | null; countdown: string } {
  if (!prayers || prayers.length === 0) return { prayer: null, countdown: '--:--:--' };

  const now = new Date();
  let targetPrayer: PrayerInfo | null = null;
  let diff = 0;

  // 1. Cari solat seterusnya untuk hari ini
  for (const prayer of prayers) {
    if (prayer.timestamp > now) {
      targetPrayer = prayer;
      diff = prayer.timestamp.getTime() - now.getTime();
      break;
    }
  }

  // 2. Jika semua solat hari ini dah lepas (selepas Isyak), ambil Fajr esok
  if (!targetPrayer) {
    targetPrayer = prayers[0];
    const tomorrowFajr = new Date(prayers[0].timestamp);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    diff = tomorrowFajr.getTime() - now.getTime();
  }

  // 3. AZAN ALERT: Jika baki masa kurang 1 saat (Waktu Azan Tiba)
  // Kita guna range 0-1000ms untuk trigger sekali sahaja
  if (diff > 0 && diff <= 1000) {
    triggerAzanAlert(targetPrayer.name);
  }

  return {
    prayer: targetPrayer,
    countdown: formatCountdown(diff)
  };
}

// Fungsi Notifikasi & Getaran
function triggerAzanAlert(prayerName: string) {
  // Bunyi Notifikasi (Sistem default browser toast)
  toast.success(`Waktu Azan ${prayerName} telah tiba!`, {
    description: `Marilah menuju kejayaan.`,
    duration: 10000, // Papar selama 10 saat
  });

  // Getaran telefon (jika disokong)
  if ("vibrate" in navigator) {
    navigator.vibrate([500, 200, 500, 200, 500]);
  }
}

// Helper untuk format masa HH:mm:ss
function formatCountdown(ms: number): string {
  if (ms < 0) return "00:00:00";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return [hours, minutes, seconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
}