"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  {
    label: "Instagram",
    short: "IG",
    href: "https://www.instagram.com/manish._.s.k?igsh=MTFwN2QzZTUyOHdo",
  },
  {
    label: "LinkedIn",
    short: "LI",
    href: "https://www.linkedin.com/in/manishshivakumar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    label: "Google Drive",
    short: "DR",
    href: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    formRef.current?.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" ref={ref} className="relative w-full bg-[#0c0c0c] overflow-hidden">
      {/* Dark topo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 46px, rgba(181,245,0,0.15) 46px, rgba(181,245,0,0.15) 47px),
          repeating-linear-gradient(90deg, transparent, transparent 46px, rgba(181,245,0,0.08) 46px, rgba(181,245,0,0.08) 47px)`
        }}
      />

      <div className="relative z-10 py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">— Let's Create Together</p>
            <h2 className="font-display text-[clamp(3rem,9vw,8rem)] text-white uppercase leading-none">
              Got A<br />
              Project<br />
              <span className="text-[#b5f500]">In Mind?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                Whether it's a poster, album cover, brand identity or a last-minute creative brief — I'm always up for interesting work. Let's build something worth looking at.
              </p>

              {/* Contact cards — ApeChain card style */}
              <div className="flex flex-col gap-3 mb-10">
                <a
                  href="mailto:manishshivakumar178@gmail.com"
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-white/10 bg-white/[0.04] hover:border-[#b5f500]/50 hover:bg-[#b5f500]/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white/60 group-hover:text-[#b5f500] group-hover:border-[#b5f500]/40 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className="font-mono-custom text-[9px] tracking-[0.25em] uppercase text-white/30 mb-0.5">Email</p>
                    <p className="text-white font-medium text-sm">manishshivakumar178@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919035361901"
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-white/10 bg-white/[0.04] hover:border-[#b5f500]/50 hover:bg-[#b5f500]/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white/60 group-hover:text-[#b5f500] group-hover:border-[#b5f500]/40 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.84A16 16 0 0 0 15.1 16l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p className="font-mono-custom text-[9px] tracking-[0.25em] uppercase text-white/30 mb-0.5">Phone / WhatsApp</p>
                    <p className="text-white font-medium text-sm">+91 90353 61901</p>
                  </div>
                </a>
              </div>

              {/* Social pills */}
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-custom text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border-2 border-white/20 text-white/50 hover:border-[#b5f500] hover:text-[#b5f500] transition-all duration-200"
                  >
                    {s.short}
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
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-3xl border-2 border-white/10 bg-white/[0.04] p-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30">
                      Name <span className="text-[#b5f500]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="bg-white/[0.06] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#b5f500]/60 transition-all duration-200 font-mono-custom"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30">
                      Email <span className="text-[#b5f500]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-white/[0.06] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#b5f500]/60 transition-all duration-200 font-mono-custom"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30">
                    Subject <span className="text-[#b5f500]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="bg-white/[0.06] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#b5f500]/60 transition-all duration-200 font-mono-custom"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/30">
                    Message <span className="text-[#b5f500]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="bg-white/[0.06] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#b5f500]/60 transition-all duration-200 resize-none font-mono-custom"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={`w-full py-4 rounded-xl font-mono-custom text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-200 disabled:opacity-60 ${
                    status === "sent"
                      ? "bg-emerald-500 text-white border-2 border-emerald-500"
                      : "bg-[#b5f500] text-[#0a0a0a] border-2 border-[#b5f500] hover:opacity-85"
                  }`}
                >
                  {status === "idle" && "Send Message →"}
                  {status === "sending" && (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  )}
                  {status === "sent" && "✓ Message Sent!"}
                  {status === "error" && "Error — Try Again"}
                </button>

                <p className="font-mono-custom text-[9px] tracking-[0.2em] uppercase text-white/20 text-center">
                  Fields marked with <span className="text-[#b5f500]">*</span> are required
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
