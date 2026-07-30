"use client";

interface ProjectTagsProps {
  tags: string[];
}

export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[9px] md:text-[10px] font-mono tracking-widest text-zinc-400 uppercase px-2.5 py-1 border border-zinc-200/80 rounded bg-[#fcfcfc] select-none"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
