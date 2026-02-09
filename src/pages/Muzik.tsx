import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Heart, Disc, 
  Timer, Gauge, Search, Repeat, Repeat1, SkipForward, SkipBack,
  Clock, CloudOff, DownloadCloud,
  Volume2, VolumeX, Shuffle,
  BarChart2, Mic2, X, ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import musicData from "@/data/audioData.json";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  category: 'nasyid' | 'sholawat' | 'zikir' | 'fav';
}

const MuzikPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tracks] = useState<Track[]>(musicData as Track[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'nasyid' | 'sholawat' | 'zikir' | 'fav'>('nasyid');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState<string[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('all');
  const [isShuffle, setIsShuffle] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false); 
  
  const [cachedTracks, setCachedTracks] = useState<string[]>([]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Mini Player
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlayerVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, []);

  // Auto-Close Volume Menu
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showVolumeMenu) {
      timer = setTimeout(() => {
        setShowVolumeMenu(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showVolumeMenu, volume, isMuted]);

  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'fav' ? isLiked.includes(track.id) : track.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [tracks, searchQuery, activeTab, isLiked]);

  useEffect(() => {
    const checkCache = async () => {
      if ('caches' in window) {
        try {
          const cache = await caches.open('jomngaji-audio-v1');
          const keys = await cache.keys();
          const paths = keys.map(request => new URL(request.url).pathname);
          setCachedTracks(paths);
        } catch (error) {
          console.error("Cache access error:", error);
        }
      }
    };
    checkCache();

    const lastTrack = localStorage.getItem('muzik_last_track');
    if (lastTrack) setCurrentTrack(JSON.parse(lastTrack));
    else if (tracks.length > 0) setCurrentTrack(tracks[0]);
    
    const savedFavs = localStorage.getItem('muzik_favs');
    if (savedFavs) setIsLiked(JSON.parse(savedFavs));

    const savedVolume = localStorage.getItem('muzik_volume');
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      if (audioRef.current) audioRef.current.volume = vol;
    }
  }, [tracks]);

  useEffect(() => {
    localStorage.setItem('muzik_favs', JSON.stringify(isLiked));
  }, [isLiked]);

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
    localStorage.setItem('muzik_volume', val.toString());
  };

  const toggleOffline = async (track: Track) => {
    if (!('caches' in window)) {
      toast.error("Browser anda tidak menyokong fungsi offline.");
      return;
    }
    const cache = await caches.open('jomngaji-audio-v1');
    const isCached = cachedTracks.some(path => path === track.url);
    if (isCached) {
      await cache.delete(track.url);
      setCachedTracks(prev => prev.filter(path => path !== track.url));
      toast.info("Dibuang daripada storan offline.");
    } else {
      toast.promise(cache.add(track.url), {
        loading: 'Menyimpan untuk offline...',
        success: () => {
          setCachedTracks(prev => [...prev, track.url]);
          return 'Tersedia offline!';
        },
        error: 'Gagal muat turun. Sila semak internet.'
      });
    }
  };

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

  const playNextTrack = () => {
    if (!currentTrack) return;
    
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    let nextTrack;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * filteredTracks.length);
      nextTrack = filteredTracks[randomIndex];
    } else {
      const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
      if (currentIndex !== -1 && currentIndex < filteredTracks.length - 1) {
        nextTrack = filteredTracks[currentIndex + 1];
      } else if (repeatMode === 'all' && filteredTracks.length > 0) {
        nextTrack = filteredTracks[0];
      }
    }

    if (nextTrack) {
      handlePlay(nextTrack);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      handlePlay(filteredTracks[currentIndex - 1]);
    } else {
      handlePlay(filteredTracks[filteredTracks.length - 1]);
    }
  };

  const handlePlay = async (track: Track) => {
    if (!audioRef.current) return;
    try {
      if (currentTrack?.id === track.id && audioRef.current.src.includes(track.url)) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } else {
        setCurrentTrack(track);
        localStorage.setItem('muzik_last_track', JSON.stringify(track));
        audioRef.current.src = track.url;
        audioRef.current.playbackRate = playbackSpeed;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("Playback error:", err);
      setIsPlaying(false);
      toast.error("Gagal memainkan audio.");
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <MainLayout>
      <div className="min-h-screen space-y-6 animate-fade-in pb-32 max-w-md mx-auto px-4 relative">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
           <div className={cn(
             "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 transition-all duration-1000",
             activeTab === 'nasyid' ? "bg-blue-500" : activeTab === 'sholawat' ? "bg-emerald-500" : activeTab === 'zikir' ? "bg-indigo-500" : "bg-rose-500"
           )} />
           <div className={cn(
             "absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 transition-all duration-1000",
             activeTab === 'nasyid' ? "bg-cyan-500" : activeTab === 'sholawat' ? "bg-lime-500" : activeTab === 'zikir' ? "bg-purple-500" : "bg-orange-500"
           )} />
        </div>

        <audio 
          ref={audioRef} 
          onEnded={playNextTrack} 
          onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Header */}
        <div className="flex items-center justify-between pt-6 relative z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-sm flex items-center justify-center border border-black/5 active:scale-90 transition-all">
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-black dark:text-white uppercase tracking-tight">Audio</span>
              <span className="text-[10px] text-primary font-bold uppercase leading-none">Koleksi</span>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button onClick={() => {
                const speeds = [1, 1.5, 2];
                const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                setPlaybackSpeed(next);
                if (audioRef.current) audioRef.current.playbackRate = next;
             }} className="px-3 h-10 rounded-2xl bg-secondary/30 backdrop-blur-md flex items-center gap-2 text-[10px] font-black dark:text-white uppercase border border-white/10 active:scale-95 transition-all">
               <Gauge className="w-3 h-3 text-primary" /> {playbackSpeed}x
             </button>

             <button onClick={() => { setShowVolumeMenu(!showVolumeMenu); setShowTimerMenu(false); }} className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-all bg-secondary/30 backdrop-blur-md active:scale-95 border border-white/10", showVolumeMenu && "bg-primary text-black")}>
               {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>

             <button onClick={() => { setShowTimerMenu(!showTimerMenu); setShowVolumeMenu(false); }} className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-95 border border-white/10", timeLeft ? "bg-primary text-black" : "bg-secondary/30 backdrop-blur-md")}>
               <Timer className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Volume Popover */}
        {showVolumeMenu && (
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowVolumeMenu(false)} />
            <div className="absolute top-20 right-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-black/5 shadow-2xl rounded-[32px] p-5 z-50 w-16 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-200">
              <div className="h-44 w-10 bg-secondary/20 rounded-2xl relative flex items-center justify-center overflow-hidden">
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="volume-slider-vertical"
                />
                <div 
                  className="absolute bottom-0 left-0 w-full bg-primary pointer-events-none transition-all duration-150"
                  style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
                />
              </div>
              <button onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Bunyikan" : "Senyapkan"} className="p-3 bg-primary/10 rounded-full text-primary active:scale-90 transition-transform">
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </>
        )}

        {/* Timer Popover */}
        {showTimerMenu && (
          <div className="absolute top-20 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-black/5 shadow-2xl rounded-[24px] p-2 z-50 w-32 animate-in slide-in-from-top-2">
            {[15, 30, 60].map(mins => (
              <button key={mins} onClick={() => { setTimeLeft(mins * 60); setShowTimerMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-primary/10 rounded-xl dark:text-white uppercase transition-colors">
                {mins} Minit
              </button>
            ))}
            <button onClick={() => { setTimeLeft(null); setShowTimerMenu(false); }} className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">BATAL</button>
          </div>
        )}

        {/* Player Card (Modern Glassmorphism) */}
        <div ref={playerRef} className="relative z-10">
          <div className={cn(
            "relative overflow-hidden rounded-[40px] p-8 shadow-2xl transition-all duration-700 border border-white/10 backdrop-blur-xl", 
            activeTab === 'nasyid' ? "bg-slate-900/80" : 
            activeTab === 'sholawat' ? "bg-emerald-900/80" : 
            activeTab === 'zikir' ? "bg-indigo-900/80" : "bg-rose-900/80"
          )}>
            
            {/* Visualizer Background Effect */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20 pointer-events-none">
               {isPlaying && [...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 bg-white rounded-full animate-music-bar" 
                       style={{ 
                         height: `${Math.random() * 100}%`,
                         animationDelay: `${i * 0.1}s`,
                         animationDuration: `${0.5 + Math.random()}s` 
                       }} 
                  />
               ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              
              {/* Album Art */}
              <div className="relative">
                <div className={cn("w-40 h-40 rounded-full flex items-center justify-center backdrop-blur-md border-[6px] transition-all duration-700 relative z-10 shadow-2xl", 
                  isPlaying ? "border-primary/50 rotate-[360deg] scale-105" : "border-white/10")}>
                  <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br opacity-50", 
                    activeTab === 'nasyid' ? "from-blue-500 to-cyan-500" : 
                    activeTab === 'sholawat' ? "from-emerald-500 to-lime-500" : 
                    activeTab === 'zikir' ? "from-indigo-500 to-purple-500" : "from-rose-500 to-orange-500"
                  )} />
                  <Disc className={cn("w-20 h-20 text-white transition-all duration-[3000ms] ease-linear", isPlaying && "animate-spin-slow")} />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Glow Behind */}
                <div className={cn("absolute inset-0 rounded-full blur-[40px] opacity-40 animate-pulse", 
                    activeTab === 'nasyid' ? "bg-blue-500" : 
                    activeTab === 'sholawat' ? "bg-emerald-500" : 
                    activeTab === 'zikir' ? "bg-indigo-500" : "bg-rose-500"
                )} />
              </div>
              
              <div className="min-h-[80px]">
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">{currentTrack?.title || "Sedia"}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <p className="text-[10px] text-white/70 font-bold tracking-[0.2em] uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentTrack?.artist || "Pilih Track"}
                  </p>
                  {currentTrack && cachedTracks.some(path => path === currentTrack.url) && (
                    <div className="px-2 py-1 bg-emerald-500 rounded-full text-[8px] text-white font-black tracking-widest uppercase shadow-lg shadow-emerald-500/20">OFFLINE</div>
                  )}
                  <button onClick={() => setShowLyrics(true)} className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full text-[8px] text-white font-black tracking-widest uppercase transition-colors flex items-center gap-1">
                    <Mic2 className="w-3 h-3" /> LIRIK
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full space-y-2 group/slider">
                <input 
                  type="range" min="0" max={duration || 0} value={currentTime} 
                  onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
                />
                <div className="flex justify-between text-[10px] text-white/50 font-mono font-bold px-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 w-full">
                 <button onClick={() => setIsShuffle(!isShuffle)} 
                         className={cn("p-2 transition-colors rounded-full hover:bg-white/10", isShuffle ? "text-primary" : "text-white/30")}>
                   <Shuffle className="w-5 h-5" />
                 </button>

                 <button onClick={playPrevTrack} className="p-3 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full">
                   <SkipBack className="w-6 h-6 fill-current" />
                 </button>
                 
                 <button onClick={() => currentTrack && handlePlay(currentTrack)} 
                         className="w-16 h-16 rounded-[24px] bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-200" />
                   {isPlaying ? <Pause className="w-6 h-6 fill-current relative z-10" /> : <Play className="w-6 h-6 fill-current ml-1 relative z-10" />}
                 </button>
                 
                 <button onClick={playNextTrack} className="p-3 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full">
                   <SkipForward className="w-6 h-6 fill-current" />
                 </button>

                 <button onClick={() => setRepeatMode(repeatMode === 'all' ? 'one' : repeatMode === 'one' ? 'none' : 'all')} 
                         className={cn("p-2 transition-colors rounded-full hover:bg-white/10", repeatMode !== 'none' ? "text-primary" : "text-white/30")}>
                   {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="relative z-10 bg-secondary/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar flex gap-1">
          {['nasyid', 'sholawat', 'zikir', 'fav'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as Track['category'] | 'fav')} 
              className={cn("flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap relative overflow-hidden",
                activeTab === tab ? "text-white shadow-lg" : "text-muted-foreground hover:bg-white/5")}>
              {activeTab === tab && (
                <div className={cn("absolute inset-0 opacity-100 transition-colors",
                  tab === 'nasyid' ? "bg-blue-600" : tab === 'sholawat' ? "bg-emerald-600" : tab === 'zikir' ? "bg-indigo-600" : "bg-rose-600"
                )} />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative group z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" placeholder="Cari ketenangan..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-black/5 dark:border-white/5 focus:border-primary/50 outline-none text-sm dark:text-white transition-all focus:shadow-lg focus:bg-white dark:focus:bg-slate-900"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Track List */}
        <div className="space-y-3 pb-8 relative z-10">
          {filteredTracks.map((track) => (
            <div key={track.id} onClick={() => handlePlay(track)} className={cn(
              "flex items-center justify-between p-4 rounded-[24px] border transition-all cursor-pointer group active:scale-[0.98] backdrop-blur-sm hover:shadow-lg",
              currentTrack?.id === track.id ? "bg-white/80 dark:bg-slate-800/80 border-primary/30 shadow-primary/5" : "bg-white/40 dark:bg-slate-900/40 border-transparent hover:bg-white/60 dark:hover:bg-slate-800/60"
            )}>
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative overflow-hidden", 
                  currentTrack?.id === track.id ? "bg-primary text-white" : "bg-secondary/50")}>
                  {currentTrack?.id === track.id && isPlaying ? (
                    <div className="flex gap-0.5 items-end h-4 pb-1">
                      <div className="w-1 bg-white animate-music-bar h-2" style={{ animationDelay: '0s' }} />
                      <div className="w-1 bg-white animate-music-bar h-3" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 bg-white animate-music-bar h-1" style={{ animationDelay: '0.2s' }} />
                    </div>
                  ) : (
                    <Music className="w-5 h-5 opacity-50" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className={cn("font-bold text-sm leading-tight transition-colors", currentTrack?.id === track.id ? "text-primary" : "dark:text-white group-hover:text-primary")}>
                    {track.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground uppercase mt-1 font-bold">{track.artist} • {track.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); toggleOffline(track); }} className="p-2 text-muted-foreground/20 hover:text-primary transition-colors hover:bg-primary/5 rounded-full">
                  {cachedTracks.some(path => path === track.url) ? <CloudOff className="w-4 h-4 text-primary" /> : <DownloadCloud className="w-4 h-4" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsLiked(prev => prev.includes(track.id) ? prev.filter(i => i !== track.id) : [...prev, track.id]); }} className="hover:bg-red-500/5 p-2 rounded-full transition-colors">
                  <Heart className={cn("w-5 h-5 transition-all", isLiked.includes(track.id) ? "text-red-500 fill-current scale-110" : "text-muted-foreground/20")} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Player */}
        {currentTrack && !isPlayerVisible && (
          <div className="fixed bottom-24 left-4 right-4 z-40 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-10">
             <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
             }}>
               <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 border-primary/50 relative overflow-hidden", isPlaying && "animate-spin-slow")}>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", 
                    activeTab === 'nasyid' ? "from-blue-500 to-cyan-500" : 
                    activeTab === 'sholawat' ? "from-emerald-500 to-lime-500" : 
                    activeTab === 'zikir' ? "from-indigo-500 to-purple-500" : "from-rose-500 to-orange-500"
                  )} />
                  <Disc className="w-5 h-5 text-white relative z-10" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-white line-clamp-1">{currentTrack.title}</span>
                  <span className="text-[10px] text-white/50">{currentTrack.artist}</span>
               </div>
             </div>
             <div className="flex items-center gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                   {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
             </div>
          </div>
        )}

        {/* Lyrics Overlay */}
        {showLyrics && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6 animate-in slide-in-from-bottom duration-300">
             <div className="flex items-center justify-between mb-8 pt-10">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-white tracking-tight">Lirik</h3>
                  <span className="text-sm text-white/50">{currentTrack?.title}</span>
                </div>
                <button onClick={() => setShowLyrics(false)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                   <ChevronDown className="w-6 h-6 text-white" />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto text-center space-y-6 px-4 pb-20 no-scrollbar">
                <div className="space-y-4">
                  <p className="text-white/70 text-lg leading-relaxed font-serif italic">
                     (Lirik belum tersedia untuk trek ini)
                  </p>
                  <p className="text-white/50 text-sm">
                     InsyaAllah akan dikemaskini dari semasa ke semasa.
                  </p>
                  <div className="py-10 flex justify-center opacity-30">
                    <Music className="w-20 h-20 text-white animate-pulse" />
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow { animation: spin 8s linear infinite; } 
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } 
        
        .animate-music-bar { animation: bounce 0.8s ease-in-out infinite alternate; }
        @keyframes bounce { 
          0% { height: 10%; opacity: 0.3; }
          50% { height: 100%; opacity: 1; }
          100% { height: 40%; opacity: 0.6; } 
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .volume-slider-vertical {
          -webkit-appearance: none; appearance: none;
          width: 176px; height: 50px;
          background: transparent; transform: rotate(-90deg);
          cursor: pointer; z-index: 10; outline: none; margin: 0;
        }
        .volume-slider-vertical::-webkit-slider-thumb {
          -webkit-appearance: none; height: 50px; width: 30px;
          background: transparent; border: none;
        }
        .volume-slider-vertical::-moz-range-thumb {
          width: 30px; height: 50px; background: transparent; border: none;
        }

        input[type='range']:not(.volume-slider-vertical) {
          -webkit-appearance: none; background: transparent;
        }
        input[type='range']:not(.volume-slider-vertical)::-webkit-slider-thumb {
          -webkit-appearance: none; width: 12px; height: 12px;
          background: #fff; border-radius: 50%;
          cursor: pointer; box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          margin-top: -5px; transition: transform 0.1s;
        }
        input[type='range']:not(.volume-slider-vertical)::-webkit-slider-thumb:hover {
          transform: scale(1.5);
        }
        input[type='range']:not(.volume-slider-vertical)::-webkit-slider-runnable-track {
          width: 100%; height: 2px; cursor: pointer; background: rgba(255,255,255,0.2); border-radius: 10px;
        }
      ` }} />
    </MainLayout>
  );
};

export default MuzikPage;
