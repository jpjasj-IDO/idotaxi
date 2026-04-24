import React, { useEffect, useRef } from 'react';
import { Plane, Car, MapPin, Clock, Compass, Briefcase, Users, Crown } from 'lucide-react';

const SERVICES = [
  {
    title: "Airport Transfers",
    desc: "Seamless BEY pickups and drop-offs. We track your flight and wait with a personalised name sign.",
    icon: <Plane size={24} />
  },
  {
    title: "City Rides",
    desc: "Navigate Beirut and its suburbs with ease. Fair, transparent fares and drivers who know every shortcut.",
    icon: <Car size={24} />
  },
  {
    title: "Carpool & Save",
    desc: "Pick the Carpool option in the app and share your ride with others heading the same way — pay less, every trip.",
    icon: <Users size={24} />
  },
  {
    title: "TAXIDO VIP",
    desc: "Premium chauffeur service for executives, hotels, and special occasions. Discreet, refined, on-time.",
    icon: <Crown size={24} />
  },
  {
    title: "Long-Distance Trips",
    desc: "Comfortable travel to Tripoli, Saida, Tyre, Baalbek, or Byblos. We cover every corner of Lebanon.",
    icon: <MapPin size={24} />
  },
  {
    title: "Hourly Hire",
    desc: "Keep a dedicated driver by the hour for a day of meetings, errands, or shopping across the city.",
    icon: <Clock size={24} />
  },
  {
    title: "Tours & Day Trips",
    desc: "Explore Jeita, Harissa, the Cedars, or Baalbek with experienced, English-speaking driver-guides.",
    icon: <Compass size={24} />
  },
  {
    title: "Corporate Accounts",
    desc: "Priority dispatch, dedicated account management, and monthly invoicing for your business needs.",
    icon: <Briefcase size={24} />
  }
];

export default function Services() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const els = inner.querySelectorAll('.reveal-stagger');
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 80 + 60);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative w-full py-[80px] md:py-[110px] px-4 md:px-7 bg-[#0a1736]">
      <div ref={innerRef} className="max-w-[1180px] mx-auto flex flex-col items-center text-center">
        
        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          Our Expertise
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger m-0 mb-4 font-serif text-[36px] md:text-[56px] font-semibold tracking-[0.02em] leading-[1.05] text-white">
          Complete Mobility Solutions
        </h2>

        <div className="reveal-stagger flex items-center justify-center gap-3 my-3 mb-[22px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="deco-line" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </div>

        <p className="reveal-stagger text-sm md:text-base text-white/60 leading-[1.7] max-w-[580px] m-0 mb-[60px] font-normal">
          Whether you need a quick cross-town hop, a reliable airport pickup, or a full day of touring Lebanon's landmarks, our fleet is at your service.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((srv, i) => (
            <div key={i} className="reveal-stagger flex flex-col items-center text-center group">
              <div className="w-[64px] h-[64px] rounded-full bg-white/5 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/40 shadow-[0_0_20px_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                {srv.icon}
              </div>
              <h3 className="font-serif text-[22px] font-semibold text-white mb-3">{srv.title}</h3>
              <p className="text-sm text-white/60 leading-[1.6] max-w-[300px]">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}