"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from "framer-motion";
import Image from "next/image";
import { SPIRAL_PROJECTS } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const CARD_COUNT = SPIRAL_PROJECTS.length;

// ── Progress pip — own component so hooks are valid ──
function ProgressPip({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const scaleX = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  return (
    <div className="h-[2px] rounded-full bg-[#F5E6D0]/15 overflow-hidden relative" style={{ width: 24 }}>
      <motion.div className="absolute inset-0 bg-[#B91C1C] origin-left" style={{ scaleX }} />
    </div>
  );
}

// ── Project card — own component so hooks are valid ──
function ProjectCard({
  project,
  index,
  progress,
  total,
}: {
  project: (typeof SPIRAL_PROJECTS)[0];
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  const scale   = useTransform(progress, [start, mid, end], [0.88, 1,    0.88]);
  const opacity = useTransform(progress, [start, mid, end], [0.35, 1,    0.35]);
  const cardY   = useTransform(progress, [start, mid, end], [32,   0,   -32]);

  return (
    <motion.div
      className="relative shrink-0 group cursor-pointer"
      style={{ width: "clamp(280px, 58vw, 780px)", scale, opacity, y: cardY }}
    >
      {/* Card face */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: project.bg }}>

        {'poster' in project && project.poster ? (
          <Image src={project.poster as string} alt={project.title} fill className="object-cover" />
        ) : (
          <>
            {/* Grid lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${project.accent}15 1px, transparent 1px), linear-gradient(90deg, ${project.accent}15 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            {/* Diagonal sweep */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(125deg, ${project.accent}20 0%, transparent 55%)` }} />
            {/* Big index watermark */}
            <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden>
              <span
                className="font-display leading-none select-none"
                style={{ fontSize: "clamp(6rem, 16vw, 18rem)", color: project.accent, opacity: 0.06 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </>
        )}

        {/* Info overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-8 lg:p-12"
          style={{ background: `linear-gradient(to top, ${project.bg} 0%, ${project.bg}cc 50%, transparent 100%)` }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-bold mb-3" style={{ color: project.accent }}>
            {project.category}
          </p>
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,4rem)] text-[#F5E6D0] leading-[0.9] mb-2">
            {project.title}
          </h3>
          <p className="text-[#F5E6D0]/35 text-sm font-medium tracking-wide">{project.stat}</p>
        </div>

        {/* Hover: top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: project.accent }}
        />

        {/* Hover: corner brackets */}
        <span className="absolute top-4 left-4 w-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: project.accent }} />
        <span className="absolute top-4 left-4 h-6 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: project.accent }} />
        <span className="absolute top-4 right-4 w-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: project.accent }} />
        <span className="absolute top-4 right-4 h-6 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: project.accent }} />
      </div>

      {/* Card glow on hover */}
      <div
        className="absolute -inset-2 -z-10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: `${project.accent}28` }}
      />
    </motion.div>
  );
}

// ── Main section ──
export default function SpiralShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.5 });

  // Horizontal track translation
  const x = useTransform(smooth, [0, 1], ["0vw", `-${(CARD_COUNT - 1) * 65}vw`]);

  // Header fades out as scroll begins
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const headerY       = useTransform(scrollYProgress, [0, 0.06], [0, -24]);

  return (
    <section ref={sectionRef} className="bg-[#080808] relative" style={{ height: `${CARD_COUNT * 110}vh` }}>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden relative">

        {/* Header — top left overlay */}
        <motion.div
          ref={headerRef}
          className="absolute top-0 left-0 right-0 z-20 section-padding pt-10 pb-0 pointer-events-none"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <motion.p
            className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-3"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Project Universe
          </motion.p>
          <div className="flex items-end justify-between">
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-display text-[clamp(2rem,4.5vw,6rem)] leading-[0.87] text-[#F5E6D0]"
                  initial={{ y: "106%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                >
                  SCROLL THROUGH
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-display text-[clamp(2rem,4.5vw,6rem)] leading-[0.87] text-[#B91C1C]"
                  initial={{ y: "106%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                >
                  OUR UNIVERSE.
                </motion.h2>
              </div>
            </div>
            <motion.p
              className="hidden lg:block text-[#F5E6D0]/20 text-[10px] tracking-[0.25em] uppercase"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Scroll to explore →
            </motion.p>
          </div>
        </motion.div>

        {/* Horizontal track — fills full height */}
        <div className="absolute inset-0 flex items-center overflow-visible">
          <motion.div className="flex gap-5 lg:gap-6 pl-[8vw] items-center" style={{ x }}>
            {SPIRAL_PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                progress={smooth}
                total={CARD_COUNT}
              />
            ))}
            <div style={{ width: "8vw", flexShrink: 0 }} />
          </motion.div>
        </div>

        {/* Progress + count — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 section-padding py-5 z-20 flex items-center gap-5">
          <div className="flex gap-1.5">
            {SPIRAL_PROJECTS.map((_, i) => (
              <ProgressPip key={i} progress={smooth} index={i} total={CARD_COUNT} />
            ))}
          </div>
          <p className="text-[#F5E6D0]/20 text-[10px] tracking-[0.25em] uppercase font-bold">
            {CARD_COUNT} Projects
          </p>
        </div>

        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
