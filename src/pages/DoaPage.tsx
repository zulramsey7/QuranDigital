import { useState } from 'react';
import { Languages, Globe, Search, BookOpen } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';

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
    artinya: 'Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan penyakit dariku dan menjaga kesihatanku.'
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
    artinya: 'Ya Tuhanku, ampunilah dosaku dan dosa kedua ibu bapaku, dan kasihilah mereka sebagaimana mereka menyayangiku sewaktu kecil.'
  },
  {
    id: '9',
    doa: 'Doa Penerang Hati',
    ayat: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    latin: 'Rabbisy-syrahli sadri wa yassirli amri wahlul uqdatam-mil-lisani yafqahu qauli',
    artinya: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan lidahku agar mereka mengerti perkataanku.'
  },
  {
    id: '10',
    doa: 'Doa Kebaikan Dunia Akhirat',
    ayat: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adzaban-nar',
    artinya: 'Wahai Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari seksa api neraka.'
  }
];

export default function DoaPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoas = STATIC_DOAS.filter(d => 
    d.doa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.artinya.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-24">
        
        {/* Header Section */}
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('doa')}</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Himpunan Doa Pilihan & Harian
          </p>
        </div>

        {/* Search Bar - Sticky */}
        <div className="relative sticky top-4 z-20 mx-auto w-full max-w-lg">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Cari doa harian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-full bg-background/80 backdrop-blur-xl border-primary/20 focus:border-primary shadow-xl shadow-primary/5 transition-all"
          />
        </div>

        {/* Doa List */}
        <div className="grid gap-6">
          {filteredDoas.length > 0 ? (
            filteredDoas.map((doa) => (
              <div 
                key={doa.id} 
                className="group relative overflow-hidden rounded-[2rem] bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all duration-500 shadow-sm"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

                <div className="p-8 space-y-8">
                  {/* Title */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-[10px] font-bold text-primary italic">
                      {doa.id}
                    </span>
                    <h3 className="font-bold text-xl text-foreground tracking-tight">
                      {doa.doa}
                    </h3>
                  </div>
                  
                  {/* Arabic - Focus Center */}
                  <div className="relative py-4">
                    <p className="text-4xl leading-[1.8] text-right font-serif dir-rtl text-foreground leading-relaxed antialiased">
                      {doa.ayat}
                    </p>
                  </div>

                  {/* Translation & Latin Section */}
                  <div className="grid gap-4 pt-6 border-t border-primary/10">
                    <div className="flex gap-4 group/latin">
                      <div className="mt-1">
                        <Languages className="w-4 h-4 text-primary opacity-40 group-hover/latin:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[15px] font-semibold text-primary/80 italic leading-relaxed">
                        {doa.latin}
                      </p>
                    </div>

                    <div className="flex gap-4 group/trans">
                      <div className="mt-1">
                        <Globe className="w-4 h-4 text-muted-foreground opacity-40 group-hover/trans:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                        {doa.artinya}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 rounded-[3rem] border-2 border-dashed border-muted/20 bg-secondary/10">
              <p className="text-muted-foreground font-medium italic">Maaf, doa tidak dijumpai dalam koleksi kami.</p>
            </div>
          )}
        </div>

        {/* Bottom Quote */}
        <div className="text-center pt-8 opacity-50">
          <p className="text-xs font-medium uppercase tracking-[0.3em]">Ad-Du'au Huwal 'Ibadah</p>
          <p className="text-[10px] mt-1">Doa itu adalah ibadah</p>
        </div>

      </div>
    </MainLayout>
  );
}