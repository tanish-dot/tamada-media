"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ── Data ───────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    num: "4.8B+",
    label: "MONTHLY VIEWS",
    sub: "Every thumb we stop. Every view we earn. Zero shortcuts.",
    eyebrow: "01 — THE REACH",
    glowX: "-15%",
    glowY: "50%",
  },
  {
    num: "750+",
    label: "CHANNELS",
    sub: "South India's largest managed creator ecosystem. Not just numbers — infrastructure.",
    eyebrow: "02 — THE NETWORK",
    glowX: "70%",
    glowY: "20%",
  },
  {
    num: "70K",
    label: "VIDEOS / MONTH",
    sub: "Scripts. Shoots. Post-production. All in-house. No outsourcing. Ever.",
    eyebrow: "03 — THE MACHINE",
    glowX: "80%",
    glowY: "70%",
  },
  {
    num: "35+",
    label: "ORIGINAL IPs",
    sub: "Wirally. YINT. Rowdy Baby. Content built to compound over years, not campaigns.",
    eyebrow: "04 — THE LEGACY",
    glowX: "20%",
    glowY: "80%",
  },
] as const;

const N = CHAPTERS.length;

// ── Chapter ────────────────────────────────────────────────────────────────────

function Chapter({
  chapter,
  index,
  progress,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const enter = start + 0.04;
  const exit = end - 0.04;
  const mid = (start + end) / 2;
  const isFirst = index === 0;

  // Opacity: chapter 0 starts visible, rest fade in/out
  const opacity = useTransform(
    progress,
    isFirst ? [0, 0.005, exit, end] : [start, enter, exit, end],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  // Number: scales up to 1.1 at midpoint, shrinks on exit
  const numScale = useTransform(
    progress,
    [start, enter, mid, exit, end],
    isFirst ? [1, 1, 1.1, 1.04, 0.86] : [0.76, 1, 1.1, 1.04, 0.86]
  );

  // Number Y: enters from below, exits upward
  const numY = useTransform(
    progress,
    [start, enter, exit, end],
    isFirst ? ["0%", "0%", "-5%", "-16%"] : ["16%", "0%", "-5%", "-16%"]
  );

  // Sub content: slightly delayed vs number
  const subOpacity = useTransform(
    progress,
    isFirst ? [0, 0.015, exit, end] : [enter, enter + 0.028, exit, end],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const subY = useTransform(
    progress,
    [start, enter + 0.02, exit, end],
    isFirst ? ["0%", "0%", "-8%", "-22%"] : ["22%", "0%", "-8%", "-22%"]
  );

  // Red accent line: expands within the chapter, shrinks on exit
  const lineScale = useTransform(
    progress,
    [start, mid * 0.8 + start * 0.2, exit, end],
    isFirst ? [1, 1, 0.5, 0] : [0, 1, 0.5, 0]
  );

  // Glow opacity: breathes at midpoint
  const glowOpacity = useTransform(
    progress,
    [start, mid, end],
    [0.25, 1.0, 0.25]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity }}
    >
      {/* Atmospheric glow — unique position per chapter */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: chapter.glowX,
          top: chapter.glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
          opacity: glowOpacity,
        }}
      />

      <div className="section-padding relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] tracking-[0.42em] uppercase font-bold text-[#F5E6D0]/20 mb-6 lg:mb-8"
          style={{ opacity: subOpacity, y: subY }}
        >
          {chapter.eyebrow}
        </motion.p>

        {/* Giant number */}
        <motion.p
          className="font-display text-[#F5E6D0] tabular-nums"
          style={{
            fontSize: "clamp(5rem, 21vw, 27rem)",
            lineHeight: 0.87,
            scale: numScale,
            y: numY,
            transformOrigin: "left center",
          }}
        >
          {chapter.num}
        </motion.p>

        {/* Red divider line — scroll-scrubbed width */}
        <motion.div
          className="bg-[#C9A84C] origin-left"
          style={{
            height: "2px",
            width: "clamp(60px, 8vw, 120px)",
            scaleX: lineScale,
            marginTop: "clamp(12px, 2vw, 20px)",
            marginBottom: "clamp(8px, 1.5vw, 16px)",
          }}
        />

        {/* Label */}
        <motion.p
          className="font-display tracking-[0.15em] uppercase text-[#C9A84C]"
          style={{
            fontSize: "clamp(0.85rem, 2.3vw, 2.8rem)",
            y: numY,
            opacity: subOpacity,
          }}
        >
          {chapter.label}
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="text-[#F5E6D0]/35 text-base lg:text-xl leading-[1.85] max-w-lg mt-8 lg:mt-12"
          style={{ opacity: subOpacity, y: subY }}
        >
          {chapter.sub}
        </motion.p>
      </div>

      {/* Ghost chapter index — bottom right */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-0 overflow-hidden pointer-events-none section-padding pb-4"
        style={{ opacity: subOpacity }}
      >
        <span
          className="font-display select-none"
          style={{
            fontSize: "clamp(7rem, 17vw, 24rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,230,208,0.04)",
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Side dot ───────────────────────────────────────────────────────────────────

function Dot({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const mid = (start + end) / 2;
  const isFirst = index === 0;

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, 0.01, end - 0.02, end]
      : [start, start + 0.02, end - 0.02, end],
    isFirst ? [1, 1, 1, 0.2] : [0.2, 1, 1, 0.2]
  );

  // Height pulses at midpoint
  const heightPx = useTransform(
    progress,
    [start, mid, end],
    isFirst ? [20, 40, 20] : [12, 40, 12]
  );

  return (
    <motion.div
      className="rounded-full bg-[#F5E6D0]"
      style={{ width: "1.5px", height: heightPx, opacity }}
    />
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const barScaleX = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen bg-[#080808] overflow-hidden">

        {/* Film grain */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px",
          }}
        />

        {/* Chapter layers stacked */}
        {CHAPTERS.map((ch, i) => (
          <Chapter key={i} chapter={ch} index={i} progress={smooth} />
        ))}

        {/* Right side chapter progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-3 hidden lg:flex">
          {CHAPTERS.map((_, i) => (
            <Dot key={i} index={i} progress={smooth} />
          ))}
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F5E6D0]/[0.06] z-20">
          <motion.div
            className="h-full bg-[#C9A84C] origin-left"
            style={{ scaleX: barScaleX }}
          />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
          <div
            className="relative overflow-hidden"
            style={{ width: "1px", height: "32px", background: "rgba(245,230,208,0.08)" }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "12px",
                background: "linear-gradient(to bottom, #C9A84C, transparent)",
              }}
              animate={{ y: ["-100%", "360%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
