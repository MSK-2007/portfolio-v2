"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";

const FRAME_COUNT = 120;

const stats = [
  { num: "50+",  label: "Projects Completed" },
  { num: "2+",   label: "Years Experience" },
  { num: "100%", label: "Client Satisfaction" },
];

export default function HeroSequence() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages]     = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Which text panel is active — only ONE is ever in the DOM at a time
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  /* ── hard-switch sections based on scroll — no overlapping opacity ── */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.34)      setActive(0);
    else if (v < 0.67) setActive(1);
    else               setActive(2);
  });

  /* ── preload frames ── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i.toString().padStart(3, "0")}_delay-0.066s.png`;
      img.onload = () => {
        count++;
        if (count === FRAME_COUNT) {
          setImages(imgs);
          setIsLoaded(true);
          drawFrame(0, imgs);
        }
      };
      imgs.push(img);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[] = images) => {
    if (!canvasRef.current || imgs.length !== FRAME_COUNT) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const img = imgs[index];
    if (!img) return;
    const c = canvasRef.current;
    const scale = Math.max(c.width / img.width, c.height / img.height);
    const x = c.width  / 2 - (img.width  / 2) * scale;
    const y = c.height / 2 - (img.height / 2) * scale;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(frameIndex, "change", (v) => drawFrame(Math.round(v)));

  useEffect(() => {
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW || canvasRef.current?.width === 300) {
        lastW = window.innerWidth;
        if (canvasRef.current) {
          canvasRef.current.width  = canvasRef.current.offsetWidth;
          canvasRef.current.height = canvasRef.current.offsetHeight;
          drawFrame(Math.round(frameIndex.get()));
        }
      }
    };
    if (canvasRef.current) {
      canvasRef.current.width  = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  /* ── shared fade variants ── */
  const fadeVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit:    { opacity: 0, y: -30, transition: { duration: 0.3,  ease: [0.7, 0, 0.84, 0] as [number, number, number, number] } },
  };

  return (
    <div ref={containerRef} id="hero-sequence" className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">

        {/* ── Loader ── */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]">
            <div className="w-6 h-6 border-2 border-white/10 border-t-[#e8281e] rounded-full animate-spin mb-4" />
            <p className="font-mono-custom text-[10px] text-white/30 tracking-[0.35em] uppercase">Loading</p>
          </div>
        )}

        {/* ── Canvas background ── */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover" }}
          />
          {/* Left gradient — makes text readable */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, #080808 0%, #080808 33%, rgba(8,8,8,0.80) 50%, rgba(8,8,8,0.22) 70%, transparent 100%)",
          }} />
          {/* Bottom vignette */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 30%)",
          }} />
          {/* Red ambient glow */}
          <div className="absolute right-0 top-1/4 w-[60%] h-[60%] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(232,40,30,0.07) 0%, transparent 70%)" }} />
        </div>

        {/* ════════════════════════════════════════
            TEXT PANELS — AnimatePresence guarantees
            only ONE panel is in the DOM at a time,
            so overlap is physically impossible.
            ════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

            <AnimatePresence mode="wait">

              {/* ── Panel 0: Main hero ── */}
              {active === 0 && (
                <motion.div
                  key="panel-0"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full items-center pt-16"
                >
                  {/* Left */}
                  <div className="flex flex-col justify-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8281e] shadow-[0_0_10px_#e8281e] animate-pulse" />
                      <span className="font-mono-custom text-[9px] tracking-[0.32em] uppercase text-white/55 border border-white/10 px-3 py-1 rounded-full bg-white/[0.03]">
                        Graphic Designer
                      </span>
                    </div>

                    {/* Name */}
                    <h1 className="font-display uppercase leading-none mb-6"
                      style={{ fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)" }}>
                      <span className="text-white">Manish</span><br />
                      <span style={{ color: "#e8281e" }}>Shiva</span><br />
                      <span className="text-white">Kumar</span>
                    </h1>

                    {/* Description */}
                    <p className="font-mono-custom text-[12px] leading-relaxed text-white/50 mb-8 max-w-sm">
                      From concept to creation — I transform ideas into eye-catching
                      social media assets, marketing materials, and ad creatives
                      your audience will love.
                    </p>

                    {/* CTAs */}
                    <div className="flex gap-3 flex-wrap mb-10">
                      <a href="#work"
                        onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="btn-solid-green">View My Work</a>
                      <a href="#contact"
                        onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="btn-ghost">Let&apos;s Collaborate</a>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 flex-wrap">
                      {stats.map((s) => (
                        <div key={s.label} className="flex flex-col">
                          <span className="font-display text-3xl md:text-4xl text-white leading-none">{s.num}</span>
                          <span className="font-mono-custom text-[8px] tracking-[0.22em] uppercase text-white/35 mt-1">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: floating stat cards */}
                  <div className="hidden lg:flex flex-col justify-center items-end gap-4 relative pointer-events-none">
                    <div className="glass p-5 w-52"
                      style={{ borderColor: "rgba(232,40,30,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
                      <p className="font-mono-custom text-[8px] tracking-[0.25em] uppercase text-white/30 mb-1">Projects Delivered</p>
                      <p className="font-display text-5xl text-white">50<span style={{ color: "#e8281e" }}>+</span></p>
                      <p className="font-mono-custom text-[8px] tracking-wide text-white/25 mt-2">Posters · PPTs · Ads</p>
                    </div>
                    <div className="glass p-5 w-52"
                      style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
                      <p className="font-mono-custom text-[8px] tracking-[0.25em] uppercase text-white/30 mb-1">Happy Clients</p>
                      <p className="font-display text-5xl text-white">100<span style={{ color: "#e8281e" }}>%</span></p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: "#e8281e", fontSize: 12 }}>★</span>
                        ))}
                      </div>
                    </div>
                    {/* Scroll hint */}
                    <div className="absolute bottom-[-120px] right-0 flex flex-col items-center gap-2">
                      <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
                      <span className="font-mono-custom text-[8px] tracking-[0.35em] uppercase text-white/25">Scroll</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Panel 1: I Design Eye-Catching Assets ── */}
              {active === 1 && (
                <motion.div
                  key="panel-1"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="max-w-xl"
                >
                  <p className="font-mono-custom text-[9px] tracking-[0.35em] uppercase text-white/40 mb-5">— Selected Work</p>
                  <h2 className="font-display uppercase leading-none"
                    style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}>
                    <span className="text-white">I Design</span><br />
                    <span style={{ color: "#e8281e" }}>Eye-Catching</span><br />
                    <span className="text-white">Assets</span>
                  </h2>
                </motion.div>
              )}

              {/* ── Panel 2: Designing With Passion ── */}
              {active === 2 && (
                <motion.div
                  key="panel-2"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex justify-end"
                >
                  <div className="text-right max-w-xl">
                    <p className="font-mono-custom text-[9px] tracking-[0.35em] uppercase text-white/40 mb-5">— Who I Am</p>
                    <h2 className="font-display uppercase leading-none"
                      style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}>
                      <span className="text-white">Designing</span><br />
                      <span className="text-white">With</span><br />
                      <span style={{ color: "#e8281e" }}>Passion</span>
                    </h2>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
