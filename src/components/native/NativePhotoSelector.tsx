import React, { useState } from 'react';
import { Camera, Image, Upload } from 'lucide-react';
import { useNativeFeatures } from '../../hooks/useNativeFeatures';
import { toast } from 'react-hot-toast';

interface NativePhotoSelectorProps {
  onPhotoSelected: (photoUri: string) => void;
  maxPhotos?: number;
  selectedPhotos?: string[];
}

const NativePhotoSelector: React.FC<NativePhotoSelectorProps> = ({
  onPhotoSelected,
  maxPhotos = 5,
  selectedPhotos = []
}) => {
  const { isNative, takePhoto, selectPhoto, vibrate } = useNativeFeatures();
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = async () => {
    if (selectedPhotos.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos autorisées`);
      return;
    }

    setIsLoading(true);
    await vibrate();
    
    try {
      const photo = await takePhoto();
      if (photo?.webPath) {
        onPhotoSelected(photo.webPath);
        toast.success('Photo prise avec succès');
      }
    } catch (error) {
      toast.error('Erreur lors de la prise de photo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPhoto = async () => {
    if (selectedPhotos.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos autorisées`);
      return;
    }

    setIsLoading(true);
    await vibrate();
    
    try {
      const photo = await selectPhoto();
      if (photo?.webPath) {
        onPhotoSelected(photo.webPath);
        toast.success('Photo sélectionnée avec succès');
      }
    } catch (error) {
      toast.error('Erreur lors de la sélection de photo');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isNative) {
    return null; // Utiliser le composant web standard
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleTakePhoto}
          disabled={isLoading || selectedPhotos.length >= maxPhotos}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="h-8 w-8 text-primary mb-2" />
          <span className="text-sm font-medium text-primary">
            Prendre une photo
          </span>
        </button>

        <button
          onClick={handleSelectPhoto}
          disabled={isLoading || selectedPhotos.length >= maxPhotos}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image className="h-8 w-8 text-primary mb-2" />
          <span className="text-sm font-medium text-primary">
            Galerie
          </span>
        </button>
      </div>

      {selectedPhotos.length > 0 && (
        <div className="text-sm text-grey-600 text-center">
          {selectedPhotos.length} / {maxPhotos} photos sélectionnées
        </div>
      )}

      {isLoading && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full">
            <Upload className="animate-spin h-4 w-4 text-primary mr-2" />
            <span className="text-sm text-primary">Traitement...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NativePhotoSelector;