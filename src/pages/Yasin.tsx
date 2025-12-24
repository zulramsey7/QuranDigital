import React, { useState, useEffect, useRef } from 'react';
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

  // Fungsi untuk menukar nombor biasa ke nombor Arab
  const toArabicVariant = (n: number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return n.toString().split('').map(x => arabicDigits[parseInt(x)]).join('');
  };

  useEffect(() => {
    const fetchYasinData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://equran.id/api/v2/surat/36');
        const data = await response.json();

        if (data.code === 200) {
          const formattedVerses = data.data.ayat.map((v: any) => ({
            nomorAyat: v.nomorAyat,
            // Simbol ۝ diikuti dengan nombor dalam format tulisan Arab
            teksArab: `${v.teksArab} ۝${toArabicVariant(v.nomorAyat)}`,
            teksLatin: v.teksLatin,
            teksTranslation: v.teksIndonesia,
            audio: v.audio['05']
          }));

          setVerses(formattedVerses);
        }
      } catch (error) {
        console.error("Gagal memuatkan data Yasin:", error);
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
        @import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap');

        .quran-render {
          font-family: 'Scheherazade New', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 2.5 !important;
          font-size: 2.7rem !important;
          font-weight: 500 !important;
          word-spacing: 4px;
          /* cv01 mengaktifkan gaya End of Ayah yang membungkus nombor */
          font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1, "ss01" 1 !important;
        }

        @media (max-width: 640px) {
          .quran-render {
            font-size: 2.2rem !important;
            line-height: 2.2 !important;
          }
        }
      `}} />

      <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />

      <div className="space-y-6 animate-fade-in pb-20 px-2">
        {/* Header Section */}
        <div className="flex items-center gap-4 text-left pt-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Surah Yasin</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              Resam Biasa • Paparan Jelas
            </p>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-5xl font-serif font-bold tracking-wider">يس</h2>
            <p className="text-emerald-100 text-sm font-medium italic opacity-80 text-center">Jantung Al-Quran</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
              Memuatkan Teks Imla'ei...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {verses.map((verse) => (
              <div 
                key={verse.nomorAyat} 
                className={cn(
                  "p-6 bg-white dark:bg-slate-900 rounded-[28px] border transition-all duration-300 shadow-sm space-y-6",
                  isPlaying === verse.nomorAyat ? "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-500/5" : "border-black/5 dark:border-white/5"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight border border-emerald-100 dark:border-emerald-500/20">
                    Ayat {verse.nomorAyat}
                  </span>
                  <button
                    onClick={() => toggleAudio(verse.nomorAyat, verse.audio)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95",
                      isPlaying === verse.nomorAyat
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {isPlaying === verse.nomorAyat ? <Pause size={18} fill="currentColor" /> : <Volume2 size={18} />}
                  </button>
                </div>

                {/* Paparan Teks Arab dengan Simbol ۝ yang membungkus nombor */}
                <p className="quran-render text-slate-800 dark:text-slate-100">
                  {verse.teksArab}
                </p>

                <div className="space-y-4 pt-4 border-t border-dashed border-black/5 dark:border-white/5 text-left">
                  <div className="flex gap-3">
                    <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-1 opacity-70" />
                    <p className="text-[14px] font-bold text-emerald-900 dark:text-emerald-400 italic leading-relaxed">
                      {verse.teksLatin}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-70" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {verse.teksTranslation}
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