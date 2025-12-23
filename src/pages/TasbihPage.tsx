import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useUserStats } from '@/hooks/useUserStats';
import { CircleDot, ChevronLeft, RotateCcw } from 'lucide-react';

export default function TasbihPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addZikir } = useUserStats();

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33); // Default target 33
  const [selectedZikir, setSelectedZikir] = useState(0);

  const zikirList = [
    { arabic: 'سُبْحَانَ اللّٰهِ', transliteration: 'Subhanallah', meaning: 'Maha Suci Allah' },
    { arabic: 'اَلْحَمْدُ لِلّٰهِ', transliteration: 'Alhamdulillah', meaning: 'Segala Puji bagi Allah' },
    { arabic: 'اللّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah Maha Besar' },
    { arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ', transliteration: 'La ilaha illallah', meaning: 'Tiada Tuhan selain Allah' },
  ];

  const targets = [33, 99, 333];
  const isFinished = count >= target;

  const handleTap = () => {
    if (isFinished) {
      // Getar pendek 3 kali jika user cuba tekan selepas habis (tanda kena reset)
      if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(60);
    
    const zikirName = zikirList[selectedZikir].transliteration;
    addZikir(zikirName, 1); 
    
    setCount(prev => {
      const newCount = prev + 1;
      if (newCount === target && 'vibrate' in navigator) {
        // Getar panjang (2 saat) sebagai tanda tamat
        navigator.vibrate(2000);
      }
      return newCount;
    });
  };

  const handleReset = () => {
    if ('vibrate' in navigator) navigator.vibrate(100);
    setCount(0);
  };

  const changeTarget = (val: number) => {
    setTarget(val);
    setCount(0); // Reset count bila tukar target
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in text-center pb-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-between px-4 mb-2">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full bg-secondary/20 active:scale-90 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold flex-1 mr-8 tracking-tight">{t('tasbih')}</h1>
        </div>

        {/* Pilihan Target */}
        <div className="flex justify-center gap-3 px-4 mb-2">
          {targets.map((val) => (
            <button
              key={val}
              onClick={() => changeTarget(val)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs font-black transition-all border",
                target === val 
                  ? "bg-primary border-primary text-black shadow-lg shadow-primary/20 scale-110" 
                  : "bg-secondary/10 border-white/5 text-muted-foreground"
              )}
            >
              TARGET: {val}
            </button>
          ))}
        </div>

        {/* Zikir Slider */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar px-4">
          {zikirList.map((zikir, index) => (
            <button
              key={index}
              onClick={() => { setSelectedZikir(index); setCount(0); }}
              className={cn(
                'px-6 py-2 rounded-full whitespace-nowrap transition-all border text-sm font-medium',
                selectedZikir === index 
                  ? 'bg-secondary text-foreground border-primary' 
                  : 'bg-secondary/20 border-white/10 text-muted-foreground'
              )}
            >
              {zikir.transliteration}
            </button>
          ))}
        </div>

        {/* Display Card */}
        <div className={cn(
          "mx-4 p-8 rounded-[32px] border transition-all duration-500 relative overflow-hidden",
          isFinished ? "bg-primary/20 border-primary" : "bg-secondary/10 border-primary/20"
        )}>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CircleDot className="w-20 h-20 text-primary" />
          </div>
          <p className="text-4xl font-arabic text-primary mb-3 leading-relaxed">
            {zikirList[selectedZikir].arabic}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {isFinished ? "ALHAMDULILLAH - SELESAI" : zikirList[selectedZikir].meaning}
          </p>
        </div>

        {/* Main Counter Ring */}
        <div className="py-4 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute w-full h-full -rotate-90">
              <circle
                cx="128" cy="128" r="110"
                stroke="currentColor" strokeWidth="12"
                fill="transparent" className="text-secondary/20"
              />
              <circle
                cx="128" cy="128" r="110"
                stroke="currentColor" strokeWidth="12"
                fill="transparent"
                strokeDasharray={691}
                strokeDashoffset={691 - (Math.min(count, target) / target) * 691}
                strokeLinecap="round"
                className={cn(
                  "transition-all duration-300",
                  isFinished ? "text-emerald-500" : "text-primary"
                )}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className={cn(
                "text-8xl font-mono font-bold leading-none transition-colors",
                isFinished ? "text-emerald-500" : "text-foreground"
              )}>
                {count}
              </span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-2">
                / {target}
              </span>
            </div>
          </div>
        </div>

        {/* Tap Button Section */}
        <div className="px-10 relative">
          <button 
            onClick={handleTap} 
            disabled={isFinished}
            className={cn(
              "w-full aspect-square max-w-[220px] mx-auto rounded-full text-black text-5xl font-black transition-all flex items-center justify-center border-[12px] border-black/10 shadow-2xl",
              isFinished 
                ? "bg-slate-700 grayscale cursor-not-allowed scale-90" 
                : "bg-gradient-to-br from-primary to-amber-600 active:scale-90 shadow-primary/30"
            )}
          >
            {isFinished ? "DONE" : "TAP"}
          </button>
          
          {isFinished && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
               <div className="bg-black/80 text-primary px-4 py-2 rounded-lg text-xs font-bold animate-bounce border border-primary/20">
                 Sila Reset
               </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center pt-4">
          <button 
            onClick={handleReset} 
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all text-xs font-black uppercase tracking-[0.2em]"
          >
            <RotateCcw className="w-4 h-4" />
            {t('reset')}
          </button>
        </div>

      </div>
    </MainLayout>
  );
}