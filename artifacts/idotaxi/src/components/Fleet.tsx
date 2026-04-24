import React, { useEffect, useRef } from 'react';
import { Users, Wifi, Wind } from 'lucide-react';

const FLEET = [
  {
    name: "GO",
    desc: "Comfortable, modern sedans perfect for city rides and everyday errands.",
    pax: "1–4",
    img: "/fleet-standard.png",
    features: ["Air Conditioning", "Clean Interior"]
  },
  {
    name: "GO-PLUS",
    desc: "Premium sedans with leather interiors for business and long-distance travel.",
    pax: "1–6",
    img: "/fleet-comfort.png",
    features: ["Leather Seats", "Complimentary Water", "Free Wi-Fi"]
  },
  {
    name: "Group / Van",
    desc: "Spacious passenger vans ideal for airport runs with luggage or group tours.",
    pax: "1–7",
    img: "/fleet-van.png",
    features: ["Extra Luggage Space", "Spacious Seating", "Air Conditioning"]
  }
];

export default function Fleet() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const els = inner.querySelectorAll('.reveal-stagger');
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 120 + 60);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="fleet" className="relative w-full py-[80px] md:py-[110px] px-4 md:px-7 bg-[#0a1736] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />
      
      <div ref={innerRef} className="relative z-10 max-w-[1180px] mx-auto flex flex-col items-center text-center">
        
        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          The Vehicles
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger m-0 mb-4 font-serif text-[36px] md:text-[56px] font-semibold tracking-[0.02em] leading-[1.05] text-white">
          Our Premium Fleet
        </h2>

        <div className="reveal-stagger flex items-center justify-center gap-3 my-3 mb-[22px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="deco-line" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </div>

        <p className="reveal-stagger text-sm md:text-base text-white/60 leading-[1.7] max-w-[580px] m-0 mb-[60px] font-normal">
          Maintained to the highest standards of cleanliness and safety. Select the class that best fits your journey.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
          {FLEET.map((vehicle, i) => (
            <div key={i} className="reveal-stagger glass-card rounded-[12px] overflow-hidden flex flex-col group">
              <div className="w-full aspect-[16/10] overflow-hidden relative bg-[#0a1736]">
                <img 
                  src={vehicle.img} 
                  alt={`${vehicle.name} Taxi`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1736] to-transparent opacity-80" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 -mt-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-[24px] font-semibold text-white">{vehicle.name}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded">
                    <Users size={12} />
                    {vehicle.pax} Seats
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-[1.6] mb-6 flex-1">
                  {vehicle.desc}
                </p>
                <div className="pt-5 border-t border-[#d4af37]/10">
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f5d76e]/70" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}