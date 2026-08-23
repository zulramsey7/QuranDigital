# QuranDigital 2025 - JomNgaji

🕌 Aplikasi Islamik Progressive Web App (PWA) yang lengkap dengan Al-Quran, Waktu Solat, Kiblat, Tasbih, Doa, Sirah Nabawiyah, dan banyak lagi.

## ✨ Fitur Utama

### 📖 Al-Quran Digital
- Teks Al-Quran lengkap 114 surah
- Terjemahan Bahasa Melayu
- Bookmark ayat kegemaran
- Antaramuka yang mudah dibaca

### 🕐 Waktu Solat
- Waktu solat automatik berdasarkan lokasi
- Notifikasi waktu solat
- Sokongan pelbagai zon waktu di Malaysia

### 🧭 Arah Kiblat
- Kompas digital untuk menentukan arah Kiblat
- Kiraan jarak ke Makkah
- Kalibrasi sensor kompas

### 📿 Tasbih Digital
- Tasbih digital dengan counter
- Reset mudah
- Rekod bilangan zikir

### 🤲 Doa & Zikir
- Koleksi doa harian
- Zikir pagi dan petang
- Doa selepas solat

### 📚 Sirah Nabawiyah
- Kisah hidup Nabi Muhammad SAW
- 25 Kisah Para Nabi AS
- Timeline interaktif
- Hikmah dan pengajaran

### 🎵 Nasyid & Muzik
- Koleksi nasyid Islamik
- Audio player dengan kontrol lengkap
- Sokongan offline caching

### 🌙 Tahlil & Yasin
- Teks lengkap Surah Yasin
- Tahlil Lengkap dan Ringkas
- Mudah untuk bacaan harian

### ⚙️ Tetapan
- Bahasa: Bahasa Melayu / English
- Tema: Light / Dark / System
- Saiz fon boleh laras
- Lokasi automatik

## 🛠️ Teknologi

Project ini dibina dengan teknologi moden:

- **Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui (Radix UI)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form dengan Zod
- **PWA**: Vite PWA Plugin
- **Linting**: ESLint dengan TypeScript ESLint

## 📦 Installation

### Prasyarat
- Node.js (v18 atau lebih tinggi)
- npm atau yarn

### Langkah Installation

```bash
# Clone repository
git clone <repository-url>
cd QuranDigital-main

# Install dependencies
npm install

# Start development server
npm run dev
```

Server development akan berjalan di `http://localhost:8080`

## 🚀 Build untuk Production

```bash
# Build project
npm run build

# Preview production build
npm run preview
```

## 📱 PWA Features

Aplikasi ini adalah Progressive Web App dengan:

- **Offline Support** - Boleh diakses tanpa internet
- **Installable** - Boleh di-install ke desktop/mobile
- **Fast Loading** - Optimasi loading dengan caching strategy
- **Push Notifications** - Notifikasi waktu solat (coming soon)

## 🧪 Testing & Linting

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (MainLayout, Navigation)
│   └── ui/             # shadcn-ui components
├── contexts/           # React contexts (Theme, Language, Bookmark)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── QuranPage.tsx
│   ├── DoaPage.tsx
│   ├── QiblaPage.tsx
│   ├── Sirah.tsx
│   ├── Muzik.tsx
│   ├── TasbihPage.tsx
│   └── ...
├── data/               # Static data files
├── App.tsx             # Main App component
└── main.tsx            # Entry point
```

## 🔌 API Endpoints

Aplikasi ini menggunakan beberapa API eksternal:

- **Waktu Solat**: `https://api.waktusolat.app/`
- **Al-Quran**: `https://api.alquran.cloud/` dan `https://equran.id/api/`

## 🌐 Deployment

Project boleh di-deploy ke pelbagai platform:

- **Netlify** - Drag & drop atau Git integration
- **Vercel** - Git integration dengan auto-deploy
- **GitHub Pages** - Static hosting
- **Self-hosted** - Build ke folder `dist` dan host di server sendiri

## 🤝 Contribution

Contributions are welcome! Sila:

1. Fork repository
2. Create branch untuk feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Project ini adalah open-source. Sila rujuk LICENSE file untuk details.

## 🙏 Credits

- Quran data dari [eQuran.id](https://equran.id/)
- Waktu solat data dari [WaktuSolat.app](https://waktusolat.app/)
- UI components dari [shadcn-ui](https://ui.shadcn.com/)
- Icons dari [Lucide](https://lucide.dev/)

## 📞 Support

Untuk bugs atau suggestions, sila open issue di repository.

---

Dibuat dengan ❤️ untuk umat Islam