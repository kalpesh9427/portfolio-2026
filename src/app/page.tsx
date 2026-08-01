"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import gsap from "gsap";
import ScrambledText from "@/components/ScrambledText";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import BlackSection from "@/components/BlackSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceEducationSection from "@/components/ExperienceEducationSection";
import FooterContact from "@/components/FooterContact";
import TextType from "@/components/TextType";
import Intro from "@/components/Intro/Intro";
import { CircularText } from "@/components/CircularText";

// Defined OUTSIDE Home so React never unmounts/remounts it on state changes
const HeroText = ({
  color,
  className = "",
  startAnimate,
}: {
  color: string;
  className?: string;
  startAnimate: boolean;
}) => {
  useEffect(() => {
    if (!startAnimate) return;
    gsap.fromTo(
      `.developer-text${color === "text-white" ? "-white" : "-black"}`,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
    );
  }, [startAnimate, color]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-start pt-0 ${color} ${className}`}
    >
      <div className="w-full px-3 md:px-4">
        <h1 className="text-[13vw] md:text-[10vw] leading-[0.8] flex flex-col w-full tracking-[-0.05em] uppercase m-0 p-0 font-black">
          <span className="block text-right mr-2 md:mr-5">MERN STACK</span>
          <div className="flex justify-end w-full">
            <span
              className={`${color === "text-white" ? "developer-text-white" : "developer-text-black"} text-[13vw] md:text-[10vw] mt-1 md:mt-2 md:ml-10`}
              style={{ opacity: 0 }}
            >
              {"& DEVELOPER"}
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [startAnimate, setStartAnimate] = useState(false);

  const navItems = ["HOME", "EXPERIENCE", "PROJECTS", "SERVICES", "RESUME", "GET IN TOUCH"];

  // map nav labels to section anchors
  const navMap: Record<string, string> = {
    HOME: "#home",
    EXPERIENCE: "#experience",
    PROJECTS: "#portfolio",
    RESUME: "/assets/kalpesh%20cv%203.pdf",
    SERVICES: "#services",
    "GET IN TOUCH": "#get-in-touch",
  };

  const handleIntroComplete = () => {
    setLoading(false);
    setStartAnimate(true);
  };

  return (
    <>
      {/* Premium Cinematic Reveal Intro Curtain */}
      {loading && <Intro onComplete={handleIntroComplete} />}

      <main id="home" className="relative min-h-screen w-full bg-white top-0 left-0">
        {/* 1. Base Layer: Black text visible on the right side */}
        <div className="absolute inset-0 z-0">
          <HeroText color="text-black" startAnimate={startAnimate} />
        </div>

        {/* 2. Split Layout Container */}
        <div id="about" className="relative flex min-h-screen w-full flex-col md:flex-row">
          {/* Left Side: Photo with Clipped White Text */}
          <div className="relative h-screen md:w-1/2 overflow-hidden z-10">
            <div className="absolute inset-0 z-0 bg-zinc-900 flex items-center justify-center">
              <Image
                src="/assets/kalpesh.jpg"
                alt="Kalpesh Prajapati"
                fill
                className="object-cover grayscale"
                priority
                unoptimized
              />
            </div>

            {/* White Text precisely clipped to this container */}
            <div className="absolute inset-0 w-screen pointer-events-none">
              <HeroText color="text-white" startAnimate={startAnimate} />
            </div>

            <nav className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex flex-col items-end gap-1.5 md:gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={navMap[item] ?? `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  target={item === "RESUME" ? "_blank" : undefined}
                  rel={item === "RESUME" ? "noopener noreferrer" : undefined}
                  download={item === "RESUME" ? "kalpesh cv 3.pdf" : undefined}
                  className="text-white text-base md:text-2xl font-bold transition-opacity hover:opacity-70 text-right uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] tracking-wide"
                >
                  <ScrambledText text={item} />
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side: Bio content */}
          <div className="relative min-h-[50vh] md:h-screen md:w-1/2 flex flex-col justify-between pt-16 md:pt-[35vh] pb-10 md:pb-12 items-start md:items-end px-6 md:pr-16 md:pl-0 z-20">
            <div className="max-w-md flex flex-col items-start gap-3 md:gap-4">
              <div className="mt-2 md:mt-[3em]">
                <span className="w-2.5 h-2.5 rounded-full block animate-pulse-glow" style={{ backgroundColor: "#a70f0e", boxShadow: "0 0 12px rgba(167, 15, 14, 0.8)" }}></span>
              </div>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium text-left">
                I&apos;m Kalpesh Prajapati. <br />
                I build scalable, high-performance web applications<br />
                with React.js, Node.js, Express.js, and MongoDB.
              </p>
            </div>

            {/* Circular rotating text element */}
            <div className="mt-8 self-center md:self-end">
              <CircularText
                text="KALPESH PRAJAPATI ✦ MERN STACK DEVELOPER ✦ "
                textColor="#a70f0e"
                radius={95}
                fontSize={13}
                speed={18}
                pauseOnHover
                showBorderRing
                showGlow
                fontWeight={700}
                letterSpacing="0.22em"
                centerContent={
                  <img
                    src="/assets/favicon.jpg"
                    alt="Kalpesh Prajapati Favicon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>

        <ExperienceEducationSection />
        <ProjectsSection />
        <ServicesSection />
        <BlackSection />
        <TechStackSection />
        <FooterContact />
      </main>
    </>
  );
}
