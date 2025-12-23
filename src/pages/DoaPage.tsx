import { useState } from 'react';
import { Languages, Globe, Search, BookOpen, ChevronLeft } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface Doa {
  id: string;
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
}

const STATIC_DOAS: Doa[] = [
  {
    id: '1',
    doa: 'Doa Sebelum Makan',
    ayat: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma barik lana fima razaqtana wa qina adzaban-nar',
    artinya: 'Ya Allah, berkatilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari seksa api neraka.'
  },
  {
    id: '2',
    doa: 'Doa Selepas Makan',
    ayat: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    latin: 'Alhamdu lillahil-ladzi ath’amana wa saqana wa ja’alana muslimin',
    artinya: 'Segala puji bagi Allah yang memberi kami makan dan minum serta menjadikan kami orang-orang muslim.'
  },
  {
    id: '3',
    doa: 'Doa Sebelum Tidur',
    ayat: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ',
    latin: 'Bismika allahumma ahya wa amutu',
    artinya: 'Dengan nama-Mu ya Allah, aku hidup dan aku mati.'
  },
  {
    id: '4',
    doa: 'Doa Bangun Tidur',
    ayat: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: 'Alhamdu lillahil-ladzi ahyana ba’da ma amatana wa ilaihin-nusyur',
    artinya: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kami akan kembali.'
  },
  {
    id: '5',
    doa: 'Doa Masuk Tandas',
    ayat: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allahumma inni a’udzu bika minal khubutsi wal khaba’its',
    artinya: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan syaitan laki-laki dan syaitan perempuan.'
  },
  {
    id: '6',
    doa: 'Doa Keluar Tandas',
    ayat: 'غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي',
    latin: 'Ghufranaka. Alhamdu lillahil-ladzi adzhaba ‘annil adza wa ‘afani',
    artinya: 'Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan penyakit dariku.'
  },
  {
    id: '7',
    doa: 'Doa Keluar Rumah',
    ayat: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Bismillahi tawakkaltu ‘alallah, la hawla wala quwwata illa billah',
    artinya: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.'
  },
  {
    id: '8',
    doa: 'Doa Ibu Bapa',
    ayat: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir li wa liwalidayya warhamhuma kama rabbayani saghira',
    artinya: 'Ya Tuhanku, ampunilah dosaku dan dosa kedua ibu bapaku, dan kasihilah mereka.'
  },
  {
    id: '9',
    doa: 'Doa Penerang Hati',
    ayat: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    latin: 'Rabbisy-syrahli sadri wa yassirli amri wahlul uqdatam-mil-lisani yafqahu qauli',
    artinya: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan lidahku.'
  },
  {
    id: '10',
    doa: 'Doa Kebaikan Dunia Akhirat',
    ayat: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adzaban-nar',
    artinya: 'Wahai Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat.'
  }
];

export default function DoaPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoas = STATIC_DOAS.filter(d => 
    d.doa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.artinya.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      {/* ⚡ FORCE FONT: Memastikan ketepatan baris Arab harian */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        .quran-render {
          font-family: 'Amiri', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 2.5 !important;
          word-spacing: 2px;
          -webkit-font-smoothing: antialiased;
        }
      `}} />

      <div className="space-y-6 animate-fade-in pb-20 px-1">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 text-left">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{t('doa')}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Himpunan Doa Harian</p>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-xl text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-wide">اَلدُّعَاءُ هُوَ الْعِبَادَةُ</h2>
            <p className="opacity-80 text-sm font-medium italic">"Doa itu adalah ibadah"</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari doa harian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-14 rounded-2xl bg-secondary/30 border-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Doa List */}
        <div className="space-y-4">
          {filteredDoas.length > 0 ? (
            filteredDoas.map((doa) => (
              <div 
                key={doa.id} 
                className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6 animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                    Doa {doa.id}
                  </span>
                  <h3 className="font-bold text-sm text-foreground/60 tracking-tight">
                    {doa.doa}
                  </h3>
                </div>

                {/* 📖 Paparan Teks Arab dengan Amiri Force */}
                <p className="quran-render text-3xl sm:text-4xl text-foreground">
                  {doa.ayat}
                </p>

                <div className="space-y-4 pt-4 border-t border-dashed border-primary/10 text-left">
                  <div className="flex gap-3">
                    <Languages className="w-4 h-4 text-primary shrink-0 mt-1 opacity-70" />
                    <p className="text-[14px] font-bold text-primary/90 italic leading-relaxed">
                      {doa.latin}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-70" />
                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                      {doa.artinya}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-secondary/10 rounded-[28px] border border-dashed border-muted/20">
              <p className="text-sm text-muted-foreground font-medium italic">Doa tidak dijumpai.</p>
            </div>
          )}
        </div>

        <div className="text-center py-10 opacity-20 text-[10px] font-bold tracking-[0.5em] uppercase dark:text-white">
          Hujung Senarai
        </div>
      </div>
    </MainLayout>
  );
}
