"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Marquee strip of category words (like ApeChain's scroll marquee)
const marqueeItems = [
  "Posters Making", "🎨", "PPT Design", "✦", "Vibe Coding", "✦", "Ad Creatives", "🎨",
  "Social Media", "✦", "Brand Identity", "✦", "Typography", "🎨", "Visual Design", "✦",
];

const skills = [
  { name: "Posters Making", level: 98 },
  { name: "PPT Making", level: 90 },
  { name: "Vibe Coding", level: 92 },
  { name: "Advertisement Posts", level: 85 },
  { name: "Web & Graphic Design", level: 85 },
];

const tools = ["Canva Pro", "Adobe Express", "Google Slides", "Figma (Basics)", "Photoshop (Basics)"];

const cards = [
  {
    icon: "🎨",
    title: "Posters &\nAdvertisements",
    desc: "Standardized templates, modern readable designs, and attention-commanding layouts.",
    color: "bg-[#0c0c0c] text-white",
    accent: "text-[#b5f500]",
  },
  {
    icon: "📊",
    title: "PPT Making",
    desc: "Professional presentation decks with strict brand consistency and clean data storytelling.",
    color: "bg-[#1a1a2e] text-white",
    accent: "text-[#6eb5ff]",
  },
  {
    icon: "✨",
    title: "Vibe Coding",
    desc: "Trend-aware aesthetic systems and coherent visual themes for modern social media.",
    color: "bg-[#0a1a0a] text-white",
    accent: "text-[#b5f500]",
  },
];

function SkillBar({ name, level, index, inView }: { name: string; level: number; index: number; inView: boolean }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-mono-custom text-[11px] tracking-[0.15em] uppercase text-black/60">{name}</span>
        <span className="font-display text-2xl text-[#0a0a0a]">{level}</span>
      </div>
      <div className="w-full h-[3px] bg-black/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#0a0a0a] rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative w-full bg-[#e8f2fb] overflow-hidden">
      {/* Marquee strip — like ApeChain's scrolling category tags */}
      <div className="w-full overflow-hidden border-y-2 border-[#0a0a0a] py-3 bg-[#b5f500]">
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono-custom text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a] mx-5 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative">
        <div className="absolute inset-0 topo-border opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-black/40 mb-4">— Tools &amp; Skills</p>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-[#0a0a0a] uppercase leading-none">
              What I Bring<br />
              <span className="text-black/25">To The Table</span>
            </h2>
          </motion.div>

          {/* Two-column layout: cards left, skill bars right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Skill cards */}
            <div className="flex flex-col gap-4">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`${card.color} rounded-2xl p-6 flex gap-5 items-start`}
                >
                  <span className="text-3xl shrink-0 mt-0.5">{card.icon}</span>
                  <div>
                    <h3 className={`font-display text-xl uppercase leading-tight mb-2 ${card.accent}`} style={{ whiteSpace: "pre-line" }}>
                      {card.title}
                    </h3>
                    <p className="font-mono-custom text-[11px] tracking-wide leading-relaxed text-white/60">{card.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Tools row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl border-2 border-[#0a0a0a] p-5"
              >
                <p className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-black/40 mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="font-mono-custom text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border-2 border-[#0a0a0a] rounded-full bg-white/60">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-black/40 mb-8">Proficiency</p>
              {skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} index={i} inView={inView} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
