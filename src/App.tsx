import React, { useState } from 'react';
import PageLoader from './components/PageLoader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExploreSpots from './components/ExploreSpots';
import InteractiveTourismMap from './components/InteractiveTourismMap';
import FestivalTimeline from './components/FestivalTimeline';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hide loader after 5 seconds
  React.useEffect(() => {
    // Hide loader after 5 seconds to allow video to start
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      {isLoading && <PageLoader />}
      {isLoading && <PageLoader />}
      {!isLoading && <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      <HeroSection />
      <ExploreSpots />
      <InteractiveTourismMap />
      <FestivalTimeline />
      <Footer />
    </div>
  );
}

export default App;