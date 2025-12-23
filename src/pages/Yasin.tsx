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

        // KEMASKINI: Menggunakan fields=text_indopak untuk skrip seperti dalam gambar
        const [resIndoPak, resLatin] = await Promise.all([
          fetch(
            'https://api.quran.com/api/v4/verses/by_chapter/36?language=ms&words=false&translations=39&fields=text_indopak&per_page=300'
          ),
          fetch('https://equran.id/api/v2/surat/36')
        ]);

        const dataIndoPak = await resIndoPak.json();
        const dataLatin = await resLatin.json();

        if (dataIndoPak.verses && dataLatin.code === 200) {
          const latinMap = dataLatin.data.ayat;

          const formattedVerses = dataIndoPak.verses.map((v: any, index: number) => ({
            nomorAyat: v.verse_number,
            teksArab: v.text_indopak, // Menggunakan teks skrip IndoPak
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
      {/* KEMASKINI: Menggunakan Font IndoPak Majeed untuk rupa 100% seperti mushaf tempatan */}
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'QuranIndoPak';
          src: url('https://fonts.cdnfonts.com/s/73177/QuranMajeedWeb.woff') format('woff');
        }

        .quran-render {
          font-family: 'QuranIndoPak', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 3.2 !important;
          word-spacing: 4px;
          -webkit-font-smoothing: antialiased;
          font-size: 2.8rem;
        }
      `}} />

      <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />

      <div className="space-y-6 animate-fade-in pb-20 px-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Surah Yasin</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
              Resm Indo-Pak • Mushaf Standard
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10">
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-5xl font-serif text-white font-bold tracking-wider">يس</h2>
            <p className="text-emerald-100 text-lg font-bold">Surah Yasin</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">
              Menyusun Ayat Indo-Pak...
            </p>
          </div>
        ) : (
          verses.map((verse) => (
            <div key={verse.nomorAyat} className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {verse.nomorAyat}
                </span>
                <button
                  onClick={() => toggleAudio(verse.nomorAyat, verse.audio)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
                    isPlaying === verse.nomorAyat
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {isPlaying === verse.nomorAyat ? <Pause size={18} fill="currentColor" /> : <Volume2 size={18} />}
                </button>
              </div>

              <p className="quran-render text-4xl sm:text-5xl text-foreground">
                {verse.teksArab}
              </p>

              <div className="space-y-4 pt-4 border-t border-dashed border-primary/10">
                <div className="flex gap-3 text-left">
                  <Languages className="w-4 h-4 text-primary mt-1 shrink-0 opacity-70" />
                  <p className="text-[14px] font-bold text-primary/90 italic leading-relaxed">
                    {verse.teksLatin}
                  </p>
                </div>
                <div className="flex gap-3 text-left">
                  <Globe className="w-4 h-4 text-muted-foreground mt-1 shrink-0 opacity-70" />
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {verse.teksTranslation}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
