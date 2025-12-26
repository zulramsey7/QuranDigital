import { useState, useEffect, useRef } from 'react';
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
  
  // Ref untuk mengelakkan azan berbunyi banyak kali pada saat yang sama
  const lastTriggeredPrayer = useRef<string>('');

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
          const [y, m, d] = timings.hijri.split('-');
          setHijriDate(`${d}-${m}-${y}H`);
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
      
      // Cari jika ada solat yang waktunya TEPAT sekarang (saat ke-0)
      prayerTimes.forEach(prayer => {
        const pTime = prayer.timestamp;
        
        // Cek jika jam & minit sama, dan saat adalah 0
        if (
          now.getHours() === pTime.getHours() &&
          now.getMinutes() === pTime.getMinutes() &&
          now.getSeconds() === 0 &&
          lastTriggeredPrayer.current !== prayer.nameKey
        ) {
          if (prayer.nameKey !== 'sunrise') {
            triggerAzanAlert(prayer.name);
            lastTriggeredPrayer.current = prayer.nameKey; // Lock supaya tak berbunyi lagi
          }
        }
      });

      // Reset lock bila dah tukar minit
      if (now.getSeconds() === 5) {
        lastTriggeredPrayer.current = '';
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return { prayerTimes, hijriDate, gregorianDate, loading, error };
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