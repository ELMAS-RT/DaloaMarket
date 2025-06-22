import React from 'react';
import { Share2 } from 'lucide-react';
import { useNativeFeatures } from '../../hooks/useNativeFeatures';
import { toast } from 'react-hot-toast';

interface NativeShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

const NativeShareButton: React.FC<NativeShareButtonProps> = ({
  title,
  text,
  url,
  className = ''
}) => {
  const { isNative, shareContent, vibrate } = useNativeFeatures();

  const handleShare = async () => {
    await vibrate();
    
    if (isNative) {
      try {
        await shareContent(title, text, url);
      } catch (error) {
        toast.error('Erreur lors du partage');
      }
    } else {
      // Fallback pour le web
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
        } catch (error) {
          // Utilisateur a annulé le partage
        }
      } else {
        // Copier dans le presse-papier
        const shareText = `${title}\n${text}${url ? `\n${url}` : ''}`;
        await navigator.clipboard.writeText(shareText);
        toast.success('Lien copié dans le presse-papier');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <Share2 className="h-5 w-5" />
      <span>Partager</span>
    </button>
  );
};

export default NativeShareButton;