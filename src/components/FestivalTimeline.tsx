import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Download, Bell, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { generateFestivalCalendarPDF } from '../utils/pdfGenerator';

const festivalData = [
  {
    id: 1,
    month: "September",
    name: "Srivari Brahmotsavam",
    location: "Tirumala",
    dates: "9 Days (Lunar Calendar)",
    description: "The most celebrated festival in Tirumala with grand processions and divine energy",
    image: "/images/Srivari_Brahmotsavam.jpg",
    color: "#8B0000",
    highlight: "Rathotsavam Procession"
  },
  {
    id: 2,
    month: "December",
    name: "Vaikunta Ekadasi",
    location: "All Major Temples",
    dates: "December - January",
    description: "Entry to Vaikunta Dwaram (heavenly gate) - most auspicious day for devotees",
    image: "/images/Vaikunta_Ekadasi.jpg",
    color: "#DAA520",
    highlight: "Golden Gopuram"
  },
  {
    id: 3,
    month: "March",
    name: "Teppotsavam",
    location: "Govindaraja Swamy Temple",
    dates: "5 Days in March",
    description: "Float Festival where deity idols float in decorated boats over temple tank",
    image: "/images/Teppotsavam.jpg",
    color: "#245A38",
    highlight: "Decorated Boat Procession"
  },
  {
    id: 4,
    month: "February",
    name: "Maha Shivaratri",
    location: "Kapila Theertham",
    dates: "February (Full Moon)",
    description: "Sacred Shiva abhishekam with holy river flowing through ancient temple",
    image: "/images/Maha_Shivaratri.jpg",
    color: "#800000",
    highlight: "River Abhishekam"
  },
  {
    id: 5,
    month: "November",
    name: "Deepavali & Kartika Deepam",
    location: "All Temples",
    dates: "October - November",
    description: "Festival of Lights with thousands of diyas illuminating the sacred hills",
    image: "/images/Deepavali.jpg",
    color: "#FF8C00",
    highlight: "Hill Illumination"
  },
  {
    id: 6,
    month: "February",
    name: "Rathasapthami",
    location: "Tirumala",
    dates: "February (Sunrise)",
    description: "Seven Vahana sevas in a single day celebrating the Sun God's blessings",
    image:"/images/rathasapthami.jpg",
    color: "#DC143C",
    highlight: "Seven Vahana Sevas"
  }
];

const FestivalTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('.festival-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    if (activeIndex < festivalData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const downloadCalendar = () => {
    generateFestivalCalendarPDF();
  };

  const planVisit = (festivalName: string) => {
    // Scroll to map section
    const mapSection = document.getElementById('destinations');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setReminder = (festivalName: string) => {
    alert(`Reminder set for ${festivalName}!`);
  };

  return (
    <section id="guide" className="relative py-20 bg-gradient-to-br from-[#F9F6F1] via-[#8B0000]/5 to-[#DAA520]/10 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-[#DAA520] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#8B0000] rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#245A38] rounded-full animate-pulse animation-delay-2000"></div>
        
        {/* Temple Bell Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(218, 165, 32, 0.1) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-[#DAA520] mr-3 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold text-[#8B0000] font-serif">
              Festival <span className="text-[#DAA520]">Calendar</span>
            </h2>
            <Sparkles className="h-8 w-8 text-[#DAA520] ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-[#1F1F1F]/80 max-w-3xl mx-auto mb-8">
            Experience the divine energy and cultural vibrancy of Tirupati through its sacred festivals
          </p>
          
          {/* Navigation for Mobile */}
          {isMobile && (
            <div className="flex justify-center items-center space-x-4 mb-8">
              <button
                onClick={scrollToPrev}
                disabled={activeIndex === 0}
                className="bg-[#8B0000] hover:bg-[#8B0000]/80 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 border border-[#DAA520]/30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-[#8B0000] font-semibold">
                {activeIndex + 1} / {festivalData.length}
              </span>
              <button
                onClick={scrollToNext}
                disabled={activeIndex === festivalData.length - 1}
                className="bg-[#8B0000] hover:bg-[#8B0000]/80 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 border border-[#DAA520]/30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Timeline Container */}
        <div 
          ref={timelineRef}
          className={`relative ${
            isMobile 
              ? 'flex overflow-x-auto scrollbar-hide space-x-6 pb-4' 
              : 'space-y-12'
          }`}
          style={isMobile ? { 
            transform: `translateX(-${activeIndex * 320}px)`,
            transition: 'transform 0.5s ease-in-out'
          } : {}}
        >
          {/* Timeline Line for Desktop */}
          {!isMobile && (
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B0000] via-[#DAA520] to-[#245A38] transform -translate-x-1/2 opacity-30"></div>
          )}

          {festivalData.map((festival, index) => (
            <div
              key={festival.id}
              data-index={index}
              className={`festival-card relative ${
                isMobile 
                  ? 'flex-shrink-0 w-80' 
                  : `flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`
              } ${
                visibleCards.has(index) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Dot for Desktop */}
              {!isMobile && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div 
                    className="w-6 h-6 rounded-full border-4 border-[#F9F6F1] shadow-lg animate-pulse"
                    style={{ backgroundColor: festival.color }}
                  ></div>
                  <div 
                    className="absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: festival.color }}
                  ></div>
                </div>
              )}

              {/* Festival Card */}
              <div className={`${
                isMobile 
                  ? 'w-full' 
                  : `w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`
              }`}>
                <div className="bg-[#F9F6F1] rounded-3xl shadow-2xl overflow-hidden border-2 border-[#DAA520]/30 hover:border-[#DAA520]/60 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 group">
                  {/* Card Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={festival.image}
                      alt={festival.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Month Badge */}
                    <div 
                      className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold text-lg shadow-lg border border-white/30"
                      style={{ backgroundColor: festival.color }}
                    >
                      {festival.month}
                    </div>

                    {/* Highlight Badge */}
                    <div className="absolute top-4 right-4 bg-[#DAA520]/90 text-[#1F1F1F] px-3 py-1 rounded-full text-sm font-semibold border border-white/30">
                      {festival.highlight}
                    </div>

                    {/* Festival Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-[#DAA520] mb-1 font-serif">
                        {festival.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Location & Dates */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-[#8B0000]">
                        <MapPin className="h-4 w-4" />
                        <span className="font-semibold text-sm">{festival.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#245A38]">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold text-sm">{festival.dates}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#1F1F1F]/80 mb-6 leading-relaxed">
                      {festival.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => planVisit(festival.name)}
                        className="flex items-center space-x-2 bg-[#8B0000] hover:bg-[#8B0000]/80 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-[#DAA520]/30"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Plan Visit</span>
                      </button>
                      <button
                        onClick={() => setReminder(festival.name)}
                        className="flex items-center space-x-2 bg-[#DAA520]/20 text-[#8B0000] px-4 py-2 rounded-xl font-semibold border border-[#DAA520]/50 hover:bg-[#DAA520]/30 transition-all duration-200 hover:scale-105"
                      >
                        <Bell className="h-4 w-4" />
                        <span>Set Reminder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#8B0000]/10 via-[#DAA520]/10 to-[#245A38]/10 rounded-3xl p-12 border-2 border-[#DAA520]/50 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-12 w-12 text-[#DAA520] animate-pulse" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4 font-serif">
              Don't Miss a <span className="text-[#DAA520]">Festival</span>
            </h3>
            <p className="text-xl text-[#1F1F1F]/80 mb-8 max-w-2xl mx-auto">
              Plan your spiritual journey around these sacred celebrations and experience the divine energy of Tirupati
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadCalendar}
                className="flex items-center space-x-3 bg-[#8B0000] hover:bg-[#8B0000]/80 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#DAA520]"
              >
                <Download className="h-6 w-6" />
                <span>Download 2025 Festival Calendar</span>
              </button>
              <button
                onClick={() => planVisit('All Festivals')}
                className="flex items-center space-x-3 bg-[#DAA520] hover:bg-[#DAA520]/80 text-[#1F1F1F] px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#8B0000]"
              >
                <MapPin className="h-6 w-6" />
                <span>Plan Your Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default FestivalTimeline;