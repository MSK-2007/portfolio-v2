"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { label: "Instagram",    short: "IG", href: "https://www.instagram.com/manish._.s.k?igsh=MTFwN2QzZTUyOHdo",               color: "#ff2d9b" },
  { label: "LinkedIn",     short: "LI", href: "https://www.linkedin.com/in/manishshivakumar?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "#00e5ff" },
  { label: "Google Drive", short: "DR", href: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",    color: "#ff6a00" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    formRef.current?.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" ref={ref} className="relative w-full bg-black overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(57,255,90,0.04) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(255,45,155,0.04) 0%, transparent 65%)" }} />

      <div className="relative z-10 py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono-custom text-[9px] tracking-[0.32em] uppercase text-white/25 mb-4">— Let's Create Together</p>
            <h2 className="font-display text-[clamp(3rem,9vw,8rem)] text-white uppercase leading-none">
              Got A<br />Project<br />
              <span className="text-green">In Mind?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-white/35 text-[16px] leading-relaxed mb-10 max-w-md">
                Whether it's a poster, album cover, brand identity or a last-minute creative brief — I'm always up for interesting work. Let's build something worth looking at.
              </p>

              <div className="flex flex-col gap-3 mb-10">
                {[
                  { icon: "✉", label: "Email", val: "manishshivakumar178@gmail.com", href: "mailto:manishshivakumar178@gmail.com", color: "#39ff5a" },
                  { icon: "✆", label: "Phone / WhatsApp", val: "+91 90353 61901", href: "tel:+919035361901", color: "#ff2d9b" },
                ].map((c) => (
                  <a key={c.label} href={c.href}
                    className="glass p-5 flex items-center gap-4 group card-lift"
                    style={{ borderColor: `${c.color}10` }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border transition-all duration-200"
                      style={{ borderColor: `${c.color}20`, color: c.color, background: `${c.color}08` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${c.color}30`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-mono-custom text-[8px] tracking-[0.25em] uppercase text-white/20 mb-0.5">{c.label}</p>
                      <p className="text-white/60 group-hover:text-white text-sm transition-colors font-medium">{c.val}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="font-mono-custom text-[8px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-200"
                    style={{ borderColor: `${s.color}25`, color: s.color, background: `${s.color}0a` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${s.color}35`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    {s.short} — {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name",  type: "text",  placeholder: "Your name",    label: "Name" },
                    { name: "email", type: "email", placeholder: "your@email.com", label: "Email" },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/25">
                        {f.label} <span className="text-[#39ff5a]">*</span>
                      </label>
                      <input type={f.type} required placeholder={f.placeholder}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none font-mono-custom transition-all duration-200 placeholder-white/15 focus:border-[#39ff5a]/40 focus:bg-white/[0.05]" />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/25">
                    Subject <span className="text-[#39ff5a]">*</span>
                  </label>
                  <input type="text" required placeholder="What's this about?"
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none font-mono-custom transition-all duration-200 placeholder-white/15 focus:border-[#39ff5a]/40 focus:bg-white/[0.05]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-custom text-[8px] tracking-[0.3em] uppercase text-white/25">
                    Message <span className="text-[#39ff5a]">*</span>
                  </label>
                  <textarea required rows={5} placeholder="Tell me about your project..."
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none font-mono-custom transition-all duration-200 resize-none placeholder-white/15 focus:border-[#39ff5a]/40 focus:bg-white/[0.05]" />
                </div>

                <button type="submit" disabled={status === "sending" || status === "sent"}
                  className={`w-full py-4 rounded-xl font-mono-custom text-[10px] tracking-[0.22em] uppercase font-bold transition-all duration-200 disabled:opacity-60 ${
                    status === "sent"
                      ? "bg-emerald-500 text-white border border-emerald-500"
                      : "bg-[#39ff5a] text-black border border-[#39ff5a] hover:shadow-[0_0_28px_rgba(57,255,90,0.5)]"
                  }`}>
                  {status === "idle"    && "Send Message →"}
                  {status === "sending" && <span className="flex items-center justify-center gap-2"><span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin"/>Sending...</span>}
                  {status === "sent"    && "✓ Message Sent!"}
                  {status === "error"   && "Error — Try Again"}
                </button>

                <p className="font-mono-custom text-[8px] tracking-[0.2em] uppercase text-white/15 text-center">
                  Fields marked with <span className="text-[#39ff5a]">*</span> are required
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
