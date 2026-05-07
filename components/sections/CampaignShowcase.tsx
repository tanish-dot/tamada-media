"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CAMPAIGNS = [
  { title: "Indian 2 — Netflix",           category: "Shoulder Content",   stat: "Kamal Haasan",      bg: "#0F0F14", accent: "#E50914",  poster: "/campaigns/indian-2.jpg" },
  { title: "Rana Daggubati Show",           category: "Celebrity Series",   stat: "Amazon Prime",      bg: "#0D1520", accent: "#00A8E1",  poster: "/campaigns/rana-daggubati.jpg" },
  { title: "Kalki 2898 AD",                 category: "Ad Breakdown",       stat: "Amazon Prime",      bg: "#1A1508", accent: "#F59E0B",  poster: "/campaigns/kalki.jpg" },
  { title: "Aaya Baby John",                category: "Movie Promo",        stat: "Spotify",           bg: "#0A1E0A", accent: "#1DB954",  poster: "/campaigns/baby-john.jpg" },
  { title: "Naga Chaitanya Surprises Fans", category: "Brand Activation",   stat: "Viral",             bg: "#14100A", accent: "#F97316",  poster: "/campaigns/naga-chaitanya.jpg" },
  { title: "The Wedding Heist",             category: "Netflix Collab",     stat: "1M+ Views",         bg: "#0A0A14", accent: "#E50914",  poster: "/campaigns/wedding-heist.jpg" },
  { title: "Behensplaining",                category: "Cultural Content",   stat: "Netflix",           bg: "#100A14", accent: "#A855F7",  poster: "/campaigns/behensplaining.jpg" },
  { title: "Tea & Bagara Baingan",          category: "Food Series",        stat: "Netflix",           bg: "#14100A", accent: "#F59E0B",  poster: "/campaigns/tea-bagara-baingan.jpg" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CampaignShowcase() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-[#080808] overflow-hidden">
      <div>

        {/* ── Header ── */}
        <div style={{ marginBottom: "60px" }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block w-6 h-px bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">
                Campaign Showcase
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.88] text-[#F5E6D0]"
                initial={{ y: "106%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
              >
                EVEN SHOULDER
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.88] text-[#F5E6D0]"
                initial={{ y: "106%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.18, ease: EASE }}
              >
                CONTENT NEEDS
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.88] text-[#C9A84C]"
                initial={{ y: "106%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.26, ease: EASE }}
              >
                A SHOULDER.
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-[#F5E6D0]/35 text-base lg:text-lg max-w-sm leading-[1.8] lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            From Kamal Haasan delivering a convincing CTA to Rana going full goofy — we make serious content seriously fun.
          </motion.p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-7">

          {CAMPAIGNS.map((c, i) => (
            <CampaignCard key={c.title} c={c} i={i} inView={inView} aspect="aspect-video" />
          ))}

        </div>

      </div>
    </section>
  );
}

// ── Campaign Card ──────────────────────────────────────────────────────────────

function CampaignCard({
  c, i, inView, className = "", aspect = "aspect-video",
}: {
  c: typeof CAMPAIGNS[0];
  i: number;
  inView: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer rounded-2xl ${aspect} ${className}`}
      style={{ background: c.bg }}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: 0.2 + i * 0.07, ease: EASE }}
      whileHover={{ scale: 1.015 }}
      data-slot={`campaign-thumbnail-${i + 1}`}
    >
      {c.poster ? (
        <div aria-label={c.title} style={{ position: "absolute", inset: 0, backgroundImage: `url(${c.poster})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      ) : (
        <>
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(${c.accent}44 1px, transparent 1px), linear-gradient(90deg, ${c.accent}44 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          {/* Large index watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none">
            <span className="font-display text-[18vw] leading-none" style={{ color: c.accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Hover color overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${c.accent}18` }}
      />

      {/* Play button */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#F5E6D0]/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:border-[#F5E6D0]/60 group-hover:scale-110">
        <svg className="w-3.5 h-3.5 text-[#F5E6D0] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Content gradient + labels */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 lg:px-6 pt-16 pb-5 lg:pb-6"
        style={{ background: c.poster ? "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4) 60%, transparent)" : `linear-gradient(to top, ${c.bg}f0 0%, ${c.bg}99 60%, transparent 100%)` }}
      >
        <p
          className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1.5 opacity-80"
          style={{ color: c.accent }}
        >
          {c.category}
        </p>
        <h3 className="font-display text-[#F5E6D0] leading-tight" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)" }}>
          {c.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-px" style={{ background: c.accent }} />
          <p className="text-[10px] text-[#F5E6D0]/50 font-medium tracking-wide">{c.stat}</p>
        </div>
      </div>
    </motion.div>
  );
}
