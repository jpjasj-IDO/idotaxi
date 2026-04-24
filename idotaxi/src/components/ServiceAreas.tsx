import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const AREAS_COL_1 = [
  "Beirut Central", "Hamra", "Achrafieh", "Verdun", "Sin El Fil", "Jounieh", 
  "Byblos (Jbeil)", "Batroun", "Tripoli", "BEY Airport"
];

const AREAS_COL_2 = [
  "Zahle", "Baalbek", "Baabda", "Aley", "Broummana", "Saida (Sidon)", 
  "Tyre (Sour)", "Nabatieh", "Jeita & Harissa", "Faraya & Cedars"
];

export default function ServiceAreas() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const els = inner.querySelectorAll('.reveal-stagger');
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 60 + 60);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full py-[80px] md:py-[100px] px-4 md:px-7 bg-[#0a1736] border-y border-[#d4af37]/10">
      <div ref={innerRef} className="max-w-[1180px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">
        
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="reveal-stagger flex items-center justify-center md:justify-start gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-6 font-medium">
            <span className="w-4 h-px bg-[#d4af37]/55 md:hidden" />
            Coverage
            <span className="w-7 h-px bg-[#d4af37]/55" />
          </div>

          <h2 className="reveal-stagger m-0 mb-6 font-serif text-[32px] md:text-[44px] font-semibold tracking-[0.02em] leading-[1.1] text-white">
            Anywhere in <br className="hidden md:block" />
            <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)]">Lebanon</span>
          </h2>

          <p className="reveal-stagger text-sm text-white/60 leading-[1.7] mb-8 font-normal max-w-[400px] mx-auto md:mx-0">
            From the bustling streets of Beirut to the mountain peaks of Faraya and the ancient ruins of Baalbek, our network covers the entire country.
          </p>

          <div className="reveal-stagger p-6 rounded-[10px] bg-[#d4af37]/5 border border-[#d4af37]/20 inline-block text-left w-full max-w-[340px]">
            <p className="text-xs text-[#f5d76e] tracking-wider uppercase font-semibold mb-2">Don't see your area?</p>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">We likely still cover it. Call our 24/7 dispatch for an immediate quote and booking.</p>
            <a href="tel:+9613593596" className="flex items-center gap-2 text-white font-serif text-xl hover:text-[#f5d76e] transition-colors">
              <MapPin size={18} className="text-[#d4af37]" />
              +961 3 593 596
            </a>
          </div>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-12 sm:gap-y-4">
          <div className="space-y-3 sm:space-y-4">
            {AREAS_COL_1.map((area, i) => (
              <div key={i} className="reveal-stagger flex items-center gap-3 text-sm sm:text-base text-white/80 border-b border-white/5 pb-3 sm:pb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                {area}
              </div>
            ))}
          </div>
          <div className="space-y-3 sm:space-y-4">
            {AREAS_COL_2.map((area, i) => (
              <div key={i} className="reveal-stagger flex items-center gap-3 text-sm sm:text-base text-white/80 border-b border-white/5 pb-3 sm:pb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                {area}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}