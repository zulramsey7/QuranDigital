import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Headphones, CloudRain, Sun, Moon, 
  Heart, Share2, ListMusic, Disc, 
  Timer, Gauge, Info
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
  category: 'terapi' | 'pagi' | 'fokus' | 'fav';
}

const MuzikPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeTab, setActiveTab] = useState<'terapi' | 'pagi' | 'fokus' | 'fav'>('terapi');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState<string[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const tracks: Track[] = [
    { id: 't1', title: "Zikir Munajat Penenang Hati", artist: "Zikir Terapi", url: "https://server8.mp3quran.net/afs/001.mp3", duration: "01:30", category: 'terapi' },
    { id: 't2', title: "Hasbi Rabbi Jallallah", artist: "Munajat Modern", url: "https://www.islamcan.com/audio/nasheeds/dua-nasheed.mp3", duration: "04:15", category: 'terapi' },
    { id: 'p1', title: "Selawat Badar (Acoustic)", artist: "Gema Wahyu", url: "https://www.islamcan.com/audio/nasheeds/assubhu-bada.mp3", duration: "03:45", category: 'pagi' },
    { id: 'p2', title: "Morning Dhikr (Lo-fi)", artist: "Daily Deen", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "06:12", category: 'pagi' },
    { id: 'f1', title: "Quran Focus: Ar-Rahman", artist: "Deep Focus", url: "https://server8.mp3quran.net/afs/055.mp3", duration: "10:00", category: 'fokus' },
    { id: 'f2', title: "Rain & Quran Therapy", artist: "Nature Deen", url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", duration: "05:00", category: 'fokus' },
  ];

  // --- 1. MEDIA SESSION API (Untuk Background Play) ---
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: 'JomNgaji Audio Hub',
        artwork: [
          { src: 'https://cdn-icons-png.flaticon.com/512/3659/3659784.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => playNext(-1));
      navigator.mediaSession.setActionHandler('nexttrack', () => playNext(1));
    }
  }, [currentTrack]);

  // --- 2. AUDIO RECOVERY & PERSISTENCE ---
  useEffect(() => {
    const savedFavs = localStorage.getItem('muzik_favs');
    const lastTrack = localStorage.getItem('muzik_last_track');
    if (savedFavs) setIsLiked(JSON.parse(savedFavs));
    if (lastTrack) {
      const parsed = JSON.parse(lastTrack);
      setCurrentTrack(parsed);
      if (audioRef.current) audioRef.current.src = parsed.url;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('muzik_favs', JSON.stringify(isLiked));
  }, [isLiked]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setTimeLeft(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // --- 3. FUNCTIONS ---
  const handlePlay = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => toast.error("Ralat audio"));
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      localStorage.setItem('muzik_last_track', JSON.stringify(track));
      audioRef.current.src = track.url;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => toast.error("Fail dimuatkan"));
    }
  };

  const playNext = (direction: number) => {
    const idx = tracks.findIndex(t => t.id === currentTrack?.id);
    let nextIdx = idx + direction;
    if (nextIdx < 0) nextIdx = tracks.length - 1;
    if (nextIdx >= tracks.length) nextIdx = 0;
    handlePlay(tracks[nextIdx]);
  };

  const handleLike = (id: string) => {
    setIsLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    toast.success("Koleksi dikemaskini");
  };

  const toggleTimer = () => {
    if (timeLeft !== null) { setTimeLeft(null); toast.info("Timer dibatalkan"); }
    else { setTimeLeft(30 * 60); toast.success("Timer diset 30 minit"); }
  };

  const filteredTracks = activeTab === 'fav' 
    ? tracks.filter(t => isLiked.includes(t.id))
    : tracks.filter(t => t.category === activeTab);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-32 max-w-md mx-auto px-2">
        <audio 
          ref={audioRef} 
          preload="auto"
          onEnded={() => playNext(1)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-black/5">
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <h1 className="text-xl font-bold dark:text-white">Audio Hub</h1>
          </div>
          <div className="flex gap-2">
             <button onClick={() => {
                const s = [1, 1.5, 2, 0.75];
                const n = s[(s.indexOf(playbackSpeed) + 1) % s.length];
                setPlaybackSpeed(n);
                if (audioRef.current) audioRef.current.playbackRate = n;
             }} className="px-3 h-9 rounded-xl bg-secondary/50 flex items-center gap-2 text-[10px] font-bold dark:text-white">
               <Gauge className="w-3 h-3" /> {playbackSpeed}x
             </button>
             <button onClick={toggleTimer} className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all", timeLeft ? "bg-primary text-black" : "bg-secondary/50")}>
               <Timer className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Player Card */}
        <div className={cn("relative overflow-hidden rounded-[40px] p-8 shadow-2xl border border-white/5 transition-colors duration-500", 
          activeTab === 'terapi' ? "bg-slate-950" : activeTab === 'pagi' ? "bg-emerald-950" : "bg-indigo-950")}>
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <Disc className={cn("w-48 h-48 text-white", isPlaying && "animate-spin-slow")} />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-[30px] bg-white/10 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-inner">
              <Headphones className="w-10 h-10 text-primary" />
            </div>
            <div className="min-h-[60px]">
              <h2 className="text-xl font-bold text-white px-4 leading-tight">{currentTrack?.title || "Sila Pilih Alunan"}</h2>
              <p className="text-sm text-primary/80 font-medium mt-1 uppercase tracking-widest">{currentTrack?.artist || "Sedia"}</p>
            </div>
            <div className="flex items-center gap-6">
               <button onClick={() => currentTrack && handleLike(currentTrack.id)} className={cn("p-3 transition-all", isLiked.includes(currentTrack?.id || '') ? "text-red-500 scale-125" : "text-white/40")}>
                 <Heart className={cn("w-6 h-6", isLiked.includes(currentTrack?.id || '') && "fill-current")} />
               </button>
               <button onClick={() => currentTrack && handlePlay(currentTrack)} className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                 {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
               </button>
               <button onClick={() => toast.success("Info disalin")} className="p-3 text-white/40"><Share2 className="w-6 h-6" /></button>
            </div>
            {timeLeft !== null && (
              <p className="text-[10px] text-primary font-mono font-bold bg-primary/10 px-4 py-1 rounded-full">
                OFF IN: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            )}
          </div>
        </div>

        {/* Tab Menu */}
        <div className="flex gap-1 p-1 bg-secondary/30 rounded-3xl border border-black/5 overflow-x-auto no-scrollbar">
          {['terapi', 'pagi', 'fokus', 'fav'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn(
              "flex-1 py-3 px-4 rounded-2xl text-[10px] font-black uppercase transition-all whitespace-nowrap",
              activeTab === tab ? "bg-white dark:bg-slate-800 shadow-md text-emerald-600" : "text-muted-foreground opacity-60"
            )}>
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="px-2 space-y-3">
          {filteredTracks.map((track) => (
            <div key={track.id} onClick={() => handlePlay(track)} className={cn(
              "flex items-center justify-between p-4 rounded-[28px] border transition-all cursor-pointer",
              currentTrack?.id === track.id ? "bg-primary/10 border-primary/30" : "bg-white dark:bg-slate-900 border-black/5"
            )}>
              <div className="flex items-center gap-4 text-left">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", currentTrack?.id === track.id ? "bg-primary text-black" : "bg-secondary")}>
                  {currentTrack?.id === track.id && isPlaying ? <div className="flex gap-0.5"><div className="w-0.5 h-3 bg-black animate-bounce" /></div> : <Music className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight dark:text-white">{track.title}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase">{track.artist}</p>
                </div>
              </div>
              <Heart className={cn("w-4 h-4", isLiked.includes(track.id) ? "text-red-500 fill-current" : "text-muted-foreground/20")} />
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.animate-spin-slow { animation: spin 15s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </MainLayout>
  );
};

export default MuzikPage;
