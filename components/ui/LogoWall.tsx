"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LogoWallProps {
  logos: string[];
  title?: string;
  invert?: boolean;
}

export default function LogoWall({ logos, title, invert = false }: LogoWallProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const bg = invert ? "bg-[#F5E6D0]/10" : "bg-[#0A0A0A]/5";
  const text = invert ? "text-[#F5E6D0]/60" : "text-[#0A0A0A]/60";
  const border = invert ? "border-[#F5E6D0]/10" : "border-[#0A0A0A]/10";

  return (
    <div ref={ref}>
      {title && (
        <p className={`text-xs tracking-[0.3em] uppercase font-bold mb-8 ${invert ? "text-[#F5E6D0]/40" : "text-[#6B6B6B]"}`}>
          {title}
        </p>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-px border border-[#0A0A0A]/10">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className={`${bg} border ${border} flex items-center justify-center p-4 lg:p-5 aspect-[3/2] group cursor-default`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.02 }}
            whileHover={{ backgroundColor: "rgba(185,28,28,0.08)" }}
          >
            <span className={`text-[10px] lg:text-xs font-bold tracking-wider uppercase text-center ${text} group-hover:text-[#B91C1C] transition-colors duration-300`}>
              {logo}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
