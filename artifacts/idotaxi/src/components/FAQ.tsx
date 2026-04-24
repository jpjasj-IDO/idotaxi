import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How do I book a ride?",
    a: "You have four ways to book: through the I DO TAXI app, by calling 24/7 dispatch at +961 3 593 596, by WhatsApp, or by emailing info@idotaxi.net. The app is the fastest — open it, choose your vehicle type, and a driver is on the way."
  },
  {
    q: "What are Cab Coins and how do they work?",
    a: "Cab Coins are our loyalty rewards. You earn them automatically with every kilometer you ride through the I DO TAXI app, and you can redeem them straight from the app for discounts on future trips. The more you ride, the more you save."
  },
  {
    q: "Can I carpool to save money?",
    a: "Yes. When ordering in the app, simply pick the vehicle type 'Carpool' and you'll share the ride with others heading in the same direction — a great way to lower your daily commute cost."
  },
  {
    q: "What is TAXIDO VIP?",
    a: "TAXIDO VIP is our premium chauffeur arm — refined vehicles and trained drivers for executives, hotels, weddings, and special occasions. Reach VIP dispatch directly on +961 70 110 403, anytime."
  },
  {
    q: "Do you operate 24/7?",
    a: "Yes. Our dispatch center and drivers are available 24 hours a day, 7 days a week, 365 days a year, including all holidays. Three lines are open: dispatch +961 3 593 596, VIP +961 70 110 403, and our office +961 4 710 445."
  },
  {
    q: "Can I chat with my driver?",
    a: "Yes — directly through WhatsApp from inside the app. No need to share or dial a number; just tap to message your assigned driver."
  },
  {
    q: "Do you accept card payments?",
    a: "Yes. If you book through the I DO TAXI app, you can securely pay with a credit or debit card. Cash is also accepted for all rides."
  },
  {
    q: "Can I book in advance for an airport pickup?",
    a: "Absolutely. We strongly recommend booking BEY (Beirut International) transfers in advance. Provide your flight number and we'll track your arrival, so a driver is waiting even if your flight is delayed."
  },
  {
    q: "Do your drivers speak English or French?",
    a: "Many of our drivers are bilingual or trilingual (Arabic, English, French). If you specifically need an English- or French-speaking driver for a tour or corporate trip, please flag it when booking."
  },
  {
    q: "How do I get the app?",
    a: "Download the I DO TAXI app on the App Store or Google Play (links above), or simply visit bit.ly/IDoApp from your phone. The app is built and maintained by Digital Trans s.a.l."
  }
];

export default function FAQ() {
  const innerRef = useRef<HTMLDivElement>(null);

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
    <section className="relative w-full py-[80px] md:py-[110px] px-4 md:px-7 bg-[#0a1736]">
      <div ref={innerRef} className="max-w-[800px] mx-auto flex flex-col items-center">
        
        <div className="reveal-stagger flex items-center gap-[14px] text-[10px] tracking-[0.50em] uppercase text-white/50 mb-7 font-medium text-center">
          <span className="w-7 h-px bg-[#d4af37]/55" />
          Questions & Answers
          <span className="w-7 h-px bg-[#d4af37]/55" />
        </div>

        <h2 className="reveal-stagger m-0 mb-12 font-serif text-[32px] md:text-[44px] font-semibold tracking-[0.02em] leading-[1.05] text-white text-center">
          Frequently Asked
        </h2>

        <div className="reveal-stagger w-full">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#d4af37]/20">
                <AccordionTrigger className="text-left font-serif text-[18px] md:text-[20px] text-white hover:text-[#f5d76e] py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-[15px] leading-[1.7] pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}