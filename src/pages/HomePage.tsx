import { useState, useEffect } from 'react';
import { 
  MapPin, Clock, ChevronRight, BookOpen, Moon, CircleDot, 
  ScrollText, FileText, LibraryBig, Bookmark, 
  History, Compass, Share2, Star, Play, Download, Flame, 
  BookAIcon,
  GamepadIcon,
  LinkIcon,
  FishIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrayerTimes, getNextPrayer } from '@/hooks/usePrayerTimes';
import { useLocation } from '@/hooks/useLocation';
import { useUserStats } from '@/hooks/useUserStats'; 
import { cn } from '@/lib/utils';
import { toast } from "sonner";

export default function HomePage() {
  const { t } = useLanguage();
  const { location } = useLocation();
  const { dailyStreak, totalZikirToday } = useUserStats(); 
  
  const { prayerTimes, hijriDate, gregorianDate } = usePrayerTimes(
    location.latitude, 
    location.longitude
  );
  
  const [countdown, setCountdown] = useState('--:--:--');
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const [lastRead, setLastRead] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const saved = localStorage.getItem('lastReadSurah');
    if (saved) {
      try {
        setLastRead(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing lastReadSurah", e);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      toast.info("Gunakan menu browser anda untuk 'Add to Home Screen'");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'JomNgaji 2025',
      text: 'Jom mengaji di aplikasi JomNgaji 2025.',
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        toast.success("Pautan telah disalin!");
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const zikirs = [
    { ar: "سُبْحَانَ اللَّهِ", ms: "Maha Suci Allah" },
    { ar: "ٱلْحَمْدُ لِلَّهِ", ms: "Segala puji bagi Allah" },
    { ar: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", ms: "Tiada Tuhan selain Allah" },
    { ar: "أَسْتَغْفِرُ ٱللَّٰهَ", ms: "Aku memohon ampun kepada Allah" }
  ];

  const [dailyZikir] = useState(zikirs[Math.floor(Math.random() * zikirs.length)]);

  useEffect(() => {
    if (!prayerTimes || prayerTimes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      const { prayer, countdown: cd } = getNextPrayer(prayerTimes);
      setCountdown(cd);
      if (prayer) {
        setNextPrayer(t(prayer.nameKey));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, t]);

  const features = [
    { label: 'Quran', icon: BookOpen, path: '/quran', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Sirah', icon: FileText, path: '/sirah', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Tasbih', icon: CircleDot, path: '/tasbih', color: 'bg-emerald-500/10 text-emerald-500' }, 
    { label: 'Doa', icon: Moon, path: '/doa', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Yasin', icon: LibraryBig, path: '/yasin', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Tahlil-Lengkap', icon: ScrollText, path: '/tahlil-lengkap', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Tahlil-Ringkas', icon: BookAIcon, path: '/tahlil-ringkas', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Kiblat', icon: Compass, path: '/kiblat', color: 'bg-emerald-500/10 text-emerald-500' }, 
    { label: 'Kongsi', icon: Share2, path: '#', color: 'bg-emerald-500/10 text-emerald-500', onClick: handleShareApp },
    { label: 'MUZIK', icon: Muzik, path: '/Muzik', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'COMING1', icon: LinkIcon, path: '/COMING1', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'COMING2', icon: FishIcon, path: '/COMING2', color: 'bg-emerald-500/10 text-emerald-500' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-20">
        
        {/* 1. TOP BAR */}
        <div className="flex justify-between items-center px-1">
          <div className="bg-secondary/30 border border-primary/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">QuranDigital 2025</span>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-bold text-primary uppercase tracking-tight">{hijriDate}</p>
             <p className="text-[9px] text-muted-foreground font-medium">{gregorianDate}</p>
          </div>
        </div>

        {/* 2. MAIN PRAYER CARD */}
        <div className="relative overflow-hidden rounded-[32px] min-h-[280px] shadow-2xl border group bg-slate-950">
          <img 
            src="/masjid-hero.jpg" 
            className="absolute inset-0 w-full h-full object-cover object-[center_5%] opacity-40 scale-105"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5 text-white/70 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase">{location.city || 'Detecting...'}</span>
                </div>
                <h2 className="text-5xl font-mono font-bold text-white tracking-tighter leading-none">
                  {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </h2>
              </div>
              <div className="bg-primary text-black px-3 py-1 rounded-full text-[10px] font-black uppercase">
                {nextPrayer}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/5 inline-block">
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {countdown} <span className="text-white/60 lowercase">ke azan</span>
                </p>
              </div>
              
              <div className="grid grid-cols-6 gap-1 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
                {prayerTimes.map((prayer) => {
                  const { prayer: next } = getNextPrayer(prayerTimes);
                  const isNext = next?.nameKey === prayer.nameKey;
                  return (
                    <div key={prayer.nameKey} className={cn(
                      "flex flex-col items-center py-2 rounded-xl transition-all",
                      isNext ? "bg-primary text-black" : "text-white/50"
                    )}>
                      <span className="text-[8px] font-black uppercase mb-0.5">{t(prayer.nameKey).substring(0, 3)}</span>
                      <span className="text-[10px] font-mono font-bold">{prayer.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. NEW STATS DASHBOARD */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-[24px] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter leading-none mb-1">Streak</p>
              <p className="text-lg font-bold leading-none">{dailyStreak} <span className="text-[10px] font-medium text-muted-foreground uppercase">Hari</span></p>
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-[24px] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20">
              <CircleDot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-tighter leading-none mb-1">Zikir</p>
              <p className="text-lg font-bold leading-none">{totalZikirToday} <span className="text-[10px] font-medium text-muted-foreground uppercase">Kali</span></p>
            </div>
          </div>
        </div>

        {/* 4. CONTINUE READING (FIXED: Redirect to /quran only to avoid 404) */}
        <Link 
          to="/quran" 
          className="floating-card p-4 flex items-center justify-between bg-white dark:bg-secondary/20 border-none shadow-sm group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {lastRead ? `Sambung ${lastRead.name}` : "Teruskan Bacaan"}
              </h3>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                Klik untuk sambung surah terakhir
              </p>
            </div>
          </div>
          <Play className="w-4 h-4 text-primary fill-current group-hover:scale-125 transition-transform" />
        </Link>

        {/* 5. FEATURE GRID */}
        <div className="grid grid-cols-4 gap-4">
          {features.map((item, i) => (
            item.onClick ? (
              <button key={i} onClick={item.onClick} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 transition-colors', item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">{item.label}</span>
              </button>
            ) : (
              <Link key={i} to={item.path} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 transition-colors', item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">{item.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* 6. ZIKIR HARI INI */}
        <div className="floating-card p-5 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border-none text-center">
          <p className="text-[9px] uppercase font-black text-emerald-500 mb-3 tracking-[0.2em]">
            Zikir Hari Ini
          </p>
          <h4 className="text-2xl font-serif text-foreground mb-1">
            {dailyZikir.ar}
          </h4>
          <p className="text-xs text-muted-foreground font-medium">
            {dailyZikir.ms}
          </p>
        </div>

        {/* 7. POPULAR SECTION */}
        <div className="space-y-3">
          <h2 className="text-[11px] font-black text-foreground px-1 uppercase tracking-[0.2em]">Popular Hari Ini</h2>
          <div className="floating-card p-4 flex items-center justify-between border-none bg-emerald-500/5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Surah Al-Waqiah</h3>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Sangat digalakkan baca waktu pagi</p>
              </div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-50" />
          </div>

          {!isInstalled && (
            <button 
              onClick={handleInstallApp}
              className="w-full mt-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black">
                  <Download className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-sm text-primary">Pasang Aplikasi</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">Akses lebih pantas & jimat data</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}