"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND_SOLUTIONS_STATS, BRAND_LOGOS } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";

// Split brands across 4 columns, doubled for seamless loop
const chunk = (arr: string[], n: number) =>
  Array.from({ length: n }, (_, i) =>
    arr.filter((_, j) => j % n === i)
  );

const COLS = chunk(BRAND_LOGOS, 4).map((col) => [...col, ...col]);

const DURATIONS = [34, 44, 38, 48];
const REVERSE   = [false, true, false, true];

export default function BrandSolutions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#080808] overflow-hidden relative">
      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="relative z-10">

        {/* ── Header + stats ── */}
        <div className="section-padding pt-20 lg:pt-28 pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <motion.p
                className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/50 font-bold mb-5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                Brand Solutions by Hashify
              </motion.p>
              <motion.h2
                className="font-display text-[#F5E6D0] leading-[0.88]"
                style={{ fontSize: "clamp(3rem, 6vw, 9rem)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                BRAND
                <br />
                SOLUTIONS.
              </motion.h2>
            </div>

            <motion.p
              className="text-[#F5E6D0]/60 text-base lg:text-lg leading-[1.8] max-w-sm lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We connect brands with their perfect audience.
              Your success story is waiting to unfold.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {BRAND_SOLUTIONS_STATS.map((s, i) => (
              <div key={i} className="bg-[#080808] px-6 lg:px-10 py-10">
                <StatBlock value={s.value} suffix={s.suffix} label={s.label} invert size="large" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Vertical brand tile columns ── */}
        <div className="border-t border-[#F5E6D0]/10 relative">

          {/* Top + bottom gradient masks */}
          <div className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }} />

          <motion.div
            className="flex gap-px overflow-hidden"
            style={{ height: "480px" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {COLS.map((col, ci) => {
              const animY = REVERSE[ci] ? ["-50%", "0%"] : ["0%", "-50%"];
              return (
                <div key={ci} className="flex-1 overflow-hidden border-r border-[#F5E6D0]/[0.08] last:border-r-0">
                  <motion.div
                    className="flex flex-col"
                    animate={{ y: animY }}
                    transition={{
                      duration: DURATIONS[ci],
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    {col.map((brand, bi) => (
                      <div
                        key={bi}
                        className="group flex items-center justify-center px-4 py-6 border-b border-[#F5E6D0]/[0.08] cursor-default select-none"
                        style={{ minHeight: "80px" }}
                      >
                        <span className="font-display text-center text-[#F5E6D0]/40 group-hover:text-[#F5E6D0] transition-colors duration-300 leading-tight"
                          style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.95rem)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                          {brand}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
