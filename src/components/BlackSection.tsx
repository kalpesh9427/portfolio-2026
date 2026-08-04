"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlackSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (!pathRef.current || !sectionRef.current) return;

      const path = pathRef.current;
      const length = path.getTotalLength();

      // Set initial strokeDasharray and strokeDashoffset for path drawing
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate path drawing smoothly with scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.5,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="custom-black-section"
      className="w-full bg-white text-black relative z-20 py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Animated SVG Line (Behind Card & Text) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M 1250 180 C 1150 60, 950 0, 800 60 C 600 140, 450 250, 300 390 C 160 520, 40 540, -50 460"
            stroke="#a70f0e"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8">
        {/* Left Side: Crafting Brands */}
        <div className="flex flex-col items-start text-left max-w-sm lg:max-w-md shrink-0">
          <span className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase mb-3 flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: "#a70f0e" }}
            />
            [ 01 ] Core Focus
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black uppercase tracking-[0.03em] text-zinc-950 leading-[1.05]">
            Crafting <br />
            <span style={{ color: "#a70f0e" }}>Brands</span>
          </h3>
        </div>

        {/* Center: Bounded Interactive Card Widget containing Handshake Image */}
        <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-2xl md:rounded-[32px] overflow-hidden border border-zinc-200/90 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.15)] my-4 md:my-0 group shrink-0">
          <img
            src="/assets/hand shake.jpg"
            alt="Handshake"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: & Digital Experiences */}
        <div className="flex flex-col items-end text-right max-w-sm lg:max-w-md shrink-0">
          <span className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase mb-3 flex items-center gap-2">
            Digital Discipline
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 inline-block" />
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black uppercase tracking-[0.03em] text-zinc-950 leading-[1.05]">
            & Digital <br />
            <span
              className="font-serif italic font-normal text-zinc-900 tracking-[0.02em] whitespace-nowrap"
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', serif",
              }}
            >
              Experiences
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}



