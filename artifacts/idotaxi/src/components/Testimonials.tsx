import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    text: "Great experience and very reliable. Surprisingly, there's an actual working meter — a nice touch. The car was in excellent condition too. Highly recommended.",
    author: "Elie K.",
    role: "Google Reviews"
  },
  {
    text: "Found this taxi company on Google and decided to give it a try because of the positive reviews. The service definitely lived up to the comments. The driver was professional and friendly, and he arrived in 15 minutes as promised. Highly recommend!",
    author: "Akbota K.",
    role: "Google Reviews"
  },
  {
    text: "I tried I DO TAXI and was really impressed by the drivers' punctuality. They're professional, know the rules of the road, and above all, drive carefully. What's especially great is that the cost is much lower compared to other companies.",
    author: "Zeina D.",
    role: "Google Reviews"
  }
];

export default function Testimonials() {
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
    <section className="relative w-full py-[80px] bg-[#0a1736] border-y border-[#d4af37]/10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      
      <div ref={innerRef} className="relative z-10 max-w-[1180px] mx-auto px-4 md:px-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {REVIEWS.map((review, i) => (
            <div key={i} className="reveal-stagger flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex gap-1 mb-4 text-[#f5d76e]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-[15px] italic text-white/80 leading-[1.8] mb-6 flex-1 font-serif">
                "{review.text}"
              </p>
              <div>
                <p className="text-sm font-semibold text-white tracking-wide">{review.author}</p>
                <p className="text-[11px] text-[#d4af37] uppercase tracking-wider mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}