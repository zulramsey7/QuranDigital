import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Headphones, CloudRain, Sun, Moon, 
  Volume2, Heart, Share2, ListMusic,
  Disc, AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  category: 'terapi' | 'pagi' | 'fokus';
}

const MuzikPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'terapi' | 'pagi' | 'fokus'>('terapi');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // DATA PLAYLIST - Menggunakan Audio Islamik/Natural yang realistik
  const tracks: Track[] = [
    { 
      id: 't1', 
      title: "Zikir Munajat Penenang Hati", 
      artist: "Zikir Terapi", 
      url: "https://server8.mp3quran.net/afs/001.mp3", // Contoh Surah Al-Fatihah (Sangat Tenang)
      duration: "01:30", 
      category: 'terapi' 
    },
    { 
      id: 't2', 
      title: "Hasbi Rabbi Jallallah", 
      artist: "Zikir Munajat", 
      url: "https://www.islamcan.com/audio/nasheeds/dua-nasheed.mp3", 
      duration: "04:15", 
      category: 'terapi' 
    },
    { 
      id: 'p1', 
      title: "Selawat Badar Semangat", 
      artist: "Gema Wahyu", 
      url: "https://www.islamcan.com/audio/nasheeds/assubhu-bada.mp3", 
      duration: "03:45", 
      category: 'pagi' 
    },
    { 
      id: 'f1', 
      title: "Lofi Quran & Nature Rain", 
      artist: "Deep Focus", 
      url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", // Bunyi Hujan Asli
      duration: "10:00", 
      category: 'fokus' 
    },
  ];

  const filteredTracks = tracks.filter(t => t.category === activeTab);

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play().catch(() => toast.error("Gagal memainkan audio"));
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.load();
        audioRef.current.play().catch(() => {
            toast.error("Audio tidak dapat dimuatkan");
            setIsPlaying(false);
        });
      }
    }
  };

  const handleLike = (id: string) => {
    if (isLiked.includes(id)) {
      setIsLiked(isLiked.filter(i => i !== id));
      toast.info("Dikeluarkan dari kegemaran");
    } else {
      setIsLiked([...isLiked, id]);
      toast.success("Ditambah ke kegemaran!");
    }
  };

  const handleShare = async () => {
    if (!currentTrack) return;
    const shareText = `Sedang mendengar ${currentTrack.title} di JomNgaji 2025. Alunan yang sangat menenangkan!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'JomNgaji Audio',
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Pautan dikongsi ke clipboard!");
      }
    } catch (err) {
      console.log('Share failed');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-32 max-w-md mx-auto">
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

        {/* 1. Header */}
        <div className="flex items-center gap-4 pt-4 px-2">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-black/5">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold dark:text-white">Audio Hub</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Ketenangan Jiwa • 2025</p>
          </div>
        </div>

        {/* 2. Player Card */}
        <div className="relative overflow-hidden rounded-[40px] p-8 bg-slate-950 shadow-2xl border border-white/5 mx-2">
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <Disc className={cn("w-48 h-48 text-white", isPlaying && "animate-spin-slow")} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-[30px] bg-primary/20 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-inner">
              <Headphones className="w-10 h-10 text-primary" />
            </div>
            
            <div className="min-h-[60px]">
              <h2 className="text-xl font-bold text-white px-4">
                {currentTrack ? currentTrack.title : "Sila Pilih Alunan"}
              </h2>
              <p className="text-sm text-primary/80 font-medium mt-1">
                {currentTrack ? currentTrack.artist : "Sedia untuk dimainkan"}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2">
               <button 
                onClick={() => currentTrack && handleLike(currentTrack.id)}
                className={cn("p-3 transition-all", isLiked.includes(currentTrack?.id || '') ? "text-red-500 scale-125" : "text-white/40")}
               >
                 <Heart className={cn("w-6 h-6", isLiked.includes(currentTrack?.id || '') && "fill-current")} />
               </button>
               
               <button 
                onClick={() => currentTrack && handlePlay(currentTrack)}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
               >
                 {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
               </button>

               <button onClick={handleShare} className="p-3 text-white/40 hover:text-white transition-colors">
                 <Share2 className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>

        {/* 3. Mood Tabs */}
        <div className="flex gap-2 p-1.5 bg-secondary/30 rounded-3xl border border-black/5 mx-2">
          {(['terapi', 'pagi', 'fokus'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all",
                activeTab === tab ? "bg-white dark:bg-slate-800 shadow-md text-emerald-600 scale-[1.02]" : "text-muted-foreground opacity-60"
              )}
            >
              {tab === 'terapi' && <Moon className="w-3 h-3" />}
              {tab === 'pagi' && <Sun className="w-3 h-3" />}
              {tab === 'fokus' && <CloudRain className="w-3 h-3" />}
              {tab}
            </button>
          ))}
        </div>

        {/* 4. Playlist */}
        <div className="px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <ListMusic className="w-4 h-4" /> Senarai {activeTab}
            </h3>
          </div>

          <div className="grid gap-3">
            {filteredTracks.map((track) => (
              <div 
                key={track.id}
                onClick={() => handlePlay(track)}
                className={cn(
                  "group flex items-center justify-between p-4 rounded-[28px] border transition-all cursor-pointer",
                  currentTrack?.id === track.id 
                    ? "bg-primary/10 border-primary/30 shadow-sm" 
                    : "bg-white dark:bg-slate-900 border-black/5 hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                    currentTrack?.id === track.id ? "bg-primary text-black rotate-12" : "bg-secondary text-muted-foreground group-hover:bg-primary/20"
                  )}>
                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="flex gap-1 items-end h-3">
                        <div className="w-1 bg-black animate-[bounce_0.5s_infinite]" />
                        <div className="w-1 bg-black animate-[bounce_0.8s_infinite]" />
                        <div className="w-1 bg-black animate-[bounce_0.6s_infinite]" />
                      </div>
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight dark:text-white">{track.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">{track.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Footer Info */}
        <div className="mx-4 p-6 rounded-[35px] bg-emerald-500/5 border border-emerald-500/10 text-center">
            <p className="text-[11px] font-medium text-emerald-700/70 italic leading-relaxed">
              "Ketenangan tidak datang daripada bunyi yang kuat, tetapi daripada zikir yang meresap ke dalam jiwa."
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}} />
    </MainLayout>
  );
};

export default MuzikPage;
