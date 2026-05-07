"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IP_NAMES } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function OriginalIPs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080808] overflow-hidden border-t border-[#F5E6D0]/[0.06]">
      <style>{`
        @keyframes marquee-ips {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="section-padding py-24 lg:py-36">

        {/* Header */}
        <motion.div
          className="flex items-end justify-between"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-px bg-[#C9A84C] block" />
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold">Original IPs</p>
            </div>
            <h2
              className="font-display leading-[0.88] text-[#F5E6D0]"
              style={{ fontSize: "clamp(3rem,6vw,8rem)" }}
            >
              35+ IPs BUILT.
            </h2>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1.5">
            <p className="text-xs text-[#F5E6D0]/30 tracking-[0.15em] uppercase">5 Languages</p>
            <p className="text-xs text-[#F5E6D0]/30 tracking-[0.15em] uppercase">26M+ Subscribers</p>
          </div>
        </motion.div>

        {/* Marquee tapes */}
        <motion.div
          className="overflow-hidden -mx-6 md:-mx-12 lg:-mx-20 xl:-mx-28"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Row 1 — left to right */}
          <div
            className="flex whitespace-nowrap border-y border-[#F5E6D0]/[0.07] py-5 mb-px"
            style={{ animation: "marquee-ips 35s linear infinite" }}
          >
            {[...IP_NAMES, ...IP_NAMES].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-5 px-5">
                <span className="font-display tracking-wide text-[#F5E6D0]/50 uppercase" style={{ fontSize: "clamp(1rem,1.5vw,1.4rem)" }}>
                  {name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50 shrink-0" />
              </span>
            ))}
          </div>
          {/* Row 2 — right to left */}
          <div
            className="flex whitespace-nowrap border-b border-[#F5E6D0]/[0.07] py-5"
            style={{ animation: "marquee-ips 28s linear infinite reverse" }}
          >
            {[...IP_NAMES.slice().reverse(), ...IP_NAMES.slice().reverse()].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-5 px-5">
                <span className="font-display tracking-wide text-[#F5E6D0]/25 uppercase" style={{ fontSize: "clamp(1rem,1.5vw,1.4rem)" }}>
                  {name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5E6D0]/15 shrink-0" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(245,230,208,0.06)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            ["35+",   "Original IPs"],
            ["26M+",  "Subscribers"],
            ["5",     "Languages"],
            ["3000+", "Mins / Month"],
          ].map(([v, l]) => (
            <div key={l}>
              <p
                className="font-display leading-none text-[#F5E6D0]"
                style={{ fontSize: "clamp(2rem,3.5vw,4rem)" }}
              >
                {v}
              </p>
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#F5E6D0]/30 mt-2">{l}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
