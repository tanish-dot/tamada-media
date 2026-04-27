"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PLATFORM_PARTNERSHIPS_STATS } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";

const PLATFORMS = [
  "YouTube", "Instagram", "Snapchat", "Josh", "Moj",
  "ShareChat", "Roposo", "MX TakaTak", "LinkedIn", "Twitter/X",
];

export default function PlatformPartnerships() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden">
      <div ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <motion.p
              className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Platform Partnerships
            </motion.p>
            <motion.h2
              className="font-display text-[clamp(3rem,6vw,8rem)] leading-[0.88] text-[#0A0A0A] mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              PLATFORM
              <br />
              PARTNERSHIPS.
            </motion.h2>

            <motion.p
              className="text-[#6B6B6B] text-base lg:text-lg leading-[1.8] mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              From platform pilots to large-scale rollouts, Tamada has partnered with
              leading platforms and brands to execute high-impact creator programmes.
            </motion.p>

            {/* Bold tagline bar */}
            <motion.div
              className="bg-[#0A0A0A] px-5 py-3 mb-16"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-display text-[#F5E6D0] text-sm lg:text-base tracking-widest uppercase">
                Scale isn't the outcome. It's the default.
              </span>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-[#0A0A0A]/10">
              {PLATFORM_PARTNERSHIPS_STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className="bg-[#F5E6D0] p-6 lg:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                >
                  <StatBlock value={s.value} suffix={s.suffix} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — platform list */}
          <div>
            <motion.p
              className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B] font-bold mb-6"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Platforms We Operate On
            </motion.p>
            <div className="flex flex-col">
              {PLATFORMS.map((p, i) => (
                <motion.div
                  key={p}
                  className="flex items-center justify-between py-4 border-b border-[#0A0A0A]/10 group cursor-default"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display text-xl lg:text-2xl text-[#0A0A0A] group-hover:text-[#B91C1C] transition-colors duration-300">
                    {p}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/30 group-hover:text-[#B91C1C]/60 transition-colors duration-300">
                    Active
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
