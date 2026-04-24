import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a1736]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="I DO TAXI Lebanon"
            className="w-11 h-11 md:w-12 md:h-12 object-contain drop-shadow-[0_2px_14px_rgba(212,175,55,0.45)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:inline font-serif font-bold text-xl md:text-2xl tracking-wider text-gold-gradient drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            I DO TAXI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-white/80 hover:text-[#f5d76e] transition-colors">Services</a>
          <a href="#why-us" className="text-sm font-medium text-white/80 hover:text-[#f5d76e] transition-colors">Why Us</a>
          <a href="#fleet" className="text-sm font-medium text-white/80 hover:text-[#f5d76e] transition-colors">Fleet</a>
          <a href="#app" className="text-sm font-medium text-white/80 hover:text-[#f5d76e] transition-colors">App</a>
          <a href="#contact" className="text-sm font-medium text-white/80 hover:text-[#f5d76e] transition-colors">Contact</a>
          
          <a href="tel:+9613593596" className="ml-4 btn-primary !py-3 !px-6 !text-[10px]">
            <Phone size={14} className="mr-1" /> Call Now
            <span className="shimmer-layer"></span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-[#f5d76e] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a1736]/95 backdrop-blur-lg border-b border-[#d4af37]/20 py-6 px-6 flex flex-col gap-6 text-center">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[#f5d76e]">Services</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[#f5d76e]">Why Us</a>
          <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[#f5d76e]">Fleet</a>
          <a href="#app" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[#f5d76e]">App</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[#f5d76e]">Contact</a>
          <a href="tel:+9613593596" className="btn-primary w-full justify-center mt-4">
            <Phone size={16} className="mr-2" /> Call Now
          </a>
        </div>
      )}
    </nav>
  );
}