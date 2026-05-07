"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SectionTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Section folds back and darkens as it exits upward
  const scale   = useTransform(scrollYProgress, [0.58, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0.70, 1], [1, 0.45]);
  const y       = useTransform(scrollYProgress, [0.62, 1], [0, -70]);

  return (
    <div ref={ref} className="relative">
      {/* Red scan beam — sweeps across the top on first enter */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-50 origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 20%, #FF4444 50%, #C9A84C 80%, transparent 100%)",
          boxShadow: "0 0 12px #C9A84C, 0 0 50px #C9A84C44, 0 0 2px #FF6666",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.95, ease: EASE, times: [0, 0.32, 1] }}
      />

      {/* Subtle glow bloom behind scan beam */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[80px] pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(201,168,76,0.07) 0%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.9, ease: EASE, times: [0, 0.25, 1] }}
      />

      {/* Exit wrapper — scroll-driven fold-back */}
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "top center",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
