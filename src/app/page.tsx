"use client";

import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black selection:bg-[#39ff5a]/25 selection:text-white">
      <Navbar />

      <div id="hero"><HeroSequence /></div>

      <Projects />
      <About />
      <Skills />
      <Contact />

      {/* Footer */}
      <footer className="w-full bg-black border-t border-white/[0.04] py-14 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(57,255,90,0.03) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg glass-nano font-display text-sm tracking-widest uppercase text-white/70 mb-5"
                style={{ borderColor: "rgba(57,255,90,0.15)" }}>
                MANISH
              </div>
              <p className="font-mono-custom text-[10px] tracking-wide text-white/20 leading-relaxed max-w-xs">
                Graphic Designer &amp; Visual Artist based in Bangalore, India.
                Creating eye-catching visuals that stop the scroll.
              </p>
            </div>

            {/* Navigate */}
            <div>
              <p className="font-mono-custom text-[8px] tracking-[0.32em] uppercase text-white/15 mb-5">Navigate</p>
              <ul className="flex flex-col gap-3">
                {["work","about","skills","contact"].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`}
                      onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
                      className="font-mono-custom text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-[#39ff5a] transition-colors duration-200 capitalize">
                      {id}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="font-mono-custom text-[8px] tracking-[0.32em] uppercase text-white/15 mb-5">Connect</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Instagram",    href: "https://www.instagram.com/manish._.s.k?igsh=MTFwN2QzZTUyOHdo" },
                  { label: "LinkedIn",     href: "https://www.linkedin.com/in/manishshivakumar?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                  { label: "Google Drive", href: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15" },
                  { label: "manishshivakumar178@gmail.com", href: "mailto:manishshivakumar178@gmail.com" },
                ].map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="font-mono-custom text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-[#39ff5a] transition-colors duration-200">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-white/15">
              © {new Date().getFullYear()} Manish Shiva Kumar. All Rights Reserved.
            </p>
            <p className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-white/10">
              Designed with <span style={{ color: "#ff2d9b" }}>♥</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
