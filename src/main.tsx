import { createRoot } from "react-dom/client";
import App from "./App"; 
import "./index.css";

// 1. Semakan keselamatan elemen root
const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Elemen root tidak dijumpai. Sila pastikan index.html mempunyai <div id='root'></div>"
  );
}

// 2. Render Aplikasi
const root = createRoot(container);
root.render(<App />);

/**
 * NOTA PENTING:
 * Kita tidak perlu lagi mendaftar Service Worker secara manual di sini
 * kerana kita telah menggunakan 'vite-plugin-pwa' dengan tetapan 
 * injectRegister: 'auto' dalam vite.config.ts.
 * * Plugin tersebut akan memasukkan skrip pendaftaran SW secara automatik 
 * ke dalam fail HTML semasa proses build.
 */