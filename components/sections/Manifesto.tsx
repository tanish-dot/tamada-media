"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const MANIFESTO_POINTS = [
  {
    number: "01",
    title: "Always-On Content Generation",
    desc: "Not one campaign. Not a quarter. An always-on content engine that runs 24/7 across platforms.",
  },
  {
    number: "02",
    title: "Platform-Smart Execution",
    desc: "YouTube isn't Instagram. Instagram isn't Reels. We build format-first, not format-agnostic.",
  },
  {
    number: "03",
    title: "Culture-Driven Storytelling",
    desc: "Data tells you what worked. Culture tells you what will. We live at the intersection.",
  },
  {
    number: "04",
    title: "Data-Led Content Systems",
    desc: "Every format is a hypothesis. Every view is data. We build content machines that learn and evolve.",
  },
  {
    number: "05",
    title: "Community Building",
    desc: "Followers are vanity. Communities are compound interest. We build the latter.",
  },
];

export default function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#0A0A0A] overflow-hidden relative">
      {/* Big bg text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[25vw] leading-none text-[#F5E6D0]/[0.025] select-none pointer-events-none"
        aria-hidden
      >
        CAAS
      </div>

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Content as a Service / Manifesto
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,6.5rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              BRANDS CAN'T DEPEND
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-3">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,6.5rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              ON CONTENT CREATORS.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,6.5rem)] leading-[0.88] text-[#C9A84C]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              THEY SHOULD BECOME ONE.
            </motion.h2>
          </div>
        </div>

        {/* Manifesto points */}
        <div className="flex flex-col divide-y divide-[#F5E6D0]/10">
          {MANIFESTO_POINTS.map((point, i) => (
            <motion.div
              key={point.number}
              className="flex flex-col lg:flex-row gap-4 lg:gap-16 py-8 lg:py-10 group cursor-default"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-sm text-[#C9A84C] w-10 shrink-0">{point.number}</span>
              <h3 className="font-display text-xl lg:text-3xl text-[#F5E6D0] group-hover:text-[#C9A84C] transition-colors duration-300 w-full lg:w-80 shrink-0">
                {point.title}
              </h3>
              <p className="text-[#F5E6D0]/50 text-sm lg:text-base leading-[1.8] lg:max-w-xl">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
