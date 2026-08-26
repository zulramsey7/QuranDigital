# 🕌 QuranDigital - JomNgaji (Mobile & Web)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.5-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Android](https://img.shields.io/badge/Android%20Studio-Ready-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/studio)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**JomNgaji (QuranDigital)** adalah aplikasi Islamik moden serba lengkap yang dibina untuk peranti **Android (melalui Capacitor & Android Studio)** serta **Web / Progressive Web App (PWA)**. Aplikasi ini menyediakan pengalaman ibadah digital yang lancar, pantas, responsif dan boleh digunakan secara luar talian (offline).

---

## 📱 Ciri-Ciri Utama

| Ciri | Penerangan |
| :--- | :--- |
| **📖 Al-Quran Digital** | Teks lengkap 114 surah, terjemahan Bahasa Melayu, audio tilawah, carian ayat, penanda halaman (*bookmark*), dan penanda bacaan terakhir. |
| **🕐 Waktu Solat Automatik** | Pengiraan waktu solat tepat berasaskan koordinat GPS semasa (diselaraskan zon rasmi Malaysia / JAKIM & global). |
| **🔔 Notifikasi & Audio Azan** | Pemberitahuan azan tepat pada masanya menggunakan sistem notifikasi natif Android (*Local Notifications* & *Exact Alarm*). |
| **🧭 Kompas Arah Kiblat** | Penentu arah Kaabah berketepatan tinggi menggunakan sensor kompas magnetik peranti dengan paparan darjah & animasi kompas moden. |
| **📿 Tasbih Digital** | Kaunter zikir interaktif dengan maklum balas getaran haptik (*vibration*), simpanan kiraan automatik, dan pilihan bacaan zikir. |
| **🤲 Doa & Zikir Harian** | Himpunan doa harian, zikir pagi & petang, doa selepas solat, serta terjemahan dan rujukan. |
| **📚 Sirah Nabawiyah** | Kisah perjalanan hidup Rasulullah SAW, garis masa peristiwa penting, serta kisah 25 Rasul & Nabi AS dengan iktibar. |
| **🌙 Yasin & Tahlil** | Bacaan Surah Yasin, Tahlil Lengkap, dan Tahlil Ringkas untuk amalan tahlil arwah atau majlis kenduri. |
| **📅 Jadual Waktu Solat** | Paparan jadual solat bulanan mengikut zon kawasan yang boleh disemak dan dirujuk secara mudah. |
| **⚙️ Kustomasi & Tema** | Sokongan Mod Gelap (*Dark Mode*), Mod Cerah, pelarasan saiz fon ayat Al-Quran, dan pilihan bahasa (BM / English). |

---

## 🛠️ Stack Teknologi

