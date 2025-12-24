import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Pause, ChevronLeft, Bookmark, BookOpen, Volume2, Languages, Globe } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksTranslation: string;
  audio: string;
}

export default function QuranPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number; name?: string } | null>(() => {
    const saved = localStorage.getItem('last-read');
    return saved ? JSON.parse(saved) : null;
  });

  // Fungsi penukaran nombor Arab untuk dalam simbol ۝
  const toArabicVariant = (n: number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return n.toString().split('').map(x => arabicDigits[parseInt(x)]).join('');
  };

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const fetchSurahDetails = async (surahNumber: number) => {
    setLoadingAyahs(true);
    try {
      // Mengambil data dari equran.id untuk Teks Imla'ei & Terjemahan MS/ID
      const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
      const data = await response.json();

      if (data.code === 200) {
        const formattedAyahs = data.data.ayat.map((v: any) => ({
          nomorAyat: v.nomorAyat,
          // Gabungkan Teks Arab + Simbol ۝ + Nombor Arab
          teksArab: `${v.teksArab} ۝${toArabicVariant(v.nomorAyat)}`,
          teksLatin: v.teksLatin,
          teksTranslation: v.teksIndonesia,
          audio: v.audio['05']
        }));
        setAyahs(formattedAyahs);
      }
    } catch (error) {
      console.error('Error fetching surah details:', error);
      toast.error("Gagal memuatkan ayat.");
    } finally {
      setLoadingAyahs(false);
    }
  };

  const handleSurahClick = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    fetchSurahDetails(surahNumber);
    window.scrollTo(0, 0);
  };

  const handleSaveBookmark = (ayahNumber: number) => {
    const surah = surahs.find(s => s.number === selectedSurah);
    if (surah) {
      const bookmarkData = { surah: surah.number, ayah: ayahNumber, name: surah.englishName };
      localStorage.setItem('last-read', JSON.stringify(bookmarkData));
      setLastRead(bookmarkData);
      toast.success(`Tanda buku disimpan: ${surah.englishName} ayat ${ayahNumber}`);
    }
  };

  const toggleAudio = (ayahNumber: number, url: string) => {
    if (!audioRef.current) return;
    if (playingAyah === ayahNumber) {
      audioRef.current.pause();
      setPlayingAyah(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingAyah(ayahNumber);
    }
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery) ||
    surah.number.toString().includes(searchQuery)
  );

  if (selectedSurah) {
    const surah = surahs.find(s => s.number === selectedSurah);
    return (
      <MainLayout>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap');
          .quran-render {
            font-family: 'Scheherazade New', serif !important;
            direction: rtl !important;
            text-align: right !important;
            line-height: 2.5 !important;
            font-size: 2.7rem !important;
            font-weight: 500 !important;
            font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1, "ss01" 1 !important;
          }
          @media (max-width: 640px) {
            .quran-render { font-size: 2.2rem !important; line-height: 2.2 !important; }
          }
        `}} />

        <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />
        <div className="space-y-6 animate-fade-in pb-20 px-2">
          <div className="flex items-center gap-4 pt-4">
            <button onClick={() => setSelectedSurah(null)} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center active:scale-95 transition-all">
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div className="text-left">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{surah?.englishName}</h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{surah?.revelationType} • {surah?.numberOfAyahs} Ayat</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl text-white text-center">
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-5xl font-serif font-bold tracking-wider">{surah?.name}</h2>
              <p className="text-emerald-100 text-sm italic font-medium opacity-80">{surah?.englishNameTranslation}</p>
            </div>
          </div>

          {loadingAyahs ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Menyusun Teks Imla'ei...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ayahs.map((ayah) => {
                const isBookmarked = lastRead?.surah === selectedSurah && lastRead?.ayah === ayah.nomorAyat;
                const isPlaying = playingAyah === ayah.nomorAyat;
                return (
                  <div 
                    key={ayah.nomorAyat} 
                    id={`ayah-${ayah.nomorAyat}`}
                    className={cn(
                      "p-6 bg-white dark:bg-slate-900 rounded-[28px] border transition-all duration-300 shadow-sm space-y-6",
                      isPlaying ? "border-emerald-500/50 bg-emerald-50/30" : "border-black/5 dark:border-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                        Ayat {ayah.nomorAyat}
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSaveBookmark(ayah.nomorAyat)}
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            isBookmarked ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          )}
                        >
                          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={() => toggleAudio(ayah.nomorAyat, ayah.audio)} 
                          className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-all', isPlaying ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400')}
                        >
                          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Volume2 size={18} />}
                        </button>
                      </div>
                    </div>

                    <p className="quran-render text-slate-800 dark:text-slate-100">
                      {ayah.teksArab}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-dashed border-black/5 dark:border-white/5 text-left">
                      <div className="flex gap-3">
                        <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-1 opacity-70" />
                        <p className="text-[14px] font-bold text-emerald-900 dark:text-emerald-400 italic leading-relaxed">{ayah.teksLatin}</p>
                      </div>
                      <div className="flex gap-3">
                        <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-70" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{ayah.teksTranslation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-20 px-2">
        <div className="flex items-center gap-4 pt-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center active:scale-95 transition-all">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t('quran')}</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Resam Biasa • Imla'ei</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-wide">Al-Quranul Karim</h2>
            <p className="text-emerald-100 text-xs font-medium italic opacity-80">Panduan Hidup & Cahaya Hati</p>
          </div>
        </div>

        {lastRead && (
          <button onClick={() => handleSurahClick(lastRead.surah)} className="w-full p-5 flex items-center justify-between rounded-3xl border border-emerald-100 bg-emerald-50/50 dark:bg-emerald-500/5 dark:border-emerald-500/20 hover:bg-emerald-100 transition-all">  
            <div className="flex items-center gap-4">  
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg text-white">  
                <Bookmark className="w-6 h-6" fill="currentColor" />  
              </div>  
              <div className="text-left">  
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t('lastRead')}</p>  
                <p className="font-bold text-slate-900 dark:text-white">{lastRead.name} • Ayat {lastRead.ayah}</p>  
              </div>  
            </div>  
            <ChevronLeft className="w-5 h-5 text-emerald-500 rotate-180" />  
          </button>  
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder={`${t('search')} surah...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-11 h-14 rounded-2xl bg-white dark:bg-slate-900 border-black/5 dark:border-white/5 shadow-sm" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-10 gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 pt-2">
            {filteredSurahs.map((surah) => (
              <button key={surah.number} onClick={() => handleSurahClick(surah.number)} className="group flex items-center gap-4 p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/5 hover:border-emerald-500/20 shadow-sm transition-all active:scale-[0.98]">  
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">  
                  <span className="text-sm font-bold text-emerald-600">{surah.number}</span>  
                </div>  
                <div className="flex-1 text-left">  
                  <p className="font-bold text-slate-900 dark:text-white text-lg">{surah.englishName}</p>  
                  <p className="text-[11px] text-slate-400 font-medium uppercase">{surah.revelationType} • {surah.numberOfAyahs} Ayat</p>  
                </div>  
                <p className="text-4xl font-serif text-emerald-500/80">{surah.name}</p>  
              </button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}