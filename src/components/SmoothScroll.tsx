"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScroll = ({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Intercept anchor clicks with hash and let Lenis perform the smooth scroll
    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      // lenis.scrollTo accepts an element or a number
      // call scrollTo and let Lenis animate to the element
      // @ts-ignore - lenis types may vary
      lenis.scrollTo(el);
    };
    document.addEventListener("click", onDocumentClick);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", onDocumentClick);
      gsap.ticker.remove(raf);
    };
  }, []);

  // React to disabled prop changes — stop/start Lenis
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (disabled) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [disabled]);

  return <>{children}</>;
};

export default SmoothScroll;
