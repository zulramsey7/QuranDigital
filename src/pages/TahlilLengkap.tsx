import { ChevronLeft, ScrollText, Globe, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

const TahlilLengkap = () => {
  const navigate = useNavigate();

  const tahlilSections = [
    {
      title: "1. Pengantar Al-Fatihah (Hadoroh)",
      arabic: "إِلَىٰ حَضْرَةِ ٱلنَّبِيِّ ٱلْمُصْطَفَىٰ صَلَّى ٱللَّهُ عَلَيْهِ وَسَلَّمَ وَءَالِهِۦ وَصَحْبِهِۦ شَىْءٌ لِّلَّهِ لَهُمُ ٱلْفَاتِحَةُ",
      latin: "Ilaa hadrotin-nabiyyil-musthofaa sollallahu 'alaihi wa sallama wa aalihi wa sohbihi syai'un lillaahi lahumul-faatihah.",
      translation: "Ke hadrat Nabi yang terpilih Muhammad s.a.w. dan ahli keluarganya serta para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka Al-Fatihah.",
      note: "Niatkan pahala"
    },
    {
      title: "2. Al-Fatihah",
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. ٱلْحَمْدُ لِّلَّهِ رَبِّ ٱلْعَٰلَمِينَ. ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. مَٰلِكِ يَوْمِ ٱلدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ. صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pemurah lagi Maha Mengasihani. Yang menguasai hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang telah Engkau kurniakan nikmat kepada mereka; bukan jalan orang-orang yang dimurkai ke atas mereka dan bukan pula jalan orang-orang yang sesat.",
      note: ""
    },
    {
      title: "3. Surah Al-Ikhlas",
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ. ٱللَّهُ ٱلصَّمدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
      latin: "Qul huwallaahu ahad. Allaahus-somad. Lam yalid wa lam yuulad. Wa lam yakul-lahuu kufuwan ahad.",
      translation: "Katakanlah (wahai Muhammad): Dialah Allah Yang Maha Esa. Allah yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat. Ia tidak beranak, dan Ia pula tidak diperanakkan. Dan tidak ada sesiapapun yang serupa dengan-Nya.",
      note: "Dibaca 3 Kali"
    },
    {
      title: "4. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "5. Surah Al-Falaq",
      arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ. مِن شَرِّ مَا خَلَقَ. وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ. وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      latin: "Qul a'uudzu birobbil-falaq. Min syarri maa kholaq. Wa min syarri ghoosiqin idzaa waqob. Wa min syarrin-naffaatsaati fil-'uqod. Wa min syarri haasidin idzaa hasad.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh. Dari kejahatan makhluk-Nya yang Ia ciptakan. Dari kejahatan malam apabila ia gelap gelita. Dari kejahatan makhluk yang menghembus pada simpulan-simpulan. Dan dari kejahatan orang yang dengki apabila ia melakukan dengkinya.",
      note: ""
    },
    {
      title: "6. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "7. Surah An-Nas",
      arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ. مَلِكِ ٱلنَّاسِ. إِلَٰهِ ٱلنَّاسِ. مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ. ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ. مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
      latin: "Qul a'uudzu birobbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khonnaas. Alladzii yuwaswisu fii suduurin-naas. Minal-jinnati wan-naas.",
      translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja sekalian manusia. Tuhan yang berhak disembah oleh sekalian manusia. Dari kejahatan pembisik yang timbul tenggelam. Yang membisikkan hasutan ke dalam dada manusia. Dari kalangan jin dan juga manusia.",
      note: ""
    },
    {
      title: "8. Tahlil dan Takbir",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ وَٱللَّهُ أَكْبَرُ",
      latin: "Laa ilaaha illallaahu wallaahu akbar.",
      translation: "Tiada Tuhan melainkan Allah, dan Allah Maha Besar.",
      note: ""
    },
    {
      title: "9. Al-Fatihah",
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. ٱلْحَمْدُ لِّلَّهِ رَبِّ ٱلْعَٰلَمِينَ. ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. مَٰلِكِ يَوْمِ ٱلدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ. صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      latin: "Bismillaahir-rohmaanir-rohiim. Al-hamdu lillaahi robbil-'aalamiin. Ar-rohmaanir-rohiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-sirootol-mustaqiim. Sirootol-ladziina an'amta 'alayhim ghoiril-maghdzuubi 'alayhim wa lad-doolliin.",
      translation: "Membuka bacaan dengan Al-Fatihah untuk menyambung ke ayat Al-Baqarah.",
      note: ""
    },
    {
      title: "10. Al-Baqarah 1-5",
      arabic: "الٓمٓ. ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ. ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ. وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْءَاخِرَةِ هُمْ يُوقِنُونَ. أُو۟لَٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
      latin: "Alif-laam-miim. Dzaalikal-kitaabu laa royba fiih, hudan lil-muttaqiin. Alladzii yu'minuuna bil-ghoybi wa yuqiimuunas-solaata wa mimmaa rozaqnaahum yunfiquun. Walladzii yu'minuuna bimaa unzila ilaika wa maa unzila min qablika wa bil-aakhiroti hum yuuqinuun. Ulaaika 'alaa hudam-mir-robbihim wa ulaaika humul-muflihuun.",
      translation: "Alif, Laam, Miim. Kitab Al-Quran ini tidak ada sebarang syak padanya; menjadi petunjuk bagi orang yang bertaqwa. Iaitu orang yang beriman kepada perkara ghaib, mendirikan solat, dan mendermakan sebahagian dari rezeki yang Kami berikan. Dan orang yang beriman kepada kitab yang diturunkan kepadamu dan kitab-kitab sebelumnya, serta yakin akan adanya hari akhirat. Mereka itulah yang mendapat petunjuk dari Tuhan mereka, dan merekalah orang yang beruntung.",
      note: ""
    },
    {
      title: "11. Al-Baqarah 163",
      arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَٰحِدٌ ۖ لَّآ إِلَٰهَ إِلَّا هُوَ ٱلرَّحْمَٰنُ ٱلرَّحِيمُ",
      latin: "Wa ilaahukum ilaahun waahidun laa ilaaha illaa huwar-rohmaanur-rohiim.",
      translation: "Dan Tuhan kamu ialah Tuhan yang satu, tiada Tuhan melainkan Dia, Yang Maha Pemurah lagi Maha Mengasihani.",
      note: ""
    },
    {
      title: "12. Ayat Kursi (Al-Baqarah 255)",
      arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
      latin: "Allaahu laa ilaaha illaa huwal-hayyul-qoyyuum. Laa ta'khudzuhuu sinatuw-wa laa nawm. Lahuu maa fis-samaawaati wa maa fil-ardh. Man dzalladzii yasyfa'u 'indahuu illaa bi-idznih. Ya'lamu maa baina aidiihim wa maa kholfahum. Wa laa yuhiituuna bi syai-im min 'ilmihii illaa bimaa syaa'. Wasi'a kursiyyuhus-samaawaati wal-ardh. Wa laa ya-uuduhuu hifzhuhumaa wa huwal-'aliyyul-'adhiim.",
      translation: "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Kekal selama-lamanya. Dia tidak mengantuk dan tidak tidur. Milik-Nya segala yang ada di langit dan di bumi. Tiada sesiapa yang dapat memberi syafaat di sisi-Nya melainkan dengan izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan di belakang mereka. Mereka tidak mengetahui sesuatu pun dari ilmu Allah melainkan apa yang Allah kehendaki. Luasnya Kursi Allah meliputi langit dan bumi; dan tidak menjadi berat bagi Allah memelihara kedua-duanya. Dan Dialah Yang Maha Tinggi, lagi Maha Agung.",
      note: ""
    },
    {
      title: "13. Al-Baqarah 284-286",
      arabic: "لِّلَّهِ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ وَإِن تُبْدُوا۟ مَا فِىٓ أَنفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُم بِهِ ٱللَّهُ ۖ ... ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ ... لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ",
      latin: "Lillaahi maa fis-samaawaati wa maa fil-ardh... Aamanar-rosuulu bimaa unzila ilaihi mir-robbiihi wal-mu'minuun... Laa yukallifullaahu nafsan illaa wus'ahaa...",
      translation: "Segala yang ada di langit dan di bumi adalah kepunyaan Allah. Rasulullah telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, demikian juga orang-orang yang beriman. Allah tidak memberati seseorang melainkan apa yang terdaya olehnya.",
      note: "Pengakhiran Surah Al-Baqarah"
    },
    {
      title: "14. Surah Hud Ayat 73",
      arabic: "ٱرْحَمْنَا يَا أَرْحَمَ الرَّاحِمِينَ. رَحْمَتُ ٱللَّهِ وَبَرَكَٰتُهُۥ عَلَيْكُمْ أَهْلَ ٱلْبَيْتِ ۚ إِنَّهُۥ حَمِيدٌ مَّجِيدٌ",
      latin: "Irhamnaa yaa arhamar-roohimiin. Rohmatullaahi wa barokaatuhuu 'alaikum ahlal-baiti innahuu hamiidum-majiid.",
      translation: "Kasihanilah kami wahai Tuhan Yang Maha Mengasihani. Rahmat Allah dan keberkatan-Nya dicurahkan ke atas kamu, wahai ahli rumah ini. Sesungguhnya Allah Maha Terpuji, lagi Maha Mulia.",
      note: ""
    },
    {
      title: "15. Surah Al-Ahzab Ayat 33",
      arabic: "إِنَّمَا يُرِيدُ ٱللَّهُ لِيُذْهِبَ عَنكُمُ ٱلرِّجْسَ أَهْلَ ٱلْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا",
      latin: "Innamaa yuriidullaahu liyudz-hiba 'ankumur-rijsa ahlal-baiti wa yutoh-hirokum tat-hiiroo.",
      translation: "Sesungguhnya Allah hanyalah bermaksud hendak menghilangkan dosa daripada kamu, wahai ahli keluarga (Nabi), dan hendak membersihkan kamu sebersih-bersihnya.",
      note: ""
    },
    {
      title: "16. Surah Al-Ahzab Ayat 56",
      arabic: "إِنَّ ٱللَّهَ وَمَلَٰٓئِكَتَهُۥ يُصَلُّونَ عَلَى ٱلنَّبِيِّ ۚ يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ صَلُّوا۟ عَلَيْهِ وَسَلِّمُوا۟ تَسْلِيمًا",
      latin: "Innallaaha wa malaa'ikatahuu yusolluuna 'alan-nabiyyi yaa ayyuhalladziina aamanuu solluu 'alaihi wa sallimuu tasliimaa.",
      translation: "Sesungguhnya Allah dan malaikat-malaikat-Nya berselawat untuk Nabi; wahai orang-orang yang beriman, berselawatlah kamu untuknya serta ucapkanlah salam sejahtera dengan penghormatan yang sepenuhnya.",
      note: ""
    },
    {
      title: "17. Selawat Nabi",
      arabic: "ٱللَّهُمَّ صَلِّ أَفْضَلَ صَلَاةٍ عَلَىٰ أَسْعَدِ مَخْلُوقَاتِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ ءَالِهِۦ وَصَحْبِهِۦ وَسَلِّمْ عَدَدَ مَعْلُومَاتِكَ",
      latin: "Allahumma solli afdhola solaatin 'alaa as'adi makhluuqootika sayyidinaa muhammadin wa 'alaa aalihii wa sohbihii wa sallim 'adada ma'luumaatika.",
      translation: "Ya Allah, limpahkanlah semulia-mulia selawat ke atas sebahagia-bahagia makhluk-Mu, pemimpin kami Muhammad, dan ke atas keluarga serta sahabatnya, dan berilah kesejahteraan sebanyak bilangan perkara yang Engkau ketahui.",
      note: ""
    },
    {
      title: "18. Salam untuk Nabi",
      arabic: "وَسَلِّمْ وَرَضِىَ ٱللَّهُ تَعَالَىٰ عَنْ سَادَاتِنَآ أَصْحَٰبِ رَسُولِ ٱللَّهِ أَجْمَعِينَ",
      latin: "Wa sallim wa rodhiyallaahu ta'aalaa 'an saadaatinaa ashaabi rosuulillaahi ajma'iin.",
      translation: "Semoga Allah Ta'ala meredhai para pemimpin kami, iaitu para sahabat Rasulullah semuanya.",
      note: ""
    },
    {
      title: "19. Ali Imran 173 & Al-Anfal 40",
      arabic: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ. نِعْمَ ٱلْمَوْلَىٰ وَنِعْمَ ٱلنَّصِيرُ",
      latin: "Hasbunallaahu wa ni'mal-wakiil. Ni'mal-mawlaa wa ni'man-nashiir.",
      translation: "Cukuplah Allah bagi kami dan Dialah sebaik-baik pengurus. Dialah sebaik-baik Pelindung dan sebaik-baik Penolong.",
      note: ""
    },
    {
      title: "20. Hauqalah",
      arabic: "وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّهِ ٱلْعَلِىِّ ٱلْعَظِيمِ",
      latin: "Wa laa hawla wa laa quwwata illaa billaahil-'aliyyil-'adhiim.",
      translation: "Tiada daya dan tiada kekuatan melainkan dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.",
      note: ""
    },
    {
      title: "21. Istighfar",
      arabic: "أَسْتَغْفِرُ ٱللَّهَ ٱلْعَظِيمَ",
      latin: "Astaghfirullaahal-'adhiim.",
      translation: "Aku memohon ampun kepada Allah Yang Maha Agung.",
      note: "Dibaca 3 Kali"
    },
    {
      title: "22. Hadis Keutamaan Tahlil",
      arabic: "أَفْضَلُ ٱلذِّكْرِ فَٱعْلَمْ أَنَّهُۥ لَآ إِلَٰهَ إِلَّا ٱللَّهُ",
      latin: "Afdhaluz-zikri fa'lam annahu laa ilaaha illallaah.",
      translation: "Ketahuilah bahawa sebaik-baik zikir ialah: Tiada Tuhan melainkan Allah.",
      note: ""
    },
    {
      title: "23. Tahlil (La Ilaha Illallah)",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ",
      latin: "Laa ilaaha illallaah.",
      translation: "Tiada Tuhan melainkan Allah.",
      note: "Ulang 33 / 100 Kali"
    },
    {
      title: "24. Dua Kalimat Syahadat",
      arabic: "لَآ إِلَٰهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَّسُولُ ٱللَّهِ صَلَّى ٱللَّهُ عَلَيْهِ وَسَلَّمَ",
      latin: "Laa ilaaha illallaahu muhammadur-rosuulullaahi sollallaahu 'alaihi wa sallam.",
      translation: "Tiada Tuhan melainkan Allah, Nabi Muhammad pesuruh Allah s.a.w.",
      note: "Penutup Zikir"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tahlil Lengkap</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-left">Resm Uthmani</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-xl shadow-primary/20 border border-primary/20">
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1">
              <ScrollText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-serif text-white font-bold tracking-wide">تَهْلِيل لڠكڤ</h2>
            <p className="text-white text-lg font-bold">Susunan Tradisi Utama</p>
          </div>
        </div>

        <div className="space-y-4">
          {tahlilSections.map((section, index) => (
            <div key={index} className="floating-card p-6 border-none bg-secondary/20 space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-[10px] font-bold uppercase">
                  {section.title}
                </span>
                {section.note && (
                  <span className="text-[10px] font-medium text-muted-foreground italic">{section.note}</span>
                )}
              </div>
              <p className="text-3xl leading-[4.5rem] text-right font-serif dir-rtl text-foreground whitespace-pre-wrap">
                {section.arabic}
              </p>
              <div className="space-y-4 pt-4 border-t border-primary/10 text-left">
                <div className="flex gap-3">
                  <Languages className="w-4 h-4 text-primary shrink-0 mt-1 opacity-70" />
                  <p className="text-[14px] font-bold text-primary/90 italic leading-relaxed tracking-wide">
                    {section.latin}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-70" />
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {section.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-10 opacity-30 text-[10px] font-bold tracking-[0.3em] uppercase">AL-FATIHAH</div>
      </div>
    </MainLayout>
  );
};

export default TahlilLengkap;