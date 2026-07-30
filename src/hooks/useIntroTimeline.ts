"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

interface UseIntroTimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  counterRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

export function useIntroTimeline({
  containerRef,
  counterRef,
  onComplete,
}: UseIntroTimelineProps) {
  const isCompleteTriggered = useRef(false);

  useGSAP(
    () => {
      // 1. Accessibility check: reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      // 2. Master animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isCompleteTriggered.current) {
            isCompleteTriggered.current = true;
            onComplete();
          }
        },
      });

      // Stage 1: Welcome (Namaste Greeting)
      tl.set([".intro-namaste-devanagari", ".intro-namaste-latin"], {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      });

      tl.to([".intro-namaste-devanagari", ".intro-namaste-latin"], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
      });

      tl.to({}, { duration: 0.8 }); // Hold welcome text

      tl.to([".intro-namaste-devanagari", ".intro-namaste-latin"], {
        opacity: 0,
        y: -20,
        filter: "blur(6px)",
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.in",
      });

      // Stage 2: Loading (Counter & Subtext)
      tl.to(
        ".intro-stage2",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        ">-0.2"
      );

      // Underline animation
      tl.to(
        ".intro-underline",
        {
          scaleX: 1,
          duration: 2.6,
          ease: "power1.inOut",
        },
        "<"
      );

      // Percentage counting using custom object tracking
      const counterVal = { value: 0 };
      tl.to(
        counterVal,
        {
          value: 100,
          duration: 2.6,
          ease: "power1.inOut",
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(
                counterVal.value
              )}%`;
            }
          },
        },
        "<"
      );

      // Fade Stage 2 out
      tl.to(
        ".intro-stage2",
        {
          opacity: 0,
          y: -20,
          filter: "blur(6px)",
          duration: 0.6,
          ease: "power2.in",
        },
        ">+0.1"
      );

      // Stage 3: Reveal (Curtain slides up)
      tl.to(
        containerRef.current,
        {
          y: "-101%",
          duration: 1.2,
          ease: "expo.inOut",
        },
        ">-0.1"
      );
    },
    { scope: containerRef }
  );
}
