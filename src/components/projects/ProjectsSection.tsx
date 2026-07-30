"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import OrbitImages from "@/components/OrbitImages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TITLE_TEXT = "Projects";

const orbitImages = [
  "/assets/orbit/react.jpg",
  "/assets/orbit/nodejs.jpg",
  "/assets/orbit/js.jpg",
  "/assets/orbit/html.jpg",
  "/assets/orbit/mysql.jpg",
  "/assets/orbit/github.jpg",
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Title character reveal animation
  useGSAP(
    () => {
      if (!headerRef.current) return;

      const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];

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
        stagger: 0.06,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "top 35%",
          toggleActions: "play none none reverse",
        },
      });

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: headerRef }
  );

  // Scroll pointer animation — moves the orange square between project images
  useGSAP(
    () => {
      if (!listRef.current || !pointerRef.current || !sectionRef.current)
        return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 768px)", () => {
        const pointer = pointerRef.current!;
        const list = listRef.current!;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        if (cards.length === 0) return;

        // Get the image element inside each card to compute vertical positions
        const getImagePositions = () => {
          const listRect = list.getBoundingClientRect();
          return cards.map((card) => {
            const img = card.querySelector(".project-image-parallax");
            if (!img) return { top: 0, center: 0 };
            const imgRect = img.getBoundingClientRect();
            const top = imgRect.top - listRect.top;
            const center = top + imgRect.height / 2;
            return { top, center };
          });
        };

        // Cache the image positions to avoid forced layout reflows on every scroll frame
        let cachedPositions = getImagePositions();

        const updatePositions = () => {
          cachedPositions = getImagePositions();
        };

        ScrollTrigger.addEventListener("refresh", updatePositions);

        // Position the pointer at the first image's center initially
        const pointerHeight = 12; // matches the h-3 class
        if (cachedPositions[0]) {
          gsap.set(pointer, {
            y: cachedPositions[0].center - pointerHeight / 2,
            opacity: 0,
          });
        }

        // Fade in the pointer when the section enters view
        gsap.to(pointer, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // For each transition between project cards, create a scrubbed animation
        cards.forEach((card, i) => {
          if (i === 0) return; // first card is the starting position

          ScrollTrigger.create({
            trigger: card,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!cachedPositions[i - 1] || !cachedPositions[i]) return;
              const prevCenter =
                cachedPositions[i - 1].center - pointerHeight / 2;
              const currCenter =
                cachedPositions[i].center - pointerHeight / 2;

              // Interpolate between the two positions based on scroll progress
              const y = gsap.utils.interpolate(
                prevCenter,
                currCenter,
                self.progress
              );

              gsap.set(pointer, { y });
            },
          });
        });
      });

      return () => matchMedia.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="w-full bg-white pt-10 md:pt-16 pb-20 md:pb-40 px-5 md:px-12 lg:px-20 min-[1680px]:px-[200px] text-zinc-950 relative z-20"
    >
      <div className="max-w-7xl min-[1680px]:max-w-none mx-auto flex flex-col gap-10 md:gap-24">
        {/* Header: Scroll-animated character reveal for "Projects" with OrbitImages beside it */}
        <div ref={headerRef} className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <h2
              className="text-[56px] leading-[56px] sm:text-[80px] sm:leading-[80px] md:text-[110px] md:leading-[100px] lg:text-[140px] lg:leading-[130px] xl:text-[180px] xl:leading-[170px] tracking-[-0.02em] select-none"
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', 'Instrument Serif Placeholder', serif",
                fontStyle: "normal",
                fontWeight: 400,
                color: "#a70f0e",
              }}
            >
              {TITLE_TEXT.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: "bottom" }}
                >
                  <span
                    ref={(el) => {
                      charsRef.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </h2>

            {/* OrbitImages Component beside the project header text */}
            <div className="w-full lg:w-[420px] xl:w-[500px] h-[220px] sm:h-[260px] lg:h-[320px] flex items-center justify-center shrink-0">
              <OrbitImages
                images={orbitImages}
                shape="ellipse"
                radiusX={340}
                radiusY={90}
                rotation={-8}
                duration={25}
                itemSize={100}
                showPath={true}
                pathColor="rgb(0, 0, 0)"
                pathWidth={2.5}
                pathDasharray="10 8"
                responsive={true}
                direction="reverse"
              />
            </div>
          </div>
          {/* Animated horizontal divider */}
          <div
            ref={dividerRef}
            className="w-full h-px bg-zinc-200 origin-left"
          />
        </div>

        {/* List of projects — relative container for the scroll pointer */}
        <div ref={listRef} className="relative flex flex-col gap-8 md:gap-20">
          {/* Pointer — only visible on md+ */}
          <div
            ref={pointerRef}
            className="hidden md:block absolute z-30 pointer-events-none"
            style={{ left: "-40px" }}
          >
            <div
              className="w-3 h-3 rounded-[2px]"
              style={{
                backgroundColor: "#a70f0e",
                boxShadow: "0 0 12px rgba(167, 15, 14, 0.45), 0 0 4px rgba(167, 15, 14, 0.25)",
              }}
            />
          </div>

          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex flex-col gap-8 md:gap-20"
            >
              <ProjectCard project={project} />
              <div className="w-full h-px bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
