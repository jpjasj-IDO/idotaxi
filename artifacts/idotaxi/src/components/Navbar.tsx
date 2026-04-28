import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
          
          <a href="https://wa.me/9613593596" target="_blank" rel="noopener noreferrer" className="ml-4 btn-primary !py-3 !px-6 !text-[10px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            WhatsApp Us
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
          <a href="https://wa.me/9613593596" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center mt-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}