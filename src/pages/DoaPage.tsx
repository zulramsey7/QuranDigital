Berikut adalah fail doa.tsx yang telah dikemaskini dengan meletakkan Doa Selamat pada bahagian paling atas (ID: 0). Saya juga telah melaraskan ID doa-doa yang lain agar kekal tersusun.
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
    id: '0',
    doa: 'Doa Selamat',
    ayat: 'اَللّٰهُمَّ اِنَّا نَسْئَلُكَ سَلَامَةً فِى الدِّيْنِ وَعَافِيَةً فِى الْجَسَدِ وَزِيَادَةً فِى الْعِلْمِ وَبَرَكَةً فِى الرِّزْقِ وَتَوْبَةً قَبْلَ الْمَوْتِ وَرَحْمَةً عِنْدَ الْمَوْتِ وَمَغْفِرَةً بَعْدَ الْمَوْتِ. اَللّٰهُمَّ هَوِّنْ عَلَيْنَا فِى سَكَرَاتِ الْمَوْتِ وَالنَّجَاةَ مِنَ النَّارِ وَالْعَفْوَ عِنْدَ الْحِسَابِ',
    latin: "Allahumma inna nas-aluka salamatan fiddin, wa 'afiyatan fil jasad, wa ziyadatan fil 'ilm, wa barakatan fir-rizq, wa taubatan qablal maut, wa rahmatan 'indal maut, wa maghfiratan ba'dal maut. Allahumma hawwin 'alaina fi sakaratil maut, wannajata minannari wal 'afwa 'indal hisab.",
    artinya: 'Ya Allah, sesungguhnya kami memohon kepada-Mu keselamatan dalam agama, kesihatan jasad, tambahan ilmu, keberkatan rezeki, taubat sebelum mati, rahmat ketika mati, dan keampunan selepas mati. Ya Allah, mudahkanlah kami dalam sakaratul maut, lepaskanlah kami dari api neraka dan berilah kemaafan ketika hari perhitungan.'
  },
  {
    id: '1',
    doa: 'Doa Sebelum Makan',
    ayat: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma barik lana fima razaqtana wa qina adzaban-nar',
    artinya: 'Ya Allah, berkatilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari seksa api neraka.'
  },
  {
    id: '2',
    doa: 'Doa Selepas Makan',
    ayat: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    latin: 'Alhamdu lillahil-ladzi ath’amana wa saqana wa ja’alana muslimin',
    artinya: 'Segala puji bagi Allah yang memberi kami makan dan minum serta menjadikan kami orang-orang muslim.'
  },
  {
    id: '3',
    doa: 'Doa Sebelum Tidur',
    ayat: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ',
    latin: 'Bismika allahumma ahya wa amutu',
    artinya: 'Dengan nama-Mu ya Allah, aku hidup dan aku mati.'
  },
  {
    id: '4',
    doa: 'Doa Bangun Tidur',
    ayat: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: 'Alhamdu lillahil-ladzi ahyana ba’da ma amatana wa ilaihin-nusyur',
    artinya: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kami akan kembali.'
  },
  {
    id: '5',
    doa: 'Doa Masuk Tandas',
    ayat: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allahumma inni a’udzu bika minal khubutsi wal khaba’its',
    artinya: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan syaitan laki-laki dan syaitan perempuan.'
  },
  {
    id: '6',
    doa: 'Doa Keluar Tandas',
    ayat: 'غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي',
    latin: 'Ghufranaka. Alhamdu lillahil-ladzi adzhaba ‘annil adza wa ‘afani',
    artinya: 'Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan penyakit dariku.'
  },
  {
    id: '7',
    doa: 'Doa Keluar Rumah',
    ayat: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Bismillahi tawakkaltu ‘alallah, la hawla wala quwwata illa billah',
    artinya: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.'
  },
  {
    id: '8',
    doa: 'Doa Ibu Bapa',
    ayat: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir li wa liwalidayya warhamhuma kama rabbayani saghira',
    artinya: 'Ya Tuhanku, ampunilah dosaku dan dosa kedua ibu bapaku, dan kasihilah mereka.'
  },
  {
    id: '9',
    doa: 'Doa Penerang Hati',
    ayat: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    latin: 'Rabbisy-syrahli sadri wa yassirli amri wahlul uqdatam-mil-lisani yafqahu qauli',
    artinya: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan lidahku.'
  },
  {
    id: '10',
    doa: 'Doa Kebaikan Dunia Akhirat',
    ayat: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
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
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap');

        .quran-render {
          font-family: 'Scheherazade New', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 2.3 !important;
          font-size: 2.7rem !important;
          font-weight: 500 !important;
          word-spacing: 4px;
          font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1, "ss01" 1 !important;
        }

        @media (max-width: 640px) {
          .quran-render {
            font-size: 2.2rem !important;
            line-height: 2.1 !important;
          }
        }
      `}} />

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
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t('doa')}</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Himpunan Doa Harian</p>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-wide">اَلدُّعَاءُ هُوَ الْعِبَادَةُ</h2>
            <p className="text-emerald-100 text-sm font-medium italic opacity-80 text-center">"Doa itu adalah ibadah"</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Cari doa harian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-14 rounded-2xl bg-white dark:bg-slate-900 border-black/5 dark:border-white/5 shadow-sm focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white"
          />
        </div>

        {/* Doa List */}
        <div className="space-y-4">
          {filteredDoas.length > 0 ? (
            filteredDoas.map((doa) => (
              <div 
                key={doa.id} 
                className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm space-y-6 animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight border border-emerald-100 dark:border-emerald-500/20">
                    {doa.id === '0' ? 'Pilihan' : `Doa ${doa.id}`}
                  </span>
                  <h3 className="font-bold text-sm text-slate-400 dark:text-slate-500 tracking-tight">
                    {doa.doa}
                  </h3>
                </div>

                {/* Paparan Teks Arab (Rasm Imla'ei) */}
                <p className="quran-render text-slate-800 dark:text-slate-100">
                  {doa.ayat}
                </p>

                <div className="space-y-4 pt-4 border-t border-dashed border-black/5 dark:border-white/5 text-left">
                  <div className="flex gap-3">
                    <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1 opacity-70" />
                    <p className="text-[14px] font-bold text-emerald-900 dark:text-emerald-400 italic leading-relaxed">
                      {doa.latin}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-70" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {doa.artinya}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-[28px] border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-400 font-medium italic">Doa tidak dijumpai.</p>
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

