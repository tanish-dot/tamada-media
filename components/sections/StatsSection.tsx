"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StatBlock from "@/components/ui/StatBlock";
import { STATS_SCALE } from "@/data/content";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#080808] text-[#F5E6D0] overflow-hidden relative">
      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle diagonal rule */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #F5E6D0 0px,
            #F5E6D0 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      <div ref={ref} className="section-padding relative z-10">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <motion.p
            className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/50 mb-5 font-bold"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: ENTRANCE_EASE }}
          >
            Creators are the next big thing
          </motion.p>

          <div className="overflow-hidden mb-1">
            <motion.h2
              className="font-display text-[clamp(2.8rem,6.5vw,9rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.95, delay: 0.08, ease: ENTRANCE_EASE }}
            >
              WELL, <span className="text-[#B91C1C]">WE</span> SAID
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.8rem,6.5vw,9rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.95, delay: 0.16, ease: ENTRANCE_EASE }}
            >
              THAT{" "}
              <span className="text-[#B91C1C]">15 YEARS</span> AGO.
            </motion.h2>
          </div>
        </div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5E6D0]/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {STATS_SCALE.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-[#080808] px-7 lg:px-12 py-12 lg:py-16 relative group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + i * 0.08, ease: ENTRANCE_EASE }}
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-[#B91C1C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background index watermark */}
              <span className="absolute bottom-3 right-5 font-display text-[5rem] lg:text-[7rem] leading-none text-[#F5E6D0]/[0.04] select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <StatBlock
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  invert
                  size="large"
                />
              </div>

              {/* Bottom border reveal on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B91C1C] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="mt-12 text-[#F5E6D0]/35 text-sm italic tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          1 of 12 YouTube Enterprise Partners in India
        </motion.p>
      </div>
    </section>
  );
}
