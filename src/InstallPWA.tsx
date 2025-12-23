import { useEffect, useState } from "react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Menghalang Chrome daripada menunjukkan prompt asal secara automatik
      e.preventDefault();
      setDeferredPrompt(e);
      // Tunjukkan butang atau notifikasi kita sendiri
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
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