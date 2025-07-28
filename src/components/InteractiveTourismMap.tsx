import React, { useState } from 'react';
import { MapPin, Car, Bus, Clock, Navigation, Heart, Share2, X, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { placesData, PlaceData } from '../data/placesData';
import { generateRouteMapPDF } from '../utils/pdfGenerator';

// Category emoji mapping
const categoryEmojis = {
  'Waterfalls': '🏞️',
  'Heritage': '🏛️',
  'Wildlife': '🦌'
};

const InteractiveTourismMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<PlaceData | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedSpots, setSavedSpots] = useState<Set<number>>(new Set());
  const [visitedSpots, setVisitedSpots] = useState<Set<number>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Waterfalls', 'Heritage', 'Wildlife'];

  const filteredLocations = placesData.filter(location => {
    const matchesCategory = filterCategory === 'All' || location.category === filterCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openInGoogleMaps = (locationName: string) => {
    const query = encodeURIComponent(`${locationName}, Tirupati, Andhra Pradesh, India`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  const toggleSaveSpot = (id: number) => {
    const newSavedSpots = new Set(savedSpots);
    if (newSavedSpots.has(id)) {
      newSavedSpots.delete(id);
    } else {
      newSavedSpots.add(id);
    }
    setSavedSpots(newSavedSpots);
  };

  const markAsVisited = (id: number) => {
    const newVisitedSpots = new Set(visitedSpots);
    newVisitedSpots.add(id);
    setVisitedSpots(newVisitedSpots);
  };

  const shareSpot = (locationName: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${locationName}`,
        text: `Discover this amazing place in Tirupati: ${locationName}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out ${locationName} in Tirupati! ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedLocation.images.length);
    }
  };

  const prevImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedLocation.images.length) % selectedLocation.images.length);
    }
  };

  const handleLocationClick = (location: typeof interactiveMapData[0]) => {
    setSelectedLocation(location);
    setCurrentImageIndex(0);
  };

  const handleNearestSpotClick = (nearestSpotName: string) => {
    const nearestLocation = placesData.find(loc => loc.name.includes(nearestSpotName.split(' –')[0]));
    if (nearestLocation) {
      setSelectedLocation(nearestLocation);
      setCurrentImageIndex(0);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F9F6F1] via-[#245A38]/5 to-[#DAA520]/10 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1F1F1F] mb-4 font-serif">
            Explore <span className="text-[#DAA520]">Tirupati</span> District
          </h2>
          <p className="text-xl text-[#1F1F1F]/80 mb-8 max-w-3xl mx-auto">
            Discover hidden gems, sacred temples, pristine waterfalls, and wildlife sanctuaries through our interactive map
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#1F1F1F]/60" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-80 rounded-full border border-[#DAA520]/30 focus:ring-2 focus:ring-[#245A38] focus:border-transparent bg-[#F9F6F1]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-[#1F1F1F]/60" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 rounded-full border border-[#DAA520]/30 focus:ring-2 focus:ring-[#245A38] focus:border-transparent bg-[#F9F6F1]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#F9F6F1] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#DAA520]/50">
          {/* Custom Stylized Map */}
          <div className="relative h-96 md:h-[600px] bg-gradient-to-br from-[#245A38]/20 via-[#F9F6F1] to-[#DAA520]/20">
            {/* Map SVG Background */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            >
              {/* District Outline */}
              <path
                d="M15,20 Q25,15 35,18 L45,20 Q55,18 65,22 L75,25 Q85,20 90,30 L92,40 Q90,50 88,60 L85,70 Q80,80 70,85 L60,88 Q50,90 40,88 L30,85 Q20,80 15,70 L12,60 Q10,50 12,40 L15,30 Z"
                fill="rgba(36, 90, 56, 0.1)"
                stroke="rgba(36, 90, 56, 0.3)"
                strokeWidth="0.5"
              />
              
              {/* Rivers and Roads */}
              <path
                d="M20,35 Q30,40 40,42 Q50,44 60,46 Q70,48 80,52"
                fill="none"
                stroke="rgba(218, 165, 32, 0.4)"
                strokeWidth="0.8"
              />
              <path
                d="M25,60 Q35,65 45,67 Q55,69 65,72"
                fill="none"
                stroke="rgba(218, 165, 32, 0.4)"
                strokeWidth="0.6"
              />
              <path
                d="M40,25 Q45,35 50,45 Q55,55 60,65"
                fill="none"
                stroke="rgba(128, 0, 0, 0.3)"
                strokeWidth="0.4"
              />

              {/* Tirupati Center */}
              <circle cx="50" cy="50" r="2.5" fill="#800000" />
              <text x="50" y="45" textAnchor="middle" fontSize="2.5" fill="#800000" fontWeight="bold">
                Tirupati
              </text>
            </svg>

            {/* Location Pointers */}
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`
                }}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => handleLocationClick(location)}
              >
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-[#DAA520] opacity-30 animate-ping"></div>
                
                {/* Main Pointer */}
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 transform ${
                  hoveredLocation === location.id ? 'scale-125 shadow-2xl' : 'scale-100 shadow-lg'
                } ${visitedSpots.has(location.id) ? 'bg-[#4CAF50]' : 'bg-gradient-to-br from-[#DAA520] to-[#245A38]'}`}>
                  <span className="animate-bounce">{categoryEmojis[location.category as keyof typeof categoryEmojis]}</span>
                  
                  {/* Visited Badge */}
                  {visitedSpots.has(location.id) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4CAF50] rounded-full flex items-center justify-center border border-[#F9F6F1]">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                {/* Hover Tooltip */}
                {hoveredLocation === location.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#DAA520] text-[#1F1F1F] text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap animate-fade-in border border-[#245A38]">
                    {location.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#DAA520]"></div>
                  </div>
                )}

                {/* Connection Line to Tirupati */}
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: `${Math.abs(location.position.x - 50) * 6}px`,
                    height: `${Math.abs(location.position.y - 50) * 6}px`,
                    transform: `translate(-50%, -50%) translate(${(50 - location.position.x) * 3}px, ${(50 - location.position.y) * 3}px)`
                  }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={location.position.x > 50 ? "0%" : "100%"}
                    y2={location.position.y > 50 ? "0%" : "100%"}
                    stroke="rgba(218, 165, 32, 0.6)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1F1F]/60 backdrop-blur-sm">
          <div className="bg-[#F9F6F1] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up border-2 border-[#DAA520]/50">
            {/* Close Button */}
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-6 right-6 z-10 bg-[#F9F6F1]/90 hover:bg-[#F9F6F1] text-[#1F1F1F] hover:text-[#800000] p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-[#DAA520]/30"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Image Gallery */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedLocation.images[currentImageIndex]}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Gallery Navigation */}
                {selectedLocation.images.length > 1 && (
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
                  {currentImageIndex + 1} / {selectedLocation.images.length}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 text-[#F9F6F1]">
                  <h3 className="text-3xl font-bold mb-2 font-serif text-[#DAA520]">{selectedLocation.name}</h3>
                  <p className="text-lg opacity-90">{selectedLocation.tagline}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Distance Info */}
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-[#DAA520]/20 text-[#245A38] px-4 py-2 rounded-full font-semibold border border-[#DAA520]/30">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedLocation.distance} from Tirupati</span>
                  </div>
                </div>

                {/* Travel Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Private Cab */}
                  <div className="bg-gradient-to-br from-[#245A38]/10 to-[#245A38]/20 p-6 rounded-2xl border border-[#245A38]/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-[#245A38] p-3 rounded-full">
                        <Car className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-[#245A38] font-serif">Private Cab / Auto</h4>
                    </div>
                    <div className="space-y-2 text-[#1F1F1F]">
                      <p className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">Time:</span>
                        <span>{selectedLocation.carTime}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="font-semibold">Fare:</span>
                        <span>{selectedLocation.carFare}</span>
                      </p>
                    </div>
                  </div>

                  {/* Public Bus */}
                  <div className="bg-gradient-to-br from-[#4CAF50]/10 to-[#4CAF50]/20 p-6 rounded-2xl border border-[#4CAF50]/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-[#4CAF50] p-3 rounded-full">
                        <Bus className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-[#245A38] font-serif">Public Bus</h4>
                    </div>
                    <div className="space-y-2 text-[#1F1F1F]">
                      <p className="flex items-center space-x-2">
                        <span className="font-semibold">Route:</span>
                        <span>{selectedLocation.bus.route}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="font-semibold">Stop:</span>
                        <span>{selectedLocation.bus.stop}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="font-semibold">Fare:</span>
                        <span>{selectedLocation.bus.fare}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">Time:</span>
                        <span>{selectedLocation.bus.time}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nearest Spot */}
                <div className="bg-[#800000]/10 p-4 rounded-xl border border-[#800000]/30 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-[#800000] mb-1 font-serif">Nearest Next Spot</h5>
                      <p className="text-[#1F1F1F]">{selectedLocation.nearest}</p>
                    </div>
                    <button
                      onClick={() => handleNearestSpotClick(selectedLocation.nearest)}
                      className="bg-[#800000] hover:bg-[#800000]/80 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border border-[#DAA520]/30"
                    >
                      Visit Next
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => openInGoogleMaps(selectedLocation.name)}
                    className="flex items-center space-x-2 bg-[#245A38] hover:bg-[#4CAF50] text-white px-6 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#DAA520]"
                  >
                    <Navigation className="h-5 w-5" />
                    <span>View Route</span>
                  </button>
                  <button
                    onClick={() => toggleSaveSpot(selectedLocation.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                      savedSpots.has(selectedLocation.id)
                        ? 'bg-[#800000]/20 text-[#800000] border-2 border-[#800000]/50'
                        : 'bg-[#F9F6F1] text-[#1F1F1F] border-2 border-[#DAA520]/30 hover:bg-[#DAA520]/10'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedSpots.has(selectedLocation.id) ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => shareSpot(selectedLocation.name)}
                    className="flex items-center space-x-2 bg-[#245A38]/20 text-[#245A38] px-6 py-3 rounded-2xl font-semibold text-lg border-2 border-[#245A38]/30 hover:bg-[#245A38]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => markAsVisited(selectedLocation.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                      visitedSpots.has(selectedLocation.id)
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50] border-2 border-[#4CAF50]/50'
                        : 'bg-[#DAA520]/20 text-[#DAA520] border-2 border-[#DAA520]/30 hover:bg-[#DAA520]/30'
                    }`}
                  >
                    <span>{visitedSpots.has(selectedLocation.id) ? '✓ Visited' : 'Mark as Visited'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#DAA520]/10 to-[#245A38]/10 rounded-3xl p-12 border-2 border-[#DAA520]/50 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] mb-4 font-serif">
              🌐 Ready to Explore Tirupati?
            </h3>
            <p className="text-xl text-[#1F1F1F]/80 mb-8">
              Plan your perfect journey through the spiritual and natural wonders of Tirupati District
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#245A38] hover:bg-[#4CAF50] text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#DAA520]">
                📍 Plan Your Trail →
              </button>
              <button className="bg-[#DAA520] hover:bg-[#DAA520]/80 text-[#1F1F1F] px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#245A38]">
                <span onClick={() => generateRouteMapPDF()}>📥 Download Tourist Route Map PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default InteractiveTourismMap;