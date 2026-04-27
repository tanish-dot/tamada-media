"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "తమడా", "ಟಮಡಾ", "TAMADA", "தமடா",
  "తమడా", "ಟಮಡಾ", "TAMADA", "தமடா",
];

// Cards live in two columns inside the right panel.
// depth controls how much each card shifts on mouse move.
const STAT_CARDS = [
  { id: 1, value: "4.8B+",  label: "Monthly Views",  sub: "YouTube Enterprise Partner", depth: 0.16, slot: "hero-card-1" },
  { id: 2, value: "750+",   label: "Channels",        sub: "Multi-Channel Network",      depth: 0.08, slot: "hero-card-2" },
  { id: 3, value: "35+",    label: "Original IPs",    sub: "Wirally · YINT · Rowdy Baby", depth: 0.12, slot: "hero-card-3" },
  { id: 4, value: "29+",    label: "OTT Shows",       sub: "Aha · Hotstar · Prime",       depth: 0.06, slot: "hero-card-4" },
];

const BOTTOM_STATS = [
  { v: "750+",  l: "Channels" },
  { v: "4.8B+", l: "Monthly Views" },
  { v: "70K",   l: "Videos / Month" },
  { v: "35+",   l: "Original IPs" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready,   setReady]   = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 22, mass: 1.2 });
  const smoothY = useSpring(rawY, { stiffness: 40, damping: 22, mass: 1.2 });

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setReady(true), 60);
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      rawX.set((e.clientX - left - width  / 2) * 0.025);
      rawY.set((e.clientY - top  - height / 2) * 0.025);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("mousemove", onMove); };
  }, [rawX, rawY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#080808] flex flex-col overflow-hidden lg:max-h-screen"
    >
      {/* ── Background layers ── */}
      <Atmosphere smoothX={smoothX} smoothY={smoothY} />

      {/* ── Giant watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display text-[#F5E6D0] select-none"
          style={{
            fontSize: "clamp(8rem, 28vw, 36rem)",
            opacity: 0.018,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          TAMADA
        </span>
      </div>

      {/* ── Film grain ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* ── Vertical edge label (left) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-[15] hidden lg:flex flex-col items-center justify-center gap-3"
        style={{ width: "28px" }}
      >
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#F5E6D0]/10 to-transparent max-h-32" />
        <span
          className="text-[#F5E6D0]/20 font-semibold"
          style={{
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Hyderabad · Est 2010
        </span>
        <div className="w-px flex-1 bg-gradient-to-b from-[#F5E6D0]/10 via-[#F5E6D0]/10 to-transparent max-h-32" />
      </div>

      {/* ── Nav clearance + top ticker ── */}
      <div className="relative z-10 pt-[4.5rem] lg:pt-[5rem]">
        <div className="border-b border-[#F5E6D0]/[0.07] py-2.5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker-reverse">
            {Array(6).fill(TICKER_ITEMS).flat().map((t, i) => (
              <span key={i} className="font-display text-[11px] tracking-[0.3em] text-[#F5E6D0]/[0.16] mx-7">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: headline left | cards right ── */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row">

        {/* LEFT — headline + subtext */}
        <div style={{ marginLeft: "20px" }} className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:pl-[8vw] xl:pl-[10vw] lg:pr-8 pt-20 pb-10 lg:py-0 lg:max-w-[62%]">

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2.5 mb-7" style={{ marginTop: "50px" }}
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block w-5 h-px bg-[#B91C1C]" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/40 font-semibold">
              South India's Largest Content Ecosystem
            </span>
          </motion.div>

          {/* Headline */}
          <Headline ready={ready} smoothX={smoothX} smoothY={smoothY} />

          {/* Subtext */}
          <motion.p
            className="mt-8 text-[#F5E6D0]/45 text-sm lg:text-[0.92rem] leading-[1.85] max-w-[280px]"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            We don't run campaigns.{" "}
            <span className="text-[#F5E6D0]/80 font-medium">
              We build content ecosystems.
            </span>
          </motion.p>

          {/* Scroll cue */}
          <ScrollCue ready={ready} />
        </div>

        {/* Center divider */}
        <div className="hidden lg:flex flex-col items-center justify-center w-px self-stretch my-16 relative">
          <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#F5E6D0]/10 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] my-3 shrink-0" />
          <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#F5E6D0]/10 to-transparent" />
        </div>

        {/* RIGHT — stat cards + platform strip */}
        <div style={{ paddingLeft: "60px", paddingRight: "20px", marginRight: "40px" }} className="hidden lg:flex flex-col w-[42%] xl:w-[40%] shrink-0 items-center justify-center gap-8">
          {mounted && (
            <StatCardsPanel cards={STAT_CARDS} smoothX={smoothX} smoothY={smoothY} ready={ready} />
          )}

          {/* Platform strip */}
          <motion.div
            className="w-full flex flex-col gap-3 pl-2"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[8px] tracking-[0.45em] uppercase text-[#F5E6D0]/20">Distributed On</span>
            <div className="flex items-center gap-4 flex-wrap">
              {["YouTube", "Aha", "Hotstar", "Prime Video", "ZEE5", "SonyLIV"].map((p) => (
                <span key={p} className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#F5E6D0]/30 hover:text-[#F5E6D0]/60 transition-colors duration-300 cursor-default">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cycling IP */}
          <motion.div
            className="w-full flex items-center gap-3 pl-2"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <span className="text-[8px] tracking-[0.45em] uppercase text-[#F5E6D0]/20">Original IP</span>
            <CyclingIPs ready={ready} />
          </motion.div>
        </div>
      </div>

      {/* ── Mid achievement tape ── */}
      <motion.div
        className="relative z-20 border-y border-[#F5E6D0]/[0.06] py-2.5 overflow-hidden bg-[#B91C1C]/[0.04]"
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
            <span
              key={i}
              className={`mx-6 font-display text-[10px] tracking-[0.35em] ${item === "·" ? "text-[#B91C1C]" : "text-[#F5E6D0]/25"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        className="relative z-20 border-t border-[#F5E6D0]/[0.08]"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        <div style={{ marginLeft: "20px" }} className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#F5E6D0]/[0.07]">
          {BOTTOM_STATS.map((s, i) => (
            <motion.div
              key={i}
              className="group relative px-6 lg:px-8 py-5 overflow-hidden cursor-default"
              whileHover={{ backgroundColor: "rgba(185,28,28,0.05)" }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B91C1C] origin-bottom"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <p className="font-display text-[1.7rem] lg:text-[2rem] text-[#F5E6D0] leading-none">{s.v}</p>
              <p className="text-[9px] text-[#F5E6D0]/30 tracking-[0.3em] uppercase mt-1.5">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom ticker ── */}
      <div className="relative z-10 border-t border-[#F5E6D0]/[0.07] py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {Array(6).fill(TICKER_ITEMS).flat().map((t, i) => (
            <span key={i} className="font-display text-[11px] tracking-[0.3em] text-[#F5E6D0]/[0.10] mx-7">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Atmosphere ───────────────────────────────────────────────────────────────

function Atmosphere({ smoothX, smoothY }: { smoothX: MotionValue<number>; smoothY: MotionValue<number> }) {
  const glowX = useTransform(smoothX, v => v * -0.08);
  const glowY = useTransform(smoothY, v => v * -0.08);
  const gridX = useTransform(smoothX, v => v * -0.20);
  const gridY = useTransform(smoothY, v => v * -0.20);

  return (
    <div className="absolute inset-0 z-[1]">
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Crimson glow — bottom left */}
      <motion.div className="absolute inset-0" style={{ x: glowX, y: glowY, scale: 1.1 }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 55% 45% at 15% 100%, rgba(185,28,28,0.16) 0%, transparent 70%)",
        }} />
        {/* Top right shadow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 55% 50% at 95% 0%, rgba(0,0,0,0.55) 0%, transparent 65%)",
        }} />
      </motion.div>

      {/* Dot grid */}
      <motion.div className="absolute inset-0 opacity-[0.025]" style={{ x: gridX, y: gridY, scale: 1.12 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(rgba(245,230,208,0.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
      </motion.div>

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
      }} />

      {/* Cinematic horizontal rule */}
      <div className="absolute left-0 right-0 h-px opacity-[0.05]" style={{
        top: "38%",
        background: "linear-gradient(90deg, transparent 0%, rgba(245,230,208,0.7) 30%, rgba(245,230,208,0.7) 70%, transparent 100%)",
      }} />
    </div>
  );
}

// ─── Headline ─────────────────────────────────────────────────────────────────
// Constrained to the left content column.
// Font sizes tuned so "YOUR THUMB" never bleeds into the right cards panel.

function Headline({ ready, smoothX, smoothY }: {
  ready: boolean;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const hx = useTransform(smoothX, v => v * 0.022);
  const hy = useTransform(smoothY, v => v * 0.022);

  return (
    <motion.h1 className="font-display leading-none" style={{ x: hx, y: hy }} aria-label="Your Thumb Stops Here">

      {/* YOUR THUMB — large anchor line */}
      <div className="overflow-hidden">
        <motion.span
          className="block text-[#F5E6D0]"
          // Max capped so it stays inside the left column (~58% of viewport)
          style={{ fontSize: "clamp(3rem, 9.5vw, 11.5rem)", lineHeight: 0.92 }}
          initial={{ y: "106%", skewY: 1.5 }}
          animate={ready ? { y: "0%", skewY: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          YOUR THUMB
        </motion.span>
      </div>

      {/* STOPS — visual breath, recedes in hierarchy */}
      <div className="overflow-hidden mt-0.5">
        <motion.span
          className="block text-[#F5E6D0]/28 tracking-wide"
          style={{ fontSize: "clamp(1.8rem, 6.5vw, 8rem)", lineHeight: 0.95 }}
          initial={{ y: "106%", skewY: 1.5 }}
          animate={ready ? { y: "0%", skewY: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          STOPS
        </motion.span>
      </div>

      {/* HERE. — the payoff, largest element */}
      <div className="overflow-hidden">
        <motion.span
          className="block text-[#F5E6D0]"
          style={{ fontSize: "clamp(4rem, 13vw, 16rem)", lineHeight: 0.88 }}
          initial={{ y: "106%", skewY: 1.5 }}
          animate={ready ? { y: "0%", skewY: 0 } : {}}
          transition={{ duration: 1.05, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
        >
          HERE<span className="text-[#B91C1C]">.</span>
        </motion.span>
      </div>
    </motion.h1>
  );
}

// ─── Stat Cards Panel ─────────────────────────────────────────────────────────
// 2×2 grid with proper visual structure and depth parallax.
// Each card has a visible border, solid dark background, and readable typography.

function StatCardsPanel({ cards, smoothX, smoothY, ready }: {
  cards: typeof STAT_CARDS;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  ready: boolean;
}) {
  const rotateY = useTransform(smoothX, v => v * 0.12);
  const rotateX = useTransform(smoothY, v => v * -0.10);

  return (
    <div style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }} className="w-full">
      <motion.div
        className="grid grid-cols-2 gap-3 xl:gap-4"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {cards.map((card, i) => (
          <StatCard
            key={card.id}
            card={card}
            index={i}
            ready={ready}
          />
        ))}
      </motion.div>
    </div>
  );
}

function StatCard({ card, index, ready }: {
  card: typeof STAT_CARDS[0];
  index: number;
  ready: boolean;
}) {
  const dn   = (card.depth - 0.06) / (0.16 - 0.06);
  const tz   = 20 + dn * 55;
  const opac = 0.5 + dn * 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={ready ? { opacity: opac, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.9 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d", translateZ: tz }}
      data-slot={card.slot}
    >
      <motion.div
        animate={{ y: [0, -(5 + index * 2.5), 0] }}
        transition={{ duration: 4 + index * 1.1, repeat: Infinity, ease: "easeInOut", delay: index * 0.9 }}
      >
        <motion.div
          className="relative overflow-hidden group cursor-default"
          style={{
            background: `rgba(${12 + dn * 8}, ${12 + dn * 8}, ${12 + dn * 8}, 0.92)`,
            border: `1px solid rgba(245,230,208,${0.08 + dn * 0.12})`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: `0 ${16 + dn * 24}px ${40 + dn * 40}px rgba(0,0,0,${0.5 + dn * 0.25}), 0 1px 0 rgba(245,230,208,0.06) inset`,
            padding: "22px 24px",
          }}
          whileHover={{
            borderColor: "rgba(185,28,28,0.5)",
            boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(185,28,28,0.2), 0 0 30px rgba(185,28,28,0.08)`,
            transition: { duration: 0.2 },
          }}
        >
          {/* Red corner bracket */}
          <span className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#B91C1C] opacity-60" />
          <span className="absolute top-0 left-0 h-4 w-[1.5px] bg-[#B91C1C] opacity-60" />

          {/* Bottom-right depth indicator dot */}
          <span
            className="absolute bottom-2.5 right-2.5 rounded-full"
            style={{
              width: 4 + dn * 3,
              height: 4 + dn * 3,
              background: `rgba(185,28,28,${0.3 + dn * 0.4})`,
            }}
          />

          <p className="font-display text-[#F5E6D0] leading-none" style={{ fontSize: "clamp(1.8rem, 2.8vw, 3rem)" }}>
            {card.value}
          </p>
          <p className="text-[#F5E6D0]/70 font-semibold mt-2 leading-none" style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {card.label}
          </p>
          <p className="text-[#F5E6D0]/30 mt-2 leading-snug" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
            {card.sub}
          </p>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(185,28,28,0.08) 0%, transparent 55%)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Watch Reel Button ────────────────────────────────────────────────────────

function WatchReelButton({ ready }: { ready: boolean }) {
  return (
    <motion.button
      className="group flex items-center gap-3 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.6 }}
      aria-label="Watch showreel"
    >
      {/* Animated ring + play icon */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(245,230,208,0.12)" strokeWidth="1" />
          <motion.circle
            cx="20" cy="20" r="18"
            fill="none" stroke="#B91C1C" strokeWidth="1"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={`${2 * Math.PI * 18 * 0.75}`}
            strokeLinecap="round"
            animate={{ strokeDashoffset: [2 * Math.PI * 18 * 0.75, 0, 2 * Math.PI * 18 * 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="relative z-10 translate-x-0.5">
          <path d="M0 0L10 6L0 12V0Z" fill="rgba(245,230,208,0.7)" />
        </svg>
      </div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5E6D0]/40 group-hover:text-[#F5E6D0]/70 transition-colors duration-300 font-semibold">
        Watch Reel
      </span>
    </motion.button>
  );
}

// ─── Cycling IPs ──────────────────────────────────────────────────────────────

const IP_NAMES = ["Wirally", "YINT", "Rowdy Baby", "Tamada Food", "Chai Bisket"];

function CyclingIPs({ ready }: { ready: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => setIndex(i => (i + 1) % IP_NAMES.length), 2200);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="relative h-5 overflow-hidden" style={{ width: "130px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute inset-0 flex items-center font-display text-[13px] tracking-[0.2em] uppercase text-[#B91C1C]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {IP_NAMES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Scroll Cue ───────────────────────────────────────────────────────────────

function ScrollCue({ ready }: { ready: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 mt-12"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ delay: 1.6, duration: 0.7 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: "1px", height: "36px", background: "rgba(245,230,208,0.10)" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0"
          style={{ height: "14px", background: "linear-gradient(to bottom, #B91C1C, transparent)" }}
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
        />
      </div>
      <span
        className="text-[#F5E6D0]/22 font-semibold"
        style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase" }}
      >
        Scroll
      </span>
    </motion.div>
  );
}
