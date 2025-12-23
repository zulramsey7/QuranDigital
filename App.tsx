import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import QuranPage from "./pages/QuranPage";
import QiblaPage from "./pages/QiblaPage";
import DoaPage from "./pages/DoaPage";
import TasbihPage from "./pages/TasbihPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import TahlilRingkas from "./pages/TahlilRingkas";
import TahlilLengkap from "./pages/TahlilLengkap";
import YasinPage from "./pages/Yasin"; 
import SirahPage from "./pages/Sirah"; // <--- TAMBAH INI

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Laluan Utama */}
            <Route path="/" element={<HomePage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/qibla" element={<QiblaPage />} />
            
            {/* Laluan /kiblat juga jika HomePage guna /kiblat */}
            <Route path="/kiblat" element={<QiblaPage />} /> 
            <Route path="/doa" element={<DoaPage />} />
            <Route path="/tasbih" element={<TasbihPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/kiblat" element={<QiblaPage />} />
            
            {/* Laluan Tahlil, Yasin & Sirah */}
            <Route path="/yasin" element={<YasinPage />} />
            <Route path="/tahlil-ringkas" element={<TahlilRingkas />} />
            <Route path="/tahlil-lengkap" element={<TahlilLengkap />} />
            <Route path="/sirah" element={<SirahPage />} /> {/* <--- TAMBAH INI */}
            
            {/* NotFound MESTI di bawah sekali */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;