- **Frontend Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Mobile Native Runtime**: [Capacitor 8](https://capacitorjs.com/) (Cross-platform native bridge)
- **Native Android IDE**: [Android Studio](https://developer.android.com/studio) (Gradle build system, Java / Kotlin runtime)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives), [Lucide React](https://lucide.dev/)
- **State & Routing**: [React Router DOM v6](https://reactrouter.com/), Context API, [TanStack React Query](https://tanstack.com/query)
- **Capacitor Plugins Digunakan**:
  - `@capacitor/android` - Plugin teras Android
  - `@capacitor/geolocation` - Pengesanan koordinat GPS untuk waktu solat & kiblat
  - `@capacitor/local-notifications` - Penjadualan notifikasi & penggera azan tempatan
  - `@capacitor/status-bar` - Kawalan warna & tema status bar Android
  - `@capacitor/app` - Pengendali *back button* natif Android (*hardware back button*)
  - `@capacitor/share` & `@capacitor/filesystem` - Perkongsian ayat Al-Quran dan pengurusan fail
  - `@capacitor/browser` - Pembukaan pautan web luar dengan selamat

---

## 📋 Prasyarat Pembangunan

Sebelum memulakan pembangunan atau membina fail APK, pastikan persekitaran komputer anda mempunyai:

1. **[Node.js](https://nodejs.org/)** (Versi 18.x atau 20.x ke atas) & **npm**
2. **[Android Studio](https://developer.android.com/studio)** (Versi terkini seperti Ladybug / Iguana / Koala)
3. **Java Development Kit (JDK 17 atau 21)** (Disyorkan mengikut keperluan Gradle Android Studio)
4. **Android SDK Platform & Build-Tools** (Dipasang melalui SDK Manager dalam Android Studio)

---

## 🚀 Panduan Pemasangan & Pembangunan

### 1. Klon Repositori & Pasang Dependensi

```bash
# Masuk ke direktori projek
cd QuranDigital-main

# Pasang pakej modul
npm install
```

### 2. Jalankan Server Pembangunan Web

Untuk menguji dan membangunkan paparan UI secara pantas di pelayar web:

```bash
npm run dev
```

Buka pelayar di `http://localhost:8080` (atau port yang dipaparkan di terminal).

---

## 📱 Aliran Kerja Android & Capacitor

### 1. Bina Web App (Production Build)

Setiap kali terdapat perubahan pada kod React/HTML/CSS, bina fail statik terlebih dahulu:

```bash
npm run build
```

Fail binaan akan dihasilkan di dalam folder `dist/`.

### 2. Salin & Segerakkan ke Folder Android (Capacitor Sync)

Segerakkan fail binaan web dan konfigurasi plugin ke projek Android:

```bash
npx cap sync android
```

*(Atau gunakan `npx cap copy android` jika tiada plugin natif baharu dipasang).*

### 3. Buka Projek di Android Studio

Lancarkan Android Studio dengan memanggil arahan:

```bash
npx cap open android
```

Android Studio akan membuka folder projek `android/`.

---

## 🔨 Membina APK & App Bundle (AAB)

Melalui **Android Studio**:

1. Tunggu proses **Gradle Sync** selesai sepenuhnya.
2. **Uji di Emulator / Peranti Sebenar**:
   - Sambungkan telefon Android dengan mod *USB Debugging* dihidupkan, atau lancarkan Android Virtual Device (AVD).
   - Klik butang hijau **Run 'app'** (ikon ▶️) di bahagian atas Android Studio.
3. **Bina APK Debug / Release**:
   - Pergi ke menu: **Build** ➜ **Build Bundle(s) / APK(s)** ➜ **Build APK(s)**.
   - Fail `.apk` boleh didapati di: `android/app/build/outputs/apk/debug/app-debug.apk`.
4. **Bina Signed AAB untuk Google Play Store**:
   - Pergi ke menu: **Build** ➜ **Generate Signed Bundle / APK...**
   - Pilih **Android App Bundle** atau **APK**, masukkan Keystore anda, dan pilih *Release*.

---

## 🔒 Kebenaran Android (Permissions)

Aplikasi ini menggunakan kebenaran berikut yang didefinisikan dalam `android/app/src/main/AndroidManifest.xml`:

| Kebenaran | Tujuan Kegunaan |
| :--- | :--- |
| `ACCESS_FINE_LOCATION` & `ACCESS_COARSE_LOCATION` | Mendapatkan kedudukan geografi pengguna untuk mengira waktu solat mengikut zon setempat dan menentukan darjah kiblat ke Kaabah. Data lokasi hanya diproses di peranti (*client-side*). |
| `POST_NOTIFICATIONS` | Memaparkan peringatan waktu solat dan pemberitahuan azan (Android 13+). |
| `SCHEDULE_EXACT_ALARM` & `USE_EXACT_ALARM` | Memastikan peringatan azan berbunyi tepat pada minit dan saat waktu solat tiba. |
| `RECEIVE_BOOT_COMPLETED` | Menjadualkan semula waktu solat dan notifikasi azan secara automatik selepas peranti dihidupkan semula (*restart*). |
| `VIBRATE` | Memberi getaran haptik sewaktu menekan tasbih digital dan amaran waktu solat. |
| `INTERNET` | Mengambil data waktu solat, muat turun surah Al-Quran, dan terjemahan. |

---

## 📂 Struktur Projek

```
QuranDigital-main/
├── android/                   # Projek Native Android (dibuka menggunakan Android Studio)
│   ├── app/
│   │   ├── src/main/AndroidManifest.xml   # Kebenaran & konfigurasi Android
│   │   └── build.gradle                   # Konfigurasi dependensi Gradle
│   └── ...
├── src/                       # Kod Sumber Utama (React & TypeScript)
│   ├── components/            # Komponen UI & Layout
│   │   ├── AndroidBackHandler.tsx   # Pengendali butang Back peranti Android
│   │   ├── NativeStatusBar.tsx      # Kawalan Status Bar Capacitor
│   │   └── ui/                      # Komponen reka bentuk shadcn/ui
│   ├── contexts/              # Pengurusan State (Location, Theme, Azan, Bookmark)
│   ├── hooks/                 # Custom React hooks (useAzanNotifications, dll.)
│   ├── lib/                   # Utiliti (pengiraan kiblat, perkongsian, waktu solat)
│   ├── pages/                 # Halaman aplikasi (Quran, Solat, Kiblat, Tasbih, dll.)
│   ├── App.tsx                # Komponen utama & Routing
│   └── main.tsx               # Titik permulaan React
├── public/                    # Aset statik (audio azan, ikon pwa, gambar sirah)
├── capacitor.config.ts        # Konfigurasi Capacitor (App ID, App Name, Plugin)
├── package.json               # Dependensi & skrip npm
├── PRIVACY_POLICY.md          # Dokumen Dasar Privasi (Google Play Store compliance)
├── tailwind.config.ts         # Konfigurasi Tailwind CSS
└── vite.config.ts             # Konfigurasi bundler Vite
```

---

## 📜 Dasar Privasi (Privacy Policy)

Aplikasi **JomNgaji** amat mementingkan privasi pengguna. Kami tidak mengumpul, menjual, atau berkongsi sebarang maklumat peribadi pengguna. Sila baca dokumen penuh [PRIVACY_POLICY.md](file:///d:/download/QuranDigital-main/QuranDigital-main/PRIVACY_POLICY.md) untuk perincian pematuhan standard Google Play Console.

---

## 🤝 Sumbangan (Contributing)

Sebarang cadangan penambahbaikan dan *pull request* amat dialu-alukan:

1. *Fork* repositori ini
2. Cipta *Branch* baharu (`git checkout -b feature/FiturBaharu`)
3. *Commit* perubahan anda (`git commit -m 'Menambah fitur baharu'`)
4. *Push* ke *branch* tersebut (`git push origin feature/FiturBaharu`)
5. Buka *Pull Request*

---

## 📄 Lesen & Penghargaan

- **Lesen**: Projek ini dilesenkan di bawah lesen Open-Source.
- **Sumber Data & Penghargaan**:
  - Data Al-Quran: [eQuran.id](https://equran.id/) & [AlQuran Cloud](https://alquran.cloud/)
  - Data Waktu Solat: [WaktuSolat.app](https://waktusolat.app/) / JAKIM Malaysia
  - Ikon: [Lucide Icons](https://lucide.dev/)
  - Komponen UI: [shadcn/ui](https://ui.shadcn.com/)

---

<p align="center">
  Dibuat dengan penuh dedikasi ❤️ untuk kemudahan ibadah umat Islam sejagat.
</p>