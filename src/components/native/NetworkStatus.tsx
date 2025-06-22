import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNativeFeatures } from '../../hooks/useNativeFeatures';

const NetworkStatus: React.FC = () => {
  const { networkStatus, isNative } = useNativeFeatures();

  if (!isNative || !networkStatus) {
    return null;
  }

  if (networkStatus.connected) {
    return null; // Ne rien afficher si connecté
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-error-600 text-white p-2 z-50">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          Aucune connexion Internet
        </span>
      </div>
    </div>
  );
};

export default NetworkStatus;