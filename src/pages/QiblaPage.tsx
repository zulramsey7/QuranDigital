import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { cn } from '@/lib/utils';
import { Navigation, RotateCcw } from 'lucide-react';

export default function QiblaPage() {
  const { t } = useLanguage();
  const { location, detectLocation, loading: locationLoading } = useLocation();
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate Qibla direction
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

  // Calculate distance to Kaaba
  const calculateDistance = () => {
    const R = 6371; // Earth's radius in km
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

  // Request device orientation permission and handle compass
  const requestOrientationPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setError('Permission denied for compass');
        }
      } catch (err) {
        setError('Error requesting compass permission');
      }
    } else {
      // Non-iOS devices
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      // Normalize the heading (0-360)
      let compassHeading = event.alpha;
      
      // Adjust for webkitCompassHeading if available (iOS)
      if ((event as any).webkitCompassHeading) {
        compassHeading = (event as any).webkitCompassHeading;
      }
      
      setHeading(compassHeading);
    }
  };

  useEffect(() => {
    requestOrientationPermission();
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Calculate rotation for compass
  const getCompassRotation = () => {
    if (heading === null) return qiblaDirection;
    return qiblaDirection - heading;
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">{t('qibla')}</h1>
          <p className="text-sm text-muted-foreground">
            {location.city}, {location.country}
          </p>
        </div>

        {/* Compass */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-72 h-72">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-card to-secondary/50 border-4 border-primary/30 shadow-2xl" />
            
            {/* Degree Markers */}
            <div className="absolute inset-2 rounded-full">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-primary/50 rounded-full" />
                </div>
              ))}
            </div>

            {/* Cardinal Directions */}
            <div className="absolute inset-0 text-sm font-medium text-muted-foreground">
              <span className="absolute top-6 left-1/2 -translate-x-1/2">N</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2">E</span>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2">S</span>
              <span className="absolute left-6 top-1/2 -translate-y-1/2">W</span>
            </div>

            {/* Qibla Arrow */}
            <div 
              className="absolute inset-4 transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${getCompassRotation()}deg)` }}
            >
              {/* Arrow pointing to Qibla */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Navigation className="w-8 h-8 text-primary fill-primary" style={{ transform: 'rotate(0deg)' }} />
              </div>
              
              {/* Kaaba indicator */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <span className="text-2xl">🕋</span>
              </div>
            </div>

            {/* Center Point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary shadow-lg animate-pulse-gold" />
            </div>
          </div>

          {/* Direction Display */}
          <div className="mt-6 text-center">
            <p className="text-4xl font-bold text-primary">
              {Math.round(qiblaDirection)}°
            </p>
            <p className="text-sm text-muted-foreground mt-1">{t('qiblaDirection')}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="floating-card p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{t('distanceToKaaba')}</p>
            <p className="text-xl font-bold text-foreground">{calculateDistance().toLocaleString()} km</p>
          </div>
          <div className="floating-card p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Heading</p>
            <p className="text-xl font-bold text-foreground">
              {heading !== null ? `${Math.round(heading)}°` : '--'}
            </p>
          </div>
        </div>

        {/* Calibrate Button */}
        {!permissionGranted && (
          <button
            onClick={requestOrientationPermission}
            className="w-full floating-card p-4 flex items-center justify-center gap-2 text-primary"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t('calibrate')}</span>
          </button>
        )}

        {error && (
          <div className="floating-card p-4 text-center text-destructive">
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please use a device with compass support or enable motion sensors.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="floating-card p-4 space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Hold your device flat and point the arrow towards the Kaaba direction
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
