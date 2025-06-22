import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { SupabaseProvider } from './contexts/SupabaseContext.tsx';
import './index.css';

// Import Capacitor
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

// Configuration native
const initializeApp = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Configuration de la barre de statut
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#FF7F00' });
      
      // Masquer le splash screen après l'initialisation
      await SplashScreen.hide();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation native:', error);
    }
  }
};

// Initialiser l'app
initializeApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <App />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#1F2937',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);