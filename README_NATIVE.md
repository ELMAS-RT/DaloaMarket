# DaloaMarket - Application Native

## 🚀 Guide de développement mobile

### Prérequis

1. **Node.js** (version 18+)
2. **Android Studio** (pour Android)
3. **Xcode** (pour iOS, macOS uniquement)
4. **Capacitor CLI** (installé automatiquement)

### Installation et configuration

1. **Installer les dépendances**
```bash
npm install
```

2. **Construire l'application web**
```bash
npm run build
```

3. **Ajouter les plateformes natives**
```bash
# Android
npm run cap:add:android

# iOS (macOS uniquement)
npm run cap:add:ios
```

4. **Synchroniser les fichiers**
```bash
npm run cap:sync
```

### Développement

#### Android

1. **Ouvrir Android Studio**
```bash
npm run cap:open:android
```

2. **Développement en direct**
```bash
npm run android:dev
```

#### iOS

1. **Ouvrir Xcode**
```bash
npm run cap:open:ios
```

2. **Développement en direct**
```bash
npm run ios:dev
```

### Fonctionnalités natives intégrées

#### 📸 Appareil photo et galerie
- Prise de photos directement depuis l'app
- Sélection d'images depuis la galerie
- Optimisation automatique des images

#### 📍 Géolocalisation
- Détection automatique de la position
- Recherche d'articles à proximité

#### 📱 Fonctionnalités système
- Partage natif (articles, liens)
- Vibrations tactiles
- Notifications toast
- Gestion du clavier
- Barre de statut personnalisée

#### 🌐 Connectivité
- Détection de l'état réseau
- Mode hors ligne (à implémenter)

#### 💾 Stockage local
- Préférences utilisateur
- Cache des données

### Structure des fichiers natifs

```
src/
├── hooks/
│   └── useNativeFeatures.ts     # Hook principal pour les fonctionnalités natives
├── components/
│   └── native/
│       ├── NativePhotoSelector.tsx    # Sélecteur de photos natif
│       ├── NativeShareButton.tsx      # Bouton de partage natif
│       └── NetworkStatus.tsx          # Indicateur de statut réseau
```

### Configuration des permissions

#### Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />
```

#### iOS (`ios/App/App/Info.plist`)
```xml
<key>NSCameraUsageDescription</key>
<string>Cette app utilise l'appareil photo pour prendre des photos de vos articles à vendre.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Cette app accède à votre galerie photo pour sélectionner des images de vos articles.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Cette app utilise votre localisation pour vous aider à trouver des articles près de chez vous.</string>
```

### Scripts disponibles

```bash
# Développement web
npm run dev

# Construction pour mobile
npm run build:mobile

# Android
npm run cap:add:android
npm run cap:run:android
npm run cap:open:android
npm run android:dev

# iOS
npm run cap:add:ios
npm run cap:run:ios
npm run cap:open:ios
npm run ios:dev

# Synchronisation
npm run cap:sync
```

### Déploiement

#### Android (Google Play Store)
1. Générer un APK signé dans Android Studio
2. Suivre les guidelines de Google Play Store

#### iOS (App Store)
1. Archiver l'app dans Xcode
2. Uploader via App Store Connect

### Fonctionnalités à venir

- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Synchronisation en arrière-plan
- [ ] Authentification biométrique
- [ ] Deep linking
- [ ] Analytics natives

### Dépannage

#### Problèmes courants

1. **Erreur de build Android**
   - Vérifier que Android Studio est installé
   - Mettre à jour les SDK Android

2. **Erreur de build iOS**
   - Vérifier que Xcode est installé (macOS uniquement)
   - Mettre à jour les certificats de développement

3. **Problèmes de permissions**
   - Vérifier les permissions dans les fichiers de configuration
   - Tester sur un appareil physique

### Support

Pour toute question ou problème :
- Email : daloamarket@gmail.com
- WhatsApp : +225 07 88 00 08 31

---

**DaloaMarket** - Marketplace P2P de Daloa 🇨🇮