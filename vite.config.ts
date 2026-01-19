import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Mengunci root dan base path untuk mengelakkan ralat import di Netlify/Vercel
  root: "./",
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Memastikan index.html dikesan sebagai entry point utama
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
        }
      }
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      includeAssets: [
        "favicon.ico",
        "masjid-hero.jpg",
        "robots.txt", 
        "sirah1.png", 
        "sirah2.png", 
        "sirah3.png", 
        "sirah4.png",
        "pwa-192x192.png",
        "pwa-512x512.png"
      ],
      manifest: {
        name: "QuranDigital 2025",
        short_name: "JomNgaji",
        description: "Aplikasi Islamik PWA dengan Al-Quran, Waktu Solat, Kiblat, Tasbih dan Doa",
        theme_color: "#076244ff", 
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // KEMASKINI: mp3 dibuang dari sini untuk mengelakkan ralat saiz fail 2MB semasa build
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        
        runtimeCaching: [
          {
            // Menangani fail audio secara dinamik (On-Demand)
            urlPattern: /\.(?:mp3|wav|ogg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "jomngaji-audio-v1",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Simpan selama 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              // Membolehkan range requests (penting untuk seek audio mp3)
              rangeRequests: true, 
            },
          },
          {
            urlPattern: /^https:\/\/api\.aladhan\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "prayer-times-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "quran-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));