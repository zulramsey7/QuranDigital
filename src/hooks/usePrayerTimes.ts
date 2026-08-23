import { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import { dapatkanZonTerdekat } from '../data/zonMapping';

const WAKTUSOLAT_API_BASE_URL = 'https://api.waktusolat.app/v2';

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
  
  // Ref untuk mengelakkan azan berbunyi banyak kali pada saat yang sama
  const lastTriggeredPrayer = useRef<string>('');

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const zon = dapatkanZonTerdekat(latitude, longitude);
        const timings = await fetchPrayerTimesByZon(zon);

        const processTime = (timestamp: number) => ({
          timeString: new Date(timestamp * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
          dateObj: new Date(timestamp * 1000)
        });

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
          // Handle different hijri date formats from API
          const hijriStr = timings.hijri;
          if (hijriStr.includes('-')) {
            const [y, m, d] = hijriStr.split('-');
            setHijriDate(`${d}-${m}-${y}H`);
          } else {
            // Fallback for other formats
            setHijriDate(hijriStr);
          }
        }
        setGregorianDate(new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }));
        setError(null);
      } catch (err) {
        setError('Gagal muat waktu solat');
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) fetchPrayerTimes();
  }, [latitude, longitude]);

  /**
   * SISTEM AUTO-CHECK SETIAP SAAT
   */
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const timer = setInterval(() => {
      const now = new Date();
      let isPrayerTime = false;
      
      // Cari jika ada solat yang waktunya TEPAT sekarang (minit yang sama)
      prayerTimes.forEach(prayer => {
        const pTime = prayer.timestamp;
        
        // Cek jika jam & minit sama (abaikan saat untuk elak terlepas)
        if (
          now.getHours() === pTime.getHours() &&
          now.getMinutes() === pTime.getMinutes()
        ) {
          isPrayerTime = true;
          
          // Hanya trigger jika belum trigger untuk waktu ini
          if (lastTriggeredPrayer.current !== prayer.nameKey) {
            if (prayer.nameKey !== 'sunrise') {
              triggerAzanAlert(prayer.name);
              lastTriggeredPrayer.current = prayer.nameKey; // Lock supaya tak berbunyi lagi dalam minit ini
            }
          }
        }
      });

      // Reset lock bila dah melepasi waktu solat (supaya boleh trigger esok atau waktu lain)
      if (!isPrayerTime) {
        lastTriggeredPrayer.current = '';
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return { prayerTimes, hijriDate, gregorianDate, loading, error };
}

interface WaktuSolatApiTimings {
  fajr: number;
  syuruk: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  hijri?: string;
  date?: string;
}

interface AlternativePrayerTime {
  imsak?: string;
  fajr?: string;
  syuruk?: string;
  dhuhr?: string;
  asr?: string;
  maghrib?: string;
  isha?: string;
  hijri?: string;
  date?: string;
}

interface WaktuSolatApiResponse {
  prayers?: WaktuSolatApiTimings[];
  prayerTime?: AlternativePrayerTime[];
  status?: string;
  serverTime?: string;
  periodType?: string;
  zone?: string;
}

async function fetchPrayerTimesByZon(zon: string): Promise<WaktuSolatApiTimings> {
  const CACHE_KEY = `prayer_times_${zon}`;
  const cached = localStorage.getItem(CACHE_KEY);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // Months are 0-indexed

  if (cached) {
    try {
      const { data, timestamp, year, month } = JSON.parse(cached);
      const cacheDate = new Date(timestamp);

      // Cache valid if same year and month, and data is for current year
      if (
        Array.isArray(data) &&
        year === currentYear &&
        month === currentMonth &&
        cacheDate.getMonth() === now.getMonth() &&
        cacheDate.getFullYear() === now.getFullYear()
      ) {
         return getTodayPrayer(data);
      }
    } catch (e) {
      console.error('Error reading prayer cache', e);
    }
  }

  // Fetch data for current year and month to ensure 2026 data is used
  console.log(`Fetching prayer times for zone: ${zon}, year: ${currentYear}, month: ${currentMonth}`);
  const response = await fetch(
    `${WAKTUSOLAT_API_BASE_URL}/solat/${zon}?year=${currentYear}&month=${currentMonth}`
  );

  if (!response.ok) {
    throw new Error(`Pelayan tidak merespon: ${response.status}`);
  }

  const data: WaktuSolatApiResponse = await response.json();
  console.log('API Response:', data);

  // Handle different response formats from API
  let prayerData = data.prayers;
  if (!prayerData || prayerData.length === 0) {
    // Try alternative response structure
    if (data.prayerTime && Array.isArray(data.prayerTime)) {
      prayerData = data.prayerTime.map((pt: AlternativePrayerTime) => ({
        fajr: parseTimeToTimestamp(pt.imsak || pt.fajr),
        syuruk: parseTimeToTimestamp(pt.syuruk),
        dhuhr: parseTimeToTimestamp(pt.dhuhr),
        asr: parseTimeToTimestamp(pt.asr),
        maghrib: parseTimeToTimestamp(pt.maghrib),
        isha: parseTimeToTimestamp(pt.isha),
        hijri: pt.hijri,
        date: pt.date
      }));
    } else {
      throw new Error('Data tidak lengkap atau format tidak disokong');
    }
  }

  if (!prayerData || prayerData.length === 0) {
    throw new Error('Data solat tidak ditemui');
  }

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: prayerData,
      timestamp: Date.now(),
      year: currentYear,
      month: currentMonth
    }));
  } catch (e) {
    console.error('Failed to cache prayer times', e);
  }

  return getTodayPrayer(prayerData);
}

