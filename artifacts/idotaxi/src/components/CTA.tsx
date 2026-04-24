import React, { useEffect, useRef } from 'react';

export default function CTA() {
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
      const size = Math.random() < 0.85 ? Math.random()*0.4 + 0.2 : Math.random()*0.6 + 0.6;
      const palette = [[255,255,255],[255,235,200],[245,215,110],[212,175,55]];
      return {
        x: Math.random()*cw, y: Math.random()*ch, r: size,
        color: palette[Math.floor(Math.random()*palette.length)],
        alpha: Math.random()*0.30 + 0.15,
        twinkleAmp: Math.random()*0.25 + 0.05,
        twinkleSpeed: Math.random()*0.020 + 0.004,
        phase: Math.random()*Math.PI*2
      };
    };

    const populate = () => {
      cw = canvas.width = wrap.offsetWidth;
      ch = canvas.height = wrap.offsetHeight;
      const count = Math.max(50, Math.min(Math.round((cw*ch)/4000), 150));
      stars = Array.from({ length: count }, makeStar);
    };

    const frame = () => {
      tick++;
      ctx.clearRect(0, 0, cw, ch);
      
      stars.forEach(s => {
        let t = s.alpha + s.twinkleAmp * Math.sin(tick * s.twinkleSpeed + s.phase);
        t = Math.max(0.05, Math.min(1, t));
        const c = s.color;
        
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
    <section ref={containerRef} className="relative w-full py-[100px] md:py-[140px] px-4 md:px-7 overflow-hidden border-t border-[#d4af37]/20 bg-[#060d20]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div ref={innerRef} className="relative z-10 w-full max-w-[760px] mx-auto flex flex-col items-center text-center">
        
        <h2 className="reveal-stagger m-0 mb-6 font-serif text-[40px] md:text-[56px] font-semibold tracking-[0.02em] leading-[1.05] text-white">
          Ready when you are.
        </h2>

        <p className="reveal-stagger text-lg md:text-xl text-[#f5d76e] font-serif italic mb-[48px]">
          Dispatch is one tap away.
        </p>

        <div className="reveal-stagger flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a className="btn-primary w-full sm:w-auto justify-center !px-10" href="tel:+9613593596">
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
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </section>
  );
}