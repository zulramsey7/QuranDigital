import React, { useState, useRef } from "react";
import { 
  ChevronLeft, Music, Play, Pause, 
  Headphones, CloudRain, Sun, Moon, 
  Volume2, Heart, Share2, ListMusic,
  Disc
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Interface untuk struktur lagu
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Data Playlist Mengikut Kategori (Mood)
  // Nota: URL ini adalah contoh stream API yang stabil
  const tracks: Track[] = [
    // ZIKIR TERAPI (Irama Perlahan/Munajat)
    { 
      id: 't1', 
      title: "Zikir Munajat Ketenangan", 
      artist: "Terapi Jiwa", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
      duration: "05:20", 
      category: 'terapi' 
    },
    { 
      id: 't2', 
      title: "Hasbi Rabbi Jallallah", 
      artist: "Zikir Penenang", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
      duration: "04:15", 
      category: 'terapi' 
    },
    
    // SEMANGAT PAGI (Selawat Berentak)
    { 
      id: 'p1', 
      title: "Selawat Badar Modern", 
      artist: "Gema Selawat", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
      duration: "03:45", 
      category: 'pagi' 
    },
    { 
      id: 'p2', 
      title: "Thola'al Badru 'Alaina", 
      artist: "Nasyid Vibe", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
      duration: "04:00", 
      category: 'pagi' 
    },

    // DEEP SLEEP / FOKUS (Lo-fi Quran & Nature)
    { 
      id: 'f1', 
      title: "Lofi Quran: Ar-Rahman", 
      artist: "Chill Deen", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
      duration: "10:00", 
      category: 'fokus' 
    },
    { 
      id: 'f2', 
      title: "Hujan & Zikir Asmaul Husna", 
      artist: "Nature Dhikr", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", 
      duration: "15:00", 
      category: 'fokus' 
    },
  ];

  const filteredTracks = tracks.filter(t => t.category === activeTab);

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
      }
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-32">
        {/* Audio Element Hidden */}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

        {/* 1. Header (Gaya Sirah) */}
        <div className="flex items-center gap-4 pt-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Audio Hub</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Ketenangan Jiwa • 2025</p>
          </div>
        </div>

        {/* 2. Hero Card (Sekarang Dimainkan) */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-slate-950 shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Disc className={cn("w-32 h-32 text-white", isPlaying && "animate-spin-slow")} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center backdrop-blur-xl border border-white/10">
              <Headphones className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {currentTrack ? currentTrack.title : "Sila Pilih Alunan"}
              </h2>
              <p className="text-sm text-primary font-medium mt-1">
                {currentTrack ? currentTrack.artist : "Ready to play"}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
               <button className="p-3 text-white/40 hover:text-white transition-colors"><Heart className="w-5 h-5" /></button>
               <button 
                onClick={() => currentTrack && handlePlay(currentTrack)}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
               >
                 {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
               </button>
               <button className="p-3 text-white/40 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* 3. Kategori / Mood Tabs */}
        <div className="flex gap-2 p-1 bg-secondary/30 rounded-2xl border border-black/5">
          <button 
            onClick={() => setActiveTab('terapi')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all",
              activeTab === 'terapi' ? "bg-white dark:bg-slate-800 shadow-sm text-emerald-600" : "text-muted-foreground"
            )}
          >
            <Moon className="w-3 h-3" /> Terapi
          </button>
          <button 
            onClick={() => setActiveTab('pagi')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all",
              activeTab === 'pagi' ? "bg-white dark:bg-slate-800 shadow-sm text-amber-600" : "text-muted-foreground"
            )}
          >
            <Sun className="w-3 h-3" /> Pagi
          </button>
          <button 
            onClick={() => setActiveTab('fokus')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all",
              activeTab === 'fokus' ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" : "text-muted-foreground"
            )}
          >
            <CloudRain className="w-3 h-3" /> Fokus
          </button>
        </div>

        {/* 4. Senarai Lagu (Gaya Sirah/Playlist) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <ListMusic className="w-4 h-4" /> Senarai {activeTab}
            </h3>
            <span className="text-[10px] font-bold text-primary">{filteredTracks.length} Lagu</span>
          </div>

          <div className="grid gap-3">
            {filteredTracks.map((track) => (
              <button 
                key={track.id}
                onClick={() => handlePlay(track)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-[24px] border transition-all active:scale-[0.98]",
                  currentTrack?.id === track.id 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-white dark:bg-slate-900 border-black/5 hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    currentTrack?.id === track.id ? "bg-primary text-black" : "bg-secondary text-muted-foreground"
                  )}>
                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-1 bg-black animate-bounce" style={{animationDuration: '0.5s'}} />
                        <div className="w-1 bg-black animate-bounce" style={{animationDuration: '0.8s'}} />
                        <div className="w-1 bg-black animate-bounce" style={{animationDuration: '0.6s'}} />
                      </div>
                    ) : (
                      <Music className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{track.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">{track.artist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono font-bold text-muted-foreground">{track.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Info Section */}
        <div className="p-6 rounded-[32px] bg-gradient-to-b from-secondary/50 to-transparent border border-black/5 text-center">
            <Volume2 className="w-5 h-5 mx-auto mb-2 text-primary opacity-50" />
            <p className="text-[11px] font-medium text-muted-foreground italic">
              "Ketahuilah dengan mengingati Allah, hati akan menjadi tenang."
            </p>
        </div>
      </div>

      {/* CSS untuk Animasi Spin Disc */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </MainLayout>
  );
};

export default MuzikPage;
