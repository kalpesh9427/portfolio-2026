"use client";

import { useEffect, useState } from "react";

const MARQUEE_TEXT = "© kalpesh.dev | 2026 ";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 w-full min-h-[40vh] bg-zinc-950 text-white flex flex-col">
      {/* Top bar: location + time */}
      <div className="flex justify-between items-center px-8 md:px-16 py-1 md:py-2 text-lg text-white/70">
        <span>Located in Ahmedabad, India</span>
        {time && <span>{time}</span>}
      </div>

      {/* Middle: contact links */}
      <div className="flex flex-1 items-center justify-between px-8 md:px-16 py-4 md:py-6 w-full">
        <span className="font-black uppercase text-white/60 text-xl md:text-2xl lg:text-3xl">
          LinkedIn: TBD
        </span>

        <div className="flex flex-col items-center gap-2">
          <a
            href="mailto:kalpeshprajapti.dev@gmail.com"
            className="font-black uppercase text-white hover:opacity-70 transition-opacity text-xl md:text-2xl lg:text-3xl"
          >
            Email
          </a>
          <span className="uppercase text-white/60 text-xl md:text-2xl lg:text-3xl font-black">
            GitHub: TBD
          </span>
        </div>

        <a
          href="tel:+919427144690"
          className="font-black uppercase text-white hover:opacity-70 transition-opacity text-xl md:text-2xl lg:text-3xl"
        >
          Phone
        </a>
      </div>

      {/* Bottom: auto-moving marquee */}
      <div className="overflow-hidden shrink-0">
        <div className="flex py-1 md:py-2 marquee-track mb-15">
          <span className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black  text-base md:text-3xl lg:text-5xl text-white/90 whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
          <span
            className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black text-base md:text-lg lg:text-5xl text-white/90 whitespace-nowrap"
            aria-hidden
          >
            {[...Array(8)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
