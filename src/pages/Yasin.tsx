import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Pause, BookOpen, Volume2, Globe, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';

interface Verse {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksTranslation: string;
  audio: string;
}

export default function YasinPage() {
  const navigate = useNavigate();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchYasinData = async () => {
      try {
        setLoading(true);

        const [resUthmani, resLatin] = await Promise.all([
          // 🔧 FIX PENTING: tambah per_page=300
          fetch(
            'https://api.quran.com/api/v4/verses/by_chapter/36?language=ms&words=false&translations=39&fields=text_uthmani&per_page=300'
          ),
          fetch('https://equran.id/api/v2/surat/36')
        ]);

        const dataUthmani = await resUthmani.json();
        const dataLatin = await resLatin.json();

        if (dataUthmani.verses && dataLatin.code === 200) {
          const latinMap = dataLatin.data.ayat;

          const formattedVerses = dataUthmani.verses.map((v: any, index: number) => ({
            nomorAyat: v.verse_number,
            teksArab: v.text_uthmani,
            teksLatin: latinMap[index]?.teksLatin || "",
            teksTranslation: v.translations[0].text.replace(/<[^>]*>?/gm, ''),
            audio: `https://everyayah.com/data/Ayman_Sowaid_64kbps/036${String(v.verse_number).padStart(3, '0')}.mp3`
          }));

          setVerses(formattedVerses);
        }
      } catch (error) {
        console.error("Gagal menggabungkan data API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchYasinData();
  }, []);

  const toggleAudio = (nomorAyat: number, url: string) => {
    if (!audioRef.current) return;

    if (isPlaying === nomorAyat) {
      audioRef.current.pause();
      setIsPlaying(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(nomorAyat);
    }
  };

  return (
    <MainLayout>
      <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />

      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Surah Yasin</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
              Resm Uthmani • Hybrid API
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-xl border border-primary/20">
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl font-serif text-white font-bold tracking-wider">يس</h2>
            <p className="text-white text-lg font-bold">Surah Yasin</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Menyusun Resm Uthmani & Latin...
            </p>
          </div>
        ) : (
          verses.map((verse) => (
            <div key={verse.nomorAyat} className="floating-card p-6 bg-secondary/20 space-y-6">
              <div className="flex justify-between items-center">
                <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {verse.nomorAyat}
                </span>
                <button
                  onClick={() => toggleAudio(verse.nomorAyat, verse.audio)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isPlaying === verse.nomorAyat
                      ? "bg-primary text-black"
                      : "bg-background text-muted-foreground border"
                  )}
                >
                  {isPlaying === verse.nomorAyat ? <Pause size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              <p className="text-3xl leading-[4.5rem] text-right font-serif dir-rtl whitespace-pre-wrap">
                {verse.teksArab}
              </p>

              <div className="space-y-4 pt-4 border-t border-primary/10">
                <div className="flex gap-3">
                  <Languages className="w-4 h-4 text-primary mt-1" />
                  <p className="text-[14px] font-bold italic">{verse.teksLatin}</p>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{verse.teksTranslation}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}