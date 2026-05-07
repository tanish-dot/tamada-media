"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WHY_TAMADA_STATS } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";

export default function WhyTamada() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#0A0A0A] overflow-hidden">
      <div ref={ref}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Tamada
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              THE NUMBERS
              <br />
              SPEAK <span className="text-[#C9A84C]">LOUD.</span>
            </motion.h2>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5E6D0]/10">
          {WHY_TAMADA_STATS.map((s, i) => (
            <motion.div
              key={i}
              className="bg-[#0A0A0A] p-8 lg:p-10 relative group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            >
              {/* Hover fill */}
              <motion.div
                className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-all duration-500"
              />
              <div className="relative z-10">
                <StatBlock value={s.value} suffix={s.suffix} label={s.label} invert size="large" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom brand promise */}
        <motion.div
          className="mt-16 pt-10 border-t border-[#F5E6D0]/10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <p className="font-display text-[clamp(1.5rem,3vw,4rem)] text-[#F5E6D0]/40 leading-tight max-w-4xl">
            Not just content. Not just campaigns. A system that compounds over time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
