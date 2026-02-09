import React, { useState } from 'react';
import { 
  ChevronLeft, Search, X, Star, Info, 
  Wind, Ship, Flame, Mountain, Droplets, 
  Pen, Leaf, Crown, Heart, Scale, 
  Music, Gem, Sun, BookOpen, Waves, Feather, Cloud, MapPin, History,
  Book, Users, Sword, Shield, Scroll, Key, Sunset
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

type SirahStory = {
  id: number;
  title: string;
  content?: string;
  icon: React.ReactNode;
  isNovel?: boolean;
  scenes?: { img: string; text: string }[];
};

const sirahData = {
  nabawiyah: [
    { 
      id: 101, 
      title: "Kelahiran (570 M)", 
      content: "Nabi Muhammad SAW dilahirkan pada 12 Rabiulawal Tahun Gajah di Makkah. Pada tahun ini, Raja Abrahah dari Yaman cuba menyerang Kaabah dengan tentera bergajah, namun Allah SWT menghantar burung Ababil yang melemparkan batu api dari neraka untuk memusnahkan mereka, menyelamatkan Kaabah dan penduduk Makkah.", 
      icon: <History className="w-5 h-5" /> 
    },
    { 
      id: 102, 
      title: "Zaman Kanak-kanak", 
      content: "Baginda disusukan oleh Halimah As-Sa'diyah di perkampungan Bani Sa'ad. Berlaku peristiwa pembelahan dada oleh malaikat untuk menyucikan hati Baginda. Ibu Baginda, Aminah, wafat ketika Baginda berusia 6 tahun, diikuti datuknya Abdul Muttalib ketika usia 8 tahun. Baginda kemudian dipelihara oleh bapa saudaranya, Abu Talib.", 
      icon: <Leaf className="w-5 h-5" /> 
    },
    { 
      id: 103, 
      title: "Perkahwinan Khadijah (25 Tahun)", 
      content: "Pada usia 25 tahun, Baginda berkahwin dengan Siti Khadijah binti Khuwailid, seorang bangsawan dan usahawan wanita yang berusia 40 tahun. Perkahwinan ini membawa ketenangan dan sokongan besar dalam kehidupan Baginda sebelum kenabian.", 
      icon: <Heart className="w-5 h-5" /> 
    },
    { 
      id: 104, 
      title: "Wahyu Pertama (610 M)", 
      content: "Ketika berusia 40 tahun, Malaikat Jibril datang membawa wahyu pertama (Surah Al-Alaq: 1-5) di Gua Hira'. Jibril memeluk Baginda dengan kuat sambil berkata 'Iqra!' (Bacalah). Ini menandakan bermulanya tugas kerasulan dan dakwah Baginda kepada seluruh alam.", 
      icon: <BookOpen className="w-5 h-5" /> 
    },
    { 
      id: 105, 
      title: "Dakwah Makkah (1-3 Kenabian)", 
      content: "Baginda memulakan dakwah secara rahsia selama 3 tahun, kemudian secara terang-terangan di Bukit Safa. Baginda dan para sahabat menghadapi penentangan hebat, seksaan, dan pemulauan ekonomi oleh Musyrikin Quraisy selama bertahun-tahun.", 
      icon: <Sun className="w-5 h-5" /> 
    },
    { 
      id: 106, 
      title: "Tahun Kesedihan (10 Kenabian)", 
      content: "Dikenali sebagai 'Amul Huzni'. Isteri tercinta Khadijah dan bapa saudara pelindung Abu Talib wafat. Baginda kemudian ke Taif untuk berdakwah tetapi ditolak dan dibaling batu oleh penduduk di sana sehingga berdarah kaki Baginda.", 
      icon: <Cloud className="w-5 h-5" /> 
    },
    { 
      id: 107, 
      title: "Isra' & Mi'raj (11 Kenabian)", 
      content: "Peristiwa ajaib perjalanan Rasulullah dari Masjidil Haram ke Masjidil Aqsa (Isra') dan naik ke langit (Mi'raj) untuk menerima perintah solat 5 waktu. Ini adalah satu-satunya peristiwa di mana Baginda melihat kebesaran Allah secara langsung di Sidratul Muntaha.",
      icon: <Star className="w-5 h-5" />, 
      isNovel: true, 
      scenes: [
        { img: "/sirah1.png", text: "Allah menghiburkan Rasulullah SAW dengan jemputan ke langit. Perjalanan bermula dari Masjidil Haram ke Masjidil Aqsa menaiki Buraq." },
        { img: "/sirah2.png", text: "Di Masjidil Aqsa, Baginda mengimamkan solat bersama roh para Nabi terdahulu, menunjukkan kepimpinan Baginda ke atas sekalian Rasul." },
        { img: "/sirah3.png", text: "Rasulullah naik ke langit (Mi'raj) merentas tujuh lapisan langit, bertemu Nabi-nabi seperti Adam, Isa, Yusuf, Idris, Harun, Musa, dan Ibrahim." },
        { img: "/sirah4.png", text: "Di Sidratul Muntaha, Baginda menerima perintah solat fardu 5 waktu secara langsung daripada Allah SWT, hadiah agung untuk umat Islam." }
      ]
    },
    { 
      id: 108, 
      title: "Bai'ah Aqabah (12 Kenabian)", 
      content: "Penduduk Yathrib (Madinah) datang menemui Rasulullah di Mina pada musim haji. Mereka berjanji setia (Bai'ah) untuk melindungi Baginda jika berhijrah ke tempat mereka. Ini membuka jalan kepada penghijrahan.", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: 109, 
      title: "Hijrah ke Madinah (1H)", 
      content: "Baginda berhijrah bersama Abu Bakar As-Siddiq, bersembunyi di Gua Thur dari kejaran Quraisy. Tiba di Madinah, Baginda disambut dengan nasyid 'Tala'al Badru 'Alaina' dan kegembiraan luar biasa oleh penduduk Ansar.", 
      icon: <MapPin className="w-5 h-5" /> 
    },
    { 
      id: 110, 
      title: "Negara Madinah (1H)", 
      content: "Langkah pertama Baginda ialah membina Masjid Nabawi sebagai pusat pemerintahan dan ibadah. Baginda mempersaudarakan Muhajirin dan Ansar, serta menggubal Piagam Madinah sebagai perlembagaan negara Islam pertama.", 
      icon: <Crown className="w-5 h-5" /> 
    },
    { 
      id: 111, 
      title: "Perang Badar (2H)", 
      content: "Perang besar pertama dalam Islam (2H). Tentera Islam (313 orang) menewaskan tentera Quraisy (1000 orang) dengan bantuan malaikat. Ia menjadi pemisah antara hak dan batil (Yaumul Furqan).", 
      icon: <Sword className="w-5 h-5" /> 
    },
    { 
      id: 112, 
      title: "Perang Uhud (3H)", 
      content: "Ujian berat bagi umat Islam (3H). Tentera Islam pada mulanya menang, tetapi kerana pemanah ingkar arahan turun dari bukit, tentera Khalid al-Walid (belum Islam) menyerang balas. Hamzah r.a syahid dan Nabi cedera.", 
      icon: <Mountain className="w-5 h-5" /> 
    },
    { 
      id: 113, 
      title: "Perang Khandaq (5H)", 
      content: "Madinah dikepung oleh gabungan tentera Ahzab (5H). Salman al-Farisi mencadangkan penggalian parit besar (Khandaq) di sekeliling kota. Ribut kencang dari Allah akhirnya mengusir tentera musuh.", 
      icon: <Shield className="w-5 h-5" /> 
    },
    { 
      id: 114, 
      title: "Perjanjian Hudaibiyah (6H)", 
      content: "Gencatan senjata 10 tahun antara Islam dan Quraisy (6H). Walaupun kelihatan berat sebelah, ia membuka peluang dakwah yang luas dan menjadi mukadimah kepada pembukaan Makkah.", 
      icon: <Scroll className="w-5 h-5" /> 
    },
    { 
      id: 115, 
      title: "Fathul Makkah (8H)", 
      content: "Quraisy melanggar perjanjian. Rasulullah membawa 10,000 tentera ke Makkah (8H). Kota Makkah dibuka tanpa pertumpahan darah. Baginda memaafkan penduduk Makkah dan memusnahkan 360 berhala di Kaabah.", 
      icon: <Key className="w-5 h-5" /> 
    },
    { 
      id: 116, 
      title: "Haji Wada' (10H)", 
      content: "Haji terakhir Baginda (10H). Di Arafah, Baginda menyampaikan khutbah terakhir yang menekankan persaudaraan, hak wanita, dan pengharaman riba. Wahyu terakhir turun menyempurnakan agama Islam.", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: 117, 
      title: "Kewafatan Rasulullah (11H)", 
      content: "Pada 12 Rabiulawal 11H, kekasih Allah, Nabi Muhammad SAW wafat di pangkuan Aisyah r.a. Madinah gelap gelita dengan kesedihan. Baginda meninggalkan dua perkara yang tidak akan menyesatkan: Al-Quran dan Sunnah.", 
      icon: <Sunset className="w-5 h-5" /> 
    }
  ],
  paraNabi: [
    { id: 1, title: "Nabi Adam AS", content: "Manusia pertama diciptakan dari tanah. Tinggal di Syurga sebelum diturunkan ke Bumi selepas digoda Iblis memakan buah Khuldi.", icon: <Leaf className="w-5 h-5" /> },
    { id: 2, title: "Nabi Idris AS", content: "Nabi pertama yang pandai menulis dengan pena dan menjahit pakaian. Mempunyai ilmu falak yang tinggi.", icon: <Pen className="w-5 h-5" /> },
    { id: 3, title: "Nabi Nuh AS", content: "Membina bahtera besar atas perintah Allah. Banjir besar melanda dunia menenggelamkan kaumnya yang kafir.", icon: <Ship className="w-5 h-5" /> },
    { id: 4, title: "Nabi Hud AS", content: "Diutus kepada kaum 'Ad yang sombong. Allah memusnahkan mereka dengan angin puting beliung yang sangat sejuk.", icon: <Wind className="w-5 h-5" /> },
    { id: 5, title: "Nabi Saleh AS", content: "Mukjizat seekor unta betina keluar dari batu. Kaum Tsamud dibinasakan dengan suara guntur kerana membunuh unta itu.", icon: <Info className="w-5 h-5" /> },
    { id: 6, title: "Nabi Ibrahim AS", content: "Bapa para Nabi. Tidak hangus dibakar api Raja Namrud. Membina Kaabah bersama anaknya Nabi Ismail AS.", icon: <Flame className="w-5 h-5" /> },
    { id: 7, title: "Nabi Luth AS", content: "Diutus kepada kaum Sadum. Allah menterbalikkan bumi mereka kerana melakukan maksiat yang melampaui batas.", icon: <Mountain className="w-5 h-5" /> },
    { id: 8, title: "Nabi Ismail AS", content: "Asal usul air Zamzam. Redha disembelih oleh bapanya sebelum digantikan Allah dengan seekor kibas.", icon: <Droplets className="w-5 h-5" /> },
    { id: 9, title: "Nabi Ishaq AS", content: "Anak kedua Ibrahim. Lahir dari Siti Sarah yang sudah tua. Menjadi nenek moyang kepada ramai Nabi Bani Israil.", icon: <BookOpen className="w-5 h-5" /> },
    { id: 10, title: "Nabi Yaqub AS", content: "Bapa kepada Nabi Yusuf. Sangat penyabar menghadapi ujian kehilangan anaknya sehingga matanya menjadi buta.", icon: <Heart className="w-5 h-5" /> },
    { id: 11, title: "Nabi Yusuf AS", content: "Memiliki wajah yang sangat tampan. Dibuang ke perigi oleh abangnya, akhirnya menjadi menteri yang sangat berkuasa di Mesir.", icon: <Crown className="w-5 h-5" /> },
    { id: 12, title: "Nabi Ayub AS", content: "Ujian penyakit kulit yang sangat lama. Beliau tetap sabar dan tidak berhenti berzikir kepada Allah SWT.", icon: <Heart className="w-5 h-5" /> },
    { id: 13, title: "Nabi Syuaib AS", content: "Digelar Khatibul Anbiya. Mengajar kaumnya supaya jujur dalam timbangan dan tidak menipu dalam perniagaan.", icon: <Scale className="w-5 h-5" /> },
    { id: 14, title: "Nabi Musa AS", content: "Mukjizat tongkat membelah laut dan mengalahkan sihir Firaun. Menerima kitab Taurat di Bukit Sinai.", icon: <Waves className="w-5 h-5" /> },
    { id: 15, title: "Nabi Harun AS", content: "Saudara Nabi Musa. Mempunyai tutur bicara yang sangat fasih dan membantu dakwah Musa menentang Firaun.", icon: <Info className="w-5 h-5" /> },
    { id: 16, title: "Nabi Zulkifli AS", content: "Seorang Nabi yang sangat amanah dan sabar. Beliau memerintah rakyatnya dengan adil dan sentiasa menepati janji.", icon: <Gem className="w-5 h-5" /> },
    { id: 17, title: "Nabi Daud AS", content: "Boleh melenturkan besi dengan tangan dan mempunyai suara merdu. Menerima kitab Zabur dan mengalahkan Jalut.", icon: <Music className="w-5 h-5" /> },
    { id: 18, title: "Nabi Sulaiman AS", content: "Nabi paling kaya. Boleh memerintah jin, haiwan, dan angin. Membina Haikal Sulaiman dan mengislamkan Ratu Balqis.", icon: <Crown className="w-5 h-5" /> },
    { id: 19, title: "Nabi Ilyas AS", content: "Menyeru kaumnya berhenti menyembah berhala Ba'al. Meminta doa agar diturunkan hujan selepas kemarau panjang.", icon: <Sun className="w-5 h-5" /> },
    { id: 20, title: "Nabi Ilyasa AS", content: "Penerus dakwah Nabi Ilyas. Diberikan mukjizat menyembuhkan penyakit dan memimpin Bani Israil dengan hikmah.", icon: <BookOpen className="w-5 h-5" /> },
    { id: 21, title: "Nabi Yunus AS", content: "Ditelan ikan nun (paus). Di dalam perut ikan, beliau sentiasa berzikir memohon ampun sehingga dikeluarkan Allah.", icon: <Waves className="w-5 h-5" /> },
    { id: 22, title: "Nabi Zakaria AS", content: "Bapa Nabi Yahya. Menjaga Maryam di Mihrab. Walaupun sudah sangat tua, Allah mengurniakan anak atas doanya.", icon: <Info className="w-5 h-5" /> },
    { id: 23, title: "Nabi Yahya AS", content: "Anak Zakaria yang sangat lembut hatinya dan berani. Menegakkan hukum Allah tanpa rasa takut kepada raja yang zalim.", icon: <Feather className="w-5 h-5" /> },
    { id: 24, title: "Nabi Isa AS", content: "Lahir tanpa bapa. Boleh bercakap masa bayi dan menghidupkan orang mati dengan izin Allah. Akan turun semula di akhir zaman.", icon: <Cloud className="w-5 h-5" /> },
    { id: 25, title: "Nabi Muhammad SAW", content: "Nabi dan Rasul terakhir. Mukjizat terbesar ialah Al-Quran. Membawa ajaran Islam untuk seluruh alam semesta.", icon: <Star className="w-5 h-5" /> }
  ]
};

export default function SirahPage() {
  const [view, setView] = useState<'menu' | 'nabawiyah' | 'paraNabi'>('menu');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState<SirahStory | null>(null);
  const [currentScene, setCurrentScene] = useState(0);

  const filterData = (data: SirahStory[]) =>
    data.filter((s) => 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (s.content && s.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto pb-24 p-4 min-h-screen">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6 py-6 text-left">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => view === 'menu' ? window.history.back() : setView('menu')}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
                {view === 'menu' ? "Sirah & Kisah" : view === 'nabawiyah' ? "Sirah Nabawiyah" : "25 Para Nabi"}
              </h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">Hikmah & Teladan</p>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-wide">
                {view === 'menu' ? "Khazanah Sejarah" : view === 'nabawiyah' ? "Nabawiyah" : "Kisah Para Nabi"}
              </h2>
              <p className="text-emerald-100 text-xs font-medium italic opacity-80">Mempelajari kebesaran Allah melalui sejarah utusan-Nya</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>

          {view !== 'menu' && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Cari kisah..."
                className="w-full bg-secondary/30 dark:bg-slate-900 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary/30 outline-none dark:text-white"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* MENU UTAMA - EMERALD STYLE */}
        {view === 'menu' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <button 
              onClick={() => setView('nabawiyah')}
              className="group relative overflow-hidden rounded-[35px] p-8 h-56 bg-white dark:bg-slate-900 text-left shadow-sm border border-black/5 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground uppercase leading-tight">Sirah<br/>Nabawiyah</h2>
                <p className="text-muted-foreground text-xs mt-1 font-medium italic">Kisah Agung Rasulullah SAW</p>
              </div>
              <ChevronLeft className="absolute right-8 bottom-8 w-6 h-6 text-emerald-500 rotate-180 opacity-30" />
            </button>

            <button 
              onClick={() => setView('paraNabi')}
              className="group relative overflow-hidden rounded-[35px] p-8 h-56 bg-white dark:bg-slate-900 text-left shadow-sm border border-black/5 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground uppercase leading-tight">25 Para<br/>Nabi</h2>
                <p className="text-muted-foreground text-xs mt-1 font-medium italic">Sejarah Utusan Allah AS</p>
              </div>
              <ChevronLeft className="absolute right-8 bottom-8 w-6 h-6 text-emerald-500 rotate-180 opacity-30" />
            </button>
          </div>
        )}

        {/* SENARAI KISAH */}
        {view !== 'menu' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filterData(view === 'nabawiyah' ? sirahData.nabawiyah : sirahData.paraNabi).map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[28px] p-5 flex flex-col items-center text-center shadow-sm border border-black/5 hover:border-emerald-500/20 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-[#10b981] to-[#059669]">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[13px] dark:text-white mb-4 line-clamp-2 min-h-[40px] flex items-center justify-center">{item.title}</h3>
                <button 
                  onClick={() => { setSelectedStory(item); setCurrentScene(0); }}
                  className="w-full py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-[10px] font-black rounded-xl active:scale-95"
                >
                  BACA
                </button>
              </div>
            ))}
          </div>
        )}

        {/* MODAL STORY */}
        {selectedStory && (
          <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-500/10">
              
              <div className="p-6 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <h2 className="font-black text-xl dark:text-white pr-4">{selectedStory.title}</h2>
                <button onClick={() => setSelectedStory(null)} className="p-2 bg-secondary dark:bg-slate-800 rounded-full shrink-0">
                  <X className="w-5 h-5 text-foreground dark:text-white" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {selectedStory.isNovel && selectedStory.scenes ? (
                  <div className="space-y-6">
                    <div className="relative rounded-[30px] overflow-hidden aspect-video border-4 border-secondary dark:border-slate-800 shadow-xl bg-slate-100">
                      <img 
                        src={selectedStory.scenes[currentScene].img} 
                        className="w-full h-full object-cover" 
                        alt="Scene Sirah" 
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400?text=Gambar+Tidak+Ditemui";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold">
                        Halaman {currentScene + 1} / {selectedStory.scenes.length}
                      </div>
                    </div>
                    
                    <div className="p-6 bg-secondary/30 dark:bg-emerald-500/5 rounded-[30px] border border-black/5 dark:border-emerald-500/10 min-h-[120px] flex items-center">
                      <p className="text-lg leading-relaxed text-center font-medium italic dark:text-slate-200 w-full">
                        "{selectedStory.scenes[currentScene].text}"
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        disabled={currentScene === 0}
                        onClick={() => setCurrentScene(c => c - 1)}
                        className="flex-1 py-4 bg-secondary dark:bg-slate-800 dark:text-white rounded-2xl font-black text-xs disabled:opacity-20 transition-all"
                      >
                        BALIK
                      </button>
                      <button 
                        onClick={() => currentScene < (selectedStory.scenes?.length || 0) - 1 ? setCurrentScene(c => c + 1) : setSelectedStory(null)}
                        className="flex-[2] py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all"
                      >
                        {currentScene === (selectedStory.scenes?.length || 0) - 1 ? "TAMAT" : "SETERUSNYA"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-8 bg-secondary/20 dark:bg-emerald-500/5 rounded-[35px] border border-black/5 dark:border-emerald-500/10 shadow-inner">
                      <p className="text-lg leading-relaxed text-justify dark:text-slate-200 font-medium">
                        {selectedStory.content}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedStory(null)}
                      className="w-full py-5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-[25px] font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                    >
                      SELESAI MEMBACA
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
