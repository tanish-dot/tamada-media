"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS = [
  { x: 3,  y: 6,  r: -15, s: 1.1, o: 0.09, icon: "camera" },
  { x: 88, y: 4,  r:  20, s: 0.8, o: 0.07, icon: "phone"  },
  { x: 55, y: 10, r:  -8, s: 0.7, o: 0.06, icon: "mic"    },
  { x: 14, y: 52, r:  10, s: 1.3, o: 0.08, icon: "film"   },
  { x: 78, y: 46, r: -20, s: 0.9, o: 0.07, icon: "camera" },
  { x: 92, y: 74, r:  12, s: 1.0, o: 0.09, icon: "phone"  },
  { x: 42, y: 70, r:  -5, s: 0.75,o: 0.06, icon: "mic"    },
  { x: 5,  y: 80, r:  18, s: 0.85,o: 0.08, icon: "film"   },
  { x: 65, y: 84, r: -12, s: 1.2, o: 0.07, icon: "camera" },
  { x: 30, y: 26, r:   8, s: 0.6, o: 0.05, icon: "phone"  },
  { x: 82, y: 26, r: -18, s: 0.65,o: 0.05, icon: "mic"    },
  { x: 50, y: 42, r:  15, s: 0.55,o: 0.04, icon: "film"   },
];

function IconShape({ icon }: { icon: string }) {
  if (icon === "camera") return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
  if (icon === "phone") return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
  if (icon === "mic") return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );
  if (icon === "film") return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/>
      <line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  );
  return null;
}

export default function JoinUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F5E6D0] overflow-hidden relative">

      {/* Background icons */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        {ICONS.map((ic, i) => (
          <div key={i} className="absolute text-[#080808]"
            style={{ left: `${ic.x}%`, top: `${ic.y}%`, transform: `rotate(${ic.r}deg) scale(${ic.s})`, opacity: ic.o }}
          >
            <IconShape icon={ic.icon} />
          </div>
        ))}
      </div>

      <div className="relative z-10">

        {/* ── Upper block ── */}
        <div className="section-padding pt-12 lg:pt-24 pb-10 lg:pb-16">

          <motion.div className="flex items-center gap-3 mb-6 lg:mb-10"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            <span className="block w-5 h-px bg-[#C9A84C]" />
            <p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Careers</p>
          </motion.div>

          {/* Headline + right-side copy on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16">
            <div className="shrink-0">
              <div className="overflow-hidden mb-1">
                <motion.h2 className="font-display text-[#080808] leading-[0.88]"
                  style={{ fontSize: "clamp(2.8rem, 14vw, 14rem)" }}
                  initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
                >
                  BUILT FOR
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 className="font-display leading-[0.88]"
                  style={{ fontSize: "clamp(2.8rem, 14vw, 14rem)", WebkitTextStroke: "2px #080808", color: "transparent" }}
                  initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.95, delay: 0.16, ease: EASE }}
                >
                  THIS?
                </motion.h2>
              </div>
            </div>

            {/* Right-side descriptor — desktop only */}
            <motion.p
              className="hidden lg:block text-[#080808]/45 text-base leading-[1.9] max-w-xs mb-2"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              People obsessed with content, who move without being told, and feel physically uncomfortable watching bad creative work.
            </motion.p>
          </div>
        </div>

        {/* ── Bottom strip: CSS grid, 3 cols on desktop ── */}
        <motion.div
          className="border-t border-[#080808]/12 grid grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        >

          {/* Col 1 — Who We Want (hidden on mobile, shown in headline area instead) */}
          <div className="hidden lg:flex flex-col justify-center section-padding py-12 border-r border-[#080808]/12">
            <p className="text-[8px] tracking-[0.35em] uppercase text-[#080808]/35 font-bold mb-3">Who We Want</p>
            <p className="text-[#080808]/55 text-sm leading-[1.75]">
              People obsessed with content, who move without being told, and feel physically uncomfortable watching bad creative work.
            </p>
          </div>

          {/* Col 1 mobile only */}
          <div className="lg:hidden px-5 py-6 border-r border-[#080808]/12">
            <p className="text-[8px] tracking-[0.35em] uppercase text-[#080808]/35 font-bold mb-3">Who We Want</p>
            <p className="text-[#080808]/55 text-xs leading-[1.75]">
              People obsessed with content, who move without being told, and feel physically uncomfortable watching bad creative work.
            </p>
          </div>

          {/* Col 2 — The Team */}
          <div className="flex flex-col justify-center px-5 py-6 lg:section-padding lg:py-12 lg:border-r border-[#080808]/12">
            <p className="text-[8px] tracking-[0.35em] uppercase text-[#080808]/35 font-bold mb-4">The Team</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-10">
              {[["200+", "People"], ["8+", "Years"], ["#1", "S. India"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-[#080808] leading-none mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}>{v}</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase text-[#080808]/35">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — CTA (spans 2 cols on mobile) */}
          <div className="col-span-2 lg:col-span-1 section-padding py-8 lg:py-12 border-t border-[#080808]/12 lg:border-t-0 flex flex-col justify-center gap-5">
            <p className="text-[#080808]/70 text-sm leading-[1.85]">
              Think you belong here?<br />Let&apos;s find out.
            </p>
            <Link href="/careers"
              className="self-start inline-flex items-center gap-3 px-8 py-4 bg-[#080808] text-[#F5E6D0] text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-[#C9A84C] transition-all duration-300 group"
            >
              See Open Roles
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
