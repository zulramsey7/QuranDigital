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
        const [resIndoPak, resLatin] = await Promise.all([
          fetch('https://api.quran.com/api/v4/verses/by_chapter/36?language=ms&fields=text_indopak&translations=39&per_page=300'),
          fetch('https://equran.id/api/v2/surat/36')
        ]);

        const dataIndoPak = await resIndoPak.json();
        const dataLatin = await resLatin.json();

        if (dataIndoPak.verses && dataLatin.code === 200) {
          const latinMap = dataLatin.data.ayat;

          const formattedVerses = dataIndoPak.verses.map((v: any, index: number) => {
            const arabicNumbers = v.verse_number.toString().replace(/\d/g, (d: string) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
            
            return {
              nomorAyat: v.verse_number,
              teksArab: `${v.text_indopak} ﴿${arabicNumbers}﴾`,
              teksLatin: latinMap[index]?.teksLatin || "",
              teksTranslation: v.translations[0].text.replace(/<[^>]*>?/gm, ''),
              audio: `https://everyayah.com/data/Ayman_Sowaid_64kbps/036${String(v.verse_number).padStart(3, '0')}.mp3`
            };
          });

          setVerses(formattedVerses);
        }
      } catch (error) {
        console.error("Gagal memuatkan data:", error);
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
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'QuranIndoPak';
          src: url('https://fonts.cdnfonts.com/s/73177/QuranMajeedWeb.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }

        .quran-render {
          font-family: 'QuranIndoPak', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 2.6 !important; 
          word-spacing: 2px;
          letter-spacing: -0.5px; /* Menjadikan tulisan nampak lebih rapat dan kemas */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 2.1rem; /* Saiz lebih kecil sedikit */
          font-weight: 300 !important; /* Ketebalan lebih nipis/halus */
          opacity: 0.95;
        }
      `}} />

      <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />

      <div className="space-y-6 animate-fade-in pb-20 px-1">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Surah Yasin</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Indo-Pak Script • Bingkai Ayat</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl">
          <div className="relative z-10 flex flex-col items-center text-center space-y-3 text-white">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-5xl font-serif font-bold">يس</h2>
            <p className="text-emerald-100 text-lg font-bold">Surah Yasin</p>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center animate-pulse text-muted-foreground uppercase text-xs font-bold tracking-widest">Memuatkan skrip Indo-Pak...</div>
        ) : (
          verses.map((verse) => (
            <div key={verse.nomorAyat} className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Ayat {verse.nomorAyat}
                </span>
                <button
                  onClick={() => toggleAudio(verse.nomorAyat, verse.audio)}
                  className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all", isPlaying === verse.nomorAyat ? "bg-primary text-white" : "bg-secondary text-muted-foreground")}
                >
                  {isPlaying === verse.nomorAyat ? <Pause size={16} fill="currentColor" /> : <Volume2 size={16} />}
                </button>
              </div>

              <p className="quran-render text-foreground leading-relaxed">
                {verse.teksArab}
              </p>

              <div className="space-y-3 pt-4 border-t border-dashed border-primary/10">
                <div className="flex gap-3">
                  <Languages className="w-4 h-4 text-primary mt-1 shrink-0 opacity-60" />
                  <p className="text-[13px] font-bold text-primary/90 italic leading-relaxed">{verse.teksLatin}</p>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-1 shrink-0 opacity-60" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{verse.teksTranslation}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
