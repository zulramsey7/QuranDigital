import { useState, useEffect, useRef } from 'react';
import { Search, Play, Pause, ChevronLeft, Bookmark, Languages, Globe, BookOpen, Volume2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
  
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number } | null>(() => {
    const saved = localStorage.getItem('last-read');
    return saved ? JSON.parse(saved) : null;
  });

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
      const surahData = surahs.find(s => s.number === surahNumber);
      const totalAyahs = surahData?.numberOfAyahs || 100;

      const [resUthmani, resLatin] = await Promise.all([
        fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=ms&words=false&translations=39&fields=text_uthmani&per_page=${totalAyahs}`),
        fetch(`https://equran.id/api/v2/surat/${surahNumber}`)
      ]);

      const dataUthmani = await resUthmani.json();
      const dataLatin = await resLatin.json();
      const latinMap = dataLatin.data.ayat;

      const formattedAyahs = dataUthmani.verses.map((v: any, index: number) => ({
        nomorAyat: v.verse_number,
        teksArab: v.text_uthmani,
        teksLatin: latinMap[index]?.teksLatin || "",
        teksTranslation: v.translations[0].text.replace(/<[^>]*>?/gm, ''),
        audio: `https://everyayah.com/data/Ayman_Sowaid_64kbps/${String(surahNumber).padStart(3, '0')}${String(v.verse_number).padStart(3, '0')}.mp3`
      }));

      setAyahs(formattedAyahs);
    } catch (error) {
      console.error('Error fetching surah details:', error);
    } finally {
      setLoadingAyahs(false);
    }
  };

  const handleSurahClick = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    fetchSurahDetails(surahNumber);
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
          @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');

          .quran-render {
            font-family: 'Amiri', serif !important;
            direction: rtl !important;
            text-align: right !important;
            line-height: 2.8 !important;
            word-spacing: 2px;
            font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1;
            -webkit-font-smoothing: antialiased;
          }
        `}} />

        <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />
        <div className="space-y-6 animate-fade-in pb-20 px-1">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedSurah(null)} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div className="text-left">
              <h1 className="text-xl font-bold">{surah?.englishName}</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{surah?.revelationType} • {surah?.numberOfAyahs} Ayat</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-5xl font-serif font-bold tracking-wider">{surah?.name}</h2>
              <p className="text-emerald-100 text-sm italic font-medium">{surah?.englishNameTranslation}</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>

          {loadingAyahs ? (
            <div className="text-center py-20"><div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="space-y-4">
              {ayahs.map((ayah) => (
                <div key={ayah.nomorAyat} className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{ayah.nomorAyat}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleAudio(ayah.nomorAyat, ayah.audio)} className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-all', playingAyah === ayah.nomorAyat ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground')}>
                        {playingAyah === ayah.nomorAyat ? <Pause size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  </div>

                  <p className="quran-render text-4xl sm:text-5xl text-foreground">
                    {ayah.teksArab}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-dashed border-primary/10 text-left">
                    <p className="text-[14px] font-bold text-primary/90 italic leading-relaxed">{ayah.teksLatin}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{ayah.teksTranslation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-20 px-1">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight">{t('quran')}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Resm Uthmani Standard</p>
          </div>
        </div>

        {/* 🟢 HERO CARD: Ditambah pada senarai utama surah */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-wide">Al-Quranul Karim</h2>
            <p className="text-emerald-100 text-xs font-medium italic opacity-80">Panduan Hidup & Cahaya Hati</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {lastRead && (
          <button onClick={() => handleSurahClick(lastRead.surah)} className="w-full p-5 flex items-center justify-between rounded-3xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all">  
            <div className="flex items-center gap-4">  
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg text-white">  
                <Bookmark className="w-6 h-6" fill="currentColor" />  
              </div>  
              <div className="text-left">  
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('lastRead')}</p>  
                <p className="font-bold text-foreground">{surahs.find(s => s.number === lastRead.surah)?.englishName} • Ayat {lastRead.ayah}</p>  
              </div>  
            </div>  
            <ChevronLeft className="w-5 h-5 text-primary rotate-180" />  
          </button>  
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={`${t('search')} surah...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-11 h-14 rounded-2xl bg-secondary/30 border-none" />
        </div>

        {loading ? (
          <div className="text-center py-10"><div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
        ) : (
          <div className="grid grid-cols-1 gap-3 pt-2">
            {filteredSurahs.map((surah) => (
              <button key={surah.number} onClick={() => handleSurahClick(surah.number)} className="group flex items-center gap-4 p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/5 hover:border-primary/20 shadow-sm transition-all active:scale-[0.98]">  
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">  
                  <span className="text-sm font-bold text-primary">{surah.number}</span>  
                </div>  
                <div className="flex-1 text-left">  
                  <p className="font-bold text-foreground text-lg">{surah.englishName}</p>  
                  <p className="text-[11px] text-muted-foreground font-medium uppercase">{surah.revelationType} • {surah.numberOfAyahs} Ayat</p>  
                </div>  
                <p className="text-4xl font-serif text-primary/80">{surah.name}</p>  
              </button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
