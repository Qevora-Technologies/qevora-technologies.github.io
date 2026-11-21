import React from 'react';
import { StarryNightBackground } from './components/StarryNightBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToBook = () => {
    const el = document.getElementById('book') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForBooking = () => {
    scrollToBook();
  };

  const handleBookSimilarProject = () => {
    scrollToBook();
  };

  const handleConsultSpecialist = () => {
    scrollToBook();
  };

  return (
    <div className="relative min-h-screen bg-[#020612] text-[#F8FAFC] font-sans selection:bg-[#38BDF8]/30 selection:text-[#FFFFFF] overflow-hidden">
      {/* Dynamic Starry Night Cosmic Celestial Canvas with Scroll Falling Stars */}
      <StarryNightBackground />

      {/* Top Navbar with QevoraTech Brand & Direct Book Us Action */}
      <Navbar onOpenBook={scrollToBook} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero
          onExploreServices={scrollToServices}
          onBookProject={scrollToBook}
        />

        <AboutSection />

        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        <PortfolioSection onBookSimilar={handleBookSimilarProject} />

        <TeamSection onConsultSpecialist={handleConsultSpecialist} />

        <TestimonialsSection />

        <FAQSection />

        {/* Dedicated Company Information & Direct Intake Hub */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onBookClick={scrollToBook} />
    </div>
  );
}

