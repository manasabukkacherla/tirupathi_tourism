import React, { useState, useEffect } from 'react';
import { MapPin, Car, Bus, Navigation, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { placesData } from '../data/placesData';


const InteractiveMapSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedSpots, setSavedSpots] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.map-scroll-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openInGoogleMaps = (spotName: string) => {
    const query = encodeURIComponent(`${spotName}, Tirupati, Andhra Pradesh, India`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  const toggleSaveSpot = (index: number) => {
    const newSavedSpots = new Set(savedSpots);
    if (newSavedSpots.has(index)) {
      newSavedSpots.delete(index);
    } else {
      newSavedSpots.add(index);
    }
    setSavedSpots(newSavedSpots);
  };

  const shareSpot = (spotName: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${spotName}`,
        text: `Discover this amazing place in Tirupati: ${spotName}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out ${spotName} in Tirupati! ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = () => {
    const currentSpot = mapScrollData[activeSection];
    setCurrentImageIndex((prev) => (prev + 1) % currentSpot.images.length);
  };

  const prevImage = () => {
    const currentSpot = mapScrollData[activeSection];
    setCurrentImageIndex((prev) => (prev - 1 + currentSpot.images.length) % currentSpot.images.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#F9F6F1] to-[#245A38]/10 overflow-hidden">
      {/* Fixed Map Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-full bg-gradient-to-br from-[#245A38]/20 to-[#DAA520]/20">
          {/* Stylized Map SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full opacity-20"
            style={{
              transform: `translate(${-activeSection * 5}px, ${-activeSection * 3}px) scale(${1 + activeSection * 0.05})`,
              transition: 'transform 0.8s ease-out'
            }}
          >
            {/* Map Outline */}
            <path
              d="M20,20 Q30,15 40,20 L60,25 Q70,20 80,30 L85,50 Q80,70 70,75 L50,80 Q30,85 20,70 Z"
              fill="rgba(36, 90, 56, 0.1)"
              stroke="rgba(36, 90, 56, 0.3)"
              strokeWidth="0.5"
            />
            
            {/* Rivers/Roads */}
            <path
              d="M25,30 Q40,35 55,40 Q70,45 80,55"
              fill="none"
              stroke="rgba(218, 165, 32, 0.4)"
              strokeWidth="0.8"
            />
            <path
              d="M30,60 Q45,65 60,70"
              fill="none"
              stroke="rgba(218, 165, 32, 0.4)"
              strokeWidth="0.6"
            />

            {/* Location Pins */}
            {mapScrollData.map((spot, index) => (
              <g key={index}>
                {/* Connection Line to Tirupati */}
                <line
                  x1="50"
                  y1="50"
                  x2={spot.position.x}
                  y2={spot.position.y}
                  stroke={index === activeSection ? "#DAA520" : "rgba(36, 90, 56, 0.3)"}
                  strokeWidth={index === activeSection ? "0.5" : "0.2"}
                  strokeDasharray={index === activeSection ? "none" : "2,2"}
                  className="transition-all duration-500"
                />
                
                {/* Location Pin */}
                <circle
                  cx={spot.position.x}
                  cy={spot.position.y}
                  r={index === activeSection ? "3" : "1.5"}
                  fill={index === activeSection ? "#DAA520" : "#245A38"}
                  className="transition-all duration-500"
                >
                  {index === activeSection && (
                    <animate
                      attributeName="r"
                      values="3;4;3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                
                {/* Spotlight Effect */}
                {index === activeSection && (
                  <circle
                    cx={spot.position.x}
                    cy={spot.position.y}
                    r="8"
                    fill="none"
                    stroke="#DAA520"
                    strokeWidth="0.5"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.2;0.6"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Tirupati Center */}
            <circle cx="50" cy="50" r="2" fill="#800000" />
            <text x="50" y="45" textAnchor="middle" fontSize="2" fill="#800000" fontWeight="bold">
              Tirupati
            </text>
          </svg>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {placesData.map((spot, index) => (
          <div
            key={index}
            className="map-scroll-section min-h-screen flex items-center py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content Panel */}
                <div className="bg-[#F9F6F1]/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#DAA520]/50">
                  <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-3 font-serif">
                      {spot.name}
                    </h2>
                    <p className="text-xl text-[#DAA520] font-medium italic">
                      {spot.tagline}
                    </p>
                  </div>

                  {/* Travel Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Car Info */}
                    <div className="bg-[#245A38]/10 p-4 rounded-xl border border-[#245A38]/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Car className="h-5 w-5 text-[#245A38]" />
                        <span className="font-semibold text-[#245A38]">By Car</span>
                      </div>
                      <p className="text-[#1F1F1F] text-sm">
                        <span className="font-medium">{spot.distanceByCar}</span> • {spot.carTime}
                      </p>
                      <p className="text-[#1F1F1F]/70 text-xs mt-1">Fare: {spot.carFare}</p>
                    </div>

                    {/* Bus Info */}
                    <div className="bg-[#4CAF50]/10 p-4 rounded-xl border border-[#4CAF50]/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bus className="h-5 w-5 text-[#4CAF50]" />
                        <span className="font-semibold text-[#245A38]">By Bus</span>
                      </div>
                      <p className="text-[#1F1F1F] text-sm">
                        Route {spot.bus.route} • {spot.bus.fare} • {spot.bus.time}
                      </p>
                      <p className="text-[#1F1F1F]/70 text-xs mt-1">Stop: {spot.bus.stop}</p>
                    </div>
                  </div>

                  {/* Nearest Spot */}
                  <div className="bg-[#800000]/10 p-4 rounded-xl border border-[#800000]/30 mb-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="h-4 w-4 text-[#800000]" />
                      <span className="font-semibold text-[#800000] text-sm">Nearest Attraction</span>
                    </div>
                    <p className="text-[#1F1F1F] text-sm">{spot.nearest}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => openInGoogleMaps(spot.name)}
                      className="flex items-center space-x-2 bg-[#245A38] hover:bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-[#DAA520]/30"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Route</span>
                    </button>
                    <button
                      onClick={() => toggleSaveSpot(index)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                        savedSpots.has(index)
                          ? 'bg-[#800000]/20 text-[#800000] border border-[#800000]/50'
                          : 'bg-[#F9F6F1] text-[#1F1F1F] border border-[#DAA520]/30 hover:bg-[#DAA520]/10'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${savedSpots.has(index) ? 'fill-current' : ''}`} />
                      <span>{savedSpots.has(index) ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => shareSpot(spot.name)}
                      className="flex items-center space-x-2 bg-[#245A38]/20 text-[#245A38] px-4 py-2 rounded-xl font-semibold border border-[#245A38]/30 hover:bg-[#245A38]/30 transition-all duration-200 hover:scale-105"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={spot.images[currentImageIndex]}
                      alt={spot.name}
                      className="w-full h-96 object-cover transition-all duration-500"
                    />
                    
                    {/* Gallery Navigation */}
                    {spot.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {spot.images.length}
                    </div>
                  </div>

                  {/* Floating Info Card */}
                  <div className="absolute -bottom-6 left-6 right-6 bg-[#F9F6F1]/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-[#DAA520]/50">
                    <p className="text-center text-[#1F1F1F] font-medium">
                      Swipe through {spot.images.length} stunning photos of {spot.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteractiveMapSection;