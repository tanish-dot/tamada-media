"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function SouthIdentity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="section-padding bg-[#B91C1C] overflow-hidden relative min-h-[70vh] flex items-center">
      {/* Floating script text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ y: bgY }}
        aria-hidden
      >
        <span className="font-display text-[30vw] leading-none text-[#F5E6D0]/[0.04] select-none">
          SOUTH
        </span>
      </motion.div>

      <div ref={ref} className="relative z-10 w-full">
        {/* Main statements */}
        <div className="mb-16">
          {["WE ARE NOT TRYING", "TO CRACK SOUTH.", "WE ARE SOUTH."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className={`font-display leading-[0.9] ${
                  i === 2
                    ? "text-[clamp(3rem,7vw,10rem)] bg-[#F5E6D0] text-[#B91C1C] inline-block px-4 py-1 mt-3"
                    : "text-[clamp(2.5rem,6vw,9rem)] text-[#F5E6D0]"
                }`}
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Sub-statement */}
        <motion.div
          className="border-t border-[#F5E6D0]/20 pt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
            <div className="lg:w-1/2">
              <h3 className="font-display text-[clamp(1.5rem,3.5vw,5rem)] text-[#F5E6D0] leading-[0.9]">
                IF SOUTH STORIES
                <br />
                CAN RULE THE COUNTRY,
                <br />
                WHY CAN'T WE?
              </h3>
            </div>
            <div className="lg:w-1/2">
              <p className="text-[#F5E6D0]/60 text-base lg:text-lg leading-[1.8] mb-4 max-w-xl">
                Rajamouli went global. Jailer crossed borders.
                Pushpa said jhukeGA nahi.
              </p>
              <p className="text-[#F5E6D0]/60 text-base lg:text-lg leading-[1.8] mb-6 max-w-xl">
                So yeah — we didn't stay regional either.
              </p>
              <p className="text-[#F5E6D0]/30 text-sm italic">
                But, picture abhi baaki hai mere dost.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
