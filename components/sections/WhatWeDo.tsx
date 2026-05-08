"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SERVICES_LIST } from "@/data/content";

const EXTRA = [
  { id: "mcn",     title: "Multi-Channel Network", tagline: "750+ channels. South India's largest.", desc: "We build, manage, and grow creator networks at scale. Infrastructure, strategy, and distribution — all in-house.", stat: "750+ channels" },
  { id: "creator", title: "Creator Growth",         tagline: "From zero to audience.",               desc: "Platform intelligence, production support, and strategy to turn creators into compounding media brands.",        stat: "3000+ creators" },
];

const ALL = [...SERVICES_LIST, ...EXTRA];

const EASE = [0.16, 1, 0.3, 1] as const;

// Wheel geometry
const BOX    = 560;
const CX     = BOX / 2;
const CY     = BOX / 2;
const ORBIT  = 228; // radius: center → number label
const INNER  = 118; // inner circle radius
const TICK_R = 132; // where tick marks sit on circle edge

function angle(i: number) {
  return (i / ALL.length) * 2 * Math.PI - Math.PI / 2;
}
function pt(r: number, i: number) {
  return { x: CX + Math.cos(angle(i)) * r, y: CY + Math.sin(angle(i)) * r };
}

export default function WhatWeDo() {
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setActive(prev => (prev === null ? 0 : (prev + 1) % ALL.length));
    }, 2500);
    return () => clearInterval(id);
  }, [paused, inView]);

  const svc = active !== null ? ALL[active] : null;

  return (
    <section ref={ref} className="bg-[#080808] border-t border-[#F5E6D0]/[0.06] overflow-hidden">
      <div className="section-padding">

        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="block w-6 h-px bg-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">So… what do we do?</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.8rem,5.5vw,7rem)] leading-[0.88] text-[#F5E6D0]"
              initial={{ y: "106%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
            >
              ALL OF THE <span className="text-[#C9A84C]">ABOVE.</span>
            </motion.h2>
          </div>
        </div>

        {/* ── Wheel (desktop) + List (mobile) ── */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-12 lg:gap-20">

          {/* Wheel */}
          <motion.div
            className="relative shrink-0 hidden lg:block"
            style={{ width: BOX, height: BOX }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          >
            {/* SVG: outer ring + tick marks + spoke lines */}
            <svg
              width={BOX}
              height={BOX}
              viewBox={`0 0 ${BOX} ${BOX}`}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Outer dashed orbit ring */}
              <circle
                cx={CX} cy={CY} r={ORBIT - 18}
                fill="none"
                stroke="rgba(245,230,208,0.05)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />

              {/* Inner circle */}
              <circle
                cx={CX} cy={CY} r={INNER}
                fill="rgba(14,14,14,0.95)"
                stroke="rgba(245,230,208,0.08)"
                strokeWidth="1"
              />

              {/* Active: colored inner circle fill */}
              {active !== null && (
                <circle
                  cx={CX} cy={CY} r={INNER}
                  fill="rgba(201,168,76,0.06)"
                  stroke="rgba(201,168,76,0.35)"
                  strokeWidth="1"
                />
              )}

              {/* Spoke lines: circle edge → orbit point */}
              {ALL.map((_, i) => {
                const inner = pt(TICK_R + 2, i);
                const outer = pt(ORBIT - 36, i);
                const isActive = active === i;
                return (
                  <line
                    key={i}
                    x1={inner.x} y1={inner.y}
                    x2={outer.x} y2={outer.y}
                    stroke={isActive ? "rgba(201,168,76,0.6)" : "rgba(245,230,208,0.07)"}
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                );
              })}

              {/* Tick marks on inner circle */}
              {ALL.map((_, i) => {
                const p = pt(TICK_R, i);
                const isActive = active === i;
                return (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={isActive ? 3 : 2}
                    fill={isActive ? "#C9A84C" : "rgba(245,230,208,0.25)"}
                    style={{ transition: "fill 0.3s, r 0.3s" }}
                  />
                );
              })}
            </svg>

            {/* Number labels around orbit */}
            {ALL.map((svc, i) => {
              const p = pt(ORBIT, i);
              const isActive = active === i;
              return (
                <button
                  key={svc.id}
                  className="absolute flex flex-col items-center gap-1 cursor-pointer group"
                  style={{
                    left: p.x,
                    top:  p.y,
                    transform: "translate(-50%, -50%)",
                    width: "56px",
                  }}
                  onMouseEnter={() => { setPaused(true); setActive(i); }}
                  onMouseLeave={() => setPaused(false)}
                  aria-label={svc.title}
                >
                  <span
                    className="font-display leading-none transition-colors duration-300"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.25em",
                      color: isActive ? "#C9A84C" : "rgba(245,230,208,0.35)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-center leading-tight transition-all duration-300"
                    style={{
                      fontSize: "clamp(0.6rem, 0.85vw, 0.75rem)",
                      letterSpacing: "0.05em",
                      color: isActive ? "#F5E6D0" : "rgba(245,230,208,0.22)",
                      maxWidth: "56px",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.title}
                  </span>
                </button>
              );
            })}

            {/* Center content */}
            <div
              className="absolute pointer-events-none flex flex-col items-center justify-center text-center px-6"
              style={{
                left: CX - INNER,
                top:  CY - INNER,
                width:  INNER * 2,
                height: INNER * 2,
              }}
            >
              <AnimatePresence mode="wait">
                {svc ? (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-[8px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold">{svc.stat}</p>
                    <h3
                      className="font-display text-[#F5E6D0] leading-tight"
                      style={{ fontSize: "clamp(0.75rem,1.2vw,1rem)" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-[#F5E6D0]/40 leading-snug" style={{ fontSize: "0.6rem" }}>
                      {svc.tagline}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="font-display text-[#F5E6D0]/15 leading-none" style={{ fontSize: "2.2rem" }}>
                      {ALL.length}
                    </span>
                    <span className="text-[#F5E6D0]/20 font-display" style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}>
                      SERVICES
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: active service detail (desktop) / full list (mobile) */}
          <div className="flex-1 w-full">

            {/* Desktop: detail panel */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                {svc ? (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9A84C] font-bold mb-4">
                      {String((active ?? 0) + 1).padStart(2, "0")} / {String(ALL.length).padStart(2, "0")}
                    </p>
                    <h3
                      className="font-display text-[#F5E6D0] leading-tight mb-4"
                      style={{ fontSize: "clamp(2rem,3.5vw,4rem)" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold mb-6">
                      {svc.tagline}
                    </p>
                    <p className="text-[#F5E6D0]/55 text-base leading-[1.85] mb-8 max-w-md">
                      {svc.desc}
                    </p>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-5 h-px bg-[#C9A84C]" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5E6D0]/35 font-medium">
                        {svc.stat}
                      </span>
                    </div>
                    <a
                      href={`mailto:info@tamadamedia.com?subject=Inquiry about ${encodeURIComponent(svc.title)}`}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#F5E6D0] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#F5E6D0] hover:text-[#C9A84C] transition-all duration-300 group"
                    >
                      Let&apos;s Talk
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[#F5E6D0]/20 text-sm leading-[2] max-w-sm">
                      Hover any number to pause and explore.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: interactive panel + tappable list */}
            <div className="lg:hidden w-full">

              {/* Active service detail card */}
              <div className="relative border border-[#F5E6D0]/[0.08] mb-6 overflow-hidden"
                style={{ background: "rgba(14,14,14,0.95)" }}>
                {/* Gold corner accents */}
                <span className="absolute top-0 left-0 w-6 h-[2px] bg-[#C9A84C]" />
                <span className="absolute top-0 left-0 h-6 w-[2px] bg-[#C9A84C]" />
                <span className="absolute bottom-0 right-0 w-6 h-[2px] bg-[#C9A84C]" />
                <span className="absolute bottom-0 right-0 h-6 w-[2px] bg-[#C9A84C]" />

                <AnimatePresence mode="wait">
                  {svc ? (
                    <motion.div
                      key={active}
                      className="p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9A84C] font-bold mb-4">
                        {String((active ?? 0) + 1).padStart(2, "0")} / {String(ALL.length).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-[#F5E6D0] leading-tight mb-3"
                        style={{ fontSize: "clamp(1.6rem,6vw,2.4rem)" }}>
                        {svc.title}
                      </h3>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold mb-4">
                        {svc.tagline}
                      </p>
                      <p className="text-[#F5E6D0]/55 text-sm leading-[1.85] mb-5">{svc.desc}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-4 h-px bg-[#C9A84C]" />
                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F5E6D0]/30">{svc.stat}</span>
                      </div>
                      <a
                        href={`mailto:info@tamadamedia.com?subject=Inquiry about ${encodeURIComponent(svc.title)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#F5E6D0] text-[9px] font-bold tracking-[0.2em] uppercase"
                      >
                        Let&apos;s Talk
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" className="p-6 flex items-center justify-center h-40"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[#F5E6D0]/20 text-sm text-center">Tap a service below to explore</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tappable service index */}
              <div className="flex flex-col divide-y divide-[#F5E6D0]/[0.06]">
                {ALL.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <motion.button
                      key={s.id}
                      className="w-full flex items-center gap-4 py-3.5 text-left group"
                      onClick={() => { setPaused(true); setActive(i); setTimeout(() => setPaused(false), 4000); }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }}
                    >
                      <span className="font-display text-[10px] tracking-[0.35em] shrink-0"
                        style={{ color: isActive ? "#C9A84C" : "rgba(245,230,208,0.25)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display flex-1 leading-tight transition-colors duration-200"
                        style={{
                          fontSize: "clamp(0.9rem,3.5vw,1.1rem)",
                          color: isActive ? "#F5E6D0" : "rgba(245,230,208,0.45)",
                        }}>
                        {s.title}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
