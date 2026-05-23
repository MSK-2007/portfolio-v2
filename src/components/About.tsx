"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const marqueeItems = [
  "Based in Bangalore", "✦", "Available for Freelance", "✦", "Brand Design", "✦",
  "Social Media", "✦", "Visual Identity", "✦", "Let's Build", "✦",
];

const stats = [
  { num: "50+", label: "Projects",   color: "#e8281e" },
  { num: "5",   label: "Languages",  color: "#ff6b5b" },
  { num: "2+",  label: "Years Exp.", color: "#ff6a00" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative w-full bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      {/* Ambient red glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(232,40,30,0.06) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(232,40,30,0.04) 0%, transparent 65%)" }} />

      {/* Marquee */}
      <div className="w-full overflow-hidden border-y border-white/[0.04] py-3 relative z-10"
        style={{ background: "rgba(232,40,30,0.015)" }}>
        <div className="flex w-max animate-marquee-slow">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono-custom text-[9px] tracking-[0.28em] uppercase text-white/30 mx-7 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono-custom text-[9px] tracking-[0.32em] uppercase text-white/35 mb-5">— Who I Am</p>
              <h2 className="font-display text-[clamp(3rem,7.5vw,6.5rem)] text-white uppercase leading-none mb-10">
                Designing<br />
                With<br />
                <span className="text-red">Purpose &<br />Passion</span>
              </h2>

              {/* Stats — glass widgets */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass card-lift p-5 text-center"
                    style={{ borderColor: `${s.color}20` }}
                  >
                    <p className="font-display text-4xl md:text-5xl mb-1" style={{ color: s.color }}>{s.num}</p>
                    <p className="font-mono-custom text-[8px] tracking-[0.22em] uppercase text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-green">Work With Me</a>
                <a href="https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15"
                  target="_blank" rel="noopener noreferrer" className="btn-ghost">See All Work ↗</a>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              {/* Bio */}
              <div className="glass p-7">
                <p className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/30 mb-4">About</p>
                <p className="text-white/80 text-[15px] leading-relaxed">
                  I'm <strong className="text-white">Manish Shiva Kumar</strong> — a passionate visual designer based in Arekere, Bangalore.
                  I specialize in Canva, transforming concepts into eye-catching social media assets, marketing materials, and ad creatives.
                </p>
                <p className="text-white/45 text-[15px] leading-relaxed mt-4">
                  From establishing standardized poster templates to executing vibe coding for trendy social media layouts, I bring creativity and strict brand consistency to every project.
                </p>
              </div>

              {/* Languages */}
              <div className="glass p-6">
                <p className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/30 mb-4">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {(["English","Kannada","Hindi","Telugu","Tamil"] as const).map((lang, i) => {
                    const c = ["#e8281e","#ff6b5b","#ff6a00","#00e5ff","#b5f500"][i];
                    return (
                      <span key={lang} className="font-mono-custom text-[9px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border"
                        style={{ borderColor: `${c}30`, color: c, background: `${c}0d` }}>
                        {lang}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Resume */}
              <a
                href="https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID"
                target="_blank" rel="noopener noreferrer"
                className="glass p-5 flex items-center justify-between group card-lift"
                style={{ borderColor: "rgba(232,40,30,0.12)" }}
              >
                <span className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-white/55 group-hover:text-[#e8281e] transition-colors">
                  Download Resume
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-white/30 group-hover:text-[#e8281e] group-hover:translate-y-0.5 transition-all duration-200">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
