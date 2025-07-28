import React, { useState, useEffect } from 'react';

const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#800000] via-[#8B0000] to-[#245A38] animate-gradient-shimmer">
        {/* Subtle Tirupati Hills Outline */}
        <div className="absolute inset-0 opacity-25">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-rotate-slow"
            style={{ filter: 'blur(1px)' }}
          >
            {/* Hills Outline */}
            <path
              d="M10,70 Q20,50 30,55 Q40,45 50,50 Q60,40 70,45 Q80,35 90,40 L90,80 L10,80 Z"
              fill="none"
              stroke="rgba(218, 165, 32, 0.3)"
              strokeWidth="0.5"
            />
            <path
              d="M15,75 Q25,60 35,65 Q45,55 55,60 Q65,50 75,55 Q85,45 95,50"
              fill="none"
              stroke="rgba(218, 165, 32, 0.2)"
              strokeWidth="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* Temple Bell Icon */}
        <div className="mb-8 animate-bell-bounce">
          <div className="relative">
            {/* Bell SVG */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="text-[#DAA520] drop-shadow-2xl"
            >
              {/* Bell Body */}
              <path
                d="M50 20 Q35 25 35 45 Q35 65 50 70 Q65 65 65 45 Q65 25 50 20 Z"
                fill="currentColor"
                opacity="0.9"
              />
              {/* Bell Top */}
              <rect x="47" y="15" width="6" height="8" rx="3" fill="currentColor" />
              {/* Bell Clapper */}
              <circle cx="50" cy="60" r="3" fill="#8B0000" className="animate-bell-clapper" />
              {/* Decorative Lines */}
              <path
                d="M40 35 Q50 33 60 35 M40 45 Q50 43 60 45 M40 55 Q50 53 60 55"
                stroke="#8B0000"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />
            </svg>
            
            {/* Bell Glow Effect */}
            <div className="absolute inset-0 w-20 h-20 bg-[#DAA520] rounded-full opacity-20 animate-pulse blur-xl"></div>
          </div>
        </div>

        {/* Sanskrit Text */}
        <div className="mb-12 animate-text-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-[#DAA520] mb-4 animate-golden-glow font-serif tracking-wider">
            ॐ नमो वेंकटेशाय
          </h1>
          <p className="text-xl md:text-2xl text-[#F5DEB3] opacity-90 font-serif tracking-wide">
            Om Namo Venkatesaya
          </p>
        </div>

        {/* Brand Name */}
        <div className="animate-brand-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5DEB3] mb-2 font-serif">
            Tirupati <span className="text-[#DAA520]">Beyond</span>
          </h2>
          <p className="text-lg text-[#F5DEB3] opacity-80">
            Experience the Sacred Journey...
          </p>
        </div>
      </div>

      {/* Diya Light Effects */}
      <div className="absolute bottom-8 left-8 animate-diya-flicker-left">
        <svg width="40" height="40" viewBox="0 0 100 100" className="text-[#DAA520]">
          {/* Diya Base */}
          <ellipse cx="50" cy="75" rx="25" ry="10" fill="currentColor" opacity="0.8"/>
          {/* Diya Bowl */}
          <path d="M30 65 Q30 55 50 55 Q70 55 70 65 Q70 70 50 72 Q30 70 30 65 Z" fill="currentColor"/>
          {/* Wick */}
          <rect x="65" y="60" width="4" height="8" rx="2" fill="currentColor"/>
          {/* Flame */}
          <path d="M67 50 Q69 40 67 30 Q65 40 67 50 Z" fill="#FF6B35" className="animate-flame-flicker"/>
        </svg>
      </div>

      <div className="absolute bottom-8 right-8 animate-diya-flicker-right">
        <svg width="40" height="40" viewBox="0 0 100 100" className="text-[#DAA520]">
          {/* Diya Base */}
          <ellipse cx="50" cy="75" rx="25" ry="10" fill="currentColor" opacity="0.8"/>
          {/* Diya Bowl */}
          <path d="M30 65 Q30 55 50 55 Q70 55 70 65 Q70 70 50 72 Q30 70 30 65 Z" fill="currentColor"/>
          {/* Wick */}
          <rect x="31" y="60" width="4" height="8" rx="2" fill="currentColor"/>
          {/* Flame */}
          <path d="M33 50 Q35 40 33 30 Q31 40 33 50 Z" fill="#FF6B35" className="animate-flame-flicker"/>
        </svg>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bell-bounce {
          0% { 
            opacity: 0; 
            transform: translateY(-30px) scale(0.8); 
          }
          0.5s { 
            opacity: 1; 
            transform: translateY(0px) scale(1.1); 
          }
          1s { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
        
        @keyframes bell-clapper {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(-1px); }
          75% { transform: translateX(1px); }
        }
        
        @keyframes text-fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          0.5s { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          1s { 
            opacity: 1; 
            transform: translateY(0px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        
        @keyframes golden-glow {
          0%, 100% { 
            text-shadow: 
              0 0 20px #DAA520, 
              0 0 30px #DAA520, 
              0 0 40px #DAA520;
            transform: scale(1);
          }
          50% { 
            text-shadow: 
              0 0 30px #DAA520, 
              0 0 40px #DAA520, 
              0 0 50px #DAA520;
            transform: scale(1.05);
          }
        }
        
        @keyframes brand-fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          1s { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          1.5s { 
            opacity: 1; 
            transform: translateY(0px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        
        @keyframes diya-flicker-left {
          0% { opacity: 0; }
          1s { opacity: 0; }
          1.5s { opacity: 0.8; }
          2s { opacity: 1; }
          2.3s { opacity: 0.8; }
          2.6s { opacity: 1; }
          2.9s { opacity: 0.8; }
          3.2s { opacity: 1; }
          100% { opacity: 1; }
        }
        
        @keyframes diya-flicker-right {
          0% { opacity: 0; }
          1.2s { opacity: 0; }
          1.7s { opacity: 0.8; }
          2.1s { opacity: 1; }
          2.4s { opacity: 0.8; }
          2.7s { opacity: 1; }
          3s { opacity: 0.8; }
          3.3s { opacity: 1; }
          100% { opacity: 1; }
        }
        
        @keyframes flame-flicker {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.1) rotate(-2deg); 
          }
          50% { 
            opacity: 0.9; 
            transform: scale(0.9) rotate(1deg); 
          }
          75% { 
            opacity: 0.8; 
            transform: scale(1.05) rotate(-1deg); 
          }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient-shimmer {
          background-size: 200% 200%;
          animation: gradient-shimmer 4s ease-in-out infinite;
        }
        
        .animate-bell-bounce {
          animation: bell-bounce 3.5s ease-out;
        }
        
        .animate-bell-clapper {
          animation: bell-clapper 0.8s ease-in-out infinite;
        }
        
        .animate-text-fade-in {
          animation: text-fade-in 3.5s ease-out;
        }
        
        .animate-golden-glow {
          animation: golden-glow 2s ease-in-out infinite;
        }
        
        .animate-brand-fade-in {
          animation: brand-fade-in 3.5s ease-out;
        }
        
        .animate-diya-flicker-left {
          animation: diya-flicker-left 3.5s ease-out;
        }
        
        .animate-diya-flicker-right {
          animation: diya-flicker-right 3.5s ease-out;
        }
        
        .animate-flame-flicker {
          animation: flame-flicker 0.6s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;