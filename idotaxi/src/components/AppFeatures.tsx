import React, { useEffect, useRef } from 'react';
import { Coins, Users, MapPin, MessageCircle, Globe, Wallet } from 'lucide-react';

const APP_FEATURES = [
  {
    title: "Cab Coins",
    desc: "Earn Cab Coins on every kilometer you ride. Redeem them straight from the app for discounts on future trips — your loyalty pays you back.",
    icon: <Coins size={22} strokeWidth={1.6} />
  },
  {
    title: "Carpool & Save",
    desc: "Pick the Carpool vehicle type when ordering and split the ride to spend less on your daily commute.",
    icon: <Users size={22} strokeWidth={1.6} />
  },
  {
    title: "Live Driver Tracking",
    desc: "Watch your driver approach in real time on the map and get accurate ETAs from pickup to drop-off.",
    icon: <MapPin size={22} strokeWidth={1.6} />
  },
  {
    title: "Chat on WhatsApp",
    desc: "Message your driver directly through WhatsApp from inside the app — no need to dial, no number reveal.",
    icon: <MessageCircle size={22} strokeWidth={1.6} />
  },
  {
    title: "Multiple Languages",
    desc: "Use the app in your preferred language — English and beyond — for a smooth booking experience.",
    icon: <Globe size={22} strokeWidth={1.6} />
  },
  {
    title: "Card or Cash",
    desc: "Pay securely in-app with your card or simply hand cash to your driver. The choice is yours, every ride.",
    icon: <Wallet size={22} strokeWidth={1.6} />
  }
];

export default function AppFeatures() {
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
    <section id="app" className="relative w-full py-[80px] md:py-[120px] px-4 md:px-7 bg-[#0a1736] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] bg-[#d4af37] rounded-full blur-[180px] opacity-[0.05] pointer-events-none" />

      <div ref={innerRef} className="relative z-10 max-w-[1180px] mx-auto flex flex-col items-center text-center">

        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          The I DO TAXI App
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger m-0 mb-4 font-serif text-[36px] md:text-[60px] font-semibold tracking-[0.02em] leading-[1.05]">
          <span className="text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.30)] inline-block">
            No need to call us anymore
          </span>
        </h2>

        <div className="reveal-stagger flex items-center justify-center gap-3 my-3 mb-[22px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="deco-line" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </div>

        <p className="reveal-stagger text-sm md:text-base text-white/65 leading-[1.7] max-w-[600px] m-0 mb-[60px] font-normal">
          Order a taxi with the tap of a button, carpool to save more, and earn Cab Coins on every kilometer you travel.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[18px] lg:gap-[22px] mb-14">
          {APP_FEATURES.map((f, i) => (
            <div key={i} className="reveal-stagger glass-card text-left p-[26px] md:p-[30px] rounded-[10px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-lg bg-gold-gradient text-[#0a1736] mb-[20px] shrink-0 shadow-[0_6px_22px_rgba(212,175,55,0.30),inset_0_1px_0_rgba(255,255,255,0.30)]">
                {f.icon}
              </div>
              <h3 className="font-sans text-base font-bold text-white tracking-[0.01em] mb-2.5">{f.title}</h3>
              <p className="font-sans text-sm leading-[1.7] text-white/60 font-normal m-0">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal-stagger flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/us/app/ido-taxi/id1347542411"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-[10px] bg-black border border-white/15 hover:border-[#d4af37]/60 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
            aria-label="Download on the App Store"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M17.05 12.04c-.03-2.78 2.28-4.13 2.38-4.19-1.3-1.9-3.32-2.16-4.04-2.19-1.72-.17-3.36 1.01-4.23 1.01-.88 0-2.22-.99-3.65-.96-1.88.03-3.61 1.09-4.58 2.77-1.95 3.39-.5 8.41 1.4 11.16.93 1.35 2.04 2.86 3.5 2.81 1.4-.06 1.93-.91 3.62-.91 1.69 0 2.17.91 3.65.88 1.51-.03 2.46-1.37 3.38-2.73 1.07-1.56 1.51-3.07 1.53-3.15-.03-.01-2.94-1.13-2.96-4.5zM14.27 4.13c.77-.93 1.29-2.23 1.15-3.52-1.11.04-2.45.74-3.25 1.67-.71.82-1.34 2.13-1.18 3.4 1.24.1 2.5-.63 3.28-1.55z"/>
            </svg>
            <div className="text-left">
              <div className="text-[9px] tracking-[0.18em] uppercase text-white/65 leading-none mb-1">Download on the</div>
              <div className="text-[18px] font-semibold text-white tracking-tight leading-none">App Store</div>
            </div>
          </a>
          <a
            href="https://bit.ly/IDoApp"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-[10px] bg-black border border-white/15 hover:border-[#d4af37]/60 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
            aria-label="Get it on Google Play"
          >
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path fill="#34A853" d="M3.4 20.5c.18.5.66.84 1.22.85L14.5 12 4.62 2.65c-.56.01-1.04.36-1.22.85V20.5z"/>
              <path fill="#FBBC04" d="M17.5 9L14.5 12l3 3 3.6-2c.5-.28.78-.79.78-1.31s-.28-1.03-.78-1.31L17.5 9z"/>
              <path fill="#EA4335" d="M14.5 12L4.62 2.65c.13-.04.27-.05.4-.05.27 0 .54.07.78.21l11.7 6.69-3 2.5z"/>
              <path fill="#4285F4" d="M14.5 12l3 2.5-11.7 6.69c-.24.14-.51.21-.78.21-.13 0-.27-.01-.4-.05L14.5 12z"/>
            </svg>
            <div className="text-left">
              <div className="text-[9px] tracking-[0.18em] uppercase text-white/65 leading-none mb-1">Get it on</div>
              <div className="text-[18px] font-semibold text-white tracking-tight leading-none">Google Play</div>
            </div>
          </a>
        </div>

        <div className="reveal-stagger mt-7 text-[11px] tracking-[0.30em] uppercase text-white/40 font-medium">
          App by <span className="text-[#f5d76e]">Digital Trans s.a.l.</span> · #ProudlyLebanese
        </div>

      </div>
    </section>
  );
}
