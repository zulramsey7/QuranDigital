import React, { useState } from 'react';
import { 
  ChevronLeft, Search, X, Star, Info, 
  Wind, Ship, Flame, Mountain, Droplets, 
  Pen, Leaf, Crown, Heart, Scale, 
  Music, Gem, Sun, BookOpen, Waves, Feather, Cloud, MapPin, History,
  Book, Users, Sword, Shield, Scroll, Key, Sunset, ArrowRight
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

type SirahStory = {
  id: number;
  title: string;
  year?: string;
  content?: string;
  hikmah?: string;
  icon: React.ReactNode;
  isNovel?: boolean;
  scenes?: { img: string; text: string }[];
};

const sirahData: { nabawiyah: SirahStory[], paraNabi: SirahStory[] } = {
  nabawiyah: [
    { 
      id: 101, 
      title: "Kelahiran Cahaya", 
      year: "570 M / Tahun Gajah",
      content: "Nabi Muhammad SAW dilahirkan pada 12 Rabiulawal Tahun Gajah di Makkah. Pada tahun ini, Raja Abrahah dari Yaman cuba menyerang Kaabah dengan tentera bergajah, namun Allah SWT menghantar burung Ababil yang melemparkan batu api dari neraka untuk memusnahkan mereka. Kelahiran Baginda disambut dengan pelbagai peristiwa luar biasa seperti padamnya api sembahan Majusi dan runtuhtnya istana Kisra.", 
      hikmah: "Allah SWT memelihara kesucian Kaabah dan mempersiapkan dunia untuk kedatangan Penutup Segala Nabi dengan tanda-tanda kebesaran-Nya.",
      icon: <History className="w-5 h-5" /> 
    },
    { 
      id: 102, 
      title: "Zaman Kanak-kanak", 
      year: "570-578 M",
      content: "Baginda disusukan oleh Halimah As-Sa'diyah di perkampungan Bani Sa'ad yang subur keberkatannya. Berlaku peristiwa pembelahan dada oleh malaikat untuk menyucikan hati Baginda dari ketidaksucian dunia. Ibu Baginda, Aminah, wafat di Abwa' ketika Baginda berusia 6 tahun, diikuti datuknya Abdul Muttalib ketika usia 8 tahun. Baginda kemudian dipelihara oleh bapa saudaranya, Abu Talib, dengan penuh kasih sayang.", 
      hikmah: "Ujian yatim piatu melatih jiwa Baginda menjadi tabah, mandiri, dan sangat mengasihi golongan yang lemah.",
      icon: <Leaf className="w-5 h-5" /> 
    },
    { 
      id: 103, 
      title: "Perniagaan & Perkahwinan", 
      year: "595 M (Usia 25)",
      content: "Dikenali sebagai 'Al-Amin' (Yang Terpercaya), Baginda membawa dagangan Siti Khadijah ke Syam dengan penuh kejujuran. Keuntungan yang besar dan akhlak mulia Baginda memikat hati Khadijah. Pada usia 25 tahun, Baginda berkahwin dengan Siti Khadijah (40 tahun). Perkahwinan ini membawa ketenangan dan sokongan ekonomi serta emosi yang besar dalam kehidupan Baginda sebelum kenabian.", 
      hikmah: "Kejujuran adalah modal terbesar dalam perniagaan dan kehidupan. Sokongan isteri yang solehah adalah tulang belakang kejayaan suami.",
      icon: <Heart className="w-5 h-5" /> 
    },
    { 
      id: 104, 
      title: "Wahyu Pertama di Gua Hira'", 
      year: "610 M (Usia 40)",
      content: "Ketika berusia 40 tahun, Baginda sering berkhalwat di Gua Hira' mencari ketenangan. Malaikat Jibril AS datang membawa wahyu pertama (Surah Al-Alaq: 1-5). Jibril memeluk Baginda dengan kuat sebanyak tiga kali sambil berkata 'Iqra!' (Bacalah). Baginda pulang dalam keadaan gementar dan ditenangkan oleh Khadijah serta Waraqah bin Naufal.", 
      hikmah: "Wahyu pertama menekankan 'Membaca' dan 'Ilmu', menunjukkan bahawa Islam adalah agama yang berasaskan ilmu pengetahuan dan pencerahan.",
      icon: <BookOpen className="w-5 h-5" /> 
    },
    { 
      id: 105, 
      title: "Dakwah Secara Rahsia & Terang", 
      year: "610-613 M",
      content: "Baginda memulakan dakwah secara rahsia selama 3 tahun kepada keluarga dan sahabat terdekat (Assabiqun Al-Awwalun). Kemudian turun perintah berdakwah secara terang-terangan di Bukit Safa. Bermulalah era penentangan hebat, seksaan kepada hamba seperti Bilal bin Rabah, dan pemulauan ekonomi oleh Musyrikin Quraisy di Syi'ib Abi Talib.", 
      hikmah: "Strategi dalam berdakwah memerlukan kesabaran dan kebijaksanaan. Memulakan dengan orang terdekat adalah langkah yang paling asas.",
      icon: <Sun className="w-5 h-5" /> 
    },
    { 
      id: 106, 
      title: "Tahun Kesedihan ('Amul Huzni')", 
      year: "619 M (10 Kenabian)",
      content: "Dikenali sebagai 'Amul Huzni'. Isteri tercinta Khadijah dan bapa saudara pelindung Abu Talib wafat dalam masa yang singkat. Tekanan Quraisy semakin hebat. Baginda kemudian ke Taif untuk mencari perlindungan dan berdakwah, tetapi ditolak dengan kejam dan dibaling batu oleh penduduk di sana sehingga berdarah kaki Baginda. Malaikat penjaga gunung menawarkan untuk menimpakan gunung ke atas mereka, namun Baginda mendoakan hidayah buat mereka.", 
      hikmah: "Sifat pemaaf dan optimis Rasulullah SAW adalah teladan agung. Baginda tidak membalas kejahatan dengan kejahatan, tetapi dengan doa dan harapan.",
      icon: <Cloud className="w-5 h-5" /> 
    },
    { 
      id: 107, 
      title: "Isra' & Mi'raj", 
      year: "621 M (11 Kenabian)",
      content: "Peristiwa ajaib perjalanan Rasulullah dari Masjidil Haram ke Masjidil Aqsa (Isra') dan naik ke langit (Mi'raj) untuk menerima perintah solat 5 waktu. Ini adalah hadiah Allah untuk menghiburkan hati Baginda selepas Tahun Kesedihan.",
      hikmah: "Solat adalah tiang agama dan merupakan satu-satunya ibadah yang diperintahkan secara langsung di langit, menunjukkan betapa pentingnya kedudukan solat.",
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
      title: "Bai'ah Aqabah I & II", 
      year: "621-622 M",
      content: "Penduduk Yathrib (Madinah) datang menemui Rasulullah di Mina pada musim haji secara rahsia. Mereka berjanji setia (Bai'ah) untuk beriman dan melindungi Baginda jika berhijrah ke tempat mereka. Mus'ab bin Umair diutus sebagai duta pertama untuk mengajar Islam di Madinah.", 
      hikmah: "Persiapan tapak dakwah dan membina pakatan strategik adalah penting sebelum melakukan perubahan besar atau penghijrahan.",
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: 109, 
      title: "Hijrah ke Madinah", 
      year: "622 M (1 Hijrah)",
      content: "Perintah hijrah turun. Baginda berhijrah bersama Abu Bakar As-Siddiq, bersembunyi di Gua Thur selama 3 hari dari kejaran Quraisy yang menawarkan hadiah 100 unta. Tiba di Quba, Baginda membina masjid pertama. Ketibaan di Madinah disambut dengan nasyid 'Tala'al Badru 'Alaina' dan kegembiraan luar biasa.", 
      hikmah: "Tawakkal yang tinggi mesti diiringi dengan perancangan yang rapi. Persahabatan sejati Abu Bakar adalah contoh kesetiaan yang tiada tolok bandingnya.",
      icon: <MapPin className="w-5 h-5" /> 
    },
    { 
      id: 110, 
      title: "Pembinaan Negara Madinah", 
      year: "1 Hijrah",
      content: "Langkah pertama Baginda ialah membina Masjid Nabawi sebagai pusat pemerintahan dan ibadah. Baginda mempersaudarakan Muhajirin (Makkah) dan Ansar (Madinah) untuk menghapuskan semangat perkauman. Baginda juga menggubal Piagam Madinah, perlembagaan bertulis pertama di dunia yang menjamin hak semua kaum termasuk Yahudi.", 
      hikmah: "Kesatuan ummah dan keadilan sosial adalah asas kekuatan sesebuah negara. Masjid bukan sekadar tempat solat, tetapi pusat pembangunan komuniti.",
      icon: <Crown className="w-5 h-5" /> 
    },
    { 
      id: 111, 
      title: "Perang Badar Al-Kubra", 
      year: "2 Hijrah",
      content: "Perang besar pertama dalam Islam. Tentera Islam (313 orang) dengan kelengkapan minima menewaskan tentera Quraisy (1000 orang) yang lengkap bersenjata dengan bantuan malaikat. Ia menjadi pemisah antara hak dan batil (Yaumul Furqan).", 
      hikmah: "Kuantiti bukan penentu kemenangan, tetapi kualiti iman dan pertolongan Allah. Keberanian mempertahankan kebenaran adalah tuntutan agama.",
      icon: <Sword className="w-5 h-5" /> 
    },
    { 
      id: 112, 
      title: "Ujian Perang Uhud", 
      year: "3 Hijrah",
      content: "Ujian berat bagi umat Islam. Tentera Islam pada mulanya menang, tetapi kerana pasukan pemanah ingkar arahan Nabi dan turun dari bukit untuk mengambil harta rampasan, tentera Khalid al-Walid (belum Islam) menyerang balas dari belakang. Hamzah r.a syahid dan Nabi cedera parah.", 
      hikmah: "Ketaatan kepada pemimpin adalah kunci kejayaan. Cinta dunia boleh membinasakan perjuangan yang suci.",
      icon: <Mountain className="w-5 h-5" /> 
    },
    { 
      id: 113, 
      title: "Perang Khandaq (Ahzab)", 
      year: "5 Hijrah",
      content: "Madinah dikepung oleh gabungan tentera Ahzab (10,000 tentera) yang ingin menghapuskan Islam. Salman al-Farisi mencadangkan strategi penggalian parit besar (Khandaq) yang tidak pernah dilihat Arab. Perang saraf berlaku, dan akhirnya ribut kencang dari Allah mengusir tentera musuh.", 
      hikmah: "Bermesyuarat dan menerima pandangan orang lain (seperti idea Salman) adalah sunnah kepimpinan. Pertolongan Allah datang kepada mereka yang berusaha dan bersabar.",
      icon: <Shield className="w-5 h-5" /> 
    },
    { 
      id: 114, 
      title: "Perjanjian Hudaibiyah", 
      year: "6 Hijrah",
      content: "Nabi bermimpi memasuki Makkah. Baginda dan 1400 sahabat bertolak untuk Umrah tetapi disekat. Termenterai gencatan senjata 10 tahun. Walaupun kelihatan berat sebelah pada awalnya, ia membuka peluang dakwah yang luas ke serata dunia Arab dan Parsi.", 
      hikmah: "Kadangkala kita perlu mengalah setapak untuk mara seribu langkah. Kebijaksanaan diplomasi Rasulullah SAW membuka jalan kepada kemenangan yang lebih besar (Fathul Makkah).",
      icon: <Scroll className="w-5 h-5" /> 
    },
    { 
      id: 115, 
      title: "Fathul Makkah (Pembukaan Makkah)", 
      year: "8 Hijrah",
      content: "Quraisy melanggar perjanjian Hudaibiyah. Rasulullah membawa 10,000 tentera ke Makkah. Kota Makkah dibuka tanpa pertumpahan darah. Baginda memaafkan penduduk Makkah dengan sabda 'Pergilah, kamu semua bebas'. Baginda memusnahkan 360 berhala di sekeliling Kaabah.", 
      hikmah: "Kemaafan ketika mampu membalas dendam adalah sifat terpuji yang paling tinggi. Kebenaran pasti akan menghapuskan kebatilan.",
      icon: <Key className="w-5 h-5" /> 
    },
    { 
      id: 116, 
      title: "Haji Wada' (Perpisahan)", 
      year: "10 Hijrah",
      content: "Haji pertama dan terakhir Baginda bersama lebih 100,000 umat Islam. Di Arafah, Baginda menyampaikan khutbah terakhir yang menekankan persaudaraan, pengharaman riba, hak wanita, dan persamaan taraf manusia. Wahyu terakhir (Al-Maidah: 3) turun menyempurnakan agama Islam.", 
      hikmah: "Mesej hak asasi manusia dan persaudaraan sejagat telah diletakkan oleh Islam jauh sebelum dunia moden membicarakannya.",
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: 117, 
      title: "Kewafatan Rasulullah SAW", 
      year: "11 Hijrah (632 M)",
      content: "Pada 12 Rabiulawal 11H, selepas sakit beberapa hari, Nabi Muhammad SAW wafat di pangkuan Aisyah r.a. Madinah gelap gelita dengan kesedihan. Umar Al-Khattab hampir tidak percaya, namun Abu Bakar menenangkan umat dengan berkata: 'Sesiapa menyembah Muhammad, Muhammad telah mati. Sesiapa menyembah Allah, Allah hidup dan tidak mati.'", 
      hikmah: "Setiap yang bernyawa pasti akan mati. Peninggalan Nabi yang kekal adalah Al-Quran dan Sunnah sebagai panduan hidup kita selamanya.",
      icon: <Sunset className="w-5 h-5" /> 
    }
  ],
  paraNabi: [
    { id: 1, title: "Nabi Adam AS", year: "~5872 SM", content: "Manusia pertama diciptakan dari tanah. Tinggal di Syurga sebelum diturunkan ke Bumi selepas digoda Iblis memakan buah Khuldi.", hikmah: "Taubat yang sungguh-sungguh diterima Allah.", icon: <Leaf className="w-5 h-5" /> },
    { id: 2, title: "Nabi Idris AS", year: "~4533 SM", content: "Nabi pertama yang pandai menulis dengan pena dan menjahit pakaian. Mempunyai ilmu falak yang tinggi dan diangkat darjatnya.", hikmah: "Ilmu pengetahuan dan kemahiran adalah sebahagian daripada kenabian.", icon: <Pen className="w-5 h-5" /> },
    { id: 3, title: "Nabi Nuh AS", year: "~3993 SM", content: "Membina bahtera besar atas perintah Allah. Berdakwah selama 950 tahun tetapi hanya sedikit yang beriman. Banjir besar melanda dunia.", hikmah: "Kesabaran dalam dakwah walaupun hasilnya sedikit.", icon: <Ship className="w-5 h-5" /> },
    { id: 4, title: "Nabi Hud AS", year: "~2450 SM", content: "Diutus kepada kaum 'Ad yang sombong dengan kekuatan fizikal dan binaan tinggi. Allah memusnahkan mereka dengan angin puting beliung.", hikmah: "Kekuatan fizikal tidak bermakna jika derhaka kepada Allah.", icon: <Wind className="w-5 h-5" /> },
    { id: 5, title: "Nabi Saleh AS", year: "~2150 SM", content: "Mukjizat seekor unta betina keluar dari batu. Kaum Tsamud dibinasakan dengan suara guntur kerana membunuh unta itu.", hikmah: "Jangan mengkhianati amanah Allah.", icon: <Info className="w-5 h-5" /> },
    { id: 6, title: "Nabi Ibrahim AS", year: "~1997 SM", content: "Bapa para Nabi (Abul Anbiya). Mencari Tuhan melalui alam. Tidak hangus dibakar api Raja Namrud. Membina Kaabah.", hikmah: "Tauhid yang jitu mampu menghadapi segala ujian.", icon: <Flame className="w-5 h-5" /> },
    { id: 7, title: "Nabi Luth AS", year: "~1950 SM", content: "Diutus kepada kaum Sadum yang melakukan hubungan sejenis. Allah menterbalikkan bumi mereka sebagai azab.", hikmah: "Menjauhi perbuatan keji yang menyalahi fitrah manusia.", icon: <Mountain className="w-5 h-5" /> },
    { id: 8, title: "Nabi Ismail AS", year: "~1911 SM", content: "Anak yang taat. Redha disembelih oleh bapanya sebelum digantikan dengan kibas. Membantu membina Kaabah.", hikmah: "Ketaatan kepada ibu bapa dan Allah membawa keberkatan.", icon: <Droplets className="w-5 h-5" /> },
    { id: 9, title: "Nabi Ishaq AS", year: "~1897 SM", content: "Anak kedua Ibrahim dari Siti Sarah. Menjadi nenek moyang kepada ramai Nabi Bani Israil.", hikmah: "Rezeki anak adalah anugerah Allah walaupun di usia tua.", icon: <BookOpen className="w-5 h-5" /> },
    { id: 10, title: "Nabi Yaqub AS", year: "~1837 SM", content: "Bapa kepada Nabi Yusuf dan 11 anaknya (Asbat). Diuji dengan kehilangan anak kesayangan hingga buta mata.", hikmah: "Kesabaran yang cantik (Sabrun Jamil) menghadapi ujian keluarga.", icon: <Heart className="w-5 h-5" /> },
    { id: 11, title: "Nabi Yusuf AS", year: "~1745 SM", content: "Dikhianati saudara sendiri, dibuang ke perigi, dijual sebagai hamba, dipenjara, akhirnya menjadi menteri Mesir.", hikmah: "Rancangan Allah lebih baik daripada rancangan manusia.", icon: <Crown className="w-5 h-5" /> },
    { id: 12, title: "Nabi Ayub AS", year: "~1540 SM", content: "Diuji dengan kehilangan harta, anak, dan penyakit kulit yang lama. Isterinya setia menjaganya. Tetap bersyukur.", hikmah: "Penyakit adalah ujian penghapus dosa dan pengangkat darjat.", icon: <Heart className="w-5 h-5" /> },
    { id: 13, title: "Nabi Syuaib AS", year: "~1550 SM", content: "Khatibul Anbiya (Ahli Pidato). Mengajar kaum Madyan supaya jujur dalam timbangan dan perniagaan.", hikmah: "Kejujuran ekonomi adalah asas kemakmuran masyarakat.", icon: <Scale className="w-5 h-5" /> },
    { id: 14, title: "Nabi Musa AS", year: "~1527 SM", content: "Kalimullah (Yang berkata-kata dengan Allah). Mukjizat tongkat membelah laut. Memimpin Bani Israil keluar dari Mesir.", hikmah: "Berani menentang kezaliman pemerintah yang melampau.", icon: <Waves className="w-5 h-5" /> },
    { id: 15, title: "Nabi Harun AS", year: "~1530 SM", content: "Saudara Nabi Musa. Fasih berbicara dan menjadi pembantu setia dalam dakwah. Menjaga Bani Israil ketika Musa ke Tursina.", hikmah: "Kerjasama dalam kebaikan menguatkan perjuangan.", icon: <Info className="w-5 h-5" /> },
    { id: 16, title: "Nabi Zulkifli AS", year: "~1500 SM", content: "Sangat amanah, sabar, dan menepati janji. Menjadi raja yang berpuasa di siang hari dan beribadah di malam hari.", hikmah: "Pemimpin mesti memiliki integriti dan kesabaran tinggi.", icon: <Gem className="w-5 h-5" /> },
    { id: 17, title: "Nabi Daud AS", year: "~1041 SM", content: "Raja dan Nabi. Menewaskan Jalut. Mempunyai suara merdu dan boleh melenturkan besi untuk membuat baju zirah.", hikmah: "Kekuatan dan kemahiran teknikal digunakan untuk kebaikan.", icon: <Music className="w-5 h-5" /> },
    { id: 18, title: "Nabi Sulaiman AS", year: "~989 SM", content: "Raja segala makhluk. Memerintah angin, jin, dan haiwan. Sangat kaya namun tetap bersyukur.", hikmah: "Kekayaan dan kuasa adalah amanah untuk menegakkan agama.", icon: <Crown className="w-5 h-5" /> },
    { id: 19, title: "Nabi Ilyas AS", year: "~910 SM", content: "Menentang penyembahan berhala Ba'al. Diangkat ke langit. Doanya makbul menahan dan menurunkan hujan.", hikmah: "Istiqamah mempertahankan aqidah di tengah masyarakat syirik.", icon: <Sun className="w-5 h-5" /> },
    { id: 20, title: "Nabi Ilyasa AS", year: "~885 SM", content: "Murid Nabi Ilyas. Melanjutkan dakwah dengan penuh hikmah. Diberikan mukjizat menyembuhkan penyakit.", hikmah: "Pewarisan ilmu dan kepimpinan adalah penting.", icon: <BookOpen className="w-5 h-5" /> },
    { id: 21, title: "Nabi Yunus AS", year: "~820 SM", content: "Meninggalkan kaumnya kerana marah. Ditelan ikan nun. Berzikir 'La ilaha illa anta subhanaka inni kuntu minaz zalimin'.", hikmah: "Jangan berputus asa terhadap rahmat Allah dan kaum sendiri.", icon: <Waves className="w-5 h-5" /> },
    { id: 22, title: "Nabi Zakaria AS", year: "~100 SM", content: "Penjaga Maryam. Berdoa memohon zuriat di usia tua. Allah kurniakan Nabi Yahya sebagai pewaris.", hikmah: "Jangan berhenti berdoa walaupun kelihatan mustahil pada logik.", icon: <Info className="w-5 h-5" /> },
    { id: 23, title: "Nabi Yahya AS", year: "~30 SM", content: "Cerdas, berani, dan zuhud sejak kecil. Mati syahid dibunuh raja kerana menegakkan kebenaran hukum Allah.", hikmah: "Berpegang teguh pada prinsip kebenaran walaupun nyawa terancam.", icon: <Feather className="w-5 h-5" /> },
    { id: 24, title: "Nabi Isa AS", year: "~1 M", content: "Lahir tanpa bapa (Kalimah Allah). Bercakap semasa bayi, menyembuhkan buta dan sopak, menghidupkan mati. Diangkat ke langit.", hikmah: "Kasih sayang dan mukjizat membuktikan kekuasaan Allah.", icon: <Cloud className="w-5 h-5" /> },
    { id: 25, title: "Nabi Muhammad SAW", year: "570 M", content: "Penutup segala Nabi (Khatamul Anbiya). Membawa Al-Quran. Rahmat bagi sekalian alam.", hikmah: "Akhlak Baginda adalah Al-Quran, contoh terbaik sepanjang zaman.", icon: <Star className="w-5 h-5" /> }
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

  // Transform story into slides/scenes for "No Scroll" experience
  const getSlides = (story: SirahStory) => {
    if (story.isNovel && story.scenes) return story.scenes;
    
    // Split content into sentences to reduce density
    // Regex matches sentences ending with . ! ?
    const sentences = story.content 
      ? story.content.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [story.content]
      : [""];

    // Standard Story Slides
    const slides = sentences
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(text => ({ 
        type: 'content',
        text: text, 
        title: story.title,
        year: story.year
      }));

    if (story.hikmah) {
      slides.push({
        type: 'hikmah',
        text: story.hikmah,
        title: "Hikmah & Pengajaran",
        year: story.year
      });
    }

    return slides;
  };

  const slides = selectedStory ? getSlides(selectedStory) : [];
  const currentSlideData = slides[currentScene];

  if (selectedStory) {
    // READING MODE (FULL SCREEN, NO SCROLL) - MOVED OUTSIDE MainLayout
    return (
      <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col animate-in fade-in duration-300">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-20">
          <button 
            onClick={() => { setSelectedStory(null); setCurrentScene(0); }}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
          
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-wider dark:text-white line-clamp-1 max-w-[200px]">
              {selectedStory.title}
            </h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              Bahagian {currentScene + 1} / {slides.length}
            </p>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Main Content Area - Centered & Fixed */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden relative">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

          {/* Content Container */}
          <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto z-10 gap-6 border-2 border-transparent">
            
            {/* Image Section - Takes available space */}
            {(currentSlideData as any).img && (
              <div className="w-full h-[45vh] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-black/5 dark:bg-white/5 shrink-0">
                <img 
                  src={(currentSlideData as any).img} 
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  alt="Scene"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-slate-400 p-4 text-center text-xs">Gambar gagal dimuatkan</div>';
                  }}
                />
              </div>
            )}

            {/* Text Content - Fixed size based on content, but shrinks if needed */}
            <div className={`text-center flex-none w-full ${(currentSlideData as any).img ? '' : 'flex-1 flex flex-col justify-center'}`}>
              {(currentSlideData as any).type === 'hikmah' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Star className="w-3 h-3 fill-amber-500" />
                  Hikmah
                </div>
              )}

              <p className={`
                ${(currentSlideData as any).type === 'hikmah' 
                  ? "font-serif italic text-xl md:text-3xl leading-relaxed text-slate-800 dark:text-amber-100" 
                  : "text-lg md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium"}
              `}>
                "{(currentSlideData as any).text}"
              </p>

              {(currentSlideData as any).type !== 'hikmah' && !(currentSlideData as any).img && (
                 <div className="flex justify-center pt-8">
                   <div className="w-16 h-1 bg-emerald-500/20 rounded-full" />
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 pb-12 bg-white dark:bg-slate-950 border-t border-black/5 dark:border-white/5 z-20">
          <div className="flex gap-4 max-w-md mx-auto">
            <button 
              disabled={currentScene === 0}
              onClick={() => setCurrentScene(c => c - 1)}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-900 dark:text-white rounded-2xl font-bold text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Sebelum
            </button>
            
            <button 
              onClick={() => currentScene < slides.length - 1 ? setCurrentScene(c => c + 1) : setSelectedStory(null)}
              className={`flex-[2] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all text-white
                ${currentScene === slides.length - 1 
                  ? "bg-slate-800 dark:bg-slate-700 hover:bg-slate-900" 
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30"}
              `}
            >
              {currentScene === slides.length - 1 ? "Tamat Bacaan" : "Seterusnya"}
            </button>
          </div>
        </div>

      </div>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto pb-24 p-4 min-h-screen">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6 py-6 text-left">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => view === 'menu' ? window.history.back() : setView('menu')}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 flex items-center justify-center transition-all active:scale-95 hover:bg-secondary"
            >
              <ChevronLeft className="w-6 h-6 dark:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
                {view === 'menu' ? "Sirah & Kisah" : view === 'nabawiyah' ? "Sirah Nabawiyah" : "25 Para Nabi"}
              </h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.3em]">
                {view === 'menu' ? "Hikmah & Teladan" : view === 'nabawiyah' ? "Perjalanan Agung" : "Utusan Pilihan"}
              </p>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-[#064e3b] to-[#022c22] shadow-xl border border-white/10 text-white text-center">
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/5">
                {view === 'nabawiyah' ? <BookOpen className="w-7 h-7 text-emerald-400" /> : 
                 view === 'paraNabi' ? <Users className="w-7 h-7 text-emerald-400" /> :
                 <History className="w-7 h-7 text-emerald-400" />}
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-wide">
                {view === 'menu' ? "Khazanah Sejarah" : view === 'nabawiyah' ? "Jejak Rasulullah SAW" : "Kisah Para Nabi AS"}
              </h2>
              <p className="text-emerald-100 text-sm font-medium italic opacity-80 max-w-md leading-relaxed">
                {view === 'menu' ? "Mempelajari kebesaran Allah melalui sejarah utusan-Nya" : 
                 view === 'nabawiyah' ? "Menelusuri perjalanan hidup manusia teragung dari kelahiran hingga kewafatan." :
                 "Mengenali 25 utusan Allah yang wajib diketahui serta pengajaran daripadanya."}
              </p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10" />
          </div>

          {view !== 'menu' && (
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Cari peristiwa, nama, atau tahun..."
                className="w-full bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white shadow-sm transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* MENU UTAMA */}
        {view === 'menu' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <button 
              onClick={() => setView('nabawiyah')}
              className="group relative overflow-hidden rounded-[35px] p-8 h-64 bg-white dark:bg-slate-900 text-left shadow-lg shadow-emerald-900/5 border border-black/5 active:scale-[0.98] transition-all hover:border-emerald-500/30"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20 transition-colors" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Book className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase leading-none mb-2">Sirah<br/>Nabawiyah</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Kronologi hidup Nabi Muhammad SAW</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Mula Membaca <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>

            <button 
              onClick={() => setView('paraNabi')}
              className="group relative overflow-hidden rounded-[35px] p-8 h-64 bg-white dark:bg-slate-900 text-left shadow-lg shadow-emerald-900/5 border border-black/5 active:scale-[0.98] transition-all hover:border-emerald-500/30"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 dark:bg-amber-900/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase leading-none mb-2">25 Para<br/>Nabi</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Sejarah & Mukjizat Utusan Allah</p>
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Mula Membaca <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* TIMELINE VIEW FOR NABAWIYAH */}
        {view === 'nabawiyah' && (
          <div className="relative mt-8 px-4">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" />

            <div className="space-y-12">
              {filterData(sirahData.nabawiyah).map((item, index) => (
                <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 bg-emerald-500 z-10 shadow-sm" />
                  
                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 group cursor-pointer" onClick={() => { setSelectedStory(item); setCurrentScene(0); }}>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
                          {item.icon}
                        </div>
                        {item.year && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {item.content}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Baca Kisah <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIMELINE VIEW FOR PARA NABI */}
        {view === 'paraNabi' && (
          <div className="relative mt-8 px-4">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-amber-100 dark:bg-amber-900/30 rounded-full" />

            <div className="space-y-12">
              {filterData(sirahData.paraNabi).map((item, index) => (
                <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 bg-amber-500 z-10 shadow-sm" />
                  
                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 group cursor-pointer" onClick={() => { setSelectedStory(item); setCurrentScene(0); }}>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-amber-900/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl text-amber-600 dark:text-amber-400">
                          {item.icon}
                        </div>
                        {item.year && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {item.content}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Baca Kisah <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}