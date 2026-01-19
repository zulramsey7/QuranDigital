import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Heart, Disc, 
  Timer, Gauge, Search, Repeat, Repeat1, SkipForward,
  Clock, CloudOff, DownloadCloud,
  Volume2, VolumeX 
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
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false); 
  
  const [cachedTracks, setCachedTracks] = useState<string[]>([]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // LOGIK BARU: Auto-Close Volume Menu selepas 3 saat
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
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else if (currentIndex !== -1 && currentIndex < filteredTracks.length - 1) {
      handlePlay(filteredTracks[currentIndex + 1]);
    } else if (repeatMode === 'all' && filteredTracks.length > 0) {
      handlePlay(filteredTracks[0]);
    } else {
      setIsPlaying(false);
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
        <audio 
          ref={audioRef} 
          onEnded={playNextTrack} 
          onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Header */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-black/5 active:scale-90 transition-all">
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
             }} className="px-3 h-10 rounded-xl bg-secondary/50 flex items-center gap-2 text-[10px] font-black dark:text-white uppercase border border-white/5">
               <Gauge className="w-3 h-3 text-primary" /> {playbackSpeed}x
             </button>

             <button onClick={() => { setShowVolumeMenu(!showVolumeMenu); setShowTimerMenu(false); }} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-secondary/50", showVolumeMenu && "bg-primary text-black")}>
               {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>

             <button onClick={() => { setShowTimerMenu(!showTimerMenu); setShowVolumeMenu(false); }} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", timeLeft ? "bg-primary text-black" : "bg-secondary/50")}>
               <Timer className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* KEMASKINI: Volume Popover Mesra Mobile */}
        {showVolumeMenu && (
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowVolumeMenu(false)} />
            <div className="absolute top-20 right-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-black/5 shadow-2xl rounded-[32px] p-5 z-50 w-16 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-200">
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
          <div className="absolute top-20 right-4 bg-white dark:bg-slate-900 border border-black/5 shadow-2xl rounded-2xl p-2 z-50 w-32 animate-in slide-in-from-top-2">
            {[15, 30, 60].map(mins => (
              <button key={mins} onClick={() => { setTimeLeft(mins * 60); setShowTimerMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-primary/10 rounded-lg dark:text-white uppercase">
                {mins} Minit
              </button>
            ))}
            <button onClick={() => { setTimeLeft(null); setShowTimerMenu(false); }} className="w-full text-left px-3 py-2 text-xs font-bold text-red-500">BATAL</button>
          </div>
        )}

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" placeholder="Cari ketenangan..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 outline-none text-sm dark:text-white"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Player Card */}
        <div className={cn(
          "relative overflow-hidden rounded-[40px] p-8 shadow-2xl transition-all duration-700", 
          activeTab === 'nasyid' ? "bg-slate-950" : 
          activeTab === 'sholawat' ? "bg-emerald-950" : 
          activeTab === 'zikir' ? "bg-indigo-950" : "bg-rose-950"
        )}>
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className={cn("w-28 h-28 rounded-[40px] flex items-center justify-center backdrop-blur-3xl border transition-all duration-700", 
              isPlaying ? "bg-primary/20 border-primary/40 rotate-[15deg] scale-110 shadow-2xl shadow-primary/20" : "bg-white/10 border-white/10")}>
              <Disc className={cn("w-14 h-14 text-primary transition-all duration-1000", isPlaying && "animate-spin-slow")} />
            </div>
            
            <div className="min-h-[80px]">
              <h2 className="text-2xl font-bold text-white tracking-tight">{currentTrack?.title || "Sedia"}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-[10px] text-primary/70 font-black tracking-[0.2em] uppercase">{currentTrack?.artist || "Pilih Track"}</p>
                {currentTrack && cachedTracks.some(path => path === currentTrack.url) && (
                  <div className="px-1.5 py-0.5 bg-primary/20 rounded text-[8px] text-primary font-bold tracking-widest uppercase">OFFLINE</div>
                )}
              </div>
            </div>

            <div className="w-full space-y-3">
              <input 
                type="range" min="0" max={duration || 0} value={currentTime} 
                onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono font-bold">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
               <button onClick={() => setRepeatMode(repeatMode === 'all' ? 'one' : repeatMode === 'one' ? 'none' : 'all')} 
                       className={cn("p-2 transition-colors", repeatMode !== 'none' ? "text-primary" : "text-white/20")}>
                 {repeatMode === 'one' ? <Repeat1 className="w-6 h-6" /> : <Repeat className="w-6 h-6" />}
               </button>
               
               <button onClick={() => currentTrack && handlePlay(currentTrack)} 
                       className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                 {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
               </button>
               
               <button onClick={playNextTrack} className="p-2 text-white/20 hover:text-white transition-colors">
                 <SkipForward className="w-7 h-7 fill-current" />
               </button>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1.5 p-1.5 bg-secondary/20 rounded-2xl overflow-x-auto no-scrollbar border border-white/5">
          {['nasyid', 'sholawat', 'zikir', 'fav'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as Track['category'] | 'fav')} 
              className={cn("flex-1 py-3 px-5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap",
                activeTab === tab ? "bg-white dark:bg-slate-800 shadow-md text-primary" : "text-muted-foreground opacity-50")}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTracks.map((track) => (
            <div key={track.id} onClick={() => handlePlay(track)} className={cn(
              "flex items-center justify-between p-4 rounded-[28px] border transition-all cursor-pointer group active:scale-[0.98]",
              currentTrack?.id === track.id ? "bg-primary/10 border-primary/30" : "bg-white dark:bg-slate-900/50 border-black/5"
            )}>
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", 
                  currentTrack?.id === track.id ? "bg-primary text-black" : "bg-secondary")}>
                  <Music className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm leading-tight dark:text-white group-hover:text-primary transition-colors">{track.title}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase mt-1 font-bold">{track.artist} • {track.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); toggleOffline(track); }} className="p-2 text-muted-foreground/20 hover:text-primary transition-colors">
                  {cachedTracks.some(path => path === track.url) ? <CloudOff className="w-4 h-4 text-primary" /> : <DownloadCloud className="w-4 h-4" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsLiked(prev => prev.includes(track.id) ? prev.filter(i => i !== track.id) : [...prev, track.id]); }}>
                  <Heart className={cn("w-5 h-5 transition-all", isLiked.includes(track.id) ? "text-red-500 fill-current" : "text-muted-foreground/10")} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow { animation: spin 12s linear infinite; } 
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } 
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
          -webkit-appearance: none; width: 14px; height: 14px;
          background: #CCFF00; border-radius: 50%;
          cursor: pointer; box-shadow: 0 0 10px rgba(204, 255, 0, 0.8);
          margin-top: -6px;
        }
        input[type='range']:not(.volume-slider-vertical)::-webkit-slider-runnable-track {
          width: 100%; height: 2px; cursor: pointer; background: rgba(255,255,255,0.1);
        }
      ` }} />
    </MainLayout>
  );
};

export default MuzikPage;
