"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy-load the 3D dome gallery (heavy canvas component)
const DomeGallery = dynamic(() => import("./DomeGallery"), { ssr: false });

// Using locally served images to prevent canvas CORS/hotlinking errors
const MY_IMAGES = [
  { src: "/portfolio/design_1.jpg", alt: "Design 1" },
  { src: "/portfolio/design_2.jpg", alt: "Design 2" },
  { src: "/portfolio/design_3.jpg", alt: "Design 3" },
  { src: "/portfolio/design_4.jpg", alt: "Design 4" },
  { src: "/portfolio/design_5.jpg", alt: "Design 5" },
  { src: "/portfolio/design_6.jpg", alt: "Design 6" },
  { src: "/portfolio/design_7.jpg", alt: "Design 7" },
  { src: "/portfolio/design_8.jpg", alt: "Design 8" },
  { src: "/portfolio/design_9.jpg", alt: "Design 9" },
  { src: "/portfolio/design_10.jpg", alt: "Design 10" },
  { src: "/portfolio/design_11.jpg", alt: "Design 11" },
  { src: "/portfolio/design_12.jpg", alt: "Design 12" },
  { src: "/portfolio/design_13.jpg", alt: "Design 13" },
  { src: "/portfolio/design_14.jpg", alt: "Design 14" },
  { src: "/portfolio/design_15.jpg", alt: "Design 15" },
];

const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15?usp=drive_link";

export default function Projects() {
  return (
    <section id="work" className="relative w-full bg-[#080808] overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Ambient red glow top-left */}
      <div className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(232,40,30,0.06) 0%, transparent 65%)" }} />
      {/* Ambient red glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(232,40,30,0.04) 0%, transparent 65%)" }} />

      <div className="relative z-10 pt-24 md:pt-32 pb-0 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between flex-wrap gap-6 mb-6"
          >
            <div>
              <p className="font-mono-custom text-[10px] tracking-[0.32em] uppercase text-white/35 mb-3">
                — Selected Work
              </p>
              <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-white uppercase leading-none">
                My{" "}
                <span className="text-red">Designs</span>
              </h2>
            </div>

            <div className="flex gap-3 items-center">
              {/* Glassmorphism label */}
              <div className="glass-nano px-4 py-2 hidden md:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8281e] animate-pulse" />
                <span className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-white/50">
                  Drag to explore
                </span>
              </div>
              <a
                href={DRIVE_FOLDER}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                View Full Portfolio ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── DomeGallery ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full"
        style={{ height: "80vh", minHeight: 520 }}
      >
        <DomeGallery
          images={MY_IMAGES}
          fit={0.85}
          fitBasis="auto"
          minRadius={500}
          overlayBlurColor="#000000"
          grayscale={false}
          openedImageWidth="380px"
          openedImageHeight="480px"
          imageBorderRadius="20px"
          openedImageBorderRadius="24px"
          dragSensitivity={22}
          dragDampening={1.8}
          segments={30}
        />
      </motion.div>

      {/* ── View More button ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-4 py-12 px-6"
      >
        {/* Subtle separator line */}
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent mb-2" />

        <a
          href={DRIVE_FOLDER}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(232,40,30,0.08)";
            el.style.borderColor = "rgba(232,40,30,0.28)";
            el.style.boxShadow = "0 0 40px rgba(232,40,30,0.14)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.04)";
            el.style.borderColor = "rgba(255,255,255,0.1)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Drive icon */}
          <svg width="18" height="18" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover:opacity-100 transition-opacity">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
          </svg>

          <span className="font-mono-custom text-[11px] tracking-[0.2em] uppercase text-white/65 group-hover:text-white transition-colors">
            View More Designs
          </span>

          {/* Animated arrow */}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-[#e8281e] translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
          >
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>

        <p className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-white/15">
          {MY_IMAGES.length} designs shown · More on Google Drive
        </p>
      </motion.div>

      {/* Section divider */}
      <div className="section-divider" />
    </section>

  );
}
