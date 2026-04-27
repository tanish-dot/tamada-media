"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  align?: "left" | "center" | "right";
  invert?: boolean;
  className?: string;
  size?: "default" | "large";
}

export default function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  align = "left",
  invert = false,
  className = "",
  size = "default",
}: SectionHeaderProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const textColor = invert ? "text-[#F5E6D0]" : "text-[#0A0A0A]";
  const redColor = invert ? "text-[#F5E6D0]/60" : "text-[#B91C1C]";
  const subColor = invert ? "text-[#F5E6D0]/60" : "text-[#6B6B6B]";

  const headlineSize = size === "large"
    ? "text-[clamp(3rem,7vw,9rem)] leading-[0.9]"
    : "text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.9]";

  return (
    <div ref={ref} className={`${alignClass} ${className}`}>
      {eyebrow && (
        <motion.p
          className={`text-xs tracking-[0.3em] uppercase font-bold mb-4 ${redColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={`font-display ${headlineSize} ${textColor}`}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {headline}
      </motion.h2>
      {subheadline && (
        <motion.p
          className={`mt-6 text-base lg:text-lg leading-relaxed max-w-2xl ${subColor} ${align === "center" ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {subheadline}
        </motion.p>
      )}
    </div>
  );
}
