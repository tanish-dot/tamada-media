"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Entropy } from "@/components/ui/entropy";

const EASE = [0.16, 1, 0.3, 1] as const;

const TICKER_ITEMS = [
  "STRATEGY", "SCRIPTING", "PRODUCTION", "DISTRIBUTION", "IP BUILDING",
  "BRAND CHANNELS", "OTT ORIGINALS", "SHORT FORM", "LONG FORM",
  "VIRAL FORMATS", "PLATFORM GROWTH", "AUDIENCE OWNERSHIP",
];

export default function CaaSHero() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  // Responsive canvas size
  const [canvasSize, setCanvasSize] = useState(420);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setCanvasSize(300);
      else if (window.innerWidth < 1280) setCanvasSize(380);
      else setCanvasSize(440);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden"
    >
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />
      {/* Red glow — bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[60vw] h-[60vh]"
        style={{ background: "radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
      />
      {/* Top-left glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[40vw] h-[40vh]"
        style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end section-padding pt-36 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">

          {/* ── Left: headline ── */}
          <div className="lg:w-[45%] flex-shrink-0">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <span className="block w-6 h-px bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">
                Content as a Service
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="font-display text-[clamp(4.5rem,11vw,14rem)] leading-[0.85] text-[#F5E6D0]"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              >
                STOP
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="font-display text-[clamp(4.5rem,11vw,14rem)] leading-[0.85] text-[#F5E6D0]"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
              >
                RENTING
              </motion.h1>
            </div>
            <div>
              <motion.h1
                className="font-display text-[clamp(4.5rem,11vw,14rem)] leading-[0.85] text-[#C9A84C]"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.54, ease: EASE }}
              >
                ATTENTION.
              </motion.h1>
            </div>

            <motion.p
              className="mt-7 text-[#F5E6D0]/35 text-sm lg:text-base max-w-sm leading-[1.9]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              We build brands their own content infrastructure — channels, series, campaigns, and IPs that compound over time instead of disappearing after a placement.
            </motion.p>
          </div>

          {/* ── Right: Entropy ── */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-end gap-6"
            style={{ paddingLeft: 60 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.65, ease: EASE }}
          >
            <Entropy size={canvasSize} particleColor="#F5E6D0" />

            {/* Labels under canvas */}
            <div className="flex items-center justify-between w-full" style={{ maxWidth: canvasSize }}>
              <div className="text-center">
                <p className="text-[9px] tracking-[0.36em] uppercase text-[#F5E6D0]/30 font-bold">Order</p>
                <p className="text-[8px] tracking-[0.25em] uppercase text-[#F5E6D0]/14 mt-1">structured content</p>
              </div>
              <span className="block w-px h-5 bg-[#F5E6D0]/10" />
              <div className="text-center">
                <p className="text-[9px] tracking-[0.36em] uppercase text-[#C9A84C]/70 font-bold">Entropy</p>
                <p className="text-[8px] tracking-[0.25em] uppercase text-[#F5E6D0]/14 mt-1">viral spread</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-12 pt-8 border-t border-[#F5E6D0]/[0.07] flex items-center gap-10 lg:gap-16 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {[
            ["200+", "Brands Served"],
            ["300+", "Campaigns Run"],
            ["2B+",  "Impressions"],
            ["70K",  "Videos / Month"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] leading-none text-[#F5E6D0]">{v}</p>
              <p className="text-[8px] tracking-[0.3em] uppercase text-[#F5E6D0]/28 mt-1.5">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker */}
      <motion.div
        className="relative z-20 border-t border-[#F5E6D0]/[0.06] overflow-hidden py-3 bg-[#0A0A0A]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {tickerDouble.map((item, i) => (
            <span key={i} className="text-[9px] font-bold tracking-[0.38em] uppercase text-[#F5E6D0]/18 px-8 flex-shrink-0">
              {item}
              <span className="mx-8 text-[#C9A84C]/50">·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
