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

// ── Desktop wheel geometry ─────────────────────────────────────────────────────
const BOX    = 560;
const CX     = BOX / 2;
const CY     = BOX / 2;
const ORBIT  = 228;
const INNER  = 118;
const TICK_R = 132;

function angle(i: number) {
  return (i / ALL.length) * 2 * Math.PI - Math.PI / 2;
}
function pt(r: number, i: number) {
  return { x: CX + Math.cos(angle(i)) * r, y: CY + Math.sin(angle(i)) * r };
}

// ── Mobile wheel geometry ─────────────────────────────────────────────────────
const M_BOX   = 280;
const M_CX    = M_BOX / 2;
const M_CY    = M_BOX / 2;
const M_ORBIT = 108;
const M_INNER = 52;
const M_TICK  = 62;

function MobileWheel({
  active,
  setActive,
  setPaused,
  inView,
}: {
  active: number | null;
  setActive: (i: number) => void;
  setPaused: (v: boolean) => void;
  inView: boolean;
}) {
  const N   = ALL.length;
  const DEG = 360 / N;

  // Use a ref for the actual angle (avoids stale closures in RAF)
  const angleRef    = useRef(0);
  const [renderAngle, setRenderAngle] = useState(0);

  const dragging    = useRef(false);
  const startX      = useRef(0);
  const startAngle  = useRef(0);
  const animRef     = useRef(0);

  function setAngle(a: number) {
    angleRef.current = a;
    setRenderAngle(a);
  }

  function rotToIndex(rot: number) {
    let idx = Math.round(-rot / DEG) % N;
    if (idx < 0) idx += N;
    return idx;
  }

  function snapDest(idx: number, from: number) {
    const target = -idx * DEG;
    let diff = target - from;
    diff = ((diff % 360) + 540) % 360 - 180;
    return from + diff;
  }

  function animateTo(destination: number, duration = 320, onDone?: () => void) {
    cancelAnimationFrame(animRef.current);
    const from = angleRef.current;
    let t0 = 0;
    const run = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = 1 - (1 - p) ** 3; // ease-out-cubic
      setAngle(from + (destination - from) * e);
      if (p < 1) animRef.current = requestAnimationFrame(run);
      else onDone?.();
    };
    animRef.current = requestAnimationFrame(run);
  }

  // Sync wheel when active changes from outside (auto-cycle)
  useEffect(() => {
    if (active === null || dragging.current) return;
    const dest = snapDest(active, angleRef.current);
    animateTo(dest, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  function onTouchStart(e: React.TouchEvent) {
    dragging.current = true;
    startX.current   = e.touches[0].clientX;
    startAngle.current = angleRef.current;
    setPaused(true);
    cancelAnimationFrame(animRef.current);
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    const dx       = e.touches[0].clientX - startX.current;
    const newAngle = startAngle.current + dx * 0.8;
    setAngle(newAngle);
    const idx = rotToIndex(newAngle);
    if (idx !== active) setActive(idx);
  }

  function onTouchEnd() {
    if (!dragging.current) return;
    dragging.current = false;
    const idx  = rotToIndex(angleRef.current);
    const dest = snapDest(idx, angleRef.current);
    animateTo(dest, 260, () => {
      setActive(idx);
      setPaused(false);
    });
  }

  // Item positions at current render angle
  function mAngle(i: number) {
    return (i / N) * 2 * Math.PI - Math.PI / 2 + (renderAngle * Math.PI / 180);
  }
  function mPt(r: number, i: number) {
    const a = mAngle(i);
    return { x: M_CX + Math.cos(a) * r, y: M_CY + Math.sin(a) * r };
  }

  const svc = active !== null ? ALL[active] : null;

  return (
    <div className="flex flex-col items-center">

      {/* ── Rotatable wheel ── */}
      <div
        className="relative select-none"
        style={{ width: M_BOX, height: M_BOX, touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* SVG: static rings + rotating spokes/ticks */}
        <svg
          width={M_BOX}
          height={M_BOX}
          viewBox={`0 0 ${M_BOX} ${M_BOX}`}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Outer dashed orbit */}
          <circle
            cx={M_CX} cy={M_CY} r={M_ORBIT - 8}
            fill="none"
            stroke="rgba(245,230,208,0.05)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

          {/* Inner circle */}
          <circle
            cx={M_CX} cy={M_CY} r={M_INNER}
            fill="rgba(14,14,14,0.97)"
            stroke={active !== null ? "rgba(201,168,76,0.3)" : "rgba(245,230,208,0.08)"}
            strokeWidth="1"
          />
          {active !== null && (
            <circle cx={M_CX} cy={M_CY} r={M_INNER} fill="rgba(201,168,76,0.05)" />
          )}

          {/* Rotating spokes */}
          {ALL.map((_, i) => {
            const p1 = mPt(M_TICK + 2, i);
            const p2 = mPt(M_ORBIT - 16, i);
            const isActive = active === i;
            return (
              <line
                key={i}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke={isActive ? "rgba(201,168,76,0.6)" : "rgba(245,230,208,0.06)"}
                strokeWidth={isActive ? 1.5 : 1}
              />
            );
          })}

          {/* Rotating tick dots */}
          {ALL.map((_, i) => {
            const p = mPt(M_TICK, i);
            const isActive = active === i;
            return (
              <circle
                key={i}
                cx={p.x} cy={p.y}
                r={isActive ? 3 : 1.5}
                fill={isActive ? "#C9A84C" : "rgba(245,230,208,0.2)"}
              />
            );
          })}
        </svg>

        {/* Rotating number orbit labels */}
        {ALL.map((_, i) => {
          const p = mPt(M_ORBIT, i);
          const isActive = active === i;
          // Fade items in the bottom half
          const sinA  = Math.sin(mAngle(i));
          const opacity = isActive ? 1 : Math.max(0.1, ((1 - sinA) / 2) * 0.65);
          return (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
                opacity,
              }}
            >
              <span
                className="font-display block text-center"
                style={{
                  fontSize: isActive ? "11px" : "9px",
                  letterSpacing: "0.2em",
                  color: isActive ? "#C9A84C" : "rgba(245,230,208,0.3)",
                  transition: "font-size 0.18s, color 0.18s",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          );
        })}

        {/* Center: fixed, shows active service name */}
        <div
          className="absolute pointer-events-none flex flex-col items-center justify-center text-center"
          style={{
            left: M_CX - M_INNER,
            top: M_CY - M_INNER,
            width: M_INNER * 2,
            height: M_INNER * 2,
          }}
        >
          <AnimatePresence mode="wait">
            {svc ? (
              <motion.div
                key={active ?? "x"}
                className="flex flex-col items-center gap-1 px-2"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <p style={{
                  fontSize: "7px",
                  letterSpacing: "0.2em",
                  color: "#C9A84C",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>
                  {svc.stat}
                </p>
                <h3
                  className="font-display text-[#F5E6D0] leading-tight text-center"
                  style={{ fontSize: "clamp(0.56rem, 2.4vw, 0.72rem)", marginTop: 3 }}
                >
                  {svc.title}
                </h3>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span
                  className="font-display text-[#F5E6D0]/15 leading-none"
                  style={{ fontSize: "2rem" }}
                >
                  {N}
                </span>
                <span
                  className="font-display text-[#F5E6D0]/20"
                  style={{ fontSize: "0.5rem", letterSpacing: "0.3em" }}
                >
                  SERVICES
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe hint */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none">
          <span style={{
            fontSize: "7px",
            letterSpacing: "0.25em",
            color: "rgba(245,230,208,0.18)",
            textTransform: "uppercase",
          }}>
            ← swipe to spin →
          </span>
        </div>
      </div>

      {/* ── Active service detail below wheel ── */}
      <div className="w-full mt-6">
        <AnimatePresence mode="wait">
          {svc ? (
            <motion.div
              key={active ?? "x"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#C9A84C] font-bold mb-2">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </p>
              <h3
                className="font-display text-[#F5E6D0] leading-tight mb-2"
                style={{ fontSize: "clamp(1.3rem, 5.5vw, 1.8rem)" }}
              >
                {svc.title}
              </h3>
              <p className="text-[9px] tracking-[0.22em] uppercase text-[#C9A84C] font-bold mb-3">
                {svc.tagline}
              </p>
              <p className="text-[#F5E6D0]/45 text-xs leading-[1.85]">
                {svc.desc}
              </p>
              <a
                href={`mailto:info@tamadamedia.com?subject=Inquiry about ${encodeURIComponent(svc.title)}`}
                className="mt-5 inline-flex items-center gap-2.5 px-6 py-3 bg-[#C9A84C] text-[#F5E6D0] text-[10px] font-bold tracking-[0.2em] uppercase"
              >
                Let&apos;s Talk
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          ) : (
            <motion.div key="idle-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-[#F5E6D0]/20 text-xs leading-[2]">
                Swipe the wheel to explore our services.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
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
              ALL THIS <span className="text-[#C9A84C]">AND MORE.</span>
            </motion.h2>
          </div>
        </div>

        {/* ── Wheel + Detail ── */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-12 lg:gap-20">

          {/* ── Desktop: SVG wheel ── */}
          <motion.div
            className="relative shrink-0 hidden lg:block"
            style={{ width: BOX, height: BOX }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          >
            <svg
              width={BOX}
              height={BOX}
              viewBox={`0 0 ${BOX} ${BOX}`}
              className="absolute inset-0 pointer-events-none"
            >
              <circle
                cx={CX} cy={CY} r={ORBIT - 18}
                fill="none"
                stroke="rgba(245,230,208,0.05)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx={CX} cy={CY} r={INNER}
                fill="rgba(14,14,14,0.95)"
                stroke="rgba(245,230,208,0.08)"
                strokeWidth="1"
              />
              {active !== null && (
                <circle
                  cx={CX} cy={CY} r={INNER}
                  fill="rgba(201,168,76,0.06)"
                  stroke="rgba(201,168,76,0.35)"
                  strokeWidth="1"
                />
              )}
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
              {ALL.map((_, i) => {
                const p = pt(TICK_R, i);
                const isActive = active === i;
                return (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={isActive ? 3 : 2}
                    fill={isActive ? "#C9A84C" : "rgba(245,230,208,0.25)"}
                    style={{ transition: "fill 0.3s" }}
                  />
                );
              })}
            </svg>

            {/* Desktop orbit labels */}
            {ALL.map((s, i) => {
              const p = pt(ORBIT, i);
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  className="absolute flex flex-col items-center gap-1 cursor-pointer group"
                  style={{
                    left: p.x,
                    top: p.y,
                    transform: "translate(-50%, -50%)",
                    width: "56px",
                  }}
                  onMouseEnter={() => { setPaused(true); setActive(i); }}
                  onMouseLeave={() => setPaused(false)}
                  aria-label={s.title}
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
                    {s.title}
                  </span>
                </button>
              );
            })}

            {/* Desktop center content */}
            <div
              className="absolute pointer-events-none flex flex-col items-center justify-center text-center px-6"
              style={{
                left: CX - INNER,
                top: CY - INNER,
                width: INNER * 2,
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

          {/* Right panel */}
          <div className="flex-1 w-full">

            {/* ── Desktop: detail panel ── */}
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

            {/* ── Mobile: rotatable wheel ── */}
            <div className="lg:hidden w-full">
              <MobileWheel
                active={active}
                setActive={setActive}
                setPaused={setPaused}
                inView={inView}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
