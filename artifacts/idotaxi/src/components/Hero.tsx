import React, { useEffect, useRef } from 'react';
import { ChevronDown, Star, Shield, Clock, MapPin } from 'lucide-react';

export default function Hero() {
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
    let streaks: any[] = [];
    let animationFrameId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const makeStar = () => {
      const rand = Math.random();
      const size = rand < 0.7 ? Math.random()*0.5 + 0.2
               : rand < 0.93 ? Math.random()*0.6 + 0.6
               : Math.random()*0.9 + 1.2;
      const palette = [[255,255,255],[255,250,235],[255,235,200],[245,215,110],[212,175,55]];
      return {
        x: Math.random()*cw, y: Math.random()*ch, r: size,
        color: palette[Math.floor(Math.random()*palette.length)],
        alpha: Math.random()*0.45 + 0.25,
        twinkleAmp:   Math.random()*0.35 + 0.05,
        twinkleSpeed: Math.random()*0.025 + 0.005,
        phase: Math.random()*Math.PI*2
      };
    };

    const makeStreak = () => {
      const fromLeft = Math.random() < 0.5;
      const speed = 0.8 + Math.random()*1.6;
      return {
        x: fromLeft ? -200 : cw + 200,
        y: ch * (0.10 + Math.random()*0.80),
        vx: fromLeft ? speed : -speed,
        len: 80 + Math.random()*140,
        alpha: 0.14 + Math.random()*0.22,
        thickness: 0.5 + Math.random()*0.9
      };
    };

    const populate = () => {
      cw = canvas.width = wrap.offsetWidth;
      ch = canvas.height = wrap.offsetHeight;
      const count = Math.max(90, Math.min(Math.round((cw*ch)/3000), 280));
      stars = Array.from({ length: count }, makeStar);
      
      const sc = window.innerWidth < 700 ? 3 : 6;
      streaks = Array.from({ length: sc }, makeStreak);
    };

    const frame = () => {
      tick++;
      ctx.clearRect(0, 0, cw, ch);
      
      stars.forEach(s => {
        let t = s.alpha + s.twinkleAmp * Math.sin(tick * s.twinkleSpeed + s.phase);
        t = Math.max(0.05, Math.min(1, t));
        const c = s.color;
        
        if (s.r > 1.2) {
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          grd.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${t * 0.22})`);
          grd.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI*2);
          ctx.fillStyle = grd; ctx.fill();
        }
        
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${t})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        streaks.forEach((sk, i) => {
          sk.x += sk.vx;
          const dir = sk.vx > 0 ? 1 : -1;
          const x2 = sk.x - dir * sk.len;
          const grd = ctx.createLinearGradient(sk.x, sk.y, x2, sk.y);
          grd.addColorStop(0,   `rgba(255,235,170,${sk.alpha})`);
          grd.addColorStop(0.4, `rgba(245,215,110,${sk.alpha*0.7})`);
          grd.addColorStop(1,   `rgba(212,175,55,0)`);
          
          ctx.beginPath();
          ctx.moveTo(sk.x, sk.y); ctx.lineTo(x2, sk.y);
          ctx.strokeStyle = grd; ctx.lineWidth = sk.thickness; ctx.lineCap = 'round';
          ctx.stroke();
          
          if ((sk.vx > 0 && sk.x - sk.len > cw + 60) ||
              (sk.vx < 0 && sk.x + sk.len < -60)) {
            streaks[i] = makeStreak();
          }
        });
      }

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
        const els = inner.querySelectorAll('.reveal-stagger');
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 100 + 60);
        });
      });
    }, { threshold: 0.06 });
    
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-0 overflow-hidden bg-transparent">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[200px] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5d76e] rounded-full blur-[180px] opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4af37] rounded-full blur-[180px] opacity-[0.02]" />
      </div>

      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div ref={innerRef} className="relative z-10 w-full max-w-[860px] mx-auto flex flex-col items-center text-center">
        
        {/* Logo with orbiting ring */}
        <div className="reveal-stagger mb-10 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full border border-[#d4af37]/10 animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[160px] h-[160px] md:w-[195px] md:h-[195px] rounded-full border border-[#d4af37]/5 animate-[spin_30s_linear_infinite_reverse]" />
          </div>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="I DO TAXI Lebanon"
            width={130}
            height={130}
            className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] object-contain drop-shadow-[0_8px_50px_rgba(212,175,55,0.5)]"
          />
        </div>

        {/* Established badge */}
        <div className="reveal-stagger inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#d4af37]/15 bg-[#0a1736]/60 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#f5d76e]/80 font-medium">Est. 2015 · Beirut, Lebanon</span>
        </div>

        {/* Main heading */}
        <h1 className="reveal-stagger m-0 mb-5 font-serif">
          <span className="block text-[52px] sm:text-[72px] md:text-[100px] lg:text-[130px] font-bold tracking-[0.01em] leading-[0.85] text-gold-gradient drop-shadow-[0_6px_50px_rgba(212,175,55,0.35)]">
            I DO TAXI
          </span>
        </h1>

        {/* Tagline */}
        <p className="reveal-stagger text-sm sm:text-base md:text-lg text-white/45 font-light tracking-[0.15em] uppercase mb-10">
          Your Journey, Our Priority
        </p>

        {/* Prominent CTA Buttons */}
        <div className="reveal-stagger flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 w-full sm:w-auto">
          {/* Primary - WhatsApp */}
          <a 
            href="https://wa.me/9613593596" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-[15px] rounded-lg bg-[#d4af37] text-[#0a0f1a] font-semibold text-[13px] tracking-wide overflow-hidden shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] hover:bg-[#e0c14a] transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            Book via WhatsApp
            <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
          </a>

          {/* Secondary - Call */}
          <a 
            href="tel:+9613593596" 
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-[15px] rounded-lg border border-[#d4af37]/25 text-white/80 hover:text-white font-medium text-[13px] tracking-wide hover:bg-[#d4af37]/8 hover:border-[#d4af37]/50 transition-all duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Dispatch
          </a>

          {/* Tertiary - App */}
          <a 
            href="https://tosto.re/idotaxi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-[15px] rounded-lg border border-white/10 text-white/55 hover:text-white/90 font-medium text-[13px] tracking-wide hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download App
          </a>
        </div>

        {/* Trust indicators */}
        <div className="reveal-stagger flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
          <div className="flex items-center gap-2 text-white/35">
            <Shield size={13} className="text-[#d4af37]/60" />
            <span className="text-[11px] tracking-wider font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-white/35">
            <Clock size={13} className="text-[#d4af37]/60" />
            <span className="text-[11px] tracking-wider font-medium">Available Around the Clock</span>
          </div>
          <div className="flex items-center gap-2 text-white/35">
            <MapPin size={13} className="text-[#d4af37]/60" />
            <span className="text-[11px] tracking-wider font-medium">Serving All of Lebanon</span>
          </div>
        </div>

        {/* Phone number with refined styling */}
        <div className="reveal-stagger flex flex-col items-center gap-5 w-full max-w-[340px]">
          <div className="flex items-center gap-4 w-full">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/30" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#d4af37]/50 font-bold">Dispatch</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/30" />
          </div>
          <a 
            href="tel:+9613593596" 
            className="inline-flex flex-col items-center gap-1.5 no-underline outline-none bg-transparent border-none transition-all duration-300 hover:-translate-y-1 group"
          >
            <span className="font-serif text-2xl sm:text-[30px] text-white font-semibold tracking-[0.04em] tabular-nums group-hover:text-[#f5d76e] transition-colors duration-300">
              +961 3 593 596
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-medium group-hover:text-white/40 transition-colors duration-300">
              Available 24/7
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal-stagger absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/15 font-medium">Scroll</span>
          <ChevronDown size={16} className="text-white/15 animate-bounce" />
        </div>

      </div>
    </div>
  );
}