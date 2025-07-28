import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const destinations = [
  {
    name: "Talakona Waterfalls",
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Andhra's highest waterfall nestled in dense forests"
  },
  {
    name: "Chandragiri Fort",
    image: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Historic fort with panoramic valley views"
  },
  {
    name: "Srikalahasti Temple",
    image: "https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Ancient temple known for Vayu Lingam"
  },
  {
    name: "Horsley Hills",
    image: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Cool hill station with eucalyptus groves"
  }
];

const HeroSection: React.FC = () => {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Start video after 5 seconds
    const videoTimer = setTimeout(() => {
      setVideoStarted(true);
      setIsVideoPlaying(true);
    }, 5000);
    return () => clearTimeout(videoTimer);
  }, []);

  const nextDestination = () => {
    setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentDestinationIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const toggleVideoPlayback = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setShowVideoControls(true)}
      onMouseLeave={() => setShowVideoControls(false)}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {videoStarted ? (
          <iframe
            id="hero-video"
            className="w-full h-full object-cover scale-150"
            src="https://www.youtube.com/embed/SZU2NR5Ls28?autoplay=1&mute=1&loop=1&playlist=SZU2NR5Ls28&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1"
            title="Tirupati Tourism Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ 
              pointerEvents: 'none',
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
          />
        ) : (
          <img
            src={destinations[currentDestinationIndex].image}
            alt={destinations[currentDestinationIndex].name}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Video Controls */}
      <div className={`absolute top-6 right-6 z-20 flex space-x-2 transition-opacity duration-300 ${
        showVideoControls && videoStarted ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          onClick={toggleVideoPlayback}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
          title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
          title={isMuted ? 'Unmute Video' : 'Mute Video'}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-[#F9F6F1] font-serif">Tirupati</span>
            <span className="block text-[#DAA520] text-4xl md:text-5xl mt-2 font-serif">Beyond the Temple</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#F9F6F1] opacity-90 animate-fade-in-delay">
            Discover hidden gems, ancient forts, pristine waterfalls, and spiritual sanctuaries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button className="bg-[#245A38] hover:bg-[#4CAF50] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-[#DAA520] hover:border-[#DAA520]">
              Start Exploring
            </button>
            {videoStarted && (
              <button 
                onClick={toggleVideoPlayback}
                className="border-2 border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-[#1F1F1F] px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2 justify-center"
              >
                {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isVideoPlaying ? 'Pause Video' : 'Play Video'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Destination Showcase Overlay */}
      <div className="absolute bottom-32 left-6 z-10 bg-[#800000]/80 backdrop-blur-sm rounded-2xl p-4 max-w-sm border border-[#DAA520]/30">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={destinations[currentDestinationIndex].image}
              alt={destinations[currentDestinationIndex].name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-[#F9F6F1] font-semibold text-lg font-serif">
              {destinations[currentDestinationIndex].name}
            </h3>
            <p className="text-[#DAA520] text-sm">
              {destinations[currentDestinationIndex].description}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDestinationIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDestinationIndex ? 'bg-[#DAA520] scale-125' : 'bg-[#F9F6F1]/50 hover:bg-[#F9F6F1]/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Attribution */}
      {videoStarted && (
        <div className="absolute bottom-4 left-4 z-10 text-white/60 text-xs">
          <p>Video: Tirupati Tourism Showcase</p>
        </div>
      )}

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevDestination}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#800000]/50 hover:bg-[#800000]/70 text-[#DAA520] p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 border border-[#DAA520]/30"
        title="Previous Destination"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextDestination}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#800000]/50 hover:bg-[#800000]/70 text-[#DAA520] p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 border border-[#DAA520]/30"
        title="Next Destination"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 1s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1s ease-out 1.5s both;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;