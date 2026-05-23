"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const marqueeItems = [
  "Posters Making", "🎨", "PPT Design", "✦", "Vibe Coding", "✦", "Ad Creatives", "🎨",
  "Social Media", "✦", "Brand Identity", "✦", "Typography", "🎨", "Visual Design", "✦",
];

const skills = [
  { name: "Posters Making",       level: 98, color: "#e8281e" },
  { name: "PPT Making",           level: 90, color: "#ff6b5b" },
  { name: "Vibe Coding",          level: 92, color: "#ff6a00" },
  { name: "Advertisement Posts",  level: 85, color: "#00e5ff" },
  { name: "Web & Graphic Design", level: 85, color: "#b5f500" },
];

const tools = ["Canva Pro", "Adobe Express", "Google Slides", "Figma (Basics)", "Photoshop (Basics)"];

const cards = [
  { icon: "🎨", title: "Posters &\nAdvertisements", desc: "Standardized templates, modern readable designs, and attention-commanding layouts.", color: "#e8281e" },
  { icon: "📊", title: "PPT Making",                desc: "Professional decks with strict brand consistency and clean data storytelling.", color: "#ff6b5b" },
  { icon: "✨", title: "Vibe Coding",               desc: "Trend-aware aesthetic systems and coherent visual themes for modern social media.", color: "#ff6a00" },
];

function SkillBar({ name, level, color, index, inView }: { name: string; level: number; color: string; index: number; inView: boolean }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="font-mono-custom text-[10px] tracking-[0.15em] uppercase text-white/55">{name}</span>
        <span className="font-display text-xl" style={{ color }}>{level}</span>
      </div>
      <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay: index * 0.1 + 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative w-full bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left, rgba(232,40,30,0.05) 0%, transparent 65%)" }} />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right, rgba(255,107,91,0.04) 0%, transparent 65%)" }} />

      {/* Marquee */}
      <div className="w-full overflow-hidden border-y border-white/[0.04] py-2.5 relative z-10"
        style={{ background: "rgba(232,40,30,0.02)" }}>
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono-custom text-[9px] tracking-[0.28em] uppercase text-white/30 mx-5 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[1400px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono-custom text-[9px] tracking-[0.32em] uppercase text-white/35 mb-4">— Tools & Skills</p>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-white uppercase leading-none">
              What I Bring<br />
              <span style={{ color: "rgba(255,255,255,0.18)" }}>To The Table</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Service cards */}
            <div className="flex flex-col gap-3">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass p-6 flex gap-5 items-start card-lift"
                  style={{
                    borderColor: `${card.color}18`,
                    boxShadow: `0 0 40px ${card.color}08, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  <span className="text-3xl shrink-0 mt-0.5">{card.icon}</span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight mb-2"
                      style={{ color: card.color, whiteSpace: "pre-line" }}>{card.title}</h3>
                    <p className="font-mono-custom text-[10px] tracking-wide leading-relaxed text-white/45">{card.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="glass p-5"
              >
                <p className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/30 mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, i) => {
                    const c = ["#e8281e","#ff6b5b","#ff6a00","#00e5ff","#b5f500"][i % 5];
                    return (
                      <span key={tool} className="font-mono-custom text-[8px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border"
                        style={{ borderColor: `${c}30`, color: c, background: `${c}0a` }}>{tool}</span>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass p-8"
            >
              <p className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/30 mb-8">Proficiency</p>
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} index={i} inView={inView} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
