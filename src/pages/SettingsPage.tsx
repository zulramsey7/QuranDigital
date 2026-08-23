import { ChevronLeft, Globe, MapPin, Moon, Sun, Smartphone, Type } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { location, detectLocation } = useLocation();
  const { theme, setTheme } = useAppTheme();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        <div className="flex items-center gap-4 pt-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">{t('settings')}</h1>
        </div>

        {/* Theme Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 shadow-sm border border-black/5 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Tema Aplikasi</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pilih paparan</p>
            </div>
          </div>
          
          <div className="bg-secondary/50 p-1.5 rounded-2xl flex gap-1">
            {['light', 'dark', 'system'].map((m) => (
              <button
                key={m}
                onClick={() => setTheme(m as 'light' | 'dark' | 'system')}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold capitalize transition-all active:scale-95 flex items-center justify-center gap-2",
                  theme === m 
                    ? "bg-white dark:bg-slate-800 shadow-sm text-primary" 
                    : "text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
                )}
              >
                {m === 'light' && <Sun className="w-3.5 h-3.5" />}
                {m === 'dark' && <Moon className="w-3.5 h-3.5" />}
                {m === 'system' && <Smartphone className="w-3.5 h-3.5" />}
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 shadow-sm border border-black/5 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">{t('language')}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Bahasa Antaramuka</p>
            </div>
          </div>

          <div className="bg-secondary/50 p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setLanguage('ms')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-bold transition-all active:scale-95",
                language === 'ms' 
                  ? "bg-white dark:bg-slate-800 shadow-sm text-primary" 
                  : "text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
              )}
            >
              Bahasa Melayu
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-bold transition-all active:scale-95",
                language === 'en' 
                  ? "bg-white dark:bg-slate-800 shadow-sm text-primary" 
                  : "text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
              )}
            >
              English
            </button>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">{t('location')}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{location.city || '...'}, {location.country || '...'}</p>
            </div>
          </div>
          <button 
            onClick={detectLocation} 
            className="px-4 py-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors active:scale-95"
          >
            Update
          </button>
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
