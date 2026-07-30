"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  theme: "dark" | "light" | "red";
}

const services: ServiceItem[] = [
  {
    number: "01",
    tag: "OPTIMIZATION",
    title: "PERFORMANCE FIRST",
    description:
      "I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.",
    features: ["Core Web Vitals", "Asset Optimization", "Fast Load Speed"],
    theme: "dark",
  },
  {
    number: "02",
    tag: "ARCHITECTURE",
    title: "CLEAN & SCALABLE CODE",
    description:
      "I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.",
    features: ["Modular Architecture", "Maintainable Base", "TypeScript First"],
    theme: "light",
  },
  {
    number: "03",
    tag: "DESIGN & INTERACTION",
    title: "MODERN UI & UX",
    description:
      "I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.",
    features: ["Fluid Motion", "Responsive Layouts", "Intuitive UX"],
    theme: "red",
  },
  {
    number: "04",
    tag: "TECHNICAL SEO",
    title: "SEO & BEST PRACTICES",
    description:
      "Websites are built using modern best practices and strong technical SEO foundations from the very beginning of the project. This includes clean structure, accessibility, semantic markup, and optimization techniques that support visibility, performance, and long-term growth.",
    features: ["Semantic Markup", "Search Indexing", "Accessibility (a11y)"],
    theme: "dark",
  },
  {
    number: "05",
    tag: "LAUNCH & QA",
    title: "RELIABLE DELIVERY",
    description:
      "From the initial idea to the final launch, I focus on clear communication, thoughtful planning, and reliable delivery at every stage of the process. Each project is carefully tested and refined to ensure stability, quality, and confidence when the product goes live.",
    features: ["Quality Assurance", "End-to-End Testing", "Seamless Launch"],
    theme: "light",
  },
];

const HEADING_LINES = ["How I Approach", "Every Project?"];

function AnimatedLine({
  text,
  charsRef,
  startIndex,
}: {
  text: string;
  charsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  startIndex: number;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span
            ref={(el) => {
              charsRef.current[startIndex + i] = el;
            }}
            className="inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </>
  );
}

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const headingCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headingDividerRef = useRef<HTMLDivElement | null>(null);

  // Heading character reveal animation
  useGSAP(
    () => {
      if (!headingWrapRef.current) return;

      const chars = headingCharsRef.current.filter(
        Boolean
      ) as HTMLSpanElement[];

      gsap.set(chars, {
        yPercent: 110,
        opacity: 0,
        rotateZ: 8,
      });

      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: headingWrapRef.current,
          start: "top 85%",
          end: "top 35%",
          toggleActions: "play none none reverse",
        },
      });

      if (headingDividerRef.current) {
        gsap.fromTo(
          headingDividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headingWrapRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: headingWrapRef }
  );

  // Stacking Card Animation with clean Pinning & PinSpacing
  useGSAP(
    () => {
      if (!containerRef.current || !cardsWrapRef.current) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const totalCards = cards.length;

      // Pin the section while cards stack smoothly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        tl.fromTo(
          card,
          {
            yPercent: 140,
            scale: 0.9,
          },
          {
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }
        );

        for (let prevIndex = 0; prevIndex < index; prevIndex++) {
          const depth = index - prevIndex;
          tl.to(
            cards[prevIndex],
            {
              scale: Math.max(1 - depth * 0.04, 0.84),
              y: -depth * 12,
              filter: `brightness(${Math.max(1 - depth * 0.08, 0.7)})`,
              duration: 1,
              ease: "power2.out",
            },
            "<"
          );
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  const line1Length = HEADING_LINES[0].length;

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-20 w-full bg-white min-h-screen flex flex-col justify-center py-10 md:py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-12 w-full">
        {/* Heading */}
        <div ref={headingWrapRef} className="pb-4 md:pb-6 mb-6 md:mb-8">
          <h2
            className="text-[8vw] md:text-[4vw] font-black uppercase tracking-tight leading-[1.05] md:leading-[1.1]"
            style={{ color: "#a70f0e" }}
          >
            <AnimatedLine
              text={HEADING_LINES[0]}
              charsRef={headingCharsRef}
              startIndex={0}
            />
            <br />
            <AnimatedLine
              text={HEADING_LINES[1]}
              charsRef={headingCharsRef}
              startIndex={line1Length}
            />
          </h2>
          <div
            ref={headingDividerRef}
            className="w-full h-px bg-black mt-4 md:mt-6 origin-left"
          />
        </div>

        {/* Card Stack Container */}
        <div
          ref={cardsWrapRef}
          className="relative w-full min-h-[460px] md:min-h-[440px] h-[52vh] max-h-[560px]"
        >
          {services.map((service, i) => {
            const isDark = service.theme === "dark";
            const isRed = service.theme === "red";

            let cardBgClass =
              "bg-white text-zinc-950 border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)]";
            let numberColorClass = "text-[#a70f0e]";
            let badgeClass =
              "bg-zinc-100 text-zinc-900 border border-zinc-200";
            let featureBadgeClass =
              "bg-zinc-100 text-zinc-700 border border-zinc-200/80";
            let descColorClass = "text-zinc-600";
            let arrowBgClass = "bg-zinc-950 text-white";

            if (isDark) {
              cardBgClass =
                "bg-zinc-950 text-white border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.5)]";
              numberColorClass = "text-[#a70f0e]";
              badgeClass =
                "bg-zinc-900 text-[#a70f0e] border border-zinc-800";
              featureBadgeClass =
                "bg-zinc-900/90 text-zinc-300 border border-zinc-800";
              descColorClass = "text-zinc-400";
              arrowBgClass = "bg-[#a70f0e] text-white";
            } else if (isRed) {
              cardBgClass =
                "bg-[#a70f0e] text-white border border-red-800 shadow-[0_20px_60px_rgba(167,15,14,0.4)]";
              numberColorClass = "text-white";
              badgeClass =
                "bg-black/20 text-white border border-white/20";
              featureBadgeClass =
                "bg-black/20 text-white border border-white/20";
              descColorClass = "text-red-100";
              arrowBgClass = "bg-white text-[#a70f0e]";
            }

            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`absolute inset-0 w-full h-full rounded-2xl md:rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-shadow will-change-transform ${cardBgClass}`}
                style={{ zIndex: i + 1 }}
              >
                {/* Top Row: Number & Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono tracking-tighter ${numberColorClass}`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-mono tracking-[0.2em] font-bold uppercase px-3 py-1.5 rounded-full ${badgeClass}`}
                  >
                    [ {service.number} ] {service.tag}
                  </span>
                </div>

                {/* Middle Content: Title & Description */}
                <div className="my-auto py-2">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-medium ${descColorClass}`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row: Feature Badges & Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feat) => (
                      <span
                        key={feat}
                        className={`text-[10px] sm:text-xs font-medium px-3 py-1 rounded-lg ${featureBadgeClass}`}
                      >
                        ✦ {feat}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${arrowBgClass}`}
                  >
                    ↗
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


