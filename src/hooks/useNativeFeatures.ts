import { useState, useEffect } from 'react';
import { 
  Camera, 
  CameraResultType, 
  CameraSource,
  Photo 
} from '@capacitor/camera';
import { 
  Geolocation, 
  Position 
} from '@capacitor/geolocation';
import { 
  Share 
} from '@capacitor/share';
import { 
  Haptics, 
  ImpactStyle 
} from '@capacitor/haptics';
import { 
  StatusBar, 
  Style 
} from '@capacitor/status-bar';
import { 
  Keyboard 
} from '@capacitor/keyboard';
import { 
  Network 
} from '@capacitor/network';
import { 
  Device 
} from '@capacitor/device';
import { 
  App 
} from '@capacitor/app';
import { 
  Preferences 
} from '@capacitor/preferences';
import { 
  Toast 
} from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';

export const useNativeFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    
    // Initialiser les fonctionnalités natives
    if (Capacitor.isNativePlatform()) {
      initializeNativeFeatures();
    }
  }, []);

  const initializeNativeFeatures = async () => {
    try {
      // Configuration de la barre de statut
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#FF7F00' });

      // Obtenir les informations de l'appareil
      const info = await Device.getInfo();
      setDeviceInfo(info);

      // Surveiller le statut réseau
      const status = await Network.getStatus();
      setNetworkStatus(status);

      Network.addListener('networkStatusChange', (status) => {
        setNetworkStatus(status);
      });

      // Gérer les événements de l'app
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });

      App.addListener('appUrlOpen', (event) => {
        console.log('App opened with URL:', event);
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation des fonctionnalités natives:', error);
    }
  };

  // Fonction pour prendre une photo
  const takePhoto = async (): Promise<Photo | null> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      return image;
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
      return null;
    }
  };

  // Fonction pour sélectionner une photo depuis la galerie
  const selectPhoto = async (): Promise<Photo | null> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
      return image;
    } catch (error) {
      console.error('Erreur lors de la sélection de photo:', error);
      return null;
    }
  };

  // Fonction pour obtenir la position
  const getCurrentPosition = async (): Promise<Position | null> => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (error) {
      console.error('Erreur lors de l\'obtention de la position:', error);
      return null;
    }
  };

  // Fonction pour partager du contenu
  const shareContent = async (title: string, text: string, url?: string) => {
    try {
      await Share.share({
        title,
        text,
        url,
        dialogTitle: 'Partager via'
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  // Fonction pour les vibrations
  const vibrate = async (style: ImpactStyle = ImpactStyle.Medium) => {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.error('Erreur lors de la vibration:', error);
    }
  };

  // Fonction pour afficher un toast
  const showToast = async (text: string, duration: 'short' | 'long' = 'short') => {
    try {
      await Toast.show({
        text,
        duration: duration,
        position: 'bottom'
      });
    } catch (error) {
      console.error('Erreur lors de l\'affichage du toast:', error);
    }
  };

  // Fonction pour sauvegarder des préférences
  const savePreference = async (key: string, value: string) => {
    try {
      await Preferences.set({ key, value });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  // Fonction pour récupérer des préférences
  const getPreference = async (key: string): Promise<string | null> => {
    try {
      const { value } = await Preferences.get({ key });
      return value;
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      return null;
    }
  };

  // Fonction pour masquer le clavier
  const hideKeyboard = async () => {
    try {
      await Keyboard.hide();
    } catch (error) {
      console.error('Erreur lors du masquage du clavier:', error);
    }
  };

  return {
    isNative,
    networkStatus,
    deviceInfo,
    takePhoto,
    selectPhoto,
    getCurrentPosition,
    shareContent,
    vibrate,
    showToast,
    savePreference,
    getPreference,
    hideKeyboard
  };
};