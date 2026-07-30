"use client";

import React from "react";

export default function ExperienceEducationSection() {
  return (
    <section id="experience" className="w-full bg-white py-16 md:py-28 px-6 md:px-12 border-t border-zinc-100 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Experience Header & List */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#a70f0e" }} />
            <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
              [ 02 ] Professional Experience
            </h2>
          </div>

          <div className="border-t border-zinc-200">
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-zinc-200">
              <div className="md:col-span-4">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Jan 2026 – Jul 2026</span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mt-1">MERN Stack Developer Intern</h3>
                <p className="text-sm font-semibold text-[#a70f0e] mt-0.5">Excelsior Technologies</p>
                <p className="text-xs text-zinc-500">Ahmedabad, India</p>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-3 text-zinc-600 text-sm md:text-base leading-relaxed list-disc list-inside">
                  <li>Developed and deployed responsive, high-performance web applications utilizing HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, and MongoDB.</li>
                  <li>Built and integrated secure RESTful APIs to facilitate seamless data flow between the React.js frontend and robust Node.js/Express.js backend systems.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Education Header & List */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
            <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
              [ 03 ] Education & Credentials
            </h2>
          </div>

          <div className="border-t border-zinc-200">
            {/* Degree 1 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-zinc-200">
              <div className="md:col-span-4">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">2023 – 2026</span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mt-1">Bachelor of Engineering (B.E.)</h3>
                <p className="text-sm font-semibold text-[#a70f0e] mt-0.5">Computer Engineering</p>
                <p className="text-xs text-zinc-500">Ahmedabad Institute of Technology | Ahmedabad, India</p>
              </div>
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-700 bg-zinc-50 p-4 rounded-lg border border-zinc-200/60">
                  <span><strong>SPI:</strong> 7.91</span>
                  <span className="text-zinc-300">|</span>
                  <span><strong>CGPA:</strong> 7.91</span>
                </div>
              </div>
            </div>

            {/* Degree 2 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-zinc-200">
              <div className="md:col-span-4">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">2020 – 2023</span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mt-1">Diploma of Engineering (D.E.)</h3>
                <p className="text-sm font-semibold text-[#a70f0e] mt-0.5">Computer Engineering</p>
                <p className="text-xs text-zinc-500">Lj Polytechnic | Ahmedabad, India</p>
              </div>
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-700 bg-zinc-50 p-4 rounded-lg border border-zinc-200/60">
                  <span><strong>SPI:</strong> 7.26</span>
                  <span className="text-zinc-300">|</span>
                  <span><strong>CGPA:</strong> 8.48</span>
                  <span className="text-zinc-300">|</span>
                  <span><strong>Percentage:</strong> 84.8%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
