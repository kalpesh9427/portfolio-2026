"use client";

import React from "react";

interface SkillCategory {
  category: string;
  skills: string[];
}

const SKILL_GROUPS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "npm", "Postman"],
  },
  {
    category: "Other",
    skills: ["Agile Methodology", "Cross-Browser Compatibility", "Performance Optimization", "UI/UX Design Principles"],
  },
];

const TechStackSection: React.FC = () => {
  return (
    <section className="relative z-20 w-full bg-white py-16 md:py-24 mb-20 md:mb-36">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="sticky top-24 md:top-28 self-start z-10">
              <h2
                className="text-4xl md:text-4xl lg:text-6xl font-black uppercase text-left md:text-left"
                style={{ color: "#a70f0e" }}
              >
                Skills & Tech
              </h2>
              <p className="mt-6 text-sm text-zinc-500 max-w-md mx-auto md:mx-0 leading-relaxed">
                Grouped technical competencies, databases, frameworks, and engineering methodologies used to build scalable MERN stack applications.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 flex justify-center md:justify-end">
            <div className="tech-list w-full md:w-5/6 border-t border-b border-zinc-200 mx-auto md:mx-0">
              {SKILL_GROUPS.map((group, i) => (
                <div
                  key={group.category}
                  className={`py-6 px-4 ${i < SKILL_GROUPS.length - 1 ? "border-b border-zinc-200" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono tracking-widest text-[#a70f0e] uppercase font-bold">
                      {group.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">0{i + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-100 text-zinc-800 text-sm font-semibold rounded-md hover:bg-zinc-950 hover:text-white transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
