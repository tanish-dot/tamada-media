"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IP_NAMES, STATS_IP } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const IP_LOGOS: Record<string, string> = {
  "Araathi":          "/ips/channels4_profile%20(7).jpg",
  "Wirally":          "/ips/unnamed%20(2).jpg",
  "The Mix":          "/ips/channels4_profile%20(3).jpg",
  "Dho Thadi":        "/ips/channels4_profile%20(15).jpg",
  "Muppo Teli":       "/ips/unnamed%20(1).jpg",
  "YINT":             "/ips/channels4_profile%20(11).jpg",
  "Maja Talkies":     "/ips/channels4_profile%20(20).jpg",
  "Racha Gang":       "/ips/channels4_profile%20(5).jpg",
  "Pataki Pori":      "/ips/unnamed%20(4).jpg",
  "YINT Money":       "/ips/channels4_profile%20(13).jpg",
  "Sinchu & Minchu":  "/ips/channels4_profile%20(1).jpg",
  "Just Girling":     "/ips/channels4_profile%20(18).jpg",
  "Charusheela":      "/ips/unnamed.jpg",
  "Wirally Juniors":  "/ips/channels4_profile%20(9).jpg",
  "Javari Junction":  "/ips/channels4_profile%20(22).jpg",
  "Think Chey":       "/ips/channels4_profile%20(4).jpg",
  "Chill Stories":    "/ips/channels4_profile%20(16).jpg",
  "Gossip":           "/ips/channels4_profile%20(2).jpg",
  "Wirally+":         "/ips/channels4_profile%20(17).jpg",
  "Wirally Kannada":  "/ips/channels4_profile%20(6).jpg",
  "Julie Minus":      "/ips/channels4_profile%20(21).jpg",
  "Nari Nation":      "/ips/channels4_profile%20(10).jpg",
  "Amma Baboi":       "/ips/channels4_profile.jpg",
  "Belle Jodis":      "/ips/channels4_profile%20(14).jpg",
  "Bumchick Bunty":   "/ips/channels4_profile%20(8).jpg",
  "Runway Reel":      "/ips/unnamed%20(3).jpg",
  "Pal Babiki":       "/ips/channels4_profile%20(12).jpg",
  "Kaasko":           "/ips/channels4_profile%20(19).jpg",
  "Wow Chepthe":      "/ips/channels4_profile%20(23).jpg",
};

const DISPLAY_IPS = (() => {
  const arr = [...IP_NAMES];
  [arr[0], arr[7]] = [arr[7], arr[0]];
  [arr[1], arr[11]] = [arr[11], arr[1]];
  [arr[7], arr[28]] = [arr[28], arr[7]];
  return arr;
})();

export default function IPCreation() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#080808] overflow-hidden" ref={ref}>

      {/* ── Header block ── */}
      <div className="section-padding pb-6">

        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          IP Creation
        </motion.p>

        {/* Main heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.87] text-[#F5E6D0]"
                initial={{ y: "108%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
              >
                IP CREATION
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.87]"
                style={{ WebkitTextStroke: "2px #F5E6D0", color: "transparent" }}
                initial={{ y: "108%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.95, delay: 0.16, ease: EASE }}
              >
                ISN'T A PITCH.
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.87] text-[#C9A84C]"
                initial={{ y: "108%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.95, delay: 0.24, ease: EASE }}
              >
                IT'S MUSCLE MEMORY.
              </motion.h2>
            </div>
          </div>

          {/* Stats — stacked vertically on right */}
          <motion.div
            className="flex flex-row lg:flex-col gap-px bg-[#F5E6D0]/[0.06] lg:min-w-[280px] shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            {STATS_IP.map((s, i) => (
              <div key={i} className="bg-[#0E0E0E] px-7 py-5 flex items-center justify-between lg:flex-col lg:items-start lg:gap-1">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#F5E6D0]/35 font-medium order-2 lg:order-none">{s.label}</p>
                <p className="font-display text-[#C9A84C] leading-none" style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)" }}>
                  {s.value}{s.suffix}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="text-[#F5E6D0]/40 text-base leading-[1.8] max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          Ideas, analytics, operations — all at once, all the time.
          Consistent content creation is hard.{" "}
          <strong className="text-[#C9A84C] font-bold">Not for us.</strong>
        </motion.p>
      </div>

      {/* ── Dense IP grid ── */}
      <div className="section-padding" style={{ paddingTop: "0.75rem", paddingBottom: 0 }}>
        <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-8 gap-2">
          {DISPLAY_IPS.map((ip, i) => (
            <motion.div
              key={ip}
              className="aspect-square bg-[#0D0D0D] flex flex-col items-center justify-center gap-1.5 group cursor-pointer overflow-hidden relative p-2"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.55 + i * 0.02, ease: EASE }}
              whileHover={{ backgroundColor: "#110000" }}
            >
              {IP_LOGOS[ip] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={IP_LOGOS[ip]}
                    alt={ip}
                    fill
                    className="object-contain p-2 transition-transform duration-400 group-hover:scale-105"
                  />
                </div>
              ) : (
                <span className="text-[7px] text-[#F5E6D0]/40 group-hover:text-[#F5E6D0]/70 font-bold text-center leading-tight px-1 transition-colors duration-300">
                  {ip}
                </span>
              )}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A84C]/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
}
