import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useUserStats } from '@/hooks/useUserStats';
import { CircleDot, ChevronLeft, RotateCcw, Fingerprint, Sparkles } from 'lucide-react';

export default function TasbihPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addZikir } = useUserStats();

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
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
      if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(60);
    
    const zikirName = zikirList[selectedZikir].transliteration;
    addZikir(zikirName, 1); 
    
    setCount(prev => {
      const newCount = prev + 1;
      if (newCount === target && 'vibrate' in navigator) {
        navigator.vibrate(500); // Getar sebagai tanda tamat
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
    setCount(0);
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in pb-24 p-4">
        
        {/* HEADER DENGAN BUTANG BACK */}
        <div className="flex items-center gap-4 text-left py-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{t('tasbih')}</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">Zikir Elektronik</p>
          </div>
        </div>

        {/* 🟢 HERO CARD (Gaya quran.tsx) */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-wide">
              {zikirList[selectedZikir].arabic}
            </h2>
            <p className="text-emerald-100/80 text-xs font-medium italic">
              "{zikirList[selectedZikir].meaning}"
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {/* TARGET SELECTOR */}
        <div className="flex justify-center gap-2">
          {targets.map((val) => (
            <button
              key={val}
              onClick={() => changeTarget(val)}
              className={cn(
                "flex-1 py-3 rounded-2xl text-[10px] font-black transition-all border",
                target === val 
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20" 
                  : "bg-white dark:bg-slate-900 border-black/5 dark:border-white/5 text-muted-foreground"
              )}
            >
              MATLAMAT: {val}
            </button>
          ))}
        </div>

        {/* ZIKIR SLIDER */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {zikirList.map((zikir, index) => (
            <button
              key={index}
              onClick={() => { setSelectedZikir(index); setCount(0); }}
              className={cn(
                'px-6 py-3 rounded-2xl whitespace-nowrap transition-all border text-xs font-bold uppercase tracking-tight',
                selectedZikir === index 
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                  : 'bg-white dark:bg-slate-900 border-black/5 text-muted-foreground opacity-60'
              )}
            >
              {zikir.transliteration}
            </button>
          ))}
        </div>

        {/* MAIN COUNTER DISPLAY */}
        <div className="relative flex flex-col items-center justify-center py-4">
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Progress Circle */}
            <svg className="absolute w-full h-full -rotate-90">
              <circle
                cx="144" cy="144" r="120"
                stroke="currentColor" strokeWidth="16"
                fill="transparent" className="text-secondary dark:text-slate-800"
              />
              <circle
                cx="144" cy="144" r="120"
                stroke="currentColor" strokeWidth="16"
                fill="transparent"
                strokeDasharray={754}
                strokeDashoffset={754 - (Math.min(count, target) / target) * 754}
                strokeLinecap="round"
                className={cn(
                  "transition-all duration-500 ease-out",
                  isFinished ? "text-emerald-500" : "text-emerald-600"
                )}
              />
            </svg>
            
            <div className="flex flex-col items-center z-10">
              <span className={cn(
                "text-8xl font-black leading-none transition-all tracking-tighter",
                isFinished ? "text-emerald-500 scale-110" : "text-foreground dark:text-white"
              )}>
                {count}
              </span>
              <div className="mt-2 flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Sasaran: {target}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LARGE TAP BUTTON */}
        <div className="px-6">
          <button 
            onClick={handleTap} 
            disabled={isFinished}
            className={cn(
              "w-full h-24 rounded-[32px] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95",
              isFinished 
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-dashed border-slate-300 dark:border-slate-700" 
                : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-500/20"
            )}
          >
            {isFinished ? (
              <span className="font-black uppercase tracking-widest text-sm">Selesai - Sila Reset</span>
            ) : (
              <>
                <Fingerprint className="w-8 h-8 opacity-50" />
                <span className="text-2xl font-black uppercase tracking-[0.2em]">ZIKIR</span>
              </>
            )}
          </button>
        </div>

        {/* RESET BUTTON */}
        <div className="flex justify-center">
          <button 
            onClick={handleReset} 
            className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500/10 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest border border-red-500/10"
          >
            <RotateCcw className="w-4 h-4" />
            Mula Semula
          </button>
        </div>

      </div>
    </MainLayout>
  );
}