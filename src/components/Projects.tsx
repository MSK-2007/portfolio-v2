"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Posters & Ads",
    category: "Brand Visibility",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",
    span: "col-span-1 row-span-2",
  },
  {
    id: 2,
    title: "Professional PPTs",
    category: "Presentation Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Vibe Coding",
    category: "Aesthetic Design",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=2832&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Social Media Assets",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15",
    span: "col-span-2 row-span-1",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.a
      variants={cardVariants}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${project.span} relative overflow-hidden rounded-2xl bg-[#0c0c0c] block group cursor-pointer min-h-[260px]`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="badge">{project.category}</span>
      </div>

      {/* Arrow top-right */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </div>

      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        <h3 className="font-display text-2xl md:text-3xl text-white uppercase leading-tight">{project.title}</h3>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} className="relative w-full bg-[#d4e5f7] py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Topographic grid lines */}
      <div className="absolute inset-0 topo-border opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header — ApeChain style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-14 flex-wrap gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-black/50">Selected Work</span>
            </div>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-[#0a0a0a] uppercase leading-none">
              My Designs
            </h2>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1431iK8Y3DwbioulZZXyqATr2UqUV5I15"
            target="_blank"
            rel="noopener noreferrer"
            className="self-end btn-outline-dark"
          >
            View All on Drive ↗
          </a>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 auto-rows-[280px]"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
