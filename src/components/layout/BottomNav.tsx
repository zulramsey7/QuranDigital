import { Home, BookOpen, Compass, Moon, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, labelKey: 'home', path: '/' },
  { icon: BookOpen, labelKey: 'quran', path: '/quran' },
  { icon: Compass, labelKey: 'qibla', path: '/qibla' },
  { icon: Moon, labelKey: 'doa', path: '/doa' },
  { icon: User, labelKey: 'profile', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    /* 1. Container luar untuk centering & margin kiri-kanan (px-4) */
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      
      {/* 2. Bar Navigasi - lebar max-w-lg supaya sama dengan Main Content */}
      <nav className="w-full max-w-lg bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-[24px] p-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 relative min-w-[64px]',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'
              )}
            >
              {/* Indikator titik di atas ikon jika aktif */}
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-primary animate-pulse" />
              )}

              <item.icon className={cn(
                'w-5 h-5 transition-all duration-300',
                isActive ? 'scale-110 stroke-[2.5px]' : 'scale-100 stroke-[1.5px]'
              )} />

              <span className={cn(
                'text-[10px] font-bold uppercase tracking-tighter transition-all duration-300',
                isActive ? 'opacity-100' : 'opacity-70 font-medium'
              )}>
                {t(item.labelKey)}
              </span>

              {/* Background highlight halus bila aktif */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10 animate-in zoom-in-95 duration-300" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}