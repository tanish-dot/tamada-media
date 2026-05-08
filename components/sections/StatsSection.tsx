"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const YOUTUBE_STATS = [
  { value: "4.8B+",  label: "Monthly Views" },
  { value: "280M+",  label: "Subscribers" },
  { value: "750+",   label: "Channels" },
  { value: "70,000", label: "Videos / Month" },
];

const META_STATS = [
  { value: "500M+", label: "Monthly Reach" },
  { value: "150M+", label: "Followers" },
  { value: "1B+",   label: "Monthly Impressions" },
  { value: "10K+",  label: "Posts / Month" },
];

// ── 3D tilt card ──────────────────────────────────────────────────────────────
function StatCard({
  stat, color, delay, inView,
}: {
  stat: { value: string; label: string };
  color: string;
  delay: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX   = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });
  const glowY   = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: ENTRANCE_EASE }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(14,14,14,0.95)",
          border: `1px solid rgba(245,230,208,0.08)`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(245,230,208,0.05) inset`,
        }}
        whileHover={{
          borderColor: `${color}55`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.75), 0 0 40px ${color}18, 0 1px 0 rgba(245,230,208,0.08) inset`,
          transition: { duration: 0.2 },
        }}
        className="relative overflow-hidden px-5 lg:px-14 py-8 lg:py-16 cursor-default"
      >
        {/* Moving specular highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${color}14 0%, transparent 60%)`
            ),
          }}
        />

        {/* Corner accent */}
        <span className="absolute top-0 left-0 w-5 h-[2px]" style={{ background: color }} />
        <span className="absolute top-0 left-0 h-5 w-[2px]" style={{ background: color }} />

        {/* Floating z-depth layer for the number */}
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          <p className="font-display text-[clamp(3rem,5vw,6rem)] leading-none text-[#F5E6D0]">
            {stat.value}
          </p>
          <p className="text-[10px] text-[#F5E6D0]/35 tracking-[0.28em] uppercase mt-4 font-medium">
            {stat.label}
          </p>
        </div>

        {/* Bottom glow line */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)`, scaleX: 0 }}
          whileHover={{ scaleX: 1, transition: { duration: 0.5, ease: ENTRANCE_EASE } }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Platform block ─────────────────────────────────────────────────────────────
function PlatformBlock({
  platform, color, badge, stats, inView, delay = 0,
}: {
  platform: string;
  color: string;
  badge: string;
  stats: { value: string; label: string }[];
  inView: boolean;
  delay?: number;
}) {
  return (
    <div className="flex-1">
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: ENTRANCE_EASE }}
      >
        <span className="block w-7 h-[3px] rounded-full" style={{ background: color }} />
        <span className="font-display text-[clamp(1.6rem,3vw,3rem)] text-[#F5E6D0] leading-none">
          {platform}
        </span>
        <span
          className="text-[9px] tracking-[0.3em] uppercase font-bold px-2.5 py-1 rounded-sm"
          style={{ color, border: `1px solid ${color}40`, background: `${color}0d` }}
        >
          {badge}
        </span>
      </motion.div>

      {/* Desktop: 2x2 tilt cards */}
      <div className="hidden sm:grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            stat={stat}
            color={color}
            inView={inView}
            delay={delay + 0.12 + i * 0.09}
          />
        ))}
      </div>

      {/* Mobile: compact horizontal stat row */}
      <div className="sm:hidden grid grid-cols-2 gap-3">
        {stats.map((stat, si) => (
          <motion.div
            key={si}
            className="py-4 px-4 relative"
            style={{
              background: "rgba(14,14,14,0.95)",
              border: `1px solid rgba(245,230,208,0.07)`,
              borderTop: `2px solid ${color}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.1 + si * 0.07, ease: ENTRANCE_EASE }}
          >
            <p className="font-display text-[clamp(1.6rem,7vw,2.2rem)] leading-none text-[#F5E6D0]">{stat.value}</p>
            <p className="text-[8px] text-[#F5E6D0]/30 tracking-[0.22em] uppercase mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#080808] text-[#F5E6D0] overflow-hidden relative">
      {/* Perspective grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(245,230,208,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,230,208,0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div ref={ref} className="section-padding relative z-10">
        <motion.p
          className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/30 mb-14 font-bold"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ENTRANCE_EASE }}
        >
          Platform Partnerships
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          <PlatformBlock
            platform="YouTube"
            color="#FF0000"
            badge="Enterprise Partner"
            stats={YOUTUBE_STATS}
            inView={inView}
            delay={0.1}
          />
          <div className="hidden lg:block w-px self-stretch bg-[#F5E6D0]/[0.06]" />
          <PlatformBlock
            platform="Meta"
            color="#0866FF"
            badge="Creator Network"
            stats={META_STATS}
            inView={inView}
            delay={0.3}
          />
        </div>

        <motion.p
          className="mt-14 text-[#F5E6D0]/20 text-sm italic tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          1 of 12 YouTube Enterprise Partners in India
        </motion.p>
      </div>
    </section>
  );
}
