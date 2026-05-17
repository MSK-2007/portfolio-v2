"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const marqueeItems2 = [
  "Based in Bangalore", "✦", "Available for Freelance", "✦", "Brand Design", "✦",
  "Social Media", "✦", "Visual Identity", "✦", "Let's Build", "✦",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative w-full bg-[#d4e5f7] overflow-hidden">
      {/* Topo */}
      <div className="absolute inset-0 topo-border opacity-40 pointer-events-none" />

      {/* Marquee — white background strip */}
      <div className="w-full overflow-hidden border-y-2 border-[#0a0a0a] py-3 bg-white">
        <div className="flex w-max animate-marquee-slow">
          {[...marqueeItems2, ...marqueeItems2].map((item, i) => (
            <span key={i} className="font-mono-custom text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a] mx-6 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Left — large text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-black/40 mb-5">— Who I Am</p>
              <h2 className="font-display text-[clamp(3rem,7.5vw,6.5rem)] text-[#0a0a0a] uppercase leading-none mb-10">
                Designing<br />
                With<br />
                <span className="text-[#1a6bff]">Purpose &amp;<br />Passion</span>
              </h2>

              {/* Big stats row */}
              <div className="grid grid-cols-3 gap-4 mb-10 border-2 border-[#0a0a0a] rounded-2xl overflow-hidden">
                {[
                  { num: "50+", label: "Projects" },
                  { num: "5", label: "Languages" },
                  { num: "2+", label: "Years Exp." },
                ].map((stat, i) => (
                  <div key={stat.label} className={`py-6 text-center ${i < 2 ? "border-r-2 border-[#0a0a0a]" : ""}`}>
                    <p className="font-display text-4xl md:text-5xl text-[#0a0a0a]">{stat.num}</p>
                    <p className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-black/40 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-solid-blue"
                >
                  Work With Me
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark"
                >
                  See All Work ↗
                </a>
              </div>
            </motion.div>

            {/* Right — bio + detail cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              {/* Bio card */}
              <div className="rounded-2xl border-2 border-[#0a0a0a] bg-white/60 p-7">
                <p className="font-mono-custom text-[11px] tracking-[0.1em] text-black/50 mb-1 uppercase">About</p>
                <p className="text-[#0a0a0a] text-base leading-relaxed mt-3">
                  I'm <strong>Manish Shiva Kumar</strong> — a passionate visual designer based in Arekere, Bangalore.
                  I specialize in Canva, transforming concepts into eye-catching social media assets, marketing materials, and ad creatives.
                </p>
                <p className="text-black/60 text-base leading-relaxed mt-4">
                  From establishing standardized poster templates to executing vibe coding for trendy social media layouts, I bring creativity and strict brand consistency to every project. Fluent in English, Kannada, Hindi, Telugu, and Tamil.
                </p>
              </div>

              {/* Language tags */}
              <div className="rounded-2xl border-2 border-[#0a0a0a] bg-white/60 p-6">
                <p className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-black/40 mb-4">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {["English", "Kannada", "Hindi", "Telugu", "Tamil"].map((lang) => (
                    <span key={lang} className="font-mono-custom text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border-2 border-[#0a0a0a] rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download resume */}
              <a
                href="https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border-2 border-[#0a0a0a] bg-[#0a0a0a] text-white p-5 flex items-center justify-between group hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                <span className="font-mono-custom text-[11px] tracking-[0.2em] uppercase">Download Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform duration-200"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
