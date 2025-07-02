
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import InteractiveMap from '../components/InteractiveMap';
import HowItWorksSection from '../components/HowItWorksSection';
import AppPreviewSection from '../components/AppPreviewSection';
import TeamSection from '../components/TeamSection';
import SupportSection from '../components/SupportSection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    scrollElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 cyber-grid opacity-20 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <InteractiveMap />
      <HowItWorksSection />
      <AppPreviewSection />
      <TeamSection />
      <SupportSection />
      <Footer />
    </div>
  );
};

export default Index;
