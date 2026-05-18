"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const FRAME_COUNT = 120;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${indexStr}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[] = images) => {
    if (!canvasRef.current || imgs.length !== FRAME_COUNT) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const img = imgs[index];
    if (!img) return;
    const canvas = canvasRef.current;
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.round(latest));
  });

  useEffect(() => {
    let lastWidth = window.innerWidth;
    
    const handleResize = () => {
      // On mobile, ignore resize events triggered purely by the address bar hiding/showing (height changes)
      if (window.innerWidth !== lastWidth || canvasRef.current?.width === 300) {
        lastWidth = window.innerWidth;
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          drawFrame(Math.round(frameIndex.get()));
        }
      }
    };

    // Initial setup
    if (canvasRef.current && (canvasRef.current.width === 300 || canvasRef.current.width === window.innerWidth)) {
      // Always initialize canvas sizes if not done yet
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(Math.round(frameIndex.get()));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  // Parallax overlays — same logic as before
  const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const section1Y      = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const section2Y      = useTransform(scrollYProgress, [0.2, 0.5], [60, -60]);
  const section3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const section3Y      = useTransform(scrollYProgress, [0.5, 0.9], [60, -60]);

  return (
    <div ref={containerRef} id="hero-sequence" className="relative h-[500vh] w-full bg-[#0c0c0c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loader */}
        {!isLoaded && (
          <div className="absolute z-50 inset-0 flex flex-col items-center justify-center bg-[#0c0c0c]">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="font-mono-custom text-[10px] text-white/40 tracking-[0.3em] uppercase">Loading</p>
          </div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover z-0" />

        {/* Dark vignette — stronger at bottom so name text pops */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent via-[45%] to-black/95 pointer-events-none" />

        {/* Section 1 — name centered below the face, buttons at bottom */}
        <motion.div
          style={{ opacity: section1Opacity, y: section1Y }}
          className="absolute z-10 inset-0 flex flex-col justify-end pb-12 px-6"
        >
          {/* NAME BLOCK */}
          <div className="flex flex-col items-center w-full mb-8">
            <h1
              className="font-display uppercase text-white text-center w-full whitespace-nowrap"
              style={{
                fontSize: "clamp(2rem, 7.5vw, 8.5rem)",
                lineHeight: "0.85",
                letterSpacing: "-0.01em",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
              }}
            >
              MANISH SHIVA KUMAR
            </h1>

            {/* Category tag */}
            <div className="mt-5 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39ff5a] shadow-[0_0_8px_#39ff5a] animate-pulse" />
              <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-white/60">
                Graphic Designer &amp; Visual Artist
              </span>
            </div>
          </div>

          {/* BOTTOM BLOCK: Scroll & Buttons */}
          <div className="flex flex-col items-center w-full">
            {/* Scroll text */}
            <span className="font-mono-custom text-[9px] tracking-[0.35em] text-white/40 uppercase mb-5">
              Scroll
            </span>

            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-outline-dark"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-solid-green"
              >
                Let's Collaborate
              </a>
            </div>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: section2Opacity, y: section2Y }}
          className="absolute z-10 inset-0 flex items-end pb-40 px-8 md:items-center md:pb-0 md:px-20 pointer-events-none"
        >
          <div>
            <p className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">— Selected Work</p>
            <h2 className="font-display text-[clamp(3rem,9vw,8rem)] text-white uppercase leading-none">
              I Design<br />
              <span className="text-[#b5f500]">Eye&#8209;Catching</span><br />
              Assets
            </h2>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: section3Opacity, y: section3Y }}
          className="absolute z-10 inset-0 flex items-end pb-40 justify-start px-8 md:items-center md:pb-0 md:justify-end md:px-20 pointer-events-none"
        >
          <div className="text-left md:text-right">
            <p className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">— Who I Am</p>
            <h2 className="font-display text-[clamp(3rem,9vw,8rem)] text-white uppercase leading-none">
              Designing<br />
              With<br />
              <span className="text-[#b5f500]">Passion</span>
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
