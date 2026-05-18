"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work",    href: "#work" },
  { label: "Skills",  href: "#skills" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[64px]">
          {/* Logo — MSK monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/msk-logo.png"
              alt="MSK Logo"
              width={40}
              height={40}
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="font-mono-custom text-[11px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="btn-solid-green"
            >
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 text-white"
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
            className="fixed top-[64px] left-0 right-0 z-[99] bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.07] flex flex-col items-center py-8 gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#39ff5a] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="#contact" onClick={(e) => handleNav(e, "#contact")} className="btn-solid-green">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
