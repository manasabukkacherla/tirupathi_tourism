import React, { useEffect } from 'react';
import { X, Bus, Car, CalendarDays, Lightbulb, MapPin } from 'lucide-react';
import { PlaceData } from '../data/placesData';

interface TravelGuideModalProps {
  spot: PlaceData;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({ spot, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const openInGoogleMaps = () => {
    const query = encodeURIComponent(`${spot.name}, Tirupati, Andhra Pradesh, India`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1F1F]/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#F9F6F1] to-[#245A38]/10 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-[#DAA520]/50 relative flex flex-col">

        {/* Decorative Background Circles */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#DAA520] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-[#245A38] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#800000] rounded-full"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-[#F9F6F1]/90 hover:bg-[#F9F6F1] text-[#1F1F1F] hover:text-[#800000] p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-[#DAA520]/30"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Image with Text Overlay */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={spot.images[0]}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#F9F6F1]">
              <h2 className="text-4xl font-bold mb-2 font-serif text-[#DAA520]">{spot.name}</h2>
              <p className="text-lg opacity-90">{spot.tagline}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">

            {/* Google Maps Button */}
            <div className="mb-8 text-center">
              <button
                onClick={openInGoogleMaps}
                className="inline-flex items-center space-x-3 bg-[#245A38] hover:bg-[#4CAF50] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border-2 border-[#DAA520]"
              >
                <MapPin className="h-6 w-6 group-hover:animate-bounce" />
                <div className="text-left">
                  <div>Open in Google Maps</div>
                  <div className="text-sm opacity-90">Get turn-by-turn directions to {spot.name}</div>
                </div>
              </button>
            </div>
            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4 font-serif">Overview</h3>
              <p className="text-[#333] leading-relaxed text-lg">
                {spot.description}
              </p>
            </div>


            {/* Travel Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {/* By Car */}
              <div className="bg-gradient-to-br from-[#245A38]/10 to-[#245A38]/20 p-6 rounded-2xl border border-[#245A38]/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#245A38] p-3 rounded-full">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#245A38] font-serif">By Car</h3>
                </div>
                <div className="space-y-2 text-[#1F1F1F]">
                  <p><strong>Distance:</strong> {spot.distanceByCar} from Tirupati</p>
                  <p><strong>Time:</strong> {spot.carTime}</p>
                  <p><strong>Fare:</strong> {spot.carFare}</p>
                </div>
              </div>

              {/* By Bus */}
              <div className="bg-gradient-to-br from-[#4CAF50]/10 to-[#4CAF50]/20 p-6 rounded-2xl border border-[#4CAF50]/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#4CAF50] p-3 rounded-full">
                    <Bus className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#245A38] font-serif">By Bus</h3>
                </div>
                <div className="space-y-2 text-[#1F1F1F]">
                  <p><strong>Route:</strong> {spot.bus.route}</p>
                  <p><strong>Stop:</strong> {spot.bus.stop}</p>
                  <p><strong>Fare:</strong> {spot.bus.fare}</p>
                  <p><strong>Time:</strong> {spot.bus.time}</p>
                </div>
              </div>

              {/* Best Time */}
              <div className="bg-gradient-to-br from-[#800000]/10 to-[#800000]/20 p-6 rounded-2xl border border-[#800000]/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#800000] p-3 rounded-full">
                    <CalendarDays className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#800000] font-serif">Best Time to Visit</h3>
                </div>
                <p><strong>Season:</strong> {spot.bestTime}</p>
              </div>

              {/* Travel Tips */}
              <div className="bg-gradient-to-br from-[#DAA520]/10 to-[#DAA520]/20 p-6 rounded-2xl border border-[#DAA520]/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#DAA520] p-3 rounded-full">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#DAA520] font-serif">Travel Tips</h3>
                </div>
                <p><strong>Nearest:</strong> {spot.nearest}</p>
                <ul className="list-disc list-inside mt-2 text-[#1F1F1F]">
                  <li>Carry water and snacks</li>
                  <li>Wear comfortable footwear</li>
                  <li>Start early to avoid crowds</li>
                </ul>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4 font-serif">What Makes It Special</h3>
              <div className="flex flex-wrap gap-3">
                {spot.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-[#DAA520]/20 to-[#245A38]/20 text-[#245A38] px-4 py-2 rounded-full font-semibold border border-[#DAA520]/40"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Closing Quote */}
            <div className="text-center p-6 bg-gradient-to-r from-[#DAA520]/10 to-[#245A38]/10 rounded-2xl border border-[#DAA520]/30">
              <p className="text-lg text-[#1F1F1F] font-medium italic">
                "Every journey begins with a single step. Let {spot.name} be your next adventure."
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuideModal;
