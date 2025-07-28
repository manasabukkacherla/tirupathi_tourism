import React, { useState } from 'react';
import { MapPin, Clock, Camera, Star } from 'lucide-react';
import TravelGuideModal from './TravelGuideModal';
import { placesData, PlaceData } from '../data/placesData';


const ExploreSpots: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<PlaceData | null>(null);

  return (
    <>
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#F9F6F1] to-[#245A38]/10 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-[#DAA520] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#245A38] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#800000] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-4 font-serif">
              Explore Hidden <span className="text-[#DAA520]">Spots</span>
            </h2>
            <p className="text-xl text-[#1F1F1F]/80 max-w-3xl mx-auto">
              Venture beyond the temple to discover Tirupati's best-kept secrets - from cascading waterfalls to ancient forts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placesData.map((spot) => (
              <div
                key={spot.id}
                className="bg-[#F9F6F1] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-[#DAA520]/20 hover:border-[#DAA520]/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={spot.images[0]}
                    alt={spot.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#F9F6F1]/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 border border-[#DAA520]/30">
                    <Star className="h-4 w-4 text-[#DAA520] fill-current" />
                    <span className="text-sm font-semibold">{spot.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#800000]/80 text-[#F9F6F1] px-3 py-1 rounded-full text-sm border border-[#DAA520]/30">
                    {spot.bestTime}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F1F1F] mb-2 font-serif">{spot.name}</h3>
                  <p className="text-[#1F1F1F]/70 mb-4 line-clamp-2">{spot.tagline}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-[#1F1F1F]/60">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{spot.distanceByCar}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[#1F1F1F]/60">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{spot.carTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {spot.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-[#DAA520]/20 text-[#245A38] px-2 py-1 rounded-full text-xs font-medium border border-[#DAA520]/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedSpot(spot)}
                      className="flex-1 bg-[#245A38] hover:bg-[#4CAF50] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 border border-[#DAA520]/30"
                    >
                      Travel Guide
                    </button>
                    <button className="bg-[#DAA520]/20 hover:bg-[#DAA520]/30 text-[#245A38] p-2 rounded-lg transition-colors duration-200 border border-[#DAA520]/30">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedSpot && (
        <TravelGuideModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </>
  );
};

export default ExploreSpots;