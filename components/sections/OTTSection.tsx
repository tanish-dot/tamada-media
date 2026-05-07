"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OTT_SHOWS, STATS_OTT } from "@/data/content";
import MediaCard from "@/components/ui/MediaCard";
import StatBlock from "@/components/ui/StatBlock";

export default function OTTSection() {
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
            OTT & Long-Form
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2.5rem,5vw,7rem)] leading-[0.9] text-[#F5E6D0]"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            SOUTH INDIA'S LARGEST
            <br />
            <span className="text-[#C9A84C]">OTT PARTNER</span>
            <br />
            FOR LONG-FORM SHOWS.
          </motion.h2>
        </div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-px bg-[#F5E6D0]/10"
          style={{ marginBottom: "20px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {STATS_OTT.map((s, i) => (
            <div key={i} className="flex-1 min-w-[120px] bg-[#0A0A0A] px-6 lg:px-10 py-8">
              <StatBlock value={s.value} suffix={s.suffix} label={s.label} invert />
            </div>
          ))}
        </motion.div>

        {/* OTT show grid — poster style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {OTT_SHOWS.map((show, i) => (
            <a
              key={show.title}
              href={show.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
                <div style={{ position: "relative", paddingBottom: "133.33%", overflow: "hidden", background: "#111" }}>
                  {show.poster && (
                    <img src={show.poster} alt={show.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
                    <p style={{ color: "#C9A84C", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: "bold", marginBottom: "4px" }}>{show.platform}</p>
                    <h3 style={{ color: "#F5E6D0", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>{show.title}</h3>
                  </div>
                </div>
            </a>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          className="mt-10 text-[#F5E6D0]/30 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Aha · Hotstar · Amazon Prime Video · Zee5 · Viu + more
        </motion.p>
      </div>
    </section>
  );
}
