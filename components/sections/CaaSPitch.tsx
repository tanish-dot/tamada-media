"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { num: "01", label: "Strategy & Scripting" },
  { num: "02", label: "Production & Editing" },
  { num: "03", label: "Distribution & Growth" },
  { num: "04", label: "IP Building" },
];

export default function CaaSPitch() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#0A0A0A] overflow-hidden">

      {/* Film grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* Gold glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 55% 65% at 100% 50%, rgba(201,168,76,0.11) 0%, transparent 65%)" }}
      />

      {/* Ghost bg */}
      <div aria-hidden className="absolute right-[-1vw] top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none z-0"
        style={{ fontSize: "clamp(10rem,22vw,32rem)", color: "rgba(201,168,76,0.04)", letterSpacing: "-0.05em" }}
      >
        CaaS
      </div>

      <div className="section-padding relative z-10 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-0">

          {/* ── Left ── */}
          <div className="lg:w-[52%] shrink-0 lg:pr-16 lg:border-r border-[#F5E6D0]/[0.08]">

            <motion.div className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block w-5 h-px bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Introducing — Content as a Service</span>
            </motion.div>

            <div className="mb-10">
              {[
                { text: "YOUR CONTENT.", solid: true  },
                { text: "OUR",          solid: false  },
                { text: "OBSESSION.",   solid: true, gold: true },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h2
                    className="font-display leading-[0.88]"
                    style={{
                      fontSize: "clamp(2.8rem, 5.8vw, 7.5rem)",
                      color: line.gold ? "#C9A84C" : line.solid ? "#F5E6D0" : "transparent",
                      WebkitTextStroke: !line.solid ? "1.5px rgba(245,230,208,0.25)" : undefined,
                    }}
                    initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 0.95, delay: 0.08 + i * 0.1, ease: EASE }}
                  >
                    {line.text}
                  </motion.h2>
                </div>
              ))}
            </div>

            <motion.p className="text-[#F5E6D0]/50 text-sm lg:text-base leading-[1.95] max-w-sm mb-10"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              Hand us your brand. We handle strategy, scripting, shooting, editing, and distribution — every single day. You focus on the business. We build the audience.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
            >
              <Link href="/caas"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-[#F5E6D0] transition-all duration-300 group"
              >
                See How It Works
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── Right ── */}
          <div className="lg:w-[48%] lg:pl-16 flex flex-col gap-0">

            {PILLARS.map((p, i) => (
              <motion.div key={p.num}
                className="flex items-center gap-5 py-5 border-t border-[#F5E6D0]/[0.07] group cursor-default"
                initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 + i * 0.09, ease: EASE }}
              >
                <span className="font-display text-[10px] tracking-[0.35em] text-[#C9A84C] shrink-0 w-7">{p.num}</span>
                <span
                  className="font-display text-[#F5E6D0] transition-all duration-300 group-hover:text-[#C9A84C]"
                  style={{ fontSize: "clamp(1.05rem, 2vw, 1.65rem)", opacity: 0.7 }}
                >
                  {p.label}
                </span>
                <span className="ml-auto w-5 h-px bg-[#F5E6D0]/15 group-hover:w-9 group-hover:bg-[#C9A84C] transition-all duration-500 shrink-0" />
              </motion.div>
            ))}

            <div className="border-t border-[#F5E6D0]/[0.07]" />

            {/* Stats */}
            <motion.div className="pt-8 grid grid-cols-3 gap-3 lg:gap-6"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.68 }}
            >
              {[["70K+", "Videos / Month"], ["200+", "Brand Channels"], ["8+", "Years Running"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-[#F5E6D0] leading-none mb-2"
                    style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}
                  >{v}</p>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-[#F5E6D0]/40 font-semibold leading-snug">{l}</p>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
