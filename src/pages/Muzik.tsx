import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Headphones, CloudRain, Sun, Moon, 
  Heart, Share2, ListMusic, Disc, 
  Timer, Gauge, SkipForward, Info
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

  // --- STATES ---
  const [activeTab, setActiveTab] = useState<'terapi' | 'pagi' | 'fokus' | 'fav'>('terapi');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState<string[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // --- DATA PLAYLIST ---
  const tracks: Track[] = [
    { id: 't1', title: "Zikir Munajat Penenang Hati", artist: "Zikir Terapi", url: "https://server8.mp3quran.net/afs/001.mp3", duration: "01:30", category: 'terapi' },
    { id: 't2', title: "Hasbi Rabbi Jallallah", artist: "Munajat Modern", url: "https://www.islamcan.com/audio/nasheeds/dua-nasheed.mp3", duration: "04:15", category: 'terapi' },
    { id: 'p1', title: "Selawat Badar (Acoustic)", artist: "Gema Wahyu", url: "https://www.islamcan.com/audio/nasheeds/assubhu-bada.mp3", duration: "03:45", category: 'pagi' },
    { id: 'p2', title: "Morning Dhikr (Lo-fi)", artist: "Daily Deen", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "06:12", category: 'pagi' },
    { id: 'f1', title: "Quran Focus: Ar-Rahman", artist: "Deep Focus", url: "https://server8.mp3quran.net/afs/055.mp3", duration: "10:00", category: 'fokus' },
    { id: 'f2', title: "Rain & Quran Therapy", artist: "Nature Deen", url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", duration: "05:00", category: 'fokus' },
  ];

  // --- PERSISTENCE LOGIC ---
  useEffect(() => {
    const savedFavs = localStorage.getItem('muzik_favs');
    const lastTrack = localStorage.getItem('muzik_last_track');
    if (savedFavs) setIsLiked(JSON.parse(savedFavs));
    if (lastTrack) setCurrentTrack(JSON.parse(lastTrack));
  }, []);

  useEffect(() => {
    localStorage.setItem('muzik_favs', JSON.stringify(isLiked));
  }, [isLiked]);

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setTimeLeft(null);
      toast.info("Sleep timer tamat. Audio dihentikan.");
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // --- AUDIO CONTROLS ---
  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) audioRef.current?.pause();
      else audioRef.current?.play();
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      localStorage.setItem('muzik_last_track', JSON.stringify(track));
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.load();
        audioRef.current.play().catch(() => {
          toast.error("Audio tidak dapat dimuatkan");
          setIsPlaying(false);
        });
      }
    }
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.75];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
    toast.success(`Kelajuan: ${nextSpeed}x`);
  };

  const setTimer = (mins: number) => {
    setTimeLeft(mins * 60);
    toast.success(`Timer di set untuk ${mins} minit`);
  };

  const handleOnEnded = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    handlePlay(nextTrack);
  };

  const filteredTracks = activeTab === 'fav' 
    ? tracks.filter(t => isLiked.includes(t.id))
    : tracks.filter(t => t.category === activeTab);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-32 max-w-md mx-auto px-2">
        <audio ref={audioRef} onEnded={handleOnEnded} />

        {/* 1. HEADER */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-black/5">
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold dark:text-white">Audio Hub</h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Premium Experience</p>
            </div>
          </div>
          <div className="flex gap-2">
             <button onClick={changeSpeed} className="w-9 h-9 rounded-xl bg-secondary/50 flex items-center justify-center text-[10px] font-bold">
               {playbackSpeed}x
             </button>
             <button onClick={() => setTimer(30)} className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors", timeLeft ? "bg-primary text-black" : "bg-secondary/50")}>
               <Timer className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* 2. PLAYER CARD (DYNAMIC) */}
        <div className={cn(
            "relative overflow-hidden rounded-[40px] p-8 shadow-2xl border border-white/5 transition-all duration-700",
            activeTab === 'terapi' ? "bg-slate-950" : activeTab === 'pagi' ? "bg-emerald-950" : "bg-indigo-950"
        )}>
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <Disc className={cn("w-48 h-48 text-white", isPlaying && "animate-spin-slow")} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-[30px] bg-white/10 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-inner">
              <Headphones className="w-10 h-10 text-primary" />
            </div>
            
            <div className="min-h-[70px]">
              <h2 className="text-xl font-bold text-white px-4 leading-tight">
                {currentTrack ? currentTrack.title : "Sila Pilih Alunan"}
              </h2>
              <p className="text-sm text-primary/80 font-medium mt-1 uppercase tracking-widest">
                {currentTrack ? currentTrack.artist : "Ready to play"}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2">
               <button onClick={() => currentTrack && handleLike(currentTrack.id)} className={cn("p-3 transition-all", isLiked.includes(currentTrack?.id || '') ? "text-red-500 scale-125" : "text-white/40")}>
                 <Heart className={cn("w-6 h-6", isLiked.includes(currentTrack?.id || '') && "fill-current")} />
               </button>
               
               <button onClick={() => currentTrack && handlePlay(currentTrack)} className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                 {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
               </button>

               <button onClick={() => {
                  if (currentTrack) {
                    navigator.clipboard.writeText(`Dengar ${currentTrack.title} di JomNgaji!`);
                    toast.success("Info dikongsi!");
                  }
               }} className="p-3 text-white/40 hover:text-white transition-colors">
                 <Share2 className="w-6 h-6" />
               </button>
            </div>

            {timeLeft && (
              <div className="bg-black/20 px-3 py-1 rounded-full border border-white/5">
                <p className="text-[10px] text-white/60 font-mono tracking-widest">OFF IN: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. TABS MENU */}
        <div className="flex gap-1.5 p-1.5 bg-secondary/30 rounded-3xl border border-black/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'terapi', label: 'Terapi', icon: Moon },
            { id: 'pagi', label: 'Pagi', icon: Sun },
            { id: 'fokus', label: 'Fokus', icon: CloudRain },
            { id: 'fav', label: 'Koleksi', icon: Heart }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap",
                activeTab === tab.id ? "bg-white dark:bg-slate-800 shadow-md text-emerald-600" : "text-muted-foreground opacity-60"
              )}>
              <tab.icon className={cn("w-3 h-3", tab.id === 'fav' && activeTab === 'fav' && "fill-current")} /> {tab.label}
            </button>
          ))}
        </div>

        {/* 4. LISTING */}
        <div className="px-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <ListMusic className="w-4 h-4" /> {activeTab === 'fav' ? 'Lagu Kegemaran' : `Mood: ${activeTab}`}
            </h3>
            <span className="text-[10px] font-bold text-primary">{filteredTracks.length} ITEM</span>
          </div>

          <div className="grid gap-3">
            {filteredTracks.length > 0 ? filteredTracks.map((track) => (
              <div key={track.id} onClick={() => handlePlay(track)} className={cn(
                  "group flex items-center justify-between p-4 rounded-[28px] border transition-all cursor-pointer",
                  currentTrack?.id === track.id ? "bg-primary/10 border-primary/30" : "bg-white dark:bg-slate-900 border-black/5 hover:border-primary/20"
                )}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", currentTrack?.id === track.id ? "bg-primary text-black scale-90" : "bg-secondary")}>
                    {currentTrack?.id === track.id && isPlaying ? (
                       <div className="flex gap-1 items-end h-3">
                            <div className="w-0.5 bg-black animate-[bounce_0.5s_infinite]" />
                            <div className="w-0.5 bg-black animate-[bounce_0.8s_infinite]" />
                            <div className="w-0.5 bg-black animate-[bounce_0.6s_infinite]" />
                        </div>
                    ) : <Music className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight dark:text-white">{track.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5 tracking-tight">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {isLiked.includes(track.id) && <Heart className="w-3 h-3 text-red-500 fill-current" />}
                   <span className="text-[10px] font-mono font-bold text-muted-foreground">{track.duration}</span>
                </div>
              </div>
            )) : (
              <div className="py-12 text-center opacity-20 flex flex-col items-center">
                <Info className="w-8 h-8 mb-2" />
                <p className="text-[10px] font-black uppercase">Tiada Rekod</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </MainLayout>
  );
};

export default MuzikPage;
