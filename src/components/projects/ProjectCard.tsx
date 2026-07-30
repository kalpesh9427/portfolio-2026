"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectImage from "./ProjectImage";
import ProjectContent from "./ProjectContent";
import { Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Subtle Parallax effect on the project image and scroll-based description sliding
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // Image Parallax
      gsap.fromTo(
        cardRef.current!.querySelector(".project-image-parallax"),
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Description & Tags slide down (sticky-like) animation
      const descContainer = cardRef.current!.querySelector(".project-description-container");
      if (descContainer) {
        gsap.fromTo(
          descContainer,
          { y: 0 },
          {
            y: () => {
              const cardHeight = cardRef.current!.offsetHeight;
              const descHeight = (descContainer as HTMLElement).offsetHeight;
              
              // Get title element and its measurements
              const titleEl = cardRef.current!.querySelector(".project-title-anim") as HTMLElement;
              const titleHeight = titleEl ? titleEl.offsetHeight : 0;
              
              // The gap between title and description is mb-8 (32px)
              // Padding top of container is pt-2/pt-4 (pt-4 is 16px)
              const offsetFromTop = titleHeight + 32 + 16;
              
              // Distance to move so that the bottom of descContainer aligns with the bottom of the card (with a 60px safety buffer to prevent crossing the section)
              const targetY = cardHeight - descHeight - offsetFromTop - 60;
              
              return Math.max(0, targetY);
            },
            ease: "none",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 40%",
              end: "bottom 20%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    return () => matchMedia.revert();
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 lg:gap-16 items-stretch overflow-hidden"
    >
      {/* Left Column: Image */}
      <div className="w-full order-1">
        <ProjectImage
          src={project.image}
          alt={project.name}
          websiteUrl={project.websiteUrl}
        />
      </div>

      {/* Right Column: Project Details */}
      <div className="w-full order-2 flex flex-col justify-start pt-2 md:pt-4 h-full relative overflow-hidden">
        <ProjectContent
          id={project.id}
          name={project.name}
          year={project.year}
          description={project.description}
          tags={project.tags}
          websiteUrl={project.websiteUrl}
          githubUrl={project.githubUrl}
        />
      </div>
    </div>
  );
}
