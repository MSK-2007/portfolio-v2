"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hero section is dark (scroll sequence), switch to light bg when past it
      const heroEl = document.getElementById("hero");
      const heroEnd = heroEl ? heroEl.offsetHeight : window.innerHeight * 5;
      setIsDark(y < heroEnd - 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textColor = isDark ? "text-white" : "text-[#0a0a0a]";
  const bgScrolled = isDark
    ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
    : "bg-[#d4e5f7]/80 backdrop-blur-xl border-b border-black/8";
  const logoBox = isDark
    ? "border-white/80 text-white"
    : "border-[#0a0a0a] text-[#0a0a0a]";
  const linkHover = isDark ? "hover:text-white/60" : "hover:text-black/60";
  const btnBorder = isDark ? "border-white text-white hover:bg-white hover:text-black" : "border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${scrolled ? bgScrolled : "bg-transparent"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[64px]">
          {/* Logo — ApeChain style bordered box */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className={`inline-flex items-center justify-center px-4 py-1.5 border-2 font-display text-sm tracking-widest uppercase transition-colors duration-300 ${logoBox}`}
          >
            MANISH
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`font-mono-custom text-[11px] tracking-[0.18em] uppercase font-bold transition-colors duration-200 ${textColor} ${linkHover}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono-custom text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-2 border-2 rounded-full transition-all duration-200 ${btnBorder}`}
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="font-mono-custom text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-2 rounded-full bg-[#1a6bff] border-2 border-[#1a6bff] text-white hover:opacity-85 transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 ${textColor}`}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-[99] bg-[#0a0a0a] border-b border-white/10 flex flex-col items-center py-8 gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="#contact" onClick={(e) => handleNav(e, "#contact")} className="btn-solid-blue">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
