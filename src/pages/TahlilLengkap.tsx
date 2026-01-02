import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ScrollText, Globe, Languages, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const TahlilLengkap = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = (index, url) => {
    if (!url) return;

    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      try {
        audioRef.current = new Audio(url);
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
          setPlayingIndex(null);
          alert("Maaf, audio untuk bahagian ini belum tersedia atau gagal dimuatkan.");
        });
        
        setPlayingIndex(index);
        audioRef.current.onended = () => setPlayingIndex(null);
      } catch (err) {
        setPlayingIndex(null);
      }
    }
  };

  // Nota: Saya setkan 'audio: ""' bagi yang tiada fail untuk elakkan error tersebut
  const tahlilSections = [
    {
      title: "1. Pengantar Al-Fatihah (Hadoroh)",
      arabic: "إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَآلِهِ وَصَحْبِهِ شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةُ",
      latin: "Ilaa hadrotin-nabiyyil-musthofaa sollallahu 'alaihi wa sallama wa aalihi wa sohbihi syai'un lillaahi lahumul-faatihah.",
      translation: "Ke hadrat Nabi yang terpilih Muhammad s.a.w. dan ahli keluarganya serta para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka Al-Fatihah.",
      audio: "", // Kosongkan jika tiada fail tempatan
      note: "Niatkan pahala"
    },
    {
      title: "2. Al-Fatihah",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat.",
      audio: "", 
      note: ""
    },
    {
      title: "3. Surah Al-Ikhlas",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝١ اللَّهُ الصَّمَدُ ۝٢ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝٣ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۝٤",
      latin: "Qul huwallaahu ahad. Allaahus-somad. Lam yalid wa lam yuulad. Wa lam yakul-lahuu kufuwan ahad.",
      translation: "Katakanlah (wahai Muhammad): Dialah Allah Yang Maha Esa. Allah yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat. Ia tiada beranak dan Ia pula tidak diperanakkan. Dan tidak ada sesiapapun yang serupa dengan-Nya.",
      audio: "", 
      note: "Dibaca 3 Kali"
    },
    {
      title: "4. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      audio: "",
      note: ""
    },
    {
      title: "5. Surah Al-Falaq",
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝١ مِنْ شَرِّ مَا خَلَقَ ۝٢ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝٣ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝٤ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝٥",
      latin: "Qul a'uudzu birobbil-falaq. Min syarri maa kholaq. Wa min syarri ghoosiqin idzaa waqob. Wa min syarrin-naffaatsaati fil-'uqod. Wa min syarri haasidin idzaa hasad.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh. Dari kejahatan makhluk-makhluk yang Ia ciptakan. Dan dari kejahatan malam apabila ia telah gelap gulita. Dan dari kejahatan makhluk-makhluk yang menghembus pada simpulan-simpulan tali. Dan dari kejahatan orang yang dengki apabila ia melakukan dengkinya.",
      audio: "",
      note: ""
    },
    {
      title: "6. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      audio: "",
      note: ""
    },
    {
      title: "7. Surah An-Nas",
      arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝١ مَلِكِ النَّاسِ ۝٢ إِلَهِ النَّاسِ ۝٣ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝٤ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝٥ مِنَ الْجِنَّةِ وَالنَّاسِ ۝٦",
      latin: "Qul a'uudzu birobbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khonnaas. Alladzii yuwaswisu fii suduurin-naas. Minal-jinnati wan-naas.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Tuhan manusia. Dari kejahatan pembisik (syaitan) yang timbul tenggelam. Yang membisikkan (kejahatan) ke dalam dada manusia. (Iaitu pembisik) dari golongan jin dan manusia.",
      audio: "",
      note: ""
    },
    {
      title: "8. Tahlil dan Takbir",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      audio: "",
      note: ""
    },
    {
      title: "9. Al-Fatihah",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka.",
      audio: "",
      note: ""
    },
    {
      title: "10. Al-Baqarah 1-5",
      arabic: "الم ۝١ ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ ۝٢ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ ۝٣ وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝٤ أُولَئِكَ عَلَى هُدًى مِنْ رَبِّهِمْ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ ۝٥",
      latin: "Alif-laam-miim. Dzaalikal-kitaabu laa royba fiih, hudan lil-muttaqiin. Alladziina yu'minuuna bil-ghoibi wa yuqiimuunas-solaata wa mimmaa rozaqnaahum yunfiquun. Walladziina yu'minuuna bimaa unzila ilaika wa maa unzila min qoblika wa bil-aakhiroti hum yuuqinuun. Ulaa'ika 'alaa hudan mir-robbihim wa ulaa'ika humul-muflihuun.",
      translation: "Alif, Laam, Miim. Kitab Al-Quran ini, tidak ada sebarang keraguan padanya; ia menjadi petunjuk bagi orang-orang yang bertaqwa. Iaitu orang-orang yang beriman kepada perkara-perkara yang ghaib, dan mendirikan sembahyang serta membelanjakan sebahagian dari rezeki yang Kami berikan kepada mereka. Dan juga orang-orang yang beriman kepada Kitab yang diturunkan kepadamu, dan Kitab-kitab yang diturunkan sebelummu, serta mereka yakin akan adanya hari akhirat.",
      audio: "",
      note: ""
    },
    {
      title: "11. Al-Baqarah 163",
      arabic: "وَإِلَهُكُمْ إِلَهٌ وَاحِدٌ لَا إِلَهَ إِلَّا هُوَ الرَّحْمَنُ الرَّحِيمُ ۝١٦٣",
      latin: "Wa ilaahukum ilaahun waahidun laa ilaaha illaa huwar-rohmaanur-rohiim.",
      translation: "Dan Tuhan kamu ialah Tuhan yang satu, tiada Tuhan melainkan Dia, Yang Maha Pemurah, lagi Maha Mengasihani.",
      audio: "",
      note: ""
    },
    {
      title: "12. Ayat Kursi (Al-Baqarah 255)",
      arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ ۝٢٥٥",
      latin: "Allaahu laa ilaaha illaa huwal-hayyul-qoyyuum, laa ta'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahuu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa kholfahum, wa laa yuhiituuna bisyai'im-min 'ilmihii illaa bimaa syaa', wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya'uuduhuu hifzhuhumaa, wa huwal-'aliyyul-'adhiim.",
      translation: "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Kekal selama-lamanya mentadbirkan sekalian makhluk-Nya. Ia tidak mengantuk dan tidak tidur. Ia memiliki segala yang ada di langit dan di bumi. Tiada sesiapa yang dapat memberi syafaat di sisi-Nya melainkan dengan izin-Nya. Ia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, sedang mereka tidak mengetahui sesuatu pun dari ilmu-Nya melainkan apa yang Allah kehendaki.",
      audio: "",
      note: ""
    },
    {
      title: "13. Al-Baqarah 284",
      arabic: "لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَإِنْ تُبْدُوا مَا فِي أَنْفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُمْ بِهِ اللَّهُ فَيَغْفِرُ لِمَنْ يَشَاءُ وَيُعَذِّبُ لِمَنْ يَشَاءُ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ۝٢٨٤",
      latin: "Lillaahi maa fis-samaawaati wa maa fil-ardh. Wa in tubduu maa fii anfusikum au tukhfuuhu yuhaasibkum bihillaah. Fayaghfiru limay-yasyaa'u wa yu'adz-dzibu may-yasyaa', wallaahu 'alaa kulli syai'in qodiir.",
      translation: "Segala yang ada di langit dan di bumi adalah kepunyaan Allah. Dan jika kamu melahirkan apa yang ada di dalam hati kamu atau kamu menyembunyikannya, nescaya Allah akan menghitung dan menyatakannya kepada kamu. Kemudian Ia mengampunkan bagi sesiapa yang dikehendaki-Nya dan menyeksa sesiapa yang dikehendaki-Nya.",
      audio: "",
      note: "Pengakhiran Surah Al-Baqarah"
    },
    {
      title: "14. Al-Baqarah 285",
      arabic: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝٢٨٥",
      latin: "Aamanar-rosuulu bimaa unzila ilaihi mir-robbihii wal-mu'minuun, kullun aamana billaahi wa malaa'ikatihii wa kutubihii wa rusulih. Laa nufarriqu baina ahadim-mir-rusulih. Wa qooluu sami'naa wa ato'naa ghufroonaka robbanaa wa ilaikal-mashiir.",
      translation: "Rasulullah telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, dan juga orang-orang yang beriman; semuanya beriman kepada Allah, dan Malaikat-malaikat-Nya, dan Kitab-kitab-Nya, dan Rasul-rasul-Nya. (Mereka berkata): Kami tidak membezakan antara sesiapa pun dari Rasul-rasul-Nya.",
      audio: "",
      note: ""
    },
    {
      title: "15. Al-Baqarah 286",
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ۝٢٨٦",
      latin: "Laa yukallifullaahu nafsan illaa wus'ahaa, lahaa maa kasabat wa 'alaihaa maktasabat. Robbanaa laa tu'aakhidznaa in-nasiinaa au akhto'naa. Robbanaa wa laa tahmil 'alainaa isron kamaa hamaltahuu 'alalladziina min qoblinaa. Robbanaa wa laa tuhammilnaa maa laa thooqota lanaa bih. Wa'fu 'annaa waghfir lanaa warhamnaa anta mawlaanaa fansurnaa 'alal-qowmil-kaafiriin.",
      translation: "Allah tidak memberati seseorang melainkan apa yang terdaya olehnya. Ia mendapat pahala kebaikan yang diusahakannya, dan ia juga menanggung dosa kejahatan yang diusahakannya. Wahai Tuhan kami! Janganlah Engkau menghukum kami jika kami lupa atau kami tersalah.",
      audio: "",
      note: ""
    },
    {
      title: "16. Surah Hud Ayat 73",
      arabic: "ارْحَمْنَا يَا أَرْحَمَ الرَّاحِمِينَ ۝ رَحْمَتُ اللَّهِ وَبَرَكَاتُهُ عَلَيْكُمْ أَهْلَ الْبَيْتِ إِنَّهُ حَمِيدٌ مَجِيدٌ ۝",
      latin: "Irhamnaa yaa arhamar-roohimiin. Rohmatullaahi wa barokaatuhuu 'alaikum ahlal-bait. Innahuu hamiidum-majiid.",
      translation: "Kasihanilah kami wahai Tuhan Yang Maha Mengasihani. Rahmat Allah dan keberkatan-Nya tetap melimpah ke atas kamu, wahai ahli bait. Sesungguhnya Allah Maha Terpuji, lagi Maha Mulia.",
      audio: "",
      note: ""
    },
    {
      title: "17. Surah Al-Ahzab Ayat 33",
      arabic: "إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنْكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا ۝٣٣",
      latin: "Innamaa yuriidullaahu liyudz-hiba 'ankumur-rijsa ahlal-baiti wa yutoh-hirokum tathiiro.",
      translation: "Sesungguhnya Allah hanyalah bermaksud hendak menghilangkan dosa daripada kamu, wahai ahli bait, dan hendak membersihkan kamu sebersih-bersihnya.",
      audio: "",
      note: ""
    },
    {
      title: "18. Surah Al-Ahzab Ayat 56",
      arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا ۝٥٦",
      latin: "Innallaaha wa malaa'ikatahuu yusolluuna 'alan-nabiyyi. Yaa ayyuhalladziina aamanuu solluu 'alaihi wa sallimuu tasliimaa.",
      translation: "Sesungguhnya Allah dan malaikat-malaikat-Nya berselawat untuk Nabi. Wahai orang-orang yang beriman, berselawatlah kamu ke atasnya serta ucapkanlah salam penghormatan.",
      audio: "",
      note: ""
    },
    {
      title: "19. Selawat Nabi",
      arabic: "اللَّهُمَّ صَلِّ أَفْضَلَ صَلَاةٍ عَلَى أَسْعَدِ مَخْلُوقَاتِكَ حَبِيبِ اللَّهِ سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ عَدَدَ مَعْلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ الذَّاكِرُونَ وَغَفَلَ عَنْ ذِكْرِكَ الْغَافِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika habiibillaahi sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokadz-dzaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, Kekasih Allah, penghulu kami Muhammad, dan ke atas ahli keluarganya serta para sahabatnya.",
      audio: "",
      note: ""
    },
    {
      title: "20. Selawat Nabi (Syamsid-Dhuha)",
      arabic: "اللَّهُمَّ صَلِّ أَفْضَلَ صَلَاةٍ عَلَى أَسْعَدِ مَخْلُوقَاتِكَ شَمْسِ الضُّحَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ عَدَدَ مَعْلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ الذَّاكِرُونَ وَغَفَلَ عَنْ ذِكْرِكَ الْغَافِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika syamsid-dhuhaa sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokadz-dzaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, cahaya matahari di waktu dhuha, penghulu kami Muhammad, dan ke atas ahli keluarga serta sahabatnya.",
      audio: "",
      note: ""
    },
    {
      title: "21. Selawat Nabi (Badrid-Duja)",
      arabic: "اللَّهُمَّ صَلِّ أَفْضَلَ صَلَاةٍ عَلَى أَسْعَدِ مَخْلُوقَاتِكَ بَدْرِ الدُّجَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ عَدَدَ مَعْلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ الذَّاكِرُونَ وَغَفَلَ عَنْ ذِكْرِكَ الْغَافِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika badrid-dujaa sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokadz-dzaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, cahaya purnama di waktu gelap, penghulu kami Muhammad, dan ke atas ahli keluarga serta sahabatnya.",
      audio: "",
      note: ""
    },
    {
      title: "22. Salam & Keredhaan Untuk Para Sahabat",
      arabic: "وَسَلِّمْ وَرَضِيَ اللَّهُ تَعَالَى عَنْ أَصْحَابِ سَيِّدِنَا رَسُولِ اللَّهِ أَجْمَعِينَ",
      latin: "Wa sallim wa rodhiyallaahu ta'aalaa 'an as-haabi sayyidinaa rosuulillaahi ajma'iin.",
      translation: "Semoga Allah meredhai para sahabat Rasulullah kesemuanya.",
      audio: "",
      note: ""
    },
    {
      title: "23. Zikir Tawakkal",
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ ۝ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيرُ ۝",
      latin: "Hasbunallaahu wa ni'mal-wakiil. Ni'mal-mawlaa wa ni'man-nashiir.",
      translation: "Cukuplah Allah bagi kami dan Dialah sebaik-baik pengurus. Dialah sebaik-baik Pelindung dan sebaik-baik Penolong.",
      audio: "",
      note: ""
    },
    {
      title: "24. Hauqalah",
      arabic: "وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
      latin: "Wa laa hawla wa laa quwwata illaa billaahil-'aliyyil-'adhiim.",
      translation: "Dan tiada daya serta tiada kekuatan melainkan dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.",
      audio: "",
      note: ""
    },
    {
      title: "25. Istighfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",
      latin: "Astaghfirullaahal-'adhiim.",
      translation: "Aku memohon ampun kepada Allah Yang Maha Agung.",
      audio: "",
      note: "Dibaca 3 Kali"
    },
    {
      title: "26. Sebaik-baik Zikir",
      arabic: "أَفْضَلُ الذِّكْرِ فَاعْلَمْ أَنَّهُ لَا إِلَهَ إِلَّا اللَّهُ",
      latin: "Afdholuz-dzikri fa'lam annahuu laa ilaaha illallaah.",
      translation: "Sebaik-baik zikir, maka ketahuilah bahawa sesungguhnya: Tiada Tuhan melainkan Allah.",
      audio: "",
      note: ""
    },
    {
      title: "27. Tahlil (La Ilaha Illallah)",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
      latin: "Laa ilaaha illallaah.",
      translation: "Tiada Tuhan melainkan Allah.",
      audio: "",
      note: "Ulang 33 / 100 Kali"
    },
    {
      title: "28. Syahadah & Penutup Tahlil",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ عَلَيْهَا نَحْيَا وَعَلَيْهَا نَمُوتُ وَعَلَيْهَا نُبْعَثُ إِنْ شَاءَ اللَّهُ تَعَالَى مِنَ الْآمِنِينَ ۝ الْفَاتِحَةُ",
      latin: "Laa ilaaha illallaahu muhammadur-rosuulullaah sollallahu 'alaihi wa sallam, 'alaihaa nahyaa wa 'alaihaa namuutu wa 'alaihaa nub'atsu in syaa'allaahu ta'aalaa minal-aaminiin.",
      translation: "Tiada Tuhan melainkan Allah, Muhammad Pesuruh Allah (S.A.W). Di atas kalimah itu kami hidup, di atasnya kami mati, dan di atasnya kami akan dibangkitkan.",
      audio: "",
      note: "Di akhiri dengan al-Fatihah"
    },
    {
      title: "29. Al-Fatihah (Penutup)",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝٢ الرَّحْمَنِ الرَّحِيمِ ۝٣ مَالِكِ يَوْمِ الدِّينِ ۝٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝٥ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝٦ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan.",
      audio: "",
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
        }
        @media (max-width: 640px) {
          .quran-render { font-size: 2.2rem !important; line-height: 2.1 !important; }
        }
      `}} />

      <div className="space-y-6 pb-20 px-2">
        <div className="flex items-center gap-4 text-left pt-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tahlil Lengkap</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Lengkap 29 Bahagian</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white text-center">
            <h2 className="text-4xl font-serif font-bold tracking-wide">تَهْلِيل لڠكڤ</h2>
            <p className="text-emerald-100 text-sm italic opacity-80">Panduan Bacaan Tahlil Lengkap</p>
        </div>

        <div className="space-y-4">
          {tahlilSections.map((section, index) => (
            <div key={index} className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-black/5 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {section.title}
                  </span>
                  {section.audio && (
                    <button 
                      onClick={() => toggleAudio(index, section.audio)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        playingIndex === index ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {playingIndex === index ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                    </button>
                  )}
                </div>
                {section.note && (
                  <span className="text-[10px] font-bold text-amber-600 italic">{section.note}</span>
                )}
              </div>

              <p className="quran-render text-slate-800 dark:text-slate-100">{section.arabic}</p>

              <div className="space-y-4 pt-4 border-t border-dashed border-black/5 dark:border-white/5">
                <div className="flex gap-3">
                  <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-[14px] font-bold text-emerald-900 dark:text-emerald-400 italic">{section.latin}</p>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{section.translation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TahlilLengkap;
