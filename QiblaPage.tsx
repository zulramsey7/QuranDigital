import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { 
  Navigation, 
  RotateCcw, 
  MapPin, 
  Compass, 
  ChevronLeft,
  Map 
} from 'lucide-react';

export default function QiblaPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { location, loading: locationLoading } = useLocation();
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kira arah Kiblat
  useEffect(() => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const lat1 = location.latitude * (Math.PI / 180);
    const lat2 = kaabaLat * (Math.PI / 180);
    const lngDiff = (kaabaLng - location.longitude) * (Math.PI / 180);
    
    const y = Math.sin(lngDiff);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lngDiff);
    
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;
    
    setQiblaDirection(qibla);
  }, [location]);

  const calculateDistance = () => {
    const R = 6371;
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    const dLat = (kaabaLat - location.latitude) * (Math.PI / 180);
    const dLng = (kaabaLng - location.longitude) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(location.latitude * (Math.PI / 180)) * Math.cos(kaabaLat * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const requestOrientationPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setError('Izin akses kompas ditolak');
        }
      } catch (err) {
        setError('Ralat sensor kompas');
      }
    } else {
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      let compassHeading = event.alpha;
      if ((event as any).webkitCompassHeading) {
        compassHeading = (event as any).webkitCompassHeading;
      }
      setHeading(compassHeading);
    }
  };

  useEffect(() => {
    requestOrientationPermission();
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const getCompassRotation = () => {
    if (heading === null) return qiblaDirection;
    return qiblaDirection - heading;
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in pb-24 p-4">
        
        {/* HEADER DENGAN BUTANG BACK */}
        <div className="flex items-center gap-4 text-left py-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Arah Kiblat</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">Penentu Arah Solat</p>
          </div>
        </div>

        {/* HERO CARD - KEMASKINI TEKS */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Map className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight uppercase">Mencari Baitullah</h2>
            <p className="text-emerald-100/80 text-xs font-medium max-w-[200px] leading-relaxed">
              Lokasi semasa: <br/> 
              <span className="text-white">{location.city || 'Menentukan lokasi...'}, {location.country}</span>
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {/* COMPASS SECTION */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-900 border-[8px] border-secondary dark:border-slate-800 shadow-2xl" />
            
            {/* Degree Markers */}
            <div className="absolute inset-4 rounded-full border border-emerald-500/5">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div key={deg} className="absolute w-full h-full" style={{ transform: `rotate(${deg}deg)` }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-300 dark:bg-slate-700 rounded-full" />
                </div>
              ))}
            </div>

            {/* Qibla Needle */}
            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${getCompassRotation()}deg)` }}
            >
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="absolute top-6 flex flex-col items-center">
                  <div className="text-3xl mb-1 drop-shadow-md">🕋</div>
                  <Navigation className="w-8 h-8 text-emerald-500 fill-emerald-500" />
                </div>
                <div className="w-1 h-24 bg-gradient-to-t from-transparent via-emerald-500/10 to-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Center Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg border-2 border-white dark:border-slate-900 z-20" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 w-full">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-black/5 text-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Sudut Kiblat</p>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{Math.round(qiblaDirection)}°</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-black/5 text-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Jarak Kaabah</p>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{calculateDistance().toLocaleString()} km</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <button
            onClick={requestOrientationPermission}
            className="w-full py-4 bg-emerald-600 text-white rounded-[20px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 font-bold text-xs uppercase tracking-widest"
          >
            <RotateCcw className="w-4 h-4" />
            Kalibrasi Kompas
          </button>
          
          <div className="p-4 bg-secondary/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-emerald-500/20">
            <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-tight">
              Pastikan peranti jauh dari besi/magnet
            </p>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}