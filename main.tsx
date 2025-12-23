import { createRoot } from "react-dom/client";
import App from "./App"; // Kita buang .tsx untuk biarkan Vite uruskan resolusi fail
import "./index.css";

// Menambah sedikit semakan keselamatan untuk elemen root
const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemen root tidak dijumpai. Sila pastikan index.html mempunyai <div id='root'></div>");
}

const root = createRoot(container);
root.render(<App />);