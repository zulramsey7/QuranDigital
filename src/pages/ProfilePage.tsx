import { BookOpen, Target, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
  const { t } = useLanguage();

  const stats = [
    { icon: BookOpen, label: t('surahRead'), value: '5', color: 'text-emerald-500' },
    { icon: Target, label: t('zikirToday'), value: '99', color: 'text-amber-500' },
    { icon: Flame, label: t('dailyStreak'), value: '3', color: 'text-orange-500' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-semibold">{t('profile')}</h1>

        {/* Avatar */}
        <div className="floating-card p-6 flex flex-col items-center gold-glow">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
            🕌
          </div>
          <h2 className="mt-4 text-xl font-semibold">Muslim User</h2>
          <p className="text-sm text-muted-foreground">Alhamdulillah</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="floating-card p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto ${stat.color}`} />
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Settings Link */}
        <Link to="/settings" className="floating-card p-4 flex items-center justify-between">
          <span>{t('settings')}</span>
          <span className="text-muted-foreground">→</span>
        </Link>
      </div>
    </MainLayout>
  );
}
