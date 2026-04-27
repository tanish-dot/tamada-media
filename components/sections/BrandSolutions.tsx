"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND_SOLUTIONS_STATS, BRAND_LOGOS } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";
import LogoWall from "@/components/ui/LogoWall";

export default function BrandSolutions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#B91C1C] overflow-hidden relative">
      {/* Subtle noise */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <motion.p
              className="text-[10px] tracking-[0.35em] uppercase text-[#F5E6D0]/50 font-bold mb-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Brand Solutions by Hashify
            </motion.p>
            <motion.h2
              className="font-display text-[clamp(3rem,6vw,9rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              BRAND
              <br />
              SOLUTIONS.
            </motion.h2>
          </div>

          <motion.p
            className="text-[#F5E6D0]/60 text-base lg:text-lg leading-[1.8] max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            We excel at connecting brands with their perfect audience, driving unparalleled engagement.
            Your brand's success story is waiting to unfold.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5E6D0]/15 mb-16">
          {BRAND_SOLUTIONS_STATS.map((s, i) => (
            <motion.div
              key={i}
              className="bg-[#B91C1C] px-6 lg:px-10 py-10 group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.09 }}
            >
              <StatBlock value={s.value} suffix={s.suffix} label={s.label} invert size="large" />
            </motion.div>
          ))}
        </div>

        {/* Logo wall heading */}
        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase text-[#F5E6D0]/40 font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Few Among Many Campaigns
        </motion.p>

        {/* Brand ticker rows */}
        <motion.div
          className="overflow-hidden flex flex-col gap-0 border-y border-[#F5E6D0]/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {/* Row 1 — left */}
          <div className="py-4 border-b border-[#F5E6D0]/10 flex whitespace-nowrap animate-ticker">
            {Array(4).fill(BRAND_LOGOS.slice(0, 20)).flat().map((logo, i) => (
              <span key={i} className="mx-8 font-display text-[clamp(0.85rem,1.4vw,1.1rem)] tracking-[0.18em] uppercase text-[#F5E6D0]/50 hover:text-[#F5E6D0] transition-colors duration-300 cursor-default shrink-0">
                {logo}
                <span className="mx-8 text-[#B91C1C]/60">·</span>
              </span>
            ))}
          </div>

          {/* Row 2 — right */}
          <div className="py-4 flex whitespace-nowrap animate-ticker-reverse">
            {Array(4).fill(BRAND_LOGOS.slice(20)).flat().map((logo, i) => (
              <span key={i} className="mx-8 font-display text-[clamp(0.85rem,1.4vw,1.1rem)] tracking-[0.18em] uppercase text-[#F5E6D0]/35 hover:text-[#F5E6D0] transition-colors duration-300 cursor-default shrink-0">
                {logo}
                <span className="mx-8 text-[#B91C1C]/40">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
