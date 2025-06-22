import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  User, 
  MessageSquare, 
  PlusCircle,
  Settings,
  LogOut,
  CreditCard,
  X
} from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { user, signOut, userProfile } = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end items-center">
      {/* Overlay animé */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer qui glisse du bas */}
      <div className="relative w-full max-w-md mx-auto bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl border-t border-primary-100 animate-slide-up overflow-hidden safe-area-bottom">
        {/* Header avec avatar, nom, bouton fermer */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-grey-100 bg-gradient-to-r from-primary-50 to-orange-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary font-bold text-xl">
              {userProfile?.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-grey-900 text-lg truncate">
                {userProfile?.full_name || 'Utilisateur'}
              </span>
              {user && <span className="text-sm text-grey-600 truncate">{user.email}</span>}
            </div>
          </div>
          <button onClick={onClose} className="touch-target rounded-full hover:bg-grey-100 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation principale */}
        <div className="grid grid-cols-5 gap-2 px-4 py-6">
          <button
            onClick={() => handleNavigation('/')} 
            className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all ${isActive('/') ? 'bg-primary text-white shadow-xl scale-105' : 'text-grey-600 hover:bg-grey-100'}`}
          >
            <Home className="h-7 w-7 mb-2" />
            <span className="text-xs font-semibold">Accueil</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/search')} 
            className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all ${isActive('/search') ? 'bg-primary text-white shadow-xl scale-105' : 'text-grey-600 hover:bg-grey-100'}`}
          >
            <Search className="h-7 w-7 mb-2" />
            <span className="text-xs font-semibold">Recherche</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/create-listing')}
            className="flex flex-col items-center justify-center py-4 px-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl scale-110 border-2 border-blue-300 transform hover:scale-105 transition-all"
          >
            <PlusCircle className="h-8 w-8 mb-2" />
            <span className="text-xs font-bold">Vendre</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/messages')} 
            className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all relative ${isActive('/messages') ? 'bg-primary text-white shadow-xl scale-105' : 'text-grey-600 hover:bg-grey-100'}`}
          >
            <MessageSquare className="h-7 w-7 mb-2" />
            <span className="text-xs font-semibold">Messages</span>
            {/* Badge notification */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-error-500 rounded-full border-2 border-white"></div>
          </button>
          
          <button
            onClick={() => handleNavigation('/profile')} 
            className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all ${isActive('/profile') ? 'bg-primary text-white shadow-xl scale-105' : 'text-grey-600 hover:bg-grey-100'}`}
          >
            <User className="h-7 w-7 mb-2" />
            <span className="text-xs font-semibold">Profil</span>
          </button>
        </div>

        {/* Actions rapides et infos utilisateur */}
        {user && (
          <div className="border-t border-grey-100 px-6 py-5 bg-gradient-to-r from-primary-50 to-orange-50">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleNavigation('/acheter-credits')}
                className="flex flex-col items-center py-3 px-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all"
              >
                <CreditCard className="h-5 w-5 text-blue-600 mb-2" />
                <span className="text-xs font-medium text-blue-700">Crédits</span>
              </button>
              
              <button
                onClick={() => handleNavigation('/settings')}
                className="flex flex-col items-center py-3 px-4 bg-gradient-to-br from-grey-50 to-grey-100 rounded-xl border border-grey-200 hover:from-grey-100 hover:to-grey-200 transition-all"
              >
                <Settings className="h-5 w-5 text-grey-600 mb-2" />
                <span className="text-xs font-medium text-grey-700">Réglages</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="flex flex-col items-center py-3 px-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:from-red-100 hover:to-red-200 transition-all"
              >
                <LogOut className="h-5 w-5 text-red-600 mb-2" />
                <span className="text-xs font-medium text-red-700">Sortir</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer liens rapides */}
        <div className="border-t border-grey-100 px-6 py-4 bg-white flex items-center justify-between text-sm text-grey-500">
          <button onClick={() => handleNavigation('/help')} className="hover:text-primary font-medium transition-colors">Aide</button>
          <button onClick={() => handleNavigation('/faq')} className="hover:text-primary font-medium transition-colors">FAQ</button>
          <button onClick={() => handleNavigation('/terms')} className="hover:text-primary font-medium transition-colors">Conditions</button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;