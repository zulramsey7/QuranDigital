import React, { useState, useEffect } from "react";
import { ChevronLeft, ScrollText, Globe, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const TahlilLengkap = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const tahlilSections = [
    {
      title: "1. Pengantar Al-Fatihah (Hadoroh)",
      arabic: "إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَآلِهِ وَصَحْبِهِ شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةُ",
      latin: "Ilaa hadratin-nabiyyil-musthofaa shallallahu 'alaihi wa sallama wa aalihi wa sahbihi syai'un lillaahi lahumul-faatihah.",
      translation: "Ke hadrat Nabi yang terpilih Muhammad s.a.w. dan ahli keluarganya serta para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka Al-Fatihah.",
      note: "Niatkan pahala"
    },
    {
      title: "2. Al-Fatihah",
      arabic: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rahmaanir-rahiim. Al-hamdu lillaahi rabbil-'aalamiin. Ar-rahmaanir-rahiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-shiraatal-mustaqiim. Shiraatal-ladziina an'amta 'alayhim ghairil-maghdzuubi 'alayhim wa lad-daalliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat.",
      note: ""
    },
    {
      title: "3. Surah Al-Ikhlas",
      arabic: "قُلْ هُوَ اللهُ أَحَدٌ ۝١ اللهُ الصَّمَدُ ۝٢ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝٣ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۝٤",
      latin: "Qul huwallaahu ahad. Allaahus-shomad. Lam yalid wa lam yuulad. Wa lam yakul-lahuu kufuwan ahad.",
      translation: "Katakanlah (wahai Muhammad): Dialah Allah Yang Maha Esa. Allah yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat. Ia tiada beranak dan Ia pula tidak diperanakkan. Dan tidak ada sesiapapun yang serupa dengan-Nya.",
      note: "Dibaca 3 Kali"
    },
    {
      title: "4. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "5. Surah Al-Falaq",
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝١ مِنْ شَرِّ مَا خَلَقَ ۝٢ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝٣ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝٤ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝٥",
      latin: "Qul a'uudzu birabbil-falaq. Min syarri maa khalaq. Wa min syarri ghaasiqin idzaa waqab. Wa min syarrin-naffaatsaati fil-'uqad. Wa min syarri haasidin idzaa hasad.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh. Dari kejahatan makhluk-makhluk yang Ia ciptakan. Dan dari kejahatan malam apabila ia telah gelap gulita. Dan dari kejahatan makhluk-makhluk yang menghembus pada simpulan-simpulan tali. Dan dari kejahatan orang yang dengki apabila ia melakukan dengkinya.",
      note: ""
    },
    {
      title: "6. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "7. Surah An-Nas",
      arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝١ مَلِكِ النَّاسِ ۝٢ إِلَهِ النَّاسِ ۝٣ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝٤ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝٥ مِنَ الْجِنَّةِ وَالنَّاسِ ۝٦",
      latin: "Qul a'uudzu birabbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khannaas. Alladzii yuwaswisu fii suduurin-naas. Minal-jinnati wan-naas.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Tuhan manusia. Dari kejahatan pembisik (syaitan) yang timbul tenggelam. Yang membisikkan (kejahatan) ke dalam dada manusia. (Iaitu pembisik) dari golongan jin dan manusia.",
      note: ""
    },
    {
      title: "8. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "9. Al-Fatihah",
      arabic: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rahmaanir-rahiim. Al-hamdu lillaahi rabbil-'aalamiin. Ar-rahmaanir-rahiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-shiraatal-mustaqiim. Shiraatal-ladziina an'amta 'alayhim ghairil-maghdzuubi 'alayhim wa lad-daalliin.",
      translation: "Membuka bacaan dengan Al-Fatihah untuk menyambung ke ayat Al-Baqarah.",
      note: ""
    },
    {
      title: "10. Al-Baqarah 1-5",
      arabic: "الم ۝١ ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ ۝٢ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ ۝٣ وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝٤ أُولَئِكَ عَلَى هُدًى مِنْ رَبِّهِمْ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ ۝٥",
      latin: "Alif-laam-miim. Dzaalikal-kitaabu laa rayba fiih, hudan lil-muttaqiin. Alladziina yu'minuuna bil-ghaybi wa yuqiimuunas-shalaata wa mimmaa razaqnaahum yunfiquun. Walladziina yu'minuuna bimaa unzila ilaika wa maa unzila min qablika wa bil-aakhirati hum yuuqinuun. Ulaa-ika 'alaa hudam-mir-rabbihim wa ulaa-ika humul-muflihuun.",
      translation: "Alif Laam Miim. Kitab Al-Quran ini tidak ada sebarang syak padanya; ia menjadi petunjuk bagi orang-orang yang bertaqwa.",
      note: ""
    },
    {
      title: "11. Al-Baqarah 163",
      arabic: "وَإِلَهُكُمْ إِلَهٌ وَاحِدٌ لَا إِلَهَ إِلَّا هُوَ الرَّحْمَنُ الرَّحِيمُ ۝١٦٣",
      latin: "Wa ilaahukum ilaahun waahidun laa ilaaha illaa huwar-rahmaanur-rahiim.",
      translation: "Dan Tuhan kamu ialah Tuhan yang satu, tiada Tuhan melainkan Dia, Yang Maha Pemurah, lagi Maha Mengasihani.",
      note: ""
    },
    {
      title: "12. Ayat Kursi (Al-Baqarah 255)",
      arabic: "اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ ۝٢٥٥",
      latin: "Allaahu laa ilaaha illaa huwal-hayyul-qayyuum, laa ta'khudzuhuu sinatuw-walaa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahuu illaa bi-idznih, ya'lamu maa bayna aidiihim wa maa khalfahum, wa laa yuhiituuna bisyai-im-min 'ilmihii illaa bimaa syaa', wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal-'aliyyul-'adhiim.",
      translation: "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Kekal selama-lamanya mentadbirkan sekalian makhluk-Nya.",
      note: ""
    },
    {
      title: "13. Astaghfirullahal 'Adzim (3x)",
      arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيْمَ",
      latin: "Astaghfirullaahal 'adzhiim (3x)",
      translation: "Aku memohon ampun kepada Allah Yang Maha Agung (3 kali).",
      note: ""
    },
    {
      title: "14. Hadits Keutamaan Tahlil",
      arabic: "أَفْضَلُ الذِّكْرِ فَاعْلَمْ أَنَّهُ: لَا إِلَهَ إِلَّا اللهُ، حَيٌّ مَوْجُودٌ. لَا إِلَهَ إِلَّا اللهُ، حَيٌّ مَعْبُودٌ. لَا إِلَهَ إِلَّا اللهُ، حَيٌّ بَاقٍ.",
      latin: "Afdhaludz-dzikri fa'lam annahu: Laa ilaaha illallaah, hayyum maujuud. Laa ilaaha illallaah, hayyum ma'buud. Laa ilaaha illallaah, hayyum baaq.",
      translation: "Sebaik-baik zikir, ketahuilah bahawa: Tiada Tuhan selain Allah, Dzat yang Maha Hidup lagi Wujud. Tiada Tuhan selain Allah, Dzat yang Maha Hidup lagi Disembah. Tiada Tuhan selain Allah, Dzat yang Maha Hidup lagi Kekal.",
      note: ""
    },
    {
      title: "15. Tahlil",
      arabic: "لَا إِلَهَ إِلَّا اللهُ",
      latin: "Laa ilaaha illallaah (33x / 100x)",
      translation: "Tiada Tuhan selain Allah.",
      note: ""
    },
    {
      title: "16. Dua Kalimat Syahadat",
      arabic: "لَا إِلَهَ إِلَّا اللهُ، لَا إِلَهَ إِلَّا اللهُ، لَا إِلَهَ إِلَّا اللهُ، لَا إِلَهَ إِلَّا اللهُ، لَا إِلَهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ",
      latin: "Laa ilaaha illallaah, Laa ilaaha illallaah, Laa ilaaha illallaah, Laa ilaaha illallaah, Laa ilaaha illallaah Muhammadur Rasuulullaah",
      translation: "Tiada Tuhan selain Allah. Nabi Muhammad utusan Allah.",
      note: ""
    },
    {
      title: "17. Selawat Nabi",
      arabic: "اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، اَللَّهُمَّ صَلِّ عَلَى إِبْرَاهِيمَ، اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، يَا رَبِّ صَلِّ عَلَيْهِ وَسَلِّمْ، اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، يَا رَبِّ صَلِّ عَلَيْهِ وَسَلِّمْ",
      latin: "Allahumma sholli 'ala sayyidina Muhammad, Allahumma sholli 'ala Ibrahim, Allahumma sholli 'ala sayyidina Muhammad, Ya Rabbi sholli 'alaihi wasallim, Allahumma sholli 'ala sayyidina Muhammad, Ya Rabbi sholli 'alaihi wasallim",
      translation: "Ya Allah, limpahkanlah rahmat kepada penghulu kami Nabi Muhammad. Ya Allah, limpahkanlah rahmat kepada Nabi Ibrahim. Ya Allah, limpahkanlah rahmat kepada penghulu kami Nabi Muhammad. Wahai Tuhanku, limpahkanlah rahmat dan kesejahteraan ke atas baginda.",
      note: ""
    },
    {
      title: "18. Tasbih & Ya Allah",
      arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيْمِ (٣×)، يَا اللهُ (٣×)",
      latin: "Subhaanallaahi wa bihamdihi subhaanallaahil 'adzhiim (3x), Ya Allah (3x)",
      translation: "Mahasuci Allah dengan segala puji bagi-Nya, Mahasuci Allah Yang Maha Agung (3 kali). Wahai Allah (3 kali).",
      note: ""
    },
    {
      title: "19. Selawat Nabi",
      arabic: "اَللَّهُمَّ صَلِّ عَلَى حَبِيبِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
      latin: "Allahumma shalli 'ala habibika sayyidina Muhammadin wa 'ala alihi wa sahbihi wa sallim",
      translation: "Ya Allah, limpahkanlah rahmat dan keselamatan kepada kekasih-Mu, penghulu kami Nabi Muhammad, beserta keluarga dan para sahabatnya.",
      note: ""
    },
    {
      title: "20. Selawat Nabi",
      arabic: "اَللَّهُمَّ صَلِّ عَلَى حَبِيبِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَبَارِكْ وَسَلِّمْ",
      latin: "Allahumma shalli 'ala habibika sayyidina Muhammadin wa 'ala alihi wa sahbihi wa barik wa sallim",
      translation: "Ya Allah, limpahkanlah rahmat kepada kekasih-Mu, penghulu kami Nabi Muhammad, beserta keluarga dan sahabatnya. Limpahkanlah pula keberkatan dan keselamatan kepada mereka.",
      note: ""
    },
    {
      title: "21. Selawat Nabi",
      arabic: "اَللَّهُمَّ صَلِّ عَلَى حَبِيبِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَبَارِكْ وَسَلِّمْ أَجْمَعِينَ",
      latin: "Allahumma shalli 'ala habibika sayyidina Muhammadin wa 'ala alihi wa sahbihi wa barik wa sallim ajma'iin",
      translation: "Ya Allah, limpahkanlah rahmat kepada kekasih-Mu, penghulu kami Nabi Muhammad, beserta keluarga dan sahabatnya. Limpahkanlah pula keberkatan dan keselamatan kepada mereka semua.",
      note: ""
    },
    {
      title: "22. Penutup Al-Fatihah",
      arabic: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rahmaanir-rahiim. Al-hamdu lillaahi rabbil-'aalamiin. Ar-rahmaanir-rahiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-shiraatal-mustaqiim. Shiraatal-ladziina an'amta 'alayhim ghairil-maghdzuubi 'alayhim wa lad-daalliin.",
      translation: "Membaca Al-Fatihah sebagai penutup sebelum memulakan doa tahlil.",
      note: ""
    }
  ];

  return (
    <MainLayout>
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-black/5 dark:bg-white/5">
        <div 
          className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
          font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1, "cv04" 1, "ss01" 1 !important;
        }
        @media (max-width: 640px) {
          .quran-render {
            font-size: 2.2rem !important;
            line-height: 2.1 !important;
          }
        }
      `}} />

      <div className="space-y-6 animate-fade-in pb-20 px-2">
        <div className="flex items-center gap-4 text-left pt-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Tahlil Ringkas</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Resam Biasa • Paparan Jelas</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-serif font-bold tracking-wide">تَهْلِيل لڠكڤ</h2>
            <p className="text-emerald-100 text-sm font-medium italic opacity-80">Panduan Bacaan Tahlil Ringkas</p>
          </div>
        </div>

        <div className="space-y-4">
          {tahlilSections.map((section, index) => (
            <div key={index} className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight border border-emerald-100 dark:border-emerald-500/20">
                  {section.title}
                </span>
                {section.note && (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-500/20 italic">
                    {section.note}
                  </span>
                )}
              </div>

              <p className="quran-render text-slate-800 dark:text-slate-100">
                {section.arabic}
              </p>

              <div className="space-y-4 pt-4 border-t border-dashed border-black/5 dark:border-white/5 text-left">
                <div className="flex gap-3">
                  <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-1 opacity-70" />
                  <p className="text-[14px] font-bold text-emerald-900 dark:text-emerald-400 italic leading-relaxed">
                    {section.latin}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-70" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {section.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center py-10 opacity-20 text-[10px] font-bold tracking-[0.5em] uppercase dark:text-white">
          Selesai Tahlil
        </div>
      </div>
    </MainLayout>
  );
};

export default TahlilLengkap;