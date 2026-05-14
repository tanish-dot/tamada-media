"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  {
    number: "01",
    pre: "Advertising fights for attention.",
    bold: "Content earns it.",
    bg: "#F5E6D0",
    colorPre: "rgba(10,10,10,0.28)",
    colorBold: "#0A0A0A",
    colorNum: "rgba(10,10,10,0.07)",
    colorTag: "#C9A84C",
  },
  {
    number: "02",
    pre: "Campaigns create spikes.",
    bold: "Formats create habits.",
    bg: "#0A0A0A",
    colorPre: "rgba(245,230,208,0.25)",
    colorBold: "#F5E6D0",
    colorNum: "rgba(245,230,208,0.06)",
    colorTag: "#C9A84C",
  },
  {
    number: "03",
    pre: "Reach can be bought.",
    bold: "Loyalty can't.",
    bg: "#C9A84C",
    colorPre: "rgba(245,230,208,0.55)",
    colorBold: "#F5E6D0",
    colorNum: "rgba(245,230,208,0.12)",
    colorTag: "#F5E6D0",
  },
];

function Panel({ panel, index }: { panel: typeof PANELS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: panel.bg,
        paddingTop: "clamp(4rem, 9vw, 8rem)",
        paddingBottom: "clamp(4rem, 9vw, 8rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 7rem)",
        paddingRight: "clamp(1.5rem, 5vw, 7rem)",
      }}
    >
      {/* Giant ghosted number */}
      <div
        className="absolute right-0 bottom-0 font-display leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 28vw, 34rem)",
          color: panel.colorNum,
          lineHeight: 0.85,
          transform: "translate(5%, 18%)",
        }}
        aria-hidden
      >
        {panel.number}
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Tag */}
        <motion.p
          className="text-[10px] tracking-[0.42em] uppercase font-bold mb-10"
          style={{ color: panel.colorTag }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Why Now — {panel.number}
        </motion.p>

        {/* Pre line */}
        <div className="overflow-hidden mb-1">
          <motion.p
            className="font-display leading-[0.9]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 7rem)",
              color: panel.colorPre,
            }}
            initial={{ y: "110%", skewY: 4 }}
            animate={inView ? { y: "0%", skewY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {panel.pre}
          </motion.p>
        </div>

        {/* Bold punchline */}
        <div className="overflow-hidden">
          <motion.p
            className="font-display leading-[0.9]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 7rem)",
              color: panel.colorBold,
            }}
            initial={{ y: "110%", skewY: 4 }}
            animate={inView ? { y: "0%", skewY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
          >
            {panel.bold}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function WhyNow() {
  return (
    <section className="overflow-hidden">
      {PANELS.map((panel, i) => (
        <Panel key={i} panel={panel} index={i} />
      ))}
    </section>
  );
}
