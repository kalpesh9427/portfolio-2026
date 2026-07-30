"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectImageProps {
  src: string;
  alt: string;
  websiteUrl: string;
}

export default function ProjectImage({ src, alt, websiteUrl }: ProjectImageProps) {
  return (
    <div className="w-full relative project-image-parallax">
      {/* Aspect ratio container for project showcase */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[12px] overflow-hidden bg-zinc-100/90 border border-zinc-200/80 group flex items-center justify-center p-1.5 md:p-2">
        {websiteUrl && websiteUrl !== "TBD" ? (
          <Link
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full h-full block overflow-hidden rounded-[8px]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
                loading="lazy"
                className="object-contain transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              />
            </div>
          </Link>
        ) : (
          <div className="relative w-full h-full overflow-hidden rounded-[8px]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              loading="lazy"
              className="object-contain transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
              style={{ willChange: "transform", transform: "translateZ(0)" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
