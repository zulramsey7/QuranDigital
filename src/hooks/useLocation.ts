import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

const DEFAULT_LOCATION: LocationData = {
  latitude: 3.1390,
  longitude: 101.6869,
  city: 'Kuala Lumpur',
  country: 'Malaysia'
};

export function useLocation() {
  const [location, setLocation] = useState<LocationData>(() => {
    const saved = localStorage.getItem('user-location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_LOCATION;
      }
    }
    return DEFAULT_LOCATION;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Gunakan getCurrentPosition dengan opsyen yang lebih pantas
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          const newLocation = {
            latitude,
            longitude,
            city: data.city || data.locality || 'Lokasi Semasa',
            country: data.countryName || 'Malaysia'
          };
          
          setLocation(newLocation);
          localStorage.setItem('user-location', JSON.stringify(newLocation));
          setError(null);
        } catch {
          const fallbackLocation = {
            latitude,
            longitude,
            city: 'Lokasi Semasa',
            country: 'Malaysia'
          };
          setLocation(fallbackLocation);
          localStorage.setItem('user-location', JSON.stringify(fallbackLocation));
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Location error:', err);
        setError('Gagal mendapatkan lokasi. Menggunakan lokasi lalai.');
        setLoading(false);
      },
      { 
        enableHighAccuracy: true, // Lebih tepat untuk dapatkan Zon JAKIM
        timeout: 15000, 
        maximumAge: 1000 * 60 * 10 // Simpan cache selama 10 minit sahaja
      }
    );
  };

  const setManualLocation = (lat: number, lng: number, city: string, country: string) => {
    const newLocation = { latitude: lat, longitude: lng, city, country };
    setLocation(newLocation);
    localStorage.setItem('user-location', JSON.stringify(newLocation));
  };

  // Logik Auto-Run
  useEffect(() => {
    // Setiap kali aplikasi dibuka, cuba dapatkan lokasi baru 
    // supaya Zon JAKIM sentiasa dikemaskini mengikut pergerakan pengguna
    detectLocation();
  }, []);

  return { location, loading, error, detectLocation, setManualLocation };
}