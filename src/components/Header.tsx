import React from 'react';
import { MapPin, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F6F1]/95 backdrop-blur-sm shadow-sm border-b border-[#DAA520]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-[#DAA520]" />
            <span className="text-xl font-bold text-[#1F1F1F] font-serif">Tirupati <span className="text-[#245A38]">Beyond</span></span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-[#1F1F1F] hover:text-[#4CAF50] transition-colors font-medium">Home</a>
            <a href="#destinations" className="text-[#1F1F1F] hover:text-[#4CAF50] transition-colors font-medium">Destinations</a>
            <a href="#experiences" className="text-[#1F1F1F] hover:text-[#4CAF50] transition-colors font-medium">Experiences</a>
            <a href="#guide" className="text-[#1F1F1F] hover:text-[#4CAF50] transition-colors font-medium">Travel Guide</a>
          </nav>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#1F1F1F] hover:text-[#4CAF50] hover:bg-[#245A38]/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-[#F9F6F1] border-t border-[#DAA520]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-[#1F1F1F] hover:text-[#4CAF50] hover:bg-[#245A38]/10 rounded-md">Home</a>
            <a href="#destinations" className="block px-3 py-2 text-[#1F1F1F] hover:text-[#4CAF50] hover:bg-[#245A38]/10 rounded-md">Destinations</a>
            <a href="#experiences" className="block px-3 py-2 text-[#1F1F1F] hover:text-[#4CAF50] hover:bg-[#245A38]/10 rounded-md">Experiences</a>
            <a href="#guide" className="block px-3 py-2 text-[#1F1F1F] hover:text-[#4CAF50] hover:bg-[#245A38]/10 rounded-md">Travel Guide</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;