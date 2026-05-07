"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const FOUNDERS = [
  {
    name: "Saideep Reddy",
    title: "Co-Founder",
    bio: "Architect of South India's largest content network. Built Tamada from the ground up into a 4.8B+ monthly views powerhouse.",
    quote: "We didn't build an agency. We built a machine.",
  },
  {
    name: "Rahul Tamada",
    title: "Co-Founder",
    bio: "The operational force behind 750+ channels and 35+ original IPs. Turning creative vision into scalable content ecosystems.",
    quote: "Scale is a habit, not a milestone.",
  },
];

// Single shared image slot for both founders together
const FOUNDERS_IMAGE: string | null = "/founders.png";

export default function Founders() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[#080808] overflow-hidden relative">

      {/* Header */}
      <div className="relative z-10" style={{ marginBottom: "40px" }}>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="block w-6 h-px bg-[#C9A84C]" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">The People</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            {["THE MINDS", "BEHIND THE"].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  className="font-display text-[clamp(3rem,7vw,9rem)] leading-[0.88] text-[#F5E6D0]"
                  initial={{ y: "106%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 1.0, delay: 0.1 + i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,9rem)] leading-[0.88] text-[#C9A84C]"
                initial={{ y: "106%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
              >
                MACHINE.
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-[#F5E6D0]/40 text-base max-w-xs leading-[1.8] lg:text-right"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            Two founders. One mission. Build the content infrastructure that powers South India's digital culture.
          </motion.p>
        </div>
      </div>

      {/* Shared founders photo */}
      <motion.div
        className="relative z-10 group w-full overflow-hidden mb-10"
        style={{ paddingBottom: "43.75%" }}
        data-slot="founders-together"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        {FOUNDERS_IMAGE ? (
          <Image
            src={FOUNDERS_IMAGE}
            alt="Saideep Reddy & Rahul Tamada — Co-Founders"
            fill
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{
              background: "linear-gradient(160deg, #141414 0%, #0a0a0a 100%)",
              border: "1px dashed rgba(245,230,208,0.08)",
            }}
          >
            <div className="flex items-center gap-6">
              {[0, 1].map((j) => (
                <div key={j} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border border-[#F5E6D0]/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#F5E6D0]/20">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/15">
              founders-together
            </span>
          </div>
        )}

        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-8 h-[2px] bg-[#C9A84C]" />
        <span className="absolute top-0 left-0 h-8 w-[2px] bg-[#C9A84C]" />
        <span className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#C9A84C]" />
        <span className="absolute bottom-0 right-0 h-8 w-[2px] bg-[#C9A84C]" />

        {/* Bottom sweep on hover */}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </motion.div>

      {/* Founder info — two columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 border-t border-[#F5E6D0]/[0.07] pt-10">
        {FOUNDERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75 + i * 0.15, ease: EASE }}
          >
            <h3
              className="font-display text-[#F5E6D0] leading-[0.9] mb-2"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3.5rem)" }}
            >
              {f.name}
            </h3>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-6">
              {f.title}
            </p>
            <div className="w-8 h-px bg-[#F5E6D0]/15 mb-6" />
            <p className="text-[#F5E6D0]/45 text-sm leading-[1.85] mb-5">
              {f.bio}
            </p>
            <p className="font-display text-[#F5E6D0]/20 text-base leading-tight italic">
              &ldquo;{f.quote}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <motion.div
        className="relative z-10 h-px mt-4"
        style={{ background: "linear-gradient(90deg, rgba(245,230,208,0.08), transparent)", originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
      />
    </section>
  );
}
