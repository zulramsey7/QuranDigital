import { ChevronLeft, Globe, MapPin, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { location, detectLocation } = useLocation();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 rounded-full bg-secondary/50">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold">{t('settings')}</h1>
        </div>

        {/* Language */}
        <div className="floating-card p-4">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{t('language')}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('ms')}
                className={`px-3 py-1 rounded-full text-sm ${language === 'ms' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                BM
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="floating-card p-4">
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{t('location')}</p>
              <p className="text-sm text-muted-foreground">{location.city}, {location.country}</p>
            </div>
            <button onClick={detectLocation} className="text-primary text-sm">
              Update
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="floating-card p-4">
          <div className="flex items-center gap-4">
            <Type className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{t('fontSize')}</p>
            </div>
            <span className="text-muted-foreground">Medium</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
