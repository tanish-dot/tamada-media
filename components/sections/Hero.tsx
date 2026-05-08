"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Grid images ──────────────────────────────────────────────────────────────

const OTT_IMGS = [
  "/ott/hostel-days.jpg",
  "/ott/dead-pixels.jpg",
  "/ott/isakapatnam1.jpg",
  "/ott/pelli-gola.jpg",
  "/ott/net.jpg",
  "/ott/hawala.jpg",
  "/ott/aha-naa-pelanta.jpg",
  "/ott/bff.jpg",
  "/ott/commit-mental.jpg",
  "/ott/geetha-subramanyam.jpg",
];

const MICRO_IMGS = [
  "/micro-dramas/andhra-ammayi-telangana-abbayi.jpg",
  "/micro-dramas/anveshana.jpg",
  "/micro-dramas/arakai-animutyan.jpg",
  "/micro-dramas/boyzzzz.jpg",
  "/micro-dramas/geetha-subramanyam.jpg",
  "/micro-dramas/raos-vs-murthys.jpg",
  "/micro-dramas/sotari-brothers.jpg",
  "/micro-dramas/sudha-moorthy.jpg",
];

const OTT_COL_A  = [OTT_IMGS[0], OTT_IMGS[2], OTT_IMGS[4], OTT_IMGS[6], OTT_IMGS[8], OTT_IMGS[1], OTT_IMGS[3], OTT_IMGS[5], OTT_IMGS[7], OTT_IMGS[9]];
const OTT_COL_B  = [...OTT_COL_A].reverse();
const MICRO_COL_A = [MICRO_IMGS[0], MICRO_IMGS[2], MICRO_IMGS[4], MICRO_IMGS[6], MICRO_IMGS[1], MICRO_IMGS[3], MICRO_IMGS[5], MICRO_IMGS[7], MICRO_IMGS[0], MICRO_IMGS[2]];
const MICRO_COL_B = [...MICRO_COL_A].reverse();

// Col 0 & 2: Micro-dramas (16/9) — Col 1 & 3: OTT (2/3 portrait)
const COLUMNS: { imgs: string[]; aspect: string; duration: number; offset: number }[] = [
  { imgs: MICRO_COL_A, aspect: "16/9", duration: 280, offset: 0  },
  { imgs: OTT_COL_A,   aspect: "2/3",  duration: 250, offset: 15 },
  { imgs: MICRO_COL_B, aspect: "16/9", duration: 260, offset: 10 },
  { imgs: OTT_COL_B,   aspect: "2/3",  duration: 230, offset: 25 },
];

// ─── Ticker + Stats data ───────────────────────────────────────────────────────

