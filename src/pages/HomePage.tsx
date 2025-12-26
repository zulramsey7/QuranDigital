import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Clock, ChevronRight, BookOpen, Moon, CircleDot, 
  ScrollText, FileText, LibraryBig, Bookmark, 
  History, Compass, Share2, Play, Download, Flame, 
  BookAIcon, GamepadIcon, LinkIcon, Music 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrayerTimes, getNextPrayer } from '@/hooks/usePrayerTimes';
import { useLocation } from '@/hooks/useLocation';
import { useUserStats } from '@/hooks/useUserStats'; 
import { cn } from '@/lib/utils';
import { toast } from "sonner";

// 1. IMPORT DATA DARI JSON
import DEEP_QUOTES from '@/data/quotes.json';

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

  // --- 2. LOGIC GAMBAR (JSON & AUTO-ROTATE) ---
  const cardRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState(DEEP_QUOTES[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * DEEP_QUOTES.length);
    setQuote(DEEP_QUOTES[randomIndex]);
  };

  useEffect(() => {
    // Tukar ayat setiap kali refresh (Initial Load)
    handleRandomize();

    // Timer: Tukar ayat secara automatik setiap 5 minit
    const timer = setInterval(() => {
      handleRandomize();
    }, 300000); 

    return () => clearInterval(timer);
  }, []);

  const handleShareImage = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    const toastId = toast.loading("Menjana gambar indah...");
    try {
      const dataUrl = await htmlToImage.toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'jomngaji-quote.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Ayat Deep Hari Ini' });
      } else {
        const link = document.createElement('a');
        link.download = 'jomngaji-quote.jpg';
        link.href = dataUrl;
        link.click();
        toast.info("Gambar disimpan ke galeri.");
      }
      toast.success("Siap!", { id: toastId });
    } catch (err) {
      toast.error("Gagal menjana gambar", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  // --- LOGIC ASAL (PWA, SHARE, ZIKIR, TIME) ---
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled(true);
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    const saved = localStorage.getItem('lastReadSurah');
    if (saved) {
      try { setLastRead(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) { toast.info("Gunakan menu browser anda"); return; }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { setDeferredPrompt(null); setIsInstalled(true); }
  };

  const handleShareApp = async () => {
    const shareData = { title: 'JomNgaji 2025', text: 'Jom mengaji di aplikasi JomNgaji 2025.', url: window.location.origin };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(window.location.origin); toast.success("Pautan disalin!"); }
    } catch (err) { console.log(err); }
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
      if (prayer) setNextPrayer(t(prayer.nameKey));
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
    { label: 'MUZIK', icon: Music, path: '/MUZIK', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'COMING1', icon: LinkIcon, path: '/COMING1', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'GAME', icon: GamepadIcon, path: '/Game', color: 'bg-emerald-500/10 text-emerald-500' },
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
          <img src="/masjid-hero.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_5%] opacity-40 scale-105" alt="Bg" />
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
              <div className="bg-primary text-black px-3 py-1 rounded-full text-[10px] font-black uppercase">{nextPrayer}</div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/5 inline-block">
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {countdown} <span className="text-white/60 lowercase">ke azan</span>
                </p>
              </div>
              <div className="grid grid-cols-6 gap-1 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
                {prayerTimes.map((prayer) => (
                  <div key={prayer.nameKey} className={cn("flex flex-col items-center py-2 rounded-xl transition-all", getNextPrayer(prayerTimes).prayer?.nameKey === prayer.nameKey ? "bg-primary text-black" : "text-white/50")}>
                    <span className="text-[8px] font-black uppercase mb-0.5">{t(prayer.nameKey).substring(0, 3)}</span>
                    <span className="text-[10px] font-mono font-bold">{prayer.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. STATS DASHBOARD */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-[24px] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg"><Flame className="w-5 h-5 fill-current" /></div>
            <div><p className="text-[10px] font-black text-emerald-500 uppercase leading-none mb-1">Streak</p><p className="text-lg font-bold leading-none">{dailyStreak} <span className="text-[10px] font-medium text-muted-foreground uppercase">Hari</span></p></div>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-[24px] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black shadow-lg"><CircleDot className="w-5 h-5" /></div>
            <div><p className="text-[10px] font-black text-primary uppercase leading-none mb-1">Zikir</p><p className="text-lg font-bold leading-none">{totalZikirToday} <span className="text-[10px] font-medium text-muted-foreground uppercase">Kali</span></p></div>
          </div>
        </div>

        {/* 4. CONTINUE READING */}
        <Link to="/quran" className="floating-card p-4 flex items-center justify-between bg-white dark:bg-secondary/20 border-none shadow-sm group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Bookmark className="w-5 h-5 fill-current" /></div>
            <div><h3 className="font-bold text-sm">{lastRead ? `Sambung ${lastRead.name}` : "Teruskan Bacaan"}</h3><p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Klik untuk sambung surah terakhir</p></div>
          </div>
          <Play className="w-4 h-4 text-primary fill-current group-hover:scale-125 transition-transform" />
        </Link>

        {/* 5. FEATURE GRID */}
        <div className="grid grid-cols-4 gap-4">
          {features.map((item, i) => (
            item.onClick ? (
              <button key={i} onClick={item.onClick} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5', item.color)}><item.icon className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">{item.label}</span>
              </button>
            ) : (
              <Link key={i} to={item.path} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5', item.color)}><item.icon className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">{item.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* 6. ZIKIR HARI INI */}
        <div className="floating-card p-5 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border-none text-center">
          <p className="text-[9px] uppercase font-black text-emerald-500 mb-3 tracking-[0.2em]">Zikir Hari Ini</p>
          <h4 className="text-2xl font-serif text-foreground mb-1">{dailyZikir.ar}</h4>
          <p className="text-xs text-muted-foreground font-medium">{dailyZikir.ms}</p>
        </div>

        {/* 7. POPULAR / AYAT DEEP GENERATOR (MODERN 21:9) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[11px] font-black text-foreground uppercase tracking-[0.2em]">Ayat Deep Automatik</h2>
            <div className="flex gap-2">
               <span className="text-[8px] bg-primary/10 text-primary px-2 py-1 rounded-md font-bold animate-pulse">AUTO-ROTATE</span>
               <button onClick={handleRandomize} className="p-2 bg-secondary rounded-full active:scale-90 transition-transform">
                 <History className="w-4 h-4 text-primary" />
               </button>
            </div>
          </div>

          <div 
            ref={cardRef} 
            className="relative aspect-[21/9] rounded-[20px] overflow-hidden bg-slate-900 shadow-xl mx-auto w-full border border-white/5"
          >
            <img 
              src={quote.img} 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" 
              alt="Background" 
              key={quote.img} 
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            
            {/* Watermark Atas Kiri (Guna favicon.ico dari public) */}
            <div className="absolute top-3 left-4 flex items-center gap-2 opacity-80">
               <img 
                 src="/favicon.ico" 
                 className="w-5 h-5 object-contain" 
                 alt="Logo" 
               />
               <span className="text-[7px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
                 JomNgaji
               </span>
            </div>

            {/* Content Teks */}
            <div className="absolute inset-0 p-4 flex flex-col justify-center text-center">
              <h3 className="text-base font-serif text-white leading-tight mb-1 drop-shadow-lg">
                {quote.ar}
              </h3>
              <div className="w-6 h-0.5 bg-primary mx-auto rounded-full mb-2" />
              <p className="text-[10px] font-medium text-white/90 italic leading-snug px-4">
                "{quote.ms}"
              </p>
              <p className="text-[7px] font-bold text-primary/80 uppercase tracking-widest mt-1">
                — {quote.ref} —
              </p>
            </div>

            {/* Watermark Bawah (URL) */}
            <div className="absolute bottom-2 left-0 right-0 text-center opacity-40">
               <p className="text-[6px] text-white font-bold tracking-[0.15em] uppercase">
                 JomNgaji.netlify.app
               </p>
            </div>
          </div>

          <button 
            onClick={handleShareImage} 
            disabled={isGenerating} 
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all font-bold uppercase tracking-widest text-[10px] disabled:opacity-50"
          >
            <Share2 className="w-3.5 h-3.5" />
            {isGenerating ? "Menjana..." : "Kongsi Ayat Hari Ini"}
          </button>
        </div>

        {/* 8. INSTALL APP SECTION */}
        {!isInstalled && (
          <button onClick={handleInstallApp} className="w-full mt-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between group active:scale-95 transition-all">
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
    </MainLayout>
  );
}