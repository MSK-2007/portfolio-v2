"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FluidCursor() {
  const [mounted, setMounted]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Outer ring — slow, laggy follow
  const outerX = useSpring(rawX, { stiffness: 80,  damping: 20, mass: 0.6 });
  const outerY = useSpring(rawY, { stiffness: 80,  damping: 20, mass: 0.6 });

  // Inner dot — snappy follow
  const innerX = useSpring(rawX, { stiffness: 300, damping: 28, mass: 0.3 });
  const innerY = useSpring(rawY, { stiffness: 300, damping: 28, mass: 0.3 });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      });
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = t.closest("a, button, input, textarea, select, [role=button], [data-cursor-hover]");
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  const outerSize  = hovering ? 56 : clicking ? 28 : 40;
  const outerOpacity = hovering ? 0.6 : 0.35;

  return (
    <>
      {/* ── Outer ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          width:  outerSize,
          height: outerSize,
          border: hovering
            ? "1.5px solid rgba(232,40,30,0.7)"
            : "1.5px solid rgba(255,255,255,0.45)",
          background: hovering
            ? "rgba(232,40,30,0.07)"
            : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          boxShadow: hovering
            ? "0 0 18px rgba(232,40,30,0.35), inset 0 0 8px rgba(232,40,30,0.1)"
            : "0 0 12px rgba(255,255,255,0.08)",
        }}
        animate={{
          width:  outerSize,
          height: outerSize,
          opacity: outerOpacity,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />

      {/* ── Inner dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          background: hovering ? "#e8281e" : "rgba(255,255,255,0.9)",
          boxShadow: hovering
            ? "0 0 10px #e8281e, 0 0 20px rgba(232,40,30,0.5)"
            : "0 0 6px rgba(255,255,255,0.6)",
        }}
        animate={{
          width:  hovering ? 6 : clicking ? 10 : 5,
          height: hovering ? 6 : clicking ? 10 : 5,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
}