const TICKER_ITEMS = ["తమడా", "ಟಮಡಾ", "TAMADA", "தமடா", "తమడా", "ಟಮಡಾ", "TAMADA", "தமடா"];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#080808] flex flex-col overflow-hidden lg:max-h-screen">

      {/* ── Scrolling image grid ── */}
      <div className="absolute inset-0 z-[1] flex gap-3 sm:gap-4 overflow-hidden px-2">
        {COLUMNS.map((col, ci) => {
          const off = col.offset;
          const fromY = `-${off}%`;
          const toY   = `-${off + 50}%`;
          const doubled = [...col.imgs, ...col.imgs];
          return (
            <div
              key={ci}
              className="flex-1 overflow-hidden shrink-0"
              style={{ contain: "layout paint" }}
            >
              <motion.div
                className="flex flex-col gap-3 sm:gap-4"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
                animate={{ y: [fromY, toY] }}
                transition={{ duration: col.duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              >
                {doubled.map((src, ii) => (
                  <div key={ii} style={{ position: "relative", aspectRatio: col.aspect, flexShrink: 0, borderRadius: "8px", overflow: "hidden" }}>
                    <img
                      src={src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Overlays ── */}
      {/* Radial vignette — stronger on mobile */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.60) 55%, rgba(8,8,8,0.30) 100%)",
      }} />
      {/* Top / bottom gradient */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(8,8,8,0.92) 0%, transparent 20%, transparent 70%, rgba(8,8,8,0.97) 100%)",
      }} />
      {/* Gold flare */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)",
      }} />
      {/* Grain */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px",
      }} />

      {/* ── Top ticker ── */}
      <div className="relative z-10 pt-[4.5rem] lg:pt-[5rem]">
        <div className="border-b border-[#F5E6D0]/[0.07] py-2.5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker-reverse">
            {Array(6).fill(TICKER_ITEMS).flat().map((t, i) => (
              <span key={i} className="font-display text-[11px] tracking-[0.3em] text-[#F5E6D0]/[0.16] mx-7">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Headline block ── */}
      <div
        className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "clamp(4rem, 10vh, 10rem)", paddingBottom: "2rem" }}
      >

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2.5 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block w-4 sm:w-5 h-px bg-[#C45B5B]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.38em] sm:tracking-[0.42em] uppercase text-[#F5E6D0]/40 font-semibold">
            South India's Largest Content Ecosystem
          </span>
          <span className="block w-4 sm:w-5 h-px bg-[#C45B5B]" />
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display leading-none" aria-label="Your Thumb Stops Here">
          <div className="overflow-hidden">
            <motion.span
              className="block text-[#F5E6D0]"
              style={{ fontSize: "clamp(3.6rem, 9.5vw, 11.5rem)", lineHeight: 0.92 }}
              initial={{ y: "106%", skewY: 1.5 }}
              animate={ready ? { y: "0%", skewY: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              YOUR THUMB
            </motion.span>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.span
              className="block text-[#F5E6D0]/25 tracking-wide"
              style={{ fontSize: "clamp(2.4rem, 6.5vw, 8rem)", lineHeight: 0.95 }}
              initial={{ y: "106%", skewY: 1.5 }}
              animate={ready ? { y: "0%", skewY: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              STOPS
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block text-[#F5E6D0]"
              style={{ fontSize: "clamp(5rem, 13vw, 16rem)", lineHeight: 0.88 }}
              initial={{ y: "106%", skewY: 1.5 }}
              animate={ready ? { y: "0%", skewY: 0 } : {}}
              transition={{ duration: 1.05, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            >
              HERE<span className="text-[#C45B5B]">.</span>
            </motion.span>
          </div>
        </h1>

        {/* Sub */}
        <motion.p
          className="mt-6 sm:mt-8 text-[#F5E6D0]/45 text-sm lg:text-[0.92rem] leading-[1.85] max-w-[280px] sm:max-w-[320px]"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          We don't run campaigns.{" "}
          <span className="text-[#F5E6D0]/80 font-medium">We build content ecosystems.</span>
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-8 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <div className="relative overflow-hidden" style={{ width: "1px", height: "36px", background: "rgba(245,230,208,0.10)" }}>
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{ height: "14px", background: "linear-gradient(to bottom, #4E8CC4, transparent)" }}
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
            />
          </div>
          <span className="text-[#F5E6D0]/22 font-semibold" style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Scroll
          </span>
        </motion.div>
      </div>

      {/* ── Achievement tape ── */}
      <motion.div
        className="relative z-20 border-y border-[#F5E6D0]/[0.06] py-2.5 overflow-hidden bg-[#C9A84C]/[0.04]"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {Array(4).fill([
            "750+ CHANNELS", "·", "4.8B MONTHLY VIEWS", "·", "35+ ORIGINAL IPs",
            "·", "29+ OTT SHOWS", "·", "YOUTUBE ENTERPRISE PARTNER", "·",
            "70,000 VIDEOS / MONTH", "·", "SOUTH INDIA'S #1 CONTENT NETWORK", "·",
          ]).flat().map((item, i) => (
            <span key={i} className={`mx-6 font-display text-[10px] tracking-[0.35em] ${item === "·" ? "text-[#C9A84C]" : "text-[#F5E6D0]/25"}`}>
              {item}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
