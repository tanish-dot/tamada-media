"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { SERVICES_LIST } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

function ServiceRow({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES_LIST)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative border-b border-[#F5E6D0]/[0.07] group"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.055, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Full-row hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: "rgba(201,168,76,0.04)" }}
      />

      <div className="relative flex items-center gap-6 lg:gap-16 px-6 sm:px-10 md:px-14 lg:px-20 py-7 lg:py-9">

        {/* Number */}
        <span className="font-display text-[11px] tracking-[0.3em] text-[#C9A84C] shrink-0 w-7 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Service name */}
        <div className="flex-1 overflow-hidden">
          <div className="relative inline-block">
            <motion.h3
              className="font-display leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 5.5rem)" }}
              animate={{ color: hovered ? "#C9A84C" : "rgba(245,230,208,0.88)" }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>

            {/* Underline scoped to text width */}
            <motion.span
              className="absolute bottom-0 left-0 h-px w-full origin-left"
              style={{ background: "#C9A84C" }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Stat + arrow */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#F5E6D0]/22 font-medium tabular-nums">
            {service.stat}
          </span>
          <motion.svg
            className="w-5 h-5 text-[#C9A84C]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.2 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </div>

      {/* Description slides open on hover */}
      <motion.div
        style={{ overflow: "hidden" }}
        animate={{ height: hovered ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <p className="text-[#F5E6D0]/35 text-sm leading-[1.85] pl-6 sm:pl-10 md:pl-14 lg:pl-[calc(5rem+1.75rem+4rem)] pr-6 lg:pr-20 pb-7">
          {service.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#080808] overflow-hidden">

      {/* Header */}
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 pt-20 lg:pt-28 pb-0 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-[#C9A84C]" />
            <motion.p
              className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Full Service Offering
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[#F5E6D0] leading-[0.87]"
              style={{ fontSize: "clamp(3.5rem, 8vw, 11rem)" }}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
            >
              THE FULL <span className="text-[#C9A84C]">SPECTRUM.</span>
            </motion.h2>
          </div>
        </div>

        <motion.p
          className="text-[#F5E6D0]/30 text-sm leading-[1.85] max-w-xs lg:text-right"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          Hover any service to see what it means in practice. Every one is available standalone or bundled.
        </motion.p>
      </div>

      {/* Gap spacer */}
      <div style={{ height: "40px" }} />

      {/* Service rows */}
      <div className="border-t border-[#F5E6D0]/[0.07] flex flex-col gap-[10px]">
        {SERVICES_LIST.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} inView={inView} />
        ))}
      </div>

      {/* CTA strip */}
      <motion.div
        className="border-t border-[#F5E6D0]/[0.07] px-6 sm:px-10 md:px-14 lg:px-20 py-10 flex items-center justify-between gap-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <span className="text-[#F5E6D0]/18 text-xs tracking-[0.3em] uppercase font-medium">
          {SERVICES_LIST.length} Services · All In-House
        </span>
        <Link
          href="/contact"
          className="relative inline-flex items-center gap-3 px-8 py-4 border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden group"
        >
          <span className="absolute inset-0 bg-[#C9A84C] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative z-10 group-hover:text-[#F5E6D0] transition-colors duration-300">Get In Touch</span>
          <svg className="relative z-10 w-3.5 h-3.5 group-hover:text-[#F5E6D0] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
