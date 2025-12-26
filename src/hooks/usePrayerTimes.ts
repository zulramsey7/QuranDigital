import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { dapatkanZonTerdekat } from '../data/zonMapping';

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
        const zon = dapatkanZonTerdekat(latitude, longitude);
        const response = await fetch(`https://api.waktusolat.app/v2/solat/${zon}`);
        
        if (!response.ok) throw new Error('Pelayan tidak merespon');
        const data = await response.json();
        
        if (!data?.prayers?.[0]) throw new Error('Data tidak lengkap');

        const timings = data.prayers[0];

        const processTime = (timestamp: number) => {
          const dateObj = new Date(timestamp * 1000); 
          const timeString = dateObj.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          });
          return { timeString, dateObj };
        };

        const prayerList: PrayerInfo[] = [
          { name: 'Subuh', nameKey: 'fajr', time: processTime(timings.fajr).timeString, timestamp: processTime(timings.fajr).dateObj },
          { name: 'Syuruk', nameKey: 'sunrise', time: processTime(timings.syuruk).timeString, timestamp: processTime(timings.syuruk).dateObj },
          { name: 'Zuhur', nameKey: 'dhuhr', time: processTime(timings.dhuhr).timeString, timestamp: processTime(timings.dhuhr).dateObj },
          { name: 'Asar', nameKey: 'asr', time: processTime(timings.asr).timeString, timestamp: processTime(timings.asr).dateObj },
          { name: 'Maghrib', nameKey: 'maghrib', time: processTime(timings.maghrib).timeString, timestamp: processTime(timings.maghrib).dateObj },
          { name: 'Isyak', nameKey: 'isha', time: processTime(timings.isha).timeString, timestamp: processTime(timings.isha).dateObj },
        ];
        
        setPrayerTimes(prayerList);
        
        if (timings.hijri) {
          const hijriParts = timings.hijri.split('-');
          setHijriDate(`${hijriParts[2]}-${hijriParts[1]}-${hijriParts[0]}H`);
        }

        const today = new Date();
        setGregorianDate(today.toLocaleDateString('ms-MY', { 
          day: 'numeric', month: 'long', year: 'numeric' 
        }));
        
        setError(null);
      } catch (err) {
        setError('Gagal muat waktu solat');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) fetchPrayerTimes();
  }, [latitude, longitude]);

  return { prayerTimes, hijriDate, gregorianDate, loading, error };
}

/**
 * LOGIK NOTIFIKASI & AUDIO
 */

export function getNextPrayer(prayers: PrayerInfo[]): { prayer: PrayerInfo | null; countdown: string } {
  if (!prayers || prayers.length === 0) return { prayer: null, countdown: '00:00:00' };

  const now = new Date();
  let targetPrayer: PrayerInfo | null = null;
  let diff = 0;

  for (const prayer of prayers) {
    if (prayer.timestamp > now) {
      targetPrayer = prayer;
      diff = prayer.timestamp.getTime() - now.getTime();
      break;
    }
  }

  if (!targetPrayer) {
    targetPrayer = prayers[0];
    const tomorrowFajr = new Date(prayers[0].timestamp);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    diff = tomorrowFajr.getTime() - now.getTime();
  }

  // Trigger azan jika baki masa kurang dari 1 saat (tepat pada waktunya)
  if (diff > 0 && diff <= 1000) {
    // Kecualikan Syuruk daripada bunyi azan jika mahu
    if (targetPrayer.nameKey !== 'sunrise') {
      triggerAzanAlert(targetPrayer.name);
    }
  }

  return {
    prayer: targetPrayer,
    countdown: formatCountdown(diff)
  };
}

function triggerAzanAlert(prayerName: string) {
  // 1. Notifikasi Visual
  toast.success(`Waktu Azan ${prayerName} telah tiba!`, {
    description: `Marilah menuju kejayaan.`,
    duration: 15000,
  });

  // 2. Bunyi Azan (Mainkan dari folder public/audio/)
  const azan = new Audio('/audio/azan.mp3');
  azan.volume = 0.8; // Laraskan volume (0.0 hingga 1.0)
  
  azan.play().catch(error => {
    console.log("Audio play blocked: Perlukan interaksi user kali pertama.");
  });

  // 3. Getaran Phone
  if ("vibrate" in navigator) {
    navigator.vibrate([500, 200, 500, 200, 500]);
  }
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return [hours, minutes, seconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
}