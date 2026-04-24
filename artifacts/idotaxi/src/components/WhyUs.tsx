import React, { useEffect, useRef } from 'react';

const WHY_US_CARDS = [
  {
    title: "Easy Booking",
    desc: "Book in seconds through our mobile app, phone, WhatsApp or website — whichever suits you best.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.5 14.5l2.2 2.2 4.3-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Licensed & Trained Drivers",
    desc: "Multilingual, background-checked drivers with full GPS tracking on every ride.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="9" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5.5 16.2c.6-1.5 2-2.4 3.5-2.4s2.9.9 3.5 2.4M14 10h5M14 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Transparent Pricing",
    desc: "Upfront fares with no hidden fees and no surge pricing — you'll always know what you're paying before you ride.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 7v10M14.5 9.5c-.6-.7-1.6-1-2.5-1-1.5 0-2.7.7-2.7 1.9 0 1.1.9 1.6 2.5 1.9l1.4.3c1.6.3 2.5.8 2.5 1.9 0 1.2-1.2 1.9-2.7 1.9-1 0-1.9-.3-2.5-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Reliable Airport Transfers",
    desc: "Personalised pickup signs, flight tracking, and bookings accepted right up to your arrival.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M2 16l8-3 1-7 2-3 2 3 1 7 8 3v2l-9-2v3l3 2v2l-5-1-5 1v-2l3-2v-3l-9 2v-2z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Easy Cancellation",
    desc: "Plans change — and that's fine. Cancel anytime with simple, transparent terms.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9.5 13.5l5 5M14.5 13.5l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Real-Time Tracking",
    desc: "Watch your driver approach in real time on the I DO TAXI app — know exactly when they'll arrive.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }
];

export default function WhyUs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = 0, ch = 0, tick = 0;
    let stars: any[] = [];
    let animationFrameId: number;

    const makeStar = () => {
      const rand = Math.random();
      const size = rand < 0.75 ? Math.random()*0.4 + 0.2
               : rand < 0.95 ? Math.random()*0.5 + 0.5
               : Math.random()*0.7 + 1.0;
      const palette = [[255,255,255],[255,250,235],[255,235,200],[245,215,110],[212,175,55]];
      return {
        x: Math.random()*cw, y: Math.random()*ch, r: size,
        color: palette[Math.floor(Math.random()*palette.length)],
        alpha: Math.random()*0.40 + 0.20,
        twinkleAmp:   Math.random()*0.30 + 0.05,
        twinkleSpeed: Math.random()*0.022 + 0.005,
        phase: Math.random()*Math.PI*2
      };
    };

    const populate = () => {
      cw = canvas.width = wrap.offsetWidth;
      ch = canvas.height = wrap.offsetHeight;
      const count = Math.max(70, Math.min(Math.round((cw*ch)/3500), 220));
      stars = Array.from({ length: count }, makeStar);
    };

    const frame = () => {
      tick++;
      ctx.clearRect(0, 0, cw, ch);
      
      stars.forEach(s => {
        let t = s.alpha + s.twinkleAmp * Math.sin(tick * s.twinkleSpeed + s.phase);
        t = Math.max(0.05, Math.min(1, t));
        const c = s.color;
        
        if (s.r > 1.0) {
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          grd.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${t * 0.20})`);
          grd.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI*2);
          ctx.fillStyle = grd; ctx.fill();
        }
        
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${t})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => populate());
    resizeObserver.observe(wrap);
    populate();
    frame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const headerEls = inner.querySelectorAll('.reveal-stagger.header-el');
        const cards = inner.querySelectorAll('.reveal-stagger.card-el');
        
        headerEls.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 100 + 60);
        });
        cards.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), 500 + i * 90);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" ref={containerRef} className="relative w-full py-[30px] md:py-[110px] px-4 md:px-7 overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div ref={innerRef} className="relative z-10 w-full max-w-[1180px] mx-auto flex flex-col items-center text-center">
        
        <div className="reveal-stagger header-el flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          The I DO TAXI Difference
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger header-el m-0 mb-4 font-serif text-[36px] md:text-[64px] font-semibold tracking-[0.02em] leading-[1.05]">
          <span className="text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.30)] inline-block">
            Why Choose Us
          </span>
        </h2>

        <div className="reveal-stagger header-el flex items-center justify-center gap-3 my-3 mb-[22px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="deco-line" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </div>

        <p className="reveal-stagger header-el text-sm md:text-base text-white/60 leading-[1.7] max-w-[580px] m-0 mb-11 md:mb-[60px] font-normal">
          A modern Lebanese taxi service built around your comfort, safety and time.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[18px] lg:gap-[22px]">
          {WHY_US_CARDS.map((card, i) => (
            <div key={i} className="reveal-stagger card-el glass-card text-left p-[26px] md:p-[32px] md:px-[28px] rounded-[10px]">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-lg bg-gold-gradient text-[#0a1736] mb-[22px] shrink-0 shadow-[0_6px_22px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,255,255,0.30)]">
                {card.icon}
              </div>
              <h3 className="font-sans text-base font-bold text-white tracking-[0.01em] mb-2.5">
                {card.title}
              </h3>
              <p className="font-sans text-sm leading-[1.7] text-white/60 font-normal m-0">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}