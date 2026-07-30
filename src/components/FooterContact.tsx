"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MeshText from "./MeshText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FooterContact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bigTextRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !bigTextRef.current) return;

    const tween = gsap.fromTo(
      bigTextRef.current,
      { yPercent: 30, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.8,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Scrolling Marquee Strip ── */}
      <div className="w-full bg-zinc-100 overflow-hidden py-5 md:py-6 select-none">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 text-zinc-900 text-2xl md:text-3xl font-bold uppercase tracking-wide">
              <span className="text-[#a70f0e]">✦</span>
              <span>Say Hello.</span>
              <span className="text-[#a70f0e]">✦</span>
              <span>Ready to connect?</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Dark Footer / Contact Section ── */}
      <footer ref={sectionRef} id="get-in-touch" className="relative w-full bg-zinc-950 text-white overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-16 pt-12 md:pt-16">

          {/*
            Each row uses the same grid structure to keep labels + values aligned:
            - col 1 (left content)
            - col 2 (label)
            - col 3 (values)
          */}

          {/* ── Row 1: Logo + "more" nav ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_200px] items-start gap-6 pb-16 md:pb-24">
            {/* Logo */}
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white text-left">
              K.
            </div>

            {/* Label */}
            <div className="hidden md:block text-zinc-500 text-sm text-left">
              more
            </div>

            {/* Values */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <span className="md:hidden text-zinc-500 text-xs uppercase tracking-widest mb-1">more</span>
              <a href="#about" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">about</a>
              <a href="#experience" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">experience</a>
              <a href="#portfolio" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">work</a>
              <a href="#services" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">services</a>
            </div>
          </div>

          {/* ── Row 2: Credits + Dot + Contact ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_200px] items-start gap-6 pb-16 md:pb-24">
            {/* Left: credits + centered dot */}
            <div className="flex items-start justify-between md:pr-24 w-full">
              <div className="flex flex-col gap-1">
                <span className="text-[#a70f0e] text-sm font-medium">@kalpesh.dev</span>
                <span className="text-zinc-500 text-xs">designed & developed by kalpesh prajapati</span>
                <span className="text-zinc-500 text-xs">original design by pranav dev</span>
              </div>

              {/* Blue/purple dot — positioned in the center/right of the left area */}
              <div className="hidden md:flex items-center pt-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full block animate-pulse"
                  style={{ backgroundColor: "#a70f0e", boxShadow: "0 0 14px rgba(167, 15, 14, 0.6)" }}
                />
              </div>
            </div>

            {/* Label */}
            <div className="hidden md:block text-zinc-500 text-sm text-left">
              contact
            </div>

            {/* Values */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <span className="md:hidden text-zinc-500 text-xs uppercase tracking-widest mb-1">contact</span>
              <a href="mailto:kalpeshprajapti.dev@gmail.com" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">
                kalpeshprajapti.dev@gmail.com
              </a>
              <a href="tel:+919427144690" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">
                +91 94271 44690
              </a>
            </div>
          </div>

          {/* ── Row 3: Back to top + Social media ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_200px] items-start gap-6 pb-16 md:pb-20">
            {/* Left */}
            <div className="text-left">
              <button
                onClick={scrollToTop}
                className="text-zinc-400 text-sm font-medium hover:text-white transition-colors duration-300 cursor-pointer text-left"
              >
                back to top
              </button>
            </div>

            {/* Label */}
            <div className="hidden md:block text-zinc-500 text-sm text-left">
              social media
            </div>

            {/* Values */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <span className="md:hidden text-zinc-500 text-xs uppercase tracking-widest mb-1">social media</span>
              <a href="https://www.linkedin.com/in/prajapati-kalpesh-it/" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">
                linkedin
              </a>
              <a href="https://github.com/kalpesh9427" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-[#a70f0e] transition-colors duration-300">
                github
              </a>
            </div>
          </div>

        </div>

        {/* ── Giant "Let's talk" text ── */}
        <div className="w-full overflow-hidden px-4 md:px-12 py-8 md:py-12 text-center">
          <h2
            ref={bigTextRef}
            className="text-[14vw] sm:text-[15vw] md:text-[16vw] font-black text-white leading-none tracking-tighter uppercase select-none whitespace-nowrap"
          >
            LET&apos;S TALK.
          </h2>
        </div>

        {/* ── Bottom bar ── */}
        <div className="w-full border-t border-zinc-800 px-6 md:px-12 lg:px-16 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-zinc-500 text-xs">
            <span>© {new Date().getFullYear()} kalpesh prajapati. all rights reserved.</span>
            <span className="text-zinc-600">built with precision & passion</span>
          </div>
        </div>
      </footer>

      {/* ── Marquee animation keyframes ── */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
};

export default FooterContact;
