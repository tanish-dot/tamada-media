"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MICRO_DRAMAS } from "@/data/content";
import ProjectCard from "@/components/ui/ProjectCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = ["#C9A84C", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#3B82F6", "#F97316", "#22C55E"];

export default function MicroDramas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#0A0A0A] overflow-hidden">
      <div ref={ref}>
        <motion.div
          className="flex items-center justify-between mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-2">
              Branded Storytelling
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,5rem)] leading-none text-[#F5E6D0]">
              BRANDED MICRO DRAMAS
              <br />
              <span className="text-[#F5E6D0]/30">&amp; SHORT SERIES.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" style={{ marginTop: "20px" }}>
          {MICRO_DRAMAS.map((drama, i) => (
            <motion.div
              key={drama.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              <ProjectCard
                title={drama.title}
                category={drama.brand ? "Branded Series" : "Mini Series"}
                brand={drama.brand ?? undefined}
                episodes={drama.episodes}
                views={drama.views}
                bg={`hsl(0, 0%, ${6 + (i % 4) * 3}%)`}
                accent={ACCENTS[i % ACCENTS.length]}
                index={i}
                slot={`micro-drama-poster-${i + 1}`}
                poster={drama.poster}
                className="!aspect-video"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
