import React, { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      const count = Math.max(40, Math.min(Math.round((cw*ch)/5000), 140));
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

  return (
    <footer id="contact" ref={containerRef} className="relative w-full py-[70px] pb-[30px] px-7 bg-[#0a1736] overflow-hidden font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <span className="absolute top-0 left-0 right-0 h-[1px] z-[2] bg-gradient-to-r from-transparent via-[#d4af37]/55 to-transparent" />
      
      <div className="relative z-10 w-full max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1.2fr] gap-10 md:gap-[60px] mb-[50px]">
          
          {/* BRAND */}
          <div className="md:col-span-1 md:row-span-1">
            <div className="mb-[18px] flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="I DO TAXI Lebanon"
                className="w-14 h-14 object-contain drop-shadow-[0_2px_18px_rgba(212,175,55,0.4)]"
              />
              <span className="font-serif text-[34px] font-bold tracking-[0.06em] leading-none text-gold-gradient drop-shadow-[0_2px_18px_rgba(212,175,55,0.30)]">
                I DO TAXI
              </span>
            </div>
            <p className="text-[15.5px] leading-[1.75] text-white font-medium max-w-[400px] m-0 mb-[28px]">
              Lebanon's modern taxi service with a tech twist. Safe, comfortable rides across all of Lebanon — just one call away. <span className="text-[#f5d76e]">#ProudlyLebanese</span>
            </p>
            <div className="flex items-center gap-[10px] flex-wrap" aria-label="Social links">
              <a className="inline-flex items-center justify-center w-10 h-10 rounded-lg no-underline border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f5d76e] transition-all duration-200 outline-none hover:border-[#d4af37]/65 hover:bg-gold-gradient hover:text-[#0a1736] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(212,175,55,0.35)]" href="https://www.facebook.com/idotaxi.lebanon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.6V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.5V14h2.8v8h3.2z" /></svg>
              </a>
              <a className="inline-flex items-center justify-center w-10 h-10 rounded-lg no-underline border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f5d76e] transition-all duration-200 outline-none hover:border-[#d4af37]/65 hover:bg-gold-gradient hover:text-[#0a1736] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(212,175,55,0.35)]" href="https://www.instagram.com/ido_taxi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              </a>
              <a className="inline-flex items-center justify-center w-10 h-10 rounded-lg no-underline border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f5d76e] transition-all duration-200 outline-none hover:border-[#d4af37]/65 hover:bg-gold-gradient hover:text-[#0a1736] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(212,175,55,0.35)]" href="https://wa.me/9613593596" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
              </a>
              <a className="inline-flex items-center justify-center w-10 h-10 rounded-lg no-underline border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f5d76e] transition-all duration-200 outline-none hover:border-[#d4af37]/65 hover:bg-gold-gradient hover:text-[#0a1736] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(212,175,55,0.35)]" href="mailto:info@idotaxi.net" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
              </a>
              <a className="inline-flex items-center justify-center w-10 h-10 rounded-lg no-underline border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f5d76e] transition-all duration-200 outline-none hover:border-[#d4af37]/65 hover:bg-gold-gradient hover:text-[#0a1736] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(212,175,55,0.35)]" href="https://bit.ly/IDoApp" target="_blank" rel="noopener noreferrer" aria-label="Mobile App">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M9 5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="18.5" r="0.9" fill="currentColor" /></svg>
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#f5d76e] font-bold mb-[22px]">Explore</div>
            <ul className="list-none p-0 m-0">
              <li className="mb-[14px]"><a className="text-[15.5px] text-white font-medium hover:text-[#f5d76e] transition-colors" href="#">Home</a></li>
              <li className="mb-[14px]"><a className="text-[15.5px] text-white font-medium hover:text-[#f5d76e] transition-colors" href="#services">Services</a></li>
              <li className="mb-[14px]"><a className="text-[15.5px] text-white font-medium hover:text-[#f5d76e] transition-colors" href="#why-us">Why Choose Us</a></li>
              <li className="mb-[14px]"><a className="text-[15.5px] text-white font-medium hover:text-[#f5d76e] transition-colors" href="https://bit.ly/IDoApp" target="_blank" rel="noopener noreferrer">Mobile App</a></li>
              <li className="mb-[14px]"><a className="text-[15.5px] text-white font-medium hover:text-[#f5d76e] transition-colors" href="tel:+9613593596">Book a Ride</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#f5d76e] font-bold mb-[22px]">Get in Touch</div>
            <ul className="list-none p-0 m-0">
              <li className="mb-[14px] flex items-center gap-[12px] text-[15.5px] text-white font-medium">
                <span className="inline-flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-[6px] bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f5d76e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>
                </span>
                <span>Beirut, Lebanon</span>
              </li>
              <li className="mb-[14px] flex items-start gap-[12px] text-[15.5px] text-white font-medium">
                <span className="inline-flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-[6px] bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f5d76e] mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <div className="flex flex-col gap-1.5">
                  <a className="text-white hover:text-[#f5d76e] transition-colors flex items-center gap-2" href="tel:+9613593596">
                    +961 3 593 596 <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5d76e]/70 font-bold">Dispatch</span>
                  </a>
                  <a className="text-white hover:text-[#f5d76e] transition-colors flex items-center gap-2" href="tel:+96170110403">
                    +961 70 110 403 <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5d76e]/70 font-bold">VIP</span>
                  </a>
                  <a className="text-white hover:text-[#f5d76e] transition-colors flex items-center gap-2" href="tel:+9614710445">
                    +961 4 710 445 <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5d76e]/70 font-bold">Office</span>
                  </a>
                </div>
              </li>
              <li className="mb-[14px] flex items-center gap-[12px] text-[15.5px] text-white font-medium">
                <span className="inline-flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-[6px] bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f5d76e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
                </span>
                <a className="text-white hover:text-[#f5d76e] transition-colors" href="https://wa.me/9613593596" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              </li>
              <li className="mb-[14px] flex items-center gap-[12px] text-[15.5px] text-white font-medium">
                <span className="inline-flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-[6px] bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f5d76e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                </span>
                <a className="text-white hover:text-[#f5d76e] transition-colors" href="mailto:info@idotaxi.net">info@idotaxi.net</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-[22px]" />
        
        <div className="flex items-center justify-between flex-col sm:flex-row gap-[14px]">
          <div className="text-[13.5px] text-white/90 tracking-[0.04em] font-medium text-center sm:text-left">
            © {new Date().getFullYear()} I DO TAXI · All rights reserved.
            <span className="hidden sm:inline mx-2 text-white/30">·</span>
            <span className="block sm:inline mt-1 sm:mt-0 text-white/60 text-[12.5px]">App by Digital Trans s.a.l.</span>
          </div>
          <div className="text-[13.5px] text-white/90 tracking-[0.04em] font-medium">
            Made with care by <a className="text-[#f5d76e] font-bold ml-1 hover:text-[#ffe89e] hover:underline transition-colors" href="https://ahos.xyz" target="_blank" rel="noopener noreferrer">Ahos.xyz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}