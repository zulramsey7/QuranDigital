import { useState, useEffect, useRef } from 'react';
import { Search, Pause, ChevronLeft, Bookmark, Languages, Globe, BookOpen, Volume2 } from 'lucide-react';
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

  /* ================= DETAIL SURAH ================= */
  if (selectedSurah) {
    const surah = surahs.find(s => s.number === selectedSurah);

    return (
      <MainLayout>
        <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />
        <div className="space-y-6 pb-20">
          <button onClick={() => setSelectedSurah(null)} className="w-10 h-10 rounded-xl border">
            <ChevronLeft />
          </button>

          <h1 className="text-3xl font-serif text-center">{surah?.name}</h1>

          {loadingAyahs ? (
            <p className="text-center">Memuat ayat...</p>
          ) : (
            ayahs.map(a => (
              <div key={a.nomorAyat} className="p-6 rounded-xl bg-secondary/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span>{a.nomorAyat}</span>
                  <button onClick={() => toggleAudio(a.nomorAyat, a.audio)}>
                    <Volume2 />
                  </button>
                </div>

                <p className="text-3xl text-right font-serif leading-[4rem]">
                  {a.teksArab}
                </p>

                <p className="italic text-primary">{a.teksLatin}</p>
                <p>{a.teksTranslation}</p>
              </div>
            ))
          )}
        </div>
      </MainLayout>
    );
  }

  /* ================= LIST SURAH ================= */
  return (
    <MainLayout>
      <div className="space-y-6 pb-20">
        <button onClick={() => navigate('/')}>
          <ChevronLeft />
        </button>

        <Input
          placeholder="Cari surah..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p>Memuat...</p>
        ) : (
          filteredSurahs.map(s => (
            <button
              key={s.number}
              onClick={() => handleSurahClick(s.number)}
              className="w-full text-left p-4 rounded-xl bg-secondary/10"
            >
              <p className="font-bold">{s.englishName}</p>
              <p className="font-serif text-xl">{s.name}</p>
            </button>
          ))
        )}
      </div>
    </MainLayout>
  );
}