"use client";

import { Github, Globe, ArrowUpRight } from "lucide-react";

interface ProjectButtonsProps {
  websiteUrl: string;
  githubUrl?: string;
}

export default function ProjectButtons({ websiteUrl, githubUrl }: ProjectButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Live Demo Button */}
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2.5 bg-zinc-950 text-white px-7 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 active:bg-zinc-950 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <Globe size={14} className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
        <span>Live Demo</span>
        <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </a>

      {/* GitHub Button */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 bg-transparent text-zinc-900 border border-zinc-300 px-7 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:border-zinc-900 hover:bg-zinc-50 active:bg-zinc-100/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Github size={14} className="text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300" />
          <span>GitHub</span>
        </a>
      )}
    </div>
  );
}
