"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MICRO_DRAMAS } from "@/data/content";
import ProjectCard from "@/components/ui/ProjectCard";

export default function MicroDramas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const bgColors = [
    "#0F0A08", "#0A0F0A", "#100A10", "#0A100F",
    "#14100A", "#0A0A14", "#100F0A", "#0F0A14",
    "#0A140A", "#14080A",
  ];
  const accents = [
    "#B91C1C", "#10B981", "#8B5CF6", "#0EA5E9",
    "#F59E0B", "#EF4444", "#F97316", "#A855F7",
    "#22C55E", "#E11D48",
  ];

  return (
    <section className="section-padding bg-[#0A0A0A] overflow-hidden">
      <div ref={ref}>
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Branded Storytelling
          </motion.p>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-5">
            {["BRANDED", "MICRO-DRAMAS &", "MINI SERIES."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  className="font-display text-[clamp(2.5rem,5vw,7rem)] leading-[0.9] text-[#F5E6D0] whitespace-nowrap"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
          <motion.p
            className="mt-6 text-[#F5E6D0]/50 text-base max-w-xl leading-[1.8]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Episodic branded storytelling. Format-first, culture-led, always with the brand woven in — not bolted on.
          </motion.p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
          {MICRO_DRAMAS.map((drama, i) => (
            <motion.div
              key={drama.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <ProjectCard
                title={drama.title}
                category="Branded Series"
                brand={drama.brand}
                episodes={drama.episodes}
                views={drama.views}
                bg={bgColors[i % bgColors.length]}
                accent={accents[i % accents.length]}
                index={i}
                slot={`micro-drama-poster-${i + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
