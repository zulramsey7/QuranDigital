import { useState } from 'react';
import { 
  ChevronLeft, Search, X, Star, Info, 
  Wind, Ship, Flame, Mountain, Droplets, 
  Pen, Leaf, Crown, Heart, Scale, 
  Music, Gem, Sun, BookOpen, Waves, Feather, Cloud, MapPin, History,
  Book, Users
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

// 🟢 TUKAR KEPADA EMERALD GRADIENT
const emeraldGradient = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

const sirahData = {
  nabawiyah: [
    { id: 101, title: "Tahun Gajah", content: "Nabi Muhammad SAW dilahirkan pada 12 Rabiulawal Tahun Gajah. Raja Abrahah dari Yaman cuba menyerang Kaabah dengan tentera bergajah, namun Allah SWT menghantar burung Ababil yang melemparkan batu api untuk memusnahkan mereka.", icon: <History className="w-5 h-5" />, color: emeraldGradient },
    { id: 102, title: "Wahyu Pertama", content: "Malaikat Jibril datang membawa wahyu pertama (Surah Al-Alaq: 1-5) di Gua Hira'. Jibril memeluk Baginda sambil berkata 'Iqra!' (Bacalah). Ini menandakan bermulanya tugas dakwah Baginda.", icon: <BookOpen className="w-5 h-5" />, color: emeraldGradient },
    { 
      id: 103, title: "Isra' & Mi'raj", icon: <Star className="w-5 h-5" />, color: emeraldGradient, 
      isNovel: true, 
      scenes: [
        { img: "/sirah1.png", text: "Tahun Kesedihan. Allah menghiburkan Rasulullah SAW dengan jemputan ke langit selepas pemergian Abu Talib & Khadijah." },
        { img: "/sirah2.png", text: "Buraq membawa Rasulullah ke Masjidil Aqsa. Di sana, Baginda mengimamkan solat bersama para Nabi terdahulu." },
        { img: "/sirah3.png", text: "Rasulullah naik ke langit merentas tujuh lapisan langit dan bertemu dengan para Nabi di setiap lapisan." },
        { img: "/sirah4.png", text: "Rasulullah naik ke Sidratul Muntaha dan menerima perintah solat fardu lima waktu secara langsung daripada Allah SWT." }
      ]
    },
    { id: 104, title: "Hijrah Madinah", content: "Baginda berhijrah ke Madinah bersama Abu Bakar. Di sana, Baginda membina Masjid Nabawi dan mempersaudarakan kaum Muhajirin dan Ansar.", icon: <MapPin className="w-5 h-5" />, color: emeraldGradient }
  ],
  paraNabi: [
    { id: 1, title: "Nabi Adam AS", content: "Manusia pertama diciptakan dari tanah. Tinggal di Syurga sebelum diturunkan ke Bumi selepas digoda Iblis memakan buah Khuldi.", icon: <Leaf className="w-5 h-5" />, color: emeraldGradient },
    { id: 2, title: "Nabi Idris AS", content: "Nabi pertama yang pandai menulis dengan pena dan menjahit pakaian. Mempunyai ilmu falak yang tinggi.", icon: <Pen className="w-5 h-5" />, color: emeraldGradient },
    { id: 3, title: "Nabi Nuh AS", content: "Membina bahtera besar atas perintah Allah. Banjir besar melanda dunia menenggelamkan kaumnya yang kafir.", icon: <Ship className="w-5 h-5" />, color: emeraldGradient },
    { id: 4, title: "Nabi Hud AS", content: "Diutus kepada kaum 'Ad yang sombong. Allah memusnahkan mereka dengan angin puting beliung yang sangat sejuk.", icon: <Wind className="w-5 h-5" />, color: emeraldGradient },
    { id: 5, title: "Nabi Saleh AS", content: "Mukjizat seekor unta betina keluar dari batu. Kaum Tsamud dibinasakan dengan suara guntur kerana membunuh unta itu.", icon: <Info className="w-5 h-5" />, color: emeraldGradient },
    { id: 6, title: "Nabi Ibrahim AS", content: "Bapa para Nabi. Tidak hangus dibakar api Raja Namrud. Membina Kaabah bersama anaknya Nabi Ismail AS.", icon: <Flame className="w-5 h-5" />, color: emeraldGradient },
    { id: 7, title: "Nabi Luth AS", content: "Diutus kepada kaum Sadum. Allah menterbalikkan bumi mereka kerana melakukan maksiat yang melampaui batas.", icon: <Mountain className="w-5 h-5" />, color: emeraldGradient },
    { id: 8, title: "Nabi Ismail AS", content: "Asal usul air Zamzam. Redha disembelih oleh bapanya sebelum digantikan Allah dengan seekor kibas.", icon: <Droplets className="w-5 h-5" />, color: emeraldGradient },
    { id: 9, title: "Nabi Ishaq AS", content: "Anak kedua Ibrahim. Lahir dari Siti Sarah yang sudah tua. Menjadi nenek moyang kepada ramai Nabi Bani Israil.", icon: <BookOpen className="w-5 h-5" />, color: emeraldGradient },
    { id: 10, title: "Nabi Yaqub AS", content: "Bapa kepada Nabi Yusuf. Sangat penyabar menghadapi ujian kehilangan anaknya sehingga matanya menjadi buta.", icon: <Heart className="w-5 h-5" />, color: emeraldGradient },
    { id: 11, title: "Nabi Yusuf AS", content: "Memiliki wajah yang sangat tampan. Dibuang ke perigi oleh abangnya, akhirnya menjadi menteri yang sangat berkuasa di Mesir.", icon: <Crown className="w-5 h-5" />, color: emeraldGradient },
    { id: 12, title: "Nabi Ayub AS", content: "Ujian penyakit kulit yang sangat lama. Beliau tetap sabar dan tidak berhenti berzikir kepada Allah SWT.", icon: <Heart className="w-5 h-5" />, color: emeraldGradient },
    { id: 13, title: "Nabi Syuaib AS", content: "Digelar Khatibul Anbiya. Mengajar kaumnya supaya jujur dalam timbangan dan tidak menipu dalam perniagaan.", icon: <Scale className="w-5 h-5" />, color: emeraldGradient },
    { id: 14, title: "Nabi Musa AS", content: "Mukjizat tongkat membelah laut dan mengalahkan sihir Firaun. Menerima kitab Taurat di Bukit Sinai.", icon: <Waves className="w-5 h-5" />, color: emeraldGradient },
    { id: 15, title: "Nabi Harun AS", content: "Saudara Nabi Musa. Mempunyai tutur bicara yang sangat fasih dan membantu dakwah Musa menentang Firaun.", icon: <Info className="w-5 h-5" />, color: emeraldGradient },
    { id: 16, title: "Nabi Zulkifli AS", content: "Seorang Nabi yang sangat amanah dan sabar. Beliau memerintah rakyatnya dengan adil dan sentiasa menepati janji.", icon: <Gem className="w-5 h-5" />, color: emeraldGradient },
    { id: 17, title: "Nabi Daud AS", content: "Boleh melenturkan besi dengan tangan dan mempunyai suara merdu. Menerima kitab Zabur dan mengalahkan Jalut.", icon: <Music className="w-5 h-5" />, color: emeraldGradient },
    { id: 18, title: "Nabi Sulaiman AS", content: "Nabi paling kaya. Boleh memerintah jin, haiwan, dan angin. Membina Haikal Sulaiman dan mengislamkan Ratu Balqis.", icon: <Crown className="w-5 h-5" />, color: emeraldGradient },
    { id: 19, title: "Nabi Ilyas AS", content: "Menyeru kaumnya berhenti menyembah berhala Ba'al. Meminta doa agar diturunkan hujan selepas kemarau panjang.", icon: <Sun className="w-5 h-5" />, color: emeraldGradient },
    { id: 20, title: "Nabi Ilyasa AS", content: "Penerus dakwah Nabi Ilyas. Diberikan mukjizat menyembuhkan penyakit dan memimpin Bani Israil dengan hikmah.", icon: <BookOpen className="w-5 h-5" />, color: emeraldGradient },
    { id: 21, title: "Nabi Yunus AS", content: "Ditelan ikan nun (paus). Di dalam perut ikan, beliau sentiasa berzikir memohon ampun sehingga dikeluarkan Allah.", icon: <Waves className="w-5 h-5" />, color: emeraldGradient },
    { id: 22, title: "Nabi Zakaria AS", content: "Bapa Nabi Yahya. Menjaga Maryam di Mihrab. Walaupun sudah sangat tua, Allah mengurniakan anak atas doanya.", icon: <Info className="w-5 h-5" />, color: emeraldGradient },
    { id: 23, title: "Nabi Yahya AS", content: "Anak Zakaria yang sangat lembut hatinya dan berani. Menegakkan hukum Allah tanpa rasa takut kepada raja yang zalim.", icon: <Feather className="w-5 h-5" />, color: emeraldGradient },
    { id: 24, title: "Nabi Isa AS", content: "Lahir tanpa bapa. Boleh bercakap masa bayi dan menghidupkan orang mati dengan izin Allah. Akan turun semula di akhir zaman.", icon: <Cloud className="w-5 h-5" />, color: emeraldGradient },
    { id: 25, title: "Nabi Muhammad SAW", content: "Nabi dan Rasul terakhir. Mukjizat terbesar ialah Al-Quran. Membawa ajaran Islam untuk seluruh alam semesta.", icon: <Star className="w-5 h-5" />, color: emeraldGradient }
  ]
};

export default function SirahPage() {
  const [view, setView] = useState<'menu' | 'nabawiyah' | 'paraNabi'>('menu');
  const [searchTerm, setSearchTerm] = useState("");
  type SirahStory = {
    id: number;
    title: string;
    content?: string;
    color: string;
    icon: React.ReactNode;
    isNovel?: boolean;
    scenes?: { img: string; text: string }[];
  };

  const [selectedStory, setSelectedStory] = useState<SirahStory | null>(null);
  const [currentScene, setCurrentScene] = useState(0);

  const filterData = (data: SirahStory[]) =>
    data.filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-[13px] dark:text-white mb-4 line-clamp-1">{item.title}</h3>
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

        {/* MODAL STORY - KEMASKINI WARNA HITAM PANJANG */}
        {selectedStory && (
          <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-500/10">
              
              <div className="p-6 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <h2 className="font-black text-xl dark:text-white">{selectedStory.title}</h2>
                <button onClick={() => setSelectedStory(null)} className="p-2 bg-secondary dark:bg-slate-800 rounded-full">
                  <X className="w-5 h-5 text-foreground dark:text-white" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {selectedStory.isNovel ? (
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
                        onClick={() => currentScene < selectedStory.scenes.length - 1 ? setCurrentScene(c => c + 1) : setSelectedStory(null)}
                        className="flex-[2] py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all"
                      >
                        {currentScene === selectedStory.scenes.length - 1 ? "TAMAT" : "SETERUSNYA"}
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
