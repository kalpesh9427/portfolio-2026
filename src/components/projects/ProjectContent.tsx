"use client";

import ProjectTags from "./ProjectTags";

interface ProjectContentProps {
  id: string;
  name: string;
  year: string;
  description: string;
  tags: string[];
  websiteUrl: string;
  githubUrl?: string;
}

export default function ProjectContent({
  name,
  description,
  tags,
  websiteUrl,
  githubUrl,
}: ProjectContentProps) {
  return (
    <div className="w-full flex flex-col justify-start relative h-full">
      {/* Project Title: Serif font, natural casing, clean spacing */}
      <h3
        className="project-title-anim text-[30px] leading-[34px] md:text-[54px] md:leading-[60px] lg:text-[64px] lg:leading-[70px] mb-5 md:mb-8 select-none"
        style={{
          fontFamily: "var(--font-instrument-serif), 'Instrument Serif', 'Instrument Serif Placeholder', serif",
          fontStyle: "normal",
          fontWeight: 400,
          color: "rgb(23, 24, 25)",
        }}
      >
        {name}
      </h3>

      {/* Description container: offset/starting below the title */}
      <div className="project-description-container flex flex-col gap-5 md:gap-10 max-w-xl xl:max-w-none w-full pl-0 xl:pl-[200px]">
        {/* Description */}
        <p className="project-desc-anim text-zinc-600 text-sm md:text-base leading-relaxed font-normal line-clamp-4 md:line-clamp-6 xl:w-[500px]">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="project-tags-anim">
          <ProjectTags tags={tags} />
        </div>
      </div>

      {/* Action Links: Live Website & GitHub Repo */}
      {((websiteUrl && websiteUrl !== "TBD") || githubUrl) && (
        <div className="mt-auto pt-5 md:pt-8 flex items-center gap-6">
          {websiteUrl && websiteUrl !== "TBD" && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-anim inline-flex items-center gap-1.5 text-zinc-900 hover:text-[#a70f0e] font-bold uppercase text-xs md:text-sm tracking-wider transition-colors duration-300 group"
            >
              <span>Live Website</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-anim inline-flex items-center gap-1.5 text-zinc-900 hover:text-[#a70f0e] font-bold uppercase text-xs md:text-sm tracking-wider transition-colors duration-300 group"
            >
              <span>GitHub Repo</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
