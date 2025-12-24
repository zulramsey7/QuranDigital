import React, { useState, useEffect } from "react"; // Tambah import ini
import { ChevronLeft, ScrollText, Globe, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const TahlilLengkap = () => {
  const navigate = useNavigate();

  // Logik Progress Bar
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
      arabic: "إِلَىٰ حَضۡرَةِ ٱلنَّبِيِّ ٱلۡمُصۡطَفَىٰ صَلَّى ٱللَّهُ عَلَيۡهِ وَسَلَّمَ وَءَالِهِۦ وَصَحۡبِهِۦ شَيۡءٌ لِّلَّهِ لَهُمُ ٱلۡفَاتِحَةُ",
      latin: "Ilaa hadrotin-nabiyyil-musthofaa sollallahu 'alaihi wa sallama wa aalihi wa sohbihi syai'un lillaahi lahumul-faatihah.",
      translation: "Ke hadrat Nabi yang terpilih Muhammad s.a.w. dan ahli keluarganya serta para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka Al-Fatihah.",
      note: "Niatkan pahala"
    },
    {
      title: "2. Al-Fatihah",
      arabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝١ ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ۝٢ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝٣ مَٰلِكِ يَوۡمِ ٱلدِّينِ ۝٤ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ۝٥ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ۝٦ صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat.",
      note: ""
    },
    {
      title: "3. Surah Al-Ikhlas",
      arabic: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ ۝١ ٱللَّهُ ٱلصَّمَدُ ۝٢ لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ ۝٣ وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ ۝٤",
      latin: "Qul huwallaahu ahad. Allaahus-somad. Lam yalid wa lam yuulad. Wa lam yakul-lahuu kufuwan ahad.",
      translation: "Katakanlah (wahai Muhammad): Dialah Allah Yang Maha Esa. Allah yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat. Ia tiada beranak dan Ia pula tidak diperanakkan. Dan tidak ada sesiapapun yang serupa dengan-Nya.",
      note: "Dibaca 3 Kali"
    },
    {
      title: "4. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكۡبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "5. Surah Al-Falaq",
      arabic: "قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ ۝١ مِن شَرِّ مَا خَلَقَ ۝٢ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝٣ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ ۝٤ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝٥",
      latin: "Qul a'uudzu birobbil-falaq. Min syarri maa kholaq. Wa min syarri ghoosiqin idzaa waqob. Wa min syarrin-naffaatsaati fil-'uqod. Wa min syarri haasidin idzaa hasad.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh. Dari kejahatan makhluk-makhluk yang Ia ciptakan. Dan dari kejahatan malam apabila ia telah gelap gulita. Dan dari kejahatan makhluk-makhluk yang menghembus pada simpulan-simpulan tali. Dan dari kejahatan orang yang dengki apabila ia melakukan dengkinya.",
      note: ""
    },
    {
      title: "6. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكۡبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "7. Surah An-Nas",
      arabic: "قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝١ مَلِكِ ٱلنَّاسِ ۝٢ إِلَٰهِ ٱلنَّاسِ ۝٣ مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ ۝٤ ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ ۝٥ مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ ۝٦",
      latin: "Qul a'uudzu birobbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khonnaas. Alladzii yuwaswisu fii suduurin-naas. Minal-jinnati wan-naas.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Tuhan manusia. Dari kejahatan pembisik (syaitan) yang timbul tenggelam. Yang membisikkan (kejahatan) ke dalam dada manusia. (Iaitu pembisik) dari golongan jin dan manusia.",
      note: ""
    },
    {
      title: "8. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكۡبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "9. Al-Fatihah",
      arabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝١ ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ۝٢ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝٣ مَٰلِكِ يَوۡمِ ٱلدِّينِ ۝٤ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ۝٥ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ۝٦ صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Membuka bacaan dengan Al-Fatihah untuk menyambung ke ayat Al-Baqarah.",
      note: ""
    },
    {
      title: "10. Al-Baqarah 1-5",
      arabic: "الٓمٓ ۝١ ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ ۝٢ ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ ۝٣ وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡءَاخِرَةِ هُمۡ يُوقِنُونَ ۝٤ أُوْلَٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ ۝٥",
      latin: "Alif-laam-miim. Dzaalikal-kitaabu laa royba fiih, hudan lil-muttaqiin. Alladziina yu'minuuna bil-ghoibi wa yuqiimuunas-solaata wa mimmaa rozaqnaahum yunfiquun. Walladziina yu'minuuna bimaa unzila ilaika wa maa unzila min qoblika wa bil-aakhiroti hum yuuqinuun. Ulaa'ika 'alaa hudan mir-robbihim wa ulaa'ika humul-muflihuun.",
      translation: "Alif, Laam, Miim. Kitab Al-Quran ini tidak ada sebarang syak padanya; ia menjadi petunjuk bagi orang-orang yang bertaqwa. Iaitu orang-orang yang beriman kepada perkara-perkara ghaib, dan mendirikan sembahyang serta membelanjakan sebahagian dari rezeki yang Kami berikan kepada mereka. Dan juga orang-orang yang beriman kepada Kitab yang diturunkan kepadamu (Muhammad), dan Kitab-kitab yang diturunkan sebelummu, serta mereka yakin akan adanya hari akhirat. Mereka itulah yang tetap menerima petunjuk dari Tuhan mereka, dan merekalah orang-orang yang berjaya.",
      note: ""
    },
    {
      title: "11. Al-Baqarah 163",
      arabic: "وَإِلَٰهُكُمۡ إِلَٰهٞ وَٰحِدٞۖ لَّآ إِلَٰهَ إِلَّا هُوَ ٱلرَّحۡمَٰنُ ٱلرَّحِيمُ",
      latin: "Wa ilaahukum ilaahun waahidun laa ilaaha illaa huwar-rohmaanur-rohiim.",
      translation: "Dan Tuhan kamu ialah Tuhan yang satu, tiada Tuhan melainkan Dia, Yang Maha Pemurah, lagi Maha Mengasihani.",
      note: ""
    },
    {
  title: "12. Ayat Kursi (Al-Baqarah 255)",
  arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ مِّنۡ عِلۡمِهِۦٓ إِلَّا بِإِذۡنِهِۦۚ وَسِعَ كُرۡسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَا يَـُٔودُهُۥ حِفۡظُهُمَاۚ وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ",
  latin: "Allaahu laa ilaaha illaa huwal-hayyul-qoyyuum, laa ta'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahuu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa kholfahum, wa laa yuhiituuna bisyai'im-min 'ilmihii illaa bimaa syaa', wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya'uuduhuu hifzhuhumaa, wa huwal-'aliyyul-'adhiim.",
  translation: "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Kekal selama-lamanya mentadbirkan sekalian makhluk-Nya. Ia tidak mengantuk dan tidak tidur. Kepunyaan-Nyalah segala yang ada di langit dan di bumi. Tiada sesiapa yang dapat memberi syafaat di sisi-Nya melainkan dengan izin-Nya. Ia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, sedang mereka tidak mengetahui sesuatu pun dari ilmu Allah melainkan apa yang Allah kehendaki. Luasnya Kursi Allah meliputi langit dan bumi; dan tiadalah menjadi keberatan kepada Allah menjaga serta memelihara keduanya. Dan Dialah Yang Maha Tinggi, lagi Maha Besar.",
  note: ""
},
    {
      title: "13. Al-Baqarah 284",
      arabic: "لِلَّهِ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ وَإِن تُبۡدُواْ مَا فِيٓ أَنفُسِكُمۡ أَوۡ تُخۡفُوهُ يُحَاسِبۡكُم بِهِ ٱللَّهُۖ فَيَغۡفِرُ لِمَن يَشَآءُ وَيُعَذِّبُ لِمَن يَشَآءُۗ وَٱللَّهُ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٌ ۝٢٨٤",
      latin: "Lillaahi maa fis-samaawaati wa maa fil-ardh. Wa in tubduu maa fii anfusikum au tukhfuuhu yuhaasibkum bihillaah. Fayaghfiru limay-yasyaa'u wa yu'adz-dzibu limay-yasyaa'. Wallaahu 'alaa kulli syai'in qodiir.",
      translation: "Segala yang ada di langit dan di bumi adalah kepunyaan Allah. Dan jika kamu melahirkan apa yang ada di dalam hati kamu atau kamu menyembunyikannya, nescaya Allah akan menghitung dan menyatakannya kepada kamu. Kemudian Ia mengampunkan bagi sesiapa yang dikehendaki-Nya dan menyeksa sesiapa yang dikehendaki-Nya. Dan Allah Maha Kuasa atas tiap-tiap sesuatu.",
      note: "Pengakhiran Surah Al-Baqarah"
    },
    {
      title: "14. Al-Baqarah 285",
      arabic: "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيۡهِ مِن رَّبِّهِۦ وَٱلۡمُؤۡمِنُونَۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيۡنَ أَحَدٖ مِّن رُّسُلِهِۦۚ وَقَالُواْ سَمِعۡنَا وَأَطَعۡنَاۖ غُفۡرَانَكَ رَبَّنَا وَإِلَيۡكَ ٱلۡمَصِيرُ ٢٨٥",
      latin: "Aamanar-rosuulu bimaa unzila ilaihi mir-robbihii wal-mu'minuun, kullun aamana billaahi wa malaa'ikatihii wa kutubihii wa rusulih, laa nufarriqu baina ahadim-mir-rusulih, wa qooluu sami'naa wa ato'naa ghufroonaka robbanaa wa ilaikal-masiir.",
      translation: "Rasulullah telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, dan juga orang-orang yang beriman; semuanya beriman kepada Allah, dan Malaikat-malaikat-Nya, dan Kitab-kitab-Nya, dan Rasul-rasul-Nya. (Mereka berkata): “Kami tidak membezakan antara seorang dengan yang lain Rasul-rasul-Nya”. Mereka berkata lagi: “Kami dengar dan kami taat, (kami pohonkan) keampunan-Mu wahai Tuhan kami, dan kepada-Mu jualah tempat kembali”.",
      note: ""
    },
    {
      title: "15. Al-Baqarah 286",
      arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفۡساً إِلَّا وُسۡعَهَاۚ لَهَا مَا كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡراً كَمَا حَمَلۡتَهُۥ عَلَى ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ ٢٨٦",
      latin: "Laa yukallifullaahu nafsan illaa wus'ahaa, lahaa maa kasabat wa 'alaihaa maktasabat, robbanaa laa tu'aakhidznaa in nasiinaa au akhto'naa, robbanaa wa laa tahmil 'alainaa isron kamaa hamaltahuu 'alalladziina min qoblinaa, robbanaa wa laa tuhammilnaa maa laa thooqota lanaa bih, wa'fu 'annaa, waghfir lanaa, warhamnaa, anta maulaanaa fansurnaa 'alal-qoumil-kaafiriin.",
      translation: "Allah tidak memberati seseorang melainkan apa yang terdaya olehnya. Ia mendapat pahala kebaikan yang diusahakannya, dan ia juga menanggung dosa kejahatan yang diusahakannya. (Mereka berdoa): 'Wahai Tuhan kami! Janganlah Engkau mengirakan kami salah jika kami lupa atau kami tersalah. Wahai Tuhan kami! Janganlah Engkau bebankan kepada kami bebanan yang berat sebagaimana yang telah Engkau bebankan kepada orang-orang yang terdahulu daripada kami. Wahai Tuhan kami! Janganlah Engkau pikulkan kepada kami apa yang kami tidak terdaya memikulnya. Dan maafkanlah kesalahan kami, serta ampunkanlah dosa kami, dan berilah rahmat kepada kami. Engkaulah Penolong kami; oleh itu, tolonglah kami untuk mencapai kemenangan terhadap kaum-kaum yang kafir'.",
      note: ""
    },
    {
      title: "16. Surah Hud Ayat 73",
      arabic: "ٱرۡحَمۡنَا يَا أَرۡحَمَ ٱلرَّٰحِمِينَ ۝ رَحۡمَتُ ٱللَّهِ وَبَرَكَٰتُهُۥ عَلَيۡكُمۡ أَهۡلَ ٱلۡبَيۡتِۚ إِنَّهُۥ حَمِيدٞ مَّجِيدٌ",
      latin: "Irhamnaa yaa arhamar-roohimiin. Rohmatullaahi wa barokaatuhuu 'alaikum ahlal-bait. Innahuu hamiidum-majiid.",
      translation: "Kasihanilah kami wahai Tuhan Yang Maha Mengasihani. Rahmat Allah dan keberkatan-Nya tetap melimpah ke atas kamu, wahai ahli rumah (keluarga Nabi). Sesungguhnya Allah Maha Terpuji, lagi Maha Mulia.",
      note: ""
    },
    {
      title: "17. Surah Al-Ahzab Ayat 33",
      arabic: "إِنَّمَا يُرِيدُ ٱللَّهُ لِيُذۡهِبَ عَنكُمُ ٱلرِّجۡسَ أَهۡلَ ٱلۡبَيۡتِ وَيُطَهِّرَكُمۡ تَطۡهِيرٗا",
      latin: "Innamaa yuriidullaahu liyudz-hiba 'ankumur-rijsa ahlal-baiti wa yutoh-hirokum tathiiro.",
      translation: "Sesungguhnya Allah hanyalah bermaksud hendak menghilangkan dosa daripada kamu, wahai ahli bait, dan hendak membersihkan kamu sebersih-bersihnya.",
      note: ""
    },
    {
      title: "18. Surah Al-Ahzab Ayat 56",
      arabic: "إِنَّ ٱللَّهَ وَمَلَٰٓئِكَتَهُۥ يُصَلُّونَ عَلَى ٱلنَّبِيِّۚ يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ صَلُّواْ عَلَيۡهِ وَسَلِّمُواْ تَسۡلِيمًا",
      latin: "Innallaaha wa malaa'ikatahuu yusolluuna 'alan-nabiyyi. Yaa ayyuhalladziina aamanuu solluu 'alaihi wa sallimuu tasliimaa.",
      translation: "Sesungguhnya Allah dan malaikat-malaikat-Nya berselawat untuk Nabi. Wahai orang-orang yang beriman, berselawatlah kamu untuk Nabi dan ucapkanlah salam penghormatan kepadanya.",
      note: ""
    },
    {
      title: "19. Selawat Nabi",
      arabic: "ٱللَّهُمَّ صَلِّ أَفۡضَلَ صَلَاةٍ عَلَىٰ أَسۡعَدِ مَخۡلُوقَاتِكَ حَبِيبِ ٱللَّهِ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ ءَالِهِۦ وَصَحۡبِهِۦ وَسَلِّمۡ عَدَدَ مَعۡلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ ٱلذَّٰكِرُونَ وَغَفَلَ عَن ذِكۡرِكَ ٱلۡغَٰفِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika habiibillaahi sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim, 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokaz-zaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, Kekasih Allah, penghulu kami Muhammad, dan ke atas ahli keluarga serta sahabat-sahabat baginda, dan berilah kesejahteraan; sebanyak bilangan perkara yang Engkau ketahui dan sebanyak tinta kalimah-kalimah-Mu, setiap kali orang yang mengingati-Mu menyebut nama-Mu, dan setiap kali orang yang lalai terlupa daripada mengingati-Mu.",
      note: ""
    },
    {
      title: "20. Selawat Nabi (Syamsid-Dhuha)",
      arabic: "ٱللَّهُمَّ صَلِّ أَفۡضَلَ صَلَاةٍ عَلَىٰ أَسۡعَدِ مَخۡلُوقَاتِكَ شَمۡسِ ٱلضُّحَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ ءَالِهِۦ وَصَحۡبِهِۦ وَسَلِّمۡ عَدَدَ مَعۡلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ ٱلذَّٰكِرُونَ وَغَفَلَ عَن ذِكۡرِكَ ٱلۡغَٰفِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika syamsid-dhuhaa sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim, 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokaz-zaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, yang menjadi penerang laksana matahari di waktu Duha, penghulu kami Muhammad, dan ke atas ahli keluarga serta sahabat-sahabat baginda, dan berilah kesejahteraan; sebanyak bilangan perkara yang Engkau ketahui dan sebanyak tinta kalimah-kalimah-Mu, setiap kali orang yang mengingati-Mu menyebut nama-Mu, dan setiap kali orang yang lalai terlupa daripada mengingati-Mu.",
      note: ""
    },
    {
      title: "21. Selawat Nabi (Badrid-Duja)",
      arabic: "ٱللَّهُمَّ صَلِّ أَفۡضَلَ صَلَاةٍ عَلَىٰ أَسۡعَدِ مَخۡلُوقَاتِكَ بَدۡرِ ٱلدُّجَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ ءَالِهِۦ وَصَحۡبِهِۦ وَسَلِّمۡ عَدَدَ مَعۡلُومَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ ٱلذَّٰكِرُونَ وَغَفَلَ عَن ذِكۡرِكَ ٱلۡغَٰفِلُونَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika badrid-dujaa sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim, 'adada ma'luumaatika wa midaada kalimaatika kullamaa dzakarokaz-zaakiruuna wa ghofala 'an dzikrikal-ghoofiluun.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, yang menjadi cahaya purnama di malam yang gelap, penghulu kami Muhammad, dan ke atas ahli keluarga serta sahabat-sahabat baginda, dan berilah kesejahteraan; sebanyak bilangan perkara yang Engkau ketahui dan sebanyak tinta kalimah-kalimah-Mu, setiap kali orang yang mengingati-Mu menyebut nama-Mu, dan setiap kali orang yang lalai terlupa daripada mengingati-Mu.",
      note: ""
    },
    {
      title: "22. Salam & Keredhaan Untuk Para Sahabat",
      arabic: "وَسَلِّمۡ وَرَضِيَ ٱللَّهُ تَعَالَىٰ عَنۡ أَصۡحَٰبِ سَيِّدِنَا رَسُولِ ٱللَّهِ أَجۡمَعِينَ",
      latin: "Wa sallim wa rodhiyallaahu ta'aalaa 'an as-haabi sayyidinaa rosuulillaahi ajma'iin.",
      translation: "Dan berilah kesejahteraan, serta semoga Allah yang Maha Suci lagi Maha Tinggi meredhai para sahabat daripada pemimpin kami, iaitu Rasulullah, kesemuanya.",
      note: ""
    },
    {
      title: "23. Zikir Tawakkal (Ali Imran 173 & Al-Anfal 40)",
      arabic: "حَسۡبُنَا ٱللَّهُ وَنِعۡمَ ٱلۡوَكِيلُ ۝ نِعۡمَ ٱلۡمَوۡلَىٰ وَنِعۡمَ ٱلنَّصِيرُ",
      latin: "Hasbunallaahu wa ni'mal-wakiil. Ni'mal-mawlaa wa ni'man-nashiir.",
      translation: "Cukuplah Allah bagi kami dan Dialah sebaik-baik pengurus. Dialah sebaik-baik pemimpin dan sebaik-baik penolong.",
      note: ""
    },
    {
      title: "24. Hauqalah",
      arabic: "وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ ٱلْعَلِيِّ ٱلْعَظِيمِ",
      latin: "Wa laa hawla wa laa quwwata illaa billaahil-'aliyyil-'adhiim.",
      translation: "Dan tiada daya serta tiada kekuatan melainkan dengan pertolongan Allah Yang Maha Tinggi, lagi Maha Agung.",
      note: ""
    },
    {
      title: "25. Istighfar",
      arabic: "أَسۡتَغۡفِرُ ٱللَّهَ ٱلۡعَظِيمَ",
      latin: "Astaghfirullaahal-'adhiim.",
      translation: "Aku memohon ampun kepada Allah Yang Maha Agung.",
      note: "Dibaca 3 Kali"
    },
    {
      title: "26. Sebaik-baik Zikir",
      arabic: "أَفْضَلُ الذِّكْرِ فَاعْلَمْ أَنَّهُ لَا إِلٰـهَ إِلَّا اللَّهُ",
      latin: "Afdholuz-dzikri fa'lam annahuu laa ilaaha illallaah.",
      translation: "Sebaik-baik zikir, maka ketahuilah bahawa sesungguhnya: Tiada Tuhan melainkan Allah.",
      note: ""
    },
    {
      title: "27. Tahlil (La Ilaha Illallah)",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ",
      latin: "Laa ilaaha illallaah.",
      translation: "Tiada Tuhan melainkan Allah.",
      note: "Ulang 33 / 100 Kali"
    },
    {
      title: "28. Syahadah & Penutup Tahlil",
      arabic: "لَا إِلٰـهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ عَلَيْهَا نَحْيَا وَعَلَيْهَا نَمُوتُ وَعَلَيْهَا نُبْعَثُ إِنْ شَاءَ اللَّهُ تَعَالَىٰ مِنَ ٱلۡاٰمِنِينَ ٱلْفَاتِحَةَ",
      latin: "Laa ilaaha illallaahu muhammadur-rosuulullaahi sollallaahu 'alaihi wa sallam. 'Alaihaa nahyaa wa 'alaihaa namuutu wa 'alaihaa nub'atsu in syaa'allaahu ta'aalaa minal-aaminiin. Al-Faatihah.",
      translation: "Tiada Tuhan melainkan Allah, Muhammad Pesuruh Allah, semoga Allah melimpahkan selawat dan salam ke atasnya. Di atas kalimah itu kami hidup, di atasnya kami mati dan di atasnya kami akan dibangkitkan, dengan izin Allah, termasuk orang-orang yang aman. Al-Fatihah.",
      note: "Di akhiri dengan al-Fatihah"
    },
    {
      title: "29. Al-Fatihah (Penutup)",
      arabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝١ ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ۝٢ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ۝٣ مَٰلِكِ يَوۡمِ ٱلدِّينِ ۝٤ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ۝٥ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ۝٦ صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ ۝٧",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat.",
      note: ""
    }
  ];

  return (
    <MainLayout>
      {/* Progress Bar (Terapung di atas) */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-black/5 dark:bg-white/5">
        <div 
          className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

        .quran-render {
          font-family: 'Amiri', serif !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 2.6 !important;
          font-size: 2.2rem !important;
          font-weight: 400 !important;
        }

        @media (max-width: 640px) {
          .quran-render {
            font-size: 1.8rem !important;
            line-height: 2.4 !important;
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
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Tahlil Lengkap</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Rasm Uthmani • Standard Madinah</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-serif font-bold tracking-wide">تَهْلِيل لڠكڤ</h2>
            <p className="text-emerald-100 text-sm font-medium italic opacity-80">Susunan Tradisi Utama</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
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