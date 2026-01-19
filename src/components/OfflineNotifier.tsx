import { useOnline, useServiceWorkerRegistration } from '@/hooks/useServiceWorker';
import { AlertCircle, WifiOff, RotateCw } from 'lucide-react';

export function OfflineNotifier() {
  const isOnline = useOnline();
  const { updateAvailable, updateServiceWorker } = useServiceWorkerRegistration();

  if (!isOnline) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-600 text-white p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <WifiOff className="w-5 h-5" />
          <span className="text-sm font-medium">You're offline. Some features may not work.</span>
        </div>
      </div>
    );
  }

  if (updateAvailable) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">A new version is available!</span>
        </div>
        <button
          onClick={updateServiceWorker}
          className="flex items-center gap-2 px-3 py-1 bg-white text-blue-600 rounded font-medium hover:bg-gray-100 transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          Update
        </button>
      </div>
    );
  }

  return null;
}
