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
      return JSON.parse(saved);
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
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          const newLocation = {
            latitude,
            longitude,
            city: data.city || data.locality || 'Unknown',
            country: data.countryName || 'Unknown'
          };
          
          setLocation(newLocation);
          localStorage.setItem('user-location', JSON.stringify(newLocation));
          setError(null);
        } catch {
          // Use coordinates without city name
          const newLocation = {
            latitude,
            longitude,
            city: 'Current Location',
            country: ''
          };
          setLocation(newLocation);
          localStorage.setItem('user-location', JSON.stringify(newLocation));
        }
        
        setLoading(false);
      },
      (err) => {
        console.error('Location error:', err);
        setError('Unable to get location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const setManualLocation = (lat: number, lng: number, city: string, country: string) => {
    const newLocation = { latitude: lat, longitude: lng, city, country };
    setLocation(newLocation);
    localStorage.setItem('user-location', JSON.stringify(newLocation));
  };

  useEffect(() => {
    const saved = localStorage.getItem('user-location');
    if (!saved) {
      detectLocation();
    } else {
      setLoading(false);
    }
  }, []);

  return { location, loading, error, detectLocation, setManualLocation };
}
