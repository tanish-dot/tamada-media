"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICES_LIST } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesSection() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-[#F5E6D0]">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="block w-8 h-px bg-[#B91C1C]" />
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase text-[#B91C1C] font-bold"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Full Service Offering
          </motion.p>
        </div>
      </div>

      <div className="overflow-hidden" style={{ marginBottom: "40px" }}>
        <motion.h2
          className="font-display text-[clamp(3rem,6.5vw,9rem)] leading-[0.87] text-[#0A0A0A]"
          initial={{ y: "108%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          THE FULL{" "}<span className="text-[#B91C1C]">SPECTRUM.</span>
        </motion.h2>
      </div>

      <div className="flex flex-col divide-y divide-[#0A0A0A]/[0.08]">
        {SERVICES_LIST.map((service, i) => (
          <ServiceRow
            key={service.id}
            service={service}
            index={i}
            isOpen={active === service.id}
            onToggle={() => setActive(active === service.id ? null : service.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof SERVICES_LIST)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start lg:items-center justify-between gap-6 py-9 lg:py-11 text-left group"
      >
        <div className="flex items-start lg:items-center gap-7 lg:gap-14 flex-1">
          <span className="font-display text-sm text-[#B91C1C] shrink-0 w-8 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`font-display text-[clamp(1.6rem,3.2vw,4.5rem)] leading-tight transition-colors duration-300 ${
              isOpen ? "text-[#B91C1C]" : "text-[#0A0A0A] group-hover:text-[#B91C1C]"
            }`}
          >
            {service.title}
          </h3>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span className="hidden lg:block text-sm text-[#0A0A0A]/35 font-bold tabular-nums">
            {service.stat}
          </span>
          <motion.span
            className="w-9 h-9 border border-[#0A0A0A]/15 flex items-center justify-center text-[#0A0A0A]/50 text-xl font-light group-hover:border-[#B91C1C]/40 group-hover:text-[#B91C1C] transition-colors duration-300"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-12 flex items-start gap-7 lg:gap-14">
              {/* Spacer matches the number column width */}
              <span className="shrink-0 w-8" />
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="font-display text-[#B91C1C] text-[clamp(1rem,1.6vw,1.6rem)] leading-[1.3] mb-5">
                  {service.tagline}
                </p>
                <p className="font-display text-[#0A0A0A]/50 text-[clamp(0.9rem,1.4vw,1.4rem)] leading-[1.45]">
                  {service.desc}
                </p>
              </div>
              <div className="flex items-start">
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-3 px-7 py-3.5 bg-[#0A0A0A] text-[#F5E6D0] text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-[#B91C1C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10">Brief Us</span>
                  <svg className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
