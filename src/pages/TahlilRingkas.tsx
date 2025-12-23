import { ChevronLeft, Share2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const TahlilRingkas = () => {
  const tahlilData = [
    {
      id: 1,
      arabic: "فَاعْلَمْ أَنَّهُ لَا إِلَهَ إِلَّا اللهُ",
      translation: "Maka ketahuilah, bahawa tiada Tuhan melainkan Allah.",
      note: "Dibaca 3 kali"
    },
    {
      id: 2,
      arabic: "لَا إِلَهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ",
      translation: "Tiada Tuhan melainkan Allah, Nabi Muhammad pesuruh Allah.",
      note: ""
    },
    {
      id: 3,
      arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ",
      translation: "Maha Suci Allah dengan segala puji-Nya, Maha Suci Allah Yang Maha Agung.",
      note: "Dibaca 33 kali"
    },
    {
      id: 4,
      arabic: "أَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، أَللَّهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ",
      translation: "Ya Allah, cucurilah rahmat ke atas Nabi Muhammad. Ya Allah, cucurilah rahmat ke atasnya dan sejahterakanlah dia.",
      note: ""
    },
    {
      id: 5,
      arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ",
      translation: "Aku memohon ampun kepada Allah Yang Maha Agung.",
      note: "Dibaca 33 kali"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen pb-20 bg-[#0F0F0F] text-white animate-fade-in">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-[#0F0F0F]/90 backdrop-blur-md z-10 border-b border-white/5">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="font-bold text-lg text-white font-sans">Tahlil Ringkas</h1>
          <div className="w-10"></div> 
        </div>

        <div className="p-4">
          {/* Introduction Card */}
          <div className="bg-[#1A1A1A] border border-primary/20 p-6 rounded-[32px] mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Info</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Versi ringkas ini mengandungi zikir-zikir utama untuk bacaan harian yang padat.
            </p>
          </div>

          {/* List of Zikir */}
          <div className="space-y-6">
            {tahlilData.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#1A1A1A] border border-white/5 p-6 rounded-[28px] space-y-4 shadow-xl"
              >
                {item.note && (
                  <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase">
                    {item.note}
                  </span>
                )}
                
                <p className="text-3xl text-right font-arabic leading-[2] text-white/90">
                  {item.arabic}
                </p>
                
                <div className="space-y-2 border-t border-white/5 pt-4 font-sans">
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "{item.translation}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center p-8 border-t border-white/5 font-sans">
            <p className="text-[11px] text-gray-500 uppercase tracking-widest">
              Sempurnakan dengan Al-Fatihah & Doa
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TahlilRingkas;