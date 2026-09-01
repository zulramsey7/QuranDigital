# JomNgaji Promo Site

Laman web promosi rasmi untuk aplikasi **JomNgaji** — aplikasi Al-Quran digital untuk Android.  
Website ini **hanya** untuk promosi, maklumat dan pautan muat turun Google Play. Ia bukan aplikasi Quran dan tidak mengandungi fungsi bacaan Quran, waktu solat atau kiblat secara langsung.

---

## Ciri-ciri Website

| Halaman | URL | Kandungan |
|---------|-----|-----------|
| Laman Utama | `/` | Hero, screenshot aplikasi, FAQ, CTA muat turun |
| Ciri-ciri | `/features` | Senarai lengkap ciri aplikasi |
| Iklan | `/iklan` | Pakej pengiklanan & borang hubungi |
| Tentang | `/tentang` | Maklumat JomNgaji & credits |
| Dasar Privasi | `/privacy` | Ringkasan privasi + pautan policy penuh |

**Lain-lain:**
- Light / Dark mode
- Responsif (mobile, tablet, desktop)
- SEO & Open Graph (share di WhatsApp, Facebook, Twitter)
- Phone mockup untuk screenshot aplikasi
- Menu navigasi desktop + menu mudah alih (hamburger)
- Footer lengkap dengan pautan, emel hubungi & maklumat muat turun

---

## Stack Teknologi

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (file-based routing)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) (komponen UI)
- [Lucide React](https://lucide.dev/) (ikon)
- [Nitro](https://nitro.build/) (server / deploy)
- [Sharp](https://sharp.pixelplumbing.com/) (optimize gambar & generate OG image)

---

## Struktur Projek

```
jomngaji-promo-site-main/
├── public/
│   ├── favicon.png
│   └── og-image.jpg          # Gambar share sosial (1200×630)
├── scripts/
│   ├── optimize-images.mjs   # PNG → WebP
│   └── generate-og.mjs         # Jana semula og-image.jpg
├── src/
│   ├── assets/               # Logo & screenshot aplikasi
│   ├── components/
│   │   ├── site.tsx          # Header, footer, butang Google Play
│   │   ├── phone-mockup.tsx  # Bingkai telefon untuk screenshot
│   │   ├── faq-section.tsx   # Soalan lazim
│   │   └── ui/               # Komponen shadcn/ui
│   ├── lib/
│   │   └── site-meta.ts      # SEO & Open Graph helper
│   ├── routes/               # Halaman (satu fail = satu route)
│   │   ├── __root.tsx        # Layout root & shell HTML
│   │   ├── index.tsx         # Laman utama
│   │   ├── features.tsx
│   │   ├── iklan.tsx
│   │   ├── tentang.tsx
│   │   └── privacy.tsx
│   ├── styles.css            # Design system (warna hijau JomNgaji)
│   └── router.tsx
├── netlify.toml
├── package.json
└── vite.config.ts
```

---

## Mula Pembangunan

### Prasyarat

- [Node.js](https://nodejs.org/) 20 atau lebih baharu
- npm

### Pasang & jalankan

```bash
git clone <url-repositori>
cd jomngaji-promo-site-main
npm install
npm run dev
```

Buka `http://localhost:5173` (atau port yang dipaparkan dalam terminal).

### Skrip npm

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server pembangunan tempatan |
| `npm run build` | Build production |
| `npm run preview` | Preview build production |
| `npm run lint` | Semak ESLint |
| `npm run format` | Format kod dengan Prettier |
| `npm run optimize-images` | Optimize screenshot & logo ke WebP |
| `npm run generate-og` | Jana semula `public/og-image.jpg` |

---

## Konfigurasi

### Pautan & emel (wajib sebelum publish)

Kemaskini nilai dalam `src/components/site.tsx`:

```ts
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=...";
export const PRIVACY_POLICY_URL = "https://...";
export const CONTACT_EMAIL = "hello@jomngaji.com";
export const ADS_CONTACT_EMAIL = "iklan@jomngaji.com";
```

### Domain untuk Open Graph

Cipta fail `.env` di root projek:

```env
VITE_SITE_URL=https://jomngaji.com
```

Nilai ini digunakan untuk `og:url` dan `og:image` supaya preview share di media sosial menggunakan URL mutlak yang betul.

### Media sosial (pilihan)

Tambah pautan dalam `SOCIAL_LINKS` di `src/components/site.tsx`:

```ts
import { Instagram } from "lucide-react";

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/jomngaji", icon: Instagram },
];
```

---

## Aset Gambar

### Screenshot aplikasi

Letakkan fail PNG dalam `src/assets/`:

- `screen-quran.png`
- `screen-prayer.png`
- `screen-kiblat.png`

Kemudian jalankan:

```bash
npm run optimize-images
```

Skrip ini akan:
- Resize ke **640×1280** (nisbah telefon)
- Export versi **WebP** untuk load pantas

Website menggunakan fail `.webp`; fail `.png` kekal sebagai sumber.

### Logo

- Sumber: `src/assets/logo.png`
- WebP auto-generated: `src/assets/logo.webp`

### OG image (share sosial)

```bash
npm run generate-og
```

Hasil: `public/og-image.jpg` (1200×630). Jalankan semula selepas tukar logo atau screenshot waktu solat.

---

## Design System

Identiti visual JomNgaji — **hijau Islamic, moden & minimal**.

- Warna utama: hijau (`primary`) — butang, ikon, highlight
- Font: Plus Jakarta Sans (UI), Amiri (teks Arab)
- Sokong light & dark mode
- Rounded corners, card shadow lembut, animasi fade-up ringan

Semua token warna ditakrif dalam `src/styles.css`.

---

## SEO

Setiap halaman menggunakan helper `pageMeta()` dari `src/lib/site-meta.ts` yang menyediakan:

- `<title>` & meta description
- Open Graph (`og:title`, `og:description`, `og:image`, …)
- Twitter Card (`summary_large_image`)
- Canonical URL

**Title lalai:** `JomNgaji – Al-Quran Digital Untuk Semua`

---

## Deploy

### Build production

```bash
npm run build
```

Output build dijana dalam folder `.output/`.

### Netlify

Projek ini menyertakan `netlify.toml`. Pastikan tetapan publish directory sepadan dengan output build semasa (semak selepas `npm run build`). Untuk TanStack Start + Nitro, anda mungkin perlu kemaskini `publish` path atau gunakan adapter SSR yang sesuai.

### Cloudflare (alternatif)

Build menyokong deploy Nitro ke Cloudflare:

```bash
npm run build
npx nitro deploy --prebuilt
```

---

## Apa Yang **Tidak** Ada Dalam Projek Ini

Website ini **promosi sahaja**. Ia tidak termasuk:

- Aplikasi Android / Capacitor
- Fungsi bacaan Quran, juz, surah, kiblat atau waktu solat
- API Quran / Waktu Solat
- AdMob atau iklan dalam web
- Source code aplikasi JomNgaji Android

Matlamat tunggal: **Promosi → Maklumat → Muat Turun di Google Play**

---

## Credits & Penghargaan

| Sumber | Peranan |
|--------|---------|
| [quran.foundation](https://quran.foundation) | Sumber teks Al-Quran |
| [WaktuSolat.app](https://waktusolat.app) | Data waktu solat |
| [shadcn/ui](https://ui.shadcn.com/) | Komponen UI |
| [Lucide](https://lucide.dev/) | Ikon |

---

## Lesen

Projek peribadi untuk JomNgaji. Hak cipta terpelihara.
