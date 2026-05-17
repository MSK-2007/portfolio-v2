"use client";

import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="selection:bg-[#1a6bff]/30 selection:text-white">
      <Navbar />

      {/* Hero scroll sequence */}
      <div id="hero">
        <HeroSequence />
      </div>

      {/* Work / Projects */}
      <Projects />

      {/* About */}
      <About />

      {/* Skills */}
      <Skills />

      {/* Contact */}
      <Contact />

      {/* Footer — ApeChain style: dark with columns */}
      <footer className="w-full bg-[#0c0c0c] border-t-2 border-white/10 py-14 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 border-2 border-white font-display text-sm tracking-widest uppercase text-white mb-5">
                MANISH
              </div>
              <p className="font-mono-custom text-[11px] tracking-wide text-white/35 leading-relaxed max-w-xs">
                Graphic Designer &amp; Visual Artist based in Bangalore, India.
                Creating eye-catching visuals that stop the scroll.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5">Navigate</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Work", href: "#work" },
                  { label: "About", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: "smooth" }); }}
                      className="font-mono-custom text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5">Connect</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/manish._.s.k?igsh=MTFwN2QzZTUyOHdo" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/manishshivakumar?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                  { label: "Google Drive", href: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15" },
                  { label: "manishshivakumar178@gmail.com", href: "mailto:manishshivakumar178@gmail.com" },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-custom text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-[#b5f500] transition-colors duration-200"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-white/25">
              © {new Date().getFullYear()} Manish. All Rights Reserved.
            </p>
            <p className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-white/20">
              Designed with passion.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
