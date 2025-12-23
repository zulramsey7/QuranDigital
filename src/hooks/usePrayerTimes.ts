import { useState, useEffect } from 'react';

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

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function getNextPrayer(prayers: PrayerInfo[]): { prayer: PrayerInfo | null; countdown: string } {
  const now = new Date();
  
  for (const prayer of prayers) {
    if (prayer.timestamp > now) {
      const diff = prayer.timestamp.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return {
        prayer,
        countdown: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      };
    }
  }
  
  // If all prayers have passed, return first prayer of next day
  if (prayers.length > 0) {
    return { prayer: prayers[0], countdown: '--:--:--' };
  }
  
  return { prayer: null, countdown: '--:--:--' };
}
