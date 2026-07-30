"use client";

import React, { useRef } from "react";
import { useIntroTimeline } from "@/hooks/useIntroTimeline";
import "./intro.css";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Disable scroll during the intro curtain lifecycle
  React.useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Hook handles all GSAP timeline operations
  useIntroTimeline({
    containerRef,
    counterRef,
    onComplete,
  });

  return (
    <div ref={containerRef} className="intro-curtain">
      {/* Stage 1: Welcome Greeting */}
      <div className="intro-stage1">
        <div className="intro-namaste-devanagari">नमस्ते</div>
        <div className="intro-namaste-latin">NAMASTE</div>
      </div>

      {/* Stage 2: Loading Counter & Subtitles */}
      <div className="intro-stage2">
        <div ref={counterRef} className="intro-counter">
          0%
        </div>
        <div className="intro-loading-text">
          DESIGNED. CODED. LOVED.
          <br />
          BY KALPESH PRAJAPATI.
        </div>
        <div className="intro-underline-container">
          <div className="intro-underline" />
        </div>
      </div>
    </div>
  );
}
