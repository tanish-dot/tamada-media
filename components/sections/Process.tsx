"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden">
      <div ref={ref}>
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Process
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] text-[#0A0A0A]"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              THE SYSTEM
              <br />
              <span className="text-[#C9A84C]">BEHIND THE SCALE.</span>
            </motion.h2>
          </div>
        </div>

        {/* Split-screen: steps list (left) + content panel (right) */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">

          {/* LEFT — step numbers list */}
          <div className="lg:w-[42%] flex-shrink-0 flex flex-col divide-y divide-[#0A0A0A]/10 border-t border-[#0A0A0A]/10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.button
                key={step.number}
                className="group relative flex items-center gap-6 py-5 lg:py-7 text-left w-full focus:outline-none"
                style={{ background: "transparent", border: "none", borderBottom: "none", cursor: "pointer" }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.07, ease: EASE }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* Active bar */}
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A84C]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: active === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ originY: 0 }}
                />

                {/* Number */}
                <span
                  className="font-display transition-all duration-300 leading-none flex-shrink-0 pl-5"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 4.5rem)",
                    color: active === i ? "#C9A84C" : "rgba(10,10,10,0.15)",
                  }}
                >
                  {step.number}
                </span>

                {/* Title */}
                <span
                  className="font-display transition-colors duration-300"
                  style={{
                    fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
                    color: active === i ? "#0A0A0A" : "rgba(10,10,10,0.38)",
                  }}
                >
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* RIGHT — content panel */}
          <div className="flex-1 lg:border-l border-[#0A0A0A]/10 relative overflow-hidden min-h-[280px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0 flex flex-col justify-center lg:px-14 px-0 pt-8 lg:pt-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* Ghost number */}
                <span
                  className="font-display absolute right-0 bottom-0 leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(5rem, 18vw, 22rem)",
                    color: "rgba(10,10,10,0.05)",
                    lineHeight: 0.85,
                    transform: "translate(8%, 18%)",
                  }}
                  aria-hidden
                >
                  {PROCESS_STEPS[active].number}
                </span>

                <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A84C] font-bold mb-5 relative z-10">
                  Step {PROCESS_STEPS[active].number}
                </p>
                <h3
                  className="font-display leading-[0.88] text-[#0A0A0A] mb-8 relative z-10"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 5.5rem)" }}
                >
                  {PROCESS_STEPS[active].title}
                </h3>
                <p className="text-[#6B6B6B] text-base lg:text-lg leading-[1.85] max-w-md relative z-10">
                  {PROCESS_STEPS[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: desc shown below list (already covered by panel above, but add bottom pad) */}
        <div className="mt-8 lg:hidden" />
      </div>
    </section>
  );
}
