"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WHY_NOW_LINES } from "@/data/content";

export default function WhyNow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden relative">
      {/* Background large text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-[#0A0A0A]/[0.04] select-none pointer-events-none"
        aria-hidden
      >
        NOW
      </div>

      <div ref={ref} className="relative z-10">
        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Why Now
        </motion.p>

        <div className="flex flex-col gap-6 lg:gap-8 max-w-5xl">
          {WHY_NOW_LINES.map((line, i) => {
            const isLead = i < 3;
            return (
              <div key={i} className="overflow-hidden">
                <motion.p
                  className={`font-display leading-tight ${
                    isLead
                      ? "text-[clamp(1.8rem,4vw,5.5rem)] text-[#0A0A0A]"
                      : "text-[clamp(1.2rem,2.5vw,3rem)] text-[#0A0A0A]/50"
                  }`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: 0.2 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {isLead && (
                    <span className="text-[#B91C1C] mr-3">—</span>
                  )}
                  {line}
                </motion.p>
              </div>
            );
          })}
        </div>

        {/* Divider line */}
        <motion.div
          className="mt-16 h-px bg-[#0A0A0A]/10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </div>
    </section>
  );
}
