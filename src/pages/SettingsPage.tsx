import { ChevronLeft, Globe, MapPin, Type, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { location, detectLocation } = useLocation();
  const { theme, setTheme, isDark } = useAppTheme();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 rounded-full bg-secondary/50">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold">{t('settings')}</h1>
        </div>

        {/* Theme */}
        <div className="floating-card p-4">
          <div className="flex items-center gap-4">
            {isDark ? (
              <Moon className="w-5 h-5 text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-primary" />
            )}
            <div className="flex-1">
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground capitalize">{theme} mode</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('system')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  theme === 'system'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                System
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
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
                className={`px-3 py-1 rounded-full text-sm transition-colors ${language === 'ms' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
              >
                BM
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
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
            <button onClick={detectLocation} className="text-primary text-sm hover:underline transition-colors">
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
