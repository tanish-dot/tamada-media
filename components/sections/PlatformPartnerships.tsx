"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const CYCLE_MS = 3200;

const PLATFORMS = [
  {
    name: "YouTube",
    badge: "Enterprise Partner",
    credential: "1 of 12 in India",
    bg: "#FF0000",
    text: "#ffffff",
    stats: [
      { value: "4.8B+",  label: "Monthly Views"    },
      { value: "280M+",  label: "Subscribers"       },
      { value: "750+",   label: "Channels"          },
    ],
  },
  {
    name: "Instagram",
    badge: "Creator Network",
    credential: "Meta Official Partner",
    bg: "linear-gradient(160deg, #833ab4 0%, #fd1d1d 55%, #fcb045 100%)",
    text: "#ffffff",
    stats: [
      { value: "500M+", label: "Monthly Reach"      },
      { value: "150M+", label: "Followers"          },
      { value: "2000+", label: "Creators"           },
    ],
  },
  {
    name: "Snapchat",
    badge: "Official Partner",
    credential: "South India Exclusive",
    bg: "#FFFC00",
    text: "#0a0a0a",
    stats: [
      { value: "20+",   label: "Programs"           },
      { value: "3000+", label: "Creators"           },
      { value: "50M+",  label: "Views"              },
    ],
  },
  {
    name: "Facebook",
    badge: "Creator Studio",
    credential: "Certified Partner",
    bg: "#1877F2",
    text: "#ffffff",
    stats: [
      { value: "1B+",   label: "Monthly Impressions"},
      { value: "10K+",  label: "Posts / Month"      },
      { value: "5+",    label: "Languages"          },
    ],
  },
];

// ── Logos (white or dark depending on platform) ───────────────────────────────

function YouTubeLogo({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size} aria-hidden>
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" />
    </svg>
  );
}
function InstagramLogo({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function SnapchatLogo({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size} aria-hidden>
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.023.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.148-.015h-.435c-1.469 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.959.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
}
function FacebookLogo({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const LOGOS: Record<string, (c: string, s: number) => React.ReactNode> = {
  YouTube:   (c, s) => <YouTubeLogo color={c} size={s} />,
  Instagram: (c, s) => <InstagramLogo color={c} size={s} />,
  Snapchat:  (c, s) => <SnapchatLogo color={c} size={s} />,
  Facebook:  (c, s) => <FacebookLogo color={c} size={s} />,
};

// ── Count-up ──────────────────────────────────────────────────────────────────

function parseNum(val: string) {
  const m = val.match(/^([\d.]+)(.*)$/);
  return m ? { num: parseFloat(m[1]), suffix: m[2] } : { num: 0, suffix: val };
}

function StatCount({ value }: { value: string }) {
  const { num, suffix } = parseNum(value);
  const hasDecimal = value.includes(".");
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    let raf: number;
    const DURATION = 900;
    const tick = (start: number, now: number) => {
      const prog  = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - prog, 4);
      setDisplay(
        (hasDecimal ? (num * eased).toFixed(1) : Math.round(num * eased).toString()) + suffix
      );
      if (prog < 1) raf = requestAnimationFrame((t) => tick(start, t));
    };
    raf = requestAnimationFrame((t) => tick(t, t));
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className="tabular-nums">{display}</span>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PlatformPartnerships() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % 4), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section ref={ref} className="bg-[#080808] overflow-hidden">

      {/* ── Compact header ── */}
      <div className="section-padding flex items-end justify-between gap-6" style={{ paddingTop: "1rem", paddingBottom: "32px" }}>
        <div>
          <motion.div
            className="flex items-center gap-3 mb-3"
            style={{ marginLeft: "-50px" }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="block w-5 h-px bg-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">
              Platform Partnerships
            </span>
          </motion.div>
          <div className="overflow-hidden" style={{ marginLeft: "-50px" }}>
            <motion.h2
              className="font-display leading-[0.83]"
              style={{ fontSize: "clamp(3.5rem,7vw,9rem)" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            >
              <span className="text-[#F5E6D0]">THE </span>
              <span className="text-[#C9A84C]">STATS.</span>
            </motion.h2>
          </div>
        </div>
        <motion.p
          className="text-[#F5E6D0]/30 text-sm max-w-[220px] leading-relaxed text-right hidden lg:block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Official partners across every major platform.
        </motion.p>
      </div>

      {/* ── Panels ── */}
      <motion.div
        className="flex flex-col sm:flex-row gap-2 pb-4"
        style={{ height: "auto", minHeight: "65vh", paddingLeft: "clamp(0.5rem, 1.25vw, 1.5rem)", paddingRight: "clamp(0.5rem, 1.25vw, 1.5rem)", paddingBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {PLATFORMS.map((platform, i) => {
          const isActive = active === i;
          return (
            <div
              key={platform.name}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? 4 : 1,
                minHeight: isActive ? 360 : 80,
                background: platform.bg,
                borderRadius: "10px",
                border: "1px solid rgba(245,230,208,0.15)",
                transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1), min-height 0.65s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={() => { setPaused(true); setActive(i); }}
              onMouseLeave={() => setPaused(false)}
            >

              {/* ── Collapsed: centered logo + name ── */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {LOGOS[platform.name]?.(platform.text, 48)}
                <span
                  className="font-display tracking-widest uppercase text-center"
                  style={{ fontSize: "0.6rem", color: platform.text, opacity: 0.5, letterSpacing: "0.3em" }}
                >
                  {platform.name}
                </span>
              </motion.div>

              {/* ── Expanded: full analytics ── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end gap-8"
                    style={{ padding: "clamp(1.5rem,3vw,3rem)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.18 }}
                  >

                    {/* TOP: platform identity */}
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {LOGOS[platform.name]?.(platform.text, 32)}
                      <div>
                        <p className="font-display leading-none text-base" style={{ color: platform.text }}>
                          {platform.name}
                        </p>
                        <p
                          className="text-[8px] tracking-[0.28em] uppercase mt-0.5"
                          style={{ color: platform.text, opacity: 0.5 }}
                        >
                          {platform.badge}
                        </p>
                      </div>
                    </motion.div>

                    {/* BOTTOM: stats + credential */}
                    <div>
                      <div className="flex flex-col gap-5 mb-6">
                        {platform.stats.map((s, si) => (
                          <motion.div
                            key={s.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.28 + si * 0.08, ease: EASE }}
                          >
                            <p
                              className="font-display leading-none"
                              style={{ fontSize: "clamp(2rem,3.8vw,5rem)", color: platform.text }}
                            >
                              <StatCount value={s.value} />
                            </p>
                            <p
                              className="text-[8px] tracking-[0.3em] uppercase mt-1"
                              style={{ color: platform.text, opacity: 0.45 }}
                            >
                              {s.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.p
                        className="text-[8px] tracking-[0.25em] uppercase"
                        style={{ color: platform.text, opacity: 0.3 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ duration: 0.3, delay: 0.55 }}
                      >
                        {platform.credential}
                      </motion.p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </motion.div>

    </section>
  );
}
