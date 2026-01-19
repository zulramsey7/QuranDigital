import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { OfflineNotifier } from "@/components/OfflineNotifier";
import InstallPWA from "./InstallPWA";

// Lazy load all pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const QuranPage = lazy(() => import("./pages/QuranPage"));
const QiblaPage = lazy(() => import("./pages/QiblaPage"));
const DoaPage = lazy(() => import("./pages/DoaPage"));
const TasbihPage = lazy(() => import("./pages/TasbihPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TahlilRingkas = lazy(() => import("./pages/TahlilRingkas"));
const TahlilLengkap = lazy(() => import("./pages/TahlilLengkap"));
const YasinPage = lazy(() => import("./pages/Yasin"));
const SirahPage = lazy(() => import("./pages/Sirah"));
const MuzikPage = lazy(() => import("./pages/Muzik"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
); 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <BookmarkProvider>
          <ErrorBoundary>
            <TooltipProvider>
              <InstallPWA /> 
              <OfflineNotifier />
              
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quran" element={<QuranPage />} />
                    <Route path="/qibla" element={<QiblaPage />} />
                    <Route path="/kiblat" element={<QiblaPage />} /> 
                    <Route path="/doa" element={<DoaPage />} />
                    <Route path="/tasbih" element={<TasbihPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    
                    <Route path="/yasin" element={<YasinPage />} />
                    <Route path="/tahlil-ringkas" element={<TahlilRingkas />} />
                    <Route path="/tahlil-lengkap" element={<TahlilLengkap />} />
                    <Route path="/sirah" element={<SirahPage />} /> 
                    <Route path="/MUZIK" element={<MuzikPage />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </ErrorBoundary>
        </BookmarkProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
