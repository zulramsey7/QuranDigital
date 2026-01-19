import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Tunjukkan prompt pemasangan
    deferredPrompt.prompt();

    // Tunggu jawapan pengguna
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Sembunyikan notifikasi selepas pilihan dibuat
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg flex justify-between items-center z-[9999] animate-bounce">
      <span className="font-bold text-sm">Pasang QuranDigital 2025 di telefon anda!</span>
      <button 
        onClick={handleInstallClick}
        className="bg-black text-white px-4 py-2 rounded-md text-xs font-bold"
      >
        INSTALL
      </button>
    </div>
  );
};

export default InstallPWA;
