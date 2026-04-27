"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/data/content";

const TICKER_ITEMS = ["תמדה", "తమడా", "ತಮಡಾ", "TAMADA", "தமடா", "തമഡ", "YOUR THUMB STOPS HERE", "తమడా", "ತಮಡಾ", "TAMADA"];

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0A0A0A] overflow-hidden">
      {/* Pre-CTA ticker */}
      <div className="border-t border-[#F5E6D0]/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="font-display text-sm text-[#F5E6D0]/20 mx-8 tracking-widest">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="section-padding">
        {/* Giant CTA headline */}
        <div style={{ marginBottom: "40px" }}>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-8"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Let's work together
          </motion.p>

          {["LIKE TO TEST", "THE WATERS?"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3.5rem,10vw,14rem)] leading-[0.88] text-[#F5E6D0]"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}

          <div className="overflow-hidden mt-2">
            <motion.h2
              className="font-display text-[clamp(1.5rem,4vw,6rem)] leading-[0.88] text-[#B91C1C]"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              LET'S BUILD YOUR NEXT CONTENT ENGINE.
            </motion.h2>
          </div>
        </div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          style={{ marginBottom: "20px" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="px-10 py-5 bg-[#B91C1C] text-[#F5E6D0] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#F5E6D0] hover:text-[#B91C1C] transition-all duration-300 inline-flex items-center gap-3 group"
          >
            Start a Conversation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={`mailto:${BRAND.email.primary}`}
            className="px-10 py-5 border border-[#F5E6D0]/20 text-[#F5E6D0] text-sm font-bold tracking-[0.2em] uppercase hover:border-[#F5E6D0] hover:bg-[#F5E6D0]/5 transition-all duration-300"
          >
            Email Us Directly
          </a>
        </motion.div>

        {/* Email addresses */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 lg:gap-10 border-t border-[#F5E6D0]/10 pt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/30 mb-2">Partnerships & Briefs</p>
            <a href={`mailto:${BRAND.email.primary}`} className="text-[#F5E6D0]/60 hover:text-[#B91C1C] text-sm transition-colors duration-300 font-medium">
              {BRAND.email.primary}
            </a>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/30 mb-2">Brand Solutions</p>
            <a href={`mailto:${BRAND.email.secondary}`} className="text-[#F5E6D0]/60 hover:text-[#B91C1C] text-sm transition-colors duration-300 font-medium">
              {BRAND.email.secondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t border-[#F5E6D0]/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker-reverse">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="font-display text-sm text-[#F5E6D0]/10 mx-8 tracking-widest">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
