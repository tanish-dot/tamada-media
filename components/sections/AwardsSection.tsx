"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const AWARDS = [
  {
    year: "2020",
    title: "YouTube Enterprise Partner",
    category: "Platform Recognition",
    body: "1 of 12 in all of India",
  },
  {
    year: "2022",
    title: "Filmfare OTT Award",
    category: "Best Digital Content Studio",
    body: "South India category",
  },
  {
    year: "2023",
    title: "e4m Digital Award",
    category: "Content Company of the Year",
    body: "National recognition",
  },
  {
    year: "2023",
    title: "Social Samosa",
    category: "Top 10 Content Companies",
    body: "India digital media",
  },
  {
    year: "2024",
    title: "Digies Award",
    category: "Best MCN — South India",
    body: "Multi-channel network",
  },
];

export default function AwardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080808] relative overflow-hidden">
      {/* Grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }}
      />

      {/* Header */}
      <div className="section-padding pb-0 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Recognition
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.5rem,5.5vw,7rem)] leading-[0.87] text-[#F5E6D0]"
                initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                AWARD <span className="text-[#C9A84C]">WINNING.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-[#F5E6D0]/20 text-xs tracking-[0.2em] uppercase hidden lg:block text-right leading-relaxed max-w-[180px]"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Recognised by the platforms and industries we helped build
          </motion.p>
        </div>
      </div>

      {/* Award rows */}
      <div className="relative z-10">
        {AWARDS.map((award, i) => (
          <AwardRow key={i} award={award} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function AwardRow({
  award,
  index,
  inView,
}: {
  award: (typeof AWARDS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative border-t border-[#F5E6D0]/[0.07] overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.25 + index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.07) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A84C] origin-top"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <div className="section-padding py-7 lg:py-8 relative z-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">
        {/* Year */}
        <motion.span
          className="font-display tabular-nums shrink-0 lg:w-28"
          style={{ fontSize: "clamp(1rem,1.5vw,1.4rem)" }}
          animate={{ color: hovered ? "#C9A84C" : "rgba(245,230,208,0.22)" }}
          transition={{ duration: 0.25 }}
        >
          {award.year}
        </motion.span>

        {/* Category */}
        <span
          className="text-[9px] tracking-[0.32em] uppercase font-bold shrink-0 lg:w-72 hidden lg:block truncate pr-4"
          style={{ color: hovered ? "rgba(245,230,208,0.45)" : "rgba(245,230,208,0.18)", transition: "color 0.25s" }}
        >
          {award.category}
        </span>

        {/* Title */}
        <motion.h3
          className="font-display flex-1"
          style={{ fontSize: "clamp(1.4rem,2.5vw,3rem)", lineHeight: 1 }}
          animate={{ color: hovered ? "#F5E6D0" : "rgba(245,230,208,0.7)" }}
          transition={{ duration: 0.25 }}
        >
          {award.title}
        </motion.h3>

        {/* Body */}
        <span
          className="text-xs tracking-wide shrink-0 lg:w-40 lg:text-right hidden lg:block"
          style={{ color: hovered ? "#C9A84C" : "rgba(245,230,208,0.18)", transition: "color 0.25s" }}
        >
          {award.body}
        </span>
      </div>
    </motion.div>
  );
}
