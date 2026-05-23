"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Interlude() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full bg-[#080808] overflow-hidden py-24 md:py-36 px-6 md:px-12 lg:px-20 border-y border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(232,40,30,0.06) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — big statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-[clamp(1.6rem,4.5vw,4rem)] text-white leading-[1.1]">
            I{" "}
            <span style={{ color: "#e8281e" }}>design</span>
            {" "}and create{" "}
            <span style={{ color: "#e8281e" }}>visual experiences</span>
            {" "}with creativity at the core, ensuring every asset{" "}
            <span className="text-white/50">stops the scroll.</span>
          </p>
        </motion.div>

        {/* Right — supporting text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="flex flex-col gap-6"
        >
          <p className="font-mono-custom text-[12px] leading-relaxed text-white/40 max-w-md">
            Available for freelance projects worldwide. From social media graphics
            to full brand identities — I bring bold ideas and meticulous execution
            to every brief, big or small.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-solid-green"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-ghost"
            >
              Start a Project
            </a>
          </div>

          {/* Small stat row */}
          <div className="flex gap-8 pt-2 border-t border-white/[0.05] mt-2">
            {[
              { num: "50+", label: "Designs created" },
              { num: "5",   label: "Languages spoken" },
              { num: "2+",  label: "Years experience" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl text-white">{s.num}</p>
                <p className="font-mono-custom text-[8px] tracking-[0.18em] uppercase text-white/30 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
