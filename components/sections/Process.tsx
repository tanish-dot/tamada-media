"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/data/content";

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden">
      <div ref={ref}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Process
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] text-[#0A0A0A]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              THE SYSTEM
              <br />
              <span className="text-[#B91C1C]">BEHIND THE SCALE.</span>
            </motion.h2>
          </div>
        </div>

        {/* Process steps — editorial table layout */}
        <div className="flex flex-col divide-y divide-[#0A0A0A]/10">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="grid grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 group cursor-default items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Number */}
              <div className="col-span-2 lg:col-span-1">
                <span className="font-display text-4xl lg:text-5xl text-[#B91C1C] leading-none group-hover:scale-110 inline-block transition-transform duration-300">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-10 lg:col-span-4">
                <h3 className="font-display text-xl lg:text-3xl text-[#0A0A0A] group-hover:text-[#B91C1C] transition-colors duration-300 leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className="text-[#6B6B6B] text-sm lg:text-base leading-[1.8] max-w-xl">
                  {step.desc}
                </p>
              </div>

              {/* Right arrow */}
              <div className="hidden lg:flex col-span-1 justify-end items-center">
                <motion.span
                  className="text-[#0A0A0A]/20 group-hover:text-[#B91C1C] transition-colors duration-300"
                  animate={inView ? { x: [0, 6, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
