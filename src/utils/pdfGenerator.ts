import jsPDF from 'jspdf';
import { placesData } from '../data/placesData';

// PDF Generation Utilities
export const generateTouristGuidePDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header Design
  pdf.setFillColor(139, 0, 0); // Maroon
  pdf.rect(0, 0, pageWidth, 30, 'F');
  
  // Title
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🕉️ TIRUPATI BEYOND', pageWidth / 2, 15, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text('Complete Tourist Guide & Travel Information', pageWidth / 2, 22, { align: 'center' });

  yPosition = 45;

  // Introduction Section
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🌟 Discover Hidden Gems Beyond the Temple', 15, yPosition);
  
  yPosition += 10;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const introText = 'Experience the spiritual and natural wonders of Tirupati District. From cascading waterfalls to ancient forts, discover destinations that showcase the rich heritage and natural beauty of this sacred land.';
  const splitIntro = pdf.splitTextToSize(introText, pageWidth - 30);
  pdf.text(splitIntro, 15, yPosition);
  yPosition += splitIntro.length * 5 + 10;

  // Places Section
  placesData.forEach((place, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    // Place Header
    pdf.setFillColor(218, 165, 32, 0.2); // Light gold background
    pdf.rect(10, yPosition - 5, pageWidth - 20, 12, 'F');
    
    pdf.setTextColor(139, 0, 0); // Maroon
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${place.name}`, 15, yPosition + 3);
    
    pdf.setTextColor(36, 90, 56); // Green
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.text(place.tagline, 15, yPosition + 8);
    
    yPosition += 20;

    // Travel Information Grid
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    // By Car
    pdf.setFont('helvetica', 'bold');
    pdf.text('🚗 By Car:', 15, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${place.distanceByCar} • ${place.carTime} • ${place.carFare}`, 40, yPosition);
    yPosition += 6;

    // By Bus
    pdf.setFont('helvetica', 'bold');
    pdf.text('🚌 By Bus:', 15, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Route ${place.bus.route} • ${place.bus.fare} • ${place.bus.time}`, 40, yPosition);
    yPosition += 4;
    pdf.text(`Stop: ${place.bus.stop}`, 40, yPosition);
    yPosition += 6;

    // Nearest Attraction
    pdf.setFont('helvetica', 'bold');
    pdf.text('📍 Nearest:', 15, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(place.nearest, 40, yPosition);
    yPosition += 6;

    // Highlights
    pdf.setFont('helvetica', 'bold');
    pdf.text('✨ Highlights:', 15, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(place.highlights.join(' • '), 40, yPosition);
    yPosition += 6;

    // Best Time
    pdf.setFont('helvetica', 'bold');
    pdf.text('🗓️ Best Time:', 15, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(place.bestTime, 40, yPosition);
    yPosition += 15;
  });

  // Footer
  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFillColor(36, 90, 56); // Green
  pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('© 2025 Tirupati Tourism Board | Plan Your Sacred Journey', pageWidth / 2, pageHeight - 15, { align: 'center' });
  pdf.text('🕉️ Om Namo Venkatesaya 🕉️', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save the PDF
  pdf.save('Tirupati-Tourist-Guide-2025.pdf');
};

export const generateFestivalCalendarPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Header Design
  pdf.setFillColor(139, 0, 0); // Maroon
  pdf.rect(0, 0, pageWidth, 35, 'F');
  
  // Title
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🪔 TIRUPATI FESTIVAL CALENDAR 2025', pageWidth / 2, 15, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Sacred Celebrations Throughout the Year', pageWidth / 2, 25, { align: 'center' });

  let yPosition = 50;

  // Festival Data
  const festivals = [
    {
      month: "September",
      name: "Srivari Brahmotsavam",
      location: "Tirumala",
      dates: "9 Days (Lunar Calendar)",
      description: "The most celebrated festival in Tirumala with grand processions and divine energy",
      highlight: "Rathotsavam Procession"
    },
    {
      month: "December",
      name: "Vaikunta Ekadasi",
      location: "All Major Temples",
      dates: "December - January",
      description: "Entry to Vaikunta Dwaram (heavenly gate) - most auspicious day for devotees",
      highlight: "Golden Gopuram"
    },
    {
      month: "March",
      name: "Teppotsavam",
      location: "Govindaraja Swamy Temple",
      dates: "5 Days in March",
      description: "Float Festival where deity idols float in decorated boats over temple tank",
      highlight: "Decorated Boat Procession"
    },
    {
      month: "February",
      name: "Maha Shivaratri",
      location: "Kapila Theertham",
      dates: "February (Full Moon)",
      description: "Sacred Shiva abhishekam with holy river flowing through ancient temple",
      highlight: "River Abhishekam"
    },
    {
      month: "November",
      name: "Deepavali & Kartika Deepam",
      location: "All Temples",
      dates: "October - November",
      description: "Festival of Lights with thousands of diyas illuminating the sacred hills",
      highlight: "Hill Illumination"
    },
    {
      month: "February",
      name: "Rathasapthami",
      location: "Tirumala",
      dates: "February (Sunrise)",
      description: "Seven Vahana sevas in a single day celebrating the Sun God's blessings",
      highlight: "Seven Vahana Sevas"
    }
  ];

  festivals.forEach((festival, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 70) {
      pdf.addPage();
      yPosition = 20;
    }

    // Month Badge
    pdf.setFillColor(218, 165, 32); // Gold
    pdf.rect(15, yPosition - 5, 25, 10, 'F');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text(festival.month.toUpperCase(), 27.5, yPosition + 1, { align: 'center' });

    // Festival Name
    pdf.setTextColor(139, 0, 0); // Maroon
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(festival.name, 45, yPosition + 1);

    yPosition += 8;

    // Location and Dates
    pdf.setTextColor(36, 90, 56); // Green
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`📍 ${festival.location}`, 15, yPosition);
    pdf.text(`🗓️ ${festival.dates}`, 15, yPosition + 5);

    yPosition += 12;

    // Description
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descText = pdf.splitTextToSize(festival.description, pageWidth - 30);
    pdf.text(descText, 15, yPosition);
    yPosition += descText.length * 4 + 3;

    // Highlight
    pdf.setTextColor(218, 165, 32); // Gold
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`✨ ${festival.highlight}`, 15, yPosition);
    yPosition += 15;

    // Separator line
    pdf.setDrawColor(218, 165, 32, 0.3);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 10;
  });

  // Planning Tips Section
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setTextColor(139, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🎯 Festival Planning Tips', 15, yPosition);
  yPosition += 10;

  const tips = [
    'Book accommodations well in advance during festival seasons',
    'Check lunar calendar dates as they vary each year',
    'Arrive early for better darshan and participation',
    'Carry water and wear comfortable footwear',
    'Respect local customs and dress modestly',
    'Follow temple guidelines and security instructions'
  ];

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  tips.forEach((tip, index) => {
    pdf.text(`• ${tip}`, 20, yPosition);
    yPosition += 6;
  });

  // Footer
  pdf.setFillColor(36, 90, 56); // Green
  pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('© 2025 Tirupati Tourism Board | Experience Divine Celebrations', pageWidth / 2, pageHeight - 15, { align: 'center' });
  pdf.text('🕉️ Har Har Mahadev • Om Namo Venkatesaya 🕉️', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save the PDF
  pdf.save('Tirupati-Festival-Calendar-2025.pdf');
};

export const generateRouteMapPDF = () => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape for map
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Header Design
  pdf.setFillColor(139, 0, 0); // Maroon
  pdf.rect(0, 0, pageWidth, 30, 'F');
  
  // Title
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🗺️ TIRUPATI DISTRICT TOURIST ROUTE MAP', pageWidth / 2, 15, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Complete Travel Routes & Distance Guide', pageWidth / 2, 22, { align: 'center' });

  let yPosition = 45;

  // Map Legend
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🧭 Route Information & Distances from Tirupati', 15, yPosition);
  yPosition += 15;

  // Create a simple route table
  placesData.forEach((place, index) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    // Place name and distance
    pdf.setFillColor(218, 165, 32, 0.1); // Light gold
    pdf.rect(15, yPosition - 3, pageWidth - 30, 8, 'F');
    
    pdf.setTextColor(139, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${place.name}`, 20, yPosition + 2);
    
    pdf.setTextColor(36, 90, 56);
    pdf.setFontSize(10);
    pdf.text(`${place.distanceByCar} • ${place.carTime}`, pageWidth - 80, yPosition + 2);
    
    yPosition += 12;

    // Route details
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`🚗 Car: ${place.carFare} | 🚌 Bus: Route ${place.bus.route}, ${place.bus.fare}`, 25, yPosition);
    yPosition += 5;
    pdf.text(`📍 Nearest: ${place.nearest}`, 25, yPosition);
    yPosition += 10;
  });

  // Travel Tips
  yPosition += 10;
  pdf.setTextColor(139, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🎯 Travel Tips & Route Planning', 15, yPosition);
  yPosition += 10;

  const routeTips = [
    'Start early morning for better traffic conditions and weather',
    'Combine nearby destinations for efficient route planning',
    'Keep emergency contacts and first aid kit while traveling',
    'Check road conditions during monsoon season (June-September)',
    'Fuel up in Tirupati before heading to remote locations',
    'Carry sufficient water and snacks for longer journeys'
  ];

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  routeTips.forEach((tip) => {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.text(`• ${tip}`, 20, yPosition);
    yPosition += 6;
  });

  // Footer
  pdf.setFillColor(36, 90, 56); // Green
  pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  
  pdf.setTextColor(218, 165, 32); // Gold
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('© 2025 Tirupati Tourism Board | Safe Travels & Divine Blessings', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save the PDF
  pdf.save('Tirupati-Route-Map-2025.pdf');
};