// Helper function to parse time string to timestamp
function parseTimeToTimestamp(timeStr: string): number {
  if (!timeStr) return Date.now() / 1000;

  // Handle different time formats: "05:49:00", "05:49", etc.
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1] || '0', 10);
  const seconds = parseInt(parts[2] || '0', 10);

  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date.getTime() / 1000;
}

function getTodayPrayer(prayers: WaktuSolatApiTimings[]): WaktuSolatApiTimings {
  const now = new Date();
  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  console.log(`Looking for prayer times for date: ${todayDate}/${todayMonth + 1}/${todayYear}`);
  console.log(`Available prayers count: ${prayers.length}`);

  // Find prayer time that matches today's date
  const found = prayers.find(p => {
    const pDate = new Date(p.fajr * 1000);
    const match = pDate.getDate() === todayDate &&
           pDate.getMonth() === todayMonth &&
           pDate.getFullYear() === todayYear;

    if (match) {
      console.log(`Found matching prayer time for: ${p.date || pDate.toDateString()}`);
    }
    return match;
  });

  // Fallback to first entry if not found (shouldn't happen usually)
  if (!found) {
    console.warn('No exact date match found, using first entry as fallback');
    console.log('First entry date:', new Date(prayers[0].fajr * 1000).toDateString());
  }

  return found || prayers[0];
}

// Helper functions (Kekal sama tetapi triggerAzanAlert dipanggil secara internal)
function triggerAzanAlert(prayerName: string) {
  toast.success(`Waktu Azan ${prayerName} telah tiba!`, {
    description: `Marilah menuju kejayaan.`,
    duration: 15000,
  });

  const azan = new Audio('/audio/azan.mp3');
  azan.volume = 0.8;
  azan.play().catch(() => console.log("Autoplay dihalang browser. Sila klik skrin dahulu."));

  if ("vibrate" in navigator) navigator.vibrate([500, 200, 500, 200, 500]);
}

/**
 * Logik Countdown (Guna dalam UI komponen anda)
 */
export function getNextPrayer(prayers: PrayerInfo[]): { prayer: PrayerInfo | null; countdown: string } {
  if (!prayers || prayers.length === 0) return { prayer: null, countdown: '00:00:00' };
  const now = new Date();
  let target = prayers.find(p => p.timestamp > now);
  let diff = 0;

  if (!target) {
    target = prayers[0];
    const tomorrow = new Date(prayers[0].timestamp);
    tomorrow.setDate(tomorrow.getDate() + 1);
    diff = tomorrow.getTime() - now.getTime();
  } else {
    diff = target.timestamp.getTime() - now.getTime();
  }

  return { prayer: target, countdown: formatCountdown(diff) };
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
