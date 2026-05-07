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
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block w-5 h-px bg-[#C45B5B]" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-[#C45B5B] font-bold">Let's work together</span>
          </motion.div>

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
              className="font-display text-[clamp(3.5rem,10vw,14rem)] leading-[0.88] text-[#C9A84C]"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              TOGETHER?
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
            className="px-10 py-5 bg-[#C9A84C] text-[#F5E6D0] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#F5E6D0] hover:text-[#C9A84C] transition-all duration-300 inline-flex items-center gap-3 group"
          >
            Start a Conversation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={`mailto:${BRAND.email.primary}`}
            className="px-10 py-5 border border-[#F5E6D0]/20 text-[#F5E6D0] text-sm font-bold tracking-[0.2em] uppercase hover:border-[#4E8CC4] hover:text-[#4E8CC4] hover:bg-[#4E8CC4]/5 transition-all duration-300"
          >
            Email Us Directly
          </a>
        </motion.div>

        {/* Email addresses */}
        <motion.div
          className="flex border-t border-[#F5E6D0]/10 pt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/30 mb-2">Get In Touch</p>
            <a href={`mailto:${BRAND.email.primary}`} className="text-[#F5E6D0]/60 hover:text-[#C9A84C] text-sm transition-colors duration-300 font-medium">
              {BRAND.email.primary}
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
