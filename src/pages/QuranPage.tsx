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
      // Cari surah untuk dapatkan jumlah ayat sebenar
      const surahData = surahs.find(s => s.number === surahNumber);
      const totalAyahs = surahData?.numberOfAyahs || 100; // default 100 jika tak jumpa

      // Tambah per_page=${totalAyahs} supaya API hantar SEMUA ayat surah tersebut
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

  const saveLastRead = (surah: number, ayah: number) => {
    const data = { surah, ayah };
    setLastRead(data);
    localStorage.setItem('last-read', JSON.stringify(data));
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
        <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />
        <div className="space-y-6 animate-fade-in pb-20 px-1">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setSelectedSurah(null);
                if (audioRef.current) audioRef.current.pause();
                setPlayingAyah(null);
              }}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight">{surah?.englishName}</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{surah?.revelationType} • {surah?.numberOfAyahs} Ayat</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-xl shadow-primary/20 border border-primary/20">
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-5xl font-serif text-white font-bold tracking-wider">{surah?.name}</h2>
              <p className="text-white text-lg font-bold italic opacity-90">{surah?.englishNameTranslation}</p>
            </div>
          </div>

          {loadingAyahs ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Menyusun Ayat...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ayahs.map((ayah) => (
                <div 
                  key={ayah.nomorAyat}
                  className="floating-card p-6 space-y-6 border-none bg-secondary/20 animate-fade-in"
                  onClick={() => saveLastRead(selectedSurah, ayah.nomorAyat)}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                      {ayah.nomorAyat}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAudio(ayah.nomorAyat, ayah.audio);
                        }}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm',
                          playingAyah === ayah.nomorAyat ? 'bg-primary text-black' : 'bg-background border border-border/50 text-muted-foreground'
                        )}
                      >
                        {playingAyah === ayah.nomorAyat ? <Pause size={18} fill="currentColor" /> : <Volume2 size={18} />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveLastRead(selectedSurah, ayah.nomorAyat);
                        }}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm',
                          lastRead?.surah === selectedSurah && lastRead?.ayah === ayah.nomorAyat
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-background border border-border/50 text-muted-foreground'
                        )}
                      >
                        <Bookmark size={18} fill={lastRead?.surah === selectedSurah && lastRead?.ayah === ayah.nomorAyat ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>

                  <p className="text-3xl leading-[4.5rem] text-right font-serif dir-rtl text-foreground whitespace-pre-wrap">
                    {ayah.teksArab}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-primary/10 text-left">
                    <div className="flex gap-3">
                      <Languages className="w-4 h-4 text-primary shrink-0 mt-1 opacity-70" />
                      <p className="text-[14px] font-bold text-primary/90 italic leading-relaxed">
                        {ayah.teksLatin}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-70" />
                      <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                        {ayah.teksTranslation}
                      </p>
                    </div>
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
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight">{t('quran')}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Resm Uthmani • Standard</p>
          </div>
        </div>

        {lastRead && (
          <button  
            onClick={() => handleSurahClick(lastRead.surah)}  
            className="w-full floating-card p-5 flex items-center justify-between border-primary/20 bg-primary/10 hover:bg-primary/20 transition-all"  
          >  
            <div className="flex items-center gap-4">  
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">  
                <Bookmark className="w-6 h-6 text-black" fill="currentColor" />  
              </div>  
              <div className="text-left">  
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('lastRead')}</p>  
                <p className="font-bold text-foreground">  
                  {surahs.find(s => s.number === lastRead.surah)?.englishName} • Ayat {lastRead.ayah}  
                </p>  
              </div>  
            </div>  
            <ChevronLeft className="w-5 h-5 text-primary rotate-180" />  
          </button>  
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input  
            placeholder={`${t('search')} ${t('surah')}...`}  
            value={searchQuery}  
            onChange={(e) => setSearchQuery(e.target.value)}  
            className="pl-11 h-14 rounded-2xl bg-secondary/30 border-none focus-visible:ring-1 ring-primary/30"  
          />
        </div>

        {loading ? (
          <div className="space-y-3 pt-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-20 bg-secondary/20 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 pt-2">
            {filteredSurahs.map((surah) => (
              <button  
                key={surah.number}  
                onClick={() => handleSurahClick(surah.number)}  
                className="group flex items-center gap-4 p-5 rounded-[24px] bg-secondary/10 hover:bg-secondary/30 transition-all border border-transparent hover:border-primary/10 active:scale-[0.98]"  
              >  
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">  
                  <span className="text-sm font-bold text-primary">{surah.number}</span>  
                </div>  
                <div className="flex-1 text-left">  
                  <p className="font-bold text-foreground text-lg">{surah.englishName}</p>  
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">  
                    {surah.revelationType} • {surah.numberOfAyahs} {t('ayat')}  
                  </p>  
                </div>  
                <p className="text-3xl font-serif text-primary/80 group-hover:text-primary transition-colors">{surah.name}</p>  
              </button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}