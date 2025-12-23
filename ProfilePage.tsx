import { BookOpen, Target, Flame, Settings, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserStats } from '@/hooks/useUserStats'; 
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { t } = useLanguage();
  
  // Ambil data dinamik dari hook
  const { dailyStreak, totalZikirToday, surahsReadCount } = useUserStats(); 

  // Stats menggunakan value yang betul dari hooks
  const stats = [
    { 
      icon: BookOpen, 
      label: t('surahRead'), 
      value: surahsReadCount, // Guna data sebenar
      bgColor: 'bg-emerald-500/10', 
      textColor: 'text-emerald-500' 
    },
    { 
      icon: Target, 
      label: t('zikirToday'), 
      value: totalZikirToday, 
      bgColor: 'bg-emerald-500/10', 
      textColor: 'text-emerald-500' 
    },
    { 
      icon: Flame, 
      label: t('dailyStreak'), 
      value: dailyStreak, 
      bgColor: 'bg-emerald-500/10', 
      textColor: 'text-emerald-500' 
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        
        {/* Header Profil */}
        <div className="flex items-center justify-between px-1">
          <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {t('profile')}
          </h1>
          <Link to="/settings" className="p-2 rounded-full bg-secondary/50 text-muted-foreground active:scale-90 transition-transform">
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Avatar & Info Card */}
        <div className="floating-card p-8 flex flex-col items-center bg-gradient-to-b from-emerald-500/15 to-transparent border-emerald-500/10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/30 shadow-inner">
              <User className="w-12 h-12 text-emerald-500" />
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <h2 className="mt-5 text-xl font-bold tracking-tight">Muslim User</h2>
          <p className="text-xs font-black uppercase text-emerald-500 tracking-widest mt-1">Hamba Allah</p>
          
          <div className="mt-4 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
             <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Alhamdulillah</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="floating-card p-4 text-center bg-white dark:bg-secondary/20 border-none shadow-sm transition-all active:scale-95">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm", stat.bgColor)}>
                <stat.icon className={cn("w-5 h-5", stat.textColor)} />
              </div>
              <p className="text-xl font-black tracking-tighter">{stat.value}</p>
              <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-tight mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Menu Actions */}
        <div className="space-y-3">
          <Link to="/settings" className="floating-card p-4 flex items-center justify-between group bg-white dark:bg-secondary/10 border-none shadow-sm active:bg-emerald-500/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{t('settings')}</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-tight">Konfigurasi & Bahasa</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </MainLayout>
  );
}