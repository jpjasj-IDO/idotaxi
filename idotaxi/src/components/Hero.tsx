import React, { useEffect, useRef } from 'react';

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
      
      // Draw stars
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

      // Draw streaks
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
    <div ref={containerRef} className="relative w-full min-h-[720px] max-h-screen flex items-center justify-center px-4 py-28 md:py-32 overflow-hidden bg-transparent">
      {/* Radial Gold Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.08]" />
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div ref={innerRef} className="relative z-10 w-full max-w-[760px] mx-auto flex flex-col items-center text-center">
        
        <div className="reveal-stagger mb-7">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="I DO TAXI Lebanon — gold-rimmed taxi badge with Lebanese flag"
            width={140}
            height={140}
            className="w-[110px] h-[110px] md:w-[140px] md:h-[140px] object-contain drop-shadow-[0_8px_40px_rgba(212,175,55,0.55)]"
          />
        </div>

        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.5em] uppercase text-white/50 mb-7 font-medium">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          <span className="text-[#f5d76e]">🇱🇧</span> Proudly Lebanese · Since 2015
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h1 className="reveal-stagger m-0 mb-[18px] font-serif text-[44px] md:text-[64px] lg:text-[110px] font-semibold tracking-[0.04em] leading-none">
          <span className="text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] inline-block">
            I DO TAXI
          </span>
        </h1>

        <div className="reveal-stagger flex items-center justify-center gap-3 my-[14px] mb-[30px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="deco-line" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </div>

        <p className="reveal-stagger text-base text-white/65 leading-[1.8] max-w-[580px] m-0 mb-12 font-normal">
          Beirut's modern taxi service with a tech twist. <br className="hidden sm:block" /> 
          Safe, comfortable rides across all of Lebanon — just one call away.
        </p>

        <div className="reveal-stagger flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 w-full sm:w-auto">
          <a className="btn-primary w-full sm:w-auto justify-center" href="tel:+9613593596">
            <span className="relative z-10 flex items-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mr-2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="relative z-10">Book a Ride</span>
            <span className="shimmer-layer" />
          </a>
          <a className="btn-ghost w-full sm:w-auto justify-center" href="https://wa.me/9613593596" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <a className="btn-ghost w-full sm:w-auto justify-center" href="https://bit.ly/IDoApp" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Get the App</span>
          </a>
        </div>

        <div className="reveal-stagger flex flex-col items-center gap-6 w-full max-w-[320px]">
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
          <a className="inline-flex flex-col items-center gap-2 text-decoration-none outline-none bg-transparent border-none transition-transform duration-200 hover:-translate-y-0.5 group" href="tel:+9613593596">
            <span className="text-[9.5px] tracking-[0.42em] uppercase text-[#f5d76e]/80 font-bold">Dispatch · 24/7</span>
            <span className="font-serif text-xl sm:text-[26px] text-white font-semibold tracking-[0.06em] tabular-nums group-hover:text-[#f5d76e] transition-colors">+961 3 593 596</span>
          </a>
        </div>

      </div>
    </div>
  );
}