import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Youtube, 
  Navigation, 
  MessageCircle,
  Download,
  Compass,
  Users
} from 'lucide-react';
import { generateTouristGuidePDF } from '../utils/pdfGenerator';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadGuide = () => {
    generateTouristGuidePDF();
  };

  const startJourney = () => {
    scrollToSection('destinations');
  };

  const partnerWithUs = () => {
    alert('Partner inquiry form will open!');
  };

  return (
    <footer className="bg-[#121212] text-[#F9F6F1] relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-[#DAA520] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-[#245A38] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-[#DAA520] rounded-full"></div>
        
        {/* Temple Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(36, 90, 56, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: About */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#DAA520] mb-4 font-serif flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                About This Project
              </h3>
              <p className="text-[#F9F6F1]/80 leading-relaxed">
                Discover Tirupati like never before. Explore hidden gems, plan around festivals, and 
                experience culture beyond the temple.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-2 text-[#DAA520]">
                  <div className="w-8 h-8 bg-[#DAA520] rounded-full flex items-center justify-center">
                    <span className="text-[#121212] font-bold text-sm">T</span>
                  </div>
                  <span className="font-bold font-serif">Tirupati Beyond</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#DAA520] mb-4 font-serif">Quick Links</h3>
              <nav className="space-y-3">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'Explore Spots', id: 'destinations' },
                  { name: 'Interactive Map', id: 'map' },
                  { name: 'Festival Calendar', id: 'festivals' },
                  { name: 'Plan Your Trip', id: 'destinations' },
                  { name: 'Download Brochure', action: 'download' }
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => link.action === 'download' ? downloadGuide() : scrollToSection(link.id!)}
                    className="block text-[#F9F6F1]/80 hover:text-[#DAA520] hover:underline transition-all duration-200 hover:translate-x-1 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#DAA520] mb-4 font-serif">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#DAA520] mt-0.5 flex-shrink-0" />
                  <span className="text-[#F9F6F1]/80">Tirupati Collectorate Office</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#DAA520] flex-shrink-0" />
                  <span className="text-[#F9F6F1]/80">+91-877-2233456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#DAA520] flex-shrink-0" />
                  <span className="text-[#F9F6F1]/80">tourism@tirupati.gov.in</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[#DAA520] mt-0.5 flex-shrink-0" />
                  <span className="text-[#F9F6F1]/80">Mon–Fri, 10:00 AM to 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Column 4: Follow Us */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#DAA520] mb-4 font-serif">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Instagram, name: 'Instagram', url: '#' },
                  { icon: Youtube, name: 'YouTube', url: '#' },
                  { icon: Navigation, name: 'Google Maps', url: '#' },
                  { icon: MessageCircle, name: 'WhatsApp', url: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex items-center space-x-2 text-[#F9F6F1]/80 hover:text-[#DAA520] transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="p-2 bg-[#245A38]/20 rounded-full group-hover:bg-[#DAA520]/20 transition-colors duration-200">
                      <social.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
              
              {/* Newsletter Signup */}
              <div className="pt-4">
                <p className="text-sm text-[#F9F6F1]/60 mb-2">Stay updated with festivals & events</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-[#DAA520]/30 rounded-l-lg text-sm focus:outline-none focus:border-[#DAA520] text-[#F9F6F1]"
                  />
                  <button className="px-4 py-2 bg-[#245A38] hover:bg-[#DAA520] text-white rounded-r-lg transition-colors duration-200">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="border-t border-[#DAA520]/20 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#DAA520] mb-4 font-serif">
              📍 Ready to Experience Tirupati?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadGuide}
                className="flex items-center space-x-2 bg-[#245A38] hover:bg-[#DAA520] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-[#DAA520]/30"
              >
                <Download className="h-5 w-5" />
                <span>Download Tourist Guide PDF</span>
              </button>
              <button
                onClick={startJourney}
                className="flex items-center space-x-2 bg-[#245A38] hover:bg-[#DAA520] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-[#DAA520]/30"
              >
                <Compass className="h-5 w-5" />
                <span>Start My Journey</span>
              </button>
              <button
                onClick={partnerWithUs}
                className="flex items-center space-x-2 bg-[#245A38] hover:bg-[#DAA520] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-[#DAA520]/30"
              >
                <Users className="h-5 w-5" />
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer End Note */}
        <div className="border-t border-[#DAA520]/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#F9F6F1]/60 text-sm">
              © 2025 Tirupati Tourism Board. All rights reserved.
            </p>
            <p className="text-[#F9F6F1]/60 text-sm flex items-center">
              Designed with <span className="text-[#DAA520] mx-1">📍</span> love and purpose.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 bg-[#245A38] hover:bg-[#DAA520] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 border border-[#DAA520]/30"
        title="Back to Top"
      >
        <Navigation className="h-5 w-5 transform rotate-180" />
      </button>
    </footer>
  );
};

export default Footer;