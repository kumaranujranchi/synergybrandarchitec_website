import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Preload popup image
const POPUP_IMAGE_URL = "https://i.imgur.com/vLSb51Ym.jpg";
const preloadImage = new Image();
preloadImage.src = POPUP_IMAGE_URL;

interface PopupProps {
  delay?: number; // Delay in milliseconds before showing popup
}

export default function Popup({ delay = 10000 }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown in this session
    const hasShown = sessionStorage.getItem('popupShown');
    
    if (hasShown === 'true') {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasBeenShown(true);
      sessionStorage.setItem('popupShown', 'true');
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative mx-4 overflow-hidden">
        <button 
          onClick={closePopup}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/90 text-gray-700 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-0">
          <img 
            src={POPUP_IMAGE_URL}
            alt="Special Offer" 
            loading="eager"
            decoding="async"
            className="w-full h-auto"
          />
        </div>
        
        <div className="p-4 text-center">
          <a 
            href="https://rzp.io/rzp/7uCrzBX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-3 px-4 rounded-lg font-medium transition-all"
          >
            Book Now - Pay ₹2,000 Advance
          </a>
          <button 
            onClick={closePopup} 
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}