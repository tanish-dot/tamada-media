"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  { label: "Multi-Channel Network", size: "xl" },
  { label: "Influencer Marketing",  size: "xl" },
  { label: "OTT Shows",             size: "lg" },
  { label: "Social Media Management", size: "md" },
  { label: "TVC / DVC",             size: "sm" },
  { label: "Performance Ads",       size: "sm" },
  { label: "Content IPs",           size: "xl" },
  { label: "Content Strategy",      size: "lg" },
  { label: "Platform Partnerships", size: "md" },
  { label: "Creator Growth",        size: "md" },
];

const SIZE_CLASS: Record<string, string> = {
  xl: "text-[clamp(3rem,7.5vw,9rem)]",
  lg: "text-[clamp(2.2rem,5.5vw,7rem)]",
  md: "text-[clamp(1.7rem,3.8vw,5rem)]",
  sm: "text-[clamp(1.3rem,2.8vw,4rem)]",
};

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatWeDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden">
      <div ref={ref}>
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: ENTRANCE_EASE }}
        >
          <span className="block w-8 h-px bg-[#B91C1C]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B91C1C] font-bold">
            So… what do we do?
          </span>
        </motion.div>

        {/* Italic subtext */}
        <motion.p
          className="text-[#6B6B6B] text-base lg:text-xl italic mb-14 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: ENTRANCE_EASE }}
        >
          Well, we are all the above.
        </motion.p>

        {/* Giant editorial word pile */}
        <div className="leading-[0.88]">
          {SERVICES.map((s, i) => (
            <motion.span
              key={i}
              className={`font-display ${SIZE_CLASS[s.size]} text-[#B91C1C] inline-block mr-5 lg:mr-10 mb-2 cursor-default select-none relative group`}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.18 + i * 0.07,
                ease: ENTRANCE_EASE,
              }}
              whileHover={{
                color: "#0A0A0A",
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              {s.label}
            </motion.span>
          ))}

          <motion.span
            className="font-display text-[clamp(1.3rem,2.8vw,4rem)] text-[#0A0A0A]/25 italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 1.05 }}
          >
            + more
          </motion.span>
        </div>

        {/* Divider */}
        <motion.div
          className="mt-16 lg:mt-24 w-full h-px bg-[#0A0A0A]/10"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          style={{ originX: 0 }}
          transition={{ duration: 1.0, delay: 0.75, ease: ENTRANCE_EASE }}
        />

        {/* Bottom descriptor */}
        <motion.div
          className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85, ease: ENTRANCE_EASE }}
        >
          <p className="text-[#0A0A0A]/55 text-base lg:text-lg max-w-xl leading-[1.75]">
            We&apos;re not an agency. We&apos;re a full-spectrum media company built for the
            creator economy. From IP creation to performance ads — all under one roof.
          </p>

          <div className="flex items-center gap-4 flex-wrap shrink-0">
            {["MCN", "Production House", "OTT Partner", "IP Builder"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#0A0A0A]/40 cursor-default"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.95 + i * 0.07, ease: ENTRANCE_EASE }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
