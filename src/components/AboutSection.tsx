"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const text =
  "I am Kalpesh Prajapati, a results-driven MERN Stack Developer with hands-on experience in building scalable, high-performance, and user-centric web applications. Specializing in modern JavaScript technologies including React.js, Next.js, Node.js, Express.js, and MongoDB, I craft clean, maintainable code and robust digital solutions. My core expertise lies in designing intuitive, responsive UI components alongside developing secure RESTful APIs for seamless client-server integration. I am deeply committed to performance optimization, cross-browser compatibility, and implementing web development best practices to ensure smooth, lightning-fast user experiences across all devices. With a strong foundation in computer engineering and an unwavering passion for learning, I continuously refine my skills to stay at the forefront of modern web engineering. I thrive on solving complex technical challenges, collaborating effectively in dynamic environments, and delivering impactful software products that combine seamless functionality with exceptional visual excellence.";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current || !containerRef.current) return;

    // Split text into character spans
    textRef.current.innerHTML = "";
    const characters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.opacity = "0.2";
      span.style.color = "#a1a1aa";
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      textRef.current!.appendChild(span);
      return span;
    });

    // Pin the container while letters animate
    const pinST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: false,
    });

    // Animate letters from dim → black over the full scroll of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl.to(characters, {
      opacity: 1,
      color: "#000000",
      stagger: { each: 0.1, from: "start" },
      ease: "none",
    });

    // Animate side circles vertically matching paragraph height over scrub
    if (leftCircleRef.current && rightCircleRef.current && textRef.current) {
      const textHeight = textRef.current.offsetHeight;
      const targetY = Math.max(0, textHeight - 44);
      tl.to(
        [leftCircleRef.current, rightCircleRef.current],
        {
          y: targetY,
          ease: "none",
        },
        0
      );
    }

    return () => {
      pinST.kill();
      tl.kill();
    };
  }, []);

  // ── Smooth CSS/GSAP animation on bar-mark rects ──
  useEffect(() => {
    if (!svgRef.current) return;
    const bars = svgRef.current.querySelectorAll<SVGRectElement>("rect[data-bar]");
    const tween = gsap.to(bars, {
      opacity: 0.4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.15,
        from: "random",
      },
      ease: "power1.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full bg-white h-[200vh] md:h-[300vh]">
      {/* Pinned container — full viewport height, centered layout */}
      <div
        ref={containerRef}
        className="w-full flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        {/* Header: label + barcode */}
        <div className="flex flex-col items-center mb-6 md:mb-14 gap-2 md:gap-3">
          <p className="text-[#a70f0e] text-sm md:text-base font-medium tracking-wide">
            What You Can Expect{" "}
            <sup className="text-[0.65em] tracking-widest opacity-80">(03)</sup>
          </p>

          {/* Lottie-style bar mark — exact proportions from reference */}
          <svg
            ref={svgRef}
            viewBox="0 0 241 118"
            className="w-40 md:w-52 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* ── Full-height bars (h≈113) on left cluster ── */}
            {/* Wide left sentinel */}
            <rect data-bar x="0" y="0" width="15.77" height="112.62" rx="1.25" fill="#a70f0e" />
            {/* Thin bars */}
            <rect data-bar x="18.02" y="0" width="4.50" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="24.78" y="0" width="4.50" height="112.62" rx="1.25" fill="#a70f0e" />

            {/* ── Shorter bars (h≈90) in the middle cluster ── */}
            {/* Wide short block */}
            <rect data-bar x="33.79" y="0" width="22.52" height="90.09" rx="1.25" fill="#a70f0e" />
            {/* Gap then another wide short block */}
            <rect data-bar x="60.81" y="0" width="22.52" height="90.09" rx="1.25" fill="#a70f0e" />
            {/* Medium short blocks */}
            <rect data-bar x="85.59" y="0" width="13.51" height="90.09" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="101.36" y="0" width="4.50" height="90.09" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="108.11" y="0" width="4.50" height="90.09" rx="1.25" fill="#a70f0e" />
            {/* THE BIG BLOCK — the centerpiece */}
            <rect data-bar x="117.12" y="0" width="56.31" height="90.09" rx="1.25" fill="#a70f0e" />

            {/* ── Full-height bars on right cluster ── */}
            <rect data-bar x="177.93" y="0" width="11.26" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="191.45" y="0" width="15.77" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="209.47" y="0" width="4.50" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="218.48" y="0" width="4.50" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="225.23" y="0" width="4.50" height="112.62" rx="1.25" fill="#a70f0e" />
            <rect data-bar x="231.99" y="0" width="9.01" height="112.62" rx="1.25" fill="#a70f0e" />

            {/* Small dot (between bars and label) */}
            <rect x="52.50" y="109.45" width="2.76" height="2.76" fill="#a70f0e" />

            {/* Centered label */}
            <text
              x="120.5"
              y="116"
              textAnchor="middle"
              fontSize="14"
              fontFamily="monospace"
              letterSpacing="1.5"
              fill="#a70f0e"
            >
              kalpesh.dev
            </text>
          </svg>
        </div>

        {/* Main text row: left letter · text · right letter */}
        <div className="relative w-full flex items-start justify-center px-6 sm:px-8 md:px-16">
          {/* Left circled letter */}
          <div
            ref={leftCircleRef}
            className="hidden md:flex absolute left-8 md:left-16 xl:left-24 items-center justify-center rounded-full border-2 border-zinc-900 text-zinc-900"
            style={{ width: 44, height: 44, fontSize: 16, fontWeight: 600, top: 0 }}
          >
            K
          </div>

          {/* Manifesto text */}
          <h2
            ref={textRef}
            className="text-center leading-[1.3] md:leading-[1.2] font-extrabold md:font-black text-zinc-300 max-w-4xl relative break-words"
            style={{ fontSize: "clamp(1.05rem, 3.8vw, 3.2rem)" }}
          >
            {text}
          </h2>

          {/* Right circled letter */}
          <div
            ref={rightCircleRef}
            className="hidden md:flex absolute right-8 md:right-16 xl:right-24 items-center justify-center rounded-full border-2 border-zinc-900 text-zinc-900"
            style={{ width: 44, height: 44, fontSize: 16, fontWeight: 600, top: 0 }}
          >
            P
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
