import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function TasbihPage() {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [target] = useState(33);
  const [selectedZikir, setSelectedZikir] = useState(0);

  const zikirList = [
    { arabic: 'سُبْحَانَ اللّٰهِ', transliteration: 'Subhanallah', meaning: 'Glory be to Allah' },
    { arabic: 'اَلْحَمْدُ لِلّٰهِ', transliteration: 'Alhamdulillah', meaning: 'Praise be to Allah' },
    { arabic: 'اللّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
    { arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah' },
  ];

  const handleTap = () => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setCount(prev => prev + 1);
  };

  const handleReset = () => {
    if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);
    setCount(0);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in text-center">
        <h1 className="text-2xl font-semibold">{t('tasbih')}</h1>

        {/* Zikir Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {zikirList.map((zikir, index) => (
            <button
              key={index}
              onClick={() => { setSelectedZikir(index); setCount(0); }}
              className={cn(
                'floating-card px-4 py-2 whitespace-nowrap transition-all',
                selectedZikir === index ? 'bg-primary text-primary-foreground' : ''
              )}
            >
              {zikir.transliteration}
            </button>
          ))}
        </div>

        {/* Current Zikir */}
        <div className="floating-card p-6 gold-glow">
          <p className="text-3xl font-arabic text-primary mb-2">{zikirList[selectedZikir].arabic}</p>
          <p className="text-sm text-muted-foreground">{zikirList[selectedZikir].meaning}</p>
        </div>

        {/* Counter Display */}
        <div className="py-8">
          <p className="text-6xl font-bold text-foreground">{count}</p>
          <p className="text-muted-foreground mt-2">{t('target')}: {target}</p>
        </div>

        {/* Tap Button */}
        <button onClick={handleTap} className="tasbih-btn mx-auto animate-pulse-gold">
          +1
        </button>

        {/* Reset */}
        <button onClick={handleReset} className="text-muted-foreground hover:text-primary transition-colors">
          {t('reset')}
        </button>
      </div>
    </MainLayout>
  );
}
