import React, { useEffect, useRef } from 'react';

const STEPS = [
  {
    num: "01",
    title: "Book Your Ride",
    desc: "Call dispatch, send a WhatsApp, or tap to book in our mobile app. Immediate dispatch or advance booking."
  },
  {
    num: "02",
    title: "Track Your Driver",
    desc: "Receive your driver's details and watch them arrive in real-time. No guessing, no waiting outside."
  },
  {
    num: "03",
    title: "Ride & Pay",
    desc: "Enjoy a safe, comfortable journey. Pay with cash directly, or use card via the mobile app."
  }
];

export default function HowItWorks() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const els = inner.querySelectorAll('.reveal-stagger');
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 150 + 60);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full py-[80px] md:py-[120px] px-4 md:px-7 bg-[#0a1736] overflow-hidden">
      <div ref={innerRef} className="max-w-[1180px] mx-auto flex flex-col items-center text-center relative z-10">
        
        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          The Process
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger m-0 mb-16 md:mb-24 font-serif text-[36px] md:text-[52px] font-semibold tracking-[0.02em] leading-[1.05] text-white">
          Simple, Fast, Reliable
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent -z-10" />

          {STEPS.map((step, i) => (
            <div key={i} className="reveal-stagger flex flex-col items-center group">
              <div className="w-[80px] h-[80px] rounded-full bg-[#0a1736] border border-[#d4af37]/30 flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <div className="absolute inset-2 rounded-full border border-[#d4af37]/10" />
                <span className="font-serif text-[28px] font-bold text-gold-gradient">{step.num}</span>
              </div>
              <h3 className="font-serif text-[22px] font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-sm text-white/60 leading-[1.6] max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}