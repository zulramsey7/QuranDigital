import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Pause,
  ChevronLeft,
  Bookmark,
  Languages,
  Globe,
  BookOpen,
  Volume2
} from 'lucide-react';
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

  /* ================= FETCH SURAH LIST ================= */
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const json = await res.json();
        setSurahs(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  /* ================= FETCH AYAT (FULL) ================= */
  const fetchSurahDetails = async (surahNumber: number) => {
    setLoadingAyahs(true);
    try {
      const [uthmaniRes, latinRes] = await Promise.all([
        fetch(
          `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=ms&words=false&translations=39&fields=text_uthmani&per_page=300`
        ),
        fetch(`https://equran.id/api/v2/surat/${surahNumber}`)
      ]);

      const uthmaniJson = await uthmaniRes.json();
      const latinJson = await latinRes.json();
      const latinAyat = latinJson.data.ayat;

      const fullAyahs: Ayah[] = uthmaniJson.verses.map((v: any, i: number) => ({
        nomorAyat: v.verse_number,
        teksArab: v.text_uthmani,
        teksLatin: latinAyat[i]?.teksLatin || '',
        teksTranslation: v.translations?.[0]?.text?.replace(/<[^>]+>/g, '') || '',
        audio: `https://everyayah.com/data/Ayman_Sowaid_64kbps/${String(surahNumber).padStart(3, '0')}${String(v.verse_number).padStart(3, '0')}.mp3`
      }));

      setAyahs(fullAyahs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAyahs(false);
    }
  };

  const handleSurahClick = (num: number) => {
    setSelectedSurah(num);
    fetchSurahDetails(num);
  };

  const toggleAudio = (ayah: number, url: string) => {
    if (!audioRef.current) return;
    if (playingAyah === ayah) {
      audioRef.current.pause();
      setPlayingAyah(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingAyah(ayah);
    }
  };

  const saveLastRead = (surah: number, ayah: number) => {
    const data = { surah, ayah };
    setLastRead(data);
    localStorage.setItem('last-read', JSON.stringify(data));
  };

  const filteredSurahs = surahs.filter(s =>
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.includes(searchQuery) ||
    s.number.toString().includes(searchQuery)
  );

  /* ================= DETAIL SURAH (UI ASAL) ================= */
  if (selectedSurah) {
    const surah = surahs.find(s => s.number === selectedSurah);

    return (
      <MainLayout>
        <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />

        <div className="space-y-6 animate-fade-in pb-20">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedSurah(null);
                audioRef.current?.pause();
                setPlayingAyah(null);
              }}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl font-bold">{surah?.englishName}</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                {surah?.revelationType} • {surah?.numberOfAyahs} Ayat
              </p>
            </div>
          </div>

          {/* Hero */}
          <div className="rounded-[32px] p-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-xl">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-5xl font-serif text-white font-bold">{surah?.name}</h2>
              <p className="text-white italic">{surah?.englishNameTranslation}</p>
            </div>
          </div>

          {loadingAyahs ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold tracking-widest">Menyusun Ayat…</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ayahs.map(a => (
                <div
                  key={a.nomorAyat}
                  className="floating-card p-6 bg-secondary/20 space-y-6"
                  onClick={() => saveLastRead(selectedSurah, a.nomorAyat)}
                >
                  <div className="flex justify-between items-center">
                    <span className="w-8 h-8 rounded-lg bg-primary text-xs font-bold flex items-center justify-center">
                      {a.nomorAyat}
                    </span>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleAudio(a.nomorAyat, a.audio);
                      }}
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        playingAyah === a.nomorAyat
                          ? 'bg-primary text-black'
                          : 'bg-background border'
                      )}
                    >
                      {playingAyah === a.nomorAyat ? <Pause size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  <p className="text-3xl leading-[4.5rem] text-right font-serif dir-rtl">
                    {a.teksArab}
                  </p>

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex gap-3">
                      <Languages size={16} className="text-primary" />
                      <p className="italic text-primary">{a.teksLatin}</p>
                    </div>
                    <div className="flex gap-3">
                      <Globe size={16} />
                      <p>{a.teksTranslation}</p>
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

  /* ================= LIST SURAH (UI ASAL) ================= */
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl border">
            <ChevronLeft />
          </button>
          <h1 className="text-2xl font-bold">{t('quran')}</h1>
        </div>

        <Input
          placeholder={`${t('search')} ${t('surah')}...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p>Memuat…</p>
        ) : (
          <div className="grid gap-3">
            {filteredSurahs.map(s => (
              <button
                key={s.number}
                onClick={() => handleSurahClick(s.number)}
                className="p-5 rounded-2xl bg-secondary/10 text-left"
              >
                <p className="font-bold">{s.englishName}</p>
                <p className="font-serif text-2xl">{s.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}